import { cn } from "@/lib/utils";
import type { SparkMood } from "@/types";

interface SparkBotProps {
  mood?: SparkMood;
  /** Pixel size of the square SVG. */
  size?: number;
  className?: string;
  /** Disable the idle floating animation (e.g. inline in text). */
  still?: boolean;
}

/**
 * SparkBot, the platform mascot: a friendly robot drawn in code so every
 * mood is crisp at any size. Decorative by default; pages that use SparkBot
 * to convey information should pair it with visible text.
 */
export function SparkBot({
  mood = "happy",
  size = 160,
  className,
  still = false,
}: SparkBotProps) {
  return (
    <span
      className={cn(
        "inline-block select-none",
        !still && "animate-spark-float",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {/* Antenna with glowing spark */}
        <line
          x1="100"
          y1="38"
          x2="100"
          y2="22"
          stroke="var(--spark-blue-deep)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className="animate-spark-glow">
          <circle cx="100" cy="16" r="9" fill="var(--spark-yellow)" />
          <path
            d="M100 9 l-4 8 h4 l-2 6 6 -9 h-4 l3 -5 z"
            fill="var(--spark-orange)"
          />
        </g>

        {/* Arms (pose depends on mood) */}
        <Arms mood={mood} />

        {/* Body */}
        <rect
          x="58"
          y="118"
          width="84"
          height="58"
          rx="20"
          fill="var(--spark-blue)"
        />
        <rect
          x="70"
          y="130"
          width="60"
          height="34"
          rx="12"
          fill="var(--spark-blue-soft)"
        />
        {/* Chest bolt */}
        <path
          d="M104 134 l-12 16 h9 l-5 12 14 -17 h-9 l6 -11 z"
          fill="var(--spark-orange)"
        />

        {/* Head */}
        <rect
          x="48"
          y="38"
          width="104"
          height="78"
          rx="26"
          fill="var(--spark-blue)"
        />
        <rect
          x="58"
          y="48"
          width="84"
          height="58"
          rx="18"
          fill="#ffffff"
        />

        {/* Ears */}
        <circle cx="46" cy="77" r="9" fill="var(--spark-yellow)" />
        <circle cx="154" cy="77" r="9" fill="var(--spark-yellow)" />

        <Face mood={mood} />

        {/* Wheels / base */}
        <circle cx="78" cy="182" r="10" fill="var(--spark-blue-deep)" />
        <circle cx="122" cy="182" r="10" fill="var(--spark-blue-deep)" />
      </svg>
    </span>
  );
}

function Face({ mood }: { mood: SparkMood }) {
  const eyes = (() => {
    switch (mood) {
      case "excited":
      case "cheering":
        // Sparkly star eyes
        return (
          <>
            <Star cx={80} cy={72} />
            <Star cx={120} cy={72} />
          </>
        );
      case "thinking":
        return (
          <>
            <circle cx="80" cy="70" r="7" fill="var(--spark-blue-deep)" />
            <circle cx="120" cy="74" r="7" fill="var(--spark-blue-deep)" />
            <circle cx="82" cy="68" r="2.4" fill="#fff" />
            <circle cx="122" cy="72" r="2.4" fill="#fff" />
          </>
        );
      case "oops":
        return (
          <>
            <circle cx="80" cy="72" r="9" fill="var(--spark-blue-deep)" />
            <circle cx="120" cy="72" r="9" fill="var(--spark-blue-deep)" />
            <circle cx="83" cy="69" r="3" fill="#fff" />
            <circle cx="123" cy="69" r="3" fill="#fff" />
          </>
        );
      default:
        return (
          <g className="animate-spark-blink">
            <circle cx="80" cy="72" r="8" fill="var(--spark-blue-deep)" />
            <circle cx="120" cy="72" r="8" fill="var(--spark-blue-deep)" />
            <circle cx="83" cy="69" r="2.6" fill="#fff" />
            <circle cx="123" cy="69" r="2.6" fill="#fff" />
          </g>
        );
    }
  })();

  const mouth = (() => {
    switch (mood) {
      case "excited":
      case "cheering":
        return (
          <path
            d="M84 88 q16 16 32 0 v4 q-16 12 -32 0 z"
            fill="var(--spark-blue-deep)"
          />
        );
      case "thinking":
        return (
          <path
            d="M88 94 q10 -4 22 0"
            stroke="var(--spark-blue-deep)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        );
      case "oops":
        return <circle cx="100" cy="93" r="7" fill="var(--spark-blue-deep)" />;
      case "explaining":
        return (
          <path
            d="M86 90 q14 8 28 0"
            stroke="var(--spark-blue-deep)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        );
      default:
        return (
          <path
            d="M84 88 q16 14 32 0"
            stroke="var(--spark-blue-deep)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        );
    }
  })();

  return (
    <>
      {eyes}
      {mouth}
      {/* Blush for happy moods */}
      {(mood === "happy" || mood === "excited" || mood === "cheering") && (
        <>
          <circle cx="68" cy="84" r="5" fill="var(--spark-orange-soft)" />
          <circle cx="132" cy="84" r="5" fill="var(--spark-orange-soft)" />
        </>
      )}
      {/* Sweat drop when puzzled */}
      {mood === "oops" && (
        <path
          d="M140 52 q6 8 0 12 q-6 -4 0 -12"
          fill="var(--spark-blue)"
          opacity="0.7"
        />
      )}
      {/* Thought sparks when thinking */}
      {mood === "thinking" && (
        <g className="animate-spark-glow">
          <circle cx="150" cy="40" r="3" fill="var(--spark-yellow)" />
          <circle cx="160" cy="30" r="4" fill="var(--spark-orange)" />
        </g>
      )}
    </>
  );
}

function Star({ cx, cy }: { cx: number; cy: number }) {
  const points = [...Array(10)]
    .map((_, i) => {
      const r = i % 2 === 0 ? 9 : 3.8;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(" ");
  return <polygon points={points} fill="var(--spark-yellow)" stroke="var(--spark-orange)" strokeWidth="1.5" />;
}

function Arms({ mood }: { mood: SparkMood }) {
  switch (mood) {
    case "cheering":
      // Both arms up
      return (
        <>
          <path
            d="M60 130 q-22 -10 -26 -34"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="34" cy="92" r="10" fill="var(--spark-yellow)" />
          <path
            d="M140 130 q22 -10 26 -34"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="166" cy="92" r="10" fill="var(--spark-yellow)" />
        </>
      );
    case "thinking":
      // One hand to the chin
      return (
        <>
          <path
            d="M62 138 q-18 8 -20 26"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="42" cy="166" r="9" fill="var(--spark-yellow)" />
          <path
            d="M138 132 q22 0 24 -28"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="162" cy="102" r="9" fill="var(--spark-yellow)" />
        </>
      );
    case "explaining":
      // One arm out presenting
      return (
        <>
          <path
            d="M62 138 q-18 8 -20 26"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="42" cy="166" r="9" fill="var(--spark-yellow)" />
          <path
            d="M138 134 q26 -2 34 -14"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="174" cy="118" r="9" fill="var(--spark-yellow)" />
        </>
      );
    case "oops":
      // Hands toward face
      return (
        <>
          <path
            d="M62 134 q-14 -12 -8 -30"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="56" cy="100" r="9" fill="var(--spark-yellow)" />
          <path
            d="M138 134 q14 -12 8 -30"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="144" cy="100" r="9" fill="var(--spark-yellow)" />
        </>
      );
    default:
      // Relaxed wave
      return (
        <>
          <path
            d="M62 138 q-18 8 -20 26"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="42" cy="166" r="9" fill="var(--spark-yellow)" />
          <path
            d="M138 130 q24 -6 28 -26"
            stroke="var(--spark-blue)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="168" cy="100" r="10" fill="var(--spark-yellow)" />
        </>
      );
  }
}
