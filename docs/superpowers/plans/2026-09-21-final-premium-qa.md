# Phase 6: Final Premium QA & Optimization — Implementation Plan

> **Note:** This document outlines the planned execution for Phase 6. In accordance with the prompt instructions, **no code is modified during this planning phase.**

---

## 1. Issue Categorization & Action Plan

### Category A: Critical Issues

#### A.1 Fix `usePageMeta` Signature Mismatch & `undefined` Document Title
- **Exact File / Component:** `src/hooks/usePageMeta.js`, `src/pages/Locations.jsx`, `src/pages/SmartEnquiry.jsx`, `src/hooks/usePageMeta.test.jsx`
- **Current Issue:** `usePageMeta` expects a single object parameter `{ title, description }`. In `Locations.jsx` and `SmartEnquiry.jsx`, it was invoked with two positional arguments `usePageMeta(title, description)`. Destructuring the first argument (a string) results in `title = undefined` and `description = undefined`, causing `document.title = undefined` when visiting `/locations` and `/enquire`.
- **Why It Matters:** Having `undefined` displayed in the browser tab and search crawler title tags is a severe defect that hurts user trust, SEO indexing, and accessibility.
- **Proposed Change:**
  1. Update `src/hooks/usePageMeta.js` to support both single object `{ title, description }` and positional arguments `(title, description)`.
  2. In `Locations.jsx` and `SmartEnquiry.jsx`, pass the clean object format `{ title, description }`.
  3. Expand `usePageMeta.test.jsx` to verify both calling conventions and assert that `document.title` and `meta[name="description"]` are correctly set and restored.
- **Risk:** Very low. Fully backwards-compatible.
- **Verification Method:** Run `npx vitest run src/hooks/usePageMeta.test.jsx src/pages/Locations.test.jsx src/pages/SmartEnquiry.test.jsx`.

#### A.2 Remove Developer Phasing & "Coming Soon" Placeholders
- **Exact File / Component:** `src/data/homeTeasers.js`, `src/pages/WeddingsHub.jsx`, `src/pages/EventCategoryStub.jsx`
- **Current Issue:**
  1. `src/data/homeTeasers.js`: Teasers still contain Phase 1 developer phrasing:
     - `weddings-flagship`: *"the full experience is arriving in the next phase."* (even though Weddings is live).
     - `inspiration`: *"arriving in a later phase"*.
     - `transformation`: *"coming to this page once we have verified pairs to show."*
  2. `src/pages/WeddingsHub.jsx`: The real weddings section has the heading *"Coming soon, honestly."* and description stating we are waiting for real work, despite `/real-events` already being built and live with verified wedding video reels.
  3. `src/pages/EventCategoryStub.jsx`: Line 39 contains *"is being added to the site in the next phase."*
- **Why It Matters:** The website represents a premier event planning brand. Internal development phasing and "coming soon" text where features are already live damages commercial credibility.
- **Proposed Change:**
  1. In `src/data/homeTeasers.js`:
     - Update `weddings-flagship` description to: *"From Haldi to Reception, every ceremony styled, planned, and managed with seamless coordination across Ranchi and Jharkhand."*
     - Update `inspiration` description to: *"Décor themes, floral concepts, entrance styling, and ritual backdrops designed specifically for your celebration."*
     - Update `transformation` description to: *"From bare banquet halls and open lawns to fully immersive celebration environments with custom staging and ambient lighting."*
  2. In `src/pages/WeddingsHub.jsx`:
     - Update heading from *"Coming soon, honestly."* to *"Real Wedding Celebrations"*.
     - Update description to: *"Watch real wedding ceremonies, entries, and mandap productions captured on video in our Real Events showcase, or follow daily behind-the-scenes on Instagram."*
     - Add a direct link to `/real-events` ("Watch Real Wedding Videos") alongside the existing Instagram link.
  3. In `src/pages/EventCategoryStub.jsx`:
     - Replace phasing text with an honest, direct concierge invitation: *"Tell us what you're planning, and our Ranchi team will create a tailored proposal for your celebration."*
- **Risk:** Low. Existing tests in `homeTeasers.test.js`, `WeddingsHub.test.jsx`, and `EventCategoryStub.test.jsx` verify structure and links; verify all string length and link assertions continue to pass.
- **Verification Method:** Run `npx vitest run src/data/homeTeasers.test.js src/pages/WeddingsHub.test.jsx src/pages/EventCategoryStub.test.jsx`.

---

### Category B: Important Issues

#### B.1 Replace Internal `<a href>` Full-Page Reloads in Footer
- **Exact File / Component:** `src/components/Footer.jsx`, `src/components/Footer.test.jsx`
- **Current Issue:** Lines 39 and 44 use `<a href="/locations">` and `<a href="/enquire">`, triggering hard page reloads instead of React Router SPA transitions.
- **Why It Matters:** Breaks client-side navigation fluidity, causes unnecessary network re-fetches, and degrades mobile performance.
- **Proposed Change:** Import `Link` from `react-router-dom` and use `<Link to="/locations">` and `<Link to="/enquire">`.
- **Risk:** Zero risk.
- **Verification Method:** Run `npx vitest run src/components/Footer.test.jsx`.

#### B.2 Scroll Position Reset on Route Changes
- **Exact File / Component:** `src/components/ScrollToHash.jsx`, `src/components/ScrollToHash.test.jsx`
- **Current Issue:** `ScrollToHash` only runs when a hash is present in the URL. Navigating between standard pages without a hash leaves the window scrolled at the user's previous position.
- **Why It Matters:** Disorienting UX; when users click "Enquire" or "Locations" from the footer, the new page opens at the bottom instead of the top hero.
- **Proposed Change:** In `ScrollToHash.jsx`, if `hash` is present, scroll the matching element into view; if `hash` is falsy, execute `window.scrollTo(0, 0)`.
- **Risk:** Low. Ensure `window.scrollTo` is safely handled in test environments.
- **Verification Method:** Run `npx vitest run src/components/ScrollToHash.test.jsx`.

#### B.3 Comprehensive Route-Specific SEO Metadata
- **Exact Files / Components:** `src/pages/Home.jsx`, `src/pages/WeddingsHub.jsx`, `src/pages/VerticalHub.jsx`, `src/pages/ExperienceDetail.jsx`, `src/pages/VerticalExperienceDetail.jsx`
- **Current Issue:** Only `RealEventsHub`, `Locations`, and `SmartEnquiry` currently invoke `usePageMeta`. When navigating to other pages, the browser tab title and meta description remain stale.
- **Why It Matters:** Search engines, browser bookmarks, and social shares need accurate, unique page titles for each event vertical and experience.
- **Proposed Change:** Add `usePageMeta` calls with clean, authentic, non-fabricated titles:
  - `Home`: *"Next Level Events — Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand"*
  - `WeddingsHub`: *"Weddings | Next Level Events Ranchi"*
  - `VerticalHub`: *"`{vertical.label}` | Next Level Events Ranchi"*
  - `ExperienceDetail`: *"`{item.label}` — Weddings | Next Level Events Ranchi"*
  - `VerticalExperienceDetail`: *"`{item.label}` — `{verticalConfig.label}` | Next Level Events Ranchi"*
- **Risk:** Low. Standard React hook lifecycle.
- **Verification Method:** Run page tests to ensure components render cleanly without side-effect errors.

#### B.4 Responsive Grid for Confirmation Dispatch Actions
- **Exact File / Component:** `src/components/enquiry/StepConfirmation.jsx`
- **Current Issue:** In `StepConfirmation.jsx` (line 115), 4 secondary dispatch buttons ("Back to Edit", "Copy Summary", "Call +91 79031 33317", "Send Email") share a `flex flex-wrap gap-2 sm:gap-4` container where each button has `flex-1`. On screens ≤ 390px, this compresses the buttons into narrow slices where text wraps awkwardly.
- **Why It Matters:** Mobile users must have clean, tap-friendly buttons (minimum 44px touch target) without clipped or cramped labels at the crucial final step of the enquiry funnel.
- **Proposed Change:** Change the secondary dispatch container to `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3` with `w-full text-center py-3 px-4`.
- **Risk:** Zero risk. Pure CSS class improvement.
- **Verification Method:** Visual and DOM inspection; run `npx vitest run src/components/enquiry/EnquiryWizard.test.jsx`.

#### B.5 Mobile Drawer Modal Accessibility & Scroll Lock
- **Exact File / Component:** `src/components/MobileDrawer.jsx`, `src/components/MobileDrawer.test.jsx`
- **Current Issue:** `MobileDrawer` uses `z-30` (under `Navbar`'s `z-40`), lacks `role="dialog"` and `aria-modal="true"`, does not lock background body scrolling when open, and does not close on Escape key.
- **Why It Matters:** Essential for WCAG 2.1 AA dialog compliance, screen reader users, and preventing awkward background scrolling on touch devices.
- **Proposed Change:**
  1. Add `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation Menu"` to the drawer root.
  2. Set `z-50`.
  3. Add a `useEffect` that sets `document.body.style.overflow = 'hidden'` while `isOpen` is true, and cleans it up on unmount or close.
  4. Add a `keydown` listener for the `Escape` key to call `onClose()`.
- **Risk:** Low. Verify drawer open/close tests.
- **Verification Method:** Run `npx vitest run src/components/MobileDrawer.test.jsx`.

#### B.6 SEO Discovery Assets: `robots.txt`, `sitemap.xml`, and Social Preview Meta
- **Exact Files / Components:** `public/robots.txt`, `public/sitemap.xml`, `index.html`
- **Current Issue:** Missing standard crawler discovery files (`robots.txt`, `sitemap.xml`). `index.html` lacks `og:image` and Twitter Card tags.
- **Why It Matters:** Allows Google and Bing to discover and index all 8 event verticals, Real Events, Locations, and Smart Enquiry. Enables rich visual link previews when shared on WhatsApp, Facebook, or Twitter.
- **Proposed Change:**
  1. Create `public/robots.txt` referencing the sitemap.
  2. Create `public/sitemap.xml` with canonical URLs for all routes.
  3. Add `og:image`, `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, and `twitter:image` to `index.html`.
- **Risk:** Zero risk. Pure static metadata additions.
- **Verification Method:** Verify build output in `dist/` contains `robots.txt` and `sitemap.xml`.

---

### Category C: Minor Polish

#### C.1 Visible Keyboard Focus Indicators (`focus-visible`)
- **Exact Files / Components:** `src/components/Navbar.jsx`, `src/components/MegaMenu.jsx`, `src/components/Footer.jsx`, `src/components/home/Hero.jsx`, `src/components/EventCard.jsx`, `src/components/WhatsAppCTA.jsx`
- **Current Issue:** Default outline styles are suppressed or lack high-contrast focus rings for keyboard users.
- **Why It Matters:** WCAG 2.1 AA requirement for keyboard accessibility.
- **Proposed Change:** Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold` to interactive buttons, links, and card anchors.
- **Risk:** Zero risk.
- **Verification Method:** Tab navigation verification and unit tests.

#### C.2 Responsive Headline Typography on Small Mobile Screens
- **Exact Files / Components:** `src/components/home/Hero.jsx`, `src/pages/WeddingsHub.jsx`, `src/pages/VerticalHub.jsx`
- **Current Issue:** `text-5xl md:text-7xl` produces awkward single-word wrapping on 375px viewports.
- **Why It Matters:** Improves editorial aesthetics and visual hierarchy on iPhone SE, iPhone 12/13/14, and compact Android devices.
- **Proposed Change:** Use `text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight`.
- **Risk:** Low. Ensure heading text matchers in tests continue to pass.
- **Verification Method:** Run `npx vitest run src/components/home/Hero.test.jsx src/pages/WeddingsHub.test.jsx src/pages/VerticalHub.test.jsx`.

#### C.3 MegaMenu Keyboard & Dropdown Dismissal Polish
- **Exact File / Component:** `src/components/MegaMenu.jsx`, `src/components/MegaMenu.test.jsx`
- **Current Issue:** Clicking a dropdown link does not immediately reset `openIndex`. The dropdown does not dismiss on Escape key.
- **Why It Matters:** Enhances keyboard navigation and mouse UX.
- **Proposed Change:** Add `onClick={() => setOpenIndex(null)}` to dropdown links and an `onKeyDown` Escape handler.
- **Risk:** Low.
- **Verification Method:** Run `npx vitest run src/components/MegaMenu.test.jsx`.

#### C.4 Branded 404 / Route Fallback
- **Exact File / Component:** `src/pages/EventCategoryStub.jsx`, `src/pages/EventCategoryStub.test.jsx`
- **Current Issue:** Fallback for unknown routes is a plain text block with a single underline link.
- **Why It Matters:** A well-styled 404 maintains premium brand perception when broken links or mistyped URLs occur.
- **Proposed Change:** Add luxury framing with gold eyebrow, styled typography, and links to Home, Real Events, and Smart Enquiry.
- **Risk:** Low. Preserve existing text `/couldn't find/i` and link `/Back to Home/i`.
- **Verification Method:** Run `npx vitest run src/pages/EventCategoryStub.test.jsx`.

---

### Category D: No-Change / Already-Good Areas

1. **Business Location Architecture:**
   - Ranchi as Primary Studio & Headquarters (Kanke Road base).
   - 24-district active service area in Jharkhand (no fake branches or offices).
   - Outstation / Destination events handled on enquiry.
   - **Status:** **NO CHANGE.** Fully compliant with business truth.
2. **Smart Enquiry Architecture:**
   - 3-level location model (Ranchi, Jharkhand district selector, Outside Jharkhand destination input).
   - Occasion taxonomy, contextual service derivation, timeline modes, guest scale tiers.
   - Summary display, WhatsApp URL generation, telephone/email fallback actions.
   - **Status:** **NO CHANGE** to data or business logic.
3. **Brand Identity & Tokens:**
   - Charcoal (`#1c1a17`), Ivory (`#faf6ef`), Neutral (`#ece4d3`), Gold (`#c19743`).
   - Cormorant Garamond display font and Inter body font.
   - Verified brand logo and favicon assets.
   - **Status:** **NO CHANGE.**
4. **Media & Real Events Video System:**
   - Lightweight YouTube facade embeds with zero initial bandwidth penalty.
   - Verified culturally authentic photography in `manifest.json`.
   - **Status:** **NO CHANGE.**
5. **Event Taxonomy:**
   - All 8 event verticals and sub-experience layers.
   - **Status:** **NO CHANGE.**

---

## 2. Proposed Implementation Sequence

When authorized to proceed, execution will follow this disciplined sequence:

1. **Step 1: Core Hook & Critical Bug Fixes (Category A)**
   - Update `src/hooks/usePageMeta.js` to support polymorphic arguments; update `usePageMeta.test.jsx`.
   - Fix `Locations.jsx` and `SmartEnquiry.jsx` meta calls.
   - Update `homeTeasers.js`, `WeddingsHub.jsx`, and `EventCategoryStub.jsx` to eliminate developer phasing and "coming soon" text.
   - Run tests to verify all Category A fixes pass cleanly.

2. **Step 2: Navigation, Layout & Accessibility (Category B & C)**
   - Update `Footer.jsx` to use React Router `<Link>` for internal paths.
   - Update `ScrollToHash.jsx` to reset scroll to `(0, 0)` when no hash is present; update tests.
   - Update `StepConfirmation.jsx` secondary dispatch actions to responsive grid layout.
   - Update `MobileDrawer.jsx` with ARIA dialog attributes, `z-50`, body scroll lock, and Escape key handling.
   - Add visible focus indicators (`focus-visible:ring-gold`) to buttons, links, and cards.
   - Refine mobile hero typography sizing across `Hero.jsx`, `WeddingsHub.jsx`, and `VerticalHub.jsx`.
   - Add MegaMenu dropdown link dismissal and Escape key handler.
   - Polish 404 fallback styling in `EventCategoryStub.jsx`.

3. **Step 3: SEO, Metadata & Discovery (Category B.3 & B.6)**
   - Add `usePageMeta` to `Home.jsx`, `WeddingsHub.jsx`, `VerticalHub.jsx`, `ExperienceDetail.jsx`, `VerticalExperienceDetail.jsx`.
   - Create `public/robots.txt` and `public/sitemap.xml`.
   - Add Open Graph image and Twitter Card tags to `index.html`.

4. **Step 4: Comprehensive Verification & Regression**
   - Run the complete test suite (`npm test`) across all 171+ test files.
   - Run production build (`npm run build`).
   - Check mobile rendering at 375px, 390px, 412px, 768px, 1024px, 1280px, 1440px, 1600px.
   - Verify `git status` and ensure zero unintended diffs.

---

## 3. Risk Management & Regression Protection

| Area | Risk | Mitigation |
|------|------|------------|
| `usePageMeta` update | Breaking existing `RealEventsHub` tests | Support both object `{ title, description }` and direct arguments `(title, description)` |
| `ScrollToHash` scroll reset | JSDOM `window.scrollTo` undefined error | Verify mock in `beforeEach` / test setup |
| Phasing copy updates | Breaking string matching in `homeTeasers.test.js` or `WeddingsHub.test.jsx` | Verified that tests only check length (>10, >20) or section container IDs, not old phrasing strings |
| Mobile drawer scroll lock | Leaking `overflow: hidden` on unmount | Strict cleanup return function in `useEffect` |
| Internal footer `Link` change | Test expecting native `<a>` tag | `Link` renders as `<a>` in DOM, maintaining 100% test compatibility |

---

## 4. Expected Final Verification
- **Test Suite:** 171+ test files passed (100%), 575+ tests passed.
- **Production Build:** Vite build succeeds cleanly with 0 warnings, 0 errors, gzip JS bundle ~117 kB.
- **Git Status:** Controlled working tree on branch `master`.
- **Deployment Status:** No git push, no Vercel deployment, strictly awaiting review.
