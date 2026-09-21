import type { Metadata, Viewport } from "next";
import { MotionObserver } from "./components/motion-observer";
import { siteUrl } from "./lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brilliance Integrated Services | Security & Logistics",
  description:
    "Executive transport, security, VIP escort, and airport protocol services across Nigeria.",
  metadataBase: siteUrl,
  alternates: {
    canonical: "/",
  },
  applicationName: "Brilliance Integrated Services Ltd",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Brilliance Integrated Services Ltd",
    title: "Brilliance Integrated Services | Security & Logistics",
    description:
      "Executive transport, security, VIP escort, and airport protocol services across Nigeria.",
  },
  twitter: {
    card: "summary",
    title: "Brilliance Integrated Services | Security & Logistics",
    description:
      "Executive transport, security, VIP escort, and airport protocol services across Nigeria.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  /*
   * Keyed off the system preference, which is all the browser can see before any
   * script runs. An explicit choice overrides these from the toggle, which
   * rewrites both tags — a `media` query cannot observe our own `data-theme`.
   */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f0c" },
  ],
};

/**
 * Runs before the first paint, so a visitor who chose dark never sees a flash of
 * the light theme. Inline and synchronous deliberately: anything deferred — a
 * bundled script, `useEffect` — runs after the browser has already painted.
 *
 * Prefers a stored choice, validates it so a stale value cannot set a bogus
 * attribute, and otherwise follows the OS. The `try`/`catch` covers storage being
 * unavailable (private mode, blocked cookies), where the rendered default of
 * light applies instead.
 */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("brilliance-theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
     * `data-theme` is rendered so the page still has a theme with JavaScript
     * disabled. `suppressHydrationWarning` lets React accept whatever the inline
     * script replaced it with, instead of reporting that as a hydration error.
     */
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}
