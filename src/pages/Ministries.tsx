import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import youthImg from "@/assets/ministry-youth.jpg";
import worshipImg from "@/assets/ministry-worship.jpg";
import prayerImg from "@/assets/ministry-prayer.jpg";
import outreachImg from "@/assets/ministry-outreach.jpg";

const imgs = [youthImg, worshipImg, prayerImg, outreachImg];

const Ministries = () => {
  const { t } = useLanguage();
  const ministries = t.ministries.items.map((m, i) => ({ ...m, img: imgs[i] ?? youthImg }));
  return (
    <>
      <PageHero
        eyebrow={t.ministries.eyebrow}
        title={<>{t.ministries.title}</>}
        subtitle={t.ministries.subtitle}
        image={worshipImg}
      />

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl space-y-24 px-6 md:px-10">
          {ministries.map((m, i) => (
            <article
              key={m.name}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""}`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                <img
                  src={m.img}
                  alt={`${m.name} ministry`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow mb-4">{m.tag}</p>
                <h2 className="font-display text-4xl md:text-5xl">{m.name}</h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">{m.body}</p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                >
                  {t.common.getInvolved} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Ministries;