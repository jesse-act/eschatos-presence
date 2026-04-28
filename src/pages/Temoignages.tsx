import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ScriptureRef, VeilDivider, SacredEyebrow, CrossWatermark } from "@/components/sacred";
import { RevealOnView, SplitText } from "@/components/animation";
import {
  TestimonyCard,
  CategoryFilter,
} from "@/components/testimonies";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  TESTIMONIES,
  type TestimonyCategory,
} from "@/data/testimonies";

type Filter = TestimonyCategory | "all";

const Temoignages = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? TESTIMONIES
        : TESTIMONIES.filter((tt) => tt.category === filter),
    [filter],
  );

  // Reuse the first testimony's image as the hero ambient backdrop
  const heroImage = TESTIMONIES[0].image;

  return (
    <>
      <PageHero
        eyebrow={t.testimoniesPage.eyebrow}
        title={t.testimoniesPage.title}
        subtitle={t.testimoniesPage.subtitle}
        image={heroImage}
        align="center"
        enableParticles
      />

      {/* Scripture introduction */}
      <section className="relative bg-background py-20 md:py-28">
        <CrossWatermark className="opacity-[0.04]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <RevealOnView variant="ink-rise" delay={200}>
            <ScriptureRef
              verse={t.testimoniesPage.indexScriptureVerse}
              reference={t.testimoniesPage.indexScriptureRef}
              size="md"
              align="center"
            />
          </RevealOnView>
        </div>
      </section>

      <VeilDivider label={t.testimoniesPage.filterEyebrow} className="mx-auto max-w-7xl px-6 md:px-10" />

      {/* Filter + grid */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <RevealOnView variant="veil-split" delay={140}>
            <CategoryFilter active={filter} onChange={setFilter} />
          </RevealOnView>

          <div className="mt-6 text-center font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
            {visible.length}{" "}
            {visible.length === 1
              ? t.testimoniesPage.countSingular
              : t.testimoniesPage.countPlural}
          </div>

          <div
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            // Re-key on filter change so cards re-trigger their procession-rise stagger
            key={filter}
          >
            {visible.map((tt, i) => (
              <TestimonyCard key={tt.slug} testimony={tt} stagger={i * 70} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-16 text-center font-editorial italic text-lg text-muted-foreground">
              {t.testimoniesPage.emptyState}
            </p>
          )}
        </div>
      </section>

      {/* Submit-your-testimony CTA */}
      <section className="relative overflow-hidden bg-foreground py-20 text-primary-foreground md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-glory opacity-30"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-10">
          <RevealOnView variant="eyebrow-spread" delay={120}>
            <SacredEyebrow variant="light">
              {t.testimoniesPage.shareTitle}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView
            as="h2"
            variant="title-bloom"
            delay={220}
            className="mt-6 font-display text-3xl leading-tight md:text-5xl"
          >
            <SplitText mode="word" stagger={70} delay={260}>
              {t.testimoniesPage.ctaTitle}
            </SplitText>
          </RevealOnView>
          <RevealOnView
            as="p"
            variant="rise"
            delay={420}
            className="mt-6 max-w-2xl font-editorial text-lg italic text-primary-foreground/80 md:text-xl"
          >
            {t.testimoniesPage.ctaBody}
          </RevealOnView>
          <RevealOnView variant="rise" delay={560}>
            <Button
              asChild
              variant="hero"
              size="lg"
              className="glory mt-10"
            >
              <Link to="/contact">
                {t.testimoniesPage.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </RevealOnView>
        </div>
      </section>
    </>
  );
};

export default Temoignages;
