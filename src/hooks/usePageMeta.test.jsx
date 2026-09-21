import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { usePageMeta } from './usePageMeta';

function TestComponent({ title, description }) {
  usePageMeta({ title, description });
  return null;
}

describe('usePageMeta', () => {
  it('sets document.title and a meta description tag', () => {
    render(<TestComponent title="Real Events — Next Level Events" description="See real work." />);
    expect(document.title).toBe('Real Events — Next Level Events');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'See real work.'
    );
  });
});
