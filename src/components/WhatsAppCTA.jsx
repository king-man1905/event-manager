import { WHATSAPP_NUMBER } from '../data/contact';

export default function WhatsAppCTA({ message, children, className = '' }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
