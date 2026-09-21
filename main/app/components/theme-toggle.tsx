"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Moon, Sun } from "./icons";

/**
 * Shared with the pre-paint script in `app/layout.tsx`, which reads the same key
 * before the first paint. The two must agree, so the name lives here and is
 * duplicated there only as a string literal inside the inline script.
 */
export const THEME_STORAGE_KEY = "brilliance-theme";

type Theme = "light" | "dark";

/** The colour the browser paints its own chrome with, per theme. */
const CHROME: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#0b0f0c",
};

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/**
 * `useLayoutEffect` warns when it runs during server rendering, and the root
 * layout is prerendered. This runs the layout effect in the browser — where it
 * matters, because it must land before paint — and a plain effect on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeToggle() {
  // `null` until mounted. The server cannot know the stored theme, so the first
  // client render has to agree with the server rather than guess, or React reports
  // a hydration mismatch. The icon does not depend on this — CSS picks it from the
  // attribute — so nothing flickers while the value is still unknown.
  const [theme, setTheme] = useState<Theme | null>(null);

  useIsomorphicLayoutEffect(() => {
    const current = readTheme();
    // Re-assert the attribute the pre-paint script set. React's Strict Mode
    // remount in development resets <html> to only the attributes it manages from
    // JSX, which would otherwise drop the stored theme.
    document.documentElement.setAttribute("data-theme", current);
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable — private mode, blocked cookies. The theme
      // still applies to this page view; it just will not be remembered.
    }
    // Next renders one `theme-color` meta per system preference, and those key off
    // the OS rather than our attribute, so both are rewritten and an explicit
    // choice wins over the system one.
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", CHROME[next]);
    }

    setTheme(next);
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      // A constant name, so it cannot mismatch. `aria-pressed` carries the state,
      // and stays unset until mount rather than guessing during render.
      aria-label="Dark mode"
      aria-pressed={theme === null ? undefined : theme === "dark"}
    >
      <Sun className="theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
