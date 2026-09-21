import { readFileSync } from "node:fs";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../app/page";
import { appSourceFiles, globalsCss } from "./helpers";

describe("dark and light mode are gone", () => {
  it("never sets a data-theme attribute in the rendered tree", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("[data-theme]")).toHaveLength(0);
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("offers no theme toggle", () => {
    const { container } = render(<Home />);
    const controls = Array.from(container.querySelectorAll("button")).map(
      (button) => `${button.getAttribute("aria-label") ?? ""}${button.textContent ?? ""}`,
    );
    expect(controls.join(" ").toLowerCase()).not.toContain("theme");
  });

  it("keeps no theme selectors in the stylesheet", () => {
    expect(globalsCss).not.toContain("[data-theme");
    expect(globalsCss).not.toContain(".theme-toggle");
    expect(globalsCss).not.toContain("prefers-color-scheme");
  });

  it("persists no theme choice anywhere in the source", () => {
    for (const file of appSourceFiles()) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toContain("brilliance-theme");
      expect(source).not.toContain("dataset.theme");
      expect(source).not.toContain("localStorage");
    }
  });
});
