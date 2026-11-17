import Link from "next/link";
import { Link as SectionLink } from "@/components/ui/Links";
import Logo from "@/components/brand/Logo";
import { site } from "@/content/site";
import { capabilities } from "@/lib/services";
import Positioning from "@/components/brand/Positioning";

function Placeholder({ children }) {
  return (
    <span className="text-white/60" title="Placeholder: to be supplied by the client">
      {children}
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="container-x pb-10 pt-[clamp(64px,9vw,120px)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="MONARA Productions, home" className="inline-block">
              <Logo variant="reverse" height={52} />
            </Link>
            <p className="mt-8 max-w-xs text-h3 font-light">{site.tagline}</p>
            <Positioning className="mt-4 text-teal-light" />
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="eyebrow text-muted-dark">Services</h2>
            <ul className="mt-6 space-y-2.5 text-[15px]">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <SectionLink href={`/#${c.slug}`} className="link-underline text-white/80 hover:text-white">
                    {c.title}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="eyebrow text-muted-dark">Company</h2>
            <ul className="mt-6 space-y-2.5 text-[15px]">
              {[{ label: "Home", href: "/#main" }, ...site.nav, { label: site.cta.label, href: site.cta.href }, { label: "Privacy Policy", href: "/privacy-policy" }].map((n) => (
                <li key={n.href}>
                  <SectionLink href={n.href} className="link-underline text-white/80 hover:text-white">
                    {n.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-muted-dark">Contact</h2>
            {/* PLACEHOLDER contact details: see src/content/site.js */}
            <address className="mt-6 space-y-2.5 text-[15px] not-italic">
              <p>
                <Placeholder>{site.contact.email}</Placeholder>
              </p>
              <p>
                <Placeholder>{site.contact.phone}</Placeholder>
              </p>
              <p>
                {site.contact.address.map((l) => (
                  <span key={l} className="block">
                    <Placeholder>{l}</Placeholder>
                  </span>
                ))}
              </p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] uppercase tracking-[0.14em]">
              {site.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-white/80 hover:text-white">
                      {s.label}
                    </a>
                  ) : (
                    <Placeholder>{s.label}</Placeholder>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(56px,8vw,112px)] flex flex-col gap-3 border-t border-ink-line pt-6 text-[13px] text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.country}.
          </p>
          <Link href="/privacy-policy" className="link-underline hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
