import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Box, Users, Maximize, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EventPackage } from '../types';

interface EventsPageProps {
  onOpenBooking: (itemTitle?: string, type?: 'experience' | 'event' | 'custom') => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenBooking }) => {
  const { events } = useData();
  const [selectedEvent, setSelectedEvent] = useState<EventPackage>(events[0] || null);

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Mobile Deployments & On-Site Entertainment
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          BRING THE VR ARENA TO YOUR VENUE
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          PDVR delivers fully staffed virtual reality arenas, motion simulator cockpits, and crowd-ready entertainment straight to your school auditorium, gated community clubhouse, or corporate campus.
        </p>
      </div>

      {/* Main Event Showcase Grid */}
      <div className="space-y-12">
        {events.filter(e => e.active).map((eventPkg, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={eventPkg.id}
              className="border border-slate-800 rounded-3xl overflow-hidden bg-[#0C121E] shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Visual */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full bg-slate-900 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={eventPkg.image}
                    alt={eventPkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover min-h-[280px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C121E] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Information */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-10 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase font-bold text-blue-400 tracking-wider block mb-1">
                      {eventPkg.targetAudience}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {eventPkg.title}
                    </h2>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      {eventPkg.description}
                    </p>
                  </div>

                  {/* Operational Logistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Included Setups
                      </span>
                      <span className="font-medium text-white block mt-0.5">
                        {eventPkg.setupsIncluded}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Space Required
                      </span>
                      <span className="font-medium text-white block mt-0.5">
                        {eventPkg.spaceRequired}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Typical Duration
                      </span>
                      <span className="font-medium text-white block mt-0.5">
                        {eventPkg.idealDuration}
                      </span>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Package Inclusions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {eventPkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400">Customized turnkey setup tailored to your venue & audience</span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(eventPkg.title, 'event')}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Request Event Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Readiness & Technical Logistics Checklist */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#090E17] border border-slate-800 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
            Zero Friction Setup
          </span>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            WHAT WE REQUIRE FROM YOUR VENUE
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            We handle 95% of the logistics. Here is all you need to supply:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
              01
            </div>
            <h4 className="text-sm font-bold text-white">Clean Level Floor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tiles, wooden floor, or clean carpet. We bring interlocking foam perimeter safety tiles.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
              02
            </div>
            <h4 className="text-sm font-bold text-white">Standard Power Socket</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard 5A / 15A wall plug within 15 meters. We bring heavy-duty surge extension hubs.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
              03
            </div>
            <h4 className="text-sm font-bold text-white">Covered Shelter</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct sunlight damages optical sensors. Indoor halls or covered gazebo canopies are ideal.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
              04
            </div>
            <h4 className="text-sm font-bold text-white">Zero Extra Tech</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No Wi-Fi or high-speed internet needed. All commercial games run on local high-performance hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
