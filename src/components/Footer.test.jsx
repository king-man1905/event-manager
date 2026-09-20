import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { PHONE_TEL, EMAIL, MAP_URL, SOCIALS } from '../data/contact';

describe('Footer', () => {
  it('renders working links for phone, email, map and every social channel', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /\+91/ })).toHaveAttribute('href', PHONE_TEL);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SOCIALS.instagram);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', SOCIALS.facebook);
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', SOCIALS.youtube);
    expect(screen.getAllByRole('link', { name: /Ranchi/ })[0]).toHaveAttribute('href', MAP_URL);
  });
});
