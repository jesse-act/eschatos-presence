import { useLanguage } from "@/i18n/LanguageContext";
import { getRelatedTestimonies } from "@/data/testimonies";
import { VeilDivider } from "@/components/sacred";
import TestimonyCard from "./TestimonyCard";

interface Props {
  currentSlug: string;
}

const RelatedTestimonies = ({ currentSlug }: Props) => {
  const { t } = useLanguage();
  const related = getRelatedTestimonies(currentSlug, 3);

  if (related.length === 0) return null;

  return (
    <section className="reverence relative bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <VeilDivider label={t.testimoniesPage.relatedTitle} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {related.map((rt, i) => (
            <TestimonyCard key={rt.slug} testimony={rt} stagger={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTestimonies;
