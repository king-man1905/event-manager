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

  it('closes the dropdown on Escape key and on link click', () => {
    render(
      <MemoryRouter>
        <MegaMenu items={nav} />
      </MemoryRouter>
    );
    const eventsButton = screen.getByRole('button', { name: 'Events' });
    fireEvent.click(eventsButton);
    expect(screen.getByRole('link', { name: 'Weddings' })).toBeInTheDocument();

    // Escape closes
    fireEvent.keyDown(eventsButton, { key: 'Escape' });
    expect(screen.queryByRole('link', { name: 'Weddings' })).not.toBeInTheDocument();

    // Reopen and test link click closes
    fireEvent.click(eventsButton);
    const weddingsLink = screen.getByRole('link', { name: 'Weddings' });
    fireEvent.click(weddingsLink);
    expect(screen.queryByRole('link', { name: 'Weddings' })).not.toBeInTheDocument();
  });
});
