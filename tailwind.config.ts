import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Cinzel — Roman ecclesiastical inscriptions (cathedrals, Pantocrator) — display
        display: ['Cinzel', 'ui-serif', 'Georgia', 'serif'],
        // Cormorant Garamond — Renaissance illuminated manuscripts — scripture verses (italic)
        editorial: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        // EB Garamond — Geneva Bible / Vatican press lineage — body, UI, paragraphs
        // (replaces Inter — every word on the site now reads like a sacred page)
        sans: ['"EB Garamond"', '"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"EB Garamond"', '"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        // Cardo — biblical scholarship typeface (Greek/Hebrew/Coptic glyphs) — liturgical labels
        liturgical: ['Cardo', 'ui-serif', 'Georgia', 'serif'],
        // Tangerine — calligraphic flourish, the wind of the Spirit — rare ornament
        script: ['Tangerine', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          soft: "hsl(var(--accent-soft))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-navy': 'var(--gradient-navy)',
        'gradient-soft': 'var(--gradient-soft)',
        'gradient-light-beam': 'var(--gradient-light-beam)',
        'gradient-sanctuary': 'var(--gradient-sanctuary)',
        'gradient-flame': 'var(--gradient-flame)',
        'gradient-veil': 'var(--gradient-veil)',
        'gradient-glory': 'var(--gradient-glory)',
        'gradient-pentecost': 'var(--gradient-pentecost)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        elegant: 'var(--shadow-elegant)',
        gold: 'var(--shadow-gold)',
        anoint: 'var(--shadow-anoint)',
        glory: 'var(--shadow-glory)',
        presence: 'var(--shadow-presence)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        breath: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.015)" },
        },
        anoint: {
          "0%, 100%": { boxShadow: "0 0 24px hsl(1 100% 44% / 0.30)" },
          "50%": { boxShadow: "0 0 60px hsl(1 100% 44% / 0.55)" },
        },
        heartbeat: {
          "0%, 60%, 100%": { transform: "scale(1)" },
          "20%": { transform: "scale(1.18)" },
          "40%": { transform: "scale(1.05)" },
        },
        ascend: {
          "0%": {
            transform: "translateY(48px)",
            opacity: "0",
            filter: "blur(10px)",
            letterSpacing: "-0.04em",
          },
          "60%": { filter: "blur(0)" },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
            filter: "blur(0)",
            letterSpacing: "-0.02em",
          },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.95" },
          "25%": { transform: "scale(1.04) rotate(-1deg)", opacity: "1" },
          "50%": { transform: "scale(0.98) rotate(0.5deg)", opacity: "0.92" },
          "75%": { transform: "scale(1.02) rotate(-0.5deg)", opacity: "0.98" },
        },
        "breath-soft": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.7s var(--ease-out-soft, ease-out) both",
        "fade-in-slow": "fade-in-slow 1.2s ease-out both",
        "scale-in": "scale-in 0.5s var(--ease-out-soft, ease-out) both",
        "slow-zoom": "slow-zoom 18s ease-out both",
        breath: "breath 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "breath-soft": "breath-soft 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        anoint: "anoint 3s ease-in-out infinite",
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
        ascend: "ascend 1.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "flame-flicker": "flame-flicker 4s ease-in-out infinite",
        "procession-rise": "procession-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "altar-pulse": "altar-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        litany: "litany 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "veil-part": "veil-part 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "benediction-pass": "benediction-pass 1.6s cubic-bezier(0.4, 0, 0.6, 1)",
        "text-rise": "text-rise 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "word-rise": "word-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "letter-settle": "letter-settle 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "title-bloom": "title-bloom 1.3s cubic-bezier(0.16, 1, 0.3, 1) both",
        "eyebrow-spread": "eyebrow-spread 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "underline-draw": "underline-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ink-rise": "ink-rise 1.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "veil-split": "veil-split 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "dropcap-breath": "dropcap-breath 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
