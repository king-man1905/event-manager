import { describe, it, expect } from 'vitest';
import { decorDesign } from './decorDesign';
import { getImage } from './images';

describe('decorDesign data', () => {
  it('has six entries with valid fields, all light-depth', () => {
    expect(decorDesign).toHaveLength(6);
    decorDesign.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/decor-design/${item.slug}`);
      expect(item.depth).toBe('light');
      if (item.imageId) {
        expect(() => getImage(item.imageId)).not.toThrow();
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = decorDesign.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
