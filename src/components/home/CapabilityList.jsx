import Link from "next/link";
import { capabilities, pad } from "@/lib/services";
import Media from "@/components/media/Media";
import { Arrow } from "@/components/ui/Links";
import PreviewGuard from "./PreviewGuard";

/**
 * The nine Sheet3 capabilities as an indexed list (homepage).
 *
 * Desktop (lg+, mouse, motion allowed): each row has its own preview cell
 * between the title and the description. The preview lives *inside* the row,
 * so it scrolls with it, can never cover the row's text, and never leaves the
 * page width. Shown by CSS :hover only; PreviewGuard hides it on scroll/click/blur.
 *
 * Grid (lg): index 1 · title 4 · preview 2 · description 4 · arrow 1
 */
export default function CapabilityList() {
  return (
    <PreviewGuard as="ul" className="border-b border-line">
      {capabilities.map((c, i) => (
        <li key={c.slug} data-reveal style={{ "--reveal-i": i % 4 }}>
          <Link
            href={`/services/${c.slug}`}
            className="cap-row group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 border-t border-line py-7 transition-colors duration-300 hover:bg-mist/70 md:grid-cols-[4rem_1fr_auto] lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-9"
          >
            <span className="tabular pt-1 text-sm text-muted lg:col-span-1 lg:pt-0">{pad(i + 1)}</span>

            <span className="min-w-0 lg:col-span-4">
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 scale-0 rounded-full bg-teal transition-transform duration-300 group-hover:scale-100" />
                <span className="display-caps -ml-5 text-[clamp(1.375rem,1rem+1.4vw,2.25rem)] leading-tight transition-transform duration-500 ease-out-soft group-hover:translate-x-5">
                  {c.title}
                </span>
              </span>
              {c.parent && <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-teal">Part of 360° Campaigns</span>}
            </span>

            {/* Preview cell: desktop only, reserved space so it never overlaps text */}
            <span aria-hidden="true" className="relative hidden self-stretch lg:col-span-2 lg:block">
              <span className="cap-preview absolute inset-x-0 -inset-y-5 block overflow-hidden">
                <Media id={`svc-${c.slug}-card`} fill label={false} reveal={false} sizes="220px" />
              </span>
            </span>

            <span className="col-start-2 mt-3 line-clamp-3 min-w-0 text-[15px] leading-relaxed text-muted lg:col-span-4 lg:col-start-auto lg:mt-0">{c.summary}</span>

            <span className="col-start-3 row-start-1 flex items-center gap-3 pt-1 text-muted transition-colors group-hover:text-teal lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:justify-end lg:pt-0">
              <Arrow className="group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </PreviewGuard>
  );
}
