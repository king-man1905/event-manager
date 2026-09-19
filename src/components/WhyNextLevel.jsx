const principles = [
  {
    number: '01',
    title: 'Thoughtful Planning',
    description:
      'We do not replicate templates. Every event is architected from your unique brief, prioritizing guest flow, pacing, and genuine emotional resonance.',
  },
  {
    number: '02',
    title: 'Distinctive Design',
    description:
      'Aesthetic intentionality in every frame. Custom floral compositions, atmospheric lighting schemes, and bespoke spatial curation tailored for Jharkhand’s finest venues.',
  },
  {
    number: '03',
    title: 'Seamless Execution',
    description:
      'Calm on-ground command. Our production directors oversee timelines, artist management, and technical coordination with unflinching rigor.',
  },
  {
    number: '04',
    title: 'Personal Attention',
    description:
      'Direct partner accountability. You work with dedicated decision-makers who take full personal ownership of your occasion from inception to wrap-up.',
  },
];

export default function WhyNextLevel() {
  return (
    <section
      id="difference"
      className="bg-[#0B0B0B] py-28 lg:py-40 relative overflow-hidden border-t border-white/[0.06]"
      aria-labelledby="difference-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Large Statement slow-down typography */}
        <div className="mb-24 lg:mb-32 max-w-4xl">
          <span className="label-eyebrow text-gold tracking-[0.25em] mb-6 block reveal">
            THE NEXT LEVEL DIFFERENCE
          </span>
          <h2
            id="difference-heading"
            className="heading-hero text-light leading-[0.92] tracking-tight reveal reveal-delay-1"
          >
            DETAILS MAKE<br />
            <span className="italic font-light text-warm">THE EXPERIENCE.</span>
          </h2>
        </div>

        {/* 4 Clean Editorial Principles with Large Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pt-8 border-t border-white/[0.08]">
          {principles.map((principle, i) => (
            <div
              key={principle.number}
              className={`reveal flex flex-col justify-between reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div>
                <span className="counter-num text-xs text-gold/70 block mb-6">
                  {principle.number} // PRINCIPLE
                </span>
                <h3
                  className="font-display text-light text-2xl font-light tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {principle.title}
                </h3>
                <span className="w-8 h-px bg-gold/50 mb-5 block" />
                <p className="text-sm text-silver/75 leading-relaxed font-body">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
