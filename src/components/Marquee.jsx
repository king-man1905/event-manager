const items = [
  'WEDDINGS',
  'CELEBRATIONS',
  'CORPORATE EVENTS',
  'DÉCOR',
  'CATERING',
  'EXPERIENCES',
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-5 bg-[#0B0B0B] border-y border-white/[0.06] select-none"
      aria-hidden="true"
    >
      <div className="marquee-track flex gap-12 lg:gap-16 whitespace-nowrap">
        {/* Quadruple for smooth infinite scrolling */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 lg:gap-16 flex-shrink-0">
            <span className="font-display text-warm/45 hover:text-warm/80 transition-colors duration-300 text-lg lg:text-xl font-light tracking-[0.25em]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
