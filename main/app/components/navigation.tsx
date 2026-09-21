"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../lib/nav";
import { Menu, X } from "./icons";
import { ThemeToggle } from "./theme-toggle";

/**
 * In-page anchors only. There is no second page to navigate to, so every link
 * targets a section id on `/`. Plain `<a>` elements are used deliberately: the
 * same href scrolls smoothly when you are already home and navigates home first
 * when you are not (the header also renders on the 404 page).
 */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Scroll-spy: highlight the section currently filling the viewport.
  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(mostVisible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="nav-controls">
      <nav
        id="primary-navigation"
        className={open ? "nav-links is-open" : "nav-links"}
        aria-label="Main navigation"
      >
        {navLinks.map(({ href, label, id }) => (
          <a
            key={href}
            href={href}
            className={active === id ? "active" : undefined}
            aria-current={active === id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      {/* Lives in .nav-controls because that is the part of the header still
          visible once the links collapse behind the burger. */}
      <ThemeToggle />
      <button
        type="button"
        className={open ? "menu-toggle active" : "menu-toggle"}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </div>
  );
}
