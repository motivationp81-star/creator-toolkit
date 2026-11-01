import assert from "node:assert/strict";
import { checkYouTubeTitle, makeCaption, suggestHashtags } from "../src/toolkit";

// Title checker: normal title passes
const ok = checkYouTubeTitle("My New Song | Official Video");
assert.equal(ok.ok, true);
assert.equal(ok.length, 28);

// Title checker: 101 characters fails with a clear message
const long = checkYouTubeTitle("a".repeat(101));
assert.equal(long.ok, false);
assert.match(long.message, /Shorten it by 1/);

// Title checker: an emoji counts as one character, not bytes or surrogates
const emoji = checkYouTubeTitle("My New Song 🎵");
assert.equal(emoji.ok, true);
assert.equal(emoji.length, [..."My New Song 🎵"].length);

// Caption maker: contains the topic and is deterministic
const c1 = makeCaption("my new cover song", "energetic");
const c2 = makeCaption("my new cover song", "energetic");
assert.ok(c1.includes("my new cover song"));
assert.equal(c1, c2);

// Hashtags: base tags present, deduplicated, capped at 10
const tags = suggestHashtags("My New Cover Song", ["#Cover"]);
assert.ok(tags.includes("#contentcreator"));
assert.ok(tags.includes("#cover"));
assert.equal(new Set(tags).size, tags.length);
assert.ok(tags.length <= 10);

console.log("All tests passed ✅");
