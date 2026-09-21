import { describe, expect, it } from "vitest";
import manifest from "../app/manifest";
import sitemap from "../app/sitemap";
import nextConfig from "../next.config";
import { services } from "../app/lib/services";

type Redirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

async function redirects(): Promise<Redirect[]> {
  return (await nextConfig.redirects?.()) as Redirect[];
}

describe("sitemap", () => {
  it("lists the single page and nothing else", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(new URL(entries[0].url).pathname).toBe("/");
  });
});

describe("manifest", () => {
  it("ships a white and green identity", () => {
    const value = manifest();
    expect(value.background_color).toBe("#ffffff");
    expect(value.theme_color).toBe("#0b7a3b");
  });

  it("starts on the single page", () => {
    expect(manifest().start_url).toBe("/");
  });
});

describe("legacy routes", () => {
  it("redirects every retired route onto an anchor of the one page", async () => {
    const map = new Map((await redirects()).map((rule) => [rule.source, rule]));

    const expected: Record<string, string> = {
      "/services": "/#services",
      "/about": "/#about",
      "/booking": "/#booking",
      "/contact": "/#contact",
      ...Object.fromEntries(
        services.map((service) => [
          `/services/${service.anchor}`,
          `/#${service.anchor}`,
        ]),
      ),
    };

    for (const [source, destination] of Object.entries(expected)) {
      expect(map.get(source), `${source} is not redirected`).toMatchObject({
        destination,
        permanent: true,
      });
    }
  });

  it("catches stray /services paths", async () => {
    const rules = await redirects();
    expect(rules.some((rule) => rule.source === "/services/:slug*")).toBe(true);
  });

  it("never redirects to another page", async () => {
    for (const rule of await redirects()) {
      expect(rule.destination.startsWith("/#")).toBe(true);
    }
  });
});
