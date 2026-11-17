import { SITE_URL, INDEXABLE } from "@/lib/seo";

// Review builds (no domain configured) block all crawlers.
export default function robots() {
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
