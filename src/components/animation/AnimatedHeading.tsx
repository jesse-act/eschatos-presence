import { useEffect, useState, type CSSProperties } from "react";

interface AnimatedHeadingProps {
  text: string;
  /** Initial delay before the first character animates (ms). */
  initialDelay?: number;
  /** Per-character stagger (ms). */
  charDelay?: number;
  /** Per-character transition duration (ms). */
  charDuration?: number;
  className?: string;
  style?: CSSProperties;
}

const AnimatedHeading = ({
  text,
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
  className,
  style,
}: AnimatedHeadingProps) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setStart(true), initialDelay);
    return () => window.clearTimeout(id);
  }, [initialDelay]);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={style} aria-label={text}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden="true">
          {Array.from(line).map((ch, charIndex) => {
            const delayMs =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: start ? 1 : 0,
                  transform: start ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity ${charDuration}ms ease-out, transform ${charDuration}ms ease-out`,
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
