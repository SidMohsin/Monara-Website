// ─────────────────────────────────────────────────────────────────────────────
// Page copy.
//
// Source tags:
//   S3     = client wording from workbook tab "Sheet3" (approved source)
//   BRAND  = client brand lines
//   DRAFT  = written by us for review. `draft: true` items must be approved
//            by the client before launch. Drafts contain no factual claims
//            (no history, numbers, clients, awards or results).
// ─────────────────────────────────────────────────────────────────────────────

export const home = {
  hero: {
    eyebrow: "Creativity · Production · Smart Tech", // BRAND
    heading: "A World of Creativity with One Creative Partner", // S3 "maine heading"
    tagline: "Every Frame Tells a Story.", // BRAND
  },
  // S3 "sub heading" (three paragraphs, client wording)
  intro: [
    "The way brands communicate is constantly evolving. At Monara, we bring together the art of storytelling, the craft of production and the possibilities of technology to help brands stay ahead.",
    "Whether it is a campaign that captures attention, a film that tells a story, a digital experience that engages audiences or a complete brand identity, we turn ideas into meaningful creative outcomes.",
    "From traditional production to Smart Tech-led solutions, we create without boundaries.",
  ],
  capabilitiesHeading: "Our Capabilities", // S3
  workHeading: { text: "Featured Work", draft: true },
  // The three pillars use phrases taken from the S3 sub heading
  pillars: [
    { title: "Creativity", line: "The art of storytelling." },
    { title: "Production", line: "The craft of production." },
    { title: "Smart Tech", line: "The possibilities of technology." },
  ],
  aboutPreview: {
    draft: true, // DRAFT
    heading: "A creative production studio in Sri Lanka.",
    body: "Monara Productions brings creativity, production and Smart Tech together under one roof, from a single product shoot to a complete brand campaign.",
    link: "More about Monara",
  },
};

// S3 closing section
export const contactCta = {
  heading: "Let's create something that connects.",
  body: "From a single product shoot to a complete brand campaign, Monara brings creativity, production and expertise together to deliver content that makes an impact.",
  button: "Start Your Project",
};

export const servicesPage = {
  heading: "Our Capabilities", // S3
  intro: {
    draft: true, // DRAFT
    text: "Photography, film, post-production, Smart Tech, brand, strategy and marketing: one creative partner for every frame of your brand.",
  },
};

export const workPage = {
  heading: "Work",
  intro: {
    draft: true, // DRAFT
    text: "Stories told frame by frame, across photography, film and Smart Tech.",
  },
  reviewNotice:
    "Placeholder projects for layout review. Real projects will replace these once images and client permissions are supplied.",
};

export const aboutPage = {
  heading: "About Monara",
  intro: {
    draft: true, // DRAFT. Uses only verified facts: name, Sri Lanka, brand lines, S3 wording.
    lead: "MONARA Productions is a creative production studio based in Sri Lanka.",
    body: [
      "We bring together the art of storytelling, the craft of production and the possibilities of technology to help brands stay ahead.",
      "Our work spans photography, video and film, post-production, Smart Tech, creative and brand, strategy, and digital and performance marketing, so a brand can work with one creative partner from the first idea to the final frame.",
    ],
  },
  approachHeading: { text: "Our approach", draft: true },
  whatWeDoHeading: { text: "What we do", draft: true },
  studioHeading: { text: "The studio", draft: true },
};

export const contactPage = {
  heading: "Start Your Project", // S3 CTA wording
  intro: {
    draft: true, // DRAFT
    text: "Tell us about your product, brand or campaign. Share as much or as little as you like and we will get back to you.",
  },
};

export const privacyPage = {
  heading: "Privacy Policy",
  notice:
    "This page is awaiting the client-approved privacy policy. No legal text has been written on the client's behalf.",
};
