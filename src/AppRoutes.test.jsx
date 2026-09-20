import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  it('routes /events/:slug to the category stub', () => {
    render(
      <MemoryRouter initialEntries={['/events/corporate-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
  });

  it('routes /events/weddings to WeddingsHub, not the generic EventCategoryStub', () => {
    render(
      <MemoryRouter initialEntries={['/events/weddings']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })).toBeInTheDocument();
  });

  it('routes /events/weddings/cultural/:slug to ExperienceDetail', () => {
    render(
      <MemoryRouter initialEntries={['/events/weddings/cultural/punjabi']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Punjabi' })).toBeInTheDocument();
  });

  it('still routes other verticals to the generic EventCategoryStub unchanged', () => {
    render(
      <MemoryRouter initialEntries={['/events/corporate-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
  });
});
