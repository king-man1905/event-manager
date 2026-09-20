import { describe, it, expect } from 'vitest';
import { liveEntertainment } from './liveEntertainment';
import { getImage } from './images';

describe('liveEntertainment data', () => {
  it('has six entries with valid fields', () => {
    expect(liveEntertainment).toHaveLength(6);
    liveEntertainment.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/live-entertainment/${item.slug}`);
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
    const slugs = liveEntertainment.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly three full-depth entries', () => {
    expect(liveEntertainment.filter((item) => item.depth === 'full')).toHaveLength(3);
  });
});
