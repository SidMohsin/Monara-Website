import { site } from "@/content/site";

// "CREATIVITY · PRODUCTION · SMART TECH": wraps only between items, never inside one.
export default function Positioning({ className = "" }) {
  const items = site.positioning.split(" · ");
  return (
    <p className={`eyebrow flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {items.map((w, i) => (
        <span key={w} className="whitespace-nowrap">
          {w}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="ml-3">
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
