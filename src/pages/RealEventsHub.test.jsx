import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import RealEventsHub from './RealEventsHub';
import { socialContent } from '../data/socialContent';
import { behindTheEventCategories } from '../data/behindTheEvent';
import { SOCIALS } from '../data/contact';

describe('RealEventsHub', () => {
  it('sets a real page title and renders the hero heading', () => {
    render(<RealEventsHub />);
    expect(document.title).toBe('Real Events — Next Level Events');
    expect(screen.getByRole('heading', { name: 'Real work, as it happens.' })).toBeInTheDocument();
  });

  it('renders all 5 real videos as click-to-load embeds', () => {
    render(<RealEventsHub />);
    socialContent.forEach((item) => {
      expect(screen.getAllByRole('button', { name: `Play ${item.label}` }).length).toBeGreaterThan(0);
    });
  });

  it('renders all 3 verified Behind the Event categories linking to Instagram', () => {
    render(<RealEventsHub />);
    const section = document.getElementById('behind-the-event');
    behindTheEventCategories.forEach((category) => {
      const link = within(section).getByRole('link', { name: new RegExp(category.label) });
      expect(link).toHaveAttribute('href', SOCIALS.instagram);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders a follow-CTA row linking to Instagram, YouTube and Facebook', () => {
    render(<RealEventsHub />);
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SOCIALS.instagram);
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', SOCIALS.youtube);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', SOCIALS.facebook);
  });

  it('renders an honest coming-soon note and a working WhatsApp CTA', () => {
    render(<RealEventsHub />);
    expect(screen.getByText(/more real events are coming/i)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: /WhatsApp/i });
    expect(decodeURIComponent(cta.getAttribute('href'))).toContain('917903133317');
  });
});
