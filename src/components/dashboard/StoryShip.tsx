"use client";

import { cn } from "@/lib/utils";
import { worlds } from "@/data/worlds";

interface StoryShipProps {
  /** World ids that are completed (their ship part is repaired). */
  repairedWorldIds: number[];
  className?: string;
}

/**
 * SparkBot's crashed spaceship. Each world repairs one part; repaired parts
 * glow. Fully repaired = ready for liftoff!
 */
export function StoryShip({ repairedWorldIds, className }: StoryShipProps) {
  const repaired = (id: number) => repairedWorldIds.includes(id);
  const allFixed = repairedWorldIds.length >= worlds.length;

  return (
    <figure className={cn("text-center", className)}>
      <svg
        viewBox="0 0 360 260"
        role="img"
        aria-label={`SparkBot's spaceship with ${repairedWorldIds.length} of ${worlds.length} parts repaired`}
        className="mx-auto w-full max-w-md"
      >
        {/* ground / crash crater */}
        {!allFixed && (
          <ellipse cx="180" cy="238" rx="150" ry="14" fill="var(--spark-orange-soft)" />
        )}

        <g className={allFixed ? "animate-spark-float" : undefined}>
          {/* shield bubble — world 5 */}
          <ellipse
            cx="180"
            cy="130"
            rx="120"
            ry="105"
            fill="var(--spark-blue)"
            opacity={repaired(5) ? 0.12 : 0}
            stroke={repaired(5) ? "var(--spark-blue)" : "none"}
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* thruster flames — world 4 */}
          {repaired(4) && (
            <g className="animate-spark-glow">
              <path d="M140 218 q6 26 14 30 q4 -16 0 -30 z" fill="var(--spark-orange)" />
              <path d="M206 218 q6 26 14 30 q4 -16 0 -30 z" fill="var(--spark-orange)" />
            </g>
          )}

          {/* legs */}
          <line x1="140" y1="200" x2="120" y2="232" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />
          <line x1="220" y1="200" x2="240" y2="232" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />

          {/* body */}
          <path
            d="M180 30 q56 36 56 110 q0 50 -22 70 h-68 q-22 -20 -22 -70 q0 -74 56 -110 z"
            fill="var(--surface)"
            stroke="var(--foreground)"
            strokeWidth="3"
          />

          {/* nose antenna / launch computer — world 6 */}
          <line x1="180" y1="30" x2="180" y2="10" stroke="var(--foreground)" strokeWidth="3" />
          <circle cx="180" cy="8" r="6" fill={repaired(6) ? "var(--spark-green)" : "var(--muted)"} className={repaired(6) ? "animate-spark-glow" : undefined} />

          {/* navigation dish — world 2 */}
          <g transform="translate(238, 90)">
            <ellipse cx="0" cy="0" rx="14" ry="9" transform="rotate(-30)" fill={repaired(2) ? "var(--spark-yellow)" : "var(--border)"} stroke="var(--foreground)" strokeWidth="2" />
            <line x1="-8" y1="6" x2="-18" y2="16" stroke="var(--foreground)" strokeWidth="3" />
          </g>

          {/* window / control panel — world 3 */}
          <circle cx="180" cy="92" r="24" fill={repaired(3) ? "var(--spark-blue-soft)" : "var(--border)"} stroke="var(--foreground)" strokeWidth="3" />
          {repaired(3) ? (
            <g>
              <circle cx="172" cy="88" r="3.5" fill="var(--spark-green)" />
              <circle cx="188" cy="88" r="3.5" fill="var(--spark-yellow)" />
              <rect x="170" y="98" width="20" height="4" rx="2" fill="var(--spark-orange)" />
            </g>
          ) : (
            <path d="M170 84 l20 16 M190 84 l-20 16" stroke="var(--muted)" strokeWidth="2.5" />
          )}

          {/* power core — world 1 */}
          <circle
            cx="180"
            cy="160"
            r="20"
            fill={repaired(1) ? "var(--spark-yellow)" : "var(--border)"}
            stroke="var(--foreground)"
            strokeWidth="3"
            className={repaired(1) ? "animate-spark-glow" : undefined}
          />
          <path
            d="M184 148 l-10 13 h7 l-4 11 12 -14 h-7 l5 -10 z"
            fill={repaired(1) ? "var(--spark-orange)" : "var(--muted)"}
          />

          {/* thruster cones — world 4 */}
          <path d="M132 200 h24 l-4 18 h-16 z" fill={repaired(4) ? "var(--spark-blue)" : "var(--border)"} stroke="var(--foreground)" strokeWidth="2.5" />
          <path d="M204 200 h24 l-4 18 h-16 z" fill={repaired(4) ? "var(--spark-blue)" : "var(--border)"} stroke="var(--foreground)" strokeWidth="2.5" />

          {/* crash smoke when nothing fixed */}
          {repairedWorldIds.length === 0 && (
            <g className="animate-spark-glow" opacity="0.8">
              <circle cx="252" cy="170" r="10" fill="var(--muted)" opacity="0.4" />
              <circle cx="266" cy="152" r="13" fill="var(--muted)" opacity="0.3" />
              <circle cx="282" cy="130" r="16" fill="var(--muted)" opacity="0.2" />
            </g>
          )}
        </g>
      </svg>
      <figcaption className="mt-1 font-display text-sm font-bold text-muted">
        {allFixed
          ? "🚀 Ship fully repaired — ready for liftoff!"
          : `${repairedWorldIds.length} of ${worlds.length} ship systems repaired`}
      </figcaption>
    </figure>
  );
}
