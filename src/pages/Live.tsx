import { useEffect, useRef, useState } from "react";
import { Bell, Clock, ExternalLink, Globe, Volume2, VolumeX } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import { CrossWatermark, SacredEyebrow, ScriptureRef } from "@/components/sacred";
import { RevealOnView } from "@/components/animation";
import liveImg from "@/assets/live-stream.jpg";
import { CHANNEL_ID } from "@/data/videos";

// TODO[2026-05-13]: swap back to live_stream once the church streams regularly.
// Replace FEATURED_EMBED_URL with:
//   `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1&mute=1`
// and remove the loop=1/playlist=/start= params.
const FEATURED_VIDEO_ID = "olaEo1UxG4M";
const FEATURED_START = 59;

// Broadcast-friendly embed: autoplay+muted (browser-allowed), looped to
// emulate a continuous live stream, JS API enabled so the unmute button
// can postMessage the iframe instead of rebuilding it.
const FEATURED_EMBED_URL = `https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${FEATURED_VIDEO_ID}&modestbranding=1&rel=0&start=${FEATURED_START}&enablejsapi=1&playsinline=1`;

/**
 * Casablanca-anchored wall clock — independent of the visitor's timezone so
 * the broadcast frame always reads "Casa time" the way a TV ticker would.
 * Refreshes once per 30s (minute precision is enough).
 */
const useCasablancaClock = (): string => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Africa/Casablanca",
            hour12: false,
          }),
        );
      } catch {
        setTime("");
      }
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

const Live = () => {
  const { t, lang } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const time = useCasablancaClock();

  // Bridge to the YouTube IFrame Player API (no SDK loaded — postMessage works
  // because the iframe URL has `enablejsapi=1`).
  const toggleMute = () => {
    const target = iframeRef.current?.contentWindow;
    if (!target) return;
    target.postMessage(
      JSON.stringify({
        event: "command",
        func: muted ? "unMute" : "mute",
        args: "",
      }),
      "https://www.youtube.com",
    );
    setMuted((prev) => !prev);
  };

  // Visual broadcast timeline — current segment is decorative (no real
  // schedule integration yet). 1 = "Adoration / Worship".
  const segments =
    lang === "fr"
      ? ["Prélude", "Adoration", "Parole", "Communion", "Bénédiction"]
      : ["Prelude", "Worship", "Word", "Communion", "Benediction"];
  const currentSegmentIndex = 1;

  const cities = ["Casablanca", "Rabat", "Paris", "Tunis", "New York"];

  return (
    <>
      <PageHero
        eyebrow={t.live.eyebrow}
        title={<>{t.live.title}</>}
        subtitle={t.live.subtitle}
        image={liveImg}
      />

      {/* SANCTUARY BROADCAST — broadcast-style player + side metadata */}
      <section className="relative overflow-hidden bg-foreground py-14 text-primary-foreground md:py-20">
        <CrossWatermark className="opacity-[0.04]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* PLAYER FRAME — 8/12 */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-elegant">
                <iframe
                  ref={iframeRef}
                  title="Eschatos Church — featured broadcast"
                  src={FEATURED_EMBED_URL}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  allowFullScreen
                  className="h-full w-full"
                />

                {/* Broadcast bug — top-left LIVE badge with pulsing dot */}
                <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/65 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-heartbeat rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                    {t.live.liveBadge}
                  </span>
                </div>

                {/* Broadcast clock — top-right Casablanca time */}
                <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 backdrop-blur-md">
                  <Clock className="h-3 w-3 text-accent" aria-hidden="true" />
                  <span className="font-liturgical text-[11px] font-medium tabular-nums tracking-[0.18em] text-white">
                    {time || "--:--"}
                  </span>
                  <span className="font-liturgical text-[9px] uppercase tracking-[0.32em] text-white/55">
                    Casa
                  </span>
                </div>

                {/* Mute toggle — bottom center, controlled via YouTube postMessage */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={!muted}
                  aria-label={
                    muted
                      ? lang === "fr"
                        ? "Activer le son"
                        : "Unmute the broadcast"
                      : lang === "fr"
                      ? "Couper le son"
                      : "Mute the broadcast"
                  }
                  className="group absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-black shadow-elegant backdrop-blur-md transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-white"
                >
                  {muted ? (
                    <>
                      <VolumeX className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{lang === "fr" ? "Activer le son" : "Tap to unmute"}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-accent" />
                      <span>{lang === "fr" ? "Son actif — couper" : "Sound on — mute"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Connected cities ticker */}
              <RevealOnView
                variant="rise"
                delay={300}
                className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/75"
              >
                <Globe className="h-3 w-3 text-accent" aria-hidden="true" />
                <span>{lang === "fr" ? "Connectés depuis" : "Connected from"}</span>
                <span className="text-accent">·</span>
                {cities.map((city, i) => (
                  <span key={city} className="inline-flex items-center gap-3">
                    <span>{city}</span>
                    {i < cities.length - 1 && (
                      <span aria-hidden="true" className="text-accent/55">×</span>
                    )}
                  </span>
                ))}
              </RevealOnView>
            </div>

            {/* SIDE PANEL — 4/12 */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              {/* NOW / NEXT */}
              <RevealOnView
                variant="rise"
                delay={150}
                className="liquid-glass rounded-2xl border border-white/10 p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 animate-breath-soft rounded-full bg-accent" aria-hidden="true" />
                  <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                    {lang === "fr" ? "En cours" : "Now"}
                  </span>
                </div>
                <p className="font-display text-2xl leading-snug">
                  {segments[currentSegmentIndex]}
                </p>
                <p className="mt-1 font-editorial text-xs italic text-white/55">
                  {t.church.sundayService}
                </p>

                <div className="my-6 h-px w-full bg-white/15" aria-hidden="true" />

                <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/55">
                  {lang === "fr" ? "Ensuite" : "Next"}
                </span>
                <p className="mt-2 font-editorial italic text-base text-white/85">
                  {segments[currentSegmentIndex + 1]}
                </p>
              </RevealOnView>

              {/* Tonight's text — scripture inset */}
              <RevealOnView
                variant="rise"
                delay={250}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/55">
                  {lang === "fr" ? "Texte de ce soir" : "Tonight's text"}
                </span>
                <p className="mt-3 font-editorial italic text-base leading-relaxed text-white/90">
                  {t.scripture.verse}
                </p>
                <p className="mt-3 font-liturgical text-[9px] font-bold uppercase tracking-[0.4em] text-accent">
                  {t.scripture.ref}
                </p>
              </RevealOnView>

              {/* Subscribe — primary CTA */}
              <RevealOnView variant="rise" delay={350}>
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                >
                  <span className="inline-flex items-center gap-2">
                    <Bell className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    {t.live.notifyCta}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-black/60" aria-hidden="true" />
                </a>
              </RevealOnView>
            </div>
          </div>

          {/* Order of service — broadcast timeline */}
          <RevealOnView
            variant="rise"
            delay={450}
            className="mt-12 border-t border-white/10 pt-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-white/65">
                {lang === "fr" ? "Ordre du culte" : "Order of service"}
              </span>
              <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.4em] text-accent tabular-nums">
                {currentSegmentIndex + 1} / {segments.length}
              </span>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-2.5 h-px bg-white/15"
              />
              <ol className="relative grid grid-cols-5 gap-2">
                {segments.map((seg, i) => {
                  const isPast = i < currentSegmentIndex;
                  const isCurrent = i === currentSegmentIndex;
                  return (
                    <li key={seg} className="flex flex-col items-center text-center">
                      <span
                        aria-hidden="true"
                        className={`relative h-5 w-5 rounded-full border-2 ${
                          isPast
                            ? "border-accent bg-accent"
                            : isCurrent
                            ? "animate-breath-soft border-accent bg-foreground ring-2 ring-accent/30"
                            : "border-white/30 bg-foreground"
                        }`}
                      />
                      <span
                        className={`mt-3 font-liturgical text-[9px] font-bold uppercase tracking-[0.32em] md:text-[10px] ${
                          isCurrent
                            ? "text-accent"
                            : isPast
                            ? "text-white/70"
                            : "text-white/45"
                        }`}
                      >
                        {seg}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Scripture moment — adoration en esprit et en vérité */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <RevealOnView
            variant="eyebrow-spread"
            as="div"
            className="mb-8 flex justify-center"
          >
            <SacredEyebrow>
              {lang === "fr" ? "Adorez en esprit" : "Worship in spirit"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" delay={120}>
            <ScriptureRef
              verse={
                lang === "fr"
                  ? "L'heure vient, et elle est déjà venue, où les vrais adorateurs adoreront le Père en esprit et en vérité."
                  : "The hour is coming, and now is, when the true worshippers shall worship the Father in spirit and in truth."
              }
              reference={lang === "fr" ? "Jean 4:23" : "John 4:23"}
              size="lg"
              align="center"
            />
          </RevealOnView>
        </div>
      </section>
    </>
  );
};

export default Live;
