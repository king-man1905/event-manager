import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  it('routes /events/:slug to the category stub', () => {
    render(
      <MemoryRouter initialEntries={['/events/corporate-events']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Corporate Events' })).toBeInTheDocument();
  });
});
