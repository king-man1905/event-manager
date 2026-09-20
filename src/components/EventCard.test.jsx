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
});
