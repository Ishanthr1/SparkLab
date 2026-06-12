"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useProgress } from "./ProgressProvider";
import type { ProgressState } from "@/types";

/**
 * Keeps signed-in students' progress mirrored to the server.
 * Rendered only when Clerk is configured (inside <ClerkProvider>).
 * Pulls server progress once after sign-in, then pushes local changes,
 * debounced, whenever progress updates.
 */
export function ProgressSync() {
  const { isSignedIn } = useAuth();
  const { state, ready, importState } = useProgress();
  const pulled = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isSignedIn || !ready || pulled.current) return;
    pulled.current = true;
    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { progress: ProgressState | null } | null) => {
        if (data?.progress) importState(data.progress);
      })
      .catch(() => {
        // Offline or sync not configured: local progress still works.
      });
  }, [isSignedIn, ready, importState]);

  useEffect(() => {
    if (!isSignedIn || !ready) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: state }),
      }).catch(() => {
        // Best-effort: next change retries.
      });
    }, 2000);
    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [isSignedIn, ready, state]);

  return null;
}
