import { type ElementType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";
import { useReducedMotion } from "@/components/sacred3d/useReducedMotion";

type SplitMode = "word" | "letter";

interface SplitTextProps {
  /** Text to split. Pass a single string. For ReactNode use the surrounding wrapper instead. */
  children: string;
  /** Split granularity — "word" (default) or "letter" (calligraphic, expensive on long strings). */
  mode?: SplitMode;
  /** Stagger between units in ms. Default 60ms for words, 24ms for letters. */
  stagger?: number;
  /** Initial delay before the first unit animates. */
  delay?: number;
  /** Animation utility applied to each unit (after inView). Default "animate-word-rise". */
  animation?: string;
  /** Wrapper element — preserve semantic markup (h1, h2, p…). Default "span". */
  as?: ElementType;
  className?: string;
  /** Replay on scroll-out / scroll-in. Default false. */
  replay?: boolean;
  /** Threshold (0..1). Default 0.2. */
  threshold?: number;
}

/**
 * Splits a single string into spans (one per word or per letter), each with
 * a staggered animation-delay. The split happens in render — no DOM-rewriting
 * libraries required.
 *
 * Each unit is an inline-block <span> with `aria-hidden="true"`; the parent
 * carries the original string as `aria-label` so screen readers announce
 * the full sentence in one piece, not a stutter of letters.
 */
const SplitText = ({
  children,
  mode = "word",
  stagger,
  delay = 0,
  animation,
  as: Tag = "span",
  className,
  replay = false,
  threshold = 0.2,
}: SplitTextProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold,
    once: !replay,
  });
  const reducedMotion = useReducedMotion();
  // Treat reduced-motion users as already-in-view: each unit renders at its
  // final state, no stagger, no opacity-0 flash.
  const visible = inView || reducedMotion;

  const defaultStagger = mode === "letter" ? 24 : 60;
  const step = stagger ?? defaultStagger;
  const defaultAnim =
    mode === "letter" ? "animate-letter-settle" : "animate-word-rise";
  const animClass = animation ?? defaultAnim;

  // Build units. Whitespace is preserved as a non-animated text node so
  // line-breaking behaves naturally.
  const units = mode === "word" ? children.split(/(\s+)/) : Array.from(children);

  return (
    <Tag
      ref={ref}
      aria-label={children}
      className={cn("inline-block", className)}
    >
      {units.map((unit, i) => {
        if (mode === "word" && /^\s+$/.test(unit)) {
          // whitespace — keep as plain text node so wrapping works
          return <span key={`s-${i}`} aria-hidden="true">{unit}</span>;
        }
        const style: CSSProperties | undefined = inView && !reducedMotion
          ? { animationDelay: `${delay + i * step}ms` }
          : undefined;
        return (
          <span
            key={`u-${i}`}
            aria-hidden="true"
            style={style}
            className={cn(
              "inline-block",
              !visible && "opacity-0",
              visible && !reducedMotion && animClass,
              // Letters need to keep their original kerning context; words do not
              mode === "letter" && unit === " " ? "w-[0.25em]" : "",
            )}
          >
            {unit === " " ? " " : unit}
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
