import HomeHero from "@/components/home/HomeHero";
import { About, Services, StoryBand, Contact } from "@/components/home/HomeSections";
import HashOpener from "@/components/home/HashOpener";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { site } from "@/content/site";
import { capabilities } from "@/lib/services";

export const metadata = {
  ...pageMeta({ path: "/" }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

// Business details for search engines (schema.org). Real, client-confirmed values only:
// no address, phone or profiles until they are supplied. Output only on the live domain.
function organizationJsonLd() {
  const c = site.contact;
  const sameAs = site.social.filter((s) => s.href).map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/monara-logo.svg`,
    slogan: site.tagline,
    description: site.description,
    ...(c.email && { email: c.email }),
    ...(c.phoneHref && { telephone: c.phone }),
    ...(sameAs.length && { sameAs }),
    areaServed: site.country,
    knowsAbout: capabilities.map((cap) => cap.title),
  };
}

// One-page site (client decision). <FeaturedWork /> goes back in after <Services />
// once real projects are supplied; see Docs/client-checklist.md.
export default function HomePage() {
  return (
    <>
      {SITE_URL && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c") }} />}
      <HomeHero />
      <About />
      <Services />
      <StoryBand />
      <Contact />
      <HashOpener />
    </>
  );
}
