import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LightBeam,
  BreathingDot,
  ScriptureRef,
  SacredEyebrow,
  CrossWatermark,
  VeilDivider,
} from "@/components/sacred";
import heroImg from "@/assets/hero-worship.jpg";

const Index = () => {
  const { t, lang } = useLanguage();

  return (
    <>
      {/* ACT I — LIGHT (the Hero, divine breaking through) */}
      <section className="relative isolate min-h-[100svh] overflow-hidden text-primary-foreground sacred-grain">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Worshippers raising hands during a service at Eschatos Church"
            className="h-full w-full object-cover animate-slow-zoom"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
        </div>

        <LightBeam intensity="bold" />

        <div className="relative z-[2] mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32">
          <SacredEyebrow variant="light" className="mb-8">{t.hero.eyebrow}</SacredEyebrow>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.02] text-balance md:text-7xl lg:text-[5.5rem] animate-ascend">
            {t.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg animate-fade-in [animation-delay:240ms]">
            {t.hero.subtitle}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4 animate-fade-in [animation-delay:360ms]">
            <Button asChild variant="hero" size="xl" className="glory">
              <Link to="/visit">
                {t.hero.cta1} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/sermons">
                <PlayCircle className="h-4 w-4" /> {t.hero.cta2}
              </Link>
            </Button>
          </div>

          {/* Census line — replaces the 3-stat product grid */}
          <div className="mt-20 flex items-center gap-4 text-sm uppercase tracking-[0.32em] text-primary-foreground/60 animate-fade-in [animation-delay:500ms]">
            <BreathingDot variant="accent" />
            <span>
              {lang === "fr" ? "Une famille · Casablanca + Rabat · Maroc" : "One family · Casablanca + Rabat · Morocco"}
            </span>
          </div>
        </div>

        {/* Threshold marker at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]">
          <BreathingDot variant="accent" />
        </div>
      </section>

      {/* ACT II — BREATH (welcome / belonging) */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <SacredEyebrow className="mb-8 justify-center">{t.intro.eyebrow}</SacredEyebrow>
          <h2 className="font-display text-4xl leading-[1.1] text-balance md:text-6xl lg:text-7xl animate-ascend">
            {t.intro.title}
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
            {t.intro.body}
          </p>
          <div className="mt-12 flex justify-center">
            <Button asChild variant="hero" size="lg" className="glory">
              <Link to="/about">
                {t.intro.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ACT III — WORD (a single Scripture moment, full viewport) */}
      <section className="sanctuary cross-watermark relative isolate overflow-hidden flex items-center min-h-[80svh]">
        <CrossWatermark opacity={0.05} />
        <LightBeam intensity="medium" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 w-full">
          <VeilDivider className="mb-16" />
          <div className="mb-10 flex justify-center">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Sa présence" : "His presence"}
            </SacredEyebrow>
          </div>
          <ScriptureRef
            verse={t.scripture.verse}
            reference={t.scripture.ref}
            size="xl"
            align="center"
            className="text-primary-foreground"
          />
          <VeilDivider className="mt-16" />
        </div>
      </section>

      {/* ACT IV — FIRE (a single voice / testimony) */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="mb-10 flex justify-center">
            <SacredEyebrow>
              {lang === "fr" ? "Témoignage" : "Testimony"}
            </SacredEyebrow>
          </div>
          <blockquote className="font-display text-3xl leading-[1.2] text-balance text-foreground md:text-4xl lg:text-5xl text-center">
            <span aria-hidden="true" className="text-accent mr-2 align-top">"</span>
            {t.testimonials.items[0].quote}
            <span aria-hidden="true" className="text-accent ml-1 align-top">"</span>
          </blockquote>
          <figcaption className="mt-12 text-center">
            <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
              <BreathingDot variant="muted" />
              {t.testimonials.items[0].name}
            </span>
          </figcaption>
        </div>
      </section>

      {/* ACT V — REVERENCE (the closing call: come, give, return) */}
      <section className="sanctuary cross-watermark relative isolate overflow-hidden reverence">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 text-center text-primary-foreground">
          <SacredEyebrow variant="light" className="mb-8 justify-center">
            {lang === "fr" ? "Bénédiction" : "Benediction"}
          </SacredEyebrow>
          <h2 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl">
            {t.giveCta.title}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
            {t.giveCta.body}
          </p>

          {/* Three quiet links — not cards */}
          <div className="mt-16 flex flex-col items-center gap-1 md:flex-row md:justify-center md:gap-12">
            <Link to="/visit" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
              <MapPin className="h-4 w-4" />
              <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                {lang === "fr" ? "Nous rendre visite" : "Plan your visit"}
              </span>
            </Link>
            <Link to="/ministries" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
              <Users className="h-4 w-4" />
              <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                {lang === "fr" ? "Rejoindre un ministère" : "Join a ministry"}
              </span>
            </Link>
            <Link to="/donate" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
              <ArrowRight className="h-4 w-4" />
              <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                {lang === "fr" ? "Apporter une offrande" : "Bring an offering"}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
