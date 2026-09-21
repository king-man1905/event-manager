# Next Level Events — Phase 5: Smart Enquiry + Locations — Design Spec

## Context

Phases 1–4 are complete and merged into `master` (commit `c87c8f0`). The site now has:
- A foundational brand system, navigation, and 14-section homepage (Phase 1).
- A deep, 6-layer Weddings Flagship experience (Phase 2).
- Generic hubs and detail pages for all 7 other event verticals (Phase 3).
- A verified Real Events & Content hub with click-to-load YouTube Shorts and Behind-the-Event process highlights (Phase 4).

Phase 5 introduces the two systems that transform the site from a passive portfolio and service directory into an active, high-conversion lead generation engine:
1. **Smart Enquiry**: A streamlined, mobile-first, multi-step enquiry wizard that captures qualified lead intent without friction, preserves context from anywhere on the site, and generates formatted WhatsApp messages and direct contact fallbacks.
2. **Locations**: A dedicated, truthful location destination establishing Ranchi as the primary physical headquarters/studio while offering a structured outstation and destination event capability for clients across Jharkhand and beyond.

---

## 1. Information Architecture

Phase 5 adds two primary destinations to the site:
- `/enquire` — The Smart Enquiry engine (also accessible with URL context parameters).
- `/locations` — The Locations guide and physical studio presence.

```
Site Navigation
├── Home (/)
├── Events (/events/*)
│   ├── Weddings Flagship (/events/weddings/*)
│   └── 7 Verticals (/events/:vertical/*)
│       └── Experience Pages (Contextual "Plan with Enquiry" → /enquire?vertical=...&experience=...)
├── Real Events (/real-events)
├── Locations (/locations) ───► [Enquire with Outstation/Ranchi location] ───┐
├── Contact (/#contact)                                                     │
└── [Header CTA: "Enquire"] ───────────────────────────────────────────────► /enquire
```

Both systems interconnect seamlessly:
- Visitors on experience pages can launch a pre-filled enquiry with one tap.
- Visitors browsing Locations can launch an enquiry pre-set to Ranchi or Outstation.
- Homepage teasers (`locations`) resolve directly to `/locations`.
- Visitors completing the enquiry are seamlessly transitioned to WhatsApp (or phone/email fallbacks) with a clear summary of their plan.

---

## 2. Exact Proposed Enquiry Steps & Fields

To balance depth of lead capture with low friction and mobile ease, the enquiry flow is structured as a **3-step progressive wizard with a completion/dispatch step**:

### Step 1: Event & Occasion
*Goal: Understand what celebration is being planned.*
- **Event Vertical (Required):** Single-select grid/chips derived from the 8 verified verticals (`Weddings`, `Corporate Events`, `Social Celebrations`, `Kids & Family`, `Live & Entertainment`, `Décor & Design`, `Special & Cultural`, `Destination Events`).
- **Specific Occasion / Experience (Optional but recommended):** Dynamically populated chips based on the selected vertical (e.g. if Weddings: Haldi, Mehendi, Sangeet, Mandap, Reception, etc.; if Kids: Birthday Themes, Baby Shower, Annaprashan, etc.), plus a `"General / Custom Celebration"` option.
- *Prefill rule:* If accessed from an experience page (e.g. `/events/weddings/functions/haldi`), both vertical and occasion are pre-filled and visible in a badge summary, allowing the user to proceed immediately to Step 2.

### Step 2: Location & Timing
*Goal: Understand where and when the event will occur.*
- **Location Type (Required):**
  - `Ranchi (Local)` — Selected by default (honest to primary presence).
  - `Outstation / Destination` — Reveals a single text input: *"City or Destination Name (e.g. Jamshedpur, Bokaro, Outstation)"*.
- **Event Timing (Required):**
  - Radio toggle: `Specific Date` vs `Flexible / Month only` vs `Date not decided yet`.
  - If `Specific Date`: Native date input with min date set to today.
  - If `Flexible / Month only`: Month/Year dropdown or short text selector (e.g. "Nov 2026").
  - If `Date not decided yet`: Acknowledged without blocking the enquiry.
- **Estimated Guest Scale (Optional):**
  - Discreet selector: `< 100`, `100 - 300`, `300 - 600`, `600+`, or `Unsure`.

### Step 3: Services & Contact Details
*Goal: Identify needed service layers and obtain contact coordinates.*
- **Services Required (Multi-select, Optional):**
  - Check chips matching real business capabilities:
    - Full Event Planning & Management
    - Décor, Theme & Floral Styling
    - Stage, Sound & Lighting
    - Artists, DJ & Entertainment
    - Photography & Cinematic Video
    - Venue Coordination
- **Your Name (Required):** Text input (e.g. "Aman Verma").
- **Phone / WhatsApp Number (Required):** Tel input with standard 10-digit validation.
- **Additional Vision / Notes (Optional):** Short text area (max 200 chars).

### Step 4 / Completion: Dispatch & Direct Actions
*Goal: Transmit the enquiry cleanly to the team without requiring a database backend.*
- **Primary Action: "Send on WhatsApp"**
  - Fires `https://wa.me/917903133317?text=...` with the formatted contextual message.
- **Secondary Actions (for users without WhatsApp or preferring direct contact):**
  - "Direct Call": `tel:+917903133317`
  - "Send Email": `mailto:nextlevel.events25@gmail.com?subject=...&body=...`
  - "Copy Enquiry Summary": Copies formatted text to clipboard with instant visual confirmation.

---

## 3. Context-Preservation Strategy

When a visitor has navigated deep into the site (e.g. inspecting "Baraat" under Weddings or "Product Launch" under Corporate Events), kicking off an enquiry must **never force them to re-select their event**.

### URL Search Param Contract
Enquiry links from experience pages and hubs will pass URL query parameters:
- `vertical`: slug of the vertical (e.g. `weddings`, `corporate-events`, `kids-family`).
- `layer`: optional wedding layer (e.g. `functions`, `cultural`, `experiences`, `decor`).
- `experience`: slug of the specific experience (e.g. `haldi`, `product-launch`, `floral-decor`).
- `location`: optional location prefill (e.g. `ranchi`, `outstation`).

Examples:
- `/enquire?vertical=weddings&layer=functions&experience=haldi`
- `/enquire?vertical=corporate-events&experience=product-launch`
- `/enquire?vertical=decor-design&experience=floral-decor`
- `/enquire?location=outstation`

### Experience Page Integration
On `ExperienceDetail.jsx` and `VerticalExperienceDetail.jsx`:
- The existing primary `WhatsAppCTA` ("Enquire on WhatsApp") is preserved.
- A complementary action is added: `"Customise Your Enquiry"` or `"Plan This Event"`, linking to `/enquire` with the corresponding query params.
- When `/enquire` loads with valid params:
  - It parses `vertical` and `experience`.
  - It validates them against `events.js` and the corresponding data files.
  - It marks Step 1 as completed, displays a prominent context badge:
    *“Planning for: Weddings — Haldi (Change)”*
  - It automatically initializes on **Step 2 (Location & Timing)**, saving the user unnecessary clicks.

---

## 4. WhatsApp Message Strategy

### Verified Business Phone
`+91 7903133317` (stored centrally in `src/data/contact.js` as `WHATSAPP_NUMBER = '917903133317'`).

### Message Formatting Principles
1. **Clean & Structured:** Standardized bullet points make it effortless for the Next Level Events team to read and respond immediately.
2. **Privacy-Preserving:** Includes only the user's name, general location, and event parameters. No confidential details or financial data.
3. **No Fabricated Promises:** The message does not make commitments about automated instant quotes, response times, or fixed packages.

### Formatted Template
```
Hi Next Level Events, I would like to enquire about planning an event:

* Event: {Vertical Label} ({Occasion / Experience Label})
* Location: {Ranchi / City Name}
* Target Date: {Formatted Date or "Flexible" / "Date not decided yet"}
* Services Needed: {Comma-separated selected services or "Complete Planning"}
* Name: {User Name}
* Phone: {Phone Number}
{Optional Notes if provided}

Looking forward to hearing from your team.
```

The message is encoded strictly using `encodeURIComponent` to guarantee safe URL generation across all mobile and desktop browsers.

---

## 5. Locations Architecture & Truthful Model

### Truthful Location Stance
Next Level Events operates from a confirmed, verified physical location in Ranchi, Jharkhand. The business executes events in other cities and destination venues through on-site project deployment, not through physical satellite offices.

### Two-Tier Location Model
1. **Tier 1: Primary Studio Presence (Ranchi, Jharkhand)**
   - Physical address: *Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002*.
   - Complete local logistics, local vendor relationships, venue coordination across Ranchi.
   - Verified physical contact and map location.
2. **Tier 2: Outstation & Destination Capabilities (On Enquiry)**
   - Outstation service coverage for celebrations across Jharkhand (e.g. Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh) and destination events nationwide.
   - Transparent operational model: Remote design and scheduling → On-site recce and local vendor alignment → Full deployment of core Ranchi production and styling crew.
   - No claim of local branch offices or permanent warehouses in secondary cities.

---

## 6. Verified vs. Unverified Location Inventory

| Location Claim | Verified Evidence | Site Presentation |
|---|---|---|
| **Ranchi Headquarters** | Physical address in `contact.js`, Google Maps coordinates, verified business registration, YouTube Shorts filmed on-site. | **Active Local Presence**: Full address, interactive map link, full service availability. |
| **Jharkhand Districts** (23 districts: Jamshedpur, Dhanbad, Bokaro, etc.) | Mentioned only in legacy `areaServed` schema markup of original website; no physical branch offices found. | **Outstation Service (On Enquiry)**: Clearly framed as traveling capability handled by our Ranchi core team. No fake branch offices. |
| **Destination Events** | Verified as an existing service vertical (`destinationEvents.js`). | **Destination Planning (On Enquiry)**: Sourced and managed remotely, executed on-site. |
| **Branch Offices / Franchises** | None. | **Zero claims**: Explicitly stated that operations are headquartered at Kanke Road, Ranchi. |
| **Exclusive Venue Partnerships** | None independently verified. | **Zero claims**: Framed as independent venue coordination and liaison. |

---

## 7. Route Structure

```
/enquire     → SmartEnquiry (Wizard page with query param context support)
/locations   → Locations (Ranchi physical presence + Outstation capability guide)
```

Both routes are declared in `src/AppRoutes.jsx`. Existing routes (`/`, `/real-events`, `/events/*`) remain 100% untouched.

---

## 8. Navigation Changes

### 1. Header Navigation (`src/data/nav.js`, `Navbar.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`)
- `nav.js` top-level list updated:
  ```js
  export const nav = [
    { label: 'Home', href: '/' },
    { label: 'Events', columns: [...] },
    { label: 'Real Events', href: '/real-events' },
    { label: 'Locations', href: '/locations' },
    { label: 'Contact', href: '/#contact' },
  ];
  ```
- **Prominent Enquire Action in Header:**
  - `Navbar.jsx`: Beside the desktop `MegaMenu`, a gold CTA button linking to `/enquire`:
    ```jsx
    <Link to="/enquire" className="hidden sm:inline-block bg-gold px-5 py-2 font-sans text-xs uppercase tracking-wider text-charcoal font-semibold hover:bg-gold/90 transition-colors">
      Enquire
    </Link>
    ```
  - `MobileDrawer.jsx`: Added as a primary action at the base of the drawer.

### 2. Footer (`src/components/Footer.jsx`)
- Adds a direct link to `/locations` and `/enquire` in the contact/information column.

---

## 9. Component Plan

### New Components & Pages
1. **`src/pages/SmartEnquiry.jsx`**:
   - The enquiry page shell. Handles URL query parsing, SEO metadata via `usePageMeta`, step progression, and renders the wizard steps.
2. **`src/components/enquiry/EnquiryWizard.jsx`**:
   - State management container for current step (1 to 4), form values, validation errors, and progress calculation.
3. **`src/components/enquiry/StepEventOccasion.jsx`**:
   - Step 1 UI: Event vertical selection (chips with iconography/labels) and dynamic occasion selector.
4. **`src/components/enquiry/StepLocationDate.jsx`**:
   - Step 2 UI: Ranchi vs Outstation toggle, text input for outstation city, date mode selector (exact date, flexible month, undecided), guest range selector.
5. **`src/components/enquiry/StepServicesContact.jsx`**:
   - Step 3 UI: Service multi-select check chips, user name, telephone/WhatsApp number input, optional note.
6. **`src/components/enquiry/StepConfirmation.jsx`**:
   - Step 4 UI: Summary card of enquiry choices, primary "Send on WhatsApp" button, copy summary button, direct phone call and email fallbacks.
7. **`src/pages/Locations.jsx`**:
   - The dedicated locations destination.
   - Section 1: Hero ("Headquartered in Ranchi, Creating Celebrations Everywhere").
   - Section 2: Ranchi Primary Studio card (Address, Map link, Phone, WhatsApp, Local services).
   - Section 3: Outstation & Destination Planning Guide (How outstation execution works, verified districts covered on enquiry, "Enquire for Outstation" CTA).
   - Section 4: Truthful Location FAQ (addressing branch offices, travel logistics, vendor coordination).
   - Section 5: Contextual Enquiry CTA.

### Existing Component Updates
- **`src/pages/ExperienceDetail.jsx` & `VerticalExperienceDetail.jsx`**:
  - Add a secondary `"Plan With Smart Enquiry"` link alongside the existing `WhatsAppCTA`.
- **`src/data/homeTeasers.js`**:
  - Rewire `locations` teaser to link to `/locations` with updated truthful copy.

---

## 10. Data Model

### `src/data/locationsData.js` (New)
```js
export const locationsData = {
  primary: {
    city: 'Ranchi',
    state: 'Jharkhand',
    title: 'Ranchi Flagship Studio',
    tagline: 'Our core team, design studio, and primary operations are based right here.',
    address: "Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002",
    phone: '+91 79031 33317',
    email: 'nextlevel.events25@gmail.com',
    status: 'primary-studio',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar, Ranchi, Jharkhand 834002"),
    coverageNote: 'Full end-to-end planning, décor production, and day-of management across all Ranchi venues.',
  },
  outstation: {
    title: 'Outstation & Destination Celebrations',
    tagline: 'We travel with our core production and styling team to bring your vision to life.',
    status: 'outstation-available',
    description: 'While our physical office is in Ranchi, Next Level Events manages weddings, corporate retreats, and special celebrations throughout Jharkhand and select destination hubs upon request.',
    howItWorks: [
      { step: '1. Remote Design & Consultation', desc: 'Detailed virtual meetings, mood boards, and layout planning from our Ranchi studio.' },
      { step: '2. On-Site Recce & Coordination', desc: 'Our planners visit your venue in advance to coordinate power, staging, and vendor logistics.' },
      { step: '3. Full On-Site Deployment', desc: 'Our core styling and coordination team travels to your destination to run production start to finish.' },
    ],
    enquiryMessage: "Hi, I'd like to check Next Level Events' availability for an outstation event outside Ranchi.",
  },
};
```

### `src/data/enquiryOptions.js` (New)
Reuses existing datasets (`events.js`, `culturalWeddings.js`, `weddingFunctions.js`, `corporateEvents.js`, etc.) to generate dynamic occasion options without duplicating data.
```js
export const ENQUIRY_SERVICES = [
  { id: 'planning', label: 'Full Event Planning & Management' },
  { id: 'decor', label: 'Décor, Theme & Floral Styling' },
  { id: 'production', label: 'Stage, Sound & Lighting' },
  { id: 'entertainment', label: 'Artists, DJ & Entertainment' },
  { id: 'media', label: 'Photography & Cinematic Films' },
  { id: 'hospitality', label: 'Catering & Hospitality Coordination' },
  { id: 'venue', label: 'Venue Sourcing & Liaison' },
];

export const GUEST_COUNT_OPTIONS = [
  'Under 100 guests',
  '100 – 300 guests',
  '300 – 600 guests',
  '600+ guests',
  'Yet to be decided',
];
```

---

## 11. Homepage Integration

The `locations` teaser in `src/data/homeTeasers.js` is updated:
- `href`: changed from `/#contact` to `/locations`.
- `eyebrow`: `'Where We Work'`
- `title`: `'Ranchi first, and beyond on request.'`
- `description`: `'Our primary studio is in Ranchi, with full outstation and destination event planning available across Jharkhand and beyond.'`
- `ctaLabel`: `'Explore Locations'`

No new homepage sections are added. The existing 14-section homepage architecture remains clean and intact.

---

## 12. Accessibility Plan

- **Semantic Form Elements:** Standard `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, and `<button>`.
- **Keyboard Navigation:** Natural tab order across all interactive elements; space/enter keys toggle chips; escape closes dropdowns.
- **Accessible Progress Indicator:**
  `<nav aria-label="Enquiry progress">` with `aria-current="step"` on active step and descriptive step names.
- **Error Announcement:**
  Inputs with validation errors set `aria-invalid="true"` and `aria-describedby="field-error-id"`.
  Errors are announced politely via `aria-live="polite"`.
- **Contrast & Focus:** Focus-visible outlines use brand gold with high contrast on both charcoal and ivory backgrounds.

---

## 13. SEO Plan

Using `usePageMeta.jsx`:
- **/enquire**:
  - `title`: `"Plan Your Event | Smart Enquiry | Next Level Events Ranchi"`
  - `meta description`: `"Custom event planning enquiry for weddings, birthdays, corporate and social events in Ranchi and outstation by Next Level Events."`
- **/locations**:
  - `title`: `"Event Locations & Service Areas | Next Level Events Ranchi"`
  - `meta description`: `"Headquartered on Kanke Road, Ranchi. Discover Next Level Events' local Ranchi presence and outstation destination event capabilities across Jharkhand."`
- **Structured Data (JSON-LD)** on `/locations`:
  - Uses strictly verified facts from `contact.js`:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "EventPlanner",
      "name": "Next Level Events",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar",
        "addressLocality": "Ranchi",
        "addressRegion": "Jharkhand",
        "postalCode": "834002",
        "addressCountry": "IN"
      },
      "telephone": "+917903133317",
      "email": "nextlevel.events25@gmail.com"
    }
    ```

---

## 14. Testing & QA Plan

A comprehensive suite of unit and integration tests using Vitest and React Testing Library:
1. `src/data/locationsData.test.js`: Validates primary studio data, address, phone, map URL, outstation structure, and zero fabricated claims.
2. `src/data/enquiryOptions.test.js`: Validates service options, occasion resolvers for all 8 verticals, and no duplicate definitions.
3. `src/utils/enquiryHelpers.test.js`: Tests URL query param parsing, initial state generation, WhatsApp message encoding, and summary text generation.
4. `src/components/enquiry/EnquiryWizard.test.jsx`:
   - Validates initial step 1 rendering.
   - Validates next/back navigation and step validation.
   - Validates context pre-fill from query params (e.g. pre-selected Haldi advances to Step 2).
   - Validates date picker vs flexible toggle.
   - Validates service multi-select.
   - Validates final step message format and WhatsApp URL generation.
5. `src/pages/Locations.test.jsx`:
   - Validates Ranchi physical address and map link.
   - Validates outstation explanation and CTA link.
   - Validates SEO title/meta.
6. `src/data/homeTeasers.test.js` & `src/pages/Home.test.jsx`:
   - Confirms rewired `locations` teaser links to `/locations`.
7. `src/AppRoutes.test.jsx`:
   - Confirms routes `/enquire` and `/locations` resolve correctly.
8. **Regression Guarantee:** All existing 165 test files (533 tests) continue to pass.

---

## 15. Risks & Tradeoffs

1. **Tradeoff: Client-Side WhatsApp Dispatch vs. Database Backend**
   - *Decision:* No database backend is introduced. Lead details are encoded directly into WhatsApp messages, direct tel links, and mailto links.
   - *Rationale:* Eliminates backend infrastructure costs, database maintenance, and API failure modes while connecting clients directly to the business owner's verified WhatsApp, which is standard practice for Indian event planning.
2. **Risk: User leaves before sending WhatsApp message**
   - *Mitigation:* Step 4 provides a prominent "Copy Enquiry Summary" button, direct call CTA, and email fallback so the user can easily transmit their requirements in whatever medium they prefer.
3. **Risk: Misleading users about outstation presence**
   - *Mitigation:* Explicitly label Ranchi as the single physical studio and frame other cities strictly as "Outstation / Destination capability on enquiry", completely avoiding fake branch office claims.
