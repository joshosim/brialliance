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
        title="Toggle colour theme"
      >
        <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
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
