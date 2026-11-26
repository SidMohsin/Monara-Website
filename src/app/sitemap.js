import { SITE_URL } from "@/lib/seo";

// One-page site: only the home page is listed (old section paths are redirects, not pages).
// Production builds list the canonical domain (site.url, see src/lib/seo.js); preview and
// local builds have no site URL, so their sitemap is empty (they are noindex anyway).
export default function sitemap() {
  if (!SITE_URL) return [];
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
