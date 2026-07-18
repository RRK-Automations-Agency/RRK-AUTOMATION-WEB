-- ============================================================
-- 0005_rate_limits.sql
-- Rate limiting table for public endpoints.
-- Stores hashed IPs with timestamps for sliding-window rate checks.
-- No RLS — only accessed via service_role from edge functions.
-- Data older than 24 hours is cleaned up by the edge function.
-- ============================================================

create table if not exists public.rate_limits (
  id          uuid primary key default gen_random_uuid(),
  hashed_key  text not null,           -- SHA-256 of client IP
  action      text not null default 'lead_submit',  -- action being rate-limited
  created_at  timestamptz not null default now()
);

create index if not exists idx_rate_limits_lookup
  on public.rate_limits(hashed_key, action, created_at);

create index if not exists idx_rate_limits_cleanup
  on public.rate_limits(created_at);
