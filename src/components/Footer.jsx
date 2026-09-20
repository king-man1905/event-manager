import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL, SOCIALS } from '../data/contact';
import logo from '../assets/brand/logo.png';

export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-16 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <img src={logo} alt="Next Level Events" className="h-14 w-14 rounded-full" />
          <p className="mt-4 font-display text-2xl">Next Level Events</p>
          <p className="mt-2 text-sm text-ivory/70">
            Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Follow</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
