import React from 'react';
import { Calendar, MessageSquare, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  const { settings } = useData();

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0E17]/95 backdrop-blur-xl border-t border-slate-800 px-3 pt-2.5 flex items-center justify-between gap-2 shadow-2xl"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={onOpenBooking}
        className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all"
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span>Book Session</span>
      </button>

      <a
        href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi PDVR GAMING, I want to book an experience or ask about an event.')}`}
        target="_blank"
        rel="noreferrer"
        className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>WhatsApp</span>
      </a>

      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-200 flex items-center justify-center active:scale-[0.98] transition-all"
        aria-label="Call PDVR"
      >
        <Phone className="w-4 h-4 shrink-0" />
      </a>
    </div>
  );
};
