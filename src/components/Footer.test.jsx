import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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

  it('renders visible attribution for every CC-licensed image', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Image Credits')).toBeInTheDocument();
    expect(
      screen.getByText(/Imakanksha.*CC BY-SA 4\.0/)
    ).toBeInTheDocument();
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
});

