import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-charcoal/60">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {!isLast && item.href ? (
              <Link to={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal">{item.label}</span>
            )}
            {!isLast && <span aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
