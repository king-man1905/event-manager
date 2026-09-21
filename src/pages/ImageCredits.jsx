import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import manifest from '../assets/manifest.json';
import { usePageMeta } from '../hooks/usePageMeta';
import Breadcrumb from '../components/Breadcrumb';

function formatCategory(key) {
  if (key.startsWith('hero-')) return 'Sitewide & Brand';
  if (key.startsWith('vertical-')) return 'Event Verticals';
  if (key.startsWith('wedding-cultural-')) return 'Weddings: Cultural Traditions';
  if (key.startsWith('wedding-function-')) return 'Weddings: Functions & Rituals';
  if (key.startsWith('wedding-exp-')) return 'Weddings: Curated Experiences';
  if (key.startsWith('wedding-decor-')) return 'Weddings: Mandap & Décor';
  if (key.startsWith('corp-')) return 'Corporate Events';
  if (key.startsWith('social-')) return 'Social Celebrations';
  if (key.startsWith('kids-')) return 'Kids & Family';
  if (key.startsWith('ent-')) return 'Live Entertainment';
  if (key.startsWith('decor-')) return 'Décor & Styling';
  if (key.startsWith('cultural-')) return 'Special & Cultural';
  if (key.startsWith('dest-')) return 'Destination Events';
  return 'General Celebrations';
}

function formatLabel(key) {
  return key
    .replace(/^(hero|vertical|wedding-cultural|wedding-function|wedding-exp|wedding-decor|corp|social|kids|ent|decor|cultural|dest)-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function ImageCredits() {
  usePageMeta({
    title: 'Image Credits & Licenses | Next Level Events',
    description:
      'Attribution, creator credits, and licensing disclosures for Creative Commons and illustrative photography used on Next Level Events.',
  });

  const [filterLicense, setFilterLicense] = useState('ALL');

  const credits = useMemo(() => {
    return Object.entries(manifest).map(([key, data]) => ({
      key,
      label: formatLabel(key),
      category: formatCategory(key),
      source: data.source,
      license: data.license,
      altText: data.altText,
      note: data.note || null,
      status: data.status || null,
    }));
  }, []);

  const licenses = useMemo(() => {
    const set = new Set(credits.map((c) => c.license));
    return ['ALL', ...Array.from(set).sort()];
  }, [credits]);

  const filteredCredits = useMemo(() => {
    if (filterLicense === 'ALL') return credits;
    return credits.filter((c) => c.license === filterLicense);
  }, [credits, filterLicense]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map();
    filteredCredits.forEach((item) => {
      if (!map.has(item.category)) {
        map.set(item.category, []);
      }
      map.get(item.category).push(item);
    });
    return Array.from(map.entries());
  }, [filteredCredits]);

  return (
    <div className="min-h-screen bg-sand text-charcoal">
      {/* Header Banner */}
      <div className="border-b border-charcoal/10 bg-charcoal px-6 py-14 text-ivory md:px-16">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Image Credits & Licenses' },
            ]}
          />
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Attribution & Licensing Disclosures
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            Image Credits & Licenses
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-ivory/80 leading-relaxed">
            Next Level Events respects copyright and intellectual property. Mood board visuals, cultural
            traditions, and illustrative event concepts across this platform utilize Creative Commons and
            licensed works. Complete creator attributions and original source citations are cataloged below.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 md:px-16">
        {/* Policy Summary Box */}
        <div className="mb-10 rounded-xl border border-charcoal/15 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl text-charcoal">Creative Commons & Open Media Policy</h2>
          <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
            All Creative Commons images (CC BY, CC BY-SA 2.0, 3.0, 4.0) are credited with their creator names,
            original titles, source archives, and exact license types in compliance with CC attribution
            requirements. To respect privacy and intellectual property, client and proprietary event photography
            is not distributed under these licenses.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
              Filter by license:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {licenses.map((lic) => (
                <button
                  key={lic}
                  type="button"
                  onClick={() => setFilterLicense(lic)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    filterLicense === lic
                      ? 'bg-charcoal text-ivory'
                      : 'border border-charcoal/20 bg-sand hover:bg-charcoal/10 text-charcoal'
                  }`}
                >
                  {lic === 'ALL' ? `All (${credits.length})` : lic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grouped Attribution Listings */}
        <div className="space-y-12">
          {grouped.map(([category, items]) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-charcoal/15 pb-2">
                <h3 className="font-display text-2xl text-charcoal">{category}</h3>
                <span className="rounded bg-charcoal/10 px-2 py-0.5 text-xs font-semibold text-charcoal/70">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item) => (
                  <article
                    key={item.key}
                    className="flex flex-col justify-between rounded-lg border border-charcoal/10 bg-white p-4 shadow-sm hover:border-gold/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-sans text-sm font-semibold text-charcoal">{item.label}</h4>
                        <span className="inline-block shrink-0 rounded bg-gold/15 px-2 py-0.5 font-mono text-[11px] font-medium text-charcoal">
                          {item.license}
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-medium text-charcoal/90">
                        <span className="text-charcoal/50">Source: </span>
                        {item.source}
                      </p>
                      {item.altText && (
                        <p className="mt-2 text-xs text-charcoal/70 italic leading-normal">
                          &ldquo;{item.altText}&rdquo;
                        </p>
                      )}
                      {item.note && (
                        <p className="mt-2 text-[11px] text-charcoal/60 leading-normal border-l-2 border-gold/40 pl-2">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 pt-2 border-t border-charcoal/5 text-[11px] text-charcoal/40 font-mono">
                      Asset ID: {item.key}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-block bg-charcoal px-6 py-2.5 font-sans text-xs uppercase tracking-widest font-semibold text-ivory hover:bg-gold hover:text-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
