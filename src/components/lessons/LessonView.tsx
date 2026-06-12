"use client";

import { ArrowLeft, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LessonSections } from "@/components/lessons/LessonSections";
import { RewardModal } from "@/components/gamification/RewardModal";
import {
  useProgress,
  type RewardSummary,
} from "@/components/providers/ProgressProvider";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { Lesson, World } from "@/types";

interface LessonViewProps {
  world: World;
  lesson: Lesson;
  lessonNumber: number;
  next?: { worldSlug: string; lessonSlug: string };
}

export function LessonView({ world, lesson, lessonNumber, next }: LessonViewProps) {
  const { completeLesson, isLessonCompleted } = useProgress();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");
  const [reward, setReward] = useState<RewardSummary | null>(null);
  const [lastScore, setLastScore] = useState<{ score: number; total: number } | null>(null);

  const alreadyDone = isLessonCompleted(lesson.slug);

  function handleQuizComplete(score: number, total: number) {
    setLastScore({ score, total });
    const summary = completeLesson(lesson.slug, score, total, lesson.xpReward);
    setReward(summary);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 font-display font-semibold text-spark-blue hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to the map
        </Link>
      </nav>

      <header className="rounded-card border-2 border-border bg-surface p-6">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-spark-blue">
          World {world.id}: {world.title} · Lesson {lessonNumber}
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-lg text-muted">{lesson.description}</p>
        <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold">
          <span className="inline-flex items-center gap-1 rounded-full bg-spark-yellow-soft px-3 py-1">
            <Zap aria-hidden="true" className="h-4 w-4 text-spark-orange" />
            {lesson.xpReward} XP + quiz bonus
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-spark-blue-soft px-3 py-1">
            <Clock aria-hidden="true" className="h-4 w-4 text-spark-blue" />
            about {lesson.minutes} min
          </span>
          {alreadyDone && (
            <span className="rounded-full bg-spark-green-soft px-3 py-1 text-spark-green">
              ✓ Completed
            </span>
          )}
        </p>
      </header>

      {phase === "lesson" ? (
        <>
          <div className="mt-10">
            <LessonSections sections={lesson.sections} />
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => setPhase("quiz")}>
              {alreadyDone ? "Retake the quiz" : "I'm ready — start the quiz!"}
            </Button>
            <p className="mt-2 text-sm font-semibold text-muted">
              {lesson.quiz.length} questions · instant feedback · no pressure
            </p>
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-card border-2 border-border bg-surface p-6 sm:p-8">
          <QuizEngine questions={lesson.quiz} onComplete={handleQuizComplete} />
        </div>
      )}

      {reward && lastScore && (
        <RewardModal
          reward={reward}
          heading={
            lastScore.score === lastScore.total
              ? "Perfect score!"
              : lastScore.score >= lastScore.total / 2
                ? "Lesson complete!"
                : "Lesson complete — keep practicing!"
          }
          message={`You got ${lastScore.score} out of ${lastScore.total} on the quiz.${
            reward.alreadyCompleted ? " (Already completed — no repeat XP, but great practice!)" : ""
          }`}
          onClose={() => setReward(null)}
          closeLabel={next ? "Continue" : "Back to the map"}
        />
      )}

      {/* After-quiz navigation, revealed once the reward modal has been seen */}
      {lastScore && !reward && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/learn" variant="outline">
            Back to the map
          </ButtonLink>
          {next && (
            <ButtonLink href={`/learn/${next.worldSlug}/${next.lessonSlug}`}>
              Next lesson →
            </ButtonLink>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              setPhase("lesson");
              setLastScore(null);
            }}
          >
            Review this lesson
          </Button>
        </div>
      )}
    </div>
  );
}
