import { projects } from "@/content/work";
import { workPage } from "@/content/copy";
import { getMedia } from "@/content/media";
import { capabilities } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactCta from "@/components/sections/ContactCta";
import WorkCard from "@/components/work/WorkCard";
import WorkFilter from "@/components/work/WorkFilter";
import Draft from "@/components/ui/Draft";

export const metadata = pageMeta({
  title: "Work",
  description: "Selected work by MONARA Productions, Sri Lanka, across photography, film, post-production and Smart Tech.",
  path: "/work",
});

export default function WorkPage() {
  const anyPlaceholder = projects.some((p) => p.placeholder);
  const usedCaps = new Set(projects.flatMap((p) => p.capabilities));
  const filters = capabilities.filter((c) => usedCaps.has(c.slug)).map(({ slug, title }) => ({ slug, title }));
  const items = projects.map((p) => ({
    key: p.slug,
    caps: p.capabilities,
    node: <WorkCard project={p} ratio={getMedia(p.cover).ratio === "21/9" ? "16/9" : getMedia(p.cover).ratio} headingLevel={2} sizes="(min-width: 768px) 50vw, 100vw" />,
  }));

  return (
    <>
      <PageHero eyebrow="Selected work" title={workPage.heading} lead={<Draft on={workPage.intro.draft}>{workPage.intro.text}</Draft>}>
        {anyPlaceholder && (
          <p className="mt-10 inline-flex max-w-2xl items-start gap-3 border border-teal/30 bg-mist px-4 py-3 text-sm text-ink/80" data-reveal>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
            {workPage.reviewNotice}
          </p>
        )}
      </PageHero>

      <section aria-label="Projects" className="container-x pb-[clamp(80px,12vw,176px)]">
        <WorkFilter filters={filters} items={items} />
      </section>

      <ContactCta />
    </>
  );
}
