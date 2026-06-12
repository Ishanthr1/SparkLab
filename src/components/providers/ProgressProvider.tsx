"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clerkEnabled } from "@/lib/auth";
import { evaluateBadges } from "@/lib/badges";
import { levelInfo, type LevelInfo } from "@/lib/levels";
import { isYesterday, todayKey } from "@/lib/utils";
import { worlds } from "@/data/worlds";
import type { ProgressState, XpSource } from "@/types";

const STORAGE_KEY = "sparkbot.progress.v1";

export const EMPTY_PROGRESS: ProgressState = {
  xp: 0,
  xpLog: [],
  completedLessons: {},
  earnedBadges: {},
  simBuilds: 0,
  simLedLit: false,
  streak: { current: 0, best: 0, lastActiveDay: "" },
};

export interface RewardSummary {
  xpGained: number;
  newBadges: string[];
  leveledUp: boolean;
  newLevel: number;
  alreadyCompleted?: boolean;
}

interface ProgressApi {
  state: ProgressState;
  /** False until localStorage has been read; avoids hydration flicker. */
  ready: boolean;
  level: LevelInfo;
  completeLesson: (
    lessonSlug: string,
    quizScore: number,
    quizTotal: number,
    xpReward: number,
  ) => RewardSummary;
  recordBuild: (lit: boolean) => RewardSummary | null;
  resetProgress: () => void;
  importState: (incoming: ProgressState) => void;
  isLessonCompleted: (slug: string) => boolean;
  isWorldCompleted: (worldId: number) => boolean;
  isWorldUnlocked: (worldId: number) => boolean;
  worldsCompletedCount: number;
}

const ProgressContext = createContext<ProgressApi | null>(null);

function touchStreak(state: ProgressState): ProgressState["streak"] {
  const today = todayKey();
  const { current, best, lastActiveDay } = state.streak;
  if (lastActiveDay === today) return state.streak;
  const next = isYesterday(lastActiveDay) ? current + 1 : 1;
  return { current: next, best: Math.max(best, next), lastActiveDay: today };
}

function persist(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: progress lives in memory for this session.
  }
}

// Best-effort analytics for parent/teacher views; the server rejects the
// request when the student isn't signed in. Local progress stays the
// source of truth either way.
function recordQuizAttempt(lessonSlug: string, score: number, total: number) {
  if (!clerkEnabled) return;
  fetch("/api/quiz-attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonSlug, score, total }),
  }).catch(() => {
    // Offline or sync not configured: attempt history is optional.
  });
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const stateRef = useRef(state);

  // Mirror state into a ref (after render) so event-handler callbacks like
  // completeLesson can read the latest value without re-creating themselves.
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    // Progress must load from localStorage after hydration (the server render
    // can't know it), so this initial setState is unavoidable here.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState({ ...EMPTY_PROGRESS, ...JSON.parse(raw) });
    } catch {
      // Corrupt storage: start fresh.
    }
     
    setReady(true);
  }, []);

  const award = useCallback(
    (
      base: ProgressState,
      amount: number,
      source: XpSource,
      refId: string,
    ): ProgressState => {
      return {
        ...base,
        xp: base.xp + amount,
        xpLog: [
          ...base.xpLog,
          { date: new Date().toISOString(), amount, source, refId },
        ],
        streak: touchStreak(base),
      };
    },
    [],
  );

  const finalize = useCallback(
    (prev: ProgressState, next: ProgressState): RewardSummary => {
      const newBadges = evaluateBadges(next);
      const now = new Date().toISOString();
      for (const id of newBadges) {
        next.earnedBadges = { ...next.earnedBadges, [id]: now };
      }
      const before = levelInfo(prev.xp).level;
      const after = levelInfo(next.xp).level;
      setState(next);
      persist(next);
      return {
        xpGained: next.xp - prev.xp,
        newBadges,
        leveledUp: after > before,
        newLevel: after,
      };
    },
    [],
  );

  const completeLesson = useCallback(
    (
      lessonSlug: string,
      quizScore: number,
      quizTotal: number,
      xpReward: number,
    ): RewardSummary => {
      const prev = stateRef.current;
      const existing = prev.completedLessons[lessonSlug];
      recordQuizAttempt(lessonSlug, quizScore, quizTotal);

      if (existing) {
        // Re-takes can improve the recorded score but never re-award XP.
        const better = quizScore > existing.quizScore;
        const next: ProgressState = {
          ...prev,
          completedLessons: better
            ? {
                ...prev.completedLessons,
                [lessonSlug]: { ...existing, quizScore, quizTotal },
              }
            : prev.completedLessons,
          streak: touchStreak(prev),
        };
        const summary = finalize(prev, next);
        return { ...summary, alreadyCompleted: true };
      }

      const quizXp =
        quizScore * 10 + (quizTotal > 0 && quizScore === quizTotal ? 25 : 0);
      let next = award(prev, xpReward, "lesson", lessonSlug);
      next = award(next, quizXp, "quiz", lessonSlug);
      next = {
        ...next,
        completedLessons: {
          ...next.completedLessons,
          [lessonSlug]: {
            completedAt: new Date().toISOString(),
            quizScore,
            quizTotal,
          },
        },
      };
      return finalize(prev, next);
    },
    [award, finalize],
  );

  const recordBuild = useCallback(
    (lit: boolean): RewardSummary | null => {
      if (!lit) return null;
      const prev = stateRef.current;
      let next = award(prev, 30, "build", `build-${prev.simBuilds + 1}`);
      next = { ...next, simBuilds: prev.simBuilds + 1, simLedLit: true };
      return finalize(prev, next);
    },
    [award, finalize],
  );

  const resetProgress = useCallback(() => {
    setState(EMPTY_PROGRESS);
    persist(EMPTY_PROGRESS);
  }, []);

  // Used by account sync: adopt server-side progress when it is ahead of
  // what this device has (e.g. the student worked on another computer).
  const importState = useCallback((incoming: ProgressState) => {
    if (incoming.xp <= stateRef.current.xp) return;
    const next = { ...EMPTY_PROGRESS, ...incoming };
    setState(next);
    persist(next);
  }, []);

  const api = useMemo<ProgressApi>(() => {
    const isLessonCompleted = (slug: string) =>
      Boolean(state.completedLessons[slug]);
    const isWorldCompleted = (worldId: number) => {
      const world = worlds.find((w) => w.id === worldId);
      return Boolean(
        world && world.lessons.every((l) => state.completedLessons[l.slug]),
      );
    };
    return {
      state,
      ready,
      level: levelInfo(state.xp),
      completeLesson,
      recordBuild,
      resetProgress,
      importState,
      isLessonCompleted,
      isWorldCompleted,
      isWorldUnlocked: (worldId: number) =>
        worldId === 1 || isWorldCompleted(worldId - 1),
      worldsCompletedCount: worlds.filter((w) => isWorldCompleted(w.id)).length,
    };
  }, [state, ready, completeLesson, recordBuild, resetProgress, importState]);

  return (
    <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
