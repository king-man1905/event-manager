import { describe, it, expect } from 'vitest';
import { getImage } from './images';

describe('getImage', () => {
  it('returns a manifest entry with url, altText and license for a known id', () => {
    const image = getImage('hero-home');
    expect(image.url).toMatch(/^https:\/\//);
    expect(image.altText.length).toBeGreaterThan(10);
    expect(image.license).toBeTruthy();
  });

  it('throws a clear error naming the id when the id is unknown', () => {
    expect(() => getImage('does-not-exist')).toThrow('does-not-exist');
  });
});
