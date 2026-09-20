import { describe, it, expect } from 'vitest';
import { socialCelebrations } from './socialCelebrations';
import { getImage } from './images';

describe('socialCelebrations data', () => {
  it('has six entries with valid fields', () => {
    expect(socialCelebrations).toHaveLength(6);
    socialCelebrations.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/social-celebrations/${item.slug}`);
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
    const slugs = socialCelebrations.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one full-depth entry', () => {
    expect(socialCelebrations.filter((item) => item.depth === 'full')).toHaveLength(1);
  });
});
