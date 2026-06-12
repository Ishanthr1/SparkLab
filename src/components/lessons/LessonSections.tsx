import { Earth, FlaskConical, Lightbulb, Wrench } from "lucide-react";
import { SparkSays } from "@/components/mascot/SparkSays";
import { LessonDiagram } from "@/components/lessons/LessonDiagram";
import { LessonInteractive } from "@/components/lessons/LessonInteractive";
import { ButtonLink } from "@/components/ui/Button";
import type { LessonSection } from "@/types";

/** Renders the ordered content blocks of a lesson. */
export function LessonSections({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </div>
  );
}

function Section({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "spark":
      return <SparkSays mood={section.mood}>{section.text}</SparkSays>;

    case "text":
      return (
        <section className="mx-auto max-w-2xl">
          {section.heading && (
            <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
          )}
          <p className="mt-2 text-lg leading-relaxed">{section.body}</p>
        </section>
      );

    case "fact":
      return (
        <aside className="mx-auto max-w-2xl rounded-card border-2 border-spark-yellow bg-spark-yellow-soft p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Lightbulb aria-hidden="true" className="h-5 w-5 text-spark-orange" />
            Whoa! {section.title}
          </h3>
          <p className="mt-2 leading-relaxed">{section.body}</p>
        </aside>
      );

    case "analogy":
      return (
        <aside className="mx-auto max-w-2xl rounded-card border-2 border-spark-purple bg-spark-purple-soft p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <FlaskConical aria-hidden="true" className="h-5 w-5 text-spark-purple" />
            {section.title}
          </h3>
          <p className="mt-2 leading-relaxed">{section.body}</p>
        </aside>
      );

    case "diagram":
      return <LessonDiagram diagram={section.diagram} caption={section.caption} />;

    case "interactive":
      return <LessonInteractive widget={section.widget} prompt={section.prompt} />;

    case "realWorld":
      return (
        <aside className="mx-auto max-w-2xl rounded-card border-2 border-spark-green bg-spark-green-soft p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Earth aria-hidden="true" className="h-5 w-5 text-spark-green" />
            Real world: {section.title}
          </h3>
          <p className="mt-2 leading-relaxed">{section.body}</p>
        </aside>
      );

    case "tryIt":
      return (
        <aside className="mx-auto max-w-2xl rounded-card border-2 border-spark-blue bg-spark-blue-soft p-5 text-center">
          <h3 className="flex items-center justify-center gap-2 font-display text-lg font-bold">
            <Wrench aria-hidden="true" className="h-5 w-5 text-spark-blue" />
            Builder challenge
          </h3>
          <p className="mt-2 leading-relaxed">{section.body}</p>
          <ButtonLink href="/simulator" variant="outline" className="mt-3">
            Open the Circuit Simulator
          </ButtonLink>
        </aside>
      );
  }
}
