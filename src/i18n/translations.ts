export type Lang = "en" | "fr";

type Dict = {
  nav: { home: string; about: string; ministries: string; sermons: string; events: string; contact: string; donate: string; join: string };
  hero: { eyebrow: string; title: string; subtitle: string; cta1: string; cta2: string };
  intro: { eyebrow: string; title: string; body: string; cta: string };
  upcoming: string;
  quickLinks: { sermons: { title: string; body: string }; ministries: { title: string; body: string }; contact: { title: string; body: string } };
  footer: { tagline: string; quick: string; visit: string; stay: string; newsletter: string; subscribe: string; email: string; rights: string };
};

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      ministries: "Ministries",
      sermons: "Sermons",
      events: "Events",
      contact: "Contact",
      donate: "Give",
      join: "Plan a Visit",
    },
    hero: {
      eyebrow: "Eschatos Church · Casablanca & Rabat",
      title: "A place to belong, a people to become.",
      subtitle:
        "We are a Christ-centered family in the heart of Morocco, gathering every week to worship Jesus, grow in faith, and serve our cities.",
      cta1: "Join us this Sunday",
      cta2: "Watch latest sermon",
    },
    intro: {
      eyebrow: "Welcome home",
      title: "Wherever you are on the journey, there is a seat for you.",
      body:
        "Eschatos Church exists so that every person in Morocco might encounter the love of Jesus, find a family, and live a life of purpose. From students to seniors, locals to expats — you belong here.",
      cta: "Discover our story",
    },
    upcoming: "Upcoming gatherings",
    quickLinks: {
      sermons: { title: "Latest Sermons", body: "Catch up on this week's message and dive into the Word." },
      ministries: { title: "Ministries", body: "Find your people — youth, worship, prayer, outreach." },
      contact: { title: "Visit Us", body: "We'd love to meet you in Casablanca or Rabat." },
    },
    footer: {
      tagline: "A place to belong, a people to become.",
      quick: "Explore",
      visit: "Visit",
      stay: "Stay connected",
      newsletter: "Get weekly encouragement and event news in your inbox.",
      subscribe: "Subscribe",
      email: "Email address",
      rights: "All rights reserved.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      ministries: "Ministères",
      sermons: "Prédications",
      events: "Événements",
      contact: "Contact",
      donate: "Donner",
      join: "Planifier une visite",
    },
    hero: {
      eyebrow: "Église Eschatos · Casablanca & Rabat",
      title: "Un lieu où appartenir, un peuple à devenir.",
      subtitle:
        "Nous sommes une famille centrée sur le Christ, au cœur du Maroc, qui se rassemble chaque semaine pour adorer Jésus, grandir dans la foi et servir nos villes.",
      cta1: "Rejoignez-nous dimanche",
      cta2: "Voir la dernière prédication",
    },
    intro: {
      eyebrow: "Bienvenue chez vous",
      title: "Où que vous en soyez, il y a une place pour vous.",
      body:
        "L'Église Eschatos existe pour que chaque personne au Maroc rencontre l'amour de Jésus, trouve une famille et vive une vie pleine de sens. Des étudiants aux aînés, des locaux aux expatriés — vous avez votre place ici.",
      cta: "Découvrir notre histoire",
    },
    upcoming: "Prochains rassemblements",
    quickLinks: {
      sermons: { title: "Dernières prédications", body: "Retrouvez le message de cette semaine et plongez dans la Parole." },
      ministries: { title: "Ministères", body: "Trouvez votre famille — jeunes, louange, prière, mission." },
      contact: { title: "Visitez-nous", body: "Nous serions heureux de vous rencontrer à Casablanca ou Rabat." },
    },
    footer: {
      tagline: "Un lieu où appartenir, un peuple à devenir.",
      quick: "Explorer",
      visit: "Visiter",
      stay: "Restons connectés",
      newsletter: "Recevez chaque semaine des encouragements et l'actualité des événements.",
      subscribe: "S'abonner",
      email: "Adresse e-mail",
      rights: "Tous droits réservés.",
    },
  },
};

export type TranslationKey = keyof Dict;