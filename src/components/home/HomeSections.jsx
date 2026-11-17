import { home } from "@/content/copy";
import { site } from "@/content/site";
import { projects } from "@/content/work";
import Media from "@/components/media/Media";
import SectionHeader from "@/components/sections/SectionHeader";
import WorkCard from "@/components/work/WorkCard";
import { ArrowLink } from "@/components/ui/Links";
import Draft from "@/components/ui/Draft";
import CapabilityList from "./CapabilityList";
import Positioning from "@/components/brand/Positioning";

export function Intro() {
  const [first, ...rest] = home.intro;
  return (
    <section aria-label="Introduction" className="container-x section-y">
      <div className="grid gap-12 lg:grid-cols-12">
        <p className="eyebrow text-teal lg:col-span-3" data-reveal>
          {site.name}
        </p>
        <div className="lg:col-span-9">
          <p className="text-[clamp(1.5rem,1.1rem+1.7vw,2.75rem)] font-light leading-[1.25]" data-reveal>
            {first}
          </p>
          <div className="mt-12 grid gap-8 text-muted md:grid-cols-2 md:gap-12">
            {rest.map((p, i) => (
              <p key={i} data-reveal style={{ "--reveal-i": i + 1 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className="container-x pb-[clamp(80px,12vw,176px)]">
      <SectionHeader index="01" eyebrow="What we do" title={home.capabilitiesHeading} id="capabilities-heading" aside={<ArrowLink href="/services">All services</ArrowLink>} />
      <div className="mt-12">
        <CapabilityList />
      </div>
    </section>
  );
}

export function FeaturedWork() {
  const [a, b, c, d] = projects;
  return (
    <section aria-labelledby="work-heading" className="bg-mist">
      <div className="container-x section-y">
        <SectionHeader index="02" eyebrow="Selected work" title={<Draft on={home.workHeading.draft}>{home.workHeading.text}</Draft>} id="work-heading" aside={<ArrowLink href="/work">View all work</ArrowLink>} />
        {/* Mixed aspect ratios, asymmetric two-column rhythm */}
        <div className="mt-14 grid gap-x-[clamp(24px,4vw,64px)] gap-y-16 md:grid-cols-12">
          <WorkCard project={a} ratio="16/9" className="md:col-span-7" />
          <WorkCard project={b} ratio="4/5" className="md:col-span-5 md:mt-32" sizes="(min-width: 768px) 40vw, 100vw" />
          <WorkCard project={c} ratio="4/5" className="md:col-span-5" sizes="(min-width: 768px) 40vw, 100vw" />
          <WorkCard project={d} ratio="16/9" className="md:col-span-7 md:mt-40" />
        </div>
      </div>
    </section>
  );
}

export function StoryBand() {
  return (
    <section aria-labelledby="story-heading" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute inset-[-12%_0]" data-parallax="0.08">
          <Media id="home-story" fill label={false} reveal={false} />
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/40 to-ink" aria-hidden="true" />
      <div className="container-x relative z-[3] py-[clamp(112px,16vw,240px)]">
        <div data-reveal>
          <Positioning className="text-teal-light" />
        </div>
        <h2 id="story-heading" className="display-caps mt-6 max-w-[14ch] text-display" data-reveal style={{ "--reveal-i": 1 }}>
          {site.tagline}
        </h2>
        <ul className="mt-[clamp(64px,9vw,128px)] grid gap-px bg-ink-line sm:grid-cols-3">
          {home.pillars.map((p, i) => (
            <li key={p.title} className="bg-ink/85 p-8 backdrop-blur-sm lg:p-10" data-reveal style={{ "--reveal-i": i + 2 }}>
              <span className="tabular text-sm text-teal-light">0{i + 1}</span>
              <h3 className="display-caps mt-6 text-h3">{p.title}</h3>
              <p className="mt-3 text-muted-dark">{p.line}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-right text-[10px] uppercase tracking-[0.2em] text-white/40">Background: placeholder · behind-the-scenes footage</p>
      </div>
    </section>
  );
}

export function AboutPreview() {
  const a = home.aboutPreview;
  return (
    <section aria-labelledby="about-heading" className="container-x section-y">
      <div className="grid items-center gap-12 md:grid-cols-12 lg:gap-20">
        <div className="md:col-span-5">
          <Media id="home-about" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div className="md:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-teal" data-reveal>
            <span className="tabular">03</span>
            <span aria-hidden="true" className="h-px w-8 bg-teal/60" />
            About
          </p>
          <h2 id="about-heading" className="display-caps mt-6 text-h2" data-reveal style={{ "--reveal-i": 1 }}>
            <Draft on={a.draft}>{a.heading}</Draft>
          </h2>
          <p className="mt-8 max-w-xl text-lead font-light text-ink/80" data-reveal style={{ "--reveal-i": 2 }}>
            {a.body}
          </p>
          <div className="mt-10" data-reveal style={{ "--reveal-i": 3 }}>
            <ArrowLink href="/about" className="text-teal">
              {a.link}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
