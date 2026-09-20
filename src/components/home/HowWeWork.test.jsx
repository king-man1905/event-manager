import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowWeWork from './HowWeWork';

describe('HowWeWork', () => {
  it('renders the four steps in order and the #how-we-work anchor', () => {
    const { container } = render(<HowWeWork />);
    expect(container.querySelector('#how-we-work')).toBeInTheDocument();
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(['Consult', 'Design', 'Coordinate', 'Execute']);
  });
});
