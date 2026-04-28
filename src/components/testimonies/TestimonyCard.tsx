import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  CATEGORY_LABELS,
  getTranslated,
  type Testimony,
} from "@/data/testimonies";
import { CATEGORY_META } from "./categoryMeta";

interface Props {
  testimony: Testimony;
  /** Procession stagger — animation delay in ms (0, 80, 160…). */
  stagger?: number;
}

const TestimonyCard = ({ testimony, stagger = 0 }: Props) => {
  const { lang, t } = useLanguage();
  const tx = getTranslated(testimony, lang);
  const Icon = CATEGORY_META[testimony.category].icon;
  const tone = CATEGORY_META[testimony.category].tone;
  const categoryLabel = CATEGORY_LABELS[lang][testimony.category];

  return (
    <Link
      to={`/temoignages/${testimony.slug}`}
      aria-label={`${t.testimoniesPage.ariaLabel} ${testimony.name}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border/50 bg-card",
        "transition-[transform,box-shadow,border-color] duration-700 ease-[var(--ease-divine)]",
        "hover:-translate-y-1 hover:border-foreground/40 hover:shadow-elegant",
        "animate-procession-rise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      )}
      style={{ animationDelay: `${stagger}ms` }}
    >
      {/* Portrait — duotone wash + slow zoom on hover */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={testimony.image}
          alt=""
          role="presentation"
          loading="lazy"
          width={400}
          height={500}
          className={cn(
            "h-full w-full object-cover object-top",
            "transition-transform duration-[1400ms] ease-[var(--ease-divine)]",
            "group-hover:scale-105",
          )}
        />
        {/* Editorial gradient — mostly transparent, deepens at the foot */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 to-transparent"
          aria-hidden="true"
        />
        {/* Category badge */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-foreground/45 px-3 py-1.5 backdrop-blur-sm">
          <Icon className={cn("h-3.5 w-3.5 text-primary-foreground", tone === "text-accent" && "text-accent")} aria-hidden="true" />
          <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground">
            {categoryLabel}
          </span>
        </div>
        {/* City + year */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-primary-foreground">
          <div>
            <p className="font-display text-2xl leading-tight">{testimony.name}</p>
            <p className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground/85">
              {testimony.city}
            </p>
          </div>
          <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-primary-foreground/70">
            {testimony.year}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <p className="font-editorial italic text-base leading-snug text-foreground/85 line-clamp-4">
          &ldquo;{tx.pullQuote}&rdquo;
        </p>
        <div className="flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground transition-[letter-spacing,color] duration-500 ease-[var(--ease-divine)] group-hover:tracking-[0.4em] group-hover:text-foreground">
            {t.testimoniesPage.readStory}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-foreground/60 transition-[transform,color] duration-500 ease-[var(--ease-divine)] group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
};

export default TestimonyCard;
