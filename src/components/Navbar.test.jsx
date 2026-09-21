import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the real logo with brand alt text and a Home link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Next Level Events')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next Level Events/ })).toHaveAttribute('href', '/');
  });

  it('has a menu button that opens the mobile drawer', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menuButton);
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });

  it('renders an Enquire CTA button linking to /enquire', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/enquire');
  });
});

