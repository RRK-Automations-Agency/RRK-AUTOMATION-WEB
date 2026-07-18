// ============================================================
// submit-lead — Supabase Edge Function
//
// Required secrets (supabase secrets set ...):
//   EMAILJS_SERVICE_ID            — EmailJS service id
//   EMAILJS_TEMPLATE_ID_INTERNAL  — EmailJS template id for team notification
//   EMAILJS_PUBLIC_KEY            — EmailJS public key (user_id)
//   EMAILJS_PRIVATE_KEY          — EmailJS private key (accessToken)
//   TURNSTILE_SECRET_KEY         — Cloudflare Turnstile secret key
//   LEAD_NOTIFY_TO               — comma-separated team emails (the recipients)
//
// Auto-provided by Supabase:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// Contract:
//   1. Verify Turnstile CAPTCHA server-side.
//   2. Check distributed rate limits (Supabase DB).
//   3. Store lead in Supabase (service role, bypasses RLS).
//   4. Notify the team via EmailJS (internal template).
//   5. Notification failure NEVER fails lead submission.
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { internalLeadEmail } from "./emails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Rate limit: 5 requests per minute, 50 per hour per IP
const RATE_LIMIT_MAX_PER_MIN = 5;
const RATE_LIMIT_MAX_PER_HOUR = 50;

// ================================================================
// Helpers
// ================================================================

/** SHA-256 hash of the client IP for rate limiting storage. */
async function hashIP(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify a Turnstile widget token against Cloudflare's API.
 * Returns `true` if the token is valid.
 */
async function verifyTurnstileToken(
  token: string,
  secret: string
): Promise<{ ok: boolean; codes?: string[] }> {
  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return { ok: false, codes: [`http_${res.status}`] };
    }

    const result = await res.json();
    return { ok: result.success === true, codes: result["error-codes"] };
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return { ok: false, codes: ["network_error"] };
  }
}

// ================================================================
// Rate Limiting (persistent via Supabase DB)
// ================================================================

async function checkRateLimit(
  supabase: any,
  hashedIP: string
): Promise<{ allowed: boolean; reason?: string }> {
  try {
    // Prune entries older than 24 hours
    const cutoff = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();
    await supabase.from("rate_limits").delete().lt("created_at", cutoff);

    const minAgo = new Date(
      Date.now() - 60 * 1000
    ).toISOString();
    const hourAgo = new Date(
      Date.now() - 3600 * 1000
    ).toISOString();

    // Check per-minute
    const { count: minCount, error: minErr } = await supabase
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("hashed_key", hashedIP)
      .eq("action", "lead_submit")
      .gte("created_at", minAgo);

    if (minErr) throw minErr;

    if (minCount !== null && minCount >= RATE_LIMIT_MAX_PER_MIN) {
      return {
        allowed: false,
        reason: "Too many requests. Please wait 60 seconds and try again.",
      };
    }

    // Check per-hour
    const { count: hourCount, error: hourErr } = await supabase
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("hashed_key", hashedIP)
      .eq("action", "lead_submit")
      .gte("created_at", hourAgo);

    if (hourErr) throw hourErr;

    if (hourCount !== null && hourCount >= RATE_LIMIT_MAX_PER_HOUR) {
      return {
        allowed: false,
        reason: "Daily request limit reached. Please try again tomorrow.",
      };
    }
  } catch (err) {
    console.error("Rate limit check error (allowing request):", err);
    // Fail open — if rate limiting DB is unavailable, allow the request
  }

  return { allowed: true };
}

async function recordRateLimit(supabase: any, hashedIP: string) {
  try {
    await supabase.from("rate_limits").insert({
      hashed_key: hashedIP,
      action: "lead_submit",
    });
  } catch (err) {
    console.error("Rate limit record error (non-fatal):", err);
  }
}

// ================================================================
// EmailJS
// ================================================================

async function sendEmailJS(
  templateId: string,
  templateParams: Record<string, unknown>
) {
  const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
  const publicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
  const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");

  if (!serviceId || !publicKey || !privateKey) {
    throw new Error("EmailJS not fully configured");
  }

  const res = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: templateParams,
    }),
  });

  if (!res.ok) {
    throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
  }
}

// ================================================================
// Main Handler
// ================================================================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const {
      name,
      email,
      phone,
      business_name,
      message,
      company_website,
      source,
      turnstile_token,
    } = await req.json();

    // ---- Honeypot ----
    // Silently accept bots without storing anything.
    if (company_website) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ---- Input Validation ----
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Name, email, and message are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ---- Cloudflare Turnstile Verification ----
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      if (!turnstile_token) {
        console.error(
          "Security: Turnstile token missing from submission"
        );
        return new Response(
          JSON.stringify({
            error:
              "Security verification required. Please refresh and try again.",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      const tsResult = await verifyTurnstileToken(
        turnstile_token,
        turnstileSecret
      );
      if (!tsResult.ok) {
        console.error(
          "Security: Turnstile verification failed",
          tsResult.codes
        );
        return new Response(
          JSON.stringify({
            error:
              "Security verification failed. Please try again.",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    // ---- Rate Limiting ----
    const clientIP =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const hashedIP = await hashIP(clientIP);

    const rateCheck = await checkRateLimit(supabase, hashedIP);
    if (!rateCheck.allowed) {
      console.error(
        `Security: Rate limit exceeded for ${hashedIP.slice(0, 12)}...`
      );
      return new Response(
        JSON.stringify({ error: rateCheck.reason }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    // Record this request in the rate limit table
    await recordRateLimit(supabase, hashedIP);

    // ---- Process Lead ----
    const lead = {
      name: String(name).trim().substring(0, 100),
      email: String(email).trim().toLowerCase().substring(0, 255),
      phone: phone ? String(phone).trim().substring(0, 20) : null,
      business_name: business_name
        ? String(business_name).trim().substring(0, 100)
        : null,
      message: String(message).trim().substring(0, 2000),
      status: "new",
    };

    // 1. Store lead (source of truth) — failure here DOES fail the request.
    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single();

    if (error) throw error;

    // 2. Notifications — best effort. Wrapped so a failure can never
    //    fail the submission the user already completed.
    try {
      const team = (Deno.env.get("LEAD_NOTIFY_TO") ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      const templateId = Deno.env.get("EMAILJS_TEMPLATE_ID_INTERNAL");
      if (!templateId || !templateId.startsWith("template_")) {
        console.warn(
          "EMAILJS_TEMPLATE_ID_INTERNAL not set — skipping email notification"
        );
      } else {
        const leadSource =
          source && String(source).trim()
            ? String(source).trim()
            : "Website";

        const jobs = team.map((recipient) =>
          sendEmailJS(templateId, {
            to_email: recipient,
            reply_to: lead.email,
            subject: `New lead: ${lead.name}${
              lead.business_name
                ? ` — ${lead.business_name}`
                : ""
            }`,
            name: lead.name,
            email: lead.email,
            phone: lead.phone ?? "",
            business: lead.business_name ?? "",
            message: lead.message,
            lead_source: leadSource,
            timestamp: data.created_at,
            message_html: internalLeadEmail(lead),
          })
        );

        const results = await Promise.allSettled(jobs);
        results
          .filter((r) => r.status === "rejected")
          .forEach((r) =>
            console.error(
              "Lead email failed:",
              (r as PromiseRejectedResult).reason
            )
          );
      }
    } catch (notifyErr) {
      console.error(
        "Notification block failed (lead still saved):",
        notifyErr
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("submit-lead error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
