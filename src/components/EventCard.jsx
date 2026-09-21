import { Link } from 'react-router-dom';
import { getImage } from '../data/images';

export default function EventCard({ event }) {
  const image = event.imageId ? getImage(event.imageId) : null;
  return (
    <Link to={event.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
      <div className="aspect-[4/5] overflow-hidden bg-neutral">
        {image ? (
          <img
            src={image.url}
            alt={image.altText}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal p-6 text-center">
            <span className="font-display text-2xl text-ivory">{event.label}</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal group-hover:text-gold transition-colors">{event.label}</h3>
      <p className="mt-1 text-sm text-charcoal/70">{event.teaser}</p>
    </Link>
  );
}
