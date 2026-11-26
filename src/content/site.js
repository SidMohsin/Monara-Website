// ─────────────────────────────────────────────────────────────────────────────
// Central business details + site-wide copy.
//
// ⚠ PLACEHOLDERS: every value marked `PLACEHOLDER` below must be replaced with
// real, client-supplied information before launch. Search the repo for
// "PLACEHOLDER" to find them all. Placeholders are never used in SEO metadata
// or structured data.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "MONARA Productions",
  shortName: "Monara",
  country: "Sri Lanka",

  // Brand lines supplied by the client
  positioning: "Creativity · Production · Smart Tech",
  tagline: "Every Frame Tells a Story.",

  // Default meta description (built only from verified wording)
  description:
    "MONARA Productions, Sri Lanka: creativity, production and Smart Tech. Photography, video and film, post-production, Smart Tech, creative, strategy and digital marketing.",

  // Only details that are filled in are shown on the site; empty ones are hidden everywhere.
  contact: {
    email: "hey@monaraproductions.com", // supplied by Shristi, 2026-11-26
    phone: null, // add when supplied, e.g. "+94 77 123 4567"
    phoneHref: null, // e.g. "tel:+94771234567"
    whatsapp: null, // e.g. "+94 77 123 4567"
    whatsappHref: null, // e.g. "https://wa.me/94771234567"
    address: [], // e.g. ["Street", "City, Sri Lanka"]
    mapUrl: null, // Google Maps link
  },

  // Real profile URLs. Profiles with `href: null` are not shown anywhere on the site;
  // fill in a URL and that profile appears in the footer and contact section automatically.
  social: [
    { label: "Instagram", href: null },
    { label: "Facebook", href: null },
    { label: "LinkedIn", href: null },
    { label: "YouTube", href: null },
  ],

  // One-page site: menu items scroll to sections of the home page.
  // "Work" returns (id "work") once real projects are supplied.
  // "Contact" is reached through the CTA button only (no duplicate menu item).
  nav: [
    { label: "About", href: "/#about", id: "about" },
    { label: "Services", href: "/#services", id: "services" },
  ],

  cta: { label: "Start Your Project", href: "/#contact", id: "contact" }, // Sheet3 wording
};

// Whether a value is still a placeholder (used to show review markers / disable links)
export const isPlaceholderContact = true;
