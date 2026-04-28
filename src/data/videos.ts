import payload from "./videos.json";

export interface Video {
  id: string;
  title: string;
  publishedAt: string;
  author: string;
  description: string;
  thumbnail: string;
}

export interface VideoFeed {
  channelId: string;
  fetchedAt: string | null;
  videos: Video[];
}

const FEED = payload as VideoFeed;

export const VIDEOS: Video[] = FEED.videos;
export const CHANNEL_ID = FEED.channelId;
export const FETCHED_AT = FEED.fetchedAt;

export const channelUrl = (): string =>
  `https://www.youtube.com/channel/${CHANNEL_ID}`;

export const watchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;

export const embedUrl = (videoId: string, autoplay = false): string =>
  `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}`;

/**
 * Format an ISO date as a locale-aware short string (e.g. "Apr 18, 2026" / "18 avr. 2026").
 * Falls back to the raw ISO date on invalid input.
 */
export const formatPublishedDate = (
  iso: string,
  locale: "en" | "fr" = "en",
): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
