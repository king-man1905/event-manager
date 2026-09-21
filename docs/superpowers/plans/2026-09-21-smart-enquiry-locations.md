# Smart Enquiry + Locations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cohesive, mobile-first Smart Enquiry system and a truthful Locations destination for Next Level Events, establishing Ranchi as the primary physical presence, enabling outstation/destination enquiries, preserving context from all experience pages, and generating clean WhatsApp messages and direct contact fallbacks — without backend dependencies or fabricated claims.

**Architecture:**
- New data models: `locationsData.js`, `enquiryOptions.js`.
- Utilities: `enquiryHelpers.js` for query parsing, state initialization, and WhatsApp message formatting.
- Components: `src/components/enquiry/` containing modular wizard steps and progress indicators.
- Pages: `SmartEnquiry.jsx` (`/enquire`) and `Locations.jsx` (`/locations`).
- Integrations: Query prefill links from `ExperienceDetail.jsx` and `VerticalExperienceDetail.jsx`, rewired `locations` teaser in `homeTeasers.js`, header CTA and link additions in `nav.js`, `Navbar.jsx`, `MobileDrawer.jsx`, and `Footer.jsx`.

**Tech Stack:** React 19 + Vite + Tailwind CSS v3 + react-router-dom v7, JavaScript only, Vitest + @testing-library/react (using `fireEvent`).

**Spec:** `docs/superpowers/specs/2026-09-21-smart-enquiry-locations-design.md`

## Global Constraints

- **No fabrication:** Do not invent pricing, availability, response-time guarantees, fake reviews, or branch offices in secondary cities.
- **Truthful locations:** Ranchi is the verified primary physical studio (`contact.js`). All other cities/districts are treated strictly as "Outstation / Destination (On Enquiry)".
- **Preserve existing functionality:** Phase 1–4 routes and tests must pass unmodified (except targeted assertions in `nav.test.js`, `homeTeasers.test.js`, and `AppRoutes.test.jsx` that verify the new additions).
- **No unnecessary dependencies:** No external form libraries (Formik, React Hook Form) or database backends.
- **WhatsApp compliance:** Encode messages safely with `encodeURIComponent` using the verified number (`917903133317`). Include direct Call and Email alternatives.

---

### Task 1: Locations Data Model and Tests

**Files:**
- Create: `src/data/locationsData.js`
- Create: `src/data/locationsData.test.js`

**Interfaces:**
- Produces: `locationsData` with `primary` (Ranchi) and `outstation` definitions.

- [ ] **Step 1: Write the failing tests**

`src/data/locationsData.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { locationsData } from './locationsData';
import { ADDRESS, PHONE_DISPLAY, EMAIL } from './contact';

describe('locationsData', () => {
  it('contains primary Ranchi studio data matching verified contact details', () => {
    expect(locationsData.primary).toBeDefined();
    expect(locationsData.primary.city).toBe('Ranchi');
    expect(locationsData.primary.state).toBe('Jharkhand');
    expect(locationsData.primary.address).toBe(ADDRESS);
    expect(locationsData.primary.phone).toBe(PHONE_DISPLAY);
    expect(locationsData.primary.email).toBe(EMAIL);
    expect(locationsData.primary.status).toBe('primary-studio');
    expect(locationsData.primary.mapUrl).toContain('https://www.google.com/maps');
  });

  it('contains truthful outstation capabilities with step-by-step process', () => {
    expect(locationsData.outstation).toBeDefined();
    expect(locationsData.outstation.status).toBe('outstation-available');
    expect(Array.isArray(locationsData.outstation.howItWorks)).toBe(true);
    expect(locationsData.outstation.howItWorks.length).toBe(3);
  });

  it('contains no fabricated branch office claims', () => {
    const rawString = JSON.stringify(locationsData).toLowerCase();
    expect(rawString).not.toContain('branch office');
    expect(rawString).not.toContain('satellite office');
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/data/locationsData.test.js`
Expected: FAIL (`Cannot find module './locationsData'`).

- [ ] **Step 3: Implement `src/data/locationsData.js`**

```js
import { ADDRESS, PHONE_DISPLAY, EMAIL, MAP_URL } from './contact';

export const locationsData = {
  primary: {
    city: 'Ranchi',
    state: 'Jharkhand',
    title: 'Ranchi Flagship Studio',
    tagline: 'Our core team, design studio, and primary operations are based right here.',
    address: ADDRESS,
    phone: PHONE_DISPLAY,
    email: EMAIL,
    status: 'primary-studio',
    mapUrl: MAP_URL,
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

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run src/data/locationsData.test.js`
Expected: PASS (3 tests passed).

---

### Task 2: Enquiry Options & Helper Utilities

**Files:**
- Create: `src/data/enquiryOptions.js`
- Create: `src/data/enquiryOptions.test.js`
- Create: `src/utils/enquiryHelpers.js`
- Create: `src/utils/enquiryHelpers.test.js`

**Interfaces:**
- `enquiryOptions.js`: Exports `ENQUIRY_SERVICES`, `GUEST_COUNT_OPTIONS`, `getOccasionsForVertical(verticalSlug)`.
- `enquiryHelpers.js`: Exports `parseEnquiryParams(searchParams)`, `formatWhatsAppMessage(formData)`, `buildWhatsAppUrl(formData)`.

- [ ] **Step 1: Write failing tests for `enquiryOptions` and `enquiryHelpers`**

`src/data/enquiryOptions.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { ENQUIRY_SERVICES, GUEST_COUNT_OPTIONS, getOccasionsForVertical } from './enquiryOptions';
import { events } from './events';

describe('enquiryOptions', () => {
  it('defines verified services and guest scale tiers', () => {
    expect(ENQUIRY_SERVICES.length).toBeGreaterThan(4);
    expect(GUEST_COUNT_OPTIONS.length).toBeGreaterThan(3);
  });

  it('returns appropriate occasion options for any valid vertical slug', () => {
    events.forEach((vertical) => {
      const occasions = getOccasionsForVertical(vertical.slug);
      expect(Array.isArray(occasions)).toBe(true);
      expect(occasions.length).toBeGreaterThan(0);
      expect(occasions[0]).toHaveProperty('slug');
      expect(occasions[0]).toHaveProperty('label');
    });
  });

  it('includes weddings layers when vertical is weddings', () => {
    const occasions = getOccasionsForVertical('weddings');
    const labels = occasions.map((o) => o.label);
    expect(labels).toContain('Haldi');
    expect(labels).toContain('Mehendi');
  });
});
```

`src/utils/enquiryHelpers.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { parseEnquiryParams, formatWhatsAppMessage, buildWhatsAppUrl } from './enquiryHelpers';
import { WHATSAPP_NUMBER } from '../data/contact';

describe('enquiryHelpers', () => {
  it('parses URL search parameters correctly', () => {
    const params = new URLSearchParams('vertical=weddings&experience=haldi&location=ranchi');
    const parsed = parseEnquiryParams(params);
    expect(parsed.vertical).toBe('weddings');
    expect(parsed.experience).toBe('haldi');
    expect(parsed.locationType).toBe('ranchi');
  });

  it('formats structured WhatsApp messages without confidential exposure', () => {
    const formData = {
      verticalLabel: 'Weddings',
      occasionLabel: 'Haldi',
      locationType: 'ranchi',
      outstationCity: '',
      dateMode: 'specific',
      eventDate: '2026-12-15',
      services: ['Décor, Theme & Floral Styling', 'Venue Coordination'],
      name: 'Aman Verma',
      phone: '9876543210',
      notes: 'Need evening lights setup',
    };
    const message = formatWhatsAppMessage(formData);
    expect(message).toContain('Event: Weddings (Haldi)');
    expect(message).toContain('Location: Ranchi');
    expect(message).toContain('Target Date: 2026-12-15');
    expect(message).toContain('Services: Décor, Theme & Floral Styling, Venue Coordination');
    expect(message).toContain('Name: Aman Verma');
    expect(message).toContain('Phone: 9876543210');
    expect(message).toContain('Note: Need evening lights setup');
  });

  it('handles flexible dates and outstation locations', () => {
    const formData = {
      verticalLabel: 'Corporate Events',
      occasionLabel: 'Product Launch',
      locationType: 'outstation',
      outstationCity: 'Jamshedpur',
      dateMode: 'flexible',
      flexibleDate: 'December 2026',
      services: [],
      name: 'Raj',
      phone: '9999999999',
    };
    const message = formatWhatsAppMessage(formData);
    expect(message).toContain('Location: Outstation — Jamshedpur');
    expect(message).toContain('Target Date: Flexible (December 2026)');
    expect(message).toContain('Services: Full Event Coordination');
  });

  it('builds a valid wa.me URL with safe encoding', () => {
    const formData = {
      verticalLabel: 'Weddings',
      name: 'Aman',
      phone: '9999999999',
    };
    const url = buildWhatsAppUrl(formData);
    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    expect(url).not.toContain(' ');
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/data/enquiryOptions.test.js src/utils/enquiryHelpers.test.js`
Expected: FAIL (`Cannot find module`).

- [ ] **Step 3: Implement `src/data/enquiryOptions.js`**

```js
import { events } from './events';
import { culturalWeddings } from './culturalWeddings';
import { weddingFunctions } from './weddingFunctions';
import { weddingExperiences } from './weddingExperiences';
import { weddingDecor } from './weddingDecor';
import { corporateEvents } from './corporateEvents';
import { socialCelebrations } from './socialCelebrations';
import { kidsFamily } from './kidsFamily';
import { liveEntertainment } from './liveEntertainment';
import { decorDesign } from './decorDesign';
import { specialCultural } from './specialCultural';
import { destinationEvents } from './destinationEvents';

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

export function getOccasionsForVertical(verticalSlug) {
  switch (verticalSlug) {
    case 'weddings': {
      const all = [
        ...weddingFunctions.map((item) => ({ slug: item.slug, label: item.label, group: 'Functions' })),
        ...culturalWeddings.map((item) => ({ slug: item.slug, label: item.label, group: 'Traditions' })),
        ...weddingExperiences.map((item) => ({ slug: item.slug, label: item.label, group: 'Experiences' })),
        ...weddingDecor.map((item) => ({ slug: item.slug, label: item.label, group: 'Décor' })),
      ];
      return [{ slug: 'general-wedding', label: 'Complete Wedding Planning' }, ...all];
    }
    case 'corporate-events':
      return corporateEvents.map((item) => ({ slug: item.slug, label: item.label }));
    case 'social-celebrations':
      return socialCelebrations.map((item) => ({ slug: item.slug, label: item.label }));
    case 'kids-family':
      return kidsFamily.map((item) => ({ slug: item.slug, label: item.label }));
    case 'live-entertainment':
      return liveEntertainment.map((item) => ({ slug: item.slug, label: item.label }));
    case 'decor-design':
      return decorDesign.map((item) => ({ slug: item.slug, label: item.label }));
    case 'special-cultural':
      return specialCultural.map((item) => ({ slug: item.slug, label: item.label }));
    case 'destination-events':
      return destinationEvents.map((item) => ({ slug: item.slug, label: item.label }));
    default:
      return [{ slug: 'custom', label: 'Custom Celebration' }];
  }
}
```

- [ ] **Step 4: Implement `src/utils/enquiryHelpers.js`**

```js
import { WHATSAPP_NUMBER } from '../data/contact';

export function parseEnquiryParams(searchParams) {
  if (!searchParams) return {};
  const vertical = searchParams.get('vertical') || '';
  const experience = searchParams.get('experience') || '';
  const layer = searchParams.get('layer') || '';
  const location = searchParams.get('location') || '';

  return {
    vertical,
    experience,
    layer,
    locationType: location === 'outstation' ? 'outstation' : location === 'ranchi' ? 'ranchi' : '',
  };
}

export function formatWhatsAppMessage(data) {
  const parts = ['Hi Next Level Events, I would like to enquire about planning an event:'];

  if (data.verticalLabel) {
    const occasion = data.occasionLabel ? ` (${data.occasionLabel})` : '';
    parts.push(`* Event: ${data.verticalLabel}${occasion}`);
  }

  if (data.locationType === 'outstation') {
    const city = data.outstationCity ? ` — ${data.outstationCity}` : '';
    parts.push(`* Location: Outstation${city}`);
  } else {
    parts.push('* Location: Ranchi');
  }

  if (data.dateMode === 'specific' && data.eventDate) {
    parts.push(`* Target Date: ${data.eventDate}`);
  } else if (data.dateMode === 'flexible' && data.flexibleDate) {
    parts.push(`* Target Date: Flexible (${data.flexibleDate})`);
  } else {
    parts.push('* Target Date: Flexible / Not decided yet');
  }

  if (data.guestCount && data.guestCount !== 'Yet to be decided') {
    parts.push(`* Estimated Guests: ${data.guestCount}`);
  }

  const services = Array.isArray(data.services) && data.services.length > 0
    ? data.services.join(', ')
    : 'Full Event Coordination';
  parts.push(`* Services: ${services}`);

  if (data.name) {
    parts.push(`* Name: ${data.name}`);
  }
  if (data.phone) {
    parts.push(`* Phone: ${data.phone}`);
  }
  if (data.notes && data.notes.trim()) {
    parts.push(`* Note: ${data.notes.trim()}`);
  }

  parts.push('\nLooking forward to discussing our celebration with your team.');
  return parts.join('\n');
}

export function buildWhatsAppUrl(data) {
  const text = formatWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
```

- [ ] **Step 5: Run tests to verify pass**

Run: `npx vitest run src/data/enquiryOptions.test.js src/utils/enquiryHelpers.test.js`
Expected: PASS (all tests pass).

---

### Task 3: Smart Enquiry Step Components & Wizard

**Files:**
- Create: `src/components/enquiry/EnquiryWizard.jsx`
- Create: `src/components/enquiry/StepEventOccasion.jsx`
- Create: `src/components/enquiry/StepLocationDate.jsx`
- Create: `src/components/enquiry/StepServicesContact.jsx`
- Create: `src/components/enquiry/StepConfirmation.jsx`
- Create: `src/components/enquiry/EnquiryWizard.test.jsx`

**Interfaces:**
- `EnquiryWizard.jsx`: Accepts `initialValues`, handles step management (1 to 4), step progression, validation, and rendering of all sub-steps.

- [ ] **Step 1: Write failing tests for `EnquiryWizard`**

`src/components/enquiry/EnquiryWizard.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryWizard from './EnquiryWizard';

describe('EnquiryWizard', () => {
  it('renders Step 1 with all 8 event verticals initially', () => {
    render(<EnquiryWizard />);
    expect(screen.getByText('What event are you planning?')).toBeInTheDocument();
    expect(screen.getByText('Weddings')).toBeInTheDocument();
    expect(screen.getByText('Corporate Events')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  it('enables Continue when a vertical is selected', () => {
    render(<EnquiryWizard />);
    fireEvent.click(screen.getByText('Weddings'));
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).not.toBeDisabled();
  });

  it('navigates through steps and validates contact info in Step 3', () => {
    render(<EnquiryWizard />);
    fireEvent.click(screen.getByText('Weddings'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 2: Location & Timing
    expect(screen.getByText('Where and when will it happen?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 3: Services & Details
    expect(screen.getByText('What services do you need?')).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /review enquiry/i });

    // Trying to submit without name and phone shows validation errors
    fireEvent.click(submitBtn);
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();

    // Fill contact details
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Aman Verma' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.click(submitBtn);

    // Step 4: Confirmation
    expect(screen.getByText(/your enquiry is ready to send/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /send on whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy summary/i })).toBeInTheDocument();
  });

  it('pre-fills context from initialValues and jumps to Step 2', () => {
    const initialValues = {
      vertical: 'weddings',
      experience: 'haldi',
    };
    render(<EnquiryWizard initialValues={initialValues} />);
    expect(screen.getByText('Where and when will it happen?')).toBeInTheDocument();
    expect(screen.getByText(/weddings — haldi/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/components/enquiry/EnquiryWizard.test.jsx`
Expected: FAIL (`Cannot find module`).

- [ ] **Step 3: Implement step components and wizard**

Implement `StepEventOccasion.jsx`, `StepLocationDate.jsx`, `StepServicesContact.jsx`, `StepConfirmation.jsx`, and `EnquiryWizard.jsx`.

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run src/components/enquiry/EnquiryWizard.test.jsx`
Expected: PASS (all tests pass).

---

### Task 4: Smart Enquiry Page & Routing

**Files:**
- Create: `src/pages/SmartEnquiry.jsx`
- Create: `src/pages/SmartEnquiry.test.jsx`
- Modify: `src/AppRoutes.jsx`
- Modify: `src/AppRoutes.test.jsx`

- [ ] **Step 1: Write failing tests for `SmartEnquiry` page and route**

`src/pages/SmartEnquiry.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SmartEnquiry from './SmartEnquiry';

describe('SmartEnquiry Page', () => {
  it('renders page heading and the enquiry wizard', () => {
    render(
      <MemoryRouter>
        <SmartEnquiry />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: /plan your event/i })).toBeInTheDocument();
  });

  it('extracts query params and initializes context', () => {
    render(
      <MemoryRouter initialEntries={['/enquire?vertical=corporate-events&experience=product-launch']}>
        <SmartEnquiry />
      </MemoryRouter>
    );
    expect(screen.getByText(/corporate events/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/pages/SmartEnquiry.test.jsx`
Expected: FAIL (`Cannot find module`).

- [ ] **Step 3: Implement `src/pages/SmartEnquiry.jsx` and wire in `src/AppRoutes.jsx`**

`SmartEnquiry.jsx` sets page title via `usePageMeta`, parses search params with `useSearchParams`, and mounts `EnquiryWizard`.
`AppRoutes.jsx` adds `<Route path="/enquire" element={<SmartEnquiry />} />`.

- [ ] **Step 4: Update `src/AppRoutes.test.jsx` and verify tests pass**

Add test case in `AppRoutes.test.jsx` checking that `/enquire` renders `SmartEnquiry`.
Run: `npx vitest run src/pages/SmartEnquiry.test.jsx src/AppRoutes.test.jsx`
Expected: PASS.

---

### Task 5: Locations Page & Route

**Files:**
- Create: `src/pages/Locations.jsx`
- Create: `src/pages/Locations.test.jsx`
- Modify: `src/AppRoutes.jsx`
- Modify: `src/AppRoutes.test.jsx`

- [ ] **Step 1: Write failing tests for `Locations` page**

`src/pages/Locations.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Locations from './Locations';
import { ADDRESS, PHONE_DISPLAY, EMAIL } from '../data/contact';

describe('Locations Page', () => {
  it('renders Ranchi primary studio details accurately', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: /where we work/i })).toBeInTheDocument();
    expect(screen.getByText(ADDRESS)).toBeInTheDocument();
    expect(screen.getByText(PHONE_DISPLAY)).toBeInTheDocument();
    expect(screen.getByText(EMAIL)).toBeInTheDocument();
  });

  it('renders outstation event capability section with honest process', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    expect(screen.getByText(/outstation & destination celebrations/i)).toBeInTheDocument();
    expect(screen.getByText(/remote design & consultation/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquire for outstation/i })).toBeInTheDocument();
  });

  it('includes an interactive map link', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    const mapLink = screen.getByRole('link', { name: /view on google maps/i });
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/pages/Locations.test.jsx`
Expected: FAIL (`Cannot find module`).

- [ ] **Step 3: Implement `src/pages/Locations.jsx` and wire in `src/AppRoutes.jsx`**

Implement `Locations.jsx` using `locationsData`, `usePageMeta`, and brand styling. Wire `/locations` route in `AppRoutes.jsx`.

- [ ] **Step 4: Update `src/AppRoutes.test.jsx` and verify tests pass**

Run: `npx vitest run src/pages/Locations.test.jsx src/AppRoutes.test.jsx`
Expected: PASS.

---

### Task 6: Context Preservation on Experience Pages

**Files:**
- Modify: `src/pages/ExperienceDetail.jsx`
- Modify: `src/pages/ExperienceDetail.test.jsx`
- Modify: `src/pages/VerticalExperienceDetail.jsx`
- Modify: `src/pages/VerticalExperienceDetail.test.jsx`

- [ ] **Step 1: Write assertions in tests checking contextual enquiry links**

Assert that `ExperienceDetail` and `VerticalExperienceDetail` render a link:
`Plan with Detailed Enquiry` pointing to `/enquire?vertical=...&experience=...`.

- [ ] **Step 2: Update `ExperienceDetail.jsx` and `VerticalExperienceDetail.jsx`**

Add the secondary action link alongside `WhatsAppCTA`:
```jsx
<Link
  to={`/enquire?vertical=${verticalSlug}&experience=${item.slug}`}
  className="mt-4 sm:mt-10 sm:ml-4 inline-block border border-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-gold hover:bg-gold hover:text-charcoal transition-colors"
>
  Plan With Smart Enquiry
</Link>
```

- [ ] **Step 3: Run tests to verify pass**

Run: `npx vitest run src/pages/ExperienceDetail.test.jsx src/pages/VerticalExperienceDetail.test.jsx`
Expected: PASS.

---

### Task 7: Navigation & Homepage Teaser Rewiring

**Files:**
- Modify: `src/data/nav.js`
- Modify: `src/data/nav.test.js`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.test.jsx`
- Modify: `src/components/MobileDrawer.jsx`
- Modify: `src/components/MobileDrawer.test.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.test.jsx`
- Modify: `src/data/homeTeasers.js`
- Modify: `src/data/homeTeasers.test.js`

- [ ] **Step 1: Update `nav.js` and `homeTeasers.js`**

`nav.js`: Add `{ label: 'Locations', href: '/locations' }`.
`homeTeasers.js`: Update `locations` teaser `href` to `/locations`, `ctaLabel` to `'Explore Locations'`.

- [ ] **Step 2: Update `Navbar.jsx`, `MobileDrawer.jsx`, and `Footer.jsx`**

`Navbar.jsx`: Add Enquire CTA button linking to `/enquire`.
`MobileDrawer.jsx`: Add Enquire button.
`Footer.jsx`: Add links to Locations and Enquire.

- [ ] **Step 3: Update tests and run test suite**

Run: `npx vitest run src/data/nav.test.js src/data/homeTeasers.test.js src/components/Navbar.test.jsx src/components/MobileDrawer.test.jsx src/components/Footer.test.jsx`
Expected: PASS.

---

### Task 8: Full Regression Suite and Production Build

**Files:**
- Run full test suite across all 165+ test files.
- Run `npm run build` to verify clean production distribution.

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: All tests pass (0 failures).

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with 0 errors/warnings.
