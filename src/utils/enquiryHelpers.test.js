import { describe, it, expect } from 'vitest';
import { parseEnquiryParams, formatWhatsAppMessage, buildWhatsAppUrl } from './enquiryHelpers';
import { WHATSAPP_NUMBER } from '../data/contact';

describe('enquiryHelpers', () => {
  it('parses URL search parameters correctly for all location options', () => {
    const paramsRanchi = new URLSearchParams('vertical=weddings&experience=haldi&location=ranchi');
    expect(parseEnquiryParams(paramsRanchi).locationType).toBe('ranchi');

    const paramsJharkhand = new URLSearchParams('vertical=weddings&location=jharkhand&district=Dhanbad');
    const parsedJharkhand = parseEnquiryParams(paramsJharkhand);
    expect(parsedJharkhand.locationType).toBe('jharkhand');
    expect(parsedJharkhand.district).toBe('Dhanbad');

    const paramsOutside = new URLSearchParams('vertical=corporate-events&location=outside-jharkhand&destination=Kolkata');
    const parsedOutside = parseEnquiryParams(paramsOutside);
    expect(parsedOutside.locationType).toBe('outside-jharkhand');
    expect(parsedOutside.destinationCity).toBe('Kolkata');
  });

  it('formats WhatsApp messages with Jharkhand — Ranchi location', () => {
    const formData = {
      verticalLabel: 'Weddings',
      occasionLabel: 'Haldi',
      locationType: 'ranchi',
      dateMode: 'specific',
      eventDate: '2026-12-15',
      services: ['Mandap, Stage & Ritual Décor', 'Full Event Planning & Day Coordination'],
      name: 'Aman Verma',
      phone: '9876543210',
      notes: 'Need evening lighting setup',
    };
    const message = formatWhatsAppMessage(formData);
    expect(message).toContain('* Event: Weddings (Haldi)');
    expect(message).toContain('* Location: Jharkhand — Ranchi');
    expect(message).toContain('* Target Date: 2026-12-15');
    expect(message).toContain('* Services: Mandap, Stage & Ritual Décor, Full Event Planning & Day Coordination');
    expect(message).toContain('* Name: Aman Verma');
    expect(message).toContain('* Phone: 9876543210');
    expect(message).toContain('* Note: Need evening lighting setup');
  });

  it('formats WhatsApp messages with Jharkhand — District location', () => {
    const formData = {
      verticalLabel: 'Weddings',
      occasionLabel: 'Reception',
      locationType: 'jharkhand',
      district: 'Jamshedpur',
      dateMode: 'flexible',
      flexibleDate: 'December 2026',
      services: ['Full Event Planning & Day Coordination'],
      name: 'Priya',
      phone: '9876543210',
    };
    const message = formatWhatsAppMessage(formData);
    expect(message).toContain('* Location: Jharkhand — Jamshedpur');
    expect(message).toContain('* Target Date: Flexible (December 2026)');
  });

  it('formats WhatsApp messages with Outside Jharkhand — Destination location', () => {
    const formData = {
      verticalLabel: 'Destination Events',
      occasionLabel: 'Destination Wedding',
      locationType: 'outside-jharkhand',
      destinationCity: 'Kolkata',
      dateMode: 'undecided',
      services: [],
      name: 'Raj',
      phone: '9999999999',
    };
    const message = formatWhatsAppMessage(formData);
    expect(message).toContain('* Location: Outside Jharkhand — Kolkata');
    expect(message).toContain('* Target Date: Flexible / Not decided yet');
    expect(message).toContain('* Services: Full Event Coordination');
  });

  it('builds a valid wa.me URL with safe encoding', () => {
    const formData = {
      verticalLabel: 'Weddings',
      locationType: 'jharkhand',
      district: 'Dhanbad',
      name: 'Aman',
      phone: '9999999999',
    };
    const url = buildWhatsAppUrl(formData);
    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    expect(url).not.toContain(' ');
    expect(decodeURIComponent(url)).toContain('Jharkhand — Dhanbad');
  });
});
