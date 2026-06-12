import { worlds } from "@/data/worlds";
import type { BadgeDef, ProgressState } from "@/types";

export const BADGES: BadgeDef[] = [
  {
    id: "first-spark",
    name: "First Spark",
    description: "Complete your very first lesson.",
    icon: "sparkles",
    color: "yellow",
  },
  {
    id: "first-circuit",
    name: "First Circuit",
    description: "Build a working circuit in the simulator.",
    icon: "zap",
    color: "blue",
  },
  {
    id: "led-expert",
    name: "LED Expert",
    description: "Finish the LED lesson and light an LED in the simulator.",
    icon: "lightbulb",
    color: "orange",
  },
  {
    id: "voltage-master",
    name: "Voltage Master",
    description: "Complete every lesson in Introduction to Electricity.",
    icon: "gauge",
    color: "purple",
  },
  {
    id: "problem-solver",
    name: "Problem Solver",
    description: "Score 100% on five different lesson quizzes.",
    icon: "puzzle",
    color: "green",
  },
  {
    id: "master-builder",
    name: "Master Builder",
    description: "Build five working circuits in the simulator.",
    icon: "wrench",
    color: "orange",
  },
  {
    id: "on-fire",
    name: "On Fire",
    description: "Learn three days in a row.",
    icon: "flame",
    color: "red",
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    description: "Learn seven days in a row.",
    icon: "rocket",
    color: "purple",
  },
  {
    id: "circuit-champion",
    name: "Circuit Champion",
    description: "Complete every lesson in every world.",
    icon: "trophy",
    color: "yellow",
  },
  {
    id: "ship-savior",
    name: "Ship Savior",
    description: "Repair every part of SparkBot's spaceship.",
    icon: "ship",
    color: "blue",
  },
];

export function badgeById(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}

function worldCompleted(state: ProgressState, worldId: number): boolean {
  const world = worlds.find((w) => w.id === worldId);
  if (!world) return false;
  return world.lessons.every((l) => state.completedLessons[l.slug]);
}

function allWorldsCompleted(state: ProgressState): boolean {
  return worlds.every((w) => worldCompleted(state, w.id));
}

function perfectQuizCount(state: ProgressState): number {
  return Object.values(state.completedLessons).filter(
    (r) => r.quizTotal > 0 && r.quizScore === r.quizTotal,
  ).length;
}

const BADGE_CHECKS: Record<string, (state: ProgressState) => boolean> = {
  "first-spark": (s) => Object.keys(s.completedLessons).length >= 1,
  "first-circuit": (s) => s.simBuilds >= 1,
  "led-expert": (s) => Boolean(s.completedLessons["leds"]) && s.simLedLit,
  "voltage-master": (s) => worldCompleted(s, 1),
  "problem-solver": (s) => perfectQuizCount(s) >= 5,
  "master-builder": (s) => s.simBuilds >= 5,
  "on-fire": (s) => s.streak.current >= 3 || s.streak.best >= 3,
  unstoppable: (s) => s.streak.current >= 7 || s.streak.best >= 7,
  "circuit-champion": allWorldsCompleted,
  "ship-savior": allWorldsCompleted,
};

/** Returns ids of badges newly earned by the given state. */
export function evaluateBadges(state: ProgressState): string[] {
  const earned: string[] = [];
  for (const badge of BADGES) {
    if (state.earnedBadges[badge.id]) continue;
    const check = BADGE_CHECKS[badge.id];
    if (check && check(state)) earned.push(badge.id);
  }
  return earned;
}
