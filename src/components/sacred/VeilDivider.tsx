import { cn } from "@/lib/utils";

interface VeilDividerProps {
  className?: string;
  label?: string;
}

const VeilDivider = ({ className, label }: VeilDividerProps) => {
  if (label) {
    return (
      <div className={cn("flex items-center gap-6 my-12", className)}>
        <div className="veil-divider flex-1" />
        <span className="text-xs font-medium uppercase tracking-[0.32em] text-accent">
          {label}
        </span>
        <div className="veil-divider flex-1" />
      </div>
    );
  }
  return (
    <div
      className={cn("veil-divider my-12", className)}
      aria-hidden="true"
    />
  );
};

export default VeilDivider;
