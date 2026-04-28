import { Heart, Compass, Flame, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import aboutImg from "@/assets/about-church.jpg";
import casaImg from "@/assets/location-casablanca.jpg";
import rabatImg from "@/assets/location-rabat.jpg";

const valueIcons = [Heart, Users, Compass, Flame];

const About = () => {
  const { t } = useLanguage();
  const values = t.about.values.map((v, i) => ({ ...v, Icon: valueIcons[i] ?? Heart }));
  const timeline = t.about.timeline;
  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={<>{t.about.title1}<br className="hidden md:block" /> {t.about.title2}</>}
        subtitle={t.about.subtitle}
        image={aboutImg}
      />

      {/* Mission / Vision / Values */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">{t.about.mission.eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight">{t.about.mission.body}</h2>
          </div>
          <div>
            <p className="eyebrow mb-4">{t.about.vision.eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight">{t.about.vision.body}</h2>
          </div>
          <div>
            <p className="eyebrow mb-4">{t.about.heart.eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight">{t.about.heart.body}</h2>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-4">
          {values.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
            >
              <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <p className="eyebrow mb-4">{t.about.journey.eyebrow}</p>
          <h2 className="mb-16 font-display text-4xl md:text-5xl">{t.about.journey.title}</h2>
          <ol className="relative border-l border-accent/40">
            {timeline.map((it) => (
              <li key={it.year} className="mb-12 ml-8 last:mb-0">
                <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-accent bg-background" />
                <div className="font-display text-2xl text-accent">{it.year}</div>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="eyebrow mb-4">{t.about.locations.eyebrow}</p>
          <h2 className="mb-16 font-display text-4xl md:text-5xl">{t.about.locations.title}</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              { img: casaImg, name: "Casablanca", role: t.about.casaRole, line1: "12 Rue Tahar Sebti, Casablanca", line2: t.about.casaSchedule },
              { img: rabatImg, name: "Rabat", role: t.about.rabatRole, line1: "45 Avenue Mohammed V, Rabat", line2: t.about.rabatSchedule },
            ].map((c) => (
              <article key={c.name} className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:shadow-elegant">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={`${c.name} skyline`} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{c.role}</p>
                  <h3 className="mt-2 font-display text-3xl">{c.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.line1}</p>
                  <p className="text-sm text-muted-foreground">{c.line2}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;