import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import daniel from "@/assets/pastor-daniel.jpg";
import sarah from "@/assets/pastor-sarah.jpg";
import karim from "@/assets/pastor-karim.jpg";
import aboutImg from "@/assets/about-church.jpg";

const portraits = [daniel, sarah, karim];

const Leadership = () => {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t.leadership.eyebrow}
        title={<>{t.leadership.title}</>}
        subtitle={t.leadership.subtitle}
        image={aboutImg}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {t.leadership.pastors.map((p, i) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={portraits[i]}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{p.role}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Leadership;
