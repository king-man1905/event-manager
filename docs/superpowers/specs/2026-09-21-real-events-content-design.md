# Next Level Events — Phase 4: Real Events + Social/Content System — Design Spec

## Context

Phases 1–3 are complete and merged into `master` (commit `d1b7c9e`). The site has a full brand system, a Weddings flagship, and generic hub/detail pages for the other 7 event verticals — all service pages, describing what Next Level Events *can do*. Phase 4 adds the first content that shows the business *actually doing it*: real video, and a real look at the planning process, sourced only from verified real accounts.

Phase 1 already anticipated this: `src/data/homeTeasers.js` has 5 teaser slots (`real-events`, `inspiration`, `transformation`, `behind-the-event`, `social-video`) that explicitly say "coming in a later phase." Phase 4 is that phase, for the 3 of these 5 that genuine content actually supports.

## Content-truth inventory

This phase is content-truth-first: every claim below was independently verified during spec research, not assumed from the brief.

**Verified and usable now:**
- Instagram `@nextlevelevents.in` is a real, active account (915 followers). Its bio confirms "Weddings | Anniversaries | Birthdays" and "Event Management & Premium Décor." Its Story Highlights are labeled **"Site Recce," "Meeting," "Special Entry"** — these are the three real Behind-the-Event categories this phase uses; they were read directly off the account, not invented.
- YouTube channel `@nextlevelevents25` is real (confirmed via the platform's oEmbed endpoint).
- All 5 YouTube Shorts IDs supplied for this phase (`a-siuy_wkx0`, `H7EhkKuHGWU`, `8Ll1q_CRLRA`, `z-PeklpQUdI`, `BLlOtkPXf9E`) are **verified real and currently live** — each one's oEmbed `author_url` resolves to `https://www.youtube.com/@nextlevelevents25`, the same channel URL already verified in `src/data/contact.js`. None have real editorial titles — the account captions everything with hashtags only (e.g. `#party #event #eventplanner #wedding #decoration`). This phase therefore uses honest, generic labels derived from each video's real hashtags, never an invented caption:
  - `a-siuy_wkx0` — generic event/party hashtags only → **"Event Highlight Reel"**
  - `H7EhkKuHGWU` — wedding + decoration hashtags → **"Wedding Décor Reel"**
  - `8Ll1q_CRLRA` — wedding + decoration hashtags → **"Wedding Décor Reel"**
  - `z-PeklpQUdI` — birthday + themed hashtags → **"Birthday Décor Reel"**
  - `BLlOtkPXf9E` — wedding + decoration hashtags → **"Wedding Décor Reel"**
  - (Duplicate labels across different videos are honest, not a defect — they reflect genuinely similar real content, not a copy-paste template collision like the WhatsApp-message bug class from Phases 2–3.)
- Facebook page `facebook.com/nextlevelevents.in` exists (confirmed by page title in search results) but its content is unreachable from here, and nothing found suggests review content exists — consistent with the brief's own prior finding. It is used as a follow-link only; nothing is rendered from it.

**Not verified — will not be built or fabricated this phase:**
- No individual real event story (client, venue, date, guest count) is reachable anywhere — none is invented. A "Real Event Story" data shape is defined below for future use, but zero instances are created this phase.
- No before/after image pairs were found anywhere.
- No licensed inspiration/reference imagery has been sourced for a separate Event Inspiration system.
- Individual Instagram post permalinks are not obtainable without live browsing/login, so specific BTS posts cannot be embedded yet — only the three real, named Highlight *categories* are used, each linking out to the Instagram profile rather than a fabricated specific post.

## Scope for this phase (approved)

A single new route, `/real-events`, replacing nothing and not duplicating any existing page:
1. **Real videos** — the 5 verified YouTube Shorts, click-to-load, no autoplay.
2. **Behind the Event** — the 3 verified Instagram Highlight categories (Site Recce, Meeting, Special Entry), each a labeled card linking out to Instagram (no fabricated photos, since no verified individual BTS photo is available).
3. **Follow the real work** — a CTA row to Instagram, YouTube, and Facebook (`SOCIALS` from `src/data/contact.js`, unchanged).
4. **An honest "more real events coming" note** — matching Phase 1's own established coming-soon language, since a fuller Real Events portfolio isn't honestly populatable yet.
5. A contextual WhatsApp enquiry CTA at the end, matching every other page in the app.

**Explicitly not built this phase** (data shapes only, documented below, zero routes/content):
- Before/After
- Event Inspiration
- Individual Real Event Story pages

## Data models

### `src/data/socialContent.js` (new — populated, 5 real entries)

```js
export const socialContent = [
  {
    id: 'yt-a-siuy_wkx0',
    platform: 'youtube',
    type: 'video',
    videoId: 'a-siuy_wkx0',
    label: 'Event Highlight Reel',
    verificationStatus: 'verified-video',
    sourceUrl: 'https://www.youtube.com/shorts/a-siuy_wkx0',
  },
  {
    id: 'yt-H7EhkKuHGWU',
    platform: 'youtube',
    type: 'video',
    videoId: 'H7EhkKuHGWU',
    label: 'Wedding Décor Reel',
    verificationStatus: 'verified-video',
    sourceUrl: 'https://www.youtube.com/shorts/H7EhkKuHGWU',
  },
  {
    id: 'yt-8Ll1q_CRLRA',
    platform: 'youtube',
    type: 'video',
    videoId: '8Ll1q_CRLRA',
    label: 'Wedding Décor Reel',
    verificationStatus: 'verified-video',
    sourceUrl: 'https://www.youtube.com/shorts/8Ll1q_CRLRA',
  },
  {
    id: 'yt-z-PeklpQUdI',
    platform: 'youtube',
    type: 'video',
    videoId: 'z-PeklpQUdI',
    label: 'Birthday Décor Reel',
    verificationStatus: 'verified-video',
    sourceUrl: 'https://www.youtube.com/shorts/z-PeklpQUdI',
  },
  {
    id: 'yt-BLlOtkPXf9E',
    platform: 'youtube',
    type: 'video',
    videoId: 'BLlOtkPXf9E',
    label: 'Wedding Décor Reel',
    verificationStatus: 'verified-video',
    sourceUrl: 'https://www.youtube.com/shorts/BLlOtkPXf9E',
  },
];
```

`verificationStatus` uses the vocabulary from the brief, restricted to the values this phase actually needs: `verified-video` (used above). The other listed values (`verified-real-work`, `verified-social`, `licensed-reference`, `placeholder`, `unavailable`) are reserved in this same enum for the future data shapes below — not used by any entry shipped this phase, so no value goes into this file that isn't real.

Video thumbnails are **not** stored in `manifest.json` — they're rendered directly from YouTube's own official thumbnail endpoint for the given `videoId` (`https://i.ytimg.com/vi/<videoId>/hqdefault.jpg`), since that is the platform's real thumbnail for that specific verified video, not a sourced/licensed still image. No new Wikimedia sourcing is needed for this phase.

### `src/data/behindTheEvent.js` (new — populated, 3 real entries)

```js
export const behindTheEventCategories = [
  {
    id: 'site-recce',
    label: 'Site Recce',
    description: 'Walking the venue ahead of the event to plan layout, power and access.',
  },
  {
    id: 'meeting',
    label: 'Meeting',
    description: 'Planning conversations with clients ahead of the event.',
  },
  {
    id: 'special-entry',
    label: 'Special Entry',
    description: 'Preparing entrances and special-moment staging before guests arrive.',
  },
];
```

Each `label` is the real Instagram Highlight name, verbatim. Each `description` explains what that real category of work generically involves — it does not claim a specific date, venue, or client, so it is not a fabricated event, the same way Phase 2/3's "what we handle" bullet lists describe real service categories in generic terms without claiming a specific past project.

### Future data shapes (documented only — no file created, no instance shipped this phase)

**Real Event Story** (for a future phase, once individual verified events exist):
```js
{
  id: string,
  eventType: string,          // e.g. 'wedding', 'corporate'
  occasion: string,
  location: string | null,    // only if verified
  gallery: string[],          // manifest image ids, only verified-real-work photos
  story: string | null,       // short real context, optional
  servicesInvolved: string[] | null,  // only if verified
  relatedExperienceHref: string | null,
  relatedContentIds: string[] | null, // ids from socialContent.js
  verificationStatus: 'verified-real-work',
}
```

**Before/After pair** (for a future phase, once a genuine pair exists):
```js
{
  id: string,
  beforeImageId: string,
  afterImageId: string,
  eventType: string | null,
  verificationStatus: 'verified-real-work',
  note: string | null,
}
```

**Event Inspiration item** (for a future phase, once properly licensed reference imagery is sourced — distinct from Real Events/Social Content, which must be the company's own verified work, and distinct from service-page imagery, which illustrates a capability rather than curating ideas):
```js
{
  id: string,
  imageId: string,
  relevanceNote: string,
  verificationStatus: 'licensed-reference',
}
```

## Route structure

```
/real-events   → RealEventsHub (new, flat page — no dynamic segments; there is nothing yet to route to at a deeper level)
```

No existing route changes. `/events/*` (Weddings + the 7 verticals) is completely unaffected.

## Component plan

- **`src/pages/RealEventsHub.jsx`** (new) — the page. Sections: hero (reusing the existing `vertical-social` manifest image, already used by the current `real-events` homepage teaser — no new image sourcing needed), video grid, Behind the Event category cards (this section carries `id="behind-the-event"`, since the rewired homepage teaser links to `/real-events#behind-the-event`), follow-CTA row, coming-soon note, WhatsApp CTA. Reuses `SectionHeading`, `WhatsAppCTA` unchanged.
- **`src/components/realEvents/VideoEmbed.jsx`** (new) — click-to-load facade for one YouTube video: renders the real `i.ytimg.com` thumbnail behind a `<button>` play control (keyboard-operable natively, `aria-label` naming the video's honest label); on click, replaces itself with a real `<iframe>` (`https://www.youtube.com/embed/<videoId>?autoplay=1`, with a `title` attribute and `allow="autoplay; encapsulated-media"`/`allowFullScreen`). Autoplay only fires after the user's own click — this is standard "click to play" behavior, not the unrequested autoplay-on-load the brief forbids.
- Behind the Event cards and the follow-CTA row are rendered inline in `RealEventsHub.jsx` from the two small static arrays above — three and three items respectively don't justify their own components (YAGNI); each reuses the existing image-optional text-panel visual pattern already established in `EventCard`/`VerticalExperienceDetail` for the Behind the Event cards, since no verified individual BTS photo exists to pair with them.
- **`src/hooks/usePageMeta.js`** (new, ~10 lines, no new dependency) — sets `document.title` and upserts a `<meta name="description">` tag via a `useEffect`. No existing page in this app sets a per-page title today (a pre-existing Phase 1–3 gap, not something to retrofit here) — this phase adds the hook and uses it only on `RealEventsHub`, so the new page is the one page in the app with real SEO metadata, without scope-creeping into Phase 1–3 pages.

## Navigation plan

`src/data/nav.js` gets exactly one new top-level entry, alongside the existing plain-link pattern already used for `Contact` (not a mega-menu column, since there's only one page to link to):

```js
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Events', columns: [...] },   // unchanged
  { label: 'Real Events', href: '/real-events' },
  { label: 'Contact', href: '/#contact' },
];
```

## Homepage integration plan

Of the 5 "coming in a later phase" teasers in `src/data/homeTeasers.js`, exactly 3 get content this phase and are rewired; the other 2 (`inspiration`, `transformation`) get no content this phase and are left completely unchanged, since rewiring them without real content behind them would be misleading.

- **`real-events`**: `href` changes from `/#contact` to `/real-events`; copy updated to reflect that real content now exists (title/description/ctaLabel rewritten honestly — see plan for exact text).
- **`behind-the-event`**: `href` changes from `/#how-we-work` to `/real-events#behind-the-event`; copy updated to name the 3 real categories.
- **`social-video`**: `href` changes from the raw external Instagram URL to `/real-events` (keeps the visitor on-site first; the hub page itself has the follow-CTA row linking out to all three platforms); copy lightly adjusted.
- **`inspiration`**, **`transformation`**: **unchanged**, byte-for-byte.

No new homepage sections are added — the existing `SectionTeaser` component and `Home.jsx`'s existing render order are untouched.

## Asset/content verification tracking

- Photos continue to live in `manifest.json` with its existing `{url, source, license, altText, status, note?}` shape — unchanged this phase, no new entries needed.
- Video/social content lives in the new `socialContent.js`, tracked by `verificationStatus` rather than `license` (a YouTube Short isn't a licensed still image — its own platform embed is the "license" for embedding purposes). This intentionally keeps the two asset kinds in separate, appropriately-shaped files rather than forcing video metadata into the image manifest's shape.

## Performance plan

- Click-to-load video embeds (facade pattern) — no iframe exists in the DOM, and no third-party JS loads, until the user explicitly clicks play.
- No autoplay on page load anywhere.
- YouTube thumbnail images use `loading="lazy"` and are correctly sized via the `hqdefault.jpg` endpoint (480×360, matches typical card sizing without over-fetching a maxres asset).
- No new npm dependencies.

## SEO / accessibility plan

- `RealEventsHub` sets a real page title and meta description via `usePageMeta`.
- Play buttons are real `<button>` elements — keyboard-operable and screen-reader-labeled by default, no custom `tabIndex`/`role` needed.
- The loaded `<iframe>` has a descriptive `title` attribute per video.
- All Behind the Event and follow-CTA links are real `<a>` elements with visible text (no icon-only links without an accessible name).
- Canonical URL / Open Graph tags: out of scope for this phase's single internal page (no existing page in the app sets these yet; introducing site-wide OG/canonical infrastructure for the first time is a larger, separate concern than one new route, so it isn't bundled into this phase silently).

## Testing / QA plan

- `src/data/socialContent.js` + `.test.js`: shape validation (5 items, valid `platform`/`type`/`verificationStatus` enums, `videoId` matches the id embedded in `id`).
- `src/data/behindTheEvent.js` + `.test.js`: shape validation (exactly the 3 real category labels).
- `src/components/realEvents/VideoEmbed.jsx` + `.test.jsx`: renders a thumbnail + play button and no iframe initially; clicking the button mounts an iframe with the correct `src` for that video and a real `title`; no autoplay attribute is present before the click.
- `src/pages/RealEventsHub.jsx` + `.test.jsx`: all 5 videos render, all 3 Behind the Event categories render with real labels and links to `SOCIALS.instagram`, the follow-CTA row links to `SOCIALS.instagram`/`SOCIALS.youtube`/`SOCIALS.facebook` (`target="_blank" rel="noopener noreferrer"`), the coming-soon note renders, the WhatsApp CTA renders with the verified number.
- `src/AppRoutes.test.jsx`: add a case routing `/real-events` to `RealEventsHub`; every existing case (Phase 1–3, including both Weddings guard cases) must still pass unmodified.
- `src/data/nav.test.js`: assert the new "Real Events" entry exists with the correct href; existing entries unchanged.
- `src/data/homeTeasers.test.js` / `src/pages/Home.test.jsx`: assert the 3 rewired teasers have their new hrefs/copy, the 2 untouched teasers are byte-identical to before, and `Home` still renders all 7 teasers in the same order.
- Full regression: the entire Phase 1–3 suite must stay green with zero modifications to any Phase 1–3 file other than `nav.js` and `homeTeasers.js`, both additive/targeted edits.
- Manual crawl (per the user's explicit checklist): `/real-events` itself, all 5 video click-to-load interactions, all 3 Behind the Event CTAs, the Instagram/YouTube/Facebook follow links, all 5 homepage teaser links (3 changed + 2 unchanged), mobile and desktop layout, a grep for fabricated-content patterns, and a check for dead clicks/broken media/console errors.

## Self-review notes

- **No fabrication:** every video ID, the channel, the Instagram account, and the 3 Behind the Event category labels are independently verified, not assumed from the brief. No client name, venue, date, review, rating, or statistic appears anywhere in this phase's data.
- **Content-truth-first honored:** Before/After and Event Inspiration get a defined shape and zero shipped content — no filler galleries.
- **No Phase 1–3 regression:** the only existing files touched are `nav.js` (one line added) and `homeTeasers.js` (3 of 7 entries edited, 4 untouched) — no vertical, no Weddings file, no shared component's existing behavior changes.
- **No placeholders violating "every card needs a purpose":** every one of the 5 video cards and 3 category cards is real and does something (plays a real video / links to the real Instagram account) — nothing is a dead TBD tile.
