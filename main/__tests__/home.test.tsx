import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../app/page";
import {
  capabilities,
  fleet,
  galleryImages,
  services,
} from "../app/lib/services";

/** Every anchor the site promises to expose on its one page. */
const sectionIds = [
  "home",
  "services",
  "fleet",
  "gallery",
  "about",
  "booking",
  "contact",
] as const;

/** Every image that must appear somewhere on that page. */
const expectedImages = [
  ...services.map((service) => service.image.src),
  ...services.flatMap((service) => service.gallery.map((image) => image.src)),
  ...fleet.map((vehicle) => vehicle.src),
  ...galleryImages.map((image) => image.src),
];

describe("the single page", () => {
  it("renders exactly one main landmark and one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it.each(sectionIds)("exposes a #%s section", (id) => {
    const { container } = render(<Home />);
    expect(container.querySelector(`#${id}`)).not.toBeNull();
  });

  it.each(services.map((service) => service.anchor))(
    "exposes a #%s service section",
    (anchor) => {
      const { container } = render(<Home />);
      expect(container.querySelector(`#${anchor}`)).not.toBeNull();
    },
  );

  it("renders every service", () => {
    render(<Home />);
    for (const service of services) {
      expect(screen.getAllByText(service.title).length).toBeGreaterThan(0);
      expect(screen.getAllByText(service.heading).length).toBeGreaterThan(0);
      expect(screen.getAllByText(service.items[0]).length).toBeGreaterThan(0);
    }
  });

  it("renders every service card icon slot", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll(".service-icon")).toHaveLength(
      services.length,
    );
    expect(container.querySelectorAll(".feature-icon")).toHaveLength(
      capabilities.length,
    );
  });

  it("lists every vehicle in the fleet", () => {
    render(<Home />);
    for (const vehicle of fleet) {
      expect(screen.getAllByText(vehicle.name).length).toBeGreaterThan(0);
    }
  });

  it("carries every image on the one page", () => {
    const { container } = render(<Home />);
    const rendered = new Set(
      Array.from(container.querySelectorAll("img")).map((img) =>
        img.getAttribute("src"),
      ),
    );

    const missing = expectedImages.filter((src) => !rendered.has(src));
    expect(missing).toEqual([]);
  });

  it("gives every rendered image non-empty alt text", () => {
    const { container } = render(<Home />);
    const images = Array.from(container.querySelectorAll("img"));
    expect(images.length).toBeGreaterThan(0);
    for (const img of images) {
      expect((img.getAttribute("alt") ?? "").trim().length).toBeGreaterThan(3);
    }
  });

  it("shows both forms on the same page", () => {
    render(<Home />);
    expect(
      screen.getByRole("button", { name: /submit booking request/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });
});
