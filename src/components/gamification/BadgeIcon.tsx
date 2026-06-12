import {
  Flame,
  Gauge,
  Lightbulb,
  Puzzle,
  Rocket,
  Ship,
  Sparkles,
  Trophy,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeDef, WorldColor } from "@/types";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  lightbulb: Lightbulb,
  gauge: Gauge,
  puzzle: Puzzle,
  wrench: Wrench,
  flame: Flame,
  rocket: Rocket,
  trophy: Trophy,
  ship: Ship,
};

const colorClasses: Record<WorldColor, string> = {
  blue: "bg-spark-blue-soft text-spark-blue border-spark-blue",
  yellow: "bg-spark-yellow-soft text-spark-orange border-spark-yellow",
  orange: "bg-spark-orange-soft text-spark-orange border-spark-orange",
  green: "bg-spark-green-soft text-spark-green border-spark-green",
  purple: "bg-spark-purple-soft text-spark-purple border-spark-purple",
  red: "bg-spark-red-soft text-spark-red border-spark-red",
};

interface BadgeIconProps {
  badge: BadgeDef;
  earned?: boolean;
  size?: "md" | "lg";
  className?: string;
}

export function BadgeIcon({
  badge,
  earned = true,
  size = "md",
  className,
}: BadgeIconProps) {
  const Icon = icons[badge.icon] ?? Sparkles;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2",
        size === "md" ? "h-14 w-14" : "h-20 w-20",
        earned ? colorClasses[badge.color] : "border-border bg-background text-muted opacity-50",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={size === "md" ? "h-7 w-7" : "h-10 w-10"}
        strokeWidth={2.2}
      />
    </span>
  );
}
