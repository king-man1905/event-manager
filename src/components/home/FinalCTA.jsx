import WhatsAppCTA from '../WhatsAppCTA';

export default function FinalCTA() {
  return (
    <section className="bg-charcoal px-6 py-24 text-center text-ivory">
      <h2 className="mx-auto max-w-2xl font-display text-4xl md:text-5xl">
        Let's plan something worth remembering.
      </h2>
      <WhatsAppCTA
        message="Hi, I'd like to start planning my event with Next Level Events."
        className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
      >
        Start Planning on WhatsApp
      </WhatsAppCTA>
    </section>
  );
}
