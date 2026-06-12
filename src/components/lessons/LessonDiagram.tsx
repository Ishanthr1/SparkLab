import {
  BatterySymbol,
  BulbSymbol,
  CurrentFlow,
  LedSymbol,
  ResistorSymbol,
  SwitchSymbol,
  Wire,
} from "@/components/lessons/circuit-symbols";
import type { DiagramId } from "@/types";

interface LessonDiagramProps {
  diagram: DiagramId;
  caption: string;
}

/** Hand-drawn educational SVG diagrams, keyed by id from lesson content. */
export function LessonDiagram({ diagram, caption }: LessonDiagramProps) {
  return (
    <figure className="mx-auto w-full max-w-xl rounded-card border-2 border-border bg-surface p-4">
      <svg viewBox="0 0 360 220" role="img" aria-label={caption}>
        {DIAGRAMS[diagram]}
      </svg>
      <figcaption className="mt-2 text-center text-sm font-semibold text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Electron({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="8" fill="var(--spark-blue)" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
        −
      </text>
    </g>
  );
}

function PanelLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--foreground)">
      {children}
    </text>
  );
}

const DIAGRAMS: Record<DiagramId, React.ReactNode> = {
  atom: (
    <>
      {/* orbits */}
      <ellipse cx="180" cy="110" rx="130" ry="55" fill="none" stroke="var(--border)" strokeWidth="2" />
      <ellipse cx="180" cy="110" rx="80" ry="90" fill="none" stroke="var(--border)" strokeWidth="2" transform="rotate(30 180 110)" />
      {/* nucleus */}
      <circle cx="172" cy="104" r="14" fill="var(--spark-red)" />
      <text x="172" y="109" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+</text>
      <circle cx="190" cy="112" r="14" fill="var(--spark-orange)" />
      <circle cx="178" cy="122" r="14" fill="var(--spark-red)" />
      <text x="178" y="127" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+</text>
      {/* electrons on orbits */}
      <Electron cx={50} cy={110} />
      <Electron cx={310} cy={110} />
      <Electron cx={222} cy={28} />
      <PanelLabel x={282} y={40}>electron (−)</PanelLabel>
      <PanelLabel x={180} y={170}>nucleus: protons (+) and neutrons</PanelLabel>
    </>
  ),

  "electron-flow": (
    <>
      <rect x="20" y="80" width="320" height="60" rx="12" fill="var(--spark-blue-soft)" stroke="var(--border)" />
      {[60, 130, 200, 270].map((x) => (
        <circle key={x} cx={x} cy={110} r="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
      ))}
      {[95, 165, 235, 305].map((x) => (
        <Electron key={x} cx={x} cy={110} />
      ))}
      <CurrentFlow d="M30 110 L330 110" />
      <PanelLabel x={180} y={50}>electrons hop from atom to atom</PanelLabel>
      <PanelLabel x={180} y={180}>inside a copper wire</PanelLabel>
    </>
  ),

  "water-current": (
    <>
      {/* big river */}
      <path d="M20 60 h150 v34 h-150 z" fill="var(--spark-blue-soft)" stroke="var(--spark-blue)" strokeWidth="2" />
      <CurrentFlow d="M28 70 L162 70" />
      <CurrentFlow d="M28 84 L162 84" />
      <PanelLabel x={95} y={44}>big current: lots of flow</PanelLabel>
      {/* trickle */}
      <path d="M20 150 h150 v10 h-150 z" fill="var(--spark-blue-soft)" stroke="var(--spark-blue)" strokeWidth="2" />
      <CurrentFlow d="M28 155 L162 155" />
      <PanelLabel x={95} y={134}>small current: a trickle</PanelLabel>
      {/* meters */}
      <circle cx="265" cy="77" r="30" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="2.5" />
      <line x1="265" y1="77" x2="285" y2="60" stroke="var(--spark-red)" strokeWidth="3" strokeLinecap="round" />
      <PanelLabel x={265} y={125}>5 A</PanelLabel>
      <circle cx="265" cy="160" r="20" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="2.5" />
      <line x1="265" y1="160" x2="252" y2="148" stroke="var(--spark-red)" strokeWidth="3" strokeLinecap="round" />
      <PanelLabel x={265} y={200}>0.1 A</PanelLabel>
    </>
  ),

  "water-pressure": (
    <>
      {/* tall tank */}
      <rect x="40" y="20" width="60" height="120" rx="8" fill="var(--spark-blue-soft)" stroke="var(--spark-blue)" strokeWidth="2.5" />
      <path d="M100 130 h60" stroke="var(--spark-blue)" strokeWidth="8" strokeLinecap="round" />
      <CurrentFlow d="M104 130 L158 130" />
      <PanelLabel x={70} y={165}>tall tank</PanelLabel>
      <PanelLabel x={70} y={183}>strong push (high voltage)</PanelLabel>
      {/* short tank */}
      <rect x="220" y="90" width="60" height="50" rx="8" fill="var(--spark-blue-soft)" stroke="var(--spark-blue)" strokeWidth="2.5" />
      <path d="M280 130 h40" stroke="var(--spark-blue)" strokeWidth="4" strokeLinecap="round" />
      <PanelLabel x={255} y={165}>short tank</PanelLabel>
      <PanelLabel x={255} y={183}>weak push (low voltage)</PanelLabel>
    </>
  ),

  "resistance-pipe": (
    <>
      {/* wide pipe */}
      <path d="M20 50 h320" stroke="var(--spark-blue-soft)" strokeWidth="36" strokeLinecap="round" />
      <CurrentFlow d="M30 44 L330 44" />
      <CurrentFlow d="M30 58 L330 58" />
      <PanelLabel x={180} y={20}>low resistance: easy flow</PanelLabel>
      {/* narrow squeezed pipe */}
      <path d="M20 150 h110" stroke="var(--spark-blue-soft)" strokeWidth="36" strokeLinecap="round" />
      <path d="M130 150 h100" stroke="var(--spark-blue-soft)" strokeWidth="10" />
      <path d="M230 150 h110" stroke="var(--spark-blue-soft)" strokeWidth="36" strokeLinecap="round" />
      <CurrentFlow d="M30 150 L330 150" />
      <PanelLabel x={180} y={122}>high resistance: the squeeze slows the flow</PanelLabel>
      <text x="180" y="195" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--muted)">
        a resistor works like the narrow section
      </text>
    </>
  ),

  "open-vs-closed": (
    <>
      {/* open */}
      <Wire d="M30 60 L30 30 L80 30 L80 30" />
      <Wire d="M30 92 L30 120 L60 120" />
      <Wire d="M100 120 L150 120 L150 30 L94 30" />
      <BatterySymbol x={30} y={76} label={false} />
      <BulbSymbol x={87} y={30} lit={false} />
      <circle cx="64" cy="120" r="3" fill="var(--foreground)" />
      <circle cx="96" cy="120" r="3" fill="var(--foreground)" />
      <PanelLabel x={90} y={160}>OPEN: gap stops the flow</PanelLabel>
      <text x="80" y="145" textAnchor="middle" fontSize="12" fill="var(--spark-red)" fontWeight="700">gap</text>
      {/* closed */}
      <Wire d="M220 60 L220 30 L270 30" />
      <Wire d="M220 92 L220 120 L340 120 L340 30 L284 30" />
      <BatterySymbol x={220} y={76} label={false} />
      <BulbSymbol x={277} y={30} lit />
      <CurrentFlow d="M220 60 L220 30 L270 30 M284 30 L340 30 L340 120 L220 120 L220 92" />
      <PanelLabel x={280} y={160}>CLOSED: complete loop, light on</PanelLabel>
    </>
  ),

  "conductor-insulator": (
    <>
      <rect x="25" y="40" width="140" height="120" rx="14" fill="var(--spark-green-soft)" stroke="var(--spark-green)" strokeWidth="2" />
      <PanelLabel x={95} y={28}>conductor (copper)</PanelLabel>
      {[
        [60, 80],
        [120, 70],
        [75, 130],
        [130, 120],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="13" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
      ))}
      <Electron cx={95} cy={95} />
      <Electron cx={140} cy={145} />
      <CurrentFlow d="M40 175 L150 175" />
      <text x="95" y="195" textAnchor="middle" fontSize="11" fill="var(--muted)" fontWeight="600">free electrons roam</text>

      <rect x="195" y="40" width="140" height="120" rx="14" fill="var(--spark-red-soft)" stroke="var(--spark-red)" strokeWidth="2" />
      <PanelLabel x={265} y={28}>insulator (rubber)</PanelLabel>
      {[
        [230, 80],
        [295, 75],
        [240, 130],
        [300, 125],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="13" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
          <circle cx={x + 10} cy={y - 8} r="6" fill="var(--spark-blue)" />
        </g>
      ))}
      <text x="265" y="195" textAnchor="middle" fontSize="11" fill="var(--muted)" fontWeight="600">electrons locked in place</text>
    </>
  ),

  "battery-anatomy": (
    <>
      <rect x="90" y="50" width="180" height="80" rx="12" fill="var(--spark-green-soft)" stroke="var(--foreground)" strokeWidth="2.5" />
      <rect x="270" y="75" width="16" height="30" rx="4" fill="var(--foreground)" />
      <rect x="100" y="60" width="76" height="60" rx="8" fill="var(--spark-blue-soft)" />
      <rect x="184" y="60" width="76" height="60" rx="8" fill="var(--spark-orange-soft)" />
      <PanelLabel x={138} y={95}>chemicals</PanelLabel>
      <PanelLabel x={222} y={95}>chemicals</PanelLabel>
      <text x="84" y="95" textAnchor="end" fontSize="18" fontWeight="800" fill="var(--spark-blue)">−</text>
      <text x="296" y="95" fontSize="18" fontWeight="800" fill="var(--spark-red)">+</text>
      <PanelLabel x={180} y={165}>the chemical reaction pushes electrons toward the − end</PanelLabel>
      <CurrentFlow d="M120 40 L260 40" />
      <text x="180" y="24" textAnchor="middle" fontSize="11" fill="var(--muted)" fontWeight="600">electrons flow when a circuit connects − to +</text>
    </>
  ),

  "led-anatomy": (
    <>
      <circle cx="180" cy="70" r="38" fill="var(--spark-red-soft)" stroke="var(--spark-red)" strokeWidth="2.5" />
      <rect x="150" y="70" width="60" height="20" fill="var(--spark-red-soft)" stroke="var(--spark-red)" strokeWidth="2.5" />
      {/* legs */}
      <line x1="166" y1="90" x2="166" y2="185" stroke="var(--foreground)" strokeWidth="4" />
      <line x1="196" y1="90" x2="196" y2="150" stroke="var(--foreground)" strokeWidth="4" />
      <PanelLabel x={120} y={205}>long leg = + (anode)</PanelLabel>
      <PanelLabel x={252} y={172}>short leg = − (cathode)</PanelLabel>
      <line x1="160" y1="200" x2="166" y2="188" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="225" y1="166" x2="200" y2="152" stroke="var(--muted)" strokeWidth="1.5" />
      <g className="animate-spark-glow">
        <line x1="148" y1="30" x2="136" y2="16" stroke="var(--spark-orange)" strokeWidth="3" strokeLinecap="round" />
        <line x1="180" y1="24" x2="180" y2="8" stroke="var(--spark-orange)" strokeWidth="3" strokeLinecap="round" />
        <line x1="212" y1="30" x2="224" y2="16" stroke="var(--spark-orange)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  ),

  "resistor-bands": (
    <>
      <line x1="20" y1="100" x2="340" y2="100" stroke="var(--foreground)" strokeWidth="4" />
      <rect x="110" y="70" width="140" height="60" rx="26" fill="#e8d5b5" stroke="var(--foreground)" strokeWidth="2" />
      <rect x="130" y="70" width="14" height="60" fill="#7b3f00" />
      <rect x="158" y="70" width="14" height="60" fill="#111111" />
      <rect x="186" y="70" width="14" height="60" fill="#c0392b" />
      <rect x="222" y="70" width="14" height="60" fill="#c9a227" />
      <PanelLabel x={137} y={55}>brown = 1</PanelLabel>
      <PanelLabel x={180} y={160}>black = 0</PanelLabel>
      <PanelLabel x={230} y={55}>red = ×100</PanelLabel>
      <line x1="137" y1="60" x2="137" y2="68" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="172" y1="145" x2="166" y2="132" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="208" y1="60" x2="196" y2="68" stroke="var(--muted)" strokeWidth="1.5" />
      <PanelLabel x={180} y={200}>1 0 ×100 = 1000 Ω (1 kΩ)</PanelLabel>
    </>
  ),

  "switch-anatomy": (
    <>
      {/* OFF */}
      <Wire d="M30 80 L70 80" />
      <Wire d="M130 80 L170 80" />
      <circle cx="74" cy="80" r="5" fill="var(--foreground)" />
      <circle cx="126" cy="80" r="5" fill="var(--foreground)" />
      <line x1="74" y1="80" x2="120" y2="48" stroke="var(--spark-orange)" strokeWidth="5" strokeLinecap="round" />
      <PanelLabel x={100} y={130}>OFF: lever up, gap open</PanelLabel>
      {/* ON */}
      <Wire d="M190 80 L230 80" />
      <Wire d="M290 80 L330 80" />
      <circle cx="234" cy="80" r="5" fill="var(--foreground)" />
      <circle cx="286" cy="80" r="5" fill="var(--foreground)" />
      <line x1="234" y1="80" x2="286" y2="80" stroke="var(--spark-green)" strokeWidth="5" strokeLinecap="round" />
      <CurrentFlow d="M195 80 L325 80" />
      <PanelLabel x={260} y={130}>ON: lever down, loop closed</PanelLabel>
      <text x="180" y="190" textAnchor="middle" fontSize="12" fill="var(--muted)" fontWeight="600">
        a switch is just a movable piece of conductor
      </text>
    </>
  ),

  "series-circuit": (
    <>
      <Wire d="M50 110 L50 50 L120 50" />
      <Wire d="M134 50 L210 50" />
      <Wire d="M224 50 L310 50 L310 170 L50 170 L50 142" />
      <BatterySymbol x={50} y={126} />
      <BulbSymbol x={127} y={50} lit />
      <BulbSymbol x={217} y={50} lit />
      <g opacity="0.5">
        <CurrentFlow d="M50 110 L50 50 L310 50 L310 170 L50 170 L50 142" />
      </g>
      <PanelLabel x={180} y={205}>one loop: the same current visits every bulb</PanelLabel>
    </>
  ),

  "parallel-circuit": (
    <>
      <BatterySymbol x={40} y={110} />
      <Wire d="M40 94 L40 40 L120 40" />
      <Wire d="M40 126 L40 185 L320 185 L320 40 L280 40" />
      {/* branch 1 */}
      <Wire d="M120 40 L160 40" />
      <Wire d="M188 40 L280 40" />
      <BulbSymbol x={174} y={40} lit />
      {/* branch 2 */}
      <Wire d="M120 40 L120 110 L160 110" />
      <Wire d="M188 110 L280 110 L280 40" />
      <BulbSymbol x={174} y={110} lit />
      <CurrentFlow d="M40 94 L40 40 L120 40" />
      <PanelLabel x={180} y={212}>two lanes: each bulb gets the full push</PanelLabel>
    </>
  ),

  "flashlight-exploded": (
    <>
      {/* case */}
      <rect x="20" y="80" width="90" height="56" rx="10" fill="var(--spark-purple-soft)" stroke="var(--foreground)" strokeWidth="2" />
      <PanelLabel x={65} y={160}>battery</PanelLabel>
      <text x="50" y="113" fontSize="16" fontWeight="800" fill="var(--spark-red)">+</text>
      <text x="88" y="113" fontSize="16" fontWeight="800" fill="var(--spark-blue)">−</text>
      {/* switch */}
      <SwitchSymbol x={150} y={108} closed />
      <PanelLabel x={150} y={160}>switch</PanelLabel>
      {/* resistor */}
      <ResistorSymbol x={215} y={108} />
      <PanelLabel x={215} y={160}>resistor</PanelLabel>
      {/* led */}
      <LedSymbol x={285} y={108} lit />
      <PanelLabel x={285} y={160}>LED</PanelLabel>
      {/* connections */}
      <Wire d="M110 108 L136 108" />
      <Wire d="M164 108 L197 108" />
      <Wire d="M233 108 L271 108" />
      <Wire d="M299 108 L330 108 L330 40 L20 40 L20 108" />
      <PanelLabel x={180} y={205}>one series loop inside a tube</PanelLabel>
    </>
  ),

  "alarm-circuit": (
    <>
      {/* door */}
      <rect x="30" y="40" width="70" height="130" rx="6" fill="var(--spark-orange-soft)" stroke="var(--foreground)" strokeWidth="2" transform="rotate(-14 30 170)" />
      <PanelLabel x={60} y={200}>door (open)</PanelLabel>
      {/* magnet & switch */}
      <rect x="120" y="52" width="34" height="18" rx="4" fill="var(--spark-blue)" />
      <PanelLabel x={137} y={42}>switch</PanelLabel>
      {/* alarm circuit */}
      <Wire d="M137 70 L137 110 L180 110" />
      <Wire d="M216 110 L260 110" />
      <BatterySymbol x={198} y={110} label={false} />
      {/* buzzer */}
      <circle cx="280" cy="110" r="20" fill="var(--spark-red-soft)" stroke="var(--spark-red)" strokeWidth="2.5" />
      <PanelLabel x={280} y={115}>♪</PanelLabel>
      <PanelLabel x={280} y={150}>buzzer</PanelLabel>
      <Wire d="M300 110 L330 110 L330 30 L137 30 L137 52" />
      <CurrentFlow d="M137 70 L137 110 L180 110" />
      <g className="animate-spark-glow">
        <path d="M300 85 q10 -10 4 -22" stroke="var(--spark-red)" strokeWidth="2.5" fill="none" />
        <path d="M310 92 q14 -12 8 -28" stroke="var(--spark-red)" strokeWidth="2.5" fill="none" />
      </g>
      <PanelLabel x={180} y={205}>door opens → switch flips → alarm circuit completes</PanelLabel>
    </>
  ),

  "traffic-light": (
    <>
      <BatterySymbol x={36} y={110} />
      <Wire d="M36 94 L36 30 L110 30" />
      <Wire d="M36 126 L36 190 L330 190 L330 30 L300 30" />
      {/* red lane (on) */}
      <Wire d="M110 30 L130 30" />
      <Wire d="M166 30 L196 30" />
      <SwitchSymbol x={148} y={30} closed />
      <ResistorSymbol x={214} y={30} />
      <Wire d="M232 30 L246 30" />
      <g>
        <circle cx="260" cy="30" r="12" fill="var(--spark-red)" />
        <circle cx="260" cy="30" r="18" fill="var(--spark-red)" opacity="0.3" />
      </g>
      <Wire d="M272 30 L300 30" />
      {/* yellow lane (off) */}
      <Wire d="M110 30 L110 95 L130 95" />
      <Wire d="M166 95 L196 95" />
      <SwitchSymbol x={148} y={95} closed={false} />
      <ResistorSymbol x={214} y={95} />
      <Wire d="M232 95 L246 95" />
      <circle cx="260" cy="95" r="12" fill="var(--spark-yellow)" opacity="0.35" />
      <Wire d="M272 95 L300 95 L300 30" />
      {/* green lane (off) */}
      <Wire d="M110 95 L110 155 L130 155" />
      <Wire d="M166 155 L196 155" />
      <SwitchSymbol x={148} y={155} closed={false} />
      <ResistorSymbol x={214} y={155} />
      <Wire d="M232 155 L246 155" />
      <circle cx="260" cy="155" r="12" fill="var(--spark-green)" opacity="0.35" />
      <Wire d="M272 155 L300 155 L300 95" />
      <PanelLabel x={180} y={212}>three lanes, one switch each — only red is on</PanelLabel>
    </>
  ),

  "arduino-board": (
    <>
      <rect x="60" y="40" width="240" height="140" rx="12" fill="#0e7a8f" stroke="var(--foreground)" strokeWidth="2.5" />
      <rect x="130" y="90" width="100" height="44" rx="4" fill="#222" />
      <PanelLabel x={180} y={75}>{"Arduino"}</PanelLabel>
      <text x="180" y="117" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">brain chip</text>
      {/* pins top */}
      {[...Array(10)].map((_, i) => (
        <rect key={`t${i}`} x={80 + i * 21} y="44" width="10" height="14" fill="#111" />
      ))}
      {/* pins bottom */}
      {[...Array(10)].map((_, i) => (
        <rect key={`b${i}`} x={80 + i * 21} y="162" width="10" height="14" fill="#111" />
      ))}
      <text x="180" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--foreground)">
        input/output pins — connect LEDs, buttons, sensors
      </text>
      <PanelLabel x={180} y={205}>power pins below — runs on a battery or USB</PanelLabel>
      {/* usb */}
      <rect x="40" y="60" width="24" height="30" rx="3" fill="#999" />
      <text x="52" y="110" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--foreground)">USB</text>
    </>
  ),

  "sensor-loop": (
    <>
      {/* sense */}
      <circle cx="70" cy="70" r="36" fill="var(--spark-yellow-soft)" stroke="var(--spark-yellow)" strokeWidth="3" />
      <PanelLabel x={70} y={66}>SENSE</PanelLabel>
      <text x="70" y="84" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">light sensor: dark!</text>
      {/* think */}
      <circle cx="180" cy="150" r="36" fill="var(--spark-blue-soft)" stroke="var(--spark-blue)" strokeWidth="3" />
      <PanelLabel x={180} y={146}>THINK</PanelLabel>
      <text x="180" y="164" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">if dark → light on</text>
      {/* act */}
      <circle cx="290" cy="70" r="36" fill="var(--spark-green-soft)" stroke="var(--spark-green)" strokeWidth="3" />
      <PanelLabel x={290} y={66}>ACT</PanelLabel>
      <text x="290" y="84" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">LED turns on</text>
      {/* arrows */}
      <path d="M95 100 Q120 130 142 142" fill="none" stroke="var(--foreground)" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <path d="M218 142 Q245 125 268 100" fill="none" stroke="var(--foreground)" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <path d="M252 56 Q180 18 108 56" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrow)" />
      <text x="180" y="22" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">…and keep checking, forever</text>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--foreground)" />
        </marker>
      </defs>
    </>
  ),

  "robot-parts": (
    <>
      {/* robot body */}
      <rect x="130" y="90" width="100" height="80" rx="14" fill="var(--spark-blue)" />
      <rect x="142" y="40" width="76" height="48" rx="12" fill="var(--spark-blue)" />
      <rect x="150" y="48" width="60" height="30" rx="8" fill="#fff" />
      <circle cx="166" cy="63" r="5" fill="var(--spark-blue-deep)" />
      <circle cx="194" cy="63" r="5" fill="var(--spark-blue-deep)" />
      <circle cx="150" cy="180" r="12" fill="var(--spark-blue-deep)" />
      <circle cx="210" cy="180" r="12" fill="var(--spark-blue-deep)" />
      <rect x="155" y="108" width="50" height="34" rx="6" fill="var(--spark-yellow)" />
      {/* labels */}
      <PanelLabel x={60} y={55}>sensors</PanelLabel>
      <text x="60" y="70" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">(eyes & ears)</text>
      <line x1="88" y1="58" x2="148" y2="60" stroke="var(--muted)" strokeWidth="1.5" />
      <PanelLabel x={300} y={120}>battery</PanelLabel>
      <text x="300" y="135" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">(heart)</text>
      <line x1="272" y1="122" x2="208" y2="124" stroke="var(--muted)" strokeWidth="1.5" />
      <PanelLabel x={62} y={150}>brain chip</PanelLabel>
      <text x="62" y="165" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">(decides)</text>
      <line x1="95" y1="152" x2="152" y2="124" stroke="var(--muted)" strokeWidth="1.5" />
      <PanelLabel x={295} y={185}>motors</PanelLabel>
      <text x="295" y="200" textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="600">(muscles)</text>
      <line x1="268" y1="184" x2="224" y2="181" stroke="var(--muted)" strokeWidth="1.5" />
    </>
  ),
};
