-- ============================================================
-- 0004_audit_log.sql
-- Admin audit logging table + triggers + RLS.
-- Tracks admin CRUD on leads, services, and pricing_plans.
-- Also provides a helper function for security event logging.
-- ============================================================

-- ---- Audit Log Table ----

create table if not exists public.audit_log (
  id            uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action        text not null,          -- login, login_failed, create, update, delete, rate_limited, turnstile_failed
  entity        text not null,          -- auth, leads, services, pricing_plans, security
  entity_id     text,
  details       jsonb,
  ip_address    text,
  user_agent    text,
  created_at    timestamptz not null default now()
);

create index if not exists idx_audit_log_created_at
  on public.audit_log(created_at desc);
create index if not exists idx_audit_log_action
  on public.audit_log(action);
create index if not exists idx_audit_log_entity
  on public.audit_log(entity, entity_id);
create index if not exists idx_audit_log_admin
  on public.audit_log(admin_user_id);

-- ---- Row Level Security ----

alter table public.audit_log enable row level security;

drop policy if exists "Admins can view audit log" on public.audit_log;
create policy "Admins can view audit log"
  on public.audit_log for select
  using (public.has_role(auth.uid(), 'admin'));

-- ---- Helper: Security Event Logger ----
-- SECURITY DEFINER so any role (including anon) can write to the audit log
-- without bypassing RLS on other tables.
-- Executed via: SELECT public.log_security_event('login_failed', 'auth', NULL, '{"email": "..."}');

create or replace function public.log_security_event(
  p_action text,
  p_entity text,
  p_entity_id text default null,
  p_details jsonb default null
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.audit_log (admin_user_id, action, entity, entity_id, details)
  values (auth.uid(), p_action, p_entity, p_entity_id, p_details);
$$;

grant execute on function public.log_security_event(text, text, text, jsonb) to anon, authenticated;

-- ---- Audit Trigger Function ----

create or replace function public.log_admin_action()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_action  text;
begin
  v_user_id := auth.uid();

  -- Skip logging for service_role / anonymous inserts (no user context).
  -- This avoids logging every public lead submission.
  if v_user_id is null then
    return coalesce(new, old);
  end if;

  if tg_op = 'UPDATE' then
    -- Skip no-op updates
    if old is not distinct from new then
      return new;
    end if;
    v_action := 'update';
  elsif tg_op = 'DELETE' then
    v_action := 'delete';
  else
    v_action := 'create';
  end if;

  insert into public.audit_log (admin_user_id, action, entity, entity_id, details)
  values (
    v_user_id,
    v_action,
    tg_table_name,
    coalesce(new.id::text, old.id::text),
    jsonb_build_object(
      'old', case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
      'new', case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
    )
  );

  return coalesce(new, old);
end;
$$;

-- ---- Triggers ----

drop trigger if exists audit_leads_changes on public.leads;
create trigger audit_leads_changes
  after insert or update or delete on public.leads
  for each row execute function public.log_admin_action();

drop trigger if exists audit_services_changes on public.services;
create trigger audit_services_changes
  after insert or update or delete on public.services
  for each row execute function public.log_admin_action();

drop trigger if exists audit_pricing_changes on public.pricing_plans;
create trigger audit_pricing_changes
  after insert or update or delete on public.pricing_plans
  for each row execute function public.log_admin_action();
