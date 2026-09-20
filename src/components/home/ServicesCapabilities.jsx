import SectionHeading from '../SectionHeading';

const capabilities = [
  {
    title: 'Venue Coordination',
    description: 'We work with your chosen venue (or help you pick one) and manage every logistic around it.',
  },
  {
    title: 'Décor & Styling',
    description: 'Mandap, stage, floral and lighting design, styled specifically for your event, not a stock template.',
  },
  {
    title: 'Photography & Films',
    description: 'Candid, traditional and cinematic coverage coordinated as part of the same day, not a separate booking.',
  },
  {
    title: 'Entertainment & Artists',
    description: 'Dhol, DJs, anchors and performers, briefed and scheduled around your actual run-of-show.',
  },
  {
    title: 'Catering Coordination',
    description: 'We coordinate menus, staffing and service timing with your caterer of choice.',
  },
  {
    title: 'Full-Day Execution',
    description: "A dedicated on-site team runs the event itself, so you're a guest at your own celebration.",
  },
];

export default function ServicesCapabilities() {
  return (
    <section id="services" className="bg-neutral px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="What we handle" title="We plan the event, not just the décor." />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-2 text-charcoal/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
