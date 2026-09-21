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
  { label: 'Locations', href: '/locations' },
  { label: 'Contact', href: '/#contact' },
];

