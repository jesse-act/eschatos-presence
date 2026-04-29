import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedHeading, FadeIn } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";

const VIDEO_URL = "/home/Church_animation_with_Holy_Spirit_202604291201.mp4";

const HeroVex = () => {
  const { t, lang } = useLanguage();

  // Magazine masthead trick: break the title at the first comma so the second
  // line can sit on its own typographic axis (indented 8vw — asymmetric).
  const titleWithBreak = t.hero.title.replace(/,\s+/, ",\n");

  // Existing church nav slots, mapped onto the spec's center cluster.
  const navLinks = [
    { label: t.nav.about, to: "/about" },
    { label: t.nav.ministries, to: "/ministries" },
    { label: t.nav.events, to: "/events" },
    { label: t.nav.sermons, to: "/sermons" },
  ];

  // Tag pillars — three glass pills tied by × dingbats (replaces the single capsule).
  const cities = [
    "Casablanca",
    "Rabat",
    lang === "fr" ? "Maroc" : "Morocco",
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white">
      {/* Full-bleed background video — no overlay layer; legibility comes from
          a localized bottom gradient + per-element text-shadow further down. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        poster="/home/eschots.png"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          void v.play();
        }}
      />

      {/* Spotlight legibility — two soft radial pools darken ONLY where the
          text content lives (bottom-left for the title cluster, bottom-right
          for the city pillars). The center, top, and right-top of the video
          remain perfectly clean. Plus a thin floor gradient so the deck strip
          at the very bottom is always grounded. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            // Big pool — under title + subtitle + CTAs
            "radial-gradient(ellipse 65% 70% at 22% 78%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 25%, rgba(0,0,0,0.15) 50%, transparent 65%)",
            // Small pool — under city pillars
            "radial-gradient(ellipse 38% 32% at 82% 76%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)",
            // Floor band — ensures the deck strip stays legible
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 12%, transparent 22%)",
          ].join(", "),
        }}
      />

      {/* Vertical masthead eyebrow — reads bottom-up on the left edge.
          Hidden on mobile to keep small viewports breathable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 [writing-mode:vertical-rl] rotate-180 md:left-5 md:flex lg:left-7"
      >
        <span className="h-12 w-px bg-white/30" />
        <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/65">
          {t.hero.eyebrow}
        </span>
        <span className="h-12 w-px bg-white/30" />
      </div>

      {/* Foreground stack */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-6 md:px-12 lg:px-16">
        {/* Liquid-glass nav */}
        <nav
          aria-label={lang === "fr" ? "Navigation principale" : "Primary navigation"}
          className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2"
        >
          <Link to="/" aria-label="Eschatos Church" className="inline-flex items-center">
            <img
              src="/logo/logoblanc.png"
              alt="Eschatos Church"
              className="h-8 w-auto object-contain md:h-9"
              width={160}
              height={36}
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-white transition-colors hover:text-gray-300"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            to="/visit"
            className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          >
            {t.hero.cta1}
          </Link>
        </nav>

        {/* Editorial spread — pushed to the bottom, leaves room for the deck strip. */}
        <div className="flex flex-1 flex-col justify-end pb-24 lg:pb-32">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT — title + subtitle + text-link CTAs */}
            <div className="lg:col-span-7">
              <AnimatedHeading
                text={titleWithBreak}
                initialDelay={200}
                charDelay={30}
                charDuration={500}
                className="font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl [&>span:nth-of-type(2)]:pl-[8vw] [&>span:nth-of-type(2)]:md:pl-[10vw]"
                style={{
                  letterSpacing: "-0.04em",
                  textShadow:
                    "0 4px 32px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.75), 0 1px 2px rgba(0,0,0,0.85)",
                }}
              />

              {/* Subtitle — editorial italic deck under a hairline divider */}
              <FadeIn delay={1000} duration={1000}>
                <div className="mt-10 flex max-w-xl items-start gap-5 lg:gap-6">
                  <div className="mt-3 h-px w-12 shrink-0 bg-white/40" aria-hidden="true" />
                  <p
                    className="font-editorial italic text-base text-white md:text-lg"
                    style={{
                      textShadow:
                        "0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {t.hero.subtitle}
                  </p>
                </div>
              </FadeIn>

              {/* CTAs — text links with letter-spacing + hairline rule, no buttons */}
              <FadeIn delay={1300} duration={1000}>
                <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
                  <Link
                    to="/visit"
                    className="group inline-flex items-center gap-3 border-b border-white/40 pb-1.5 font-liturgical text-[11px] font-bold uppercase tracking-[0.32em] text-white transition-[letter-spacing,border-color,color] duration-500 hover:tracking-[0.42em] hover:border-accent hover:text-accent"
                  >
                    {t.hero.cta1}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    to="/sermons"
                    className="group inline-flex items-center gap-3 border-b border-white/20 pb-1.5 font-liturgical text-[11px] font-bold uppercase tracking-[0.32em] text-white/85 transition-[letter-spacing,border-color,color] duration-500 hover:tracking-[0.42em] hover:border-white hover:text-white"
                  >
                    {t.hero.cta2}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — three-pillar tag (Casablanca × Rabat × Maroc) */}
            <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:col-start-9 lg:items-end">
              <FadeIn delay={1500} duration={1000}>
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {cities.map((city, i) => (
                    <div key={city} className="flex items-center gap-2">
                      <span className="liquid-glass rounded-full border border-white/20 px-5 py-2 text-sm font-light tracking-wide md:text-base">
                        {city}
                      </span>
                      {i < cities.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="font-liturgical text-[10px] uppercase tracking-[0.32em] text-white/55"
                        >
                          ×
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Bottom deck strip — service times in liturgical small caps,
            framed by a hairline above. Fixed at the bottom of the section. */}
        <FadeIn delay={1800} duration={1000}>
          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/20 bg-gradient-to-t from-black/85 to-black/0 px-6 py-4 md:px-12 lg:px-16">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/85">
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 animate-breath-soft rounded-full bg-accent" />
                {t.church.sundayService}
              </span>
              <span aria-hidden="true" className="text-accent">×</span>
              <span>{t.church.wednesdayImpact}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroVex;
