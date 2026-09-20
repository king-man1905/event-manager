# Weddings Flagship (Phase 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic Weddings stub with the full six-layer Weddings flagship experience (Cultural Weddings, Functions & Rituals, Experiences, Décor, Planning, Real Weddings) on top of the existing Phase 1 foundation, touching no Phase 1 file except two additive route entries.

**Architecture:** Four new flat data files (one per routed layer) feed one generic `ExperienceDetail` page component via a `:layer` route param, plus a `WeddingsHub` page composing all six layers. `EventCard` (Phase 1) gets a small, backward-compatible extension to support image-optional cards for the three items with no honestly-matched photograph. Everything else Phase 1 built (`EditorialGrid`, `SectionHeading`, `WhatsAppCTA`, `ScrollToHash`, `Navbar`, `Footer`, `getImage`) is reused completely unchanged.

**Tech Stack:** Same as Phase 1 — Vite, React (JS, no TypeScript), react-router-dom v6, Tailwind CSS v3, Vitest + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-09-20-weddings-flagship-design.md` (and the Phase 1 spec it extends: `docs/superpowers/specs/2026-09-20-nle-foundation-design.md`)

## Global Constraints

- JavaScript only, no TypeScript.
- Do not modify `Navbar.jsx`, `Footer.jsx`, `EditorialGrid.jsx`, `SectionHeading.jsx`, `WhatsAppCTA.jsx`, `ScrollToHash.jsx`, `contact.js`, `events.js`, `nav.js`, `images.js`, `Home.jsx`, or any homepage section component. Only `EventCard.jsx` gets a small additive change (Task 3); everything else new is a new file.
- Verified WhatsApp number `917903133317` — every CTA message must be genuinely contextual per the brief's example format ("I'm interested in a [X] for my wedding in Ranchi"), never generic.
- Every image reference goes through `getImage(id)` — except the three items with `imageId: null`, which render the new image-optional panel instead of an `<img>`. No component ever holds a bare image URL.
- Every card, button, and route must lead somewhere real — no dead ends, including the three image-optional items, which still get a full route, real copy, related links, and a working CTA.
- Never invent reviews, ratings, statistics, or "featured weddings." The Real Weddings section states content is pending, honestly.
- `depth: 'full'` items render description + what-we-handle + gallery; `depth: 'light'` items render hero + teaser only. Both get related-experiences and a CTA.

---

### Task 1: Wedding data files and image manifest

**Files:**
- Create: `src/data/culturalWeddings.js`, `src/data/weddingFunctions.js`, `src/data/weddingExperiences.js`, `src/data/weddingDecor.js`
- Modify: `src/assets/manifest.json` (add 22 new entries; the 9 existing Phase 1 entries are untouched)
- Test: `src/data/culturalWeddings.test.js`, `src/data/weddingFunctions.test.js`, `src/data/weddingExperiences.test.js`, `src/data/weddingDecor.test.js`

**Interfaces:**
- Consumes: `getImage` from `src/data/images.js` (Phase 1, unchanged — validation only).
- Produces: four exported arrays, each entry `{ slug, label, imageId (string or null), depth: 'full' | 'light', teaser, description? (string, full only), whatWeHandle? (string[], full only), href }`.

- [ ] **Step 1: Write the failing tests**

`src/data/culturalWeddings.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { culturalWeddings } from './culturalWeddings';
import { getImage } from './images';

describe('culturalWeddings data', () => {
  it('has ten entries with valid fields', () => {
    expect(culturalWeddings).toHaveLength(10);
    culturalWeddings.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/weddings/cultural/${item.slug}`);
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
    const slugs = culturalWeddings.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly five full-depth entries', () => {
    expect(culturalWeddings.filter((item) => item.depth === 'full')).toHaveLength(5);
  });
});
```

`src/data/weddingFunctions.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { weddingFunctions } from './weddingFunctions';
import { getImage } from './images';

describe('weddingFunctions data', () => {
  it('has ten entries with valid fields', () => {
    expect(weddingFunctions).toHaveLength(10);
    weddingFunctions.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/weddings/functions/${item.slug}`);
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
    const slugs = weddingFunctions.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly six full-depth entries', () => {
    expect(weddingFunctions.filter((item) => item.depth === 'full')).toHaveLength(6);
  });

  it('has exactly two image-optional entries (Cocktail and Vidaai)', () => {
    const withoutImage = weddingFunctions.filter((item) => item.imageId === null);
    expect(withoutImage.map((item) => item.slug).sort()).toEqual(['cocktail', 'vidaai']);
  });
});
```

`src/data/weddingExperiences.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { weddingExperiences } from './weddingExperiences';
import { getImage } from './images';

describe('weddingExperiences data', () => {
  it('has five entries with valid fields', () => {
    expect(weddingExperiences).toHaveLength(5);
    weddingExperiences.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(['full', 'light']).toContain(item.depth);
      expect(() => getImage(item.imageId)).not.toThrow();
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('routes each item to /events/weddings/experiences/:slug, except decor-styling which cross-links into the Décor layer', () => {
    weddingExperiences.forEach((item) => {
      if (item.slug === 'decor-styling') {
        expect(item.href).toBe('/events/weddings#decor');
      } else {
        expect(item.href).toBe(`/events/weddings/experiences/${item.slug}`);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = weddingExperiences.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

`src/data/weddingDecor.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { weddingDecor } from './weddingDecor';
import { getImage } from './images';

describe('weddingDecor data', () => {
  it('has eight entries with valid fields', () => {
    expect(weddingDecor).toHaveLength(8);
    weddingDecor.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/weddings/decor/${item.slug}`);
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
    const slugs = weddingDecor.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one image-optional entry (Table/Venue Styling)', () => {
    const withoutImage = weddingDecor.filter((item) => item.imageId === null);
    expect(withoutImage.map((item) => item.slug)).toEqual(['venue-styling']);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found (`./culturalWeddings`, etc.)

- [ ] **Step 3: Add the 22 new manifest entries**

Open `src/assets/manifest.json` (it currently has 9 entries from Phase 1 — `hero-home`, `vertical-weddings`, `vertical-corporate`, `vertical-social`, `vertical-kids-family`, `vertical-entertainment`, `vertical-decor`, `vertical-cultural`, `vertical-destination`). Add these 22 entries alongside the existing ones (do not remove or alter any existing entry):

```json
  "wedding-cultural-north-indian": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg",
    "source": "Wikimedia Commons — iMahesh, \"Indian Wedding Ritual - Jaimala or Varmala (01)\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Hindu bride and groom exchanging floral garlands during the jaimala ritual, mandap decorated with fairy lights behind them",
    "status": "placeholder",
    "note": "Jaimala/varmala is the ritual most associated with North Indian Hindu weddings specifically, distinguishing it from the South Indian and Bengali ceremony styles sourced separately."
  },
  "wedding-cultural-south-indian": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Wedding_ceremony_in_Tamil_Nadu_01.jpg/1280px-Wedding_ceremony_in_Tamil_Nadu_01.jpg",
    "source": "Wikimedia Commons — Kritzolina, \"Wedding ceremony in Tamil Nadu 01\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Tamil Hindu bride in a red and gold silk saree performing a traditional ritual with her seated parents",
    "status": "placeholder",
    "note": "Genuine Tamil Nadu wedding ritual, distinct ceremony style and attire from North Indian weddings."
  },
  "wedding-cultural-punjabi": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Sikh_wedding_ceremony_in_a_Gurudwara.jpg/1280px-Sikh_wedding_ceremony_in_a_Gurudwara.jpg",
    "source": "Wikimedia Commons — Japleenpasricha, \"Sikh wedding ceremony in a Gurudwara\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Sikh bride and groom facing the Guru Granth Sahib under a gold canopy in a Gurudwara",
    "status": "placeholder",
    "note": "Unambiguously Sikh/Punjabi — Guru Granth Sahib and Ik Onkar symbol visible in a Gurudwara setting."
  },
  "wedding-cultural-bengali": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Portrait_of_a_Bengali_Bride_01.jpg/1280px-Portrait_of_a_Bengali_Bride_01.jpg",
    "source": "Wikimedia Commons — Goutam1962, \"Portrait of a Bengali Bride 01\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Bengali bride in a red and gold Benarasi saree with a sheer red veil, gold jewelry and a nose ring",
    "status": "placeholder",
    "note": "Distinctive Bengali bridal styling — red Benarasi saree, nath (nose ring), red chandan forehead pattern."
  },
  "wedding-cultural-rajasthani": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rajasthani_Bride_in_Traditional_Attire.jpg/1280px-Rajasthani_Bride_in_Traditional_Attire.jpg",
    "source": "Wikimedia Commons — Prithvipalsinghrathore, \"Rajasthani Bride in Traditional Attire\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Rajasthani bride in a red gota-patti embroidered lehenga in front of a colourful bandhani textile backdrop",
    "status": "placeholder",
    "note": "Distinctly Rajasthani gota-patti embroidery and bandhani/patchwork textile setting."
  },
  "wedding-cultural-gujarati": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Hindu_Bride%2C_Ahmedabad%2C_Gujarat.jpg/1280px-Hindu_Bride%2C_Ahmedabad%2C_Gujarat.jpg",
    "source": "Wikimedia Commons — Yann Forget, \"Hindu Bride, Ahmedabad, Gujarat\" (Commons Featured Picture)",
    "license": "CC BY-SA 4.0",
    "altText": "A Gujarati bride in red and green panetar bridal wear holding a ceremonial copper kalash topped with a coconut",
    "status": "placeholder",
    "note": "Panetar-style bridal wear and the kalash ritual are specifically Gujarati."
  },
  "wedding-cultural-muslim": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Nikah_%28Marriage_in_Islam%29.jpg/1280px-Nikah_%28Marriage_in_Islam%29.jpg",
    "source": "Wikimedia Commons — Saddam19, \"Nikah (Marriage in Islam)\"",
    "license": "CC BY-SA 4.0",
    "altText": "A groom in a gold sherwani during a Nikah ceremony, surrounded by men in white kurtas and topi caps as the marriage contract is signed",
    "status": "placeholder",
    "note": "Unambiguous Nikah ceremony imagery — marriage contract signing, topi caps, no visual ambiguity with a Hindu ceremony."
  },
  "wedding-cultural-christian": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Kerala_Christian_Wedding.jpg/1280px-Kerala_Christian_Wedding.jpg",
    "source": "Wikimedia Commons — Nikhil Jose 7, \"Kerala Christian Wedding\"",
    "license": "CC BY-SA 4.0",
    "altText": "A Kerala Christian bride in a cream saree and groom in a dark suit walking under an umbrella with tropical palm trees behind them",
    "status": "placeholder",
    "note": "Cream saree bridal colour and Western-suit groom attire are distinctly Kerala Christian, not Hindu-red."
  },
  "wedding-function-haldi": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Haldi_Ceremony_-_An_Indian_Wedding_Ritual.jpg/1280px-Haldi_Ceremony_-_An_Indian_Wedding_Ritual.jpg",
    "source": "Wikimedia Commons — The open draft, \"Haldi Ceremony - An Indian Wedding Ritual\"",
    "license": "CC BY-SA 4.0",
    "altText": "A bride in yellow seated while family members apply turmeric paste to her face and arms during the Haldi ceremony",
    "status": "placeholder"
  },
  "wedding-function-mehendi": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bridal_Mehndi.JPG/1280px-Bridal_Mehndi.JPG",
    "source": "Wikimedia Commons — Iramuthusamy, \"Bridal Mehndi\"",
    "license": "CC BY-SA 3.0",
    "altText": "A close-up of a bride's two open palms fully covered in intricate henna patterns with gold bangles",
    "status": "placeholder"
  },
  "wedding-function-sangeet": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Indian_wedding_sangeet.jpg/1280px-Indian_wedding_sangeet.jpg",
    "source": "Wikimedia Commons — 03Ani03, \"Indian wedding sangeet\"",
    "license": "CC BY-SA 4.0",
    "altText": "A night-time Sangeet stage performance with a floral arch backdrop, string lights and rose petals scattered on the floor",
    "status": "placeholder"
  },
  "wedding-function-baraat": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/A_wedding_procession_with_the_bridegroom_on_a_horse%2C_Pushkar%2C_Rajasthan.jpg/1280px-A_wedding_procession_with_the_bridegroom_on_a_horse%2C_Pushkar%2C_Rajasthan.jpg",
    "source": "Wikimedia Commons — Flickr user pnglife (via FlickreviewR), \"A wedding procession with the bridegroom on a horse, Pushkar, Rajasthan\"",
    "license": "CC BY-SA 2.0",
    "altText": "A groom in an ornate turban riding a white horse through a market street at night during a baraat procession",
    "status": "placeholder"
  },
  "wedding-function-reception": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/MarriageRECEPTION-India-tamilword23.2.jpg/960px-MarriageRECEPTION-India-tamilword23.2.jpg",
    "source": "Wikimedia Commons — தமிழ்உழவன், \"MarriageRECEPTION-India-tamilword23.2\"",
    "license": "Public Domain",
    "altText": "A decorated Indian wedding reception stage with a red velvet seat for the couple and a floral arch backdrop",
    "status": "placeholder"
  },
  "wedding-function-engagement": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Indian_engagement_ceremony_03.jpg/1280px-Indian_engagement_ceremony_03.jpg",
    "source": "Wikimedia Commons — AmanAgrahari01, \"Indian engagement ceremony 03\"",
    "license": "CC BY-SA 4.0",
    "altText": "A priest-led Indian engagement ceremony ritual around a decorated puja table with marigold garlands and a kalash",
    "status": "placeholder"
  },
  "wedding-function-jaimala": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2802%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2802%29.jpg",
    "source": "Wikimedia Commons — iMahesh, \"Indian Wedding Ritual - Jaimala or Varmala (02)\"",
    "license": "CC BY-SA 4.0",
    "altText": "A groom placing a floral garland around the bride's neck during the jaimala ceremony, both smiling closely",
    "status": "placeholder"
  },
  "wedding-experience-special-entry": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dancing_Barajatri_With_Bridegroom_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7878.JPG/1280px-Dancing_Barajatri_With_Bridegroom_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7878.JPG",
    "source": "Wikimedia Commons — Biswarup Ganguly, \"Dancing Barajatri With Bridegroom - Odia Hindu Wedding Ceremony\"",
    "license": "CC BY-SA 4.0",
    "altText": "A groom in an ornate gold-embroidered sherwani and maroon turban greeting with folded hands during his baraat entrance",
    "status": "placeholder"
  },
  "wedding-experience-photography": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Candid_Photography_in_Trichy.jpg/1280px-Candid_Photography_in_Trichy.jpg",
    "source": "Wikimedia Commons — Selva wedding photography, \"Candid Photography in Trichy\"",
    "license": "CC BY-SA 4.0",
    "altText": "A close-up candid shot of a bride and groom's hands with henna and bangles during a South Indian wedding ritual",
    "status": "placeholder"
  },
  "wedding-experience-guest": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Best_Wedding_venues_in_pune.jpg/1280px-Best_Wedding_venues_in_pune.jpg",
    "source": "Wikimedia Commons — Bhanu2398, \"Best Wedding venues in pune\"",
    "license": "CC BY-SA 4.0",
    "altText": "Wedding guests dressed in yellow seated at an outdoor function with marigold decorations and a golden-hour sky",
    "status": "placeholder"
  },
  "wedding-decor-floral": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sustainable_flower_decoration.jpg/1280px-Sustainable_flower_decoration.jpg",
    "source": "Wikimedia Commons — Megh Banthia, \"Sustainable flower decoration\"",
    "license": "CC BY-SA 4.0",
    "altText": "A decorative arch draped in yellow fabric and marigold flowers with urns of marigold blooms, Udaipur",
    "status": "placeholder"
  },
  "wedding-decor-lighting": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Wedding_Lights.jpg/1280px-Wedding_Lights.jpg",
    "source": "Wikimedia Commons — HiDave1, \"Wedding Lights\"",
    "license": "CC BY-SA 4.0",
    "altText": "A banquet hall ceiling with multiple crystal chandeliers and gold moulding, captioned as Indian wedding lighting",
    "status": "placeholder"
  },
  "wedding-decor-stage": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Wedding_Stage.jpg/1280px-Wedding_Stage.jpg",
    "source": "Wikimedia Commons — Kasyap, \"Wedding Stage\"",
    "license": "CC BY-SA 4.0",
    "altText": "A gold-pillared Indian wedding stage with deity idols and red, white and maroon floral garlands",
    "status": "placeholder"
  },
  "wedding-decor-backdrop": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marriage_decorations.jpg/960px-Marriage_decorations.jpg",
    "source": "Wikimedia Commons — Mahalaxmi dev, \"Marriage decorations\"",
    "license": "CC BY-SA 4.0",
    "altText": "A decorated indoor floral wall backdrop with hanging bells and pink drapery at a pre-wedding function",
    "status": "placeholder-lower-resolution — use at card scale, not full-bleed hero"
  }
```

Note: `wedding-decor-backdrop`'s `status` value is intentionally more descriptive than the two-value enum other entries use, because its resolution (720×1280) genuinely limits how it can be displayed — record this in the plan's task review as a deliberate, documented exception, not an oversight (unlike Phase 1's accidental non-conformant value, this one is a controller decision carried into the plan explicitly).

- [ ] **Step 4: Write culturalWeddings.js**

`src/data/culturalWeddings.js`:

```js
export const culturalWeddings = [
  {
    slug: 'north-indian',
    label: 'North Indian',
    imageId: 'wedding-cultural-north-indian',
    depth: 'full',
    teaser: 'A grand mandap, vibrant colour and a full day of rituals — the North Indian wedding most guests picture first.',
    description: 'North Indian Hindu weddings are built around a sequence of distinct functions — Haldi, Sangeet, Baraat, the Pheras around the sacred fire — each with its own energy, décor and guest experience. We plan the full sequence as one coordinated event, not a string of separate bookings.',
    whatWeHandle: [
      'Mandap styling in the regional aesthetic',
      'Baraat entry coordination',
      'Full-day ritual sequencing from Haldi through Reception',
      'Vendor coordination for priests and caterers specific to the tradition',
    ],
    href: '/events/weddings/cultural/north-indian',
  },
  {
    slug: 'south-indian',
    label: 'South Indian',
    imageId: 'wedding-cultural-south-indian',
    depth: 'full',
    teaser: 'Temple-style mandaps, classical rituals and a more understated, traditional palette.',
    description: 'South Indian weddings follow a precise ceremonial structure — the muhurtham (auspicious time), the kanyadaan, and rituals like Oonjal and Saptapadi — set within simpler, temple-inspired décor. We plan around the exact timing these ceremonies require.',
    whatWeHandle: [
      'Temple-style mandap and kalyana mandapam styling',
      'Muhurtham timing and ritual sequencing',
      'Traditional attire and garland coordination',
      'Regional catering coordination',
    ],
    href: '/events/weddings/cultural/south-indian',
  },
  {
    slug: 'punjabi',
    label: 'Punjabi',
    imageId: 'wedding-cultural-punjabi',
    depth: 'full',
    teaser: 'High-energy baraats, dhol and a celebration built around music from the first morning.',
    description: 'Punjabi weddings are loud, warm and music-led — from the dhol at the baraat to the Anand Karaj ceremony and a sangeet built for dancing. We coordinate the entertainment and staging this style depends on.',
    whatWeHandle: [
      'Dhol and baraat entry coordination',
      'Anand Karaj ceremony staging',
      'Sangeet and giddha stage and sound',
      'Regional catering coordination',
    ],
    href: '/events/weddings/cultural/punjabi',
  },
  {
    slug: 'bengali',
    label: 'Bengali',
    imageId: 'wedding-cultural-bengali',
    depth: 'full',
    teaser: 'Conch shells, red-and-white bridal saris and rituals rooted in Bengali tradition.',
    description: 'Bengali weddings carry distinct rituals — the Bor Jatri procession, Shubho Drishti, and Mala Bodol — with the bride in the traditional red-and-white Benarasi saree. We plan around this specific ceremonial order.',
    whatWeHandle: [
      "Bor Jatri (groom's procession) coordination",
      'Traditional mandap and ceremony staging',
      'Regional catering coordination',
      'Photography timed to key rituals',
    ],
    href: '/events/weddings/cultural/bengali',
  },
  {
    slug: 'rajasthani',
    label: 'Rajasthani',
    imageId: 'wedding-cultural-rajasthani',
    depth: 'full',
    teaser: 'Palace-scale décor, turbans and a wedding styled with royal Rajasthani grandeur.',
    description: 'Rajasthani weddings lean into scale — heritage venues, turbaned processions and richly coloured textiles. We coordinate the venue and décor to match that grandeur without losing the practical logistics of a large celebration.',
    whatWeHandle: [
      'Palace or heritage-venue coordination',
      'Turban and regal décor styling',
      'Baraat procession staging suited to the venue',
      'Regional catering coordination',
    ],
    href: '/events/weddings/cultural/rajasthani',
  },
  {
    slug: 'gujarati',
    label: 'Gujarati',
    imageId: 'wedding-cultural-gujarati',
    depth: 'light',
    teaser: 'Garba-led sangeet nights and a warm, community-centred celebration style.',
    href: '/events/weddings/cultural/gujarati',
  },
  {
    slug: 'muslim',
    label: 'Muslim',
    imageId: 'wedding-cultural-muslim',
    depth: 'light',
    teaser: 'A Nikah ceremony and Walima reception, planned with the right rituals and pacing.',
    href: '/events/weddings/cultural/muslim',
  },
  {
    slug: 'christian',
    label: 'Christian',
    imageId: 'wedding-cultural-christian',
    depth: 'light',
    teaser: 'A church ceremony followed by a reception, styled for an Indian Christian wedding.',
    href: '/events/weddings/cultural/christian',
  },
  {
    slug: 'destination',
    label: 'Destination',
    imageId: 'vertical-destination',
    depth: 'light',
    teaser: 'The same full planning, delivered at a venue away from home — coordinated remotely, executed on site.',
    href: '/events/weddings/cultural/destination',
  },
  {
    slug: 'fusion',
    label: 'Fusion / Multicultural',
    imageId: 'vertical-social',
    depth: 'light',
    teaser: 'Two families, two traditions — a ceremony that blends both respectfully.',
    href: '/events/weddings/cultural/fusion',
  },
];
```

- [ ] **Step 5: Write weddingFunctions.js**

`src/data/weddingFunctions.js`:

```js
export const weddingFunctions = [
  {
    slug: 'engagement',
    label: 'Engagement / Ring Ceremony',
    imageId: 'wedding-function-engagement',
    depth: 'light',
    teaser: 'The formal start — ring exchange, styled simply and elegantly.',
    href: '/events/weddings/functions/engagement',
  },
  {
    slug: 'haldi',
    label: 'Haldi',
    imageId: 'wedding-function-haldi',
    depth: 'full',
    teaser: 'Turmeric, marigold and an intimate, joyful morning ritual.',
    description: "Haldi is the wedding's first celebration — turmeric paste applied by family in a relaxed, playful setting. We style the space in the yellow-and-marigold palette the ritual calls for and keep the morning easy to run.",
    whatWeHandle: [
      'Turmeric-toned décor and seating',
      'Marigold styling',
      'Music and casual catering coordination',
      'Photography for the ritual',
    ],
    href: '/events/weddings/functions/haldi',
  },
  {
    slug: 'mehendi',
    label: 'Mehendi',
    imageId: 'wedding-function-mehendi',
    depth: 'full',
    teaser: 'Henna artists, a lounge setup and music for the most relaxed pre-wedding day.',
    description: 'Mehendi is the day guests actually get to sit, relax and enjoy — henna artists, music and a lounge-style setup. We coordinate the artists and the space so the day runs at its own easy pace.',
    whatWeHandle: [
      'Henna artist coordination',
      'Lounge and seating layout',
      'Music and light catering',
      'Photo-corner styling',
    ],
    href: '/events/weddings/functions/mehendi',
  },
  {
    slug: 'sangeet',
    label: 'Sangeet',
    imageId: 'wedding-function-sangeet',
    depth: 'full',
    teaser: "Performances, a dance floor and a stage built for the night's biggest show.",
    description: 'Sangeet is the performance night — family acts, choreographed numbers and a dance floor that has to work for everyone after. We design the stage, sound and lighting to support whatever the families plan to perform.',
    whatWeHandle: [
      'Stage and dance-floor design',
      'Sound and lighting',
      'Performance and entertainment coordination',
      'Guest seating layout',
    ],
    href: '/events/weddings/functions/sangeet',
  },
  {
    slug: 'cocktail',
    label: 'Cocktail',
    imageId: null,
    depth: 'light',
    teaser: 'An evening event with its own bar, lighting and mood — distinct from the reception.',
    href: '/events/weddings/functions/cocktail',
  },
  {
    slug: 'baraat',
    label: 'Baraat',
    imageId: 'wedding-function-baraat',
    depth: 'full',
    teaser: "Dhol, procession styling and an entry built to be the day's first big moment.",
    description: "The baraat is the groom's procession to the venue — dhol, dancing and an entry that sets the tone for the wedding ceremony that follows. We coordinate the music, route and timing so it lands as the moment it's meant to be.",
    whatWeHandle: [
      'Dhol and band coordination',
      'Procession route and entry styling',
      'Horse or car arrangement coordination where applicable',
      'Photography and videography for the entry',
    ],
    href: '/events/weddings/functions/baraat',
  },
  {
    slug: 'jaimala',
    label: 'Jaimala / Varmala',
    imageId: 'wedding-function-jaimala',
    depth: 'light',
    teaser: "The garland exchange, staged and lit as the ceremony's centrepiece moment.",
    href: '/events/weddings/functions/jaimala',
  },
  {
    slug: 'mandap-ceremony',
    label: 'Wedding Ceremony / Mandap',
    imageId: 'vertical-weddings',
    depth: 'full',
    teaser: 'The mandap, the pheras, the priest — the ceremony itself, planned down to the sequence.',
    description: "The ceremony itself — the mandap, the priest-led rituals, the pheras around the sacred fire. This is the day's most important sequence, and we plan the décor, seating and timing around it precisely.",
    whatWeHandle: [
      'Mandap design and floral styling',
      'Priest and ritual-sequence coordination',
      'Seating for the ceremony',
      'Photography and videography coverage',
    ],
    href: '/events/weddings/functions/mandap-ceremony',
  },
  {
    slug: 'vidaai',
    label: 'Vidaai',
    imageId: null,
    depth: 'light',
    teaser: "The bride's farewell — planned with the same care as every celebration before it.",
    href: '/events/weddings/functions/vidaai',
  },
  {
    slug: 'reception',
    label: 'Reception',
    imageId: 'wedding-function-reception',
    depth: 'full',
    teaser: "The final celebration — stage, entry and floor, built for the largest guest list of the wedding.",
    description: "The reception is usually the wedding's largest single gathering — a stage entry, dinner service and a dance floor for a guest list bigger than any other function. We plan the logistics at that scale.",
    whatWeHandle: [
      'Stage and entry design',
      'Lighting and sound',
      'Catering coordination at scale',
      'Guest-flow and seating planning',
    ],
    href: '/events/weddings/functions/reception',
  },
];
```

- [ ] **Step 6: Write weddingExperiences.js**

`src/data/weddingExperiences.js`:

```js
export const weddingExperiences = [
  {
    slug: 'special-entry',
    label: 'Special Entry',
    imageId: 'wedding-experience-special-entry',
    depth: 'full',
    teaser: 'A bride, groom or couple entry styled to be the moment guests remember.',
    description: "A well-planned entry — traditional, themed or cinematic — is often the most photographed moment of the day. We design the concept and coordinate it with entertainment and photography so it actually lands as planned.",
    whatWeHandle: [
      'Entry concept and styling (traditional, themed or cinematic)',
      'Coordination with entertainment/dhol for the entry moment',
      'Photography and videography timed to the entry',
    ],
    href: '/events/weddings/experiences/special-entry',
  },
  {
    slug: 'entertainment',
    label: 'Entertainment',
    imageId: 'vertical-entertainment',
    depth: 'full',
    teaser: 'Dhol, DJs, dancers and performers, scheduled around your actual day.',
    description: 'From a dhol-led baraat to a DJ-run reception floor, entertainment needs to be booked and scheduled around your actual run-of-show, not generic packages. We coordinate every performer against your real timeline.',
    whatWeHandle: [
      'Dhol and live band booking',
      'DJ and sound coordination',
      'Dancer and performer booking',
      'Anchor and MC coordination',
    ],
    href: '/events/weddings/experiences/entertainment',
  },
  {
    slug: 'photography',
    label: 'Photography & Cinematic Videography',
    imageId: 'wedding-experience-photography',
    depth: 'full',
    teaser: 'Candid, traditional and cinematic coverage, coordinated as part of the same day.',
    description: 'Candid moments, traditional formal shots and a cinematic wedding film all need to be coordinated as one coverage plan, not three separate bookings pulling guests in different directions.',
    whatWeHandle: [
      'Candid photography',
      'Traditional photography',
      'Cinematic wedding films',
      'Drone coverage where venue and regulations permit',
    ],
    href: '/events/weddings/experiences/photography',
  },
  {
    slug: 'decor-styling',
    label: 'Décor & Styling',
    imageId: 'vertical-decor',
    depth: 'light',
    teaser: 'Every visual element of the day, styled as one look — see the full Décor section.',
    href: '/events/weddings#decor',
  },
  {
    slug: 'guest-experience',
    label: 'Guest Experience',
    imageId: 'wedding-experience-guest',
    depth: 'light',
    teaser: 'Seating, flow and hospitality that keep guests comfortable through a long celebration.',
    href: '/events/weddings/experiences/guest-experience',
  },
];
```

- [ ] **Step 7: Write weddingDecor.js**

`src/data/weddingDecor.js`:

```js
export const weddingDecor = [
  {
    slug: 'mandap-decor',
    label: 'Mandap',
    imageId: 'vertical-weddings',
    depth: 'full',
    teaser: 'The ceremony\'s centrepiece, styled in floral and fabric to match your palette.',
    description: "The mandap is the visual centre of the ceremony — structure, floral work, fabric drape and lighting all have to come together as one design, not separate add-ons.",
    whatWeHandle: [
      'Structure and floral styling',
      'Fabric and drape design',
      'Lighting integration',
      'Setup and teardown',
    ],
    href: '/events/weddings/decor/mandap-decor',
  },
  {
    slug: 'stage',
    label: 'Stage',
    imageId: 'wedding-decor-stage',
    depth: 'full',
    teaser: 'Sangeet and reception stages, designed around lighting and scale.',
    description: 'A sangeet stage and a reception stage need different scale and lighting — one built for performance, one for a grand entry. We design each to the function it\'s actually serving.',
    whatWeHandle: [
      'Stage design and construction coordination',
      'Lighting and sound integration',
      'Scale planning for sangeet vs. reception',
    ],
    href: '/events/weddings/decor/stage',
  },
  {
    slug: 'floral',
    label: 'Floral Décor',
    imageId: 'wedding-decor-floral',
    depth: 'full',
    teaser: 'Fresh and styled floral work across the mandap, stage and entry.',
    description: 'Floral work carries the colour palette across every function — mandap, stage, entry and table styling all read as one look when the flowers are planned together rather than function by function.',
    whatWeHandle: [
      'Fresh floral sourcing and styling',
      'Garlands and installations',
      'Colour-palette matching across functions',
    ],
    href: '/events/weddings/decor/floral',
  },
  {
    slug: 'lighting',
    label: 'Lighting',
    imageId: 'wedding-decor-lighting',
    depth: 'full',
    teaser: 'Warm, dramatic or festive lighting design for every function.',
    description: 'Lighting changes the mood of the same space from a relaxed Mehendi afternoon to a dramatic Sangeet night. We design lighting per function, not one generic setup for the whole event.',
    whatWeHandle: [
      'Ambient and accent lighting design',
      'Festive and fairy-light installations',
      'Stage and mandap lighting integration',
    ],
    href: '/events/weddings/decor/lighting',
  },
  {
    slug: 'entry-decor',
    label: 'Entry Décor',
    imageId: 'vertical-decor',
    depth: 'light',
    teaser: 'The first visual guests see, styled to set the tone for the event.',
    href: '/events/weddings/decor/entry-decor',
  },
  {
    slug: 'backdrop',
    label: 'Backdrop',
    imageId: 'wedding-decor-backdrop',
    depth: 'light',
    teaser: 'A styled photo backdrop for the stage, entry or a dedicated photo corner.',
    href: '/events/weddings/decor/backdrop',
  },
  {
    slug: 'venue-styling',
    label: 'Table / Venue Styling',
    imageId: null,
    depth: 'light',
    teaser: 'Table settings and full-venue styling, coordinated with the overall theme.',
    href: '/events/weddings/decor/venue-styling',
  },
  {
    slug: 'theme-decor',
    label: 'Theme Décor',
    imageId: 'vertical-decor',
    depth: 'light',
    teaser: 'A cohesive theme carried across mandap, stage and every detail in between.',
    href: '/events/weddings/decor/theme-decor',
  },
];
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/assets/manifest.json src/data/culturalWeddings.js src/data/weddingFunctions.js src/data/weddingExperiences.js src/data/weddingDecor.js src/data/culturalWeddings.test.js src/data/weddingFunctions.test.js src/data/weddingExperiences.test.js src/data/weddingDecor.test.js
git commit -m "feat: add wedding cultural/functions/experiences/decor data and images"
```

---

### Task 2: Breadcrumb component

**Files:**
- Create: `src/components/Breadcrumb.jsx`
- Test: `src/components/Breadcrumb.test.jsx`

**Interfaces:**
- Produces: `Breadcrumb({ items })` where `items` is `Array<{ label, href? }>` — every item except the last renders as a `Link` (react-router); the last item (no `href`, or simply the final array entry) renders as plain text representing the current page.

- [ ] **Step 1: Write the failing test**

`src/components/Breadcrumb.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders every item except the last as a link, and the last as plain text', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Weddings', href: '/events/weddings' },
      { label: 'Cultural Weddings', href: '/events/weddings#cultural' },
      { label: 'North Indian' },
    ];
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Weddings' })).toHaveAttribute('href', '/events/weddings');
    expect(screen.getByRole('link', { name: 'Cultural Weddings' })).toHaveAttribute(
      'href',
      '/events/weddings#cultural'
    );
    expect(screen.queryByRole('link', { name: 'North Indian' })).not.toBeInTheDocument();
    expect(screen.getByText('North Indian')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './Breadcrumb'`

- [ ] **Step 3: Implement Breadcrumb**

`src/components/Breadcrumb.jsx`:

```jsx
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-charcoal/60">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {!isLast && item.href ? (
              <Link to={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal">{item.label}</span>
            )}
            {!isLast && <span aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Breadcrumb.jsx src/components/Breadcrumb.test.jsx
git commit -m "feat: add Breadcrumb component"
```

---

### Task 3: Image-optional support in EventCard

**Files:**
- Modify: `src/components/EventCard.jsx`
- Modify: `src/components/EventCard.test.jsx` (add a new test case; do not remove the existing one)

**Interfaces:**
- Consumes: same `{ event }` prop shape as before, where `event.imageId` may now be `null`.
- Produces: same default export — existing callers (Phase 1's `EventDiscovery`, using `events.js` where every `imageId` is a real string) are completely unaffected; this is a strictly additive branch.

- [ ] **Step 1: Write the failing test**

Add this test case to the existing `describe('EventCard', ...)` block in `src/components/EventCard.test.jsx` (keep the existing test as-is):

```jsx
it('renders a text-only panel instead of an image when imageId is null', () => {
  const event = {
    slug: 'cocktail',
    label: 'Cocktail',
    teaser: 'An evening event with its own bar, lighting and mood.',
    imageId: null,
    href: '/events/weddings/functions/cocktail',
  };
  render(
    <MemoryRouter>
      <EventCard event={event} />
    </MemoryRouter>
  );
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(screen.getByText('Cocktail')).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', event.href);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — the current `EventCard` unconditionally calls `getImage(event.imageId)`, which throws for `null`.

- [ ] **Step 3: Extend EventCard with the image-optional branch**

Replace the full contents of `src/components/EventCard.jsx` with:

```jsx
import { Link } from 'react-router-dom';
import { getImage } from '../data/images';

export default function EventCard({ event }) {
  const image = event.imageId ? getImage(event.imageId) : null;
  return (
    <Link to={event.href} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-neutral">
        {image ? (
          <img
            src={image.url}
            alt={image.altText}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal p-6 text-center">
            <span className="font-display text-2xl text-ivory">{event.label}</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal">{event.label}</h3>
      <p className="mt-1 text-sm text-charcoal/70">{event.teaser}</p>
    </Link>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — both the original EventCard test (unaffected, since `getImage` is still called for a real `imageId`) and the new one.

- [ ] **Step 5: Commit**

```bash
git add src/components/EventCard.jsx src/components/EventCard.test.jsx
git commit -m "feat: support image-optional cards in EventCard for items with no matched photo"
```

---

### Task 4: ExperienceDetail page (generic across all four wedding layers)

**Files:**
- Create: `src/pages/ExperienceDetail.jsx`
- Test: `src/pages/ExperienceDetail.test.jsx`

**Interfaces:**
- Consumes: `culturalWeddings`, `weddingFunctions`, `weddingExperiences`, `weddingDecor` (Task 1), `getImage` (Phase 1), `WhatsAppCTA` (Phase 1), `EventCard`, `EditorialGrid` (Phase 1/Task 3), `Breadcrumb` (Task 2).
- Produces: `ExperienceDetail` default export, reads `:layer` and `:slug` from `useParams()`. Used at route `/events/weddings/:layer/:slug`.

- [ ] **Step 1: Write the failing tests**

`src/pages/ExperienceDetail.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExperienceDetail from './ExperienceDetail';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
        <Route path="*" element={<div>no match</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ExperienceDetail', () => {
  it('renders a full-depth item with breadcrumb, description, what-we-handle and a gallery', () => {
    renderAt('/events/weddings/cultural/north-indian');
    const item = culturalWeddings.find((i) => i.slug === 'north-indian');
    expect(screen.getByRole('heading', { name: 'North Indian' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    item.whatWeHandle.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
    // Gallery is scoped by data-testid so this can't be confused with the
    // Related Experiences section's own EventCard images further down the page.
    const gallery = screen.getByTestId('gallery');
    expect(within(gallery).getAllByRole('img').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a light-depth item with just hero, teaser and no what-we-handle/gallery block', () => {
    renderAt('/events/weddings/cultural/gujarati');
    expect(screen.getByRole('heading', { name: 'Gujarati' })).toBeInTheDocument();
    const item = culturalWeddings.find((i) => i.slug === 'gujarati');
    expect(screen.getByText(item.teaser)).toBeInTheDocument();
    expect(screen.queryByText('What we handle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery')).not.toBeInTheDocument();
  });

  it('renders an image-optional item as a text panel, not a broken image', () => {
    renderAt('/events/weddings/functions/cocktail');
    expect(screen.getByRole('heading', { name: 'Cocktail' })).toBeInTheDocument();
    // Scoped to the hero region — the page's own Related Experiences section
    // renders other items' EventCards further down, which do have real images
    // (e.g. engagement/haldi/mehendi), so an unscoped queryByRole('img') would
    // find those and give a false failure. Same scoping principle as the
    // gallery test above.
    const hero = screen.getByTestId('hero');
    expect(within(hero).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders a contextual WhatsApp CTA including the item label', () => {
    renderAt('/events/weddings/functions/haldi');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    const href = cta.getAttribute('href');
    expect(href).toContain('917903133317');
    expect(decodeURIComponent(href)).toContain('Haldi');
  });

  it('renders related experiences from the same layer, excluding itself', () => {
    renderAt('/events/weddings/functions/haldi');
    const others = weddingFunctions.filter((i) => i.slug !== 'haldi').slice(0, 3);
    others.forEach((item) => {
      expect(screen.getByRole('link', { name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
    });
  });

  it('shows a working not-found fallback for an invalid layer', () => {
    renderAt('/events/weddings/not-a-layer/anything');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Weddings/i })).toHaveAttribute('href', '/events/weddings');
  });

  it('shows a working not-found fallback for a valid layer but unknown slug', () => {
    renderAt('/events/weddings/cultural/not-a-real-slug');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './ExperienceDetail'`

- [ ] **Step 3: Implement ExperienceDetail**

`src/pages/ExperienceDetail.jsx`:

```jsx
import { useParams, Link } from 'react-router-dom';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import Breadcrumb from '../components/Breadcrumb';

const LAYERS = {
  cultural: {
    label: 'Cultural Weddings',
    data: culturalWeddings,
    message: (item) => `Hi, I'm interested in a ${item.label} wedding in Ranchi.`,
  },
  functions: {
    label: 'Wedding Functions & Rituals',
    data: weddingFunctions,
    message: (item) => `Hi, I'm interested in ${item.label} for my wedding in Ranchi.`,
  },
  experiences: {
    label: 'Wedding Experiences',
    data: weddingExperiences,
    message: (item) => `Hi, I'm interested in ${item.label} for my wedding in Ranchi.`,
  },
  decor: {
    label: 'Wedding Décor',
    data: weddingDecor,
    message: (item) => `Hi, I'm interested in ${item.label} décor for my wedding in Ranchi.`,
  },
};

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-charcoal">We couldn't find that experience</h1>
      <p className="mt-4 text-charcoal/70">Let's find the right part of the wedding experience for you instead.</p>
      <Link to="/events/weddings" className="mt-6 inline-block text-gold underline">
        Back to Weddings
      </Link>
    </div>
  );
}

export default function ExperienceDetail() {
  const { layer, slug } = useParams();
  const layerConfig = LAYERS[layer];
  const item = layerConfig?.data.find((entry) => entry.slug === slug);

  if (!layerConfig || !item) {
    return <NotFound />;
  }

  const image = item.imageId ? getImage(item.imageId) : null;
  const others = layerConfig.data.filter((entry) => entry.slug !== item.slug).slice(0, 3);
  const gallerySiblingImages = item.depth === 'full'
    ? layerConfig.data
        .filter((entry) => entry.slug !== item.slug && entry.imageId)
        .slice(0, 2)
        .map((entry) => getImage(entry.imageId))
    : [];

  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Weddings', href: '/events/weddings' },
            { label: layerConfig.label, href: `/events/weddings#${layer}` },
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
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{layerConfig.label}</p>
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
            {gallerySiblingImages.length > 0 && (
              <div data-testid="gallery" className="mt-10 grid grid-cols-2 gap-4">
                {gallerySiblingImages.map((galleryImage) => (
                  <img
                    key={galleryImage.url}
                    src={galleryImage.url}
                    alt={galleryImage.altText}
                    loading="lazy"
                    className="aspect-square w-full rounded object-cover"
                  />
                ))}
              </div>
            )}
          </>
        )}
        <WhatsAppCTA
          message={layerConfig.message(item)}
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

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/ExperienceDetail.jsx src/pages/ExperienceDetail.test.jsx
git commit -m "feat: add generic ExperienceDetail page for all four wedding layers"
```

---

### Task 5: WeddingsHub page

**Files:**
- Create: `src/pages/WeddingsHub.jsx`
- Test: `src/pages/WeddingsHub.test.jsx`

**Interfaces:**
- Consumes: `culturalWeddings`, `weddingFunctions`, `weddingExperiences`, `weddingDecor` (Task 1), `getImage`, `WhatsAppCTA`, `EventCard`, `EditorialGrid`, `SectionHeading` (Phase 1/Task 3).
- Produces: `WeddingsHub` default export, no props. Used at the exact route `/events/weddings`.

- [ ] **Step 1: Write the failing test**

`src/pages/WeddingsHub.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WeddingsHub from './WeddingsHub';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';

// Scoping by each section's own container (rather than matching link accessible
// names) avoids false negatives from label substrings colliding across layers —
// e.g. "Mandap" is a substring of both the Décor layer's "Mandap" card and the
// Functions layer's "Wedding Ceremony / Mandap" card, which appears earlier in
// DOM order and would otherwise be matched first by a name-based query.
function hrefsInSection(container, sectionId) {
  const section = container.querySelector(`#${sectionId}`);
  return Array.from(section.querySelectorAll('a[href^="/events/weddings"]')).map((a) =>
    a.getAttribute('href')
  );
}

describe('WeddingsHub', () => {
  it('renders the hero, all six layer section anchors, and a card per item in each routed layer', () => {
    const { container } = render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })).toBeInTheDocument();

    ['cultural', 'functions', 'experiences', 'decor', 'planning', 'real-weddings'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });

    expect(hrefsInSection(container, 'cultural')).toEqual(
      expect.arrayContaining(culturalWeddings.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'functions')).toEqual(
      expect.arrayContaining(weddingFunctions.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'experiences')).toEqual(
      expect.arrayContaining(weddingExperiences.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'decor')).toEqual(
      expect.arrayContaining(weddingDecor.map((item) => item.href))
    );
  });

  it('renders the Planning capabilities and an honest Real Weddings section with a working Instagram link', () => {
    render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );
    expect(screen.getByText('Venue Coordination')).toBeInTheDocument();
    expect(screen.getByText('Catering & Hospitality')).toBeInTheDocument();
    expect(screen.getByText('Full-Day Execution')).toBeInTheDocument();
    const instaLink = screen.getByRole('link', { name: /Instagram/i });
    expect(instaLink).toHaveAttribute('href', 'https://www.instagram.com/nextlevelevents.in');
  });

  it('renders a working WhatsApp CTA in the hero', () => {
    render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Plan Your Wedding' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './WeddingsHub'`

- [ ] **Step 3: Implement WeddingsHub**

`src/pages/WeddingsHub.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import SectionHeading from '../components/SectionHeading';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';

const SUB_NAV = [
  { id: 'cultural', label: 'Cultural Weddings' },
  { id: 'functions', label: 'Functions & Rituals' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'decor', label: 'Décor' },
  { id: 'planning', label: 'Planning' },
  { id: 'real-weddings', label: 'Real Weddings' },
];

const PLANNING_CAPABILITIES = [
  {
    title: 'Venue Coordination',
    description: 'Venue sourcing and liaison, with logistics handled on the day.',
  },
  {
    title: 'Catering & Hospitality',
    description: 'Menu and caterer coordination, staffing and service timing — coordinated by us, executed by trusted partners.',
  },
  {
    title: 'Full-Day Execution',
    description: "A dedicated on-site team runs the day, start to finish, so you're a guest at your own wedding.",
  },
];

function LayerSection({ id, eyebrow, title, description, items }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10">
        <EditorialGrid columns={4}>
          {items.map((item) => (
            <EventCard key={item.slug} event={item} />
          ))}
        </EditorialGrid>
      </div>
    </section>
  );
}

export default function WeddingsHub() {
  const heroImage = getImage('vertical-weddings');

  return (
    <div>
      <section className="relative flex h-[80vh] min-h-[520px] items-end overflow-hidden bg-charcoal">
        <img src={heroImage.url} alt={heroImage.altText} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">The Flagship Experience</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Weddings, planned as one continuous story.
          </h1>
          <p className="mt-6 max-w-xl text-ivory/80">
            From the first Haldi morning to the last reception dance — every ritual, every culture, every detail,
            planned together.
          </p>
          <WhatsAppCTA
            message="Hi, I'd like to start planning my wedding with Next Level Events."
            className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
          >
            Plan Your Wedding
          </WhatsAppCTA>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 px-6 py-4">
          {SUB_NAV.map((section) => (
            <Link
              key={section.id}
              to={`/events/weddings#${section.id}`}
              className="text-sm uppercase tracking-wide text-charcoal/70 hover:text-gold"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </nav>

      <LayerSection
        id="cultural"
        eyebrow="By tradition"
        title="Cultural Weddings"
        description="Every wedding style planned with the specific rituals and pacing it actually calls for."
        items={culturalWeddings}
      />
      <LayerSection
        id="functions"
        eyebrow="By function"
        title="Wedding Functions & Rituals"
        description="From Haldi to Reception, each function planned as its own event, not a generic add-on."
        items={weddingFunctions}
      />
      <LayerSection
        id="experiences"
        eyebrow="By moment"
        title="Wedding Experiences"
        description="The specific moments — entries, entertainment, coverage — that make the day feel planned, not improvised."
        items={weddingExperiences}
      />
      <LayerSection
        id="decor"
        eyebrow="By visual"
        title="Wedding Décor"
        description="Mandap, stage, floral and lighting, styled as one cohesive look."
        items={weddingDecor}
      />

      <section id="planning" className="bg-neutral px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Wedding Planning" title="We plan the wedding, not just the décor." />
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {PLANNING_CAPABILITIES.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-charcoal/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="real-weddings" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <SectionHeading
          eyebrow="Real weddings"
          title="Coming soon, honestly."
          description="We're building a gallery of genuine Next Level Events wedding work as real projects are documented and cleared for sharing — no stock photography, no fabricated stories. Until then, see real, current work on Instagram."
          align="center"
        />
        <a
          href="https://www.instagram.com/nextlevelevents.in"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-gold underline"
        >
          See Real Work on Instagram
        </a>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/WeddingsHub.jsx src/pages/WeddingsHub.test.jsx
git commit -m "feat: add WeddingsHub page composing all six wedding layers"
```

---

### Task 6: Route wiring and regression guard

**Files:**
- Modify: `src/AppRoutes.jsx`
- Modify: `src/AppRoutes.test.jsx` (add new cases; keep existing ones)

**Interfaces:**
- Consumes: `WeddingsHub` (Task 5), `ExperienceDetail` (Task 4).
- Produces: two new routes added to the existing `<Routes>` tree; the existing `/`, `/events/:slug`, and `*` routes are untouched.

- [ ] **Step 1: Write the failing tests**

Add these cases to `src/AppRoutes.test.jsx` (keep the existing `/events/:slug` test as-is):

```jsx
it('routes /events/weddings to WeddingsHub, not the generic EventCategoryStub', () => {
  render(
    <MemoryRouter initialEntries={['/events/weddings']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })).toBeInTheDocument();
});

it('routes /events/weddings/cultural/:slug to ExperienceDetail', () => {
  render(
    <MemoryRouter initialEntries={['/events/weddings/cultural/punjabi']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Punjabi' })).toBeInTheDocument();
});

it('still routes other verticals to the generic EventCategoryStub unchanged', () => {
  render(
    <MemoryRouter initialEntries={['/events/corporate-events']}>
      <AppRoutes />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npm test`
Expected: FAIL on the two new Weddings cases (`/events/weddings` and the cultural sub-route currently fall through to `EventCategoryStub`/its not-found branch); the unchanged-verticals case already passes.

- [ ] **Step 3: Add the two routes**

In `src/AppRoutes.jsx`, add the imports and the two routes (keep every existing line — this is additive):

```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';
import WeddingsHub from './pages/WeddingsHub';
import ExperienceDetail from './pages/ExperienceDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/weddings" element={<WeddingsHub />} />
      <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
      <Route path="/events/:slug" element={<EventCategoryStub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all three new cases, plus every existing test (Home, EventCategoryStub for the other 7 verticals, the 404 fallback) unaffected.

- [ ] **Step 5: Commit**

```bash
git add src/AppRoutes.jsx src/AppRoutes.test.jsx
git commit -m "feat: wire /events/weddings and /events/weddings/:layer/:slug routes"
```

---

### Task 7: Cross-phase QA gate for the Weddings flagship

**Files:**
- Modify: any file touched below where an issue is found
- No new automated tests — this is the manual verification pass, matching Phase 1's Task 13/final-review pattern

**Interfaces:** none — verification only.

- [ ] **Step 1: Run the full automated suite and production build**

Run: `npm test` — expect every test from Tasks 1–6 green, plus all Phase 1 tests still passing (no regressions).
Run: `npm run build` — expect a clean build with no errors or warnings.

- [ ] **Step 2: Crawl every Weddings route and interactive element**

Using the source (and a running `npm run dev` if a browser is available; if not, state plainly that this is a code-level trace, matching Phase 1's Task 13 honesty precedent):

- Visit `/events/weddings` — confirm the hero, all six on-page sub-nav links, and every card in all four routed-layer grids (10 + 10 + 5 + 8 = 33 cards) link to a real, resolvable destination.
- Visit at least one full-depth item per layer (`north-indian`, `haldi`, `special-entry` or `entertainment`, `mandap-decor` or `stage`) and confirm: breadcrumb renders and its middle link goes back to the correct hub anchor, description and what-we-handle render, gallery shows at least 2 images, related-experiences links resolve, WhatsApp CTA contains the verified number and a message naming the specific item.
- Visit at least one light-depth item and confirm no description/what-we-handle/gallery renders, but hero, teaser, related experiences and CTA all still work.
- Visit all three image-optional items (`cocktail`, `vidaai`, `venue-styling`) and confirm each renders the solid-panel treatment, not a broken `<img>`, and every other part of the page (teaser, related, CTA) still works.
- Confirm `Décor & Styling`'s card on the Experiences grid links to `/events/weddings#decor` and actually lands on the Décor section (exercises Phase 1's `ScrollToHash`, unmodified).
- Visit `/events/weddings/not-a-layer/anything` and `/events/weddings/cultural/not-a-real-slug` and confirm both show the working "Back to Weddings" fallback, never a blank page or crash.
- Re-visit 2-3 of the other 7 event verticals' stub pages (e.g. `/events/corporate-events`) to confirm Phase 1's generic stub behavior is completely unchanged.

- [ ] **Step 3: Fabricated-content and image-manifest cross-check**

Grep `src/data/culturalWeddings.js`, `src/data/weddingFunctions.js`, `src/data/weddingExperiences.js`, `src/data/weddingDecor.js`, and the two new page components for any rating/review/statistic/client-name pattern (same check as Phase 1's Task 13) — expect none. Cross-check that every non-null `imageId` referenced across the four new data files has a corresponding entry in `src/assets/manifest.json` (32 unique wedding-layer card slots, 22 new manifest ids plus reuses of the 9 Phase 1 ids plus the 3 `null` slots) — `getImage`'s own throw-on-missing behavior plus the passing test suite is corroborating evidence, but confirm directly by reading both files side by side.

- [ ] **Step 4: Responsive check**

If a browser/screenshot tool is available, check `/events/weddings` and one `ExperienceDetail` page at the 8 widths Phase 1 used (375, 390, 412, 768, 1024, 1280, 1440, 1600) — in particular confirm the sub-nav row wraps cleanly on narrow widths and doesn't overlap the sticky Navbar. If no such tool is available, state that plainly and instead review the Tailwind classes on `WeddingsHub`'s sub-nav (`sticky top-16`) and grid columns for structural soundness, the same honest substitution Phase 1's Task 13 used.

- [ ] **Step 5: Fix anything found and commit**

If any step surfaced a real issue, fix it and stage exactly the files changed:

```bash
git add -A
git commit -m "fix: address issues found in the Weddings flagship QA gate"
```

If nothing needed fixing, no commit is required — the automated suite and build from Step 1 are the record.

## Self-Review Notes

- **Spec coverage:** all six layers (Cultural, Functions, Experiences, Décor, Planning, Real Weddings) have a concrete implementation (Tasks 1, 4, 5). The canonical journey (Wedding → Type/Function → Experience → visuals → services → related → enquiry) is satisfied end to end via `WeddingsHub` → `ExperienceDetail`'s breadcrumb/gallery/what-we-handle/related/CTA. The two honest image gaps (Cocktail, Vidaai) and one décor gap (Table/Venue Styling) are handled via the image-optional pattern (Task 3), not silently forced or omitted.
- **No Phase 1 file redesigned:** confirmed against the Global Constraints list — only `EventCard.jsx` and `AppRoutes.jsx` are modified, both additively, both with regression tests proving existing behavior (the original `EventCard` test, the other-verticals `AppRoutes` test) still passes.
- **Type consistency:** `getImage(id)` used identically to Phase 1 everywhere in Tasks 4–5. `WhatsAppCTA({message, children, className})` prop shape matches Phase 1 exactly. The `{slug, label, imageId, depth, teaser, description?, whatWeHandle?, href}` shape is identical across all four new data files and consumed identically by `ExperienceDetail` and `WeddingsHub`.
