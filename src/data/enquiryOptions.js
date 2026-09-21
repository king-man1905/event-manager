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

export const SHARED_SERVICES = [
  { id: 'shared-planning', label: 'Full Event Planning & Day Coordination' },
  { id: 'shared-media', label: 'Photography & Cinematic Video' },
  { id: 'shared-venue', label: 'Venue Coordination & Management' },
];

export const GUEST_COUNT_OPTIONS = [
  'Under 100 guests',
  '100 – 300 guests',
  '300 – 600 guests',
  '600+ guests',
  'Yet to be decided',
];

const VERTICAL_SERVICES = {
  'weddings': [
    { id: 'wed-decor', label: 'Mandap, Stage & Ritual Décor' },
    { id: 'wed-floral', label: 'Floral & Lighting Styling' },
    { id: 'wed-entry', label: 'Baraat & Special Entry Setup' },
    { id: 'wed-entertainment', label: 'Artist, Dhol & Entertainment' },
    { id: 'wed-hospitality', label: 'Catering & Hospitality Coordination' },
  ],
  'corporate-events': [
    { id: 'corp-stage', label: 'Corporate Stage, LED & AV Setup' },
    { id: 'corp-branding', label: 'Branding, Backdrop & Venue Styling' },
    { id: 'corp-keynote', label: 'Keynote & Conference Management' },
    { id: 'corp-artist', label: 'Anchor & Artist Coordination' },
    { id: 'corp-logistics', label: 'Corporate Hospitality & Logistics' },
  ],
  'social-celebrations': [
    { id: 'soc-decor', label: 'Theme Décor & Ambient Lighting' },
    { id: 'soc-dj', label: 'DJ, Music & Sound Setup' },
    { id: 'soc-entry', label: 'Special Moments / Entry Staging' },
    { id: 'soc-catering', label: 'Catering & Guest Hospitality' },
  ],
  'kids-family': [
    { id: 'kids-theme', label: 'Custom Theme & Balloon Installations' },
    { id: 'kids-activities', label: 'Kids Entertainment & Activities' },
    { id: 'kids-photobooth', label: 'Photo Booth & Welcome Corner' },
    { id: 'kids-cake-table', label: 'Cake Table & Backdrop Styling' },
  ],
  'live-entertainment': [
    { id: 'live-dj', label: 'DJ & Professional Sound Setup' },
    { id: 'live-sfx', label: 'Special Effects (Cold Pyro, Fog, Confetti)' },
    { id: 'live-performers', label: 'Live Musicians, Dhol & Performers' },
    { id: 'live-anchor', label: 'Emcee / Anchor Booking' },
    { id: 'live-truss', label: 'Stage & Truss Lighting' },
  ],
  'decor-design': [
    { id: 'decor-floral', label: 'Custom Floral Design & Styling' },
    { id: 'decor-balloons', label: 'Balloon Styling & Installations' },
    { id: 'decor-stage', label: 'Stage, Backdrop & Mandap Architecture' },
    { id: 'decor-lighting', label: 'Atmospheric & Architectural Lighting' },
    { id: 'decor-entry', label: 'Entrance & Pathway Styling' },
  ],
  'special-cultural': [
    { id: 'cult-decor', label: 'Traditional & Cultural Theme Décor' },
    { id: 'cult-stage', label: 'Festival Stage & Lighting Setup' },
    { id: 'cult-artists', label: 'Folk Performers & Cultural Artists' },
    { id: 'cult-ritual', label: 'Ritual & Ceremony Coordination' },
  ],
  'destination-events': [
    { id: 'dest-planning', label: 'Remote Planning & Design Consultation' },
    { id: 'dest-recce', label: 'On-Site Recce & Layout Production' },
    { id: 'dest-crew', label: 'Travel Crew & Vendor Coordination' },
    { id: 'dest-multiday', label: 'Multi-Day Event Management' },
  ],
};

export function getServicesForVertical(verticalSlug) {
  const specific = VERTICAL_SERVICES[verticalSlug] || [];
  return [...specific, ...SHARED_SERVICES];
}

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
