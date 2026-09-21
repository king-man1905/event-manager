import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL, SOCIALS } from '../data/contact';
import logo from '../assets/brand/logo.png';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Weddings', href: '/events/weddings' },
  { label: 'Corporate Events', href: '/events/corporate-events' },
  { label: 'Social Celebrations', href: '/events/social-celebrations' },
  { label: 'Kids & Family', href: '/events/kids-family' },
  { label: 'Live & Entertainment', href: '/events/live-entertainment' },
  { label: 'Décor & Design', href: '/events/decor-design' },
  { label: 'Special & Cultural', href: '/events/special-cultural' },
  { label: 'Destination Events', href: '/events/destination-events' },
  { label: 'Contact', href: '/#contact' },
];

function InstagramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal px-6 pt-16 pb-12 text-ivory">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
        {/* Brand & Studio Info */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3.5">
            <img
              src={logo}
              alt="Next Level Events"
              width="56"
              height="56"
              className="h-14 w-14 rounded-full border border-gold/30 object-cover shrink-0"
            />
            <div>
              <p className="font-display text-2xl leading-none text-ivory">Next Level Events</p>
              <p className="mt-1 font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium">
                Events Beyond Expectations
              </p>
            </div>
          </div>

          <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
            Wedding, Birthday & Corporate Event Planners based in Ranchi, serving all 24 districts across Jharkhand and select destinations.
          </p>

          <div className="pt-2 text-sm text-ivory/80 space-y-2">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-gold/80 font-medium">Headquarters</span>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold leading-snug"
              >
                {ADDRESS}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              <a
                href={PHONE_TEL}
                className="text-ivory font-medium hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {PHONE_DISPLAY}
              </a>
              <span className="text-ivory/30">•</span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {EMAIL}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <Link
                to="/locations"
                className="text-gold hover:text-gold/80 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Where We Work
              </Link>
              <span className="text-ivory/30">•</span>
              <Link
                to="/enquire"
                className="text-gold hover:text-gold/80 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Plan Your Event
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-4 lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Quick Links</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ivory/70">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media & Connect */}
        <div className="md:col-span-3 lg:col-span-3 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Connect With Us</p>
          <p className="text-xs text-ivory/60 leading-relaxed">
            Follow our daily event productions, mandap designs, and real client celebrations on social media.
          </p>

          <div className="space-y-2.5 pt-1">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-3 rounded-lg border border-ivory/15 bg-ivory/5 px-3.5 py-2.5 text-xs font-medium text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <InstagramIcon className="h-4 w-4 text-gold shrink-0" />
              <span>Instagram</span>
            </a>

            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-3 rounded-lg border border-ivory/15 bg-ivory/5 px-3.5 py-2.5 text-xs font-medium text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <FacebookIcon className="h-4 w-4 text-gold shrink-0" />
              <span>Facebook</span>
            </a>

            <a
              href={SOCIALS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-3 rounded-lg border border-ivory/15 bg-ivory/5 px-3.5 py-2.5 text-xs font-medium text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <YouTubeIcon className="h-4 w-4 text-gold shrink-0" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-ivory/10 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ivory/50">
        <p>© Next Level Events. All rights reserved.</p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            to="/image-credits"
            className="hover:text-gold text-ivory/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Image Credits & Licenses
          </Link>

          <button
            type="button"
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 hover:text-gold text-ivory/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded py-1"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
