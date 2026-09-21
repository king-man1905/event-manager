import SectionHeading from '../components/SectionHeading';
import WhatsAppCTA from '../components/WhatsAppCTA';
import VideoEmbed from '../components/realEvents/VideoEmbed';
import { usePageMeta } from '../hooks/usePageMeta';
import { socialContent } from '../data/socialContent';
import { behindTheEventCategories } from '../data/behindTheEvent';
import { SOCIALS } from '../data/contact';

export default function RealEventsHub() {
  usePageMeta({
    title: 'Real Events — Next Level Events',
    description:
      'Real videos and a real look at the planning behind Next Level Events celebrations in Ranchi — verified work only, no fabricated reviews.',
  });

  const heroVideoId = 'H7EhkKuHGWU'; // real, verified Wedding Décor Reel — used as this page's hero frame
  const heroImage = {
    url: `https://i.ytimg.com/vi/${heroVideoId}/maxresdefault.jpg`,
    altText: 'A still frame from a real Next Level Events wedding décor video',
  };

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={heroImage.url}
          alt={heroImage.altText}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-10 text-ivory md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Real events, real moments</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Real work, as it happens.</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading
          eyebrow="On video"
          title="Real videos from real celebrations."
          description="Straight from our own YouTube channel — click any video to play it."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {socialContent.map((item) => (
            <VideoEmbed key={item.id} videoId={item.videoId} label={item.label} />
          ))}
        </div>
      </div>

      <div id="behind-the-event" className="mx-auto max-w-5xl px-6 py-16 scroll-mt-36">
        <SectionHeading
          eyebrow="Behind the event"
          title="The planning you don't see on the day."
          description="Real categories from our own Instagram — see the moments themselves there."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {behindTheEventCategories.map((category) => (
            <a
              key={category.id}
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between bg-charcoal p-6 text-ivory"
            >
              <div>
                <p className="font-display text-2xl">{category.label}</p>
                <p className="mt-3 text-sm text-ivory/70">{category.description}</p>
              </div>
              <span className="mt-6 text-sm uppercase tracking-widest text-gold">
                See {category.label} on Instagram
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <SectionHeading
          eyebrow="Follow the real work"
          title="More from us on Instagram, YouTube and Facebook."
          align="center"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-widest text-gold">
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
        <p className="mt-10 text-charcoal/60">
          More real events are coming to this page as verified work is added.
        </p>
        <WhatsAppCTA
          message="Hi, I saw your Real Events page and would like to know more."
          className="mt-8 inline-block bg-gold px-8 py-3 font-sans text-sm uppercase tracking-wide text-charcoal"
        >
          Enquire on WhatsApp
        </WhatsAppCTA>
      </div>
    </div>
  );
}
