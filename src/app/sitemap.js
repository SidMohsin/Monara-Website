import { SITE_URL } from "@/lib/seo";

// One-page site: only the home page is listed. Absolute URLs need the real domain,
// so until NEXT_PUBLIC_SITE_URL is set the sitemap is empty (the site is noindex anyway).
export default function sitemap() {
  if (!SITE_URL) return [];
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
