import Link from "next/link";

/** Light inner-page hero: breadcrumb, eyebrow, big title, optional lead. */
export default function PageHero({ eyebrow, title, lead, crumbs = [], children }) {
  return (
    <section className="container-x pb-[clamp(48px,7vw,96px)] pt-[clamp(132px,16vw,208px)]">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-8" data-reveal>
          <ol className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-teal" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {eyebrow && (
        <p className="eyebrow text-teal" data-reveal>
          {eyebrow}
        </p>
      )}
      <h1 className="display-caps mt-5 max-w-6xl text-h1" data-reveal style={{ "--reveal-i": 1 }}>
        {title}
      </h1>
      {lead && (
        <div className="mt-8 max-w-3xl text-lead font-light text-ink/80" data-reveal style={{ "--reveal-i": 2 }}>
          {lead}
        </div>
      )}
      {children}
    </section>
  );
}
