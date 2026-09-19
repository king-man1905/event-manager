export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0B0B0B] section-py relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Asymmetric Composition: Layered Images Left, Art-Directed Story Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Magazine Images */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div className="relative h-[420px] lg:h-[540px] w-full lg:w-[88%] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] reveal">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Next Level Events creative direction in Ranchi"
                className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.04]"
                loading="lazy"
                width={1200}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
            </div>

            {/* Smaller Overlapping Image */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 lg:right-0 w-[55%] h-[240px] overflow-hidden border-2 border-[#0B0B0B] shadow-[0_20px_40px_rgba(0,0,0,0.9)] reveal reveal-delay-2">
              <img
                src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=800&q=80"
                alt="Floral architecture detail"
                className="w-full h-full object-cover filter brightness-[0.95]"
                loading="lazy"
                width={800}
                height={533}
              />
              <div className="absolute bottom-3 left-3 bg-[#0B0B0B]/80 px-3 py-1">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold font-medium">
                  ARCHIVE // RANCHI
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Short Story + Verified Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              ABOUT NEXT LEVEL
            </span>

            <h2
              id="about-heading"
              className="heading-xl text-light leading-[0.96] tracking-tight mb-8 reveal reveal-delay-1"
            >
              GROUNDED IN RANCHI.<br />
              <span className="italic font-light text-warm">DRIVEN BY EXCELLENCE.</span>
            </h2>

            <div className="space-y-6 text-silver/85 font-body leading-relaxed mb-10 reveal reveal-delay-2">
              <p className="body-lead text-pearl/90">
                Next Level Events was created to bring high-calibre event production and refined
                aesthetic direction to Jharkhand. We approach every occasion not as a routine ceremony,
                but as a crafted sensory experience.
              </p>
              <p className="text-sm">
                From our studio on Kanke Road, Gandhi Nagar, we oversee signature weddings, corporate
                summits, concerts, and private milestone celebrations — transforming spaces through
                bespoke floral architecture, spatial lighting, and unflinching logistics command.
              </p>
            </div>

            {/* Verified Business Details Pill Box */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 reveal reveal-delay-3">
              <div>
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-1">
                  HEADQUARTERS
                </span>
                <p className="text-xs text-light/90 font-medium">
                  Kanke Road, Gandhi Nagar<br />
                  Ranchi, Jharkhand 834002
                </p>
              </div>

              <div>
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/80 block mb-1">
                  REGIONAL SCOPE
                </span>
                <p className="text-xs text-light/90 font-medium">
                  Ranchi · Jamshedpur · Dhanbad<br />
                  Bokaro & all Jharkhand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
