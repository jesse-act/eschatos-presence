import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  PlayCircle,
  X,
  Expand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScriptureRef,
  VeilDivider,
  SacredEyebrow,
  LightBeam,
  CrossWatermark,
} from "@/components/sacred";
import { RevealOnView } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { getEventBySlug, getEventTranslated, getRelatedEvents } from "@/data/events";
import NotFound from "./NotFound";

const EventDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const event = slug ? getEventBySlug(slug) : undefined;

  // Hooks must run in the same order on every render — declare them BEFORE
  // the early return, otherwise React throws "Rendered fewer hooks than expected".
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  if (!event) return <NotFound />;

  const ev = getEventTranslated(event, lang);
  const month = lang === "fr" ? event.monthFr : event.monthEn;
  const related = getRelatedEvents(event.slug, 3);
  const detail = t.events.detail;
  const posterSrc = event.poster ?? event.image;
  const posterAspectClass =
    event.posterOrientation === "portrait"
      ? "aspect-[3/4] max-w-md"
      : event.posterOrientation === "square"
      ? "aspect-square max-w-lg"
      : "aspect-[16/9] max-w-3xl";
  const isVideo = event.mediaType === "video" && event.videoUrl;

  // Build a Google Calendar link without leaving React. Google's `dates=` param
  // wants `start/end` — using `start/start` produces a zero-duration event.
  // Add one day to the end so the entry shows up as an all-day event for the date.
  const calendarHref = (() => {
    const start = event.isoDate.replace(/-/g, "");
    const next = new Date(event.isoDate);
    next.setDate(next.getDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    const text = encodeURIComponent(`${ev.title} · Eschatos Church`);
    const details = encodeURIComponent(ev.summary);
    const location = encodeURIComponent(ev.address);
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  })();

  return (
    <article>
      {/* EDITORIAL SPREAD — magazine double-page: text-left / plate-right */}
      <section className="relative isolate overflow-hidden bg-background pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28 sacred-grain">
        {/* Decorative manuscript margin — vertical hairline at left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-32 left-6 hidden md:block w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent"
        />

        {/* Top breadcrumb */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground transition-[letter-spacing,color] duration-500 ease-divine hover:tracking-[0.4em] hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-0.5" aria-hidden="true" />
            {detail.backToList}
          </Link>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — editorial text column (5 / 12 on desktop) */}
          <div className="relative lg:col-span-5">
            {/* Plate marker — manuscript convention */}
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-foreground/30" aria-hidden="true" />
              <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                {lang === "fr" ? "Édition" : "Plate"} · {event.day} {month}
              </span>
            </RevealOnView>

            {/* Tagline — Cormorant italic, the soft-spoken intro */}
            <RevealOnView as="p" variant="rise" delay={120} className="mb-6 font-editorial italic text-xl leading-[1.35] text-muted-foreground md:text-2xl">
              {ev.tagline}
            </RevealOnView>

            {/* Display title */}
            <RevealOnView as="h1" variant="title-bloom" delay={220} className="font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {ev.title}
            </RevealOnView>

            {/* Hairline rule */}
            <div className="my-10 h-px w-full bg-gradient-to-r from-foreground/25 via-accent/50 to-transparent" aria-hidden="true" />

            {/* Meta column — date / time / city in a refined ledger */}
            <RevealOnView as="dl" variant="rise" delay={300} className="space-y-4 font-liturgical text-[11px] font-bold uppercase tracking-[0.32em]">
              <div className="flex items-baseline gap-4">
                <Calendar className="h-3.5 w-3.5 shrink-0 translate-y-[3px] text-accent" aria-hidden="true" />
                <dt className="w-16 text-muted-foreground">
                  {detail.whenTitle}
                </dt>
                <dd className="font-editorial italic text-base normal-case tracking-normal text-foreground">
                  {ev.fullDate}
                </dd>
              </div>
              <div className="flex items-baseline gap-4">
                <Clock className="h-3.5 w-3.5 shrink-0 translate-y-[3px] text-accent" aria-hidden="true" />
                <dt className="w-16 text-muted-foreground">
                  {lang === "fr" ? "Heure" : "Time"}
                </dt>
                <dd className="font-editorial italic text-base normal-case tracking-normal text-foreground">
                  {event.time}
                </dd>
              </div>
              <div className="flex items-baseline gap-4">
                <MapPin className="h-3.5 w-3.5 shrink-0 translate-y-[3px] text-accent" aria-hidden="true" />
                <dt className="w-16 text-muted-foreground">
                  {detail.whereTitle}
                </dt>
                <dd className="font-editorial italic text-base normal-case tracking-normal text-foreground">
                  {event.city}
                </dd>
              </div>
            </RevealOnView>

            {/* CTAs */}
            <RevealOnView as="div" variant="rise" delay={420} className="mt-12 flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="lg" className="glory">
                <Link to="/contact">
                  {ev.registerCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={calendarHref} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                  {detail.addToCalendar}
                </a>
              </Button>
            </RevealOnView>
          </div>

          {/* RIGHT — poster plate (7 / 12 on desktop) */}
          <div className="relative lg:col-span-7">
            <div className="relative">
              {/* Vertical date strip — magazine masthead aesthetic */}
              <RevealOnView
                as="div"
                variant="rise"
                delay={120}
                className="pointer-events-none absolute -left-2 top-0 hidden md:flex flex-col items-center gap-3 lg:-left-6"
                aria-hidden="true"
              >
                <span className="font-display text-7xl leading-none text-accent lg:text-[8rem]">
                  {event.day}
                </span>
                <span className="writing-vertical-rl font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/70">
                  {month} · {event.isoDate.slice(0, 4)}
                </span>
                <span className="mt-2 h-12 w-px bg-foreground/30" />
                <span className="writing-vertical-rl font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                  {event.city}
                </span>
              </RevealOnView>

              {/* The plate itself — beige gallery backdrop, deep shadow */}
              <RevealOnView
                variant="ink-rise"
                delay={200}
                className="relative md:ml-20 lg:ml-28"
              >
                <figure
                  className={`relative mx-auto w-full ${posterAspectClass} overflow-hidden rounded-sm bg-secondary shadow-elegant`}
                >
                  {/* Inner mat board — gives the affiche a museum frame feel */}
                  <div className="absolute inset-3 overflow-hidden rounded-sm bg-card md:inset-4">
                    {isVideo ? (
                      <iframe
                        src={event.videoUrl}
                        title={ev.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        aria-label={
                          lang === "fr"
                            ? `Ouvrir l'affiche en plein écran : ${ev.title}`
                            : `Open the poster fullscreen: ${ev.title}`
                        }
                        className="group/poster relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-card"
                      >
                        <img
                          src={posterSrc}
                          alt={ev.title}
                          loading="lazy"
                          width={1600}
                          height={1200}
                          // object-contain — no crop, full flyer visible
                          className="h-full w-full object-contain transition-transform duration-700 ease-divine group-hover/poster:scale-[1.02]"
                        />
                        {/* Subtle hover veil + zoom hint */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover/poster:bg-foreground/5"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-foreground/85 px-3 py-1.5 text-primary-foreground opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/poster:opacity-100"
                        >
                          <Expand className="h-3.5 w-3.5" />
                          <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
                            {lang === "fr" ? "Agrandir" : "Enlarge"}
                          </span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Hairline frame inside the mat */}
                  <div
                    className="pointer-events-none absolute inset-3 rounded-sm ring-1 ring-foreground/10 md:inset-4"
                    aria-hidden="true"
                  />

                  {/* Video badge */}
                  {isVideo && (
                    <div
                      className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-foreground/80 px-3 py-1.5 text-primary-foreground backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
                        {lang === "fr" ? "Bande-annonce" : "Teaser"}
                      </span>
                    </div>
                  )}

                  <figcaption className="sr-only">
                    {ev.title} — {ev.fullDate}
                  </figcaption>
                </figure>

                {/* Plate caption — editorial museum label below */}
                <div className="mt-6 flex items-center justify-between gap-4 md:ml-0">
                  <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                    {isVideo
                      ? (lang === "fr" ? "Bande-annonce" : "Teaser")
                      : (lang === "fr" ? "Affiche officielle" : "Official poster")}
                  </span>
                  <span className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
                  <span className="font-editorial italic text-sm text-muted-foreground">
                    {ev.fullDate}
                  </span>
                </div>
              </RevealOnView>
            </div>
          </div>
        </div>

        {/* Bottom hairline — closes the spread */}
        <div className="relative mx-auto mt-20 max-w-7xl px-6 md:mt-28 md:px-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* DESCRIPTION — long-form body with drop cap on first paragraph */}
      <section className="relative bg-background py-20 md:py-28">
        <CrossWatermark className="opacity-[0.04]" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-10 flex justify-center">
            <SacredEyebrow>{detail.descriptionEyebrow}</SacredEyebrow>
          </RevealOnView>
          <div className="space-y-6 font-body text-lg leading-[1.75] text-foreground/90 md:text-xl">
            {ev.longDescription.map((paragraph, i) => (
              <RevealOnView
                as="p"
                variant="rise"
                delay={i * 180}
                key={`${event.slug}-${i}-${paragraph.slice(0, 24)}`}
                className={
                  i === 0
                    ? "first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-accent md:first-letter:text-8xl first-letter:animate-dropcap-breath"
                    : ""
                }
              >
                {paragraph}
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      <VeilDivider label={detail.whatToExpectTitle} className="mx-auto max-w-3xl px-6 md:px-10" />

      {/* WHAT TO EXPECT — bullet list with checkmarks */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <ul className="space-y-4">
            {ev.whatToExpect.map((line, i) => (
              <RevealOnView
                key={`${event.slug}-expect-${i}`}
                as="li"
                variant="rise"
                delay={i * 100}
                className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-5 shadow-soft transition-shadow duration-500 hover:shadow-elegant"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-base leading-relaxed text-foreground/90">{line}</span>
              </RevealOnView>
            ))}
          </ul>
        </div>
      </section>

      {/* META PANELS — when, where, who */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {/* When */}
            <RevealOnView
              variant="rise"
              delay={0}
              className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft"
            >
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                {detail.whenTitle}
              </p>
              <p className="mt-2 font-display text-2xl">{ev.fullDate}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {event.time} ({event.city})
              </p>
            </RevealOnView>

            {/* Where */}
            <RevealOnView
              variant="rise"
              delay={140}
              className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft"
            >
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                {detail.whereTitle}
              </p>
              <p className="mt-2 font-display text-2xl">{event.city}</p>
              <p className="mt-2 text-sm text-muted-foreground">{ev.address}</p>
            </RevealOnView>

            {/* Who */}
            <RevealOnView
              variant="rise"
              delay={280}
              className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft"
            >
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                {detail.audienceTitle}
              </p>
              <p className="mt-2 font-editorial italic text-lg leading-snug text-foreground/85">
                {ev.audience}
              </p>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* SCRIPTURE — anchor verse */}
      <section className="relative overflow-hidden bg-foreground py-20 text-primary-foreground md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-glory opacity-30"
          aria-hidden="true"
        />
        <LightBeam intensity="soft" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">{detail.scriptureEyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={200}>
            <ScriptureRef
              verse={ev.scripture.verse}
              reference={ev.scripture.reference}
              size="lg"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      {/* RELATED — other gatherings */}
      {related.length > 0 && (
        <section className="bg-background reverence">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <VeilDivider label={detail.relatedTitle} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => {
                const relTr = getEventTranslated(rel, lang);
                const relMonth = lang === "fr" ? rel.monthFr : rel.monthEn;
                return (
                  <RevealOnView
                    key={rel.slug}
                    variant="rise"
                    delay={i * 100}
                    as="div"
                  >
                    <Link
                      to={`/events/${rel.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-transparent bg-card text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant hover:shadow-anoint"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={rel.image}
                          alt=""
                          role="presentation"
                          loading="lazy"
                          width={1280}
                          height={896}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display leading-none shadow-soft animate-breath-soft">
                          <div className="text-xl font-semibold">{rel.day}</div>
                          <div className="text-[10px] uppercase tracking-widest text-accent">{relMonth}</div>
                        </div>
                        <div className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground backdrop-blur">
                          {rel.city}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-2xl">{relTr.title}</h3>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-accent" /> {rel.time}
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
      )}

      {/* CTA — questions */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <RevealOnView variant="eyebrow-spread">
            <SacredEyebrow>{detail.contactQuestion}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView as="p" variant="rise" delay={180} className="mt-6 max-w-xl font-editorial text-lg italic text-muted-foreground">
            {ev.tagline}
          </RevealOnView>
          <RevealOnView variant="rise" delay={300}>
            <Button asChild variant="hero" size="lg" className="glory mt-8">
              <Link to="/contact">
                {detail.contactCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </RevealOnView>
        </div>
      </section>

      {/* Hidden but kept for type-completeness when lang switches mid-page */}
      <span className="hidden">{month}</span>

      {/* LIGHTBOX — fullscreen poster viewer (image-only) */}
      {lightboxOpen && !isVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ev.title}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 p-4 md:p-8 animate-fade-in-slow backdrop-blur-md"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label={lang === "fr" ? "Fermer" : "Close"}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-primary-foreground/20 bg-foreground/60 text-primary-foreground backdrop-blur-md transition-[border-color,color,transform] duration-500 ease-divine hover:border-accent hover:text-accent hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Caption strip — top-left editorial label */}
          <div
            className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-3 text-primary-foreground/80"
            aria-hidden="true"
          >
            <span className="h-px w-8 bg-primary-foreground/30" />
            <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.5em]">
              {lang === "fr" ? "Affiche" : "Poster"} · {event.day} {month}
            </span>
          </div>

          {/* The image — clicking it does NOT close (only backdrop does) */}
          <img
            src={posterSrc}
            alt={ev.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] cursor-default object-contain shadow-elegant animate-scale-in"
            draggable={false}
          />

          {/* Bottom caption — title + date */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-1 text-primary-foreground/85"
            aria-hidden="true"
          >
            <p className="font-display text-base md:text-lg">{ev.title}</p>
            <p className="font-editorial italic text-xs text-primary-foreground/65 md:text-sm">
              {ev.fullDate}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default EventDetail;
