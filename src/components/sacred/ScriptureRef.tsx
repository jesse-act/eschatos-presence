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
          // Editorial serif (Cormorant Garamond) — better for long-form verse than Cinzel capitals
          "font-editorial leading-[1.15] tracking-tight text-balance italic",
          sizeClasses,
        )}
      >
        <span aria-hidden="true" className="mr-1 font-script text-5xl md:text-7xl text-accent leading-none align-top">
          &ldquo;
        </span>
        {verse}
        <span aria-hidden="true" className="ml-1 font-script text-5xl md:text-7xl text-accent leading-none align-top">
          &rdquo;
        </span>
      </blockquote>
      <figcaption className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-accent">
        — {reference}
      </figcaption>
    </figure>
  );
};

export default ScriptureRef;
