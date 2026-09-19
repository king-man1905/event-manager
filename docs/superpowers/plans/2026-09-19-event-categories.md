# Event Category Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-level event-category discovery system (7 main categories, 10 wedding cultural styles) to the existing Next Level Events single-page site, reusing existing components/patterns without rebuilding anything.

**Architecture:** Two new data files (`events.js`, `weddings.js`) feed three new presentational components (`OurEvents`, `WeddingExperience`, `CategoryDetail`). `CategoryDetail` is one reusable full-screen modal (styled like the existing `Portfolio.jsx` → `ProjectViewer`) used in two modes: main-category and wedding-style. `App.jsx` gains one small piece of lifted state (`portfolioFocus`) to let `CategoryDetail`'s "View work" CTA filter+scroll the existing `Portfolio` section.

**Tech Stack:** React 19, Vite 8, Tailwind v4, lucide-react icons. No new dependencies. No test framework exists in this repo (oxlint only) — verification is `npm run lint` + `npm run build` + manual/Playwright visual QA, matching this project's existing established pattern (there is no unit-test suite to extend).

**Spec:** `docs/superpowers/specs/2026-09-19-event-categories-design.md`

## Global Constraints

- No new npm dependencies (no router, no carousel lib).
- No visible "demo/proposed" badges in the UI; copy is factual, no unverifiable claims ("we specialize in...", "100+ weddings...").
- Every image is a distinct, thematically-verified Unsplash URL (all URLs below have been curl-verified as HTTP 200 and visually confirmed to match their theme — do not swap them for guessed IDs).
- Palette/typography stay as-is: deep charcoal `#0B0B0B`/`#111111`, warm ivory/silver text tokens, champagne gold accent, `Cormorant Garamond` display + `Inter` body — reuse existing utility classes (`heading-xl`, `label-eyebrow`, `btn-primary`, `btn-outline`, `section-py`, `reveal`) rather than inventing new ones.
- Mobile: no horizontal overflow at 375/390/412px; thumb-friendly tap targets (existing `MobileActionBar`/`Navbar` patterns already establish the minimum touch sizing to match).
- `npm run lint` and `npm run build` must both pass with zero warnings before any task is considered done.

---

### Task 1: Data files — `events.js` and `weddings.js`

**Files:**
- Create: `src/data/events.js`
- Create: `src/data/weddings.js`

**Interfaces:**
- Produces: `export const events` (array of 7 category objects), `export const weddingStyles` (array of 10 style objects) — consumed by Tasks 2–4.
- Each `events[]` item: `{ id, number, name, descriptor, image, size, subcategories, ctaLabel, portfolioCategory }` where `size` is `'large' | 'medium' | 'wide'` and `portfolioCategory` is a `projects.js` category id string or `null`.
- Each `weddingStyles[]` item: `{ id, name, tagline, image, description, tags }`.

- [ ] **Step 1: Create `src/data/events.js`**

```js
// ============================================================
// DATA — EVENT CATEGORIES
// Next Level Events — Main category discovery grid + detail content
// ============================================================

export const events = [
  {
    id: 'weddings',
    number: '01',
    name: 'Weddings',
    descriptor: 'Cultural · Destination · Celebrations',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
    size: 'large',
    subcategories: [],
    ctaLabel: 'Plan Your Wedding',
    portfolioCategory: 'weddings',
  },
  {
    id: 'corporate',
    number: '02',
    name: 'Corporate Events',
    descriptor: 'Conferences · Launches · Experiences',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=85',
    size: 'medium',
    subcategories: ['Conferences', 'Product Launches', 'Annual Functions', 'Award Nights', 'Seminars & Meetings'],
    ctaLabel: 'Plan a Corporate Event',
    portfolioCategory: 'corporate',
  },
  {
    id: 'social',
    number: '03',
    name: 'Social Celebrations',
    descriptor: 'Birthdays · Anniversaries · Private Events',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85',
    size: 'medium',
    subcategories: ['Birthdays', 'Anniversaries', 'Engagements', 'Baby Showers', 'Private Parties'],
    ctaLabel: 'Plan Your Celebration',
    portfolioCategory: 'birthdays',
  },
  {
    id: 'live',
    number: '04',
    name: 'Live & Entertainment',
    descriptor: 'Concerts · Music · Cultural Shows',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85',
    size: 'wide',
    subcategories: ['Concerts', 'Music Events', 'Cultural Shows', 'Stage Events', 'Artist Events'],
    ctaLabel: 'Plan Your Event',
    portfolioCategory: 'concerts',
  },
  {
    id: 'decor',
    number: '05',
    name: 'Décor & Design',
    descriptor: 'Stage · Floral · Lighting · Styling',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85',
    size: 'medium',
    subcategories: ['Wedding Décor', 'Stage Design', 'Floral Décor', 'Lighting', 'Themed Décor', 'Venue Styling'],
    ctaLabel: 'Discuss Your Design',
    portfolioCategory: 'decoration',
  },
  {
    id: 'special',
    number: '06',
    name: 'Special / Cultural',
    descriptor: 'Festivals · Community · Traditions',
    image: 'https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?auto=format&fit=crop&w=1400&q=85',
    size: 'medium',
    subcategories: ['Religious Events', 'Festivals', 'Community Events', 'Traditional Celebrations'],
    ctaLabel: 'Plan This Experience',
    portfolioCategory: null,
  },
  {
    id: 'destination',
    number: '07',
    name: 'Destination Events',
    descriptor: 'Resort · Beach · Palace · Outstation',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
    size: 'large',
    subcategories: ['Resort Events', 'Beach Events', 'Palace Events', 'Outstation Events', 'Destination Weddings'],
    ctaLabel: 'Plan a Destination Event',
    portfolioCategory: null,
  },
];
```

- [ ] **Step 2: Create `src/data/weddings.js`**

```js
// ============================================================
// DATA — WEDDING CULTURAL STYLES
// Next Level Events — Wedding style inspiration, not verified
// per-culture claims of specialization.
// ============================================================

export const weddingStyles = [
  {
    id: 'north-indian',
    name: 'North Indian',
    tagline: 'Grandeur & Tradition',
    image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1400&q=85',
    description: 'Rich mandap architecture, layered floral design, and ceremonial grandeur across multi-day celebrations.',
    tags: ['Traditional', 'Grand', 'Ceremonial'],
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    tagline: 'Timeless Rituals',
    image: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1400&q=85',
    description: 'Traditional ceremony structure with classical décor elements and time-honoured ritual sequencing.',
    tags: ['Traditional', 'Elegant', 'Cultural'],
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    tagline: 'Vibrant Celebrations',
    image: 'https://images.unsplash.com/photo-1670296047577-36c2c1281a85?auto=format&fit=crop&w=1400&q=85',
    description: 'High-energy baraat production, vibrant colour palettes, and celebration-forward event design.',
    tags: ['Vibrant', 'High-Energy', 'Festive'],
  },
  {
    id: 'bengali',
    name: 'Bengali',
    tagline: 'Graceful Traditions',
    image: 'https://images.unsplash.com/photo-1669257977776-fc39c92c4147?auto=format&fit=crop&w=1400&q=85',
    description: 'Elegant bridal styling and refined ceremonial detail rooted in Bengali wedding custom.',
    tags: ['Graceful', 'Traditional', 'Refined'],
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    tagline: 'Colour & Festivity',
    image: 'https://images.unsplash.com/photo-1652111132299-ff1056c87b35?auto=format&fit=crop&w=1400&q=85',
    description: 'Festive colour, dance, and music woven through a multi-event wedding celebration.',
    tags: ['Colourful', 'Festive', 'Musical'],
  },
  {
    id: 'rajasthani',
    name: 'Rajasthani',
    tagline: 'Royal Heritage',
    image: 'https://images.unsplash.com/photo-1723035767952-ffb67ffa88aa?auto=format&fit=crop&w=1400&q=85',
    description: 'Palace-inspired architecture and royal heritage aesthetics brought into modern wedding design.',
    tags: ['Royal', 'Heritage', 'Architectural'],
  },
  {
    id: 'muslim',
    name: 'Muslim',
    tagline: 'Elegant Celebrations',
    image: 'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=1400&q=85',
    description: 'Refined ceremonial detail and elegant styling for Nikah and celebration events.',
    tags: ['Elegant', 'Ceremonial', 'Refined'],
  },
  {
    id: 'christian',
    name: 'Christian',
    tagline: 'Classic Ceremony',
    image: 'https://images.unsplash.com/photo-1474867985807-96ca17098cc9?auto=format&fit=crop&w=1400&q=85',
    description: 'Classic church ceremony staging paired with refined reception design.',
    tags: ['Classic', 'Ceremonial', 'Timeless'],
  },
  {
    id: 'destination',
    name: 'Destination',
    tagline: 'Dream Locations',
    image: 'https://images.unsplash.com/photo-1519307212971-dd9561667ffb?auto=format&fit=crop&w=1400&q=85',
    description: 'Full-service planning for weddings staged at resorts, beaches, and outstation venues.',
    tags: ['Scenic', 'Outstation', 'Immersive'],
  },
  {
    id: 'fusion',
    name: 'Fusion / Multicultural',
    tagline: 'Blending Traditions',
    image: 'https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?auto=format&fit=crop&w=1400&q=85',
    description: 'Thoughtful blending of multiple cultural traditions into one cohesive celebration.',
    tags: ['Multicultural', 'Modern', 'Personal'],
  },
];
```

- [ ] **Step 3: Verify data loads cleanly**

Run: `node -e "const {events}=require('./src/data/events.js'); const {weddingStyles}=require('./src/data/weddings.js'); console.log(events.length, weddingStyles.length)"` will fail (ESM, not CJS) — instead verify via the dev server in Task 2 once a component imports them. For this task alone, verify only that both files are valid JS:

Run: `npx oxlint src/data/events.js src/data/weddings.js`
Expected: no errors.

- [ ] **Step 4: Commit** (skip — no git repository in this project; proceed to Task 2)

---

### Task 2: `CategoryDetail.jsx` — reusable detail modal

**Files:**
- Create: `src/components/CategoryDetail.jsx`

**Interfaces:**
- Consumes: nothing from other new files directly (pure props component).
- Produces: `export default function CategoryDetail({ mode, data, onClose, onViewWork })` where:
  - `mode: 'category' | 'style'`
  - `data`: an `events[]` item (mode `'category'`) or a `weddingStyles[]` item (mode `'style'`)
  - `onClose: () => void`
  - `onViewWork?: (portfolioCategory: string) => void` — only called/rendered when `mode === 'category' && data.portfolioCategory`

- [ ] **Step 1: Write the component**

```jsx
import { X, ArrowUpRight } from 'lucide-react';

export default function CategoryDetail({ mode, data, onClose, onViewWork }) {
  const isCategory = mode === 'category';
  const title = data.name;
  const tags = isCategory ? data.subcategories : data.tags;
  const description = isCategory ? data.descriptor : data.description;
  const waText = encodeURIComponent(
    `Hi Next Level Events, I'd like to plan a ${title} event.`
  );

  const handleKey = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
      onKeyDown={handleKey}
    >
      <div
        className="absolute inset-0 bg-[#0B0B0B]/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl bg-[#111111] border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
        <div className="relative lg:w-1/2 min-h-[280px] lg:min-h-[520px] bg-black flex-shrink-0">
          <img
            src={data.image}
            alt={`${title} — Next Level Events`}
            className="w-full h-full object-cover"
            loading="lazy"
            width={1000}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
        </div>

        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          {!isCategory && (
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block">
              {data.tagline}
            </span>
          )}
          {isCategory && (
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block">
              {data.number}
            </span>
          )}

          <h3
            className="font-display text-light text-3xl lg:text-4xl font-light tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title.toUpperCase()}
          </h3>

          <p className="text-sm text-silver/85 leading-relaxed font-body mb-6">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-8" role="list">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="text-[0.65rem] uppercase tracking-[0.18em] text-warm/80 border border-white/15 px-3 py-1.5"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-3 mt-auto">
            {isCategory && data.portfolioCategory && (
              <button
                onClick={() => onViewWork?.(data.portfolioCategory)}
                className="btn-outline justify-center text-[0.7rem] py-3"
              >
                <span>View Work In This Category</span>
                <ArrowUpRight size={14} />
              </button>
            )}
            <a
              href={`https://wa.me/917903133317?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center text-[0.7rem] py-3.5"
              aria-label={`Enquire about ${title} on WhatsApp`}
            >
              <span>{isCategory ? data.ctaLabel : 'Plan This Experience'}</span>
              <ArrowUpRight size={14} className="text-obsidian" />
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B0B0B]/80 border border-white/10 text-warm hover:text-gold hover:border-gold flex items-center justify-center transition-colors duration-300 z-30"
          aria-label="Close details"
          autoFocus
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint check**

Run: `npx oxlint src/components/CategoryDetail.jsx`
Expected: no errors or warnings.

(No render-level test here — this component has no consumer yet. It gets exercised end-to-end in Task 3's verification.)

---

### Task 3: `OurEvents.jsx` — homepage category grid

**Files:**
- Create: `src/components/OurEvents.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `events` from `src/data/events.js`; `CategoryDetail` from Task 2.
- Produces: `export default function OurEvents({ onViewWork })` where `onViewWork: (portfolioCategory: string) => void` (same signature `CategoryDetail` expects — passed straight through). Section has `id="events"`. `WeddingExperience` (Task 4) must render with `id="weddings"` so this component's Weddings-card click target (`document.getElementById('weddings')`) resolves.

- [ ] **Step 1: Write the component**

```jsx
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { events } from '../data/events';
import CategoryDetail from './CategoryDetail';

const sizeClasses = {
  large: 'md:col-span-2 lg:col-span-7 min-h-[420px] lg:min-h-[520px]',
  wide: 'md:col-span-2 lg:col-span-12 min-h-[340px] lg:min-h-[380px]',
  medium: 'lg:col-span-5 min-h-[340px] lg:min-h-[420px]',
};

export default function OurEvents({ onViewWork }) {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCardClick = (event) => {
    if (event.id === 'weddings') {
      document.getElementById('weddings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setOpenCategory(event);
  };

  return (
    <>
      <section id="events" className="bg-[#0B0B0B] section-py relative overflow-hidden" aria-labelledby="events-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              OUR EVENTS
            </span>
            <h2 id="events-heading" className="heading-xl text-light leading-[0.96] tracking-tight mb-6 reveal reveal-delay-1">
              EVERY OCCASION.<br />
              <span className="italic font-light text-warm">A NEW STORY.</span>
            </h2>
            <p className="body-lead text-silver/85 max-w-xl reveal reveal-delay-2">
              From weddings and celebrations to corporate experiences and live events, explore the
              kind of occasion you want to create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
            {events.map((event, i) => (
              <article
                key={event.id}
                className={`reveal group relative overflow-hidden cursor-pointer ${sizeClasses[event.size]} transition-all duration-500`}
                onClick={() => handleCardClick(event)}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(event)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${event.name}`}
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <img
                  src={event.image}
                  alt={`${event.name} — Next Level Events`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] filter brightness-[0.9]"
                  loading="lazy"
                  width={1000}
                  height={700}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/25 to-transparent" />

                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#0B0B0B]/60 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:rotate-45">
                  <ArrowUpRight size={13} className="text-light group-hover:text-obsidian transition-colors duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="counter-num text-xs text-gold/80 block mb-2">{event.number}</span>
                  <h3
                    className="font-display text-light text-2xl lg:text-3xl font-light tracking-tight mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {event.name.toUpperCase()}
                  </h3>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-warm/80 mb-3">
                    {event.descriptor}
                  </p>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-medium inline-flex items-center gap-2">
                    Explore <ArrowUpRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {openCategory && (
        <CategoryDetail
          mode="category"
          data={openCategory}
          onClose={() => setOpenCategory(null)}
          onViewWork={(portfolioCategory) => {
            setOpenCategory(null);
            onViewWork?.(portfolioCategory);
          }}
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: Wire into `App.jsx`**

Modify `src/App.jsx` — add import and render `<OurEvents />` right after `<Intro />` (before the first `<Marquee />`). This task doesn't yet wire `onViewWork` to Portfolio — pass a no-op for now; Task 5 replaces it:

```jsx
import OurEvents from './components/OurEvents';
```
(add near the other component imports)

```jsx
        <Intro />

        <OurEvents onViewWork={() => {}} />

        <Marquee />
```
(replace the existing `<Intro />` + `<Marquee />` block with this three-line sequence)

- [ ] **Step 3: Lint and build**

Run: `npx oxlint src/components/OurEvents.jsx src/App.jsx`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual/interaction verification**

Start dev server (`npm run dev`), open the site, scroll to the new "OUR EVENTS" section. Verify: 7 cards render with varied sizes (Weddings and Destination large, Live wide, rest medium), all images load, clicking a non-Weddings card opens the `CategoryDetail` modal with correct title/tags/image, ESC and backdrop-click both close it, clicking the Weddings card scrolls down (target section doesn't exist yet until Task 4 — acceptable for now, will resolve once Task 4 lands; verify no console error is thrown by the missing scroll target, since `?.` optional chaining makes it a no-op).

---

### Task 4: `WeddingExperience.jsx` — dedicated wedding section

**Files:**
- Create: `src/components/WeddingExperience.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `weddingStyles` from `src/data/weddings.js`; `CategoryDetail` from Task 2.
- Produces: `export default function WeddingExperience()` (no props — fully self-contained, per spec). Section has `id="weddings"`.

- [ ] **Step 1: Write the component**

```jsx
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { weddingStyles } from '../data/weddings';
import CategoryDetail from './CategoryDetail';

export default function WeddingExperience() {
  const [openStyle, setOpenStyle] = useState(null);

  return (
    <>
      <section id="weddings" className="bg-[#0B0B0B] section-py relative overflow-hidden border-t border-white/[0.06]" aria-labelledby="weddings-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20 max-w-2xl">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              THE WEDDING EXPERIENCE
            </span>
            <h2 id="weddings-heading" className="heading-xl text-light leading-[0.96] tracking-tight mb-6 reveal reveal-delay-1">
              YOUR WEDDING.<br />
              YOUR CULTURE.<br />
              <span className="italic font-light text-warm">YOUR STORY.</span>
            </h2>
            <p className="body-lead text-silver/85 reveal reveal-delay-2">
              Every wedding is different. Different traditions, different rituals, different families,
              different ways of celebrating. Create experiences around the identity of each couple.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {weddingStyles.map((style, i) => (
              <article
                key={style.id}
                className="reveal group relative overflow-hidden cursor-pointer aspect-[3/4] transition-all duration-500"
                onClick={() => setOpenStyle(style)}
                onKeyDown={(e) => e.key === 'Enter' && setOpenStyle(style)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${style.name} wedding style`}
                style={{ transitionDelay: `${(i % 5) * 50}ms` }}
              >
                <img
                  src={style.image}
                  alt={`${style.name} wedding style — Next Level Events`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] filter brightness-[0.88]"
                  loading="lazy"
                  width={600}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-light text-lg font-light tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {style.name}
                  </h3>
                  <p className="text-[0.6rem] uppercase tracking-[0.15em] text-gold/90">{style.tagline}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center reveal">
            <a
              href="https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20plan%20my%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center text-[0.7rem] py-3.5 px-8"
            >
              <span>Plan Your Wedding</span>
              <ArrowUpRight size={14} className="text-obsidian" />
            </a>
          </div>
        </div>
      </section>

      {openStyle && (
        <CategoryDetail mode="style" data={openStyle} onClose={() => setOpenStyle(null)} />
      )}
    </>
  );
}
```

- [ ] **Step 2: Wire into `App.jsx`**

Add import, and render `<WeddingExperience />` immediately after `<OurEvents onViewWork={...} />`:

```jsx
import WeddingExperience from './components/WeddingExperience';
```

```jsx
        <OurEvents onViewWork={() => {}} />

        <WeddingExperience />

        <Marquee />
```

- [ ] **Step 3: Lint and build**

Run: `npx oxlint src/components/WeddingExperience.jsx src/App.jsx`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual/interaction verification**

Reload dev server. Verify: clicking the Weddings card in "OUR EVENTS" now scrolls smoothly to the new wedding section; 10 style cards render in a 2-column (mobile) / 5-column (desktop) grid, each with a distinct image; clicking a style opens `CategoryDetail` in style mode showing name/tagline/tags/description and a single "Plan This Experience" WhatsApp CTA (no "View work" button, since `mode==='style'` has no `onViewWork`); ESC/backdrop-click close it.

---

### Task 5: Wire "View work" CTA to the existing Portfolio filter

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Portfolio.jsx`

**Interfaces:**
- `Portfolio` gains an optional prop: `focusRequest?: { category: string } | null`. When it changes (by reference), `Portfolio` sets its existing internal `activeCategory` state to `focusRequest.category` and scrolls `#work` into view. Existing standalone behavior (no prop passed) is unchanged — `Portfolio` still manages `activeCategory` itself by default.

- [ ] **Step 1: Add `focusRequest` handling to `Portfolio.jsx`**

In `src/components/Portfolio.jsx`, add `useEffect` import and the effect right after the existing `activeCategory`/`viewer` state declarations (around line 6-7):

```jsx
import { useState, useCallback, useEffect } from 'react';
```

```jsx
export default function Portfolio({ focusRequest } = {}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewer, setViewer] = useState(null); // { project, imageIndex }

  useEffect(() => {
    if (!focusRequest) return;
    setActiveCategory(focusRequest.category);
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [focusRequest]);
```

- [ ] **Step 2: Lift `portfolioFocus` state into `App.jsx`**

In `src/App.jsx`, convert to a component that holds state (add `useState` import), pass `focusRequest` to `<Portfolio />`, and pass a real `onViewWork` to `<OurEvents />`:

```jsx
import { useState } from 'react';
```

```jsx
export default function App() {
  useReveal();
  const [portfolioFocus, setPortfolioFocus] = useState(null);
```

```jsx
        <OurEvents onViewWork={(category) => setPortfolioFocus({ category })} />

        <WeddingExperience />

        <Marquee />

        <Portfolio focusRequest={portfolioFocus} />
```

- [ ] **Step 3: Lint and build**

Run: `npx oxlint src/App.jsx src/components/Portfolio.jsx`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: End-to-end verification**

Reload dev server. Open "OUR EVENTS", click "Corporate Events" → modal opens → click "View Work In This Category" → modal closes, page scrolls smoothly to the Portfolio section, and its category filter tab now shows "Corporate" active with only corporate projects displayed. Repeat for Social ("Birthdays" filter) and Décor. Confirm Special/Cultural and Destination category modals do NOT show a "View work" button (since `portfolioCategory: null`), only the WhatsApp CTA.

---

### Task 6: Full responsive + regression QA pass

**Files:** none (verification only — fix forward in the relevant file if something fails)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: zero warnings/errors (this project's baseline is a clean lint; do not merge new warnings).

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds, no errors.

- [ ] **Step 3: Responsive + console + interaction sweep**

Using the same headless-Chromium driver-script approach established in this project's prior UI audit session (temporary local `playwright` install if not already present, dev server on `npm run dev`), check at 1440, 1280, 1024, 768, 412, 390, 375px:
- No horizontal overflow (`document.documentElement.scrollWidth > document.documentElement.clientWidth` is `false`).
- No console errors/warnings, no failed network requests (all 17 new image URLs return 200 — already curl-verified in Task 1, re-check in-browser via the `requestfailed`/`response` listeners pattern used previously).
- `OurEvents` cards: no broken images, no overlapping text, tap targets comfortable on mobile (cards are full-bleed grid cells, already thumb-sized).
- `WeddingExperience`: 2-column grid on mobile does not produce unreadably small cards (verify `aspect-[3/4]` cards remain legible at 375px — card width ≈ (375 - 48 padding - 16 gap)/2 ≈ 155px, acceptable for a name + tagline label).
- `CategoryDetail` modal: opens/closes via click, ESC, and backdrop-click in both modes; no clipped content at 375px (image stacks above text on `lg:flex-row` → single column below `lg`).
- Existing functionality unaffected: Navbar links/mobile drawer, Portfolio filter buttons/modal/prev-next-ESC, Contact form, WhatsApp floating button + tooltip, MobileActionBar — all still work exactly as before (no regressions from the `App.jsx`/`Portfolio.jsx` edits).

- [ ] **Step 4: Fix forward**

Any failure found in Step 3 gets fixed in its source file immediately (this is QA-driven bugfixing, not a separate task — same discipline as the prior UI-audit session in this project). Re-run Steps 1–3 after any fix until clean.

- [ ] **Step 5: Clean up**

Remove any temporary QA scratch scripts/screenshots created for Step 3 (e.g. a `.qa-scratch/` directory) and the temporary local `playwright` install (`node_modules/playwright`, `node_modules/playwright-core`) if one was added for this pass — matching how the prior UI-audit session cleaned up after itself. `package.json`/`package-lock.json` must remain unmodified (use `npm install --no-save playwright` if reinstalling).
