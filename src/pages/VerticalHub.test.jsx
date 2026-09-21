import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerticalHub, { VERTICALS } from './VerticalHub';
import { corporateEvents } from '../data/corporateEvents';
import { events } from '../data/events';

const nonWeddingSlugs = events.filter((e) => e.slug !== 'weddings').map((e) => e.slug);

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:slug" element={<VerticalHub />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerticalHub', () => {
  it('renders the hero and a card for every item in the matched vertical', () => {
    const { container } = renderAt('/events/corporate-events');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const hrefs = Array.from(container.querySelectorAll('a[href^="/events/corporate-events/"]')).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toEqual(expect.arrayContaining(corporateEvents.map((item) => item.href)));
  });

  it('renders a working WhatsApp CTA containing the verified number', () => {
    renderAt('/events/corporate-events');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });

  it('shows a working not-found fallback for an unknown vertical slug', () => {
    renderAt('/events/not-a-real-vertical');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('supports exactly the non-Weddings vertical slugs defined in events.js', () => {
    expect(Object.keys(VERTICALS).sort()).toEqual(nonWeddingSlugs.sort());
  });

  it.each(nonWeddingSlugs)('renders a hero heading for the %s vertical without throwing', (slug) => {
    expect(() => renderAt(`/events/${slug}`)).not.toThrow();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
