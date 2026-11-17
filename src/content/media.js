// ─────────────────────────────────────────────────────────────────────────────
// MEDIA REGISTRY: the single place every image / video slot on the site is defined.
//
// To swap a placeholder for a real file:
//   1. put the file in /public/media/… (or use a remote URL allowed in next.config)
//   2. set `src` (and `poster` for video), write a real `alt`, set `status: "final"`
//      and fill in `width`/`height` if you have them.
// `npm run assets:checklist` regenerates Docs/asset-checklist.md from this file.
//
// While `src` is null, <Media> renders a branded placeholder frame (never stock/AI).
// `art` picks the placeholder composition: plinth | horizon | waveform | wire |
// triangle | grid | aperture | contact.
// ─────────────────────────────────────────────────────────────────────────────

import { capabilities } from "./services.js";
import { projects } from "./work.js";

const CAP_ART = {
  "360-campaigns": "triangle",
  photography: "plinth",
  "video-and-film": "horizon",
  "post-production": "waveform",
  "smart-tech": "wire",
  "creative-and-brand": "triangle",
  "strategy-and-consulting": "grid",
  "digital-marketing": "contact",
  "paid-media-and-performance-marketing": "aperture",
};

const base = [
  // Home
  { id: "home-hero", page: "Home", section: "Hero (background video)", type: "video", ratio: "16/9", subject: "Showreel / hero film", art: "horizon", note: "MP4, landscape, ≤10 MB, plus a poster frame. Sheet3: 'first image video'." },
  { id: "home-story", page: "Home", section: "Visual storytelling band", ratio: "21/9", subject: "Behind the scenes, on set", art: "horizon" },
  { id: "home-about", page: "Home", section: "About preview", ratio: "4/5", subject: "Studio / team at work", art: "aperture" },
  // About
  { id: "about-hero", page: "About", section: "Hero", ratio: "21/9", subject: "Studio, wide", art: "aperture" },
  { id: "about-studio-1", page: "About", section: "Studio strip", ratio: "4/5", subject: "Studio detail: lighting set-up", art: "plinth" },
  { id: "about-studio-2", page: "About", section: "Studio strip", ratio: "16/9", subject: "Studio, wide", art: "horizon" },
  { id: "about-studio-3", page: "About", section: "Studio strip", ratio: "4/5", subject: "Editing suite", art: "waveform" },
  // Contact
  { id: "contact-side", page: "Contact", section: "Beside form", ratio: "4/5", subject: "Studio entrance / location", art: "triangle" },
];

// Gallery slots rotate through related compositions so a page never repeats one image three times
const ALT_ART = {
  triangle: ["horizon", "aperture"],
  plinth: ["aperture", "contact"],
  horizon: ["waveform", "aperture"],
  waveform: ["horizon", "grid"],
  wire: ["aperture", "plinth"],
  grid: ["contact", "aperture"],
  contact: ["grid", "aperture"],
  aperture: ["grid", "horizon"],
};
const artAt = (art, j) => (j === 0 ? art : ALT_ART[art][j - 1]);

const serviceSlots = capabilities.flatMap((c) => [
  { id: `svc-${c.slug}-hero`, page: `Services / ${c.title}`, section: "Hero", ratio: "21/9", subject: `${c.title}: key visual`, art: CAP_ART[c.slug] },
  { id: `svc-${c.slug}-card`, page: "Home + Services overview", section: `${c.title} preview`, ratio: "4/3", subject: `${c.title}: preview`, art: CAP_ART[c.slug] },
  { id: `svc-${c.slug}-g1`, page: `Services / ${c.title}`, section: "Gallery", ratio: "4/5", subject: `${c.title}: example 1`, art: artAt(CAP_ART[c.slug], 0) },
  { id: `svc-${c.slug}-g2`, page: `Services / ${c.title}`, section: "Gallery", ratio: "4/5", subject: `${c.title}: example 2`, art: artAt(CAP_ART[c.slug], 1) },
  { id: `svc-${c.slug}-g3`, page: `Services / ${c.title}`, section: "Gallery", ratio: "4/5", subject: `${c.title}: example 3`, art: artAt(CAP_ART[c.slug], 2) },
]);

const COVER_RATIOS = ["16/9", "4/5", "4/5", "21/9", "4/5", "16/9"];
const workSlots = projects.flatMap((p, i) => {
  const art = CAP_ART[p.capabilities[0]];
  return [
    { id: p.cover, page: "Work + Home", section: `${p.title} cover`, ratio: COVER_RATIOS[i % COVER_RATIOS.length], subject: `${p.title}: cover`, art, project: true },
    ...p.gallery.map((g, j) => ({ id: g, page: `Work / ${p.title}`, section: "Gallery", ratio: j === 2 ? "16/9" : "4/5", subject: `${p.title}: image ${j + 1}`, art: artAt(art, j), project: true })),
  ];
});

export const media = Object.fromEntries(
  [...base, ...serviceSlots, ...workSlots].map((m) => [
    m.id,
    { type: "image", src: null, poster: null, alt: "", status: "placeholder", ...m },
  ]),
);

// Real files go here once supplied, e.g.:
// media["home-hero"] = { ...media["home-hero"], src: "/media/hero.mp4", poster: "/media/hero-poster.jpg", alt: "", status: "final" };

export function getMedia(id) {
  const m = media[id];
  if (!m) throw new Error(`Unknown media slot: ${id}`);
  return m;
}
