# Next Level Events — Phase 6: Final Premium QA & Optimization Design

## 1. Executive Summary & Goals

Phase 6 is the final premium QA, optimization, and production-readiness pass for the Next Level Events website. Phases 1 through 5 established the foundation, weddings flagship, remaining event verticals, real events video showcase, and the 3-level smart enquiry and Jharkhand service area model.

The objective of Phase 6 is **not** to introduce new features or redesign established systems, but to elevate the existing build to a pristine, client-presentable standard suitable for a high-end Indian event planning company based in Ranchi, Jharkhand.

### Core Objectives
1. **Pristine Visual & Responsive Coherence:** Flawless layout across standard mobile (375px, 390px, 412px), tablet (768px), and desktop (1024px, 1280px, 1440px, 1600px) viewports without text clipping, awkward word wrapping, or distorted controls.
2. **Absolute Content Truth & Honesty:** Eliminate remaining developer phasing placeholders (e.g. *"arriving in the next phase"*, *"Coming soon, honestly."*) while preserving verified real business data (Kanke Road base, 24-district Jharkhand service area, real YouTube/Instagram media, zero fake reviews/branches/awards).
3. **WCAG 2.1 AA Accessibility & Keyboard Polish:** Visible focus states (`focus-visible`), modal accessibility for the mobile drawer (`role="dialog"`, body scroll lock, Escape dismissal), and complete ARIA attributes.
4. **Production SEO & Discovery Architecture:** Polymorphic `usePageMeta` hook fixing the `document.title = undefined` bug on `/locations` and `/enquire`, dynamic metadata for all routes, `public/robots.txt`, `public/sitemap.xml`, and complete Open Graph / Twitter Card social preview tags.
5. **SPA Navigation Integrity:** Eliminate native `<a href>` full-page reloads in the footer, implement smooth top-of-page scroll resets on route changes, and ensure every CTA has an intuitive, working destination.
6. **Zero-Regression Guarantee:** 100% preservation of Phases 1–5 features and test suite integrity (171 test files / 569 tests passing baseline).

---

## 2. Business Truth & Invariants

The business location model established in Phase 5 is immutable:
- **Ranchi:** Primary Studio & Headquarters (Physical office at Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002).
- **Jharkhand:** Active service area across all 24 districts (`Bokaro`, `Chatra`, `Deoghar`, `Dhanbad`, `Dumka`, `East Singhbhum (Jamshedpur)`, `Garhwa`, `Giridih`, `Godda`, `Gumla`, `Hazaribagh`, `Jamtara`, `Khunti`, `Koderma`, `Latehar`, `Lohardaga`, `Pakur`, `Palamu`, `Ramgarh`, `Ranchi`, `Sahebganj`, `Seraikela Kharsawan`, `Simdega`, `West Singhbhum`). Secondary districts are **never** represented as physical branches or offices.
- **Outside Jharkhand:** Outstation / Destination events available on enquiry.
- **Brand Identity:** Palette consists strictly of Charcoal (`#1c1a17`), Ivory (`#faf6ef`), Neutral (`#ece4d3`), and Gold (`#c19743`). Display font is Cormorant Garamond; body font is Inter. Original recovered logo and favicons must remain intact.

---

## 3. Comprehensive Audit Findings by Area

### 3.1 Visual & Design QA
- **Typography Sizing on Mobile:** Main hero headings on Home, Weddings, and Vertical hubs currently use `text-5xl md:text-7xl`. On narrow viewports (375px), this produces isolated single-word wraps ("matters.", "story."). Refined responsive sizing (`text-3xl sm:text-5xl md:text-6xl lg:text-7xl`) provides a cleaner visual rhythm.
- **Button Styling Consistency:** In `Hero.jsx`, `ContactSection.jsx`, and `FinalCTA.jsx`, buttons lack the `hover:bg-gold/90 transition-colors` styling present in `Navbar.jsx` and `StepLocationDate.jsx`.
- **Card Transitions:** `EventCard.jsx` has an image zoom on hover (`group-hover:scale-105`), but the title heading lacks a color transition (`group-hover:text-gold transition-colors`) to signal interactivity.

### 3.2 Responsive QA (375px – 1600px)
- **StepConfirmation Dispatch Buttons:** On viewports ≤ 390px, the 4 secondary dispatch actions in `StepConfirmation.jsx` are wrapped in `flex flex-wrap gap-2 sm:gap-4` with `flex-1`. This squeezes buttons into narrow vertical slivers where text ("✓ Copied to Clipboard", "Call +91 79031 33317") wraps awkwardly. Converting to a responsive grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3`) guarantees 44px+ touch targets and readable labels.
- **Navbar Brand Text:** On ultra-narrow screens (320px–375px), `text-xl` can press against the menu button. Adjusting to `text-lg sm:text-xl lg:text-2xl` preserves single-line brand presentation.

### 3.3 Navigation & UX QA
- **Footer Internal Links:** `Footer.jsx` uses `<a href="/locations">` and `<a href="/enquire">` instead of React Router's `<Link>`. Clicking these causes a full browser reload rather than client-side routing.
- **Scroll Position on Route Change:** `ScrollToHash.jsx` currently only handles URLs with a hash (`if (!hash) return;`). Navigating from the bottom of one page to another without a hash leaves the user scrolled down at the same pixel offset. Adding `window.scrollTo(0, 0)` when no hash is present fixes scroll management across the entire site.
- **MegaMenu Dismissal:** Clicking a link within `MegaMenu.jsx` does not immediately close the menu dropdown. It should reset `openIndex(null)` on link click and on Escape keypress.

### 3.4 Smart Enquiry QA
- The 3-level location model (Ranchi, Jharkhand 24-district dropdown, Outside Jharkhand destination field) works cleanly with full validation.
- Occasion options, contextual services, timeline options, and guest count tiers are robust.
- The summary view and WhatsApp message encoding are verified.
- The only necessary fix is the responsive layout of the dispatch action buttons in `StepConfirmation.jsx` (detailed in Responsive QA).

### 3.5 Image & Media QA
- `manifest.json` contains 100% verified, culturally accurate imagery (North/South Indian, Punjabi, Bengali traditions, mandap decoration, diyas, etc.) with CC licenses or Unsplash terms.
- YouTube video facades in `RealEventsHub.jsx` are lightweight and on-demand.
- All image IDs referenced in data files are valid and tested. No broken or mismatched assets exist.

### 3.6 Content Truth Audit
- **Developer Phasing Text in `homeTeasers.js`:**
  - `weddings-flagship`: *"the full experience is arriving in the next phase."* -> Update to reflect that the full wedding experience is active and detailed at `/events/weddings`.
  - `inspiration`: *"arriving in a later phase"* -> Update to invite clients to explore themes, decor concepts, and bespoke ritual styling.
  - `transformation`: *"coming to this page once we have verified pairs to show."* -> Update to explain our approach to transforming banquet spaces and open lawns.
- **"Coming soon" in `WeddingsHub.jsx`:**
  - Section `#real-weddings` heading is *"Coming soon, honestly."* with copy *"We're building a gallery of genuine Next Level Events wedding work... Until then, see real, current work on Instagram."*
  - In Phase 4, `/real-events` was built with verified wedding videos and reels. Update heading to *"Real Wedding Celebrations"* and link directly to `/real-events` ("Watch Real Wedding Videos") in addition to Instagram.
- **`EventCategoryStub.jsx`:**
  - Line 39 says *"is being added to the site in the next phase."* -> Replace with polished fallback text for unmatched routes.

### 3.7 Accessibility QA (WCAG 2.1 AA)
- **Focus Rings:** Add visible focus rings (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`) to all buttons, links, inputs, and selectors.
- **Mobile Drawer:**
  - Add `role="dialog"`, `aria-modal="true"`, and `aria-label="Navigation Menu"`.
  - Elevate stacking context to `z-50`.
  - Implement body scroll lock (`document.body.style.overflow = 'hidden'`) when open, restored on close.
  - Implement Escape key event listener to close the drawer.

### 3.8 Performance QA
- Production JS bundle is ~401 kB uncompressed / 116 kB gzipped; CSS is 18 kB / 4.4 kB gzipped.
- No heavy third-party animation libraries or date pickers.
- Retaining static page imports maintains sub-second navigation and zero flash-of-loading artifacts in React 19.

### 3.9 SEO & Metadata QA
- **`usePageMeta` Signature Bug:** `usePageMeta.js` expects `{ title, description }`. In `Locations.jsx` and `SmartEnquiry.jsx`, it is called with `usePageMeta(title, description)`. This results in `document.title = undefined`.
  - Fix: Modify `usePageMeta.js` to accept either an object `{ title, description }` or two parameters `(title, description)`.
  - Apply `usePageMeta` across all primary pages (`Home`, `WeddingsHub`, `VerticalHub`, `ExperienceDetail`, `VerticalExperienceDetail`, `Locations`, `SmartEnquiry`, `RealEventsHub`).
- **Missing Crawl Assets:** Create `public/robots.txt` and `public/sitemap.xml` listing all verified canonical routes.
- **Social Graph Tags:** Add `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` to `index.html`.

### 3.10 Code Quality & Architecture
- Codebase is modular, cleanly decoupled, and zero `console.log` statements are present.
- All tests use Vitest and React Testing Library.
- Existing tests and assertions remain the golden standard for regression testing.

---

## 4. Architectural Specifications & Component Designs

### 4.1 Polymorphic `usePageMeta` Hook
```javascript
// src/hooks/usePageMeta.js
import { useEffect } from 'react';

export function usePageMeta(metaOrTitle, maybeDescription) {
  const { title, description } =
    typeof metaOrTitle === 'object' && metaOrTitle !== null
      ? metaOrTitle
      : { title: metaOrTitle, description: maybeDescription };

  useEffect(() => {
    if (!title && !description) return;

    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta && description) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const previousDescription = meta ? meta.getAttribute('content') : null;
    if (meta && description) {
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (createdMeta && meta) {
        meta.remove();
      } else if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
```

### 4.2 Scroll Reset Specification (`ScrollToHash.jsx`)
```javascript
// src/components/ScrollToHash.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return null;
}
```

### 4.3 Mobile Drawer Accessibility Specification (`MobileDrawer.jsx`)
```javascript
useEffect(() => {
  if (!isOpen) return;

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    document.body.style.overflow = originalOverflow;
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isOpen, onClose]);
```

### 4.4 Canonical Sitemap (`public/sitemap.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nextlevelevents.in/</loc><priority>1.0</priority></url>
  <url><loc>https://nextlevelevents.in/events/weddings</loc><priority>0.9</priority></url>
  <url><loc>https://nextlevelevents.in/real-events</loc><priority>0.9</priority></url>
  <url><loc>https://nextlevelevents.in/locations</loc><priority>0.9</priority></url>
  <url><loc>https://nextlevelevents.in/enquire</loc><priority>0.9</priority></url>
  <url><loc>https://nextlevelevents.in/events/corporate-events</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/social-celebrations</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/kids-family</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/live-entertainment</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/decor-design</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/special-cultural</loc><priority>0.8</priority></url>
  <url><loc>https://nextlevelevents.in/events/destination-events</loc><priority>0.8</priority></url>
</urlset>
```

### 4.5 Standard Robots (`public/robots.txt`)
```
User-agent: *
Allow: /
Sitemap: https://nextlevelevents.in/sitemap.xml
```

---

## 5. Verification & Testing Strategy
- Unit tests for polymorphic `usePageMeta` covering both object and direct argument forms.
- Regression testing on all existing 171 test files.
- Full production Vite build verification.
- Mobile viewport simulation across 375px, 390px, 412px, 768px, 1024px, 1280px, 1440px, 1600px.
- Zero accessibility regressions for keyboard navigation and screen readers.
