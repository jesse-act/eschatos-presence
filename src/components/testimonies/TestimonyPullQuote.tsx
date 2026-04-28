import { cn } from "@/lib/utils";

interface Props {
  quote: string;
  attribution?: string;
  eyebrow?: string;
  className?: string;
}

const TestimonyPullQuote = ({ quote, attribution, eyebrow, className }: Props) => {
  return (
    <figure className={cn("relative mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className="mb-6 font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
          {eyebrow}
        </p>
      )}
      <span
        aria-hidden="true"
        className="block font-script text-7xl leading-[0.6] text-accent/70 md:text-8xl"
      >
        &ldquo;
      </span>
      <blockquote className="font-editorial italic text-2xl leading-snug text-foreground md:text-3xl lg:text-4xl">
        {quote}
      </blockquote>
      <span
        aria-hidden="true"
        className="mt-4 block font-script text-7xl leading-[0.6] text-accent/70 md:text-8xl"
      >
        &rdquo;
      </span>
      {attribution && (
        <figcaption className="mt-6 font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
};

export default TestimonyPullQuote;
