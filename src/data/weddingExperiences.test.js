import { describe, it, expect } from 'vitest';
import { weddingExperiences } from './weddingExperiences';
import { getImage } from './images';

describe('weddingExperiences data', () => {
  it('has five entries with valid fields', () => {
    expect(weddingExperiences).toHaveLength(5);
    weddingExperiences.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(['full', 'light']).toContain(item.depth);
      expect(() => getImage(item.imageId)).not.toThrow();
      if (item.depth === 'full') {
        expect(item.description.length).toBeGreaterThan(20);
        expect(item.whatWeHandle.length).toBeGreaterThan(1);
      }
    });
  });

  it('routes each item to /events/weddings/experiences/:slug, except decor-styling which cross-links into the Décor layer', () => {
    weddingExperiences.forEach((item) => {
      if (item.slug === 'decor-styling') {
        expect(item.href).toBe('/events/weddings#decor');
      } else {
        expect(item.href).toBe(`/events/weddings/experiences/${item.slug}`);
      }
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = weddingExperiences.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
