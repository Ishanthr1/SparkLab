import type { Metadata } from "next";
import { LearnMap } from "./LearnMap";

export const metadata: Metadata = {
  title: "Learning Path",
  description:
    "Six worlds of electronics adventures — repair SparkBot's spaceship one lesson at a time.",
};

export default function LearnPage() {
  return <LearnMap />;
}
