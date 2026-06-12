"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SparkBot } from "@/components/mascot/SparkBot";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { TutorMessage } from "@/types";

const STARTERS = [
  "What is voltage?",
  "Why won't my LED turn on?",
  "What does a resistor do?",
  "What's the difference between series and parallel?",
];

const GREETING: TutorMessage = {
  role: "assistant",
  content:
    "Hi! I'm SparkBot, your personal electronics tutor. 🤖⚡ Ask me anything about electricity, circuits, components, or robots — or tap one of the questions below to get started!",
};

export function TutorChat() {
  const [messages, setMessages] = useState<TutorMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Skip the canned greeting; send real conversation turns only.
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.reply ??
            "Beep... my answer circuits glitched! Try asking that again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Beep! I couldn't reach my brain module — check your internet connection and try again. 🛠️",
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
      <header className="text-center">
        <h1 className="font-display text-4xl font-extrabold">Ask SparkBot</h1>
        <p className="mt-2 text-lg text-muted">
          Your friendly electronics tutor — no question is too small.
        </p>
      </header>

      <div
        ref={logRef}
        role="log"
        aria-label="Conversation with SparkBot"
        aria-live="polite"
        className="mt-6 flex-1 space-y-4 overflow-y-auto rounded-card border-2 border-border bg-surface p-4 sm:p-6"
        style={{ minHeight: "20rem", maxHeight: "55vh" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex items-end gap-2",
              m.role === "user" && "flex-row-reverse",
            )}
          >
            {m.role === "assistant" && (
              <SparkBot size={44} still mood="explaining" className="shrink-0" />
            )}
            <p
              className={cn(
                "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 font-medium leading-relaxed",
                m.role === "assistant"
                  ? "rounded-bl-sm border-2 border-spark-blue-soft bg-spark-blue-soft/60"
                  : "rounded-br-sm bg-spark-blue text-white",
              )}
            >
              <span className="sr-only">
                {m.role === "assistant" ? "SparkBot: " : "You: "}
              </span>
              {m.content}
            </p>
          </div>
        ))}
        {busy && (
          <div className="flex items-end gap-2">
            <SparkBot size={44} still mood="thinking" className="shrink-0" />
            <p className="rounded-2xl rounded-bl-sm border-2 border-spark-blue-soft bg-spark-blue-soft/60 px-4 py-3 font-bold text-muted">
              <span aria-hidden="true" className="animate-pulse">
                thinking…
              </span>
              <span className="sr-only">SparkBot is thinking</span>
            </p>
          </div>
        )}
      </div>

      {/* starter chips */}
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
        {STARTERS.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => send(q)}
              disabled={busy}
              className="rounded-full border-2 border-spark-blue bg-surface px-4 py-1.5 text-sm font-bold text-spark-blue transition-colors hover:bg-spark-blue hover:text-white disabled:opacity-50"
            >
              {q}
            </button>
          </li>
        ))}
      </ul>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="tutor-input" className="sr-only">
          Ask SparkBot a question
        </label>
        <input
          id="tutor-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          maxLength={500}
          className="min-h-12 flex-1 rounded-full border-2 border-border bg-surface px-5 font-medium focus:border-spark-blue"
        />
        <Button type="submit" disabled={busy || !input.trim()} aria-label="Send question">
          <Send aria-hidden="true" className="h-5 w-5" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </form>
    </div>
  );
}
