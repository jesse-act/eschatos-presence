import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlamePulseProps {
  className?: string;
  size?: number;
}

const FlamePulse = ({ className, size = 18 }: FlamePulseProps) => {
  return (
    <span aria-hidden="true" className={cn("inline-flex relative", className)}>
      <Flame
        size={size}
        className="text-accent animate-flame-flicker fill-accent/20"
        strokeWidth={1.5}
      />
    </span>
  );
};

export default FlamePulse;
