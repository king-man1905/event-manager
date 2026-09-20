import { describe, it, expect } from 'vitest';
import { weddingDecor } from './weddingDecor';
import { getImage } from './images';

describe('weddingDecor data', () => {
  it('has eight entries with valid fields', () => {
    expect(weddingDecor).toHaveLength(8);
    weddingDecor.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/weddings/decor/${item.slug}`);
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
    const slugs = weddingDecor.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one image-optional entry (Table/Venue Styling)', () => {
    const withoutImage = weddingDecor.filter((item) => item.imageId === null);
    expect(withoutImage.map((item) => item.slug)).toEqual(['venue-styling']);
  });
});
