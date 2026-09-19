import { ArrowUpRight } from 'lucide-react';

export default function BrandStatement() {
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
      className="relative min-h-[75vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Brand Campaign — Next Level Events"
    >
      {/* Full-Bleed Atmospheric Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85"
          alt="Luxury banquet dinner production and ambient lighting by Next Level Events"
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          loading="lazy"
          width={2400}
          height={1600}
        />
        {/* Deep Multi-Layer Vignette Scrim */}
        <div className="absolute inset-0 bg-[#0B0B0B]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,11,11,0.85)_100%)]" />
      </div>

      {/* Campaign Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-24 text-center flex flex-col items-center">
        {/* Small Eyebrow */}
        <div className="flex items-center gap-3 mb-8 reveal">
          <span className="w-6 h-px bg-gold/70" />
          <span className="label-eyebrow text-gold tracking-[0.3em]">
            NEXT LEVEL EVENTS
          </span>
          <span className="w-6 h-px bg-gold/70" />
        </div>

        {/* Huge Statement */}
        <h2
          className="heading-hero text-light leading-[0.92] tracking-tight mb-10 reveal reveal-delay-1"
          style={{ maxWidth: '16ch' }}
        >
          YOUR OCCASION.<br />
          <span className="italic font-light text-warm">
            OUR OBSESSION WITH DETAIL.
          </span>
        </h2>

        {/* Campaign CTA */}
        <div className="reveal reveal-delay-2">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 text-light hover:border-gold hover:text-gold transition-all duration-300 tracking-[0.2em] text-[0.7rem] uppercase font-medium"
            aria-label="Start a conversation with Next Level Events"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight size={14} className="text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
