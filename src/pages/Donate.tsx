import { useState } from "react";
import { ShieldCheck, HandHeart, Building2, Globe2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import donateImg from "@/assets/donate-hero.jpg";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LightBeam,
  ScriptureRef,
  SacredEyebrow,
  CrossWatermark,
} from "@/components/sacred";
import {
  Scene3D,
  Flame3D,
  LightParticles,
  SanctuaryLights,
} from "@/components/sacred3d";

const presets = [100, 250, 500, 1000];
const causeIcons = [HandHeart, Building2, Globe2];

const Donate = () => {
  const { t, lang } = useLanguage();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = custom ? Number(custom) : amount;
    if (!finalAmount || finalAmount <= 0) {
      toast({ title: t.donate.pickAmount });
      return;
    }
    toast({
      title: t.donate.thanks,
      description: `${t.donate.thanksDesc} ${finalAmount} MAD (${frequency === "monthly" ? t.donate.monthly : t.donate.once}).`,
    });
  };

  return (
    <>
      <PageHero
        eyebrow={t.donate.eyebrow}
        title={<>{t.donate.title}</>}
        subtitle={t.donate.subtitle}
        image={donateImg}
        enableParticles={false}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-5 lg:items-start">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10"
          >
            {/* Liturgical header — Malachi 3:10 lives within the offering */}
            <div className="mb-10 border-b border-border pb-8">
              <SacredEyebrow className="mb-4">
                {lang === "fr" ? "L'offrande" : "The offering"}
              </SacredEyebrow>
              <p className="font-display text-2xl leading-snug text-foreground md:text-3xl text-balance">
                {lang === "fr"
                  ? "Apportez à la maison du trésor toutes les dîmes."
                  : "Bring the whole tithe into the storehouse."}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.32em] text-accent">
                {lang === "fr" ? "Malachie 3:10" : "Malachi 3:10"}
              </p>
            </div>

            {/* Frequency — editorial radio-as-line */}
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground mb-4">
                {lang === "fr" ? "Je donne" : "I give"}
              </p>
              <div className="flex gap-8">
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="frequency"
                    value="once"
                    checked={frequency === "once"}
                    onChange={() => setFrequency("once")}
                    className="sr-only peer"
                  />
                  <span className="font-display text-2xl text-muted-foreground transition-colors peer-checked:text-foreground hover:text-foreground border-b-2 border-transparent peer-checked:border-accent pb-1">
                    {t.donate.once}
                  </span>
                </label>
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="frequency"
                    value="monthly"
                    checked={frequency === "monthly"}
                    onChange={() => setFrequency("monthly")}
                    className="sr-only peer"
                  />
                  <span className="font-display text-2xl text-muted-foreground transition-colors peer-checked:text-foreground hover:text-foreground border-b-2 border-transparent peer-checked:border-accent pb-1">
                    {t.donate.monthly}
                  </span>
                </label>
              </div>
            </div>

            {/* Amount presets — editorial display serif row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-baseline mb-6">
              {presets.map((p) => {
                const isSelected = amount === p && !custom;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setAmount(p);
                      setCustom("");
                    }}
                    className={cn(
                      "font-display text-3xl md:text-4xl border-b-2 transition-all pb-1 cursor-pointer",
                      isSelected
                        ? "text-foreground border-accent"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-accent/40",
                    )}
                  >
                    {p}
                    <span className="ml-2 text-xs font-sans uppercase tracking-[0.32em] text-muted-foreground">
                      MAD
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom amount — single-line typography input */}
            <div className="mb-10">
              <label
                htmlFor="custom"
                className="mb-3 block text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground"
              >
                {t.donate.custom}
              </label>
              <div className="flex items-baseline">
                <input
                  id="custom"
                  type="number"
                  min={1}
                  max={1000000}
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="500"
                  className="font-display text-3xl md:text-4xl bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none focus:ring-0 px-0 py-1 w-32 placeholder:text-muted-foreground/40"
                />
                <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground ml-3">
                  MAD
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="mt-2 w-full glory"
            >
              {lang === "fr" ? "Apporter mon offrande" : "Bring my offering"}
            </Button>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" /> {t.donate.secureNote}
            </p>
          </form>

          {/* Side */}
          <aside className="lg:col-span-2 space-y-6">
            {t.donate.causes.map((c, i) => {
              const Icon = causeIcons[i] ?? HandHeart;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-anoint"
                >
                  <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              );
            })}

          </aside>
        </div>
      </section>

      {/* Closing benediction — 2 Corinthians 9:7 with 3D flame */}
      <section className="sanctuary cross-watermark relative overflow-hidden reverence min-h-[60svh] flex items-center">
        {/* 3D flame layer — the offering rising */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
          <Scene3D
            className="h-full w-full"
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
          >
            <SanctuaryLights />
            <Flame3D position={[0, -1, 0]} scale={1.5} />
            <LightParticles count={120} spread={6} size={0.025} color="#FFB347" />
          </Scene3D>
        </div>

        <LightBeam intensity="soft" />
        <CrossWatermark opacity={0.04} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 w-full">
          <ScriptureRef
            verse={t.donate.verse}
            reference={t.donate.verseRef}
            size="lg"
            align="center"
            className="text-primary-foreground"
          />
        </div>
      </section>
    </>
  );
};

export default Donate;
