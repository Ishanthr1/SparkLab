import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "md" | "lg" | "sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-spark-blue text-white hover:bg-spark-blue-deep active:translate-y-px shadow-[0_4px_0_var(--spark-blue-deep)] active:shadow-none",
  secondary:
    "bg-spark-yellow text-foreground hover:brightness-95 active:translate-y-px shadow-[0_4px_0_var(--spark-orange)] active:shadow-none",
  outline:
    "border-2 border-spark-blue text-spark-blue bg-surface hover:bg-spark-blue-soft",
  ghost: "text-spark-blue hover:bg-spark-blue-soft",
  danger: "bg-spark-red text-white hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm gap-1.5",
  md: "min-h-11 px-6 text-base gap-2",
  lg: "min-h-14 px-8 text-lg gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-display font-bold transition-all focus-visible:outline-3 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
