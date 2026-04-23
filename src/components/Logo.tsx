import { Link } from "react-router-dom";

type Props = { className?: string; tone?: "light" | "dark" };

const Logo = ({ className = "", tone = "dark" }: Props) => {
  const text = tone === "light" ? "text-primary-foreground" : "text-foreground";
  const accent = "text-accent";
  return (
    <Link to="/" aria-label="Eschatos Church home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-gradient-gold shadow-gold transition-transform duration-500 group-hover:rotate-12">
        <span className="font-display text-lg font-semibold text-accent-foreground">E</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-wide ${text}`}>
          ESCHATOS
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-[0.32em] ${accent}`}>Church</span>
      </span>
    </Link>
  );
};

export default Logo;