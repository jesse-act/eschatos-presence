/**
 * Ministries — typed bilingual data for the eight Eschatos teams.
 * Each entry maps to a detail sub-page at /ministries/:slug.
 */

import {
  Music2,
  Mic2,
  Film,
  Clapperboard,
  Users,
  Headphones,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface MinistryTranslated {
  name: string;
  /** Tagline / sub-discipline (e.g. "Worship & Creative"). */
  tag: string;
  /** Short summary used on the index/chapter page. */
  body: string;
  /** Long-form intro — multiple paragraphs for the detail page. */
  longBody: string[];
  /** A single descriptive sentence about who this ministry is for. */
  audience: string;
  /** Bullet list — what they actually do, week to week. */
  activities: string[];
  /** Meeting cadence / rehearsal info. */
  meetingSchedule: string;
  /** How to step in — ordered list. */
  joinSteps: string[];
  /** Closing call — one sentence to inspire someone to join. */
  closingCall: string;
}

export interface Ministry {
  slug: string;
  /** Roman numeral chapter marker (I-VIII). */
  numeral: string;
  icon: LucideIcon;
  /** Hero / card image — full path under /public. */
  image: string;
  /** Optional gallery — extra photos for the detail page. */
  gallery?: string[];
  /** Anchor scripture for this ministry. */
  scripture: {
    fr: { verse: string; reference: string };
    en: { verse: string; reference: string };
  };
  fr: MinistryTranslated;
  en: MinistryTranslated;
}

export const MINISTRIES: Ministry[] = [
  {
    slug: "worship-stars",
    numeral: "I",
    icon: Star,
    image: "/Worship Stars/Worship Stars.jpeg",
    scripture: {
      fr: { verse: "Chantez à l'Éternel un cantique nouveau, car Il a fait des prodiges.", reference: "Psaume 98:1" },
      en: { verse: "Sing to the LORD a new song, for he has done marvelous things.", reference: "Psalm 98:1" },
    },
    fr: {
      name: "Worship Stars",
      tag: "Louange & Créatif",
      body: "Chanteurs, musiciens et créatifs qui façonnent une atmosphère où le ciel rencontre la terre — semaine après semaine. Auditions ouvertes chaque trimestre.",
      longBody: [
        "Worship Stars est l'équipe de louange principale d'Eschatos. Chanteurs lead, choristes, instrumentistes et créatifs se rassemblent chaque semaine pour préparer une atmosphère où le ciel rencontre la terre.",
        "Notre conviction : la louange n'est pas un préambule au sermon. C'est le sermon. C'est l'évangile en chant. Quand nous montons sur scène, nous ne montons pas pour performer — nous montons pour ouvrir une porte que le Saint-Esprit franchira.",
        "L'équipe est dirigée par des conducteurs de louange formés à l'écoute prophétique, à la dynamique de groupe, et à la technique vocale. Nous travaillons dur sur les détails parce que nous croyons que l'excellence n'est pas l'ennemie de l'authenticité.",
      ],
      audience: "Chanteurs lead, choristes, et toute personne avec un don vocal et un cœur qui bat pour Jésus.",
      activities: [
        "Répétitions hebdomadaires en deux blocs (vocal + ensemble)",
        "Conduite de la louange du dimanche à 15h00",
        "Sessions d'écriture et arrangements pour les chants originaux",
        "Formation vocale et coaching prophétique",
        "Soirées de louange spontanée une fois par mois",
      ],
      meetingSchedule: "Répétitions le jeudi 19h–22h · Run-through le dimanche 13h30 avant le culte",
      joinSteps: [
        "Remplis le formulaire d'audition au stand d'accueil ou via le contact",
        "Audition ouverte une fois par trimestre (vocale ou instrumentale)",
        "3 répétitions d'observation avant l'intégration",
        "Engagement de 6 mois minimum après l'intégration",
      ],
      closingCall: "Si ta voix tremble en chantant Sa bonté, si tu as un don que tu ne sais pas où poser — viens.",
    },
    en: {
      name: "Worship Stars",
      tag: "Worship & Creative",
      body: "Vocalists, musicians, and creatives who craft an atmosphere where heaven meets earth — week after week. Auditions open quarterly. Come with a heart to serve and a gift to offer.",
      longBody: [
        "Worship Stars is the main worship team at Eschatos. Lead vocalists, backing singers, instrumentalists and creatives gather each week to prepare an atmosphere where heaven meets earth.",
        "Our conviction: worship is not the warm-up to the sermon. It is the sermon. It is the gospel in song. When we step on the platform, we are not stepping up to perform — we are stepping up to open a door the Holy Spirit will walk through.",
        "The team is led by worship leaders trained in prophetic listening, group dynamics, and vocal technique. We work hard on the details because we believe excellence is not the enemy of authenticity.",
      ],
      audience: "Lead vocalists, backing singers, and anyone with a vocal gift and a heart that beats for Jesus.",
      activities: [
        "Weekly rehearsal in two blocks (vocal + full band)",
        "Leading Sunday worship at 15:00",
        "Songwriting and arrangement sessions for original material",
        "Vocal training and prophetic coaching",
        "Monthly spontaneous worship nights",
      ],
      meetingSchedule: "Rehearsals Thursday 19:00–22:00 · Run-through Sunday 13:30 before service",
      joinSteps: [
        "Fill out the audition form at the welcome desk or via contact",
        "Open audition once per quarter (vocal or instrumental)",
        "3 observation rehearsals before integration",
        "6-month minimum commitment after integration",
      ],
      closingCall: "If your voice trembles when you sing of His goodness, if you have a gift you don't know where to lay — come.",
    },
  },
  {
    slug: "chorale-gospel",
    numeral: "II",
    icon: Mic2,
    image: "/Chorale Gospel Ensemble Pour Toujours/Chorale Gospel Ensemble Pour Toujours.jpeg",
    scripture: {
      fr: { verse: "Que tout ce qui respire loue l'Éternel !", reference: "Psaume 150:6" },
      en: { verse: "Let everything that has breath praise the LORD.", reference: "Psalm 150:6" },
    },
    fr: {
      name: "Chorale Gospel — Ensemble Pour Toujours",
      tag: "Chœur Gospel",
      body: "Un puissant chœur gospel qui élève les voix dans l'unité, la joie et la tradition profonde de l'adoration. Ensemble pour toujours — chantant la grâce, l'espérance et la fidélité de Dieu.",
      longBody: [
        "La Chorale Gospel — Ensemble Pour Toujours porte l'héritage du gospel africain et afro-américain dans l'église. Un son puissant, des harmonies à trois voix, un battement qui réveille les âmes endormies.",
        "Nous chantons le gospel parce que c'est le langage le plus direct de la résurrection : on ne fait pas semblant, on déclare. On ne murmure pas, on rugit. Quand la chorale entre, le ciel sait qu'on est sérieux.",
        "Le chœur compte aujourd'hui une trentaine de membres, étalés entre Casablanca et Rabat. Nous chantons en français, en anglais, en lingala, en wolof — autant de langues que de cœurs unis.",
      ],
      audience: "Toute personne qui aime chanter en groupe — soprano, alto, ténor, basse — sans niveau requis pour commencer.",
      activities: [
        "Répétitions de chœur deux fois par semaine",
        "Performance lors des grandes célébrations (Pâques, Pentecôte, Noël)",
        "Tournée annuelle d'évangélisation par le chant",
        "Enregistrement studio d'un EP par an",
        "Workshops vocaux pour les nouveaux membres",
      ],
      meetingSchedule: "Mardi 19h30–21h30 et samedi 15h00–17h00",
      joinSteps: [
        "Viens à une répétition d'observation un mardi soir",
        "Tu seras placé(e) sur la voix qui te correspond après écoute",
        "Apprends 3 morceaux de base avant la première montée",
        "Engagement de présence régulière (>70% des répétitions)",
      ],
      closingCall: "Tu n'as pas besoin d'avoir une belle voix solo. Tu as besoin d'avoir une belle voix dans le chœur.",
    },
    en: {
      name: "Chorale Gospel — Ensemble Pour Toujours",
      tag: "Gospel Choir",
      body: "A powerful gospel choir lifting voices in unity, joy, and the deep tradition of worship. Together forever — singing of grace, hope, and the faithfulness of God.",
      longBody: [
        "Chorale Gospel — Ensemble Pour Toujours carries the African and African-American gospel heritage into the church. A powerful sound, three-part harmonies, a beat that wakes sleeping souls.",
        "We sing gospel because it is the most direct language of resurrection: we don't pretend, we declare. We don't whisper, we roar. When the choir steps up, heaven knows we are serious.",
        "The choir now counts about thirty members, spread between Casablanca and Rabat. We sing in French, English, Lingala, Wolof — as many tongues as there are hearts united.",
      ],
      audience: "Anyone who loves to sing in a group — soprano, alto, tenor, bass — no audition level required to start.",
      activities: [
        "Choir rehearsals twice a week",
        "Performance at major celebrations (Easter, Pentecost, Christmas)",
        "Annual evangelism tour through song",
        "Studio recording of one EP per year",
        "Vocal workshops for new members",
      ],
      meetingSchedule: "Tuesday 19:30–21:30 and Saturday 15:00–17:00",
      joinSteps: [
        "Come to an observation rehearsal one Tuesday evening",
        "You'll be placed on the right voice section after a listening session",
        "Learn 3 base songs before your first appearance",
        "Commit to regular attendance (>70% of rehearsals)",
      ],
      closingCall: "You don't need a beautiful solo voice. You need a beautiful voice in the choir.",
    },
  },
  {
    slug: "dancing-stars",
    numeral: "III",
    icon: Star,
    image: "/Dancing Stars/Dancing Stars.jpeg",
    scripture: {
      fr: { verse: "Qu'ils louent Son nom avec des danses !", reference: "Psaume 149:3" },
      en: { verse: "Let them praise his name with dancing.", reference: "Psalm 149:3" },
    },
    fr: {
      name: "Dancing Stars",
      tag: "Danse & Mouvement",
      body: "Un ministère de danse qui donne vie aux Écritures par le mouvement. Du contemporain au liturgique, ces danseurs proclament l'Évangile à chaque pas sur scène.",
      longBody: [
        "Dancing Stars existe parce que le corps n'est pas une honte — c'est un instrument de louange. David a dansé devant l'arche, Myriam a dansé après la mer Rouge, et nous dansons après la croix.",
        "Le ministère mêle la danse contemporaine, la danse liturgique, et les chorégraphies inspirées des cultures africaines. Chaque chorégraphie est précédée d'un temps de prière où nous demandons à l'Esprit ce qu'Il veut raconter à travers ce mouvement.",
        "Nous performons lors des grandes célébrations, des soirées d'évangélisation, et des conférences thématiques. Le but n'est jamais le spectacle — c'est le rendez-vous entre une parole prophétique et un corps obéissant.",
      ],
      audience: "Hommes et femmes de tous niveaux. Pas besoin d'être danseur professionnel — il faut être disposé.",
      activities: [
        "Cours technique hebdomadaire (contemporain et expression corporelle)",
        "Création de chorégraphies originales pour les fêtes liturgiques",
        "Performance lors des cultes spéciaux et soirées d'évangélisation",
        "Coaching individuel sur l'écoute prophétique du mouvement",
        "Stage intensif d'été (5 jours)",
      ],
      meetingSchedule: "Vendredi 18h00–20h30 (technique) · Dimanche 14h30 (filage avant culte)",
      joinSteps: [
        "Inscris-toi à un cours d'essai pour découvrir l'approche",
        "Trois cours d'essai gratuits avant engagement",
        "Audition pour intégrer le groupe de performance",
        "Code vestimentaire de scène fourni par le ministère",
      ],
      closingCall: "Si ton corps a déjà bougé tout seul pendant la louange — c'est ton don qui appelle.",
    },
    en: {
      name: "Dancing Stars",
      tag: "Dance & Movement",
      body: "A dance ministry that brings Scripture to life through movement. From contemporary to liturgical, these dancers proclaim the Gospel with every step on stage.",
      longBody: [
        "Dancing Stars exists because the body is not a shame — it is an instrument of praise. David danced before the ark, Miriam danced after the Red Sea, and we dance after the cross.",
        "The ministry blends contemporary dance, liturgical dance, and choreographies inspired by African cultures. Every choreography is preceded by a time of prayer where we ask the Spirit what He wants to say through this movement.",
        "We perform at major celebrations, evangelism nights, and themed conferences. The goal is never the show — it is the meeting between a prophetic word and an obedient body.",
      ],
      audience: "Men and women of all levels. No need to be a professional dancer — you need to be willing.",
      activities: [
        "Weekly technique class (contemporary and body expression)",
        "Original choreography creation for liturgical feasts",
        "Performance at special services and evangelism nights",
        "Individual coaching on prophetic listening through movement",
        "Intensive summer workshop (5 days)",
      ],
      meetingSchedule: "Friday 18:00–20:30 (technique) · Sunday 14:30 (run-through before service)",
      joinSteps: [
        "Sign up for a trial class to discover the approach",
        "Three free trial classes before commitment",
        "Audition to join the performance group",
        "Stage wardrobe provided by the ministry",
      ],
      closingCall: "If your body has ever moved on its own during worship — that's your gift calling.",
    },
  },
  {
    slug: "filmstar",
    numeral: "IV",
    icon: Clapperboard,
    image: "/Filmstar/Filmstar.jpeg",
    scripture: {
      fr: { verse: "Allez par tout le monde, et prêchez la bonne nouvelle à toute la création.", reference: "Marc 16:15" },
      en: { verse: "Go into all the world and proclaim the gospel to the whole creation.", reference: "Mark 16:15" },
    },
    fr: {
      name: "Filmstar",
      tag: "Cinéma & Médias",
      body: "Des conteurs derrière l'objectif — capturant des témoignages, produisant du contenu qui atteint le Maroc et au-delà. Chaque image est une occasion de partager l'amour du Christ.",
      longBody: [
        "Filmstar est l'équipe cinéma d'Eschatos. Nous produisons des courts-métrages de témoignages, des documentaires sur les œuvres de Dieu dans nos villes, et des vidéos évangéliques pour les réseaux sociaux.",
        "Notre conviction : à l'ère où chacun consomme dix heures de vidéo par jour, l'Église doit raconter ses histoires avec autant de soin que Hollywood — mais avec une vérité que Hollywood ne peut pas filmer.",
        "L'équipe rassemble réalisateurs, monteurs, ingénieurs son, chefs op et scénaristes. Nous formons aussi en interne ceux qui veulent apprendre. Pas besoin d'avoir étudié le cinéma — il faut avoir une histoire à raconter.",
      ],
      audience: "Réalisateurs amateurs ou professionnels, monteurs, scénaristes, chefs op, photographes vidéo.",
      activities: [
        "Production de 1 court-métrage de témoignage par mois",
        "Captation des grands événements de l'église",
        "Documentaires longs sur les ministères et les œuvres locales",
        "Formation interne sur Premiere, DaVinci, et le storytelling chrétien",
        "Festival annuel de projections en plein air à Casablanca",
      ],
      meetingSchedule: "Réunion d'équipe le samedi 14h00 · Tournages selon planning",
      joinSteps: [
        "Présente-toi avec un travail récent (n'importe quel format vidéo)",
        "Rencontre avec le responsable du ministère",
        "Intégration sur un premier projet en équipe",
        "Formation interne disponible si débutant",
      ],
      closingCall: "Si tu vois le monde en cadres et tu entends Dieu en montage — c'est pour toi.",
    },
    en: {
      name: "Filmstar",
      tag: "Film & Media",
      body: "Storytellers behind the lens — capturing testimonies, producing content that reaches Morocco and beyond. Every frame is a chance to share the love of Christ.",
      longBody: [
        "Filmstar is the cinema team at Eschatos. We produce testimony short films, documentaries about the works of God in our cities, and evangelistic videos for social media.",
        "Our conviction: in an era when each person consumes ten hours of video a day, the Church must tell its stories with as much care as Hollywood — but with a truth Hollywood cannot film.",
        "The team brings together directors, editors, sound engineers, cinematographers and screenwriters. We also train in-house those who want to learn. No need to have studied cinema — you need to have a story to tell.",
      ],
      audience: "Amateur or professional directors, editors, screenwriters, cinematographers, video photographers.",
      activities: [
        "Production of 1 testimony short film per month",
        "Capture of major church events",
        "Long-form documentaries on ministries and local works",
        "In-house training on Premiere, DaVinci, and Christian storytelling",
        "Annual outdoor screening festival in Casablanca",
      ],
      meetingSchedule: "Team meeting Saturday 14:00 · Shoots per schedule",
      joinSteps: [
        "Show up with recent work (any video format)",
        "Meeting with the ministry leader",
        "Integration on a first team project",
        "In-house training available if beginner",
      ],
      closingCall: "If you see the world in frames and hear God in the edit — this is for you.",
    },
  },
  {
    slug: "media",
    numeral: "V",
    icon: Film,
    image: "/Medias/media.png",
    scripture: {
      fr: { verse: "Comment entendront-ils, si personne ne le proclame ?", reference: "Romains 10:14" },
      en: { verse: "How are they to hear without someone preaching?", reference: "Romans 10:14" },
    },
    fr: {
      name: "Media",
      tag: "Communication & Diffusion",
      body: "L'équipe qui raconte l'histoire d'Eschatos en ligne — réseaux sociaux, photographie, production de diffusion en direct et rayonnement numérique. Atteindre le Maroc, un post à la fois.",
      longBody: [
        "L'équipe Média gère toute la présence numérique d'Eschatos : Instagram, TikTok, YouTube, Facebook, le site web, et la diffusion en direct des cultes. Nous sommes les ambassadeurs digitaux de l'église.",
        "Chaque post est une mini-prière publique. Chaque story est une porte qu'un curieux peut franchir. Chaque livestream est un culte que quelqu'un, quelque part, regarde seul dans sa chambre — et rencontre Dieu.",
        "Nous travaillons en équipe rapprochée avec Filmstar (production cinéma) et Worship Stars (sonorisation). Notre rythme est intense : production quotidienne, mais notre mission est claire — un Maroc qui scrolle vers l'évangile.",
      ],
      audience: "Community managers, photographes, graphistes, monteurs vidéo courte forme, rédacteurs.",
      activities: [
        "Production quotidienne de contenu social (Instagram, TikTok, Facebook)",
        "Photographie des cultes et événements",
        "Diffusion en direct des cultes du dimanche sur YouTube",
        "Rédaction de la newsletter hebdomadaire",
        "Maintenance et amélioration continue du site web",
      ],
      meetingSchedule: "Réunion édito le lundi 18h30 · Production toute la semaine",
      joinSteps: [
        "Apporte un portfolio (Instagram personnel, photos, ou tout travail visuel récent)",
        "Entretien avec la responsable Média",
        "Période d'observation de 4 semaines avec un mentor",
        "Engagement de 10 heures/semaine minimum",
      ],
      closingCall: "Si tu passes 3h par jour sur ton téléphone — pourquoi pas pour le Royaume ?",
    },
    en: {
      name: "Media",
      tag: "Communication & Outreach",
      body: "The team that tells the Eschatos story online — social media, photography, livestream production, and digital outreach. Reaching Morocco one post at a time.",
      longBody: [
        "The Media team handles all of Eschatos's digital presence: Instagram, TikTok, YouTube, Facebook, the website, and the livestream of services. We are the digital ambassadors of the church.",
        "Every post is a small public prayer. Every story is a door a curious person can walk through. Every livestream is a service someone, somewhere, is watching alone in their room — and meeting God.",
        "We work in close coordination with Filmstar (cinema production) and Worship Stars (sound). Our rhythm is intense: daily production, but our mission is clear — a Morocco that scrolls toward the gospel.",
      ],
      audience: "Community managers, photographers, graphic designers, short-form video editors, writers.",
      activities: [
        "Daily social content production (Instagram, TikTok, Facebook)",
        "Photography of services and events",
        "Sunday service livestreaming on YouTube",
        "Writing the weekly newsletter",
        "Website maintenance and continuous improvement",
      ],
      meetingSchedule: "Editorial meeting Monday 18:30 · Production all week",
      joinSteps: [
        "Bring a portfolio (personal Instagram, photos, or any recent visual work)",
        "Interview with the Media lead",
        "4-week observation period with a mentor",
        "Minimum commitment of 10 hours/week",
      ],
      closingCall: "If you spend 3 hours a day on your phone — why not for the Kingdom?",
    },
  },
  {
    slug: "les-musiciens",
    numeral: "VI",
    icon: Music2,
    image: "/Les Musiciens/musiciens.png",
    scripture: {
      fr: { verse: "Louez-Le avec le luth et la harpe ! Louez-Le avec le tambourin et avec des danses !", reference: "Psaume 150:3-4" },
      en: { verse: "Praise him with the harp and lyre, with timbrel and dancing.", reference: "Psalm 150:3-4" },
    },
    fr: {
      name: "Instrumentistes",
      tag: "Instrumental & Groupe",
      body: "Les instrumentistes qui tiennent le rythme de l'adoration ensemble — guitaristes, batteurs, claviéristes et plus encore. Des mains habiles dédiées à un art sacré, dimanche après dimanche.",
      longBody: [
        "Les Instrumentistes forment le squelette rythmique et harmonique de la louange à Eschatos. Sans eux, les voix flotteraient dans le vide. Avec eux, le ciel descend dans le pulse.",
        "Le groupe rassemble batteurs, guitaristes (acoustiques et électriques), claviéristes, bassistes, et percussionnistes. Niveau requis : intermédiaire confirmé. Nous travaillons en sections, avec un MD (musical director) qui dirige les arrangements.",
        "Notre exigence : un musicien d'Eschatos doit être capable de lire une grille d'accords, de tenir un click, et surtout d'écouter — l'autre musicien à côté de lui, le chanteur lead, et l'Esprit qui passe.",
      ],
      audience: "Musiciens de niveau intermédiaire à confirmé sur leur instrument.",
      activities: [
        "Répétition full-band tous les jeudis",
        "Sessions de section instrumentale (rythme, claviers, cordes) en alternance",
        "Stage technique trimestriel avec un musicien externe invité",
        "Couverture musicale de tous les événements (cultes, conférences, mariages)",
        "Sessions d'enregistrement studio pour les chants originaux",
      ],
      meetingSchedule: "Jeudi 19h00–22h00 (full band) · Run-through dimanche 13h30",
      joinSteps: [
        "Audition individuelle avec le MD (15 min, deux morceaux libres)",
        "Évaluation du niveau et placement dans une section",
        "3 répétitions d'observation",
        "Test live au culte du dimanche après validation",
      ],
      closingCall: "Si ton instrument prend la poussière entre deux dimanches — c'est dommage. Viens jouer.",
    },
    en: {
      name: "Instrumentalists",
      tag: "Instrumental & Band",
      body: "The instrumentalists who hold the rhythm of worship together — guitarists, drummers, keyboardists, and more. Skilled hands dedicated to a holy craft, Sunday after Sunday.",
      longBody: [
        "The Instrumentalists form the rhythmic and harmonic backbone of worship at Eschatos. Without them, the voices would float in a vacuum. With them, heaven comes down into the pulse.",
        "The band brings together drummers, guitarists (acoustic and electric), keyboardists, bassists, and percussionists. Required level: confirmed intermediate. We work in sections, with an MD (musical director) leading the arrangements.",
        "Our standard: an Eschatos musician must be able to read a chord chart, hold a click, and above all listen — to the other musician next to them, to the lead singer, and to the Spirit moving.",
      ],
      audience: "Musicians at intermediate-to-confirmed level on their instrument.",
      activities: [
        "Full-band rehearsal every Thursday",
        "Instrumental section sessions (rhythm, keys, strings) on rotation",
        "Quarterly technical workshop with an external guest musician",
        "Musical coverage of all events (services, conferences, weddings)",
        "Studio recording sessions for original songs",
      ],
      meetingSchedule: "Thursday 19:00–22:00 (full band) · Run-through Sunday 13:30",
      joinSteps: [
        "Individual audition with the MD (15 min, two free pieces)",
        "Level evaluation and placement in a section",
        "3 observation rehearsals",
        "Live Sunday service test after validation",
      ],
      closingCall: "If your instrument gathers dust between Sundays — that's a waste. Come play.",
    },
  },
  {
    slug: "airport-stars",
    numeral: "VII",
    icon: Headphones,
    image: "/Airportstar/Airportstar.png",
    scripture: {
      fr: { verse: "Quoi que vous fassiez, faites-le de bon cœur, comme pour le Seigneur, et non pour des hommes.", reference: "Colossiens 3:23" },
      en: { verse: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "Colossians 3:23" },
    },
    fr: {
      name: "Airport Stars",
      tag: "Technique & Son",
      body: "L'équipe en coulisses qui fait sonner et paraître chaque dimanche de façon excellente. Audio, éclairage et excellence technique — servant dans l'ombre pour que la Parole soit entendue clairement.",
      longBody: [
        "Airport Stars est l'équipe technique d'Eschatos. Sonorisation, éclairage de scène, vidéo-projection, captation et streaming. Nous sommes les serviteurs invisibles : si on ne nous remarque pas, c'est que nous avons bien fait notre travail.",
        "Chaque dimanche, à 13h00, l'équipe arrive dans la salle vide. Nous montons les pieds de micros, calibrons les enceintes, vérifions chaque ligne, programmons les lumières, testons les retours de scène. À 14h45, tout doit être prêt — invisible et puissant.",
        "Nous formons les nouveaux membres pendant six mois minimum avant de les laisser opérer en solo. La technique d'église n'est pas plus simple que la technique de concert — c'est plus exigeant, parce que la marge d'erreur est plus visible et l'enjeu plus haut.",
      ],
      audience: "Personnes minutieuses, ponctuelles, fiables. Aucun pré-requis technique — la formation est assurée.",
      activities: [
        "Mise en place et démontage technique du dimanche (arrivée 13h00, départ 18h00)",
        "Couverture technique de tous les événements (cultes, soirées, conférences)",
        "Maintenance hebdomadaire du parc matériel",
        "Formation continue sur les nouveaux outils (Logic, ProPresenter, console numérique)",
        "Streaming live des cultes du dimanche",
      ],
      meetingSchedule: "Dimanche 13h00–17h30 · Formation samedi matin (selon planning)",
      joinSteps: [
        "Rencontre avec le responsable technique pour voir l'équipe en action",
        "3 dimanches d'observation comme assistant",
        "Formation sur ton poste de prédilection (son, lumière, vidéo)",
        "Validation après 6 mois pour opérer en autonomie",
      ],
      closingCall: "Si tu aimes que les choses fonctionnent — vraiment fonctionnent — la cabine technique t'attend.",
    },
    en: {
      name: "Airport Stars",
      tag: "Technical & Sound",
      body: "The behind-the-scenes team that makes every Sunday sound and look excellent. Audio, lighting, and technical excellence — serving invisibly so the Word is heard clearly.",
      longBody: [
        "Airport Stars is the technical team at Eschatos. Sound, stage lighting, video projection, recording and streaming. We are the invisible servants: if you don't notice us, it means we did our job well.",
        "Every Sunday at 13:00, the team arrives in the empty hall. We set up mic stands, calibrate the speakers, check every line, program the lights, test the stage monitors. By 14:45, everything must be ready — invisible and powerful.",
        "We train new members for at least six months before letting them operate solo. Church tech is not simpler than concert tech — it is more demanding, because the margin for error is more visible and the stakes are higher.",
      ],
      audience: "Detail-oriented, punctual, reliable people. No technical prerequisite — training is provided.",
      activities: [
        "Sunday tech setup and teardown (arrive 13:00, leave 18:00)",
        "Technical coverage of all events (services, evenings, conferences)",
        "Weekly equipment maintenance",
        "Continuous training on new tools (Logic, ProPresenter, digital console)",
        "Live streaming of Sunday services",
      ],
      meetingSchedule: "Sunday 13:00–17:30 · Saturday morning training (per schedule)",
      joinSteps: [
        "Meet the technical lead to see the team in action",
        "3 Sundays of observation as assistant",
        "Training on your preferred station (sound, lighting, video)",
        "Solo operation certified after 6 months",
      ],
      closingCall: "If you love things that work — really work — the tech booth is waiting for you.",
    },
  },
  {
    slug: "ushers",
    numeral: "VIII",
    icon: Users,
    image: "/Ushers/users.png",
    scripture: {
      fr: { verse: "N'oubliez pas l'hospitalité ; car par elle quelques-uns ont reçu des anges sans le savoir.", reference: "Hébreux 13:2" },
      en: { verse: "Do not forget to show hospitality, for by so doing some have entertained angels.", reference: "Hebrews 13:2" },
    },
    fr: {
      name: "Ushers",
      tag: "Accueil & Hospitalité",
      body: "Le premier visage que vous voyez et l'accueil le plus chaleureux que vous recevrez. Nos ushers créent une culture d'appartenance dès l'instant où vous franchissez la porte — chaque dimanche.",
      longBody: [
        "Les Ushers sont la première chose qu'un visiteur voit en franchissant la porte d'Eschatos. Un sourire, un bonjour sincère, un guide vers une place. Cinq secondes qui décident souvent si quelqu'un reviendra.",
        "Nous croyons que l'hospitalité n'est pas un détail — c'est une théologie. Le Père a couru au-devant du fils prodigue. Nous courons au-devant du nouveau. Pas parce que c'est notre travail. Parce que c'est notre joie.",
        "L'équipe s'organise en plusieurs postes : accueil de la porte, placement, distribution des programmes, soins aux familles avec enfants, et hospitalité post-culte. Chaque dimanche, vingt à trente personnes servent dans cet équilibre invisible.",
      ],
      audience: "Toute personne avec un sourire authentique et un cœur d'hospitalité.",
      activities: [
        "Accueil à la porte d'entrée 30 minutes avant le culte",
        "Placement et distribution des programmes",
        "Soins particuliers aux familles avec enfants et aux PMR",
        "Café et conversations après le culte",
        "Suivi des nouveaux visiteurs (carte de bienvenue, appel le mercredi)",
      ],
      meetingSchedule: "Dimanche 14h15 (briefing) · Réunion mensuelle d'équipe le 1er samedi du mois",
      joinSteps: [
        "Présence au briefing un dimanche pour observer",
        "Formation d'une heure sur le protocole d'accueil",
        "Premier service en binôme avec un mentor",
        "Engagement d'un dimanche sur deux minimum",
      ],
      closingCall: "Si tu te souviens de la première personne qui t'a souri à l'église — sois cette personne pour quelqu'un.",
    },
    en: {
      name: "Ushers",
      tag: "Welcome & Hospitality",
      body: "The first face you see and the warmest welcome you'll receive. Our ushers create a culture of belonging from the moment you walk through the door — every Sunday.",
      longBody: [
        "The Ushers are the first thing a visitor sees when walking through the door at Eschatos. A smile, a sincere hello, a guide to a seat. Five seconds that often decide whether someone will come back.",
        "We believe hospitality is not a detail — it is a theology. The Father ran toward the prodigal son. We run toward the new. Not because it's our job. Because it's our joy.",
        "The team is organized into several stations: door greeting, seating, program distribution, care for families with children, and post-service hospitality. Every Sunday, twenty to thirty people serve in this invisible balance.",
      ],
      audience: "Anyone with a genuine smile and a heart of hospitality.",
      activities: [
        "Door welcome 30 minutes before the service",
        "Seating and program distribution",
        "Special care for families with children and accessibility needs",
        "Coffee and conversations after the service",
        "Follow-up of new visitors (welcome card, Wednesday call)",
      ],
      meetingSchedule: "Sunday 14:15 (briefing) · Monthly team meeting on the 1st Saturday",
      joinSteps: [
        "Attend a Sunday briefing to observe",
        "One-hour training on welcome protocol",
        "First service paired with a mentor",
        "Commitment of every other Sunday minimum",
      ],
      closingCall: "If you remember the first person who smiled at you at church — be that person for someone.",
    },
  },
];

export const getMinistryBySlug = (slug: string): Ministry | undefined =>
  MINISTRIES.find((m) => m.slug === slug);

export const getMinistryTranslated = (
  ministry: Ministry,
  lang: "en" | "fr",
): MinistryTranslated => (lang === "fr" ? ministry.fr : ministry.en);

export const getRelatedMinistries = (slug: string, count = 3): Ministry[] => {
  return MINISTRIES.filter((m) => m.slug !== slug).slice(0, count);
};
