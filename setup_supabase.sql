-- SQL script to setup table and RLS permissions for Two Lanes to New Orleans invitation
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Paste -> Run

-- 1. Drop existing table to ensure schema matches all 30 columns
drop table if exists public.nola_invitation_responses cascade;

-- 2. Create table nola_invitation_responses with all required columns
create table public.nola_invitation_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_name text,
  session_id text,
  submit_count int default 1,
  screen_progress int,
  dress_color text,
  pack_items text[],
  snacks text[],
  questions_request text,
  cooler_items text[],
  bar_order text,
  vibe_choices text[],
  vibe_other text,
  activities_liked text[],
  activities_maybe text[],
  activities_passed text[],
  friday_dinner text,
  friday_backup text,
  sat_lunch text,
  sat_lunch_backup text,
  group_dinner text,
  cravings text,
  sunday_beignets boolean,
  night_plans text[],
  night_other text,
  how_late text,
  company text,
  notes_text text,
  wants_surprise boolean,
  answers jsonb,
  user_agent text,
  client_version text
);

-- 3. Enable Row Level Security (RLS)
alter table public.nola_invitation_responses enable row level security;

-- 4. Create policy allowing anonymous users (unauthenticated visitors) to submit responses
create policy "Anyone can insert invitation responses"
  on public.nola_invitation_responses
  for insert
  to anon
  with check (true);

-- 5. Grant INSERT privilege to anon role
grant insert on table public.nola_invitation_responses to anon;
