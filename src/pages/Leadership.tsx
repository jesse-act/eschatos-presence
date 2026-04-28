import { useRef } from "react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/i18n/LanguageContext";
import aboutImg from "@/assets/about-church.jpg";
import {
  LightBeam,
  ScriptureRef,
  SacredEyebrow,
  VeilDivider,
} from "@/components/sacred";
import {
  Scene3D,
  Cross3D,
  LightParticles,
  SanctuaryLights,
  useReducedMotion,
} from "@/components/sacred3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PASTOR_PHOTOS: string[] = [
  "/pasteurs/Jane Loue Casa/Jane Loue Casa.png",
  "/pasteurs/Pasteur Rudy Rabat/PHOTO.png",
];

const Leadership = () => {
  const { t, lang } = useLanguage();
  const pastors = t.leadership.pastors;
  const cities = lang === "fr" ? ["Casablanca", "Rabat"] : ["Casablanca", "Rabat"];

  const diptychRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

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
    { dependencies: [reducedMotion] }
  );

  return (
    <>
      <PageHero
        eyebrow={t.leadership.eyebrow}
        title={<>{t.leadership.title}</>}
        subtitle={t.leadership.subtitle}
        image={aboutImg}
        enableParticles={false}
      />

      {/* L'appel pastoral — Scripture section with 3D cross */}
      <section className="sanctuary cross-watermark relative overflow-hidden reverence min-h-[60svh]">
        {/* 3D divine layer */}
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
          <div className="mb-8 flex justify-center">
            <SacredEyebrow variant="light">
              {lang === "fr" ? "L'appel pastoral" : "The pastoral calling"}
            </SacredEyebrow>
          </div>
          <ScriptureRef
            verse={lang === "fr" ? "Comme le Père m'a envoyé, moi aussi je vous envoie." : "As the Father has sent me, even so I am sending you."}
            reference={lang === "fr" ? "Jean 20:21" : "John 20:21"}
            size="lg"
            align="center"
            className="text-primary-foreground"
          />
        </div>
      </section>

      {/* Diptych — two portraits as one image divided */}
      <section className="bg-background">
        <div ref={diptychRef} className="relative grid grid-cols-1 md:grid-cols-2 isolate">
          {/* Vertical gutter with city labels */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden md:flex w-px -translate-x-1/2 items-center justify-center z-10">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
          </div>

          {pastors.map((p, i) => (
            <article key={p.name} className="relative group">
              {/* Portrait — full bleed, no card chrome */}
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-primary relative">
                <img
                  src={PASTOR_PHOTOS[i]}
                  alt={p.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                {/* Subtle bottom gradient for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/90 to-transparent" />

                {/* City name set vertically inside the gutter edge of each panel */}
                <div className={`absolute top-8 ${i === 0 ? 'right-8' : 'left-8'} text-primary-foreground/80`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em]">
                    {cities[i]}
                  </p>
                </div>

                {/* Pastor name overlaid on bottom of portrait — editorial */}
                <div className="absolute inset-x-0 bottom-0 px-8 pb-10 md:px-12 md:pb-14">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent mb-3">
                    {p.role}
                  </p>
                  <h2 className="font-display text-3xl leading-[1.05] text-balance text-primary-foreground md:text-4xl lg:text-5xl">
                    {p.name}
                  </h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bios — editorial column rule, Vogue / Gentlewoman feel */}
      <section className="bg-background reverence">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <VeilDivider className="mb-16 md:mb-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-24">
            {pastors.map((p, i) => (
              <div
                key={p.name}
                className={`relative ${i === 0 ? 'md:pr-8 md:border-r md:border-border' : 'md:pl-8 mt-12 md:mt-0'}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent mb-4">
                  {cities[i]}
                </p>
                <h3 className="font-display text-2xl leading-tight text-foreground mb-6 md:text-3xl">
                  {p.name}
                </h3>
                <p className="text-base leading-[1.75] text-muted-foreground first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-accent first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                  {p.bio}
                </p>
              </div>
            ))}
          </div>

          <VeilDivider className="mt-20 md:mt-24" />
        </div>
      </section>
    </>
  );
};

export default Leadership;
