/**
 * Small reusable SVG circuit symbols, shared by lesson diagrams and quiz
 * figures. Each renders inside a <g transform=...> at its given position.
 * Wires connect at the marked terminal points.
 */

export function BatterySymbol({
  x,
  y,
  label = true,
}: {
  x: number;
  y: number;
  label?: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* long plate = +, short plate = − */}
      <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--foreground)" strokeWidth="3" />
      <line x1="10" y1="-8" x2="10" y2="8" stroke="var(--foreground)" strokeWidth="6" />
      {label && (
        <>
          <text x="-4" y="-22" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--spark-red)">
            +
          </text>
          <text x="14" y="-16" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--spark-blue)">
            −
          </text>
        </>
      )}
    </g>
  );
}

export function LedSymbol({
  x,
  y,
  lit,
  reversed = false,
}: {
  x: number;
  y: number;
  lit: boolean;
  reversed?: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})${reversed ? " scale(-1,1)" : ""}`}>
      {lit && (
        <circle cx="0" cy="0" r="16" fill="var(--spark-yellow)" opacity="0.55" />
      )}
      <polygon
        points="-8,-9 -8,9 8,0"
        fill={lit ? "var(--spark-orange)" : "var(--surface)"}
        stroke="var(--foreground)"
        strokeWidth="2.5"
      />
      <line x1="8" y1="-9" x2="8" y2="9" stroke="var(--foreground)" strokeWidth="2.5" />
      {/* light arrows */}
      <g stroke={lit ? "var(--spark-orange)" : "var(--muted)"} strokeWidth="2" opacity={lit ? 1 : 0.5}>
        <line x1="4" y1="-12" x2="10" y2="-18" />
        <line x1="9" y1="-9" x2="15" y2="-15" />
      </g>
    </g>
  );
}

export function ResistorSymbol({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M-18 0 l4 -8 l7 16 l7 -16 l7 16 l7 -16 l4 8"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function SwitchSymbol({
  x,
  y,
  closed,
}: {
  x: number;
  y: number;
  closed: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="-14" cy="0" r="3.5" fill="var(--foreground)" />
      <circle cx="14" cy="0" r="3.5" fill="var(--foreground)" />
      <line
        x1="-14"
        y1="0"
        x2={closed ? 14 : 10}
        y2={closed ? 0 : -16}
        stroke="var(--foreground)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

export function BulbSymbol({ x, y, lit }: { x: number; y: number; lit: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {lit && <circle cx="0" cy="0" r="18" fill="var(--spark-yellow)" opacity="0.5" />}
      <circle
        cx="0"
        cy="0"
        r="11"
        fill={lit ? "var(--spark-yellow-soft)" : "var(--surface)"}
        stroke="var(--foreground)"
        strokeWidth="2.5"
      />
      <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--foreground)" strokeWidth="2" />
    </g>
  );
}

/** Animated dashes along a wire path indicating current flow. */
export function CurrentFlow({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--spark-blue)"
      strokeWidth="3"
      strokeDasharray="6 6"
      className="animate-spark-dash"
      opacity="0.9"
    />
  );
}

export function Wire({ d }: { d: string }) {
  return (
    <path d={d} fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinejoin="round" />
  );
}
