import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';

export default function EventCategoryStub() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">We couldn't find that event type</h1>
        <p className="mt-4 text-charcoal/70">Let's find the right celebration for you instead.</p>
        <Link to="/" className="mt-6 inline-block text-gold underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const image = getImage(event.imageId);
  const others = events.filter((item) => item.slug !== event.slug);

  return (
    <div>
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-12 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Next Level Events</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{event.label}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg text-charcoal/80">{event.teaser}</p>
        <p className="mt-6 text-charcoal/70">
          Our full {event.label.toLowerCase()} experience — the specific rituals, décor and planning
          we handle — is being added to the site in the next phase. In the meantime, tell us what
          you're planning and our team will respond directly.
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
