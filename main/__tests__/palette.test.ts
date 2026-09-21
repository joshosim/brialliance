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

describe("one palette: red, white, black", () => {
  it("defines the red, white and black tokens", () => {
    expect(globalsCss).toContain("--red: #d32029");
    expect(globalsCss).toContain("--white: #ffffff");
    expect(globalsCss).toContain("--black: #000000");
  });

  it("keeps the retired theme colours out", () => {
    const lower = globalsCss.toLowerCase();
    for (const hex of RETIRED_HEXES) {
      expect(lower, `${hex} is still in the stylesheet`).not.toContain(hex);
    }
  });

  it("paints a white page with black text", () => {
    expect(globalsCss).toMatch(/body\s*\{[^}]*background:\s*var\(--white\)/);
    expect(globalsCss).toMatch(/body\s*\{[^}]*color:\s*var\(--black\)/);
  });

  it("reserves red for accents and full-bleed bands", () => {
    expect(globalsCss).toMatch(/\.eyebrow\s*\{[^}]*color:\s*var\(--red\)/);
    expect(globalsCss).toMatch(/em\s*\{[^}]*color:\s*var\(--red\)/);
    expect(globalsCss).toMatch(/\.red-band\s*\{[^}]*background:\s*var\(--red\)/);
    expect(globalsCss).toMatch(/footer\s*\{[^}]*background:\s*var\(--red-dark\)/);
  });

  it("defines no alternate colour scheme", () => {
    expect(globalsCss).not.toContain("[data-theme");
    expect(globalsCss).not.toContain("prefers-color-scheme");
    expect(globalsCss).not.toContain("color-scheme");
  });
});
