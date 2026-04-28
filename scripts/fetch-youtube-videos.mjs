#!/usr/bin/env node
// Build-time fetcher: pulls the latest 15 videos from a YouTube channel's
// public RSS feed and writes them as JSON for the SPA to consume.
//
// Why RSS over the Data API: no key required, no quota, ships latest 15
// uploads — enough to populate a sermons grid. Refreshed on every deploy.
//
// Robustness: on network/parse failure, we DO NOT fail the build — we keep
// the previously committed JSON so the site still renders. The committed
// JSON is the disaster recovery source of truth.

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCk-4mpdzU0hIpABpuL0WKcA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "videos.json",
);

/**
 * Pull the first capture group from a regex against XML, or null.
 */
const pluck = (xml, pattern) => {
  const m = xml.match(pattern);
  return m ? m[1].trim() : null;
};

/**
 * Decode the handful of XML entities that appear in YouTube titles.
 * (Not full entity decoding — RSS titles only contain &amp; &lt; &gt; &quot; &#39;.)
 */
const decodeXml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

const parseFeed = (xml) => {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries
    .map((entry) => {
      const videoId = pluck(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = pluck(entry, /<title>([\s\S]*?)<\/title>/);
      const published = pluck(entry, /<published>([^<]+)<\/published>/);
      const author = pluck(
        entry,
        /<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/,
      );
      const description = pluck(
        entry,
        /<media:description>([\s\S]*?)<\/media:description>/,
      );
      if (!videoId || !title || !published) return null;
      return {
        id: videoId,
        title: decodeXml(title),
        publishedAt: published,
        author: author ? decodeXml(author) : "",
        description: description ? decodeXml(description) : "",
        // YouTube serves these CDN URLs with no auth; hqdefault is 480x360,
        // maxresdefault may 404 on shorts/old uploads — hq is the safe pick.
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      };
    })
    .filter(Boolean);
};

const main = async () => {
  console.log(`[youtube] Fetching feed for channel ${CHANNEL_ID}…`);
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "eschatos-presence-build/1.0" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const xml = await res.text();
    const videos = parseFeed(xml);
    if (videos.length === 0) {
      throw new Error("Feed returned 0 entries (channel empty or feed format changed)");
    }
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    const payload = {
      channelId: CHANNEL_ID,
      fetchedAt: new Date().toISOString(),
      videos,
    };
    writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`[youtube] Wrote ${videos.length} videos → ${OUT_PATH}`);
  } catch (err) {
    console.warn(
      `[youtube] Fetch failed: ${err instanceof Error ? err.message : err}`,
    );
    if (existsSync(OUT_PATH)) {
      console.warn(`[youtube] Keeping existing ${OUT_PATH} (graceful fallback).`);
    } else {
      console.warn(`[youtube] No previous JSON — writing empty payload.`);
      mkdirSync(dirname(OUT_PATH), { recursive: true });
      writeFileSync(
        OUT_PATH,
        JSON.stringify(
          { channelId: CHANNEL_ID, fetchedAt: null, videos: [] },
          null,
          2,
        ) + "\n",
        "utf8",
      );
    }
    // Never break the build over a feed hiccup.
    process.exit(0);
  }
};

main();
