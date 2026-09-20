import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Navbar, a homepage placeholder, and the Footer together', () => {
    render(<App />);
    expect(screen.getAllByAltText('Next Level Events').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
