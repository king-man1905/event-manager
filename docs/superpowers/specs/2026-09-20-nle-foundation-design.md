# Next Level Events — Phase 1: Foundation — Design Spec

## Context

Next Level Events (Ranchi, Jharkhand) wants a complete premium, Indian,
photography-first event-management website, replacing their current live
site. The full brief describes an enormous information architecture (10+
event verticals, dozens of sub-experiences, real-events proof systems,
locations, a smart enquiry flow) that is too large for one spec or one
build. This document covers **Phase 1 only**: the foundation every later
phase depends on.

The project folder (`E:\Event_Manager_1`) started empty with no git
history and no access to the live site's actual source code. The live
site's compiled JS/CSS bundles were fetched and decoded to recover real
business data and a working content taxonomy, but this is a **fresh
build**, not an edit of existing source.

### Verified business data (recovered from the live site's structured data
and compiled bundles — treat as source of truth for Phase 1 and beyond)

- Name: Next Level Events
- Tagline: "Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand"
- Phone / WhatsApp: +91 7903133317
- Email: nextlevel.events25@gmail.com
- Address: Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar,
  Ranchi, Jharkhand 834002
- Service area: Ranchi (primary) plus 24 other Jharkhand districts
  (Jamshedpur, Dhanbad, Bokaro, Hazaribagh, Deoghar, Dumka, Chatra, East
  Singhbhum, Garhwa, Giridih, Godda, Gumla, Jamtara, Khunti, Koderma,
  Latehar, Lohardaga, Pakur, Palamu, Ramgarh, Sahibganj,
  Saraikela-Kharsawan, Simdega, West Singhbhum)
- Instagram: instagram.com/nextlevelevents.in
- Facebook: facebook.com/nextlevelevents.in
- YouTube: youtube.com/@nextlevelevents25 (real Shorts already exist, e.g.
  IDs `a-siuy_wkx0`, `H7EhkKuHGWU`, `8Ll1q_CRLRA`, `z-PeklpQUdI`,
  `BLlOtkPXf9E` — usable as real video proof once verified relevant)
- Brand accent color already in production use: `#c19743` (champagne gold)
- Real logo and favicon files recovered and saved to
  `src/assets/brand/` (do not regenerate or redraw)

### A finding that shaped this design

The live site's current architecture is an e-commerce decor-catalog
(products, "original price" markdown discounts, sort/filter) that
auto-generates fabricated ratings, review counts, and popularity scores
as defaults whenever real ones are absent (e.g.
`rating: e.rating || 4.7, reviewCount: e.reviewCount || 46`), and assigns
generic, often-mismatched stock photography by category keyword. Both
violate this project's core rules (no fabricated reviews/ratings, no
generic mismatched imagery). Phase 1's data architecture is deliberately
flat and per-domain (see Data Architecture below) specifically to avoid
the recursive-generic-catalog shape that produced that problem.

## Scope

**In scope (Phase 1):**
- Vite + React (JavaScript, not TypeScript) + Tailwind scaffold, react-router
- Global brand system: color tokens, type scale (Cormorant Garamond +
  Inter), logo usage rules
- `Navbar` with a config-driven `MegaMenu` (desktop) and `MobileDrawer`
  (mobile), both rendering the same `nav.js` data
- `Footer` with strong logo presence and full contact/social block
- Full 15-section homepage:
  - Sections Phase 1 fully owns, with real copy and manifest-tracked
    imagery: Cinematic Hero, Brand Introduction, Event Discovery,
    Services/Capabilities, How We Work, Final CTA, Contact
  - Sections later phases own: Weddings Flagship, Real Events, Event
    Inspiration, Transformation (Before/After), Behind the Event,
    Locations, Social/Video — Phase 1 renders a lightweight preview
    variant of each (hero/teaser + one paragraph + a working link), never
    a placeholder that dead-ends
- `contact.js` as the single master contact data file (see Verified
  business data above)
- `WhatsAppCTA` component producing contextual pre-filled messages
- `EventCategoryStub` page: what `/events/:slug` cards route to until
  Phase 2+ builds the real category experience — a hero, one paragraph,
  and a WhatsApp CTA, so every homepage click does something
- The image manifest process (`manifest.json` + `images.js` helper)

**Out of scope (later phases):** category/experience detail pages beyond
the stub, the Real Events filterable gallery, the Plan-Your-Event
enquiry wizard, Locations pages, cultural wedding pages, décor discovery
pages.

## Architecture

### Folder structure

```
src/
  data/
    nav.js        - IA as data: [{ label, href, columns: [{ heading, links: [...] }] }]
    contact.js     - verified phone/email/address/socials
    events.js      - top-level event categories only (Weddings, Corporate, ...)
    images.js       - resolves manifest entries to URLs; the only way
                       components reference images
  components/
    Navbar.jsx, MegaMenu.jsx, MobileDrawer.jsx, Footer.jsx
    WhatsAppCTA.jsx, EventCard.jsx, EditorialGrid.jsx, SectionHeading.jsx
  pages/
    Home.jsx
    EventCategoryStub.jsx
  App.jsx, main.jsx
assets/
  brand/           logo.png, favicon-32.png, favicon-180.png, favicon-192.png (recovered originals)
  manifest.json     one entry per image: { id, section, url, source, license, altText, status }
```

### Navigation data flow

`nav.js` is the single source of truth for the IA. `MegaMenu` (desktop,
≥1024px) renders it as CSS-grid dropdowns, opening on hover and
click-to-pin for touch/keyboard users. `MobileDrawer` (<1024px) renders
the identical `nav.js` tree as an accordion. Adding or changing a nav
entry means editing `nav.js` once — no component duplication between
desktop and mobile.

### Content data flow

Each event vertical gets its own flat data file (`weddings.js`,
`corporate.js`, etc.) added in the phase that builds it — Phase 1 only
adds `events.js` with top-level category entries
(`{ slug, label, image, teaser, href }`) used by the homepage's Event
Discovery section and by `EventCategoryStub`. No nested recursive tree;
each domain file is a flat array, matching the brief's own suggested
file list.

### Image manifest

Every image reference goes through `images.js`, which looks up an entry
in `manifest.json` by id rather than components holding bare URLs.
Each manifest entry records `source` (e.g. "Unsplash — photographer
name/URL"), `license`, `altText` (semantically specific, not generic),
and `status: "placeholder"` (licensed stock used until real Next Level
Events photography replaces it) or `"final"` (verified real business
asset, e.g. the recovered logo). This makes a future swap-to-real-photos
pass a data edit instead of a code search, and prevents stock images
from ever being presented as real Next Level Events work.

### Contact / WhatsApp

`contact.js` holds the verified data above. `WhatsAppCTA` accepts a
`message` prop and builds a `wa.me/917903133317?text=...` link, so every
CTA across the site sends a contextual message (e.g. "Hi, I'm interested
in planning a wedding in Ranchi.") rather than a generic one.

## Testing / Verification

This is a UI-only phase with no business logic beyond nav-data rendering
and link construction, so verification is manual, not unit tests:
- Run the dev server and visually check the homepage and one
  `EventCategoryStub` page at 375, 390, 412, 768, 1024, 1280, 1440,
  1600px widths: no horizontal overflow, no clipped text, readable
  logo/nav at every width, mega-menu doesn't clip on tablet (falls back
  to the drawer pattern if it would)
- Confirm every homepage card/link routes somewhere real (event
  discovery cards → stub pages, final CTA / contact → working
  WhatsApp/tel/mailto links) — nothing dead-ends
- Confirm each `WhatsAppCTA` produces the correct contextual message and
  the correct phone number
- Spot-check the image manifest: every image on the homepage has a
  manifest entry with correct license/source/alt text

## Open items for later phases (not blocking Phase 1)

- Real Next Level Events photography to replace `status: "placeholder"`
  manifest entries, once supplied
- Verification that the recovered YouTube Shorts IDs are actually
  relevant/current before surfacing them as proof content
- The `sam.verma8` Instagram handle appeared linked from the live site's
  about area (likely a founder's personal account) — confirm before
  Phase 4 whether it belongs anywhere on the new site
