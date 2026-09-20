import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppCTA from './WhatsAppCTA';

describe('WhatsAppCTA', () => {
  it('builds a wa.me link with the verified number and the encoded contextual message', () => {
    const message = "Hi, I'm interested in a Punjabi wedding in Ranchi.";
    render(<WhatsAppCTA message={message}>Enquire</WhatsAppCTA>);
    const link = screen.getByRole('link', { name: 'Enquire' });
    expect(link).toHaveAttribute(
      'href',
      `https://wa.me/917903133317?text=${encodeURIComponent(message)}`
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
