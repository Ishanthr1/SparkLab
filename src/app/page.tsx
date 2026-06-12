import {
  Award,
  BookOpen,
  Eye,
  FlaskConical,
  Hammer,
  LineChart,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { SparkBot } from "@/components/mascot/SparkBot";
import { SparkSays } from "@/components/mascot/SparkSays";
import { BadgeIcon } from "@/components/gamification/BadgeIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BADGES } from "@/lib/badges";
import { totalLessonCount, worlds } from "@/data/worlds";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <FeaturedLessons />
      <Achievements />
      <Projects />
      <ParentInfo />
      <FinalCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--spark-blue-soft),_transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[3fr_2fr]">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-spark-yellow bg-spark-yellow-soft px-4 py-1.5 font-display text-sm font-bold">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-spark-orange" />
            For curious minds ages 11–14
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Learn Electronics Through{" "}
            <span className="text-spark-blue">Interactive Adventures</span>
          </h1>
          <p className="mt-5 text-xl text-muted">
            Build circuits, solve challenges, and become an engineer with
            SparkBot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <ButtonLink href="/learn" size="lg">
              <Zap aria-hidden="true" className="h-5 w-5" />
              Start Learning
            </ButtonLink>
            <ButtonLink href="/learn" size="lg" variant="outline">
              Explore Lessons
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm font-semibold text-muted">
            {totalLessonCount} interactive lessons · {worlds.length} worlds ·
            free circuit simulator · no experience needed
          </p>
        </div>
        <div className="mx-auto">
          <SparkBot mood="cheering" size={300} className="drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: BookOpen,
    title: "Learn",
    body: "Short, visual lessons — no boring textbooks, ever.",
    color: "text-spark-blue",
  },
  {
    icon: FlaskConical,
    title: "Experiment",
    body: "Play with sliders, switches, and electron pumps inside every lesson.",
    color: "text-spark-purple",
  },
  {
    icon: Hammer,
    title: "Build",
    body: "Drag and drop real components in the circuit simulator.",
    color: "text-spark-orange",
  },
  {
    icon: Puzzle,
    title: "Solve",
    body: "Quizzes and challenges with instant, friendly feedback.",
    color: "text-spark-green",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    body: "Collect XP, level up, and unlock badges as you repair the ship.",
    color: "text-spark-yellow",
  },
];

function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mx-auto w-full max-w-6xl px-4 py-16">
      <h2 id="how-heading" className="text-center font-display text-3xl font-extrabold sm:text-4xl">
        How It Works
      </h2>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <Card className="h-full text-center">
              <span className="font-display text-sm font-bold text-muted">
                Step {i + 1}
              </span>
              <step.icon aria-hidden="true" className={`mx-auto mt-2 h-10 w-10 ${step.color}`} strokeWidth={2.2} />
              <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FeaturedLessons() {
  const featured = [
    { world: worlds[0], lesson: worlds[0].lessons[0] },
    { world: worlds[2], lesson: worlds[2].lessons[1] },
    { world: worlds[4], lesson: worlds[4].lessons[0] },
  ];
  return (
    <section aria-labelledby="featured-heading" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 id="featured-heading" className="text-center font-display text-3xl font-extrabold sm:text-4xl">
          Featured Lessons
        </h2>
        <p className="mt-3 text-center text-lg text-muted">
          A taste of the adventure — jump in anywhere.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map(({ world, lesson }) => (
            <li key={lesson.slug}>
              <Link
                href={`/learn/${world.slug}/${lesson.slug}`}
                className="block h-full rounded-card border-2 border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-spark-blue hover:shadow-lg"
              >
                <p className="font-display text-sm font-bold uppercase tracking-wide text-spark-blue">
                  World {world.id} · {world.title}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">{lesson.title}</h3>
                <p className="mt-2 text-muted">{lesson.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-spark-yellow-soft px-3 py-1 text-sm font-bold">
                  <Zap aria-hidden="true" className="h-4 w-4 text-spark-orange" />
                  {lesson.xpReward}+ XP · {lesson.minutes} min
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="achievements-heading" className="font-display text-3xl font-extrabold sm:text-4xl">
            Student Achievements
          </h2>
          <p className="mt-4 text-lg text-muted">
            Every lesson, quiz, and build earns XP. Level up from{" "}
            <strong className="text-foreground">Junior Inventor</strong> all the
            way to <strong className="text-foreground">Master Engineer</strong>,
            keep your learning streak alive, and collect badges along the way.
          </p>
          <div className="mt-6">
            <SparkSays mood="excited" size={90}>
              Great job! You just powered your first LED! That&apos;s the First
              Circuit badge — nine more to hunt down.
            </SparkSays>
          </div>
          <ButtonLink href="/dashboard" variant="outline" className="mt-6">
            <Award aria-hidden="true" className="h-5 w-5" />
            See the achievement dashboard
          </ButtonLink>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {BADGES.slice(0, 6).map((badge) => (
            <li key={badge.id}>
              <Card className="flex h-full flex-col items-center gap-2 text-center">
                <BadgeIcon badge={badge} />
                <span className="font-display font-bold">{badge.name}</span>
                <span className="text-xs text-muted">{badge.description}</span>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Projects() {
  const projectWorld = worlds[4];
  return (
    <section aria-labelledby="projects-heading" className="bg-spark-blue py-16 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 id="projects-heading" className="font-display text-3xl font-extrabold sm:text-4xl">
          Real Electronics Projects
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/80">
          Design the same devices real engineers build — then test them in the
          simulator.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {projectWorld.lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/learn/${projectWorld.slug}/${lesson.slug}`}
                className="block h-full rounded-card bg-white/10 p-6 backdrop-blur transition-colors hover:bg-white/20"
              >
                <h3 className="font-display text-2xl font-bold">
                  {lesson.title.replace("Project: ", "")}
                </h3>
                <p className="mt-2 text-white/80">{lesson.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/simulator" variant="secondary" size="lg" className="mt-10">
          <Hammer aria-hidden="true" className="h-5 w-5" />
          Open the Circuit Simulator
        </ButtonLink>
      </div>
    </section>
  );
}

const PARENT_POINTS = [
  {
    icon: Eye,
    title: "Follow their journey",
    body: "See completed lessons, quiz scores, and time well spent — anytime.",
  },
  {
    icon: LineChart,
    title: "Real learning, measured",
    body: "A curriculum built on real electrical-engineering fundamentals, from electrons to Arduino.",
  },
  {
    icon: ShieldCheck,
    title: "Safe by design",
    body: "No ads, no chat with strangers, and experiments that can't spark anything but curiosity.",
  },
];

function ParentInfo() {
  return (
    <section aria-labelledby="parents-heading" className="mx-auto w-full max-w-6xl px-4 py-16">
      <h2 id="parents-heading" className="text-center font-display text-3xl font-extrabold sm:text-4xl">
        For Parents
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {PARENT_POINTS.map((point) => (
          <li key={point.title}>
            <Card accent="blue" className="h-full text-center">
              <point.icon aria-hidden="true" className="mx-auto h-10 w-10 text-spark-blue" strokeWidth={2.2} />
              <h3 className="mt-3 font-display text-xl font-bold">{point.title}</h3>
              <p className="mt-2 text-muted">{point.body}</p>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <ButtonLink href="/parents" variant="outline">
          Visit the parent dashboard
        </ButtonLink>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-8 text-center">
      <Card accent="yellow" className="py-10">
        <SparkBot mood="excited" size={140} className="mx-auto" />
        <h2 className="mt-4 font-display text-3xl font-extrabold">
          My spaceship won&apos;t fix itself!
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          Six broken systems, one future engineer (that&apos;s you). Start with
          World 1 and let&apos;s get this ship flying again.
        </p>
        <ButtonLink href="/learn" size="lg" className="mt-6">
          <Zap aria-hidden="true" className="h-5 w-5" />
          Begin the mission
        </ButtonLink>
      </Card>
    </section>
  );
}
