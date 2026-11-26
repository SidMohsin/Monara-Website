"use client";

import { useEffect } from "react";

/**
 * Opened-row media normally loads only when a row is opened (it lives inside a closed
 * <details>), which shows an empty box for a moment on slower connections. When the
 * services section comes near the screen, this quietly starts those downloads at low
 * priority, so a tapped row usually opens with its photo already there.
 * Videos only fetch their first data (preload="metadata"); they still play only when visible.
 */
export default function WarmRows() {
  useEffect(() => {
    const section = document.getElementById("services");
    if (!section || !("IntersectionObserver" in window)) return;
    const warm = () => {
      section.querySelectorAll('details > div img[loading="lazy"]').forEach((img) => {
        img.fetchPriority = "low";
        img.loading = "eager";
      });
      section.querySelectorAll('details > div video[preload="none"]').forEach((v) => (v.preload = "metadata"));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        (window.requestIdleCallback || ((fn) => setTimeout(fn, 300)))(warm);
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);
  return null;
}
