import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';

export default function Services() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="services"
      className="bg-[#0B0B0B] section-py relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              CAPABILITIES & SERVICES
            </span>
            <h2
              id="services-heading"
              className="heading-xl text-light leading-[0.96] tracking-tight reveal reveal-delay-1"
            >
              CRAFTED WITH PRECISION.<br />
              <span className="italic font-light text-warm">EXECUTED WITH MASTERY.</span>
            </h2>
          </div>
          <p className="body-lead text-silver/80 lg:max-w-md reveal reveal-delay-2">
            Every event is conceived as a unique creative production. From initial conceptualization
            to day-of stage orchestration, we oversee every dimension.
          </p>
        </div>

        {/* Large Editorial Rows (No Rounded Cards) */}
        <div className="flex flex-col border-t border-white/[0.1]">
          {services.map((service, i) => {
            const isHovered = hoveredId === service.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(service.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                role="article"
                aria-label={`Service: ${service.title}`}
                className={`reveal group relative border-b border-white/[0.1] py-8 lg:py-12 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  isAnyHovered && !isHovered ? 'opacity-30' : 'opacity-100'
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="grid grid-cols-12 items-center gap-4 lg:gap-8">
                  {/* Number */}
                  <div className="col-span-2 lg:col-span-1">
                    <span className="counter-num text-sm text-gold/80 block group-hover:text-gold transition-colors duration-300">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div className="col-span-8 lg:col-span-6 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold/70 block mb-1">
                      {service.tag}
                    </span>
                    <h3
                      className="font-display text-light text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight group-hover:text-warm transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-silver/60 italic font-display mt-1 hidden sm:block">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Short Narrative on Desktop */}
                  <div className="hidden lg:block lg:col-span-4">
                    <p className="text-sm text-silver/70 leading-relaxed font-body">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="col-span-2 lg:col-span-1 flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 group-hover:rotate-45">
                      <ArrowUpRight
                        size={16}
                        className="text-warm/60 group-hover:text-gold transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Description */}
                <p className="text-xs text-silver/70 leading-relaxed font-body mt-4 lg:hidden pl-8">
                  {service.description}
                </p>

                {/* Interactive Editorial Image Preview on Desktop Hover */}
                <div
                  className={`hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 w-64 h-40 pointer-events-none z-20 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 ${
                    isHovered
                      ? 'opacity-100 scale-100 translate-x-0'
                      : 'opacity-0 scale-90 translate-x-8'
                  }`}
                  aria-hidden="true"
                >
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover filter brightness-[0.95]"
                    loading="lazy"
                    width={256}
                    height={160}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
