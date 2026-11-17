"use client";

import { useEffect } from "react";

/**
 * Opens the <details> row a `/#slug` link points to (e.g. a footer service link,
 * or an old /services/<slug> address redirected to the home page), then scrolls to it.
 * Also opens the row that contains the target when the hash points inside one.
 */
export default function HashOpener() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const details = el.tagName === "DETAILS" ? el : el.closest("details");
      if (details && !details.open) {
        details.open = true;
        // layout changed: scroll again once the row has expanded
        requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
