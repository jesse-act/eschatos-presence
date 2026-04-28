import { cn } from "@/lib/utils";

interface CrossWatermarkProps {
  className?: string;
  opacity?: number;
}

const CrossWatermark = ({ className, opacity = 0.04 }: CrossWatermarkProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 200 280"
        className="h-[180%] w-auto"
        style={{ opacity }}
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="cross-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2.5" />
          </filter>
        </defs>
        {/* Vertical beam — slightly tapered, organic */}
        <path
          d="M 96 18
             C 95 18, 95.5 18, 96.5 18
             L 103.5 18
             C 104.5 18, 105 18, 104 18
             L 105 92
             L 105 268
             C 105 269, 104.5 270, 104 270
             L 96 270
             C 95.5 270, 95 269, 95 268
             L 95 92
             Z"
          filter="url(#cross-rough)"
        />
        {/* Horizontal crossbeam — placed at upper third, irregular ends */}
        <path
          d="M 28 88
             C 27 88.5, 27 89, 28 89
             L 28 99
             C 28 100, 27 100.5, 28 101
             L 172 101
             C 173 100.5, 173 100, 172 99
             L 172 89
             C 173 88.5, 173 88, 172 88
             Z"
          filter="url(#cross-rough)"
        />
      </svg>
    </div>
  );
};

export default CrossWatermark;
