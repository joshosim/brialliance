import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brilliance Integrated Services | Security & Logistics",
  description:
    "Executive transport, security, VIP escort, and airport protocol services across Nigeria.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
