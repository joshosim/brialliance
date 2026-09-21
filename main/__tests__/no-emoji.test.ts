import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { appSourceFiles } from "./helpers";

/** Real emoji and pictographs. */
const EMOJI = /\p{Extended_Pictographic}/u;
/** Arrow glyphs such as → ↗ ← ↑ ↓, which Lucide icons replace. */
const ARROWS = /[←-⇿⬀-⯿]/u;
/** Emoji variation selector. */
const VARIATION_SELECTOR = /️/u;

/**
 * ©, ® and ™ carry the Extended_Pictographic property but are typographic
 * marks rather than emoji, so they are allowed through.
 */
const ALLOWED_MARKS = /[©®™]/g;

const files = [
  ...appSourceFiles(),
  path.join(process.cwd(), "public", "images", "favicon.svg"),
];

describe("no emoji and no hand-drawn arrow glyphs", () => {
  it("covers the whole app", () => {
    expect(files.length).toBeGreaterThan(5);
  });

  it.each(files)("%s is clean", (file) => {
    const source = readFileSync(file, "utf8").replace(ALLOWED_MARKS, "");
    expect(source).not.toMatch(EMOJI);
    expect(source).not.toMatch(ARROWS);
    expect(source).not.toMatch(VARIATION_SELECTOR);
  });
});
