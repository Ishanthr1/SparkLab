"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface XPBarProps {
  /** 0..1 */
  progress: number;
  label: string;
  className?: string;
  color?: "blue" | "yellow" | "green" | "orange" | "purple";
}

const fillColors = {
  blue: "var(--spark-blue)",
  yellow: "var(--spark-yellow)",
  green: "var(--spark-green)",
  orange: "var(--spark-orange)",
  purple: "var(--spark-purple)",
};

/** Animated progress bar with an accessible meter role. */
export function XPBar({ progress, label, className, color = "blue" }: XPBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <div
      className={cn("w-full", className)}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
    >
      <div className="h-4 w-full overflow-hidden rounded-full border border-border bg-spark-blue-soft">
        <motion.div
          className="h-full rounded-full"
          style={{ background: fillColors[color] }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        />
      </div>
    </div>
  );
}
