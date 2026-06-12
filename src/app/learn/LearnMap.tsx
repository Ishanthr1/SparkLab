"use client";

import { Check, Lock, Star } from "lucide-react";
import Link from "next/link";
import { SparkSays } from "@/components/mascot/SparkSays";
import { StoryShip } from "@/components/dashboard/StoryShip";
import { XPBar } from "@/components/gamification/XPBar";
import { useProgress } from "@/components/providers/ProgressProvider";
import { worlds } from "@/data/worlds";
import { cn } from "@/lib/utils";
import type { World, WorldColor } from "@/types";

const colorChip: Record<WorldColor, string> = {
  blue: "bg-spark-blue",
  yellow: "bg-spark-yellow",
  orange: "bg-spark-orange",
  green: "bg-spark-green",
  purple: "bg-spark-purple",
  red: "bg-spark-red",
};

export function LearnMap() {
  const progress = useProgress();
  const repairedIds = worlds
    .filter((w) => progress.isWorldCompleted(w.id))
    .map((w) => w.id);

  const totalLessons = worlds.reduce((n, w) => n + w.lessons.length, 0);
  const doneLessons = Object.keys(progress.state.completedLessons).length;

  // The first unlocked-but-incomplete world is "current".
  const currentWorld = worlds.find(
    (w) => progress.isWorldUnlocked(w.id) && !progress.isWorldCompleted(w.id),
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="grid items-center gap-6 lg:grid-cols-[3fr_2fr]">
        <div>
          <h1 className="font-display text-4xl font-extrabold">
            Mission: Repair the Ship
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted">
            SparkBot&apos;s spaceship crash-landed with six broken systems. Each
            world you master repairs one part. Complete them all and the ship
            flies again!
          </p>
          <div className="mt-5 max-w-md">
            <div className="mb-1 flex justify-between text-sm font-bold">
              <span>Mission progress</span>
              <span>
                {doneLessons} / {totalLessons} lessons
              </span>
            </div>
            <XPBar
              progress={totalLessons === 0 ? 0 : doneLessons / totalLessons}
              label={`Mission progress: ${doneLessons} of ${totalLessons} lessons complete`}
              color="green"
            />
          </div>
        </div>
        <StoryShip repairedWorldIds={repairedIds} />
      </header>

      {currentWorld && (
        <div className="mt-8">
          <SparkSays mood={doneLessons === 0 ? "excited" : "happy"}>
            {doneLessons === 0
              ? "Start with World 1 — the Power Core won't fix itself! Every lesson ends with a quiz worth bonus XP."
              : `Next up: ${currentWorld.title}. Repair the ${currentWorld.shipPart.name} and we're one step closer to liftoff!`}
          </SparkSays>
        </div>
      )}

      <ol className="mt-10 space-y-8">
        {worlds.map((world) => (
          <WorldCard
            key={world.id}
            world={world}
            unlocked={progress.isWorldUnlocked(world.id)}
            completed={progress.isWorldCompleted(world.id)}
            isLessonCompleted={progress.isLessonCompleted}
          />
        ))}
      </ol>
    </div>
  );
}

function WorldCard({
  world,
  unlocked,
  completed,
  isLessonCompleted,
}: {
  world: World;
  unlocked: boolean;
  completed: boolean;
  isLessonCompleted: (slug: string) => boolean;
}) {
  return (
    <li
      className={cn(
        "rounded-card border-2 bg-surface p-6 shadow-sm transition-opacity",
        completed
          ? "border-spark-green"
          : unlocked
            ? "border-border"
            : "border-border opacity-60",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white",
              colorChip[world.color],
            )}
          >
            {world.id}
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold">
              {world.title}
              {completed && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-spark-green-soft px-3 py-0.5 align-middle text-sm font-bold text-spark-green">
                  <Check aria-hidden="true" className="h-4 w-4" /> repaired
                </span>
              )}
              {!unlocked && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-background px-3 py-0.5 align-middle text-sm font-bold text-muted">
                  <Lock aria-hidden="true" className="h-4 w-4" /> locked
                </span>
              )}
            </h2>
            <p className="mt-1 text-muted">{world.tagline}</p>
          </div>
        </div>
        <p className="rounded-full bg-background px-4 py-1.5 text-sm font-bold text-muted">
          🛠 Repairs: {world.shipPart.name}
        </p>
      </div>

      {!unlocked ? (
        <p className="mt-4 text-sm font-semibold text-muted">
          Finish World {world.id - 1} to unlock this world.
        </p>
      ) : (
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {world.lessons.map((lesson, i) => {
            const done = isLessonCompleted(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/learn/${world.slug}/${lesson.slug}`}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-colors",
                    done
                      ? "border-spark-green bg-spark-green-soft hover:brightness-95"
                      : "border-border bg-surface hover:border-spark-blue hover:bg-spark-blue-soft",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display font-bold",
                      done
                        ? "bg-spark-green text-white"
                        : "border-2 border-border bg-background",
                    )}
                  >
                    {done ? <Check className="h-5 w-5" /> : i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display font-bold">
                      {lesson.title}
                    </span>
                    <span className="block text-sm text-muted">
                      {done ? "Completed — tap to review" : `${lesson.minutes} min · ${lesson.xpReward}+ XP`}
                    </span>
                  </span>
                  {done && <Star aria-hidden="true" className="ml-auto h-5 w-5 shrink-0 fill-spark-yellow text-spark-yellow" />}
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </li>
  );
}
