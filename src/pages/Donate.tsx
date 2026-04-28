import { useState } from "react";
import { ShieldCheck, HandHeart, Building2, Globe2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import donateImg from "@/assets/donate-hero.jpg";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

const presets = [100, 250, 500, 1000];
const causeIcons = [HandHeart, Building2, Globe2];

const Donate = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [freq, setFreq] = useState<"once" | "monthly">("monthly");

  const frequencies = [
    { key: "once" as const, label: t.donate.once },
    { key: "monthly" as const, label: t.donate.monthly },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = custom ? Number(custom) : amount;
    if (!finalAmount || finalAmount <= 0) {
      toast({ title: t.donate.pickAmount });
      return;
    }
    toast({
      title: t.donate.thanks,
      description: `${t.donate.thanksDesc} ${finalAmount} MAD (${freq === "monthly" ? t.donate.monthly : t.donate.once}).`,
    });
  };

  return (
    <>
      <PageHero
        eyebrow={t.donate.eyebrow}
        title={<>{t.donate.title}</>}
        subtitle={t.donate.subtitle}
        image={donateImg}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-5 lg:items-start">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10"
          >
            <p className="eyebrow mb-4">{t.donate.secure}</p>
            <h2 className="font-display text-3xl md:text-4xl">{t.donate.chooseGift}</h2>

            {/* Frequency */}
            <div className="mt-8 inline-flex rounded-full border border-border bg-background p-1">
              {frequencies.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFreq(f.key)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all",
                    freq === f.key ? "bg-accent text-accent-foreground shadow-gold" : "text-foreground/70",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Presets */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-4 text-center font-display text-xl transition-all",
                    amount === p && !custom
                      ? "border-accent bg-accent-soft text-foreground shadow-soft"
                      : "border-border bg-background hover:border-accent",
                  )}
                >
                  {p} <span className="text-xs font-sans text-muted-foreground">MAD</span>
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label htmlFor="custom" className="mb-2 block text-sm font-medium">{t.donate.custom}</label>
              <div className="relative">
                <Input
                  id="custom"
                  type="number"
                  min={1}
                  max={1000000}
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="500"
                  className="pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-muted-foreground">MAD</span>
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="mt-8 w-full">
              {t.donate.give} {custom || amount} MAD {freq === "monthly" ? t.donate.perMonth : t.donate.nowSuffix}
            </Button>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> {t.donate.secureNote}
            </p>
          </form>

          {/* Side */}
          <aside className="lg:col-span-2 space-y-6">
            {t.donate.causes.map((c, i) => {
              const Icon = causeIcons[i] ?? HandHeart;
              return (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              );
            })}

            <blockquote className="rounded-2xl bg-gradient-navy p-8 text-primary-foreground shadow-elegant">
              <p className="font-display text-2xl leading-snug">
                {t.donate.verse}
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-accent">{t.donate.verseRef}</footer>
            </blockquote>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Donate;