import {
  Cross,
  Sparkles,
  Flame,
  HandCoins,
  Heart,
  Compass,
  Wind,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import type { TestimonyCategory } from "@/data/testimonies";

/**
 * Each category gets a Lucide icon and a CSS-token-driven accent.
 * No emojis — Lucide line icons only, per project policy.
 */
export const CATEGORY_META: Record<
  TestimonyCategory,
  { icon: LucideIcon; tone: string }
> = {
  salvation: { icon: Cross, tone: "text-foreground" },
  healing: { icon: Sparkles, tone: "text-accent" },
  deliverance: { icon: Flame, tone: "text-accent" },
  provision: { icon: HandCoins, tone: "text-foreground" },
  family: { icon: Heart, tone: "text-accent" },
  calling: { icon: Compass, tone: "text-foreground" },
  restoration: { icon: Wind, tone: "text-accent" },
  hope: { icon: Sunrise, tone: "text-accent" },
};
