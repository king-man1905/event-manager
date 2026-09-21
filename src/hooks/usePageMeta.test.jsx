import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { usePageMeta } from './usePageMeta';

function TestComponent({ title, description, asArgs = false }) {
  if (asArgs) {
    usePageMeta(title, description);
  } else {
    usePageMeta({ title, description });
  }
  return null;
}

describe('usePageMeta', () => {
  it('sets document.title and a meta description tag with object format', () => {
    const { unmount } = render(
      <TestComponent title="Real Events — Next Level Events" description="See real work." />
    );
    expect(document.title).toBe('Real Events — Next Level Events');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'See real work.'
    );
    unmount();
  });

  it('sets document.title and meta description when called with positional arguments', () => {
    const { unmount } = render(
      <TestComponent title="Locations | Next Level Events" description="Serving Jharkhand." asArgs={true} />
    );
    expect(document.title).toBe('Locations | Next Level Events');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Serving Jharkhand.'
    );
    unmount();
  });
});
