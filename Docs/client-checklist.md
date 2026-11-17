# MONARA Productions: Client Checklist

Last updated: 2026-11-17 (one-page restructure)

**Latest decisions (2026-11-17, after Shristi's review):**

- **One-page site, for now.** There isn't enough content yet for separate pages. Home now holds everything: Hero → About → Services → "Every Frame Tells a Story" → Contact (form + details).
  - Each of the 9 services opens in place to show its full description and service list (Smart Tech: 51 services in 7 areas).
  - The separate Services, service, Work, project, About and Contact pages are parked in `src/app/_later/` (code kept, not published). Their old addresses forward to the matching home-page section.
  - Privacy Policy stays as its own page (the form links to it).
- **Menu:** About · Services, plus the "Start Your Project" button. "Contact" was removed from the menu because it duplicated the button; both led to the same place.
- **Work is hidden** until real projects (images + client permission) are supplied. It returns as a section after Services, with "Work" back in the menu.
- **Design:** the current design is approved ("looking fine"). ❗ **Fonts to change: awaiting Raghav's choice.** The font is set in one place (`src/app/layout.jsx`), so the swap is quick.
- The navbar stays visible at all times (no hide-on-scroll).

**Earlier decisions (the navigation line is superseded by the above):**

- Content follows Option A. The "Sheet3" tab decides the structure and wording, and the "Service Categorization" tab supplies the service lists.
- The technology area is called "Smart Tech", not "Digital".
- Navigation is Home · Services · Work · About · Contact.
- The site has no Partners, Awards, News or Team sections. An optional founder/team block is built but stays hidden until real names and photos are supplied.
- Service names are shown in Title Case on screen (with "A+" kept as written). The original workbook wording is kept in the data file.
- The brand teal is #096B6C.

Status key: ✅ available · 📝 drafted / temporary · ❗ required from client

---

## 1. Available now (what the supplied files actually contain)

| Item | Source | Notes |
|---|---|---|
| ✅ Logo | `Docs/monara_logo.jpeg` | 1280 × 372 JPEG on a white background. It has no transparency and there is no SVG or light (reversed) version. |
| ✅ Brand teal | Sampled from the logo | **#096B6C** (RGB 9, 107, 108) |
| ✅ Brand black | Logo | #000000 |
| ✅ Brand lines | Client brief | "CREATIVITY · PRODUCTION · SMART TECH" and "Every Frame Tells a Story." |
| ✅ Homepage copy | Workbook tab **"Sheet3"** | Hero heading, hero subheading (3 paragraphs), the "Our Capabilities" list (9 entries with descriptions), and the CTA heading, text and button label |
| ✅ Service tree | Workbook tab **"Service Categorization"** | 3 pillars → 17 topics (each with a description) → Topic 2 (used only under AI Video & Film) → 104 services |
| ✅ Design reference | Client brief | publicisgroupesrilanka.com, used for structure and feel only |

## 2. Drafted / temporary

### 2a. Temporary brand assets

| Item | Status | Notes |
|---|---|---|
| 📝 Logo SVGs: `public/brand/monara-logo.svg`, `-reverse.svg`, `-white.svg` | **Temporary** | Auto-traced from the JPEG as a stopgap. Replace them with the official SVGs under the same file names. |
| 📝 Favicon `src/app/icon.svg` (teal "A" with dot) | **Temporary** | Drawn to match the traced logo. Regenerate it from the official SVG. |
| 📝 Share image `src/app/opengraph-image.jsx` | **Temporary** | Uses the traced logo and the brand lines. |
| 📝 Logo on dark backgrounds (option C) | **Applied, needs client confirmation** | On black, the logo's teal ("A" and "PRODUCTIONS") is shown as the lighter tint **#5FB3B3**. Brand teal #096B6C on black was too dim at header and footer sizes. Brand teal is unchanged on light backgrounds. Used in the header over the hero, the mobile menu, the footer and the share image. File: `public/brand/monara-logo-reverse.svg`. Comparison: `Docs/screenshots/logo-on-black-options.png`; in use: `Docs/screenshots/logo-option-c-in-situ.png`. **Ask the client to confirm this or supply an official dark-background logo.** |

### 2b. Draft text (for client approval)

Each item is marked `draft: true` in `src/content/copy.js`. Set `NEXT_PUBLIC_SHOW_DRAFTS=true` to show "Draft" badges on screen. None of the drafts make factual claims.

| Where | Draft text |
|---|---|
| Home: About preview | "A creative production studio in Sri Lanka." / "Monara Productions brings creativity, production and Smart Tech together under one roof, from a single product shoot to a complete brand campaign." |
| Home: work section heading | "Featured Work" |
| Home + About: three pillars | "The art of storytelling." / "The craft of production." / "The possibilities of technology." (phrases from Sheet3) |
| Services: introduction | "Photography, film, post-production, Smart Tech, brand, strategy and marketing: one creative partner for every frame of your brand." |
| Service pages: section headings | "Overview", "What [capability] covers", "In frame" (gallery); on the 360° Campaigns page: "Three capabilities, one campaign" |
| Work: introduction | "Stories told frame by frame, across photography, film and Smart Tech." |
| About: introduction | The lead sentence and two paragraphs in `copy.js`, built only from Sheet3 wording and the brand lines |
| About: section headings | "Our approach", "What we do", "The studio" |
| Contact: introduction | "Tell us about your product, brand or campaign. Share as much or as little as you like and we will get back to you." |
| Contact form | Labels, consent sentence and messages |
| 404 page | "This page isn't in the shot." |
| Team block heading (hidden) | "The people behind the frame" |

### 2c. Placeholders

| Item | Status | Notes |
|---|---|---|
| 📝 Images and video (77 slots) | Placeholder | Branded abstract frames labelled "PLACEHOLDER". No stock or AI images. The full list with aspect ratios is in **`Docs/asset-checklist.md`**. |
| 📝 Hero | Placeholder | Line-drawn logo "A" and a viewfinder overlay. When a video file is set in `media.js` (`home-hero`), it plays behind the headline. |
| 📝 Work: 6 projects | Placeholder | "Project Title 01–06", "Client Name", "0000". Badged on screen, `noindex`, and left out of the sitemap. |
| 📝 Contact details | Placeholder | `hello@yourdomain.lk`, `+94 00 000 0000`, address and social links in `src/content/site.js`. Links stay disabled until real values are set. |
| 📝 Contact form | **Not connected** | The form validates input, and the page says plainly that nothing is sent until `NEXT_PUBLIC_FORM_ENDPOINT` is set and tested. |
| 📝 Privacy policy page | Awaiting text | The page shows a notice only. No legal text has been written. |
| 📝 Founder/team block | Hidden | Appears automatically once real entries (name, role, photo) are added to `src/content/team.js`. |
| 📝 Search engines | Blocked | The whole site is `noindex` and `robots.txt` disallows crawling until `NEXT_PUBLIC_SITE_URL` (the real domain) is set. |

### 2d. Service data decisions

| Item | Status | Notes |
|---|---|---|
| 📝 "Creative & Brand" page | Description only | **Awaiting its service list.** The services section is omitted. |
| 📝 "Claude AI campaign" | **Hidden** | Kept in the data with `hidden: true` until the client clarifies it. |
| 📝 Duplicate and overlapping services | Shown as in the workbook | Not merged or deleted. See queries 6 and 7. |
| 📝 "Process / deliverables" section | Omitted | The template supports it, but there is no real content yet. |

### 2e. On-screen label changes (Title Case and obvious fixes)

Other display changes:

- "→" removed from the Sheet3 capability titles.
- Stray tabs and line breaks trimmed.
- The pillar "360 degree campiagns" is not shown; Sheet3's "360° Campaigns" is used.

The workbook wording is unchanged in `src/content/services.js` (`raw` fields). To regenerate the data from the workbook, run `python scripts/build-services.py "Docs/Monara productions_Service_Categorization_final.xlsx"`.

| Workbook wording | Shown on site |
|---|---|
| A+ content | A+ Content |
| Multi-channel Content Production | Multi-Channel Content Production |
| Bulk image editing | Bulk Image Editing |
| Video editing | Video Editing |
| AI editing | AI Editing |
| Video editing- Reels, youtube videos etc | Video Editing – Reels, YouTube Videos etc. |
| Production pipeline | Production Pipeline |
| Short films | Short Films |
| Web series & episodic | Web Series & Episodic |
| Music videos | Music Videos |
| Documentary & factual | Documentary & Factual |
| Ads & brand story films | Ads & Brand Story Films |
| Personalised video ads | Personalised Video Ads |
| Always-on content engine | Always-On Content Engine |
| Real-time trend content | Real-Time Trend Content |
| Performance-driven ad variants | Performance-Driven Ad Variants |
| Dynamic creative (DCO) | Dynamic Creative (DCO) |
| Social-first vertical ad factory | Social-First Vertical Ad Factory |
| Brand campaigns | Brand Campaigns |
| Creative optimisation & variations | Creative Optimisation & Variations |
| Script & storyboard | Script & Storyboard |
| Concept-to-video prototyping | Concept-to-Video Prototyping |
| Pre-visualisation & simulation | Pre-Visualisation & Simulation |
| CGI (modelling/texturing/animation/compositing) | CGI (Modelling/Texturing/Animation/Compositing) |
| Smart Tech feature films | Smart Tech Feature Films |
| Virtual try-on (AR product try-on) | Virtual Try-On (AR Product Try-On) |
| Virtual store / VR showroom | Virtual Store / VR Showroom |
| 360° content & virtual tours | 360° Content & Virtual Tours |
| VR expo & exhibitions | VR Expo & Exhibitions |
| AR/VR experiences | AR/VR Experiences |
| 3D product display | 3D Product Display |
| 3D product modeling | 3D Product Modeling |
| Property / real-estate tours | Property / Real-Estate Tours |
| Architectural visualization | Architectural Visualization |
| AI models (fashion & kids / photoshoots) | AI Models (Fashion & Kids / Photoshoots) |
| AI avatars & mascots | AI Avatars & Mascots |
| AI voiceovers | AI Voiceovers |
| AI promo videos | AI Promo Videos |
| AI model image → 3–8 sec | AI Model Image → 3–8 sec |
| AI image → video reels | AI Image → Video Reels |
| 3D product visualisation | 3D Product Visualisation |
| AR product experiences | AR Product Experiences |
| Product comparison & explainer (UGC) | Product Comparison & Explainer (UGC) |
| Creator-led production | Creator-Led Production |
| Character continuity & reusability | Character Continuity & Reusability |
| Virtual hosts / trainers / presenters | Virtual Hosts / Trainers / Presenters |
| YouTube channel automation | YouTube Channel Automation |
| Podcast-to-video conversion | Podcast-to-Video Conversion |
| Brand mascots & owned IP | Brand Mascots & Owned IP |
| Motion graphics | Motion Graphics |
| Fashion shows & virtual lookbooks | Fashion Shows & Virtual Lookbooks |
| Stock footage & libraries | Stock Footage & Libraries |
| Scene / shot / asset licensing | Scene / Shot / Asset Licensing |
| Political & awareness campaigns | Political & Awareness Campaigns |
| Sports & esports content | Sports & Esports Content |
| Brand strategy | Brand Strategy |
| Campaign strategy | Campaign Strategy |
| Go-to-market | Go-to-Market |
| Media planning & buying | Media Planning & Buying |
| SME marketing | SME Marketing |
| D2C marketing | D2C Marketing |
| Cross-channel strategy | Cross-Channel Strategy |
| Social media management | Social Media Management |
| Influencer marketing | Influencer Marketing |
| Social commerce | Social Commerce |
| In-house reels | In-House Reels |
| SEO & content (on/off/technical) | SEO & Content (On/Off/Technical) |
| Voice search | Voice Search |
| App marketing / ASO | App Marketing / ASO |
| Email & SMS marketing | Email & SMS Marketing |
| Performance media | Performance Media |
| Quick commerce ads | Quick Commerce Ads |
| Affiliate marketing | Affiliate Marketing |
| Smart bidding | Smart Bidding |
| Predictive analysis | Predictive Analysis |
| In-app ads | In-App Ads |
| Marketplace ads | Marketplace Ads |
| Google AI campaign | Google AI Campaign |
| Meta AI campaign | Meta AI Campaign |
| Claude AI campaign | Claude AI Campaign |

## 3. Required from client

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | ~~Confirm which tab "consider sheet 3" refers to~~ | ✅ Decided | Option A (see the decisions at the top). Worth confirming with the client. |
| 2 | Business name spelling | ❗ | Logo: "MONARA PRODUCTIONS". Workbook: "Monara Productions" / "Monara". Confirm the legal or trading name. |
| 3 | Domain | ❗ | |
| 4 | **Official** logo SVG, dark and light versions | ❗ | A traced stopgap is in use for now (see section 2a). **Confirm the lighter teal #5FB3B3 for the dark-background version (option C).** |
| 5 | Company introduction / story | ❗ | Sheet3 has the homepage intro only; there is no About text. |
| 6 | Target customers / industries | ❗ | |
| 7 | Hero image or video | ❗ | Sheet3 row 3 says "first image video". Need an MP4 (under about 10 MB, landscape) and a poster frame. |
| 8 | Project images or videos, with usage permission | ❗ | For each project: title, client, year, services and a short description. |
| 9 | Service images (one or more per topic) | ❗ | |
| 10 | Studio photos (and team or founder information, if a Team section is wanted later) | ❗ | The site currently has no Team section, by decision. |
| 11 | Client logos, with permission to display | ❗ | Optional |
| 12 | Business email | ❗ | |
| 13 | Phone and WhatsApp | ❗ | |
| 14 | Social media links | ❗ | |
| 15 | Studio address and Google Maps location | ❗ | |
| 16 | Contact-form recipient email (and choice of free form service) | ❗ | |
| 17 | Privacy policy text | ❗ | |
| 18 | Final approver (name and role) | ❗ | |
| 19 | "Creative & Brand" service list | ❗ | It appears in Sheet3 but has no matching topic or services in the Service Categorization tab. |
| 20 | Answers to the workbook queries (section 4) | ❗ | |

## 4. Workbook queries for the client

**Tab "Sheet3"**
1. The capabilities list has 9 entries. "360° Campaigns" reads like an umbrella for Photography, Video & Film and Post-Production. Is it its own service or a heading?
2. "Smart Tech" (Sheet3) and "Digital" (Service Categorization pillar) appear to be the same area. Which name should the site use?
3. "Creative & Brand", "Strategy & Consulting", "Digital Marketing" and "Paid Media & Performance Marketing" do not match the topic names in the Service Categorization tab. Confirm the mapping.
4. Some services named in Sheet3 do not appear in the Service Categorization tab: virtual production, graphic design, dedicated creative teams, digital roadmaps and colour finishing (only partly listed). Should they be added?

**Tab "Service Categorization"**
5. Typo: "360 degree campiagns". Should this be "360° Campaigns"?
6. Duplicates: "Video editing" and "Video editing- Reels, youtube videos etc".
7. Overlaps: "Films" vs "Short films" vs "Smart Tech feature films"; "3D product visualisation" (Product & Retail Video) vs "3D product display" (3D & Visualization).
8. Unclear: "AI model image → 3–8 sec", "Claude AI campaign" (Claude is not an ad platform), "Always-on content engine".
9. "Political & awareness campaigns" and "Sports & esports content" sit under "Assets & Niches". Is that the intended grouping?
10. The Post-Production description mentions "infographic integration", but no matching service is listed.
11. Spelling and capitalisation are mixed (visualisation/visualization, modeling, "A+ content" vs "A+ Content"). For now they are **shown exactly as written**. Should we standardise them?
12. "Topic 2" is filled only under AI Video & Film. Elsewhere it is empty. Is that intentional?
