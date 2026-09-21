"use client";

import { Car, Plane, Shield, ShieldCheck, type LucideIcon } from "lucide-react";
import type { IconKey } from "../lib/services";

/**
 * Every icon on the site comes from Lucide. Nothing is drawn by hand and no
 * emoji or arrow glyphs are used anywhere — see `__tests__/no-emoji.test.ts`.
 *
 * The public icon set is re-exported straight from the package in one
 * statement, deliberately: keeping a separate import list and export list here
 * previously let an icon be imported by a consumer without being exported,
 * which renders as `undefined` rather than failing at build time.
 *
 * This module is a client boundary for the same reason. Lucide's icons read a
 * React context, and React 19's server build does not export `useContext`, so a
 * Server Component cannot render one — it would throw. Everything exported here
 * is a component, so nothing non-serialisable crosses the boundary.
 */
export {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronUp,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Shield,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

const serviceIcons: Record<IconKey, LucideIcon> = {
  car: Car,
  shield: ShieldCheck,
  escort: Shield,
  plane: Plane,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Glyph = serviceIcons[name];
  return <Glyph className={className} aria-hidden="true" />;
}
