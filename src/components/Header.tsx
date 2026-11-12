import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import pdvrLogo from '@/src/assets/images/pdvr_logo.png';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenBooking: (itemTitle?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenBooking }) => {
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Experiences', route: 'experiences' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Events & Setups', route: 'events' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'About', route: 'about' }
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#090D15]/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={pdvrLogo}
              alt="PDVR Gaming Logo"
              className="w-8 h-8 rounded-full object-cover border border-blue-500/40 shadow-sm"
            />
            <span className="font-display font-extrabold text-xl tracking-wider text-white group-hover:text-blue-400 transition-colors">
              PDVR<span className="text-blue-500 font-bold ml-1">GAMING</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                  isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Control Panel shortcut */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('c-panel')}
            className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-md transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            title="Open PDVR Content Management Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>C-Panel</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D15]"
          >
            Book Experience
          </button>
        </div>

        {/* Mobile Hamburger Toggle & CTA */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 active:bg-blue-700 rounded-lg whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 text-slate-300 hover:text-white active:bg-slate-800 rounded-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#090D15]/98 backdrop-blur-2xl z-50 md:hidden flex flex-col justify-between px-6 py-6 border-t border-slate-800 overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Explore PDVR
            </span>
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left text-base py-3 px-3 rounded-lg font-medium transition-colors min-h-[44px] flex items-center ${
                    isActive ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-600/30' : 'text-slate-200 hover:text-white active:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-slate-800/80">
              <button
                onClick={() => handleNavClick('c-panel')}
                className="w-full text-left text-xs text-slate-400 hover:text-white py-3 px-3 rounded-lg flex items-center gap-2.5 bg-slate-900/60 border border-slate-800/60"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>PDVR Control Panel (Operational Admin)</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full min-h-[48px] py-3 text-center text-sm font-semibold text-white bg-blue-600 active:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              Book / Enquire Now
            </button>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full min-h-[44px] py-2.5 text-center text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Call Us: {settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
