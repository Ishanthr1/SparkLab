"use client";

import { ClipboardList, GraduationCap, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { worlds } from "@/data/worlds";

/**
 * Teacher dashboard preview. Classroom data activates once accounts and the
 * Supabase backend are configured; until then this renders a clearly-labeled
 * sample classroom so teachers can evaluate the workflow.
 */

const SAMPLE_ROSTER = [
  { name: "Avery P.", lessons: 14, xp: 1480, avgQuiz: 92, streak: 6 },
  { name: "Jordan M.", lessons: 11, xp: 1105, avgQuiz: 78, streak: 3 },
  { name: "Sam K.", lessons: 17, xp: 1860, avgQuiz: 95, streak: 9 },
  { name: "Riley T.", lessons: 8, xp: 760, avgQuiz: 71, streak: 1 },
  { name: "Casey L.", lessons: 13, xp: 1320, avgQuiz: 85, streak: 4 },
  { name: "Morgan D.", lessons: 5, xp: 430, avgQuiz: 64, streak: 0 },
];

const SAMPLE_WORLD_SCORES = worlds.map((w, i) => ({
  world: `W${w.id}`,
  avg: [88, 81, 84, 76, 79, 72][i] ?? 75,
}));

export function TeacherView() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="font-display text-4xl font-extrabold">Teacher Dashboard</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Create classrooms, assign lessons, and watch understanding grow — with
        per-student progress and class-wide analytics.
      </p>
      <p className="mt-3 inline-block rounded-full bg-spark-yellow-soft px-4 py-1.5 text-sm font-bold">
        📋 Sample classroom shown — connect accounts to manage real classes.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FeatureTile
          icon={<Users aria-hidden="true" className="h-7 w-7 text-spark-blue" />}
          title="Classrooms"
          body="Invite students with a join code; group them by class period."
        />
        <FeatureTile
          icon={<ClipboardList aria-hidden="true" className="h-7 w-7 text-spark-orange" />}
          title="Assignments"
          body="Assign worlds or single lessons with due dates."
        />
        <FeatureTile
          icon={<GraduationCap aria-hidden="true" className="h-7 w-7 text-spark-green" />}
          title="Analytics"
          body="Spot struggling topics from quiz scores before test day."
        />
      </ul>

      <Card className="mt-8">
        <h2 className="font-display text-2xl font-bold">
          Period 3 — Intro to Electronics{" "}
          <span className="text-sm font-semibold text-muted">(sample data)</span>
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-border text-muted">
                <th scope="col" className="py-2 pr-4 font-bold">Student</th>
                <th scope="col" className="py-2 pr-4 font-bold">Lessons done</th>
                <th scope="col" className="py-2 pr-4 font-bold">XP</th>
                <th scope="col" className="py-2 pr-4 font-bold">Avg quiz</th>
                <th scope="col" className="py-2 font-bold">Streak</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ROSTER.map((s) => (
                <tr key={s.name} className="border-b border-border">
                  <td className="py-2.5 pr-4 font-bold">{s.name}</td>
                  <td className="py-2.5 pr-4">{s.lessons} / 22</td>
                  <td className="py-2.5 pr-4">{s.xp}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={
                        s.avgQuiz >= 85
                          ? "font-bold text-spark-green"
                          : s.avgQuiz >= 70
                            ? "font-bold text-spark-blue"
                            : "font-bold text-spark-orange"
                      }
                    >
                      {s.avgQuiz}%
                    </span>
                  </td>
                  <td className="py-2.5">{s.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-display text-xl font-bold">
          Average quiz score by world (sample)
        </h2>
        <div className="mt-4 h-56" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SAMPLE_WORLD_SCORES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="world" stroke="var(--muted)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="var(--muted)" fontSize={12} />
              <Tooltip
                cursor={{ fill: "var(--spark-blue-soft)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "2px solid var(--border)",
                  fontWeight: 700,
                }}
              />
              <Bar dataKey="avg" fill="var(--spark-purple)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="sr-only">
          Sample average quiz scores: {SAMPLE_WORLD_SCORES.map((w) => `${w.world}: ${w.avg}%`).join(", ")}
        </p>
        <p className="mt-3 text-sm font-semibold text-muted">
          Reading the chart: dips usually mean a topic needs another pass —
          here, World 4 (series vs. parallel) could use a class demo in the
          circuit simulator.
        </p>
      </Card>
    </div>
  );
}

function FeatureTile({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li>
      <Card className="h-full">
        {icon}
        <h2 className="mt-2 font-display text-lg font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </Card>
    </li>
  );
}
