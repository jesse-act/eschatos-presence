import { useRef } from "react";
import { Heart, Compass, Flame, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LightBeam,
  BreathingDot,
  ScriptureRef,
  SacredEyebrow,
  CrossWatermark,
  VeilDivider,
} from "@/components/sacred";
import {
  Scene3D,
  Cross3D,
  LightParticles,
  SanctuaryLights,
  useReducedMotion,
} from "@/components/sacred3d";
import { RevealOnView, SplitText } from "@/components/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import aboutImg from "@/assets/about-church.jpg";
import casaImg from "@/assets/location-casablanca.jpg";
import rabatImg from "@/assets/location-rabat.jpg";

const valueIcons = [Heart, Users, Compass, Flame];

const PASTOR_PHOTOS: string[] = [
  "/pasteurs/Jane Loue Casa/Jane Loue Casa.png",
  "/pasteurs/Pasteur Rudy Rabat/PHOTO.png",
];

const About = () => {
  const { t, lang } = useLanguage();
  const values = t.about.values.map((v, i) => ({ ...v, Icon: valueIcons[i] ?? Heart }));
  const timeline = t.about.timeline;
  const pastors = t.leadership.pastors;
  const cities = ["Casablanca", "Rabat"];

  const diptychRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Subtle parallax on the pastor diptych — both portraits drift opposite the cursor
  useGSAP(
    () => {
      if (reducedMotion) return;
      const el = diptychRef.current;
      if (!el) return;
      const images = el.querySelectorAll("img");

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        images.forEach((img) => {
          gsap.to(img, {
            x: x * -8,
            y: y * -8,
            duration: 1,
            ease: "power3.out",
          });
        });
      };

      el.addEventListener("mousemove", handleMove);
      return () => el.removeEventListener("mousemove", handleMove);
    },
    { dependencies: [reducedMotion] },
  );

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={<>{t.about.title1}<br className="hidden md:block" /> {t.about.title2}</>}
        subtitle={t.about.subtitle}
        image={aboutImg}
      />

      {/* Mission / Vision / Values */}
      <section className="bg-background py-16 md:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3 md:gap-8 md:px-10 lg:gap-16">
          <div>
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-4">
              <SacredEyebrow>{t.about.mission.eyebrow}</SacredEyebrow>
            </RevealOnView>
            <RevealOnView variant="title-bloom" as="h2" delay={120} className="font-display text-3xl leading-tight">
              {t.about.mission.body}
            </RevealOnView>
          </div>
          <div>
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-4" delay={120}>
              <SacredEyebrow>{t.about.vision.eyebrow}</SacredEyebrow>
            </RevealOnView>
            <RevealOnView variant="title-bloom" as="h2" delay={240} className="font-display text-3xl leading-tight">
              {t.about.vision.body}
            </RevealOnView>
          </div>
          <div>
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-4" delay={240}>
              <SacredEyebrow>{t.about.heart.eyebrow}</SacredEyebrow>
            </RevealOnView>
            <RevealOnView variant="title-bloom" as="h2" delay={360} className="font-display text-3xl leading-tight">
              {t.about.heart.body}
            </RevealOnView>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-4">
          {values.map(({ Icon, title, body }, i) => (
            <RevealOnView
              key={title}
              variant="rise"
              delay={i * 90}
              className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-elegant hover:shadow-anoint"
            >
              <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 animate-breath-soft group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </RevealOnView>
          ))}
        </div>
      </section>

      {/* LEADERSHIP — pastoral couple, integrated into About */}
      <section id="leadership" className="bg-secondary/40 reverence">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-6 flex justify-center">
              <SacredEyebrow>{t.leadership.eyebrow}</SacredEyebrow>
            </RevealOnView>
            <RevealOnView variant="title-bloom" as="h2" delay={120} className="font-display text-4xl leading-[1.05] md:text-6xl">
              {t.leadership.title}
            </RevealOnView>
            <RevealOnView variant="rise" as="p" delay={260} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.leadership.subtitle}
            </RevealOnView>
          </div>
        </div>

        {/* L'appel pastoral — Scripture with 3D cross */}
        <div className="sanctuary cross-watermark relative overflow-hidden mt-20 min-h-[50svh] py-24 md:py-32">
          <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
            <Scene3D
              className="h-full w-full"
              camera={{ position: [0, 0, 7], fov: 45 }}
              dpr={[1, 1.5]}
            >
              <SanctuaryLights />
              <Cross3D
                position={[0, 0.5, 0]}
                scale={1.4}
                rotationSpeed={0.15}
                color="#fafafa"
                metalness={0.65}
                roughness={0.3}
                emissive="#E10600"
                emissiveIntensity={0.4}
              />
              <LightParticles count={200} spread={9} size={0.045} />
            </Scene3D>
          </div>
          <LightBeam intensity="soft" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
            <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex justify-center">
              <SacredEyebrow variant="light">
                {lang === "fr" ? "L'appel pastoral" : "The pastoral calling"}
              </SacredEyebrow>
            </RevealOnView>
            <RevealOnView variant="ink-rise" as="div" delay={200}>
              <ScriptureRef
                verse={lang === "fr" ? "Comme le Père m'a envoyé, moi aussi je vous envoie." : "As the Father has sent me, even so I am sending you."}
                reference={lang === "fr" ? "Jean 20:21" : "John 20:21"}
                size="lg"
                align="center"
                className="text-primary-foreground"
              />
            </RevealOnView>
          </div>
        </div>

        {/* Diptych — contained editorial portraits, no full-bleed */}
        <div className="mx-auto mt-20 max-w-6xl px-6 md:px-10">
          <div ref={diptychRef} className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 isolate">
            {/* Vertical hairline between the two portraits — only on md+ */}
            <div
              className="pointer-events-none absolute inset-y-6 left-1/2 hidden md:block w-px -translate-x-1/2"
              aria-hidden="true"
            >
              <div className="h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
            </div>

            {pastors.map((p, i) => (
              <RevealOnView
                key={p.name}
                variant="ink-rise"
                delay={i * 200}
                as="article"
                className="relative group overflow-hidden rounded-2xl shadow-elegant"
              >
                {/* Tighter aspect — 3:4 portrait keeps faces present without giant images */}
                <div className="aspect-[3/4] overflow-hidden bg-primary relative">
                  <img
                    src={PASTOR_PHOTOS[i]}
                    alt={p.name}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute top-6 left-6 text-primary-foreground/80">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em]">
                      {cities[i]}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-7 md:px-8 md:pb-9">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent mb-2">
                      {p.role}
                    </p>
                    <h3 className="font-display text-2xl leading-[1.05] text-balance text-primary-foreground md:text-3xl">
                      <SplitText mode="word" stagger={70} delay={i * 200}>
                        {p.name}
                      </SplitText>
                    </h3>
                  </div>
                </div>
              </RevealOnView>
            ))}
          </div>
        </div>

        {/* Bios — editorial column with drop cap */}
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
          <VeilDivider className="mb-16 md:mb-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-24">
            {pastors.map((p, i) => (
              <RevealOnView
                key={p.name}
                variant="rise"
                delay={i * 180}
                className={`relative ${i === 0 ? "md:pr-8 md:border-r md:border-border" : "md:pl-8 mt-12 md:mt-0"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent mb-4">
                  {cities[i]}
                </p>
                <h4 className="font-display text-2xl leading-tight text-foreground mb-6 md:text-3xl">
                  {p.name}
                </h4>
                <p className="text-base leading-[1.75] text-muted-foreground first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-accent first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1 first-letter:animate-dropcap-breath">
                  {p.bio}
                </p>
              </RevealOnView>
            ))}
          </div>

          <VeilDivider className="mt-20 md:mt-24" />
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-4">
            <SacredEyebrow>{t.about.journey.eyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" as="h2" delay={120} className="mb-16 font-display text-4xl md:text-5xl">
            {t.about.journey.title}
          </RevealOnView>
          <ol className="relative border-l border-accent/40">
            {timeline.map((it, i) => (
              <RevealOnView
                key={it.year}
                variant="rise"
                delay={i * 140}
                as="li"
                className="mb-12 ml-8 last:mb-0"
              >
                <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-accent bg-background animate-breath-soft" />
                <div className="font-display text-2xl text-accent">{it.year}</div>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{it.text}</p>
              </RevealOnView>
            ))}
          </ol>
        </div>
      </section>

      {/* Verse — Notre fondation */}
      <section className="sanctuary cross-watermark relative overflow-hidden reverence">
        <CrossWatermark opacity={0.04} />
        <LightBeam intensity="soft" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-8 flex justify-center">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "Notre fondation" : "Our foundation"}
            </SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="ink-rise" as="div" delay={200}>
            <ScriptureRef
              verse={
                lang === "fr"
                  ? "Car nul ne peut poser un autre fondement que celui qui a été posé, savoir Jésus-Christ."
                  : "For no one can lay any foundation other than the one already laid, which is Jesus Christ."
              }
              reference={lang === "fr" ? "1 Corinthiens 3:11" : "1 Corinthians 3:11"}
              size="xl"
              align="center"
              className="text-primary-foreground"
            />
          </RevealOnView>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <RevealOnView variant="eyebrow-spread" as="div" className="mb-4">
            <SacredEyebrow>{t.about.locations.eyebrow}</SacredEyebrow>
          </RevealOnView>
          <RevealOnView variant="title-bloom" as="h2" delay={120} className="mb-16 font-display text-4xl md:text-5xl">
            {t.about.locations.title}
          </RevealOnView>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              { img: casaImg, name: "Casablanca", role: t.about.casaRole, line1: "12 Rue Tahar Sebti, Casablanca", line2: t.about.casaSchedule },
              { img: rabatImg, name: "Rabat", role: t.about.rabatRole, line1: "45 Avenue Mohammed V, Rabat", line2: t.about.rabatSchedule },
            ].map((c, i) => (
              <RevealOnView
                key={c.name}
                variant="rise"
                delay={i * 180}
                as="article"
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:shadow-elegant hover:shadow-anoint"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={`${c.name} skyline`} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <p className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-accent">
                    <BreathingDot className="mr-1.5" />
                    {c.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">{c.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.line1}</p>
                  <p className="text-sm text-muted-foreground">{c.line2}</p>
                </div>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
