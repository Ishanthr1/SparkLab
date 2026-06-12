import type {
  PlacedComponent,
  SimulationResult,
  SimulationStatus,
} from "@/types";

/**
 * Pure circuit analysis for the drag-and-drop simulator.
 *
 * The grid is a graph: grid points are nodes, components are edges spanning
 * two adjacent points. Components touching the same grid point are connected.
 * We trace conventional current from each battery's + terminal and classify
 * the circuit, producing a kid-friendly SparkBot hint.
 */

export const GRID_COLS = 11;
export const GRID_ROWS = 7;

export function nodeKey(col: number, row: number): string {
  return `${col},${row}`;
}

export interface Terminals {
  /** Positive/anode end for polarized parts; otherwise just one end. */
  a: string;
  b: string;
}

export function terminals(c: PlacedComponent): Terminals {
  const n1 = nodeKey(c.col, c.row);
  const n2 = c.vertical ? nodeKey(c.col, c.row + 1) : nodeKey(c.col + 1, c.row);
  return c.flipped ? { a: n2, b: n1 } : { a: n1, b: n2 };
}

interface TraceOptions {
  ignoreSwitches?: boolean;
  ignoreLedDirection?: boolean;
}

interface Path {
  edgeIds: string[];
  ledIds: string[];
  hasResistor: boolean;
}

const MAX_PATHS = 300;

/** All simple edge-disjoint-by-step paths from battery + to battery −. */
function tracePaths(
  components: PlacedComponent[],
  battery: PlacedComponent,
  opts: TraceOptions = {},
): Path[] {
  const t = terminals(battery);
  const paths: Path[] = [];
  const used = new Set<string>([battery.id]);

  function canTraverse(c: PlacedComponent, from: string): string | null {
    const ct = terminals(c);
    if (from !== ct.a && from !== ct.b) return null;
    const to = from === ct.a ? ct.b : ct.a;
    switch (c.kind) {
      case "wire":
      case "resistor":
      case "battery":
        return to;
      case "switch":
        return c.closed || opts.ignoreSwitches ? to : null;
      case "led":
        // Conventional current enters at the anode (a) only.
        return from === ct.a || opts.ignoreLedDirection ? to : null;
    }
  }

  function dfs(node: string, edgeIds: string[]) {
    if (paths.length >= MAX_PATHS) return;
    if (node === t.b && edgeIds.length > 0) {
      const edgeSet = new Set(edgeIds);
      const onPath = components.filter((c) => edgeSet.has(c.id));
      paths.push({
        edgeIds: [...edgeIds],
        ledIds: onPath.filter((c) => c.kind === "led").map((c) => c.id),
        hasResistor: onPath.some((c) => c.kind === "resistor"),
      });
      return;
    }
    for (const c of components) {
      if (used.has(c.id)) continue;
      const to = canTraverse(c, node);
      if (to === null) continue;
      used.add(c.id);
      edgeIds.push(c.id);
      dfs(to, edgeIds);
      edgeIds.pop();
      used.delete(c.id);
    }
  }

  dfs(t.a, []);
  return paths;
}

const HINTS: Record<SimulationStatus, string> = {
  empty:
    "An empty workbench, full of possibilities! Add a battery from the shelf — every circuit needs a push.",
  "no-battery":
    "Nothing's flowing yet... we need a battery to push the electrons. Add one from the shelf!",
  "no-led":
    "Current is flowing, but there's nothing to light up! Add an LED and wire it into the loop.",
  "open-circuit":
    "Your LED isn't lighting up. Is the battery connected correctly? Check for gaps — every part must link into one complete loop back to the battery.",
  "led-backwards":
    "So close! Your LED is in backwards — it's a one-way door, remember? Select it and press Flip.",
  "switch-open":
    "The loop looks great, but a switch is open. Click the switch to close it and let the current through!",
  "short-circuit":
    "Whoa — the battery is connected straight to itself with nothing to slow the current! That's a short circuit, and it makes real batteries dangerously hot. Add an LED or resistor into the loop.",
  "lit-bright":
    "It's GLOWING! But careful, engineer: without a resistor, a real LED would burn out fast. Add a resistor in the loop to make it safe.",
  "lit-safe":
    "PERFECT circuit! Battery, resistor, LED, complete loop — that's exactly how a pro engineer would build it. ⚡",
};

function result(
  status: SimulationStatus,
  litLedIds: string[] = [],
  activeIds: string[] = [],
): SimulationResult {
  return { status, litLedIds, activeIds, hint: HINTS[status] };
}

export function simulate(components: PlacedComponent[]): SimulationResult {
  if (components.length === 0) return result("empty");

  const batteries = components.filter((c) => c.kind === "battery");
  if (batteries.length === 0) return result("no-battery");

  const hasLedAnywhere = components.some((c) => c.kind === "led");

  let sawShort = false;
  const litLeds = new Set<string>();
  const activeIds = new Set<string>();
  let litWithoutResistor = false;
  let litWithResistor = false;
  let sawPlainResistorPath = false;

  for (const battery of batteries) {
    const paths = tracePaths(components, battery);
    for (const path of paths) {
      if (path.ledIds.length > 0) {
        for (const id of path.ledIds) litLeds.add(id);
        for (const id of path.edgeIds) activeIds.add(id);
        activeIds.add(battery.id);
        if (path.hasResistor) litWithResistor = true;
        else litWithoutResistor = true;
      } else if (path.hasResistor) {
        sawPlainResistorPath = true;
        for (const id of path.edgeIds) activeIds.add(id);
        activeIds.add(battery.id);
      } else {
        // Battery shorted through wires/switches only.
        sawShort = true;
        for (const id of path.edgeIds) activeIds.add(id);
        activeIds.add(battery.id);
      }
    }
  }

  if (sawShort) return result("short-circuit", [], [...activeIds]);

  if (litLeds.size > 0) {
    return result(
      litWithoutResistor && !litWithResistor ? "lit-bright" : "lit-safe",
      [...litLeds],
      [...activeIds],
    );
  }

  if (sawPlainResistorPath) {
    return result(hasLedAnywhere ? "open-circuit" : "no-led", [], [...activeIds]);
  }

  // Nothing conducts. Diagnose why, most-fixable cause first.
  for (const battery of batteries) {
    if (tracePaths(components, battery, { ignoreSwitches: true }).length > 0) {
      return result("switch-open");
    }
  }
  for (const battery of batteries) {
    if (
      tracePaths(components, battery, {
        ignoreSwitches: true,
        ignoreLedDirection: true,
      }).some((p) => p.ledIds.length > 0)
    ) {
      return result("led-backwards");
    }
  }
  if (!hasLedAnywhere) return result("no-led");
  return result("open-circuit");
}
