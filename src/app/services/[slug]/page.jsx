import Link from "next/link";
import { notFound } from "next/navigation";
import { capabilities, getCapability, neighbours, visibleGroups, pad } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactCta from "@/components/sections/ContactCta";
import SectionHeader from "@/components/sections/SectionHeader";
import ServiceGroups from "@/components/services/ServiceGroups";
import Media from "@/components/media/Media";
import { Arrow } from "@/components/ui/Links";

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) return {};
  // first sentence of the client's own description
  const desc = c.summary.split(/(?<=\.)\s/)[0];
  return pageMeta({ title: c.title, description: desc, path: `/services/${slug}` });
}

export default async function CapabilityPage({ params }) {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) notFound();

  const groups = visibleGroups(c);
  const parent = c.parent && getCapability(c.parent);
  // Single-topic pages use the workbook topic description as a strapline
  const strapline = groups.length === 1 ? groups[0].description : null;
  const { prev, next } = neighbours(slug);
  const idx = capabilities.findIndex((x) => x.slug === slug);

  const crumbs = [{ label: "Services", href: "/services" }, ...(parent ? [{ label: parent.title, href: `/services/${parent.slug}` }] : []), { label: c.title }];

  let section = 0;
  const n = () => pad(++section);

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={`${pad(idx + 1)} · Capability`} title={c.title} lead={strapline} />

      <div className="container-x">
        <Media id={`svc-${slug}-hero`} priority sizes="100vw" />
      </div>

      {/* Introduction: Sheet3 description */}
      <section aria-label="Introduction" className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-teal lg:col-span-3" data-reveal>
            Overview
          </p>
          <p className="text-[clamp(1.375rem,1.05rem+1.3vw,2.25rem)] font-light leading-[1.3] lg:col-span-9" data-reveal style={{ "--reveal-i": 1 }}>
            {c.summary}
          </p>
        </div>
      </section>

      {/* 360° Campaigns hub: its three capabilities */}
      {c.children && (
        <section aria-labelledby="includes-h" className="container-x pb-[clamp(80px,12vw,176px)]">
          <SectionHeader index={n()} eyebrow="Includes" title="Three capabilities, one campaign" id="includes-h" />
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {c.children.map((s, i) => {
              const child = getCapability(s);
              return (
                <li key={s} data-reveal style={{ "--reveal-i": i }}>
                  <Link href={`/services/${s}`} className="group block">
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.03]">
                        <Media id={`svc-${s}-card`} reveal={false} sizes="(min-width: 768px) 33vw, 100vw" />
                      </div>
                    </div>
                    <h3 className="display-caps mt-5 flex items-center justify-between text-h3">
                      {child.title}
                      <Arrow className="text-muted group-hover:translate-x-1 group-hover:text-teal" />
                    </h3>
                    <p className="mt-3 line-clamp-3 text-[15px] text-muted">{child.summary}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Services (workbook tab 1). Creative & Brand has none yet: section omitted. */}
      {groups.length > 0 && (
        <section aria-labelledby="services-h" className="bg-mist">
          <div className="container-x section-y">
            <SectionHeader index={n()} eyebrow="Services" title={`What ${c.title} covers`} id="services-h" />
            <div className="mt-14">
              <ServiceGroups groups={groups} capabilityTitle={c.title} />
            </div>
          </div>
        </section>
      )}

      {/* Process / deliverables: intentionally omitted until real content exists. */}

      {/* Gallery (placeholders until real images are supplied) */}
      <section aria-labelledby="gallery-h" className="container-x section-y">
        <SectionHeader index={n()} eyebrow="Gallery" title="In frame" id="gallery-h" />
        <div className="mt-12 grid gap-[clamp(16px,2vw,28px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Media id={`svc-${slug}-g1`} sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div className="md:col-span-4 md:mt-24">
            <Media id={`svc-${slug}-g2`} sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div className="self-end md:col-span-4">
            <Media id={`svc-${slug}-g3`} sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Previous / next capability */}
      <nav aria-label="More capabilities" className="container-x grid border-t border-line md:grid-cols-2">
        <Link href={`/services/${prev.slug}`} className="group flex flex-col gap-3 border-b border-line py-10 md:border-b-0 md:border-r md:pr-10">
          <span className="eyebrow text-muted">Previous</span>
          <span className="display-caps flex items-center gap-4 text-h3 group-hover:text-teal">
            <Arrow className="rotate-180 group-hover:-translate-x-1" />
            {prev.title}
          </span>
        </Link>
        <Link href={`/services/${next.slug}`} className="group flex flex-col items-end gap-3 py-10 text-right md:pl-10">
          <span className="eyebrow text-muted">Next</span>
          <span className="display-caps flex items-center gap-4 text-h3 group-hover:text-teal">
            {next.title}
            <Arrow className="group-hover:translate-x-1" />
          </span>
        </Link>
      </nav>

      <ContactCta />
    </>
  );
}
