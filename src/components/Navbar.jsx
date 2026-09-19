import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Process' },
  { href: '#difference', label: 'Difference' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'py-4 bg-[#0B0B0B]/92 backdrop-blur-md border-b border-white/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
            : 'py-6 lg:py-7 bg-gradient-to-b from-[#0B0B0B]/85 via-[#0B0B0B]/40 to-transparent backdrop-blur-[3px]'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo — Always High Contrast */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex flex-col leading-none group drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            aria-label="Next Level Events — Creative Event Agency"
          >
            <span
              className="font-display text-light text-2xl lg:text-[1.75rem] font-light tracking-tight transition-colors duration-300 group-hover:text-gold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              NEXT LEVEL
            </span>
            <span
              className="label-eyebrow text-gold text-[0.6rem] tracking-[0.28em] mt-0.5"
            >
              EVENTS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden xl:flex items-center gap-9" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative font-body text-[0.7rem] uppercase tracking-[0.2em] font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]
                      ${isActive ? 'text-gold font-semibold' : 'text-warm/90 hover:text-light'}
                    `}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-6">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary text-[0.65rem] py-2.5 px-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              aria-label="Plan your event"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight size={13} className="text-obsidian" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-light hover:text-gold p-2 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(5, 5, 5, 0.75)', backdropFilter: 'blur(8px)' }}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-[#111111] border-l border-white/[0.08] flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/[0.08]">
          <div className="flex flex-col">
            <span className="font-display text-light text-xl font-light tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              NEXT LEVEL
            </span>
            <span className="label-eyebrow text-gold text-[0.55rem] tracking-[0.25em]">
              EVENTS · RANCHI
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-warm/80 hover:text-gold transition-colors duration-300 p-2"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group flex items-center justify-between py-3.5 border-b border-white/[0.05]"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span
                className="font-display text-warm text-2xl font-light group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {link.label}
              </span>
              <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="px-8 py-8 border-t border-white/[0.08] flex flex-col gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary justify-center text-[0.7rem] py-3.5"
            aria-label="Plan your event"
          >
            <span>Plan Your Event</span>
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20discuss%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline justify-center text-[0.7rem] py-3"
            aria-label="WhatsApp Next Level Events"
          >
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </>
  );
}
