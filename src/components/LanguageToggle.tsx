import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = ({ tone = "dark" }: { tone?: "light" | "dark" }) => {
  const { lang, setLang } = useLanguage();
  const base =
    tone === "light"
      ? "border-primary-foreground/30 text-primary-foreground"
      : "border-foreground/15 text-foreground";
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border px-1 py-1 text-xs font-medium", base)}>
      <Globe className="ml-2 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          lang === "en" ? "bg-accent text-accent-foreground" : "hover:text-accent",
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          lang === "fr" ? "bg-accent text-accent-foreground" : "hover:text-accent",
        )}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;