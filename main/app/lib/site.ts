const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";

export const siteUrl = new URL(
  configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`,
);

