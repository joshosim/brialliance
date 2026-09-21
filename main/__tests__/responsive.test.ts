import { describe, expect, it } from "vitest";
import { globalsCss } from "./helpers";

/** Pull one breakpoint's block out of the stylesheet. */
function mediaBlock(width: string): string {
  const marker = `@media (max-width: ${width})`;
  const start = globalsCss.indexOf(marker);
  expect(start, `${marker} is missing`).toBeGreaterThan(-1);
  const rest = globalsCss.slice(start);
  const next = rest.indexOf("@media", 1);
  return next === -1 ? rest : rest.slice(0, next);
}

describe("responsive layout", () => {
  it("declares a tablet, a mobile and a small-phone breakpoint", () => {
    expect(globalsCss).toContain("@media (max-width: 1080px)");
    expect(globalsCss).toContain("@media (max-width: 800px)");
    expect(globalsCss).toContain("@media (max-width: 520px)");
  });

  it("keeps the container fluid instead of fixed-width", () => {
    expect(globalsCss).toMatch(/\.container\s*\{[^}]*width:\s*min\(/s);
    expect(globalsCss).not.toMatch(/\.container\s*\{[^}]*width:\s*\d+px/s);
  });

  it("never lets a wide child create horizontal scroll", () => {
    expect(globalsCss).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/s);
    expect(globalsCss).toMatch(/img,\s*svg\s*\{[^}]*max-width:\s*100%/s);
  });

  it("collapses every multi-column grid on a small phone", () => {
    const small = mediaBlock("520px");
    for (const selector of [
      ".hero-box",
      ".form-grid",
      ".service-list",
      ".fleet-grid",
      ".gallery-grid",
      ".stats-grid",
      ".footer-grid",
    ]) {
      expect(small, `${selector} should collapse`).toContain(selector);
    }
    expect(small).toContain("grid-template-columns: 1fr;");
  });

  it("stacks the side-by-side sections before they get cramped", () => {
    const tablet = mediaBlock("800px");
    for (const selector of [
      ".hero-grid",
      ".why-grid",
      ".editorial",
      ".booking-layout",
      ".contact-layout",
      ".service-detail-layout",
    ]) {
      expect(tablet, `${selector} should stack`).toContain(selector);
    }
  });

  it("swaps the header for a burger on mobile", () => {
    const mobile = mediaBlock("800px");
    expect(mobile).toMatch(/\.menu-toggle\s*\{[^}]*display:\s*grid/s);
    expect(mobile).toMatch(/\.nav-links\s*\{/);
    expect(globalsCss).toMatch(/\.menu-toggle\s*\{[^}]*display:\s*none/s);
  });

  it("drops to two columns on a tablet", () => {
    const tablet = mediaBlock("1080px");
    expect(tablet).toContain("repeat(2, minmax(0, 1fr))");
  });

  it("lets anchored sections clear the sticky header", () => {
    expect(globalsCss).toMatch(
      /\.page-section\s*\{[^}]*scroll-margin-top:\s*var\(--header-height\)/s,
    );
  });

  it("honours a reduced-motion preference", () => {
    expect(globalsCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(globalsCss).toContain(
      "@media (prefers-reduced-motion: no-preference)",
    );
  });
});
