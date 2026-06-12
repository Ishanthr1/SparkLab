import type { Metadata } from "next";
import { DashboardView } from "./DashboardView";

export const metadata: Metadata = {
  title: "My Progress",
  description: "Your XP, level, badges, streak, and mission status.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
