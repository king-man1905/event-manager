import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExperienceDetail from './ExperienceDetail';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
        <Route path="*" element={<div>no match</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ExperienceDetail', () => {
  it('renders a full-depth item with breadcrumb, description, what-we-handle and a gallery', () => {
    renderAt('/events/weddings/cultural/north-indian');
    const item = culturalWeddings.find((i) => i.slug === 'north-indian');
    expect(screen.getByRole('heading', { name: 'North Indian' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    item.whatWeHandle.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
    // Gallery is scoped by data-testid so this can't be confused with the
    // Related Experiences section's own EventCard images further down the page.
    const gallery = screen.getByTestId('gallery');
    expect(within(gallery).getAllByRole('img').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a light-depth item with just hero, teaser and no what-we-handle/gallery block', () => {
    renderAt('/events/weddings/cultural/gujarati');
    expect(screen.getByRole('heading', { name: 'Gujarati' })).toBeInTheDocument();
    const item = culturalWeddings.find((i) => i.slug === 'gujarati');
    expect(screen.getByText(item.teaser)).toBeInTheDocument();
    expect(screen.queryByText('What we handle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery')).not.toBeInTheDocument();
  });

  it('renders an image-optional item as a text panel, not a broken image', () => {
    renderAt('/events/weddings/functions/cocktail');
    expect(screen.getByRole('heading', { name: 'Cocktail' })).toBeInTheDocument();
    // Scoped to the hero so the Related Experiences section's own EventCard
    // images further down the page can't produce a false positive/negative.
    expect(within(screen.getByTestId('hero')).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders a contextual WhatsApp CTA including the item label', () => {
    renderAt('/events/weddings/functions/haldi');
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    const href = cta.getAttribute('href');
    expect(href).toContain('917903133317');
    expect(decodeURIComponent(href)).toContain('Haldi');
  });

  it('renders related experiences from the same layer, excluding itself', () => {
    renderAt('/events/weddings/functions/haldi');
    const others = weddingFunctions.filter((i) => i.slug !== 'haldi').slice(0, 3);
    others.forEach((item) => {
      expect(screen.getByRole('link', { name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
    });
  });

  it("shows a working not-found fallback for an invalid layer", () => {
    renderAt('/events/weddings/not-a-layer/anything');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Weddings/i })).toHaveAttribute('href', '/events/weddings');
  });

  it('shows a working not-found fallback for a valid layer but unknown slug', () => {
    renderAt('/events/weddings/cultural/not-a-real-slug');
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument();
  });
});
