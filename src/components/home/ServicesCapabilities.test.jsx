import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesCapabilities from './ServicesCapabilities';

describe('ServicesCapabilities', () => {
  it('renders all six capabilities and the #services anchor', () => {
    const { container } = render(<ServicesCapabilities />);
    expect(container.querySelector('#services')).toBeInTheDocument();
    [
      'Venue Coordination',
      'Décor & Styling',
      'Photography & Films',
      'Entertainment & Artists',
      'Catering Coordination',
      'Full-Day Execution',
    ].forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });
  });
});
