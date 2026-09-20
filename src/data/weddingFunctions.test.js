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
