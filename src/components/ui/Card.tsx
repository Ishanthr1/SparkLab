import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds a colored top accent bar. */
  accent?: "blue" | "yellow" | "orange" | "green" | "purple" | "red";
};

const accentClasses: Record<NonNullable<CardProps["accent"]>, string> = {
  blue: "border-t-4 border-t-spark-blue",
  yellow: "border-t-4 border-t-spark-yellow",
  orange: "border-t-4 border-t-spark-orange",
  green: "border-t-4 border-t-spark-green",
  purple: "border-t-4 border-t-spark-purple",
  red: "border-t-4 border-t-spark-red",
};

export function Card({ className, accent, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface p-6 shadow-sm",
        accent && accentClasses[accent],
        className,
      )}
      {...props}
    />
  );
}
