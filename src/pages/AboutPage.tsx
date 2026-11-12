import React from 'react';
import { Cpu, Users, HeartHandshake, Phone, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const { settings } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Narrative */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          The PDVR Philosophy
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          BUILT FOR MORE THAN GAMING.
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          PDVR GAMING was founded on a straightforward mission: eliminate the friction, technical complexity, and high hardware barriers of commercial virtual reality to bring transformative entertainment directly to communities.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-[#0C121E] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Commercial-Grade Hardware</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We reject underpowered mobile phone VR. We run high-resolution pancake optics, 90Hz+ refresh rates, and direct-drive racing cockpits with true physics feedback to ensure crystal-clear visual fidelity and eliminate motion discomfort.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0C121E] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Operator-Led Experience</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every PDVR station comes with an attentive, trained facilitator who guides first-timers, fits headsets properly, manages queues smoothly, and ensures safety boundaries are strictly respected at all times.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0C121E] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Turnkey Event Delivery</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We handle complete on-site logistics: equipment setup, calibration, perimeter safety mats, and live spectator displays so hosts can enjoy their celebrations without any operational hassle.
          </p>
        </div>
      </div>

      {/* Direct Contact Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0B101A] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">
            Partner With Us
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            WANT TO BRING PDVR TO YOUR SCHOOL OR COMMUNITY?
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{settings.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>{settings.phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
        >
          Book An Event Quote
        </button>
      </div>
    </div>
  );
};

