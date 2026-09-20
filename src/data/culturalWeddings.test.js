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
