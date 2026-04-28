/**
 * Testimonies — fictional but Spirit-rooted stories from the Eschatos family.
 * Each entry maps a real photograph in /public/temoignages/ to an African
 * brother or sister, with a category, scripture, and full bilingual body.
 *
 * NOTE: Names and stories are crafted for the site (illustrative). They reflect
 * the diaspora present in Casablanca & Rabat — Ghana, Nigeria, Senegal,
 * Côte d'Ivoire, Zimbabwe, Kenya, Tanzania, Cameroun, RDC.
 */

export type TestimonyCategory =
  | "salvation"
  | "healing"
  | "deliverance"
  | "provision"
  | "family"
  | "calling"
  | "restoration"
  | "hope";

export type TestimonyCity = "Casablanca" | "Rabat";

export interface TestimonyTranslated {
  /** Pull-quote shown on the index card and at the top of the detail page. */
  pullQuote: string;
  /** Short summary (≤ 220 chars) for index card body. */
  summary: string;
  /** Full body — array of paragraphs. The first paragraph receives a drop cap. */
  body: string[];
  /** Scripture connection — verse + reference shown on detail page. */
  scripture: { verse: string; reference: string };
  /** One-line declarative tagline shown above the pull-quote on detail. */
  tagline: string;
}

export interface Testimony {
  /** URL slug — kebab-case, ASCII only, used in /temoignages/:slug. */
  slug: string;
  /** Display name — fictional African name. */
  name: string;
  /** Age — adds embodiment to the story. */
  age: number;
  /** City of belonging within Eschatos. */
  city: TestimonyCity;
  /** Category — drives icon, color accent, and filter. */
  category: TestimonyCategory;
  /** Image path relative to /public. */
  image: string;
  /** Year the testimony took place — adds time depth. */
  year: number;
  en: TestimonyTranslated;
  fr: TestimonyTranslated;
}

export const CATEGORY_LABELS = {
  en: {
    all: "All testimonies",
    salvation: "Salvation",
    healing: "Healing",
    deliverance: "Deliverance",
    provision: "Provision",
    family: "Family",
    calling: "Calling",
    restoration: "Restoration",
    hope: "Hope after loss",
  },
  fr: {
    all: "Tous les témoignages",
    salvation: "Salut",
    healing: "Guérison",
    deliverance: "Délivrance",
    provision: "Provision",
    family: "Famille",
    calling: "Appel",
    restoration: "Restauration",
    hope: "Espérance dans le deuil",
  },
} as const;

export const TESTIMONIES: Testimony[] = [
  {
    slug: "adjoa-mensah-guerison",
    name: "Adjoa Mensah",
    age: 34,
    city: "Casablanca",
    category: "healing",
    image: "/temoignages/WhatsApp Image 2026-04-05 at 21.52.28.jpeg",
    year: 2025,
    en: {
      tagline: "Three years of pain. One Sunday of grace.",
      pullQuote:
        "The doctors had said there was nothing more to do. Then Jesus laid His hand on my back, and I knew before I stood up.",
      summary:
        "After three years of chronic spinal pain, Adjoa was prayed for during a Sunday service at Eschatos Casablanca. She walked out without crutches.",
      body: [
        "For three years I lived with a pain that made me forget what laughter felt like. Doctors in Accra, then in Casablanca, all told me the same sentence with different words: there was nothing more to do but manage it.",
        "I came to Eschatos the first time because a friend told me she had been praying for me without me knowing. I told her I was tired. Tired of pretending. Tired of carrying my body like a burden God had forgotten.",
        "That Sunday Pasteure Jane Loue called the sick forward. I almost stayed in my seat — I had been disappointed too many times. But something in me, deeper than the pain, stood up before I did.",
        "She prayed simply. She said the name of Jesus. And it was as if a hand of warm water poured over my spine, from the neck down to the lower back. I started to cry before I understood why. I bent down. I stood up. I bent down again. The pain was gone.",
        "It has been eight months. I sleep through the night. I dance in worship. I carry my niece on my back like the women of my village. The Lord did not just heal a body — He gave me back the years the pain had stolen.",
      ],
      scripture: {
        verse:
          "He himself bore our sins in his body on the tree, so that we might die to sins and live for righteousness; by his wounds you have been healed.",
        reference: "1 Peter 2:24",
      },
    },
    fr: {
      tagline: "Trois ans de douleur. Un dimanche de grâce.",
      pullQuote:
        "Les médecins avaient dit qu'il n'y avait plus rien à faire. Puis Jésus a posé Sa main sur mon dos, et j'ai su avant même de me lever.",
      summary:
        "Après trois ans de douleurs chroniques à la colonne, Adjoa a été imposée des mains lors d'un dimanche à Eschatos Casablanca. Elle est repartie sans béquilles.",
      body: [
        "Pendant trois ans j'ai vécu avec une douleur qui m'a fait oublier ce qu'était le rire. Les médecins, à Accra puis à Casablanca, me disaient tous la même phrase avec d'autres mots : il n'y avait plus rien à faire, juste à gérer.",
        "Je suis venue à Eschatos la première fois parce qu'une amie m'a confié qu'elle priait pour moi à mon insu. Je lui ai dit que j'étais fatiguée. Fatiguée de faire semblant. Fatiguée de porter mon corps comme un fardeau que Dieu avait oublié.",
        "Ce dimanche-là, Pasteure Jane Loue a appelé les malades à s'avancer. J'ai failli rester assise — j'avais été déçue trop souvent. Mais quelque chose en moi, plus profond que la douleur, s'est levé avant moi.",
        "Elle a prié simplement. Elle a prononcé le nom de Jésus. Et ce fut comme une main d'eau tiède qui se déversait sur ma colonne, de la nuque jusqu'aux reins. J'ai commencé à pleurer avant de comprendre pourquoi. Je me suis penchée. Je me suis relevée. Encore. La douleur n'était plus là.",
        "Cela fait huit mois. Je dors la nuit entière. Je danse dans la louange. Je porte ma nièce sur mon dos comme les femmes de mon village. Le Seigneur n'a pas seulement guéri un corps — Il m'a rendu les années que la douleur avait volées.",
      ],
      scripture: {
        verse:
          "Lui-même a porté nos péchés en son corps sur le bois, afin que morts aux péchés nous vivions pour la justice ; c'est par Ses meurtrissures que vous avez été guéris.",
        reference: "1 Pierre 2:24",
      },
    },
  },
  {
    slug: "kwame-boateng-rencontre",
    name: "Kwame Boateng",
    age: 41,
    city: "Rabat",
    category: "salvation",
    image: "/temoignages/WhatsApp Image 2026-04-07 at 21.37.45.jpeg",
    year: 2024,
    en: {
      tagline: "An engineer who believed in nothing — until he met Someone.",
      pullQuote:
        "I had built my life on logic. The night I met Jesus, every theorem I trusted bowed quietly and let Him pass.",
      summary:
        "A senior engineer who described himself as a convinced atheist walked into Eschatos Rabat to please his wife. He left as a son of God.",
      body: [
        "For twenty years I had explanations for everything. Suffering was chemistry, love was hormones, prayer was self-talk. I was an engineer, and I trusted the systems I could measure.",
        "My wife Akosua started coming to Eschatos Rabat. She did not pressure me. She simply came home different — softer, freer, more patient with our boys. I noticed before I admitted it.",
        "I came one Wednesday for Culte Impacte, mostly to verify my theory that this was a beautiful illusion. Pasteur Rudy preached on the goodness of the Father. Halfway through the message I felt my chest tighten in a way no equation could explain. It was not fear. It was being seen.",
        "After the service I stood near the door waiting for it to pass. A young brother I had never met walked over and said only: God told me to tell you He is not asking you to stop being intelligent — He is asking you to stop being alone.",
        "I went home and read the Gospel of John in one night. By 4 a.m. I was kneeling in the kitchen, weeping, telling Jesus that if He was real I was His. He answered. I have not been the same man since.",
      ],
      scripture: {
        verse:
          "Come now, let us reason together, says the LORD. Though your sins are like scarlet, they shall be white as snow.",
        reference: "Isaiah 1:18",
      },
    },
    fr: {
      tagline: "Un ingénieur qui ne croyait à rien — jusqu'à rencontrer Quelqu'un.",
      pullQuote:
        "J'avais bâti ma vie sur la logique. La nuit où j'ai rencontré Jésus, chaque théorème en lequel je croyais s'est incliné en silence et L'a laissé passer.",
      summary:
        "Un ingénieur senior qui se déclarait athée convaincu est entré à Eschatos Rabat pour faire plaisir à sa femme. Il en est ressorti fils de Dieu.",
      body: [
        "Pendant vingt ans j'avais des explications à tout. La souffrance était de la chimie, l'amour des hormones, la prière un dialogue avec soi-même. J'étais ingénieur, et je faisais confiance aux systèmes mesurables.",
        "Ma femme Akosua a commencé à venir à Eschatos Rabat. Elle ne m'a jamais forcé. Elle rentrait simplement à la maison différente — plus douce, plus libre, plus patiente avec nos garçons. Je l'ai remarqué avant de l'admettre.",
        "Je suis venu un mercredi pour Culte Impacte, surtout pour vérifier mon hypothèse que tout cela était une belle illusion. Pasteur Rudy a prêché sur la bonté du Père. À mi-chemin de son message, ma poitrine s'est serrée d'une manière qu'aucune équation ne pouvait expliquer. Ce n'était pas de la peur. C'était d'être vu.",
        "Après le culte je suis resté près de la porte, attendant que cela passe. Un jeune frère que je ne connaissais pas s'est avancé et m'a dit seulement : Dieu m'a demandé de te dire qu'Il ne te demande pas d'arrêter d'être intelligent — Il te demande d'arrêter d'être seul.",
        "Je suis rentré chez moi et j'ai lu l'évangile de Jean en une nuit. À 4h du matin j'étais à genoux dans la cuisine, en pleurs, en train de dire à Jésus que s'Il était réel, j'étais à Lui. Il a répondu. Je ne suis plus le même homme depuis.",
      ],
      scripture: {
        verse:
          "Venez et plaidons ! dit l'Éternel. Si vos péchés sont comme le cramoisi, ils deviendront blancs comme la neige.",
        reference: "Ésaïe 1:18",
      },
    },
  },
  {
    slug: "aminata-diallo-delivrance",
    name: "Aminata Diallo",
    age: 27,
    city: "Casablanca",
    category: "deliverance",
    image: "/temoignages/WhatsApp Image 2026-04-10 at 00.37.02.jpeg",
    year: 2025,
    en: {
      tagline: "The fear that ruled her nights had a name. Jesus knew it.",
      pullQuote:
        "I had not slept a full night in two years. The night the Spirit came on me, fear left like a guest who had finally been told to leave.",
      summary:
        "Crippling night anxiety left Aminata exhausted and trembling for two years. One evening of prayer at Eschatos changed her sleep — and her soul.",
      body: [
        "I would lie down and the room would close in. Every shadow had a meaning. Every sound was a threat. I had tried medication, breathing apps, even charms a relative gave me without asking. Nothing held.",
        "A sister from Worship Stars invited me to a small prayer evening. I did not want to go. I did not want to face the dark inside me with strangers. But I went, because she did not stop loving me when I said no.",
        "We were perhaps twenty in the room. They sang very simply. At one point a woman, without knowing my story, said: there is someone here whose nights are stolen — Jesus is taking back the night for you.",
        "I felt heat on my face and a weight lift off my chest, like a coat that was too heavy and someone had finally pulled it off my shoulders. I sobbed for half an hour without being ashamed.",
        "I went home and slept. Eight hours. Then nine. The next night I prayed before bed and slept like a child. It has been almost a year. The fear that ruled my nights has lost its address — Jesus moved in, and there is no room for both.",
      ],
      scripture: {
        verse:
          "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
        reference: "2 Timothy 1:7",
      },
    },
    fr: {
      tagline: "La peur qui régnait sur ses nuits avait un nom. Jésus le connaissait.",
      pullQuote:
        "Je n'avais pas dormi une nuit entière en deux ans. Le soir où l'Esprit est venu sur moi, la peur est partie comme un invité qu'on chasse enfin.",
      summary:
        "Une angoisse nocturne paralysante a épuisé Aminata pendant deux ans. Une soirée de prière à Eschatos a changé son sommeil — et son âme.",
      body: [
        "Je m'allongeais et la chambre se refermait. Chaque ombre avait une signification. Chaque bruit était une menace. J'avais essayé des médicaments, des applications de respiration, même des amulettes qu'une parente m'avait données sans me demander. Rien ne tenait.",
        "Une sœur des Worship Stars m'a invitée à une petite soirée de prière. Je ne voulais pas y aller. Je ne voulais pas affronter le noir en moi devant des inconnus. Mais j'y suis allée, parce qu'elle n'a pas cessé de m'aimer quand j'ai dit non.",
        "Nous étions peut-être une vingtaine dans la salle. Ils chantaient très simplement. À un moment, une femme, sans connaître mon histoire, a dit : il y a quelqu'un ici dont les nuits sont volées — Jésus reprend la nuit pour toi.",
        "J'ai senti de la chaleur sur mon visage et un poids quitter ma poitrine, comme un manteau trop lourd qu'on retire enfin de tes épaules. J'ai pleuré une demi-heure sans honte.",
        "Je suis rentrée et j'ai dormi. Huit heures. Puis neuf. La nuit suivante j'ai prié avant de me coucher et j'ai dormi comme une enfant. Cela fait presque un an. La peur qui régnait sur mes nuits a perdu son adresse — Jésus a emménagé, et il n'y a pas de place pour les deux.",
      ],
      scripture: {
        verse:
          "Ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
        reference: "2 Timothée 1:7",
      },
    },
  },
  {
    slug: "olusegun-adebayo-provision",
    name: "Olusegun Adebayo",
    age: 38,
    city: "Rabat",
    category: "provision",
    image: "/temoignages/WhatsApp Image 2026-04-23 at 07.05.17.jpeg",
    year: 2025,
    en: {
      tagline: "He lost his job on a Friday. By the next Friday, God had a better one.",
      pullQuote:
        "I gave my last 200 dirhams in the offering with my hand shaking. I did not give to receive. I gave because He had become my Father.",
      summary:
        "Olusegun lost his job and felt the bottom fall out. A week of obedient prayer and a single act of trust opened a door he could never have engineered.",
      body: [
        "I had been working for seven years at a logistics firm in Rabat. On a Friday morning my manager called me into a small office. By 11 a.m. I was on the street with a cardboard box, two children at home, and rent due in twelve days.",
        "That Sunday I almost did not go to church. I felt foolish — like a man who had built his life on the wrong sand. But I came, and I sat at the back, and I tried not to cry through the worship.",
        "When the offering came I had exactly 200 dirhams left in my pocket. I felt the Holy Spirit say very gently: this is not your last money — this is your first seed. I gave it. My hand was shaking. I went home and told my wife. She wept and we prayed together.",
        "Tuesday a brother from the church called: a friend of his needed someone with my exact profile, urgently. I went for the interview Wednesday. Friday morning — exactly one week after the loss — I signed a contract for a position 30% better paid, closer to home, with a manager I now consider a brother.",
        "I do not say God is a vending machine. He is a Father. He saw me, He tested me, He provided. Today I tithe with joy because I know who provides — and it is no longer my job, it is my God.",
      ],
      scripture: {
        verse:
          "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
        reference: "Philippians 4:19",
      },
    },
    fr: {
      tagline: "Il a perdu son travail un vendredi. Le vendredi suivant, Dieu en avait un meilleur.",
      pullQuote:
        "J'ai donné mes derniers 200 dirhams à l'offrande, la main tremblante. Je ne donnais pas pour recevoir. Je donnais parce qu'Il était devenu mon Père.",
      summary:
        "Olusegun a perdu son emploi et tout s'est effondré. Une semaine de prière obéissante et un seul acte de confiance ont ouvert une porte qu'il n'aurait jamais pu fabriquer.",
      body: [
        "Je travaillais depuis sept ans dans une entreprise de logistique à Rabat. Un vendredi matin mon responsable m'a appelé dans un petit bureau. À 11h j'étais dans la rue avec un carton, deux enfants à la maison, et le loyer dû dans douze jours.",
        "Ce dimanche-là j'ai failli ne pas aller à l'église. Je me sentais idiot — comme un homme qui avait bâti sa vie sur le mauvais sable. Mais je suis venu, je me suis assis au fond, et j'ai essayé de ne pas pleurer pendant la louange.",
        "Quand l'offrande est arrivée j'avais exactement 200 dirhams dans la poche. J'ai senti le Saint-Esprit me dire très doucement : ce n'est pas ton dernier argent — c'est ta première semence. J'ai donné. Ma main tremblait. Je suis rentré le dire à ma femme. Elle a pleuré et nous avons prié ensemble.",
        "Mardi un frère de l'église m'a appelé : un de ses amis cherchait quelqu'un avec exactement mon profil, en urgence. J'ai passé l'entretien mercredi. Vendredi matin — exactement une semaine après la perte — je signais un contrat pour un poste 30% mieux payé, plus proche de chez moi, avec un responsable que je considère aujourd'hui comme un frère.",
        "Je ne dis pas que Dieu est un distributeur. Il est Père. Il m'a vu, Il m'a éprouvé, Il a pourvu. Aujourd'hui je donne ma dîme avec joie parce que je sais qui pourvoit — et ce n'est plus mon emploi, c'est mon Dieu.",
      ],
      scripture: {
        verse:
          "Et mon Dieu pourvoira à tous vos besoins selon Sa richesse, avec gloire, en Jésus-Christ.",
        reference: "Philippiens 4:19",
      },
    },
  },
  {
    slug: "nyasha-mukamuri-restauration",
    name: "Nyasha Mukamuri",
    age: 32,
    city: "Casablanca",
    category: "family",
    image: "/temoignages/WhatsApp Image 2026-04-23 at 16.06.58.jpeg",
    year: 2024,
    en: {
      tagline: "We had filed the papers. Then God filed His.",
      pullQuote:
        "We came to church to go through the motions one last time. The Lord met us in the parking lot and refused to let our marriage end.",
      summary:
        "Nyasha and her husband had agreed to divorce quietly. A single Sunday, an unscripted prayer line, and a Father who refused to give up rewrote everything.",
      body: [
        "After eight years and two beautiful children, Tendai and I had agreed it was over. Not violently — sadly. We had become two strangers managing the same household. The papers were drafted. We had decided to come to church one last Sunday to keep the appearances for the children.",
        "We barely spoke in the car. We sat in different rows. I do not even remember the sermon — only that at some point Pasteure Jane Loue said: there is a marriage in this room that men have ended, and the Father has not signed.",
        "I felt as if she had read my email. I looked across the rows and Tendai was already looking at me, his eyes full of tears. We did not speak. We walked out at the end and met in the parking lot, and we both said the same word at the same moment — pardon.",
        "We did not magically heal that day. We started counseling with the Eschatos couples ministry. We prayed together for the first time in three years. We laughed for the first time in six months. We learned what dying to self really means.",
        "Two years later we are not the same couple — we are a better one. Our children sleep peacefully. Our home has become a place where God is welcome. The Father who said no to our divorce said yes to our restoration, and what He restores, He doubles.",
      ],
      scripture: {
        verse:
          "What therefore God has joined together, let not man separate.",
        reference: "Mark 10:9",
      },
    },
    fr: {
      tagline: "Nous avions déposé les papiers. Puis Dieu a déposé les Siens.",
      pullQuote:
        "Nous étions venus à l'église pour faire semblant une dernière fois. Le Seigneur nous a rejoints sur le parking et a refusé que notre mariage se termine.",
      summary:
        "Nyasha et son mari avaient convenu de divorcer en silence. Un seul dimanche, un appel imprévu, et un Père qui refuse d'abandonner ont tout réécrit.",
      body: [
        "Après huit ans et deux beaux enfants, Tendai et moi étions d'accord — c'était fini. Pas dans la violence, dans la tristesse. Nous étions devenus deux étrangers qui gèrent le même foyer. Les papiers étaient prêts. Nous étions venus à l'église un dernier dimanche pour les apparences, à cause des enfants.",
        "Nous nous sommes à peine parlé dans la voiture. Nous nous sommes assis dans des rangs différents. Je ne me souviens même pas du sermon — seulement qu'à un moment Pasteure Jane Loue a dit : il y a un mariage dans cette salle que les hommes ont terminé, et que le Père n'a pas signé.",
        "J'ai eu l'impression qu'elle avait lu mon email. J'ai regardé à travers les rangs et Tendai me regardait déjà, les yeux pleins de larmes. Nous n'avons pas parlé. Nous sommes sortis à la fin et nous nous sommes retrouvés sur le parking, et nous avons dit le même mot au même moment — pardon.",
        "Nous n'avons pas magiquement guéri ce jour-là. Nous avons commencé un accompagnement avec le ministère des couples d'Eschatos. Nous avons prié ensemble pour la première fois en trois ans. Nous avons ri pour la première fois en six mois. Nous avons appris ce que mourir à soi-même veut dire.",
        "Deux ans plus tard nous ne sommes pas le même couple — nous en sommes un meilleur. Nos enfants dorment en paix. Notre foyer est devenu un lieu où Dieu est accueilli. Le Père qui a dit non à notre divorce a dit oui à notre restauration, et ce qu'Il restaure, Il le double.",
      ],
      scripture: {
        verse:
          "Que l'homme donc ne sépare pas ce que Dieu a uni.",
        reference: "Marc 10:9",
      },
    },
  },
  {
    slug: "tariro-chigumba-pardon",
    name: "Tariro Chigumba",
    age: 29,
    city: "Rabat",
    category: "restoration",
    image: "/temoignages/WhatsApp Image 2026-04-24 at 12.15.46.jpeg",
    year: 2025,
    en: {
      tagline: "The man who broke her was the first one God asked her to forgive.",
      pullQuote:
        "Forgiving him did not excuse what he did. It freed me from being his prisoner one more day.",
      summary:
        "A wound from her teenage years still controlled Tariro at twenty-nine. The night she chose to forgive, the chain that had bound her heart for fifteen years finally broke.",
      body: [
        "What happened to me at fourteen years old shaped every decision of my adult life. I had told no one for a decade. I built a successful career on the outside and a fortress on the inside. I called the fortress strength.",
        "When I came to Eschatos Rabat I was looking for a quiet church where no one would ask me anything. I found a family that did not ask, but loved me until I wanted to speak.",
        "One Friday night during a discipleship circle, the leader read Joseph's words to his brothers: you meant evil against me, but God meant it for good. I started shaking. Not from fear — from refusal. I did not want what was done to me to be turned for good.",
        "But that night, alone in my apartment, I knelt and named the man before God. I said his name out loud. I said what he did out loud. And I said: Lord, I cannot forgive him — but I give You permission to forgive him through me.",
        "Something broke in my chest that I had carried so long I had forgotten its weight. I slept twelve hours. I woke up lighter than I had been at fourteen. The forgiveness did not excuse him — it freed me from being his prisoner one more day. Christ took the chain. I will not pick it back up.",
      ],
      scripture: {
        verse:
          "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        reference: "Ephesians 4:32",
      },
    },
    fr: {
      tagline: "L'homme qui l'a brisée fut le premier que Dieu lui a demandé de pardonner.",
      pullQuote:
        "Lui pardonner n'a pas excusé ce qu'il a fait. Cela m'a libérée d'être sa prisonnière un jour de plus.",
      summary:
        "Une blessure de l'adolescence dirigeait encore Tariro à vingt-neuf ans. Le soir où elle a choisi de pardonner, la chaîne qui liait son cœur depuis quinze ans s'est enfin brisée.",
      body: [
        "Ce qui m'est arrivé à quatorze ans a modelé chaque décision de ma vie adulte. Pendant dix ans je n'en ai parlé à personne. J'ai bâti une carrière brillante à l'extérieur et une forteresse à l'intérieur. J'appelais cette forteresse \"force\".",
        "Quand je suis arrivée à Eschatos Rabat je cherchais une église silencieuse où personne ne me demanderait rien. J'ai trouvé une famille qui ne demandait rien, mais qui m'a aimée jusqu'à ce que j'aie envie de parler.",
        "Un vendredi soir, dans un cercle de disciple, le responsable a lu les paroles de Joseph à ses frères : vous aviez médité du mal contre moi, mais Dieu l'a changé en bien. J'ai commencé à trembler. Pas de peur — de refus. Je ne voulais pas que ce qui m'avait été fait soit changé en bien.",
        "Mais ce soir-là, seule dans mon appartement, je me suis agenouillée et j'ai nommé cet homme devant Dieu. J'ai dit son nom à voix haute. J'ai dit ce qu'il avait fait à voix haute. Et j'ai dit : Seigneur, je ne peux pas lui pardonner — mais je Te donne la permission de lui pardonner à travers moi.",
        "Quelque chose s'est brisé dans ma poitrine que j'avais porté si longtemps que j'en avais oublié le poids. J'ai dormi douze heures. Je me suis réveillée plus légère qu'à quatorze ans. Le pardon ne l'a pas excusé — il m'a libérée d'être sa prisonnière un jour de plus. Le Christ a pris la chaîne. Je ne la reprendrai pas.",
      ],
      scripture: {
        verse:
          "Soyez bons les uns envers les autres, compatissants, vous pardonnant réciproquement, comme Dieu vous a pardonné en Christ.",
        reference: "Éphésiens 4:32",
      },
    },
  },
  {
    slug: "selasi-kofi-appel",
    name: "Selasi Kofi",
    age: 24,
    city: "Casablanca",
    category: "calling",
    image: "/temoignages/WhatsApp Image 2026-04-24 at 15.27.01.jpeg",
    year: 2024,
    en: {
      tagline: "He had the scholarship, the visa, and the wrong dream.",
      pullQuote:
        "I had everything men told me I should want. The day I obeyed God instead, I found everything I had actually been looking for.",
      summary:
        "Selasi was about to leave Morocco for a prestigious career path overseas when the Spirit asked him a question that rearranged his entire life.",
      body: [
        "I had built the perfect plan. Fully-funded master's program in Canada. A path to a six-figure consulting career. My family back in Lomé saw me as their pride. I had told everyone I would leave at the end of the summer.",
        "That summer I joined Filmstar to help film a few testimonies for the church. I thought it would be a hobby for two months. The first time I sat behind the camera while a brother shared what God had done for him, something happened that I cannot fully explain — I felt at home in a way no business school had made me feel.",
        "Pasteur Rudy preached on Jonah and asked one question that did not leave me: are you running toward the dream God gave you, or toward the dream that men gave you about you?",
        "I prayed for two weeks. I fasted. I tried to convince God to bless the Canada plan. He kept asking me, very gently, the same question. One night I told Him yes. I cancelled the visa. My family did not understand. Some still do not.",
        "Two years later I lead the Filmstar ministry. We have produced over forty stories of grace. I work part-time as a media consultant in Casablanca and live with peace I never had on the perfect path. Obedience cost me a dream. It gave me my purpose.",
      ],
      scripture: {
        verse:
          "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
        reference: "Ephesians 2:10",
      },
    },
    fr: {
      tagline: "Il avait la bourse, le visa, et le mauvais rêve.",
      pullQuote:
        "J'avais tout ce que les hommes m'avaient dit de désirer. Le jour où j'ai obéi à Dieu à la place, j'ai trouvé tout ce que je cherchais vraiment.",
      summary:
        "Selasi était sur le point de quitter le Maroc pour une carrière prestigieuse à l'étranger quand l'Esprit lui a posé une question qui a réorganisé toute sa vie.",
      body: [
        "J'avais construit le plan parfait. Master entièrement financé au Canada. Un chemin vers une carrière de consultant à six chiffres. Ma famille à Lomé me voyait comme leur fierté. J'avais dit à tout le monde que je partais en fin d'été.",
        "Cet été-là j'ai rejoint Filmstar pour aider à filmer quelques témoignages pour l'église. Je pensais que ce serait un hobby de deux mois. La première fois que je me suis assis derrière la caméra pendant qu'un frère racontait ce que Dieu avait fait pour lui, il s'est passé quelque chose que je ne peux pas pleinement expliquer — je me suis senti chez moi d'une manière qu'aucune business school ne m'avait fait sentir.",
        "Pasteur Rudy a prêché sur Jonas et a posé une question qui ne m'a plus quitté : cours-tu vers le rêve que Dieu t'a donné, ou vers le rêve que les hommes t'ont donné de toi ?",
        "J'ai prié deux semaines. J'ai jeûné. J'ai essayé de convaincre Dieu de bénir le plan Canada. Il continuait à me poser, très doucement, la même question. Une nuit je Lui ai dit oui. J'ai annulé le visa. Ma famille n'a pas compris. Certains ne comprennent toujours pas.",
        "Deux ans plus tard je dirige le ministère Filmstar. Nous avons produit plus de quarante histoires de grâce. Je travaille à temps partiel comme consultant média à Casablanca et je vis avec une paix que je n'avais pas sur le chemin parfait. L'obéissance m'a coûté un rêve. Elle m'a donné ma raison d'être.",
      ],
      scripture: {
        verse:
          "Car nous sommes Son ouvrage, ayant été créés en Jésus-Christ pour de bonnes œuvres, que Dieu a préparées d'avance, afin que nous les pratiquions.",
        reference: "Éphésiens 2:10",
      },
    },
  },
  {
    slug: "eshe-ndongo-identite",
    name: "Eshe Ndongo",
    age: 26,
    city: "Rabat",
    category: "healing",
    image: "/temoignages/WhatsApp Image 2026-04-24 at 21.45.24.jpeg",
    year: 2025,
    en: {
      tagline: "She had been told she was too much. Her Father called her enough.",
      pullQuote:
        "I had carried a sentence written by people who never knew me. The Father took the pen out of my hand and wrote a new name over my life.",
      summary:
        "After years of crippling self-rejection, Eshe encountered the Father's love during a worship night — and discovered she had been writing her identity from the wrong author.",
      body: [
        "I grew up being told I was too loud, too bold, too dark, too tall, too much. By the time I reached university I had folded myself into a small, polite version of a girl I no longer recognized in the mirror.",
        "I started coming to Eschatos Rabat reluctantly with a colleague. I was afraid the church would tell me the same thing the world had told me — make yourself smaller.",
        "Instead, on the third Sunday I came, the worship leader sang a song I had never heard, with a refrain that simply repeated: you are loved as you are, you are loved as you are. I sat down because my legs would not hold me. I cried in a way I had not cried since I was a child.",
        "It was not emotion. It was the Father introducing Himself. He showed me, not in words but in something deeper than words, that the sentence I was carrying was not from Him. He had created me on purpose, and the very things I had been told to apologize for were the very things He intended to use.",
        "Today I lead a small group for young women battling rejection. I tell them the truth I had to learn: you do not have to make yourself smaller for the world to make room for you — the Father already made room.",
      ],
      scripture: {
        verse:
          "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
        reference: "Psalm 139:14",
      },
    },
    fr: {
      tagline: "On lui avait dit qu'elle était trop. Son Père l'a appelée assez.",
      pullQuote:
        "Je portais une sentence écrite par des gens qui ne m'avaient jamais connue. Le Père a pris le stylo de ma main et a écrit un nom nouveau sur ma vie.",
      summary:
        "Après des années d'auto-rejet, Eshe a rencontré l'amour du Père pendant une soirée de louange — et a découvert qu'elle écrivait son identité depuis le mauvais auteur.",
      body: [
        "J'ai grandi en m'entendant dire que j'étais trop bruyante, trop audacieuse, trop noire, trop grande, trop. Arrivée à l'université, je m'étais pliée en une version petite et polie d'une fille que je ne reconnaissais plus dans le miroir.",
        "J'ai commencé à venir à Eschatos Rabat à reculons avec une collègue. J'avais peur que l'église me dise la même chose que le monde — fais-toi plus petite.",
        "Au lieu de ça, le troisième dimanche, le conducteur de louange a chanté une chanson que je n'avais jamais entendue, dont le refrain répétait simplement : tu es aimée telle que tu es, tu es aimée telle que tu es. Je me suis assise parce que mes jambes ne me portaient plus. J'ai pleuré comme je n'avais pas pleuré depuis l'enfance.",
        "Ce n'était pas de l'émotion. C'était le Père qui se présentait. Il m'a montré, pas avec des mots mais avec quelque chose de plus profond que les mots, que la sentence que je portais ne venait pas de Lui. Il m'avait créée intentionnellement, et les choses mêmes pour lesquelles on m'avait dit de m'excuser étaient exactement celles qu'Il voulait utiliser.",
        "Aujourd'hui je dirige un petit groupe pour jeunes femmes qui luttent contre le rejet. Je leur dis la vérité que j'ai dû apprendre : tu n'as pas à te rétrécir pour que le monde te fasse de la place — le Père a déjà fait de la place.",
      ],
      scripture: {
        verse:
          "Je Te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le reconnaît bien.",
        reference: "Psaume 139:14",
      },
    },
  },
  {
    slug: "mawuli-akoto-percee",
    name: "Mawuli Akoto",
    age: 45,
    city: "Casablanca",
    category: "deliverance",
    image: "/temoignages/WhatsApp Image 2026-04-26 at 22.48.40.jpeg",
    year: 2024,
    en: {
      tagline: "The chain that bound his father, and his father's father, broke at the cross.",
      pullQuote:
        "The Lord did not just save me — He cut a generational rope at the root, and my children will not inherit what almost destroyed me.",
      summary:
        "Mawuli watched alcoholism destroy three generations of his family. He came to Eschatos broken and asking for the cycle to end with him. Heaven answered.",
      body: [
        "My grandfather drank himself to death. My father drank himself blind. By thirty-five I was halfway down the same road and I knew it. Every promise I made to my wife I broke by Friday night. Every prayer I made to a God I did not really know felt like talking to the ceiling.",
        "I came to Eschatos because my wife had started coming and our daughter had stopped looking at me with respect. I did not want to lose her. I sat in a Wednesday Culte Impacte service and Pasteur Rudy preached on the cross — that what was nailed there was not just my sin but the inheritance my fathers had passed down.",
        "I cannot tell you what came over me. I went forward, knelt, and named three generations of men in my family by name before God. I asked Him to cut the line at me. I asked Him to make me the firstborn of a new house.",
        "I have not touched alcohol in twenty-two months. I have not wanted to. The desire was lifted, not just resisted. My daughter looks me in the eyes again. My wife laughs in our home. I am not a recovering alcoholic — I am a son of the Most High God who was bought back from a slavery older than my name.",
        "Whatever the chain in your family, whatever the curse you think is your inheritance: the cross of Jesus is bigger than your bloodline. He cut mine. He will cut yours.",
      ],
      scripture: {
        verse:
          "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.",
        reference: "Galatians 5:1",
      },
    },
    fr: {
      tagline: "La chaîne qui liait son père, et le père de son père, s'est brisée à la croix.",
      pullQuote:
        "Le Seigneur ne m'a pas seulement sauvé — Il a coupé une corde générationnelle à la racine, et mes enfants n'hériteront pas de ce qui a failli me détruire.",
      summary:
        "Mawuli a vu l'alcoolisme détruire trois générations de sa famille. Il est venu à Eschatos brisé, demandant que le cycle s'arrête avec lui. Le ciel a répondu.",
      body: [
        "Mon grand-père est mort d'alcool. Mon père est devenu aveugle d'alcool. À trente-cinq ans j'étais à mi-chemin du même chemin et je le savais. Chaque promesse à ma femme je la rompais le vendredi soir. Chaque prière à un Dieu que je ne connaissais pas vraiment me semblait parler au plafond.",
        "Je suis venu à Eschatos parce que ma femme avait commencé à venir et que ma fille avait cessé de me regarder avec respect. Je ne voulais pas la perdre. Je me suis assis à un Culte Impacte un mercredi et Pasteur Rudy a prêché sur la croix — que ce qui y était cloué n'était pas seulement mon péché mais l'héritage que mes pères m'avaient transmis.",
        "Je ne peux pas vous dire ce qui m'est tombé dessus. Je me suis avancé, agenouillé, et j'ai nommé trois générations d'hommes de ma famille devant Dieu, par leur nom. Je Lui ai demandé de couper la ligne à moi. Je Lui ai demandé de me rendre premier-né d'une maison nouvelle.",
        "Je n'ai pas touché à l'alcool depuis vingt-deux mois. Je n'en ai pas eu envie. Le désir a été ôté, pas seulement résisté. Ma fille me regarde à nouveau dans les yeux. Ma femme rit dans notre maison. Je ne suis pas un alcoolique en rémission — je suis fils du Dieu Très-Haut, racheté d'un esclavage plus vieux que mon nom.",
        "Quelle que soit la chaîne dans ta famille, quelle que soit la malédiction que tu crois être ton héritage : la croix de Jésus est plus grande que ta lignée. Il a coupé la mienne. Il coupera la tienne.",
      ],
      scripture: {
        verse:
          "C'est pour la liberté que Christ nous a affranchis. Demeurez donc fermes, et ne vous laissez pas mettre de nouveau sous le joug de la servitude.",
        reference: "Galates 5:1",
      },
    },
  },
  {
    slug: "imani-wanjiru-esperance",
    name: "Imani Wanjiru",
    age: 36,
    city: "Rabat",
    category: "hope",
    image: "/temoignages/WhatsApp Image 2026-04-27 at 00.05.26.jpeg",
    year: 2025,
    en: {
      tagline: "She buried a child. The Lord did not let her bury her hope.",
      pullQuote:
        "I learned that grief and worship can sit together in the same heart, and that the Lord is closer to the broken than to the polished.",
      summary:
        "When Imani lost her son, she also lost her words. Eschatos did not rush her grief. The Lord met her in it — and gave her back something even death could not take.",
      body: [
        "We lost our son Jabari at five months old. He was born too early. He fought for ninety-three days. The morning the hospital called, I forgot how to pray. I forgot the language of God.",
        "I did not stop coming to Eschatos. I just sat in the back row and let the worship wash over me without singing. For weeks. The pastors did not push me. Sisters from the church came to my apartment with food, sat in silence with me, prayed for me without making me speak.",
        "One Sunday I heard the worship team sing the line: \"Even when I cannot trace Your hand, I will trust Your heart.\" I broke. I cried out — not at God, but to Him. I told Him everything I had not been able to say. I told Him I was angry. I told Him I was empty. I told Him I still loved Him.",
        "He met me there. Not with explanations. With presence. I felt Him hold me as I had never been held. I felt Him whisper that Jabari was safe, that he was His before he was ours, and that no day with my son had been wasted.",
        "I will never stop missing him. But I have stopped being alone in the missing. I now help lead a small grief circle at Eschatos for parents who have lost children. We do not give answers. We give the One who sat with us in the silence first.",
      ],
      scripture: {
        verse:
          "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
        reference: "Psalm 34:18",
      },
    },
    fr: {
      tagline: "Elle a enterré un enfant. Le Seigneur n'a pas laissé enterrer son espérance.",
      pullQuote:
        "J'ai appris que le deuil et la louange peuvent habiter le même cœur, et que le Seigneur est plus proche du brisé que du parfait.",
      summary:
        "Quand Imani a perdu son fils, elle a aussi perdu ses mots. Eschatos n'a pas pressé son deuil. Le Seigneur l'a rejointe — et lui a rendu quelque chose que la mort ne pouvait pas prendre.",
      body: [
        "Nous avons perdu notre fils Jabari à cinq mois. Il était né trop tôt. Il s'est battu pendant quatre-vingt-treize jours. Le matin où l'hôpital a appelé, j'ai oublié comment prier. J'ai oublié la langue de Dieu.",
        "Je n'ai pas cessé de venir à Eschatos. Je m'asseyais simplement au fond et je laissais la louange me traverser sans chanter. Pendant des semaines. Les pasteurs ne m'ont pas bousculée. Des sœurs venaient chez moi avec à manger, restaient en silence à mes côtés, priaient pour moi sans me forcer à parler.",
        "Un dimanche j'ai entendu l'équipe de louange chanter cette ligne : \"même quand je ne vois pas Ta main, je ferai confiance à Ton cœur.\" Je me suis effondrée. J'ai crié — pas contre Dieu, mais vers Lui. Je Lui ai dit tout ce que je n'avais pas pu dire. Je Lui ai dit que j'étais en colère. Je Lui ai dit que j'étais vide. Je Lui ai dit que je L'aimais encore.",
        "Il m'a rejointe là. Pas avec des explications. Avec Sa présence. Je L'ai senti me tenir comme je n'avais jamais été tenue. Je L'ai entendu murmurer que Jabari était en sécurité, qu'il était à Lui avant d'être à nous, et qu'aucune journée avec mon fils n'avait été perdue.",
        "Je n'arrêterai jamais de lui manquer. Mais j'ai arrêté d'être seule dans le manque. J'aide maintenant à animer un petit cercle de deuil à Eschatos pour les parents qui ont perdu un enfant. Nous ne donnons pas de réponses. Nous donnons Celui qui s'est assis avec nous dans le silence le premier.",
      ],
      scripture: {
        verse:
          "L'Éternel est près de ceux qui ont le cœur brisé, et Il sauve ceux dont l'esprit est abattu.",
        reference: "Psaume 34:18",
      },
    },
  },
];

export const getTestimonyBySlug = (slug: string): Testimony | undefined =>
  TESTIMONIES.find((t) => t.slug === slug);

/**
 * Explicit accessor for the localized fields of a testimony.
 * Avoids the implicit `testimony[lang]` index which silently widens if
 * `Testimony` or `Lang` evolves.
 */
export const getTranslated = (
  testimony: Testimony,
  lang: "en" | "fr",
): TestimonyTranslated => (lang === "fr" ? testimony.fr : testimony.en);

export const getRelatedTestimonies = (
  slug: string,
  count = 3,
): Testimony[] => {
  const current = getTestimonyBySlug(slug);
  if (!current) return TESTIMONIES.slice(0, count);
  // Same category first, then anything else.
  const sameCategory = TESTIMONIES.filter(
    (t) => t.slug !== slug && t.category === current.category,
  );
  const others = TESTIMONIES.filter(
    (t) => t.slug !== slug && t.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, count);
};

export const getCategoryCount = (category: TestimonyCategory): number =>
  TESTIMONIES.filter((t) => t.category === category).length;
