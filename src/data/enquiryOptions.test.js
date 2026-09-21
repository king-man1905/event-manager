import { describe, it, expect } from 'vitest';
import {
  SHARED_SERVICES,
  GUEST_COUNT_OPTIONS,
  getOccasionsForVertical,
  getServicesForVertical,
} from './enquiryOptions';
import { events } from './events';

describe('enquiryOptions', () => {
  it('defines shared base services and guest count tiers', () => {
    expect(SHARED_SERVICES.length).toBeGreaterThanOrEqual(3);
    expect(GUEST_COUNT_OPTIONS.length).toBeGreaterThanOrEqual(4);
  });

  it('returns occasion options for all 8 verticals without duplicate definitions', () => {
    events.forEach((vertical) => {
      const occasions = getOccasionsForVertical(vertical.slug);
      expect(Array.isArray(occasions)).toBe(true);
      expect(occasions.length).toBeGreaterThan(0);
      expect(occasions[0]).toHaveProperty('slug');
      expect(occasions[0]).toHaveProperty('label');
    });
  });

  it('provides contextual occasion options for weddings', () => {
    const occasions = getOccasionsForVertical('weddings');
    const labels = occasions.map((o) => o.label);
    expect(labels).toContain('Haldi');
    expect(labels).toContain('Mehendi');
    expect(labels).toContain('Complete Wedding Planning');
  });

  it('returns event-aware, contextual services tailored to each vertical', () => {
    const weddingServices = getServicesForVertical('weddings').map((s) => s.label);
    const corporateServices = getServicesForVertical('corporate-events').map((s) => s.label);
    const kidsServices = getServicesForVertical('kids-family').map((s) => s.label);
    const entertainmentServices = getServicesForVertical('live-entertainment').map((s) => s.label);

    // Weddings includes wedding-specific services
    expect(weddingServices).toContain('Mandap, Stage & Ritual Décor');
    expect(weddingServices).toContain('Baraat & Special Entry Setup');

    // Corporate includes business-specific services
    expect(corporateServices).toContain('Corporate Stage, LED & AV Setup');
    expect(corporateServices).toContain('Keynote & Conference Management');

    // Kids includes child-appropriate services
    expect(kidsServices).toContain('Custom Theme & Balloon Installations');
    expect(kidsServices).toContain('Kids Entertainment & Activities');

    // Live entertainment includes performance & effects
    expect(entertainmentServices).toContain('Special Effects (Cold Pyro, Fog, Confetti)');

    // All verticals retain shared common services
    expect(weddingServices).toContain('Full Event Planning & Day Coordination');
    expect(corporateServices).toContain('Full Event Planning & Day Coordination');
  });
});
