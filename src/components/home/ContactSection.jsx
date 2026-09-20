import SectionHeading from '../SectionHeading';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, MAP_URL } from '../../data/contact';
import WhatsAppCTA from '../WhatsAppCTA';

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Get in touch" title="Tell us about your event." align="center" />
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <a href={PHONE_TEL} className="text-lg text-charcoal">
          {PHONE_DISPLAY}
        </a>
        <a href={`mailto:${EMAIL}`} className="text-lg text-charcoal">
          {EMAIL}
        </a>
        <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-charcoal/70">
          {ADDRESS}
        </a>
        <WhatsAppCTA
          message="Hi, I'd like to know more about planning my event with Next Level Events."
          className="mt-4 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Message Us on WhatsApp
        </WhatsAppCTA>
      </div>
    </section>
  );
}
