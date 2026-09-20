import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WeddingsHub from './WeddingsHub';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';
import { SOCIALS } from '../data/contact';

// Scoping by each section's own container (rather than matching link accessible
// names) avoids false negatives from label substrings colliding across layers —
// e.g. "Mandap" is a substring of both the Décor layer's "Mandap" card and the
// Functions layer's "Wedding Ceremony / Mandap" card, which appears earlier in
// DOM order and would otherwise be matched first by a name-based query.
function hrefsInSection(container, sectionId) {
  const section = container.querySelector(`#${sectionId}`);
  return Array.from(section.querySelectorAll('a[href^="/events/weddings"]')).map((a) =>
    a.getAttribute('href')
  );
}

describe('WeddingsHub', () => {
  it('renders the hero, all six layer section anchors, and a card per item in each routed layer', () => {
    const { container } = render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })).toBeInTheDocument();

    ['cultural', 'functions', 'experiences', 'decor', 'planning', 'real-weddings'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });

    expect(hrefsInSection(container, 'cultural')).toEqual(
      expect.arrayContaining(culturalWeddings.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'functions')).toEqual(
      expect.arrayContaining(weddingFunctions.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'experiences')).toEqual(
      expect.arrayContaining(weddingExperiences.map((item) => item.href))
    );
    expect(hrefsInSection(container, 'decor')).toEqual(
      expect.arrayContaining(weddingDecor.map((item) => item.href))
    );
  });

  it('renders the Planning capabilities and an honest Real Weddings section with a working Instagram link', () => {
    render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );
    expect(screen.getByText('Venue Coordination')).toBeInTheDocument();
    expect(screen.getByText('Catering & Hospitality')).toBeInTheDocument();
    expect(screen.getByText('Full-Day Execution')).toBeInTheDocument();
    const instaLink = screen.getByRole('link', { name: /Instagram/i });
    expect(instaLink).toHaveAttribute('href', SOCIALS.instagram);
  });

  it('renders a working WhatsApp CTA in the hero', () => {
    render(
      <MemoryRouter>
        <WeddingsHub />
      </MemoryRouter>
    );
    const cta = screen.getByRole('link', { name: 'Plan Your Wedding' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
