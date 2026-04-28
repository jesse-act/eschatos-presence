import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type Translation = typeof translations["en"];
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Translation;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    // localStorage can throw in Safari private mode and on browsers with strict
    // partitioned storage. A throw inside a useState initializer crashes the
    // entire React tree before first render, so swallow it and fall back.
    try {
      const stored = window.localStorage.getItem("eschatos-lang");
      return stored === "fr" ? "fr" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("eschatos-lang", lang);
    } catch {
      // Storage unavailable — language switch still works in-session, just not persisted.
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((p) => (p === "en" ? "fr" : "en")), []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggleLang, t: translations[lang] as Translation }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};