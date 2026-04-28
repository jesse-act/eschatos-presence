import { type ReactNode } from "react";
import { LightBeam, SacredEyebrow, BreathingDot } from "@/components/sacred";
import { Scene3D, LightParticles, useReducedMotion } from "@/components/sacred3d";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  align?: "center" | "left";
  /** Set to false on pages that mount their own Scene3D to avoid 2 simultaneous WebGL contexts */
  enableParticles?: boolean;
};

const PageHero = ({ eyebrow, title, subtitle, image, align = "center", enableParticles = true }: Props) => {
  const reducedMotion = useReducedMotion();

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
      {enableParticles && !reducedMotion && (
        <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
          <Scene3D
            className="h-full w-full"
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={0.5} />
            <LightParticles count={120} spread={9} size={0.02} color="#FFFFFF" />
          </Scene3D>
        </div>
      )}
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
