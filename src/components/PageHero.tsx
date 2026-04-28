import { type ReactNode } from "react";
import { LightBeam, SacredEyebrow, BreathingDot } from "@/components/sacred";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  align?: "center" | "left";
};

const PageHero = ({ eyebrow, title, subtitle, image, align = "center" }: Props) => {
  return (
    <section className="sacred-grain relative isolate overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 text-primary-foreground">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover animate-slow-zoom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <LightBeam intensity="medium" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/15 via-accent/5 to-transparent z-[2]"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 mx-auto max-w-5xl px-6 md:px-10 ${align === "center" ? "text-center" : "text-left"}`}
      >
        {eyebrow && (
          <div
            className={`mb-6 flex animate-fade-in ${align === "center" ? "justify-center" : "justify-start"}`}
          >
            <SacredEyebrow variant="light">{eyebrow}</SacredEyebrow>
          </div>
        )}
        <h1 className="font-display text-4xl leading-[1.05] text-balance md:text-6xl lg:text-7xl animate-ascend [animation-delay:120ms]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg animate-fade-in [animation-delay:240ms]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <BreathingDot variant="accent" />
      </div>
    </section>
  );
};

export default PageHero;
