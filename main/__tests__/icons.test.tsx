import { readFileSync } from "node:fs";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as icons from "../app/components/icons";
import Home from "../app/page";
import NotFound from "../app/not-found";
import { capabilities, services } from "../app/lib/services";
import { appSourceFiles } from "./helpers";

/**
 * `import { A, B } from "./icons"`, on one line or several. Matching the whole
 * list matters: a name is just as missing from a multi-line import.
 */
const IMPORTS_FROM_ICONS =
  /import\s*\{([^}]+)\}\s*from\s*"(?:\.\/|\.\.\/)+(?:components\/)?icons"/g;

function importedIconNames(source: string): string[] {
  return Array.from(source.matchAll(IMPORTS_FROM_ICONS)).flatMap((match) =>
    match[1]
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
  );
}

describe("iconography comes from Lucide", () => {
  it("draws every icon with a Lucide component", () => {
    const { container } = render(<Home />);
    const rendered = Array.from(container.querySelectorAll("svg"));

    expect(rendered.length).toBeGreaterThan(0);
    for (const icon of rendered) {
      // lucide-react stamps `lucide lucide-<name>` onto every icon it renders,
      // so a hand-rolled <svg> would fail here.
      expect(icon.getAttribute("class") ?? "").toContain("lucide");
    }
  });

  it("hides decorative icons from assistive technology", () => {
    const { container } = render(<Home />);
    for (const icon of Array.from(container.querySelectorAll("svg"))) {
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("gives each capability and each service card its own icon", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll(".feature-icon")).toHaveLength(
      capabilities.length,
    );
    expect(container.querySelectorAll(".service-icon")).toHaveLength(
      services.length,
    );
  });

  it("uses the full spread of service icons", () => {
    const keys = new Set(services.map((service) => service.icon));
    expect(keys).toEqual(new Set(["car", "shield", "escort", "plane"]));
  });

  /**
   * An icon that is imported but never re-exported renders as `undefined` — a
   * runtime "Element type is invalid" crash, not a build error. This checks the
   * module's real export surface against every import in the app, so it covers
   * files no test renders.
   */
  it("exports every icon the app imports from it", () => {
    const exported = icons as unknown as Record<string, unknown>;
    const checked = new Set<string>();

    for (const file of appSourceFiles()) {
      for (const name of importedIconNames(readFileSync(file, "utf8"))) {
        checked.add(name);
        expect(
          exported[name],
          `${file} imports "${name}", which ./components/icons does not export`,
        ).toBeDefined();
      }
    }

    expect(checked.size).toBeGreaterThan(5);
  });

  it("renders the 404 fallback, which is not part of the page flow", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });
});
