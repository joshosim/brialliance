import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "../app/page";
import { Navigation } from "../app/components/navigation";
import { navLinks } from "../app/lib/nav";

describe("navigation", () => {
  it("links only to anchors on the single page", () => {
    render(<Navigation />);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(navLinks.length);
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^\/#/);
    }
  });

  it("points every anchor at a section that exists on the page", () => {
    const { container } = render(<Home />);
    for (const { id } of navLinks) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navigation />);
    const menu = container.querySelector(".nav-links");

    expect(menu).not.toHaveClass("is-open");

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(container.querySelector(".nav-links")).toHaveClass("is-open");

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(container.querySelector(".nav-links")).not.toHaveClass("is-open");
  });

  it("closes the menu after choosing a link", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getAllByRole("link")[1]);

    expect(document.querySelector(".nav-links")).not.toHaveClass("is-open");
  });

  it("marks the active section for assistive technology", () => {
    render(<Navigation />);
    const current = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "true");
    expect(current.length).toBeLessThanOrEqual(1);
  });
});
