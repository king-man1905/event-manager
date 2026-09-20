import { describe, it, expect } from 'vitest';
import { kidsFamily } from './kidsFamily';
import { getImage } from './images';

describe('kidsFamily data', () => {
  it('has seven entries with valid fields', () => {
    expect(kidsFamily).toHaveLength(7);
    kidsFamily.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/kids-family/${item.slug}`);
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
    const slugs = kidsFamily.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly four full-depth entries', () => {
    expect(kidsFamily.filter((item) => item.depth === 'full')).toHaveLength(4);
  });
});
