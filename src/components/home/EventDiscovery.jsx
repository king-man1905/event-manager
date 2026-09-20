import SectionHeading from '../SectionHeading';
import EditorialGrid from '../EditorialGrid';
import EventCard from '../EventCard';
import { events } from '../../data/events';

export default function EventDiscovery() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="What we plan"
        title="Every kind of celebration, one team."
        description="Explore by occasion to see what we handle, how it's styled, and what's included."
      />
      <div className="mt-12">
        <EditorialGrid columns={4}>
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </EditorialGrid>
      </div>
    </section>
  );
}
