import { Link } from "react-router-dom";
import { ArrowRight, Coffee, HeartHandshake, MapPin, Music, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import welcomeImg from "@/assets/visit-welcome.jpg";

const icons = [HeartHandshake, Music, Sparkles, Coffee];

const Visit = () => {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t.visit.eyebrow}
        title={<>{t.visit.title}</>}
        subtitle={t.visit.subtitle}
        image={welcomeImg}
      />

      {/* Expect */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4 justify-center">{t.visit.expect.eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl">{t.visit.expect.title}</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.visit.expect.items.map((it, i) => {
              const Icon = icons[i] ?? HeartHandshake;
              return (
                <div
                  key={it.title}
                  className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
                >
                  <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <p className="eyebrow mb-4">{t.visit.when.eyebrow}</p>
          <h2 className="mb-12 font-display text-4xl md:text-5xl">{t.visit.when.title}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-card p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Casablanca</p>
              <h3 className="mt-3 font-display text-3xl">{t.about.casaSchedule}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" /> 12 Rue Tahar Sebti
              </p>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Rabat</p>
              <h3 className="mt-3 font-display text-3xl">{t.about.rabatSchedule}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" /> 45 Avenue Mohammed V
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-background p-8 shadow-soft">
            <h3 className="font-display text-2xl">{t.visit.arrive.title}</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t.visit.arrive.body}</p>
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                {t.visit.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Visit;
