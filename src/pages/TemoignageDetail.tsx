import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScriptureRef,
  VeilDivider,
  SacredEyebrow,
  LightBeam,
  CrossWatermark,
} from "@/components/sacred";
import {
  TestimonyMeta,
  TestimonyPullQuote,
  RelatedTestimonies,
  CATEGORY_META,
} from "@/components/testimonies";
import { RevealOnView } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  getTestimonyBySlug,
  getTranslated,
  CATEGORY_LABELS,
} from "@/data/testimonies";
import NotFound from "./NotFound";

const TemoignageDetail = () => {
  // useParams in v6 always returns string | undefined regardless of generics;
  // omit the misleading generic and rely on the explicit guard below.
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const testimony = slug ? getTestimonyBySlug(slug) : undefined;

  if (!testimony) return <NotFound />;

  const tx = getTranslated(testimony, lang);
  // Approx reading time (avg ≈ 200 words/min)
  const wordCount = tx.body.join(" ").split(/\s+/).length;
  const readingMin = Math.max(1, Math.round(wordCount / 200));

  return (
    <article>
      {/* HERO — full-bleed portrait + over-image title */}
      <section className="relative isolate overflow-hidden pt-40 pb-20 md:pt-52 lg:pt-56 md:pb-28 text-primary-foreground sacred-grain">
        <div className="absolute inset-0 -z-10">
          <img
            src={testimony.image}
            alt={testimony.name}
            className="h-full w-full object-cover object-center animate-slow-zoom"
            loading="eager"
            fetchPriority="high"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
        </div>
        <LightBeam intensity="soft" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10">
          <div className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">{tx.tagline}</SacredEyebrow>
          </div>

          <h1 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl animate-ascend [animation-delay:120ms]">
            {testimony.name}
          </h1>

          <TestimonyMeta testimony={testimony} className="mt-8 animate-fade-in [animation-delay:280ms]" />

          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in [animation-delay:360ms]">
            <Button asChild variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground">
              <Link to="/temoignages">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.testimoniesPage.backToList}
              </Link>
            </Button>
            <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground/60">
              {readingMin} {t.testimoniesPage.readingMin}
            </span>
          </div>
        </div>
      </section>

      {/* PULL QUOTE — large editorial italic */}
      <section className="relative bg-background py-20 md:py-28">
        <CrossWatermark className="opacity-[0.04]" />
        <div className="relative mx-auto max-w-4xl px-6 md:px-10">
          <RevealOnView variant="ink-rise" delay={120} threshold={0.3}>
            <TestimonyPullQuote
              quote={tx.pullQuote}
              attribution={`${testimony.name} · ${testimony.city}`}
              eyebrow={t.testimoniesPage.pullQuoteEyebrow}
            />
          </RevealOnView>
        </div>
      </section>

      <VeilDivider label={t.testimoniesPage.bodyEyebrow} className="mx-auto max-w-7xl px-6 md:px-10" />

      {/* BODY — sticky portrait companion + drop-cap text body */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — sticky portrait card (lg+ only) */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <RevealOnView variant="ink-rise" delay={120}>
                  <figure className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-elegant">
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <img
                        src={testimony.image}
                        alt={testimony.name}
                        loading="lazy"
                        width={900}
                        height={1200}
                        className="h-full w-full object-cover object-top"
                      />
                      {/* Soft floor gradient for legibility of any caption overlay */}
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/95 via-card/40 to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                    <figcaption className="space-y-3 p-6 md:p-7">
                      {/* Category pill — Lucide icon, never emoji */}
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = CATEGORY_META[testimony.category].icon;
                          const tone = CATEGORY_META[testimony.category].tone;
                          return (
                            <Icon
                              className={
                                "h-3.5 w-3.5 " +
                                (tone === "text-accent" ? "text-accent" : "text-foreground/80")
                              }
                              aria-hidden="true"
                            />
                          );
                        })()}
                        <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                          {CATEGORY_LABELS[lang][testimony.category]}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
                        {testimony.name}
                      </h2>

                      <p className="font-editorial italic text-sm text-muted-foreground">
                        {testimony.age} {t.testimoniesPage.ageLabel}
                      </p>

                      {/* Hairline */}
                      <div className="h-px w-full bg-foreground/15" aria-hidden="true" />

                      <dl className="space-y-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
                        <div className="flex items-baseline gap-3">
                          <MapPin className="h-3 w-3 shrink-0 translate-y-[2px] text-accent" aria-hidden="true" />
                          <dt className="w-12 text-muted-foreground">
                            {lang === "fr" ? "Ville" : "City"}
                          </dt>
                          <dd className="font-editorial italic text-sm normal-case tracking-normal text-foreground">
                            {testimony.city}
                          </dd>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <Calendar className="h-3 w-3 shrink-0 translate-y-[2px] text-accent" aria-hidden="true" />
                          <dt className="w-12 text-muted-foreground">
                            {lang === "fr" ? "Année" : "Year"}
                          </dt>
                          <dd className="font-editorial italic text-sm normal-case tracking-normal text-foreground">
                            {testimony.year}
                          </dd>
                        </div>
                      </dl>

                      {/* Reading-time badge */}
                      <div className="pt-2 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-liturgical text-[9px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                          {readingMin} {t.testimoniesPage.readingMin}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </RevealOnView>
              </div>
            </aside>

            {/* RIGHT — long-form body with drop cap */}
            <div className="lg:col-span-8">
              <div className="space-y-6 font-body text-lg leading-[1.75] text-foreground/90 md:text-xl">
                {tx.body.map((paragraph, i) => (
                  <RevealOnView
                    as="p"
                    variant="rise"
                    delay={i * 180}
                    // Body is static per testimony; derive a stable key from content
                    // so a future reorder/filter does not corrupt React's diffing.
                    key={`${testimony.slug}-${i}-${paragraph.slice(0, 24)}`}
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
          </div>
        </div>
      </section>

      {/* SCRIPTURE — anchor verse that carried the story */}
      <section className="relative overflow-hidden bg-foreground py-20 text-primary-foreground md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-glory opacity-30"
          aria-hidden="true"
        />
        <LightBeam intensity="soft" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <div className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">
              {t.testimoniesPage.verseEyebrow}
            </SacredEyebrow>
          </div>
          <RevealOnView variant="ink-rise" delay={200}>
            <ScriptureRef
              verse={tx.scripture.verse}
              reference={tx.scripture.reference}
              size="lg"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      {/* RELATED */}
      <RelatedTestimonies currentSlug={testimony.slug} />

      {/* CTA — share your own testimony */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <RevealOnView variant="eyebrow-spread">
            <SacredEyebrow>{t.testimoniesPage.shareTitle}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView
            as="h2"
            variant="title-bloom"
            delay={120}
            className="mt-6 font-display text-3xl leading-tight md:text-4xl"
          >
            {t.testimoniesPage.ctaTitle}
          </RevealOnView>
          <RevealOnView
            as="p"
            variant="rise"
            delay={260}
            className="mt-4 max-w-xl font-editorial text-lg italic text-muted-foreground"
          >
            {t.testimoniesPage.ctaBody}
          </RevealOnView>
          <Button asChild variant="hero" size="lg" className="glory mt-8">
            <Link to="/contact">
              {t.testimoniesPage.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </article>
  );
};

export default TemoignageDetail;
