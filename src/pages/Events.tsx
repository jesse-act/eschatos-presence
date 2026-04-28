import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { ScriptureRef, SacredEyebrow } from "@/components/sacred";
import { RevealOnView } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { EVENTS, getEventTranslated } from "@/data/events";
import youthImg from "@/assets/ministry-youth.jpg";

const Events = () => {
  const { t, lang } = useLanguage();

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

      {/* Grid — each card links to its own detail page */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e, i) => {
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
