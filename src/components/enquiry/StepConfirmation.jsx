import { useState } from 'react';
import { buildWhatsAppUrl, formatWhatsAppMessage } from '../../utils/enquiryHelpers';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../../data/contact';

export default function StepConfirmation({ formData, onEdit }) {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(formData);
  const messageText = formatWhatsAppMessage(formData);

  function handleCopy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }

  const locationDisplay =
    formData.locationType === 'outside-jharkhand'
      ? `Outside Jharkhand${formData.destinationCity ? ` — ${formData.destinationCity}` : ''}`
      : formData.locationType === 'jharkhand'
      ? `Jharkhand — ${formData.district || 'Ranchi'}`
      : 'Jharkhand — Ranchi';

  const dateDisplay =
    formData.dateMode === 'specific' && formData.eventDate
      ? formData.eventDate
      : formData.dateMode === 'flexible' && formData.flexibleDate
      ? `Flexible (${formData.flexibleDate})`
      : 'Date not decided yet';

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-block bg-gold/15 px-3 py-1 text-xs uppercase tracking-widest font-semibold text-gold">
          Ready to Connect
        </div>
        <h2 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">
          Your enquiry is ready to send.
        </h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Send your details directly to our planning team on WhatsApp for an immediate conversation, or use our direct contact options.
        </p>
      </div>

      {/* Summary Card */}
      <div className="border border-charcoal/15 bg-neutral/50 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
          <p className="font-display text-lg font-semibold text-charcoal">Enquiry Summary</p>
          <button
            type="button"
            onClick={onEdit}
            className="text-xs uppercase tracking-wider font-semibold text-gold underline hover:text-gold/80"
          >
            Edit Details
          </button>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 text-xs">
          <div>
            <dt className="text-charcoal/50 uppercase tracking-wider">Event & Occasion</dt>
            <dd className="mt-0.5 font-medium text-charcoal">
              {formData.verticalLabel || 'Custom Event'}
              {formData.occasionLabel ? ` (${formData.occasionLabel})` : ''}
            </dd>
          </div>

          <div>
            <dt className="text-charcoal/50 uppercase tracking-wider">Location</dt>
            <dd className="mt-0.5 font-medium text-charcoal">{locationDisplay}</dd>
          </div>

          <div>
            <dt className="text-charcoal/50 uppercase tracking-wider">Target Date</dt>
            <dd className="mt-0.5 font-medium text-charcoal">{dateDisplay}</dd>
          </div>

          <div>
            <dt className="text-charcoal/50 uppercase tracking-wider">Contact</dt>
            <dd className="mt-0.5 font-medium text-charcoal">
              {formData.name} ({formData.phone})
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-charcoal/50 uppercase tracking-wider">Requested Services</dt>
            <dd className="mt-0.5 font-medium text-charcoal">
              {formData.services && formData.services.length > 0
                ? formData.services.join(', ')
                : 'Full Event Coordination'}
            </dd>
          </div>

          {formData.notes && (
            <div className="sm:col-span-2">
              <dt className="text-charcoal/50 uppercase tracking-wider">Special Vision</dt>
              <dd className="mt-0.5 font-medium text-charcoal italic">{formData.notes}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Dispatch Actions */}
      <div className="space-y-3 pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-gold py-3.5 px-6 font-sans text-xs uppercase tracking-widest font-bold text-charcoal hover:bg-gold/90 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
        >
          <span>Send on WhatsApp</span>
          <span aria-hidden="true">→</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="flex min-h-[44px] w-full items-center justify-center border border-charcoal/20 bg-ivory py-2.5 px-3 text-center font-sans text-xs uppercase tracking-wider font-semibold text-charcoal hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            ← Back to Edit
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex min-h-[44px] w-full items-center justify-center border border-charcoal/20 bg-ivory py-2.5 px-3 text-center font-sans text-xs uppercase tracking-wider font-semibold text-charcoal hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {copied ? '✓ Copied' : 'Copy Summary'}
          </button>

          <a
            href={PHONE_TEL}
            className="flex min-h-[44px] w-full items-center justify-center border border-charcoal/20 bg-ivory py-2.5 px-3 text-center font-sans text-xs uppercase tracking-wider font-semibold text-charcoal hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Call {PHONE_DISPLAY}
          </a>

          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(
              `Event Enquiry: ${formData.verticalLabel || 'Celebration'}`
            )}&body=${encodeURIComponent(messageText)}`}
            className="flex min-h-[44px] w-full items-center justify-center border border-charcoal/20 bg-ivory py-2.5 px-3 text-center font-sans text-xs uppercase tracking-wider font-semibold text-charcoal hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
