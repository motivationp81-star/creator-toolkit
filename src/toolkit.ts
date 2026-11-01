/**
 * Hinglish Creator Toolkit
 * Small utilities for creators who post in Hinglish (Hindi + English):
 * a YouTube title checker, a caption maker and a hashtag suggester.
 */

// ---------------------------------------------------------------------------
// 1. YouTube title checker
// ---------------------------------------------------------------------------

export interface TitleCheck {
  title: string;
  /** Character count (Unicode code points, so Hindi text counts correctly). */
  length: number;
  limit: number;
  ok: boolean;
  message: string;
}

/**
 * Check a YouTube title against the platform's character limit (100).
 * Counts Unicode code points, so a Devanagari title is measured the same
 * way a viewer reads it — not by bytes.
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
// 2. Hinglish caption maker
// ---------------------------------------------------------------------------

export type Mood = "happy" | "romantic" | "sad" | "energetic" | "devotional";

const CAPTION_TEMPLATES: Record<Mood, string[]> = {
  happy: [
    "{topic} aa gaya hai! Mood full fresh ho jayega, sunna mat bhoolna 🎵",
    "Khushi wala din aur {topic} — isse better combo nahi hota 😊",
    "{topic} ke saath aaj ka din ban gaya! Apno ko tag karo 👇",
  ],
  romantic: [
    "Dil ki baat, {topic} ke saath ❤️ Kisi khaas ko bhejna mat bhoolna",
    "{topic} sunke uski yaad aa gayi... 💕",
    "Mohabbat ho to aisi — {topic} dil ko chhu jayega ❤️",
  ],
  sad: [
    "Kuch kahaniyan adhuri reh jati hain... {topic} 💔",
    "{topic} — dard bhi kabhi kabhi sukoon deta hai 🥀",
    "Aankhein nam ho jayengi, {topic} sunke 💧",
  ],
  energetic: [
    "{topic} ke liye speaker full volume par! 🔥 Ye wala miss mat karna",
    "Full Josh Mode ON ⚡ {topic} ne scene badal diya!",
    "{topic} — energy level 100% 🚀 Nachne par majboor kar dega!",
  ],
  devotional: [
    "Jai ho! {topic} ke saath din ki shuruaat bhakti ke saath 🙏",
    "{topic} sunke mann ko shanti mili 🕉️ Jai Shri Krishna",
    "Bhakti ka rang, {topic} ke sang 🙏✨",
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

const BASE_TAGS = ["#hinglish", "#desicreator", "#india"];

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
