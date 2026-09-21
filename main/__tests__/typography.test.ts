import { describe, expect, it } from "vitest";
import { globalsCss, readApp } from "./helpers";

describe("typography", () => {
  it("keeps the Work Sans webfont", () => {
    expect(globalsCss).toContain(
      "fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700",
    );
  });

  it("loads it with an @import before any other rule", () => {
    const firstRule = globalsCss.trimStart().split("\n")[0];
    expect(firstRule.startsWith("@import url(")).toBe(true);
  });

  it("still applies Work Sans to the document", () => {
    expect(globalsCss).toMatch(/font-family:\s*"Work Sans",\s*sans-serif/);
  });

  it("has not been switched to a bundled font loader", () => {
    expect(readApp("app/layout.tsx")).not.toContain("next/font");
  });

  it("scales headings fluidly rather than at fixed sizes", () => {
    expect(globalsCss).toMatch(/h1\s*\{[^}]*font-size:\s*clamp\(/s);
    expect(globalsCss).toMatch(/h2\s*\{[^}]*font-size:\s*clamp\(/s);
  });
});
