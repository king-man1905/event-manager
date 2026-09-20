import SectionHeading from '../SectionHeading';

const steps = [
  { step: '01', title: 'Consult', description: 'Tell us the occasion, date and city — on a call or over WhatsApp.' },
  { step: '02', title: 'Design', description: 'We propose a décor and planning approach specific to your event.' },
  { step: '03', title: 'Coordinate', description: 'Venue, vendors, catering and entertainment, managed as one plan.' },
  { step: '04', title: 'Execute', description: 'Our team runs the day itself, start to finish.' },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="How we work" title="From first message to the last dance." />
      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <div key={item.step}>
            <p className="font-display text-4xl text-gold">{item.step}</p>
            <h3 className="mt-2 font-display text-xl text-charcoal">{item.title}</h3>
            <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
