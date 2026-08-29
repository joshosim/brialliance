"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const motionTargets = [
  ".page-intro .container",
  ".why-grid",
  ".editorial",
  ".values-grid",
  ".form-layout",
  ".contact-layout",
  ".service-detail-layout",
  ".fleet-heading",
  ".service-gallery",
  ".cta-inner",
  ".detailed-service",
  ".vehicle-card",
  ".feature",
  ".stats-box > div",
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
      const isAlreadyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.88;
      element.style.setProperty("--motion-delay", `${(index % 4) * 70}ms`);
      element.classList.add(isAlreadyVisible ? "motion-visible" : "motion-pending");
      if (!isAlreadyVisible) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
