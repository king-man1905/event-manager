import { Link } from 'react-router-dom';
import { getImage } from '../data/images';

export default function EventCard({ event }) {
  const image = getImage(event.imageId);
  return (
    <Link to={event.href} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-neutral">
        <img
          src={image.url}
          alt={image.altText}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal">{event.label}</h3>
      <p className="mt-1 text-sm text-charcoal/70">{event.teaser}</p>
    </Link>
  );
}
