import type { World } from "@/types";

export const world1: World = {
  id: 1,
  slug: "intro-to-electricity",
  title: "Introduction to Electricity",
  tagline: "Discover the invisible energy that powers everything",
  description:
    "Where does electricity come from? Meet the tiny particles behind every spark, and learn the three big ideas — current, voltage, and resistance — that engineers use every day.",
  color: "blue",
  shipPart: {
    name: "Power Core",
    repairMessage:
      "ZAP! The Power Core hums back to life. Great work — my ship has energy again!",
  },
  lessons: [
    {
      slug: "what-is-electricity",
      title: "What Is Electricity?",
      description: "The invisible energy hiding in everything around you.",
      xpReward: 60,
      minutes: 8,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Hi! I'm SparkBot! My spaceship crash-landed and its Power Core is dead. To fix it, I need a partner who understands electricity. Ready for your first mission?",
        },
        {
          type: "text",
          heading: "Energy on the move",
          body: "Electricity is energy carried by tiny particles that are way too small to see. When those particles move together in the same direction, they can light up bulbs, spin motors, and power your tablet. No moving particles, no electricity — it's that simple.",
        },
        {
          type: "analogy",
          title: "Think of a crowd doing 'the wave'",
          body: "At a stadium, one person stands, then the next, then the next — and a wave of energy travels around the whole stadium even though each person only moves a little. Electricity works the same way: each particle nudges the next, and energy zooms down the wire.",
        },
        {
          type: "interactive",
          widget: "static-balloon",
          prompt: "Rub the balloon on the sweater, then bring it near the wall. That tiny crackle? That's electricity you made yourself!",
        },
        {
          type: "fact",
          title: "Lightning is giant static electricity",
          body: "A lightning bolt is the same kind of spark you feel after shuffling on carpet — just about a billion times stronger. It can heat the air around it to 30,000°C. That's five times hotter than the surface of the Sun!",
        },
        {
          type: "realWorld",
          title: "Where you'll find it",
          body: "Phones, refrigerators, traffic lights, electric cars, your school bell — and your own body! Your brain sends tiny electrical signals to your muscles every time you move.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "See? You already know more about electricity than most grown-ups. Quiz time — show me what you've got!",
        },
      ],
      quiz: [
        {
          id: "wie-1",
          type: "multiple-choice",
          prompt: "What is electricity?",
          options: [
            "Energy carried by tiny moving particles",
            "A kind of light",
            "Hot air moving through wires",
            "A type of metal",
          ],
          correctIndex: 0,
          explanation:
            "Electricity is energy carried by tiny particles moving together. The light and heat we see are things electricity can make — not what it is.",
        },
        {
          id: "wie-2",
          type: "true-false",
          prompt: "Lightning is a giant version of the static spark you feel after shuffling on carpet.",
          answer: true,
          explanation:
            "Both are static electricity — a sudden jump of built-up charge. Lightning is just enormously bigger and stronger.",
        },
        {
          id: "wie-3",
          type: "multiple-choice",
          prompt: "In the stadium-wave analogy, what travels around the stadium?",
          options: ["The people", "The energy", "The seats", "The ball"],
          correctIndex: 1,
          explanation:
            "Each person only moves a little, but the energy of the wave travels all the way around — just like energy travels along a wire.",
        },
        {
          id: "wie-4",
          type: "true-false",
          prompt: "Your own body uses electrical signals.",
          answer: true,
          explanation:
            "Your brain talks to your muscles using tiny electrical signals. You're a little bit electric!",
        },
      ],
    },
    {
      slug: "electrons",
      title: "Meet the Electrons",
      description: "The tiny particles that carry every electric charge.",
      xpReward: 60,
      minutes: 9,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "Time to meet my favorite particles in the whole universe: electrons! They're the workers that carry electricity everywhere.",
        },
        {
          type: "text",
          heading: "Everything is made of atoms",
          body: "Every single thing — your desk, the air, you — is built from atoms. An atom has a center (the nucleus) with even tinier particles called electrons zooming around it. Electrons carry a negative electric charge, written as a minus sign (−).",
        },
        {
          type: "diagram",
          diagram: "atom",
          caption: "An atom: protons (+) and neutrons in the middle, electrons (−) zooming around the outside.",
        },
        {
          type: "text",
          heading: "Loose electrons make electricity",
          body: "In some materials, like copper metal, the outermost electrons are barely held in place. Give them a push, and they hop from atom to atom down the wire. Billions and billions of hopping electrons — that's an electric current!",
        },
        {
          type: "interactive",
          widget: "electron-pump",
          prompt: "Press the pump to push electrons through the wire. Watch how they all nudge each other forward!",
        },
        {
          type: "fact",
          title: "Unbelievably tiny",
          body: "If an atom were blown up to the size of a football stadium, the nucleus would be a marble at the center — and electrons would be specks of dust flying around the stands.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Electrons: tiny, negative, and always ready to move. Remember that and you're golden!",
        },
      ],
      quiz: [
        {
          id: "el-1",
          type: "multiple-choice",
          prompt: "What electric charge does an electron carry?",
          options: ["Positive (+)", "Negative (−)", "No charge", "Both at once"],
          correctIndex: 1,
          explanation: "Electrons always carry a negative charge. Protons in the nucleus carry the positive charge.",
        },
        {
          id: "el-2",
          type: "multiple-choice",
          prompt: "Why is copper great for carrying electricity?",
          options: [
            "It's shiny",
            "Its outer electrons can hop easily from atom to atom",
            "It's very heavy",
            "It stays cool",
          ],
          correctIndex: 1,
          explanation:
            "Copper's outermost electrons are loosely held, so they move easily — perfect for carrying current.",
        },
        {
          id: "el-3",
          type: "match",
          prompt: "Match each particle to its home in the atom.",
          pairs: [
            { left: "Electron", right: "Zooms around the outside" },
            { left: "Proton", right: "Sits in the nucleus with a + charge" },
            { left: "Neutron", right: "Sits in the nucleus with no charge" },
          ],
          explanation:
            "Protons and neutrons pack together in the nucleus; electrons orbit around the outside.",
        },
        {
          id: "el-4",
          type: "true-false",
          prompt: "Electric current is billions of electrons moving through a material.",
          answer: true,
          explanation: "When loose electrons all drift the same direction, their movement is what we call current.",
        },
      ],
    },
    {
      slug: "current",
      title: "Current: The Flow",
      description: "How we measure electrons on the move.",
      xpReward: 60,
      minutes: 9,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "My ship's Power Core needs the right FLOW of electricity. Engineers call that flow 'current' — let's measure it!",
        },
        {
          type: "text",
          heading: "Current = how much charge flows",
          body: "Current tells you how many electrons pass a point in the wire every second. More electrons per second = bigger current. We measure current in amperes — 'amps' (A) for short.",
        },
        {
          type: "diagram",
          diagram: "water-current",
          caption: "A wide, fast river moves lots of water — a big current. A trickle moves only a little — a small current.",
        },
        {
          type: "analogy",
          title: "Water in a pipe",
          body: "Imagine electricity as water flowing through a pipe. Current is how much water rushes past you each second. A firehose has a huge current; a drinking straw has a tiny one.",
        },
        {
          type: "fact",
          title: "How big is an amp?",
          body: "One amp is about 6 quintillion electrons (a 6 with 18 zeros!) passing by every second. A phone charger uses about 1–2 amps. A lightning bolt? Around 30,000 amps!",
        },
        {
          type: "realWorld",
          title: "Why fuses save houses",
          body: "If too much current flows through a wire, the wire heats up — which can start fires. Fuses and circuit breakers are safety guards that cut the flow when the current gets too big.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Current: the flow of electrons, measured in amps. You're 3 lessons away from restarting my Power Core!",
        },
      ],
      quiz: [
        {
          id: "cu-1",
          type: "multiple-choice",
          prompt: "What does electric current measure?",
          options: [
            "How hot a wire is",
            "How much charge flows past a point each second",
            "How long a wire is",
            "How bright a light is",
          ],
          correctIndex: 1,
          explanation: "Current counts the flow of charge per second — like counting water rushing through a pipe.",
        },
        {
          id: "cu-2",
          type: "multiple-choice",
          prompt: "Which unit do we use for current?",
          options: ["Volts (V)", "Amps (A)", "Ohms (Ω)", "Watts (W)"],
          correctIndex: 1,
          explanation: "Current is measured in amperes — amps for short. Volts measure voltage and ohms measure resistance.",
        },
        {
          id: "cu-3",
          type: "true-false",
          prompt: "In the water analogy, current is like how much water flows through the pipe each second.",
          answer: true,
          explanation: "Exactly — a firehose has a big current, a straw has a small one.",
        },
        {
          id: "cu-4",
          type: "multiple-choice",
          prompt: "Why are fuses and circuit breakers important?",
          options: [
            "They make electricity cheaper",
            "They cut off the flow when current gets dangerously high",
            "They make lights brighter",
            "They store extra electrons",
          ],
          correctIndex: 1,
          explanation: "Too much current overheats wires. Fuses and breakers stop the flow before that becomes dangerous.",
        },
      ],
    },
    {
      slug: "voltage",
      title: "Voltage: The Push",
      description: "The pressure that gets electrons moving.",
      xpReward: 60,
      minutes: 9,
      sections: [
        {
          type: "spark",
          mood: "thinking",
          text: "Hmm... electrons don't move on their own. Something has to PUSH them. That push has a name: voltage!",
        },
        {
          type: "text",
          heading: "Voltage = the push",
          body: "Voltage is the amount of push (or pressure) that drives electrons through a circuit. More voltage means a stronger push. We measure it in volts (V) — named after Alessandro Volta, who built the first battery in 1800.",
        },
        {
          type: "diagram",
          diagram: "water-pressure",
          caption: "A tall water tank pushes water harder than a short one. Higher voltage pushes electrons harder, too.",
        },
        {
          type: "interactive",
          widget: "voltage-slider",
          prompt: "Slide the voltage up and down. Watch how a stronger push makes the electrons race and the bulb glow brighter!",
        },
        {
          type: "fact",
          title: "Volts around you",
          body: "AA battery: 1.5 V. Phone battery: about 3.7 V. Wall outlet: 120 V (in the US). Lightning: up to 300 million volts! That's why wall outlets and storms deserve respect.",
        },
        {
          type: "realWorld",
          title: "Why batteries have two ends",
          body: "A battery's two ends (+ and −) are like the top and bottom of a water slide. The difference between them creates the push. No difference, no push — a dead battery is one where the difference has run out.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Voltage pushes, current flows. One more lesson and you'll have all three power words!",
        },
      ],
      quiz: [
        {
          id: "vo-1",
          type: "multiple-choice",
          prompt: "What is voltage?",
          options: [
            "The number of electrons in a wire",
            "The push that drives electrons through a circuit",
            "The heat in a circuit",
            "The speed of light",
          ],
          correctIndex: 1,
          explanation: "Voltage is the electrical push (pressure). Without it, electrons just sit there.",
        },
        {
          id: "vo-2",
          type: "match",
          prompt: "Match each item to its approximate voltage.",
          pairs: [
            { left: "AA battery", right: "1.5 volts" },
            { left: "Wall outlet (US)", right: "120 volts" },
            { left: "Lightning bolt", right: "Millions of volts" },
          ],
          explanation: "Small batteries are gentle pushes; outlets are strong; lightning is off the charts.",
        },
        {
          id: "vo-3",
          type: "true-false",
          prompt: "A higher voltage means a stronger push on the electrons.",
          answer: true,
          explanation: "More volts = more push, like a taller water tank pushing water harder.",
        },
        {
          id: "vo-4",
          type: "multiple-choice",
          prompt: "Which component gives a circuit its voltage 'push'?",
          options: ["The wire", "The battery", "The light bulb", "The switch"],
          correctIndex: 1,
          explanation: "The battery creates the difference between + and − that pushes electrons around the circuit.",
        },
      ],
    },
    {
      slug: "resistance",
      title: "Resistance: The Squeeze",
      description: "What slows electrons down — and why that's useful.",
      xpReward: 60,
      minutes: 10,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "Last power word! If voltage is the push and current is the flow, resistance is the SQUEEZE that slows things down. And trust me — sometimes slowing down saves the day.",
        },
        {
          type: "text",
          heading: "Resistance = how hard it is for current to flow",
          body: "Every material fights the flow of electrons a little. That fight is called resistance, measured in ohms (Ω). Thin wires, long wires, and certain materials have more resistance — they slow the current down and turn some energy into heat.",
        },
        {
          type: "diagram",
          diagram: "resistance-pipe",
          caption: "A skinny, clogged pipe resists water flow. A resistor does the same thing to electric current.",
        },
        {
          type: "interactive",
          widget: "resistance-dimmer",
          prompt: "Crank the resistance up and down. More squeeze = less current = dimmer bulb. You just built a dimmer switch!",
        },
        {
          type: "fact",
          title: "The big three, together",
          body: "Voltage, current, and resistance are connected by one famous rule — Ohm's Law: current = voltage ÷ resistance. Push harder (more volts), get more flow. Squeeze tighter (more ohms), get less flow.",
        },
        {
          type: "realWorld",
          title: "Resistance is everywhere",
          body: "Toasters use high-resistance wire to glow red-hot and toast bread. Dimmer knobs use resistance to soften the lights. And resistors protect delicate parts — like LEDs — from too much current.",
        },
        {
          type: "spark",
          mood: "cheering",
          text: "Voltage pushes. Current flows. Resistance squeezes. Ace this quiz and my Power Core comes back ONLINE!",
        },
      ],
      quiz: [
        {
          id: "re-1",
          type: "multiple-choice",
          prompt: "What does resistance do in a circuit?",
          options: [
            "Speeds up the electrons",
            "Slows down the flow of current",
            "Adds more electrons",
            "Stores energy for later",
          ],
          correctIndex: 1,
          explanation: "Resistance fights the flow, reducing the current — like a squeeze in a water pipe.",
        },
        {
          id: "re-2",
          type: "match",
          prompt: "Match each quantity to its unit.",
          pairs: [
            { left: "Voltage", right: "Volts (V)" },
            { left: "Current", right: "Amps (A)" },
            { left: "Resistance", right: "Ohms (Ω)" },
          ],
          explanation: "The big three: volts push, amps flow, ohms resist.",
        },
        {
          id: "re-3",
          type: "true-false",
          prompt: "If you increase resistance and keep the voltage the same, the current gets smaller.",
          answer: true,
          explanation: "Ohm's Law: current = voltage ÷ resistance. A bigger bottom number means a smaller answer.",
        },
        {
          id: "re-4",
          type: "multiple-choice",
          prompt: "Which gadget uses high resistance ON PURPOSE to make heat?",
          options: ["A toaster", "A phone charger", "A light switch", "A battery"],
          correctIndex: 0,
          explanation: "A toaster's wires resist current so much they glow red-hot — perfect for toasting bread.",
        },
      ],
    },
  ],
};

export const world2: World = {
  id: 2,
  slug: "circuit-basics",
  title: "Circuit Basics",
  tagline: "Learn the loop that makes everything work",
  description:
    "Electricity only flows in a complete loop called a circuit. Learn what opens and closes the loop, and which materials let electrons through — or block them cold.",
  color: "yellow",
  shipPart: {
    name: "Navigation System",
    repairMessage:
      "BEEP-BOOP! The Navigation System is back online. Now my ship knows which way is home!",
  },
  lessons: [
    {
      slug: "open-circuits",
      title: "Open Circuits",
      description: "Why a broken loop means nothing works.",
      xpReward: 60,
      minutes: 8,
      sections: [
        {
          type: "spark",
          mood: "oops",
          text: "Uh oh — my ship's Navigation System won't turn on. The wires look fine... but there's a GAP somewhere. Let's investigate!",
        },
        {
          type: "text",
          heading: "Electricity needs a complete loop",
          body: "A circuit is a loop that runs from one end of a battery, through wires and components, and back to the other end. Electrons only flow when the loop is complete. If there's a gap anywhere — even a tiny one — the flow stops everywhere instantly.",
        },
        {
          type: "diagram",
          diagram: "open-vs-closed",
          caption: "Left: an open circuit — the gap stops everything. Right: a closed circuit — the loop is complete and the bulb lights.",
        },
        {
          type: "analogy",
          title: "A broken bike chain",
          body: "If a bike chain snaps in one spot, the whole chain stops — not just the broken link. An open circuit is the same: one gap stops every electron in the loop.",
        },
        {
          type: "fact",
          title: "Open isn't always bad",
          body: "Every time you turn a light OFF, you're opening the circuit on purpose! A switch is just a tool for making a gap exactly when you want one.",
        },
        {
          type: "spark",
          mood: "thinking",
          text: "So when something won't turn on, an engineer's first question is: 'Where's the gap?' Remember that — it'll make you a great troubleshooter.",
        },
      ],
      quiz: [
        {
          id: "oc-1",
          type: "multiple-choice",
          prompt: "What is an open circuit?",
          options: [
            "A circuit with a gap, so current can't flow",
            "A circuit that's turned on",
            "A circuit with too many batteries",
            "A circuit outdoors",
          ],
          correctIndex: 0,
          explanation: "Open = there's a break in the loop. No complete loop, no flow.",
        },
        {
          id: "oc-2",
          type: "circuit-id",
          prompt: "Look at this circuit. Why isn't the bulb lighting up?",
          figure: "open-loop",
          options: [
            "The battery is dead",
            "There's a gap in the loop",
            "The bulb is broken",
            "The wires are too long",
          ],
          correctIndex: 1,
          explanation: "The loop isn't complete — see the gap in the wire? Electrons can't jump across, so nothing flows.",
        },
        {
          id: "oc-3",
          type: "true-false",
          prompt: "In an open circuit, electrons keep flowing but more slowly.",
          answer: false,
          explanation: "A gap stops the flow completely — not just slows it. It's all or nothing.",
        },
        {
          id: "oc-4",
          type: "multiple-choice",
          prompt: "Turning a light OFF with a switch...",
          options: [
            "closes the circuit",
            "opens the circuit",
            "removes the battery",
            "reverses the current",
          ],
          correctIndex: 1,
          explanation: "The switch makes a gap — opening the circuit on purpose so current stops.",
        },
      ],
    },
    {
      slug: "closed-circuits",
      title: "Closed Circuits",
      description: "Complete the loop and watch things come alive.",
      xpReward: 60,
      minutes: 8,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Now for the satisfying part: CLOSING the loop. Flip the switch, complete the circuit, and watch everything light up!",
        },
        {
          type: "text",
          heading: "Closed = complete = working",
          body: "A closed circuit has no gaps. Electrons leave the battery's negative end, travel through every wire and component in the loop, and arrive back at the positive end. As long as the loop stays closed and the battery has energy, the flow keeps going.",
        },
        {
          type: "interactive",
          widget: "switch-loop",
          prompt: "Flip the switch to close the loop. Watch the electrons start moving and the bulb light up — then open it again and see everything freeze.",
        },
        {
          type: "text",
          heading: "Everything in the loop matters",
          body: "In a simple loop, every component is part of the same path. The current that flows through the bulb is the same current that flows through the switch and the battery. They're a team — remove one player and the game stops.",
        },
        {
          type: "realWorld",
          title: "Doorbells are closed circuits waiting to happen",
          body: "A doorbell button is a switch held open by a spring. Press it, the circuit closes, current flows, and DING! Let go, the spring opens the gap again.",
        },
        {
          type: "tryIt",
          body: "Head to the Circuit Simulator and build your first closed loop: battery → wire → LED → wire → back to battery. (Add a resistor to keep the LED safe!)",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Open = stop. Closed = go. You now speak fluent Circuit!",
        },
      ],
      quiz: [
        {
          id: "cc-1",
          type: "circuit-id",
          prompt: "This loop is complete with a battery, resistor, and LED. What happens?",
          figure: "closed-loop",
          options: [
            "Nothing — circuits need a switch",
            "The LED lights up",
            "The battery instantly dies",
            "The wires melt",
          ],
          correctIndex: 1,
          explanation: "A complete loop with power and a safe path means current flows — and the LED lights!",
        },
        {
          id: "cc-2",
          type: "true-false",
          prompt: "In a closed loop, the current flowing through the bulb is the same current flowing through the battery.",
          answer: true,
          explanation: "One loop = one path = one current passing through every part in turn.",
        },
        {
          id: "cc-3",
          type: "multiple-choice",
          prompt: "What does a doorbell button do when you press it?",
          options: [
            "Opens the circuit",
            "Closes the circuit so current can flow",
            "Adds voltage",
            "Charges the battery",
          ],
          correctIndex: 1,
          explanation: "Pressing the button bridges the gap — closing the loop and ringing the bell.",
        },
        {
          id: "cc-4",
          type: "multiple-choice",
          prompt: "Electrons in a circuit flow from...",
          options: [
            "the battery's negative end, around the loop, to the positive end",
            "the bulb to the switch only",
            "both ends of the battery at once toward the middle",
            "nowhere — they teleport",
          ],
          correctIndex: 0,
          explanation: "Electrons are pushed out of the − end, travel the loop, and return to the + end.",
        },
      ],
    },
    {
      slug: "conductors",
      title: "Conductors",
      description: "Materials that let electrons zoom through.",
      xpReward: 60,
      minutes: 8,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "Ever wonder why wires are metal but their coating is plastic? It's all about which materials let electrons through. First up: the speedy ones!",
        },
        {
          type: "text",
          heading: "Conductors let current flow",
          body: "A conductor is a material whose electrons can move freely. Metals are the superstars: copper, gold, silver, and aluminum all have loose outer electrons ready to carry current. That's why almost every wire on Earth has metal inside.",
        },
        {
          type: "interactive",
          widget: "conductor-tester",
          prompt: "Test each object in the circuit. If the bulb lights, it's a conductor. Predict before you test!",
        },
        {
          type: "fact",
          title: "Water + you = careful!",
          body: "Pure water barely conducts, but the water around us (with salts dissolved in it) conducts well — and so do human bodies, because we're mostly salty water. That's why you must NEVER touch electrical things with wet hands.",
        },
        {
          type: "realWorld",
          title: "Why gold connectors?",
          body: "Fancy cables and computer chips use gold on their contacts. Gold isn't the very best conductor (silver is), but it never rusts, so the connection stays clean and reliable for decades.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Metals conduct, electrons zoom. Next lesson: the materials that say 'NO WAY' to electrons.",
        },
      ],
      quiz: [
        {
          id: "co-1",
          type: "multiple-choice",
          prompt: "What makes a material a good conductor?",
          options: [
            "It's shiny",
            "Its electrons can move freely",
            "It's very hard",
            "It's expensive",
          ],
          correctIndex: 1,
          explanation: "Conductors have loose electrons that are free to move and carry current.",
        },
        {
          id: "co-2",
          type: "match",
          prompt: "Sort these materials: conductor or insulator?",
          pairs: [
            { left: "Copper wire", right: "Conductor" },
            { left: "Rubber band", right: "Insulator" },
            { left: "Aluminum foil", right: "Conductor" },
            { left: "Glass cup", right: "Insulator" },
          ],
          explanation: "Metals like copper and aluminum conduct; rubber and glass block the flow.",
        },
        {
          id: "co-3",
          type: "true-false",
          prompt: "It's safe to touch electrical outlets with wet hands because water blocks electricity.",
          answer: false,
          explanation: "The opposite! Everyday water conducts electricity, which makes wet hands extra dangerous near outlets.",
        },
        {
          id: "co-4",
          type: "multiple-choice",
          prompt: "Why is gold used on high-quality connectors?",
          options: [
            "It's the best conductor in the world",
            "It never rusts, so connections stay reliable",
            "It makes electricity faster than light",
            "It's magnetic",
          ],
          correctIndex: 1,
          explanation: "Gold conducts well AND resists corrosion, so the contact stays clean for years.",
        },
      ],
    },
    {
      slug: "insulators",
      title: "Insulators",
      description: "The materials that keep electricity where it belongs.",
      xpReward: 60,
      minutes: 8,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "Conductors are great — but without their opposites, every wire would be a hazard. Meet the bodyguards of electronics: insulators!",
        },
        {
          type: "text",
          heading: "Insulators block the flow",
          body: "An insulator is a material whose electrons are held tightly in place — they can't break free to carry current. Rubber, plastic, glass, dry wood, and ceramic are all insulators. Electricity hits them and just... stops.",
        },
        {
          type: "diagram",
          diagram: "conductor-insulator",
          caption: "In a conductor, electrons roam free. In an insulator, every electron is locked to its atom.",
        },
        {
          type: "text",
          heading: "Conductors and insulators work as a team",
          body: "Look at any cable: a metal core (conductor) carries the current, and a plastic coat (insulator) keeps it from escaping into your hand. Almost every electrical device is conductors and insulators teamed up in clever ways.",
        },
        {
          type: "fact",
          title: "Power line birds",
          body: "Birds can sit on power lines safely because electricity has no reason to leave the wire — the bird isn't connected to the ground, so there's no loop through its body. No loop, no flow!",
        },
        {
          type: "realWorld",
          title: "Those stacks of discs on power poles",
          body: "See the stacks of ceramic discs where power lines meet the pole? Those are giant insulators, keeping thousands of volts from leaking into the pole and down to the ground.",
        },
        {
          type: "spark",
          mood: "cheering",
          text: "Conductors carry, insulators protect. Pass this quiz and the Navigation System is FIXED!",
        },
      ],
      quiz: [
        {
          id: "in-1",
          type: "multiple-choice",
          prompt: "Why can't insulators carry current?",
          options: [
            "Their electrons are locked tightly to their atoms",
            "They have no atoms",
            "They're too cold",
            "They're too thin",
          ],
          correctIndex: 0,
          explanation: "Insulator electrons can't break free, so there's nothing to carry the current.",
        },
        {
          id: "in-2",
          type: "multiple-choice",
          prompt: "In a power cable, what job does the plastic coating do?",
          options: [
            "Carries the current",
            "Keeps the current inside and protects your hands",
            "Makes the cable look nice",
            "Stores extra energy",
          ],
          correctIndex: 1,
          explanation: "The plastic is an insulator — it stops current from leaking out of the metal core.",
        },
        {
          id: "in-3",
          type: "true-false",
          prompt: "A bird on a power line is safe because its body doesn't complete a loop to the ground.",
          answer: true,
          explanation: "No loop, no flow! If the bird touched the wire AND the pole, that would be a different story.",
        },
        {
          id: "in-4",
          type: "match",
          prompt: "Match each part of a cable to its material type.",
          pairs: [
            { left: "Copper core", right: "Conductor" },
            { left: "Plastic coating", right: "Insulator" },
            { left: "Rubber grip on pliers", right: "Insulator" },
          ],
          explanation: "Metal carries the flow; rubber and plastic keep it contained and keep you safe.",
        },
      ],
    },
  ],
};
