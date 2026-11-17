"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a list of rows with in-row hover previews (.cap-preview).
 * Previews are shown purely by CSS :hover; this guard adds `data-suppress`
 * to hide them immediately on scroll, click, pointer leave, window blur or tab
 * switch, and only re-allows them after a *real* pointer movement
 * (synthetic post-scroll events have zero movement and are ignored).
 */
export default function PreviewGuard({ as: Tag = "div", className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const off = () => el.setAttribute("data-suppress", "");
    const on = () => el.removeAttribute("data-suppress");
    const onMove = (e) => {
      if (e.pointerType === "mouse" && (e.movementX !== 0 || e.movementY !== 0)) on();
    };
    const onVisibility = () => document.hidden && off();

    window.addEventListener("scroll", off, { passive: true });
    window.addEventListener("wheel", off, { passive: true });
    window.addEventListener("blur", off);
    document.addEventListener("visibilitychange", onVisibility);
    el.addEventListener("pointerdown", off);
    el.addEventListener("pointerleave", off);
    el.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("scroll", off);
      window.removeEventListener("wheel", off);
      window.removeEventListener("blur", off);
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("pointerdown", off);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Suppressed until the pointer has actually moved over the list.
  return (
    <Tag ref={ref} className={className} data-suppress="">
      {children}
    </Tag>
  );
}
