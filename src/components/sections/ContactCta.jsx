import { contactCta } from "@/content/copy";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Links";
import FrameMarks from "@/components/media/FrameMarks";

// Closing CTA band (Sheet3 wording). Used at the end of most pages.
export default function ContactCta() {
  return (
    <section aria-labelledby="cta-heading" className="grain relative overflow-hidden bg-teal text-white">
      <FrameMarks thirds={false} inset="clamp(16px,3vw,36px)" />
      <div className="container-x relative z-[3] py-[clamp(88px,12vw,168px)]">
        <p className="eyebrow text-white" data-reveal>
          {site.tagline}
        </p>
        <h2 id="cta-heading" className="display-caps mt-6 max-w-5xl text-h1" data-reveal style={{ "--reveal-i": 1 }}>
          {contactCta.heading}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="text-lead font-light text-white/85 md:col-span-7" data-reveal style={{ "--reveal-i": 2 }}>
            {contactCta.body}
          </p>
          <div className="md:col-span-5 md:flex md:justify-end" data-reveal style={{ "--reveal-i": 3 }}>
            <ButtonLink href={site.cta.href} variant="solid" tone="dark">
              {contactCta.button}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
