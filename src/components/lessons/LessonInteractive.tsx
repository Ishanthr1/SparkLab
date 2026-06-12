"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { WidgetId } from "@/types";

interface LessonInteractiveProps {
  widget: WidgetId;
  prompt: string;
}

/** Interactive mini-experiments embedded in lessons, keyed by widget id. */
export function LessonInteractive({ widget, prompt }: LessonInteractiveProps) {
  const Widget = WIDGETS[widget];
  return (
    <section className="mx-auto w-full max-w-xl rounded-card border-2 border-spark-blue bg-spark-blue-soft/40 p-5">
      <h3 className="font-display text-lg font-bold text-spark-blue-deep">
        🔬 Try it yourself
      </h3>
      <p className="mt-1 text-sm font-semibold text-muted">{prompt}</p>
      <div className="mt-4 rounded-2xl bg-surface p-4">
        <Widget />
      </div>
    </section>
  );
}

/* ------------------------------ shared pieces ------------------------------ */

function GlowBulb({ brightness, size = 64 }: { brightness: number; size?: number }) {
  const b = Math.min(1, Math.max(0, brightness));
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true">
      {b > 0.02 && (
        <circle cx="40" cy="36" r={20 + b * 14} fill="var(--spark-yellow)" opacity={0.15 + b * 0.45} />
      )}
      <circle
        cx="40"
        cy="36"
        r="18"
        fill={b > 0.02 ? `rgba(255, 200, 0, ${0.25 + b * 0.75})` : "var(--surface)"}
        stroke="var(--foreground)"
        strokeWidth="2.5"
      />
      <path d="M33 48 h14 v8 a7 7 0 0 1 -14 0 z" fill="var(--muted)" />
      <path d="M33 30 q7 10 14 0" fill="none" stroke="var(--foreground)" strokeWidth="2" />
    </svg>
  );
}

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-baseline justify-between gap-4 rounded-lg bg-background px-3 py-1.5 text-sm">
      <span className="font-semibold text-muted">{label}</span>
      <span className="font-display text-lg font-bold">{value}</span>
    </p>
  );
}

/* -------------------------------- widgets --------------------------------- */

function StaticBalloon() {
  const [charge, setCharge] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 200 120" width="220" aria-hidden="true">
        <ellipse cx="70" cy="55" rx="38" ry="46" fill="var(--spark-red)" opacity="0.85" />
        <path d="M70 101 l-6 10 h12 z" fill="var(--spark-red)" />
        {[...Array(Math.min(charge, 8))].map((_, i) => (
          <text
            key={i}
            x={48 + (i % 4) * 15}
            y={40 + Math.floor(i / 4) * 30}
            fontSize="14"
            fontWeight="800"
            fill="#fff"
          >
            −
          </text>
        ))}
        <rect x="150" y="10" width="14" height="100" fill="var(--border)" />
        {result === "stick" && (
          <text x="118" y="60" fontSize="22" aria-hidden="true">
            ✨
          </text>
        )}
      </svg>
      <p aria-live="polite" className="min-h-6 text-center text-sm font-semibold">
        {result === "stick"
          ? "ZAP! The charged balloon clings to the wall — static electricity!"
          : result === "nothing"
            ? "Nothing happens... the balloon has no charge yet. Try rubbing it first!"
            : `Charge collected: ${charge} ${charge === 1 ? "electron" : "electrons"}`}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setCharge((c) => c + 1);
            setResult(null);
          }}
        >
          Rub on sweater
        </Button>
        <Button size="sm" onClick={() => setResult(charge >= 3 ? "stick" : "nothing")}>
          Bring near wall
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setCharge(0);
            setResult(null);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function ElectronPump() {
  const [pumping, setPumping] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 300 70" width="100%" aria-hidden="true">
        <rect x="10" y="20" width="280" height="30" rx="14" fill="var(--spark-blue-soft)" />
        {[...Array(7)].map((_, i) => (
          <g key={i}>
            <circle cx={35 + i * 40} cy={35} r="9" fill="var(--spark-blue)">
              {pumping && (
                <animate
                  attributeName="cx"
                  values={`${35 + i * 40};${75 + i * 40}`}
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        ))}
      </svg>
      <p aria-live="polite" className="text-sm font-semibold">
        {pumping
          ? "Electrons on the move — each one nudges the next. That's current!"
          : "The electrons are waiting for a push..."}
      </p>
      <Button
        size="sm"
        onClick={() => setPumping((p) => !p)}
        aria-pressed={pumping}
      >
        {pumping ? "Stop the pump" : "Pump the electrons"}
      </Button>
    </div>
  );
}

function VoltageSlider() {
  const [volts, setVolts] = useState(3);
  const brightness = volts / 9;

  return (
    <div className="flex flex-col items-center gap-3">
      <GlowBulb brightness={brightness} />
      <label className="w-full max-w-xs">
        <span className="mb-1 block text-center text-sm font-bold">
          Voltage: {volts} V
        </span>
        <input
          type="range"
          min={0}
          max={9}
          step={1}
          value={volts}
          onChange={(e) => setVolts(Number(e.target.value))}
          className="w-full accent-[var(--spark-blue)]"
        />
      </label>
      <div className="w-full max-w-xs space-y-1">
        <ReadoutRow label="Push (voltage)" value={`${volts} V`} />
        <ReadoutRow
          label="Electron speed"
          value={volts === 0 ? "stopped" : volts < 4 ? "strolling" : volts < 7 ? "jogging" : "racing!"}
        />
      </div>
    </div>
  );
}

function ResistanceDimmer() {
  const [ohms, setOhms] = useState(300);
  const volts = 9;
  const currentMa = (volts / ohms) * 1000;
  // ~30 mA is full brightness for our pretend LED.
  const brightness = Math.min(1, currentMa / 30);

  return (
    <div className="flex flex-col items-center gap-3">
      <GlowBulb brightness={brightness} />
      <label className="w-full max-w-xs">
        <span className="mb-1 block text-center text-sm font-bold">
          Resistance: {ohms} Ω
        </span>
        <input
          type="range"
          min={300}
          max={3000}
          step={100}
          value={ohms}
          onChange={(e) => setOhms(Number(e.target.value))}
          className="w-full accent-[var(--spark-orange)]"
        />
      </label>
      <div className="w-full max-w-xs space-y-1">
        <ReadoutRow label="Battery push" value={`${volts} V`} />
        <ReadoutRow label="Current (9 V ÷ ohms)" value={`${currentMa.toFixed(1)} mA`} />
        <ReadoutRow label="Brightness" value={brightness > 0.8 ? "bright!" : brightness > 0.4 ? "medium" : "dim"} />
      </div>
    </div>
  );
}

function SwitchLoop() {
  const [closed, setClosed] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 280 130" width="260" aria-hidden="true">
        <path d="M40 90 L40 40 L110 40" fill="none" stroke="var(--foreground)" strokeWidth="2.5" />
        <path d="M40 110 L40 120 L130 120" fill="none" stroke="var(--foreground)" strokeWidth="2.5" />
        <path d="M174 120 L250 120 L250 40 L150 40" fill="none" stroke="var(--foreground)" strokeWidth="2.5" />
        <line x1="40" y1="84" x2="40" y2="104" stroke="var(--foreground)" strokeWidth="3" />
        <line x1="34" y1="90" x2="46" y2="90" stroke="var(--foreground)" strokeWidth="6" />
        {/* bulb */}
        <g transform="translate(130, 40)">
          {closed && <circle r="16" fill="var(--spark-yellow)" opacity="0.5" />}
          <circle r="11" fill={closed ? "var(--spark-yellow-soft)" : "var(--surface)"} stroke="var(--foreground)" strokeWidth="2.5" />
          <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--foreground)" strokeWidth="2" />
        </g>
        {/* switch */}
        <circle cx="134" cy="120" r="4" fill="var(--foreground)" />
        <circle cx="170" cy="120" r="4" fill="var(--foreground)" />
        <line
          x1="134"
          y1="120"
          x2={closed ? 170 : 162}
          y2={closed ? 120 : 98}
          stroke={closed ? "var(--spark-green)" : "var(--spark-orange)"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {closed && (
          <path
            d="M40 84 L40 40 L110 40 M150 40 L250 40 L250 120 L174 120"
            fill="none"
            stroke="var(--spark-blue)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-spark-dash"
          />
        )}
      </svg>
      <p aria-live="polite" className="text-sm font-semibold">
        {closed ? "Loop closed — current flows and the bulb shines!" : "Loop open — every electron frozen in place."}
      </p>
      <Button size="sm" onClick={() => setClosed((c) => !c)} aria-pressed={closed}>
        {closed ? "Open the switch" : "Close the switch"}
      </Button>
    </div>
  );
}

const TEST_OBJECTS = [
  { name: "Copper coin", conducts: true },
  { name: "Rubber band", conducts: false },
  { name: "Metal key", conducts: true },
  { name: "Plastic spoon", conducts: false },
  { name: "Aluminum foil", conducts: true },
  { name: "Glass marble", conducts: false },
];

function ConductorTester() {
  const [selected, setSelected] = useState<number | null>(null);
  const obj = selected === null ? null : TEST_OBJECTS[selected];

  return (
    <div className="flex flex-col items-center gap-3">
      <GlowBulb brightness={obj?.conducts ? 1 : 0} size={56} />
      <p aria-live="polite" className="min-h-6 text-center text-sm font-semibold">
        {obj
          ? obj.conducts
            ? `${obj.name}: the bulb lights — CONDUCTOR! ⚡`
            : `${obj.name}: nothing happens — insulator. 🚫`
          : "Pick an object to put in the test circuit."}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TEST_OBJECTS.map((o, i) => (
          <button
            key={o.name}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            className={cn(
              "rounded-xl border-2 px-3 py-2 text-sm font-bold transition-colors",
              selected === i
                ? "border-spark-blue bg-spark-blue-soft"
                : "border-border bg-surface hover:border-spark-blue",
            )}
          >
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function BatteryStack() {
  const [count, setCount] = useState(1);
  const volts = count * 1.5;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-1" aria-hidden="true">
        {[...Array(count)].map((_, i) => (
          <svg key={i} viewBox="0 0 36 60" width="32">
            <rect x="4" y="10" width="28" height="46" rx="5" fill="var(--spark-green-soft)" stroke="var(--foreground)" strokeWidth="2" />
            <rect x="13" y="4" width="10" height="6" fill="var(--foreground)" />
            <text x="18" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--foreground)">
              1.5V
            </text>
          </svg>
        ))}
        <GlowBulb brightness={volts / 6} size={56} />
      </div>
      <ReadoutRow label="Total push" value={`${volts.toFixed(1)} V`} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={count <= 1} onClick={() => setCount((c) => c - 1)}>
          − Remove battery
        </Button>
        <Button size="sm" disabled={count >= 4} onClick={() => setCount((c) => c + 1)}>
          + Add battery
        </Button>
      </div>
    </div>
  );
}

function LedPolarity() {
  const [flipped, setFlipped] = useState(false);
  const lit = !flipped;
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 240 90" width="240" aria-hidden="true">
        <path d="M20 45 h60" stroke="var(--foreground)" strokeWidth="2.5" />
        <path d="M160 45 h60" stroke="var(--foreground)" strokeWidth="2.5" />
        <text x="10" y="38" fontSize="16" fontWeight="800" fill="var(--spark-red)">+</text>
        <text x="226" y="38" fontSize="16" fontWeight="800" fill="var(--spark-blue)">−</text>
        <g transform={`translate(120, 45)${flipped ? " scale(-1,1)" : ""}`}>
          {lit && <circle r="22" fill="var(--spark-yellow)" opacity="0.5" />}
          <polygon
            points="-14,-16 -14,16 14,0"
            fill={lit ? "var(--spark-orange)" : "var(--surface)"}
            stroke="var(--foreground)"
            strokeWidth="2.5"
          />
          <line x1="14" y1="-16" x2="14" y2="16" stroke="var(--foreground)" strokeWidth="2.5" />
        </g>
        <path d="M80 45 h26" stroke="var(--foreground)" strokeWidth="2.5" />
        <path d="M134 45 h26" stroke="var(--foreground)" strokeWidth="2.5" />
      </svg>
      <p aria-live="polite" className="text-sm font-semibold">
        {lit
          ? "Long leg toward + : current passes, LED glows!"
          : "Flipped backwards: the one-way door is shut. No light."}
      </p>
      <Button size="sm" onClick={() => setFlipped((f) => !f)}>
        Flip the LED around
      </Button>
    </div>
  );
}

function SeriesParallelLab() {
  const [mode, setMode] = useState<"series" | "parallel">("series");
  const [bulbs, setBulbs] = useState(2);
  const [broken, setBroken] = useState(false);

  const brightness = (i: number) => {
    if (broken && (mode === "series" || i === 0)) return 0;
    return mode === "series" ? 1 / bulbs : 1;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex rounded-full border-2 border-border p-1"
        role="radiogroup"
        aria-label="Wiring mode"
      >
        {(["series", "parallel"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => {
              setMode(m);
              setBroken(false);
            }}
            className={cn(
              "rounded-full px-4 py-1.5 font-display text-sm font-bold capitalize",
              mode === m ? "bg-spark-blue text-white" : "text-muted",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {[...Array(bulbs)].map((_, i) => (
          <GlowBulb key={i} brightness={brightness(i)} size={52} />
        ))}
      </div>
      <p aria-live="polite" className="min-h-10 max-w-sm text-center text-sm font-semibold">
        {broken
          ? mode === "series"
            ? "Bulb 1 broke — and the single path broke with it. ALL bulbs dark!"
            : "Bulb 1 broke — but every other lane keeps shining. Parallel power!"
          : mode === "series"
            ? `One path shared by ${bulbs} bulbs — each gets 1/${bulbs} of the push.`
            : `${bulbs} separate lanes — every bulb gets the full push.`}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button size="sm" variant="outline" disabled={bulbs <= 1} onClick={() => { setBulbs((b) => b - 1); setBroken(false); }}>
          − Bulb
        </Button>
        <Button size="sm" variant="outline" disabled={bulbs >= 4} onClick={() => { setBulbs((b) => b + 1); setBroken(false); }}>
          + Bulb
        </Button>
        <Button size="sm" variant="danger" onClick={() => setBroken(true)} disabled={broken}>
          Break bulb 1
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setBroken(false)} disabled={!broken}>
          Fix it
        </Button>
      </div>
    </div>
  );
}

function CodeBlink() {
  const [onMs, setOnMs] = useState(500);
  const [offMs, setOffMs] = useState(500);
  const [lit, setLit] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let current = false;
    function tick() {
      current = !current;
      setLit(current);
      timer.current = setTimeout(tick, current ? onMs : offMs);
    }
    // Restart the blink cycle (asynchronously) whenever the timings change.
    timer.current = setTimeout(tick, 0);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [onMs, offMs]);

  return (
    <div className="flex flex-col items-center gap-3">
      <GlowBulb brightness={lit ? 1 : 0} size={56} />
      <pre className="w-full max-w-xs rounded-xl bg-foreground p-3 text-xs font-bold leading-relaxed text-spark-yellow">
        {`repeat forever:\n  turn LED on\n  wait ${(onMs / 1000).toFixed(1)} seconds\n  turn LED off\n  wait ${(offMs / 1000).toFixed(1)} seconds`}
      </pre>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3">
        <label className="text-sm font-bold">
          ON time: {(onMs / 1000).toFixed(1)}s
          <input
            type="range"
            min={100}
            max={2000}
            step={100}
            value={onMs}
            onChange={(e) => setOnMs(Number(e.target.value))}
            className="w-full accent-[var(--spark-green)]"
          />
        </label>
        <label className="text-sm font-bold">
          OFF time: {(offMs / 1000).toFixed(1)}s
          <input
            type="range"
            min={100}
            max={2000}
            step={100}
            value={offMs}
            onChange={(e) => setOffMs(Number(e.target.value))}
            className="w-full accent-[var(--spark-red)]"
          />
        </label>
      </div>
    </div>
  );
}

const WIDGETS: Record<WidgetId, () => React.ReactNode> = {
  "static-balloon": StaticBalloon,
  "electron-pump": ElectronPump,
  "voltage-slider": VoltageSlider,
  "resistance-dimmer": ResistanceDimmer,
  "switch-loop": SwitchLoop,
  "conductor-tester": ConductorTester,
  "battery-stack": BatteryStack,
  "led-polarity": LedPolarity,
  "series-parallel-lab": SeriesParallelLab,
  "code-blink": CodeBlink,
};
