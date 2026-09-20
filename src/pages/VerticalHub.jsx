import { useParams, Link } from 'react-router-dom';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import SectionHeading from '../components/SectionHeading';
import { corporateEvents } from '../data/corporateEvents';
import { socialCelebrations } from '../data/socialCelebrations';
import { kidsFamily } from '../data/kidsFamily';
import { liveEntertainment } from '../data/liveEntertainment';
import { decorDesign } from '../data/decorDesign';
import { specialCultural } from '../data/specialCultural';
import { destinationEvents } from '../data/destinationEvents';

const VERTICALS = {
  'corporate-events': {
    label: 'Corporate Events',
    heroImageId: 'vertical-corporate',
    tagline: 'Conferences, launches and annual functions, produced with the same precision as a wedding.',
    data: corporateEvents,
  },
  'social-celebrations': {
    label: 'Social Celebrations',
    heroImageId: 'vertical-social',
    tagline: 'Anniversaries, engagements and private parties, styled for the people actually in the room.',
    data: socialCelebrations,
  },
  'kids-family': {
    label: 'Kids & Family',
    heroImageId: 'vertical-kids-family',
    tagline: 'Birthdays, baby showers and Annaprashan — themed properly, not generically.',
    data: kidsFamily,
  },
  'live-entertainment': {
    label: 'Live & Entertainment',
    heroImageId: 'vertical-entertainment',
    tagline: 'Dhol, DJs, anchors and performers, booked and briefed as part of your actual event plan.',
    data: liveEntertainment,
  },
  'decor-design': {
    label: 'Décor & Design',
    heroImageId: 'vertical-decor',
    tagline: 'Mandap, stage, floral and lighting design, built specifically for your venue and colours.',
    data: decorDesign,
  },
  'special-cultural': {
    label: 'Special & Cultural',
    heroImageId: 'vertical-cultural',
    tagline: 'Diwali, Navratri, Holi and other cultural celebrations, styled with the right traditions.',
    data: specialCultural,
  },
  'destination-events': {
    label: 'Destination Events',
    heroImageId: 'vertical-destination',
    tagline: 'Outstation and destination celebrations, planned remotely and executed on-site.',
    data: destinationEvents,
  },
};

function NotFound() {
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

export default function VerticalHub() {
  const { slug } = useParams();
  const vertical = VERTICALS[slug];

  if (!vertical) {
    return <NotFound />;
  }

  const heroImage = getImage(vertical.heroImageId);

  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[460px] items-end overflow-hidden bg-charcoal">
        <img
          src={heroImage.url}
          alt={heroImage.altText}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Next Level Events</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">{vertical.label}</h1>
          <p className="mt-6 max-w-xl text-ivory/80">{vertical.tagline}</p>
          <WhatsAppCTA
            message={`Hi, I'm interested in planning ${vertical.label.toLowerCase()} with Next Level Events.`}
            className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
          >
            Enquire on WhatsApp
          </WhatsAppCTA>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="What we plan"
          title={`Every ${vertical.label} experience, one team.`}
          description="Explore by experience to see what we handle and what's included."
        />
        <div className="mt-10">
          <EditorialGrid columns={4}>
            {vertical.data.map((item) => (
              <EventCard key={item.slug} event={item} />
            ))}
          </EditorialGrid>
        </div>
      </section>
    </div>
  );
}
