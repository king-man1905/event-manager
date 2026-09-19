import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const eventTypes = [
  'Wedding & Reception',
  'Corporate Event & Gala',
  'Milestone Birthday & Celebration',
  'Concert & Live Production',
  'Event Décor & Floral Design',
  'Catering Coordination',
  'Other Bespoke Occasion',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const waText = encodeURIComponent(
      `*New Event Enquiry — Next Level Events*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Details:* ${formData.message}`
    );

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.open(`https://wa.me/917903133317?text=${waText}`, '_blank');
    }, 600);
  };

  return (
    <section
      id="contact"
      className="bg-[#0B0B0B] section-py relative overflow-hidden border-t border-white/[0.06]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Huge Editorial Headline & Direct Channels */}
          <div className="lg:col-span-6">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-6 block reveal">
              COMMENCE YOUR JOURNEY
            </span>

            <h2
              id="contact-heading"
              className="heading-hero text-light leading-[0.92] tracking-tight mb-12 reveal reveal-delay-1"
            >
              LET'S CREATE<br />
              SOMETHING<br />
              <span className="italic font-light text-warm">MEMORABLE.</span>
            </h2>

            <p className="body-lead text-silver/85 max-w-lg mb-12 reveal reveal-delay-2">
              Whether you are planning a grand wedding in Ranchi, an executive summit, or an intimate
              celebration across Jharkhand, our studio is at your disposal.
            </p>

            {/* Verified Direct Channels */}
            <div className="space-y-6 pt-8 border-t border-white/[0.08] reveal reveal-delay-3">
              <div>
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-1">
                  DIRECT LINE & WHATSAPP
                </span>
                <a
                  href="tel:+917903133317"
                  className="font-display text-light text-2xl lg:text-3xl font-light hover:text-gold transition-colors duration-300 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  +91 79031 33317
                </a>
              </div>

              <div>
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-1">
                  OFFICIAL INQUIRIES
                </span>
                <a
                  href="mailto:nextlevel.events25@gmail.com"
                  className="text-warm/80 hover:text-gold transition-colors duration-300 text-sm tracking-wide"
                >
                  nextlevel.events25@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-1">
                  STUDIO LOCATION
                </span>
                <p className="text-xs text-silver/70 leading-relaxed font-body">
                  Kanke Road, Beside Chef's Chaupati, Jhigra Toli,<br />
                  Gandhi Nagar, Ranchi, Jharkhand 834002
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Elegant Underline Contact Form */}
          <div className="lg:col-span-6 bg-[#111111] p-8 lg:p-14 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] reveal reveal-delay-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div>
                  <label htmlFor="name" className="text-[0.65rem] uppercase tracking-[0.2em] text-warm/70 block mb-1">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Sharma"
                    className="input-underline"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-[0.65rem] uppercase tracking-[0.2em] text-warm/70 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="input-underline"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="text-[0.65rem] uppercase tracking-[0.2em] text-warm/70 block mb-1">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="input-underline cursor-pointer bg-transparent"
                    style={{ color: formData.eventType ? '#F6F3EE' : 'rgba(255,255,255,0.4)' }}
                  >
                    <option value="" disabled style={{ background: '#181818', color: '#999' }}>
                      Select the occasion type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type} style={{ background: '#181818', color: '#F6F3EE' }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-[0.65rem] uppercase tracking-[0.2em] text-warm/70 block mb-1">
                    Tell Us About Your Event *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Date, approximate guest count, venue preferences, or aesthetic brief..."
                    className="input-underline resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary justify-center text-[0.7rem] py-3.5 px-8"
                    aria-label="Send event enquiry"
                  >
                    <span>{submitting ? 'SENDING...' : 'SEND ENQUIRY'}</span>
                    <ArrowUpRight size={14} className="text-obsidian" />
                  </button>
                  <a
                    href="https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20discuss%20an%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline justify-center text-[0.7rem] py-3 px-6"
                    aria-label="WhatsApp Next Level Events directly"
                  >
                    <span>WHATSAPP US</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center flex flex-col items-center">
                <CheckCircle2 size={48} className="text-gold mb-6 animate-pulse" />
                <h3
                  className="font-display text-light text-3xl font-light tracking-tight mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ENQUIRY RECEIVED
                </h3>
                <p className="text-sm text-silver/80 leading-relaxed font-body max-w-sm mb-8">
                  Your inquiry has been formatted and opened in WhatsApp. Our production directors will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-[0.2em] text-gold hover:text-warm transition-colors duration-300"
                >
                  ← Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
