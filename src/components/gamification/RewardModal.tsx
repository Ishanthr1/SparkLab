"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { BadgeIcon } from "@/components/gamification/BadgeIcon";
import { SparkBot } from "@/components/mascot/SparkBot";
import { Button } from "@/components/ui/Button";
import type { RewardSummary } from "@/components/providers/ProgressProvider";
import { badgeById } from "@/lib/badges";
import { titleForLevel } from "@/lib/levels";

interface RewardModalProps {
  reward: RewardSummary;
  heading: string;
  message: string;
  onClose: () => void;
  closeLabel?: string;
}

const CONFETTI_COLORS = [
  "var(--spark-blue)",
  "var(--spark-yellow)",
  "var(--spark-orange)",
  "var(--spark-green)",
  "var(--spark-purple)",
];

/** Celebration dialog shown after lessons, quizzes, and successful builds. */
export function RewardModal({
  reward,
  heading,
  message,
  onClose,
  closeLabel = "Keep going!",
}: RewardModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const badges = reward.newBadges
    .map(badgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-heading"
        tabIndex={-1}
        initial={{ scale: 0.8, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-card border-2 border-spark-blue bg-surface p-8 text-center shadow-xl"
      >
        <Confetti />
        <SparkBot mood="cheering" size={130} className="mx-auto" />
        <h2 id="reward-heading" className="mt-2 font-display text-3xl font-extrabold">
          {heading}
        </h2>
        <p className="mt-2 text-lg text-muted">{message}</p>

        {reward.xpGained > 0 && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-spark-yellow-soft px-5 py-2 font-display text-xl font-extrabold">
            <Zap aria-hidden="true" className="h-6 w-6 text-spark-orange" />+
            {reward.xpGained} XP
          </p>
        )}

        {reward.leveledUp && (
          <p className="mt-3 font-display text-lg font-bold text-spark-purple">
            Level up! You reached Level {reward.newLevel} —{" "}
            {titleForLevel(reward.newLevel)}
          </p>
        )}

        {badges.length > 0 && (
          <div className="mt-4">
            <h3 className="font-display font-bold">New badge{badges.length > 1 ? "s" : ""}!</h3>
            <ul className="mt-2 flex flex-wrap items-center justify-center gap-4">
              {badges.map((badge) => (
                <li key={badge.id} className="flex flex-col items-center gap-1">
                  <BadgeIcon badge={badge} size="lg" />
                  <span className="text-sm font-semibold">{badge.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button size="lg" className="mt-6 w-full" onClick={onClose}>
          {closeLabel}
        </Button>
      </motion.div>
    </div>
  );
}

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2.5 w-2.5 rounded-sm"
          style={{
            left: `${(i * 53) % 100}%`,
            top: "-3%",
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: 480, rotate: 360 + i * 40, opacity: [1, 1, 0] }}
          transition={{
            duration: 2.4 + (i % 5) * 0.3,
            delay: (i % 6) * 0.12,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
