import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import pdvrLogo from '@/src/assets/images/pdvr_logo.png';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const { settings } = useData();

  return (
    <footer className="bg-[#06090F] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={pdvrLogo}
                alt="PDVR Gaming Logo"
                className="w-8 h-8 rounded-full object-cover border border-blue-500/40 shadow-sm"
              />
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                PDVR<span className="text-blue-500 font-bold ml-1">GAMING</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              Commercial-grade virtual reality, flight & racing motion simulators, and mobile event entertainment setups. Bringing wonder and competition to schools, gated communities, and private celebrations.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={settings.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                <span>YouTube</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Experiences
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors text-left"
                >
                  VR Action & Adventure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors text-left"
                >
                  Motion Racing Cockpits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors text-left"
                >
                  Family & Co-Op Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors text-left"
                >
                  STEM & Educational VR
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Passes & Packages
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Events & Setups */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Events & On-Site
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors text-left"
                >
                  School STEM Workshops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors text-left"
                >
                  Apartment Carnivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tech Expos & Exhibitions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors text-left"
                >
                  Birthday Party Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-left font-medium"
                >
                  Request Event Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors break-all">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.openingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PDVR GAMING. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-slate-300 transition-colors"
            >
              About Brand
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="hover:text-slate-300 transition-colors"
            >
              Pricing Transparency
            </button>
            <button
              onClick={() => onNavigate('c-panel')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 text-slate-400"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>C-Panel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
