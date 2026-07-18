import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getSupabase } from "../lib/supabase";
import { buildCalendlyUrl } from "../lib/calendly";
import TurnstileWidget from "./TurnstileWidget";

const EMPTY = { name: "", email: "", phone: "", business: "", company_website: "" };

export default function LeadGateModal({ isOpen, onClose, source }) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const firstFieldRef = useRef(null);
  const lastSavedRef = useRef(EMPTY);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY);
      setErrors({});
      setStatus("idle");
      setTurnstileToken(null);
      setTurnstileError(false);
    }
  }, [isOpen]);

  // Lock scroll + Escape to close + focus first field
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen, status, onClose]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!form.email.trim()) next.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email";
    if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken) {
      next.turnstile = "Please complete the security check";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const goToCalendly = (lead) => {
    window.location.href = buildCalendlyUrl({
      name: lead.name,
      email: lead.email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (form.company_website) return; // honeypot
    if (!validate()) return;

    const lead = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      business_name: form.business.trim() || null,
      message: source
        ? `Booking free audit via Calendly (${source})`
        : "Booking free audit via Calendly",
      company_website: "",
      turnstile_token: turnstileToken || undefined,
    };
    lastSavedRef.current = lead;

    setStatus("submitting");
    try {
      const sb = await getSupabase();
      const { error } = await sb.functions.invoke("submit-lead", {
        body: lead,
      });
      if (error) throw error;
      setStatus("success");
      setTimeout(() => goToCalendly(lead), 900);
    } catch (err) {
      console.error("Lead save failed:", err);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-xl bg-background border text-foreground placeholder:text-muted-foreground/60 outline-none transition-all text-sm py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-secondary/30";
  const fieldBorder = (k) =>
    errors[k] ? "border-red-500/70" : "border-border focus:border-secondary";

  const overlay = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const panel = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
      };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          {...overlay}
          transition={{ duration: 0.2 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => status !== "submitting" && onClose()}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            {...panel}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-md bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[92vh] overflow-y-auto"
          >
            {status === "success" ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
                <h2 className="text-xl font-bold mb-2">You're all set</h2>
                <p className="text-sm text-muted-foreground">
                  Taking you to the calendar to pick a time…
                </p>
                <Loader2 className="w-5 h-5 animate-spin text-secondary mx-auto mt-5" />
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-6 sm:p-7 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h2 id="gate-title" className="text-lg font-bold leading-tight">
                        Book your free audit
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        15-minute call · we'll pick a time next
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={status === "submitting"}
                    aria-label="Close"
                    className="p-2 -m-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-40"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4" noValidate>
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="company_website"
                    value={form.company_website}
                    onChange={change}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <Field
                    icon={User}
                    error={errors.name}
                    htmlFor="gate-name"
                    label="Name"
                  >
                    <input
                      ref={firstFieldRef}
                      id="gate-name"
                      name="name"
                      value={form.name}
                      onChange={change}
                      placeholder="Full name"
                      autoComplete="name"
                      className={`${inputBase} ${fieldBorder("name")}`}
                      aria-invalid={!!errors.name}
                    />
                  </Field>

                  <Field
                    icon={Mail}
                    error={errors.email}
                    htmlFor="gate-email"
                    label="Email"
                  >
                    <input
                      id="gate-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={change}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className={`${inputBase} ${fieldBorder("email")}`}
                      aria-invalid={!!errors.email}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field icon={Phone} htmlFor="gate-phone" label="Phone (optional)">
                      <input
                        id="gate-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={change}
                        placeholder="Phone"
                        autoComplete="tel"
                        className={`${inputBase} ${fieldBorder("phone")}`}
                      />
                    </Field>
                    <Field
                      icon={Building2}
                      htmlFor="gate-business"
                      label="Business (optional)"
                    >
                      <input
                        id="gate-business"
                        name="business"
                        value={form.business}
                        onChange={change}
                        placeholder="Business name"
                        autoComplete="organization"
                        className={`${inputBase} ${fieldBorder("business")}`}
                      />
                    </Field>
                  </div>

                  {/* Cloudflare Turnstile */}
                  <TurnstileWidget
                    key={form.name + form.email} // reset when form is cleared
                    onVerify={setTurnstileToken}
                    onError={() => setTurnstileError(true)}
                  />
                  {errors.turnstile && (
                    <p className="text-red-500 text-xs text-center">{errors.turnstile}</p>
                  )}
                  {turnstileError && (
                    <p className="text-amber-500 text-xs text-center">
                      Security check unavailable. You can still book — we'll reach out.
                    </p>
                  )}

                  {status === "error" && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-semibold text-amber-500 mb-0.5">
                          We couldn't save your details just now.
                        </p>
                        <p>
                          You can still grab a time —{" "}
                          <button
                            type="button"
                            onClick={() => goToCalendly(lastSavedRef.current)}
                            className="text-secondary font-semibold underline underline-offset-2"
                          >
                            continue to the calendar
                          </button>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-secondary/90 text-white font-medium py-3.5 px-6 transition-all hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        Continue to booking
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-muted-foreground">
                    No commitment · takes under a minute
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Field({ icon: Icon, error, label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 pl-1">{error}</p>}
    </div>
  );
}
