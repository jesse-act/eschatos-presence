import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { CATEGORY_LABELS, type Testimony } from "@/data/testimonies";
import { CATEGORY_META } from "./categoryMeta";

interface Props {
  testimony: Testimony;
  className?: string;
}

const TestimonyMeta = ({ testimony, className }: Props) => {
  const { lang, t } = useLanguage();
  const Icon = CATEGORY_META[testimony.category].icon;
  const tone = CATEGORY_META[testimony.category].tone;
  const categoryLabel = CATEGORY_LABELS[lang][testimony.category];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-primary-foreground/85",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
        <Icon className={cn("h-3.5 w-3.5", tone === "text-accent" ? "text-accent" : "text-primary-foreground")} aria-hidden="true" />
        {categoryLabel}
      </span>
      <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/40 md:inline-block" aria-hidden="true" />
      <span className="inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        {testimony.city}
      </span>
      <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/40 md:inline-block" aria-hidden="true" />
      <span className="inline-flex items-center gap-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]">
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        {t.testimoniesPage.yearLabel} {testimony.year}
      </span>
      <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/40 md:inline-block" aria-hidden="true" />
      <span className="font-editorial italic text-sm">
        {testimony.age} {t.testimoniesPage.ageLabel}
      </span>
    </div>
  );
};

export default TestimonyMeta;
