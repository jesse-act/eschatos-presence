import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

type Variant =
  | "rise"
  | "title-bloom"
  | "letter-settle"
  | "eyebrow-spread"
  | "ink-rise"
  | "veil-split"
  | "fade";

const VARIANT_CLASS: Record<Variant, string> = {
  rise: "animate-text-rise",
  "title-bloom": "animate-title-bloom",
  "letter-settle": "animate-letter-settle",
  "eyebrow-spread": "animate-eyebrow-spread",
  "ink-rise": "animate-ink-rise",
  "veil-split": "animate-veil-split",
  fade: "animate-fade-in",
};

interface RevealOnViewProps {
  children: ReactNode;
  /** Animation variant — chooses the keyframe. Default "rise". */
  variant?: Variant;
  /** Stagger in ms — animation-delay applied when inView. Default 0. */
  delay?: number;
  /** Wrapper element — useful to keep semantic markup (e.g. "h2", "li"). */
  as?: ElementType;
  className?: string;
  /** Override the threshold of intersection (0..1). Default 0.15. */
  threshold?: number;
  /** Replay animation when scrolling out + back in. Default false (once). */
  replay?: boolean;
}

/**
 * Wraps children in a div (or chosen element) that animates the FIRST time
 * it enters the viewport — and only then. Pre-paint state is opacity:0 so
 * the text never "flashes" before the animation starts.
 */
const RevealOnView = ({
  children,
  variant = "rise",
  delay = 0,
  as: Tag = "div",
  className,
  threshold = 0.15,
  replay = false,
}: RevealOnViewProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold,
    once: !replay,
  });

  return (
    <Tag
      ref={ref}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        // Pre-paint hidden — prevents flash-of-unstyled-content before observer fires
        !inView && "opacity-0",
        inView && VARIANT_CLASS[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default RevealOnView;
