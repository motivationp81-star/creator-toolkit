/**
 * Creator Toolkit
 * Small utilities for video creators: a YouTube title checker,
 * a caption maker and a hashtag suggester.
 */

// ---------------------------------------------------------------------------
// 1. YouTube title checker
// ---------------------------------------------------------------------------

export interface TitleCheck {
  title: string;
  /** Character count (Unicode code points, so emoji count correctly). */
  length: number;
  limit: number;
  ok: boolean;
  message: string;
}

/**
 * Check a YouTube title against the platform's character limit (100).
 * Counts Unicode code points, so a title is measured the same way a
 * viewer reads it — not by bytes.
 */
export function checkYouTubeTitle(title: string, limit = 100): TitleCheck {
  const length = [...title.trim()].length;
  const ok = length > 0 && length <= limit;
  const message = ok
    ? `OK — ${length}/${limit} characters.`
    : length === 0
      ? "Title is empty."
      : `Too long — ${length}/${limit} characters. Shorten it by ${length - limit}.`;
  return { title, length, limit, ok, message };
}

// ---------------------------------------------------------------------------
// 2. Caption maker
// ---------------------------------------------------------------------------

export type Mood = "happy" | "romantic" | "sad" | "energetic" | "devotional";

const CAPTION_TEMPLATES: Record<Mood, string[]> = {
  happy: [
    "{topic} is out now! This one will brighten your day 🎵 Don't miss it",
    "A good day + {topic} — the perfect combo 😊",
    "{topic} just made today better! Tag someone who needs this 👇",
  ],
  romantic: [
    "Straight from the heart — {topic} ❤️ Send this to someone special",
    "{topic} reminded me of someone... 💕",
    "Some feelings need a song — {topic} says it all ❤️",
  ],
  sad: [
    "Some stories stay unfinished... {topic} 💔",
    "{topic} — sometimes the sad ones heal the most 🥀",
    "Keep a tissue nearby for this one. {topic} 💧",
  ],
  energetic: [
    "Turn the volume ALL the way up for {topic}! 🔥 Don't miss this one",
    "Full energy mode: ON ⚡ {topic} just changed the game!",
    "{topic} — 100% energy 🚀 You will be moving before the chorus hits!",
  ],
  devotional: [
    "Start the day with blessings 🙏 {topic}",
    "{topic} brought a moment of peace today 🕊️",
    "Faith, hope and {topic} 🙏✨",
  ],
};

/** Pick a caption template deterministically, so the same topic always
 *  gives the same caption (handy for testing and for repeat posts). */
export function makeCaption(topic: string, mood: Mood = "happy"): string {
  const clean = topic.trim();
  const templates = CAPTION_TEMPLATES[mood];
  let hash = 0;
  for (const ch of clean) hash = (hash * 31 + ch.codePointAt(0)!) % 997;
  const template = templates[hash % templates.length];
  return template.replaceAll("{topic}", clean);
}

// ---------------------------------------------------------------------------
// 3. Hashtag suggester
// ---------------------------------------------------------------------------

const BASE_TAGS = ["#contentcreator", "#creator", "#mustwatch"];

/**
 * Build a clean hashtag list from a topic: base tags + one tag per topic
 * word, deduplicated, lowercased, capped at 10.
 */
export function suggestHashtags(topic: string, extra: string[] = []): string[] {
  const words = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .map((w) => `#${w}`);
  const extras = extra.map((t) => (t.startsWith("#") ? t.toLowerCase() : `#${t.toLowerCase()}`));
  return [...new Set([...BASE_TAGS, ...words, ...extras])].slice(0, 10);
}
