import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SectionTeaser from './SectionTeaser';

const internalTeaser = {
  id: 'sample-internal',
  imageId: 'vertical-weddings',
  eyebrow: 'The flagship experience',
  title: 'Sample internal teaser title',
  description: 'Sample internal teaser description text long enough to pass validation.',
  ctaLabel: 'Explore Weddings',
  href: '/events/weddings',
};

const externalTeaser = {
  ...internalTeaser,
  id: 'sample-external',
  ctaLabel: 'Follow on Instagram',
  href: 'https://www.instagram.com/nextlevelevents.in',
};

describe('SectionTeaser', () => {
  it('renders an internal teaser as a router Link', () => {
    render(
      <MemoryRouter>
        <SectionTeaser teaser={internalTeaser} />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Explore Weddings' });
    expect(cta).toHaveAttribute('href', '/events/weddings');
  });

  it('renders an external teaser as a plain link opening in a new tab', () => {
    render(
      <MemoryRouter>
        <SectionTeaser teaser={externalTeaser} />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Follow on Instagram' });
    expect(cta).toHaveAttribute('href', 'https://www.instagram.com/nextlevelevents.in');
    expect(cta).toHaveAttribute('target', '_blank');
  });
});
