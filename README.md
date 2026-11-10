# Eschatos — site de l'église

Site vitrine de l'église **Eschatos**, en français et en anglais. Il accueille
les nouveaux venus, présente les cultes et les ministères, diffuse les
enseignements et le direct YouTube, et ouvre la porte aux dons.

**En ligne : [eschatos-presence.vercel.app](https://eschatos-presence.vercel.app)**

---

## Ce que contient le site

| Page | Route | Contenu |
|---|---|---|
| Accueil | `/` | Vidéo d'ouverture, programme de la semaine, ministères, derniers enseignements |
| À propos | `/about` | Histoire et vision de l'église |
| Direction | `/leadership` | Les pasteurs et responsables |
| Ministères | `/ministries`, `/ministries/:slug` | Les huit ministères (chorale, musiciens, danse, accueil, médias…), une page chacun, avec invitation à les rejoindre |
| Enseignements | `/sermons` | Les dernières vidéos de la chaîne YouTube |
| Direct | `/live` | Le culte en direct, ou la vidéo à la une hors diffusion |
| Événements | `/events`, `/events/:slug` | Agenda des événements, page de détail |
| Témoignages | `/temoignages`, `/temoignages/:slug` | Témoignages des membres |
| Nous rendre visite | `/visit` | Horaires des cultes, ce qui attend un premier visiteur |
| Dons | `/donate` | Offrande et dîme |
| Contact | `/contact` | Formulaire de contact |

Programme affiché : culte « Impacte » le mercredi à 18 h, service du dimanche
à 15 h.

## Pile technique

- **Vite + React 18 + TypeScript** — application monopage (SPA)
- **React Router v6** — toutes les routes dans `src/App.tsx`, sous un `Layout`
  commun (barre de navigation, pied de page)
- **Tailwind CSS + shadcn/ui** (Radix) — composants dans `src/components/ui/`
- **React Three Fiber** — la croix 3D (`src/components/sacred3d/`)
- **React Hook Form + Zod** — validation des formulaires
- **Vitest + Testing Library** — tests

## Démarrage

```bash
npm install
npm run dev        # http://localhost:8080
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build localement |
| `npm run lint` | ESLint |
| `npm run test` | Tests Vitest |

## Organisation du code

```
src/
├── pages/            une page par route
├── components/
│   ├── home/         sections de l'accueil
│   ├── sacred/       éléments d'ambiance : lumière, verset, flamme, croix en filigrane
│   ├── sacred3d/     croix en 3D
│   ├── animation/    apparitions au défilement, titres animés
│   ├── testimonies/  cartes de témoignage
│   └── ui/           composants shadcn/ui
├── data/             ministères, événements, témoignages, vidéos
├── i18n/             traductions et contexte de langue
└── lib/              utilitaires
```

### Contenu

Le contenu éditorial vit dans `src/data/` : ministères (`ministries.ts`),
événements (`events.ts`), témoignages (`testimonies.ts`) et vidéos
(`videos.json`). Les photos correspondantes sont dans `public/` (un dossier par
ministère, `events/`, `pasteurs/`, `temoignages/`).

Les vidéos des enseignements se mettent à jour avec
`node scripts/fetch-youtube-videos.mjs` : le script lit le flux RSS public de la
chaîne (sans clé d'API) et réécrit `src/data/videos.json`. En cas d'échec
réseau, il garde le fichier existant.

### Traductions

Tous les textes sont dans `src/i18n/translations.ts`, en français et en
anglais. La langue choisie est mémorisée dans le navigateur
(`localStorage`, clé `eschatos-lang`). Tout nouveau texte doit être ajouté dans
les deux langues.

```tsx
const { t, lang } = useLanguage();
<h1>{t.hero.title}</h1>
```

### Charte

Noir profond, rouge signal en seul accent (la croix du logo), blanc cassé et
gris doux ; un serif éditorial pour les titres, un sans-serif moderne pour le
texte. Les règles détaillées — lumière, souffle, Parole, feu, révérence — sont
dans [`DESIGN.md`](DESIGN.md) ; la palette dans
[`palette_de_couleurs_eschatos_church.md`](palette_de_couleurs_eschatos_church.md).

## Déploiement

Hébergé sur **Vercel** (`vercel.json`) : build Vite, sortie `dist/`,
réécriture de toutes les routes vers `index.html`, cache long des fichiers
versionnés, en-têtes de sécurité (CSP limitée à YouTube, Google Fonts et
Google Analytics, HSTS, `X-Frame-Options: DENY`).

## État

- Les formulaires de contact et de don valident la saisie et confirment à
  l'écran, mais **n'envoient encore rien** : il reste à les brancher sur un
  service d'envoi (e-mail ou paiement).
- Le rafraîchissement des vidéos n'est pas lancé par le build : il faut
  exécuter le script avant de déployer.
