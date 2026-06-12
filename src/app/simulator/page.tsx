import type { Metadata } from "next";
import { CircuitSimulator } from "@/components/circuit/CircuitSimulator";

export const metadata: Metadata = {
  title: "Circuit Simulator",
  description:
    "Drag and drop batteries, LEDs, resistors, switches, and wires to build real circuits — with live help from SparkBot.",
};

export default function SimulatorPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-extrabold">
          Circuit Simulator
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          Your virtual workbench! Add parts from the shelf, drag them so their
          ends touch, and build a complete loop. SparkBot watches your circuit
          and helps in real time — and nothing here can break for real.
        </p>
      </header>
      <CircuitSimulator />
    </div>
  );
}
