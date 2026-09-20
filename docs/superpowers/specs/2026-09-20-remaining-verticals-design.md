# Next Level Events — Phase 3: Remaining Event Verticals — Design Spec

## Context

Phase 1 (Foundation) and Phase 2 (Weddings Flagship) are complete and merged into `master`. This spec covers **Phase 3 only**: giving the other 7 event verticals — Corporate Events, Social Celebrations, Kids & Family, Live & Entertainment, Décor & Design, Special & Cultural, Destination Events — real hub pages and real experience-detail pages, replacing the generic `EventCategoryStub` placeholder each currently shows.

This is explicitly **not** a second flagship. Phase 1's spec named Weddings as the one vertical that gets a dedicated six-layer world; these 7 verticals get one consistent, shallower architecture: a hub page per vertical, and one flat list of experiences per vertical, each following the same content contract Phase 2 already established (hero, teaser, and — for curated full-depth items — description, what-we-handle, and a gallery).

## Grounding: what's actually verified

Per the no-fabrication rule, every experience listed below is grounded in one of two sources, not invented for this phase:

1. **The live site's actual recovered category taxonomy** (decoded from its compiled bundles during Phase 1 research) — a real, already-existing catalog structure the business used before this rebuild: `corporate` (product-launch, conference-office-party), `birthday` (kids-birthday themes, milestone-birthday, balloon-decor-setups), `baby-shower` (themed-baby-showers, photo-corner-setups), `newborn-welcome` (naming-ceremony-decor, welcome-home-setups), `annaprashan`, `festivals-culture` (diwali-festive-decor, navratri-holi-cultural), and `event-add-ons` (SFX — cold pyro/fog/fireworks, Artists — anchors/dancers, Photography — candid/cinematic/drone, Baraat Procession).
2. **Direct, conservative extensions of a verified category** that any business already offering that category would reasonably offer (e.g. "Award Nights" alongside verified "Conferences" and "Product Launches" under Corporate Events; "DJ & Sound" alongside verified "Artists" and "SFX" under Live & Entertainment). These are marked as such below, not presented as independently verified.

Nothing below claims a specific past client, a specific completed project, a review, a rating, or a statistic — those remain forbidden per Phase 1/2's standing rule.

## Depth strategy

Matching Phase 2's precedent: full IA breadth for all 7 verticals now (every listed experience gets a real route and a real hero image, or an honest image-optional card if no correctly-matched image can be sourced), with curated full-depth (description + what-we-handle + gallery) reserved for the experiences with the strongest verified grounding.

**Full-depth verticals** (richest verified taxonomy, warrant the most full-depth items):
- **Kids & Family** — the single richest verified sub-taxonomy of any non-wedding vertical on the original site.
- **Corporate Events** — well-verified (product launch, conferences) plus reasonable extensions.
- **Live & Entertainment** — well-verified (SFX, artists, photography) plus reasonable extensions.

**Curated/lighter verticals** (real and accurate, but with less to say per item — most or all items get the lighter teaser-only treatment):
- **Social Celebrations**, **Décor & Design**, **Special & Cultural**, **Destination Events**.

**Destination Events specifically** has no rich verified sub-taxonomy beyond the general "we execute anywhere" capability (which Phase 1's spec already names under Locations). Its 3 items stay deliberately thin and honestly capability-framed rather than padded with invented specifics — this is a `do not fabricate` boundary, not an oversight.

## Proposed vertical structure

| Vertical | Depth mix | Items |
|---|---|---|
| **Corporate Events** | 4 full / 2 light | Product Launch (F), Conferences & Seminars (F), Annual Functions (F), Corporate Décor & Branding (F), Award Nights (L, extension), Stage & Production (L, extension — cross-refs Live & Entertainment) |
| **Social Celebrations** | 1 full / 5 light | Anniversary Celebrations (F), Milestone Jubilees (L), Private Parties (L), Surprise Celebrations (L), House Warming (L), Bachelor & Bachelorette Parties (L, extension) |
| **Kids & Family** | 4 full / 3 light | Kids Birthday Themes (F), Balloon Décor for Kids (F), Milestone Birthdays (F), Baby Shower (F), Naming Ceremony (L), Welcome Home Setup (L), Annaprashan (L) |
| **Live & Entertainment** | 3 full / 3 light | Special Effects (F), Live Performers & Dancers (F), Anchors & Hosts (F), DJ & Sound (L, extension), Photography & Videography (L — a general cross-event service, distinct from Weddings' own dedicated photography experience), Kids Entertainment (L, cross-refs Kids & Family) |
| **Décor & Design** | 0 full / 6 light | Balloon Décor & Installations, Floral Décor, Stage & Backdrop Design, Lighting Design, Theme Décor, Venue Styling — all cross-event, explicitly distinct from Weddings' own décor layer (no wedding-specific items here, to avoid duplicating Phase 2 content) |
| **Special & Cultural** | 1 full / 3 light | Diwali Celebrations (F), Navratri & Garba (L), Holi Celebrations (L), Other Cultural & Religious Celebrations (L, honest catch-all) |
| **Destination Events** | 0 full / 3 light | Destination Weddings (L — cross-links to Weddings' existing Destination cultural type rather than duplicating it), Destination Corporate Retreats (L), Destination Celebrations (L) |

Total: 38 new experience items across 7 verticals (13 full-depth, 25 light).

**Cross-event services stay cross-event, not duplicated per vertical:** Catering & Hospitality is not a dedicated vertical or a repeated standalone item — per the standing rule, it appears as a "what we handle" line within the full-depth items where it's genuinely relevant (Corporate's Annual Functions and Conferences, Social's Anniversary Celebrations, Kids & Family's Milestone Birthdays and Baby Shower), the same way Phase 2 handled it inside Wedding Planning.

## Architecture

### New shared components (Phase 1/2 files untouched)

- **`VerticalHub.jsx`** — one generic hub page for all 7 verticals (simpler than `WeddingsHub`: hero + a single `EditorialGrid`/`EventCard` grid of that vertical's experiences, no sub-nav, no multi-layer sections, since none of these 7 are the flagship). Looks up its vertical config (label, data array, hero `imageId`) via a `VERTICALS` map keyed by the `:vertical` route param — the same lookup pattern Phase 2's `ExperienceDetail` already established for `:layer`. A `:vertical` value that matches none of the 7 (a genuinely malformed or unknown slug) renders the same kind of working not-found fallback `ExperienceDetail`/`EventCategoryStub` already use, never a blank page.
- **`VerticalExperienceDetail.jsx`** — one generic detail page for all 7 verticals' individual experiences, structurally identical to Phase 2's `ExperienceDetail.jsx` (breadcrumb, hero image-or-panel, full/light conditional content, rotated gallery, related experiences, contextual WhatsApp CTA) but with its own separate `VERTICALS` config and message templates. **This is a new file, not a modification of `ExperienceDetail.jsx`** — Weddings' own detail page stays exactly as Phase 2 shipped it, per the "do not redesign Weddings" constraint.

### Reused unchanged

`EventCard`, `EditorialGrid`, `SectionHeading`, `WhatsAppCTA`, `Breadcrumb`, `getImage`, `Navbar`, `Footer`, `Home`, `nav.js`, `events.js`, `contact.js` — none of these need to change. `events.js`'s 8 entries already have the correct `href` values for all 7 remaining verticals (`/events/corporate-events`, `/events/social-celebrations`, etc.), and the homepage's `EventDiscovery` grid and `nav.js`'s mega-menu already link to them — exactly like Weddings in Phase 2, these links automatically resolve to the new real hubs once routing is retargeted, with zero homepage or nav changes required.

### Routing

```
/events/:slug                    → VerticalHub (retargeted from EventCategoryStub)
/events/:vertical/:slug          → VerticalExperienceDetail (new)
/events/weddings                 → WeddingsHub (untouched, unaffected — declared with higher specificity)
/events/weddings/:layer/:slug    → ExperienceDetail (untouched, unaffected)
*                                 → EventCategoryStub (untouched — still the genuine "page not found" fallback)
```

**Why retargeting `/events/:slug` is not "redesigning Phase 1," but fulfilling it:** Phase 1's own spec states `EventCategoryStub` "is a deliberately thinner placeholder ... upgraded to the full `ExperienceDetail` as each vertical's phase lands." Phase 3 landing for these 7 verticals is exactly that stated evolution, not a departure from it. `EventCategoryStub.jsx`'s source file is not modified at all — it keeps serving the `*` catch-all exactly as before; only which route points at which component changes, in `AppRoutes.jsx`, the same file Phase 2 already modified additively.

Because `/events/:vertical` and Weddings' `/events/weddings` overlap in shape only at the single literal `weddings` value, and Weddings' route is declared as an exact static path, React Router v6's specificity ranking (static beats dynamic) continues to route `/events/weddings` to `WeddingsHub` and every other `/events/<slug>` to `VerticalHub` — no ordering hazard, matching how Phase 2's own routes already coexist with the generic pattern today.

### Data files (7 new, same shape as Phase 2's layer files)

`src/data/corporateEvents.js`, `socialCelebrations.js`, `kidsFamily.js`, `liveEntertainment.js`, `decorDesign.js`, `specialCultural.js`, `destinationEvents.js` — each a flat array of `{ slug, label, imageId (nullable), depth: 'full' | 'light', teaser, description?, whatWeHandle?, href }`, `href` following `/events/<vertical-slug>/<item-slug>`.

## Image sourcing

Each vertical's **hub page hero** reuses its existing Phase 1 `vertical-*` manifest image (`vertical-corporate`, `vertical-social`, `vertical-kids-family`, `vertical-entertainment`, `vertical-decor`, `vertical-cultural`, `vertical-destination`) — no new sourcing needed for any of the 7 hub heroes.

The 38 individual experience items mostly need their own distinct image, following the exact process validated across Phases 1–2: search Wikimedia Commons, download and **visually verify** every candidate before accepting it (never trust a filename), record source/license/alt text in the manifest, and honestly flag (or use the image-optional card pattern from Phase 2) any item where no correctly-matched photo can be found rather than forcing a mismatch or reusing an unrelated image. This research pass has not been run yet — it is the first implementation task, done with the same rigor as Phases 1–2, not pre-baked into this planning document, since the user asked for the spec and plan only in this pass, not implementation.

## Testing

Same pattern as Phase 2: a shape-validation test per new data file, a `VerticalHub.test.jsx`, a `VerticalExperienceDetail.test.jsx` (full-depth, light-depth, image-optional, and both not-found cases), and an `AppRoutes.test.jsx` extension proving Weddings' routes are unaffected by the `/events/:slug` retarget. A final cross-phase QA gate matching Phases 1–2's pattern (automated suite, build, manual link/CTA crawl, fabricated-content grep, image-manifest cross-check, responsive review).

## Self-review notes

- **No fabrication:** every item above traces to either the live site's real recovered taxonomy or a labeled, conservative extension — none claim a specific client, project, review, rating, or statistic.
- **Weddings/Phase 1 preserved:** no existing file's behavior changes; `ExperienceDetail.jsx` (Weddings) is untouched by a separate, parallel `VerticalExperienceDetail.jsx`; `EventCategoryStub.jsx` is untouched and keeps its `*` fallback role.
- **Cross-event services:** Catering & Hospitality appears inside relevant full-depth items' what-we-handle lists, not as its own duplicated vertical or item.
- **No placeholders:** every "light" item still gets a real route, a real (or honestly image-optional) hero, and a working contextual CTA — nothing is a TBD.
