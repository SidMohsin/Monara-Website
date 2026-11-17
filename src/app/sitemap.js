import { capabilities } from "@/content/services";
import { projects } from "@/content/work";
import { SITE_URL } from "@/lib/seo";

// Absolute URLs need the real domain. Until NEXT_PUBLIC_SITE_URL is set the sitemap is empty
// (the site is noindex during review anyway). Placeholder projects are never listed.
export default function sitemap() {
  if (!SITE_URL) return [];
  const paths = ["/", "/services", ...capabilities.map((c) => `/services/${c.slug}`), "/work", ...projects.filter((p) => !p.placeholder).map((p) => `/work/${p.slug}`), "/about", "/contact"];
  return paths.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
