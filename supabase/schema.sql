-- Merit Badge Tracker — Supabase schema
-- Run this in the Supabase dashboard: SQL Editor -> New query -> Run.
-- This app is a single-user personal tracker, so the table is open to the
-- anon key. If you make it public or multi-user, add auth + RLS policies.

create table if not exists public.badge_progress (
  badge_id   text primary key,
  status     text not null default 'in_progress',  -- 'in_progress' | 'earned'
  date_earned date,
  notes      text default '',
  photo_url  text,
  updated_at timestamptz not null default now()
);

alter table public.badge_progress enable row level security;

-- Permissive policy for a personal single-user app using the anon key.
-- Tighten this (require auth.uid()) if you deploy multi-user.
drop policy if exists "anon full access" on public.badge_progress;
create policy "anon full access"
  on public.badge_progress
  for all
  to anon
  using (true)
  with check (true);

-- Storage bucket for uploaded photos / certificates.
insert into storage.buckets (id, name, public)
values ('badge-photos', 'badge-photos', true)
on conflict (id) do nothing;

-- Allow the anon key to upload/read photos in that bucket.
drop policy if exists "anon photos read" on storage.objects;
create policy "anon photos read"
  on storage.objects for select to anon
  using (bucket_id = 'badge-photos');

drop policy if exists "anon photos write" on storage.objects;
create policy "anon photos write"
  on storage.objects for insert to anon
  with check (bucket_id = 'badge-photos');

drop policy if exists "anon photos update" on storage.objects;
create policy "anon photos update"
  on storage.objects for update to anon
  using (bucket_id = 'badge-photos');
