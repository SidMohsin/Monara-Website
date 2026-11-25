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
  { id: `svc-${c.slug}-video`, page: "Home / Services", section: `${c.title}, opened row`, type: "video", ratio: "16/9", subject: `${c.title}: video`, art: CAP_ART[c.slug], note: "MP4, landscape 16:9, short loop, no sound, plus a poster frame." },
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

// ── Real files (client folder Monara_content/HOMEPAGE, optimised into /public/media) ──
// Digital Marketing, Strategy & Consulting, Post-Production and Paid Media use the images
// Shristi supplied on 2026-11-24 (HOMEPAGE/new images) for the opened row; hover previews stay as before.
// `w`/`h`: the file's own size. Opened-row ("inside") slots take the file's own shape so
// portrait work is never cropped; hover previews fill their cell (`position` = focal point).
// Videos are muted loops (aria-hidden), so they need no alt text.
const FILES = {
  // Hover previews (folder "outcover")
  "svc-photography-card": { src: "/media/photography-card.jpg", w: 600, h: 900, position: "50% 35%", alt: "" },
  "svc-video-and-film-card": { type: "video", src: "/media/video-and-film-card.mp4", poster: "/media/video-and-film-card-poster.jpg", w: 406, h: 720 },
  "svc-post-production-card": { src: "/media/post-production-card.jpg", w: 600, h: 900, position: "50% 35%", alt: "" },
  "svc-smart-tech-card": { src: "/media/smart-tech-card.jpg", w: 675, h: 900, position: "50% 30%", alt: "" },
  "svc-creative-and-brand-card": { src: "/media/creative-and-brand-card.jpg", w: 900, h: 900, alt: "" },
  "svc-strategy-and-consulting-card": { src: "/media/strategy-and-consulting-card.jpg", w: 601, h: 900, position: "50% 45%", alt: "" },
  "svc-digital-marketing-card": { src: "/media/digital-marketing-card.jpg", w: 900, h: 580, alt: "" },
  "svc-paid-media-and-performance-marketing-card": { src: "/media/paid-media-and-performance-marketing-card.jpg", w: 900, h: 601, alt: "" },
  // Opened rows (folder "in")
  "svc-photography-video": { type: "image", src: "/media/photography-inside.jpg", w: 1201, h: 1800, alt: "A young girl sits on a picnic blanket in front of a play tent, with a backpack and toys around her" },
  "svc-video-and-film-video": { src: "/media/video-and-film-inside.mp4", poster: "/media/video-and-film-inside-poster.jpg", w: 776, h: 1080 },
  "svc-post-production-video": { type: "image", src: "/media/post-production-v2-inside.jpg", w: 1800, h: 1013, alt: "Two editors reviewing footage and colour grading on studio monitors" },
  "svc-smart-tech-video": { type: "image", src: "/media/smart-tech-inside.jpg", w: 1194, h: 1600, alt: "A woman in a denim jacket posing on a city street corner" },
  "svc-creative-and-brand-video": { src: "/media/creative-and-brand-inside.mp4", poster: "/media/creative-and-brand-inside-poster.jpg", w: 480, h: 848 },
  "svc-strategy-and-consulting-video": { type: "image", src: "/media/strategy-and-consulting-v2-inside.jpg", w: 1800, h: 1013, alt: "Two colleagues planning a project with sticky notes beside a project timeline board" },
  "svc-digital-marketing-video": { type: "image", src: "/media/digital-marketing-v2-inside.jpg", w: 1800, h: 818, alt: "A hand touching a Digital Marketing screen surrounded by marketing icons" },
  "svc-paid-media-and-performance-marketing-video": { type: "image", src: "/media/paid-media-and-performance-marketing-v2-inside.jpg", w: 1800, h: 1012, alt: "Illustration of a marketer at a laptop with ad performance charts and social media icons" },
  // About section (folder "VIDEO 2"): portrait film, shown at its full 9:16 shape (not cropped)
  "home-about": { type: "video", src: "/media/home-about.mp4", poster: "/media/home-about-poster.jpg", w: 608, h: 1080, ratio: "608/1080" },
};
for (const [id, f] of Object.entries(FILES)) {
  const inside = id.endsWith("-video");
  media[id] = { ...media[id], ...f, ...(inside && { ratio: `${f.w}/${f.h}` }), status: "final" };
}

// Hero: client showreel (HOMEPAGE/HERO_section, 2026-11-25). Only a 16:9 version exists for now, so
// phones get a 9:16 cut of it framed shot by shot (split screens show their middle panel; the closing
// logo card is fitted, not cropped). Replace hero-mobile.mp4 when a proper vertical edit arrives.
media["home-hero"] = { ...media["home-hero"], src: "/media/hero.mp4", poster: "/media/hero-poster.jpg", mobileSrc: "/media/hero-mobile.mp4", status: "final" };
// Story band ("home-story"): no footage supplied for it yet, so it keeps its placeholder.

export function getMedia(id) {
  const m = media[id];
  if (!m) throw new Error(`Unknown media slot: ${id}`);
  return m;
}
