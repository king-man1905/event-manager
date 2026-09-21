import { describe, it, expect } from 'vitest';
import { behindTheEventCategories } from './behindTheEvent';

describe('behindTheEventCategories', () => {
  it('has exactly the 3 verified Instagram Highlight categories, in order', () => {
    const labels = behindTheEventCategories.map((category) => category.label);
    expect(labels).toEqual(['Site Recce', 'Meeting', 'Special Entry']);
  });

  it('each category has a non-empty id and description', () => {
    behindTheEventCategories.forEach((category) => {
      expect(typeof category.id).toBe('string');
      expect(category.id.length).toBeGreaterThan(0);
      expect(typeof category.description).toBe('string');
      expect(category.description.length).toBeGreaterThan(0);
    });
  });
});
