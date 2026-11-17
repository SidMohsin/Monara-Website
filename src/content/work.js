// ─────────────────────────────────────────────────────────────────────────────
// Work / projects.
//
// ⚠ ALL ENTRIES BELOW ARE PLACEHOLDERS for layout review (placeholder: true).
// They are not MONARA projects. Placeholder project pages are `noindex` and
// excluded from the sitemap. Replace with real, client-approved projects:
// set `placeholder: false`, fill in the fields, and add media to src/content/media.js.
// `capabilities` uses slugs from src/content/services.js.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    slug: "placeholder-project-01",
    placeholder: true,
    title: "Project Title 01",
    client: "Client Name",
    year: "0000",
    capabilities: ["photography", "360-campaigns"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-01-cover",
    gallery: ["work-01-g1", "work-01-g2", "work-01-g3"],
  },
  {
    slug: "placeholder-project-02",
    placeholder: true,
    title: "Project Title 02",
    client: "Client Name",
    year: "0000",
    capabilities: ["video-and-film"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-02-cover",
    gallery: ["work-02-g1", "work-02-g2", "work-02-g3"],
  },
  {
    slug: "placeholder-project-03",
    placeholder: true,
    title: "Project Title 03",
    client: "Client Name",
    year: "0000",
    capabilities: ["smart-tech"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-03-cover",
    gallery: ["work-03-g1", "work-03-g2", "work-03-g3"],
  },
  {
    slug: "placeholder-project-04",
    placeholder: true,
    title: "Project Title 04",
    client: "Client Name",
    year: "0000",
    capabilities: ["creative-and-brand", "strategy-and-consulting"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-04-cover",
    gallery: ["work-04-g1", "work-04-g2", "work-04-g3"],
  },
  {
    slug: "placeholder-project-05",
    placeholder: true,
    title: "Project Title 05",
    client: "Client Name",
    year: "0000",
    capabilities: ["post-production", "video-and-film"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-05-cover",
    gallery: ["work-05-g1", "work-05-g2", "work-05-g3"],
  },
  {
    slug: "placeholder-project-06",
    placeholder: true,
    title: "Project Title 06",
    client: "Client Name",
    year: "0000",
    capabilities: ["digital-marketing", "paid-media-and-performance-marketing"],
    summary: "One or two lines describing the project, the brief and the outcome. To be supplied by the client.",
    cover: "work-06-cover",
    gallery: ["work-06-g1", "work-06-g2", "work-06-g3"],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
