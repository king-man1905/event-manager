import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EventCategoryStub from './EventCategoryStub';
import { events } from '../data/events';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:slug" element={<EventCategoryStub />} />
        <Route path="*" element={<EventCategoryStub />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EventCategoryStub', () => {
  it('renders the matching event\'s heading, teaser, WhatsApp CTA and links to every other vertical', () => {
    renderAt('/events/weddings');
    expect(screen.getByRole('heading', { name: 'Weddings' })).toBeInTheDocument();
    expect(screen.getByText(events[0].teaser)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Enquire on WhatsApp' });
    expect(cta.getAttribute('href')).toContain('917903133317');
    expect(cta.getAttribute('href')).toContain(encodeURIComponent('weddings'));
    events
      .filter((event) => event.slug !== 'weddings')
      .forEach((event) => {
        expect(screen.getByRole('link', { name: event.label })).toHaveAttribute('href', event.href);
      });
  });

  it('shows a working fallback, not a dead end, for an unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });
});
