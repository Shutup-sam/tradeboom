# Milestone: Phase 2 — Database Layer Connection (Supabase)

## Completed: 2026-08-04

## Deliverables

- ✅ Installed `@supabase/supabase-js` client SDK
- ✅ Created `src/lib/supabase.ts` — conditional Supabase client initializer
- ✅ Refactored `saveToDatabase` in `src/actions/actions.ts` to write to Supabase `contacts` and `subscribers` tables, with filesystem fallback
- ✅ Updated `src/app/admin/page.tsx` to query Supabase Postgres tables in production
- ✅ Maintained local JSON file fallback for development environments
- ✅ Added `@/lib/supabase` mock in `tests/unit/actions.test.ts` to keep all 11 unit tests passing offline
- ✅ Verified production build compiles cleanly (Next.js 15.5.22)
- ✅ Deployed to production — https://www.tradeboom.in

## Phases Completed

1. Phase 1: Test Integration & Automation — 2026-08-04
2. Phase 2: Database Layer Connection (Supabase) — 2026-08-04
3. Phase 3: Secure Admin Lead Dashboard — 2026-08-04

## Metrics

- Files changed: 6
- New files: 2 (`src/lib/supabase.ts`, `.gsd/milestones/phase-2-database-layer/SUMMARY.md`)
- Unit tests: 11 passing
- Build status: ✅ Clean

## Architecture Changes

- Added `src/lib/supabase.ts` as the single shared Supabase client module
- `src/actions/actions.ts` now has a two-tier write strategy: Supabase → local JSON fallback
- `src/app/admin/page.tsx` now has a two-tier read strategy: Supabase → local JSON fallback

## Lessons Learned

- Vercel serverless functions have ephemeral, isolated filesystems — local file storage is never persistent across requests in production
- The `null`-client pattern (returning `null` when env vars are missing) keeps unit tests clean without complex mocking setups
- Supabase uses snake_case column names; mapping to camelCase at the application boundary keeps types consistent

## Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Supabase project REST API URL |
| `SUPABASE_ANON_KEY` | Supabase project public anon key |

## SQL Schema

```sql
create table if not exists public.contacts (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text,
  email text not null,
  interest text not null,
  message text
);

create table if not exists public.subscribers (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique
);

alter table public.contacts enable row level security;
alter table public.subscribers enable row level security;

create policy "Allow anon insert to contacts" on public.contacts for insert with check (true);
create policy "Allow anon insert to subscribers" on public.subscribers for insert with check (true);
create policy "Allow admin select contacts" on public.contacts for select using (true);
create policy "Allow admin select subscribers" on public.subscribers for select using (true);
```
