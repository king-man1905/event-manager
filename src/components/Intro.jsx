export default function Intro() {
  return (
    <section
      id="intro"
      className="bg-[#0B0B0B] section-py relative overflow-hidden"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Split Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Label + Vertical Line */}
          <div className="lg:col-span-4 flex flex-col items-start pt-2">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              THE ART OF CELEBRATION
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-gold/70 to-transparent hidden lg:block my-4" />
            <p className="text-xs uppercase tracking-[0.18em] text-silver/60 font-body hidden lg:block">
              CURATED PRODUCTION · RANCHI
            </p>
          </div>

          {/* Right Column: Large Headline + Short Narrative */}
          <div className="lg:col-span-8">
            <h2
              id="intro-heading"
              className="heading-xl text-light leading-[0.96] tracking-tight mb-8 reveal reveal-delay-1"
            >
              EVERY EVENT HAS A STORY.<br />
              <span className="italic font-light text-warm">
                WE MAKE IT WORTH REMEMBERING.
              </span>
            </h2>

            <p className="body-lead text-pearl/85 max-w-2xl mb-12 reveal reveal-delay-2">
              We believe true luxury is found in seamless orchestration, intentional atmosphere,
              and uncompromising attention to nuance. From intimate private gatherings to grand
              celebrations across Ranchi and Jharkhand, we design environments that move people.
            </p>
          </div>
        </div>

        {/* Large Supporting Editorial Image Overlapping Grid */}
        <div className="mt-8 lg:mt-12 relative reveal reveal-delay-3">
          <div className="relative h-[380px] lg:h-[580px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=85"
              alt="Bespoke luxury wedding reception decor and table styling"
              className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04]"
              loading="lazy"
              width={2000}
              height={1333}
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
            
            {/* Editorial Caption Corner */}
            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex items-center gap-4">
              <span className="w-6 h-px bg-gold/80" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-light/90 font-medium font-body drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                Atmosphere & Floral Architecture · Ranchi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
