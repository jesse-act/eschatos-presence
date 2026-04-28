import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScriptureRef,
  VeilDivider,
  SacredEyebrow,
  LightBeam,
  CrossWatermark,
} from "@/components/sacred";
import { RevealOnView, SplitText } from "@/components/animation";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  getMinistryBySlug,
  getMinistryTranslated,
  getRelatedMinistries,
} from "@/data/ministries";
import NotFound from "./NotFound";

const MinistryDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const ministry = slug ? getMinistryBySlug(slug) : undefined;

  if (!ministry) return <NotFound />;

  const m = getMinistryTranslated(ministry, lang);
  const scripture = lang === "fr" ? ministry.scripture.fr : ministry.scripture.en;
  const Icon = ministry.icon;
  const related = getRelatedMinistries(ministry.slug, 3);

  return (
    <article>
      {/* EDITORIAL SPREAD HERO — text-left / image-right */}
      <section className="relative isolate overflow-hidden bg-background pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28 sacred-grain">
        {/* Top breadcrumb */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Link
            to="/ministries"
            className="group inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground transition-[letter-spacing,color] duration-500 ease-divine hover:tracking-[0.4em] hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-0.5" aria-hidden="true" />
            {lang === "fr" ? "Retour aux ministères" : "Back to ministries"}
          </Link>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — text */}
          <div className="relative lg:col-span-5">
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex items-center gap-3">
              <span className="font-display text-2xl text-accent">{ministry.numeral}</span>
              <span className="h-px w-10 bg-foreground/30" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {m.tag}
              </span>
            </RevealOnView>

            <RevealOnView as="h1" variant="title-bloom" delay={120} className="font-display text-4xl leading-[0.95] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <SplitText mode="word" stagger={70} delay={220}>
                {m.name}
              </SplitText>
            </RevealOnView>

            {/* Hairline */}
            <div className="my-8 h-px w-16 bg-gradient-to-r from-accent/60 to-transparent" aria-hidden="true" />

            <RevealOnView as="p" variant="rise" delay={300} className="font-editorial italic text-lg leading-[1.4] text-muted-foreground md:text-xl">
              {m.body}
            </RevealOnView>

            {/* Audience */}
            <RevealOnView as="div" variant="rise" delay={420} className="mt-8 flex items-start gap-3">
              <Users className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <p className="font-body text-base leading-relaxed text-foreground/85">
                {m.audience}
              </p>
            </RevealOnView>

            {/* CTA */}
            <RevealOnView as="div" variant="rise" delay={540} className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="lg" className="glory">
                <Link to="/contact">
                  {lang === "fr" ? `Rejoindre ${m.name}` : `Join ${m.name}`}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </RevealOnView>
          </div>

          {/* RIGHT — image (clean, no mat board cropping edges) */}
          <div className="relative lg:col-span-7">
            <RevealOnView variant="ink-rise" delay={200}>
              <figure className="relative overflow-hidden rounded-sm shadow-elegant">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={ministry.image}
                    alt={
                      lang === "fr"
                        ? `Photo du ministère ${m.name}`
                        : `Photo of the ${m.name} ministry`
                    }
                    loading="eager"
                    fetchPriority="high"
                    width={1600}
                    height={1200}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-foreground/10"
                  aria-hidden="true"
                />
              </figure>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                  {lang === "fr" ? "Planche" : "Plate"} {ministry.numeral}
                </span>
                <span className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
                <span className="font-editorial italic text-sm text-muted-foreground">
                  {m.tag}
                </span>
              </div>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* LONG BODY — drop-cap intro */}
      <section className="relative bg-background py-20 md:py-28">
        <CrossWatermark className="opacity-[0.04]" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-10 flex justify-center">
            <SacredEyebrow>
              {lang === "fr" ? "Le chapitre" : "The chapter"}
            </SacredEyebrow>
          </RevealOnView>
          <div className="space-y-6 font-body text-lg leading-[1.75] text-foreground/90 md:text-xl">
            {m.longBody.map((paragraph, i) => (
              <RevealOnView
                as="p"
                variant="rise"
                delay={i * 180}
                key={`${ministry.slug}-${i}-${paragraph.slice(0, 24)}`}
                className={
                  i === 0
                    ? "first-letter:font-display first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-accent md:first-letter:text-8xl first-letter:animate-dropcap-breath"
                    : ""
                }
              >
                {paragraph}
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      <VeilDivider label={lang === "fr" ? "Ce que nous faisons" : "What we do"} className="mx-auto max-w-3xl px-6 md:px-10" />

      {/* ACTIVITIES — what they do */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <ul className="space-y-4">
            {m.activities.map((line, i) => (
              <RevealOnView
                key={`${ministry.slug}-act-${i}`}
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

      {/* SCHEDULE + JOIN STEPS — two-column */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Schedule */}
            <RevealOnView variant="rise" className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft md:p-10">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                {lang === "fr" ? "Quand on se réunit" : "When we meet"}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                {lang === "fr" ? "Rythme hebdomadaire" : "Weekly cadence"}
              </h2>
              <p className="mt-5 font-editorial italic text-lg leading-relaxed text-foreground/85">
                {m.meetingSchedule}
              </p>
            </RevealOnView>

            {/* Join steps */}
            <RevealOnView variant="rise" delay={140} className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft md:p-10">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                {lang === "fr" ? "Comment rejoindre" : "How to join"}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                {lang === "fr" ? "Quatre étapes" : "Four steps"}
              </h2>
              <ol className="mt-5 space-y-3">
                {m.joinSteps.map((step, i) => (
                  <li key={`${ministry.slug}-step-${i}`} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-xs text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85 md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* SCRIPTURE — the verse that anchors this ministry */}
      <section className="relative overflow-hidden bg-foreground py-20 text-primary-foreground md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-glory opacity-30"
          aria-hidden="true"
        />
        <LightBeam intensity="soft" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Parole qui ancre ce chapitre" : "Word that anchors this chapter"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={200}>
            <ScriptureRef
              verse={scripture.verse}
              reference={scripture.reference}
              size="lg"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      {/* CLOSING CALL */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <RevealOnView variant="ink-rise">
            <p className="font-editorial italic text-2xl leading-snug text-foreground md:text-3xl">
              &ldquo;{m.closingCall}&rdquo;
            </p>
          </RevealOnView>
        </div>
      </section>

      {/* RELATED — other chapters */}
      {related.length > 0 && (
        <section className="bg-background reverence">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <VeilDivider label={lang === "fr" ? "Autres chapitres" : "Other chapters"} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => {
                const relTr = getMinistryTranslated(rel, lang);
                return (
                  <RevealOnView key={rel.slug} variant="rise" delay={i * 100} as="div">
                    <Link
                      to={`/ministries/${rel.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-transparent bg-card text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant hover:shadow-anoint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={rel.image}
                          alt=""
                          role="presentation"
                          loading="lazy"
                          width={1280}
                          height={896}
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute right-4 top-4 rounded-full bg-foreground/80 px-3 py-1 font-display text-xs text-primary-foreground backdrop-blur">
                          {rel.numeral}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-2xl leading-tight">{relTr.name}</h3>
                        <p className="mt-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
                          {relTr.tag}
                        </p>
                      </div>
                    </Link>
                  </RevealOnView>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA — final */}
      <section className="bg-foreground py-16 text-primary-foreground md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <RevealOnView variant="title-bloom" as="h2" className="font-display text-3xl md:text-4xl">
            {lang === "fr"
              ? `Prêt(e) à rejoindre ${m.name} ?`
              : `Ready to join ${m.name}?`}
          </RevealOnView>
          <RevealOnView variant="rise" delay={180}>
            <Button asChild variant="hero" size="lg" className="glory mt-8">
              <Link to="/contact">
                {lang === "fr" ? "Contactez-nous" : "Get in touch"}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </RevealOnView>
        </div>
      </section>
    </article>
  );
};

export default MinistryDetail;
