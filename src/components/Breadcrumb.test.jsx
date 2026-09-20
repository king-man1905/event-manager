import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders every item except the last as a link, and the last as plain text', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Weddings', href: '/events/weddings' },
      { label: 'Cultural Weddings', href: '/events/weddings#cultural' },
      { label: 'North Indian' },
    ];
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Weddings' })).toHaveAttribute('href', '/events/weddings');
    expect(screen.getByRole('link', { name: 'Cultural Weddings' })).toHaveAttribute(
      'href',
      '/events/weddings#cultural'
    );
    expect(screen.queryByRole('link', { name: 'North Indian' })).not.toBeInTheDocument();
    expect(screen.getByText('North Indian')).toBeInTheDocument();
  });
});
