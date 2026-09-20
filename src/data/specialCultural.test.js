import { describe, it, expect } from 'vitest';
import { specialCultural } from './specialCultural';
import { getImage } from './images';

describe('specialCultural data', () => {
  it('has four entries with valid fields', () => {
    expect(specialCultural).toHaveLength(4);
    specialCultural.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/special-cultural/${item.slug}`);
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
    const slugs = specialCultural.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one full-depth entry', () => {
    expect(specialCultural.filter((item) => item.depth === 'full')).toHaveLength(1);
  });
});
