import assert from "node:assert/strict";
import { checkYouTubeTitle, makeCaption, suggestHashtags } from "../src/toolkit";

// Title checker: normal title passes
const ok = checkYouTubeTitle("Naya Rasiya Song | Official Video");
assert.equal(ok.ok, true);
assert.equal(ok.length, 33);

// Title checker: 101 characters fails with a clear message
const long = checkYouTubeTitle("a".repeat(101));
assert.equal(long.ok, false);
assert.match(long.message, /Shorten it by 1/);

// Title checker: Hindi (Devanagari) title counts characters, not bytes
const hindi = checkYouTubeTitle("मेरा नया गाना");
assert.equal(hindi.ok, true);
assert.equal(hindi.length, [..."मेरा नया गाना"].length);

// Caption maker: contains the topic and is deterministic
const c1 = makeCaption("naya rasiya song", "energetic");
const c2 = makeCaption("naya rasiya song", "energetic");
assert.ok(c1.includes("naya rasiya song"));
assert.equal(c1, c2);

// Hashtags: base tags present, deduplicated, capped at 10
const tags = suggestHashtags("Naya Rasiya Song", ["#Rasiya"]);
assert.ok(tags.includes("#hinglish"));
assert.ok(tags.includes("#rasiya"));
assert.equal(new Set(tags).size, tags.length);
assert.ok(tags.length <= 10);

console.log("All tests passed ✅");
