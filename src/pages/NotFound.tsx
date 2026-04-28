import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LightBeam, ScriptureRef, SacredEyebrow, CrossWatermark } from "@/components/sacred";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  const copy = t.notFound;

  return (
    <section className="sanctuary cross-watermark relative isolate overflow-hidden flex min-h-[calc(100svh-5rem)] items-center justify-center pt-32 pb-20 sacred-grain">
      <CrossWatermark opacity={0.04} />
      <LightBeam intensity="medium" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-10 text-center text-primary-foreground">
        <div className="mb-8 flex justify-center">
          <SacredEyebrow variant="light">{copy.eyebrow}</SacredEyebrow>
        </div>

        <h1 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl animate-ascend">
          {copy.title}
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          {copy.body}
        </p>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="hero" size="xl" className="glory">
            <Link to="/">
              <Home className="h-5 w-5" />
              {copy.cta}
            </Link>
          </Button>
        </div>

        <div className="mt-20 border-t border-primary-foreground/15 pt-12">
          <ScriptureRef
            verse={copy.verse}
            reference={copy.reference}
            size="md"
            align="center"
            className="text-primary-foreground/90 mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
