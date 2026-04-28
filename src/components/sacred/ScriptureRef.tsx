import { cn } from "@/lib/utils";

interface ScriptureRefProps {
  verse: string;
  reference: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center";
}

const ScriptureRef = ({
  verse,
  reference,
  className,
  size = "md",
  align = "left",
}: ScriptureRefProps) => {
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-4xl",
    lg: "text-3xl md:text-5xl lg:text-6xl",
    xl: "text-4xl md:text-6xl lg:text-7xl",
  }[size];
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <figure className={cn("max-w-4xl", alignClass, className)}>
      <blockquote
        className={cn(
          "font-display leading-[1.1] tracking-tight text-balance",
          sizeClasses,
        )}
      >
        <span aria-hidden="true" className="mr-2 align-top text-accent">
          "
        </span>
        {verse}
        <span aria-hidden="true" className="ml-1 align-top text-accent">
          "
        </span>
      </blockquote>
      <figcaption className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-accent">
        — {reference}
      </figcaption>
    </figure>
  );
};

export default ScriptureRef;
