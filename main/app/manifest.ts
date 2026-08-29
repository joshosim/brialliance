import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brilliance Integrated Services Ltd",
    short_name: "Brilliance",
    description:
      "Executive transport, security, VIP escort, and airport protocol services across Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#08111b",
    theme_color: "#08111b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

