import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EditorialGrid from './EditorialGrid';

describe('EditorialGrid', () => {
  it('renders all of its children', () => {
    render(
      <EditorialGrid>
        <p>One</p>
        <p>Two</p>
      </EditorialGrid>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});
