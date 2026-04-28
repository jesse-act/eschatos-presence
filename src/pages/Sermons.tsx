import { useEffect, useState } from "react";
import { PlayCircle, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import sermonsCover from "@/assets/sermons-cover.jpg";
import {
  LightBeam,
  ScriptureRef,
  SacredEyebrow,
  CrossWatermark,
} from "@/components/sacred";
import { RevealOnView } from "@/components/animation";
import {
  VIDEOS,
  channelUrl,
  embedUrl,
  formatPublishedDate,
  type Video,
} from "@/data/videos";

const Sermons = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<Video | null>(null);

  // Lock body scroll while the modal is open + close on Escape.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

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
            <RevealOnView variant="eyebrow-spread">
              <SacredEyebrow variant="light">La Parole vivante</SacredEyebrow>
            </RevealOnView>
          </div>
          <RevealOnView variant="ink-rise" delay={120}>
            <ScriptureRef
              verse="Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."
              reference="2 Timothée 3:16"
              size="lg"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {VIDEOS.length === 0 ? (
            <RevealOnView variant="rise" className="py-20 text-center">
              <p className="font-editorial italic text-lg text-muted-foreground">
                {lang === "fr"
                  ? "Les vidéos seront bientôt disponibles."
                  : "Videos will be available soon."}
              </p>
              <a
                href={channelUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-foreground transition-[letter-spacing,border-color] duration-500 hover:tracking-[0.5em] hover:border-accent hover:text-accent"
              >
                {lang === "fr" ? "Visiter notre chaîne YouTube" : "Visit our YouTube channel"}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </RevealOnView>
          ) : (
            <>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <SacredEyebrow>
                    {lang === "fr" ? "Dernières prédications" : "Latest sermons"}
                  </SacredEyebrow>
                  <p className="mt-3 font-editorial italic text-base text-muted-foreground">
                    {lang === "fr"
                      ? `${VIDEOS.length} vidéos · directement depuis notre chaîne YouTube`
                      : `${VIDEOS.length} videos · straight from our YouTube channel`}
                  </p>
                </div>
                <a
                  href={channelUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-foreground transition-[letter-spacing,border-color] duration-500 hover:tracking-[0.5em] hover:border-accent hover:text-accent"
                >
                  {lang === "fr" ? "Voir toute la chaîne" : "View full channel"}
                  <ExternalLink
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {VIDEOS.map((v, i) => (
                  <RevealOnView key={v.id} variant="rise" delay={i * 80}>
                    <button
                      type="button"
                      onClick={() => setActive(v)}
                      className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      aria-label={`${lang === "fr" ? "Lire la vidéo" : "Play video"}: ${v.title}`}
                    >
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-transparent shadow-soft transition-all duration-500 group-hover:border-accent group-hover:shadow-elegant group-hover:shadow-anoint">
                        <img
                          src={v.thumbnail}
                          alt=""
                          loading="lazy"
                          width={480}
                          height={360}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent transition-opacity duration-500 group-hover:from-primary/60" />
                        <PlayCircle
                          className="absolute inset-0 m-auto h-14 w-14 text-accent drop-shadow-sm transition-transform duration-500 group-hover:scale-110 animate-breath-soft"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-5">
                        <SacredEyebrow>
                          {formatPublishedDate(v.publishedAt, lang)}
                        </SacredEyebrow>
                        <h3 className="mt-2 font-display text-2xl leading-snug line-clamp-2">
                          {v.title}
                        </h3>
                        {v.author && (
                          <p className="mt-1 font-editorial italic text-sm text-muted-foreground">
                            {v.author}
                          </p>
                        )}
                      </div>
                    </button>
                  </RevealOnView>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Video modal */}
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
                src={embedUrl(active.id, true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight line-clamp-2">
                  {active.title}
                </h3>
                <p className="mt-1 font-editorial italic text-sm text-muted-foreground">
                  {active.author}
                  {active.author ? " · " : ""}
                  {formatPublishedDate(active.publishedAt, lang)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sermons;
