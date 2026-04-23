import { useState } from "react";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import youthImg from "@/assets/ministry-youth.jpg";
import worshipImg from "@/assets/ministry-worship.jpg";
import outreachImg from "@/assets/ministry-outreach.jpg";
import prayerImg from "@/assets/ministry-prayer.jpg";
import aboutImg from "@/assets/about-church.jpg";

type Evt = {
  id: string;
  date: { d: string; m: string; full: string };
  title: string;
  city: "Casablanca" | "Rabat";
  time: string;
  img: string;
  description: string;
};

const events: Evt[] = [
  { id: "e1", date: { d: "27", m: "Apr", full: "Sunday, April 27, 2026" }, title: "Sunday Celebration", city: "Casablanca", time: "10:30 – 12:00", img: worshipImg, description: "Our weekly gathering of worship, the Word, and warm welcome. Coffee from 10:00." },
  { id: "e2", date: { d: "03", m: "May", full: "Saturday, May 3, 2026" }, title: "Night of Prayer", city: "Rabat", time: "19:00 – 22:00", img: prayerImg, description: "An evening dedicated to seeking God for our city, our nation, and the nations." },
  { id: "e3", date: { d: "10", m: "May", full: "Saturday, May 10, 2026" }, title: "Youth Gathering", city: "Casablanca", time: "18:00 – 21:00", img: youthImg, description: "Students 13–25 — worship, teaching, food and friendships." },
  { id: "e4", date: { d: "17", m: "May", full: "Saturday, May 17, 2026" }, title: "Outreach Day", city: "Casablanca", time: "09:00 – 14:00", img: outreachImg, description: "Serving our neighbors with food packages and prayer in the medina." },
  { id: "e5", date: { d: "24", m: "May", full: "Saturday, May 24, 2026" }, title: "Baptism Sunday", city: "Casablanca", time: "10:30 – 13:00", img: aboutImg, description: "A celebration of new life. Sign up to be baptized at the welcome desk." },
  { id: "e6", date: { d: "07", m: "Jun", full: "Saturday, June 7, 2026" }, title: "Worship Night", city: "Rabat", time: "20:00 – 22:30", img: worshipImg, description: "An evening of pure worship with our Rabat band." },
];

const Events = () => {
  const [active, setActive] = useState<Evt | null>(null);

  return (
    <>
      <PageHero
        eyebrow="What's coming"
        title={<>Gather. Grow. Go.</>}
        subtitle="From Sunday celebrations to nights of prayer, here's everything happening across Casablanca and Rabat."
        image={youthImg}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setActive(e)}
                className="group overflow-hidden rounded-2xl bg-card text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-center font-display leading-none shadow-soft">
                    <div className="text-xl font-semibold">{e.date.d}</div>
                    <div className="text-[10px] uppercase tracking-widest text-accent">{e.date.m}</div>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground backdrop-blur">
                    {e.city}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent" /> {e.time}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-accent" /> {e.city}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-primary/85 p-0 sm:items-center sm:p-6 animate-fade-in-slow"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-t-2xl bg-background shadow-elegant sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[16/8] overflow-hidden">
              <img src={active.img} alt={active.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-8">
              <p className="eyebrow mb-3">{active.city}</p>
              <h3 className="font-display text-3xl">{active.title}</h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {active.date.full}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {active.time}</span>
              </div>
              <p className="mt-6 leading-relaxed text-muted-foreground">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;