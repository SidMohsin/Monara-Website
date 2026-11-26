import { home, contactCta, contactPage } from "@/content/copy";
import { site } from "@/content/site";
import { projects } from "@/content/work";
import { capabilities, umbrella } from "@/lib/services";
import Media from "@/components/media/Media";
import { getMedia } from "@/content/media";
import FrameMarks from "@/components/media/FrameMarks";
import SectionHeader from "@/components/sections/SectionHeader";
import WorkCard from "@/components/work/WorkCard";
import ContactForm from "@/components/contact/ContactForm";
import Draft from "@/components/ui/Draft";
import CapabilityList from "./CapabilityList";
import Positioning from "@/components/brand/Positioning";

/* One-page site. Section order follows the reference home page:
   hero → about/intro → capabilities → (work, once real projects exist) → story band → contact. */

/** Shows the studio name in bold within client copy (wording unchanged). */
function boldMonara(text) {
  return text.split(/(Monara)/).map((part, i) => (part === "Monara" ? <strong key={i} className="font-semibold">{part}</strong> : part));
}

/** About: Sheet3 introduction (client wording) + studio image. */
export function About() {
  const [first, ...rest] = home.intro;
  const a = home.aboutPreview;
  return (
    <section id="about" aria-labelledby="about-heading" className="container-x section-y">
      <SectionHeader index="01" eyebrow="About" title={<Draft on={a.draft}>{a.heading}</Draft>} id="about-heading" />
      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          {/* Client feedback: stronger weight for the lead, "Monara" in bold, slightly smaller size */}
          <p className="text-[clamp(1.375rem,1rem+0.9vw,1.875rem)] font-normal leading-[1.35]" data-reveal>
            {boldMonara(first)}
          </p>
          {/* Client feedback: centre line between the two columns */}
          <div className="mt-12 grid gap-8 text-muted md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
            {rest.map((p, i) => (
              <p key={i} className="md:px-10 md:first:pl-0 md:last:pr-0" data-reveal style={{ "--reveal-i": i + 1 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        {/* full portrait film, width capped so it fits on screen */}
        <div className="mx-auto w-full max-w-[360px] lg:col-span-5 lg:mr-0 lg:max-w-[380px]">
          <Media id="home-about" sizes="380px" />
        </div>
      </div>
    </section>
  );
}

/** Services: the nine capabilities; each row opens in place with its service list. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="container-x pb-[clamp(80px,12vw,176px)]">
      {/* footer and old /services/360-campaigns links land here */}
      <span id={umbrella.slug} aria-hidden="true" className="block" />
      <SectionHeader title={home.servicesHeading} id="services-heading" />
      {/* 360° Campaigns description (client wording) introduces the eight capabilities */}
      <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-muted lg:text-[19px]" data-reveal style={{ "--reveal-i": 2 }}>
        {umbrella.summary}
      </p>
      <div className="mt-12">
        <CapabilityList />
      </div>
    </section>
  );
}

/** Work: hidden on the one-page site until real projects are supplied (kept for later). */
export function FeaturedWork() {
  const [a, b, c, d] = projects;
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-mist">
      <div className="container-x section-y">
        <SectionHeader index="03" eyebrow="Selected work" title={<Draft on={home.workHeading.draft}>{home.workHeading.text}</Draft>} id="work-heading" />
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
  const real = getMedia("home-story").status === "final";
  return (
    <section aria-labelledby="story-heading" className="relative overflow-hidden bg-ink text-white">
      {/* real artwork arrives already darkened, so it is dimmed less than the placeholder */}
      <div className={`absolute inset-0 ${real ? "" : "opacity-60"}`} aria-hidden="true">
        {/* desktop/tablet: 4:3 image; phones: their own tall image (only one is downloaded) */}
        <div className={`absolute inset-[-12%_0] ${real ? "hidden md:block" : ""}`} data-parallax="0.08">
          <Media id="home-story" fill label={false} reveal={false} sizes="100vw" />
        </div>
        {real && (
          <div className="absolute inset-[-12%_0] md:hidden" data-parallax="0.08">
            <Media id="home-story-mobile" fill label={false} reveal={false} sizes="100vw" />
          </div>
        )}
      </div>
      <div className={`absolute inset-0 bg-linear-to-b ${real ? "from-ink/80 via-ink/10 to-ink/85" : "from-ink via-ink/40 to-ink"}`} aria-hidden="true" />
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
        {getMedia("home-story").status !== "final" && <p className="mt-6 text-right text-[10px] uppercase tracking-[0.2em] text-white/40">Background: placeholder · behind-the-scenes footage</p>}
      </div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div className="border-t border-line py-5">
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-2 text-[17px]">{children}</dd>
    </div>
  );
}

/** Contact: Sheet3 closing words, then the enquiry form and contact details. Target of every "Start Your Project" button. */
export function Contact() {
  const c = site.contact;
  const social = site.social.filter((s) => s.href); // only profiles with a real link
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="grain relative overflow-hidden bg-teal text-white">
        <FrameMarks thirds={false} inset="clamp(16px,3vw,36px)" />
        <div className="container-x relative z-[3] py-[clamp(88px,12vw,168px)]">
          <p className="eyebrow text-white" data-reveal>
            {site.tagline}
          </p>
          <h2 id="contact-heading" className="display-caps mt-6 max-w-5xl text-h1" data-reveal style={{ "--reveal-i": 1 }}>
            {contactCta.heading}
          </h2>
          <p className="mt-10 max-w-3xl text-lead font-light text-white/85" data-reveal style={{ "--reveal-i": 2 }}>
            {contactCta.body}
          </p>
        </div>
      </div>

      <div className="container-x section-y">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" data-reveal>
            <h3 className="display-caps text-h2">{contactPage.heading}</h3>
            <p className="mt-4 max-w-xl text-muted">
              <Draft on={contactPage.intro.draft}>{contactPage.intro.text}</Draft>
            </p>
            <div className="mt-10">
              <ContactForm capabilities={capabilities.map(({ slug, title }) => ({ slug, title }))} fallbackEmail={c.email} />
            </div>
          </div>

          <aside className="lg:col-span-5" aria-labelledby="details-h">
            <h3 id="details-h" className="eyebrow text-teal" data-reveal>
              Contact details
            </h3>
            <dl className="mt-6 border-b border-line" data-reveal style={{ "--reveal-i": 1 }}>
              {c.email && (
                <Row label="Email">
                  <a href={`mailto:${c.email}`} className="link-underline">{c.email}</a>
                </Row>
              )}
              {c.phone && <Row label="Phone">{c.phoneHref ? <a href={c.phoneHref} className="link-underline">{c.phone}</a> : c.phone}</Row>}
              {c.whatsapp && (
                <Row label="WhatsApp">
                  {c.whatsappHref ? <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline">{c.whatsapp}</a> : c.whatsapp}
                </Row>
              )}
              {c.address.length > 0 && (
                <Row label="Studio">
                  {c.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </Row>
              )}
              {social.length > 0 && (
                <Row label="Follow">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {social.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Row>
              )}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
