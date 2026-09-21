# Real Events + Social/Content System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single, honest `/real-events` content hub showing Next Level Events' verified real video and planning-process content, and wire it into the existing homepage teasers and navigation — without touching any Phase 1–3 vertical, Weddings file, or shared component's existing behavior.

**Architecture:** Two new small data files (`socialContent.js`, `behindTheEvent.js`), one new reusable click-to-load video component, one new page assembling them plus a tiny new `usePageMeta` hook, and additive edits to `AppRoutes.jsx`, `nav.js`, and `homeTeasers.js` (3 of its 7 entries).

**Tech Stack:** React 19 + Vite + Tailwind CSS v3 + react-router-dom v7, JavaScript only, Vitest + @testing-library/react (using `fireEvent`, not `@testing-library/user-event`, which is not installed).

**Spec:** `docs/superpowers/specs/2026-09-21-real-events-content-design.md`

## Global Constraints

- No fabricated content: no invented client names, event names, dates, venues, guest counts, reviews, ratings, statistics, event results, or "featured client" claims anywhere in this phase's data or copy.
- No invented captions for the 5 YouTube Shorts — use only the honest, hashtag-derived generic labels from the spec (`Event Highlight Reel`, `Wedding Décor Reel`, `Birthday Décor Reel`).
- The only Phase 1–3 files this plan modifies are `src/AppRoutes.jsx` (one new route added), `src/data/nav.js` (one new entry added), and `src/data/homeTeasers.js` (3 of 7 entries edited, 4 untouched) — every other existing file is untouched.
- Do not create Before/After or Event Inspiration routes or content this phase — their data shapes are documented in the spec only, not implemented as files.
- WhatsApp CTA must use the real verified number, via the existing unchanged `WhatsAppCTA` component (which already reads `WHATSAPP_NUMBER` from `src/data/contact.js` — do not hardcode a number anywhere).
- No new npm dependencies.
- Click-to-load video embeds: no `<iframe>` exists in the DOM and no autoplay occurs until the user explicitly clicks play.
- Full regression: every Phase 1–3 test must still pass unmodified, except one line in `Home.test.jsx`'s hardcoded heading-order array that this plan's Task 5 explicitly updates to match the one teaser title that changes. `homeTeasers.test.js` itself is not edited at all — its existing generic shape/uniqueness checks (not a hardcoded order) pass against the new copy unmodified.

---

### Task 1: Social content and Behind-the-Event data files

**Files:**
- Create: `src/data/socialContent.js`
- Create: `src/data/socialContent.test.js`
- Create: `src/data/behindTheEvent.js`
- Create: `src/data/behindTheEvent.test.js`

**Interfaces:**
- Consumes: nothing new.
- Produces: `socialContent` (array of `{id, platform, type, videoId, label, verificationStatus, sourceUrl}`), `behindTheEventCategories` (array of `{id, label, description}`) — both consumed by Task 3's `RealEventsHub`.

- [ ] **Step 1: Write the failing tests**

`src/data/socialContent.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { socialContent } from './socialContent';

describe('socialContent', () => {
  it('has exactly 5 verified video entries', () => {
    expect(socialContent).toHaveLength(5);
  });

  it('each entry has a valid shape and verified-video status', () => {
    socialContent.forEach((item) => {
      expect(item.platform).toBe('youtube');
      expect(item.type).toBe('video');
      expect(typeof item.videoId).toBe('string');
      expect(item.videoId.length).toBeGreaterThan(0);
      expect(typeof item.label).toBe('string');
      expect(item.verificationStatus).toBe('verified-video');
      expect(item.sourceUrl).toBe(`https://www.youtube.com/shorts/${item.videoId}`);
      expect(item.id).toBe(`yt-${item.videoId}`);
    });
  });

  it('references exactly the 5 verified real video ids, and no others', () => {
    const ids = socialContent.map((item) => item.videoId).sort();
    expect(ids).toEqual(
      ['8Ll1q_CRLRA', 'BLlOtkPXf9E', 'H7EhkKuHGWU', 'a-siuy_wkx0', 'z-PeklpQUdI'].sort()
    );
  });
});
```

`src/data/behindTheEvent.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { behindTheEventCategories } from './behindTheEvent';

describe('behindTheEventCategories', () => {
  it('has exactly the 3 verified Instagram Highlight categories, in order', () => {
    const labels = behindTheEventCategories.map((category) => category.label);
    expect(labels).toEqual(['Site Recce', 'Meeting', 'Special Entry']);
  });

  it('each category has a non-empty id and description', () => {
    behindTheEventCategories.forEach((category) => {
      expect(typeof category.id).toBe('string');
      expect(category.id.length).toBeGreaterThan(0);
      expect(typeof category.description).toBe('string');
      expect(category.description.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/data/socialContent.test.js src/data/behindTheEvent.test.js`
Expected: FAIL — `Cannot find module './socialContent'` / `Cannot find module './behindTheEvent'`

- [ ] **Step 3: Write the data files**

`src/data/socialContent.js`:
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

`src/data/behindTheEvent.js`:
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

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/data/socialContent.test.js src/data/behindTheEvent.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/socialContent.js src/data/socialContent.test.js src/data/behindTheEvent.js src/data/behindTheEvent.test.js
git commit -m "feat: add verified social content and behind-the-event data files"
```

---

### Task 2: VideoEmbed component (click-to-load YouTube embed)

**Files:**
- Create: `src/components/realEvents/VideoEmbed.jsx`
- Create: `src/components/realEvents/VideoEmbed.test.jsx`

**Interfaces:**
- Consumes: nothing from Task 1 directly (takes `videoId`/`label` as props).
- Produces: `VideoEmbed` default export, props `{videoId: string, label: string}`. Consumed by Task 3's `RealEventsHub`.

- [ ] **Step 1: Write the failing tests**

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoEmbed from './VideoEmbed';

describe('VideoEmbed', () => {
  it('renders a real thumbnail and a play button, with no iframe, before being clicked', () => {
    render(<VideoEmbed videoId="a-siuy_wkx0" label="Event Highlight Reel" />);
    expect(screen.getByRole('img', { name: 'Event Highlight Reel' })).toHaveAttribute(
      'src',
      'https://i.ytimg.com/vi/a-siuy_wkx0/hqdefault.jpg'
    );
    expect(screen.getByRole('button', { name: 'Play Event Highlight Reel' })).toBeInTheDocument();
    expect(document.querySelector('iframe')).not.toBeInTheDocument();
  });

  it('mounts a real iframe with the correct video and title only after the play button is clicked', () => {
    render(<VideoEmbed videoId="H7EhkKuHGWU" label="Wedding Décor Reel" />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Wedding Décor Reel' }));
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/H7EhkKuHGWU?autoplay=1');
    expect(iframe).toHaveAttribute('title', 'Wedding Décor Reel');
    expect(screen.queryByRole('button', { name: /Play/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/realEvents/VideoEmbed.test.jsx`
Expected: FAIL — `Cannot find module './VideoEmbed'`

- [ ] **Step 3: Implement VideoEmbed**

```jsx
import { useState } from 'react';

export default function VideoEmbed({ videoId, label }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isLoaded) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded bg-charcoal">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={label}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      aria-label={`Play ${label}`}
      className="group relative aspect-video w-full overflow-hidden rounded bg-charcoal"
    >
      <img
        src={thumbnailUrl}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 px-3 py-2 text-left text-sm text-ivory">
        {label}
      </span>
    </button>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/realEvents/VideoEmbed.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/realEvents/VideoEmbed.jsx src/components/realEvents/VideoEmbed.test.jsx
git commit -m "feat: add click-to-load VideoEmbed component for real YouTube content"
```

---

### Task 3: usePageMeta hook and RealEventsHub page

**Files:**
- Create: `src/hooks/usePageMeta.js`
- Create: `src/hooks/usePageMeta.test.jsx`
- Create: `src/pages/RealEventsHub.jsx`
- Create: `src/pages/RealEventsHub.test.jsx`

**Interfaces:**
- Consumes: `socialContent` and `behindTheEventCategories` (Task 1), `VideoEmbed` (Task 2), `getImage` (existing, unchanged), `SectionHeading`/`WhatsAppCTA` (existing, unchanged), `SOCIALS` (existing, unchanged).
- Produces: `RealEventsHub` default export, rendered at route `/real-events` (wired in Task 4). `usePageMeta({title, description})` hook, reusable by future pages but only used here this phase.

- [ ] **Step 1: Write the failing tests**

`src/hooks/usePageMeta.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { usePageMeta } from './usePageMeta';

function TestComponent({ title, description }) {
  usePageMeta({ title, description });
  return null;
}

describe('usePageMeta', () => {
  it('sets document.title and a meta description tag', () => {
    render(<TestComponent title="Real Events — Next Level Events" description="See real work." />);
    expect(document.title).toBe('Real Events — Next Level Events');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'See real work.'
    );
  });
});
```

`src/pages/RealEventsHub.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import RealEventsHub from './RealEventsHub';
import { socialContent } from '../data/socialContent';
import { behindTheEventCategories } from '../data/behindTheEvent';
import { SOCIALS } from '../data/contact';

describe('RealEventsHub', () => {
  it('sets a real page title and renders the hero heading', () => {
    render(<RealEventsHub />);
    expect(document.title).toBe('Real Events — Next Level Events');
    expect(screen.getByRole('heading', { name: 'Real work, as it happens.' })).toBeInTheDocument();
  });

  it('renders all 5 real videos as click-to-load embeds', () => {
    render(<RealEventsHub />);
    socialContent.forEach((item) => {
      expect(screen.getAllByRole('button', { name: `Play ${item.label}` }).length).toBeGreaterThan(0);
    });
  });

  it('renders all 3 verified Behind the Event categories linking to Instagram', () => {
    render(<RealEventsHub />);
    const section = document.getElementById('behind-the-event');
    behindTheEventCategories.forEach((category) => {
      const link = within(section).getByRole('link', { name: new RegExp(category.label) });
      expect(link).toHaveAttribute('href', SOCIALS.instagram);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders a follow-CTA row linking to Instagram, YouTube and Facebook', () => {
    render(<RealEventsHub />);
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SOCIALS.instagram);
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', SOCIALS.youtube);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', SOCIALS.facebook);
  });

  it('renders an honest coming-soon note and a working WhatsApp CTA', () => {
    render(<RealEventsHub />);
    expect(screen.getByText(/more real events are coming/i)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    expect(decodeURIComponent(cta.getAttribute('href'))).toContain('917903133317');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/hooks/usePageMeta.test.jsx src/pages/RealEventsHub.test.jsx`
Expected: FAIL — `Cannot find module './usePageMeta'` / `Cannot find module './RealEventsHub'`

- [ ] **Step 3: Implement usePageMeta and RealEventsHub**

`src/hooks/usePageMeta.js`:
```js
import { useEffect } from 'react';

export function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const previousDescription = meta.getAttribute('content');
    meta.setAttribute('content', description);

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
```

`src/pages/RealEventsHub.jsx`:
```jsx
import SectionHeading from '../components/SectionHeading';
import WhatsAppCTA from '../components/WhatsAppCTA';
import VideoEmbed from '../components/realEvents/VideoEmbed';
import { usePageMeta } from '../hooks/usePageMeta';
import { getImage } from '../data/images';
import { socialContent } from '../data/socialContent';
import { behindTheEventCategories } from '../data/behindTheEvent';
import { SOCIALS } from '../data/contact';

export default function RealEventsHub() {
  usePageMeta({
    title: 'Real Events — Next Level Events',
    description:
      'Real videos and a real look at the planning behind Next Level Events celebrations in Ranchi — verified work only, no fabricated reviews.',
  });

  const hero = getImage('vertical-social');

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img src={hero.url} alt={hero.altText} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-10 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Real events, real moments</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Real work, as it happens.</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading
          eyebrow="On video"
          title="Real videos from real celebrations."
          description="Straight from our own YouTube channel — click any video to play it."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {socialContent.map((item) => (
            <VideoEmbed key={item.id} videoId={item.videoId} label={item.label} />
          ))}
        </div>
      </div>

      <div id="behind-the-event" className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading
          eyebrow="Behind the event"
          title="The planning you don't see on the day."
          description="Real categories from our own Instagram — see the moments themselves there."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {behindTheEventCategories.map((category) => (
            <a
              key={category.id}
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between bg-charcoal p-6 text-ivory"
            >
              <div>
                <p className="font-display text-2xl">{category.label}</p>
                <p className="mt-3 text-sm text-ivory/70">{category.description}</p>
              </div>
              <span className="mt-6 text-sm uppercase tracking-widest text-gold">
                See {category.label} on Instagram
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <SectionHeading
          eyebrow="Follow the real work"
          title="More from us on Instagram, YouTube and Facebook."
          align="center"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-widest text-gold">
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
        <p className="mt-10 text-charcoal/60">
          More real events are coming to this page as verified work is added.
        </p>
        <WhatsAppCTA
          message="Hi, I saw your Real Events page and would like to know more."
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
      </div>
    </div>
  );
}
```

Note: each Behind the Event card's accessible link name is `"{category.label} See {category.label} on Instagram"` (the label appears once as a heading and once inside the link's own text) — the test's `new RegExp(category.label)` matches on this combined accessible name, which is why the link's own visible text repeats the label rather than a bare "See it on Instagram" that wouldn't let three otherwise-identical links be distinguished by name in a single `getByRole` query.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/hooks/usePageMeta.test.jsx src/pages/RealEventsHub.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePageMeta.js src/hooks/usePageMeta.test.jsx src/pages/RealEventsHub.jsx src/pages/RealEventsHub.test.jsx
git commit -m "feat: add RealEventsHub page and usePageMeta hook"
```

---

### Task 4: Route and navigation wiring

**Files:**
- Modify: `src/AppRoutes.jsx`
- Modify: `src/AppRoutes.test.jsx` (add a case, keep every existing case)
- Modify: `src/data/nav.js`
- Modify: `src/data/nav.test.js` (add an assertion, keep every existing assertion)

**Interfaces:**
- Consumes: `RealEventsHub` (Task 3).
- Produces: `/real-events` route; a new "Real Events" nav entry rendered automatically by the existing, unmodified `MegaMenu`/`MobileDrawer` plain-link branch (verified against their current source: an item with `href` and no `columns` already renders as a direct `<Link>` in both).

- [ ] **Step 1: Write the failing tests**

Add to `src/AppRoutes.test.jsx`:
```jsx
it('routes /real-events to RealEventsHub', () => {
  render(
    <MemoryRouter initialEntries={['/real-events']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Real work, as it happens.' })).toBeInTheDocument();
});
```

Add to `src/data/nav.test.js`:
```js
it('includes a Real Events link pointing at the new hub', () => {
  expect(nav.find((item) => item.label === 'Real Events').href).toBe('/real-events');
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npx vitest run src/AppRoutes.test.jsx src/data/nav.test.js`
Expected: FAIL on both new cases (route/nav entry don't exist yet); every pre-existing case in both files still passes.

- [ ] **Step 3: Wire the route and nav entry**

Replace `src/AppRoutes.jsx` in full:
```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';
import WeddingsHub from './pages/WeddingsHub';
import ExperienceDetail from './pages/ExperienceDetail';
import VerticalHub from './pages/VerticalHub';
import VerticalExperienceDetail from './pages/VerticalExperienceDetail';
import RealEventsHub from './pages/RealEventsHub';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/real-events" element={<RealEventsHub />} />
      <Route path="/events/weddings" element={<WeddingsHub />} />
      <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
      <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
      <Route path="/events/:slug" element={<VerticalHub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
```

Edit `src/data/nav.js` — add one entry between `Events` and `Contact`:
```js
import { events } from './events';

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Events',
    columns: [
      {
        heading: 'Explore by Occasion',
        links: events.map((event) => ({ label: event.label, href: event.href })),
      },
    ],
  },
  { label: 'Real Events', href: '/real-events' },
  { label: 'Contact', href: '/#contact' },
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run`
Expected: PASS — every test from Tasks 1–3, every pre-existing Phase 1–3 test (including both Weddings-guard `AppRoutes` cases and both `nav.test.js` cases), plus the 2 new cases added here.

- [ ] **Step 5: Commit**

```bash
git add src/AppRoutes.jsx src/AppRoutes.test.jsx src/data/nav.js src/data/nav.test.js
git commit -m "feat: wire /real-events route and add Real Events nav entry"
```

---

### Task 5: Homepage teaser rewiring

**Files:**
- Modify: `src/data/homeTeasers.js` (3 of 7 entries: `real-events`, `behind-the-event`, `social-video`; the other 4 — `weddings-flagship`, `inspiration`, `transformation`, `locations` — stay byte-for-byte unchanged)
- Modify: `src/pages/Home.test.jsx` (update exactly one line of the hardcoded heading-order array, matching the one teaser whose title text changes)

**Interfaces:**
- Consumes: nothing new (still exports the same `homeTeasers` shape `SectionTeaser`/`Home` already render).
- Produces: same shape, 3 entries pointing at real Phase 4 content instead of "coming in a later phase" placeholders.

- [ ] **Step 1: Write the failing test**

`homeTeasers.test.js` already asserts (unchanged, no edit needed to that file) that every teaser has a resolvable image, non-empty copy, and no duplicated title/description — this test will catch any mistake in Step 3 without needing new assertions. `Home.test.jsx`'s existing exact-order test will fail once Step 3 changes the `real-events` teaser's title, until this task's own edit to that test file is applied. To make the change visible as a failing test first, apply this one-line edit to `src/pages/Home.test.jsx` now, before touching `homeTeasers.js`:

Change line 24 of the `expectedOrder` array from:
```js
      'Our real work, coming to this page soon.', // Real Events teaser
```
to:
```js
      'See the real work behind the plans.', // Real Events teaser
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: FAIL — the updated expected order no longer matches `homeTeasers.js`'s current (pre-Step-3) title text.

- [ ] **Step 3: Rewire the 3 teasers**

Replace `src/data/homeTeasers.js` in full:
```js
import { SOCIALS } from './contact';

export const homeTeasers = [
  {
    id: 'weddings-flagship',
    imageId: 'vertical-weddings',
    eyebrow: 'The flagship experience',
    title: 'Weddings, planned as one continuous story.',
    description:
      'Every function, from Haldi to Reception, styled and coordinated together — the full experience is arriving in the next phase.',
    ctaLabel: 'Explore Weddings',
    href: '/events/weddings',
  },
  {
    id: 'real-events',
    imageId: 'vertical-social',
    eyebrow: 'Real events, real moments',
    title: 'See the real work behind the plans.',
    description:
      'Real videos from real Next Level Events celebrations — plus a look at the planning that happens before the event.',
    ctaLabel: 'See Real Events',
    href: '/real-events',
  },
  {
    id: 'inspiration',
    imageId: 'vertical-cultural',
    eyebrow: 'Event inspiration',
    title: 'Ideas for every ritual and celebration.',
    description:
      'A dedicated inspiration system, organised by wedding, birthday, décor and culture, is arriving in a later phase.',
    ctaLabel: 'Ask Us for Ideas',
    href: '/#contact',
  },
  {
    id: 'transformation',
    imageId: 'vertical-decor',
    eyebrow: 'The transformation',
    title: 'From bare venue to finished celebration.',
    description:
      'Before-and-after stories from real setups are coming to this page once we have verified pairs to show.',
    ctaLabel: 'See Our Services',
    href: '/#services',
  },
  {
    id: 'behind-the-event',
    imageId: 'vertical-corporate',
    eyebrow: 'Behind the event',
    title: 'The planning you never see on the day.',
    description:
      'Site recce, client meetings and special-entry setup — a real look at our process, from our own Instagram.',
    ctaLabel: 'See Behind the Event',
    href: '/real-events#behind-the-event',
  },
  {
    id: 'locations',
    imageId: 'vertical-destination',
    eyebrow: 'Where we work',
    title: 'Ranchi first, and beyond on request.',
    description:
      'A full Locations guide, organised by city and event type, is arriving in a later phase. For now, tell us your city directly.',
    ctaLabel: 'Ask About Your City',
    href: '/#contact',
  },
  {
    id: 'social-video',
    imageId: 'vertical-entertainment',
    eyebrow: 'On Instagram & YouTube',
    title: 'Follow the real work as it happens.',
    description:
      'Real reels and videos from Next Level Events celebrations, plus more on Instagram, YouTube and Facebook.',
    ctaLabel: 'Watch Real Events',
    href: '/real-events',
  },
];
```

Only `real-events`, `behind-the-event`, and `social-video` changed (`description`/`href`/`ctaLabel` on all three, plus `title` on `real-events` only, since its old title explicitly said "coming to this page soon" and would now be inaccurate — `behind-the-event` and `social-video`'s titles were already evergreen and needed no change, which is why `Home.test.jsx` only needed one line updated in Step 1). `weddings-flagship`, `inspiration`, `transformation`, and `locations` are byte-for-byte identical to before.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run`
Expected: PASS — `Home.test.jsx`'s updated order matches, `homeTeasers.test.js`'s existing uniqueness/shape checks still pass against the new copy, and every other Phase 1–4 test is unaffected.

- [ ] **Step 5: Commit**

```bash
git add src/data/homeTeasers.js src/pages/Home.test.jsx
git commit -m "feat: rewire real-events, behind-the-event and social-video homepage teasers to /real-events"
```

---

### Task 6: Cross-phase QA gate

**Files:**
- Modify: any file touched below where a real issue is found
- No new automated tests required — manual verification pass, matching Phases 1–3's own final-QA-task pattern

**Interfaces:** none — verification only.

- [ ] **Step 1: Run the full automated suite and production build**

Run: `npx vitest run` — expect every test from Tasks 1–5 green, plus all Phase 1–3 tests unaffected.
Run: `npm run build` — expect a clean build.

- [ ] **Step 2: Crawl every new route and interactive element**

Visit `/real-events` (via source-tracing, or a running dev server if available): confirm the hero renders, all 5 video cards render as thumbnail+play-button (no iframe) initially, clicking each one mounts a real iframe pointing at that video's real id, all 3 Behind the Event cards link to the real verified Instagram URL, the follow-CTA row's 3 links point at the real verified Instagram/YouTube/Facebook URLs from `contact.js`, the coming-soon note renders, and the WhatsApp CTA resolves to the real verified number. Re-check the homepage: all 7 teasers render, the 3 rewired ones (`real-events`, `behind-the-event`, `social-video`) link to `/real-events`, `/real-events#behind-the-event`, and `/real-events` respectively, and the 4 untouched ones are unchanged. Re-check nav: "Real Events" appears in both the desktop mega menu and the mobile drawer, alongside the untouched Home/Events/Contact entries. Re-check Weddings (`/events/weddings` and one sub-experience) and one non-Weddings vertical to confirm Phases 2–3 are completely unaffected.

- [ ] **Step 3: Fabricated-content check**

Grep `src/data/socialContent.js`, `src/data/behindTheEvent.js`, and `src/pages/RealEventsHub.jsx` for any client-name, event-date, venue-name, guest-count, review, rating, or statistic pattern — expect none. Confirm every video label traces to a real hashtag from the spec's research (no invented caption), and every Behind the Event label matches the verified Instagram Highlight name exactly.

- [ ] **Step 4: Responsive and accessibility check**

If a browser tool is available, check `/real-events` at Phase 1's 8 widths, and manually click through all 5 video embeds and all 3 Behind the Event links. If not, state that plainly and instead review: the video grid and Behind the Event grid use the same responsive Tailwind grid patterns already validated on `VerticalHub`/`WeddingsHub`; every play button is a real `<button>` (keyboard-operable, screen-reader-labeled via `aria-label`); every loaded `<iframe>` has a `title`; every link has visible, readable text (no icon-only links).

- [ ] **Step 5: Fix anything found and commit**

If any step surfaced a real issue, fix it and commit exactly the files changed. If nothing needed fixing, no commit is required — the automated suite and build from Step 1 are the record.

## Self-Review Notes

- **Spec coverage:** the 5 verified videos, the 3 verified Behind the Event categories, the follow-CTA row, the honest coming-soon note, the route, the one nav entry, and the 3-of-7 homepage teaser rewiring all have a concrete task. Before/After and Event Inspiration correctly have zero tasks, matching the spec's explicit scope limit.
- **No Phase 1–3 file redesigned:** only `AppRoutes.jsx`, `nav.js`, `homeTeasers.js`, and `Home.test.jsx` are modified, all additively/targeted; every other existing file (including every vertical, `WeddingsHub.jsx`, `ExperienceDetail.jsx`, `VerticalHub.jsx`, `VerticalExperienceDetail.jsx`, `EventCategoryStub.jsx`, `Navbar.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`, `Footer.jsx`) is untouched — verified against their current source in Task 4 (the plain-link nav branch already exists and needs no code change).
- **No placeholders:** every one of the 5 video cards and 3 category cards does something real (plays a real verified video / links to the real verified Instagram account) — nothing is a dead TBD tile, and the one genuinely-not-ready area (a fuller Real Events portfolio) is labeled honestly rather than hidden or faked.
- **Type consistency:** `socialContent`'s `{id, platform, type, videoId, label, verificationStatus, sourceUrl}` and `behindTheEventCategories`'s `{id, label, description}` shapes are used identically in Task 3's `RealEventsHub` as defined in Task 1 — no drift.
