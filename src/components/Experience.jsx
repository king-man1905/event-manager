import { useRef, useEffect, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'CONCEPT',
    tag: 'THE VISION',
    description:
      'Every signature event begins with deep listening. We understand your personal narrative, stylistic sensibilities, and aspirational goals — framing a tailored aesthetic concept that is singular to you.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    number: '02',
    title: 'PLANNING',
    tag: 'THE BLUEPRINT',
    description:
      'Rigorous operational architecture. We manage venue curation, vendor procurement, time-critical production schedules, guest hospitality protocols, and complete financial clarity.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80',
  },
  {
    number: '03',
    title: 'DESIGN',
    tag: 'THE AESTHETIC',
    description:
      'Where imagination materializes into tangible grandeur. Floral architecture, bespoke stage craft, dynamic lighting programming, and bespoke table settings designed to stir emotion.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    number: '04',
    title: 'EXECUTION',
    tag: 'THE PRODUCTION',
    description:
      'Our seasoned production directors command the floor. From the first truckload to live show-calling and minute-by-minute contingency management, precision reigns supreme.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
  },
  {
    number: '05',
    title: 'CELEBRATION',
    tag: 'THE MOMENT',
    description:
      'The culmination of intent. You step into an atmosphere where every transition is seamless and effortless — allowing you to be entirely present in the celebration of your life.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
  },
];

export default function Experience() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  // IntersectionObserver to sync active step with scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepsRef.current.indexOf(entry.target);
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { rootMargin: '-35% 0px -40% 0px', threshold: 0.1 }
    );

    stepsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="bg-[#0B0B0B] section-py relative overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
            THE METHODOLOGY
          </span>
          <h2
            id="experience-heading"
            className="heading-xl text-light leading-[0.96] tracking-tight reveal reveal-delay-1"
          >
            HOW VISION BECOMES<br />
            <span className="italic font-light text-warm">UNFORGETTABLE REALITY.</span>
          </h2>
        </div>

        {/* Desktop: Sticky Image + Dramatic Sequential Steps */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          {/* Sticky Left Visual Container */}
          <div className="col-span-5 sticky top-32">
            <div className="relative h-[540px] w-full overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: activeStep === i ? 1 : 0 }}
                  aria-hidden={activeStep !== i}
                >
                  <img
                    src={step.image}
                    alt={`${step.title} — ${step.tag}`}
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.03]"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold font-medium font-body">
                      PHASE {step.number} // {step.tag}
                    </span>
                    <span className="counter-num text-sm text-warm">
                      {step.number} / 05
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Steps Right Column */}
          <div className="col-span-7 flex flex-col">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={step.number}
                  ref={(el) => { stepsRef.current[i] = el; }}
                  onClick={() => setActiveStep(i)}
                  className={`py-12 border-t border-white/[0.08] last:border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                    isActive ? 'opacity-100 translate-x-1' : 'opacity-25 hover:opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-8">
                    {/* Large Number */}
                    <span
                      className={`font-display text-4xl lg:text-5xl font-light tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-warm/40'
                      }`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.number}
                    </span>

                    {/* Step Information */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-3 h-px bg-gold" />
                        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold font-medium">
                          {step.tag}
                        </span>
                      </div>
                      <h3
                        className="font-display text-light text-2xl lg:text-3xl font-light tracking-tight mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="body-lead text-sm text-silver/80 leading-relaxed font-body max-w-xl">
                        {step.description}
                      </p>

                      {/* Active Accent Line */}
                      {isActive && (
                        <div className="mt-6 flex items-center gap-2">
                          <span className="w-12 h-px bg-gold" />
                          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold/80 font-medium">
                            CURRENT STAGE
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Editorial Numbered Cards with Imagery */}
        <div className="lg:hidden flex flex-col gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="reveal border-t border-white/10 pt-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="counter-num text-base text-gold">{step.number}</span>
                <span className="w-4 h-px bg-gold/50" />
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold font-medium">
                  {step.tag}
                </span>
              </div>

              <h3
                className="font-display text-light text-2xl font-light tracking-tight mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>

              <p className="text-sm text-silver/80 leading-relaxed font-body mb-5">
                {step.description}
              </p>

              <div className="relative h-48 w-full overflow-hidden border border-white/10">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.9]"
                  loading="lazy"
                  width={600}
                  height={300}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
