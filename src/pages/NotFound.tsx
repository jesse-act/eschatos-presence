import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LightBeam, ScriptureRef, SacredEyebrow, CrossWatermark } from "@/components/sacred";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { lang } = useLanguage();

  const copy = lang === "fr"
    ? {
        eyebrow: "404 · Page égarée",
        title: "Une brebis s'est perdue.",
        body: "La page que vous cherchez n'existe pas — ou plus. Mais le Berger laisse les 99 pour celle qui s'égare. Revenons à la maison.",
        cta: "Retour à l'accueil",
        verse: "Quel est l'homme parmi vous qui, ayant cent brebis et en perdant une, ne laisse les quatre-vingt-dix-neuf et n'aille après celle qui est perdue, jusqu'à ce qu'il la retrouve ?",
        ref: "Luc 15:4",
      }
    : {
        eyebrow: "404 · Page lost",
        title: "A sheep has wandered.",
        body: "The page you're looking for doesn't exist — or no longer does. But the Shepherd leaves the 99 for the one who strays. Let's go home.",
        cta: "Back to home",
        verse: "What man of you, having a hundred sheep, if he loses one of them, does not leave the ninety-nine and go after the one which is lost until he finds it?",
        ref: "Luke 15:4",
      };

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
            reference={copy.ref}
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
