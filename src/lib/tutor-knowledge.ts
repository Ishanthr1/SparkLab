/**
 * Built-in SparkBot tutor answers, used when no OPENROUTER_API_KEY is
 * configured (and as a safety net if the API call fails). Keyword-matched,
 * written in SparkBot's voice at a middle-school reading level.
 */

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["voltage", "volt", "push"],
    answer:
      "Voltage is the PUSH that gets electrons moving! ⚡ Think of a water slide: the higher the slide, the harder the water pushes you down. A 9-volt battery pushes harder than a 1.5-volt AA battery. We measure it in volts (V). Want to feel it in action? Try the voltage slider in the Voltage lesson in World 1!",
  },
  {
    keywords: ["current", "amp", "flow"],
    answer:
      "Current is how MUCH electricity flows past a point every second — like counting water rushing through a pipe! 🌊 A firehose has a big current, a straw has a tiny one. We measure it in amps (A). Fun fact: one amp is about 6 quintillion electrons per second zooming by!",
  },
  {
    keywords: ["resistance", "resistor", "ohm"],
    answer:
      "A resistor is a current-controller — it SQUEEZES the flow to keep it safe! Imagine pinching a straw while drinking: less gets through. We measure resistance in ohms (Ω). Resistors are super important bodyguards for LEDs, which burn out if too much current rushes through. The colored stripes on a resistor are a secret code telling you its value!",
  },
  {
    keywords: ["led", "light", "won't turn on", "wont turn on", "not lighting", "won't light", "wont light"],
    answer:
      "An LED not lighting up? Let's troubleshoot like engineers! 🔍 Check these in order: 1) Is the battery connected and fresh? 2) Is everything in ONE complete loop with no gaps? 3) Are all switches closed? 4) Is the LED facing the right way? LEDs are one-way doors — the long leg must point toward the battery's + side. 5) Still stuck? Try rebuilding it in my Circuit Simulator and I'll watch for the problem!",
  },
  {
    keywords: ["battery", "batteries"],
    answer:
      "A battery is a portable energy tank! 🔋 Inside, chemicals slowly react and push electrons toward the − end. When you connect a circuit, the electrons flow out, around the loop, and back to the + end. When the chemicals run out, the push fades — that's a dead battery. Stack two 1.5V batteries end-to-end and you get 3V of push!",
  },
  {
    keywords: ["switch", "button"],
    answer:
      "A switch is a gap you control! Flip it closed and the metal lever bridges the circuit — current flows. Flip it open and the gap stops everything instantly. Every ON/OFF button you've ever pressed is a switch, including all 100+ keys on a keyboard! ⌨️",
  },
  {
    keywords: ["circuit", "loop"],
    answer:
      "A circuit is a complete LOOP that electricity travels around — out of the battery, through your components, and back to the battery. Here's the golden rule: no complete loop, no flow! A gap anywhere (that's an 'open circuit') stops every electron in the whole loop instantly. Closed loop = working circuit. 🔁",
  },
  {
    keywords: ["series", "parallel"],
    answer:
      "Two ways to wire a circuit! SERIES = components in one single-file line. They share the battery's push (dimmer bulbs), and one break stops everything. PARALLEL = each component gets its own lane. Full brightness for everyone, and if one lane breaks, the others keep going! That's why houses are wired in parallel. Try both modes in the Series Circuits lesson lab! 🛣️",
  },
  {
    keywords: ["conductor", "insulator", "copper", "rubber", "plastic"],
    answer:
      "Conductors let electrons zoom through — metals like copper, gold, and aluminum are the superstars. Insulators block electrons completely — rubber, plastic, and glass hold their electrons tight. They're a team: every cable has a metal core (conductor) wrapped in plastic (insulator) to carry power safely. ⚡🛡️",
  },
  {
    keywords: ["short circuit", "short-circuit", "shorted"],
    answer:
      "A short circuit is when the battery gets connected straight to itself with nothing to slow the current down — like a water slide with no riders, just a flood! 🌊 The current gets HUGE, the wires and battery heat up fast, and that's dangerous in real life. Always put something in the loop (an LED, resistor, or motor) to use the energy safely.",
  },
  {
    keywords: ["electron", "atom", "charge"],
    answer:
      "Electrons are the tiny particles that carry electricity! Every atom has them zooming around its center, and they carry a negative (−) charge. In metals like copper, the outer electrons are loose — give them a push (voltage) and they hop from atom to atom down the wire. Billions of hopping electrons = electric current! ⚛️",
  },
  {
    keywords: ["arduino", "microcontroller", "code", "program"],
    answer:
      "An Arduino is a tiny computer that follows YOUR instructions to control circuits! You write a simple recipe like 'turn the LED on, wait 1 second, turn it off, repeat' — and the board obeys forever without getting bored. It was invented in 2005 so students could build cool electronics without being experts. Check out World 6 to try the blink code yourself! 🤖",
  },
  {
    keywords: ["sensor", "detect"],
    answer:
      "Sensors give circuits superpowers — they turn things in the real world (light, heat, sound, distance, motion) into electrical signals a circuit can read! Every smart machine runs the same loop: SENSE the world → THINK with code → ACT with lights or motors. A streetlight turning on at night? That's a light sensor doing the sensing! 💡",
  },
  {
    keywords: ["robot", "robotics"],
    answer:
      "A robot (like me! 🤖) is a machine that can sense, decide, and act on its own. The parts mirror a body: sensors are the eyes and ears, the microcontroller is the brain, motors are the muscles, and the battery is the heart. The cool secret? You already know all these pieces from the lessons — robotics is everything combined!",
  },
  {
    keywords: ["ohm's law", "ohms law", "formula", "equation"],
    answer:
      "Ohm's Law is the most famous rule in electronics: current = voltage ÷ resistance. In plain words: push harder (more volts) and you get more flow; squeeze tighter (more ohms) and you get less flow. With it, engineers can predict exactly how any circuit will behave before building it. Pretty powerful for one little equation! 🧮",
  },
  {
    keywords: ["safe", "safety", "danger", "shock", "outlet"],
    answer:
      "Great question — engineers ALWAYS think about safety first! 🦺 The rules: never play with wall outlets (120 volts is seriously dangerous), never touch electrical things with wet hands, and only experiment with small batteries (9 volts or less) — they're safe to learn with. My simulator is 100% safe, so experiment wildly there!",
  },
  {
    keywords: ["watt", "power", "energy"],
    answer:
      "Power is how FAST energy gets used, measured in watts (W). It's voltage × current — the push times the flow! A phone charger uses about 20 watts, a microwave about 1000. The 'energy' on your family's electric bill is power × time. More watts running for more hours = more energy used. 💡",
  },
  {
    keywords: ["streak", "xp", "badge", "level", "points"],
    answer:
      "Here's how rewards work: finish lessons for lesson XP, ace quizzes for quiz XP (perfect scores get a bonus!), and build working circuits in the simulator for build XP. XP raises your level — from Junior Inventor all the way to Master Engineer at level 20! Learning on back-to-back days builds your streak, and badges drop for special feats. Check 'My Progress' to see your collection! 🏆",
  },
];

const DEFAULT_ANSWER =
  "Hmm, that's a great question — and a bit outside what I've studied so far! 🤔 I'm an expert on electricity, circuits, components, and robots. Try asking me things like 'What is voltage?', 'Why won't my LED turn on?', or 'What does a resistor do?' Or explore the learning path — the answer might be hiding in a lesson!";

export function answerFromKnowledge(question: string): string {
  const q = question.toLowerCase();
  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.filter((k) => q.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }
  return best ? best.entry.answer : DEFAULT_ANSWER;
}

/** Shared SparkBot persona for the LLM-backed tutor. */
export const TUTOR_SYSTEM_PROMPT = `You are SparkBot, a friendly robot tutor on an electronics-learning platform for students ages 11-14. Your spaceship crash-landed and students help repair it by learning electronics.

Personality: friendly, curious, funny, encouraging, never condescending. You celebrate effort and treat mistakes as a normal part of engineering ("Engineers make mistakes all the time!").

Rules:
- Middle-school reading level. Short sentences. No unexplained jargon.
- Use vivid analogies (water in pipes for current, water-slide height for voltage, pinched straws for resistance).
- Keep answers short: 2-5 sentences for simple questions, never more than ~150 words.
- Stay on topic: electricity, circuits, components, Arduino, sensors, robots, and the SparkBot platform itself. If asked about anything else (other school subjects, personal advice, inappropriate topics), cheerfully redirect to electronics in one sentence.
- Never give instructions involving wall outlets, mains electricity, or anything unsafe. Recommend small batteries (9V or less) and the on-platform circuit simulator.
- When troubleshooting circuits, walk through it step by step: power, complete loop, switches closed, LED direction, resistor for safety.
- Occasionally suggest a relevant lesson world or the circuit simulator.
- A few emoji are fine. No markdown headers or long lists.`;
