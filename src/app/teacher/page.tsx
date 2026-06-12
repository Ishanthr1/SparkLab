import type { Metadata } from "next";
import { TeacherView } from "./TeacherView";

export const metadata: Metadata = {
  title: "For Teachers",
  description:
    "Classrooms, assignments, and analytics for teaching electronics with SparkBot.",
};

export default function TeacherPage() {
  return <TeacherView />;
}
