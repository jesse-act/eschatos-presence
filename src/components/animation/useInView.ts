import { useEffect, useRef, useState } from "react";

interface Options {
  /** Margin to push the trigger earlier/later. Default "0px 0px -10% 0px". */
  rootMargin?: string;
  /** Visible ratio that triggers the animation. Default 0.15. */
  threshold?: number;
  /** Once true, the element stays "in view" forever (no replay). Default true. */
  once?: boolean;
}

/**
 * Lightweight intersection-observer hook — observes the returned ref and
 * flips `inView` to true when the element scrolls into the viewport.
 *
 * Designed for staggered reveal animations on long pages: pair the returned
 * `inView` boolean with a conditional class like
 *   `inView ? "animate-text-rise" : "opacity-0"`
 * so the animation only fires when the user actually reaches the section.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): { ref: React.RefObject<T>; inView: boolean } {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // SSR / older browsers — fall back to "always visible"
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
