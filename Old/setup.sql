-- Run in Supabase: SQL Editor → New query → paste → Run.
-- The DROP line clears any earlier version of the table.

drop table if exists public.date_responses;

create table public.date_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  availability jsonb,        -- { from: "2:00 PM", until: "11:00 PM" }
  activities jsonb,          -- what she swiped right on
  activities_passed jsonb,   -- what she swiped left on (useful intel)
  food_drinks jsonb,         -- her shortlist
  vibe text,                 -- Lowkey / A bit of everything / Make it a big one
  vibe_score int,            -- 0-100 from the dial
  note text                  -- allergies, vetoes, requests
);

-- Anonymous visitors can submit; nobody can read via the public API.
-- You view responses in the dashboard (Table Editor).
alter table public.date_responses enable row level security;

create policy "anyone can submit"
  on public.date_responses
  for insert
  to anon
  with check (true);
