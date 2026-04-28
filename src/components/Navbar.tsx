import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { BreathingDot } from "@/components/sacred";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Hand-cut SVG cross dingbat — replaces every Unicode glyph
 * (✠, ☩, †) which are forbidden by the strict no-emoji policy.
 */
const CrossDingbat = ({ className, size = 10 }: { className?: string; size?: number }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={cn("inline-block fill-current shrink-0", className)}
  >
    <rect x="7.2" y="1" width="1.6" height="14" />
    <rect x="3" y="5.2" width="10" height="1.6" />
  </svg>
);

const Navbar = () => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Sanctuary recall — header glides up on scroll-down, returns on scroll-up
  const [hidden, setHidden] = useState(false);
  // Route-change benediction — triggers a single shimmer pass across the rule
  const [benedictionKey, setBenedictionKey] = useState(0);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - lastY.current;
        // Only retreat after we've cleared tier 1 + a small buffer; never hide while menu is open
        if (!open && y > 200 && delta > 6) {
          setHidden(true);
        } else if (delta < -4 || y < 80) {
          setHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    // Trigger benediction shimmer across manuscript rule on every route change
    setBenedictionKey((k) => k + 1);
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/ministries", label: t.nav.ministries },
    { to: "/sermons", label: t.nav.sermons },
    { to: "/temoignages", label: t.nav.testimonies },
    { to: "/events", label: t.nav.events },
    { to: "/live", label: t.nav.live },
    { to: "/contact", label: t.nav.contact },
  ];

  // Stanzas — paired clusters with a hairline between (liturgical cadence, not flexbox grid)
  const leftA = links.slice(0, 2);
  const leftB = links.slice(2, 4);
  const rightA = links.slice(4, 6);
  const rightB = links.slice(6, 8);

  const utilityServiceTime =
    lang === "fr" ? "Dimanche · 15h00" : "Sunday · 15:00";
  const utilityImpact =
    lang === "fr"
      ? "Mercredi · 18h00 — Culte Impacte"
      : "Wednesday · 18:00 — Culte Impacte";

  // Lapidary link styling — tracking-out hover, hairline rule from center
  const linkBase = cn(
    "relative font-liturgical text-[11px] font-bold uppercase",
    "tracking-[0.24em] text-foreground/70",
    "transition-[letter-spacing,color] duration-500 ease-[var(--ease-divine)]",
    "hover:tracking-[0.32em] hover:text-foreground",
    "after:pointer-events-none after:absolute after:left-1/2 after:-bottom-2",
    "after:h-px after:w-0 after:bg-foreground",
    "after:-translate-x-1/2 after:transition-[width,height] after:duration-700",
    "after:ease-[var(--ease-divine)]",
    "hover:after:w-[calc(100%+0.75rem)]",
  );
  const linkActive =
    "text-foreground after:h-[1.5px] after:w-[calc(100%+0.75rem)]";

  // Procession stagger — global index across both processions for a coherent left→right cascade
  const indexOf = (l: { to: string }) => links.findIndex((x) => x.to === l.to);

  const renderLink = (l: { to: string; label: string }) => {
    const i = indexOf(l);
    return (
      <NavLink key={l.to} to={l.to} end={l.to === "/"}>
        {({ isActive }) => (
          <span
            className={cn(
              linkBase,
              "animate-procession-rise",
              isActive && linkActive,
            )}
            style={{ animationDelay: `${120 + i * 70}ms` }}
          >
            {isActive && <BreathingDot className="mr-2" />}
            {l.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-[transform,background-color,backdrop-filter,box-shadow] duration-700 ease-[var(--ease-divine)]",
        // Sanctuary recall — translate up out of view on scroll-down past tier 1
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-background/85 backdrop-blur-sm",
      )}
    >
      {/* TIER 1 — utility (retreats on scroll) */}
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-[max-height,opacity,border-color] duration-700 ease-[var(--ease-divine)]",
          scrolled
            ? "max-h-0 opacity-0 border-b-0"
            : "max-h-14 opacity-100 border-b border-border/40",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 md:px-10">
          <div className="flex items-center gap-4 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
            <span className="animate-fade-in" style={{ animationDelay: "60ms" }}>
              {utilityServiceTime}
            </span>
            <CrossDingbat className="text-border" size={9} />
            <span className="animate-fade-in" style={{ animationDelay: "180ms" }}>
              {utilityImpact}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              to="/live"
              className="group font-liturgical inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground transition-[letter-spacing,color] duration-500 ease-[var(--ease-divine)] hover:tracking-[0.4em] hover:text-accent"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inset-0 animate-heartbeat rounded-full bg-accent opacity-70" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {lang === "fr" ? "Direct" : "Live"}
            </Link>
            <CrossDingbat className="text-border" size={9} />
            <LanguageToggle tone="dark" />
            <CrossDingbat className="text-border" size={9} />

            {/* Oblation register — Cardo small caps + Cormorant italic */}
            <Link
              to="/donate"
              className="group inline-flex items-baseline gap-2 cursor-pointer transition-[letter-spacing] duration-500 ease-[var(--ease-divine)]"
            >
              <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-accent transition-[letter-spacing] duration-500 ease-[var(--ease-divine)] group-hover:tracking-[0.6em]">
                {lang === "fr" ? "Offrande" : "Offering"}
              </span>
              <span className="font-editorial italic text-[13px] leading-none text-foreground/75 transition-[transform,color] duration-500 ease-[var(--ease-divine)] group-hover:translate-x-0.5 group-hover:text-foreground">
                — {lang === "fr" ? "donner" : "give"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* TIER 2 — symmetric procession with stanzas + enthroned logo */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10 md:py-4">
        {/* Left procession (stanzas A · | · B) */}
        <nav
          aria-label="Primary left"
          className="hidden lg:flex flex-1 items-center justify-end"
        >
          <div className="flex items-center gap-7">{leftA.map(renderLink)}</div>
          <span
            aria-hidden="true"
            className="mx-6 h-2 w-px bg-foreground/20 animate-fade-in"
            style={{ animationDelay: "260ms" }}
          />
          <div className="flex items-center gap-7">{leftB.map(renderLink)}</div>
        </nav>

        {/* Mobile logo (left aligned) */}
        <div className="lg:hidden animate-breath-soft">
          <Logo tone="dark" />
        </div>

        {/* ENTHRONED LOGO (desktop) — vertical pinstripe + flanking dingbats + Anno Domini */}
        <Link
          to="/"
          aria-label="ESCHATOS — accueil"
          className="group relative hidden lg:flex flex-col items-center px-10 xl:px-14 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          {/* Vertical pinstripe rule — manuscript central column (deepens on hover) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-1/2 h-[calc(100%+1.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/15 to-transparent transition-opacity duration-700 ease-[var(--ease-divine)] group-hover:via-foreground/35"
          />
          {/* Flanking dingbats — bow inward (anti-symmetric rotation) on hover */}
          <CrossDingbat
            className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-foreground/25 transition-[transform,color] duration-700 ease-[var(--ease-divine)] group-hover:text-accent/70 group-hover:[transform:translateY(-50%)_rotate(-8deg)]"
            size={11}
          />
          <CrossDingbat
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-foreground/25 transition-[transform,color] duration-700 ease-[var(--ease-divine)] group-hover:text-accent/70 group-hover:[transform:translateY(-50%)_rotate(8deg)]"
            size={11}
          />
          <div className="animate-breath-soft relative transition-transform duration-700 ease-[var(--ease-divine)] group-hover:scale-[1.03]">
            <Logo tone="dark" />
          </div>
          <span className="mt-1 font-liturgical text-[8px] font-bold uppercase tracking-[0.5em] text-muted-foreground/80 transition-[letter-spacing,color] duration-700 ease-[var(--ease-divine)] group-hover:tracking-[0.6em] group-hover:text-foreground/80">
            Anno Domini
          </span>
        </Link>

        {/* Right procession (stanzas A · | · B) */}
        <nav
          aria-label="Primary right"
          className="hidden lg:flex flex-1 items-center justify-start"
        >
          <div className="flex items-center gap-7">{rightA.map(renderLink)}</div>
          <span
            aria-hidden="true"
            className="mx-6 h-2 w-px bg-foreground/20 animate-fade-in"
            style={{ animationDelay: "540ms" }}
          />
          <div className="flex items-center gap-7">{rightB.map(renderLink)}</div>
        </nav>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-3 lg:hidden">
          <Button
            asChild
            variant="hero"
            size="sm"
            className="glory hidden sm:inline-flex"
          >
            <Link to="/donate">{t.nav.donate}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="group inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground transition-[border-color,color,transform] duration-500 ease-[var(--ease-divine)] hover:border-accent hover:text-accent active:scale-95"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <Menu
                className={cn(
                  "absolute h-5 w-5 transition-[opacity,transform] duration-500 ease-[var(--ease-divine)]",
                  open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100",
                )}
              />
              <X
                className={cn(
                  "absolute h-5 w-5 transition-[opacity,transform] duration-500 ease-[var(--ease-divine)]",
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Manuscript hairline — tapered SVG rule under tier 2 + altar pulse + benediction shimmer */}
      <div className="hidden lg:block pointer-events-none relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1280 4"
          preserveAspectRatio="none"
          className="block h-1 w-full"
        >
          <defs>
            <linearGradient id="manuscript-rule" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
              <stop offset="20%" stopColor="hsl(var(--foreground))" stopOpacity="0.12" />
              <stop offset="48%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
              <stop offset="52%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
              <stop offset="80%" stopColor="hsl(var(--foreground))" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 2 L 580 2 L 600 0.5 L 680 0.5 L 700 2 L 1280 2"
            stroke="url(#manuscript-rule)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
        {/* Altar pulse — central red dot beats (life on the manuscript) */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-1 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60 animate-altar-pulse"
        />
        {/* Benediction shimmer — re-keyed on route change so the animation re-fires */}
        <span
          key={benedictionKey}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 animate-benediction-pass bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
      </div>

      {/* MOBILE SHEET — sanctuary feel with cross watermark + service time */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-md transition-[max-height,opacity,clip-path] duration-700 ease-[var(--ease-divine)]",
          open
            ? "max-h-[92vh] opacity-100 [clip-path:inset(0_0_0_0)]"
            : "max-h-0 opacity-0 [clip-path:inset(0_50%_0_50%)]",
        )}
      >
        <div className="relative flex flex-col px-6 py-6">
          <p
            className={cn(
              "mb-5 flex items-center justify-center gap-3 font-liturgical text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground",
              open && "animate-fade-in",
            )}
          >
            <span>{utilityServiceTime}</span>
            <CrossDingbat className="text-border" size={9} />
            <span>{utilityImpact}</span>
          </p>

          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  style={open ? { animationDelay: `${120 + i * 60}ms` } : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center justify-between border-b border-border/50 py-4 transition-colors",
                      open && "animate-litany",
                      isActive
                        ? "text-accent"
                        : "text-foreground hover:text-accent",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-display text-2xl tracking-[0.01em] transition-[transform,letter-spacing] duration-500 ease-[var(--ease-divine)] group-hover:translate-x-2 group-hover:tracking-[0.04em]">
                        {l.label}
                      </span>
                      {isActive ? (
                        <BreathingDot variant="accent" />
                      ) : (
                        <CrossDingbat
                          size={10}
                          className="text-foreground/20 transition-[transform,color] duration-500 ease-[var(--ease-divine)] group-hover:text-accent group-hover:translate-x-1"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-6 flex items-center justify-between border-t border-border pt-6",
              open && "animate-fade-in",
            )}
            style={open ? { animationDelay: `${120 + links.length * 60 + 80}ms` } : undefined}
          >
            <LanguageToggle tone="dark" />
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="group inline-flex items-baseline gap-2 cursor-pointer"
            >
              <span className="font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-accent transition-[letter-spacing] duration-500 ease-[var(--ease-divine)] group-hover:tracking-[0.6em]">
                {lang === "fr" ? "Offrande" : "Offering"}
              </span>
              <span className="font-editorial italic text-[15px] leading-none text-foreground transition-colors duration-500 group-hover:text-accent">
                — {lang === "fr" ? "donner" : "give"}
              </span>
            </Link>
          </div>

          <p
            className={cn(
              "mt-5 text-center font-liturgical text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/70",
              open && "animate-fade-in",
            )}
            style={open ? { animationDelay: `${120 + links.length * 60 + 160}ms` } : undefined}
          >
            Anno Domini
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
