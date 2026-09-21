const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";

export const siteUrl = new URL(
  configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`,
);

export const siteName = "Brilliance Integrated Services Ltd";

/**
 * Contact details, kept in one place so the page, both forms and the footer can
 * never disagree with each other.
 */
export const contact = {
  email: "info@brillianceintegrated.com",
  phones: [
    { label: "+234 812 359 6345", href: "tel:+2348123596345" },
    { label: "+234 817 363 9366", href: "tel:+2348173639366" },
    { label: "+234 802 810 5959", href: "tel:+2348028105959" },

  ],
  whatsapp: "https://wa.me/2348123596345",
} as const;
