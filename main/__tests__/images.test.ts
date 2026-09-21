import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { fleet, galleryImages, services } from "../app/lib/services";

const images = [
  ...services.map((service) => service.image),
  ...services.flatMap((service) => service.gallery),
  ...fleet.map((vehicle) => ({ src: vehicle.src, alt: vehicle.alt })),
  ...galleryImages,
];

const imagesDir = path.join(process.cwd(), "public", "images");

describe("images", () => {
  it.each(images.map((image) => image.src))("%s exists on disk", (src) => {
    expect(existsSync(path.join(process.cwd(), "public", src))).toBe(true);
  });

  it("describes every image for screen readers", () => {
    for (const image of images) {
      expect(image.alt.trim().length).toBeGreaterThan(3);
    }
  });

  it("has no duplicate sources in the fleet", () => {
    const sources = fleet.map((vehicle) => vehicle.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("puts every image shipped in public/images onto the page", () => {
    const shipped = readdirSync(imagesDir).filter((file) =>
      /\.(jpe?g|png|webp|avif|jfif)$/i.test(file),
    );

    // A few assets ship twice under different extensions (e.g. "Event.jfif"
    // alongside "Event.jpg"). Grouping by basename means the page only has to
    // carry one copy of each picture, not every redundant file.
    const onPage = new Set(
      images.map((image) =>
        path.basename(image.src, path.extname(image.src)).toLowerCase(),
      ),
    );

    const unrepresented = shipped.filter(
      (file) =>
        !onPage.has(path.basename(file, path.extname(file)).toLowerCase()),
    );

    expect(unrepresented).toEqual([]);
  });
});
