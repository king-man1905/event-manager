import { Link } from 'react-router-dom';
import { getImage } from '../data/images';
import WhatsAppCTA from '../components/WhatsAppCTA';
import EventCard from '../components/EventCard';
import EditorialGrid from '../components/EditorialGrid';
import SectionHeading from '../components/SectionHeading';
import { culturalWeddings } from '../data/culturalWeddings';
import { weddingFunctions } from '../data/weddingFunctions';
import { weddingExperiences } from '../data/weddingExperiences';
import { weddingDecor } from '../data/weddingDecor';

const SUB_NAV = [
  { id: 'cultural', label: 'Cultural Weddings' },
  { id: 'functions', label: 'Functions & Rituals' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'decor', label: 'Décor' },
  { id: 'planning', label: 'Planning' },
  { id: 'real-weddings', label: 'Real Weddings' },
];

const PLANNING_CAPABILITIES = [
  {
    title: 'Venue Coordination',
    description: 'Venue sourcing and liaison, with logistics handled on the day.',
  },
  {
    title: 'Catering & Hospitality',
    description: 'Menu and caterer coordination, staffing and service timing — coordinated by us, executed by trusted partners.',
  },
  {
    title: 'Full-Day Execution',
    description: "A dedicated on-site team runs the day, start to finish, so you're a guest at your own wedding.",
  },
];

function LayerSection({ id, eyebrow, title, description, items }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10">
        <EditorialGrid columns={4}>
          {items.map((item) => (
            <EventCard key={item.slug} event={item} />
          ))}
        </EditorialGrid>
      </div>
    </section>
  );
}

export default function WeddingsHub() {
  const heroImage = getImage('vertical-weddings');

  return (
    <div>
      <section className="relative flex h-[80vh] min-h-[520px] items-end overflow-hidden bg-charcoal">
        <img src={heroImage.url} alt={heroImage.altText} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">The Flagship Experience</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Weddings, planned as one continuous story.
          </h1>
          <p className="mt-6 max-w-xl text-ivory/80">
            From the first Haldi morning to the last reception dance — every ritual, every culture, every detail,
            planned together.
          </p>
          <WhatsAppCTA
            message="Hi, I'd like to start planning my wedding with Next Level Events."
            className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
          >
            Plan Your Wedding
          </WhatsAppCTA>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 px-6 py-4">
          {SUB_NAV.map((section) => (
            <Link
              key={section.id}
              to={`/events/weddings#${section.id}`}
              className="text-sm uppercase tracking-wide text-charcoal/70 hover:text-gold"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </nav>

      <LayerSection
        id="cultural"
        eyebrow="By tradition"
        title="Cultural Weddings"
        description="Every wedding style planned with the specific rituals and pacing it actually calls for."
        items={culturalWeddings}
      />
      <LayerSection
        id="functions"
        eyebrow="By function"
        title="Wedding Functions & Rituals"
        description="From Haldi to Reception, each function planned as its own event, not a generic add-on."
        items={weddingFunctions}
      />
      <LayerSection
        id="experiences"
        eyebrow="By moment"
        title="Wedding Experiences"
        description="The specific moments — entries, entertainment, coverage — that make the day feel planned, not improvised."
        items={weddingExperiences}
      />
      <LayerSection
        id="decor"
        eyebrow="By visual"
        title="Wedding Décor"
        description="Mandap, stage, floral and lighting, styled as one cohesive look."
        items={weddingDecor}
      />

      <section id="planning" className="bg-neutral px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Wedding Planning" title="We plan the wedding, not just the décor." />
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {PLANNING_CAPABILITIES.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-charcoal/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="real-weddings" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <SectionHeading
          eyebrow="Real weddings"
          title="Coming soon, honestly."
          description="We're building a gallery of genuine Next Level Events wedding work as real projects are documented and cleared for sharing — no stock photography, no fabricated stories. Until then, see real, current work on Instagram."
          align="center"
        />
        <a
          href="https://www.instagram.com/nextlevelevents.in"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-gold underline"
        >
          See Real Work on Instagram
        </a>
      </section>
    </div>
  );
}
