import { site } from "@/content/site";

// Canonical domain. Production builds (Vercel "production" environment) are indexable on
// site.url automatically; preview and local builds stay noindex. NEXT_PUBLIC_SITE_URL, if set,
// overrides it (for example to force indexing elsewhere).
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || (IS_PRODUCTION ? site.url : "") || "").replace(/\/$/, "") || null;
export const INDEXABLE = Boolean(SITE_URL);

/** Builds page metadata. `noindex` forces noindex (e.g. placeholder projects). */
export function pageMeta({ title, description, path = "/", noindex = false }) {
  const desc = description || site.description;
  return {
    title,
    description: desc,
    ...(SITE_URL ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: title ? `${title} | ${site.name}` : site.name,
      description: desc,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_LK",
    },
    twitter: { card: "summary_large_image", title: title ? `${title} | ${site.name}` : site.name, description: desc },
    ...(noindex || !INDEXABLE ? { robots: { index: false, follow: !noindex } } : {}),
  };
}
