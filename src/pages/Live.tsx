import { ExternalLink, Radio } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
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

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="overflow-hidden rounded-2xl shadow-elegant">
            <div className="aspect-video w-full bg-primary">
              <iframe
                title="Eschatos Church Live"
                src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{t.live.nextService}</h3>
              <p className="mt-2 text-muted-foreground">{t.live.nextServiceBody}</p>
              <p className="mt-4 text-sm italic text-muted-foreground">{t.live.offline}</p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-gradient-navy p-8 text-primary-foreground shadow-elegant">
              <p className="font-display text-2xl leading-snug">
                {t.scripture.verse}
              </p>
              <Button asChild variant="hero" size="lg" className="mt-6 self-start">
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.live.watchYoutube} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Live;
