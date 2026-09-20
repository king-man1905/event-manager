# Next Level Events — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next Level Events site's foundation — brand system, navigation, homepage, contact/WhatsApp system, and the data/image architecture every later phase (Weddings flagship, other event verticals, proof systems, locations/enquiry) plugs into.

**Architecture:** A Vite + React SPA with react-router. All content lives in flat, per-domain data files (`nav.js`, `contact.js`, `events.js`) rather than a nested recursive tree. Every image reference resolves through a manifest (`manifest.json` + `images.js`) instead of a bare URL, so source/license/status is always tracked. The mega-menu and mobile drawer render the same `nav.js` data through two components instead of duplicating link lists.

**Tech Stack:** Vite, React 18, JavaScript (no TypeScript), react-router-dom v6, Tailwind CSS v3, Vitest + @testing-library/react + jsdom for tests.

**Spec:** `docs/superpowers/specs/2026-09-20-nle-foundation-design.md`

## Global Constraints

- JavaScript only, no TypeScript (spec: Scope).
- Brand colors, exact values: charcoal `#1c1a17`, ivory `#faf6ef`, neutral `#ece4d3`, gold `#c19743` (gold value already in production use on the live site — spec: Verified business data).
- Display typeface Cormorant Garamond, body/UI typeface Inter (spec: Visual language).
- Verified WhatsApp/phone number: `917903133317` (no other number is ever used) (spec: Verified business data).
- Verified email: `nextlevel.events25@gmail.com`.
- Verified address: `Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002`.
- Verified socials: Instagram `https://www.instagram.com/nextlevelevents.in`, Facebook `https://www.facebook.com/nextlevelevents.in`, YouTube `https://www.youtube.com/@nextlevelevents25`.
- Never invent reviews, ratings, awards, statistics, client counts, service cities, or services not actually offered (spec: No-fabrication rule).
- Every image reference goes through `images.js`/`manifest.json` — no component ever holds a bare image URL (spec: Image manifest).
- Every button, card, image, modal, CTA, and link must lead somewhere real — nothing dead-ends (spec: UX rule / Canonical user journey).
- `nav.js` carries all eight event verticals from day one (spec: Scope).
- `events.js` entries reserve an empty `subcategories: []` field for later phases (spec: Content data flow).

---

## Image manifest source data

The following images were sourced and verified (HTTP 200, visually checked for semantic/cultural accuracy) during planning. Task 3 writes these into `assets/manifest.json` verbatim.

| id | Source | License | Depicts |
|---|---|---|---|
| `hero-home` | Wikimedia Commons — Imakanksha, "Indian bride and groom" | CC BY-SA 4.0 | Indian bride and groom in traditional attire on a decorated mandap stage |
| `vertical-weddings` | Wikimedia Commons — Wikilover90, "Indian Wedding Mandap" | CC BY-SA 4.0 | Floral-decorated Indian wedding mandap with a priest performing rituals |
| `vertical-corporate` | Unsplash | Unsplash License | Modern conference hall with round tables and projector screens |
| `vertical-social` | Unsplash | Unsplash License | Elegant banquet hall with round tables, gold chairs, chandeliers (generic — flagged for Indian-specific replacement in a later phase) |
| `vertical-kids-family` | Unsplash | Unsplash License | Cluster of colourful balloons |
| `vertical-entertainment` | Wikimedia Commons — Mohd Zishan, "A Vibrant Bharatanatyam Group Interpretation" | CC BY-SA 4.0 | Four dancers performing Bharatanatyam on stage |
| `vertical-decor` | Wikimedia Commons — Wikilover90, "Indian Wedding Mandap Decoration" | CC BY-SA 4.0 | Close-up of floral/gold mandap decoration |
| `vertical-cultural` | Wikimedia Commons via Flickr — humdingor, "Diwali Decor" | CC BY-SA 2.0 | Lit clay diyas and floating-flower tray for Diwali |
| `vertical-destination` | Wikimedia Commons — Yann, "Umaid Bhawan, Jodhpur" | CC BY-SA 4.0 | Umaid Bhawan Palace, Jodhpur, Rajasthan |

All entries get `status: "placeholder"` (real, licensed, semantically accurate — but not yet actual Next Level Events photography). None are ever presented as real business work.

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/test/setup.js`
- Create: `src/assets/brand/logo.png`, `favicon-32.png`, `favicon-180.png`, `favicon-192.png` (fetched from the live site)
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `App` default export (placeholder shell, replaced in Task 8); Tailwind color tokens `charcoal`/`ivory`/`neutral`/`gold`; font families `font-display` (Cormorant Garamond) and `font-sans` (Inter); npm script `npm test` running Vitest.

- [ ] **Step 1: Initialize package.json and install dependencies**

```bash
npm init -y
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react tailwindcss@3 postcss autoprefixer vitest jsdom @testing-library/react @testing-library/jest-dom
```

Edit `package.json` scripts to:

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Create Vite, Tailwind, and PostCSS config**

`vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
```

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: 'var(--color-charcoal)',
        ivory: 'var(--color-ivory)',
        neutral: 'var(--color-neutral)',
        gold: 'var(--color-gold)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Create index.css with brand color tokens**

`src/index.css`:

```css
:root {
  --color-charcoal: #1c1a17;
  --color-ivory: #faf6ef;
  --color-neutral: #ece4d3;
  --color-gold: #c19743;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: var(--color-ivory);
  color: var(--color-charcoal);
}
```

- [ ] **Step 4: Fetch the real brand logo and favicons**

```bash
mkdir -p src/assets/brand
curl -sL "https://www.nextlevelevents.in/assets/images/brand/logo.png" -o src/assets/brand/logo.png
curl -sL "https://www.nextlevelevents.in/assets/images/brand/favicon-32.png" -o src/assets/brand/favicon-32.png
curl -sL "https://www.nextlevelevents.in/assets/images/brand/favicon-180.png" -o src/assets/brand/favicon-180.png
curl -sL "https://www.nextlevelevents.in/assets/images/brand/favicon-192.png" -o src/assets/brand/favicon-192.png
```

Verify each file is a real PNG, not an error page:

```bash
file src/assets/brand/logo.png
```

Expected: `PNG image data` in the output for all four files.

- [ ] **Step 5: Create index.html**

```html
<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Next Level Events — Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand</title>
    <link rel="icon" type="image/png" href="/src/assets/brand/favicon-32.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write the failing smoke test**

`src/App.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Next Level Events name', () => {
    render(<App />);
    expect(screen.getByText('Next Level Events')).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './App'` or similar.

- [ ] **Step 8: Create the placeholder App and main entry**

`src/App.jsx`:

```jsx
export default function App() {
  return <div>Next Level Events</div>;
}
```

`src/main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js index.html src/main.jsx src/App.jsx src/App.test.jsx src/index.css src/test/setup.js src/assets/brand
git commit -m "feat: scaffold Vite/React/Tailwind project with brand tokens and real logo"
```

---

### Task 2: Contact data and WhatsAppCTA component

**Files:**
- Create: `src/data/contact.js`
- Create: `src/components/WhatsAppCTA.jsx`
- Test: `src/components/WhatsAppCTA.test.jsx`

**Interfaces:**
- Produces: `contact.js` exports `WHATSAPP_NUMBER`, `PHONE_DISPLAY`, `PHONE_TEL`, `EMAIL`, `ADDRESS`, `MAP_URL`, `SOCIALS` (`{ instagram, facebook, youtube }`). `WhatsAppCTA` default export, props `{ message: string, children: ReactNode, className?: string }`.
- Consumes: none (first data file).

- [ ] **Step 1: Write contact.js**

`src/data/contact.js`:

```js
export const WHATSAPP_NUMBER = '917903133317';
export const PHONE_DISPLAY = '+91 79031 33317';
export const PHONE_TEL = 'tel:+917903133317';
export const EMAIL = 'nextlevel.events25@gmail.com';
export const ADDRESS =
  "Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002";
export const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS);
export const SOCIALS = {
  instagram: 'https://www.instagram.com/nextlevelevents.in',
  facebook: 'https://www.facebook.com/nextlevelevents.in',
  youtube: 'https://www.youtube.com/@nextlevelevents25',
};
```

- [ ] **Step 2: Write the failing test for WhatsAppCTA**

`src/components/WhatsAppCTA.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppCTA from './WhatsAppCTA';

describe('WhatsAppCTA', () => {
  it('builds a wa.me link with the verified number and the encoded contextual message', () => {
    const message = "Hi, I'm interested in a Punjabi wedding in Ranchi.";
    render(<WhatsAppCTA message={message}>Enquire</WhatsAppCTA>);
    const link = screen.getByRole('link', { name: 'Enquire' });
    expect(link).toHaveAttribute(
      'href',
      `https://wa.me/917903133317?text=${encodeURIComponent(message)}`
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './WhatsAppCTA'`

- [ ] **Step 4: Implement WhatsAppCTA**

`src/components/WhatsAppCTA.jsx`:

```jsx
import { WHATSAPP_NUMBER } from '../data/contact';

export default function WhatsAppCTA({ message, children, className = '' }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/contact.js src/components/WhatsAppCTA.jsx src/components/WhatsAppCTA.test.jsx
git commit -m "feat: add verified contact data and WhatsAppCTA component"
```

---

### Task 3: Image manifest and resolver

**Files:**
- Create: `src/assets/manifest.json`
- Create: `src/data/images.js`
- Test: `src/data/images.test.js`

**Interfaces:**
- Produces: `images.js` exports `getImage(id: string) => { url, source, license, altText, status }`, throws `Error` containing the id when not found.
- Consumes: none.

- [ ] **Step 1: Write the manifest**

`src/assets/manifest.json`:

```json
{
  "hero-home": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Indian_bride_and_groom.jpg",
    "source": "Wikimedia Commons — Imakanksha, \"Indian bride and groom\"",
    "license": "CC BY-SA 4.0",
    "altText": "An Indian bride and groom in traditional wedding attire holding hands on a gold-decorated mandap stage",
    "status": "placeholder"
  },
  "vertical-weddings": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_Wedding_Mandap.jpg",
    "source": "Wikimedia Commons — Wikilover90, \"Indian Wedding Mandap\"",
    "license": "CC BY-SA 4.0",
    "altText": "A floral-decorated Indian wedding mandap with a priest performing rituals",
    "status": "placeholder"
  },
  "vertical-corporate": {
    "url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    "source": "Unsplash",
    "license": "Unsplash License",
    "altText": "An empty modern conference hall set up with round tables and projector screens for a corporate event",
    "status": "placeholder"
  },
  "vertical-social": {
    "url": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    "source": "Unsplash",
    "license": "Unsplash License",
    "altText": "An elegant banquet hall set with round tables, gold chairs and chandeliers for a private celebration",
    "status": "placeholder"
  },
  "vertical-kids-family": {
    "url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    "source": "Unsplash",
    "license": "Unsplash License",
    "altText": "A cluster of colourful balloons in pink, teal, yellow and purple",
    "status": "placeholder"
  },
  "vertical-entertainment": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/f/f0/A_Vibrant_Bharatanatyam_Group_Interpretation.jpg",
    "source": "Wikimedia Commons — Mohd Zishan, \"A Vibrant Bharatanatyam Group Interpretation\"",
    "license": "CC BY-SA 4.0",
    "altText": "Four dancers in traditional Bharatanatyam costume performing on a dark stage",
    "status": "placeholder"
  },
  "vertical-decor": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Indian_Wedding_Mandap_Decoration.jpg",
    "source": "Wikimedia Commons — Wikilover90, \"Indian Wedding Mandap Decoration\"",
    "license": "CC BY-SA 4.0",
    "altText": "Close-up of an Indian wedding mandap decorated with white and pink floral garlands and gold carving",
    "status": "placeholder"
  },
  "vertical-cultural": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/73/Diyas_Diwali_Decor_India.jpg",
    "source": "Wikimedia Commons via Flickr — humdingor, \"Diwali Decor\"",
    "license": "CC BY-SA 2.0",
    "altText": "Rows of lit clay diyas arranged on the floor beneath a silver tray of floating flowers and candles for Diwali",
    "status": "placeholder"
  },
  "vertical-destination": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Umaid_Bhawan%2C_Jodhpur.jpg",
    "source": "Wikimedia Commons — Yann, \"Umaid Bhawan, Jodhpur\"",
    "license": "CC BY-SA 4.0",
    "altText": "Umaid Bhawan Palace in Jodhpur, Rajasthan, a sandstone palace with a large central dome",
    "status": "placeholder"
  }
}
```

- [ ] **Step 2: Write the failing test for images.js**

`src/data/images.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { getImage } from './images';

describe('getImage', () => {
  it('returns a manifest entry with url, altText and license for a known id', () => {
    const image = getImage('hero-home');
    expect(image.url).toMatch(/^https:\/\//);
    expect(image.altText.length).toBeGreaterThan(10);
    expect(image.license).toBeTruthy();
  });

  it('throws a clear error naming the id when the id is unknown', () => {
    expect(() => getImage('does-not-exist')).toThrow('does-not-exist');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './images'`

- [ ] **Step 4: Implement images.js**

`src/data/images.js`:

```js
import manifest from '../assets/manifest.json';

export function getImage(id) {
  const entry = manifest[id];
  if (!entry) {
    throw new Error(`No manifest entry for image id "${id}"`);
  }
  return entry;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/assets/manifest.json src/data/images.js src/data/images.test.js
git commit -m "feat: add image manifest and getImage resolver"
```

---

### Task 4: Navigation and events data

**Files:**
- Create: `src/data/events.js`
- Create: `src/data/nav.js`
- Test: `src/data/events.test.js`, `src/data/nav.test.js`

**Interfaces:**
- Consumes: `getImage` from `images.js` (Task 3, for validation only).
- Produces: `events.js` exports `events: Array<{ slug, label, imageId, teaser, href, subcategories: [] }>` (8 entries). `nav.js` exports `nav: Array<{ label, href? , columns? }>` where `columns` is `Array<{ heading, links: Array<{ label, href }> }>`.

- [ ] **Step 1: Write the failing tests**

`src/data/events.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { events } from './events';
import { getImage } from './images';

describe('events data', () => {
  it('has all eight verticals with valid fields', () => {
    expect(events).toHaveLength(8);
    events.forEach((event) => {
      expect(event.slug).toBeTruthy();
      expect(event.label).toBeTruthy();
      expect(event.teaser.length).toBeGreaterThan(10);
      expect(event.href).toBe(`/events/${event.slug}`);
      expect(Array.isArray(event.subcategories)).toBe(true);
      expect(() => getImage(event.imageId)).not.toThrow();
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = events.map((event) => event.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

`src/data/nav.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { nav } from './nav';
import { events } from './events';

describe('nav data', () => {
  it('lists the same eight event hrefs as events.js, in the same order', () => {
    const eventsItem = nav.find((item) => item.label === 'Events');
    const navHrefs = eventsItem.columns[0].links.map((link) => link.href);
    const eventHrefs = events.map((event) => event.href);
    expect(navHrefs).toEqual(eventHrefs);
  });

  it('includes a Home link and a Contact link', () => {
    expect(nav.find((item) => item.label === 'Home').href).toBe('/');
    expect(nav.find((item) => item.label === 'Contact').href).toBe('/#contact');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './events'` / `'./nav'`

- [ ] **Step 3: Implement events.js**

`src/data/events.js`:

```js
export const events = [
  {
    slug: 'weddings',
    label: 'Weddings',
    imageId: 'vertical-weddings',
    teaser: 'Our flagship — every ritual, from Haldi to Reception, planned and styled as one seamless story.',
    href: '/events/weddings',
    subcategories: [],
  },
  {
    slug: 'corporate-events',
    label: 'Corporate Events',
    imageId: 'vertical-corporate',
    teaser: 'Conferences, launches and annual functions, produced with the same precision as a wedding.',
    href: '/events/corporate-events',
    subcategories: [],
  },
  {
    slug: 'social-celebrations',
    label: 'Social Celebrations',
    imageId: 'vertical-social',
    teaser: 'Anniversaries, engagements and private parties, styled for the people actually in the room.',
    href: '/events/social-celebrations',
    subcategories: [],
  },
  {
    slug: 'kids-family',
    label: 'Kids & Family',
    imageId: 'vertical-kids-family',
    teaser: 'Birthdays, baby showers and Annaprashan — themed properly, not generically.',
    href: '/events/kids-family',
    subcategories: [],
  },
  {
    slug: 'live-entertainment',
    label: 'Live & Entertainment',
    imageId: 'vertical-entertainment',
    teaser: 'Dhol, DJs, anchors and performers, booked and briefed as part of your actual event plan.',
    href: '/events/live-entertainment',
    subcategories: [],
  },
  {
    slug: 'decor-design',
    label: 'Décor & Design',
    imageId: 'vertical-decor',
    teaser: 'Mandap, stage, floral and lighting design, built specifically for your venue and colours.',
    href: '/events/decor-design',
    subcategories: [],
  },
  {
    slug: 'special-cultural',
    label: 'Special & Cultural',
    imageId: 'vertical-cultural',
    teaser: 'Diwali, Navratri, Holi and other cultural celebrations, styled with the right traditions.',
    href: '/events/special-cultural',
    subcategories: [],
  },
  {
    slug: 'destination-events',
    label: 'Destination Events',
    imageId: 'vertical-destination',
    teaser: 'Outstation and destination celebrations, planned remotely and executed on-site.',
    href: '/events/destination-events',
    subcategories: [],
  },
];
```

- [ ] **Step 4: Implement nav.js**

`src/data/nav.js`:

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
  { label: 'Contact', href: '/#contact' },
];
```

Building `nav.js`'s links directly from `events.js` (rather than hand-duplicating them) is what makes the order-consistency test in Step 1 hold by construction.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/events.js src/data/nav.js src/data/events.test.js src/data/nav.test.js
git commit -m "feat: add nav and events data covering all eight verticals"
```

---

### Task 5: Primitive components — SectionHeading, EditorialGrid, EventCard

**Files:**
- Create: `src/components/SectionHeading.jsx`, `src/components/EditorialGrid.jsx`, `src/components/EventCard.jsx`
- Test: `src/components/SectionHeading.test.jsx`, `src/components/EditorialGrid.test.jsx`, `src/components/EventCard.test.jsx`

**Interfaces:**
- Consumes: `getImage` (Task 3), `events` shape (Task 4).
- Produces: `SectionHeading({ eyebrow?, title, description?, align? })`. `EditorialGrid({ children, columns? })`. `EventCard({ event })` — wraps a react-router `Link`.

- [ ] **Step 1: Write the failing tests**

`src/components/SectionHeading.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders eyebrow, title and description', () => {
    render(<SectionHeading eyebrow="What we plan" title="Every celebration" description="One team." />);
    expect(screen.getByText('What we plan')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Every celebration' })).toBeInTheDocument();
    expect(screen.getByText('One team.')).toBeInTheDocument();
  });
});
```

`src/components/EditorialGrid.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EditorialGrid from './EditorialGrid';

describe('EditorialGrid', () => {
  it('renders all of its children', () => {
    render(
      <EditorialGrid>
        <p>One</p>
        <p>Two</p>
      </EditorialGrid>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});
```

`src/components/EventCard.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from './EventCard';
import { events } from '../data/events';

describe('EventCard', () => {
  it('renders the event label, teaser, image alt text and links to the event href', () => {
    const event = events[0];
    render(
      <MemoryRouter>
        <EventCard event={event} />
      </MemoryRouter>
    );
    expect(screen.getByText(event.label)).toBeInTheDocument();
    expect(screen.getByText(event.teaser)).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', event.href);
    expect(screen.getByRole('img').getAttribute('alt').length).toBeGreaterThan(10);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the three components**

`src/components/SectionHeading.jsx`:

```jsx
export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-charcoal/70">{description}</p>}
    </div>
  );
}
```

`src/components/EditorialGrid.jsx`:

```jsx
const COLUMN_CLASSES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export default function EditorialGrid({ children, columns = 4 }) {
  const colsClass = COLUMN_CLASSES[columns] || COLUMN_CLASSES[4];
  return <div className={`grid grid-cols-1 gap-8 ${colsClass}`}>{children}</div>;
}
```

`src/components/EventCard.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { getImage } from '../data/images';

export default function EventCard({ event }) {
  const image = getImage(event.imageId);
  return (
    <Link to={event.href} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-neutral">
        <img
          src={image.url}
          alt={image.altText}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal">{event.label}</h3>
      <p className="mt-1 text-sm text-charcoal/70">{event.teaser}</p>
    </Link>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionHeading.jsx src/components/EditorialGrid.jsx src/components/EventCard.jsx src/components/SectionHeading.test.jsx src/components/EditorialGrid.test.jsx src/components/EventCard.test.jsx
git commit -m "feat: add SectionHeading, EditorialGrid and EventCard primitives"
```

---

### Task 6: MegaMenu and MobileDrawer

**Files:**
- Create: `src/components/MegaMenu.jsx`, `src/components/MobileDrawer.jsx`
- Test: `src/components/MegaMenu.test.jsx`, `src/components/MobileDrawer.test.jsx`

**Interfaces:**
- Consumes: `nav` shape from `nav.js` (Task 4).
- Produces: `MegaMenu({ items })` (desktop, ≥1024px via `hidden lg:flex`). `MobileDrawer({ items, isOpen, onClose })` (mobile, `lg:hidden`, renders `null` when `isOpen` is false).

- [ ] **Step 1: Write the failing tests**

`src/components/MegaMenu.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { nav } from '../data/nav';

describe('MegaMenu', () => {
  it('shows all eight event links after opening the Events dropdown', () => {
    render(
      <MemoryRouter>
        <MegaMenu items={nav} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Events' }));
    const eventsItem = nav.find((item) => item.label === 'Events');
    eventsItem.columns[0].links.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });

  it('renders plain items (no columns) as direct links', () => {
    render(
      <MemoryRouter>
        <MegaMenu items={nav} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });
});
```

`src/components/MobileDrawer.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import { nav } from '../data/nav';

describe('MobileDrawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen={false} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the same eight event links as the desktop menu after expanding Events', () => {
    render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen onClose={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Events' }));
    const eventsItem = nav.find((item) => item.label === 'Events');
    eventsItem.columns[0].links.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement MegaMenu**

`src/components/MegaMenu.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MegaMenu({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {items.map((item, index) => {
        const hasColumns = Array.isArray(item.columns) && item.columns.length > 0;
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasColumns && setOpenIndex(index)}
            onMouseLeave={() => hasColumns && setOpenIndex(null)}
          >
            {hasColumns ? (
              <button
                type="button"
                className="font-sans text-sm uppercase tracking-wide text-ivory"
                aria-expanded={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.label}
              </button>
            ) : (
              <Link to={item.href} className="font-sans text-sm uppercase tracking-wide text-ivory">
                {item.label}
              </Link>
            )}
            {hasColumns && openIndex === index && (
              <div className="absolute left-0 top-full z-20 min-w-[20rem] gap-6 bg-ivory p-8 shadow-xl">
                {item.columns.map((column) => (
                  <div key={column.heading}>
                    <p className="text-xs uppercase tracking-widest text-charcoal/50">
                      {column.heading}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link to={link.href} className="text-charcoal hover:text-gold">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Implement MobileDrawer**

`src/components/MobileDrawer.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileDrawer({ items, isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 bg-ivory lg:hidden">
      <div className="flex justify-end p-4">
        <button type="button" onClick={onClose} aria-label="Close menu" className="text-charcoal">
          Close
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-6">
        {items.map((item, index) => {
          const hasColumns = Array.isArray(item.columns) && item.columns.length > 0;
          return (
            <div key={item.label} className="border-b border-charcoal/10 py-4">
              {hasColumns ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between font-display text-xl text-charcoal"
                    aria-expanded={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {item.label}
                  </button>
                  {openIndex === index && (
                    <ul className="mt-3 space-y-2 pl-4">
                      {item.columns
                        .flatMap((column) => column.links)
                        .map((link) => (
                          <li key={link.href}>
                            <Link to={link.href} onClick={onClose} className="text-charcoal/80">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.href} onClick={onClose} className="font-display text-xl text-charcoal">
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/MegaMenu.jsx src/components/MobileDrawer.jsx src/components/MegaMenu.test.jsx src/components/MobileDrawer.test.jsx
git commit -m "feat: add desktop MegaMenu and MobileDrawer sharing one nav data source"
```

---

### Task 7: Navbar and Footer

**Files:**
- Create: `src/components/Navbar.jsx`, `src/components/Footer.jsx`
- Test: `src/components/Navbar.test.jsx`, `src/components/Footer.test.jsx`

**Interfaces:**
- Consumes: `MegaMenu`, `MobileDrawer` (Task 6), `nav` (Task 4), `contact.js` exports (Task 2), `src/assets/brand/logo.png` (Task 1).
- Produces: `Navbar` default export (no props). `Footer` default export (no props).

- [ ] **Step 1: Write the failing tests**

`src/components/Navbar.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the real logo with brand alt text and a Home link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Next Level Events')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next Level Events/ })).toHaveAttribute('href', '/');
  });

  it('has a menu button that opens the mobile drawer', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    menuButton.click();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });
});
```

`src/components/Footer.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { PHONE_TEL, EMAIL, MAP_URL, SOCIALS } from '../data/contact';

describe('Footer', () => {
  it('renders working links for phone, email, map and every social channel', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /\+91/ })).toHaveAttribute('href', PHONE_TEL);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SOCIALS.instagram);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', SOCIALS.facebook);
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', SOCIALS.youtube);
    expect(screen.getAllByRole('link', { name: /Ranchi/ })[0]).toHaveAttribute('href', MAP_URL);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement Navbar**

`src/components/Navbar.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import { nav } from '../data/nav';
import logo from '../assets/brand/logo.png';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-charcoal">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Next Level Events" className="h-10 w-10 rounded-full lg:h-12 lg:w-12" />
          <span className="font-display text-xl text-ivory lg:text-2xl">Next Level Events</span>
        </Link>
        <MegaMenu items={nav} />
        <button
          type="button"
          className="text-ivory lg:hidden"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          Menu
        </button>
      </div>
      <MobileDrawer items={nav} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
```

Note: `MobileDrawer`'s close button has `aria-label="Close menu"` — matching the Navbar test's expectation of that exact accessible name once opened.

- [ ] **Step 4: Update MobileDrawer's close button label to match**

In `src/components/MobileDrawer.jsx`, change:

```jsx
<button type="button" onClick={onClose} aria-label="Close menu" className="text-charcoal">
```

(This aligns the aria-label with `aria-label="Close menu"` used by the Navbar test — if Task 6 already used this exact label, no change is needed; confirm before editing.)

- [ ] **Step 5: Implement Footer**

`src/components/Footer.jsx`:

```jsx
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL, SOCIALS } from '../data/contact';
import logo from '../assets/brand/logo.png';

export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-16 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <img src={logo} alt="Next Level Events" className="h-14 w-14 rounded-full" />
          <p className="mt-4 font-display text-2xl">Next Level Events</p>
          <p className="mt-2 text-sm text-ivory/70">
            Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Follow</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.jsx src/components/Footer.jsx src/components/Navbar.test.jsx src/components/Footer.test.jsx
git commit -m "feat: add Navbar and Footer with real logo and verified contact links"
```

---

### Task 8: Routing shell and EventCategoryStub

**Files:**
- Create: `src/pages/EventCategoryStub.jsx`
- Create: `src/AppRoutes.jsx`
- Modify: `src/App.jsx` (replace the Task 1 placeholder)
- Test: `src/pages/EventCategoryStub.test.jsx`, `src/AppRoutes.test.jsx`, `src/App.test.jsx` (replace Task 1's version)

**Interfaces:**
- Consumes: `events` (Task 4), `getImage` (Task 3), `WhatsAppCTA` (Task 2), `Navbar`/`Footer` (Task 7). `Home` (produced in Task 12 — until then, `AppRoutes` references a temporary inline placeholder for `/`, replaced in Task 12).
- Produces: `AppRoutes` default export (router-agnostic, for testing with `MemoryRouter`). `App` default export (wraps `AppRoutes` in `BrowserRouter` plus `Navbar`/`Footer`). `EventCategoryStub` default export (reads `:slug` from `useParams`, also used as the catch-all 404 route since an unmatched slug naturally falls into its "not found" branch).

- [ ] **Step 1: Write the failing tests**

`src/pages/EventCategoryStub.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EventCategoryStub from './EventCategoryStub';
import { events } from '../data/events';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:slug" element={<EventCategoryStub />} />
        <Route path="*" element={<EventCategoryStub />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EventCategoryStub', () => {
  it('renders the matching event\'s heading, teaser, WhatsApp CTA and links to every other vertical', () => {
    renderAt('/events/weddings');
    expect(screen.getByRole('heading', { name: 'Weddings' })).toBeInTheDocument();
    expect(screen.getByText(events[0].teaser)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Enquire on WhatsApp' });
    expect(cta.getAttribute('href')).toContain('917903133317');
    expect(cta.getAttribute('href')).toContain(encodeURIComponent('weddings'));
    events
      .filter((event) => event.slug !== 'weddings')
      .forEach((event) => {
        expect(screen.getByRole('link', { name: event.label })).toHaveAttribute('href', event.href);
      });
  });

  it('shows a working fallback, not a dead end, for an unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });
});
```

`src/AppRoutes.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  it('routes /events/:slug to the category stub', () => {
    render(
      <MemoryRouter initialEntries={['/events/corporate-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
  });
});
```

`src/App.test.jsx` (replaces Task 1's version):

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Navbar, a homepage placeholder, and the Footer together', () => {
    render(<App />);
    expect(screen.getAllByAltText('Next Level Events').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './pages/EventCategoryStub'` / `'./AppRoutes'`; `App` test fails because the placeholder has no Navbar/Footer.

- [ ] **Step 3: Implement EventCategoryStub**

`src/pages/EventCategoryStub.jsx`:

```jsx
import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';

export default function EventCategoryStub() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
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

  const image = getImage(event.imageId);
  const others = events.filter((item) => item.slug !== event.slug);

  return (
    <div>
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-12 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Next Level Events</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{event.label}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg text-charcoal/80">{event.teaser}</p>
        <p className="mt-6 text-charcoal/70">
          Our full {event.label.toLowerCase()} experience — the specific rituals, décor and planning
          we handle — is being added to the site in the next phase. In the meantime, tell us what
          you're planning and our team will respond directly.
        </p>
        <WhatsAppCTA
          message={`Hi, I'm interested in planning ${event.label.toLowerCase()} with Next Level Events.`}
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
        <div className="mt-16">
          <p className="text-sm uppercase tracking-widest text-charcoal/50">Related experiences</p>
          <ul className="mt-4 flex flex-wrap gap-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link to={item.href} className="text-charcoal underline hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement AppRoutes with a temporary Home placeholder**

`src/AppRoutes.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom';
import EventCategoryStub from './pages/EventCategoryStub';

function HomePlaceholder() {
  return <div className="px-6 py-24 text-center">Homepage — arriving in Task 12.</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/events/:slug" element={<EventCategoryStub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
```

- [ ] **Step 5: Implement App**

`src/App.jsx`:

```jsx
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/pages/EventCategoryStub.jsx src/AppRoutes.jsx src/App.jsx src/pages/EventCategoryStub.test.jsx src/AppRoutes.test.jsx src/App.test.jsx
git commit -m "feat: add routing shell and EventCategoryStub so every event link resolves"
```

---

### Task 9: Homepage sections Phase 1 owns — Hero, BrandIntro, EventDiscovery

**Files:**
- Create: `src/components/home/Hero.jsx`, `src/components/home/BrandIntro.jsx`, `src/components/home/EventDiscovery.jsx`
- Test: `src/components/home/Hero.test.jsx`, `src/components/home/BrandIntro.test.jsx`, `src/components/home/EventDiscovery.test.jsx`

**Interfaces:**
- Consumes: `getImage` (Task 3), `WhatsAppCTA` (Task 2), `SectionHeading`/`EditorialGrid`/`EventCard` (Task 5), `events` (Task 4).
- Produces: `Hero`, `BrandIntro`, `EventDiscovery` default exports, no props (each reads its own data).

- [ ] **Step 1: Write the failing tests**

`src/components/home/Hero.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the headline and a working WhatsApp CTA', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { name: /Every celebration, planned/i })
    ).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Plan Your Event' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
```

`src/components/home/BrandIntro.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BrandIntro from './BrandIntro';

describe('BrandIntro', () => {
  it('renders the studio introduction heading', () => {
    render(<BrandIntro />);
    expect(screen.getByRole('heading', { name: /A Ranchi studio/i })).toBeInTheDocument();
  });
});
```

`src/components/home/EventDiscovery.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventDiscovery from './EventDiscovery';
import { events } from '../../data/events';

describe('EventDiscovery', () => {
  it('renders a card linking to every one of the eight verticals', () => {
    render(
      <MemoryRouter>
        <EventDiscovery />
      </MemoryRouter>
    );
    events.forEach((event) => {
      expect(screen.getByRole('link', { name: new RegExp(event.label) })).toHaveAttribute(
        'href',
        event.href
      );
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement Hero**

`src/components/home/Hero.jsx`:

```jsx
import { getImage } from '../../data/images';
import WhatsAppCTA from '../WhatsAppCTA';

export default function Hero() {
  const image = getImage('hero-home');
  return (
    <section className="relative flex h-[90vh] min-h-[560px] items-end overflow-hidden bg-charcoal">
      <img
        src={image.url}
        alt={image.altText}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-ivory md:px-16">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Ranchi, Jharkhand</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
          Every celebration, planned like it's the only one that matters.
        </h1>
        <p className="mt-6 max-w-xl text-ivory/80">
          Next Level Events plans and produces weddings, birthdays, corporate events and
          celebrations of every kind, end to end, across Ranchi and Jharkhand.
        </p>
        <WhatsAppCTA
          message="Hi, I'd like to know more about planning my event with Next Level Events."
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Plan Your Event
        </WhatsAppCTA>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement BrandIntro**

`src/components/home/BrandIntro.jsx`:

```jsx
import SectionHeading from '../SectionHeading';

export default function BrandIntro() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <SectionHeading
        eyebrow="Who we are"
        title="A Ranchi studio built around one idea: your event, done properly."
        description="Next Level Events plans weddings, birthdays, corporate events and celebrations across Ranchi and Jharkhand — coordinating décor, planning and execution as one team, not a chain of vendors."
        align="center"
      />
    </section>
  );
}
```

- [ ] **Step 5: Implement EventDiscovery**

`src/components/home/EventDiscovery.jsx`:

```jsx
import SectionHeading from '../SectionHeading';
import EditorialGrid from '../EditorialGrid';
import EventCard from '../EventCard';
import { events } from '../../data/events';

export default function EventDiscovery() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="What we plan"
        title="Every kind of celebration, one team."
        description="Explore by occasion to see what we handle, how it's styled, and what's included."
      />
      <div className="mt-12">
        <EditorialGrid columns={4}>
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </EditorialGrid>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/home/Hero.jsx src/components/home/BrandIntro.jsx src/components/home/EventDiscovery.jsx src/components/home/Hero.test.jsx src/components/home/BrandIntro.test.jsx src/components/home/EventDiscovery.test.jsx
git commit -m "feat: add Hero, BrandIntro and EventDiscovery homepage sections"
```

---

### Task 10: Homepage sections Phase 1 owns — ServicesCapabilities, HowWeWork, FinalCTA, ContactSection

**Files:**
- Create: `src/components/home/ServicesCapabilities.jsx`, `src/components/home/HowWeWork.jsx`, `src/components/home/FinalCTA.jsx`, `src/components/home/ContactSection.jsx`
- Test: matching `.test.jsx` files for each

**Interfaces:**
- Consumes: `SectionHeading` (Task 5), `WhatsAppCTA` (Task 2), `contact.js` exports (Task 2).
- Produces: four default exports, no props. `ServicesCapabilities` renders `id="services"`, `HowWeWork` renders `id="how-we-work"`, `ContactSection` renders `id="contact"` — these anchor ids are what the Task 11 teasers and the nav's `/#contact` link target.

- [ ] **Step 1: Write the failing tests**

`src/components/home/ServicesCapabilities.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesCapabilities from './ServicesCapabilities';

describe('ServicesCapabilities', () => {
  it('renders all six capabilities and the #services anchor', () => {
    const { container } = render(<ServicesCapabilities />);
    expect(container.querySelector('#services')).toBeInTheDocument();
    [
      'Venue Coordination',
      'Décor & Styling',
      'Photography & Films',
      'Entertainment & Artists',
      'Catering Coordination',
      'Full-Day Execution',
    ].forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });
  });
});
```

`src/components/home/HowWeWork.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowWeWork from './HowWeWork';

describe('HowWeWork', () => {
  it('renders the four steps in order and the #how-we-work anchor', () => {
    const { container } = render(<HowWeWork />);
    expect(container.querySelector('#how-we-work')).toBeInTheDocument();
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(['Consult', 'Design', 'Coordinate', 'Execute']);
  });
});
```

`src/components/home/FinalCTA.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FinalCTA from './FinalCTA';

describe('FinalCTA', () => {
  it('renders the closing heading and a working WhatsApp CTA', () => {
    render(<FinalCTA />);
    expect(screen.getByRole('heading', { name: /Let's plan something/i })).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Start Planning on WhatsApp' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
```

`src/components/home/ContactSection.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';
import { PHONE_TEL, EMAIL, MAP_URL } from '../../data/contact';

describe('ContactSection', () => {
  it('renders the #contact anchor and working phone/email/map/WhatsApp links', () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+91/ })).toHaveAttribute('href', PHONE_TEL);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: /Ranchi/ })).toHaveAttribute('href', MAP_URL);
    expect(screen.getByRole('link', { name: 'Message Us on WhatsApp' }).getAttribute('href')).toContain(
      '917903133317'
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement ServicesCapabilities**

`src/components/home/ServicesCapabilities.jsx`:

```jsx
import SectionHeading from '../SectionHeading';

const capabilities = [
  {
    title: 'Venue Coordination',
    description: 'We work with your chosen venue (or help you pick one) and manage every logistic around it.',
  },
  {
    title: 'Décor & Styling',
    description: 'Mandap, stage, floral and lighting design, styled specifically for your event, not a stock template.',
  },
  {
    title: 'Photography & Films',
    description: 'Candid, traditional and cinematic coverage coordinated as part of the same day, not a separate booking.',
  },
  {
    title: 'Entertainment & Artists',
    description: 'Dhol, DJs, anchors and performers, briefed and scheduled around your actual run-of-show.',
  },
  {
    title: 'Catering Coordination',
    description: 'We coordinate menus, staffing and service timing with your caterer of choice.',
  },
  {
    title: 'Full-Day Execution',
    description: "A dedicated on-site team runs the event itself, so you're a guest at your own celebration.",
  },
];

export default function ServicesCapabilities() {
  return (
    <section id="services" className="bg-neutral px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="What we handle" title="We plan the event, not just the décor." />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-2 text-charcoal/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement HowWeWork**

`src/components/home/HowWeWork.jsx`:

```jsx
import SectionHeading from '../SectionHeading';

const steps = [
  { step: '01', title: 'Consult', description: 'Tell us the occasion, date and city — on a call or over WhatsApp.' },
  { step: '02', title: 'Design', description: 'We propose a décor and planning approach specific to your event.' },
  { step: '03', title: 'Coordinate', description: 'Venue, vendors, catering and entertainment, managed as one plan.' },
  { step: '04', title: 'Execute', description: 'Our team runs the day itself, start to finish.' },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="How we work" title="From first message to the last dance." />
      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <div key={item.step}>
            <p className="font-display text-4xl text-gold">{item.step}</p>
            <h3 className="mt-2 font-display text-xl text-charcoal">{item.title}</h3>
            <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement FinalCTA**

`src/components/home/FinalCTA.jsx`:

```jsx
import WhatsAppCTA from '../WhatsAppCTA';

export default function FinalCTA() {
  return (
    <section className="bg-charcoal px-6 py-24 text-center text-ivory">
      <h2 className="mx-auto max-w-2xl font-display text-4xl md:text-5xl">
        Let's plan something worth remembering.
      </h2>
      <WhatsAppCTA
        message="Hi, I'd like to start planning my event with Next Level Events."
        className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
      >
        Start Planning on WhatsApp
      </WhatsAppCTA>
    </section>
  );
}
```

- [ ] **Step 6: Implement ContactSection**

`src/components/home/ContactSection.jsx`:

```jsx
import SectionHeading from '../SectionHeading';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL } from '../../data/contact';
import WhatsAppCTA from '../WhatsAppCTA';

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Get in touch" title="Tell us about your event." align="center" />
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <a href={PHONE_TEL} className="text-lg text-charcoal">
          {PHONE_DISPLAY}
        </a>
        <a href={`mailto:${EMAIL}`} className="text-lg text-charcoal">
          {EMAIL}
        </a>
        <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-charcoal/70">
          {ADDRESS}
        </a>
        <WhatsAppCTA
          message="Hi, I'd like to know more about planning my event with Next Level Events."
          className="mt-4 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Message Us on WhatsApp
        </WhatsAppCTA>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/home/ServicesCapabilities.jsx src/components/home/HowWeWork.jsx src/components/home/FinalCTA.jsx src/components/home/ContactSection.jsx src/components/home/ServicesCapabilities.test.jsx src/components/home/HowWeWork.test.jsx src/components/home/FinalCTA.test.jsx src/components/home/ContactSection.test.jsx
git commit -m "feat: add ServicesCapabilities, HowWeWork, FinalCTA and ContactSection"
```

---

### Task 11: Teaser data and SectionTeaser component

**Files:**
- Create: `src/data/homeTeasers.js`
- Create: `src/components/home/SectionTeaser.jsx`
- Test: `src/data/homeTeasers.test.js`, `src/components/home/SectionTeaser.test.jsx`

**Interfaces:**
- Consumes: `getImage` (Task 3).
- Produces: `homeTeasers: Array<{ id, imageId, eyebrow, title, description, ctaLabel, href }>` (7 entries — one per later-phase-owned homepage section). `SectionTeaser({ teaser })`.

- [ ] **Step 1: Write the failing tests**

`src/data/homeTeasers.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { homeTeasers } from './homeTeasers';
import { getImage } from './images';

describe('homeTeasers', () => {
  it('has exactly seven entries, one per later-phase homepage section', () => {
    expect(homeTeasers).toHaveLength(7);
  });

  it('has a resolvable image, a real href, and non-empty copy for every teaser', () => {
    homeTeasers.forEach((teaser) => {
      expect(() => getImage(teaser.imageId)).not.toThrow();
      expect(teaser.href.length).toBeGreaterThan(0);
      expect(teaser.title.length).toBeGreaterThan(10);
      expect(teaser.description.length).toBeGreaterThan(20);
    });
  });

  it('has no duplicated title or description across teasers', () => {
    const titles = homeTeasers.map((t) => t.title);
    const descriptions = homeTeasers.map((t) => t.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});
```

`src/components/home/SectionTeaser.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SectionTeaser from './SectionTeaser';

const internalTeaser = {
  id: 'sample-internal',
  imageId: 'vertical-weddings',
  eyebrow: 'The flagship experience',
  title: 'Sample internal teaser title',
  description: 'Sample internal teaser description text long enough to pass validation.',
  ctaLabel: 'Explore Weddings',
  href: '/events/weddings',
};

const externalTeaser = {
  ...internalTeaser,
  id: 'sample-external',
  ctaLabel: 'Follow on Instagram',
  href: 'https://www.instagram.com/nextlevelevents.in',
};

describe('SectionTeaser', () => {
  it('renders an internal teaser as a router Link', () => {
    render(
      <MemoryRouter>
        <SectionTeaser teaser={internalTeaser} />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Explore Weddings' });
    expect(cta).toHaveAttribute('href', '/events/weddings');
  });

  it('renders an external teaser as a plain link opening in a new tab', () => {
    render(
      <MemoryRouter>
        <SectionTeaser teaser={externalTeaser} />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Follow on Instagram' });
    expect(cta).toHaveAttribute('href', 'https://www.instagram.com/nextlevelevents.in');
    expect(cta).toHaveAttribute('target', '_blank');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement homeTeasers.js**

`src/data/homeTeasers.js`:

```js
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
    imageId: 'vertical-decor',
    eyebrow: 'Real events, real moments',
    title: 'Our real work, coming to this page soon.',
    description:
      'A filterable gallery of genuine Next Level Events work is being built next — no stock photography, no fabricated reviews.',
    ctaLabel: 'Talk to Us Meanwhile',
    href: '/#contact',
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
    imageId: 'vertical-entertainment',
    eyebrow: 'Behind the event',
    title: 'The planning you never see on the day.',
    description:
      'Site recce, setup and execution — the real process behind the celebration — arrives in a later phase.',
    ctaLabel: 'How We Work',
    href: '/#how-we-work',
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
    imageId: 'vertical-social',
    eyebrow: 'On Instagram & YouTube',
    title: 'Follow the real work as it happens.',
    description: 'Reels, films and behind-the-scenes footage from real Next Level Events celebrations.',
    ctaLabel: 'Follow on Instagram',
    href: 'https://www.instagram.com/nextlevelevents.in',
  },
];
```

- [ ] **Step 4: Implement SectionTeaser**

`src/components/home/SectionTeaser.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { getImage } from '../../data/images';

export default function SectionTeaser({ teaser }) {
  const image = getImage(teaser.imageId);
  const isExternal = teaser.href.startsWith('http');

  const cta = isExternal ? (
    <a
      href={teaser.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-block text-gold underline"
    >
      {teaser.ctaLabel}
    </a>
  ) : (
    <Link to={teaser.href} className="mt-6 inline-block text-gold underline">
      {teaser.ctaLabel}
    </Link>
  );

  return (
    <section className="grid grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-16">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image.url} alt={image.altText} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-gold">{teaser.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">{teaser.title}</h2>
        <p className="mt-4 text-charcoal/70">{teaser.description}</p>
        {cta}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/homeTeasers.js src/components/home/SectionTeaser.jsx src/data/homeTeasers.test.js src/components/home/SectionTeaser.test.jsx
git commit -m "feat: add homeTeasers data and generic SectionTeaser component"
```

---

### Task 12: Home page composition

**Files:**
- Create: `src/pages/Home.jsx`
- Modify: `src/AppRoutes.jsx` (replace `HomePlaceholder` with real `Home`)
- Modify: `src/App.test.jsx` (update to reflect the real Home content)
- Test: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `Hero`, `BrandIntro`, `EventDiscovery` (Task 9); `ServicesCapabilities`, `HowWeWork`, `FinalCTA`, `ContactSection` (Task 10); `SectionTeaser`, `homeTeasers` (Task 11).
- Produces: `Home` default export, no props, rendering the 14 Phase-1 homepage sections (the 15th, Footer, is already global via `App.jsx`).

- [ ] **Step 1: Write the failing test**

`src/pages/Home.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders all fourteen sections in the brief\'s specified order', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Query h1/h2 directly off the DOM (not two separate getAllByRole calls)
    // so order reflects the actual document order, not query order.
    const headingText = Array.from(container.querySelectorAll('h1, h2')).map(
      (h) => h.textContent
    );

    const expectedOrder = [
      "Every celebration, planned like it's the only one that matters.", // Hero
      'A Ranchi studio built around one idea: your event, done properly.', // BrandIntro
      'Every kind of celebration, one team.', // EventDiscovery
      'Weddings, planned as one continuous story.', // Weddings flagship teaser
      'Our real work, coming to this page soon.', // Real Events teaser
      'Ideas for every ritual and celebration.', // Inspiration teaser
      'We plan the event, not just the décor.', // ServicesCapabilities
      'From bare venue to finished celebration.', // Transformation teaser
      'The planning you never see on the day.', // Behind the Event teaser
      'From first message to the last dance.', // HowWeWork
      'Ranchi first, and beyond on request.', // Locations teaser
      'Follow the real work as it happens.', // Social/Video teaser
      "Let's plan something worth remembering.", // FinalCTA
      'Tell us about your event.', // ContactSection
    ];

    expect(headingText).toEqual(expectedOrder);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './Home'`

- [ ] **Step 3: Implement Home**

`src/pages/Home.jsx`:

```jsx
import Hero from '../components/home/Hero';
import BrandIntro from '../components/home/BrandIntro';
import EventDiscovery from '../components/home/EventDiscovery';
import SectionTeaser from '../components/home/SectionTeaser';
import ServicesCapabilities from '../components/home/ServicesCapabilities';
import HowWeWork from '../components/home/HowWeWork';
import FinalCTA from '../components/home/FinalCTA';
import ContactSection from '../components/home/ContactSection';
import { homeTeasers } from '../data/homeTeasers';

const teaserById = Object.fromEntries(homeTeasers.map((teaser) => [teaser.id, teaser]));

export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <EventDiscovery />
      <SectionTeaser teaser={teaserById['weddings-flagship']} />
      <SectionTeaser teaser={teaserById['real-events']} />
      <SectionTeaser teaser={teaserById['inspiration']} />
      <ServicesCapabilities />
      <SectionTeaser teaser={teaserById['transformation']} />
      <SectionTeaser teaser={teaserById['behind-the-event']} />
      <HowWeWork />
      <SectionTeaser teaser={teaserById['locations']} />
      <SectionTeaser teaser={teaserById['social-video']} />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 4: Wire Home into AppRoutes**

In `src/AppRoutes.jsx`, replace the `HomePlaceholder` function and its usage:

```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:slug" element={<EventCategoryStub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
```

- [ ] **Step 5: Update App.test.jsx's assertion for real Home content**

In `src/App.test.jsx`, the existing assertions (Navbar logo, Footer `contentinfo` role) already hold with the real `Home` in place — no change needed. Re-run the full suite in the next step to confirm.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all suites, including `Home.test.jsx`, `AppRoutes.test.jsx`, `App.test.jsx`)

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx src/AppRoutes.jsx src/pages/Home.test.jsx
git commit -m "feat: compose the full 14-section homepage in the brief's specified order"
```

---

### Task 13: Cross-phase QA gate and responsive pass

**Files:**
- Modify: any file touched below where an issue is found
- No new automated tests — this task is the spec's manual verification pass (spec: Testing/Verification, Cross-phase QA gate)

**Interfaces:** none — verification only.

- [ ] **Step 1: Run the full automated suite one more time**

Run: `npm test`
Expected: PASS — every test from Tasks 1–12 green.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

Open the printed local URL in a browser.

- [ ] **Step 3: Check responsive breakpoints on the homepage and one stub page**

Using browser devtools device widths (or manually resizing), check the homepage (`/`) and `/events/weddings` at: 375, 390, 412, 768, 1024, 1280, 1440, 1600px.

At each width, confirm:
- No horizontal scrollbar/overflow
- No clipped text in the Hero, Navbar, or Footer
- The logo and "Next Level Events" wordmark are readable in the Navbar
- Below 1024px, the desktop `MegaMenu` is hidden and the hamburger button + `MobileDrawer` work instead
- At ≥1024px, hovering "Events" opens the dropdown without it clipping off-screen

Fix any issue found directly in the relevant component file (`Navbar.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`, `Hero.jsx`, or the Tailwind classes involved).

- [ ] **Step 4: Crawl every interactive element added in Phase 1**

On the homepage, click through, in order: the Navbar logo, every MegaMenu link (desktop) and every MobileDrawer link (mobile view), all 8 `EventCard`s in Event Discovery, all 7 `SectionTeaser` CTAs, the `FinalCTA` WhatsApp button, and every link in `ContactSection` and `Footer`.

Confirm for each one:
- It navigates to a real route or opens a real external link (WhatsApp/Instagram/Facebook/YouTube/tel/mailto/map) — nothing 404s or does nothing
- No fabricated statistic, review, rating, or client count appears anywhere on the page
- Every image shown has a corresponding `manifest.json` entry (cross-check against the table in this plan's header)

On an `EventCategoryStub` page, confirm the "Related experiences" links all resolve, and confirm visiting a nonsense URL (e.g. `/nonsense`) shows the fallback with a working "Back to Home" link rather than a blank page.

- [ ] **Step 5: Fix anything found and commit**

If Steps 3 or 4 surfaced any fix, stage exactly the files changed and commit:

```bash
git add -A
git commit -m "fix: address issues found in the Phase 1 cross-phase QA gate"
```

If nothing needed fixing, no commit is required for this task — the automated suite from Step 1 is the record that Phase 1 is complete.

---

## Self-Review Notes

- **Spec coverage:** Brand system (Task 1), nav/mega-menu/drawer (Tasks 4, 6, 7), contact/WhatsApp (Task 2), image manifest (Task 3), events data with reserved `subcategories` (Task 4), `EventCategoryStub` honoring the Experience content contract's items 1/2/6 (Task 8), full 14-section homepage in brief order plus global Footer (Tasks 9–12), cross-phase QA gate (Task 13) — every Phase 1 scope item from the spec has a task.
- **Cultural accuracy:** all vertical images were sourced and visually verified during planning against the spec's cultural-accuracy rule; `vertical-social` is explicitly flagged in the manifest as a generic placeholder pending an Indian-specific replacement, rather than silently passing as accurate.
- **Type consistency:** `getImage(id)` (Task 3) is used with the same signature everywhere it's consumed (Tasks 5, 8, 9, 11). `WhatsAppCTA({ message, children, className })` (Task 2) keeps the same prop names in every usage (Tasks 8, 9, 10). `events` entries' field names (`slug`, `label`, `imageId`, `teaser`, `href`, `subcategories`) are identical across Tasks 4, 5, 8, 9.
