import { NextResponse } from "next/server";
import {
  answerFromKnowledge,
  TUTOR_SYSTEM_PROMPT,
} from "@/lib/tutor-knowledge";
import type { TutorMessage } from "@/types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "anthropic/claude-haiku-4.5";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

/**
 * SparkBot tutor endpoint. Uses OpenRouter when OPENROUTER_API_KEY is set;
 * otherwise falls back to the built-in knowledge base so the tutor always
 * answers something useful.
 */
export async function POST(request: Request) {
  let messages: TutorMessage[];
  try {
    const body = await request.json();
    messages = body?.messages;
    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      !messages.every(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
    ) {
      throw new Error("bad shape");
    }
  } catch {
    return NextResponse.json(
      { error: "Send { messages: [{ role, content }] }" },
      { status: 400 },
    );
  }

  // Keep requests small: recent turns only, trimmed.
  const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_MESSAGE_LENGTH),
  }));
  const lastUser = [...trimmed].reverse().find((m) => m.role === "user");

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: answerFromKnowledge(lastUser?.content ?? ""),
      source: "knowledge-base",
    });
  }

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        "X-Title": "SparkBot Tutor",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL,
        max_tokens: 400,
        messages: [{ role: "system", content: TUTOR_SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter ${res.status}`);
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error("empty completion");

    return NextResponse.json({ reply, source: "openrouter" });
  } catch (err) {
    console.error("Tutor OpenRouter call failed:", err);
    // Degrade gracefully: students always get an answer.
    return NextResponse.json({
      reply: answerFromKnowledge(lastUser?.content ?? ""),
      source: "knowledge-base",
    });
  }
}
