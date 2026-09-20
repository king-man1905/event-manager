import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from './EventCard';
import { events } from '../data/events';

describe('EventCard', () => {
  it('renders the event label, teaser, image alt text and links to the event href', () => {
    const event = events[0];
    render(
      <MemoryRouter>
        <EventCard event={event} />
      </MemoryRouter>
    );
    expect(screen.getByText(event.label)).toBeInTheDocument();
    expect(screen.getByText(event.teaser)).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', event.href);
    expect(screen.getByRole('img').getAttribute('alt').length).toBeGreaterThan(10);
  });

  it('renders a text-only panel instead of an image when imageId is null', () => {
    const event = {
      slug: 'cocktail',
      label: 'Cocktail',
      teaser: 'An evening event with its own bar, lighting and mood.',
      imageId: null,
      href: '/events/weddings/functions/cocktail',
    };
    render(
      <MemoryRouter>
        <EventCard event={event} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getAllByText('Cocktail').length).toBeGreaterThan(0);
    expect(screen.getByRole('link')).toHaveAttribute('href', event.href);
  });
});
