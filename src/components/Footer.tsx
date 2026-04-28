import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-gradient-navy text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            {t.footer.tagline}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.quick}
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/about", label: t.nav.about },
              { to: "/leadership", label: t.nav.leadership },
              { to: "/visit", label: t.nav.join },
              { to: "/ministries", label: t.nav.ministries },
              { to: "/sermons", label: t.nav.sermons },
              { to: "/live", label: t.nav.live },
              { to: "/events", label: t.nav.events },
              { to: "/donate", label: t.nav.donate },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.visit}
          </h4>
          <ul className="space-y-4 text-sm text-primary-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold text-primary-foreground">Casablanca</span>
                12 Rue Tahar Sebti, Casablanca 20000
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold text-primary-foreground">Rabat</span>
                45 Avenue Mohammed V, Rabat 10000
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" /> +212 5 22 00 00 00
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" /> hello@eschatos.church
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.stay}
          </h4>
          <p className="mb-4 text-sm text-primary-foreground/70">{t.footer.newsletter}</p>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input
              type="email"
              required
              placeholder={t.footer.email}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="hero" size="sm">
              {t.footer.subscribe}
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {year} Eschatos Church. {t.footer.rights}</p>
          <p className="font-display tracking-wide">"Maranatha — The Lord is coming."</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;