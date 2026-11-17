import Link from "next/link";
import { aboutPage, home } from "@/content/copy";
import { site } from "@/content/site";
import { capabilities, pad } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/sections/SectionHeader";
import ContactCta from "@/components/sections/ContactCta";
import Media from "@/components/media/Media";
import Draft from "@/components/ui/Draft";
import { Arrow } from "@/components/ui/Links";
import TeamBlock from "@/components/about/TeamBlock";
import { visibleTeam } from "@/content/team";

export const metadata = pageMeta({
  title: "About",
  description: "MONARA Productions is a creative production studio in Sri Lanka, bringing together creativity, production and Smart Tech.",
  path: "/about",
});

export default function AboutPage() {
  const a = aboutPage;
  const hasTeam = visibleTeam().length > 0;

  return (
    <>
      <PageHero eyebrow={site.positioning} title={a.heading} />

      <div className="container-x">
        <Media id="about-hero" priority sizes="100vw" />
      </div>

      {/* Introduction (draft) */}
      <section aria-label="Introduction" className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-teal lg:col-span-3" data-reveal>
            {site.name}
          </p>
          <div className="lg:col-span-9">
            <p className="text-[clamp(1.5rem,1.1rem+1.7vw,2.75rem)] font-light leading-[1.25]" data-reveal>
              <Draft on={a.intro.draft}>{a.intro.lead}</Draft>
            </p>
            <div className="mt-10 grid gap-8 text-muted md:grid-cols-2 md:gap-12">
              {a.intro.body.map((p, i) => (
                <p key={i} data-reveal style={{ "--reveal-i": i + 1 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach: the three brand pillars */}
      <section aria-labelledby="approach-h" className="bg-ink text-white">
        <div className="container-x section-y">
          <SectionHeader dark index="01" eyebrow={site.positioning} title={<Draft on={a.approachHeading.draft}>{a.approachHeading.text}</Draft>} id="approach-h" />
          <ul className="mt-14 grid gap-px bg-ink-line md:grid-cols-3">
            {home.pillars.map((p, i) => (
              <li key={p.title} className="bg-ink p-8 lg:p-12" data-reveal style={{ "--reveal-i": i }}>
                <span className="tabular text-sm text-teal-light">{pad(i + 1)}</span>
                <h3 className="display-caps mt-10 text-h2">{p.title}</h3>
                <p className="mt-4 text-lead font-light text-muted-dark">{p.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-2xl text-lead font-light text-white/85" data-reveal>
            {site.tagline}
          </p>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="what-h" className="container-x section-y">
        <SectionHeader index="02" eyebrow="Capabilities" title={<Draft on={a.whatWeDoHeading.draft}>{a.whatWeDoHeading.text}</Draft>} id="what-h" />
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li key={c.slug} className="bg-paper" data-reveal style={{ "--reveal-i": i % 3 }}>
              <Link href={`/services/${c.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-mist lg:p-8">
                <span className="flex items-baseline gap-4">
                  <span className="tabular text-xs text-muted">{pad(i + 1)}</span>
                  <span className="display-caps text-[1.125rem] leading-tight group-hover:text-teal">{c.title}</span>
                </span>
                <Arrow className="text-muted group-hover:translate-x-1 group-hover:text-teal" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Studio */}
      <section aria-labelledby="studio-h" className="container-x pb-[clamp(80px,12vw,176px)]">
        <SectionHeader index="03" eyebrow="Studio" title={<Draft on={a.studioHeading.draft}>{a.studioHeading.text}</Draft>} id="studio-h" />
        <div className="mt-12 grid gap-[clamp(16px,2vw,28px)] md:grid-cols-12">
          <div className="md:col-span-3">
            <Media id="about-studio-1" sizes="(min-width: 768px) 25vw, 100vw" />
          </div>
          <div className="md:col-span-6 md:self-center">
            <Media id="about-studio-2" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="md:col-span-3 md:self-end">
            <Media id="about-studio-3" sizes="(min-width: 768px) 25vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Optional founder / team block: hidden until real people are added */}
      <TeamBlock index={hasTeam ? "04" : undefined} />

      <ContactCta />
    </>
  );
}
