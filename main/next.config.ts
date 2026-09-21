import type { NextConfig } from "next";

/** Service sections on the single page, matching their legacy `/services/*` URLs. */
const serviceAnchors = [
  "car-rentals",
  "event-security",
  "armed-escort",
  "airport-support",
] as const;

const nextConfig: NextConfig = {
  /**
   * Everything now lives on `/`. These keep inbound links and search results
   * working by sending each old URL to the matching section — visitors never
   * land on a second page.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      ...serviceAnchors.map((anchor) => ({
        source: `/services/${anchor}`,
        destination: `/#${anchor}`,
        permanent: true,
      })),
      // Anything else under /services falls back to the services overview.
      { source: "/services/:slug*", destination: "/#services", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/booking", destination: "/#booking", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
