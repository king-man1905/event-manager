import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL, SOCIALS } from '../data/contact';
import logo from '../assets/brand/logo.png';
import manifest from '../assets/manifest.json';

const imageCredits = [
  ...new Set(
    Object.values(manifest)
      .filter((image) => image.license.startsWith('CC'))
      .map((image) => `${image.source} (${image.license})`)
  ),
];

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
            <li className="pt-2">
              <a href="/locations" className="text-gold/90 hover:text-gold">
                Where We Work (Locations)
              </a>
            </li>
            <li>
              <a href="/enquire" className="text-gold/90 hover:text-gold">
                Plan Your Event (Enquiry)
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
      {imageCredits.length > 0 && (
        <div className="mx-auto mt-12 max-w-7xl border-t border-ivory/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-ivory/40">Image Credits</p>
          <ul className="mt-2 space-y-1 text-xs text-ivory/50">
            {imageCredits.map((credit) => (
              <li key={credit}>{credit}</li>
            ))}
          </ul>
        </div>
      )}
    </footer>
  );
}
