import { contactPage } from "@/content/copy";
import { site } from "@/content/site";
import { capabilities } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Media from "@/components/media/Media";
import Draft from "@/components/ui/Draft";

export const metadata = pageMeta({
  title: "Contact",
  description: "Start your project with MONARA Productions, Sri Lanka. Tell us about your product, brand or campaign.",
  path: "/contact",
});

function Row({ label, children }) {
  return (
    <div className="border-t border-line py-5">
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-2 text-[17px]">{children}</dd>
    </div>
  );
}

// PLACEHOLDER values come from src/content/site.js; links stay disabled until real details are set.
function Ph({ children }) {
  return (
    <span className="text-ink/70" title="Placeholder: to be supplied by the client">
      {children}
    </span>
  );
}

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero eyebrow="Contact" title={contactPage.heading} lead={<Draft on={contactPage.intro.draft}>{contactPage.intro.text}</Draft>} />

      <section aria-label="Enquiry form and contact details" className="container-x pb-[clamp(80px,12vw,176px)]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="sr-only">Enquiry form</h2>
            <ContactForm capabilities={capabilities.map(({ slug, title }) => ({ slug, title }))} fallbackEmail={c.email} />
          </div>

          <aside className="lg:col-span-5" aria-labelledby="details-h">
            <h2 id="details-h" className="eyebrow text-teal" data-reveal>
              Contact details
            </h2>
            <dl className="mt-6" data-reveal style={{ "--reveal-i": 1 }}>
              <Row label="Email">{c.email && !c.email.includes("yourdomain") ? <a href={`mailto:${c.email}`} className="link-underline">{c.email}</a> : <Ph>{c.email}</Ph>}</Row>
              <Row label="Phone">{c.phoneHref ? <a href={c.phoneHref} className="link-underline">{c.phone}</a> : <Ph>{c.phone}</Ph>}</Row>
              <Row label="WhatsApp">{c.whatsappHref ? <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline">{c.whatsapp}</a> : <Ph>{c.whatsapp}</Ph>}</Row>
              <Row label="Studio">
                {c.address.map((l) => (
                  <span key={l} className="block">
                    <Ph>{l}</Ph>
                  </span>
                ))}
              </Row>
              <Row label="Follow">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {site.social.map((s) => (
                    <li key={s.label}>{s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">{s.label}</a> : <Ph>{s.label}</Ph>}</li>
                  ))}
                </ul>
              </Row>
            </dl>
            <div className="mt-10">
              <Media id="contact-side" sizes="(min-width: 1024px) 35vw, 100vw" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
