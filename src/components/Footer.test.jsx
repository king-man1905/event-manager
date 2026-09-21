import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import { PHONE_TEL, EMAIL, MAP_URL, SOCIALS } from '../data/contact';

describe('Footer', () => {
  it('renders working links for phone, email, map and every social channel', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /\+91/ })).toHaveAttribute('href', PHONE_TEL);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SOCIALS.instagram);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', SOCIALS.facebook);
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', SOCIALS.youtube);
    expect(screen.getAllByRole('link', { name: /Ranchi/ })[0]).toHaveAttribute('href', MAP_URL);
  });

  it('renders a compact link to /image-credits and omits the giant visible credit list', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Link to Image Credits & Licenses
    const creditLink = screen.getByRole('link', { name: 'Image Credits & Licenses' });
    expect(creditLink).toBeInTheDocument();
    expect(creditLink).toHaveAttribute('href', '/image-credits');

    // Giant visible credit wall must NOT be rendered in footer
    expect(screen.queryByText(/Imakanksha.*CC BY-SA/)).not.toBeInTheDocument();
  });

  it('renders links for locations and enquiry', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Where We Work/ })).toHaveAttribute('href', '/locations');
    expect(screen.getByRole('link', { name: /Plan Your Event/ })).toHaveAttribute('href', '/enquire');
  });

  it('renders quick links and a working back-to-top button', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Weddings' })).toHaveAttribute('href', '/events/weddings');
    expect(screen.getByRole('link', { name: 'Corporate Events' })).toHaveAttribute('href', '/events/corporate-events');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');

    const topBtn = screen.getByRole('button', { name: /Scroll back to top/i });
    expect(topBtn).toBeInTheDocument();
    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
