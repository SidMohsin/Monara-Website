"use client";

import { useEffect, useState } from "react";

// Viewfinder timecode (HH:MM:SS:FF @ 25fps). Static when reduced motion is preferred.
export default function Timecode() {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const id = setInterval(() => setFrames(Math.floor(((performance.now() - start) / 1000) * 25)), 40);
    return () => clearInterval(id);
  }, []);
  const ff = frames % 25;
  const s = Math.floor(frames / 25);
  const p = (n) => String(n).padStart(2, "0");
  return (
    <span className="tabular" aria-hidden="true">
      {p(Math.floor(s / 3600))}:{p(Math.floor(s / 60) % 60)}:{p(s % 60)}:{p(ff)}
    </span>
  );
}
