"use client";

import {
  Battery,
  Lightbulb,
  Minus,
  RotateCw,
  ArrowLeftRight,
  ToggleLeft,
  Trash2,
  Eraser,
  Activity,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RewardModal } from "@/components/gamification/RewardModal";
import { SparkSays } from "@/components/mascot/SparkSays";
import {
  useProgress,
  type RewardSummary,
} from "@/components/providers/ProgressProvider";
import { Button } from "@/components/ui/Button";
import {
  GRID_COLS,
  GRID_ROWS,
  simulate,
  terminals,
} from "@/lib/simulator";
import { cn } from "@/lib/utils";
import type {
  ComponentKind,
  PlacedComponent,
  SimulationStatus,
  SparkMood,
} from "@/types";

const CELL = 56;
const PAD = 30;
const WIDTH = PAD * 2 + CELL * (GRID_COLS - 1);
const HEIGHT = PAD * 2 + CELL * (GRID_ROWS - 1);

const px = (col: number) => PAD + col * CELL;
const py = (row: number) => PAD + row * CELL;

const PALETTE: { kind: ComponentKind; label: string; icon: React.ReactNode }[] = [
  { kind: "battery", label: "Battery", icon: <Battery aria-hidden="true" className="h-5 w-5" /> },
  { kind: "led", label: "LED", icon: <Lightbulb aria-hidden="true" className="h-5 w-5" /> },
  { kind: "resistor", label: "Resistor", icon: <Activity aria-hidden="true" className="h-5 w-5" /> },
  { kind: "switch", label: "Switch", icon: <ToggleLeft aria-hidden="true" className="h-5 w-5" /> },
  { kind: "wire", label: "Wire", icon: <Minus aria-hidden="true" className="h-5 w-5" /> },
];

const STATUS_MOOD: Record<SimulationStatus, SparkMood> = {
  empty: "happy",
  "no-battery": "thinking",
  "no-led": "thinking",
  "open-circuit": "thinking",
  "led-backwards": "oops",
  "switch-open": "explaining",
  "short-circuit": "oops",
  "lit-bright": "excited",
  "lit-safe": "cheering",
};

let nextId = 1;

export function CircuitSimulator() {
  const [components, setComponents] = useState<PlacedComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reward, setReward] = useState<RewardSummary | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ id: string; moved: boolean; dx: number; dy: number } | null>(null);
  const awardedSignatures = useRef<Set<string>>(new Set());
  const wasLit = useRef(false);
  const { recordBuild } = useProgress();

  const sim = useMemo(() => simulate(components), [components]);
  const selected = components.find((c) => c.id === selectedId) ?? null;

  // Award XP when the circuit first lights up, once per distinct layout.
  useEffect(() => {
    const isLit = sim.status === "lit-safe" || sim.status === "lit-bright";
    const justLit = isLit && !wasLit.current;
    wasLit.current = isLit;
    if (!justLit) return;
    const signature = components
      .map((c) => `${c.kind}:${c.col},${c.row},${c.vertical ? 1 : 0},${c.flipped ? 1 : 0}`)
      .sort()
      .join("|");
    if (awardedSignatures.current.has(signature)) return;
    awardedSignatures.current.add(signature);
    const summary = recordBuild(true);
    // "Circuit just lit" is an event that can result from many different
    // interactions (drag, keyboard move, switch toggle), so it's detected
    // here from the simulation result rather than in each handler.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (summary) setReward(summary);
  }, [sim.status, components, recordBuild]);

  const update = useCallback(
    (id: string, patch: Partial<PlacedComponent>) => {
      setComponents((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      );
    },
    [],
  );

  function addComponent(kind: ComponentKind) {
    // Find a free horizontal segment, scanning top-left to bottom-right.
    const occupied = new Set<string>();
    for (const c of components) {
      const t = terminals(c);
      occupied.add(t.a);
      occupied.add(t.b);
    }
    let col = 1;
    let row = 1;
    outer: for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c + 1 < GRID_COLS; c++) {
        if (!occupied.has(`${c},${r}`) && !occupied.has(`${c + 1},${r}`)) {
          col = c;
          row = r;
          break outer;
        }
      }
    }
    const comp: PlacedComponent = {
      id: `c${nextId++}`,
      kind,
      col,
      row,
      vertical: false,
      closed: kind === "switch" ? false : undefined,
    };
    setComponents((prev) => [...prev, comp]);
    setSelectedId(comp.id);
  }

  function removeComponent(id: string) {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    setSelectedId((s) => (s === id ? null : s));
  }

  function clampPosition(c: PlacedComponent, col: number, row: number) {
    const maxCol = c.vertical ? GRID_COLS - 1 : GRID_COLS - 2;
    const maxRow = c.vertical ? GRID_ROWS - 2 : GRID_ROWS - 1;
    return {
      col: Math.min(maxCol, Math.max(0, col)),
      row: Math.min(maxRow, Math.max(0, row)),
    };
  }

  function svgPoint(e: React.PointerEvent): { x: number; y: number } {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * HEIGHT,
    };
  }

  function onComponentPointerDown(e: React.PointerEvent, c: PlacedComponent) {
    e.preventDefault();
    const p = svgPoint(e);
    dragRef.current = {
      id: c.id,
      moved: false,
      dx: p.x - px(c.col),
      dy: p.y - py(c.row),
    };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    setSelectedId(c.id);
  }

  function onPointerMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const c = components.find((x) => x.id === drag.id);
    if (!c) return;
    const p = svgPoint(e);
    const col = Math.round((p.x - drag.dx - PAD) / CELL);
    const row = Math.round((p.y - drag.dy - PAD) / CELL);
    const clamped = clampPosition(c, col, row);
    if (clamped.col !== c.col || clamped.row !== c.row) {
      drag.moved = true;
      update(c.id, clamped);
    }
  }

  function onPointerUp() {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    if (!drag.moved) {
      // A tap (no movement): toggle switches.
      const c = components.find((x) => x.id === drag.id);
      if (c?.kind === "switch") update(c.id, { closed: !c.closed });
    }
  }

  function onComponentKeyDown(e: React.KeyboardEvent, c: PlacedComponent) {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    if (moves[e.key]) {
      e.preventDefault();
      const [dc, dr] = moves[e.key];
      update(c.id, clampPosition(c, c.col + dc, c.row + dr));
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      const rotated = { ...c, vertical: !c.vertical };
      update(c.id, { vertical: rotated.vertical, ...clampPosition(rotated, c.col, c.row) });
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      update(c.id, { flipped: !c.flipped });
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      removeComponent(c.id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedId(c.id);
      if (c.kind === "switch") update(c.id, { closed: !c.closed });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        {/* palette */}
        <div
          role="toolbar"
          aria-label="Component shelf"
          className="flex flex-wrap gap-2 rounded-card border-2 border-border bg-surface p-3"
        >
          {PALETTE.map((p) => (
            <button
              key={p.kind}
              type="button"
              onClick={() => addComponent(p.kind)}
              className="flex items-center gap-2 rounded-full border-2 border-spark-blue bg-spark-blue-soft px-4 py-2 font-display text-sm font-bold text-spark-blue-deep transition-colors hover:bg-spark-blue hover:text-white"
            >
              {p.icon}+ {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setComponents([]);
              setSelectedId(null);
            }}
            className="ml-auto flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 font-display text-sm font-bold text-muted hover:border-spark-red hover:text-spark-red"
          >
            <Eraser aria-hidden="true" className="h-5 w-5" /> Clear
          </button>
        </div>

        {/* canvas */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mt-4 w-full touch-none rounded-card border-2 border-border bg-surface"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          aria-label="Circuit building canvas"
        >
          {/* grid dots */}
          {[...Array(GRID_COLS)].map((_, c) =>
            [...Array(GRID_ROWS)].map((_, r) => (
              <circle
                key={`${c}-${r}`}
                cx={px(c)}
                cy={py(r)}
                r="2.5"
                fill="var(--border)"
              />
            )),
          )}

          {components.map((c) => (
            <ComponentGlyph
              key={c.id}
              component={c}
              lit={sim.litLedIds.includes(c.id)}
              active={sim.activeIds.includes(c.id)}
              danger={sim.status === "short-circuit" && sim.activeIds.includes(c.id)}
              selected={c.id === selectedId}
              onPointerDown={(e) => onComponentPointerDown(e, c)}
              onKeyDown={(e) => onComponentKeyDown(e, c)}
              onFocus={() => setSelectedId(c.id)}
            />
          ))}
        </svg>

        {/* inspector */}
        <div className="mt-3 flex min-h-12 flex-wrap items-center gap-2" aria-live="polite">
          {selected ? (
            <>
              <span className="font-display font-bold capitalize">
                {selected.kind} selected:
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  update(
                    selected.id,
                    clampPosition(
                      { ...selected, vertical: !selected.vertical },
                      selected.col,
                      selected.row,
                    ),
                  )
                }
              >
                <RotateCw aria-hidden="true" className="mr-1 h-4 w-4" /> Rotate
              </Button>
              {(selected.kind === "battery" || selected.kind === "led") && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => update(selected.id, { flipped: !selected.flipped })}
                >
                  <ArrowLeftRight aria-hidden="true" className="mr-1 h-4 w-4" /> Flip + / −
                </Button>
              )}
              {selected.kind === "switch" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => update(selected.id, { closed: !selected.closed })}
                >
                  <ToggleLeft aria-hidden="true" className="mr-1 h-4 w-4" />
                  {selected.closed ? "Open switch" : "Close switch"}
                </Button>
              )}
              <Button size="sm" variant="danger" onClick={() => removeComponent(selected.id)}>
                <Trash2 aria-hidden="true" className="mr-1 h-4 w-4" /> Remove
              </Button>
            </>
          ) : (
            <span className="text-sm font-semibold text-muted">
              Tip: drag parts to move them · tap a switch to flip it · keyboard:
              arrows move, R rotates, F flips, Delete removes.
            </span>
          )}
        </div>
      </div>

      {/* SparkBot status panel */}
      <aside aria-live="polite" className="lg:pt-14">
        <SparkSays mood={STATUS_MOOD[sim.status]} size={100} className="lg:flex-col lg:items-start">
          {sim.hint}
        </SparkSays>
        <div className="mt-4 rounded-card border-2 border-border bg-surface p-4 text-sm">
          <h2 className="font-display text-base font-bold">Builder goals</h2>
          <ul className="mt-2 space-y-1.5 font-semibold text-muted">
            <GoalItem done={components.some((c) => c.kind === "battery")}>
              Add a battery
            </GoalItem>
            <GoalItem done={sim.litLedIds.length > 0}>Light an LED</GoalItem>
            <GoalItem done={sim.status === "lit-safe"}>
              Protect it with a resistor
            </GoalItem>
            <GoalItem
              done={
                sim.status === "lit-safe" &&
                components.some((c) => c.kind === "switch" && c.closed)
              }
            >
              Control it with a switch
            </GoalItem>
          </ul>
        </div>
      </aside>

      {reward && (
        <RewardModal
          reward={reward}
          heading="It's alive!"
          message="You just powered a working circuit. +30 build XP!"
          onClose={() => setReward(null)}
          closeLabel="Keep building!"
        />
      )}
    </div>
  );
}

function GoalItem({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <li className={cn("flex items-center gap-2", done && "text-spark-green")}>
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-bold",
          done ? "border-spark-green bg-spark-green text-white" : "border-border",
        )}
      >
        {done ? "✓" : ""}
      </span>
      {children}
      <span className="sr-only">{done ? "(done)" : "(not yet)"}</span>
    </li>
  );
}

/* ------------------------------ canvas glyphs ------------------------------ */

interface GlyphProps {
  component: PlacedComponent;
  lit: boolean;
  active: boolean;
  danger: boolean;
  selected: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
}

function ComponentGlyph({
  component: c,
  lit,
  active,
  danger,
  selected,
  onPointerDown,
  onKeyDown,
  onFocus,
}: GlyphProps) {
  const x1 = px(c.col);
  const y1 = py(c.row);
  const x2 = c.vertical ? x1 : x1 + CELL;
  const y2 = c.vertical ? y1 + CELL : y1;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const angle = c.vertical ? 90 : 0;
  const flip = c.flipped ? 180 : 0;

  const label =
    `${c.kind} at column ${c.col + 1}, row ${c.row + 1}` +
    (c.kind === "switch" ? (c.closed ? ", closed" : ", open") : "") +
    (c.kind === "led" ? (lit ? ", glowing" : ", dark") : "");

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={label}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className="cursor-grab outline-none"
      style={{ touchAction: "none" }}
    >
      {/* selection halo */}
      {selected && (
        <rect
          x={Math.min(x1, x2) - 14}
          y={Math.min(y1, y2) - 14}
          width={Math.abs(x2 - x1) + 28}
          height={Math.abs(y2 - y1) + 28}
          rx="12"
          fill="none"
          stroke="var(--spark-blue)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      )}

      {/* connecting stubs + current animation */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--foreground)" strokeWidth="3" opacity={c.kind === "wire" ? 0 : 0.85} />
      {active && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={danger ? "var(--spark-red)" : "var(--spark-blue)"}
          strokeWidth="3.5"
          strokeDasharray="6 6"
          className="animate-spark-dash"
        />
      )}

      {/* terminals */}
      <circle cx={x1} cy={y1} r="4.5" fill="var(--foreground)" />
      <circle cx={x2} cy={y2} r="4.5" fill="var(--foreground)" />

      <g transform={`translate(${mx}, ${my}) rotate(${angle + flip})`}>
        {c.kind === "battery" && <BatteryGlyph />}
        {c.kind === "led" && <LedGlyph lit={lit} />}
        {c.kind === "resistor" && <ResistorGlyph />}
        {c.kind === "switch" && <SwitchGlyph closed={Boolean(c.closed)} />}
        {c.kind === "wire" && (
          <line x1={-CELL / 2} y1="0" x2={CELL / 2} y2="0" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
}

function BatteryGlyph() {
  return (
    <g>
      <rect x="-17" y="-12" width="34" height="24" rx="5" fill="var(--spark-green-soft)" stroke="var(--foreground)" strokeWidth="2.5" />
      <text x="-9" y="5" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--spark-red)">+</text>
      <text x="9" y="5" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--spark-blue)">−</text>
    </g>
  );
}

function LedGlyph({ lit }: { lit: boolean }) {
  return (
    <g>
      {lit && (
        <>
          <circle r="20" fill="var(--spark-yellow)" opacity="0.45" className="animate-spark-glow" />
          <circle r="12" fill="var(--spark-yellow)" opacity="0.6" />
        </>
      )}
      <polygon
        points="-9,-10 -9,10 9,0"
        fill={lit ? "var(--spark-orange)" : "var(--spark-red-soft)"}
        stroke="var(--foreground)"
        strokeWidth="2.5"
      />
      <line x1="9" y1="-10" x2="9" y2="10" stroke="var(--foreground)" strokeWidth="2.5" />
    </g>
  );
}

function ResistorGlyph() {
  return (
    <g>
      <rect x="-18" y="-9" width="36" height="18" rx="8" fill="#e8d5b5" stroke="var(--foreground)" strokeWidth="2" />
      <rect x="-11" y="-9" width="5" height="18" fill="#7b3f00" />
      <rect x="-2" y="-9" width="5" height="18" fill="#111" />
      <rect x="7" y="-9" width="5" height="18" fill="#c0392b" />
    </g>
  );
}

function SwitchGlyph({ closed }: { closed: boolean }) {
  return (
    <g>
      <circle cx="-12" cy="0" r="4" fill="var(--foreground)" />
      <circle cx="12" cy="0" r="4" fill="var(--foreground)" />
      <line
        x1="-12"
        y1="0"
        x2={closed ? 12 : 8}
        y2={closed ? 0 : -14}
        stroke={closed ? "var(--spark-green)" : "var(--spark-orange)"}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
