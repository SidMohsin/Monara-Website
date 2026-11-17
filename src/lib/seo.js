import { site } from "@/content/site";

// The site is only indexable once a real domain is configured.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
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
