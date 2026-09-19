import { ArrowUpRight } from 'lucide-react';

// Shared image + text + tags + CTA content block, used inside a modal shell
// by both CategoryDetail (the 6 non-wedding categories) and WeddingExperience
// (the wedding style drill-down), so the two overlays stay visually identical
// without duplicating this layout.
export default function CategoryDetailPanel({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  tags,
  ctaLabel,
  waMessage,
  portfolioCategory,
  onViewWork,
  backAction,
}) {
  const waText = encodeURIComponent(waMessage);

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="relative lg:w-1/2 min-h-[280px] lg:min-h-[520px] bg-black flex-shrink-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
          width={1000}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
      </div>

      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        {backAction && (
          <button
            onClick={backAction.onClick}
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-warm transition-colors duration-300 mb-6 self-start"
          >
            ← {backAction.label}
          </button>
        )}

        <span className="label-eyebrow text-gold tracking-[0.25em] mb-4 block">
          {eyebrow}
        </span>

        <h3
          className="font-display text-light text-3xl lg:text-4xl font-light tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title.toUpperCase()}
        </h3>

        <p className="text-sm text-silver/85 leading-relaxed font-body mb-6">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-8" role="list">
            {tags.map((tag) => (
              <li
                key={tag}
                className="text-[0.65rem] uppercase tracking-[0.18em] text-warm/80 border border-white/15 px-3 py-1.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-3 mt-auto">
          {portfolioCategory && (
            <button
              onClick={() => onViewWork?.(portfolioCategory)}
              className="btn-outline justify-center text-[0.7rem] py-3"
            >
              <span>View Work In This Category</span>
              <ArrowUpRight size={14} />
            </button>
          )}
          <a
            href={`https://wa.me/917903133317?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center text-[0.7rem] py-3.5"
            aria-label={`Enquire about ${title} on WhatsApp`}
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight size={14} className="text-obsidian" />
          </a>
        </div>
      </div>
    </div>
  );
}
