import { describe, it, expect } from 'vitest';
import { destinationEvents } from './destinationEvents';
import { getImage } from './images';

describe('destinationEvents data', () => {
  it('has three entries with valid fields, all light-depth', () => {
    expect(destinationEvents).toHaveLength(3);
    destinationEvents.forEach((item) => {
      expect(item.slug).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.teaser.length).toBeGreaterThan(10);
      expect(item.href).toBe(`/events/destination-events/${item.slug}`);
      expect(item.depth).toBe('light');
      expect(() => getImage(item.imageId)).not.toThrow();
    });
  });

  it('has no duplicate slugs', () => {
    const slugs = destinationEvents.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
