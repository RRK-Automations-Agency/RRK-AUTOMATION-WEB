-- ============================================================
-- 0006_close_public_insert.sql
-- Remove the public INSERT policy on the leads table.
--
-- Previously, "Anyone can submit leads" (with check true) allowed
-- anonymous users to INSERT directly via the anon key, bypassing
-- the submit-lead Edge Function entirely — along with its
-- Turnstile verification, rate limiting, input validation, and
-- audit pipeline.
--
-- All lead creation MUST now go through the submit-lead Edge
-- Function, which uses the service_role key (bypasses RLS).
--
-- Admin SELECT / UPDATE / DELETE policies are unchanged.
-- ============================================================

drop policy if exists "Anyone can submit leads" on public.leads;
