import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FinalCTA from './FinalCTA';

describe('FinalCTA', () => {
  it('renders the closing heading and a working WhatsApp CTA', () => {
    render(<FinalCTA />);
    expect(screen.getByRole('heading', { name: /Let's plan something/i })).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Start Planning on WhatsApp' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
