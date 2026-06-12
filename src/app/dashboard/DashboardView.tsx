"use client";

import { BookOpen, Flame, Hammer, Star, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StoryShip } from "@/components/dashboard/StoryShip";
import { BadgeIcon } from "@/components/gamification/BadgeIcon";
import { XPBar } from "@/components/gamification/XPBar";
import { SparkSays } from "@/components/mascot/SparkSays";
import { useProgress } from "@/components/providers/ProgressProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BADGES } from "@/lib/badges";
import { worlds } from "@/data/worlds";

export function DashboardView() {
  const { state, level, ready, isWorldCompleted, resetProgress } = useProgress();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const lessonsDone = Object.keys(state.completedLessons).length;
  const projectWorld = worlds.find((w) => w.id === 5);
  const projectsDone =
    projectWorld?.lessons.filter((l) => state.completedLessons[l.slug]).length ?? 0;
  const badgesEarned = Object.keys(state.earnedBadges).length;
  const repairedIds = worlds.filter((w) => isWorldCompleted(w.id)).map((w) => w.id);

  // Last 7 days of XP for the chart.
  const xpByDay = useMemo(() => {
    const days: { day: string; xp: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const xp = state.xpLog
        .filter((e) => e.date.slice(0, 10) === key)
        .reduce((sum, e) => sum + e.amount, 0);
      days.push({
        day: d.toLocaleDateString(undefined, { weekday: "short" }),
        xp,
      });
    }
    return days;
  }, [state.xpLog]);

  const xpBySource = useMemo(() => {
    const sums = { lesson: 0, quiz: 0, build: 0 };
    for (const e of state.xpLog) sums[e.source] += e.amount;
    return [
      { name: "Lessons", xp: sums.lesson },
      { name: "Quizzes", xp: sums.quiz },
      { name: "Builds", xp: sums.build },
    ];
  }, [state.xpLog]);

  if (!ready) {
    return (
      <p className="py-20 text-center font-display text-lg font-bold text-muted">
        Loading your progress…
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="font-display text-4xl font-extrabold">My Progress</h1>

      {/* Level + XP */}
      <Card accent="blue" className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-spark-blue">
              Level {level.level}
            </p>
            <h2 className="font-display text-3xl font-extrabold">{level.title}</h2>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full bg-spark-yellow-soft px-5 py-2 font-display text-xl font-extrabold">
            <Zap aria-hidden="true" className="h-6 w-6 text-spark-orange" />
            {state.xp} XP total
          </p>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-sm font-bold text-muted">
            <span>Progress to Level {level.level + 1}</span>
            <span>
              {level.xpIntoLevel} / {level.xpNeededForNext || "MAX"} XP
            </span>
          </div>
          <XPBar
            progress={level.progress}
            label={`Level progress: ${level.xpIntoLevel} of ${level.xpNeededForNext} XP toward level ${level.level + 1}`}
          />
        </div>
      </Card>

      {/* Stat tiles */}
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={<BookOpen aria-hidden="true" className="h-7 w-7 text-spark-blue" />}
          value={lessonsDone}
          label="Lessons completed"
        />
        <StatTile
          icon={<Hammer aria-hidden="true" className="h-7 w-7 text-spark-purple" />}
          value={projectsDone}
          label="Projects completed"
        />
        <StatTile
          icon={<Star aria-hidden="true" className="h-7 w-7 text-spark-yellow" />}
          value={badgesEarned}
          label="Badges earned"
        />
        <StatTile
          icon={<Flame aria-hidden="true" className="h-7 w-7 text-spark-orange" />}
          value={state.streak.current}
          label={`Day streak (best: ${state.streak.best})`}
        />
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* XP this week */}
        <Card>
          <h2 className="font-display text-xl font-bold">XP this week</h2>
          <div className="mt-4 h-56" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={xpByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "var(--spark-blue-soft)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "2px solid var(--border)",
                    fontWeight: 700,
                  }}
                />
                <Bar dataKey="xp" fill="var(--spark-blue)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="sr-only">
            XP earned per day this week:{" "}
            {xpByDay.map((d) => `${d.day}: ${d.xp}`).join(", ")}
          </p>
        </Card>

        {/* XP by source */}
        <Card>
          <h2 className="font-display text-xl font-bold">Where your XP comes from</h2>
          <div className="mt-4 h-56" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={xpBySource} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted)" fontSize={12} allowDecimals={false} />
                <YAxis type="category" dataKey="name" stroke="var(--muted)" fontSize={12} width={70} />
                <Tooltip
                  cursor={{ fill: "var(--spark-yellow-soft)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "2px solid var(--border)",
                    fontWeight: 700,
                  }}
                />
                <Bar dataKey="xp" fill="var(--spark-orange)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="sr-only">
            XP by source: {xpBySource.map((s) => `${s.name}: ${s.xp}`).join(", ")}
          </p>
        </Card>
      </div>

      {/* Badges */}
      <Card className="mt-6">
        <h2 className="font-display text-xl font-bold">Badge collection</h2>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BADGES.map((badge) => {
            const earned = Boolean(state.earnedBadges[badge.id]);
            return (
              <li
                key={badge.id}
                className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border p-4 text-center"
              >
                <BadgeIcon badge={badge} earned={earned} />
                <span className="font-display text-sm font-bold">{badge.name}</span>
                <span className="text-xs text-muted">{badge.description}</span>
                <span className="sr-only">{earned ? "Earned" : "Not earned yet"}</span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Ship status */}
      <Card className="mt-6">
        <h2 className="text-center font-display text-xl font-bold">
          Mission status: SparkBot&apos;s ship
        </h2>
        <StoryShip repairedWorldIds={repairedIds} className="mt-2" />
      </Card>

      {lessonsDone === 0 && (
        <div className="mt-8">
          <SparkSays mood="happy">
            This dashboard fills up as you learn! Head to the learning path and
            finish your first lesson — I&apos;ll save you a spot on the
            leaderboard of awesome.
          </SparkSays>
        </div>
      )}

      {/* Reset */}
      <div className="mt-10 text-center">
        {confirmingReset ? (
          <div className="inline-flex flex-wrap items-center gap-3 rounded-card border-2 border-spark-red bg-spark-red-soft p-4">
            <span className="font-bold">
              Erase ALL progress, XP, and badges? This can&apos;t be undone.
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                resetProgress();
                setConfirmingReset(false);
              }}
            >
              Yes, start over
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmingReset(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setConfirmingReset(true)}>
            Reset my progress
          </Button>
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <li>
      <Card className="flex h-full flex-col items-center gap-1 text-center">
        {icon}
        <span className="font-display text-3xl font-extrabold">{value}</span>
        <span className="text-sm font-semibold text-muted">{label}</span>
      </Card>
    </li>
  );
}
