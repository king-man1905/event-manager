import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { projects, categories } from '../data/projects';

export default function Portfolio({ focusRequest } = {}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewer, setViewer] = useState(null); // { project, imageIndex }
  const [seenFocusRequest, setSeenFocusRequest] = useState(focusRequest);

  // Adjust state during render when a new focusRequest prop arrives, per
  // React's guidance for syncing state to a prop change without an extra
  // effect-triggered render.
  if (focusRequest && focusRequest !== seenFocusRequest) {
    setSeenFocusRequest(focusRequest);
    setActiveCategory(focusRequest.category);
  }

  useEffect(() => {
    if (!focusRequest) return;
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [focusRequest]);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const openViewer = useCallback((project, imageIndex = 0) => {
    setViewer({ project, imageIndex });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      <section
        id="work"
        className="bg-[#0B0B0B] section-py relative overflow-hidden"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-16 lg:mb-20">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block reveal">
              SELECTED PORTFOLIO
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2
                id="portfolio-heading"
                className="heading-xl text-light leading-[0.96] tracking-tight reveal reveal-delay-1"
              >
                MOMENTS OF<br />
                <span className="italic font-light text-warm">DISTINCTION.</span>
              </h2>

              {/* Category Filter — Subtle Editorial Tabs */}
              <div
                className="flex flex-wrap items-center gap-2 reveal reveal-delay-2"
                role="group"
                aria-label="Filter portfolio by category"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'text-light border-b border-gold bg-white/[0.03]'
                        : 'text-silver/60 border-b border-transparent hover:text-light'
                    }`}
                    aria-pressed={activeCategory === cat.id}
                    aria-label={`Show ${cat.label}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Magazine Editorial Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {filtered.map((project, i) => {
              // Asymmetric magazine grid mapping
              // Item 0: Huge Feature (8 cols, tall)
              // Item 1: Smaller secondary (4 cols)
              // Item 2: Smaller secondary (4 cols)
              // Item 3: Tall Vertical Portrait (5 cols)
              // Item 4: Wide Landscape (7 cols)
              // Item 5: Balanced Feature (12 or 6 cols)
              let colClasses = 'lg:col-span-4 min-h-[340px] lg:min-h-[380px]';
              if (activeCategory === 'all') {
                if (i === 0) colClasses = 'md:col-span-2 lg:col-span-8 min-h-[460px] lg:min-h-[560px]';
                else if (i === 1) colClasses = 'lg:col-span-4 min-h-[340px] lg:min-h-[270px]';
                else if (i === 2) colClasses = 'lg:col-span-4 min-h-[340px] lg:min-h-[270px]';
                else if (i === 3) colClasses = 'md:col-span-1 lg:col-span-5 min-h-[420px] lg:min-h-[500px]';
                else if (i === 4) colClasses = 'md:col-span-1 lg:col-span-7 min-h-[420px] lg:min-h-[500px]';
                else if (i === 5) colClasses = 'md:col-span-2 lg:col-span-12 min-h-[380px] lg:min-h-[460px]';
              } else {
                colClasses = i === 0 ? 'md:col-span-2 lg:col-span-8 min-h-[480px]' : 'lg:col-span-4 min-h-[360px]';
              }

              const formattedNum = `0${i + 1}`.slice(-2);

              return (
                <article
                  key={project.id}
                  className={`reveal group relative overflow-hidden cursor-pointer ${colClasses} transition-all duration-500`}
                  onClick={() => openViewer(project, 0)}
                  onKeyDown={(e) => e.key === 'Enter' && openViewer(project, 0)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View project: ${project.title} — ${project.type}`}
                  style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                >
                  {/* Photography with 1.03 scale hover */}
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.type} by Next Level Events`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] filter brightness-[0.92] contrast-[1.02]"
                    loading="lazy"
                    width={1000}
                    height={700}
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent transition-opacity duration-400" />

                  {/* Subtle Dark Hover Tint */}
                  <div className="absolute inset-0 bg-[#0B0B0B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Minimal Top-Right Index / Arrow */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <span className="counter-num text-xs text-gold/80 group-hover:text-gold transition-colors duration-300">
                      {formattedNum}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#0B0B0B]/60 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:rotate-45">
                      <ArrowUpRight size={13} className="text-light group-hover:text-obsidian transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Minimal Bottom Editorial Overlay Typography */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-4 h-px bg-gold" />
                      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold font-medium">
                        {project.type.toUpperCase()} · {project.location.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      className="font-display text-light text-2xl lg:text-3xl font-light tracking-tight group-hover:text-warm transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title.toUpperCase()}
                    </h3>

                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-warm font-medium">
                        VIEW PROJECT
                      </span>
                      <span className="text-gold text-xs">→</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Editorial Footer Note & Instagram Link */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.08] reveal">
            <p className="text-xs text-silver/60 font-body">
              Representative portfolio direction · Real private client archives available upon consultation.
            </p>
            <a
              href="https://www.instagram.com/nextlevelevents.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-warm/90 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              aria-label="View verified Instagram feed"
            >
              <span>Explore @nextlevelevents.in</span>
              <ArrowUpRight size={14} className="text-gold" />
            </a>
          </div>
        </div>
      </section>

      {/* Project Viewer Modal */}
      {viewer && (
        <ProjectViewer
          project={viewer.project}
          initialIndex={viewer.imageIndex}
          onClose={closeViewer}
        />
      )}
    </>
  );
}

function ProjectViewer({ project, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const images = project.images || [project.image];

  const imageCount = images.length;
  const prev = () => setCurrentIndex((i) => (i - 1 + imageCount) % imageCount);
  const next = () => setCurrentIndex((i) => (i + 1) % imageCount);

  // Keyboard navigation — attached to window (not onKeyDown on the dialog)
  // so it keeps working even if DOM focus is lost, e.g. after clicking a
  // control that unmounts itself.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i - 1 + imageCount) % imageCount);
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % imageCount);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, imageCount]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing project: ${project.title}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B0B0B]/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-6xl bg-[#111111] border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[92vh]">
        {/* Image Display */}
        <div className="relative flex-1 min-h-[300px] lg:min-h-[540px] bg-black flex items-center justify-center overflow-hidden">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${project.title} — slide ${currentIndex + 1} of ${images.length}`}
            className="w-full h-full object-cover max-h-[75vh]"
          />

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0B0B]/70 border border-white/10 flex items-center justify-center text-light hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0B0B]/70 border border-white/10 flex items-center justify-center text-light hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    className={`h-1 transition-all duration-300 ${
                      i === currentIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:w-80 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#141414]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-px bg-gold" />
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold font-medium">
                {project.type}
              </span>
            </div>
            <h3
              className="font-display text-light text-2xl font-light tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-silver/80 leading-relaxed font-body mb-6">
              {project.description}
            </p>
            <div className="py-3 border-y border-white/10 flex items-center justify-between text-xs">
              <span className="text-silver/60 uppercase tracking-widest">Location</span>
              <span className="text-warm font-medium">{project.location}</span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={`https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%20saw%20${encodeURIComponent(project.title)}%20and%20would%20like%20to%20plan%20a%20similar%20event.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-[0.65rem] py-3.5"
              aria-label="Enquire about this project"
            >
              <span>Enquire About Similar</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B0B0B]/80 border border-white/10 text-warm hover:text-gold hover:border-gold flex items-center justify-center transition-colors duration-300 z-30"
          aria-label="Close project viewer"
          autoFocus
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
