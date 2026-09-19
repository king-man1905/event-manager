import { ArrowUpRight } from 'lucide-react';

export default function Instagram() {
  const posts = [
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
      alt: 'Luxury wedding stage by Next Level Events',
    },
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80',
      alt: 'Bespoke floral architecture in Ranchi',
    },
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80',
      alt: 'Concert and live stage production in Jharkhand',
    },
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      alt: 'Milestone celebration styling in Ranchi',
    },
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      alt: 'Executive corporate summit management',
    },
    {
      url: 'https://www.instagram.com/nextlevelevents.in',
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      alt: 'Luxury banquet catering coordination',
    },
  ];

  return (
    <section
      className="bg-[#0B0B0B] section-py relative overflow-hidden border-t border-white/[0.06]"
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <span className="label-eyebrow text-gold tracking-[0.25em] mb-3 block reveal">
              LIVE ARCHIVE
            </span>
            <h2
              id="instagram-heading"
              className="heading-lg text-light tracking-tight reveal reveal-delay-1"
            >
              @NEXTLEVELEVENTS.IN
            </h2>
          </div>
          <a
            href="https://www.instagram.com/nextlevelevents.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-[0.65rem] flex items-center gap-2 reveal reveal-delay-2"
            aria-label="Follow Next Level Events on Instagram"
          >
            <span>Follow Our Stories</span>
            <ArrowUpRight size={13} className="text-gold" />
          </a>
        </div>

        {/* 6-Column Minimal Editorial Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3 reveal reveal-delay-2">
          {posts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-square overflow-hidden bg-[#141414] border border-white/5"
              aria-label={`View post on Instagram: ${post.alt}`}
            >
              <img
                src={post.img}
                alt={post.alt}
                className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ArrowUpRight size={20} className="text-gold" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
