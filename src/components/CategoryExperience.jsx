import { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import CategoryDetailPanel from './CategoryDetailPanel';

// One reusable dedicated-experience overlay for every "OUR EVENTS" category
// (including Weddings). Not a standalone homepage section — this is what
// opens when a category card is clicked: hero intro -> subcategory grid ->
// individual subcategory detail, all inside one modal.
export default function CategoryExperience({ category, subItems, groups, onClose, onViewWork }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeGroup, setActiveGroup] = useState(0);

  // `groups` (e.g. Weddings: Cultural Weddings + Wedding Rituals) takes
  // precedence over a flat `subItems` list, which the other 6 categories
  // still pass as before.
  const activeItems = groups ? groups[activeGroup].items : subItems;

  // Attached to window, not onKeyDown on the dialog: navigating from the
  // subcategory detail back to the grid unmounts the focused element,
  // which would silently break a div-scoped onKeyDown listener.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${category.name} details`}
    >
      <div
        className="absolute inset-0 bg-[#0B0B0B]/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl bg-[#111111] border border-white/10 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
        {selectedItem ? (
          <CategoryDetailPanel
            image={selectedItem.image}
            imageAlt={`${selectedItem.name} — Next Level Events`}
            eyebrow={selectedItem.tagline}
            title={selectedItem.name}
            description={selectedItem.description}
            tags={selectedItem.tags}
            ctaLabel="Plan This Experience"
            waMessage={`Hi Next Level Events, I'd like to plan a ${selectedItem.name} (${category.name}) event.`}
            backAction={{ label: `Back to ${category.name}`, onClick: () => setSelectedItem(null) }}
          />
        ) : (
          <div className="p-8 lg:p-14">
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block">
              {category.number} · {category.name.toUpperCase()}
            </span>
            <h3
              className="font-display text-light text-3xl lg:text-5xl font-light leading-[0.98] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {category.heroLine1}<br />
              <span className="italic font-light text-warm">{category.heroLine2}</span>
            </h3>
            <p className="body-lead text-silver/85 max-w-2xl mb-8">
              {category.intro}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {category.portfolioCategory && (
                <button
                  onClick={() => onViewWork?.(category.portfolioCategory)}
                  className="btn-outline justify-center text-[0.7rem] py-3 px-6"
                >
                  <span>View Related Work</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
              <a
                href={`https://wa.me/917903133317?text=${encodeURIComponent(`Hi Next Level Events, I'd like to plan a ${category.name} event.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center text-[0.7rem] py-3.5 px-6"
              >
                <span>{category.ctaLabel}</span>
                <ArrowUpRight size={14} className="text-obsidian" />
              </a>
            </div>

            {groups ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6" role="group" aria-label="Wedding experience sections">
                {groups.map((group, i) => (
                  <button
                    key={group.label}
                    onClick={() => setActiveGroup(i)}
                    className={`px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] font-medium text-center whitespace-nowrap transition-all duration-300 ${
                      activeGroup === i
                        ? 'text-light border-b border-gold bg-white/[0.03]'
                        : 'text-silver/60 border-b border-transparent hover:text-light'
                    }`}
                    aria-pressed={activeGroup === i}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold/80 block mb-4">
                {category.subcategoryLabel}
              </span>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
              {activeItems.map((item, i) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden cursor-pointer aspect-[3/4] transition-all duration-300"
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.name}`}
                  style={{ transitionDelay: `${(i % 5) * 30}ms` }}
                >
                  <img
                    src={item.image}
                    alt={`${item.name} — Next Level Events`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] filter brightness-[0.88]"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-display text-light text-lg font-light tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.name}
                    </h4>
                    <p className="text-[0.6rem] uppercase tracking-[0.15em] text-gold/90">{item.tagline}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B0B0B]/80 border border-white/10 text-warm hover:text-gold hover:border-gold flex items-center justify-center transition-colors duration-300 z-30"
          aria-label="Close details"
          autoFocus
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
