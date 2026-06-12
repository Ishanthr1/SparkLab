import type { LevelMilestone } from "@/types";

export const LEVEL_MILESTONES: LevelMilestone[] = [
  { level: 1, title: "Junior Inventor" },
  { level: 5, title: "Circuit Builder" },
  { level: 10, title: "Electronics Explorer" },
  { level: 20, title: "Master Engineer" },
];

export const MAX_LEVEL = 30;

/** Total XP required to reach a given level. Level 1 starts at 0. */
export function xpForLevel(level: number): number {
  const n = Math.max(1, level) - 1;
  return 100 * n + 10 * n * n;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

/** Title of the highest milestone at or below the given level. */
export function titleForLevel(level: number): string {
  let title = LEVEL_MILESTONES[0].title;
  for (const m of LEVEL_MILESTONES) {
    if (level >= m.level) title = m.title;
  }
  return title;
}

export interface LevelInfo {
  level: number;
  title: string;
  xpIntoLevel: number;
  xpNeededForNext: number;
  /** 0..1 progress toward the next level. 1 when at max level. */
  progress: number;
}

export function levelInfo(xp: number): LevelInfo {
  const level = levelFromXp(xp);
  const base = xpForLevel(level);
  if (level >= MAX_LEVEL) {
    return { level, title: titleForLevel(level), xpIntoLevel: xp - base, xpNeededForNext: 0, progress: 1 };
  }
  const next = xpForLevel(level + 1);
  return {
    level,
    title: titleForLevel(level),
    xpIntoLevel: xp - base,
    xpNeededForNext: next - base,
    progress: (xp - base) / (next - base),
  };
}
