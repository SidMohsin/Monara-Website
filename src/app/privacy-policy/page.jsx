import { privacyPage } from "@/content/copy";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "Privacy policy for MONARA Productions. Awaiting client-approved text.",
  path: "/privacy-policy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={privacyPage.heading} />
      <section className="container-x pb-[clamp(80px,12vw,176px)]">
        <div className="flex max-w-3xl items-start gap-4 border border-teal/30 bg-mist p-6 lg:p-8" role="note">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" aria-hidden="true" />
          <p className="text-lead font-light">{privacyPage.notice}</p>
        </div>
      </section>
    </>
  );
}
