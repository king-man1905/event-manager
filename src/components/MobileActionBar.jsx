import { Phone, MessageCircle } from 'lucide-react';

export default function MobileActionBar() {
  const waUrl = 'https://wa.me/917903133317?text=Hi%20Next%20Level%20Events%2C%20I%27d%20like%20to%20discuss%20an%20event.';

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-lg border-t border-white/10 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      aria-label="Quick contact actions"
    >
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gold text-obsidian rounded-none text-[0.65rem] uppercase tracking-[0.2em] font-semibold transition-transform active:scale-[0.98]"
          aria-label="WhatsApp Next Level Events"
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+917903133317"
          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#181818] text-light border border-white/15 rounded-none text-[0.65rem] uppercase tracking-[0.2em] font-medium transition-transform active:scale-[0.98]"
          aria-label="Call Next Level Events"
        >
          <Phone size={14} className="text-gold" />
          <span>Call Us</span>
        </a>
      </div>
    </aside>
  );
}
