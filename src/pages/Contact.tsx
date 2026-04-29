import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Mail,
  MapPin,
  Phone,
  Music2,
  Instagram,
  Youtube,
  Facebook,
  ArrowUpRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { SacredEyebrow, LightBeam, CrossWatermark } from "@/components/sacred";
import { RevealOnView, SplitText } from "@/components/animation";
import aboutImg from "@/assets/about-church.jpg";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(1000),
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
] as const;

interface FaqGroup {
  id: string;
  roman: string;
  romanLower: string;
  labelEn: string;
  labelFr: string;
  count: number;
}

// Sums of `count` must equal t.contact.faq.length (20). Order mirrors the
// translations array — do not reorder one without the other.
const FAQ_GROUPS: ReadonlyArray<FaqGroup> = [
  { id: "first-visit", roman: "I", romanLower: "i", labelEn: "First visit", labelFr: "Première visite", count: 5 },
  { id: "family-tongue", roman: "II", romanLower: "ii", labelEn: "Family & tongue", labelFr: "Famille & langue", count: 3 },
  { id: "belonging", roman: "III", romanLower: "iii", labelEn: "Belonging", labelFr: "Appartenance", count: 2 },
  { id: "serving", roman: "IV", romanLower: "iv", labelEn: "Serving & partnership", labelFr: "Servir & partenariat", count: 4 },
  { id: "pastoral", roman: "V", romanLower: "v", labelEn: "Pastoral care", labelFr: "Soins pastoraux", count: 3 },
  { id: "stay-in-touch", roman: "VI", romanLower: "vi", labelEn: "Stay in touch", labelFr: "Rester en lien", count: 3 },
];

const Contact = () => {
  const { t, lang } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — if filled, silently drop (likely bot).
    if ((fd.get("website") as string)?.trim()) return;

    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = t.contact.fieldErrors[key];
      }
      setErrors(next);
      toast({ title: t.contact.errorTitle });
      const firstKey = Object.keys(next)[0];
      if (firstKey) {
        const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `[name="${firstKey}"]`,
        );
        el?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast({ title: t.contact.sent, description: t.contact.sentDesc });
    }, 800);
  };

  const locations = [
    {
      city: t.contact.casaCity,
      role: t.about.casaRole,
      addr: t.contact.casaAddr,
      phone: t.church.phoneMain,
      mapQuery: "Casablanca,+Morocco",
    },
    {
      city: t.contact.rabatCity,
      role: t.about.rabatRole,
      addr: t.contact.rabatAddr,
      phone: t.church.phoneMain,
      mapQuery: "Rabat,+Morocco",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={<>{t.contact.title}</>}
        subtitle={t.contact.subtitle}
        image={aboutImg}
      />

      {/* SCRIPTURE — lettrine enluminée "V" (Apocalypse 3:20) */}
      <section className="relative bg-cream/40 py-24 md:py-32">
        <CrossWatermark className="opacity-[0.04]" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" className="mb-8 flex justify-center">
            <SacredEyebrow>{t.contact.scripture.eyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" delay={120}>
            <p className="font-display text-[1.25rem] sm:text-[1.45rem] md:text-[1.75rem] leading-[1.55] text-foreground/90 [text-wrap:balance]">
              <span className="float-left mr-4 mt-1 hidden select-none sm:block" aria-hidden="true">
                <svg
                  viewBox="0 0 120 120"
                  className="h-[5.5rem] w-[5.5rem] md:h-[6.5rem] md:w-[6.5rem]"
                >
                  <defs>
                    <pattern
                      id="lettrine-vine"
                      patternUnits="userSpaceOnUse"
                      width="12"
                      height="12"
                    >
                      <path
                        d="M0 6 Q3 0 6 6 T12 6"
                        stroke="currentColor"
                        strokeWidth="0.4"
                        fill="none"
                        className="text-accent/40"
                      />
                    </pattern>
                  </defs>
                  <rect
                    x="2"
                    y="2"
                    width="116"
                    height="116"
                    fill="url(#lettrine-vine)"
                  />
                  <rect
                    x="2"
                    y="2"
                    width="116"
                    height="116"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent/70"
                  />
                  <text
                    x="60"
                    y="92"
                    textAnchor="middle"
                    fontFamily="Cormorant Garamond, serif"
                    fontSize="110"
                    fontWeight="500"
                    fontStyle="italic"
                    fill="hsl(var(--accent))"
                  >
                    {t.contact.scripture.verse.charAt(0)}
                  </text>
                  <circle cx="10" cy="10" r="2" className="fill-accent" />
                  <circle cx="110" cy="10" r="2" className="fill-accent" />
                  <circle cx="10" cy="110" r="2" className="fill-accent" />
                  <circle cx="110" cy="110" r="2" className="fill-accent" />
                </svg>
              </span>
              <span className="font-editorial italic">
                <span className="sr-only">{t.contact.scripture.verse.charAt(0)}</span>
                <span aria-hidden="true">{t.contact.scripture.verse.slice(1)}</span>
              </span>
              <span className="text-accent">.</span>
            </p>
            <p className="mt-8 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground sm:pl-[6.5rem]">
              {t.contact.scripture.reference.split(" ")[0]}{" "}
              <span className="text-accent">·</span>{" "}
              {t.contact.scripture.reference.split(" ")[1]}
            </p>
          </RevealOnView>
        </div>
      </section>

      {/* FORM — visible right after the scripture promise */}
      <section className="relative isolate overflow-hidden bg-cream/50 py-24 md:py-32 sacred-grain">
        <LightBeam intensity="soft" />
        <CrossWatermark className="opacity-[0.04]" />

        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <RevealOnView variant="veil-split" className="mb-4 flex justify-center">
            <SacredEyebrow>{t.contact.formEyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView
            as="h2"
            variant="title-bloom"
            delay={220}
            className="mb-3 text-center font-display text-4xl text-foreground md:text-5xl lg:text-6xl"
          >
            <SplitText mode="word" stagger={70} delay={280}>
              {t.contact.formTitle}
            </SplitText>
          </RevealOnView>
          <RevealOnView
            as="p"
            id="contact-required-legend"
            variant="rise"
            delay={520}
            className="mx-auto mb-12 max-w-xl text-center font-editorial italic text-base text-muted-foreground md:text-lg"
          >
            {t.contact.requiredLegend}
          </RevealOnView>

          <form
            onSubmit={onSubmit}
            noValidate
            className="relative space-y-8"
            aria-describedby="contact-required-legend"
          >
            {/* Honeypot — invisible to humans, attractive to bots */}
            <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
              <label htmlFor="website">{t.contact.honeypotLabel}</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <FieldRow
              id="name"
              name="name"
              type="text"
              label={t.contact.name}
              placeholder={t.contact.namePh}
              maxLength={80}
              error={errors.name}
              requiredAria={t.contact.requiredAria}
            />
            <FieldRow
              id="email"
              name="email"
              type="email"
              label={t.contact.email}
              placeholder={t.contact.emailPh}
              maxLength={255}
              error={errors.email}
              requiredAria={t.contact.requiredAria}
            />
            <FieldRow
              id="message"
              name="message"
              type="textarea"
              label={t.contact.message}
              placeholder={t.contact.messagePh}
              maxLength={1000}
              error={errors.message}
              requiredAria={t.contact.requiredAria}
            />

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={submitting}
                className="glory min-w-[220px]"
              >
                {submitting ? t.contact.sending : t.contact.send}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ — Scriptorium · six Pars, twenty quaestiones */}
      <section className="relative bg-background py-24 md:py-32">
        <CrossWatermark className="opacity-[0.03]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          {/* Header — eyebrow + title + lede */}
          <div className="mx-auto max-w-4xl">
            <RevealOnView variant="eyebrow-spread" className="mb-5">
              <SacredEyebrow>{t.contact.faqEyebrow}</SacredEyebrow>
            </RevealOnView>
            <RevealOnView
              as="h2"
              variant="title-bloom"
              delay={120}
              className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.015em" }}
            >
              {t.contact.faqTitle}
            </RevealOnView>
            <RevealOnView
              as="p"
              variant="rise"
              delay={280}
              className="mt-6 max-w-xl font-editorial italic text-base text-muted-foreground md:text-lg"
            >
              {lang === "fr"
                ? "Six chapitres. Vingt questions. Ouvrez celle qui vous habite."
                : "Six chapters. Twenty questions. Open the one that lives in you."}
            </RevealOnView>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-16">
            {/* LEFT — Sticky chapter index (desktop only) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <nav
                aria-label={lang === "fr" ? "Table des chapitres" : "Chapter index"}
                className="sticky top-32"
              >
                <RevealOnView variant="eyebrow-spread">
                  <p className="mb-8 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                    {lang === "fr" ? "Table des chapitres" : "Table of chapters"}
                  </p>
                </RevealOnView>
                <ol className="space-y-5">
                  {FAQ_GROUPS.map((g, gi) => (
                    <RevealOnView
                      key={g.id}
                      as="li"
                      variant="rise"
                      delay={120 + gi * 70}
                    >
                      <a
                        href={`#faq-${g.id}`}
                        className="group grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-4 border-b border-transparent py-1 transition-colors duration-500 hover:border-accent/40"
                      >
                        <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-accent transition-[letter-spacing] duration-500 group-hover:tracking-[0.42em]">
                          {g.roman}
                        </span>
                        <span className="font-display text-lg leading-snug text-foreground/85 transition-colors duration-500 group-hover:text-accent">
                          {lang === "fr" ? g.labelFr : g.labelEn}
                        </span>
                        <span className="font-liturgical text-[10px] tracking-[0.28em] text-muted-foreground/55 tabular-nums">
                          {String(g.count).padStart(2, "0")}
                        </span>
                      </a>
                    </RevealOnView>
                  ))}
                </ol>

                <RevealOnView variant="rise" delay={620}>
                  <div className="mt-12 h-px w-12 bg-accent/40" aria-hidden="true" />
                  <p className="mt-6 max-w-[24ch] font-editorial italic text-sm leading-relaxed text-muted-foreground">
                    {lang === "fr"
                      ? "Une question manque ? Écrivez-nous : la table reste ouverte."
                      : "A question missing? Write to us — the table stays open."}
                  </p>
                </RevealOnView>
              </nav>
            </aside>

            {/* RIGHT — Pars chapters · each wrapped in an illuminated folio */}
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ_GROUPS.map((g, gi) => {
                  const start = FAQ_GROUPS.slice(0, gi).reduce(
                    (sum, p) => sum + p.count,
                    0,
                  );
                  const items = t.contact.faq.slice(start, start + g.count);

                  return (
                    <RevealOnView
                      key={g.id}
                      variant="ink-rise"
                      delay={80}
                      className="scroll-mt-32 first:mt-0 mt-20"
                    >
                      <article
                        id={`faq-${g.id}`}
                        aria-labelledby={`faq-${g.id}-title`}
                        className="relative isolate px-6 py-14 md:px-12 md:py-20"
                      >
                        {/* ── Manuscript folio frame ── */}
                        {/* Top hairline — drawn from center outward */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-10 right-10 top-0 h-px origin-center bg-gradient-to-r from-transparent via-foreground/30 to-transparent animate-underline-draw md:left-14 md:right-14"
                          style={{ animationDelay: "120ms" }}
                        />
                        {/* Bottom hairline */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-10 right-10 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-foreground/25 to-transparent animate-underline-draw md:left-14 md:right-14"
                          style={{ animationDelay: "320ms" }}
                        />
                        {/* Left vertical hairline (md+) */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-10 bottom-10 left-0 hidden w-px bg-gradient-to-b from-transparent via-foreground/22 to-transparent md:block"
                        />
                        {/* Right vertical hairline (md+) */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-10 bottom-10 right-0 hidden w-px bg-gradient-to-b from-transparent via-foreground/22 to-transparent md:block"
                        />

                        {/* Four corner fleurons — breathing rosettes */}
                        <Fleuron className="-top-3 -left-3" />
                        <Fleuron className="-top-3 -right-3" delay="700ms" />
                        <Fleuron className="-bottom-3 -right-3" delay="1400ms" />
                        <Fleuron className="-bottom-3 -left-3" delay="2100ms" />

                        {/* Incipit marker — top center plaque */}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 bg-background px-3 font-liturgical text-[9px] font-bold uppercase tracking-[0.5em] text-accent"
                        >
                          ✦ Incipit · Pars {g.roman} ✦
                        </span>

                        {/* Pars header — eyebrow + display title */}
                        <header className="mb-10 text-center md:mb-12">
                          <RevealOnView variant="eyebrow-spread" delay={220}>
                            <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                              {lang === "fr" ? "Chapitre" : "Chapter"} · {g.roman}
                            </p>
                          </RevealOnView>
                          <RevealOnView variant="title-bloom" delay={360}>
                            <h3
                              id={`faq-${g.id}-title`}
                              className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl"
                              style={{ letterSpacing: "-0.01em" }}
                            >
                              {lang === "fr" ? g.labelFr : g.labelEn}
                            </h3>
                          </RevealOnView>
                          {/* Decorative trefoil rule under the title */}
                          <RevealOnView
                            variant="eyebrow-spread"
                            delay={520}
                            className="mt-5 flex items-center justify-center gap-3"
                          >
                            <span
                              aria-hidden="true"
                              className="h-px w-12 origin-right bg-gradient-to-l from-accent/70 to-transparent animate-underline-draw"
                              style={{ animationDelay: "600ms" }}
                            />
                            <span
                              aria-hidden="true"
                              className="font-liturgical text-[14px] text-accent animate-breath-soft"
                            >
                              ✠
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-px w-12 origin-left bg-gradient-to-r from-accent/70 to-transparent animate-underline-draw"
                              style={{ animationDelay: "600ms" }}
                            />
                          </RevealOnView>
                        </header>

                        {/* Quaestiones */}
                        <div className="mx-auto max-w-2xl">
                          {items.map((item, localI) => {
                            const globalI = start + localI;
                            const folio = `${g.romanLower}.${String(localI + 1).padStart(2, "0")}`;
                            return (
                              <RevealOnView
                                key={item.q}
                                variant="letter-settle"
                                delay={520 + localI * 90}
                              >
                                <AccordionItem
                                  value={`item-${globalI}`}
                                  className="border-b border-border/50 last:border-b-0"
                                >
                                  <AccordionTrigger className="group py-5 text-left hover:no-underline data-[state=open]:py-6">
                                    <span className="grid grid-cols-[2.75rem_1fr] items-baseline gap-4 transition-[padding] duration-500 ease-divine md:grid-cols-[3.5rem_1fr] md:gap-6 group-data-[state=open]:pl-2">
                                      <span
                                        aria-hidden="true"
                                        className="font-liturgical text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/65 tabular-nums transition-colors duration-500 group-hover:text-accent group-data-[state=open]:text-accent"
                                      >
                                        {folio}
                                      </span>
                                      <span className="font-display text-lg leading-snug text-foreground transition-colors duration-500 group-hover:text-accent md:text-xl">
                                        {item.q}
                                      </span>
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent className="pl-11 pr-2 pb-7 md:pl-[3.5rem] md:pr-4">
                                    <p className="font-editorial italic text-base leading-[1.8] text-muted-foreground md:text-[17px]">
                                      <span
                                        aria-hidden="true"
                                        className="float-left mr-2 mt-0.5 select-none text-accent/80"
                                      >
                                        ¶
                                      </span>
                                      {item.a}
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </RevealOnView>
                            );
                          })}
                        </div>

                        {/* Explicit marker — bottom center plaque */}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 bottom-0 z-10 -translate-x-1/2 translate-y-1/2 bg-background px-3 font-liturgical text-[9px] font-bold uppercase tracking-[0.5em] text-accent/80"
                        >
                          ✦ Explicit · Pars {g.roman} ✦
                        </span>
                      </article>
                    </RevealOnView>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS — Diptyque éditorial typographique */}
      <section className="relative bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" className="mb-4">
            <SacredEyebrow>{t.contact.locEyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView
            as="h2"
            variant="title-bloom"
            delay={120}
            className="mb-14 font-display text-4xl md:text-5xl"
          >
            {t.contact.locTitle}
          </RevealOnView>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {locations.map((c, i) => (
              <RevealOnView
                key={c.city}
                variant="letter-settle"
                delay={i * 220}
                className="relative"
              >
                {/* Vertical hairline separator on desktop between the two cities */}
                {i === 1 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent md:block"
                  />
                )}

                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-accent"
                  >
                    {ROMAN[i]}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl">{c.city}</h3>
                </div>

                <p className="mt-2 font-editorial italic text-sm text-muted-foreground">
                  {c.role}
                </p>

                <dl className="mt-8 space-y-5 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
                  <div className="flex items-baseline gap-3">
                    <MapPin
                      className="h-3 w-3 shrink-0 translate-y-[2px] text-accent"
                      aria-hidden="true"
                    />
                    <dt className="w-20 text-muted-foreground">
                      {t.contact.addressLabel}
                    </dt>
                    <dd className="font-editorial italic text-base normal-case tracking-normal text-foreground">
                      {c.addr}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <Phone
                      className="h-3 w-3 shrink-0 translate-y-[2px] text-accent"
                      aria-hidden="true"
                    />
                    <dt className="w-20 text-muted-foreground">
                      {t.contact.phoneLabel}
                    </dt>
                    <dd className="font-editorial italic text-base normal-case tracking-normal text-foreground">
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="border-b border-transparent hover:border-accent hover:text-accent"
                      >
                        {c.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <a
                  href={`https://www.google.com/maps?q=${c.mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group/map mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-foreground transition-[letter-spacing,border-color] duration-500 hover:tracking-[0.5em] hover:border-accent hover:text-accent"
                >
                  {t.contact.openInMaps}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL — Vertical Ledger (signature finale) */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" className="mb-10">
            <SacredEyebrow>{t.contact.followUs}</SacredEyebrow>
          </RevealOnView>

          <ul className="divide-y divide-border/60">
            {[
              { Icon: Mail, label: t.contact.emailLabel, value: t.contact.contactEmail, href: `mailto:${t.contact.contactEmail}`, handle: "@eschatos" },
              { Icon: Facebook, label: "Facebook", value: "facebook.com/groups/eschatos", href: t.church.facebook, handle: "Eschatos · Groupe" },
              { Icon: Instagram, label: "Instagram", value: "instagram.com/dhmm.emem", href: t.church.instagram, handle: "@dhmm.emem" },
              { Icon: Music2, label: "TikTok", value: "tiktok.com/@dhmm_emem", href: t.church.tiktok, handle: "@dhmm_emem" },
              { Icon: Youtube, label: "YouTube", value: "youtube.com/@dhmm-emem", href: t.church.youtube, handle: "@dhmm-emem" },
            ].map(({ Icon, label, value, href, handle }, i) => (
              <RevealOnView
                key={label}
                as="li"
                variant="rise"
                delay={200 + i * 60}
                className="group"
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 transition-colors duration-500 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-6"
                >
                  <Icon
                    className="h-4 w-4 text-accent transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="hidden font-editorial italic text-base text-foreground/80 md:inline">
                    {value}
                  </span>
                  <span className="flex items-center gap-2 font-editorial italic text-base text-foreground transition-colors duration-500 group-hover:text-accent">
                    {handle}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </RevealOnView>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

interface FieldRowProps {
  id: "name" | "email" | "message";
  name: "name" | "email" | "message";
  type: "text" | "email" | "textarea";
  label: string;
  placeholder: string;
  maxLength: number;
  error?: string;
  requiredAria: string;
}

/**
 * Ledger-style field — italic Cormorant label, hairline underline, transparent input,
 * no border-radius (editorial). Inline error region announced via role="alert".
 */
const FieldRow = ({
  id,
  name,
  type,
  label,
  placeholder,
  maxLength,
  error,
  requiredAria,
}: FieldRowProps) => {
  const errorId = `${id}-error`;
  const baseField =
    "block w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 font-editorial text-lg text-foreground placeholder:text-muted-foreground/55 focus:outline-none focus:ring-0 transition-colors duration-300";
  const borderClass = error
    ? "border-destructive focus:border-destructive"
    : "border-foreground/30 focus:border-accent";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 flex items-baseline justify-between font-editorial italic text-base text-foreground/85"
      >
        <span>
          {label}{" "}
          <span aria-hidden="true" className="text-accent">
            *
          </span>
          <span className="sr-only"> ({requiredAria})</span>
        </span>
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          maxLength={maxLength}
          rows={5}
          placeholder={placeholder}
          className={`${baseField} ${borderClass} resize-none [background:repeating-linear-gradient(transparent,transparent_1.85rem,rgba(0,0,0,0.08)_1.85rem,rgba(0,0,0,0.08)_calc(1.85rem+1px))] leading-[1.85rem]`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          maxLength={maxLength}
          autoComplete={type === "email" ? "email" : "name"}
          placeholder={placeholder}
          className={`${baseField} ${borderClass}`}
        />
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 font-editorial italic text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Fleuron — a manuscript-style four-pointed rosette used at folio corners.
 * Pulses gently via animate-breath-soft; offset delay lets the four corners
 * breathe out of phase, evoking ink slowly settling on parchment.
 */
const Fleuron = ({
  className,
  delay = "0ms",
}: {
  className: string;
  delay?: string;
}) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-10 grid h-6 w-6 place-items-center bg-background ${className}`}
  >
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5 text-accent animate-breath-soft"
      style={{ animationDelay: delay }}
    >
      <line x1="16" y1="6" x2="16" y2="13" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="16" y1="19" x2="16" y2="26" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="6" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="19" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="16" cy="6" r="1.2" fill="currentColor" />
      <circle cx="16" cy="26" r="1.2" fill="currentColor" />
      <circle cx="6" cy="16" r="1.2" fill="currentColor" />
      <circle cx="26" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
      <circle cx="16" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </span>
);

export default Contact;
