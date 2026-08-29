"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const links = [
  ["/", "Home"],
  ["/#services", "Services"],
  ["/#about", "About"],
  ["/#booking", "Booking"],
  ["/#contact", "Contact"],
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme =
      localStorage.getItem("brilliance-theme") === "light" ? "light" : "dark";
  }, []);

  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme !== "light" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("brilliance-theme", next);
  }

  return (
    <div className="nav-controls">
      <nav
        className={open ? "nav-links is-open" : "nav-links"}
        aria-label="Main navigation"
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle colour theme"
      >
        Theme
      </button>
      <button
        className={open ? "menu-toggle active" : "menu-toggle"}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <i />
        <i />
      </button>
    </div>
  );
}
