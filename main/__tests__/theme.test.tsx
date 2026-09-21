import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "../app/page";
import { THEME_STORAGE_KEY } from "../app/components/theme-toggle";
import { globalsCss, readApp } from "./helpers";

const layout = readApp("app/layout.tsx");

function html(): HTMLElement {
  return document.documentElement;
}

/** Point the stubbed `matchMedia` at a system preference. */
function systemPrefersDark(dark: boolean): void {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: dark && query.includes("dark"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

/**
 * The pre-paint script is a string in the layout, and jsdom will not run a
 * `<script>` injected through `dangerouslySetInnerHTML`. Pulling it out of the
 * source and running it is the only way to test what it actually does — which
 * matters, because it is the only thing standing between a dark-mode visitor and
 * a flash of the light theme.
 */
function runThemeScript(): void {
  const match = layout.match(/const THEME_SCRIPT = `([^`]+)`/);
  expect(match, "the pre-paint theme script is missing").not.toBeNull();
  // eslint-disable-next-line no-new-func
  new Function(match![1])();
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    html().setAttribute("data-theme", "light");
    systemPrefersDark(false);
  });

  it("renders a theme on <html>, so the page still has one without JavaScript", () => {
    expect(layout).toMatch(/<html[^>]*data-theme="light"/);
  });

  it("lets React accept what the script does to <html>", () => {
    // Without this, replacing the attribute before hydration is a hydration error.
    expect(layout).toMatch(/<html[^>]*suppressHydrationWarning/);
  });

  it("resolves the theme in <head>, before the first paint", () => {
    // The script's *text* lives in the `THEME_SCRIPT` const further down the file,
    // so the head only names it. Both halves are asserted: the head proves the
    // script runs during parsing rather than after hydration, the next test proves
    // what the script does.
    const head = layout.slice(layout.indexOf("<head>"), layout.indexOf("</head>"));
    expect(head).toContain("dangerouslySetInnerHTML");
    expect(head).toContain("THEME_SCRIPT");
  });

  it("reads the stored choice, and falls back to the system", () => {
    const match = layout.match(/const THEME_SCRIPT = `([^`]+)`/);
    expect(match, "the pre-paint theme script is missing").not.toBeNull();
    expect(match![1]).toContain(THEME_STORAGE_KEY);
    expect(match![1]).toContain("prefers-color-scheme: dark");
  });

  it("applies a stored choice", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runThemeScript();
    expect(html().getAttribute("data-theme")).toBe("dark");
  });

  it("follows the system when nothing is stored", () => {
    systemPrefersDark(true);
    runThemeScript();
    expect(html().getAttribute("data-theme")).toBe("dark");
  });

  it("ignores a stored value that is not a theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "chartreuse");
    runThemeScript();
    expect(html().getAttribute("data-theme")).toBe("light");
  });

  it("survives storage being unavailable", () => {
    // Private mode and blocked cookies both throw on access.
    const denied = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage denied");
    });
    expect(() => runThemeScript()).not.toThrow();
    denied.mockRestore();
  });

  it("offers a toggle in the header", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /dark mode/i })).toBeInTheDocument();
  });

  it("switches theme, and remembers the choice", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const toggle = screen.getByRole("button", { name: /dark mode/i });

    await user.click(toggle);
    expect(html().getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    await user.click(toggle);
    expect(html().getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("reflects a theme chosen on a previous visit", () => {
    html().setAttribute("data-theme", "dark");
    render(<Home />);
    expect(screen.getByRole("button", { name: /dark mode/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("keeps the toggle's accessible name stable across themes", () => {
    // A label that named the *next* theme would differ between the server's guess
    // and the client's, which is a hydration mismatch.
    html().setAttribute("data-theme", "dark");
    render(<Home />);
    expect(screen.getByRole("button", { name: /dark mode/i })).toBeInTheDocument();
  });

  it("defines both themes in the stylesheet", () => {
    expect(globalsCss).toContain(':root[data-theme="light"]');
    expect(globalsCss).toContain(':root[data-theme="dark"]');
  });

  it("lets the browser theme its own controls", () => {
    // Without this, the <select>s and <input type="date"> in the booking form stay
    // light widgets on a dark page.
    expect(globalsCss).toMatch(/color-scheme:\s*light/);
    expect(globalsCss).toMatch(/color-scheme:\s*dark/);
  });
});
