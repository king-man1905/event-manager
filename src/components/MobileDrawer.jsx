import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MobileDrawer({ items, isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 overflow-y-auto bg-ivory lg:hidden"
    >
      <div className="flex justify-end p-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-charcoal p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Close
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-6">
        {items.map((item, index) => {
          const hasColumns = Array.isArray(item.columns) && item.columns.length > 0;
          return (
            <div key={item.label} className="border-b border-charcoal/10 py-4">
              {hasColumns ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between font-display text-xl text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-expanded={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {item.label}
                  </button>
                  {openIndex === index && (
                    <ul className="mt-3 space-y-2 pl-4">
                      {item.columns
                        .flatMap((column) => column.links)
                        .map((link) => (
                          <li key={link.href}>
                            <Link to={link.href} onClick={onClose} className="text-charcoal/80 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.href} onClick={onClose} className="font-display text-xl text-charcoal hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
        <div className="pt-6 pb-8">
          <Link
            to="/enquire"
            onClick={onClose}
            className="flex w-full items-center justify-center bg-gold py-3 text-center font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
          >
            Plan Your Event
          </Link>
        </div>
      </nav>
    </div>
  );
}
