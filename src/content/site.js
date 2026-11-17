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

  contact: {
    email: "hello@yourdomain.lk", // PLACEHOLDER
    phone: "+94 00 000 0000", // PLACEHOLDER
    phoneHref: null, // PLACEHOLDER: set to "tel:+94…" when the real number is supplied
    whatsapp: "+94 00 000 0000", // PLACEHOLDER
    whatsappHref: null, // PLACEHOLDER: set to "https://wa.me/94…" when the real number is supplied
    address: ["Studio address line 1", "City, Sri Lanka"], // PLACEHOLDER (city/country to confirm)
    mapUrl: null, // PLACEHOLDER: Google Maps link
  },

  // PLACEHOLDER: real profile URLs. `href: null` renders as a non-clickable placeholder.
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
