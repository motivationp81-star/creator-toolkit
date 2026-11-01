# Creator Toolkit

Small, open-source **TypeScript utilities for video creators** — the small everyday helpers I kept reaching for while posting videos: check a title before it goes live, get a caption line in the right mood, and build a clean hashtag set without the copy-paste mess.

## What's inside

- 🎬 **YouTube title checker** — checks a title against YouTube's 100-character limit (counts real characters, including emoji) and tells you exactly how much to trim
- ✍️ **Caption maker** — ready caption lines by mood (happy, romantic, sad, energetic, devotional) for songs, reels and posts
- #️⃣ **Hashtag suggester** — builds a clean, deduplicated hashtag set from your topic

## Quick start

```bash
git clone https://github.com/motivationp81-star/creator-toolkit.git
cd creator-toolkit
npm install
npm run demo
```

## Use the CLI

```bash
npm run cli -- --topic "my new cover song" --mood energetic --title "My New Song | Official Video"
```

## Use it in code

```ts
import { checkYouTubeTitle, makeCaption, suggestHashtags } from "./src/toolkit";

checkYouTubeTitle("My New Song | Official Video");
// { ok: true, length: 28, limit: 100, ... }

makeCaption("my new cover song", "energetic");
// "my new cover song — 100% energy 🚀 You will be moving before the chorus hits!"

suggestHashtags("my new cover song");
// ["#contentcreator", "#creator", "#mustwatch", "#new", "#cover", "#song"]
```

## Tests

```bash
npm test
```

## Project status

A small, early-stage open-source project by **Pradeep Meena**. Ideas and contributions are welcome — open an issue.

## License

MIT — see the `LICENSE` file.
