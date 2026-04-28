import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  CATEGORY_LABELS,
  TESTIMONIES,
  type TestimonyCategory,
} from "@/data/testimonies";

type Filter = TestimonyCategory | "all";

interface Props {
  active: Filter;
  onChange: (next: Filter) => void;
}

const CategoryFilter = ({ active, onChange }: Props) => {
  const { lang } = useLanguage();
  const labels = CATEGORY_LABELS[lang];

  // Build the list of categories that actually have at least one entry
  const categoriesPresent = Array.from(
    new Set(TESTIMONIES.map((tt) => tt.category)),
  );

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: labels.all, count: TESTIMONIES.length },
    ...categoriesPresent.map((c) => ({
      id: c,
      label: labels[c],
      count: TESTIMONIES.filter((tt) => tt.category === c).length,
    })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter testimonies"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {filters.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            type="button"
            aria-pressed={isActive}
            key={f.id}
            onClick={() => onChange(f.id)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border px-4 py-2 cursor-pointer",
              "font-liturgical text-[10px] font-bold uppercase tracking-[0.32em]",
              "transition-[background-color,border-color,color,letter-spacing] duration-500 ease-divine",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 text-muted-foreground hover:border-foreground/60 hover:text-foreground hover:tracking-[0.4em]",
            )}
          >
            <span>{f.label}</span>
            <span
              className={cn(
                "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] tracking-[0.1em]",
                isActive
                  ? "bg-background/15 text-background"
                  : "bg-muted text-foreground/60",
              )}
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
