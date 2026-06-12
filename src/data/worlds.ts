import type { Lesson, World } from "@/types";
import { world1, world2 } from "./worlds-1-2";
import { world3, world4 } from "./worlds-3-4";
import { world5, world6 } from "./worlds-5-6";

export const worlds: World[] = [world1, world2, world3, world4, world5, world6];

export const totalLessonCount = worlds.reduce(
  (sum, w) => sum + w.lessons.length,
  0,
);

export function worldBySlug(slug: string): World | undefined {
  return worlds.find((w) => w.slug === slug);
}

export interface LessonLocation {
  world: World;
  lesson: Lesson;
  lessonIndex: number;
  /** The next lesson in reading order, possibly in the next world. */
  next?: { worldSlug: string; lessonSlug: string };
}

export function findLesson(
  worldSlug: string,
  lessonSlug: string,
): LessonLocation | undefined {
  const world = worldBySlug(worldSlug);
  if (!world) return undefined;
  const lessonIndex = world.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return undefined;

  let next: LessonLocation["next"];
  if (lessonIndex + 1 < world.lessons.length) {
    next = {
      worldSlug: world.slug,
      lessonSlug: world.lessons[lessonIndex + 1].slug,
    };
  } else {
    const nextWorld = worlds.find((w) => w.id === world.id + 1);
    if (nextWorld && nextWorld.lessons.length > 0) {
      next = {
        worldSlug: nextWorld.slug,
        lessonSlug: nextWorld.lessons[0].slug,
      };
    }
  }

  return { world, lesson: world.lessons[lessonIndex], lessonIndex, next };
}

/** Worlds and lesson slugs for generateStaticParams. */
export function allLessonParams(): { world: string; lesson: string }[] {
  return worlds.flatMap((w) =>
    w.lessons.map((l) => ({ world: w.slug, lesson: l.slug })),
  );
}
