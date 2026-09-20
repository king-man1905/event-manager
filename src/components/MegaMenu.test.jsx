import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { nav } from '../data/nav';

describe('MegaMenu', () => {
  it('shows all eight event links after opening the Events dropdown', () => {
    render(
      <MemoryRouter>
        <MegaMenu items={nav} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Events' }));
    const eventsItem = nav.find((item) => item.label === 'Events');
    eventsItem.columns[0].links.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });

  it('renders plain items (no columns) as direct links', () => {
    render(
      <MemoryRouter>
        <MegaMenu items={nav} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });
});
