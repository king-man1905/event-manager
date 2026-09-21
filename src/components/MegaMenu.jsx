import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MegaMenu({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {items.map((item, index) => {
        const hasColumns = Array.isArray(item.columns) && item.columns.length > 0;
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasColumns && setOpenIndex(index)}
            onMouseLeave={() => hasColumns && setOpenIndex(null)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpenIndex(null);
            }}
          >
            {hasColumns ? (
              <button
                type="button"
                className="font-sans text-sm uppercase tracking-wide text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                aria-expanded={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.label}
              </button>
            ) : (
              <Link
                to={item.href}
                className="font-sans text-sm uppercase tracking-wide text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                {item.label}
              </Link>
            )}
            {hasColumns && openIndex === index && (
              <div className="absolute left-0 top-full z-20 min-w-[20rem] gap-6 bg-ivory p-8 shadow-xl">
                {item.columns.map((column) => (
                  <div key={column.heading}>
                    <p className="text-xs uppercase tracking-widest text-charcoal/50">
                      {column.heading}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            onClick={() => setOpenIndex(null)}
                            className="text-charcoal hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
