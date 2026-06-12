import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkEnabled } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase-server";
import type { ProgressState } from "@/types";

/**
 * Account progress sync. Requires Clerk (identity) and Supabase (storage);
 * without either it responds with progress: null and the client keeps using
 * on-device storage.
 *
 * Each push also mirrors progress.earnedBadges into the badges_earned table
 * so parent/teacher views can query badges across students.
 */

async function requireUser(): Promise<string | null> {
  if (!clerkEnabled) return null;
  const { userId } = await auth();
  return userId;
}

export async function GET() {
  const userId = await requireUser();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ progress: null });

  const { data, error } = await supabase
    .from("student_progress")
    .select("progress")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Progress fetch failed:", error.message);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
  return NextResponse.json({ progress: data?.progress ?? null });
}

export async function PUT(request: Request) {
  const userId = await requireUser();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ synced: false });

  let progress: ProgressState;
  try {
    const body = await request.json();
    progress = body?.progress;
    if (
      typeof progress?.xp !== "number" ||
      typeof progress?.completedLessons !== "object"
    ) {
      throw new Error("bad shape");
    }
  } catch {
    return NextResponse.json(
      { error: "Send { progress: ProgressState }" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("student_progress").upsert(
    {
      clerk_user_id: userId,
      progress,
      xp: progress.xp,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "clerk_user_id" },
  );

  if (error) {
    console.error("Progress upsert failed:", error.message);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }

  // Mirror earned badges for cross-student queries. ignoreDuplicates keeps
  // the originally recorded earned_at; a failure here must not break the
  // primary progress sync, so it is only logged.
  const badgeRows = Object.entries(progress.earnedBadges ?? {})
    .filter(
      ([, earnedAt]) =>
        typeof earnedAt === "string" && !Number.isNaN(Date.parse(earnedAt)),
    )
    .map(([badgeId, earnedAt]) => ({
      clerk_user_id: userId,
      badge_id: badgeId,
      earned_at: earnedAt,
    }));
  if (badgeRows.length > 0) {
    const { error: badgeError } = await supabase
      .from("badges_earned")
      .upsert(badgeRows, {
        onConflict: "clerk_user_id,badge_id",
        ignoreDuplicates: true,
      });
    if (badgeError) {
      console.error("Badge sync failed:", badgeError.message);
    }
  }

  return NextResponse.json({ synced: true });
}
