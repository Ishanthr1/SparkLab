import type { Metadata } from "next";
import { TutorChat } from "./TutorChat";

export const metadata: Metadata = {
  title: "Ask SparkBot",
  description:
    "Chat with SparkBot, your friendly AI electronics tutor. Age-appropriate answers with fun analogies.",
};

export default function TutorPage() {
  return <TutorChat />;
}
