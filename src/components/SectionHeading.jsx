export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-charcoal/70">{description}</p>}
    </div>
  );
}
