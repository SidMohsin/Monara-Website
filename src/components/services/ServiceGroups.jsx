import { pad } from "@/lib/services";

/**
 * Service lists for a capability page.
 * - One group  → a clean multi-column list.
 * - Many groups (Smart Tech) → a sticky in-page index + numbered group blocks,
 *   each with its description and services in columns; sub-groups (Topic 2) get
 *   their own small headings. Keeps 50+ services scannable.
 */
function ServiceList({ services, cols = "sm:grid-cols-2 lg:grid-cols-3" }) {
  return (
    // phones: compact wrapping tags; sm+: ruled list rows in columns
    <ul className={`flex flex-wrap gap-2 sm:grid sm:gap-x-10 sm:gap-y-0 ${cols}`}>
      {services.map((s) => (
        <li key={s.raw} className="flex items-start gap-3 border border-line bg-paper px-3 py-1.5 text-[14px] leading-snug [overflow-wrap:break-word] sm:border-0 sm:border-t sm:bg-transparent sm:px-0 sm:py-4 sm:text-[16px]">
          <span aria-hidden="true" className="mt-[0.55em] hidden h-1.5 w-1.5 shrink-0 rounded-full bg-teal sm:block" />
          {/* allow line breaks after slashes ("CGI (Modelling/Texturing/…)") instead of mid-word */}
          {s.label.replaceAll("/", "/​")}
        </li>
      ))}
    </ul>
  );
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ServiceGroups({ groups, capabilityTitle, idPrefix = "" }) {
  // ids are prefixed with the capability slug: several lists share the one page
  const gid = (t) => slugify(idPrefix ? `${idPrefix}-${t}` : t);

  if (groups.length === 1 && !groups[0].subgroups) {
    return (
      <div data-reveal>
        <ServiceList services={groups[0].services} />
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* In-page index */}
      <nav aria-label={`${capabilityTitle} service groups`} className="min-w-0 lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-muted">{groups.length} areas</p>
          <ol className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {groups.map((g, i) => (
              <li key={g.raw} className="shrink-0">
                <a href={`#${gid(g.title)}`} className="group flex items-center gap-3 border border-line px-3 py-2 text-sm whitespace-nowrap transition-colors hover:border-teal hover:text-teal lg:border-0 lg:border-t lg:px-0 lg:py-3 lg:whitespace-normal">
                  <span className="tabular text-xs text-muted group-hover:text-teal">{pad(i + 1)}</span>
                  {g.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="min-w-0 space-y-[clamp(56px,7vw,96px)] lg:col-span-9">
        {groups.map((g, i) => (
          <section key={g.raw} id={gid(g.title)} aria-labelledby={`${gid(g.title)}-h`}>
            <div className="grid gap-4 md:grid-cols-12 md:gap-8" data-reveal>
              <p className="tabular text-sm text-teal md:col-span-1">{pad(i + 1)}</p>
              <div className="md:col-span-11">
                <h4 id={`${gid(g.title)}-h`} className="display-caps text-h3">
                  {g.title}
                </h4>
                {g.description && (
                  <div className="mt-3 max-w-3xl space-y-3 text-muted">
                    {g.description.split("\n\n").map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 md:pl-[calc(100%/12+2rem)]" data-reveal style={{ "--reveal-i": 1 }}>
              {g.subgroups ? (
                <div className="grid gap-10 xl:grid-cols-3 xl:gap-8">
                  {g.subgroups.map((sg) => (
                    <div key={sg.raw} className="min-w-0">
                      <h5 className="eyebrow mb-1 text-teal">{sg.title}</h5>
                      <ServiceList services={sg.services} cols="sm:grid-cols-2 xl:grid-cols-1" />
                    </div>
                  ))}
                </div>
              ) : (
                <ServiceList services={g.services} cols="sm:grid-cols-2" />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
