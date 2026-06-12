import {
  BatterySymbol,
  CurrentFlow,
  LedSymbol,
  ResistorSymbol,
  SwitchSymbol,
  Wire,
} from "@/components/lessons/circuit-symbols";
import type { CircuitFigureId } from "@/types";

/**
 * Small named circuit drawings used by circuit-identification quiz questions.
 * Each has a text description for screen readers.
 */
export function CircuitFigure({ figure }: { figure: CircuitFigureId }) {
  const { svg, description } = FIGURES[figure];
  return (
    <figure className="mx-auto w-full max-w-sm rounded-2xl border-2 border-border bg-surface p-3">
      <svg viewBox="0 0 320 180" role="img" aria-label={description}>
        {svg}
      </svg>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}

/** Rectangular loop with openings for a left battery and top components. */
function LoopWires({ bottomGap = false }: { bottomGap?: boolean }) {
  return (
    <>
      <Wire d="M40 74 L40 40 L100 40" />
      <Wire d="M40 106 L40 140 L120 140" />
      {bottomGap ? (
        <>
          <Wire d="M120 140 L150 140" />
          <Wire d="M180 140 L280 140 L280 40 L220 40" />
        </>
      ) : (
        <Wire d="M120 140 L280 140 L280 40 L220 40" />
      )}
    </>
  );
}

const FIGURES: Record<
  CircuitFigureId,
  { svg: React.ReactNode; description: string }
> = {
  "closed-loop": {
    description:
      "A complete circuit loop: a battery connected by wires through a resistor and an LED. The LED is glowing and current flows around the loop.",
    svg: (
      <>
        <LoopWires />
        <Wire d="M100 40 L142 40" />
        <Wire d="M178 40 L192 40" />
        <BatterySymbol x={40} y={90} />
        <ResistorSymbol x={160} y={40} />
        <LedSymbol x={206} y={40} lit />
        <CurrentFlow d="M40 74 L40 40 L100 40 M220 40 L280 40 L280 140 L40 140 L40 106" />
      </>
    ),
  },
  "open-loop": {
    description:
      "A circuit with a battery, resistor, and LED, but the bottom wire has a gap. The LED is dark because the loop is not complete.",
    svg: (
      <>
        <LoopWires bottomGap />
        <Wire d="M100 40 L142 40" />
        <Wire d="M178 40 L192 40" />
        <BatterySymbol x={40} y={90} />
        <ResistorSymbol x={160} y={40} />
        <LedSymbol x={206} y={40} lit={false} />
        <text x="165" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--spark-red)">
          gap!
        </text>
      </>
    ),
  },
  "led-backwards": {
    description:
      "A circuit with a battery and resistor where the LED is connected backwards. The LED is dark because diodes only allow current in one direction.",
    svg: (
      <>
        <LoopWires />
        <Wire d="M100 40 L142 40" />
        <Wire d="M178 40 L192 40" />
        <BatterySymbol x={40} y={90} />
        <ResistorSymbol x={160} y={40} />
        <LedSymbol x={206} y={40} lit={false} reversed />
        <text x="206" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)">
          flipped
        </text>
      </>
    ),
  },
  "missing-resistor": {
    description:
      "A battery connected directly to an LED with no resistor. The LED is glowing dangerously bright with a warning mark.",
    svg: (
      <>
        <LoopWires />
        <Wire d="M100 40 L192 40" />
        <BatterySymbol x={40} y={90} />
        <LedSymbol x={206} y={40} lit />
        <circle cx="206" cy="40" r="22" fill="var(--spark-red)" opacity="0.25" />
        <text x="240" y="24" fontSize="20" fontWeight="800" fill="var(--spark-red)">
          !
        </text>
        <CurrentFlow d="M40 74 L40 40 L192 40" />
      </>
    ),
  },
  "series-two-leds": {
    description:
      "Two LEDs connected in series in a single loop with a battery and resistor. Both LEDs glow dimly because they share the voltage.",
    svg: (
      <>
        <LoopWires />
        <Wire d="M100 40 L112 40" />
        <Wire d="M148 40 L156 40" />
        <Wire d="M192 40 L206 40" />
        <BatterySymbol x={40} y={90} />
        <ResistorSymbol x={130} y={40} />
        <g opacity="0.6">
          <LedSymbol x={170} y={40} lit />
        </g>
        <g opacity="0.6">
          <LedSymbol x={220} y={40} lit />
        </g>
      </>
    ),
  },
  "parallel-two-leds": {
    description:
      "Two LEDs in parallel branches, each with its own resistor and switch. Each branch connects separately across the battery.",
    svg: (
      <>
        <BatterySymbol x={30} y={90} />
        <Wire d="M30 74 L30 30 L90 30" />
        <Wire d="M30 106 L30 150 L290 150 L290 30 L250 30" />
        {/* top branch */}
        <Wire d="M90 30 L122 30" />
        <Wire d="M158 30 L186 30" />
        <ResistorSymbol x={140} y={30} />
        <LedSymbol x={200} y={30} lit />
        <Wire d="M214 30 L250 30" />
        {/* second branch */}
        <Wire d="M90 30 L90 90 L122 90" />
        <Wire d="M158 90 L186 90" />
        <ResistorSymbol x={140} y={90} />
        <LedSymbol x={200} y={90} lit />
        <Wire d="M214 90 L250 90 L250 30" />
      </>
    ),
  },
  "switch-open": {
    description:
      "A circuit with a battery, resistor, LED, and a switch in the open position. The LED is dark because the open switch leaves a gap.",
    svg: (
      <>
        <Wire d="M40 74 L40 40 L100 40" />
        <Wire d="M40 106 L40 140 L130 140" />
        <Wire d="M174 140 L280 140 L280 40 L220 40" />
        <Wire d="M100 40 L142 40" />
        <Wire d="M178 40 L192 40" />
        <BatterySymbol x={40} y={90} />
        <ResistorSymbol x={160} y={40} />
        <LedSymbol x={206} y={40} lit={false} />
        <SwitchSymbol x={152} y={140} closed={false} />
        <text x="152" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)">
          switch open
        </text>
      </>
    ),
  },
  "short-circuit": {
    description:
      "A battery whose terminals are connected by a bare wire with no components. A red warning shows this is a dangerous short circuit.",
    svg: (
      <>
        <Wire d="M40 74 L40 40 L280 40 L280 140 L40 140 L40 106" />
        <BatterySymbol x={40} y={90} />
        <CurrentFlow d="M40 74 L40 40 L280 40 L280 140 L40 140 L40 106" />
        <text x="160" y="100" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--spark-red)">
          ⚠ short circuit!
        </text>
      </>
    ),
  },
};
