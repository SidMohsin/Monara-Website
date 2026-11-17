import HomeHero from "@/components/home/HomeHero";
import { Intro, Capabilities, FeaturedWork, StoryBand, AboutPreview } from "@/components/home/HomeSections";
import ContactCta from "@/components/sections/ContactCta";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = {
  ...pageMeta({ path: "/" }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Intro />
      <Capabilities />
      <FeaturedWork />
      <StoryBand />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
