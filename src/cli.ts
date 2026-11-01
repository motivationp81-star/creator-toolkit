/**
 * Creator Toolkit — CLI
 *
 * Usage:
 *   npm run cli -- --topic "my new cover song" --mood energetic --title "My Title"
 */
import { checkYouTubeTitle, makeCaption, suggestHashtags, type Mood } from "./toolkit";

function argValue(flag: string): string | undefined {
  const args = process.argv.slice(2);
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

const topic = argValue("--topic") ?? "my new video";
const mood = (argValue("--mood") ?? "happy") as Mood;
const title = argValue("--title");

console.log("✍️  Caption:");
console.log(makeCaption(topic, mood));
console.log("\n#️⃣  Hashtags:");
console.log(suggestHashtags(topic).join(" "));
if (title) {
  const check = checkYouTubeTitle(title);
  console.log("\n🎬 Title check:");
  console.log(`"${title}"`);
  console.log(check.message);
}
