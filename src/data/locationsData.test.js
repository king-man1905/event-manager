import { describe, it, expect } from 'vitest';
import { locationsData, JHARKHAND_DISTRICTS } from './locationsData';
import { ADDRESS, PHONE_DISPLAY, EMAIL } from './contact';

describe('locationsData', () => {
  it('contains primary Ranchi studio data matching verified contact details', () => {
    expect(locationsData.primary).toBeDefined();
    expect(locationsData.primary.city).toBe('Ranchi');
    expect(locationsData.primary.state).toBe('Jharkhand');
    expect(locationsData.primary.address).toBe(ADDRESS);
    expect(locationsData.primary.phone).toBe(PHONE_DISPLAY);
    expect(locationsData.primary.email).toBe(EMAIL);
    expect(locationsData.primary.status).toBe('primary-studio');
    expect(locationsData.primary.mapUrl).toContain('https://www.google.com/maps');
  });

  it('defines the Jharkhand service area across districts without claiming branch offices', () => {
    expect(locationsData.jharkhandServiceArea).toBeDefined();
    expect(locationsData.jharkhandServiceArea.headline).toBe('Based in Ranchi, serving events across Jharkhand.');
    expect(Array.isArray(locationsData.jharkhandServiceArea.districts)).toBe(true);
    expect(locationsData.jharkhandServiceArea.districts.length).toBe(24);
    expect(locationsData.jharkhandServiceArea.districts).toContain('Ranchi');
    expect(locationsData.jharkhandServiceArea.districts).toContain('East Singhbhum (Jamshedpur)');
    expect(locationsData.jharkhandServiceArea.districts).toContain('Dhanbad');
    expect(locationsData.jharkhandServiceArea.districts).toContain('Bokaro');
    expect(locationsData.jharkhandServiceArea.notice).toContain('do not operate standalone physical branches');
  });

  it('contains truthful outside-Jharkhand outstation capabilities with step-by-step process', () => {
    expect(locationsData.outsideJharkhand).toBeDefined();
    expect(locationsData.outsideJharkhand.status).toBe('outstation-available');
    expect(Array.isArray(locationsData.outsideJharkhand.howItWorks)).toBe(true);
    expect(locationsData.outsideJharkhand.howItWorks.length).toBe(3);
  });

  it('contains no fabricated branch office claims or fake ratings', () => {
    const rawString = JSON.stringify(locationsData).toLowerCase();
    expect(rawString).not.toContain('branch office');
    expect(rawString).not.toContain('satellite office');
    expect(rawString).not.toContain('rating');
  });
});
