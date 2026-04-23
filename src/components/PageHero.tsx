import { type ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  align?: "center" | "left";
};

const PageHero = ({ eyebrow, title, subtitle, image, align = "center" }: Props) => {
  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 text-primary-foreground">
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
      <div className={`mx-auto max-w-5xl px-6 md:px-10 ${align === "center" ? "text-center" : "text-left"}`}>
        {eyebrow && <p className="eyebrow mb-6 animate-fade-in justify-center">{eyebrow}</p>}
        <h1 className="font-display text-4xl leading-[1.05] text-balance md:text-6xl lg:text-7xl animate-fade-in [animation-delay:120ms]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg animate-fade-in [animation-delay:240ms]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;