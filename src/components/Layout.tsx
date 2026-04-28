import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Honor in-page anchors (e.g. /about#leadership) before falling back to top.
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    // "auto" is the cross-browser equivalent of "instant"; "instant" is rejected by Safari < 15.4.
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <div className="sacred-grain relative flex min-h-screen flex-col bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[60vh] bg-gradient-glory opacity-40"
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      {/* tabIndex=-1 lets the skip link move keyboard focus into the main region. */}
      <main id="main" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
