import { cn } from "@/lib/utils";

interface LightBeamProps {
  className?: string;
  intensity?: "soft" | "medium" | "bold";
}

const LightBeam = ({ className, intensity = "medium" }: LightBeamProps) => {
  const opacity =
    intensity === "soft"
      ? "opacity-50"
      : intensity === "bold"
      ? "opacity-100"
      : "opacity-75";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] bg-gradient-light-beam",
        opacity,
        className,
      )}
    />
  );
};

export default LightBeam;
