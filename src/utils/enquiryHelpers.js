import { WHATSAPP_NUMBER } from '../data/contact';

export function parseEnquiryParams(searchParams) {
  if (!searchParams) return {};
  const vertical = searchParams.get('vertical') || '';
  const experience = searchParams.get('experience') || '';
  const layer = searchParams.get('layer') || '';
  const location = searchParams.get('location') || '';
  const district = searchParams.get('district') || '';
  const destination = searchParams.get('destination') || searchParams.get('city') || '';

  let locationType = '';
  if (location === 'ranchi') {
    locationType = 'ranchi';
  } else if (location === 'jharkhand') {
    locationType = 'jharkhand';
  } else if (location === 'outside-jharkhand' || location === 'outstation') {
    locationType = 'outside-jharkhand';
  }

  return {
    vertical,
    experience,
    layer,
    locationType,
    district,
    destinationCity: destination,
  };
}

export function formatWhatsAppMessage(data) {
  const parts = ['Hi Next Level Events, I would like to enquire about planning an event:'];

  if (data.verticalLabel) {
    const occasion = data.occasionLabel ? ` (${data.occasionLabel})` : '';
    parts.push(`* Event: ${data.verticalLabel}${occasion}`);
  }

  // Truthful 3-Tier Location formatting
  if (data.locationType === 'outside-jharkhand') {
    const dest = data.destinationCity && data.destinationCity.trim()
      ? data.destinationCity.trim()
      : 'Destination on enquiry';
    parts.push(`* Location: Outside Jharkhand — ${dest}`);
  } else if (data.locationType === 'jharkhand') {
    const dist = data.district && data.district.trim() ? data.district.trim() : 'Select District';
    parts.push(`* Location: Jharkhand — ${dist}`);
  } else {
    // Default or option 1 'ranchi'
    parts.push('* Location: Jharkhand — Ranchi');
  }

  if (data.dateMode === 'specific' && data.eventDate) {
    parts.push(`* Target Date: ${data.eventDate}`);
  } else if (data.dateMode === 'flexible' && data.flexibleDate) {
    parts.push(`* Target Date: Flexible (${data.flexibleDate})`);
  } else {
    parts.push('* Target Date: Flexible / Not decided yet');
  }

  if (data.guestCount && data.guestCount !== 'Yet to be decided') {
    parts.push(`* Estimated Guests: ${data.guestCount}`);
  }

  const services = Array.isArray(data.services) && data.services.length > 0
    ? data.services.join(', ')
    : 'Full Event Coordination';
  parts.push(`* Services: ${services}`);

  if (data.name && data.name.trim()) {
    parts.push(`* Name: ${data.name.trim()}`);
  }
  if (data.phone && data.phone.trim()) {
    parts.push(`* Phone: ${data.phone.trim()}`);
  }
  if (data.notes && data.notes.trim()) {
    parts.push(`* Note: ${data.notes.trim()}`);
  }

  parts.push('\nLooking forward to discussing our celebration with your team.');
  return parts.join('\n');
}

export function buildWhatsAppUrl(data) {
  const text = formatWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
