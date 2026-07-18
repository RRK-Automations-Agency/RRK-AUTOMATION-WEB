/**
 * Environment variable validation.
 *
 * Called at app startup — fails fast with clear messages if required
 * variables are missing so deployment issues are caught immediately
 * rather than surfacing as cryptic runtime errors.
 */

const REQUIRED_VARS = [
  ["VITE_SUPABASE_URL", "Supabase project URL"],
  ["VITE_SUPABASE_PUBLISHABLE_KEY", "Supabase anon/publishable key"],
];

const OPTIONAL_VARS = [
  ["VITE_TURNSTILE_SITE_KEY", "Cloudflare Turnstile site key (public)"],
  ["VITE_SENTRY_DSN", "Sentry DSN for error monitoring"],
  ["VITE_CALENDLY_URL", "Calendly booking URL"],
];

export function validateEnv() {
  const missing = REQUIRED_VARS.filter(
    ([name]) => !import.meta.env[name]
  );

  if (missing.length > 0) {
    const msg = [
      "Missing required environment variables:",
      ...missing.map(([name, desc]) => `  • ${name} — ${desc}`),
      "",
      "Copy .env.example to .env and fill in the values.",
      "The application will not function correctly without these.",
    ].join("\n");

    console.error(msg);

    if (!import.meta.env.PROD) {
      throw new Error(msg);
    }
  }

  const unset = OPTIONAL_VARS.filter(([name]) => !import.meta.env[name]);
  if (unset.length > 0) {
    console.info(
      "Optional env vars not configured:\n" +
      unset.map(([name, desc]) => `  • ${name} — ${desc}`).join("\n")
    );
  }
}
