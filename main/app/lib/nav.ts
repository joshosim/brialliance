/**
 * The site's section anchors. This lives outside the `"use client"` navigation
 * component on purpose: React replaces the exports of a client module with
 * opaque references, so a server component like the footer could not iterate a
 * list imported from one.
 */
export const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#fleet", label: "Fleet", id: "fleet" },
  // { href: "/#about", label: "About", id: "about" },
  { href: "/#booking", label: "Booking", id: "booking" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
