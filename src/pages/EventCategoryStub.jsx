import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';

export default function EventCategoryStub() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">404 — Page Not Found</p>
        <h1 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">We couldn't find that celebration</h1>
        <p className="mt-4 text-sm text-charcoal/70 max-w-md mx-auto">
          The link you followed may be incorrect, or the celebration page may have moved. Let's find the right experience for you instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-gold px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/real-events"
            className="border border-charcoal/20 bg-ivory px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:border-gold transition-colors"
          >
            See Real Events
          </Link>
          <Link
            to="/enquire"
            className="border border-gold bg-ivory px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold transition-colors"
          >
            Plan Your Event
          </Link>
        </div>
      </div>
    );
  }

  const image = getImage(event.imageId);
  const others = events.filter((item) => item.slug !== event.slug);

  return (
    <div>
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={image.url}
          alt={image.altText}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-12 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Next Level Events</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{event.label}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg text-charcoal/80">{event.teaser}</p>
        <p className="mt-6 text-charcoal/70">
          From bespoke styling and floral arrangements to complete vendor coordination and full-day
          management, tell us what you're planning and our Ranchi team will create a tailored proposal
          for your celebration.
        </p>
        <WhatsAppCTA
          message={`Hi, I'm interested in planning ${event.label.toLowerCase()} with Next Level Events.`}
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
        <div className="mt-16">
          <p className="text-sm uppercase tracking-widest text-charcoal/50">Related experiences</p>
          <ul className="mt-4 flex flex-wrap gap-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link to={item.href} className="text-charcoal underline hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
