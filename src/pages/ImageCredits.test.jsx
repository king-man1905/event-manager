import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ImageCredits from './ImageCredits';

describe('ImageCredits Page', () => {
  it('sets page title and renders the attribution heading', () => {
    render(
      <MemoryRouter>
        <ImageCredits />
      </MemoryRouter>
    );

    expect(document.title).toBe('Image Credits & Licenses | Next Level Events');
    expect(screen.getByRole('heading', { level: 1, name: 'Image Credits & Licenses' })).toBeInTheDocument();
  });

  it('renders complete attribution data with creator names and licenses without loading images', () => {
    const { container } = render(
      <MemoryRouter>
        <ImageCredits />
      </MemoryRouter>
    );

    // CC attribution content from manifest
    expect(screen.getByText(/Imakanksha/)).toBeInTheDocument();
    expect(screen.getAllByText('CC BY-SA 4.0').length).toBeGreaterThan(0);

    // Text-focused: must NOT render <img> elements for gallery
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(0);
  });

  it('allows filtering by license and has back to home link', () => {
    render(
      <MemoryRouter>
        <ImageCredits />
      </MemoryRouter>
    );

    const unsplashFilter = screen.getByRole('button', { name: /Unsplash License/i });
    expect(unsplashFilter).toBeInTheDocument();
    fireEvent.click(unsplashFilter);

    expect(screen.getAllByText(/Unsplash/).length).toBeGreaterThan(0);

    const homeLink = screen.getByRole('link', { name: /Back to Homepage/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
