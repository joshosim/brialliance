/**
 * Both contact forms hand off to the visitor's own mail client instead of
 * posting to a server. Building the link and opening it live here so there is
 * one place to change, and so a test can stand in for the hand-off without
 * reaching into `window.location`.
 */

type Mailto = {
  to: string;
  subject: string;
  body: string;
};

export function buildMailto({ to, subject, body }: Mailto): string {
  const query = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${to}?${query.toString().replace(/\+/g, "%20")}`;
}

export function openMailClient(href: string): void {
  window.location.href = href;
}
