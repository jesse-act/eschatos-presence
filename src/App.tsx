import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Ministries from "./pages/Ministries.tsx";
import Sermons from "./pages/Sermons.tsx";
import Events from "./pages/Events.tsx";
import Contact from "./pages/Contact.tsx";
import Donate from "./pages/Donate.tsx";
import Visit from "./pages/Visit.tsx";
import Live from "./pages/Live.tsx";
import NotFound from "./pages/NotFound.tsx";

// Code-split the testimonies sub-tree — keeps the data module + components
// out of the main bundle for visitors who never browse to /temoignages.
const Temoignages = lazy(() => import("./pages/Temoignages.tsx"));
const TemoignageDetail = lazy(() => import("./pages/TemoignageDetail.tsx"));
// Same treatment for the event detail sub-tree.
const EventDetail = lazy(() => import("./pages/EventDetail.tsx"));
// Ministry detail sub-tree — lazy as it carries extended bilingual data.
const MinistryDetail = lazy(() => import("./pages/MinistryDetail.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/ministries" element={<Ministries />} />
                <Route path="/ministries/:slug" element={<MinistryDetail />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
                {/* /leadership now lives inside /about — preserve old links */}
                <Route path="/leadership" element={<Navigate to="/about#leadership" replace />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="/live" element={<Live />} />
                <Route path="/temoignages" element={<Temoignages />} />
                <Route path="/temoignages/:slug" element={<TemoignageDetail />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
