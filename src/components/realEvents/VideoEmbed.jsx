import { useState } from 'react';

export default function VideoEmbed({ videoId, label }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isLoaded) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded bg-charcoal">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={label}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      aria-label={`Play ${label}`}
      className="group relative aspect-video w-full overflow-hidden rounded bg-charcoal"
    >
      <img
        src={thumbnailUrl}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 px-3 py-2 text-left text-sm text-ivory">
        {label}
      </span>
    </button>
  );
}
