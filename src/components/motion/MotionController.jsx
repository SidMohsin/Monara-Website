"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole site:
 * - [data-reveal]   → adds .is-visible when the element enters the viewport
 * - [data-parallax] → gentle translateY on scroll (value = strength, e.g. "0.06")
 * Everything is skipped when the visitor prefers reduced motion (CSS also guards this).
 */
export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = Array.from(document.querySelectorAll("[data-reveal]:not(.is-visible)"));

    // reduced motion: background loops stay on their still frame (poster)
    if (reduce) document.querySelectorAll("video[autoplay]").forEach((v) => v.pause());

    // Lazy loops (<Media> videos): load + play only while on screen, pause when off.
    // A video inside a closed service row has no box, so it never loads until opened.
    let vio;
    if (!reduce && "IntersectionObserver" in window) {
      vio = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())),
        { rootMargin: "200px 0px" },
      );
      document.querySelectorAll("video[data-autoplay]").forEach((v) => vio.observe(v));
    }

    if (reduce || !("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveal.forEach((el) => io.observe(el));

    const items = Array.from(document.querySelectorAll("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const k = parseFloat(el.dataset.parallax) || 0.06;
        const offset = (r.top + r.height / 2 - vh / 2) * -k;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (items.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      vio?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
