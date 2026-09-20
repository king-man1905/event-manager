import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the headline and a working WhatsApp CTA', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { name: /Every celebration, planned/i })
    ).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Plan Your Event' });
    expect(cta.getAttribute('href')).toContain('917903133317');
  });
});
