import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BrandIntro from './BrandIntro';

describe('BrandIntro', () => {
  it('renders the studio introduction heading', () => {
    render(<BrandIntro />);
    expect(screen.getByRole('heading', { name: /A Ranchi studio/i })).toBeInTheDocument();
  });
});
