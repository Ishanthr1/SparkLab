/* ---------------------------------- Curriculum ---------------------------------- */

export type WorldColor =
  | "blue"
  | "yellow"
  | "orange"
  | "green"
  | "purple"
  | "red";

export interface World {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  color: WorldColor;
  /** Story mode: the spaceship part this world repairs. */
  shipPart: {
    name: string;
    repairMessage: string;
  };
  lessons: Lesson[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  xpReward: number;
  minutes: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

/** Named hand-drawn SVG diagrams rendered by <LessonDiagram>. */
export type DiagramId =
  | "atom"
  | "electron-flow"
  | "water-current"
  | "water-pressure"
  | "resistance-pipe"
  | "open-vs-closed"
  | "conductor-insulator"
  | "battery-anatomy"
  | "led-anatomy"
  | "resistor-bands"
  | "switch-anatomy"
  | "series-circuit"
  | "parallel-circuit"
  | "flashlight-exploded"
  | "alarm-circuit"
  | "traffic-light"
  | "arduino-board"
  | "sensor-loop"
  | "robot-parts";

/** Named interactive widgets rendered by <LessonInteractive>. */
export type WidgetId =
  | "static-balloon"
  | "electron-pump"
  | "voltage-slider"
  | "resistance-dimmer"
  | "switch-loop"
  | "conductor-tester"
  | "battery-stack"
  | "led-polarity"
  | "series-parallel-lab"
  | "code-blink";

export type LessonSection =
  | { type: "spark"; text: string; mood?: SparkMood }
  | { type: "text"; heading?: string; body: string }
  | { type: "fact"; title: string; body: string }
  | { type: "analogy"; title: string; body: string }
  | { type: "diagram"; diagram: DiagramId; caption: string }
  | { type: "interactive"; widget: WidgetId; prompt: string }
  | { type: "realWorld"; title: string; body: string }
  | { type: "tryIt"; body: string };

/* ------------------------------------ Quizzes ------------------------------------ */

/** Small named circuit figures used by circuit-identification questions. */
export type CircuitFigureId =
  | "closed-loop"
  | "open-loop"
  | "led-backwards"
  | "missing-resistor"
  | "series-two-leds"
  | "parallel-two-leds"
  | "switch-open"
  | "short-circuit";

interface QuizBase {
  id: string;
  prompt: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends QuizBase {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends QuizBase {
  type: "true-false";
  answer: boolean;
}

export interface MatchQuestion extends QuizBase {
  type: "match";
  pairs: { left: string; right: string }[];
}

export interface CircuitIdQuestion extends QuizBase {
  type: "circuit-id";
  figure: CircuitFigureId;
  options: string[];
  correctIndex: number;
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchQuestion
  | CircuitIdQuestion;

/* ---------------------------------- Gamification --------------------------------- */

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  /** Lucide icon name key, mapped in the badge component. */
  icon: string;
  color: WorldColor;
}

export interface LevelMilestone {
  level: number;
  title: string;
}

export type XpSource = "lesson" | "quiz" | "build";

export interface XpEvent {
  date: string; // ISO
  amount: number;
  source: XpSource;
  refId: string;
}

export interface LessonResult {
  completedAt: string; // ISO
  quizScore: number;
  quizTotal: number;
}

export interface ProgressState {
  xp: number;
  xpLog: XpEvent[];
  completedLessons: Record<string, LessonResult>;
  earnedBadges: Record<string, string>; // badge id -> ISO date earned
  simBuilds: number;
  simLedLit: boolean;
  streak: {
    current: number;
    best: number;
    lastActiveDay: string; // YYYY-MM-DD
  };
}

/* ----------------------------------- Simulator ----------------------------------- */

export type ComponentKind = "battery" | "led" | "resistor" | "switch" | "wire";

export interface PlacedComponent {
  id: string;
  kind: ComponentKind;
  /** Grid cell of the component's first terminal. */
  col: number;
  row: number;
  /** false = horizontal (spans right), true = vertical (spans down). */
  vertical: boolean;
  /**
   * Swaps the polarity terminals (battery +/−, LED anode/cathode) to the
   * other end. Only meaningful for polarized components.
   */
  flipped?: boolean;
  /** Switches only: whether the switch is closed. */
  closed?: boolean;
}

export type SimulationStatus =
  | "empty"
  | "no-battery"
  | "no-led"
  | "open-circuit"
  | "led-backwards"
  | "switch-open"
  | "short-circuit"
  | "lit-bright"
  | "lit-safe";

export interface SimulationResult {
  status: SimulationStatus;
  litLedIds: string[];
  /** Components carrying current, for flow animation. */
  activeIds: string[];
  hint: string;
}

/* ------------------------------------ Mascot ------------------------------------- */

export type SparkMood =
  | "happy"
  | "excited"
  | "thinking"
  | "oops"
  | "cheering"
  | "explaining";

/* ------------------------------------ AI Tutor ----------------------------------- */

export interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}
