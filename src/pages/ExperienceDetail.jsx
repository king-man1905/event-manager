import { useParams, Link } from 'react-router-dom';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import Breadcrumb from '../components/Breadcrumb';

const LAYERS = {
  cultural: {
    label: 'Cultural Weddings',
    data: culturalWeddings,
    message: (item) => `Hi, I'm interested in a ${item.label} wedding in Ranchi.`,
  },
  functions: {
    label: 'Wedding Functions & Rituals',
    data: weddingFunctions,
    message: (item) => `Hi, I'm interested in ${item.label} for my wedding in Ranchi.`,
  },
  experiences: {
    label: 'Wedding Experiences',
    data: weddingExperiences,
    message: (item) => `Hi, I'm interested in ${item.label} for my wedding in Ranchi.`,
  },
  decor: {
    label: 'Wedding Décor',
    data: weddingDecor,
    message: (item) => `Hi, I'm interested in ${item.label} décor for my wedding in Ranchi.`,
  },
};

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-charcoal">We couldn't find that experience</h1>
      <p className="mt-4 text-charcoal/70">Let's find the right part of the wedding experience for you instead.</p>
      <Link to="/events/weddings" className="mt-6 inline-block text-gold underline">
        Back to Weddings
      </Link>
    </div>
  );
}

export default function ExperienceDetail() {
  const { layer, slug } = useParams();
  const layerConfig = LAYERS[layer];
  const item = layerConfig?.data.find((entry) => entry.slug === slug);

  if (!layerConfig || !item) {
    return <NotFound />;
  }

  const image = item.imageId ? getImage(item.imageId) : null;
  const others = layerConfig.data.filter((entry) => entry.slug !== item.slug).slice(0, 3);
  const gallerySiblingImages = item.depth === 'full'
    ? layerConfig.data
        .filter((entry) => entry.slug !== item.slug && entry.imageId)
        .slice(0, 2)
        .map((entry) => getImage(entry.imageId))
    : [];

  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Weddings', href: '/events/weddings' },
            { label: layerConfig.label, href: `/events/weddings#${layer}` },
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
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{layerConfig.label}</p>
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
            {gallerySiblingImages.length > 0 && (
              <div data-testid="gallery" className="mt-10 grid grid-cols-2 gap-4">
                {gallerySiblingImages.map((galleryImage) => (
                  <img
                    key={galleryImage.url}
                    src={galleryImage.url}
                    alt={galleryImage.altText}
                    loading="lazy"
                    className="aspect-square w-full rounded object-cover"
                  />
                ))}
              </div>
            )}
          </>
        )}
        <WhatsAppCTA
          message={layerConfig.message(item)}
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
