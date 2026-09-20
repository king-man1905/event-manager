import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventDiscovery from './EventDiscovery';
import { events } from '../../data/events';

describe('EventDiscovery', () => {
  it('renders a card linking to every one of the eight verticals', () => {
    render(
      <MemoryRouter>
        <EventDiscovery />
      </MemoryRouter>
    );
    events.forEach((event) => {
      expect(screen.getByRole('link', { name: new RegExp(event.label) })).toHaveAttribute(
        'href',
        event.href
      );
    });
  });
});
