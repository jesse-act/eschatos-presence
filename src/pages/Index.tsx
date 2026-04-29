import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Users, MapPin, Sparkles, Clock } from "lucide-react";
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
import { Scene3D, Cross3D, LightParticles, SanctuaryLights, Flame3D } from "@/components/sacred3d";
import { RevealOnView, SplitText } from "@/components/animation";
import HeroVex from "@/components/home/HeroVex";
import { getFeaturedEvent, getEventTranslated } from "@/data/events";
import heroImg from "@/assets/hero-worship.jpg";

const Index = () => {
  const { t, lang } = useLanguage();
  const featured = getFeaturedEvent();
  const fv = featured ? getEventTranslated(featured, lang) : null;
  const fmonth = featured ? (lang === "fr" ? featured.monthFr : featured.monthEn) : "";

  return (
    <>
      {/* ACT I — VEX hero (video bg, liquid-glass nav, animated heading) */}
      <HeroVex />

      {/* ACT I.b — Featured event teaser (KARAR) — directly under hero so the
          most time-sensitive, attention-grabbing piece of content gets the
          first scroll. Only renders when an event is flagged featured. */}
      {featured && fv && (
        <section className="relative isolate overflow-hidden bg-foreground py-16 text-primary-foreground md:py-24">
          <LightBeam intensity="soft" />
          <CrossWatermark className="opacity-[0.04]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <RevealOnView variant="eyebrow-spread" className="mb-8 flex items-center gap-3">
              <Sparkles
                className="h-4 w-4 text-accent animate-breath-soft"
                aria-hidden="true"
              />
              <SacredEyebrow variant="light">
                {lang === "fr" ? "Bientôt · à grand pas" : "Coming soon · approaching fast"}
              </SacredEyebrow>
            </RevealOnView>

            <Link
              to={`/events/${featured.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
              aria-label={`${lang === "fr" ? "Découvrir" : "Discover"} ${fv.title}`}
            >
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* LEFT — editorial column */}
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <RevealOnView
                    as="h2"
                    variant="title-bloom"
                    delay={120}
                    className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl xl:text-[5rem]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {fv.title}
                  </RevealOnView>

                  <RevealOnView
                    as="p"
                    variant="rise"
                    delay={260}
                    className="mt-6 max-w-xl font-editorial italic text-lg text-primary-foreground/85 md:text-xl"
                  >
                    {fv.tagline}
                  </RevealOnView>

                  <RevealOnView
                    variant="rise"
                    delay={400}
                    className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground/75"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-3 w-3 text-accent" aria-hidden="true" />
                      {featured.time}
                    </span>
                    <span aria-hidden="true" className="text-accent/55">×</span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
                      {featured.city}
                    </span>
                    <span aria-hidden="true" className="text-accent/55">×</span>
                    <span>{fv.fullDate}</span>
                  </RevealOnView>

                  <RevealOnView
                    variant="rise"
                    delay={560}
                    className="mt-10 inline-flex items-center gap-3 border-b border-white/35 pb-2 font-liturgical text-[11px] font-bold uppercase tracking-[0.32em] text-primary-foreground transition-[letter-spacing,border-color,color] duration-500 ease-divine group-hover:tracking-[0.42em] group-hover:border-accent group-hover:text-accent"
                  >
                    {fv.registerCta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </RevealOnView>
                </div>

                {/* RIGHT — square poster with date badge */}
                <div className="order-1 lg:order-2 lg:col-span-5">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-black shadow-elegant">
                    <img
                      src={featured.image}
                      alt={fv.title}
                      loading="eager"
                      fetchPriority="high"
                      width={1080}
                      height={1080}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-divine group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display leading-none text-foreground shadow-soft animate-breath-soft">
                      <div className="text-2xl font-semibold">{featured.day}</div>
                      <div className="text-[10px] uppercase tracking-widest text-accent">
                        {fmonth}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ACT II — BREATH (welcome / belonging) */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <RevealOnView variant="eyebrow-spread" threshold={0.2}>
            <SacredEyebrow className="mb-8 justify-center">{t.intro.eyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" delay={120} threshold={0.2}>
            <h2 className="font-display text-4xl leading-[1.1] text-balance md:text-6xl lg:text-7xl animate-ascend">
              {t.intro.title}
            </h2>
          </RevealOnView>
          <RevealOnView variant="rise" delay={240} threshold={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              {t.intro.body}
            </p>
          </RevealOnView>
          <RevealOnView variant="rise" delay={360} threshold={0.2}>
            <div className="mt-12 flex justify-center">
              <Button asChild variant="hero" size="lg" className="glory">
                <Link to="/about">
                  {t.intro.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* ACT III — WORD (a single Scripture moment, full viewport) */}
      <section className="sanctuary cross-watermark relative isolate overflow-hidden flex items-center min-h-[80svh]">
        {/* 3D divine layer — cross + light particles */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
          <Scene3D
            className="h-full w-full"
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
          >
            <SanctuaryLights />
            <Cross3D
              position={[0, 0, 0]}
              scale={1.5}
              rotationSpeed={0.18}
              color="#fafafa"
              metalness={0.65}
              roughness={0.3}
              emissive="#E10600"
              emissiveIntensity={0.4}
            />
            <LightParticles count={250} spread={10} size={0.045} />
          </Scene3D>
        </div>

        <LightBeam intensity="medium" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 w-full">
          <VeilDivider className="mb-16" />
          <RevealOnView variant="eyebrow-spread" threshold={0.2}>
            <div className="mb-10 flex justify-center">
              <SacredEyebrow variant="light">
                {lang === "fr" ? "Sa présence" : "His presence"}
              </SacredEyebrow>
            </div>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={200} threshold={0.2}>
            <ScriptureRef
              verse={t.scripture.verse}
              reference={t.scripture.ref}
              size="xl"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
          <VeilDivider className="mt-16" />
        </div>
      </section>

      {/* ACT IV — FIRE (a single voice / testimony) */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" threshold={0.2}>
            <div className="mb-10 flex justify-center">
              <SacredEyebrow>
                {lang === "fr" ? "Témoignage" : "Testimony"}
              </SacredEyebrow>
            </div>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={200} threshold={0.2}>
            <blockquote className="font-display text-3xl leading-[1.2] text-balance text-foreground md:text-4xl lg:text-5xl text-center">
              <span aria-hidden="true" className="text-accent mr-2 align-top">"</span>
              {t.testimonials.items[0].quote}
              <span aria-hidden="true" className="text-accent ml-1 align-top">"</span>
            </blockquote>
          </RevealOnView>
          <RevealOnView variant="rise" delay={360} threshold={0.2}>
            <figcaption className="mt-12 text-center">
              <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
                <BreathingDot variant="muted" />
                {t.testimonials.items[0].name}
              </span>
            </figcaption>
          </RevealOnView>
          <RevealOnView variant="rise" delay={480} threshold={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/temoignages"
                className="group inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-foreground/70 transition-[letter-spacing,color] duration-500 ease-divine hover:tracking-[0.4em] hover:text-accent"
              >
                {lang === "fr" ? "Lire tous les témoignages" : "Read all testimonies"}
                <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-divine group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* ACT V — REVERENCE (the closing call: come, give, return) */}
      <section className="sanctuary cross-watermark relative isolate overflow-hidden reverence">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 text-center text-primary-foreground">
          <RevealOnView variant="eyebrow-spread" threshold={0.2}>
            <SacredEyebrow variant="light" className="mb-8 justify-center">
              {lang === "fr" ? "Bénédiction" : "Benediction"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" delay={120} threshold={0.2}>
            <h2 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              {t.giveCta.title}
            </h2>
          </RevealOnView>
          <RevealOnView variant="rise" delay={240} threshold={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
              {t.giveCta.body}
            </p>
          </RevealOnView>

          {/* Three quiet links — not cards */}
          <div className="mt-16 flex flex-col items-center gap-1 md:flex-row md:justify-center md:gap-12">
            <RevealOnView variant="rise" delay={360} threshold={0.2}>
              <Link to="/visit" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
                <MapPin className="h-4 w-4" />
                <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                  {lang === "fr" ? "Nous rendre visite" : "Plan your visit"}
                </span>
              </Link>
            </RevealOnView>
            <RevealOnView variant="rise" delay={480} threshold={0.2}>
              <Link to="/ministries" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
                <Users className="h-4 w-4" />
                <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                  {lang === "fr" ? "Rejoindre un ministère" : "Join a ministry"}
                </span>
              </Link>
            </RevealOnView>
            <RevealOnView variant="rise" delay={600} threshold={0.2}>
              <Link to="/donate" className="group inline-flex items-center gap-3 py-3 text-sm uppercase tracking-[0.28em] text-primary-foreground/80 transition-colors hover:text-accent">
                <ArrowRight className="h-4 w-4" />
                <span className="border-b border-transparent group-hover:border-accent pb-0.5">
                  {lang === "fr" ? "Apporter une offrande" : "Bring an offering"}
                </span>
              </Link>
            </RevealOnView>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
