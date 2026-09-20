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

## Complete Site Architecture (reference for every future phase spec)

This section describes the full system Phase 1 is the foundation for.
It is not all built now — later phases (2–5, per the roadmap) build most
of it — but every Phase 1 decision (data shapes, route shape, nav
contents, component contracts) is made so those phases plug in without
restructuring what Phase 1 ships.

### Event verticals

The site's business architecture, not just its visual design, covers
eight verticals, each eventually built as its own data file and
experience flow:

1. **Weddings** — the flagship, deepest vertical (see below)
2. **Corporate Events** — conferences, product launches, annual
   functions, award nights, seminars, corporate décor/stage/production
3. **Social Celebrations** — anniversaries, engagements, private
   parties, surprise celebrations, bachelor parties, house warmings
4. **Kids & Family** — birthday, baby shower, annaprashan, each with
   their own themed sub-experiences
5. **Live & Entertainment** — DJ, dhol, live music, artists, anchors/MC,
   stage shows, photo booth, kids entertainment
6. **Décor & Design** — balloon décor, floral décor, stage design,
   backdrops, lighting, theme décor, entry décor, venue styling
7. **Special & Cultural** — festival/cultural celebrations (Diwali,
   Navratri, Holi, etc.) distinct from wedding cultural content
8. **Destination Events** — outstation/destination planning capability

### Weddings — deepest layer (flagship)

Weddings is not "one more vertical" — it gets its own dedicated flow
with six layers, each independently discoverable:

- **Cultural Weddings** — North Indian, South Indian, Punjabi, Bengali,
  Gujarati, Rajasthani, Muslim, Christian, Destination, Fusion —
  each with culturally-specific imagery, copy, related functions/décor,
  and real work where available
- **Wedding Functions/Rituals** — Engagement, Haldi, Mehendi, Sangeet,
  Cocktail, Baraat, Jaimala/Varmala, Mandap/Ceremony, Vidaai, Reception
- **Wedding Experiences** — entries (bridal/groom/couple/special), dhol,
  DJ/music, entertainment, stage/dance floor, photography, cinematic
  videography, guest experience
- **Wedding Décor** — mandap, stage, floral, lighting, backdrop, entry
  décor, venue styling, theme décor
- **Wedding Planning** — venue coordination, event planning, catering
  coordination, photography, cinematic films, entertainment, setup/
  execution ("we handle the event, not just the decoration")
- **Real Weddings / Videos** — genuine work and genuine video content
  only

### The Experience content contract

Every individual experience, across every vertical (not only weddings),
must be more than an image and a paragraph. Each one needs:

1. A relevant hero image (semantically correct, manifest-tracked)
2. A description (specific editorial copy, not filler)
3. What we handle (a concrete list of what's actually coordinated/
   included for that experience)
4. Visual/gallery content (real work or manifest-tracked stock — never
   a generically reused image)
5. Related experiences (links onward — nothing is a dead end)
6. A relevant, contextual CTA (WhatsApp message specific to that
   experience)

This is the contract the `ExperienceDetail` component (built starting
Phase 2) renders. Phase 1's `EventCategoryStub` is a deliberately
thinner placeholder — it already covers items 1, 2, and 6 of this
contract, so it's an honest partial implementation, not a fake one, and
gets upgraded to the full `ExperienceDetail` as each vertical's phase
lands.

### Cultural accuracy rule

Regional/cultural wedding pages and any other culturally-specific
content must use imagery and copy accurate to that specific culture —
a Bengali wedding page needs Bengali wedding visuals, not a generic
mandap photo also used for the Punjabi page. Every manifest entry for
culturally-specific content records why that image matches that
specific culture, so mismatches are checkable, not just hoped for.

### Real social content system

Instagram, Facebook, and YouTube are content sources feeding dedicated
site sections — not only footer icons:

- Real Events / Real Weddings galleries surface actual posted content
- A Wedding Videos/Stories section embeds real YouTube uploads (e.g.
  the Shorts IDs recovered from the live site, once each is verified
  still relevant and appropriately matched to its section)
- Behind the Event uses genuine site-recce/planning-meeting/setup
  content when it exists
- Real Client Stories shows only genuine reviews/videos, with the
  source platform noted
- If no genuine content exists yet for a given slot, that slot is
  either omitted entirely or marked "coming soon" with a working CTA —
  it is never filled with fabricated content to avoid an empty look

### Locations as a real feature

Locations is a real, structured feature, not an address line in the
footer: City → event types available in that city → relevant services →
real work from that city (if any) → enquiry flow. Only verified cities
are shown as served — Ranchi as the primary, confirmed location; the
other Jharkhand districts currently only appear in the live site's
`areaServed` schema markup, which is not by itself proof of active,
marketable service capability there, so each one needs confirmation
before Locations claims it. Anything not confirmed goes under a
separate "Outstation / Destination Events" track instead of being
listed as a directly served city.

### Contact / lead architecture

Every page carries access to WhatsApp (contextual message), Call,
Email, Instagram, Facebook, YouTube, and Location/Map — via the
`WhatsAppCTA` component and the footer/contact block built in Phase 1.
The structured Plan-Your-Event enquiry wizard (Phase 5) is the deep
version of this; the lightweight contextual CTA used everywhere else is
what Phase 1 ships.

### Homepage discipline

The homepage carries exactly one flagship teaser per major system (one
Weddings teaser, one Real Events teaser, one Inspiration teaser, etc.)
that links onward to that system's dedicated flow. It never duplicates
a full grid or gallery that also exists on a dedicated page — that
would both bloat the homepage and create two competing versions of the
same IA.

### No-fabrication rule (site-wide)

Never invent reviews, star ratings, awards, statistics, client counts,
service cities, or services not actually offered, in any phase. Where
real content doesn't exist yet for a given slot, omit the claim or CTA
rather than fabricate a placeholder number or testimonial. This is the
direct fix for the fabricated-ratings problem found in the live site's
current architecture.

### Image sourcing & licensing (site-wide)

The manifest process defined under Image Manifest below applies to
every phase, not only Phase 1: every image used anywhere on the site,
whether real Next Level Events photography or licensed stock, gets a
manifest entry recording source, license, alt text, and status, so
stock is never presented as real business work.

### Canonical user journey

Every experience-level page on the site follows the same journey:

```
Event → Subcategory → Experience → Relevant visuals → Services →
Real work → Related experience → Enquiry
```

This maps to the route shape `/events/:category/:subcategory/:experience`
reserved from Phase 1 onward, even though Phase 1 only implements the
`:category` level (via `EventCategoryStub`). Every experience page ends
in a working enquiry CTA and links to at least one related experience —
never a dead end.

### Cross-phase QA gate

At the end of every phase, including Phase 1, run an explicit "no
dead-end / no blank content" pass before considering that phase done:
crawl every button, card, image, modal, CTA, and link added in that
phase and confirm each one does something real, contains no filler/
placeholder copy, cites no fabricated stat/review, and — for cultural
or vertical-specific content — uses correctly matched imagery. This is
a first-class deliverable of each phase's verification step, not an
optional extra.

## Scope

**In scope (Phase 1):**
- Vite + React (JavaScript, not TypeScript) + Tailwind scaffold, react-router
- Global brand system: color tokens, type scale (Cormorant Garamond +
  Inter), logo usage rules
- `Navbar` with a config-driven `MegaMenu` (desktop) and `MobileDrawer`
  (mobile), both rendering the same `nav.js` data. `nav.js` lists all
  eight event verticals from day one (linking to their `EventCategoryStub`
  pages) — the full business architecture is represented in navigation
  immediately, even though most verticals are stubs until their phase
  lands
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
adds `events.js` with all eight top-level vertical entries
(`{ slug, label, image, teaser, href, subcategories: [] }`) used by the
homepage's Event Discovery section, the mega-menu, and
`EventCategoryStub`. The empty `subcategories` field is reserved now so
later phases populate it without reshaping the schema. No nested
recursive tree; each domain file is a flat array, matching the brief's
own suggested file list and avoiding the recursive-generic-catalog shape
described above.

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
- Run the Cross-Phase QA Gate (defined above under Complete Site
  Architecture) as this phase's final step: crawl every button, card,
  image, modal, CTA, and link Phase 1 adds and confirm each does
  something real, with no filler copy and no fabricated stat, review,
  or claim of service in an unverified city

## Open items for later phases (not blocking Phase 1)

- Real Next Level Events photography to replace `status: "placeholder"`
  manifest entries, once supplied
- Verification that the recovered YouTube Shorts IDs are actually
  relevant/current before surfacing them as proof content
- The `sam.verma8` Instagram handle appeared linked from the live site's
  about area (likely a founder's personal account) — confirm before
  Phase 4 whether it belongs anywhere on the new site
