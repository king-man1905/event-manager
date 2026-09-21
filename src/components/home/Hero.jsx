import { getImage } from '../../data/images';
import WhatsAppCTA from '../WhatsAppCTA';

export default function Hero() {
  const image = getImage('hero-home');
  return (
    <section className="relative flex h-[90vh] min-h-[560px] items-end overflow-hidden bg-charcoal">
      <img
        src={image.url}
        alt={image.altText}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-ivory md:px-16">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Ranchi, Jharkhand</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl md:text-7xl leading-tight">
          Every celebration, planned like it's the only one that matters.
        </h1>
        <p className="mt-6 max-w-xl text-ivory/80">
          Next Level Events plans and produces weddings, birthdays, corporate events and
          celebrations of every kind, end to end, across Ranchi and Jharkhand.
        </p>
        <WhatsAppCTA
          message="Hi, I'd like to know more about planning my event with Next Level Events."
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
        >
          Plan Your Event
        </WhatsAppCTA>
      </div>
    </section>
  );
}
