import { Bell, ExternalLink, Radio } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LightBeam,
  ScriptureRef,
  SacredEyebrow,
  FlamePulse,
  CrossWatermark,
} from "@/components/sacred";
import { Scene3D, HeartbeatSphere, SanctuaryLights } from "@/components/sacred3d";
import { RevealOnView } from "@/components/animation";
import liveImg from "@/assets/live-stream.jpg";

const CHANNEL_ID = "UCuAXFkgsw1L7xaCfnd5JJOw"; // placeholder channel

const Live = () => {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t.live.eyebrow}
        title={<>{t.live.title}</>}
        subtitle={t.live.subtitle}
        image={liveImg}
      />

      {/* Dark player stage — sanctuary in motion */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24 cross-watermark">
        <CrossWatermark opacity={0.05} />
        <LightBeam intensity="medium" />

        {/* 3D heartbeat — top-right of player section */}
        <div aria-hidden="true" className="absolute top-7 right-7 h-28 w-28 z-[5] pointer-events-none hidden md:block">
          <Scene3D
            className="h-full w-full"
            camera={{ position: [0, 0, 3], fov: 50 }}
            dpr={[1, 1.5]}
          >
            <SanctuaryLights />
            <HeartbeatSphere position={[0, 0, 0]} color="#E10600" baseScale={1.0} />
          </Scene3D>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">

          {/* LIVE badge — heartbeat of the body of Christ */}
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-heartbeat rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {t.live.liveBadge}
            </span>
            <FlamePulse size={14} />
          </RevealOnView>

          {/* Video embed */}
          <div className="overflow-hidden rounded-2xl shadow-elegant">
            <div className="aspect-video w-full bg-black">
              <iframe
                title="Eschatos Church Live"
                src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scripture — adoration en esprit et en vérité */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex justify-center">
            <SacredEyebrow>Adorez en esprit</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" delay={120}>
            <ScriptureRef
              verse="L'heure vient, et elle est déjà venue, où les vrais adorateurs adoreront le Père en esprit et en vérité."
              reference="Jean 4:23"
              size="lg"
              align="center"
            />
          </RevealOnView>
        </div>
      </section>

      {/* Info cards — light section */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Next service card */}
            <RevealOnView variant="ink-rise" delay={200} as="div" className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{t.live.nextService}</h3>
              <p className="mt-2 text-accent font-medium animate-breath-soft">{t.live.nextServiceBody}</p>
              <p className="mt-4 text-sm italic text-muted-foreground">{t.live.offline}</p>
            </RevealOnView>

            {/* Scripture + YouTube CTA card */}
            <RevealOnView variant="rise" delay={280} as="div" className="flex flex-col justify-between rounded-2xl bg-gradient-navy p-8 text-primary-foreground shadow-elegant">
              <p className="font-display text-2xl leading-snug">
                {t.scripture.verse}
              </p>
              <Button asChild variant="hero" size="lg" className="mt-6 self-start glory">
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.live.watchYoutube} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </RevealOnView>
          </div>

          {/* Subscribe / notify CTA */}
          <RevealOnView variant="rise" delay={280} as="div" className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-soft md:flex-row md:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent animate-breath-soft">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl">{t.live.notifyTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.live.notifyBody}</p>
            </div>
            <Button asChild variant="hero" size="lg" className="shrink-0 glory">
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
                target="_blank"
                rel="noreferrer"
              >
                {t.live.notifyCta} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </RevealOnView>
        </div>
      </section>
    </>
  );
};

export default Live;
