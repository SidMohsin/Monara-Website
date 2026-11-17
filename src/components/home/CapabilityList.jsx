import { capabilities, getCapability, visibleGroups, serviceCount, pad } from "@/lib/services";
import Media from "@/components/media/Media";
import ServiceGroups from "@/components/services/ServiceGroups";
import PreviewGuard from "./PreviewGuard";

/**
 * One-page site: the nine Sheet3 capabilities as an accordion.
 * Each row is a native <details>, so it works without JavaScript, with the
 * keyboard and with screen readers. Opening a row shows the full client
 * description and the service list from the workbook in place.
 * `/#<slug>` links open the matching row (see HashOpener).
 *
 * Row grid (lg): index 1 · title 4 · preview 2 · description 4 · toggle 1.
 * The hover preview lives in its own cell, so it never covers text
 * (PreviewGuard hides it on scroll/click/blur; CSS disables it on touch/reduced motion).
 */
function Toggle() {
  return (
    <span aria-hidden="true" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover/row:border-teal group-hover/row:text-teal group-open/cap:border-white group-open/cap:bg-white group-open/cap:text-teal">
      <span className="absolute h-px w-3.5 bg-current" />
      <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open/cap:scale-y-0" />
    </span>
  );
}

function Body({ c }) {
  const groups = visibleGroups(c);
  const count = serviceCount(c);
  return (
    <div className="bg-teal/[0.06] px-4 pb-14 pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-6">
      <div className="min-w-0 lg:col-span-11 lg:col-start-2">
        {/* Full client description (the row shows a 3-line excerpt) */}
        <p className="max-w-3xl text-lead text-ink/85">{c.summary}</p>

        {/* 360° Campaigns: its three capabilities */}
        {c.children && (
          <div className="mt-10">
            <p className="eyebrow text-muted">Includes</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {c.children.map((s) => (
                <li key={s}>
                  <a href={`#${s}`} className="inline-flex items-center gap-3 border border-line px-4 py-2.5 text-[15px] transition-colors hover:border-teal hover:text-teal">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {getCapability(s).title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Workbook service list (Creative & Brand has none yet: description only) */}
        {count > 0 && (
          <div className="mt-10">
            <p className="eyebrow mb-6 text-muted">
              {count} services
            </p>
            <ServiceGroups groups={groups} capabilityTitle={c.title} idPrefix={c.slug} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CapabilityList() {
  return (
    <PreviewGuard as="ul" className="border-b border-line">
      {capabilities.map((c, i) => (
        <li key={c.slug} data-reveal style={{ "--reveal-i": i % 4 }}>
          <details id={c.slug} className="group/cap border-t border-line">
            <summary className="cap-row group/row grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 px-4 py-7 transition-colors duration-300 hover:bg-mist md:grid-cols-[4rem_1fr_auto] lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:px-6 lg:py-9 group-open/cap:bg-teal group-open/cap:text-white [&::-webkit-details-marker]:hidden">
              <span className="tabular pt-1 text-sm text-muted group-open/cap:text-white/75 lg:col-span-1 lg:pt-0">{pad(i + 1)}</span>

              <span className="min-w-0 lg:col-span-4">
                <h3 className="display-caps text-[clamp(1.375rem,1rem+1.4vw,2.25rem)] leading-tight transition-colors duration-300 group-hover/row:text-teal group-open/cap:text-white">
                  {c.title}
                </h3>
                {c.parent && <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-teal group-open/cap:text-white/80">Part of 360° Campaigns</span>}
              </span>

              {/* Preview cell: desktop only, reserved space so it never overlaps text */}
              <span aria-hidden="true" className="relative hidden self-stretch lg:col-span-2 lg:block">
                <span className="cap-preview absolute inset-x-0 -inset-y-5 block overflow-hidden">
                  <Media id={`svc-${c.slug}-card`} fill label={false} reveal={false} sizes="220px" />
                </span>
              </span>

              <span className="col-start-2 mt-3 line-clamp-3 min-w-0 text-[15px] leading-relaxed text-muted group-open/cap:hidden lg:col-span-4 lg:col-start-auto lg:mt-0">{c.summary}</span>

              <span className="col-start-3 row-start-1 flex items-center pt-0.5 lg:col-span-1 lg:col-start-12 lg:row-start-auto lg:justify-end lg:pt-0">
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
