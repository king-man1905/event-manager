import { describe, it, expect } from 'vitest';
import { homeTeasers } from './homeTeasers';
import { getImage } from './images';

describe('homeTeasers', () => {
  it('has exactly seven entries, one per later-phase homepage section', () => {
    expect(homeTeasers).toHaveLength(7);
  });

  it('has a resolvable image, a real href, and non-empty copy for every teaser', () => {
    homeTeasers.forEach((teaser) => {
      expect(() => getImage(teaser.imageId)).not.toThrow();
      expect(teaser.href.length).toBeGreaterThan(0);
      expect(teaser.title.length).toBeGreaterThan(10);
      expect(teaser.description.length).toBeGreaterThan(20);
    });
  });

  it('has no duplicated title or description across teasers', () => {
    const titles = homeTeasers.map((t) => t.title);
    const descriptions = homeTeasers.map((t) => t.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});
