import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkEnabled } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase-server";

/**
 * Records one quiz_attempts row per completed lesson quiz (including
 * re-takes) for parent/teacher performance views. Requires Clerk and
 * Supabase; without either it responds with recorded: false and the
 * attempt only lives inside the on-device progress state.
 */

async function requireUser(): Promise<string | null> {
  if (!clerkEnabled) return null;
  const { userId } = await auth();
  return userId;
}

export async function POST(request: Request) {
  const userId = await requireUser();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ recorded: false });

  let lessonSlug: string;
  let score: number;
  let total: number;
  try {
    const body = await request.json();
    lessonSlug = body?.lessonSlug;
    score = body?.score;
    total = body?.total;
    if (
      typeof lessonSlug !== "string" ||
      lessonSlug.length === 0 ||
      !Number.isInteger(score) ||
      !Number.isInteger(total) ||
      score < 0 ||
      total < 0 ||
      score > total
    ) {
      throw new Error("bad shape");
    }
  } catch {
    return NextResponse.json(
      { error: "Send { lessonSlug, score, total }" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("quiz_attempts").insert({
    clerk_user_id: userId,
    lesson_slug: lessonSlug,
    score,
    total,
  });

  if (error) {
    console.error("Quiz attempt insert failed:", error.message);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
  return NextResponse.json({ recorded: true });
}
