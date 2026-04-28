import { ArrowRight, Music2, Mic2, Film, Clapperboard, Users, Headphones, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import { LightBeam, ScriptureRef, SacredEyebrow, FlamePulse, CrossWatermark } from "@/components/sacred";

type MinistryItem = {
  slug: string;
  icon: React.ElementType;
  image: string;
  en: { name: string; tag: string; body: string };
  fr: { name: string; tag: string; body: string };
};

const MINISTRIES: MinistryItem[] = [
  {
    slug: "worship-stars",
    icon: Star,
    image: "/Worship Stars/Worship Stars.jpeg",
    en: {
      name: "Worship Stars",
      tag: "Worship & Creative",
      body: "Vocalists, musicians, and creatives who craft an atmosphere where heaven meets earth — week after week. Auditions open quarterly. Come with a heart to serve and a gift to offer.",
    },
    fr: {
      name: "Worship Stars",
      tag: "Louange & Créatif",
      body: "Chanteurs, musiciens et créatifs qui façonnent une atmosphère où le ciel rencontre la terre — semaine après semaine. Auditions ouvertes chaque trimestre.",
    },
  },
  {
    slug: "chorale-gospel",
    icon: Mic2,
    image: "/Chorale Gospel Ensemble Pour Toujours/Chorale Gospel Ensemble Pour Toujours.jpeg",
    en: {
      name: "Chorale Gospel — Ensemble Pour Toujours",
      tag: "Gospel Choir",
      body: "A powerful gospel choir lifting voices in unity, joy, and the deep tradition of worship. Together forever — singing of grace, hope, and the faithfulness of God.",
    },
    fr: {
      name: "Chorale Gospel — Ensemble Pour Toujours",
      tag: "Chœur Gospel",
      body: "Un puissant chœur gospel qui élève les voix dans l'unité, la joie et la tradition profonde de l'adoration. Ensemble pour toujours — chantant la grâce, l'espérance et la fidélité de Dieu.",
    },
  },
  {
    slug: "dancing-stars",
    icon: Star,
    image: "/Dancing Stars/Dancing Stars.jpeg",
    en: {
      name: "Dancing Stars",
      tag: "Dance & Movement",
      body: "A dance ministry that brings Scripture to life through movement. From contemporary to liturgical, these dancers proclaim the Gospel with every step on stage.",
    },
    fr: {
      name: "Dancing Stars",
      tag: "Danse & Mouvement",
      body: "Un ministère de danse qui donne vie aux Écritures par le mouvement. Du contemporain au liturgique, ces danseurs proclament l'Évangile à chaque pas sur scène.",
    },
  },
  {
    slug: "filmstar",
    icon: Clapperboard,
    image: "/Filmstar/Filmstar.jpeg",
    en: {
      name: "Filmstar",
      tag: "Film & Media",
      body: "Storytellers behind the lens — capturing testimonies, producing content that reaches Morocco and beyond. Every frame is a chance to share the love of Christ.",
    },
    fr: {
      name: "Filmstar",
      tag: "Cinéma & Médias",
      body: "Des conteurs derrière l'objectif — capturant des témoignages, produisant du contenu qui atteint le Maroc et au-delà. Chaque image est une occasion de partager l'amour du Christ.",
    },
  },
  {
    slug: "media",
    icon: Film,
    image: "/PHOTO.png",
    en: {
      name: "Media",
      tag: "Communication & Outreach",
      body: "The team that tells the Eschatos story online — social media, photography, livestream production, and digital outreach. Reaching Morocco one post at a time.",
    },
    fr: {
      name: "Media",
      tag: "Communication & Diffusion",
      body: "L'équipe qui raconte l'histoire d'Eschatos en ligne — réseaux sociaux, photographie, production de diffusion en direct et rayonnement numérique. Atteindre le Maroc, un post à la fois.",
    },
  },
  {
    slug: "les-musiciens",
    icon: Music2,
    image: "/Les Musiciens/Les Musiciens.jpg",
    en: {
      name: "Les Musiciens",
      tag: "Instrumental & Band",
      body: "The musicians who hold the rhythm of worship together — guitarists, drummers, keyboardists, and more. Skilled hands dedicated to a holy craft, Sunday after Sunday.",
    },
    fr: {
      name: "Les Musiciens",
      tag: "Instrumental & Groupe",
      body: "Les musiciens qui tiennent le rythme de l'adoration ensemble — guitaristes, batteurs, claviéristes et plus encore. Des mains habiles dédiées à un art sacré, dimanche après dimanche.",
    },
  },
  {
    slug: "airport-stars",
    icon: Headphones,
    image: "/Airportstar/Airportstar.jpg",
    en: {
      name: "Airport Stars",
      tag: "Technical & Sound",
      body: "The behind-the-scenes team that makes every Sunday sound and look excellent. Audio, lighting, and technical excellence — serving invisibly so the Word is heard clearly.",
    },
    fr: {
      name: "Airport Stars",
      tag: "Technique & Son",
      body: "L'équipe en coulisses qui fait sonner et paraître chaque dimanche de façon excellente. Audio, éclairage et excellence technique — servant dans l'ombre pour que la Parole soit entendue clairement.",
    },
  },
  {
    slug: "ushers",
    icon: Users,
    image: "/Ushers/Ushers.jpg",
    en: {
      name: "Ushers",
      tag: "Welcome & Hospitality",
      body: "The first face you see and the warmest welcome you'll receive. Our ushers create a culture of belonging from the moment you walk through the door — every Sunday.",
    },
    fr: {
      name: "Ushers",
      tag: "Accueil & Hospitalité",
      body: "Le premier visage que vous voyez et l'accueil le plus chaleureux que vous recevrez. Nos ushers créent une culture d'appartenance dès l'instant où vous franchissez la porte — chaque dimanche.",
    },
  },
];

const Ministries = () => {
  const { t, lang } = useLanguage();

  const featured = MINISTRIES[0];
  const rest = MINISTRIES.slice(1);

  return (
    <>
      <PageHero
        eyebrow={t.ministries.eyebrow}
        title={<>{t.ministries.title}</>}
        subtitle={t.ministries.subtitle}
        image="/Chorale Gospel Ensemble Pour Toujours/Chorale Gospel Ensemble Pour Toujours.jpeg"
      />

      {/* Featured ministry spotlight — dark editorial section */}
      <section className="bg-gradient-navy text-primary-foreground py-24 md:py-32 cross-watermark relative overflow-hidden">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-glory">
              <img
                src={featured.image}
                alt={featured[lang].name}
                loading="eager"
                width={1280}
                height={896}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Red accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
            </div>
            <div>
              <SacredEyebrow variant="light">
                <featured.icon className="h-3.5 w-3.5" />
                {featured[lang].tag}
              </SacredEyebrow>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                {featured[lang].name}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                {featured[lang].body}
              </p>
              <Button variant="hero" size="lg" className="glory mt-8" asChild>
                <Link to="/contact">
                  {lang === "fr" ? "Rejoindre ce ministère" : "Join this ministry"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pentecost flame section */}
      <section className="sanctuary cross-watermark relative overflow-hidden reverence">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
          <div className="mb-8 flex justify-center">
            <FlamePulse size={32} />
          </div>
          <div className="mb-6 flex justify-center">
            <SacredEyebrow variant="light">Pentecôte</SacredEyebrow>
          </div>
          <ScriptureRef
            verse="Des langues de feu se posèrent sur chacun d'eux. Et ils furent tous remplis du Saint-Esprit."
            reference="Actes 2:3-4"
            size="lg"
            align="center"
            className="text-primary-foreground"
          />
        </div>
      </section>

      {/* Remaining ministries — alternating layout on light background */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl space-y-24 px-6 md:px-10">
          {rest.map((m, i) => (
            <article
              key={m.slug}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
              }`}
            >
              {/* Image */}
              <div className="group relative overflow-hidden rounded-2xl border border-border shadow-soft transition-all duration-300 hover:border-accent hover:shadow-anoint">
                <img
                  src={m.image}
                  alt={m[lang].name}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Red accent bar on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Content */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent animate-breath-soft">
                  <m.icon className="h-3.5 w-3.5" />
                  {m[lang].tag}
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl lg:text-5xl animate-ascend">
                  {m[lang].name}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                  {m[lang].body}
                </p>
                <Button variant="hero" size="default" className="glory mt-8" asChild>
                  <Link to="/contact">
                    {lang === "fr" ? "Rejoindre ce ministère" : "Join this ministry"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-primary py-20 text-primary-foreground cross-watermark relative overflow-hidden">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="flex justify-center mb-4">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Votre place vous attend" : "Your place is waiting"}
            </SacredEyebrow>
          </div>
          <h2 className="font-display text-4xl md:text-5xl">
            {lang === "fr"
              ? "Chaque don compte. Chaque voix compte."
              : "Every gift counts. Every voice matters."}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            {lang === "fr"
              ? "Pas besoin d'être parfait — juste disponible. Rejoignez une équipe et découvrez pourquoi servir change tout."
              : "You don't need to be perfect — just available. Join a team and discover why serving changes everything."}
          </p>
          <Button variant="hero" size="xl" className="glory mt-8" asChild>
            <Link to="/contact">
              {lang === "fr" ? "Contactez-nous" : "Get in touch"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Ministries;
