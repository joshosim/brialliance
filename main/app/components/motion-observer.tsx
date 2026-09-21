"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Everything that reveals itself on scroll. Kept as a single selector list so
 * adding a new section is a one-line change — the stagger is derived from the
 * element's position in this list.
 */
const motionTargets = [
  ".section-head",
  ".feature",
  ".stat",
  ".detailed-service",
  ".service-detail-copy",
  ".service-detail-media",
  ".service-detail-gallery",
  ".fleet-card",
  ".gallery-item",
  ".advantage",
  ".why-grid > *",
  ".editorial > *",
  ".values-grid > div",
  ".booking-layout > *",
  ".contact-layout > *",
  ".cta-inner",
];

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(motionTargets.join(",")),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("motion-pending");
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element, index) => {
      const isAlreadyVisible =
        element.getBoundingClientRect().top < window.innerHeight * 0.88;
      element.style.setProperty("--motion-delay", `${(index % 6) * 70}ms`);
      element.classList.add(
        isAlreadyVisible ? "motion-visible" : "motion-pending",
      );
      if (!isAlreadyVisible) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
