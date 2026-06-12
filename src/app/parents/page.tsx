import type { Metadata } from "next";
import { ParentView } from "./ParentView";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "Monitor your child's progress: completed lessons, quiz performance, streaks, and what the curriculum covers.",
};

export default function ParentsPage() {
  return <ParentView />;
}
