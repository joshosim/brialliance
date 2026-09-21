import { describe, expect, it } from "vitest";
import { globalsCss } from "./helpers";

/** Colours from the retired gold-on-navy theme that must never come back. */
const RETIRED_HEXES = [
  "#08111b",
  "#101d2a",
  "#102638",
  "#050c13",
  "#172630",
  "#e6b84d",
  "#b9821e",
  "#f7f4ee",
  "#fffdfa",
  "#eee9df",
];

/** Red, which this palette replaced. */
const RETIRED_RED = ["#d32029", "#a5151d", "#7d0f15", "#fdf4f4", "211, 32, 41"];

/**
 * Read by the stylesheet but set inline by a component rather than declared in a
 * theme block — see `app/components/motion-observer.tsx`, which stamps it per
 * element to stagger the scroll reveals.
 */
const RUNTIME_TOKENS = ["--motion-delay"];

/** Geometry shared by both themes, which is why it sits outside them. */
const SHARED_TOKENS = ["--header-height", "--radius"];

/** Pull one `{ … }` block out of the stylesheet by its selector. */
function themeBlock(selector: string): string {
  const start = globalsCss.indexOf(selector);
  expect(start, `${selector} is missing`).toBeGreaterThan(-1);
  return globalsCss.slice(start, globalsCss.indexOf("}", start));
}

/** Every custom property a block declares. */
function tokensIn(block: string): string[] {
  return Array.from(block.matchAll(/(--[a-z-]+):/g), (match) => match[1]).sort();
}

/** Every custom property the stylesheet reads. */
function tokensUsed(): Set<string> {
  return new Set(Array.from(globalsCss.matchAll(/var\((--[a-z-]+)/g), (m) => m[1]));
}

const light = themeBlock(':root,\n:root[data-theme="light"]');
const dark = themeBlock(':root[data-theme="dark"]');

describe("palette", () => {
  it("declares the same tokens in both themes", () => {
    // The characteristic dual-theme bug is a token added to one block only. It is
    // invisible until somebody opens dark mode, so it is worth pinning here.
    expect(tokensIn(light)).toEqual(tokensIn(dark));
    expect(tokensIn(light).length).toBeGreaterThan(10);
  });

  it("defines every token it reads", () => {
    const defined = new Set([
      ...tokensIn(light),
      ...tokensIn(dark),
      ...RUNTIME_TOKENS,
      ...SHARED_TOKENS,
    ]);
    for (const token of tokensUsed()) {
      expect(defined, `${token} is used but never defined`).toContain(token);
    }
  });

  it("paints a white page with black text in light mode", () => {
    expect(light).toContain("--page: #ffffff");
    expect(light).toContain("--text: #000000");
    expect(light).toContain("--accent: #0b7a3b");
  });

  it("paints a near-black page with green accents in dark mode", () => {
    expect(dark).toContain("--page: #0b0f0c");
    expect(dark).toContain("--text: #f2f5f2");
    expect(dark).toContain("--accent: #34d07a");
  });

  it("keeps the dark accent a foreground, never a solid", () => {
    // White on #34d07a is 2:1, so the dark theme needs a second, darker green for
    // filled surfaces. The two greens diverging in dark mode is the whole reason
    // `--accent` and `--accent-solid` exist as separate tokens; if they were ever
    // collapsed back into one, this is where it would show.
    expect(light).toContain("--accent-solid: #0b7a3b");
    expect(dark).toContain("--accent-solid: #1a7a49");
    expect(dark).not.toContain("--accent-solid: #34d07a");
  });

  it("keeps text on a solid green white in both themes", () => {
    expect(light).toContain("--on-accent: #ffffff");
    expect(dark).toContain("--on-accent: #ffffff");
  });

  it("lets the browser theme its own controls", () => {
    expect(light).toContain("color-scheme: light");
    expect(dark).toContain("color-scheme: dark");
  });

  it("has retired red entirely", () => {
    const lower = globalsCss.toLowerCase();
    for (const red of RETIRED_RED) {
      expect(lower, `${red} is still in the stylesheet`).not.toContain(red);
    }
    expect(lower).not.toContain("--red");
  });

  it("keeps the retired theme colours out", () => {
    const lower = globalsCss.toLowerCase();
    for (const hex of RETIRED_HEXES) {
      expect(lower, `${hex} is still in the stylesheet`).not.toContain(hex);
    }
  });

  it("reserves the accent for accents, and solids for filled areas", () => {
    expect(globalsCss).toMatch(/\.eyebrow\s*\{[^}]*color:\s*var\(--accent\)/);
    expect(globalsCss).toMatch(/\nem\s*\{[^}]*color:\s*var\(--accent\)/);
    expect(globalsCss).toMatch(/footer\s*\{[^}]*background:\s*var\(--accent-dark\)/);
    expect(globalsCss).toMatch(/\.cta\s*\{[^}]*background:\s*var\(--accent-solid\)/);
    expect(globalsCss).toMatch(
      /\.button-primary\s*\{[^}]*background:\s*var\(--accent-solid\)/,
    );
  });

  it("is flat colour, with no gradients", () => {
    // The hero wash and the accent bar were both gradients; the design is flat.
    expect(globalsCss).not.toContain("gradient(");
  });

  it("paints the page, not a card, with the page colour", () => {
    expect(globalsCss).toMatch(/body\s*\{[^}]*background:\s*var\(--page\)/);
    expect(globalsCss).toMatch(/body\s*\{[^}]*color:\s*var\(--text\)/);
  });
});
