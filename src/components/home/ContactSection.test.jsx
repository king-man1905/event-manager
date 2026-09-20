import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';
import { PHONE_TEL, EMAIL, MAP_URL } from '../../data/contact';

describe('ContactSection', () => {
  it('renders the #contact anchor and working phone/email/map/WhatsApp links', () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+91/ })).toHaveAttribute('href', PHONE_TEL);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: /Ranchi/ })).toHaveAttribute('href', MAP_URL);
    expect(screen.getByRole('link', { name: 'Message Us on WhatsApp' }).getAttribute('href')).toContain(
      '917903133317'
    );
  });
});
