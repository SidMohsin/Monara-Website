import Link from "next/link";
import { capabilities, getCapability, pad, serviceLabels } from "@/lib/services";
import { servicesPage } from "@/content/copy";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactCta from "@/components/sections/ContactCta";
import Media from "@/components/media/Media";
import { ArrowLink } from "@/components/ui/Links";
import Draft from "@/components/ui/Draft";

export const metadata = pageMeta({
  title: "Services",
  description:
    "MONARA Productions capabilities: 360° campaigns, photography, video and film, post-production, Smart Tech, creative and brand, strategy and consulting, digital marketing, and paid media and performance marketing.",
  path: "/services",
});

const CHIP_LIMIT = 8;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={servicesPage.heading}
        lead={<Draft on={servicesPage.intro.draft}>{servicesPage.intro.text}</Draft>}
      />

      <div className="container-x pb-[clamp(80px,12vw,176px)]">
        {/* Index: chip bar on mobile, sticky list on desktop */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Capabilities" className="min-w-0 lg:col-span-3">
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0 lg:overflow-visible">
              {capabilities.map((c, i) => (
                <li key={c.slug} className="shrink-0">
                  <a href={`#${c.slug}`} className={`group flex items-center gap-3 border border-line px-3 py-2 text-sm whitespace-nowrap transition-colors hover:border-teal hover:text-teal lg:border-0 lg:border-t lg:px-0 lg:py-3 lg:whitespace-normal ${c.parent ? "lg:pl-6" : ""}`}>
                    <span className="tabular text-xs text-muted group-hover:text-teal">{pad(i + 1)}</span>
                    {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            {capabilities.map((c, i) => {
              const labels = serviceLabels(c);
              const shown = labels.slice(0, CHIP_LIMIT);
              const parent = c.parent && getCapability(c.parent);
              return (
                <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-28 border-t border-line py-[clamp(40px,5vw,72px)] first:border-t-0 first:pt-0">
                  <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-7" data-reveal>
                      <p className="eyebrow flex items-center gap-3 text-teal">
                        <span className="tabular">{pad(i + 1)}</span>
                        {parent && <span className="text-muted">Part of {parent.title}</span>}
                      </p>
                      <h2 id={`${c.slug}-h`} className="display-caps mt-4 text-h2">
                        <Link href={`/services/${c.slug}`} className="hover:text-teal">
                          {c.title}
                        </Link>
                      </h2>
                      <p className="mt-5 text-muted">{c.summary}</p>

                      {c.children && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {c.children.map((s) => (
                            <li key={s}>
                              <Link href={`/services/${s}`} className="inline-block border border-teal/40 px-3 py-1.5 text-[13px] text-teal transition-colors hover:bg-teal hover:text-white">
                                {getCapability(s).title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {labels.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${c.title} services`}>
                          {shown.map((l) => (
                            <li key={l} className="border border-line px-3 py-1.5 text-[13px] text-ink/80">
                              {l}
                            </li>
                          ))}
                          {labels.length > CHIP_LIMIT && (
                            <li className="px-1 py-1.5 text-[13px] text-teal">+{labels.length - CHIP_LIMIT} more</li>
                          )}
                        </ul>
                      )}

                      <div className="mt-8">
                        <ArrowLink href={`/services/${c.slug}`} className="text-teal">
                          View {c.title}
                        </ArrowLink>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <Link href={`/services/${c.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                        <Media id={`svc-${c.slug}-card`} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw" />
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <ContactCta />
    </>
  );
}
