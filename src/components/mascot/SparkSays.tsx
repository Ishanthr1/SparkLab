import { cn } from "@/lib/utils";
import type { SparkMood } from "@/types";
import { SparkBot } from "./SparkBot";

interface SparkSaysProps {
  children: React.ReactNode;
  mood?: SparkMood;
  size?: number;
  className?: string;
  /** Render SparkBot on the right side of the bubble instead. */
  flip?: boolean;
}

/** SparkBot with a speech bubble. The bubble text is real content for screen readers. */
export function SparkSays({
  children,
  mood = "happy",
  size = 110,
  className,
  flip = false,
}: SparkSaysProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-3",
        flip && "flex-row-reverse",
        className,
      )}
    >
      <SparkBot mood={mood} size={size} className="shrink-0" />
      <div className="relative max-w-prose rounded-2xl border-2 border-spark-blue bg-surface px-5 py-4 text-base font-semibold text-foreground shadow-sm">
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-5 h-4 w-4 rotate-45 border-spark-blue bg-surface",
            flip
              ? "-right-[9px] border-r-2 border-t-2"
              : "-left-[9px] border-b-2 border-l-2",
          )}
        />
        <span className="sr-only">SparkBot says: </span>
        {children}
      </div>
    </div>
  );
}
