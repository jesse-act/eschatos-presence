import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { ScriptureRef, SacredEyebrow, LightBeam } from "@/components/sacred";
import { RevealOnView } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { EVENTS, getEventTranslated, getFeaturedEvent } from "@/data/events";
import youthImg from "@/assets/ministry-youth.jpg";

const Events = () => {
  const { t, lang } = useLanguage();
  const featured = getFeaturedEvent();
  // Filter out the featured event from the grid — it gets its own hero card.
  const rest = featured ? EVENTS.filter((e) => e.slug !== featured.slug) : EVENTS;

  return (
    <>
      <PageHero
        eyebrow={t.events.eyebrow}
        title={<>{t.events.title}</>}
        subtitle={t.events.subtitle}
        image={youthImg}
      />

      {/* Scripture — Ecclesiastes 3 */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex justify-center">
            <SacredEyebrow>
              {lang === "fr" ? "Temps fixés" : "Appointed times"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={180} as="div">
            <ScriptureRef
              verse={
                lang === "fr"
                  ? "Il y a un temps pour tout, un temps pour toute chose sous les cieux."
                  : "There is a time for everything, and a season for every activity under the heavens."
              }
              reference={lang === "fr" ? "Ecclésiaste 3:1" : "Ecclesiastes 3:1"}
              size="md"
              align="center"
            />
          </RevealOnView>
        </div>
      </section>

      {/* Featured event — the upcoming highlight gets a giant editorial spread */}
      {featured && (() => {
        const fv = getEventTranslated(featured, lang);
        const fmonth = lang === "fr" ? featured.monthFr : featured.monthEn;
        return (
          <section className="relative isolate overflow-hidden bg-foreground py-20 text-primary-foreground md:py-28">
            <LightBeam intensity="soft" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
              <RevealOnView variant="eyebrow-spread" className="mb-6 flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-accent animate-breath-soft" aria-hidden="true" />
                <SacredEyebrow variant="light">
                  {lang === "fr" ? "Événement vedette · à grand pas" : "Featured event · coming soon"}
                </SacredEyebrow>
              </RevealOnView>

              <Link
                to={`/events/${featured.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
                aria-label={`${lang === "fr" ? "Découvrir" : "Discover"} ${fv.title}`}
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
                  {/* Poster — square flyer, ring + soft scale on hover */}
                  <div className="lg:col-span-5">
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
                      {/* Date badge over poster */}
                      <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display leading-none text-foreground shadow-soft">
                        <div className="text-2xl font-semibold">{featured.day}</div>
                        <div className="text-[10px] uppercase tracking-widest text-accent">{fmonth}</div>
                      </div>
                    </div>
                  </div>

                  {/* Editorial column */}
                  <div className="lg:col-span-7">
                    <RevealOnView
                      as="h2"
                      variant="title-bloom"
                      delay={120}
                      className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
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
                      as="p"
                      variant="rise"
                      delay={520}
                      className="mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg"
                    >
                      {fv.summary}
                    </RevealOnView>

                    <RevealOnView
                      variant="rise"
                      delay={660}
                      className="mt-10 inline-flex items-center gap-3 border-b border-white/35 pb-2 font-liturgical text-[11px] font-bold uppercase tracking-[0.32em] text-primary-foreground transition-[letter-spacing,border-color,color] duration-500 ease-divine group-hover:tracking-[0.42em] group-hover:border-accent group-hover:text-accent"
                    >
                      {fv.registerCta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </RevealOnView>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        );
      })()}

      {/* Grid — remaining events (featured already shown above) */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {featured && (
            <RevealOnView variant="eyebrow-spread" className="mb-10">
              <SacredEyebrow>
                {lang === "fr" ? "Tous les rassemblements" : "All gatherings"}
              </SacredEyebrow>
            </RevealOnView>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((e, i) => {
              const ev = getEventTranslated(e, lang);
              const month = lang === "fr" ? e.monthFr : e.monthEn;
              return (
                <RevealOnView key={e.slug} variant="rise" delay={i * 100} as="div">
                  <Link
                    to={`/events/${e.slug}`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-transparent bg-card text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant hover:shadow-anoint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={e.image}
                        alt={ev.title}
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display leading-none shadow-soft animate-breath-soft">
                        <div className="text-xl font-semibold">{e.day}</div>
                        <div className="text-[10px] uppercase tracking-widest text-accent">{month}</div>
                      </div>
                      <div className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground backdrop-blur">
                        {e.city}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                      <div>
                        <h3 className="font-display text-2xl leading-tight">{ev.title}</h3>
                        <p className="mt-2 font-editorial italic text-sm leading-snug text-muted-foreground line-clamp-2">
                          {ev.tagline}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-accent" /> {e.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-accent animate-breath-soft" /> {e.city}
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-foreground/70 transition-[letter-spacing,color] duration-500 ease-divine group-hover:tracking-[0.4em] group-hover:text-accent">
                          {lang === "fr" ? "Voir" : "View"}
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealOnView>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
