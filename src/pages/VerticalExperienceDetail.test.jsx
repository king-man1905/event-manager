import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerticalExperienceDetail from './VerticalExperienceDetail';
import { corporateEvents } from '../data/corporateEvents';
import { decorDesign } from '../data/decorDesign';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
        <Route path="*" element={<VerticalExperienceDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerticalExperienceDetail', () => {
  it('renders a full-depth item with breadcrumb, description, what-we-handle and a gallery', () => {
    renderAt('/events/corporate-events/product-launch');
    const item = corporateEvents.find((i) => i.slug === 'product-launch');
    expect(screen.getByRole('heading', { name: 'Product Launch' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    item.whatWeHandle.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
    const gallery = screen.getByTestId('gallery');
    expect(within(gallery).getAllByRole('img').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a light-depth item with just hero, teaser and no what-we-handle/gallery block', () => {
    renderAt('/events/decor-design/balloon-decor-design');
    const item = decorDesign.find((i) => i.slug === 'balloon-decor-design');
    expect(screen.getByRole('heading', { name: 'Balloon Décor & Installations' })).toBeInTheDocument();
    expect(screen.getByText(item.teaser)).toBeInTheDocument();
    expect(screen.queryByText('What we handle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery')).not.toBeInTheDocument();
  });

  it('renders a contextual WhatsApp CTA including the item label', () => {
    renderAt('/events/kids-family/baby-shower');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    const href = cta.getAttribute('href');
    expect(href).toContain('917903133317');
    expect(decodeURIComponent(href)).toContain('Baby Shower');
  });

  it('renders related experiences from the same vertical, excluding itself', () => {
    renderAt('/events/corporate-events/product-launch');
    const others = corporateEvents.filter((i) => i.slug !== 'product-launch').slice(0, 3);
    others.forEach((item) => {
      expect(
        screen.getByRole('link', { name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })
      ).toBeInTheDocument();
    });
  });

  it('shows a working not-found fallback for an invalid vertical', () => {
    renderAt('/events/not-a-real-vertical/anything');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('shows a working not-found fallback for a valid vertical but unknown slug', () => {
    renderAt('/events/corporate-events/not-a-real-slug');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
  });
});
