import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const scrollY = window.scrollY;
            const bg = heroRef.current.querySelector('.hero-bg-img');
            if (bg && scrollY < window.innerHeight) {
              bg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Snappy text reveal entrance (500–700ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.classList.add('hero-visible');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen min-h-[640px] max-h-[1050px] overflow-hidden flex items-end"
      aria-label="Hero — Next Level Events"
    >
      {/* Full-viewport Cinematic Image */}
      <div className="absolute inset-0 overflow-hidden will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=85"
          alt="Luxury wedding production and floral styling by Next Level Events"
          className="hero-bg-img w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          fetchPriority="high"
          loading="eager"
          width={2400}
          height={1600}
        />
      </div>

      {/* Multi-Layer Cinematic Overlays */}
      {/* Layer 1: Top scrim for header protection */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/25 to-transparent pointer-events-none" />

      {/* Layer 2: Bottom ground gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/65 to-transparent pointer-events-none" />

      {/* Layer 3: Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,11,11,0.5)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div
        ref={textRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 lg:pb-28"
      >
        {/* Eyebrow */}
        <div className="hero-item flex items-center gap-3 mb-6" style={{ '--delay': '0.08s' }}>
          <span className="w-8 h-px bg-gold" />
          <span className="label-eyebrow text-gold tracking-[0.25em]">
            NEXT LEVEL EVENTS
          </span>
        </div>

        {/* Huge Editorial Headline */}
        <h1
          className="hero-item heading-hero text-light mb-6 tracking-tight"
          style={{ '--delay': '0.16s', maxWidth: '13ch' }}
        >
          WE CREATE<br />
          MOMENTS<br />
          <span className="italic font-normal text-warm">THAT STAY.</span>
        </h1>

        {/* 1–2 Lines Max Supporting Copy */}
        <p
          className="hero-item body-lead mb-10 text-pearl/90 max-w-xl"
          style={{ '--delay': '0.24s' }}
        >
          Bespoke event planning and luxury production across Ranchi and Jharkhand.
          Crafted with precision, remembered for a lifetime.
        </p>

        {/* CTAs */}
        <div className="hero-item flex flex-wrap items-center gap-4" style={{ '--delay': '0.32s' }}>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="btn-primary text-[0.7rem] py-3.5 px-7"
            aria-label="Plan your event with Next Level Events"
          >
            <span>Plan Your Event</span>
            <ArrowUpRight size={14} className="text-obsidian" />
          </a>
          <a
            href="https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20discuss%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-[0.7rem] py-3.5 px-7"
            aria-label="WhatsApp Next Level Events"
          >
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Subtle Bottom Metadata & Scroll Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-10 max-w-7xl mx-auto px-6 lg:px-12 hidden sm:flex items-end justify-between pointer-events-none">
        {/* Bottom Left Detail */}
        <div className="flex flex-col gap-1">
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-warm/70 font-medium font-body">
            EVENTS · EXPERIENCES · CELEBRATIONS
          </span>
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold/80 font-medium">
            RANCHI · JHARKHAND
          </span>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <button
          onClick={(e) => scrollToSection(e, 'intro')}
          className="pointer-events-auto flex items-center gap-3 text-warm/60 hover:text-gold transition-colors duration-300 group py-2"
          aria-label="Scroll to introduction"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-8 h-px bg-white/20 relative overflow-hidden group-hover:bg-gold/40 transition-colors duration-300">
            <div className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </div>
          <ArrowDown size={12} className="text-gold group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>

      {/* Snappy 500-700ms Keyframe Styles */}
      <style>{`
        .hero-item {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform;
        }
        .hero-visible .hero-item {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
