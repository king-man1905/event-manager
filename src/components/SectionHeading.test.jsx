import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders eyebrow, title and description', () => {
    render(<SectionHeading eyebrow="What we plan" title="Every celebration" description="One team." />);
    expect(screen.getByText('What we plan')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Every celebration' })).toBeInTheDocument();
    expect(screen.getByText('One team.')).toBeInTheDocument();
  });
});
