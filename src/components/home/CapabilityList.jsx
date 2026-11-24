import { listedCapabilities } from "@/lib/services";
import Media from "@/components/media/Media";
import { getMedia } from "@/content/media";
import PreviewGuard from "./PreviewGuard";

/**
 * One-page site: the eight Sheet3 capabilities under the 360° Campaigns heading, as an accordion.
 * Each row is a native <details>, so it works without JavaScript, with the
 * keyboard and with screen readers. Opening a row shows the full client
 * description beside the capability's video (placeholder until supplied).
 * `/#<slug>` links open the matching row (see HashOpener).
 *
 * Row grid (lg): title 5 · preview 2 · description 4 · toggle 1.
 * Hover and open: solid teal with white text (Raghav's choice; hover rules in globals.css).
 * The hover preview lives in its own cell, so it never covers text
 * (PreviewGuard hides it on scroll/click/blur; CSS disables it on touch/reduced motion).
 */
/* One timing for every part of the row (matches --cap-t in globals.css). */
const ease = "transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Closed-row excerpt: cut on a whole word so it never ends mid-word ("…assiste…"). */
function excerpt(text, max = 110) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.–-]+$/, "") + "…";
}

function Toggle() {
  return (
    <span aria-hidden="true" className={`cap-toggle relative flex h-9 w-9 items-center justify-center rounded-full border border-line ${ease} group-open/cap:border-white group-open/cap:bg-white group-open/cap:text-teal`}>
      <span className="absolute h-px w-3.5 bg-current" />
      <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open/cap:scale-y-0" />
    </span>
  );
}

function Body({ c }) {
  const id = `svc-${c.slug}-video`;
  const m = getMedia(id);
  // portrait work keeps its own shape at a sensible width instead of being cropped
  const portrait = m.h > m.w;
  return (
    <div className="grid gap-8 bg-teal/[0.06] px-4 pb-12 pt-8 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:px-6 lg:pb-14 lg:pt-10">
      {/* Full client description (the closed row shows a 3-line excerpt) */}
      <p className="min-w-0 text-[17px] leading-relaxed text-ink/85 lg:col-span-5 lg:text-[19px]">{c.summary}</p>
      {/* Capability image or video (videos play muted on loop) */}
      <div className={`min-w-0 lg:col-span-6 lg:col-start-7 ${portrait ? "w-full max-w-[400px] justify-self-center lg:max-w-[420px]" : ""}`}>
        <Media id={id} reveal={false} sizes={portrait ? "420px" : "(min-width: 1024px) 45vw, 100vw"} />
      </div>
    </div>
  );
}

export default function CapabilityList() {
  return (
    <PreviewGuard as="ul" className="border-b border-line">
      {listedCapabilities.map((c, i) => (
        <li key={c.slug} data-reveal style={{ "--reveal-i": i % 4 }}>
          <details id={c.slug} className="group/cap border-t border-line">
            <summary className={`cap-row group/row grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-4 px-4 py-7 ${ease} lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:px-6 lg:py-9 group-open/cap:bg-teal group-open/cap:text-white [&::-webkit-details-marker]:hidden`}>
              <h3 className={`display-caps min-w-0 ${ease} text-[clamp(1.375rem,1rem+1.4vw,2.25rem)] leading-tight lg:col-span-5`}>{c.title}</h3>

              {/* Preview cell: desktop only, reserved space so it never overlaps text */}
              <span aria-hidden="true" className="relative hidden self-stretch lg:col-span-2 lg:block">
                <span className="cap-preview absolute inset-x-0 -inset-y-5 block overflow-hidden">
                  <Media id={`svc-${c.slug}-card`} fill label={false} reveal={false} sizes="220px" />
                </span>
              </span>

              <span className={`cap-excerpt col-start-1 mt-3 line-clamp-3 min-w-0 text-[15px] leading-relaxed text-muted ${ease} group-open/cap:hidden lg:col-span-4 lg:col-start-auto lg:mt-0`}>{excerpt(c.summary)}</span>

              <span className="col-start-2 row-start-1 flex items-center pt-0.5 lg:col-span-1 lg:col-start-12 lg:row-start-auto lg:justify-end lg:pt-0">
                <Toggle />
              </span>
            </summary>
            <Body c={c} />
          </details>
        </li>
      ))}
    </PreviewGuard>
  );
}
