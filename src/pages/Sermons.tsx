import { useState } from "react";
import { PlayCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import sermonsCover from "@/assets/sermons-cover.jpg";
import { cn } from "@/lib/utils";
import {
  LightBeam,
  ScriptureRef,
  SacredEyebrow,
  CrossWatermark,
  BreathingDot,
} from "@/components/sacred";

type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  category: "latest" | "popular";
  youtubeId: string;
};

const sermons: Sermon[] = [
  { id: "1", title: "The God Who Sees You", speaker: "Ps. Daniel Amrani", date: "Apr 21, 2026", category: "latest", youtubeId: "dQw4w9WgXcQ" },
  { id: "2", title: "Anchored in Hope", speaker: "Ps. Sarah Bensaid", date: "Apr 14, 2026", category: "latest", youtubeId: "jNQXAC9IVRw" },
  { id: "3", title: "When Faith Feels Heavy", speaker: "Ps. Daniel Amrani", date: "Apr 07, 2026", category: "latest", youtubeId: "9bZkp7q19f0" },
  { id: "4", title: "Belong Before You Believe", speaker: "Ps. Karim Tazi", date: "Mar 31, 2026", category: "popular", youtubeId: "tVj0ZTS4WF4" },
  { id: "5", title: "The Wild Generosity of God", speaker: "Ps. Sarah Bensaid", date: "Mar 24, 2026", category: "popular", youtubeId: "kJQP7kiw5Fk" },
  { id: "6", title: "Maranatha — He is Coming", speaker: "Ps. Daniel Amrani", date: "Mar 17, 2026", category: "popular", youtubeId: "OPf0YbXqDm0" },
];

const Sermons = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"latest" | "popular" | "all">("latest");
  const [active, setActive] = useState<Sermon | null>(null);

  const filtered = sermons.filter((s) => filter === "all" || s.category === filter);

  const tabs: { key: "latest" | "popular" | "all"; label: string }[] = [
    { key: "latest", label: t.sermons.tabs.latest },
    { key: "popular", label: t.sermons.tabs.popular },
    { key: "all", label: t.sermons.tabs.all },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.sermons.eyebrow}
        title={<>{t.sermons.title}</>}
        subtitle={t.sermons.subtitle}
        image={sermonsCover}
      />

      <section className="sanctuary cross-watermark relative overflow-hidden reverence">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
          <div className="mb-8 flex justify-center">
            <SacredEyebrow variant="light">La Parole vivante</SacredEyebrow>
          </div>
          <ScriptureRef
            verse="Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."
            reference="2 Timothée 3:16"
            size="lg"
            align="center"
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* Tabs */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                  filter === tab.key
                    ? "border-accent bg-accent text-accent-foreground shadow-elegant shadow-anoint"
                    : "border-border bg-card text-foreground/70 hover:border-accent hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s)}
                className="group text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-transparent shadow-soft transition-all duration-500 group-hover:border-accent group-hover:shadow-elegant group-hover:shadow-anoint">
                  <img
                    src={`https://i.ytimg.com/vi/${s.youtubeId}/hqdefault.jpg`}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent transition-opacity duration-500 group-hover:from-primary/60" />
                  <PlayCircle className="absolute inset-0 m-auto h-14 w-14 text-accent drop-shadow-sm transition-transform duration-500 group-hover:scale-110 animate-breath-soft" />
                </div>
                <div className="mt-5">
                  <SacredEyebrow>{s.date}</SacredEyebrow>
                  <h3 className="mt-2 font-display text-2xl leading-snug">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.speaker}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="cross-watermark fixed inset-0 z-[70] flex items-center justify-center bg-primary/85 p-4 animate-fade-in-slow"
          onClick={() => setActive(null)}
        >
          <CrossWatermark opacity={0.05} />
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-background shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full">
              <iframe
                title={active.title}
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-display text-2xl">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.speaker} · {active.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sermons;
