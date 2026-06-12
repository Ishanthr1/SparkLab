# ⚡ SparkBot

An interactive electronics-learning platform for ages 11–14. Students repair
SparkBot's crash-landed spaceship by mastering six worlds of electronics —
from "what is electricity?" to Arduino and robotics — with a drag-and-drop
circuit simulator, quizzes, XP, badges, and a friendly robot mentor guiding
every step.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Everything works out of the box in **guest mode**:
progress, XP, badges, and streaks are stored on-device, and the AI tutor
answers from a built-in knowledge base.

## Optional integrations

Copy `.env.example` to `.env.local` and add keys for what you need:

| Feature | Env vars | What it unlocks |
| --- | --- | --- |
| **Accounts** (Clerk) | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Student/parent sign-in; sign-in & sign-up pages activate automatically |
| **Progress sync** (Supabase) | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY` | Signed-in students' progress synced across devices via `/api/progress` |
| **AI tutor** (OpenRouter) | `OPENROUTER_API_KEY`, optional `OPENROUTER_MODEL` | Free-form SparkBot tutor conversations; falls back to the knowledge base without it |

The Supabase schema lives in [`supabase/migrations/0001_sparkbot_init.sql`](supabase/migrations/0001_sparkbot_init.sql)
(already applied to the linked project). All tables use deny-all RLS — the only
database path is the Next.js server, which checks the Clerk session first.

## What's inside

- **Landing page** — hero, how-it-works, featured lessons, achievements, projects, parent info
- **`/learn`** — story-mode progression map: 6 worlds / 22 lessons, each world repairs a ship system
- **Lessons** — visual-first sections (diagrams, analogies, fun facts, real-world examples) plus 10 interactive widgets (voltage slider, conductor tester, series/parallel lab, Arduino blink editor…)
- **Quizzes** — multiple choice, true/false, match (tap-to-place drag-and-drop), and circuit-identification questions with instant SparkBot feedback
- **`/simulator`** — drag-and-drop circuit builder (battery, LED, resistor, switch, wire) with grid snapping, graph-based real-time validation, lit LEDs, short-circuit warnings, and contextual hints
- **`/dashboard`** — XP, levels (Junior Inventor → Master Engineer), 10 badges, streaks, Recharts analytics
- **`/tutor`** — SparkBot AI tutor chat (OpenRouter or built-in fallback)
- **`/parents`** — completed lessons + quiz performance monitoring
- **`/teacher`** — classroom dashboard preview with sample analytics

## Accessibility

Keyboard-first throughout (the simulator is fully keyboard-operable: arrows
move, R rotates, F flips, Enter toggles), screen-reader labels on all visuals,
plus an always-available settings menu with **high contrast**, **dyslexia-friendly
font** (Lexend), and **reduced motion** modes. Responsive from phones to desktop.

## Stack

Next.js 16 (App Router, `src/proxy.ts`) · React 19 · TypeScript · Tailwind v4 ·
Framer Motion · Recharts · Lucide · Clerk (optional) · Supabase (optional) ·
OpenRouter (optional)

## Architecture notes

- `src/data/` — all curriculum content as typed data (worlds, lessons, quizzes)
- `src/lib/simulator.ts` — pure circuit-graph analysis (components are edges between grid nodes; classified by path-tracing from the battery)
- `src/components/providers/ProgressProvider.tsx` — XP/badge/streak engine; localStorage first, debounced server sync when signed in
- `src/components/mascot/SparkBot.tsx` — the mascot is parametric SVG with six moods; no image assets
- Clerk and Supabase are **feature-flagged by env vars** — absence of keys degrades gracefully rather than crashing
