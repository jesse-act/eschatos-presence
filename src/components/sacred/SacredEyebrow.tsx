import BreathingDot from "./BreathingDot";
import { cn } from "@/lib/utils";

interface SacredEyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "light";
}

const SacredEyebrow = ({
  children,
  className,
  variant = "accent",
}: SacredEyebrowProps) => {
  return (
    <p
      className={cn(
        // Cardo — designed for biblical scholarship, more solemn than body
        "font-liturgical inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.32em]",
        variant === "accent"
          ? "text-accent"
          : "text-primary-foreground/80",
        className,
      )}
    >
      <BreathingDot variant={variant === "light" ? "foreground" : "accent"} />
      {children}
    </p>
  );
};

export default SacredEyebrow;
