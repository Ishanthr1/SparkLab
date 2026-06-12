"use client";

import { BookOpenCheck, Flame, ShieldCheck, Timer, Zap } from "lucide-react";
import { useProgress } from "@/components/providers/ProgressProvider";
import { Card } from "@/components/ui/Card";
import { worlds } from "@/data/worlds";

export function ParentView() {
  const { state, level, ready } = useProgress();
  const lessonsDone = Object.keys(state.completedLessons).length;

  const quizResults = Object.entries(state.completedLessons);
  const avgScore =
    quizResults.length === 0
      ? null
      : Math.round(
          (quizResults.reduce(
            (sum, [, r]) => sum + (r.quizTotal ? r.quizScore / r.quizTotal : 0),
            0,
          ) /
            quizResults.length) *
            100,
        );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="font-display text-4xl font-extrabold">Parent Dashboard</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        A clear window into your child&apos;s learning — what they&apos;ve
        studied, how their quizzes went, and how often they practice.
      </p>
      <p className="mt-3 inline-block rounded-full bg-spark-blue-soft px-4 py-1.5 text-sm font-bold text-spark-blue-deep">
        Showing the learner profile on this device. Create accounts to sync
        progress across devices.
      </p>

      {/* summary tiles */}
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryTile
          icon={<BookOpenCheck aria-hidden="true" className="h-7 w-7 text-spark-blue" />}
          value={ready ? String(lessonsDone) : "–"}
          label="Lessons completed"
        />
        <SummaryTile
          icon={<Zap aria-hidden="true" className="h-7 w-7 text-spark-orange" />}
          value={ready ? `${state.xp}` : "–"}
          label={`XP earned (Level ${level.level})`}
        />
        <SummaryTile
          icon={<Timer aria-hidden="true" className="h-7 w-7 text-spark-purple" />}
          value={avgScore === null ? "—" : `${avgScore}%`}
          label="Average quiz score"
        />
        <SummaryTile
          icon={<Flame aria-hidden="true" className="h-7 w-7 text-spark-red" />}
          value={ready ? `${state.streak.current}` : "–"}
          label={`Current streak (best ${state.streak.best})`}
        />
      </ul>

      {/* per-world progress */}
      <Card className="mt-8">
        <h2 className="font-display text-2xl font-bold">Completed lessons & quiz performance</h2>
        {lessonsDone === 0 ? (
          <p className="mt-3 text-muted">
            Nothing completed yet. Once your child finishes a lesson, the
            details appear here — including each quiz score.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {worlds.map((world) => {
              const done = world.lessons.filter(
                (l) => state.completedLessons[l.slug],
              );
              if (done.length === 0) return null;
              return (
                <section key={world.id}>
                  <h3 className="font-display text-lg font-bold">
                    World {world.id}: {world.title}{" "}
                    <span className="text-sm font-semibold text-muted">
                      ({done.length}/{world.lessons.length} lessons)
                    </span>
                  </h3>
                  <table className="mt-2 w-full text-left text-sm">
                    <thead>
                      <tr className="border-b-2 border-border text-muted">
                        <th scope="col" className="py-2 pr-4 font-bold">Lesson</th>
                        <th scope="col" className="py-2 pr-4 font-bold">Completed</th>
                        <th scope="col" className="py-2 font-bold">Quiz score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {done.map((lesson) => {
                        const r = state.completedLessons[lesson.slug];
                        const pct = r.quizTotal
                          ? Math.round((r.quizScore / r.quizTotal) * 100)
                          : 0;
                        return (
                          <tr key={lesson.slug} className="border-b border-border">
                            <td className="py-2 pr-4 font-semibold">{lesson.title}</td>
                            <td className="py-2 pr-4">
                              {new Date(r.completedAt).toLocaleDateString()}
                            </td>
                            <td className="py-2">
                              <span
                                className={
                                  pct === 100
                                    ? "font-bold text-spark-green"
                                    : pct >= 50
                                      ? "font-bold text-spark-blue"
                                      : "font-bold text-spark-orange"
                                }
                              >
                                {r.quizScore}/{r.quizTotal} ({pct}%)
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </section>
              );
            })}
          </div>
        )}
      </Card>

      {/* parent info */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card accent="green">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-spark-green" />
            Safe by design
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
            <li>No ads, no in-app purchases, no chat with strangers.</li>
            <li>
              The AI tutor only discusses electronics and always steers students
              toward safe, battery-powered experiments.
            </li>
            <li>
              All hands-on suggestions use low-voltage components (9V or less)
              or the on-screen simulator.
            </li>
          </ul>
        </Card>
        <Card accent="blue">
          <h2 className="font-display text-xl font-bold">What your child is learning</h2>
          <p className="mt-3 text-muted">
            The six-world curriculum follows real electrical-engineering
            fundamentals: what electricity is, how circuits work, what each
            component does, how to design series and parallel circuits, and how
            modern devices combine circuits with code and sensors. By the end,
            students can design a flashlight, an alarm, and a traffic light —
            and explain how each works.
          </p>
        </Card>
      </div>
    </div>
  );
}

function SummaryTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
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
