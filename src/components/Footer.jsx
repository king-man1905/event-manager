const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Process' },
  { href: '#difference', label: 'Difference' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  { label: 'Instagram', handle: '@nextlevelevents.in', href: 'https://www.instagram.com/nextlevelevents.in' },
  { label: 'Facebook', handle: 'nextlevelevents.in', href: 'https://www.facebook.com/nextlevelevents.in' },
  { label: 'YouTube', handle: '@nextlevelevents25', href: 'https://www.youtube.com/@nextlevelevents25' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="bg-[#070707] text-silver border-t border-white/[0.08] relative overflow-hidden pt-20 pb-12"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand & Short Line */}
          <div className="lg:col-span-5">
            <span
              id="footer-heading"
              className="font-display text-light text-2xl lg:text-3xl font-light tracking-tight block mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              NEXT LEVEL EVENTS
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold/80 block mb-6">
              RANCHI · JHARKHAND
            </span>
            <p className="text-sm text-silver/70 max-w-sm leading-relaxed font-body mb-8">
              Curated luxury event production, bespoke décor architecture, and comprehensive celebration
              management across Jharkhand.
            </p>
            <div className="w-12 h-px bg-gold/50" />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-6 font-medium">
              EXPLORE
            </span>
            <ul className="space-y-3 font-body text-xs" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-warm/75 hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-2 font-medium">
                DIRECT CONTACT
              </span>
              <a
                href="tel:+917903133317"
                className="text-light hover:text-gold transition-colors duration-300 text-sm font-medium block mb-1"
              >
                +91 79031 33317
              </a>
              <a
                href="mailto:nextlevel.events25@gmail.com"
                className="text-xs text-silver/70 hover:text-gold transition-colors duration-300 block"
              >
                nextlevel.events25@gmail.com
              </a>
            </div>

            <div>
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-3 font-medium">
                CHANNELS
              </span>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-warm/70 hover:text-gold transition-colors duration-300 uppercase tracking-wider"
                    aria-label={`Visit Next Level Events on ${s.label}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Jurisdiction */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.7rem] text-silver/50">
          <p>© {new Date().getFullYear()} Next Level Events. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[0.65rem]">
            Ranchi · Jamshedpur · Dhanbad · Bokaro · Jharkhand
          </p>
        </div>
      </div>

      {/* Oversized Subtle "NEXT LEVEL" Watermark Graphic */}
      <div
        className="w-full text-center mt-12 select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-light text-[17vw] leading-none text-white/[0.025] tracking-tight block whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          NEXT LEVEL
        </span>
      </div>
    </footer>
  );
}
