import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import aboutImg from "@/assets/about-church.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast({ title: "Please check the form", description: parsed.error.issues[0]?.message });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      e.currentTarget?.reset();
      toast({ title: "Message sent", description: "We'll get back to you within 48 hours." });
    }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title={<>We'd love to meet you.</>}
        subtitle="Plan a visit, ask a question, share a prayer request — our team is here for you."
        image={aboutImg}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <p className="eyebrow mb-4">Send us a message</p>
            <h2 className="mb-8 font-display text-4xl md:text-5xl">Get in touch.</h2>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Full name</label>
                <Input id="name" name="name" required maxLength={80} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
                <Textarea id="message" name="message" required maxLength={1000} rows={5} placeholder="How can we serve you?" />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Our locations</p>
              <h2 className="mb-8 font-display text-4xl md:text-5xl">Visit us.</h2>

              <div className="space-y-6">
                {[
                  { city: "Casablanca · Main Church", addr: "12 Rue Tahar Sebti, Casablanca 20000", phone: "+212 5 22 00 00 00", q: "Casablanca,+Morocco" },
                  { city: "Rabat · Branch", addr: "45 Avenue Mohammed V, Rabat 10000", phone: "+212 5 37 00 00 00", q: "Rabat,+Morocco" },
                ].map((c) => (
                  <div key={c.city} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <h3 className="font-display text-xl">{c.city}</h3>
                    <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 text-accent" /> {c.addr}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-accent" /> {c.phone}
                    </p>
                    <div className="mt-4 overflow-hidden rounded-lg border border-border">
                      <iframe
                        title={`Map of ${c.city}`}
                        src={`https://www.google.com/maps?q=${c.q}&output=embed`}
                        loading="lazy"
                        className="h-48 w-full"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Follow us</p>
              <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" /> hello@eschatos.church
              </p>
              <div className="flex gap-3">
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;