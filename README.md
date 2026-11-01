# Hinglish Creator Toolkit

Small, open-source **TypeScript utilities for Hinglish creators** — the small everyday helpers I kept needing while running a music label and building [Mimu](https://github.com/motivationp81-star/mimu), my Hinglish AI assistant.

Most creator tools are English-first. These are built for creators who think and post in **Hinglish** (Hindi + English).

## What's inside

- 🎬 **YouTube title checker** — checks a title against YouTube's 100-character limit (counts real characters, including Hindi text) and tells you exactly how much to trim
- ✍️ **Caption maker** — ready Hinglish caption lines by mood (happy, romantic, sad, energetic, devotional) for songs, reels and posts
- #️⃣ **Hashtag suggester** — builds a clean, deduplicated hashtag set from your topic

## Quick start

```bash
git clone https://github.com/motivationp81-star/hinglish-creator-toolkit.git
cd hinglish-creator-toolkit
npm install
npm run demo
```

## Use the CLI

```bash
npm run cli -- --topic "naya rasiya song" --mood energetic --title "Mera Naya Song | Official Video"
```

## Use it in code

```ts
import { checkYouTubeTitle, makeCaption, suggestHashtags } from "./src/toolkit";

checkYouTubeTitle("Mera Naya Song | Official Video");
// { ok: true, length: 31, limit: 100, ... }

makeCaption("naya rasiya song", "energetic");
// "naya rasiya song — energy level 100% 🚀 Nachne par majboor kar dega!"

suggestHashtags("naya rasiya song");
// ["#hinglish", "#desicreator", "#india", "#naya", "#rasiya", "#song"]
```

## Tests

```bash
npm test
```

## Project status

A small, early-stage open-source project by **Pradeep Meena** (AI builder; founder, RS WORLDWIDE MUSIC). Ideas and contributions are welcome — open an issue.

## License

MIT — see the `LICENSE` file.
