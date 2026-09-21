import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/site";

/**
 * The site is a single page, so the sitemap has a single entry. The legacy
 * routes redirect into its anchors rather than being indexable pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
