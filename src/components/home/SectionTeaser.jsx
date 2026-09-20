import { Link } from 'react-router-dom';
import { getImage } from '../../data/images';

export default function SectionTeaser({ teaser }) {
  const image = getImage(teaser.imageId);
  const isExternal = teaser.href.startsWith('http');

  const cta = isExternal ? (
    <a
      href={teaser.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-block text-gold underline"
    >
      {teaser.ctaLabel}
    </a>
  ) : (
    <Link to={teaser.href} className="mt-6 inline-block text-gold underline">
      {teaser.ctaLabel}
    </Link>
  );

  return (
    <section className="grid grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-16">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image.url} alt={image.altText} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-gold">{teaser.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">{teaser.title}</h2>
        <p className="mt-4 text-charcoal/70">{teaser.description}</p>
        {cta}
      </div>
    </section>
  );
}
