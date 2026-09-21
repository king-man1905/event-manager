import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Locations from './Locations';
import { ADDRESS, PHONE_DISPLAY, EMAIL } from '../data/contact';
import { JHARKHAND_DISTRICTS } from '../data/locationsData';

describe('Locations Page', () => {
  it('renders Ranchi primary studio details accurately', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /based in ranchi, serving events across jharkhand/i })
    ).toBeInTheDocument();
    expect(screen.getByText(ADDRESS)).toBeInTheDocument();
    expect(screen.getByText(PHONE_DISPLAY)).toBeInTheDocument();
    expect(screen.getByText(EMAIL)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /plan a ranchi event/i })).toBeInTheDocument();
  });

  it('renders service area across Jharkhand districts as a service list, not branch offices', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Across Jharkhand' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquire for your district/i })).toBeInTheDocument();

    // Verify key Jharkhand districts are rendered in the service area grid
    expect(screen.getByText('Dhanbad')).toBeInTheDocument();
    expect(screen.getByText('Bokaro')).toBeInTheDocument();
    expect(screen.getByText('East Singhbhum (Jamshedpur)')).toBeInTheDocument();
  });

  it('renders outside Jharkhand outstation capability section with honest process', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    expect(screen.getByText(/outside jharkhand — outstation & destination events/i)).toBeInTheDocument();
    expect(screen.getByText(/remote design & consultation/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enquire for outside jharkhand/i })).toBeInTheDocument();
  });

  it('includes an interactive map link', () => {
    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    const mapLink = screen.getByRole('link', { name: /view on google maps/i });
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
  });

  it('does not contain fabricated branch office claims or fake reviews', () => {
    const { container } = render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );
    const text = container.textContent.toLowerCase();
    expect(text).not.toContain('branch office');
    expect(text).not.toContain('satellite office');
    expect(text).not.toContain('fake reviews');
    expect(text).not.toContain('rating');
  });
});
