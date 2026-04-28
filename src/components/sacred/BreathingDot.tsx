import { cn } from "@/lib/utils";

interface BreathingDotProps {
  className?: string;
  variant?: "accent" | "foreground" | "muted";
}

const BreathingDot = ({ className, variant = "accent" }: BreathingDotProps) => {
  const color =
    variant === "accent"
      ? "bg-accent"
      : variant === "muted"
      ? "bg-muted-foreground"
      : "bg-foreground";
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex h-2 w-2", className)}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full animate-breath",
          color,
          "opacity-60",
        )}
      />
      <span
        className={cn(
          "relative inline-block h-2 w-2 rounded-full",
          color,
        )}
      />
    </span>
  );
};

export default BreathingDot;
