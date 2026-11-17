import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/work";
import { getCapability } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactCta from "@/components/sections/ContactCta";
import Media from "@/components/media/Media";
import { Arrow } from "@/components/ui/Links";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  // Placeholder projects are never indexed and never get a project description in metadata.
  return pageMeta({ title: p.title, description: p.placeholder ? undefined : p.summary, path: `/work/${slug}`, noindex: p.placeholder });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === slug);
  const next = projects[(i + 1) % projects.length];
  const caps = p.capabilities.map(getCapability).filter(Boolean);

  return (
    <>
      <PageHero crumbs={[{ label: "Work", href: "/work" }, { label: p.title }]} eyebrow={p.placeholder ? "Placeholder project" : "Project"} title={p.title} />

      <div className="container-x">
        <Media id={p.cover} ratio="21/9" priority sizes="100vw" />
      </div>

      <section aria-label="Project overview" className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm lg:col-span-4 lg:grid-cols-1 lg:self-start" data-reveal>
            <div>
              <dt className="eyebrow text-muted">Client</dt>
              <dd className="mt-2">{p.client}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Year</dt>
              <dd className="tabular mt-2">{p.year}</dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="eyebrow text-muted">Services</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {caps.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/services/${c.slug}`} className="inline-block border border-line px-2.5 py-1 text-[12px] uppercase tracking-[0.12em] hover:border-teal hover:text-teal">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="lg:col-span-8" data-reveal style={{ "--reveal-i": 1 }}>
            <p className="eyebrow text-teal">Overview</p>
            <p className="mt-5 text-lead font-light">{p.summary}</p>
          </div>
        </div>
      </section>

      <section aria-label="Gallery" className="container-x pb-[clamp(80px,12vw,176px)]">
        <div className="grid gap-[clamp(16px,2vw,28px)] md:grid-cols-2">
          <Media id={p.gallery[0]} sizes="(min-width: 768px) 50vw, 100vw" />
          <Media id={p.gallery[1]} sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="md:col-span-2">
            <Media id={p.gallery[2]} sizes="100vw" />
          </div>
        </div>
      </section>

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="container-x group flex items-center justify-between gap-6 py-[clamp(48px,7vw,96px)]">
          <span>
            <span className="eyebrow text-muted">Next project</span>
            <span className="display-caps mt-3 block text-h2 group-hover:text-teal">{next.title}</span>
          </span>
          <Arrow className="h-8 w-8 group-hover:translate-x-2 group-hover:text-teal" />
        </Link>
      </nav>

      <ContactCta />
    </>
  );
}
