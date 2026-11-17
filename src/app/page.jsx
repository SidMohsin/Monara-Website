import HomeHero from "@/components/home/HomeHero";
import { About, Services, StoryBand, Contact } from "@/components/home/HomeSections";
import HashOpener from "@/components/home/HashOpener";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = {
  ...pageMeta({ path: "/" }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

// One-page site (client decision). <FeaturedWork /> goes back in after <Services />
// once real projects are supplied; see Docs/client-checklist.md.
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <About />
      <Services />
      <StoryBand />
      <Contact />
      <HashOpener />
    </>
  );
}
