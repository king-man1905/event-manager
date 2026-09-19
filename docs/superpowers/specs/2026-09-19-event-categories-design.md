# Event Category Architecture — Design Spec

Date: 2026-09-19
Status: Approved by user, proceeding to implementation.

## Purpose

Integrate a two-level event-category discovery system (7 main categories,
10 wedding cultural styles) into the existing premium single-page site,
without rebuilding it or removing working features. Visitors should be
able to answer "what kind of event am I looking for?" before diving into
portfolio/services detail.

## Non-goals

- No routing/URL changes — stays a single-page app (no react-router added).
- No rebuild of existing sections (Hero, Portfolio, Services, Contact, etc.)
  beyond inserting two new sections and reusing the Portfolio filter state.
- No fabricated portfolio items — categories without matching real project
  data (Special/Cultural, Destination) do not get placeholder portfolio
  entries; their CTA goes straight to WhatsApp instead of a "View work" link.
- No visible "demo/proposed" badges in the UI. Content is written and
  presented as real site content (matching how the rest of the site already
  presents Unsplash-sourced imagery), with copy kept factual — no
  unverifiable claims ("we specialize in...", "100+ weddings...").

## Data architecture

`src/data/events.js` — 7 main categories:
```js
{
  id: 'weddings',
  number: '01',
  name: 'Weddings',
  descriptor: 'Cultural · Destination · Celebrations',
  image: '<url>',
  size: 'large',            // large | medium | wide — drives grid span
  subcategories: ['Conferences', 'Product Launches', ...], // plain text list (non-wedding only)
  ctaLabel: 'Plan Your Wedding',
  portfolioCategory: 'weddings', // matches projects.js category id, or null
}
```

`src/data/weddings.js` — 10 cultural wedding styles:
```js
{
  id: 'south-indian',
  name: 'South Indian',
  tagline: 'Timeless Rituals',
  image: '<url>',
  description: '<factual, general 1-2 sentence description>',
  tags: ['Traditional', 'Elegant', 'Cultural'],
}
```

`src/data/projects.js` is unchanged; `events.js` entries link to it via
`portfolioCategory` where a real mapping exists:
weddings→weddings, corporate→corporate, social→birthdays, live→concerts,
decor→decoration. Special/Cultural and Destination have `portfolioCategory: null`.

## Components

- **`OurEvents.jsx`** (new) — homepage grid of all 7 category cards.
  Card visual size (large/medium/wide) is data-driven from `events.js`,
  giving real editorial variety from one component instead of 7 bespoke
  ones. Clicking a card: Weddings scrolls to `WeddingExperience`; the
  other 6 open `CategoryDetail` in main-category mode.

- **`WeddingExperience.jsx`** (new) — dedicated hero-level section directly
  after `OurEvents`. Headline "YOUR WEDDING. YOUR CULTURE. YOUR STORY.",
  supporting copy, then the 10 style cards (2-col grid on mobile, editorial
  grid desktop) each with its own distinct image. Clicking a style opens
  `CategoryDetail` in wedding-style mode.

- **`CategoryDetail.jsx`** (new) — one reusable full-screen modal, styled
  consistently with the existing `Portfolio.jsx` → `ProjectViewer` modal
  (same backdrop/blur/panel/close pattern, ESC to close, focus handling).
  Two data shapes render through it:
  - Main category: image, number, name, descriptor, subcategory list,
    "View work in this category" link (only if `portfolioCategory` is set —
    scrolls to Portfolio section and sets its existing `activeCategory`
    state) + WhatsApp CTA.
  - Wedding style: image, name, tagline, tags, description, WhatsApp CTA
    pre-filled with the style name.

## Page integration

New order:
`Hero → Intro → OurEvents → WeddingExperience → Marquee → Portfolio →
Services → Marquee → Experience → WhyNextLevel → BrandStatement → About →
Instagram → FinalCTA → Contact`

No nav bar structural changes — reachable by scroll, consistent with the
rest of the single-page nav (which already scrolls to `#work`, `#services`,
etc.). No new top-level nav links.

## Mobile behavior

- `OurEvents`: cards stack full-width, large tap targets.
- `WeddingExperience`: 2-column compact grid for the 10 styles (not tiny
  unreadable cards, not a cramped 1-column list either).
- `CategoryDetail`: reuses the existing responsive modal shell already
  verified to work cleanly at 375–1440px in the prior UI audit.

## Performance

- All category/style images use `loading="lazy"` except none are above the
  fold at initial paint (Hero already owns the eager/fetchPriority image).
- Images sized via explicit `width`/`height` attributes (matches existing
  pattern in `Portfolio.jsx`/`About.jsx`) to avoid layout shift.
- No new runtime dependency (no router, no carousel library) — modal reuses
  existing CSS transform/opacity transition patterns already in the codebase.

## Testing

- `npm run lint` and `npm run build` must pass with zero warnings.
- Manual QA pass (reusing the Playwright driver script from the prior UI
  audit) at 1440/1280/1024/768/412/390/375px: no horizontal overflow, no
  console errors, category cards/wedding styles/detail modal all open and
  close (click, ESC, backdrop click), portfolio filter-linking works,
  existing WhatsApp/Contact/Portfolio functionality unaffected.
