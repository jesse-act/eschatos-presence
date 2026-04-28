/**
 * Events — typed bilingual data for the Eschatos Church gathering calendar.
 * Each entry maps to a detail sub-page at /events/:slug.
 */

export type EventCity = "Casablanca" | "Rabat";

export type EventCategory =
  | "celebration"
  | "prayer"
  | "youth"
  | "outreach"
  | "baptism"
  | "worship";

export interface EventTranslated {
  title: string;
  /** One-line tagline shown in hero. */
  tagline: string;
  /** Full date string (e.g. "Sunday, April 27, 2026"). */
  fullDate: string;
  /** Short summary (≤180 chars) for index card. */
  summary: string;
  /** Long description — array of paragraphs for the detail page body. */
  longDescription: string[];
  /** What to expect — bullet list of what attendees will experience. */
  whatToExpect: string[];
  /** Who it is for — short audience description. */
  audience: string;
  /** Address line shown on detail page. */
  address: string;
  /** Scripture connecting the event to the Word. */
  scripture: { verse: string; reference: string };
  /** CTA button text on the detail page. */
  registerCta: string;
}

export type EventMediaType = "image" | "video";

export type EventPosterOrientation = "portrait" | "landscape" | "square";

export interface Event {
  slug: string;
  /** Day number (e.g. "27"). */
  day: string;
  /** Short month abbreviation (e.g. "Apr" / "Avr"). */
  monthEn: string;
  monthFr: string;
  /** ISO date for sorting + machine readability. */
  isoDate: string;
  city: EventCity;
  /** Time range (24h format, locale-neutral). */
  time: string;
  category: EventCategory;
  /** Card thumbnail used on the index grid. */
  image: string;
  /**
   * Detail-page MAIN poster. Can be a flyer/affiche or a still frame for
   * the teaser video. Displayed UNCROPPED via object-contain on the detail
   * page so the whole image is visible regardless of orientation.
   * Falls back to `image` if not provided.
   */
  poster?: string;
  /** Native orientation of the poster — drives the aspect ratio of the panel. */
  posterOrientation?: EventPosterOrientation;
  /** Optional teaser video — embedded player on the detail page. */
  mediaType?: EventMediaType;
  /** YouTube/Vimeo embed URL (use the /embed/ form for YT). */
  videoUrl?: string;
  en: EventTranslated;
  fr: EventTranslated;
}

export const EVENTS: Event[] = [
  {
    slug: "celebration-dimanche-27-avril",
    day: "27",
    monthEn: "Apr",
    monthFr: "Avr",
    isoDate: "2026-04-27",
    city: "Casablanca",
    time: "15:00 – 17:00",
    category: "celebration",
    image: "/Worship Stars/Worship Stars.jpeg",
    en: {
      title: "Sunday Celebration",
      tagline: "Where the family gathers each week.",
      fullDate: "Sunday, April 27, 2026",
      summary:
        "Our weekly gathering of worship, the Word, and warm welcome. Coffee from 14:30.",
      longDescription: [
        "Every Sunday at 15:00 the family of Eschatos gathers in Casablanca to lift up the name of Jesus together. Coffee and welcome begin from 14:30 — come early, meet a friend, breathe slow before the celebration begins.",
        "The service runs about ninety minutes — Spirit-led worship in French and English, a clear and Christ-centered message, time to respond, and prayer for whoever needs it. There is no dress code. There is no expectation. There is just a Father who delights in you.",
        "A bilingual welcome team will meet you at the door, help you find a seat, answer any question, and walk you to the kids ministry if your children are with you. Whether it is your first Sunday or your hundredth, there is a place for you here.",
      ],
      whatToExpect: [
        "30 minutes of Spirit-led worship in three languages",
        "A clear, Christ-centered message of about 35 minutes",
        "Time of prayer and ministry response at the end",
        "Coffee, conversation, and a warm welcome team",
        "Trained kids ministry from nursery through primary",
      ],
      audience: "Open to everyone — first-time visitors warmly welcomed.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "Where two or three gather in my name, there am I with them.",
        reference: "Matthew 18:20",
      },
      registerCta: "Plan my visit",
    },
    fr: {
      title: "Célébration du Dimanche",
      tagline: "Là où la famille se rassemble chaque semaine.",
      fullDate: "Dimanche 27 avril 2026",
      summary:
        "Notre rassemblement hebdomadaire de louange, de la Parole et d'un accueil chaleureux. Café à partir de 14h30.",
      longDescription: [
        "Chaque dimanche à 15h00, la famille d'Eschatos se rassemble à Casablanca pour élever ensemble le nom de Jésus. L'accueil et le café commencent dès 14h30 — viens en avance, retrouve un ami, respire avant que la célébration ne commence.",
        "Le culte dure environ quatre-vingt-dix minutes — louange conduite par l'Esprit en français et en anglais, un message clair et centré sur Christ, un temps de réponse, et la prière pour celles et ceux qui en ont besoin. Pas de code vestimentaire. Pas d'attente particulière. Juste un Père qui se réjouit de toi.",
        "Une équipe d'accueil bilingue te rejoindra à la porte, t'aidera à trouver une place, répondra à tes questions, et t'accompagnera vers le ministère des enfants si tu viens avec eux. Que ce soit ton premier dimanche ou ton centième, il y a une place pour toi ici.",
      ],
      whatToExpect: [
        "30 minutes de louange conduite par l'Esprit en trois langues",
        "Un message clair et centré sur Christ d'environ 35 minutes",
        "Un temps de prière et de réponse à la fin",
        "Café, conversations, et une équipe d'accueil chaleureuse",
        "Ministère des enfants encadré, de la pouponnière au primaire",
      ],
      audience: "Ouvert à tous — les premiers visiteurs sont chaleureusement accueillis.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "Là où deux ou trois sont assemblés en Mon nom, Je suis au milieu d'eux.",
        reference: "Matthieu 18:20",
      },
      registerCta: "Planifier ma visite",
    },
  },
  {
    slug: "nuit-de-priere-rabat",
    day: "03",
    monthEn: "May",
    monthFr: "Mai",
    isoDate: "2026-05-03",
    city: "Rabat",
    time: "19:00 – 22:00",
    category: "prayer",
    image: "/Chorale Gospel Ensemble Pour Toujours/Chorale Gospel Ensemble Pour Toujours.jpeg",
    en: {
      title: "Night of Prayer",
      tagline: "Three hours on our knees for the city, the nation, the nations.",
      fullDate: "Saturday, May 3, 2026",
      summary:
        "An evening dedicated to seeking God for our city, our nation, and the nations. Bring your Bible and come hungry.",
      longDescription: [
        "Three hours of unbroken prayer and worship at the Rabat campus. We believe nothing of eternal weight happens in this church, this city, or this nation that is not first asked for on our knees. So once a month, we stop and ask.",
        "The night flows in three movements: thanksgiving for what God has done, intercession for the brokenness around us, and listening for what the Spirit is saying to His Church. Worship leaders carry the room with simple, sustained songs. There are mats, candles, and silent corners for those who want to wait quietly before the Lord.",
        "If you have never come to a prayer night before, this is the easiest one to start with. There is no script. There is nothing to perform. You can stay the full three hours or come for one. Heaven will be glad you showed up.",
      ],
      whatToExpect: [
        "Sustained worship by a small acoustic team",
        "Guided intercession for Morocco and the nations",
        "Silent listening prayer with mats and candles",
        "Personal prayer ministry for whoever requests it",
        "No pressure to pray aloud — your presence is the offering",
      ],
      audience: "Anyone hungry for God — believers, seekers, students, families.",
      address: "45 Avenue Mohammed V, Rabat",
      scripture: {
        verse:
          "If my people, who are called by my name, will humble themselves and pray and seek my face… then I will hear from heaven and will heal their land.",
        reference: "2 Chronicles 7:14",
      },
      registerCta: "I will be there",
    },
    fr: {
      title: "Nuit de Prière",
      tagline: "Trois heures à genoux pour la ville, la nation, les nations.",
      fullDate: "Samedi 3 mai 2026",
      summary:
        "Une soirée consacrée à chercher Dieu pour notre ville, notre nation, et les nations. Apporte ta Bible et viens affamé.",
      longDescription: [
        "Trois heures ininterrompues de prière et de louange au campus de Rabat. Nous croyons que rien de poids éternel n'arrive dans cette église, cette ville, ou cette nation qui n'ait d'abord été demandé à genoux. Alors, une fois par mois, nous nous arrêtons et nous demandons.",
        "La soirée se déroule en trois mouvements : action de grâce pour ce que Dieu a fait, intercession pour les brisures autour de nous, et écoute de ce que l'Esprit dit à Son Église. Les conducteurs de louange portent la salle avec des chants simples et tenus. Il y a des tapis, des bougies, et des coins silencieux pour celles et ceux qui veulent attendre tranquillement devant le Seigneur.",
        "Si tu n'es jamais venu à une nuit de prière, c'est la plus facile pour commencer. Il n'y a pas de script. Il n'y a rien à performer. Tu peux rester les trois heures ou venir pour une seule. Le ciel sera heureux que tu sois là.",
      ],
      whatToExpect: [
        "Louange tenue par une petite équipe acoustique",
        "Intercession guidée pour le Maroc et les nations",
        "Prière silencieuse d'écoute avec tapis et bougies",
        "Ministère de prière personnelle pour qui le demande",
        "Aucune pression de prier à voix haute — ta présence est l'offrande",
      ],
      audience: "Toute personne affamée de Dieu — croyants, chercheurs, étudiants, familles.",
      address: "45 Avenue Mohammed V, Rabat",
      scripture: {
        verse:
          "Si Mon peuple, sur lequel est invoqué Mon nom, s'humilie, prie, et cherche Ma face… alors Je l'exaucerai des cieux, et je guérirai son pays.",
        reference: "2 Chroniques 7:14",
      },
      registerCta: "Je serai présent·e",
    },
  },
  {
    slug: "rassemblement-jeunesse-mai",
    day: "10",
    monthEn: "May",
    monthFr: "Mai",
    isoDate: "2026-05-10",
    city: "Casablanca",
    time: "18:00 – 21:00",
    category: "youth",
    image: "/Dancing Stars/Dancing Stars.jpeg",
    en: {
      title: "Youth Gathering",
      tagline: "A generation rising — worship, the Word, food, friendships.",
      fullDate: "Saturday, May 10, 2026",
      summary:
        "Students 13–25 — three hours of worship, teaching, food, games, and the kind of friendships that last a lifetime.",
      longDescription: [
        "The Youth Gathering is for everyone aged 13 to 25 — high school, university, young professionals. Three hours that move from games and food, to high-energy worship, to a real and honest message about following Jesus in 2026.",
        "We talk about the things you actually live with — identity, relationships, social media, calling, fear, faith. We do not pretend to have all the answers, but we point to the One who does. The night ends with prayer, response, and snacks for everyone.",
        "Bring a friend. Bring your questions. Bring nothing if all you have is curiosity. The Father has been waiting for you, and so has a tribe of brothers and sisters your age who already love you before they meet you.",
      ],
      whatToExpect: [
        "45 minutes of welcome, games and free food",
        "30 minutes of high-energy worship",
        "A 25-minute message that meets you where you are",
        "Small group conversations + personal prayer",
        "Late-night snacks and walk-home buddy system",
      ],
      audience: "Students and young adults aged 13–25.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "Don't let anyone look down on you because you are young, but set an example for the believers.",
        reference: "1 Timothy 4:12",
      },
      registerCta: "I'm coming",
    },
    fr: {
      title: "Rassemblement des Jeunes",
      tagline: "Une génération qui se lève — louange, Parole, repas, amitiés.",
      fullDate: "Samedi 10 mai 2026",
      summary:
        "Étudiants 13–25 ans — trois heures de louange, d'enseignement, de repas, de jeux, et le genre d'amitiés qui durent une vie.",
      longDescription: [
        "Le Rassemblement des Jeunes est pour tous les 13 à 25 ans — lycée, université, jeunes pros. Trois heures qui passent des jeux et du repas, à une louange à pleine énergie, à un message réel et honnête sur le fait de suivre Jésus en 2026.",
        "On parle des sujets que tu vis vraiment — identité, relations, réseaux sociaux, appel, peur, foi. On ne prétend pas avoir toutes les réponses, mais on pointe vers Celui qui les a. La soirée se termine par la prière, un temps de réponse, et un encas pour tout le monde.",
        "Amène un ami. Amène tes questions. N'amène rien d'autre que ta curiosité si c'est tout ce que tu as. Le Père t'attend depuis longtemps, et une tribu de frères et sœurs de ton âge t'aime déjà avant même de te rencontrer.",
      ],
      whatToExpect: [
        "45 minutes d'accueil, jeux, et repas gratuit",
        "30 minutes de louange à pleine énergie",
        "Un message de 25 minutes qui te rejoint là où tu en es",
        "Discussions en petits groupes + prière personnelle",
        "Encas en fin de soirée et système de retour entre amis",
      ],
      audience: "Étudiants et jeunes adultes de 13 à 25 ans.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles.",
        reference: "1 Timothée 4:12",
      },
      registerCta: "Je viens",
    },
  },
  {
    slug: "journee-outreach-medina",
    day: "17",
    monthEn: "May",
    monthFr: "Mai",
    isoDate: "2026-05-17",
    city: "Casablanca",
    time: "09:00 – 14:00",
    category: "outreach",
    image: "/Ushers/Ushers.jpeg",
    en: {
      title: "Outreach Day",
      tagline: "Carrying the love of Jesus into the streets we call home.",
      fullDate: "Saturday, May 17, 2026",
      summary:
        "Five hours serving our neighbors with food packages, conversation and prayer in the medina of Casablanca.",
      longDescription: [
        "Once a quarter we leave the building and walk the streets of Casablanca with food, conversation, and prayer. We assemble around eighty parcels of essentials at the church on Saturday morning, then go out in pairs and small groups to neighborhoods where the need is most visible.",
        "We are not a charity — we are a family of disciples carrying the love of Jesus into the city the Father has placed us in. We give without strings. We pray when invited. We listen more than we speak. We come back with stories that mark us for life.",
        "This is one of the easiest places to begin serving in the church. No experience required. Wear comfortable shoes, bring water, bring a friend. We finish with a shared meal at the church to share what we saw and what God did.",
      ],
      whatToExpect: [
        "Coffee + briefing at 09:00 at the church",
        "Assembling food parcels with the team (~1 hour)",
        "Going out in pairs to neighborhoods (~3 hours)",
        "Shared meal and storytelling debrief at 13:00",
        "Personal prayer for anyone who carries something heavy home",
      ],
      audience: "Open to everyone aged 15 and up.",
      address: "12 Rue Tahar Sebti, Casablanca (departure point)",
      scripture: {
        verse:
          "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
        reference: "Matthew 5:16",
      },
      registerCta: "Sign me up",
    },
    fr: {
      title: "Journée Outreach",
      tagline: "Porter l'amour de Jésus dans les rues que nous appelons maison.",
      fullDate: "Samedi 17 mai 2026",
      summary:
        "Cinq heures à servir notre prochain avec des colis alimentaires, des conversations et de la prière dans la médina de Casablanca.",
      longDescription: [
        "Une fois par trimestre, nous sortons des bâtiments et marchons dans les rues de Casablanca avec de la nourriture, des conversations, et de la prière. Nous préparons environ quatre-vingts colis d'essentiels à l'église le samedi matin, puis nous sortons par deux et en petits groupes vers les quartiers où le besoin est le plus visible.",
        "Nous ne sommes pas une œuvre caritative — nous sommes une famille de disciples portant l'amour de Jésus dans la ville où le Père nous a plantés. Nous donnons sans condition. Nous prions quand on nous y invite. Nous écoutons plus que nous ne parlons. Nous rentrons avec des histoires qui marquent à vie.",
        "C'est l'un des endroits les plus simples pour commencer à servir dans l'église. Aucune expérience requise. Mets des chaussures confortables, apporte de l'eau, amène un ami. Nous terminons avec un repas partagé à l'église pour raconter ce que nous avons vu et ce que Dieu a fait.",
      ],
      whatToExpect: [
        "Café + briefing à 9h00 à l'église",
        "Préparation des colis avec l'équipe (~1 heure)",
        "Sortie en binômes dans les quartiers (~3 heures)",
        "Repas partagé et debrief en récits à 13h00",
        "Prière personnelle pour qui rentre avec quelque chose de lourd",
      ],
      audience: "Ouvert à tous à partir de 15 ans.",
      address: "12 Rue Tahar Sebti, Casablanca (point de départ)",
      scripture: {
        verse:
          "Que votre lumière luise ainsi devant les hommes, afin qu'ils voient vos bonnes œuvres et glorifient votre Père qui est dans les cieux.",
        reference: "Matthieu 5:16",
      },
      registerCta: "Je m'inscris",
    },
  },
  {
    slug: "bapteme-dimanche-mai",
    day: "24",
    monthEn: "May",
    monthFr: "Mai",
    isoDate: "2026-05-24",
    city: "Casablanca",
    time: "15:00 – 17:30",
    category: "baptism",
    image: "/Filmstar/Filmstar.jpeg",
    en: {
      title: "Baptism Sunday",
      tagline: "A celebration of new life in Christ.",
      fullDate: "Sunday, May 24, 2026",
      summary:
        "A celebration of resurrection life. Sign up to be baptized at the welcome desk or come witness this holy moment.",
      longDescription: [
        "Twice a year we set apart a Sunday entirely for baptisms. People from across the family — new believers, long-time disciples who never publicly declared their faith, brothers and sisters from the diaspora visiting for the day — step into the water and tell the story of how Jesus has changed their life.",
        "Baptism is not a magical ceremony. It is a public declaration: I belonged to my old life. I now belong to Christ. The grave was real. The resurrection is realer. We celebrate it with songs, with shouts, with tears, with applause that probably embarrasses the heavenly hosts a little.",
        "If you would like to be baptized, talk to a pastor or fill out the form at the welcome desk by May 17. We meet for a short preparation gathering one week before. If you are not being baptized, come and witness — there are few things more beautiful in the life of a church.",
      ],
      whatToExpect: [
        "A regular celebration service from 15:00 to 16:00",
        "Each baptism candidate sharing a 60-second testimony",
        "Live worship while the baptisms unfold",
        "Photos and a printed certificate for every candidate",
        "Family meal afterward with the candidates and their guests",
      ],
      audience: "Anyone who has chosen to follow Jesus and wants to declare it publicly.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead, we too may live a new life.",
        reference: "Romans 6:4",
      },
      registerCta: "I want to be baptized",
    },
    fr: {
      title: "Dimanche du Baptême",
      tagline: "Une célébration de la vie nouvelle en Christ.",
      fullDate: "Dimanche 24 mai 2026",
      summary:
        "Une célébration de la vie de résurrection. Inscris-toi pour être baptisé à l'accueil, ou viens témoigner de ce moment sacré.",
      longDescription: [
        "Deux fois par an, nous mettons à part un dimanche entier pour les baptêmes. Des personnes de toute la famille — nouveaux croyants, disciples de longue date qui n'avaient jamais déclaré publiquement leur foi, frères et sœurs de la diaspora de passage — entrent dans l'eau et racontent comment Jésus a changé leur vie.",
        "Le baptême n'est pas une cérémonie magique. C'est une déclaration publique : j'appartenais à ma vie d'avant. J'appartiens maintenant à Christ. La tombe était réelle. La résurrection l'est plus encore. Nous le célébrons avec des chants, des cris, des larmes, et des applaudissements qui gênent probablement un peu les armées célestes.",
        "Si tu souhaites être baptisé, parle à un pasteur ou remplis le formulaire à l'accueil avant le 17 mai. Nous nous retrouvons pour une courte rencontre de préparation une semaine avant. Si tu n'es pas baptisé, viens témoigner — peu de choses sont plus belles dans la vie d'une église.",
      ],
      whatToExpect: [
        "Une célébration normale de 15h00 à 16h00",
        "Chaque candidat partage un témoignage de 60 secondes",
        "Louange en direct pendant que les baptêmes se déroulent",
        "Photos et un certificat imprimé pour chaque candidat",
        "Repas en famille ensuite avec les candidats et leurs invités",
      ],
      audience: "Toute personne ayant choisi de suivre Jésus et voulant le déclarer publiquement.",
      address: "12 Rue Tahar Sebti, Casablanca",
      scripture: {
        verse:
          "Nous avons donc été ensevelis avec Lui par le baptême en Sa mort, afin que, comme Christ est ressuscité d'entre les morts, nous aussi nous marchions en nouveauté de vie.",
        reference: "Romains 6:4",
      },
      registerCta: "Je veux être baptisé·e",
    },
  },
  {
    slug: "soiree-louange-rabat-juin",
    day: "07",
    monthEn: "Jun",
    monthFr: "Juin",
    isoDate: "2026-06-07",
    city: "Rabat",
    time: "20:00 – 22:30",
    category: "worship",
    image: "/Les Musiciens/Les Musiciens.jpeg",
    en: {
      title: "Worship Night",
      tagline: "Two and a half hours with no agenda but His presence.",
      fullDate: "Saturday, June 7, 2026",
      summary:
        "An evening of pure worship with our Rabat band. No teaching, no announcements — just the family lifting His name.",
      longDescription: [
        "Once a month the Rabat band sets aside an evening with no agenda but worship. No teaching. No announcements. Just the family of Eschatos lifting up the One who is worthy.",
        "We sing classics, we sing new songs, we sing in three languages, we sing in tongues, we sit in silence when the Spirit asks us to. The night flows where the Spirit leads. It can last two hours, it can last three. We come hungry and we leave more hungry — because His presence enlarges the hunger it fills.",
        "Bring a friend who is curious about God. Bring an empty journal. Bring a heart that is willing to be moved. There are no auditions to come and no expectations to meet. Just an open room and a present King.",
      ],
      whatToExpect: [
        "Sustained worship in three languages",
        "Times of silence, prophecy, and Scripture reading",
        "A short intercession moment for the city",
        "Personal prayer ministry on the side",
        "No teaching, no announcements, no offering",
      ],
      audience: "Open to everyone — bring a friend who is curious about God.",
      address: "45 Avenue Mohammed V, Rabat",
      scripture: {
        verse:
          "In your presence there is fullness of joy; at your right hand are pleasures forevermore.",
        reference: "Psalm 16:11",
      },
      registerCta: "I will be there",
    },
    fr: {
      title: "Soirée de Louange",
      tagline: "Deux heures et demie sans autre agenda que Sa présence.",
      fullDate: "Samedi 7 juin 2026",
      summary:
        "Une soirée de pure louange avec le groupe de Rabat. Sans enseignement, sans annonces — juste la famille élevant Son nom.",
      longDescription: [
        "Une fois par mois, le groupe de Rabat met de côté une soirée sans autre agenda que la louange. Pas d'enseignement. Pas d'annonces. Juste la famille d'Eschatos qui élève Celui qui est digne.",
        "Nous chantons des classiques, nous chantons de nouveaux chants, nous chantons en trois langues, nous chantons en langues, nous nous taisons quand l'Esprit le demande. La soirée coule là où l'Esprit conduit. Elle peut durer deux heures, elle peut durer trois. Nous venons affamés et nous repartons plus affamés — parce que Sa présence agrandit la faim qu'elle remplit.",
        "Amène un ami curieux de Dieu. Apporte un carnet vierge. Apporte un cœur prêt à être touché. Pas d'audition pour venir, pas d'attente à remplir. Juste une salle ouverte et un Roi présent.",
      ],
      whatToExpect: [
        "Louange tenue en trois langues",
        "Temps de silence, de prophétie, et de lecture de la Parole",
        "Un court moment d'intercession pour la ville",
        "Ministère de prière personnelle sur le côté",
        "Pas d'enseignement, pas d'annonces, pas d'offrande",
      ],
      audience: "Ouvert à tous — amène un ami curieux de Dieu.",
      address: "45 Avenue Mohammed V, Rabat",
      scripture: {
        verse:
          "Il y a d'abondantes joies devant Ta face, des délices éternels à Ta droite.",
        reference: "Psaume 16:11",
      },
      registerCta: "Je serai présent·e",
    },
  },
];

export const getEventBySlug = (slug: string): Event | undefined =>
  EVENTS.find((e) => e.slug === slug);

export const getEventTranslated = (
  event: Event,
  lang: "en" | "fr",
): EventTranslated => (lang === "fr" ? event.fr : event.en);

export const getRelatedEvents = (slug: string, count = 3): Event[] => {
  const current = getEventBySlug(slug);
  if (!current) return EVENTS.slice(0, count);
  const sameCity = EVENTS.filter(
    (e) => e.slug !== slug && e.city === current.city,
  );
  const others = EVENTS.filter(
    (e) => e.slug !== slug && e.city !== current.city,
  );
  return [...sameCity, ...others].slice(0, count);
};
