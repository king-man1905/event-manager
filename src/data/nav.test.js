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

  it('includes a Real Events link pointing at the new hub', () => {
    expect(nav.find((item) => item.label === 'Real Events').href).toBe('/real-events');
  });
});
