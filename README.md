# Merit Badge Tracker

A personal, single-user web app to track your Scouting America (BSA) merit badge
progress — mark badges *in progress* or *earned*, record the date, upload a photo
or certificate, and watch your progress toward the **21 badges needed for Eagle**.

Built with **React + Vite + Tailwind CSS**. Data is stored locally (IndexedDB) out
of the box, and can optionally sync to **Supabase** for cloud storage + photo hosting.

## Features

- All 135+ official merit badges, grouped into browsable categories
- Eagle-required badges flagged, including the three "choose one of" groups
- **Eagle Path** view: 13 required + 8 elective progress with live progress rings
- Mark status, set an earned date, add notes, upload a photo per badge
- Search + filter by category, status, and Eagle-required
- Works offline with zero setup; upgrade to cloud sync anytime
- Accessible, responsive, keyboard-friendly, respects reduced-motion

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. That's it — it runs immediately in **local mode**
(data saved in your browser via IndexedDB).

## Optional: enable cloud sync with Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor** and run the contents of
   [`supabase/schema.sql`](supabase/schema.sql). This creates the
   `badge_progress` table and the public `badge-photos` storage bucket.
3. Copy `.env.example` to `.env` and fill in your project URL + anon key
   (Project Settings → API):

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Restart `npm run dev`. The header will now say **"Synced to cloud"** and
   photos will be stored in Supabase Storage instead of inline in the browser.

> The included policies leave the table/bucket open to the anon key, which is fine
> for a private personal tracker. If you ever make it public or multi-user, add
> Supabase Auth and tighten the row-level-security policies.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com](https://vercel.com) — framework preset **Vite**,
   build command `npm run build`, output dir `dist`.
3. If using Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in
   the Vercel project's Environment Variables.

## Data & trademark notes

- The badge list and requirement links come from the official hub at
  [scouting.org/skills/merit-badges](https://www.scouting.org/skills/merit-badges/all/),
  which is the single source of truth for current requirements. There is no
  official public API, so the list in `src/data/badges.js` is curated and should
  be reviewed each program year (requirements update annually on Jan 1).
- Eagle logic reflects the rules effective **Feb 27, 2026**: 13 required merit
  badges (10 fixed + 3 choose-one groups) within 21 total.
- This app intentionally does **not** reproduce official merit badge insignia
  artwork, which is a Scouting America trademark. It uses simple category icons
  instead. Keep it that way if you make the app public.
- This is an unofficial personal project, not affiliated with or endorsed by
  Scouting America / the Boy Scouts of America.

## Project structure

```
src/
  data/badges.js        Official badge dataset + Eagle metadata
  lib/
    store.js            Storage abstraction (Supabase or IndexedDB)
    supabase.js         Supabase client (created only if env vars are set)
    indexeddb.js        Local storage backend
    eagle.js            Eagle-progress calculations
  hooks/useProgress.js  Loads + persists progress
  components/           Header, FilterBar, BadgeGrid, BadgeCard,
                        EagleProgress, BadgeModal, ProgressRing, StatCard
  App.jsx               Screen composition
```
# MeritBadges
