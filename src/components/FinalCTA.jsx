import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Full-Width Cinematic Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=85"
          alt="Atmospheric evening event illumination by Next Level Events"
          className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05]"
          loading="lazy"
          width={2400}
          height={1600}
        />
        {/* Deep Multi-Layer Overlays */}
        <div className="absolute inset-0 bg-[#0B0B0B]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-28 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 reveal">
          <span className="w-8 h-px bg-gold" />
          <span className="label-eyebrow text-gold tracking-[0.25em]">
            NEXT LEVEL EVENTS
          </span>
          <span className="w-8 h-px bg-gold" />
        </div>

        {/* Huge Typography */}
        <h2
          id="final-cta-heading"
          className="heading-hero text-light leading-[0.92] tracking-tight mb-12 reveal reveal-delay-1"
          style={{ maxWidth: '14ch' }}
        >
          YOUR NEXT<br />
          MOMENT<br />
          <span className="italic font-light text-warm">STARTS HERE.</span>
        </h2>

        {/* Dual CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-5 reveal reveal-delay-2">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="btn-primary text-[0.7rem] py-4 px-8"
            aria-label="Plan your event"
          >
            <span>Plan Your Event</span>
            <ArrowUpRight size={14} className="text-obsidian" />
          </a>
          <a
            href="https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20discuss%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-[0.7rem] py-4 px-8"
            aria-label="WhatsApp Next Level Events"
          >
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
