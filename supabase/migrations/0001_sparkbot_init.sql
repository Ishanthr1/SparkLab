-- SparkBot initial schema.
--
-- Identity comes from Clerk (clerk_user_id text columns); Supabase stores
-- learning data. Every table is locked down with deny-all RLS: the only
-- access path is the Next.js server using the service-role key, which
-- verifies the Clerk session before touching data.

-- User profiles: one row per Clerk user, with their platform role.
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  role text not null default 'student' check (role in ('student', 'parent', 'teacher')),
  display_name text,
  created_at timestamptz not null default now()
);

-- Snapshot of each student's full progress state (mirrors the client shape),
-- plus a denormalized xp column for fast leaderboards/analytics.
create table if not exists student_progress (
  clerk_user_id text primary key,
  progress jsonb not null default '{}'::jsonb,
  xp integer not null default 0,
  updated_at timestamptz not null default now()
);

-- One row per quiz attempt, for parent/teacher performance views.
create table if not exists quiz_attempts (
  id bigint generated always as identity primary key,
  clerk_user_id text not null,
  lesson_slug text not null,
  score integer not null,
  total integer not null,
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_idx on quiz_attempts (clerk_user_id, created_at desc);

-- Earned badges (also embedded in student_progress.progress; this table
-- exists for efficient cross-student queries).
create table if not exists badges_earned (
  clerk_user_id text not null,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (clerk_user_id, badge_id)
);

-- Parents linked to the students they monitor.
create table if not exists parent_links (
  parent_clerk_id text not null,
  student_clerk_id text not null,
  created_at timestamptz not null default now(),
  primary key (parent_clerk_id, student_clerk_id)
);

-- Teacher classrooms; students join with a short code.
create table if not exists classrooms (
  id uuid primary key default gen_random_uuid(),
  teacher_clerk_id text not null,
  name text not null,
  join_code text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists classroom_members (
  classroom_id uuid not null references classrooms (id) on delete cascade,
  student_clerk_id text not null,
  joined_at timestamptz not null default now(),
  primary key (classroom_id, student_clerk_id)
);

-- Lesson/world assignments for a classroom. lesson_slug null = whole world.
create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references classrooms (id) on delete cascade,
  world_slug text not null,
  lesson_slug text,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

-- Deny-all RLS: no anon/authenticated access; the service role bypasses RLS.
alter table profiles enable row level security;
alter table student_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table badges_earned enable row level security;
alter table parent_links enable row level security;
alter table classrooms enable row level security;
alter table classroom_members enable row level security;
alter table assignments enable row level security;
