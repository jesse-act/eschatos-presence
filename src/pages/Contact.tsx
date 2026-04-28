import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import aboutImg from "@/assets/about-church.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const Contact = () => {
  const { t } = useLanguage();
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
      toast({ title: t.contact.errorTitle, description: parsed.error.issues[0]?.message });
      return;
    }
    const form = e.currentTarget;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast({ title: t.contact.sent, description: t.contact.sentDesc });
    }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={<>{t.contact.title}</>}
        subtitle={t.contact.subtitle}
        image={aboutImg}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <p className="eyebrow mb-4">{t.contact.formEyebrow}</p>
            <h2 className="mb-8 font-display text-4xl md:text-5xl">{t.contact.formTitle}</h2>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">{t.contact.name}</label>
                <Input id="name" name="name" required maxLength={80} placeholder={t.contact.namePh} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">{t.contact.email}</label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder={t.contact.emailPh} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">{t.contact.message}</label>
                <Textarea id="message" name="message" required maxLength={1000} rows={5} placeholder={t.contact.messagePh} />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? t.contact.sending : t.contact.send}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4">{t.contact.locEyebrow}</p>
              <h2 className="mb-8 font-display text-4xl md:text-5xl">{t.contact.locTitle}</h2>

              <div className="space-y-6">
                {[
                  { city: `Casablanca · ${t.about.casaRole}`, addr: "12 Rue Tahar Sebti, Casablanca 20000", phone: "+212 5 22 00 00 00", q: "Casablanca,+Morocco" },
                  { city: `Rabat · ${t.about.rabatRole}`, addr: "45 Avenue Mohammed V, Rabat 10000", phone: "+212 5 37 00 00 00", q: "Rabat,+Morocco" },
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
              <p className="eyebrow mb-4">{t.contact.followUs}</p>
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

      {/* FAQ */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="eyebrow mb-4">{t.contact.faqEyebrow}</p>
          <h2 className="mb-10 font-display text-4xl md:text-5xl">{t.contact.faqTitle}</h2>
          <Accordion type="single" collapsible className="w-full">
            {t.contact.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-xl hover:text-accent hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Contact;