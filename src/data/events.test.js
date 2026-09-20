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
