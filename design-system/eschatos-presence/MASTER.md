# Design System Master File — Eschatos Presence

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
> Also read `DESIGN.md` at the project root for full visual direction.

---

**Project:** Eschatos Presence
**Updated:** 2026-04-28
**Category:** Church / Ministry Organization
**Stack:** React 18 + Vite + Tailwind CSS + shadcn/ui

---

## Global Rules

### Color Palette (Light Mode — Default)

| Role | HSL | Hex approx. | CSS Variable | Tailwind |
|------|-----|-------------|---|---|
| Background | `0 0% 98%` | `#FAFAFA` | `--background` | `bg-background` |
| Foreground | `0 0% 10%` | `#1A1A1A` | `--foreground` | `text-foreground` |
| Primary (black) | `0 0% 0%` | `#000000` | `--primary` | `bg-primary` |
| Primary Foreground | `0 0% 100%` | `#FFFFFF` | `--primary-foreground` | `text-primary-foreground` |
| Accent (signal red) | `1 100% 44%` | `#E10600` | `--accent` | `bg-accent` |
| Accent Foreground | `0 0% 100%` | `#FFFFFF` | `--accent-foreground` | `text-accent-foreground` |
| Accent Soft | `0 100% 97%` | `#FFF0F0` | `--accent-soft` | — |
| Secondary (soft gray) | `0 0% 95%` | `#F2F2F2` | `--secondary` | `bg-secondary` |
| Muted | `0 0% 91%` | `#E8E8E8` | `--muted` | `bg-muted` |
| Muted Foreground | `0 0% 48%` | `#7A7A7A` | `--muted-foreground` | `text-muted-foreground` |
| Border | `0 0% 82%` | `#D1D1D1` | `--border` | `border-border` |
| Ring (focus) | `1 100% 44%` | `#E10600` | `--ring` | — |
| Destructive | `1 100% 44%` | `#E10600` | `--destructive` | `text-destructive` |

### Color Palette (Dark Mode)

| Role | HSL | CSS Variable |
|------|-----|---|
| Background | `0 0% 4%` | `--background` |
| Foreground | `0 0% 95%` | `--foreground` |
| Primary (red in dark) | `1 100% 44%` | `--primary` |
| Card | `0 0% 8%` | `--card` |

**Rule:** Never use raw hex in components. Always use CSS variables or semantic Tailwind tokens.

### Typography

- **Display / Headings:** `font-display` → **Cormorant Garamond** (serif) — `font-family: 'Cormorant Garamond', ui-serif, Georgia`
- **Body / UI:** `font-sans` → **Inter** — `font-family: 'Inter', ui-sans-serif, system-ui`
- **Size scale:** 12 → 14 → 16 → 18 → 24 → 32 → 48 → 72px (clamp for hero)
- **Body line-height:** 1.6–1.75
- **Min body size:** 16px (never below on mobile — prevents iOS auto-zoom)
- **Display tracking:** `-0.02em` to `-0.04em` for large headings

### Named Gradients (use via Tailwind `bg-gradient-*`)

```css
--gradient-hero: linear-gradient(135deg, hsl(0 0% 0% / 0.80), hsl(0 0% 0% / 0.45))
--gradient-gold: linear-gradient(135deg, hsl(1 100% 44%), hsl(0 100% 35%))
--gradient-navy: linear-gradient(135deg, hsl(0 0% 0%), hsl(0 0% 12%))
--gradient-soft: linear-gradient(180deg, hsl(0 0% 98%), hsl(0 0% 95%))
```

### Shadows

```css
--shadow-soft:    0 4px 24px -8px hsl(0 0% 0% / 0.10)    /* cards */
--shadow-elegant: 0 20px 60px -20px hsl(0 0% 0% / 0.20)  /* modals, featured */
--shadow-gold:    0 10px 40px -10px hsl(1 100% 44% / 0.40) /* red CTAs */
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps, inline |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `32px` | Large gaps |
| `--space-2xl` | `48px` | Section margins |
| `--space-3xl` | `64–96px` | Hero / inter-section |

### Motion

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out-soft`) — quick in, graceful out
- **Micro-interactions:** 150–300ms
- **Page entries:** `animate-fade-in` (0.7s), `animate-fade-in-slow` (1.2s)
- **Scale entry:** `animate-scale-in` (0.5s)
- **Hero image:** `animate-slow-zoom` (18s) — background images only
- **Always:** respect `prefers-reduced-motion`

### Border Radius

- Default: `0.75rem` (12px) — `rounded-lg`
- Tight: `calc(0.75rem - 2px)` — `rounded-md`
- Pill buttons: `9999px` — `rounded-full`

---

## Component Specs

### Buttons

```css
/* Primary — black bg, white text */
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 12px 24px;
  border-radius: 0.75rem;
  font-family: Inter;
  font-weight: 600;
  transition: all 200ms cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: var(--shadow-elegant); }

/* Red accent — for donations, CTAs */
.btn-red {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  box-shadow: var(--shadow-gold);
}
```

### Cards

```css
.card {
  background: hsl(var(--card));
  border-radius: 0.75rem;
  padding: 24px;
  box-shadow: var(--shadow-soft);
  transition: box-shadow 200ms ease, transform 200ms ease;
}
.card:hover { box-shadow: var(--shadow-elegant); transform: translateY(-2px); }
```

### Hero Sections

- Full-width photo bg + `bg-gradient-hero` overlay (ensures contrast ≥ 4.5:1)
- Headline: `font-display` (Cormorant Garamond), `clamp(2.5rem, 6vw, 5rem)`, tracking tight
- Subline: `font-sans` (Inter), 18–20px, `text-primary-foreground/80`
- Red accent element (underline, border-left, icon) on headline
- CTA: primary black button + optional red outline button

### Navigation

- Sticky: `bg-primary` (black), white links, red active state
- Mobile: hamburger → full-height sheet, black bg
- Active link: red color + optional bottom border `border-b-2 border-accent`

### Forms / Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  font-size: 16px;
  background: hsl(var(--background));
  transition: border-color 200ms ease;
}
.input:focus {
  border-color: hsl(var(--accent));
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--accent) / 0.2);
}
```

---

## Page Structure (Church Website)

**Section Order:**
1. Hero (mission statement, hero image, red CTA)
2. Services / Ministries (cards, black section)
3. Featured Sermon (video embed with thumbnail)
4. Upcoming Events (timeline or card grid)
5. About / Leadership (editorial, photos)
6. Donate / Get Involved (red accent section)
7. Contact + Map (off-white bg)
8. Footer (black bg)

---

## Style Guidelines

**Style Direction:** Minimal Luxury / Editorial — stark, solemn, welcoming
**Tone:** Reverent, dignified, never aggressive
**Whitespace:** Generous — prefer breathing room over density

**Must Have on Every Page:**
- Hierarchy through scale contrast (display font vs body)
- At least one red accent element per section
- Smooth scroll behavior (`html { scroll-behavior: smooth; }`)
- Focus rings visible (3–4px, red color)

---

## Sacred Atmosphere

The site is not a brochure — it is a sanctuary. Every visitor should *feel* the presence of God. The visual palette stays the same (black + signal red `#E10600` + off-white), but the *atmosphere* and *interaction language* embody God's presence. We translate this into design through five pillars.

### 1. Light (Genesis 1:3)
Divine presence breaks through. Hero sections use `bg-gradient-light-beam` (radial light from top) and the `.light-beam` utility class. Subtle white radial gradient mimics sun rays through stained glass.

### 2. Breath (Genesis 2:7 · John 20:22)
Living elements *breathe*. Logos, eyebrows, accent dots, indicators use `animate-breath` (5s cycle) — opacity 0.7→1, gentle scale 1.0→1.015. Reveals reality of the Spirit.

### 3. Word (John 1:1)
Scripture is the most important content type. Display verses are rendered with `<ScriptureRef>` — Cormorant Garamond at `clamp(2rem→6rem)`, tracking `-0.02em`, with reference uppercase tracked at `0.32em`.

### 4. Fire (Acts 2)
Pentecost flame. Red accents pulse with `animate-anoint` (3s flame box-shadow). Live indicators use `animate-heartbeat`. CTAs that matter spiritually (donate, join) use `.glory` class for anointing glow.

### 5. Reverence (Habakkuk 2:20)
"Let all the earth keep silence before Him." Generous whitespace (`.reverence` adds 6rem→10rem vertical padding). No clutter. Section transitions feel like turning a page of an illuminated manuscript.

### Sacred Components

Always available from `@/components/sacred`:

| Component | Purpose |
|-----------|---------|
| `<LightBeam intensity="soft\|medium\|bold" />` | Divine light overlay (drop into hero sections) |
| `<BreathingDot variant="accent\|foreground\|muted" />` | Living, breathing dot |
| `<ScriptureRef verse="..." reference="..." size="sm\|md\|lg\|xl" align="left\|center" />` | Bible verse rendering |
| `<VeilDivider label?="..." />` | Horizontal sacred divider |
| `<SacredEyebrow>...</SacredEyebrow>` | Reverent eyebrow label with breathing dot |
| `<FlamePulse size?={18} />` | Pentecost flame icon |
| `<CrossWatermark opacity?={0.04} />` | Massive background cross |

### Sacred Utility Classes (CSS)

| Class | Purpose |
|-------|---------|
| `.light-beam` | Wraps a section with subtle ambient light from top |
| `.sacred-grain` | Paper/parchment grain overlay (3.5% opacity, mix-blend overlay) |
| `.veil-divider` | Horizontal gradient line, accent in the middle |
| `.ink-fill` | Underline that fills like ink on Scripture references |
| `.glory` | Anointing glow shadow, brightens on hover |
| `.sanctuary` | Primary-bg dark section with bottom red glow |
| `.cross-watermark` | Adds massive transparent cross behind content |
| `.reverence` | Generous vertical breathing room |
| `.breathe`, `.breathe-soft` | Breath animations |
| `.anoint` | Flame-pulse animation |
| `.heartbeat` | Heartbeat for live indicators |
| `.ascend` | Text reveal from below with blur |

### Sacred Gradients

| Token | Purpose |
|-------|---------|
| `--gradient-light-beam` | Radial divine light from top |
| `--gradient-sanctuary` | Dark sanctuary atmosphere |
| `--gradient-flame` | Pentecost fire |
| `--gradient-veil` | Torn-veil dramatic transition |
| `--gradient-glory` | Anointing radiance |
| `--gradient-pentecost` | Multi-tongue flame gradient |

### Sacred Shadows

| Token | Purpose |
|-------|---------|
| `--shadow-anoint` | Soft flame glow for active CTAs |
| `--shadow-glory` | Anointing radiance for spiritually weighted elements |
| `--shadow-presence` | Diffuse presence — hovering reverence |

### Sacred Animation Tokens

- `--ease-divine`: `cubic-bezier(0.16, 1, 0.3, 1)` — quick in, graceful out
- `--ease-breath`: `cubic-bezier(0.4, 0, 0.6, 1)` — symmetric breath
- `--breath-cycle`: `5s`
- `--anoint-cycle`: `3s`
- `--ascension`: `1.4s`

All sacred motion respects `prefers-reduced-motion`.

### Required on Every Major Section

1. **Eyebrow with `<SacredEyebrow>`** — the reverent prefix
2. **At least one moment of breath** — a breathing dot, a fading element, or `animate-breath`
3. **At least one anchor of fire** — a red accent (cross, flame, anoint button, accent line)
4. **Generous whitespace** — `.reverence` or `py-24 md:py-32` minimum
5. **Light or dark intentional contrast** — never neutral gray-on-gray; always sanctuary-dark or open-light

### What this is NOT

- Not "religious clip-art" or kitsch crosses everywhere — symbols are *whispers*, not shouts
- Not anxious, busy, or aggressive — never sales-funnel patterns
- Not generic SaaS template polish — never "Notion meets Stripe"
- Not flashy motion — every animation is breath-paced (3–5s minimum cycles)

---

## Anti-Patterns (Do NOT Use)

- ❌ Blue/navy/indigo colors — project uses black + red, never cool tones
- ❌ Gold/yellow/orange colors — accent is signal red #E10600 only
- ❌ Emojis as icons — use Lucide React SVG icons only
- ❌ Raw hex values in components — use CSS variables
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ Layout-shifting hover transforms
- ❌ Text below 16px on mobile (body)
- ❌ Instant state changes (always 150–300ms transitions)
- ❌ Invisible focus states
- ❌ Horizontal scroll on mobile
- ❌ Content hidden behind fixed navbar (add scroll-padding-top)
- ❌ color as the only indicator (add icon/text for errors, success)
- ❌ Instant motion (< 200ms on hero/major reveals) — sacred reveals are 700ms+
- ❌ Decorative-only animation — every motion conveys meaning (breath, fire, ascension, light)
- ❌ Religious clip-art / kitsch crosses scattered everywhere — sacred symbols are whispers
- ❌ Bright/saturated tones outside black + red + off-white
- ❌ Skipping `<SacredEyebrow>` on top-level sections
- ❌ Dense text walls without breath/whitespace

---

## Pre-Delivery Checklist

- [ ] Colors use CSS variables (`hsl(var(--primary))`) not raw hex
- [ ] Display font `font-display` (Cormorant Garamond) on headings
- [ ] Body font `font-sans` (Inter) on paragraphs and UI
- [ ] All icons from Lucide React (no emojis)
- [ ] `cursor-pointer` on all interactive elements
- [ ] Hover states: 150–300ms transitions with `--ease-out-soft`
- [ ] Focus rings: `ring-2 ring-ring ring-offset-2` (red)
- [ ] Light mode contrast ≥ 4.5:1 for body text
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px — no horizontal scroll
- [ ] Scroll padding set (`scroll-padding-top`) for sticky nav
- [ ] `scroll-behavior: smooth` on `html` element
- [ ] Loading states: skeleton or spinner for async content
- [ ] Touch targets ≥ 44×44px for interactive elements
- [ ] Red accent element (signal red #E10600) present in every major section
- [ ] Every page has at least one Scripture moment (`<ScriptureRef>`)
- [ ] Every major section uses `<SacredEyebrow>`
- [ ] At least one element on screen breathes (animate-breath / breathing dot / heartbeat)
- [ ] Hero sections have `<LightBeam>` overlay
- [ ] Dark sections feel like a sanctuary (use `.sanctuary` or equivalent)
- [ ] All animations respect `prefers-reduced-motion`
