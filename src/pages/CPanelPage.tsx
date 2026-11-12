import React, { useState } from 'react';
import {
  LayoutDashboard,
  Gamepad2,
  Tag,
  DollarSign,
  CalendarCheck2,
  Image as ImageIcon,
  Sparkles,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Menu,
  Download,
  RotateCcw,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Experience, PricingPlan, EventPackage, GalleryItem, Offer, BookingEnquiry } from '../types';

interface CPanelPageProps {
  onBackToSite: () => void;
}

type TabType =
  | 'dashboard'
  | 'experiences'
  | 'pricing'
  | 'events'
  | 'gallery'
  | 'offers'
  | 'enquiries'
  | 'settings';

export const CPanelPage: React.FC<CPanelPageProps> = ({ onBackToSite }) => {
  const {
    experiences,
    categories,
    pricing,
    events,
    gallery,
    offers,
    settings,
    enquiries,
    addExperience,
    updateExperience,
    deleteExperience,
    addPricing,
    updatePricing,
    deletePricing,
    addEvent,
    updateEvent,
    deleteEvent,
    addGalleryItem,
    deleteGalleryItem,
    addOffer,
    updateOffer,
    deleteOffer,
    updateSettings,
    updateEnquiryStatus,
    deleteEnquiry,
    resetToDefaults,
    exportJSON
  } = useData();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // State for adding a new experience
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [newExp, setNewExp] = useState({
    title: '',
    slug: '',
    category: 'kids' as const,
    tagline: '',
    description: '',
    whatYouExperience: ['Immersion mode', 'Safety zone mat'],
    duration: '15 Mins',
    ageGroup: 'Ages 4+',
    playerCount: '1 - 2 Players',
    price: '₹299',
    image: experiences[0]?.image || '',
    featured: false,
    active: true,
    highlight: 'New Experience'
  });

  // State for adding a new pricing plan
  const [isAddingPrice, setIsAddingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState({
    title: '',
    category: 'individual' as const,
    duration: '15 Minutes',
    price: '₹349',
    period: 'session',
    description: '',
    features: ['1 VR Session', 'Dedicated VR headset', 'Operator brief'],
    recommendedFor: 'Casual visitors',
    isPopular: false,
    active: true
  });

  // State for adding a gallery item
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'setups' as const,
    image: gallery[0]?.image || '',
    caption: '',
    date: 'March 2026'
  });

  // State for adding an offer
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    badge: 'Special Promo',
    discount: '15% OFF',
    code: 'PDVRNEW',
    validUntil: 'End of Month',
    active: true
  });

  // State for Site Settings form
  const [siteForm, setSiteForm] = useState(settings);

  const handleCopyJSON = () => {
    const jsonStr = exportJSON();
    navigator.clipboard.writeText(jsonStr);
    setCopiedStatus(true);
    showNotify('JSON exported to clipboard for static GitHub Pages sync!');
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const handleDownloadJSON = () => {
    const jsonStr = exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdvr_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotify('Exported pdvr_data.json successfully.');
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-200 flex flex-col md:flex-row">
      {/* Mobile C-Panel Header & Horizontal Quick Tabs */}
      <div className="md:hidden sticky top-0 z-30 bg-[#0E121B] border-b border-slate-800">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[40px] min-w-[40px] p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                PDVR CONTROL
              </span>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="min-h-[38px] px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
        </div>

        {/* Quick horizontal tab bar on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-3 pb-2.5 scrollbar-none overscroll-x-contain">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>Enquiries</span>
            {enquiries.filter((e) => e.status === 'new').length > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-white rounded text-[10px] font-bold">
                {enquiries.filter((e) => e.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'experiences'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Experiences ({experiences.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'pricing'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Pricing ({pricing.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Events ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Gallery ({gallery.length})
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'offers'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Offers ({offers.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`min-h-[34px] px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Mobile dropdown drawer for operations & full navigation */}
        {mobileMenuOpen && (
          <div className="p-4 bg-[#0B0F17] border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab('enquiries');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Enquiries ({enquiries.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('experiences');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Experiences ({experiences.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('pricing');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Pricing ({pricing.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('events');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Events ({events.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Gallery ({gallery.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('offers');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Offers ({offers.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-300"
              >
                Settings
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={handleDownloadJSON}
                className="flex-1 min-h-[40px] py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Reset all catalog and settings to initial defaults?')) {
                    resetToDefaults();
                    showNotify('Data reset to defaults.');
                  }
                }}
                className="min-h-[40px] px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 text-xs flex items-center gap-1"
                title="Reset to Initial Store Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* C-Panel Desktop Sidebar: Clean, Operational, No Neon */}
      <aside className="hidden md:flex w-64 bg-[#0E121B] border-r border-slate-800 flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 block">
                  PDVR CONTROL
                </span>
                <span className="text-[10px] text-slate-500 block">Static Data CMS</span>
              </div>
            </div>

            <button
              onClick={onBackToSite}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'enquiries'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Enquiries Inbox</span>
              </div>
              {enquiries.filter((e) => e.status === 'new').length > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded text-[10px] font-bold">
                  {enquiries.filter((e) => e.status === 'new').length}
                </span>
              )}
            </button>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Content Catalog
            </div>

            <button
              onClick={() => setActiveTab('experiences')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'experiences'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Gamepad2 className="w-4 h-4 shrink-0" />
              <span>Experiences ({experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'pricing'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <DollarSign className="w-4 h-4 shrink-0" />
              <span>Pricing & Passes ({pricing.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'events'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CalendarCheck2 className="w-4 h-4 shrink-0" />
              <span>Event Setups ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'gallery'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Gallery Items ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'offers'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Tag className="w-4 h-4 shrink-0" />
              <span>Offers & Deals ({offers.length})</span>
            </button>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              System
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'settings'
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Business Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions: Export & Reset */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <button
            onClick={onBackToSite}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="flex-1 py-1.5 px-2 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1"
              title="Download full JSON dataset"
            >
              <Download className="w-3 h-3" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset all catalog and settings to initial defaults?')) {
                  resetToDefaults();
                  showNotify('Data reset to defaults.');
                }
              }}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-red-800 hover:text-red-400 text-slate-400 transition-colors"
              title="Reset to Initial Store Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* C-Panel Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl">
        {notification && (
          <div className="mb-6 p-3 rounded-xl bg-blue-950/60 border border-blue-800 text-blue-300 text-xs flex items-center justify-between">
            <span>{notification}</span>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                CONTROL PANEL OVERVIEW
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational status, active catalog counts, and recent booking leads.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Status</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Experiences</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">
                  {experiences.filter((e) => e.active).length} Active
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Pricing Plans</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">
                  {pricing.length} Tiers
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Events</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">
                  {events.length} Packages
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Photos</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">
                  {gallery.length} Images
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800">
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Enquiries</span>
                <span className="text-lg font-bold text-blue-400 tabular-nums mt-1 block">
                  {enquiries.length} Total
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5 rounded-xl bg-[#0E131E] border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Quick Content Actions
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveTab('experiences');
                    setIsAddingExp(true);
                  }}
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Experience</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('pricing');
                    setIsAddingPrice(true);
                  }}
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Pricing Tier</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('offers');
                    setIsAddingOffer(true);
                  }}
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Offer</span>
                </button>
                <button
                  onClick={handleCopyJSON}
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy JSON to Clipboard</span>
                </button>
              </div>
            </div>

            {/* Recent Enquiries Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Recent Inbound Enquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View All Enquiries
                </button>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0C111A]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                      <tr>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Type / Item</th>
                        <th className="p-3">Date / Slot</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-800/30">
                          <td className="p-3 font-medium text-white">{enq.name}</td>
                          <td className="p-3">{enq.experienceOrEventId || enq.serviceType}</td>
                          <td className="p-3">
                            {enq.date} · {enq.timeSlot}
                          </td>
                          <td className="p-3">{enq.phone}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                enq.status === 'confirmed'
                                  ? 'bg-emerald-950 text-emerald-400'
                                  : enq.status === 'contacted'
                                  ? 'bg-amber-950 text-amber-400'
                                  : 'bg-blue-950 text-blue-400'
                              }`}
                            >
                              {enq.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPERIENCES MANAGER */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                  MANAGE VR EXPERIENCES
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Activate, edit details, adjust session pricing, or create new catalog items.
                </p>
              </div>
              <button
                onClick={() => setIsAddingExp(!isAddingExp)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                {isAddingExp ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isAddingExp ? 'Cancel' : 'Add Experience'}</span>
              </button>
            </div>

            {/* Add Experience Form */}
            {isAddingExp && (
              <div className="p-5 rounded-xl bg-[#0D121D] border border-blue-800/60 space-y-4">
                <h3 className="text-sm font-bold text-white">Create New Catalog Title</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={newExp.title}
                      onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                      placeholder="e.g. Flight Wing: Combat Strike"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={newExp.category}
                      onChange={(e) => setNewExp({ ...newExp, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="kids">Kids (Ages 4-7)</option>
                      <option value="children">Children (Ages 8-12)</option>
                      <option value="adults">Adults</option>
                      <option value="school">School Packages</option>
                      <option value="events">Event Packages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newExp.duration}
                      onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Price</label>
                    <input
                      type="text"
                      value={newExp.price}
                      onChange={(e) => setNewExp({ ...newExp, price: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={newExp.tagline}
                      onChange={(e) => setNewExp({ ...newExp, tagline: e.target.value })}
                      placeholder="Brief one-line hook"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Full Description</label>
                    <textarea
                      rows={2}
                      value={newExp.description}
                      onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingExp(false)}
                    className="px-4 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newExp.title) return;
                      addExperience({
                        ...newExp,
                        slug: newExp.title.toLowerCase().replace(/\s+/g, '-')
                      });
                      setIsAddingExp(false);
                      showNotify('Experience added to catalog!');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
                  >
                    Save Experience
                  </button>
                </div>
              </div>
            )}

            {/* List of Experiences */}
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl bg-[#0D121E] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                        <span className="uppercase font-semibold text-blue-400">{exp.category}</span>
                        <span>·</span>
                        <span>{exp.duration}</span>
                        <span>·</span>
                        <span className="font-semibold text-white">{exp.price}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{exp.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{exp.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        updateExperience({ ...exp, active: !exp.active });
                        showNotify(`Toggled ${exp.title} active state.`);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        exp.active
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {exp.active ? 'Active' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => {
                        updateExperience({ ...exp, featured: !exp.featured });
                        showNotify(`Updated featured status for ${exp.title}.`);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        exp.featured
                          ? 'bg-blue-950/80 text-blue-400 border border-blue-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {exp.featured ? 'Featured' : 'Standard'}
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${exp.title}?`)) {
                          deleteExperience(exp.id);
                          showNotify('Experience deleted.');
                        }
                      }}
                      className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING MANAGER */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                  PRICING & PASS PACKAGES
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Control single passes, squad packages, and event rates displayed to customers.
                </p>
              </div>
              <button
                onClick={() => setIsAddingPrice(!isAddingPrice)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                {isAddingPrice ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isAddingPrice ? 'Cancel' : 'Add Price Plan'}</span>
              </button>
            </div>

            {/* List of pricing plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricing.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-xl bg-[#0D121E] border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-bold text-blue-400">
                        {plan.category}
                      </span>
                      <button
                        onClick={() => {
                          updatePricing({ ...plan, isPopular: !plan.isPopular });
                          showNotify(`Updated popular flag for ${plan.title}`);
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          plan.isPopular
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {plan.isPopular ? 'Featured Badge' : 'Standard'}
                      </button>
                    </div>

                    <h3 className="font-bold text-white text-base">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-2xl font-bold text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400">/{plan.duration}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{plan.recommendedFor}</span>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete plan ${plan.title}?`)) {
                          deletePricing(plan.id);
                          showNotify('Pricing plan removed.');
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS MANAGER */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                EVENT DEPLOYMENT PACKAGES
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Customize School, Apartment Carnival, Corporate, and Birthday party setups.
              </p>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-xl bg-[#0D121E] border border-slate-800 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-blue-400 block mb-1">
                        {evt.targetAudience}
                      </span>
                      <h3 className="font-bold text-lg text-white">{evt.title}</h3>
                    </div>
                    <span className="text-sm font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                      {evt.priceStartingAt}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3 bg-slate-900/60 rounded-lg text-slate-400">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Setups:</span>
                      <span className="text-slate-200">{evt.setupsIncluded}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Space:</span>
                      <span className="text-slate-200">{evt.spaceRequired}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Duration:</span>
                      <span className="text-slate-200">{evt.idealDuration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                  GALLERY MANAGEMENT
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Add photos, update captions, and organize field documentation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#0D121E] border border-slate-800 space-y-2"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-400 block">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{item.caption}</p>
                    </div>
                    <button
                      onClick={() => {
                        deleteGalleryItem(item.id);
                        showNotify('Gallery item deleted.');
                      }}
                      className="p-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OFFERS MANAGER */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                  PROMOTIONAL OFFERS
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Active promotions automatically render on the website. Deactivating hides the section.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-5 rounded-xl bg-[#0D121E] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-400">{offer.badge}</span>
                      <span className="text-xs text-slate-500">· Code: {offer.code}</span>
                    </div>
                    <h3 className="font-bold text-base text-white">{offer.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{offer.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        updateOffer({ ...offer, active: !offer.active });
                        showNotify(`Toggled offer active: ${!offer.active}`);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        offer.active
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {offer.active ? 'Published' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => {
                        deleteOffer(offer.id);
                        showNotify('Offer deleted.');
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: ENQUIRIES INBOX */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                CUSTOMER ENQUIRIES & BOOKINGS
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Leads submitted through the public booking modal or WhatsApp requests.
              </p>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 rounded-xl bg-[#0D121E] border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-sm font-bold text-white">{enq.name}</span>
                      <span className="text-xs text-slate-400 ml-2">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={(e) => {
                          updateEnquiryStatus(enq.id, e.target.value as any);
                          showNotify(`Enquiry status changed to ${e.target.value}`);
                        }}
                        className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete this enquiry record?')) {
                            deleteEnquiry(enq.id);
                            showNotify('Enquiry deleted.');
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Service:</span>
                      <span className="font-semibold text-white">
                        {enq.experienceOrEventId || enq.serviceType}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Preferred Date / Slot:</span>
                      <span>
                        {enq.date} ({enq.timeSlot})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Players / Group:</span>
                      <span>{enq.playerCount} Guests</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <a href={`tel:${enq.phone}`} className="hover:text-white">
                        {enq.phone}
                      </a>
                    </span>
                    {enq.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        <a href={`mailto:${enq.email}`} className="hover:text-white">
                          {enq.email}
                        </a>
                      </span>
                    )}
                  </div>

                  {enq.locationDetails && (
                    <p className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-500 font-medium mr-1">Venue:</span>
                      {enq.locationDetails}
                    </p>
                  )}

                  {enq.notes && (
                    <p className="text-xs text-slate-400 italic">
                      Notes: "{enq.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                BUSINESS & CONTACT SETTINGS
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Updates appear globally across the website header, contact cards, and footer.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D121D] border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={siteForm.businessName}
                    onChange={(e) => setSiteForm({ ...siteForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={siteForm.email}
                    onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={siteForm.phone}
                    onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    value={siteForm.whatsapp}
                    onChange={(e) => setSiteForm({ ...siteForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={siteForm.openingHours}
                    onChange={(e) => setSiteForm({ ...siteForm, openingHours: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Location / Service Area</label>
                  <input
                    type="text"
                    value={siteForm.location}
                    onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    updateSettings(siteForm);
                    showNotify('Business settings saved successfully!');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
