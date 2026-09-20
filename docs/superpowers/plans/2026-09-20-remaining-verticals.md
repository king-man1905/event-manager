# Remaining Event Verticals (Phase 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic `EventCategoryStub` placeholder for the 7 remaining event verticals (Corporate Events, Social Celebrations, Kids & Family, Live & Entertainment, Décor & Design, Special & Cultural, Destination Events) with real hub pages and real experience-detail pages, without touching Weddings (Phase 2) or any other Phase 1 file's behavior.

**Architecture:** Two new shared page components — `VerticalHub` (one hero + one grid per vertical) and `VerticalExperienceDetail` (one generic detail page for all 7 verticals' individual experiences, parameterized by `:vertical`) — plus 7 new flat data files, all following the exact shape Phase 2 already established (`{slug, label, imageId, depth, teaser, description?, whatWeHandle?, href}`). `EventCategoryStub`, `ExperienceDetail` (Weddings), `WeddingsHub`, `Home`, `nav.js`, `events.js`, `contact.js`, `EventCard`, `EditorialGrid`, `SectionHeading`, `WhatsAppCTA`, `Breadcrumb` are all reused completely unchanged.

**Tech Stack:** Same as Phases 1–2 — Vite, React (JS, no TypeScript), react-router-dom v6, Tailwind CSS v3, Vitest + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-09-20-remaining-verticals-design.md` (extends `docs/superpowers/specs/2026-09-20-nle-foundation-design.md` and the Phase 2 spec's established patterns)

## Global Constraints

- JavaScript only, no TypeScript.
- Do not modify `EventCategoryStub.jsx`, `ExperienceDetail.jsx`, `WeddingsHub.jsx`, `Home.jsx`, `nav.js`, `events.js`, `contact.js`, `Navbar.jsx`, `Footer.jsx`, `EditorialGrid.jsx`, `SectionHeading.jsx`, `WhatsAppCTA.jsx`, `Breadcrumb.jsx`, `ScrollToHash.jsx`, or `images.js`. Only `AppRoutes.jsx` gets an additive change (retargeting one route, adding one route) and `manifest.json` gets additions.
- Never invent a service, client project, review, rating, statistic, or location not already verified. Every experience item traces to the live site's real recovered taxonomy or is explicitly labeled as a conservative extension of one (see spec).
- Every image reference goes through `getImage(id)` — or renders Phase 2's image-optional panel (already built into `EventCard`/available as a pattern) for any item where no honestly-matched image can be sourced. No component ever holds a bare image URL.
- Every card, button, and route must lead somewhere real — no dead ends, including a working not-found fallback for an unknown `:vertical` or unknown `:slug`.
- Catering & Hospitality is never its own vertical or duplicated item — it appears only inside relevant full-depth items' `whatWeHandle` lists.
- Verified WhatsApp number `917903133317` — every CTA message must be genuinely contextual, never generic.
- `depth: 'full'` items render description + what-we-handle + gallery; `depth: 'light'` items render hero + teaser only. Both get related-experiences and a CTA.

---

### Task 1: Source and verify images for all 38 experience items

**Files:**
- Modify: `src/assets/manifest.json` (add new entries; the existing Phase 1/2 entries are untouched)

**Interfaces:**
- Produces: one manifest entry per `imageId` listed in the table below, each `{ url, source, license, altText, status: "placeholder", note? }` following the exact schema Phases 1–2 already use.

This is a research task, not a coding task — follow the exact process validated across Phases 1–2: search Wikimedia Commons' API (`action=query&list=search&srnamespace=6`), get `imageinfo` (url/size/`extmetadata` for license+artist) for each candidate, **download and visually view every candidate before accepting it** (never trust a filename — Phases 1–2 both found filename/content mismatches this way), accept only CC BY-SA/CC BY/Public Domain licenses, and use the documented thumbnail endpoint (`/thumb/.../{width}px-{file}`, width from Wikimedia's whitelisted set: 20/40/60/120/250/330/500/960/1280/1920/3840) rather than full-resolution originals, to avoid the hotlink rate-limiting Phase 2 hit. If no correctly-matched image can be found for an item after a reasonable search effort, set that item's `imageId` to `null` in Task 2 instead of forcing a mismatch or an unrelated reuse — Phase 2 already established this as the correct, honest outcome (3 of its 32 items used it).

Consider dispatching this as 2-3 parallel research passes grouped by vertical (mirroring Phase 2's 3 parallel research agents), since the items are independent of each other.

**Image needs, by vertical (37 new + 1 reused from Phase 1):**

| imageId | Vertical | Depicts / search guidance |
|---|---|---|
| `corporate-product-launch` | Corporate | A branded product launch/unveiling stage or reveal moment |
| `corporate-conferences` | Corporate | A corporate conference or seminar hall in session |
| `corporate-annual-function` | Corporate | A corporate annual function/celebration event |
| `corporate-decor-branding` | Corporate | Branded corporate event signage/backdrop with company branding elements |
| `corporate-award-night` | Corporate | A corporate award ceremony/stage |
| `corporate-stage-production` | Corporate | A corporate event stage build with lighting/AV production |
| `social-anniversary` | Social | A candlelit anniversary dinner or couple's anniversary celebration |
| `social-milestone-jubilee` | Social | A milestone (25th/50th) anniversary jubilee celebration |
| `social-private-party` | Social | An elegant private party/celebration gathering |
| `social-surprise-celebration` | Social | A surprise party setup/reveal moment |
| `social-housewarming` | Social | An Indian housewarming/Griha Pravesh ceremony |
| `social-bachelor-party` | Social | A bachelor/bachelorette party celebration |
| `kids-birthday-theme` | Kids & Family | A themed kids' birthday party setup (jungle, princess, superhero, or similar) |
| `kids-balloon-decor` | Kids & Family | A balloon arch or balloon installation for a kids' party |
| `kids-milestone-birthday` | Kids & Family | A first-birthday or milestone birthday celebration setup |
| `kids-baby-shower` | Kids & Family | An Indian baby shower / godh bharai celebration setup |
| `kids-naming-ceremony` | Kids & Family | An Indian naming ceremony (namkaran) setup |
| `kids-welcome-home` | Kids & Family | A newborn welcome-home doorway/home decoration |
| `kids-annaprashan` | Kids & Family | An Annaprashan (first rice-feeding ceremony) setup |
| `entertainment-sfx` | Live & Entertainment | Cold pyro, fog, or fireworks special effects at an event |
| `entertainment-performers` | Live & Entertainment | Live dancers or performers on stage at an Indian event |
| `entertainment-anchor` | Live & Entertainment | An event anchor/host on stage with a microphone |
| `entertainment-dj` | Live & Entertainment | A DJ setup/booth at an event |
| `entertainment-photography` | Live & Entertainment | An event photographer/videographer at work (non-wedding context) |
| `entertainment-kids` | Live & Entertainment | Children's entertainment/games/activities at a family event |
| `decor-balloon` | Décor & Design | A general balloon décor installation (non-wedding, non-kids-specific) |
| `decor-floral` | Décor & Design | General floral décor/arrangement work at an event |
| `decor-stage-backdrop` | Décor & Design | A general event stage/backdrop design |
| `decor-lighting` | Décor & Design | General decorative event lighting design |
| `decor-theme` | Décor & Design | A cohesively themed event décor setup |
| `decor-venue-styling` | Décor & Design | General venue styling/table setting for an event |
| `cultural-diwali` | Special & Cultural | Diwali diyas/rangoli/festive home or office decoration |
| `cultural-navratri` | Special & Cultural | Navratri or Garba night celebration/decoration |
| `cultural-holi` | Special & Cultural | A Holi color festival celebration |
| `cultural-religious-general` | Special & Cultural | A general Indian cultural or religious celebration setup |
| `destination-corporate-retreat` | Destination | A corporate offsite/retreat at a scenic destination venue |
| `destination-celebration` | Destination | A celebration event at a destination/resort venue |
| *(reused, no sourcing needed)* `vertical-destination` | Destination | Already in the manifest from Phase 1 (Umaid Bhawan Palace) — reused deliberately for `destination-weddings`, since that item explicitly cross-references Weddings' own Destination cultural type rather than being distinct content |

**Manifest entry format** (add each as a new key in `src/assets/manifest.json`, alongside the existing Phase 1/2 entries):

```json
  "<imageId>": {
    "url": "<verified Wikimedia thumbnail URL>",
    "source": "Wikimedia Commons — <Artist name>, \"<File title>\"",
    "license": "<exact license, e.g. CC BY-SA 4.0>",
    "altText": "<specific description of what the image actually shows>",
    "status": "placeholder"
  }
```

- [ ] **Step 1: Source and verify all 37 new images per the table above, following the Phase 1/2 process exactly**
- [ ] **Step 2: Add all verified entries to `src/assets/manifest.json`**
- [ ] **Step 3: Run `npm test` to confirm the existing test suite still passes (this task doesn't add new tests itself — Task 2's tests will validate these ids resolve)**
- [ ] **Step 4: Commit**

```bash
git add src/assets/manifest.json
git commit -m "feat: source and add manifest images for the 7 remaining event verticals"
```

---

### Task 2: Vertical data files

**Files:**
- Create: `src/data/corporateEvents.js`, `socialCelebrations.js`, `kidsFamily.js`, `liveEntertainment.js`, `decorDesign.js`, `specialCultural.js`, `destinationEvents.js`
- Test: matching `.test.js` for each

**Interfaces:**
- Consumes: `getImage` (validation only), the manifest ids Task 1 added.
- Produces: 7 exported arrays, each entry `{ slug, label, imageId (string or null), depth: 'full' | 'light', teaser, description?, whatWeHandle?, href }`.

- [ ] **Step 1: Write the failing tests**

All 7 test files follow the same structure. `corporateEvents.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { corporateEvents } from './corporateEvents';
import { getImage } from './images';

describe('corporateEvents data', () => {
  it('has six entries with valid fields', () => {
    expect(corporateEvents).toHaveLength(6);
    corporateEvents.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/corporate-events/${item.slug}`);
      expect(['full', 'light']).toContain(item.depth);
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = corporateEvents.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly four full-depth entries', () => {
    expect(corporateEvents.filter((item) => item.depth === 'full')).toHaveLength(4);
  });
});
```

Write the other 6 test files in full, following the exact same structure, each with its own import, expected length, href prefix, and full-depth count:

`socialCelebrations.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { socialCelebrations } from './socialCelebrations';
import { getImage } from './images';

describe('socialCelebrations data', () => {
  it('has six entries with valid fields', () => {
    expect(socialCelebrations).toHaveLength(6);
    socialCelebrations.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/social-celebrations/${item.slug}`);
      expect(['full', 'light']).toContain(item.depth);
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = socialCelebrations.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one full-depth entry', () => {
    expect(socialCelebrations.filter((item) => item.depth === 'full')).toHaveLength(1);
  });
});
```

`kidsFamily.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { kidsFamily } from './kidsFamily';
import { getImage } from './images';

describe('kidsFamily data', () => {
  it('has seven entries with valid fields', () => {
    expect(kidsFamily).toHaveLength(7);
    kidsFamily.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/kids-family/${item.slug}`);
      expect(['full', 'light']).toContain(item.depth);
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = kidsFamily.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly four full-depth entries', () => {
    expect(kidsFamily.filter((item) => item.depth === 'full')).toHaveLength(4);
  });
});
```

`liveEntertainment.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { liveEntertainment } from './liveEntertainment';
import { getImage } from './images';

describe('liveEntertainment data', () => {
  it('has six entries with valid fields', () => {
    expect(liveEntertainment).toHaveLength(6);
    liveEntertainment.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/live-entertainment/${item.slug}`);
      expect(['full', 'light']).toContain(item.depth);
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = liveEntertainment.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly three full-depth entries', () => {
    expect(liveEntertainment.filter((item) => item.depth === 'full')).toHaveLength(3);
  });
});
```

`decorDesign.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { decorDesign } from './decorDesign';
import { getImage } from './images';

describe('decorDesign data', () => {
  it('has six entries with valid fields, all light-depth', () => {
    expect(decorDesign).toHaveLength(6);
    decorDesign.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/decor-design/${item.slug}`);
      expect(item.depth).toBe('light');
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = decorDesign.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

`specialCultural.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { specialCultural } from './specialCultural';
import { getImage } from './images';

describe('specialCultural data', () => {
  it('has four entries with valid fields', () => {
    expect(specialCultural).toHaveLength(4);
    specialCultural.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/special-cultural/${item.slug}`);
      expect(['full', 'light']).toContain(item.depth);
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = specialCultural.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one full-depth entry', () => {
    expect(specialCultural.filter((item) => item.depth === 'full')).toHaveLength(1);
  });
});
```

`destinationEvents.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { destinationEvents } from './destinationEvents';
import { getImage } from './images';

describe('destinationEvents data', () => {
  it('has three entries with valid fields, all light-depth', () => {
    expect(destinationEvents).toHaveLength(3);
    destinationEvents.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/destination-events/${item.slug}`);
      expect(item.depth).toBe('light');
      expect(() => getImage(item.imageId)).not.toThrow();
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = destinationEvents.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

(`decorDesign` and `destinationEvents` have zero full-depth entries, so their tests assert `depth` is `'light'` for every item directly rather than including a redundant "has exactly zero full-depth entries" case.)

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Write corporateEvents.js**

```js
export const corporateEvents = [
  {
    slug: 'product-launch',
    label: 'Product Launch',
    imageId: 'corporate-product-launch',
    depth: 'full',
    teaser: 'A branded stage and unveiling moment, produced with the same precision as a wedding entrance.',
    description: 'A product launch lives or dies on the reveal moment — staging, lighting and timing have to be exact. We coordinate the stage, branding elements and run-of-show so the reveal lands the way it\'s meant to.',
    whatWeHandle: [
      'Stage design and branded backdrop',
      'Lighting and reveal-moment staging',
      'Run-of-show coordination',
      'Vendor and AV coordination',
    ],
    href: '/events/corporate-events/product-launch',
  },
  {
    slug: 'conferences-seminars',
    label: 'Conferences & Seminars',
    imageId: 'corporate-conferences',
    depth: 'full',
    teaser: 'Conferences and seminars, planned around the agenda, not just the room booking.',
    description: 'A conference needs more than a hall — registration flow, session timing, AV and catering all have to work together for a full day (or several) without visible friction.',
    whatWeHandle: [
      'Venue and seating layout coordination',
      'AV and session timing coordination',
      'Registration and guest-flow planning',
      'Catering coordination for delegates',
    ],
    href: '/events/corporate-events/conferences-seminars',
  },
  {
    slug: 'annual-functions',
    label: 'Annual Functions',
    imageId: 'corporate-annual-function',
    depth: 'full',
    teaser: 'Annual functions and team celebrations, planned as a real event, not an office party.',
    description: 'An annual function is often the one event a whole company attends together — it deserves proper staging, entertainment and catering, planned with the same care as any other celebration.',
    whatWeHandle: [
      'Venue coordination for large guest counts',
      'Stage and entertainment coordination',
      'Catering and hospitality coordination',
      'Awards or recognition segment staging',
    ],
    href: '/events/corporate-events/annual-functions',
  },
  {
    slug: 'corporate-decor-branding',
    label: 'Corporate Décor & Branding',
    imageId: 'corporate-decor-branding',
    depth: 'full',
    teaser: 'Branded décor and signage that make the event feel like the company, not a rented hall.',
    description: 'Corporate décor is about consistent branding — logos, colours and signage carried through the entry, stage and seating, not generic event decoration with a banner added on.',
    whatWeHandle: [
      'Branded backdrop and signage design',
      'Entry and registration-area styling',
      'Stage branding integration',
      'Colour and material coordination with brand guidelines',
    ],
    href: '/events/corporate-events/corporate-decor-branding',
  },
  {
    slug: 'award-nights',
    label: 'Award Nights',
    imageId: 'corporate-award-night',
    depth: 'light',
    teaser: 'An award night stage and format, built for a room full of your own people.',
    href: '/events/corporate-events/award-nights',
  },
  {
    slug: 'stage-production',
    label: 'Stage & Production',
    imageId: 'corporate-stage-production',
    depth: 'light',
    teaser: 'Stage builds, sound and lighting production for corporate events of any size.',
    href: '/events/corporate-events/stage-production',
  },
];
```

- [ ] **Step 4: Write socialCelebrations.js**

```js
export const socialCelebrations = [
  {
    slug: 'anniversary-celebrations',
    label: 'Anniversary Celebrations',
    imageId: 'social-anniversary',
    depth: 'full',
    teaser: 'Anniversaries styled around the couple, from an intimate candlelight dinner to a full celebration.',
    description: 'An anniversary can be a quiet candlelight dinner or a full milestone celebration — we style it to the scale the couple actually wants, not a default package.',
    whatWeHandle: [
      'Venue and table styling for the scale of the celebration',
      'Candlelight or full-event lighting design',
      'Catering and hospitality coordination',
      'Photography coordination for the occasion',
    ],
    href: '/events/social-celebrations/anniversary-celebrations',
  },
  {
    slug: 'milestone-jubilees',
    label: 'Milestone Jubilees',
    imageId: 'social-milestone-jubilee',
    depth: 'light',
    teaser: 'Silver, golden and other milestone jubilees, celebrated properly.',
    href: '/events/social-celebrations/milestone-jubilees',
  },
  {
    slug: 'private-parties',
    label: 'Private Parties',
    imageId: 'social-private-party',
    depth: 'light',
    teaser: 'Private parties styled for the actual guest list, not a generic template.',
    href: '/events/social-celebrations/private-parties',
  },
  {
    slug: 'surprise-celebrations',
    label: 'Surprise Celebrations',
    imageId: 'social-surprise-celebration',
    depth: 'light',
    teaser: 'Surprise setups planned quietly and executed on time, every time.',
    href: '/events/social-celebrations/surprise-celebrations',
  },
  {
    slug: 'house-warming',
    label: 'House Warming',
    imageId: 'social-housewarming',
    depth: 'light',
    teaser: 'A Griha Pravesh or house-warming, styled to welcome guests into a new home.',
    href: '/events/social-celebrations/house-warming',
  },
  {
    slug: 'bachelor-bachelorette',
    label: 'Bachelor & Bachelorette Parties',
    imageId: 'social-bachelor-party',
    depth: 'light',
    teaser: 'A bachelor or bachelorette celebration, planned for the group actually attending.',
    href: '/events/social-celebrations/bachelor-bachelorette',
  },
];
```

- [ ] **Step 5: Write kidsFamily.js**

```js
export const kidsFamily = [
  {
    slug: 'kids-birthday-themes',
    label: 'Kids Birthday Themes',
    imageId: 'kids-birthday-theme',
    depth: 'full',
    teaser: 'Jungle, princess, superhero or frozen — a birthday theme built around what your child actually loves.',
    description: 'A themed birthday is only as good as its details — backdrop, props and colour palette all need to genuinely match the theme, not just gesture at it with a banner.',
    whatWeHandle: [
      'Theme-specific backdrop and prop styling',
      'Balloon and colour-palette coordination',
      'Cake table styling matched to the theme',
      'Photo corner setup',
    ],
    href: '/events/kids-family/kids-birthday-themes',
  },
  {
    slug: 'balloon-decor-kids',
    label: 'Balloon Décor for Kids',
    imageId: 'kids-balloon-decor',
    depth: 'full',
    teaser: 'Balloon arches, ceiling clouds and full-room balloon styling for any birthday.',
    description: "Balloon décor is often the single biggest visual impact at a kids' party — an arch, a ceiling installation or a full-room treatment, built in your chosen colours.",
    whatWeHandle: [
      'Balloon arch and backdrop installation',
      'Ceiling cloud or full-room balloon styling',
      'Colour-palette matching',
      'Setup and same-day takedown',
    ],
    href: '/events/kids-family/balloon-decor-kids',
  },
  {
    slug: 'milestone-birthdays',
    label: 'Milestone Birthdays',
    imageId: 'kids-milestone-birthday',
    depth: 'full',
    teaser: 'First birthdays and other milestones, styled with a little more polish than the rest.',
    description: 'A first birthday or another milestone birthday calls for a step up in styling — more considered florals, a proper photo backdrop and a cake table that photographs well.',
    whatWeHandle: [
      'Elevated floral and balloon styling',
      'Photo backdrop design',
      'Cake table styling',
      'Guest hospitality coordination',
    ],
    href: '/events/kids-family/milestone-birthdays',
  },
  {
    slug: 'baby-shower',
    label: 'Baby Shower',
    imageId: 'kids-baby-shower',
    depth: 'full',
    teaser: 'Baby showers styled in boho, floral or royal themes, however the family wants to celebrate.',
    description: "A baby shower is a smaller, more personal celebration — we style it around the family's chosen theme rather than a one-size-fits-all decoration set.",
    whatWeHandle: [
      'Theme-specific décor (boho, floral, royal and similar)',
      'Photo corner and backdrop styling',
      'Seating and gifting-table setup',
      'Light catering coordination',
    ],
    href: '/events/kids-family/baby-shower',
  },
  {
    slug: 'naming-ceremony',
    label: 'Naming Ceremony',
    imageId: 'kids-naming-ceremony',
    depth: 'light',
    teaser: 'Traditional or modern naming ceremony styling for your newborn.',
    href: '/events/kids-family/naming-ceremony',
  },
  {
    slug: 'welcome-home',
    label: 'Welcome Home Setup',
    imageId: 'kids-welcome-home',
    depth: 'light',
    teaser: 'A doorway and home welcome setup, ready for the day you bring your baby home.',
    href: '/events/kids-family/welcome-home',
  },
  {
    slug: 'annaprashan',
    label: 'Annaprashan',
    imageId: 'kids-annaprashan',
    depth: 'light',
    teaser: 'A traditional Annaprashan, styled with the right rituals in mind.',
    href: '/events/kids-family/annaprashan',
  },
];
```

- [ ] **Step 6: Write liveEntertainment.js**

```js
export const liveEntertainment = [
  {
    slug: 'special-effects',
    label: 'Special Effects',
    imageId: 'entertainment-sfx',
    depth: 'full',
    teaser: 'Cold pyro, fog and fireworks, coordinated safely around your venue and schedule.',
    description: 'Special effects need real coordination — venue rules, timing and safety all matter as much as the visual impact. We handle the coordination, not just the booking.',
    whatWeHandle: [
      'Cold pyro for indoor-friendly entries and stage moments',
      'Fog effects for stage and dance-floor moments',
      'Fireworks coordinated around venue rules and schedule',
      'On-site operator and safety coordination',
    ],
    href: '/events/live-entertainment/special-effects',
  },
  {
    slug: 'live-performers',
    label: 'Live Performers & Dancers',
    imageId: 'entertainment-performers',
    depth: 'full',
    teaser: 'Dancers and live performers, booked and briefed around your actual programme.',
    description: "A performance only lands if it's briefed against your real run-of-show — timing, stage size and audience all shape what actually works. We coordinate performers accordingly.",
    whatWeHandle: [
      'Dance and live performance booking',
      'Stage and sound coordination for the performance',
      'Run-of-show timing coordination',
      'Rehearsal and briefing coordination where needed',
    ],
    href: '/events/live-entertainment/live-performers',
  },
  {
    slug: 'anchors-hosts',
    label: 'Anchors & Hosts',
    imageId: 'entertainment-anchor',
    depth: 'full',
    teaser: 'A professional anchor to run the room, keep pace and keep guests engaged.',
    description: 'A good anchor manages pace as much as energy — knowing when to slow down for a ritual and when to build momentum for a performance. We brief anchors against your actual schedule.',
    whatWeHandle: [
      'Anchor and host booking',
      'Event-flow briefing and coordination',
      'Stage hosting for key moments',
      'Guest engagement segments',
    ],
    href: '/events/live-entertainment/anchors-hosts',
  },
  {
    slug: 'dj-sound',
    label: 'DJ & Sound',
    imageId: 'entertainment-dj',
    depth: 'light',
    teaser: 'DJ and sound systems, set up and run for your specific venue and crowd.',
    href: '/events/live-entertainment/dj-sound',
  },
  {
    slug: 'photography-videography',
    label: 'Photography & Videography',
    imageId: 'entertainment-photography',
    depth: 'light',
    teaser: 'Candid, traditional and drone coverage for any event, not just weddings.',
    href: '/events/live-entertainment/photography-videography',
  },
  {
    slug: 'kids-entertainment',
    label: 'Kids Entertainment',
    imageId: 'entertainment-kids',
    depth: 'light',
    teaser: 'Games and activities that actually keep kids engaged at a family event.',
    href: '/events/live-entertainment/kids-entertainment',
  },
];
```

- [ ] **Step 7: Write decorDesign.js**

```js
export const decorDesign = [
  {
    slug: 'balloon-decor-design',
    label: 'Balloon Décor & Installations',
    imageId: 'decor-balloon',
    depth: 'light',
    teaser: 'Balloon arches and installations for any event, styled to your colour palette.',
    href: '/events/decor-design/balloon-decor-design',
  },
  {
    slug: 'floral-decor-design',
    label: 'Floral Décor',
    imageId: 'decor-floral',
    depth: 'light',
    teaser: 'Fresh and styled floral work, sourced and arranged for the occasion.',
    href: '/events/decor-design/floral-decor-design',
  },
  {
    slug: 'stage-backdrop-design',
    label: 'Stage & Backdrop Design',
    imageId: 'decor-stage-backdrop',
    depth: 'light',
    teaser: 'Stage and backdrop design for any event, scaled to the room and the moment.',
    href: '/events/decor-design/stage-backdrop-design',
  },
  {
    slug: 'lighting-design-decor',
    label: 'Lighting Design',
    imageId: 'decor-lighting',
    depth: 'light',
    teaser: 'Ambient, accent and festive lighting design for every kind of celebration.',
    href: '/events/decor-design/lighting-design-decor',
  },
  {
    slug: 'theme-decor-design',
    label: 'Theme Décor',
    imageId: 'decor-theme',
    depth: 'light',
    teaser: 'A cohesive theme carried through every visual detail of the event.',
    href: '/events/decor-design/theme-decor-design',
  },
  {
    slug: 'venue-styling-decor',
    label: 'Venue Styling',
    imageId: 'decor-venue-styling',
    depth: 'light',
    teaser: "Full-venue styling, coordinated with your event's overall look.",
    href: '/events/decor-design/venue-styling-decor',
  },
];
```

- [ ] **Step 8: Write specialCultural.js**

```js
export const specialCultural = [
  {
    slug: 'diwali-celebrations',
    label: 'Diwali Celebrations',
    imageId: 'cultural-diwali',
    depth: 'full',
    teaser: 'Diyas, rangoli and a grand Diwali setup for home or office.',
    description: 'Diwali décor is about warmth and light — diyas, rangoli and festive styling done properly, whether it\'s a home celebration or an office-wide setup.',
    whatWeHandle: [
      'Diya and rangoli styling',
      'Festive lighting design',
      'Entry and venue décor',
      'Setup timed around the festival dates',
    ],
    href: '/events/special-cultural/diwali-celebrations',
  },
  {
    slug: 'navratri-garba',
    label: 'Navratri & Garba',
    imageId: 'cultural-navratri',
    depth: 'light',
    teaser: 'Navratri and Garba night styling, built for dancing and colour.',
    href: '/events/special-cultural/navratri-garba',
  },
  {
    slug: 'holi-celebrations',
    label: 'Holi Celebrations',
    imageId: 'cultural-holi',
    depth: 'light',
    teaser: 'Holi celebrations styled and coordinated, colour included.',
    href: '/events/special-cultural/holi-celebrations',
  },
  {
    slug: 'cultural-religious-events',
    label: 'Other Cultural & Religious Celebrations',
    imageId: 'cultural-religious-general',
    depth: 'light',
    teaser: 'Other cultural and religious celebrations, styled with the right traditions in mind.',
    href: '/events/special-cultural/cultural-religious-events',
  },
];
```

- [ ] **Step 9: Write destinationEvents.js**

```js
export const destinationEvents = [
  {
    slug: 'destination-weddings',
    label: 'Destination Weddings',
    imageId: 'vertical-destination',
    depth: 'light',
    teaser: 'The same wedding planning, delivered at a venue away from Ranchi — see our Weddings section for the full experience.',
    href: '/events/destination-events/destination-weddings',
  },
  {
    slug: 'destination-corporate',
    label: 'Destination Corporate Retreats',
    imageId: 'destination-corporate-retreat',
    depth: 'light',
    teaser: 'Corporate offsites and retreats, planned remotely and executed on site.',
    href: '/events/destination-events/destination-corporate',
  },
  {
    slug: 'destination-celebrations',
    label: 'Destination Celebrations',
    imageId: 'destination-celebration',
    depth: 'light',
    teaser: 'Milestone celebrations at a destination venue, coordinated end to end.',
    href: '/events/destination-events/destination-celebrations',
  },
];
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 11: Commit**

```bash
git add src/data/corporateEvents.js src/data/socialCelebrations.js src/data/kidsFamily.js src/data/liveEntertainment.js src/data/decorDesign.js src/data/specialCultural.js src/data/destinationEvents.js src/data/*.test.js
git commit -m "feat: add data files for the 7 remaining event verticals"
```

---

### Task 3: VerticalHub page

**Files:**
- Create: `src/pages/VerticalHub.jsx`
- Test: `src/pages/VerticalHub.test.jsx`

**Interfaces:**
- Consumes: the 7 data arrays (Task 2), `getImage` (Phase 1), `EventCard`/`EditorialGrid`/`SectionHeading`/`WhatsAppCTA` (Phase 1/2, unchanged).
- Produces: `VerticalHub` default export, reads `:slug` from `useParams()` (the vertical's own slug, e.g. `corporate-events`). Used at route `/events/:slug` (retargeted in Task 5).

- [ ] **Step 1: Write the failing tests**

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerticalHub from './VerticalHub';
import { corporateEvents } from '../data/corporateEvents';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:slug" element={<VerticalHub />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerticalHub', () => {
  it('renders the hero and a card for every item in the matched vertical', () => {
    const { container } = renderAt('/events/corporate-events');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const hrefs = Array.from(container.querySelectorAll('a[href^="/events/corporate-events/"]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toEqual(expect.arrayContaining(corporateEvents.map((item) => item.href)));
  });

  it('renders a working WhatsApp CTA containing the verified number', () => {
    renderAt('/events/corporate-events');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });

  it('shows a working not-found fallback for an unknown vertical slug', () => {
    renderAt('/events/not-a-real-vertical');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './VerticalHub'`

- [ ] **Step 3: Implement VerticalHub**

```jsx
import { useParams, Link } from 'react-router-dom';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import SectionHeading from '../components/SectionHeading';
import { corporateEvents } from '../data/corporateEvents';
import { socialCelebrations } from '../data/socialCelebrations';
import { kidsFamily } from '../data/kidsFamily';
import { liveEntertainment } from '../data/liveEntertainment';
import { decorDesign } from '../data/decorDesign';
import { specialCultural } from '../data/specialCultural';
import { destinationEvents } from '../data/destinationEvents';

const VERTICALS = {
  'corporate-events': {
    label: 'Corporate Events',
    heroImageId: 'vertical-corporate',
    tagline: 'Conferences, launches and annual functions, produced with the same precision as a wedding.',
    data: corporateEvents,
  },
  'social-celebrations': {
    label: 'Social Celebrations',
    heroImageId: 'vertical-social',
    tagline: 'Anniversaries, engagements and private parties, styled for the people actually in the room.',
    data: socialCelebrations,
  },
  'kids-family': {
    label: 'Kids & Family',
    heroImageId: 'vertical-kids-family',
    tagline: 'Birthdays, baby showers and Annaprashan — themed properly, not generically.',
    data: kidsFamily,
  },
  'live-entertainment': {
    label: 'Live & Entertainment',
    heroImageId: 'vertical-entertainment',
    tagline: 'Dhol, DJs, anchors and performers, booked and briefed as part of your actual event plan.',
    data: liveEntertainment,
  },
  'decor-design': {
    label: 'Décor & Design',
    heroImageId: 'vertical-decor',
    tagline: 'Mandap, stage, floral and lighting design, built specifically for your venue and colours.',
    data: decorDesign,
  },
  'special-cultural': {
    label: 'Special & Cultural',
    heroImageId: 'vertical-cultural',
    tagline: 'Diwali, Navratri, Holi and other cultural celebrations, styled with the right traditions.',
    data: specialCultural,
  },
  'destination-events': {
    label: 'Destination Events',
    heroImageId: 'vertical-destination',
    tagline: 'Outstation and destination celebrations, planned remotely and executed on-site.',
    data: destinationEvents,
  },
};

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-charcoal">We couldn't find that event type</h1>
      <p className="mt-4 text-charcoal/70">Let's find the right celebration for you instead.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function VerticalHub() {
  const { slug } = useParams();
  const vertical = VERTICALS[slug];

  if (!vertical) {
    return <NotFound />;
  }

  const heroImage = getImage(vertical.heroImageId);

  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[460px] items-end overflow-hidden bg-charcoal">
        <img
          src={heroImage.url}
          alt={heroImage.altText}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Next Level Events</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">{vertical.label}</h1>
          <p className="mt-6 max-w-xl text-ivory/80">{vertical.tagline}</p>
          <WhatsAppCTA
            message={`Hi, I'm interested in planning ${vertical.label.toLowerCase()} with Next Level Events.`}
            className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
          >
            Enquire on WhatsApp
          </WhatsAppCTA>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="What we plan"
          title={`Every ${vertical.label} experience, one team.`}
          description="Explore by experience to see what we handle and what's included."
        />
        <div className="mt-10">
          <EditorialGrid columns={4}>
            {vertical.data.map((item) => (
              <EventCard key={item.slug} event={item} />
            ))}
          </EditorialGrid>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/VerticalHub.jsx src/pages/VerticalHub.test.jsx
git commit -m "feat: add VerticalHub page for the 7 remaining event verticals"
```

---

### Task 4: VerticalExperienceDetail page

**Files:**
- Create: `src/pages/VerticalExperienceDetail.jsx`
- Test: `src/pages/VerticalExperienceDetail.test.jsx`

**Interfaces:**
- Consumes: the 7 data arrays (Task 2), `getImage`, `WhatsAppCTA`, `EventCard`, `EditorialGrid`, `Breadcrumb` (all unchanged).
- Produces: `VerticalExperienceDetail` default export, reads `:vertical` and `:slug` from `useParams()`. Used at route `/events/:vertical/:slug`.

This component is structurally identical to Phase 2's `ExperienceDetail.jsx` (same breadcrumb/hero/gallery/related/CTA pattern, same rotated-gallery helper), parameterized over verticals instead of wedding layers. **Do not modify `ExperienceDetail.jsx`** — this is a separate file.

- [ ] **Step 1: Write the failing tests**

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerticalExperienceDetail from './VerticalExperienceDetail';
import { corporateEvents } from '../data/corporateEvents';
import { decorDesign } from '../data/decorDesign';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
        <Route path="*" element={<VerticalExperienceDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerticalExperienceDetail', () => {
  it('renders a full-depth item with breadcrumb, description, what-we-handle and a gallery', () => {
    renderAt('/events/corporate-events/product-launch');
    const item = corporateEvents.find((i) => i.slug === 'product-launch');
    expect(screen.getByRole('heading', { name: 'Product Launch' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    item.whatWeHandle.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
    const gallery = screen.getByTestId('gallery');
    expect(within(gallery).getAllByRole('img').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a light-depth item with just hero, teaser and no what-we-handle/gallery block', () => {
    renderAt('/events/decor-design/balloon-decor-design');
    const item = decorDesign.find((i) => i.slug === 'balloon-decor-design');
    expect(screen.getByRole('heading', { name: 'Balloon Décor & Installations' })).toBeInTheDocument();
    expect(screen.getByText(item.teaser)).toBeInTheDocument();
    expect(screen.queryByText('What we handle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery')).not.toBeInTheDocument();
  });

  it('renders a contextual WhatsApp CTA including the item label', () => {
    renderAt('/events/kids-family/baby-shower');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    const href = cta.getAttribute('href');
    expect(href).toContain('917903133317');
    expect(decodeURIComponent(href)).toContain('Baby Shower');
  });

  it('renders related experiences from the same vertical, excluding itself', () => {
    renderAt('/events/corporate-events/product-launch');
    const others = corporateEvents.filter((i) => i.slug !== 'product-launch').slice(0, 3);
    others.forEach((item) => {
      expect(
        screen.getByRole('link', { name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })
      ).toBeInTheDocument();
    });
  });

  it('shows a working not-found fallback for an invalid vertical', () => {
    renderAt('/events/not-a-real-vertical/anything');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('shows a working not-found fallback for a valid vertical but unknown slug', () => {
    renderAt('/events/corporate-events/not-a-real-slug');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './VerticalExperienceDetail'`

- [ ] **Step 3: Implement VerticalExperienceDetail**

```jsx
import { useParams, Link } from 'react-router-dom';
import { corporateEvents } from '../data/corporateEvents';
import { socialCelebrations } from '../data/socialCelebrations';
import { kidsFamily } from '../data/kidsFamily';
import { liveEntertainment } from '../data/liveEntertainment';
import { decorDesign } from '../data/decorDesign';
import { specialCultural } from '../data/specialCultural';
import { destinationEvents } from '../data/destinationEvents';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import Breadcrumb from '../components/Breadcrumb';

const VERTICALS = {
  'corporate-events': {
    label: 'Corporate Events',
    data: corporateEvents,
    message: (item) => `Hi, I'm interested in ${item.label} for my corporate event in Ranchi.`,
  },
  'social-celebrations': {
    label: 'Social Celebrations',
    data: socialCelebrations,
    message: (item) => `Hi, I'm interested in ${item.label} for my celebration in Ranchi.`,
  },
  'kids-family': {
    label: 'Kids & Family',
    data: kidsFamily,
    message: (item) => `Hi, I'm interested in ${item.label} for my family event in Ranchi.`,
  },
  'live-entertainment': {
    label: 'Live & Entertainment',
    data: liveEntertainment,
    message: (item) => `Hi, I'd like to book ${item.label} for my event in Ranchi.`,
  },
  'decor-design': {
    label: 'Décor & Design',
    data: decorDesign,
    message: (item) => `Hi, I'd like to discuss ${item.label} for my event in Ranchi.`,
  },
  'special-cultural': {
    label: 'Special & Cultural',
    data: specialCultural,
    message: (item) => `Hi, I'd like to plan ${item.label} in Ranchi.`,
  },
  'destination-events': {
    label: 'Destination Events',
    data: destinationEvents,
    message: (item) => `Hi, I'd like to talk about ${item.label} for my event.`,
  },
};

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-charcoal">We couldn't find that experience</h1>
      <p className="mt-4 text-charcoal/70">Let's find the right celebration for you instead.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function VerticalExperienceDetail() {
  const { vertical, slug } = useParams();
  const verticalConfig = VERTICALS[vertical];
  const item = verticalConfig?.data.find((entry) => entry.slug === slug);

  if (!verticalConfig || !item) {
    return <NotFound />;
  }

  const image = item.imageId ? getImage(item.imageId) : null;
  const others = verticalConfig.data.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  function pickRotated(list, offset, count) {
    if (list.length === 0) return [];
    return Array.from({ length: Math.min(count, list.length) }, (_, i) => list[(offset + i) % list.length]);
  }

  const allWithImage = verticalConfig.data.filter((entry) => entry.imageId);
  const siblingsWithImage = allWithImage.filter((entry) => entry.slug !== item.slug);
  const myIndex = allWithImage.findIndex((entry) => entry.slug === item.slug);
  const rotatedSiblings = pickRotated(siblingsWithImage, myIndex, 2);
  const galleryEntries = item.depth === 'full'
    ? [
        ...(item.imageId ? [{ slug: item.slug, image }] : []),
        ...rotatedSiblings.map((entry) => ({ slug: entry.slug, image: getImage(entry.imageId) })),
      ]
    : [];

  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: verticalConfig.label, href: `/events/${vertical}` },
            { label: item.label },
          ]}
        />
      </div>
      <div data-testid="hero" className="relative mt-6 h-[50vh] min-h-[360px] w-full overflow-hidden">
        {image ? (
          <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal">
            <span className="font-display text-4xl text-ivory">{item.label}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-10 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{verticalConfig.label}</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{item.label}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg text-charcoal/80">{item.teaser}</p>
        {item.depth === 'full' && (
          <>
            <p className="mt-6 text-charcoal/70">{item.description}</p>
            <div className="mt-10">
              <p className="text-sm uppercase tracking-widest text-charcoal/50">What we handle</p>
              <ul className="mt-4 space-y-2">
                {item.whatWeHandle.map((line) => (
                  <li key={line} className="text-charcoal/80">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            {galleryEntries.length > 0 && (
              <>
                <p className="mt-10 text-sm uppercase tracking-widest text-charcoal/50">
                  More from {verticalConfig.label}
                </p>
                <div data-testid="gallery" className="mt-4 grid grid-cols-2 gap-4">
                  {galleryEntries.map(({ slug, image: galleryImage }) => (
                    <img
                      key={slug}
                      src={galleryImage.url}
                      alt={galleryImage.altText}
                      loading="lazy"
                      className="aspect-square w-full rounded object-cover"
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        <WhatsAppCTA
          message={verticalConfig.message(item)}
          className="mt-10 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
        <div className="mt-16">
          <p className="text-sm uppercase tracking-widest text-charcoal/50">Related experiences</p>
          <div className="mt-6">
            <EditorialGrid columns={3}>
              {others.map((other) => (
                <EventCard key={other.slug} event={other} />
              ))}
            </EditorialGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Note: the `myIndex`/`siblingsWithImage` rotation logic here is written using the collision-resistant form Phase 2's final review already fixed (`myIndex` computed from `allWithImage`, the same filtered list `siblingsWithImage` is derived from) — carry that form over directly rather than the earlier, buggy version.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/VerticalExperienceDetail.jsx src/pages/VerticalExperienceDetail.test.jsx
git commit -m "feat: add generic VerticalExperienceDetail page for the 7 remaining verticals"
```

---

### Task 5: Route retargeting and regression guard

**Files:**
- Modify: `src/AppRoutes.jsx`
- Modify: `src/AppRoutes.test.jsx` (add new cases; keep existing ones)

**Interfaces:**
- Consumes: `VerticalHub` (Task 3), `VerticalExperienceDetail` (Task 4).
- Produces: `/events/:slug` now renders `VerticalHub` instead of `EventCategoryStub`; new route `/events/:vertical/:slug` renders `VerticalExperienceDetail`. Weddings' routes (`/events/weddings`, `/events/weddings/:layer/:slug`) and the `*` catch-all (`EventCategoryStub`) are untouched.

- [ ] **Step 1: Write the failing tests**

Add these cases to `src/AppRoutes.test.jsx` (keep every existing case, including the Weddings ones and the original `/events/:slug` case — update that one specific case, since its target component is intentionally changing):

Find the existing test that renders `/events/corporate-events` and asserts `EventCategoryStub`'s heading — replace its assertion to expect `VerticalHub`'s richer output instead (a heading plus at least one card), since this is the intentional, spec'd change for this task:

```jsx
it('routes /events/corporate-events to VerticalHub with a real experience grid', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/events/corporate-events']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
  expect(container.querySelector('a[href^="/events/corporate-events/"]')).toBeInTheDocument();
});
```

Add:

```jsx
it('routes /events/:vertical/:slug to VerticalExperienceDetail', () => {
  render(
    <MemoryRouter initialEntries={['/events/kids-family/baby-shower']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Baby Shower' })).toBeInTheDocument();
});

it('still routes Weddings exactly as Phase 2 shipped it, unaffected by the vertical retarget', () => {
  render(
    <MemoryRouter initialEntries={['/events/weddings']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })
  ).toBeInTheDocument();
});

it('still routes a Weddings sub-experience exactly as Phase 2 shipped it', () => {
  render(
    <MemoryRouter initialEntries={['/events/weddings/cultural/punjabi']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Punjabi' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify the new/changed ones fail**

Run: `npm test`
Expected: FAIL on the retargeted `/events/corporate-events` case and the new `/events/:vertical/:slug` case (routes don't exist yet); the two Weddings cases already pass (proving they were never at risk).

- [ ] **Step 3: Retarget and add the routes**

Replace `src/AppRoutes.jsx` in full:

```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';
import WeddingsHub from './pages/WeddingsHub';
import ExperienceDetail from './pages/ExperienceDetail';
import VerticalHub from './pages/VerticalHub';
import VerticalExperienceDetail from './pages/VerticalExperienceDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/weddings" element={<WeddingsHub />} />
      <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
      <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
      <Route path="/events/:slug" element={<VerticalHub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all AppRoutes cases, plus every test from Tasks 1–4 and every pre-existing Phase 1/2 test, unaffected.

- [ ] **Step 5: Commit**

```bash
git add src/AppRoutes.jsx src/AppRoutes.test.jsx
git commit -m "feat: retarget /events/:slug to VerticalHub and add /events/:vertical/:slug routing"
```

---

### Task 6: Cross-phase QA gate for the remaining verticals

**Files:**
- Modify: any file touched below where an issue is found
- No new automated tests — manual verification pass, matching Phases 1–2's Task 13/7 pattern

**Interfaces:** none — verification only.

- [ ] **Step 1: Run the full automated suite and production build**

Run: `npm test` — expect every test from Tasks 1–5 green, plus all Phase 1/2 tests unaffected.
Run: `npm run build` — expect a clean build.

- [ ] **Step 2: Crawl every new route and interactive element**

Visit (via source-tracing, or a running dev server if available) each of the 7 vertical hub pages and confirm every card links to a real, resolvable destination; visit at least one full-depth item per full-depth vertical (Corporate, Kids & Family, Live & Entertainment, Special & Cultural) and confirm breadcrumb/description/what-we-handle/gallery/related/CTA all work; visit at least one light-depth item and confirm no description/what-we-handle/gallery renders; visit two invalid routes (`/events/not-a-real-vertical` and `/events/corporate-events/not-a-real-slug`) and confirm both show working fallbacks; re-check Weddings (`/events/weddings` and one sub-experience) to confirm Phase 2 is completely unaffected.

- [ ] **Step 3: Fabricated-content and image-manifest cross-check**

Grep the 7 new data files and the 2 new page components for any rating/review/statistic/client-name/specific-project pattern — expect none. Cross-check every non-null `imageId` referenced across the 7 data files has a corresponding `src/assets/manifest.json` entry (38 slots, 37 new ids + 1 reused Phase 1 id).

- [ ] **Step 4: Responsive check**

If a browser tool is available, check one vertical hub page and one experience-detail page at Phase 1's 8 widths. If not, state that plainly and instead review the Tailwind classes on `VerticalHub`'s grid and `VerticalExperienceDetail`'s hero/gallery for structural soundness against the same classes Phases 1–2 already validated at those widths (both new components reuse the exact same class patterns as `WeddingsHub`/`ExperienceDetail`, which were already checked).

- [ ] **Step 5: Fix anything found and commit**

If any step surfaced a real issue, fix it and commit exactly the files changed. If nothing needed fixing, no commit is required — the automated suite and build from Step 1 are the record.

## Self-Review Notes

- **Spec coverage:** all 7 verticals, all 38 items, the full/light depth split (13/25), and the cross-event Catering & Hospitality placement (inside relevant full-depth `whatWeHandle` lists — Corporate's Conferences/Annual Functions, Social's Anniversary, Kids & Family's Milestone Birthdays/Baby Shower) all have a concrete task.
- **No Phase 1/2 file redesigned:** only `AppRoutes.jsx` is modified (retargeting one route, adding one route), matching Phase 1's own spec's stated intent for `EventCategoryStub`'s eventual replacement. `ExperienceDetail.jsx` and `WeddingsHub.jsx` are untouched; Task 5's regression tests prove it.
- **Type consistency:** the `{slug, label, imageId, depth, teaser, description?, whatWeHandle?, href}` shape and the `getImage`/`WhatsAppCTA`/`EventCard`/`EditorialGrid`/`Breadcrumb` interfaces are used identically to how Phase 2 defined them — no drift.
- **Image sourcing is deliberately deferred to Task 1's execution**, not pre-baked into this plan, per the explicit instruction to produce spec and plan only in this pass — Task 1's table gives exact, unambiguous search guidance per image so execution can proceed without further design decisions.
