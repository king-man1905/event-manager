import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { events } from '../data/events';
import { weddingStyles } from '../data/weddings';
import { ritualStyles } from '../data/rituals';
import { corporateStyles } from '../data/corporate';
import { socialStyles } from '../data/social';
import { entertainmentStyles } from '../data/entertainment';
import { decorStyles } from '../data/decor';
import { culturalStyles } from '../data/cultural';
import { destinationStyles } from '../data/destination';
import CategoryExperience from './CategoryExperience';

// Weddings alone gets a second layer (Cultural Weddings + Wedding Rituals),
// so it's keyed by `groups` instead of a flat `subItems` list.
const weddingGroups = [
  { label: 'Cultural Weddings', items: weddingStyles },
  { label: 'Wedding Rituals & Celebrations', items: ritualStyles },
];

const subItemsByCategory = {
  corporate: corporateStyles,
  social: socialStyles,
  live: entertainmentStyles,
  decor: decorStyles,
  special: culturalStyles,
  destination: destinationStyles,
};

const sizeClasses = {
  large: 'lg:col-span-7 min-h-[420px] lg:min-h-[520px]',
  wide: 'lg:col-span-12 min-h-[340px] lg:min-h-[380px]',
  medium: 'lg:col-span-5 min-h-[340px] lg:min-h-[420px]',
};

export default function OurEvents({ onViewWork }) {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <>
      <section id="events" className="bg-[#0B0B0B] section-py relative overflow-hidden" aria-labelledby="events-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              OUR EVENTS
            </span>
            <h2 id="events-heading" className="heading-xl text-light leading-[0.96] tracking-tight mb-6 reveal reveal-delay-1">
              EVERY OCCASION.<br />
              <span className="italic font-light text-warm">A NEW STORY.</span>
            </h2>
            <p className="body-lead text-silver/85 max-w-xl reveal reveal-delay-2">
              From weddings and celebrations to corporate experiences and live events, explore the
              kind of occasion you want to create.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {events.map((event, i) => (
              <article
                key={event.id}
                className={`reveal group relative overflow-hidden cursor-pointer ${sizeClasses[event.size]} transition-all duration-500`}
                onClick={() => setOpenCategory(event)}
                onKeyDown={(e) => e.key === 'Enter' && setOpenCategory(event)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${event.name}`}
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <img
                  src={event.image}
                  alt={`${event.name} — Next Level Events`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] filter brightness-[0.9]"
                  loading="lazy"
                  width={1000}
                  height={700}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/25 to-transparent" />

                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#0B0B0B]/60 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:rotate-45">
                  <ArrowUpRight size={13} className="text-light group-hover:text-obsidian transition-colors duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="counter-num text-xs text-gold/80 block mb-2">{event.number}</span>
                  <h3
                    className="font-display text-light text-2xl lg:text-3xl font-light tracking-tight mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {event.name.toUpperCase()}
                  </h3>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-warm/80 mb-3">
                    {event.descriptor}
                  </p>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-medium inline-flex items-center gap-2">
                    Explore <ArrowUpRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {openCategory && (
        <CategoryExperience
          category={openCategory}
          subItems={subItemsByCategory[openCategory.id]}
          groups={openCategory.id === 'weddings' ? weddingGroups : undefined}
          onClose={() => setOpenCategory(null)}
          onViewWork={(portfolioCategory) => {
            setOpenCategory(null);
            onViewWork?.(portfolioCategory);
          }}
        />
      )}
    </>
  );
}
