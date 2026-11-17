import Image from "next/image";
import { getMedia } from "@/content/media";
import PlaceholderArt from "./PlaceholderArt";
import FrameMarks from "./FrameMarks";

/**
 * Renders a media slot from the registry (src/content/media.js).
 * - real image  → next/image
 * - real video  → muted looping <video> with poster
 * - no file yet → branded placeholder frame, clearly labelled
 *
 * `fill`: the parent sets the size; otherwise the slot's aspect ratio is used.
 */
export default function Media({ id, className = "", sizes = "100vw", priority = false, fill = false, label = true, ratio: ratioOverride, reveal = true }) {
  const m = getMedia(id);
  const ratio = ratioOverride || m.ratio;
  const style = fill ? undefined : { aspectRatio: ratio };
  const wrap = `relative overflow-hidden bg-ink-soft ${fill ? "h-full w-full" : "w-full"} ${className}`;
  const revealAttr = reveal ? { "data-reveal": "wipe" } : {};

  if (m.src && m.type === "video") {
    return (
      <div className={wrap} style={style} {...revealAttr}>
        <video className="absolute inset-0 h-full w-full object-cover" src={m.src} poster={m.poster || undefined} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
      </div>
    );
  }

  if (m.src) {
    return (
      <div className={wrap} style={style} {...revealAttr}>
        <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`${wrap} grain`} style={style} {...revealAttr} role="img" aria-label={`Placeholder image: ${m.subject}`} data-placeholder={m.id}>
      <PlaceholderArt art={m.art} ratio={ratio} uid={m.id} />
      <FrameMarks />
      {label && (
        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-4 p-[clamp(12px,2.2vw,22px)] text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-[11px]">
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-light" aria-hidden="true" />
            <span className="truncate">Placeholder · {m.subject}</span>
          </span>
          <span className="tabular shrink-0 text-white/45">{ratio.replace("/", ":")}</span>
        </div>
      )}
    </div>
  );
}
