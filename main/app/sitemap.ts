import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/site";

const routes = [
  ["/", "monthly", 1],
  ["/services", "monthly", 0.9],
  ["/services/car-rentals", "monthly", 0.8],
  ["/services/event-security", "monthly", 0.8],
  ["/services/armed-escort", "monthly", 0.8],
  ["/services/airport-support", "monthly", 0.8],
  ["/about", "monthly", 0.7],
  ["/booking", "monthly", 0.7],
  ["/contact", "monthly", 0.7],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([path, changeFrequency, priority]) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}

