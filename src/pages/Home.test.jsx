import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders all fourteen sections in the brief\'s specified order', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Query h1/h2 directly off the DOM (not two separate getAllByRole calls)
    // so order reflects the actual document order, not query order.
    const headingText = Array.from(container.querySelectorAll('h1, h2')).map(
      (h) => h.textContent
    );

    const expectedOrder = [
      "Every celebration, planned like it's the only one that matters.", // Hero
      'A Ranchi studio built around one idea: your event, done properly.', // BrandIntro
      'Every kind of celebration, one team.', // EventDiscovery
      'Weddings, planned as one continuous story.', // Weddings flagship teaser
      'See the real work behind the plans.', // Real Events teaser
      'Ideas for every ritual and celebration.', // Inspiration teaser
      'We plan the event, not just the décor.', // ServicesCapabilities
      'From bare venue to finished celebration.', // Transformation teaser
      'The planning you never see on the day.', // Behind the Event teaser
      'From first message to the last dance.', // HowWeWork
      'Ranchi first, and beyond on request.', // Locations teaser
      'Follow the real work as it happens.', // Social/Video teaser
      "Let's plan something worth remembering.", // FinalCTA
      'Tell us about your event.', // ContactSection
    ];

    expect(headingText).toEqual(expectedOrder);
  });
});
