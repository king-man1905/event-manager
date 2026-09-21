import { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import { nav } from '../data/nav';
import logo from '../assets/brand/logo.png';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-charcoal">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Next Level Events" className="h-10 w-10 rounded-full lg:h-12 lg:w-12" />
          <span className="font-display text-xl text-ivory lg:text-2xl">Next Level Events</span>
        </Link>
        <div className="flex items-center gap-6">
          <MegaMenu items={nav} />
          <Link
            to="/enquire"
            className="hidden sm:inline-block bg-gold px-4 py-2 font-sans text-xs uppercase tracking-wider font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            Enquire
          </Link>
          <button
            type="button"
            className="text-ivory lg:hidden"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>
      <MobileDrawer items={nav} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
