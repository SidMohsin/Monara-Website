"use client";

import { useState } from "react";

/** Client-side filter over server-rendered cards. `items`: [{ key, caps: [slug], node }]. */
export default function WorkFilter({ filters, items }) {
  const [active, setActive] = useState("all");
  const visible = items.filter((it) => active === "all" || it.caps.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter projects by capability" className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
        {[{ slug: "all", title: "All" }, ...filters].map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={active === f.slug}
            onClick={() => setActive(f.slug)}
            className={`shrink-0 whitespace-nowrap border px-4 py-2 text-[13px] uppercase tracking-[0.12em] transition-colors ${
              active === f.slug ? "border-ink bg-ink text-white" : "border-line text-ink/75 hover:border-ink hover:text-ink"
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>
      <div className="mt-12 grid gap-x-[clamp(24px,4vw,64px)] gap-y-16 md:grid-cols-2">
        {visible.map((it, i) => (
          <div key={it.key} className={i % 2 === 1 ? "md:mt-24" : ""}>
            {it.node}
          </div>
        ))}
      </div>
      {visible.length === 0 && <p className="mt-12 text-muted">No projects in this category yet.</p>}
    </>
  );
}
