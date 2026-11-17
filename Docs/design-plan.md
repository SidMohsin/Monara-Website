# MONARA Productions: Phase 2 Design Plan

Status: **for approval**. Date: 2026-11-16.

The approved decisions are:

- Option A for content. The "Sheet3" tab decides the structure and wording. The "Service Categorization" tab (tab 1) supplies the service lists.
- The technology area is called "Smart Tech" throughout.
- Navigation is Home · Services · Work · About · Contact.
- There are no Partners, Awards, News or Team sections.

---

## 1. Design direction

**Idea: "the frame".** The tagline is *Every Frame Tells a Story*, and the logo has a dot inside each **A**. These give the site two motifs, used sparingly:

1. **Viewfinder corners.** Thin corner marks frame media slots and section openers.
2. **The dot.** The round counter from the logo's A appears as a small teal dot. It is used as an active-nav marker, a list bullet and a hover indicator, much like a camera's "rec" light.

**Feel:** cinematic and editorial. The layout is mostly black and white with large type and generous space. Teal is the single accent and is used the way the logo uses it, on one element at a time. It is never used as a background wash.

**Taken from the reference (structure only):** a full-bleed video hero with a big split headline, stacked capability rows, large work cards, a repeated CTA band above a multi-column footer, a sticky header, and restrained scroll reveals.

**Not taken from the reference:** any text, images, logos, clients or numbers, and none of its carousels. Work is shown as a static grid instead.

## 2. Design system

### Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | #000000 | Logo black, dark sections, primary text |
| `ink-soft` | #111414 | Raised surfaces on dark sections |
| `teal` | **#096B6C** | Brand accent, links and buttons on light backgrounds (6.3:1 on white) |
| `teal-deep` | #075253 | Hover and pressed states on light backgrounds |
| `teal-light` | #5FB3B3 | Teal **text** on black (8.6:1). Brand teal on black is only 3.3:1, so it is limited to large display type and the logo. |
| `paper` | #FFFFFF | Main background |
| `mist` | #F3F5F5 | Alternate light sections (a neutral with a slight teal tint) |
| `line` | #E2E7E7 / #262B2B | Hairlines on light / dark backgrounds |
| `muted` | #5C6666 / #9AA3A3 | Secondary text on light / dark backgrounds (both pass WCAG AA) |

No other hues are used. There are no gradients, apart from a subtle dark scrim over video so the text stays legible.

### Typography

- **Jost**, self-hosted through `next/font`. It is free, has no runtime request to Google, and is a geometric sans close to the logo's lettering. One family is used throughout, in weights 300, 400 and 500.
- **Display text** is uppercase with wide letter-spacing, echoing the logo.
- **Fluid sizes:**
  - Display: 44 → 128 px
  - H1: 40 → 88 px
  - H2: 32 → 56 px
  - H3: 22 → 28 px
  - Body: 17 / 18 px, line-height 1.6
  - Eyebrow: 12–13 px, tracked uppercase
- Numbered indices (01, 02 …) use tabular figures.

### Layout and spacing

- 12-column grid with a maximum width of 1440 px.
- Side padding of `clamp(20px, 5vw, 80px)`.
- Section padding of `clamp(80px, 12vw, 176px)`.
- Square corners everywhere, with 1 px hairlines.
- Breakpoints use the Tailwind defaults: 640, 768, 1024, 1280 and 1536.

### Logo (temporary trace)

Three files in `public/brand/` were auto-traced from the JPEG. Each file carries a comment saying so, and they are tracked in the checklist.

| File | Use |
|---|---|
| `monara-logo.svg` | Black and teal, for light backgrounds |
| `monara-logo-reverse.svg` | White and light teal **#5FB3B3**, for all dark backgrounds (header over the hero, mobile menu, footer). Option C, approved by us and awaiting client confirmation. |
| `monara-logo-white.svg` | All-white mono version, kept in the kit |

- **Favicon and app icon:** the teal **A** with its dot on a black square, cut from the same trace.

### Motion

| Element | Behaviour |
|---|---|
| Section content | Fades in and rises 24 px, 700 ms, easing `cubic-bezier(.22,1,.36,1)`, with a 60 ms stagger |
| Media | Reveals with a clip-path wipe as it enters the viewport, then a light parallax of up to 6% |
| Header | Transparent over the hero, then solid and slimmer once scrolled. It hides when scrolling down and reappears when scrolling up. |
| Capability rows | On hover the title shifts, the teal dot appears, and a preview image follows the row (desktop only) |
| Cards | Image scales to 1.03 on hover. The focus state matches the hover state. |

**Reduced motion:** if the visitor's device asks for reduced motion, all movement and parallax are turned off. The hero video does not autoplay; its poster image is shown instead.

The animation is built with CSS plus a small IntersectionObserver hook, so no animation library is added.

### Placeholder imagery (`<MediaFrame>`)

There is one component for every image or video slot that does not have real media yet. It shows:

- a dark surface with the correct aspect ratio
- faint film grain and viewfinder corners
- a small label such as **"PLACEHOLDER · Photography – packshot · 4:5"**

This keeps the site from looking empty, and nothing in it can be mistaken for real work. There are no stock or AI images.

## 3. Sitemap

```
/                                   Home
/services                           Services overview (all 9 capabilities)
/services/360-campaigns             Hub page → Photography, Video & Film, Post-Production
/services/photography
/services/video-and-film
/services/post-production
/services/smart-tech
/services/creative-and-brand        Description only (awaiting service list)
/services/strategy-and-consulting
/services/digital-marketing
/services/paid-media-and-performance-marketing
/work                               Placeholder projects (marked)
/work/[slug]                        Project template (placeholder pages are noindex and kept out of the sitemap)
/about
/contact
/privacy-policy                     Awaiting client-approved legal text
404
```

**Header:** logo · Services · Work · About · Contact · **Start Your Project** button.

On mobile, the header becomes a full-screen black menu with large links and the contact placeholders.

**Footer:**

- The reverse logo and the tagline.
- Columns for Services (all 9), Company (Work, About, Contact) and Contact. The Contact column holds the email, phone, WhatsApp and address placeholders.
- Social placeholders.
- A Privacy link and "© 2026 Monara Productions".

## 4. How the workbook maps onto the site

| # | Capability (Sheet3 name and description) | Services from tab 1 | Count shown |
|---|---|---|---|
| 1 | 360° Campaigns | Hub page. Links to items 2–4 and has no list of its own. | — |
| 2 | Photography | Photography | 10 |
| 3 | Video & Film | Video & Film | 10 |
| 4 | Post-Production | Post-Production (duplicates kept as in the data) | 4 |
| 5 | Smart Tech | The Digital pillar as 7 groups, each with its tab-1 description. AI Video & Film is split into its Topic 2 sub-groups (Films & Episodic, Ads & Brand, Production pipeline). Also AR/VR & Immersive, 3D & Visualization, AI Content Creation, Product & Retail Video, Creator & IP Studio, and Assets & Niches. | 51 |
| 6 | Creative & Brand | None. Description only, listed in the checklist as awaiting services. | 0 |
| 7 | Strategy & Consulting | Brand & Strategy | 7 |
| 8 | Digital Marketing | Social & Influencer, plus Organic & SEO | 9 |
| 9 | Paid Media & Performance Marketing | Paid Media, plus AI Campaigns (*"Claude AI campaign" hidden*) | 12 |

**Wording rules:**

- Sheet3's capability description is the main introduction on each page.
- Where tab 1 has a topic description, it is used as the hero strapline or the group introduction.
- Overlapping and duplicate services are kept exactly as they appear in the data.
- Spelling and capitalisation are kept as in the workbook (for example, both "visualisation" and "visualization" appear).

**Text changes for display only.** The raw values are kept in the data file.

1. The "→" removed from the Sheet3 capability titles (the arrow is a UI element, not text).
2. Stray tab characters and line breaks trimmed from descriptions.
3. "Video editing- Reels, youtube videos etc" shown as "Video editing – Reels, YouTube videos etc."
4. The tab-1 pillar "360 degree campiagns" is not shown; Sheet3's "360° Campaigns" is used. If the raw label is ever shown, it reads "campaigns".

**Hidden:** "Claude AI campaign" stays in the data with `hidden: true` and a note giving the reason.

## 5. Page-by-page sections

Text sources: **S3** = Sheet3 · **T1** = tab 1 · **BR** = brand lines · **DRAFT** = new text written for client approval · **PH** = placeholder.

### Home

1. **Header.** Transparent with the white logo over the hero.
2. **Hero.**
   - Full-viewport black background with a video slot (PH). The poster image shows a MediaFrame.
   - Eyebrow: "CREATIVITY · PRODUCTION · SMART TECH" (BR).
   - H1: "A World of Creativity with One Creative Partner" (S3).
   - Line: "Every Frame Tells a Story." (BR).
   - Buttons: "Start Your Project →" (S3) and "Explore our services".
3. **Introduction.** On a white background, the S3 subheading. The first paragraph is set large and the other two sit in a column beside it.
4. **Our Capabilities.**
   - The 9 S3 rows as an indexed list (01–09), each with a title and its S3 description.
   - Desktop: a preview image (PH) follows the hovered row. Mobile: rows expand to show the description.
   - Each row links to its service page.
5. **Featured Work.**
   - 4 large cards with mixed aspect ratios (16:9, 4:5, 4:5, 21:9). Each card is labelled "Placeholder project", with capability tags from S3.
   - Followed by a "View all work" link.
6. **Visual storytelling.**
   - A full-bleed black band. "Every Frame Tells a Story." is set very large, over a wide media slot (PH) with slow parallax.
   - Three columns:
     - **Creativity:** "the art of storytelling"
     - **Production:** "the craft of production"
     - **Smart Tech:** "the possibilities of technology"
   - The column lines are S3's own phrases.
7. **About preview.** On the mist background: a short paragraph (DRAFT), a "More about Monara" link, and a studio image slot (PH).
8. **Contact CTA.** "Let's create something that connects." with the S3 paragraph and "Start Your Project →".
9. **Footer.**

### Services overview

1. Page hero: "Our Capabilities" (S3 label) and a one-line introduction (DRAFT).
2. On desktop, a sticky index of the 9 capabilities on the left that scrolls to each anchor. On mobile it becomes a horizontal chip bar.
3. One block per capability. Each has:
   - its number and title (S3)
   - its description (S3)
   - service chips (T1)
   - a "View [capability] →" link
   - a small media slot (PH)

   360° Campaigns appears as a group header above Photography, Video & Film and Post-Production.
4. Contact CTA, then the footer.

### Service detail template (one template, 9 pages)

1. **Hero:** breadcrumb, title, the T1 description as strapline (where it exists), and a 21:9 media slot (PH).
2. **Introduction:** the S3 description.
3. **Services:** the T1 list, grouped where groups exist (Smart Tech: 7 groups with descriptions and Topic 2 sub-groups).
   - 360° Campaigns shows cards linking to its three sub-pages instead.
   - Creative & Brand skips this section.
4. **Process / deliverables:** the template supports it, but it is **left out** because there is no real content yet.
5. **Gallery:** 3 slots with mixed aspect ratios (PH).
6. **Previous / next capability.**
7. **Contact CTA.**

### Work

1. Page hero: "Work" and one line (DRAFT).
2. Filter chips by S3 capability. Filtering happens on the page itself; there are no separate pages.
3. A grid of 6 placeholder projects with mixed aspect ratios. Each is clearly badged "Placeholder project" and labelled "Client Name" / "0000".
4. **`/work/[slug]` template:**
   - title
   - details: client, year and services
   - overview (PH)
   - gallery or video slots
   - next project
   - CTA
5. Placeholder project pages are noindex and kept out of the sitemap.

### About

1. Hero: "About Monara" with a wide studio image slot (PH).
2. Introduction (DRAFT). It uses only verified facts: a creative production studio in Sri Lanka, plus the brand lines.
3. Approach: the Creativity, Production and Smart Tech columns, from S3's own phrases.
4. What we do: a compact list of the 9 capabilities, linking to their pages (data-driven).
5. Studio: an image strip (PH, 3 slots). There is no team section, as instructed.
6. Contact CTA.

There is no founding year, team size, history, client list or claims.

### Contact

1. Hero: "Start Your Project" (S3 CTA wording) with one line (DRAFT).
2. **Enquiry form:**
   - **Fields:** name\*, email\*, phone, company, capability of interest (select from data), message\*, and a consent checkbox linking to the privacy page.
   - **Validation:** on blur and on submit, with accessible error messages.
   - **Until a recipient and form service are set up and tested:** a visible notice that "this form is not yet connected". The submit button then explains this and points to the email (PH). The form never pretends a message was sent.
3. **Contact details** (all placeholders):
   - `hello@yourdomain.lk`
   - `+94 00 000 0000`
   - WhatsApp, as a disabled link until the number is supplied
   - address
   - social links
4. Footer.

### Privacy policy

A clear notice: "Awaiting client-approved privacy policy." It contains no legal text.

### 404

The logo dot motif, a short message, and links home and to services.

## 6. Technical plan (Phase 3)

- **Stack:** the latest stable Next.js App Router, React, plain JavaScript and Tailwind CSS v4.
  - Runtime dependencies: `next`, `react` and `react-dom` only, with Tailwind as a dev dependency.
  - No animation, carousel, form or UI libraries.
- **Content in one place,** in `src/content/`:

  | File | Holds |
  |---|---|
  | `site.js` | Business details and placeholders, navigation, brand lines |
  | `services.js` | The 9 capabilities, the T1 groups and services, raw and display labels, and `hidden` flags |
  | `work.js` | Placeholder projects (`placeholder: true`) |
  | `copy.js` | Page copy, with draft text marked `draft: true` |
  | `media.js` | **The single registry of every image and video slot:** page, section, aspect ratio, status and file path |

- **Asset checklist:** `npm run assets:checklist` generates `Docs/asset-checklist.md` from `media.js`, so the list never drifts from the code.
- **Draft markers:** setting `NEXT_PUBLIC_SHOW_DRAFTS=true` adds a small "Draft" badge to draft text, for client review builds.
- **SEO:**
  - A unique title and description for every page, plus Open Graph tags with a branded OG image.
  - `sitemap.js` and `robots.js`.
  - **Until `NEXT_PUBLIC_SITE_URL` is set, the whole site is `noindex`,** and there are no canonical URLs or structured data. Placeholder details never go into metadata.
- **Images:** `next/image` for all real images. Video is a muted, `playsinline`, lazy loop with a poster image.
- **Accessibility:**
  - Semantic headings (one H1 per page) and a skip link.
  - Visible focus rings in teal.
  - Labelled form fields and errors announced to screen readers.
  - Contrast at WCAG AA or better.
- **Not included:** deployment, commits, paid services, and secrets (the form endpoint will come from an environment variable later).

## 7. Open points (not blocking Phase 3)

- The About introduction and all marked drafts need client approval.
- Everything in `Docs/client-checklist.md` under "Required from client".
