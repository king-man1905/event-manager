import { Link } from 'react-router-dom';
import { locationsData, JHARKHAND_DISTRICTS } from '../data/locationsData';
import { PHONE_TEL, EMAIL } from '../data/contact';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Locations() {
  usePageMeta(
    'Event Locations & Service Areas | Next Level Events Ranchi',
    'Based in Ranchi, serving events across Jharkhand. Discover Next Level Events primary studio and outstation destination event capabilities.'
  );

  const { primary, jharkhandServiceArea, outsideJharkhand } = locationsData;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanner',
    name: 'Next Level Events',
    address: {
      '@type': 'PostalAddress',
      streetAddress: "Kanke Road, Beside Chef's Chaupati, Jhigra Toli, Gandhi Nagar",
      addressLocality: 'Ranchi',
      addressRegion: 'Jharkhand',
      postalCode: '834002',
      addressCountry: 'IN',
    },
    telephone: primary.phone,
    email: primary.email,
  };

  return (
    <div className="bg-ivory text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-charcoal py-20 px-6 text-center text-ivory">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">
            Presence & Service Area
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl text-ivory">
            Based in Ranchi, serving events across Jharkhand.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ivory/75 max-w-2xl mx-auto">
            Headquartered on Kanke Road, Ranchi — with full on-site production teams managing celebrations across Jharkhand districts, plus outstation and destination events available on enquiry.
          </p>
        </div>
      </section>

      {/* Primary Studio: Ranchi */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="border border-charcoal/15 bg-neutral/30 p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
            <div>
              <span className="inline-block bg-gold/15 px-3 py-1 text-xs uppercase tracking-widest font-semibold text-gold">
                Primary Studio & Headquarters
              </span>
              <h2 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
                {primary.city}, {primary.state}
              </h2>
            </div>
            <Link
              to="/enquire?location=ranchi"
              className="bg-gold px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90 transition-colors"
            >
              Plan a Ranchi Event
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="font-display text-lg font-semibold text-charcoal">{primary.title}</p>
              <p className="text-sm text-charcoal/70">{primary.tagline}</p>
              <div className="pt-2">
                <p className="text-xs uppercase tracking-wider text-charcoal/50 font-semibold">Base Address</p>
                <p className="mt-1 text-sm text-charcoal">{primary.address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal/50 font-semibold">Contact</p>
                <p className="mt-1 text-sm text-charcoal">
                  <a href={PHONE_TEL} className="hover:text-gold">{primary.phone}</a> •{' '}
                  <a href={`mailto:${EMAIL}`} className="hover:text-gold">{primary.email}</a>
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={primary.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold underline hover:text-gold/80"
                >
                  View on Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="bg-ivory border border-charcoal/10 p-6 space-y-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-charcoal/60">
                Core Production Base
              </p>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                {primary.coverageNote}
              </p>
              <ul className="text-xs text-charcoal/80 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span> Direct warehouse and fabrication access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span> Established local vendor coordination
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span> In-person planning and site walk-throughs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area: Across Jharkhand */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-charcoal/10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-charcoal/10 px-3 py-1 text-xs uppercase tracking-widest font-semibold text-charcoal">
                Active Service Area
              </span>
              <h2 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
                {jharkhandServiceArea.title}
              </h2>
            </div>
            <Link
              to="/enquire?location=jharkhand"
              className="border border-gold bg-ivory px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold transition-colors"
            >
              Enquire for Your District
            </Link>
          </div>

          <p className="text-sm text-charcoal/80 max-w-3xl leading-relaxed">
            {jharkhandServiceArea.description}
          </p>

          <p className="text-xs text-charcoal/60 italic">
            {jharkhandServiceArea.notice}
          </p>

          {/* District Grid */}
          <div className="pt-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-charcoal/50 mb-3">
              Districts Served Across Jharkhand
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {JHARKHAND_DISTRICTS.map((district) => (
                <div
                  key={district}
                  className="border border-charcoal/10 bg-neutral/20 p-2.5 text-center text-xs font-medium text-charcoal"
                >
                  {district}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outside Jharkhand — Outstation & Destination Section */}
      <section className="bg-charcoal text-ivory py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-6">
            <div>
              <span className="inline-block bg-gold/20 px-3 py-1 text-xs uppercase tracking-widest font-semibold text-gold">
                Beyond Jharkhand
              </span>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                {outsideJharkhand.title}
              </h2>
            </div>
            <Link
              to="/enquire?location=outside-jharkhand"
              className="bg-gold px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90 transition-colors"
            >
              Enquire for Outside Jharkhand
            </Link>
          </div>

          <p className="mt-6 text-sm text-ivory/80 max-w-2xl">
            {outsideJharkhand.description}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {outsideJharkhand.howItWorks.map((item) => (
              <div key={item.step} className="border border-ivory/15 bg-charcoal/40 p-6 space-y-3">
                <p className="font-display text-base font-semibold text-gold">{item.step}</p>
                <p className="text-xs text-ivory/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Truthful FAQ Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-gold">
            Transparency & Clarity
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-charcoal">
            Frequently Asked Questions About Locations
          </h2>
        </div>

        <div className="space-y-6 pt-4">
          <div className="border border-charcoal/10 p-6 bg-neutral/20">
            <h3 className="font-display text-lg font-semibold text-charcoal">
              Do you have permanent offices in other districts?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              No. Our primary studio and warehouse are located on Kanke Road in Ranchi. For celebrations in other Jharkhand districts and destination venues, our Ranchi production crew travels to manage and produce the event on-site.
            </p>
          </div>

          <div className="border border-charcoal/10 p-6 bg-neutral/20">
            <h3 className="font-display text-lg font-semibold text-charcoal">
              How are logistics and setup handled for events outside Ranchi?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We design the layout, florals, and staging in Ranchi, conduct a preliminary venue recce, and deploy our on-site production managers well ahead of the event.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
