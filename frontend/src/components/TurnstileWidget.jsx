import { useEffect, useRef } from "react";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const SCRIPT_ID = "cf-turnstile-script";

/**
 * Cloudflare Turnstile widget for React.
 *
 * Props:
 *   onVerify(token: string | null)  — called when the challenge succeeds (token) or
 *                                     expires/errors (null). Send token with your form.
 *   onError()                       — called when Turnstile itself errors (script fail, etc.)
 *   theme    "dark" | "light" | "auto"  — defaults to "dark" to match the site design.
 *
 * Usage:
 *   <TurnstileWidget onVerify={(t) => setTurnstileToken(t)} />
 *
 * Environment:
 *   VITE_TURNSTILE_SITE_KEY must be set in .env.
 *   If not set, the widget renders nothing (logged to console).
 */
export default function TurnstileWidget({ onVerify, onError, theme = "dark" }) {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const callbacksRef = useRef({ onVerify, onError });

  useEffect(() => {
    callbacksRef.current = { onVerify, onError };

    if (!SITE_KEY) {
      console.warn("Turnstile: VITE_TURNSTILE_SITE_KEY not set. Widget disabled.");
      return;
    }

    // Load the Turnstile script once
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }

    let interval;
    const render = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetId.current !== null) return; // already rendered

      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme,
        callback: (token) => {
          callbacksRef.current.onVerify?.(token);
        },
        "error-callback": () => {
          callbacksRef.current.onError?.();
          callbacksRef.current.onVerify?.(null);
        },
        "expired-callback": () => {
          callbacksRef.current.onVerify?.(null);
        },
      });
    };

    // Try immediately, then poll until turnstile is ready
    if (window.turnstile) {
      render();
    } else {
      interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          render();
        }
      }, 200);
    }

    return () => {
      clearInterval(interval);
      if (widgetId.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          // ignore cleanup errors
        }
        widgetId.current = null;
      }
    };
  }, [theme]); // only re-render if theme changes

  if (!SITE_KEY) return null;

  return (
    <div className="flex justify-center min-h-[65px] items-center">
      <div ref={containerRef} />
    </div>
  );
}
