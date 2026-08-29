import type { Metadata } from "next";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}
