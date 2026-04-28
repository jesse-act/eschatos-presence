# DESIGN.md — Eschatos Presence

> This file follows the [DESIGN.md standard](https://stitch.withgoogle.com/docs/design-md/overview/).
> Read it before generating any UI for this project.

## Identity

Church/ministry website. **Solemn, dignified, welcoming.** Stark black anchors the layout; signal red is the sole accent (mirroring the church cross in the logo); off-white and soft gray provide breathing room and readability. Typography mixes a classical editorial serif (display) with a clean modern sans. The overall direction is minimal luxury / editorial — like entering a solemn, well-kept space.

## Sacred Atmosphere

The site is not a brochure — it is a sanctuary. Every visitor should *feel* the presence of God. We translate this into design through five pillars:

### 1. Light (Genesis 1:3)
Divine presence breaks through. Hero sections use `bg-gradient-light-beam` (radial light from top) and the `.light-beam` utility class. Subtle white radial gradient mimics sun rays through stained glass.

### 2. Breath (Genesis 2:7 · John 20:22)
Living elements *breathe*. Logos, eyebrows, accent dots, indicators use `animate-breath` (5s cycle) — opacity 0.7→1, gentle scale 1.0→1.015. Reveals reality of the Spirit.

### 3. Word (John 1:1)
Scripture is the most important content type. Display verses are rendered with `<ScriptureRef>` — Cormorant Garamond at clamp(2rem→6rem), tracking -0.02em, with reference uppercase tracked at 0.32em.

### 4. Fire (Acts 2)
Pentecost flame. Red accents pulse with `animate-anoint` (3s flame box-shadow). Live indicators use `animate-heartbeat`. CTAs that matter spiritually (donate, join) use `.glory` class for anointing glow.

### 5. Reverence (Habakkuk 2:20)
"Let all the earth keep silence before Him." Generous whitespace (`.reverence` adds 6rem→10rem vertical padding). No clutter. Section transitions feel like turning a page of an illuminated manuscript.

### Sacred Components

Always available from `@/components/sacred`:
- `<LightBeam intensity="soft|medium|bold" />` — divine light overlay (drop into hero sections)
- `<BreathingDot variant="accent|foreground|muted" />` — living dot
- `<ScriptureRef verse="..." reference="..." size="sm|md|lg|xl" align="left|center" />` — Bible verse rendering
- `<VeilDivider label?="..." />` — horizontal sacred divider
- `<SacredEyebrow>...</SacredEyebrow>` — reverent eyebrow label with breathing dot
- `<FlamePulse size?={18} />` — Pentecost flame
- `<CrossWatermark opacity?={0.04} />` — massive background cross

### Sacred Utility Classes (CSS)

- `.light-beam` — wraps a section with subtle ambient light from top
- `.sacred-grain` — adds paper/parchment grain overlay (3.5% opacity, mix-blend overlay)
- `.veil-divider` — horizontal gradient line, accent in the middle
- `.ink-fill` — underline that fills like ink on Scripture references
- `.glory` — anointing glow shadow, brightens on hover
- `.sanctuary` — primary-bg dark section with bottom red glow
- `.cross-watermark` — adds massive transparent cross behind content
- `.reverence` — generous vertical breathing room
- `.breathe`, `.breathe-soft` — breath animations
- `.anoint` — flame-pulse animation
- `.heartbeat` — heartbeat for live indicators
- `.ascend` — text reveal from below with blur

### Sacred Animation Tokens

- `--ease-divine`: cubic-bezier(0.16, 1, 0.3, 1) — quick in, graceful out
- `--ease-breath`: cubic-bezier(0.4, 0, 0.6, 1) — symmetric breath
- `--breath-cycle`: 5s
- `--anoint-cycle`: 3s
- `--ascension`: 1.4s

All sacred motion respects `prefers-reduced-motion`.

### Required on Every Major Section

1. **Eyebrow with `<SacredEyebrow>`** — the reverent prefix
2. **At least one moment of breath** — a breathing dot, a fading element, or animate-breath
3. **At least one anchor of fire** — a red accent (cross, flame, anoint button, accent line)
4. **Generous whitespace** — `.reverence` or `py-24 md:py-32` minimum
5. **Light or dark intentional contrast** — never neutral gray-on-gray; always sanctuary-dark or open-light

### What this is NOT

- Not "religious clip-art" or kitsch crosses everywhere — symbols are *whispers*, not shouts
- Not anxious, busy, or aggressive — never sales-funnel patterns
- Not generic SaaS template polish — never "Notion meets Stripe"
- Not flashy motion — every animation is breath-paced (3-5s minimum cycles)

## Color Palette

### Light Mode (default)

| Token | HSL | Role |
|---|---|---|
| `--background` | `0 0% 98%` | Off-white — page background |
| `--foreground` | `0 0% 10%` | Near-black — body text |
| `--primary` | `0 0% 0%` | Black — buttons, headers |
| `--primary-foreground` | `0 0% 100%` | White — text on black |
| `--accent` | `1 100% 44%` | Signal red #E10600 — CTAs, highlights, icons |
| `--accent-foreground` | `0 0% 100%` | White — text on red |
| `--accent-soft` | `0 100% 97%` | Pale red tint — subtle backgrounds |
| `--secondary` | `0 0% 95%` | Soft gray — secondary surfaces |
| `--muted` | `0 0% 91%` | Light gray — disabled, placeholders |
| `--muted-foreground` | `0 0% 48%` | Mid-gray — secondary text |
| `--border` | `0 0% 82%` | Cool gray — dividers |
| `--ring` | `1 100% 44%` | Red — focus rings |

### Dark Mode

| Token | HSL | Role |
|---|---|---|
| `--background` | `0 0% 4%` | Near-black |
| `--foreground` | `0 0% 95%` | Off-white — body text |
| `--primary` | `1 100% 44%` | Red — primary in dark mode |
| `--card` | `0 0% 8%` | Dark surface — card bg |

### Named Gradients

```css
--gradient-hero:  linear-gradient(135deg, hsl(0 0% 0% / 0.80), hsl(0 0% 0% / 0.45))
--gradient-gold:  linear-gradient(135deg, hsl(1 100% 44%), hsl(0 100% 35%))
--gradient-navy:  linear-gradient(135deg, hsl(0 0% 0%), hsl(0 0% 12%))
--gradient-soft:  linear-gradient(180deg, hsl(0 0% 98%), hsl(0 0% 95%))
```

### Shadows

```css
--shadow-soft:    0 4px 24px -8px hsl(0 0% 0% / 0.10)
--shadow-elegant: 0 20px 60px -20px hsl(0 0% 0% / 0.20)
--shadow-gold:    0 10px 40px -10px hsl(1 100% 44% / 0.40)
```

## Typography

| Role | Font | Usage |
|---|---|---|
| Display / headings | **Cormorant Garamond** — `font-display` | Hero titles, section headings, sermon titles |
| Body / UI | **Inter** — `font-sans` | Paragraphs, labels, navigation, buttons |

- Display text: large, high contrast, generous line-height
- Body text: comfortable reading size (16–18px), mid-weight

## Spacing & Radius

- Border radius: `0.75rem` (lg) — rounded, not pill-shaped
- Container max-width: `1400px` (2xl), centered, `2rem` padding
- Section padding: generous — `4–6rem` vertical

## Motion

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out-soft`) — quick in, graceful out
- **Animations**: `fade-in` (0.7s), `fade-in-slow` (1.2s), `scale-in` (0.5s), `slow-zoom` (18s)
- Use `animate-fade-in` for page entry, `animate-scale-in` for modal/dialog entry
- `animate-slow-zoom` is used on hero background images only

## Component Conventions

### Buttons

- Primary: `bg-primary text-primary-foreground` (black bg, white text) — main CTAs
- Red accent: `bg-accent text-accent-foreground` — secondary CTAs, donation buttons
- Outline: black border on off-white bg — tertiary actions
- Icon buttons: red icons on black or transparent

### Cards

- Light surface: `bg-card shadow-soft rounded-lg`
- Feature cards: black bg (`bg-primary`) with white text and red accent bar
- Hover: lift with `shadow-elegant` + subtle scale

### Hero Sections

- Full-width, photo bg with `--gradient-hero` overlay
- Display font for headline, generous size (`clamp(2.5rem, 6vw, 5rem)`)
- Red accent underline or border on headline
- CTA buttons stacked or inline

### Navigation

- Sticky nav: black bg, white links, red active state
- Mobile: hamburger → full-height sheet, black bg

## Tone

Reverent, welcoming, and dignified. Avoid aggressive dark patterns. Prefer generous whitespace over tight layouts. Every page should feel like entering a calm, well-kept space.
