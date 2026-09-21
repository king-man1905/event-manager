import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  it('routes /events/corporate-events to VerticalHub with a real experience grid', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/events/corporate-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
    expect(container.querySelector('a[href^="/events/corporate-events/"]')).toBeInTheDocument();
  });

  it('routes /events/:vertical/:slug to VerticalExperienceDetail', () => {
    render(
      <MemoryRouter initialEntries={['/events/kids-family/baby-shower']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Baby Shower' })).toBeInTheDocument();
  });

  it('still routes Weddings exactly as Phase 2 shipped it, unaffected by the vertical retarget', () => {
    render(
      <MemoryRouter initialEntries={['/events/weddings']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /Weddings, planned as one continuous story/i })
    ).toBeInTheDocument();
  });

  it('still routes a Weddings sub-experience exactly as Phase 2 shipped it', () => {
    render(
      <MemoryRouter initialEntries={['/events/weddings/cultural/punjabi']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Punjabi' })).toBeInTheDocument();
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

  it('routes /real-events to RealEventsHub', () => {
    render(
      <MemoryRouter initialEntries={['/real-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Real work, as it happens.' })).toBeInTheDocument();
  });

  it('routes /enquire to SmartEnquiry', () => {
    render(
      <MemoryRouter initialEntries={['/enquire']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /plan your event/i })).toBeInTheDocument();
  });

  it('routes /locations to Locations', () => {
    render(
      <MemoryRouter initialEntries={['/locations']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /serving events across jharkhand/i })).toBeInTheDocument();
  });
});

