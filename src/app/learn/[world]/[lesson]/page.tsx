import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lessons/LessonView";
import { allLessonParams, findLesson } from "@/data/worlds";

export function generateStaticParams() {
  return allLessonParams();
}

export async function generateMetadata(
  props: PageProps<"/learn/[world]/[lesson]">,
): Promise<Metadata> {
  const { world, lesson } = await props.params;
  const found = findLesson(world, lesson);
  if (!found) return { title: "Lesson not found" };
  return {
    title: found.lesson.title,
    description: found.lesson.description,
  };
}

export default async function LessonPage(
  props: PageProps<"/learn/[world]/[lesson]">,
) {
  const { world: worldSlug, lesson: lessonSlug } = await props.params;
  const found = findLesson(worldSlug, lessonSlug);
  if (!found) notFound();

  return (
    <LessonView
      world={found.world}
      lesson={found.lesson}
      lessonNumber={found.lessonIndex + 1}
      next={found.next}
    />
  );
}
