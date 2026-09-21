"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "./icons";

const SCROLLED_AT = 24;
const BACK_TO_TOP_AT = 600;

/**
 * Page-level scroll affordances: the red reading-progress bar, the header
 * elevation once you leave the top, and the back-to-top button.
 *
 * Every listener is attached inside an effect so the component is safe to
 * prerender, and the scroll handler writes the bar width and the header class
 * straight to the DOM rather than through state — that keeps a 60fps
 * interaction from re-rendering the page on every frame.
 */
export function SiteEffects() {
  const barRef = useRef<HTMLSpanElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const header = document.getElementById("header");
    let frame = 0;

    function update() {
      frame = 0;
      const showTopNow = window.scrollY > BACK_TO_TOP_AT;
      setShowTop((current) => (current === showTopNow ? current : showTopNow));

      header?.classList.toggle("is-scrolled", window.scrollY > SCROLLED_AT);

      const bar = barRef.current;
      if (bar) {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      header?.classList.remove("is-scrolled");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={barRef} className="scroll-progress-bar" />
      </div>
      <button
        type="button"
        className={showTop ? "back-to-top is-visible" : "back-to-top"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ChevronUp aria-hidden="true" />
      </button>
    </>
  );
}
