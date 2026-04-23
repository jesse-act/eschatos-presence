import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, PlayCircle, Users, HandHeart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/hero-worship.jpg";
import aboutImg from "@/assets/about-church.jpg";
import youthImg from "@/assets/ministry-youth.jpg";
import worshipImg from "@/assets/ministry-worship.jpg";
import outreachImg from "@/assets/ministry-outreach.jpg";

const upcoming = [
  {
    date: "27 Apr",
    title: "Sunday Celebration",
    place: "Casablanca · 10:30",
    img: worshipImg,
  },
  {
    date: "03 May",
    title: "Night of Prayer",
    place: "Rabat · 19:00",
    img: outreachImg,
  },
  {
    date: "10 May",
    title: "Youth Gathering",
    place: "Casablanca · 18:00",
    img: youthImg,
  },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden text-primary-foreground">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Worshippers raising hands during a service at Eschatos Church"
            className="h-full w-full object-cover animate-slow-zoom"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <p className="eyebrow mb-6 animate-fade-in">{t.hero.eyebrow}</p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.02] text-balance md:text-7xl lg:text-8xl animate-fade-in [animation-delay:120ms]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg animate-fade-in [animation-delay:240ms]">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in [animation-delay:360ms]">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                {t.hero.cta1} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/sermons">
                <PlayCircle className="h-4 w-4" /> {t.hero.cta2}
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-primary-foreground/15 pt-8 md:max-w-2xl md:grid-cols-3 animate-fade-in [animation-delay:500ms]">
            {[
              { k: "2", v: "cities" },
              { k: "12+", v: "ministries" },
              { k: "1k+", v: "family members" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-accent md:text-4xl">{s.k}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Sunlight streaming through the church sanctuary"
              loading="lazy"
              width={1600}
              height={1120}
              className="rounded-2xl shadow-elegant"
            />
            <div className="absolute -bottom-8 -right-8 hidden h-40 w-40 rotate-6 rounded-2xl bg-gradient-gold shadow-gold md:block" />
          </div>
          <div>
            <p className="eyebrow mb-5">{t.intro.eyebrow}</p>
            <h2 className="font-display text-4xl leading-tight text-balance md:text-5xl">
              {t.intro.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.intro.body}
            </p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/about">
                {t.intro.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Calendar</p>
              <h2 className="font-display text-4xl md:text-5xl">{t.upcoming}</h2>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View all events</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <article
                key={e.title}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display text-sm leading-none shadow-soft">
                    <div className="text-lg font-semibold text-foreground">{e.date.split(" ")[0]}</div>
                    <div className="text-[10px] uppercase tracking-widest text-accent">{e.date.split(" ")[1]}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> {e.place}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3 md:px-10">
          {[
            { Icon: PlayCircle, to: "/sermons", ...t.quickLinks.sermons },
            { Icon: Users, to: "/ministries", ...t.quickLinks.ministries },
            { Icon: MapPin, to: "/contact", ...t.quickLinks.contact },
          ].map(({ Icon, to, title, body }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
            >
              <div className="mb-6 inline-grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                Discover <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SCRIPTURE */}
      <section className="relative bg-gradient-navy py-24 text-primary-foreground md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <BookOpen className="mx-auto h-8 w-8 text-accent" />
          <blockquote className="mt-8 font-display text-3xl leading-snug text-balance md:text-5xl">
            "For where two or three gather in my name, there am I with them."
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-accent">Matthew 18:20</p>
        </div>
      </section>

      {/* GIVE CTA */}
      <section className="bg-background py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <HandHeart className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-6 font-display text-4xl text-balance md:text-5xl">
            Partner with what God is doing in Morocco
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Every gift fuels worship, outreach, and the next generation of leaders across Casablanca and Rabat.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/donate">{t.nav.donate} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
