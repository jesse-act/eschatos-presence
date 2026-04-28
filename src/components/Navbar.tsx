import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { BreathingDot } from "@/components/sacred";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/leadership", label: t.nav.leadership },
    { to: "/ministries", label: t.nav.ministries },
    { to: "/sermons", label: t.nav.sermons },
    { to: "/live", label: t.nav.live },
    { to: "/events", label: t.nav.events },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-background/85 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        <div className="animate-breath-soft">
          <Logo tone="dark" />
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {({ isActive }) => (
                <span
                  className={cn(
                    "inline-flex items-center text-sm font-medium tracking-wide transition-colors",
                    isActive ? "text-accent" : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {isActive && <BreathingDot className="mr-2" />}
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle tone="dark" />
          <Button asChild variant="hero" size="sm" className="glory">
            <Link to="/donate">{t.nav.donate}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground lg:hidden"
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {scrolled && (
        <div aria-hidden="true" className="veil-divider absolute inset-x-0 bottom-0" />
      )}

      {/* Mobile sheet */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-md transition-[max-height,opacity] duration-500",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={open ? { animationDelay: `${i * 60}ms` } : undefined}
            >
              {({ isActive }) => (
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-3 font-display text-2xl tracking-tight transition-colors",
                    open && "animate-ascend",
                    isActive ? "text-accent" : "text-foreground hover:text-accent",
                  )}
                >
                  {isActive && <BreathingDot className="mr-2" />}
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <LanguageToggle tone="dark" />
            <Button asChild variant="hero" size="sm" className="glory">
              <Link to="/donate">{t.nav.donate}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
