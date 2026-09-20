# Next Level Events — Phase 2: Weddings Flagship — Design Spec

## Context

Phase 1 (Foundation) is complete and merged into `master`: brand system, navigation, a 14-section homepage, and a generic `EventCategoryStub` page for all 8 event verticals, including a stub for Weddings. This document specs **Phase 2 only**: replacing that stub with the full Weddings flagship experience described in the Phase 1 spec's "Weddings — deepest layer" section, per the detailed brief the user provided for this phase.

This spec inherits every Phase 1 rule unchanged (no-fabrication, image manifest process, canonical user journey, cross-phase QA gate, brand tokens) and does not revisit them. It adds only what's new for Weddings.

### Explicit non-goals for this phase

- No redesign of Phase 1's brand system, nav, homepage, or any existing component.
- No enquiry wizard (Phase 1's `WhatsAppCTA` contextual-message pattern continues).
- No fake pricing calculator.
- No new top-level nav items — the global mega-menu's "Weddings" entry is unchanged; all six-layer navigation lives inside the Weddings hub page itself.

## Depth strategy (confirmed with the user)

Full IA breadth now — every culture, function, experience, and décor item gets a real route and a real, correctly-matched image (or an honest image-optional card where no correctly-matched image could be sourced — see below). A curated subset per layer additionally gets full content-contract depth (longer description, "what we handle" list, gallery, richer related-experiences). This mirrors how Phase 1 handled `EventCategoryStub` (light) vs. the homepage (deep).

**Full-depth (F) selection:**
- Cultural: North Indian, South Indian, Punjabi, Bengali, Rajasthani
- Functions: Haldi, Mehendi, Sangeet, Baraat, Wedding Ceremony/Mandap, Reception
- Experiences: Special Entry, Entertainment, Photography & Cinematic Videography
- Décor: Mandap, Stage, Floral Décor, Lighting

Everything else is lighter (L): a real, correctly-matched hero image, accurate one-sentence teaser, related-experiences links, and a contextual WhatsApp CTA — no gallery or extended copy.

## Image sourcing — what was found, and two honest gaps

All new images were sourced from Wikimedia Commons (CC BY-SA or public domain), downloaded, and **visually verified** (not filename-trusted) before acceptance, using the same process validated in Phase 1. Wikimedia's hotlink rate limiting was worked around by using its documented thumbnail endpoint (`/thumb/.../{width}px-{file}`, width from its whitelisted set) rather than full-resolution originals — the mistake Phase 1 had to fix after the fact is avoided here from the start.

**Two items had no honest match despite extensive searching** (multiple search-phrase variants, by two independent research passes each): **Cocktail** (a pre-wedding evening lounge event — Commons has almost no CC-licensed Indian wedding cocktail-party photography) and **Vidaai** (the bride's farewell — the one filename hit found was a mismatched portrait, not a farewell scene). A third, **Table/Venue Styling**, also had no good match distinct from Stage. Per the brief's own rule ("if content is not strong enough, omit it"), these do **not** get a forced, mismatched, or reused-from-elsewhere image. Instead:

### New capability: image-optional cards

`EventCard` and `ExperienceDetail`'s hero both gain a small conditional: when an item's `imageId` is `null`, they render a solid brand-color panel with the item's label/teaser in large display type instead of a photo, rather than an `<img>`. This is more honest than reusing an unrelated photo, and it's a legitimate editorial pattern, not a broken state. `Cocktail`, `Vidaai`, and `Table/Venue Styling` use this. All three still get a full route, a real teaser, related-experiences, and a working CTA — nothing about them is a dead end, they simply don't claim a photograph they don't have.

### Manifest additions (22 new entries)

All entries follow Phase 1's manifest shape (`url`, `source`, `license`, `altText`, `status`, optional `note`) with `status: "placeholder"` (real, licensed, but not Next Level Events' own photography — same honest framing as Phase 1's images).

| id | Depicts | License / Artist |
|---|---|---|
| `wedding-cultural-north-indian` | Jaimala/garland exchange, Hindu ceremony, mandap with fairy lights | CC BY-SA 4.0 — iMahesh |
| `wedding-cultural-south-indian` | Tamil bride washing seated parents' feet, red/gold silk saree | CC BY-SA 4.0 — Kritzolina |
| `wedding-cultural-punjabi` | Sikh couple before Guru Granth Sahib in a Gurudwara, gold canopy | CC BY-SA 4.0 — Japleenpasricha |
| `wedding-cultural-bengali` | Bengali bride, red/gold Benarasi saree, red chandan forehead pattern, nose ring | CC BY-SA 4.0 — Goutam1962 |
| `wedding-cultural-rajasthani` | Rajasthani bride, red gota-patti lehenga, bandhani textile backdrop | CC BY-SA 4.0 — Prithvipalsinghrathore |
| `wedding-cultural-gujarati` | Gujarati bride, red/green panetar, holding ceremonial kalash (Commons Featured Picture) | CC BY-SA 4.0 — Yann Forget |
| `wedding-cultural-muslim` | Nikah ceremony — groom in gold sherwani, maulvi writing the nikahnama, men in topi | CC BY-SA 4.0 — Saddam19 |
| `wedding-cultural-christian` | Kerala Christian couple under an umbrella, bride in cream saree, tropical setting | CC BY-SA 4.0 — Nikhil Jose 7 |
| `wedding-function-haldi` | Bride in yellow, turmeric paste being applied by family | CC BY-SA 4.0 — The open draft |
| `wedding-function-mehendi` | Bride's palms fully covered in intricate henna | CC BY-SA 3.0 — Iramuthusamy |
| `wedding-function-sangeet` | Night stage performance, floral arch, string lights, rose petals | CC BY-SA 4.0 — 03Ani03 |
| `wedding-function-baraat` | Groom on horseback, night procession, Pushkar | CC BY-SA 2.0 — Flickr user pnglife |
| `wedding-function-reception` | Decorated reception stage, floral arch, ornate seating | Public Domain — தமிழ்உழவன் |
| `wedding-function-engagement` | Priest-led engagement ritual, puja table with marigolds and kalash | CC BY-SA 4.0 — AmanAgrahari01 |
| `wedding-function-jaimala` | Groom placing garland on bride, mandap backdrop (distinct shot from the cultural entry, same series) | CC BY-SA 4.0 — iMahesh |
| `wedding-experience-special-entry` | Groom in ornate sherwani and turban greeting at his baraat entrance | CC BY-SA 4.0 — Biswarup Ganguly |
| `wedding-experience-photography` | Candid close-up of bride/groom hands during a South Indian ritual | CC BY-SA 4.0 — Selva wedding photography |
| `wedding-experience-guest` | Guests seated at an outdoor haldi/wedding function, golden hour | CC BY-SA 4.0 — Bhanu2398 |
| `wedding-decor-floral` | Marigold floral arch/mandap frame, Udaipur | CC BY-SA 4.0 — Megh Banthia |
| `wedding-decor-lighting` | Banquet-hall ceiling, chandeliers, captioned "Wedding Lights in an Indian Wedding" | CC BY-SA 4.0 — HiDave1 |
| `wedding-decor-stage` | Gold-pillared proscenium wedding stage, deity idols, floral garlands | CC BY-SA 4.0 — Kasyap |
| `wedding-decor-backdrop` | Floral wall/ceiling backdrop, Telugu pre-wedding function *(lower resolution, 720×1280 — noted, used for card-scale display only, not a full-bleed hero)* | CC BY-SA 4.0 — Mahalaxmi dev |

### Reused Phase 1 images (no new sourcing needed)

- `hero-home` and `vertical-weddings` → Weddings hub's own hero uses `vertical-weddings` (distinct from the homepage's `hero-home`, avoiding "one image everywhere").
- `vertical-weddings` → also reused for Mandap (décor) and Wedding Ceremony/Mandap (function), which is the correct pairing, not filler — it's literally the same subject.
- `vertical-decor` → reused for Entry Décor and Theme Décor (lighter tier, genuinely décor-adjacent).
- `vertical-entertainment` → reused for the Entertainment experience item.
- `vertical-destination` → reused for the Destination cultural wedding type.
- `vertical-social` → reused for Fusion/Multicultural cultural wedding type, **with an honest manifest note** (same treatment Phase 1 gave this image): it's a generic elegant venue shot, not culturally Indian-fusion-specific, used because no genuine fusion-wedding image could be sourced from Wikimedia Commons after two independent research passes.

## Information architecture

```
/events/weddings                              → WeddingsHub (replaces EventCategoryStub for this slug only)
/events/weddings/cultural/:slug               → ExperienceDetail (layer: cultural)
/events/weddings/functions/:slug              → ExperienceDetail (layer: functions)
/events/weddings/experiences/:slug            → ExperienceDetail (layer: experiences)
/events/weddings/decor/:slug                  → ExperienceDetail (layer: decor)
```

Planning and Real Weddings/Videos are sections on `WeddingsHub` itself, not sub-routed — Planning is a capabilities list (like Phase 1's `ServicesCapabilities`), and Real Weddings is an honest "coming as real projects are documented" section linking to Instagram, per the no-fabrication rule (Phase 1's previously-recovered YouTube Shorts IDs are **not** reused here without a fresh check that they're still live and wedding-relevant — flagged as a task step, not assumed).

**Canonical journey, satisfied exactly as specified:** Wedding → Type/Function (WeddingsHub's layer grids) → Experience (`ExperienceDetail`) → visual/content (hero + gallery for F items) → services (the "what we handle" list) → related experience (same-layer siblings) → enquiry (contextual `WhatsAppCTA`).

**Related experiences:** computed automatically as up to 3 other items in the same layer's data array (excluding self) — the same pattern Phase 1's `EventCategoryStub` used for its 8 verticals. This keeps the data model simple rather than hand-curating bespoke cross-layer links for 30+ items; it's a deliberate simplification, not an oversight.

## Component architecture

### New data files (flat arrays, same shape/pattern as Phase 1's `events.js`)

- `src/data/culturalWeddings.js` — 10 entries
- `src/data/weddingFunctions.js` — 10 entries (Cocktail and Vidaai included, `imageId: null`)
- `src/data/weddingExperiences.js` — 5 entries (Décor & Styling and Guest Experience are lighter; Décor & Styling's `href` points into the Décor layer rather than having its own detail page — it's a cross-reference, not a duplicate)
- `src/data/weddingDecor.js` — 8 entries (Table/Venue Styling included, `imageId: null`)

Each entry: `{ slug, label, imageId (nullable), depth: 'full' | 'light', teaser, description?, whatWeHandle?, href }`. `description` and `whatWeHandle` are only present on `depth: 'full'` entries — `ExperienceDetail` renders them conditionally.

### New components

- **`WeddingsHub.jsx`** (page) — hero (using `vertical-weddings`), on-page sub-nav (six anchors, using Phase 1's existing `ScrollToHash`), then one `EditorialGrid`+`EventCard` section per layer (Cultural/Functions/Experiences/Décor, reusing Phase 1's `EventCard` unchanged since the data shape matches), a Planning capabilities section (new, small, wedding-specific copy), and a Real Weddings honest section (new, small).
- **`ExperienceDetail.jsx`** (page) — one generic page for all four routed layers, driven by a `:layer` route param mapped to the right data array via a small lookup object. Renders `Breadcrumb`, hero (image or the image-optional panel), `depth === 'full'` conditional block (description, what-we-handle, gallery), related items (reusing `EventCard`), and a `WhatsAppCTA` with a message built from the item's label (matching the brief's example format: "Hi, I'm interested in a [Wedding Experience] for my wedding in Ranchi.").
- **`Breadcrumb.jsx`** — small reusable component, `{ items: [{label, href?}] }`, last item unlinked (current page).

### Reused unchanged from Phase 1

`EventCard`, `EditorialGrid`, `SectionHeading`, `WhatsAppCTA`, `ScrollToHash`, `Navbar`, `Footer`, `getImage`. **None of these files are modified** — Phase 2 only adds new files plus two additive route entries in `AppRoutes.jsx` (React Router v6 ranks static path segments over dynamic ones automatically, so `/events/weddings` correctly outranks the existing `/events/:slug` for that one path with no reordering needed; the other 7 verticals' stub routing is completely unaffected).

### Gallery construction (full-depth items only)

Rather than sourcing 2-3 unique images per full-depth item (doubling the sourcing effort for uncertain payoff), each full-depth item's gallery is `[own image, ...up to 2 sibling items' images from the same layer]`, computed automatically. These are still genuinely relevant wedding images (same layer, same event type), not filler — this is a deliberate scope decision, documented rather than silent.

## Verified business-data reminder

Same as Phase 1: WhatsApp/phone `917903133317`, email `nextlevel.events25@gmail.com`. No new contact data introduced. No fabricated reviews, ratings, statistics, or "featured weddings" — the Real Weddings section explicitly says content is pending.

## Testing

Per Phase 1's pattern: Vitest + RTL. New tests: one shape-validation test per new data file (matching `events.test.js`'s pattern — correct count, valid `depth` enum, `imageId` resolves via `getImage` or is `null`, no duplicate slugs), `WeddingsHub.test.jsx` (hero, six layer sections present, correct card counts), `ExperienceDetail.test.jsx` (a full-depth item renders gallery/what-we-handle, a lighter item doesn't, an image-optional item renders the panel not an `<img>`, an invalid layer/slug shows a working not-found fallback), `Breadcrumb.test.jsx`, and an `AppRoutes.test.jsx` extension confirming `/events/weddings` now renders `WeddingsHub` while `/events/corporate-events` still renders the unchanged `EventCategoryStub` (regression guard).

Manual QA gate (same as Phase 1's Task 13/Final Review pattern): full suite, production build, responsive breakpoints (code-level Tailwind review if no browser tool is available, stated honestly), a full crawl of every Weddings link/CTA, a fabricated-content grep, and an image-manifest cross-check including confirming the 3 image-optional items render their panel correctly and the 2 honest-gap items don't silently show a mismatched photo.

## Self-review notes

- **Coverage:** all 6 layers from the brief have a concrete home (4 routed layers + 2 hub sections). All 10 cultural types, 10 functions (as 9 distinct entries — see below), 5 experience items, and 8 décor items are accounted for.
- **Functions count:** the brief's section 4 list contains "Cocktail / Reception" as one line and "Reception" again at the end — read as a duplication artifact, not 11 distinct items. Resolved as 10 distinct functions: Engagement, Haldi, Mehendi, Sangeet, Cocktail, Baraat, Jaimala/Varmala, Wedding Ceremony/Mandap, Vidaai, Reception.
- **No placeholders:** every image reference above is a real, verified URL with recorded license/artist; every "not found" is stated as such with the image-optional pattern, not a TBD.
