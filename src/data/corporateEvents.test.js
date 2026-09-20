import { describe, it, expect } from 'vitest';
import { corporateEvents } from './corporateEvents';
import { getImage } from './images';

describe('corporateEvents data', () => {
  it('has six entries with valid fields', () => {
    expect(corporateEvents).toHaveLength(6);
    corporateEvents.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/corporate-events/${item.slug}`);
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
    const slugs = corporateEvents.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly four full-depth entries', () => {
    expect(corporateEvents.filter((item) => item.depth === 'full')).toHaveLength(4);
  });
});
