"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities, stats } from "../lib/services";
import { ServiceIcon } from "./icons";

const COUNT_DURATION = 1400;

function Stat({ value, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final value so the server-rendered HTML is already correct;
  // the count-up only rewinds to zero once the band is actually in view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / COUNT_DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="stat">
      <strong ref={ref}>
        {display}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {/* Duplicated once so the translate loop is seamless. */}
        {[0, 1].map((pass) => (
          <div className="marquee-group" key={pass}>
            {capabilities.map(({ icon, label }) => (
              <span className="marquee-item" key={`${pass}-${label}`}>
                <ServiceIcon name={icon} className="marquee-icon" />
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The solid red band that separates the hero from the services list: a looping
 * capabilities ribbon plus the headline numbers.
 */
export function StatsBand() {
  return (
    <section className="red-band" aria-label="Company at a glance">
      <Marquee />
      <div className="container stats-grid">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
