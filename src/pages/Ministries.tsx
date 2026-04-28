import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { LightBeam, ScriptureRef, SacredEyebrow, CrossWatermark } from "@/components/sacred";
import { RevealOnView, SplitText } from "@/components/animation";
import { MINISTRIES } from "@/data/ministries";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/sacred3d/useReducedMotion";

const Ministries = () => {
  const { lang } = useLanguage();
  const reducedMotion = useReducedMotion();

  // Active chapter for the sticky index — driven by IntersectionObserver
  const [activeSlug, setActiveSlug] = useState<string>(MINISTRIES[0].slug);
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // Single shared observer — cheaper than 8 native callbacks on scroll.
    // Targets are matched via `target.id` (each <section> has id={m.slug}).
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target instanceof HTMLElement && visible.target.id) {
          setActiveSlug(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    Object.values(chapterRefs.current).forEach(
      (el) => el && observer.observe(el),
    );
    return () => observer.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const el = chapterRefs.current[slug];
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          ACT I — TYPOGRAPHIC FRONTISPIECE
          A pure-typography opener (no hero image). The eight ministries
          appear as a vertical numbered ledger, like the table of contents
          of an illuminated codex.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-foreground pt-32 pb-16 md:pt-40 md:pb-24 text-primary-foreground sacred-grain">
        <LightBeam intensity="soft" />
        <CrossWatermark opacity={0.05} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT — display (col-7) — tightened */}
            <div className="lg:col-span-7">
              <RevealOnView variant="eyebrow-spread" className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary-foreground/25" aria-hidden="true" />
                <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground/65">
                  {lang === "fr" ? "Codex des ministères" : "Codex of ministries"}
                </span>
              </RevealOnView>

              <h1 className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                <SplitText mode="word" stagger={90}>
                  {lang === "fr" ? "Huit appels." : "Eight callings."}
                </SplitText>
                <br />
                <span className="text-accent">
                  <SplitText mode="word" stagger={90} delay={400}>
                    {lang === "fr" ? "Un seul corps." : "One body."}
                  </SplitText>
                </span>
              </h1>

              <RevealOnView as="p" variant="rise" delay={900} className="mt-6 max-w-xl font-editorial italic text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                {lang === "fr"
                  ? "Huit équipes. Huit dons distincts. Une mission unique : servir la maison du Père et faire connaître Son nom à travers Casablanca et Rabat."
                  : "Eight teams. Eight distinct gifts. One mission: to serve the house of the Father and make His name known across Casablanca and Rabat."}
              </RevealOnView>

              <RevealOnView as="div" variant="rise" delay={1100} className="mt-8 inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground/55">
                <ArrowDown className="h-3 w-3 animate-breath-soft" aria-hidden="true" />
                {lang === "fr" ? "Faites défiler le codex" : "Scroll the codex"}
              </RevealOnView>
            </div>

            {/* RIGHT — vertical numbered ledger (col-5) — compacted */}
            <aside className="lg:col-span-5">
              <RevealOnView as="div" variant="ink-rise" delay={300}>
                <div className="rounded-sm border border-primary-foreground/15 bg-foreground/30 p-5 backdrop-blur-sm md:p-6">
                  <p className="mb-4 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground/55">
                    {lang === "fr" ? "Sommaire" : "Index"}
                  </p>
                  <ol className="divide-y divide-primary-foreground/10">
                    {MINISTRIES.map((m) => (
                      <li
                        key={m.slug}
                        className="flex items-baseline gap-4 py-2"
                      >
                        <span className="font-display text-sm text-accent w-5 shrink-0 tabular-nums">
                          {m.numeral}
                        </span>
                        <button
                          type="button"
                          onClick={() => scrollTo(m.slug)}
                          className="group flex-1 text-left cursor-pointer"
                        >
                          <span className="font-display text-sm leading-tight text-primary-foreground transition-colors duration-500 group-hover:text-accent md:text-base">
                            {m[lang].name}
                          </span>
                          <span className="block font-liturgical text-[8px] font-bold uppercase tracking-[0.32em] text-primary-foreground/45 mt-0.5">
                            {m[lang].tag}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </RevealOnView>
            </aside>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT II — STICKY CHAPTER RAIL + ALTERNATING SPREADS
          Each ministry becomes a "chapter" — alternating L/R full-bleed
          plates with a sticky vertical numeral rail on the side.
          ───────────────────────────────────────────────────────────── */}
      <div className="relative bg-background">
        {/* Sticky chapter rail — desktop only (right side) */}
        <nav
          aria-label={lang === "fr" ? "Index des chapitres" : "Chapter index"}
          className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <ol className="pointer-events-auto space-y-4">
            {MINISTRIES.map((m) => {
              const isActive = m.slug === activeSlug;
              return (
                <li key={m.slug}>
                  <button
                    type="button"
                    onClick={() => scrollTo(m.slug)}
                    aria-current={isActive ? "location" : undefined}
                    aria-label={`${m.numeral} — ${m[lang].name}`}
                    className={cn(
                      "group flex items-center gap-3 cursor-pointer",
                      "transition-[opacity] duration-500",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-px transition-[width,background-color] duration-500 ease-divine",
                        isActive
                          ? "w-10 bg-accent"
                          : "w-5 bg-foreground/30 group-hover:w-8 group-hover:bg-foreground/60",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-display text-xs tabular-nums transition-colors duration-500",
                        isActive
                          ? "text-accent"
                          : "text-foreground/50 group-hover:text-foreground",
                      )}
                    >
                      {m.numeral}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* The chapters */}
        {MINISTRIES.map((m, i) => {
          const isLeftImage = i % 2 === 0;
          const verse = lang === "fr" ? m.scripture.fr : m.scripture.en;
          const Icon = m.icon;
          return (
            <div key={m.slug}>
              {/* Sacred fleuron — 8-pointed star between chapters (replaces border-t) */}
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "flex items-center justify-center py-10 md:py-14",
                    i % 2 === 0 ? "bg-background" : "bg-secondary/30",
                  )}
                >
                  <span className="h-px w-[22%] max-w-[200px] bg-foreground/15" />
                  <svg viewBox="0 0 64 64" className="mx-5 h-10 w-10 text-accent/80 md:h-12 md:w-12">
                    <polygon
                      points="32,4 36,28 60,32 36,36 32,60 28,36 4,32 28,28"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      fill="none"
                    />
                    <polygon
                      points="32,12 34,30 52,32 34,34 32,52 30,34 12,32 30,30"
                      stroke="currentColor"
                      strokeWidth="0.6"
                      fill="none"
                      opacity="0.55"
                      transform="rotate(22.5 32 32)"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="0.7"
                      fill="none"
                    />
                    <circle cx="32" cy="32" r="0.9" fill="currentColor" />
                  </svg>
                  <span className="h-px w-[22%] max-w-[200px] bg-foreground/15" />
                </div>
              )}

              <section
                ref={(el) => {
                  chapterRefs.current[m.slug] = el;
                }}
                id={m.slug}
                aria-labelledby={`${m.slug}-title`}
                className={cn(
                  "relative isolate overflow-hidden",
                  // Soft alternating background to differentiate chapters without breaking flow
                  i % 2 === 0 ? "bg-background" : "bg-secondary/30",
                )}
              >
              <div className="mx-auto grid min-h-0 max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:px-10 md:py-28 lg:min-h-[88svh] lg:grid-cols-12 lg:items-center lg:gap-16">
                {/* IMAGE — col-7, alternates side */}
                <div
                  className={cn(
                    "relative lg:col-span-7",
                    isLeftImage ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <RevealOnView variant="ink-rise" delay={120}>
                    {/* Image plate — clean rounded frame, no mat board cropping the edges.
                        The shadow + thin ring gives the gallery feel without hiding image content. */}
                    <Link
                      to={`/ministries/${m.slug}`}
                      aria-label={
                        lang === "fr"
                          ? `Découvrir le ministère ${m[lang].name}`
                          : `Discover the ${m[lang].name} ministry`
                      }
                      className="group/plate block relative overflow-hidden rounded-sm shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-secondary">
                        <img
                          src={m.image}
                          alt={
                            lang === "fr"
                              ? `Photo du ministère ${m[lang].name}`
                              : `Photo of the ${m[lang].name} ministry`
                          }
                          loading={i < 2 ? "eager" : "lazy"}
                          width={1280}
                          height={960}
                          className="h-full w-full object-cover object-top transition-transform duration-1400 ease-divine group-hover/plate:scale-[1.015]"
                        />
                      </div>
                      {/* Subtle ring inside the rounded frame — gallery border without eating pixels */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-foreground/10"
                        aria-hidden="true"
                      />
                      {/* "Discover" pill on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-foreground/85 px-3 py-1.5 text-primary-foreground opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/plate:opacity-100"
                      >
                        <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
                          {lang === "fr" ? "Découvrir" : "Discover"}
                        </span>
                      </span>
                    </Link>

                    {/* Plate caption — museum label below */}
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                        {lang === "fr" ? "Planche" : "Plate"} {m.numeral}
                      </span>
                      <span className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
                      <span className="font-editorial italic text-sm text-muted-foreground">
                        {m[lang].tag}
                      </span>
                    </div>
                  </RevealOnView>
                </div>

                {/* TEXT — col-5, alternates side. overflow-hidden contains the
                    massive background numeral so it never leaks horizontally
                    on small viewports. */}
                <div
                  className={cn(
                    "relative overflow-hidden lg:col-span-5",
                    isLeftImage ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  {/* Massive numeral as an editorial drop (background) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-8 -left-2 select-none font-display italic text-[8rem] leading-[0.78] tracking-[-0.04em] text-accent/[0.08] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] [transform:rotate(-3deg)]"
                  >
                    {m.numeral}
                  </span>

                  <div className="relative">
                    <RevealOnView variant="eyebrow-spread" delay={120} as="div" className="mb-6 flex items-center gap-3">
                      <span className="font-display text-2xl text-accent">
                        {m.numeral}
                      </span>
                      <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
                      <span className="inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                        <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        {m[lang].tag}
                      </span>
                    </RevealOnView>

                    <h2
                      id={`${m.slug}-title`}
                      className="font-display text-4xl leading-[0.95] tracking-tight text-foreground md:text-5xl lg:text-6xl"
                    >
                      <SplitText mode="word" stagger={70} delay={220}>
                        {m[lang].name}
                      </SplitText>
                    </h2>

                    {/* Hairline pivot */}
                    <div
                      className="my-8 h-px w-16 bg-gradient-to-r from-accent/60 to-transparent"
                      aria-hidden="true"
                    />

                    <RevealOnView as="p" variant="rise" delay={340} className="font-body text-lg leading-[1.7] text-foreground/85 first-letter:font-display first-letter:text-4xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-accent first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.85]">
                      {m[lang].body}
                    </RevealOnView>

                    {/* Scripture inset — the verse for THIS chapter */}
                    <RevealOnView variant="ink-rise" delay={500} as="figure" className="mt-10 border-l-2 border-accent/50 pl-6">
                      <blockquote className="font-editorial italic text-base leading-snug text-muted-foreground md:text-lg">
                        &ldquo;{verse.verse}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                        — {verse.reference}
                      </figcaption>
                    </RevealOnView>

                    <RevealOnView variant="rise" delay={620} className="mt-10 flex flex-wrap items-center gap-3">
                      <Button asChild variant="hero" size="lg" className="glory">
                        <Link to={`/ministries/${m.slug}`}>
                          {lang === "fr" ? "Lire le chapitre complet" : "Read the full chapter"}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to="/contact">
                          {lang === "fr" ? `Rejoindre` : `Join`}
                        </Link>
                      </Button>
                    </RevealOnView>
                  </div>
                </div>
              </div>
            </section>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ACT III — PENTECOST CONFIRMATION
          The 3D flame scene preserved as a sealing moment — Acts 2:3.
          ───────────────────────────────────────────────────────────── */}
      <section className="sanctuary cross-watermark relative overflow-hidden reverence min-h-[60svh]">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Pentecôte" : "Pentecost"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={200}>
            <ScriptureRef
              verse={
                lang === "fr"
                  ? "Des langues, semblables à des langues de feu, leur apparurent, séparées les unes des autres, et se posèrent sur chacun d'eux."
                  : "They saw what seemed to be tongues of fire that separated and came to rest on each of them."
              }
              reference={lang === "fr" ? "Actes 2:3" : "Acts 2:3"}
              size="lg"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT IV — INVITATION COLOPHON
          A final closing statement, like the colophon of a manuscript.
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground py-20 text-primary-foreground cross-watermark relative overflow-hidden md:py-28">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnView variant="eyebrow-spread" className="flex justify-center mb-6">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Votre place vous attend" : "Your place is waiting"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" delay={120} as="h2" className="font-display text-4xl md:text-6xl">
            {lang === "fr"
              ? "Chaque don compte. Chaque voix compte."
              : "Every gift counts. Every voice matters."}
          </RevealOnView>
          <RevealOnView variant="rise" delay={240} as="p" className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            {lang === "fr"
              ? "Pas besoin d'être parfait — juste disponible. Rejoignez une équipe et découvrez pourquoi servir change tout."
              : "You don't need to be perfect — just available. Join a team and discover why serving changes everything."}
          </RevealOnView>
          <RevealOnView variant="rise" delay={360}>
            <Button variant="hero" size="xl" className="glory mt-10" asChild>
              <Link to="/contact">
                {lang === "fr" ? "Contactez-nous" : "Get in touch"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </RevealOnView>

          {/* Colophon hairline */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-primary-foreground/20" aria-hidden="true" />
            <span className="font-liturgical text-[9px] font-bold uppercase tracking-[0.5em] text-primary-foreground/40">
              {lang === "fr" ? "Fin du codex" : "End of codex"}
            </span>
            <span className="h-px w-16 bg-primary-foreground/20" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Ministries;
