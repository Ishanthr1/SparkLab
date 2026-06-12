import type { World } from "@/types";

export const world5: World = {
  id: 5,
  slug: "real-projects",
  title: "Real Projects",
  tagline: "Put it all together and build real things",
  description:
    "You know the parts. You know the wiring. Now design real devices — a flashlight, an alarm, and a traffic light — exactly the way engineers do.",
  color: "purple",
  shipPart: {
    name: "Shield Generator",
    repairMessage:
      "SHWOOM! The Shield Generator wraps the ship in a protective glow. Asteroids, beware!",
  },
  lessons: [
    {
      slug: "flashlight",
      title: "Project: Flashlight",
      description: "Design the classic pocket light, piece by piece.",
      xpReward: 80,
      minutes: 12,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Project time! Every engineer remembers their first build. Ours is a classic: the flashlight. You already know every part it needs!",
        },
        {
          type: "text",
          heading: "What does a flashlight need?",
          body: "Think about what a flashlight does: it makes light, when YOU want it, anywhere you go. So it needs: a power source (battery), a light (LED), a way to control it (switch), protection for the LED (resistor), and a loop to connect them (wires).",
        },
        {
          type: "diagram",
          diagram: "flashlight-exploded",
          caption: "A flashlight, exploded view: battery → switch → resistor → LED, all in one series loop inside a tube.",
        },
        {
          type: "text",
          heading: "Why series?",
          body: "A flashlight uses a series loop on purpose: one path means the switch controls everything. When the switch opens, the whole loop stops — exactly what OFF should mean. Simple, reliable, and battery-friendly.",
        },
        {
          type: "text",
          heading: "Engineer's design notes",
          body: "Real flashlight designers ask: How bright? (Pick the LED and resistor.) How long should batteries last? (Brightness vs. battery life is a trade-off.) What if it's dropped? (The case is an insulator that also takes the bumps.) Every product you own went through choices like these.",
        },
        {
          type: "fact",
          title: "From 1899 to your pocket",
          body: "The first flashlight (1899) used a weak bulb and crude batteries — it could only flash briefly, which is how it got its name! Modern LED flashlights shine hundreds of times brighter on the same batteries.",
        },
        {
          type: "tryIt",
          body: "Build the flashlight circuit in the Simulator: battery → switch → resistor → LED, in one loop. Flip the switch and feel the magic of your first complete device!",
        },
        {
          type: "spark",
          mood: "cheering",
          text: "You just designed a real product. Take the quiz, then go build it for real in the simulator!",
        },
      ],
      quiz: [
        {
          id: "fl-1",
          type: "match",
          prompt: "Match each flashlight part to its job.",
          pairs: [
            { left: "Battery", right: "Provides the energy" },
            { left: "Switch", right: "Turns it on and off" },
            { left: "Resistor", right: "Protects the LED" },
            { left: "LED", right: "Makes the light" },
          ],
          explanation: "Four parts, four jobs — and you know them all.",
        },
        {
          id: "fl-2",
          type: "multiple-choice",
          prompt: "Why is a flashlight wired in series instead of parallel?",
          options: [
            "Series is always brighter",
            "One switch must control the whole loop",
            "Parallel circuits don't work with batteries",
            "It's prettier",
          ],
          correctIndex: 1,
          explanation: "With one path, opening the switch stops everything — exactly what OFF means.",
        },
        {
          id: "fl-3",
          type: "circuit-id",
          prompt: "Here's the flashlight loop with the switch closed. What is the current's path?",
          figure: "closed-loop",
          options: [
            "Battery → resistor → LED → back to battery",
            "Battery → LED only",
            "It stays inside the battery",
            "LED → resistor → LED again",
          ],
          correctIndex: 0,
          explanation: "Current flows out of the battery, through every series component, and back — one complete loop.",
        },
        {
          id: "fl-4",
          type: "true-false",
          prompt: "Making a flashlight brighter usually means its batteries run out faster.",
          answer: true,
          explanation: "Brightness needs current, and current drains batteries — a classic engineering trade-off.",
        },
      ],
    },
    {
      slug: "alarm-system",
      title: "Project: Alarm System",
      description: "Build a circuit that guards a door.",
      xpReward: 80,
      minutes: 12,
      sections: [
        {
          type: "spark",
          mood: "thinking",
          text: "Mission two: protect my ship from space raccoons! We need an alarm that goes off when the door opens. Tricky part: the circuit must turn ON when something... opens?",
        },
        {
          type: "text",
          heading: "Reverse thinking",
          body: "A flashlight turns on when you CLOSE a switch. An alarm is sneakier: it should trigger when a door OPENS. Engineers solve this with a clever trick — the door itself becomes part of the circuit.",
        },
        {
          type: "diagram",
          diagram: "alarm-circuit",
          caption: "The door holds a switch closed... on a wire that keeps the alarm OFF. Open the door, and the alarm circuit springs to life.",
        },
        {
          type: "text",
          heading: "How it works",
          body: "A magnet on the door holds a special switch in one position. While the door is shut, the alarm path stays off. Open the door, the magnet moves away, the switch flips — and current flows to the buzzer. The 'event' you're detecting becomes the thing that completes the circuit.",
        },
        {
          type: "realWorld",
          title: "This is real security tech",
          body: "Look at the top edge of shop doors and house windows: those little white blocks are magnetic switches exactly like this. Office buildings, museums, and bank vaults all use circuits that watch for an opened loop.",
        },
        {
          type: "fact",
          title: "Sensors are just fancy switches",
          body: "Motion sensors, smoke detectors, and pressure mats are all 'switches' flipped by the world instead of by fingers. Once you think of sensors as switches, you can design almost any alarm.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Detect an event → let it complete a circuit → BZZZZT! That's the secret of every alarm ever built.",
        },
      ],
      quiz: [
        {
          id: "al-1",
          type: "multiple-choice",
          prompt: "What's the clever trick behind a door alarm?",
          options: [
            "The door opening completes the alarm circuit",
            "The alarm runs all the time",
            "The buzzer detects sound",
            "The battery only works at night",
          ],
          correctIndex: 0,
          explanation: "The event you're watching for (door opening) is what lets current reach the buzzer.",
        },
        {
          id: "al-2",
          type: "true-false",
          prompt: "Sensors like motion detectors can be thought of as switches flipped by the world instead of by fingers.",
          answer: true,
          explanation: "Exactly — heat, motion, light, or pressure does the flipping instead of a finger.",
        },
        {
          id: "al-3",
          type: "multiple-choice",
          prompt: "Those small white blocks on the edges of shop doors and windows are...",
          options: [
            "Decorations",
            "Magnetic switches for the alarm circuit",
            "Tiny speakers",
            "Spare batteries",
          ],
          correctIndex: 1,
          explanation: "They're magnet-and-switch pairs — open the door and the switch flips, triggering the alarm.",
        },
        {
          id: "al-4",
          type: "match",
          prompt: "Match each alarm part to its role.",
          pairs: [
            { left: "Magnetic switch", right: "Detects the door opening" },
            { left: "Buzzer", right: "Makes the alarm sound" },
            { left: "Battery", right: "Powers the circuit" },
          ],
          explanation: "Detector, alert, and power — the three pieces of any alarm system.",
        },
      ],
    },
    {
      slug: "traffic-light",
      title: "Project: Traffic Light",
      description: "Three LEDs, working in sequence.",
      xpReward: 80,
      minutes: 12,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Final project of this world: a traffic light! Three LEDs that must take turns — red, then green, then yellow. Taking turns is a brand-new engineering puzzle.",
        },
        {
          type: "text",
          heading: "Three lights, three lanes",
          body: "Red, yellow, and green LEDs each get their own parallel lane with their own resistor. Why parallel? Because each light must shine at full brightness, and only one should be on at a time — so each lane needs its own control.",
        },
        {
          type: "diagram",
          diagram: "traffic-light",
          caption: "Three LED lanes in parallel, each with its own switch. Only one lane closed at a time = a working traffic light.",
        },
        {
          type: "text",
          heading: "The sequence problem",
          body: "With three hand switches, YOU are the timer: close red... wait... open red and close green... and so on. Real traffic lights replace your hands with a controller — a small computer that opens and closes electronic switches on a schedule. Same circuit, automatic fingers.",
        },
        {
          type: "realWorld",
          title: "Smarter every year",
          body: "Modern traffic lights aren't just timers: sensors under the road detect waiting cars, cameras count traffic, and some cities connect lights into networks that adjust together to keep traffic flowing.",
        },
        {
          type: "fact",
          title: "Before electric lights",
          body: "The first traffic signal (London, 1868) used gas lamps and a police officer waving wooden arms. It exploded after a month. Electric circuits turned out to be a much better idea!",
        },
        {
          type: "tryIt",
          body: "In the Simulator, build three parallel LED lanes, each with a switch and resistor. Play traffic controller — only one light on at a time!",
        },
        {
          type: "spark",
          mood: "cheering",
          text: "Flashlight, alarm, traffic light — three real machines, designed by YOU. The Shield Generator awaits!",
        },
      ],
      quiz: [
        {
          id: "tl-1",
          type: "multiple-choice",
          prompt: "Why does a traffic light use parallel wiring for its three LEDs?",
          options: [
            "Each light needs full brightness and its own control",
            "Parallel is cheaper",
            "Series circuits can't use colored LEDs",
            "It doesn't — they share one lane",
          ],
          correctIndex: 0,
          explanation: "Each lane is independent, so any single light can be on at full brightness while the others stay off.",
        },
        {
          id: "tl-2",
          type: "circuit-id",
          prompt: "Two LEDs sit in separate parallel lanes, each with its own switch. Closing only the top switch does what?",
          figure: "parallel-two-leds",
          options: [
            "Lights only the top LED",
            "Lights both LEDs",
            "Lights neither",
            "Burns out the bottom LED",
          ],
          correctIndex: 0,
          explanation: "Each lane is independent — closing one lane's switch lights only that lane's LED.",
        },
        {
          id: "tl-3",
          type: "multiple-choice",
          prompt: "In a real traffic light, what replaces a human flipping switches?",
          options: [
            "A controller (small computer) on a schedule",
            "Very fast workers",
            "The sun",
            "The cars themselves push buttons",
          ],
          correctIndex: 0,
          explanation: "A controller opens and closes electronic switches automatically — same circuit, automatic fingers.",
        },
        {
          id: "tl-4",
          type: "true-false",
          prompt: "Some traffic lights use sensors under the road to detect waiting cars.",
          answer: true,
          explanation: "Wire loops under the asphalt sense cars above them and tell the controller someone's waiting.",
        },
      ],
    },
  ],
};

export const world6: World = {
  id: 6,
  slug: "future-engineer",
  title: "Future Engineer",
  tagline: "Microcontrollers, sensors, and robots — your next frontier",
  description:
    "Circuits that think! Meet Arduino, the tiny computer that powers millions of inventions, learn how sensors give machines senses, and peek into the world of robotics.",
  color: "red",
  shipPart: {
    name: "Launch Computer",
    repairMessage:
      "ALL SYSTEMS GO! The Launch Computer is online and the ship is FULLY REPAIRED. You did it, engineer — you're ready for liftoff!",
  },
  lessons: [
    {
      slug: "arduino-basics",
      title: "Arduino Basics",
      description: "A tiny computer that brings circuits to life.",
      xpReward: 80,
      minutes: 12,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Welcome to the future, engineer! Everything you've built so far had fixed behavior. Now meet Arduino — a circuit that follows YOUR instructions.",
        },
        {
          type: "text",
          heading: "What is an Arduino?",
          body: "An Arduino is a microcontroller board — a tiny, affordable computer designed to control circuits. It has pins where you connect LEDs, buttons, motors, and sensors. You write simple instructions (code) on a regular computer, send them to the board, and it follows them forever.",
        },
        {
          type: "diagram",
          diagram: "arduino-board",
          caption: "An Arduino board: the brain chip in the middle, power pins, and numbered input/output pins for your components.",
        },
        {
          type: "text",
          heading: "Code is just a recipe",
          body: "A program for blinking an LED reads like a recipe: 'Turn pin 13 ON. Wait one second. Turn pin 13 OFF. Wait one second. Repeat.' The Arduino is an obedient switch-flipper that never gets bored — it can flip switches thousands of times per second.",
        },
        {
          type: "interactive",
          widget: "code-blink",
          prompt: "Try it! Change the wait times in the blink recipe and watch the LED follow your instructions.",
        },
        {
          type: "fact",
          title: "Made for students like you",
          body: "Arduino was invented in 2005 in Italy specifically so students could build electronics without being experts. Today, tens of millions of boards power science projects, art installations, farm robots, and even experiments on the International Space Station.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Circuit + code = invention. That one equation is the doorway to all of modern engineering.",
        },
      ],
      quiz: [
        {
          id: "ar-1",
          type: "multiple-choice",
          prompt: "What is an Arduino?",
          options: [
            "A tiny computer board that controls circuits using your instructions",
            "A type of battery",
            "A super-bright LED",
            "A brand of wire",
          ],
          correctIndex: 0,
          explanation: "Arduino is a microcontroller — a small computer with pins for controlling real components.",
        },
        {
          id: "ar-2",
          type: "true-false",
          prompt: "Once an Arduino is programmed, it follows its instructions over and over without a person there.",
          answer: true,
          explanation: "That's the magic: write the recipe once, and the board follows it forever — automatically.",
        },
        {
          id: "ar-3",
          type: "multiple-choice",
          prompt: "In the blink program, what does 'Turn pin 13 ON' actually do?",
          options: [
            "Sends current out of pin 13 to light the LED",
            "Turns on the whole computer",
            "Charges the battery",
            "Deletes the program",
          ],
          correctIndex: 0,
          explanation: "Each pin is like an electronically-controlled switch. ON means current flows out to your component.",
        },
        {
          id: "ar-4",
          type: "multiple-choice",
          prompt: "Why was Arduino created?",
          options: [
            "So students and beginners could build electronics easily",
            "For secret military projects",
            "To replace all batteries",
            "As a video game console",
          ],
          correctIndex: 0,
          explanation: "It was designed in 2005 as an affordable, friendly tool for students — and it changed the world.",
        },
      ],
    },
    {
      slug: "sensors",
      title: "Sensors",
      description: "Give your circuits the power to sense the world.",
      xpReward: 80,
      minutes: 11,
      sections: [
        {
          type: "spark",
          mood: "explaining",
          text: "A circuit with code can think. Add SENSORS, and it can also see, hear, and feel. Let's give your inventions superpowers!",
        },
        {
          type: "text",
          heading: "Sensors turn the world into signals",
          body: "A sensor measures something real — light, heat, distance, sound, motion — and turns it into an electrical signal a circuit can read. Bright light? Higher signal. Dark room? Lower signal. The circuit reads the number and decides what to do.",
        },
        {
          type: "diagram",
          diagram: "sensor-loop",
          caption: "The sense-think-act loop: a sensor measures, the microcontroller decides, and an output (light, motor, buzzer) acts.",
        },
        {
          type: "text",
          heading: "Sense → Think → Act",
          body: "Every smart machine runs this loop: SENSE the world (light sensor reads 'dark'), THINK with code ('if dark, lights on'), ACT with outputs (LED turns on). Streetlights, automatic doors, and Mars rovers all run sense-think-act loops — just with different sensors and bigger budgets.",
        },
        {
          type: "realWorld",
          title: "Your phone is a sensor treasure chest",
          body: "A smartphone carries 10+ sensors: light (auto-brightness), accelerometer (screen rotation), GPS (maps), magnetometer (compass), fingerprint reader, microphones, and more. Engineers combined them into one pocket-sized lab.",
        },
        {
          type: "fact",
          title: "Robot senses can beat human senses",
          body: "Sensors can detect things humans can't: infrared cameras see heat in total darkness, ultrasonic sensors hear echoes like bats, and gas sensors smell leaks long before a human nose could.",
        },
        {
          type: "spark",
          mood: "happy",
          text: "Sense, think, act — the heartbeat of every smart machine. One lesson left, engineer!",
        },
      ],
      quiz: [
        {
          id: "sn-1",
          type: "multiple-choice",
          prompt: "What does a sensor do?",
          options: [
            "Measures something in the world and turns it into an electrical signal",
            "Stores electricity",
            "Makes circuits look professional",
            "Replaces the battery",
          ],
          correctIndex: 0,
          explanation: "Sensors translate light, heat, sound, and motion into signals a circuit can read.",
        },
        {
          id: "sn-2",
          type: "match",
          prompt: "Match each sensor to what it detects.",
          pairs: [
            { left: "Light sensor", right: "Brightness" },
            { left: "Thermistor", right: "Temperature" },
            { left: "Ultrasonic sensor", right: "Distance" },
            { left: "Microphone", right: "Sound" },
          ],
          explanation: "Each sensor is a specialist — pick the right one for what you want to measure.",
        },
        {
          id: "sn-3",
          type: "multiple-choice",
          prompt: "Put the smart-machine loop in order:",
          options: [
            "Sense → Think → Act",
            "Act → Sense → Think",
            "Think → Act → Sense",
            "Sense → Act → Think",
          ],
          correctIndex: 0,
          explanation: "Measure the world first, decide with code, then do something about it.",
        },
        {
          id: "sn-4",
          type: "true-false",
          prompt: "A streetlight that turns on at night is running a sense-think-act loop.",
          answer: true,
          explanation: "Light sensor senses darkness → controller decides it's nighttime → light turns on. Classic loop!",
        },
      ],
    },
    {
      slug: "robotics-intro",
      title: "Robotics Introduction",
      description: "Where circuits, code, and motion come together.",
      xpReward: 80,
      minutes: 12,
      sections: [
        {
          type: "spark",
          mood: "excited",
          text: "Final lesson — and it's the big one. Robots! Which, by the way, is what I am. Let me show you what I'm made of. Literally.",
        },
        {
          type: "text",
          heading: "What makes a robot a robot?",
          body: "A robot is a machine that can sense its world, decide what to do, and move or act on its own. Sound familiar? It's the sense-think-act loop with motion added! Robot = sensors + brain (microcontroller) + actuators (motors and more) + power (batteries) + a body to hold it together.",
        },
        {
          type: "diagram",
          diagram: "robot-parts",
          caption: "Anatomy of a robot: sensors (eyes/ears), microcontroller (brain), motors (muscles), battery (heart), frame (skeleton).",
        },
        {
          type: "text",
          heading: "You already know all the pieces",
          body: "Batteries? World 3. Circuits and wiring? Worlds 2 and 4. Switches and sensors? Worlds 3 and 6. A brain that runs code? The Arduino lesson. Robotics isn't a brand-new subject — it's everything you've learned, assembled into something that MOVES.",
        },
        {
          type: "realWorld",
          title: "Robots are already everywhere",
          body: "Robot vacuums map your living room, warehouse robots carry shelves to workers, surgical robots help doctors operate with superhuman steadiness, and rovers like Perseverance explore Mars — driving themselves because radio signals take too long for remote control.",
        },
        {
          type: "fact",
          title: "Your turn is coming",
          body: "Many engineers building today's robots started with a kit at your age. School robotics clubs and competitions like FIRST LEGO League are exactly where rover drivers and robot surgeons began. Seriously — look one up!",
        },
        {
          type: "spark",
          mood: "cheering",
          text: "Pass this final quiz and my ship is FULLY REPAIRED. I couldn't have asked for a better engineering partner. Let's finish this!",
        },
      ],
      quiz: [
        {
          id: "ro-1",
          type: "match",
          prompt: "Match each robot part to its human-body job.",
          pairs: [
            { left: "Sensors", right: "Eyes and ears" },
            { left: "Microcontroller", right: "Brain" },
            { left: "Motors", right: "Muscles" },
            { left: "Battery", right: "Heart/energy" },
          ],
          explanation: "Robots mirror bodies: sense organs, a brain, muscles, and an energy supply.",
        },
        {
          id: "ro-2",
          type: "multiple-choice",
          prompt: "What three abilities make a machine a robot?",
          options: [
            "Sense, decide, and act on its own",
            "Be metal, be big, be expensive",
            "Talk, walk, and fly",
            "Have wheels, lights, and a remote",
          ],
          correctIndex: 0,
          explanation: "A robot runs the sense-think-act loop independently — that's the defining trio.",
        },
        {
          id: "ro-3",
          type: "true-false",
          prompt: "Mars rovers drive themselves for some tasks because radio commands from Earth take many minutes to arrive.",
          answer: true,
          explanation: "Signals can take 5–20 minutes each way, so rovers must make some decisions on their own.",
        },
        {
          id: "ro-4",
          type: "multiple-choice",
          prompt: "Which skills from earlier worlds does robotics combine?",
          options: [
            "All of them — power, circuits, components, and code",
            "Only the battery lesson",
            "None — robotics is unrelated",
            "Only troubleshooting",
          ],
          correctIndex: 0,
          explanation: "Robotics is the grand combination of everything you've learned. You're ready for it!",
        },
      ],
    },
  ],
};
