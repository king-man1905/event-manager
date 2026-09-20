import { useParams, Link } from 'react-router-dom';
import { corporateEvents } from '../data/corporateEvents';
import { socialCelebrations } from '../data/socialCelebrations';
import { kidsFamily } from '../data/kidsFamily';
import { liveEntertainment } from '../data/liveEntertainment';
import { decorDesign } from '../data/decorDesign';
import { specialCultural } from '../data/specialCultural';
import { destinationEvents } from '../data/destinationEvents';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import Breadcrumb from '../components/Breadcrumb';

const VERTICALS = {
  'corporate-events': {
    label: 'Corporate Events',
    data: corporateEvents,
    message: (item) => `Hi, I'm interested in ${item.label} for my corporate event in Ranchi.`,
  },
  'social-celebrations': {
    label: 'Social Celebrations',
    data: socialCelebrations,
    message: (item) => `Hi, I'm interested in ${item.label} for my celebration in Ranchi.`,
  },
  'kids-family': {
    label: 'Kids & Family',
    data: kidsFamily,
    message: (item) => `Hi, I'm interested in ${item.label} for my family event in Ranchi.`,
  },
  'live-entertainment': {
    label: 'Live & Entertainment',
    data: liveEntertainment,
    message: (item) => `Hi, I'd like to book ${item.label} for my event in Ranchi.`,
  },
  'decor-design': {
    label: 'Décor & Design',
    data: decorDesign,
    message: (item) => `Hi, I'd like to discuss ${item.label} for my event in Ranchi.`,
  },
  'special-cultural': {
    label: 'Special & Cultural',
    data: specialCultural,
    message: (item) => `Hi, I'd like to plan ${item.label} in Ranchi.`,
  },
  'destination-events': {
    label: 'Destination Events',
    data: destinationEvents,
    message: (item) => `Hi, I'd like to talk about ${item.label} for my event.`,
  },
};

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-charcoal">We couldn't find that experience</h1>
      <p className="mt-4 text-charcoal/70">Let's find the right celebration for you instead.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function VerticalExperienceDetail() {
  const { vertical, slug } = useParams();
  const verticalConfig = VERTICALS[vertical];
  const item = verticalConfig?.data.find((entry) => entry.slug === slug);

  if (!verticalConfig || !item) {
    return <NotFound />;
  }

  const image = item.imageId ? getImage(item.imageId) : null;
  const others = verticalConfig.data.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  function pickRotated(list, offset, count) {
    if (list.length === 0) return [];
    return Array.from({ length: Math.min(count, list.length) }, (_, i) => list[(offset + i) % list.length]);
  }

  const allWithImage = verticalConfig.data.filter((entry) => entry.imageId);
  const siblingsWithImage = allWithImage.filter((entry) => entry.slug !== item.slug);
  const myIndex = Math.max(0, allWithImage.findIndex((entry) => entry.slug === item.slug));
  const rotatedSiblings = pickRotated(siblingsWithImage, myIndex, 2);
  const galleryEntries = item.depth === 'full'
    ? [
        ...(item.imageId ? [{ slug: item.slug, image }] : []),
        ...rotatedSiblings.map((entry) => ({ slug: entry.slug, image: getImage(entry.imageId) })),
      ]
    : [];

  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: verticalConfig.label, href: `/events/${vertical}` },
            { label: item.label },
          ]}
        />
      </div>
      <div data-testid="hero" className="relative mt-6 h-[50vh] min-h-[360px] w-full overflow-hidden">
        {image ? (
          <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal">
            <span className="font-display text-4xl text-ivory">{item.label}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-10 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{verticalConfig.label}</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{item.label}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg text-charcoal/80">{item.teaser}</p>
        {item.depth === 'full' && (
          <>
            <p className="mt-6 text-charcoal/70">{item.description}</p>
            <div className="mt-10">
              <p className="text-sm uppercase tracking-widest text-charcoal/50">What we handle</p>
              <ul className="mt-4 space-y-2">
                {item.whatWeHandle.map((line) => (
                  <li key={line} className="text-charcoal/80">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            {galleryEntries.length > 0 && (
              <>
                <p className="mt-10 text-sm uppercase tracking-widest text-charcoal/50">
                  More from {verticalConfig.label}
                </p>
                <div data-testid="gallery" className="mt-4 grid grid-cols-2 gap-4">
                  {galleryEntries.map(({ slug, image: galleryImage }) => (
                    <img
                      key={slug}
                      src={galleryImage.url}
                      alt={galleryImage.altText}
                      loading="lazy"
                      className="aspect-square w-full rounded object-cover"
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        <WhatsAppCTA
          message={verticalConfig.message(item)}
          className="mt-10 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
        <div className="mt-16">
          <p className="text-sm uppercase tracking-widest text-charcoal/50">Related experiences</p>
          <div className="mt-6">
            <EditorialGrid columns={3}>
              {others.map((other) => (
                <EventCard key={other.slug} event={other} />
              ))}
            </EditorialGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
