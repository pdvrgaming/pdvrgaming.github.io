import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Experience } from '../types';

interface ExperienceDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onOpenBooking: (itemTitle?: string, type?: 'experience' | 'event' | 'custom') => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking
}) => {
  const { experiences, settings } = useData();

  const experience = experiences.find((e) => e.slug === slug || e.id === slug) || experiences[0];

  // Related experiences from same or adjacent category
  const related = experiences
    .filter((e) => e.id !== experience.id && e.active)
    .slice(0, 3);

  const [activeTab, setActiveTab] = useState<'overview' | 'hardware' | 'suitability'>('overview');

  if (!experience) {
    return (
      <div className="pt-36 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white">Experience not found</h2>
        <button
          onClick={() => onNavigate('experiences')}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white text-xs font-semibold"
        >
          Back to Experiences
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-slate-100">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button
            onClick={() => onNavigate('experiences')}
            className="hover:text-white transition-colors"
          >
            Experiences
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-medium truncate">{experience.title}</span>
        </nav>
      </div>

      {/* Cinematic Media Showcase Hero */}
      <div className="relative w-full bg-[#080C14] border-y border-slate-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Anchor */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] shadow-2xl">
              <img
                src={experience.image}
                alt={experience.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {experience.highlight && (
                <div className="absolute top-4 left-4 text-xs font-semibold text-blue-300 bg-blue-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-blue-700/60">
                  {experience.highlight}
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  Calibrated for Meta Quest 3 & PCVR
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded font-mono">
                  120Hz Ultra-Low Latency
                </span>
              </div>
            </div>

            {/* Core Snapshot Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  <span>
                    {({
                      '360': '360° VR',
                      'gaming': 'Gaming & Action',
                      'educational': 'Educational',
                      'educational-package': 'Educational Package',
                      'events': 'Event Package'
                    } as Record<string, string>)[experience.category] || experience.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{experience.duration}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{experience.ageGroup}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {experience.title}
                </h1>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  {experience.tagline}
                </p>
              </div>

              {/* Pricing & Duration Matrix */}
              <div className="p-4 rounded-xl bg-[#0D131F] border border-slate-800 grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Session Fee</span>
                  <span className="text-lg font-bold text-blue-400 tabular-nums">{experience.price}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Duration</span>
                  <span className="text-lg font-bold text-white tabular-nums">{experience.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Capacity</span>
                  <span className="text-lg font-bold text-white tabular-nums">{experience.playerCount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenBooking(experience.title, 'experience')}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <span>Book This Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi PDVR GAMING, I want to book or ask about: ${experience.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#111726] hover:bg-[#162033] border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>

              {/* Operational notice */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Commercial-grade equipment & on-site coach included.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Details Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Detailed Description */}
            <div className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                About The Experience
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* What You Experience */}
            <div className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                What You Will Experience
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experience.whatYouExperience.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0D131F] border border-slate-800 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included & Safety Briefing */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B101A] border border-slate-800 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                Included in Your Session
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>High-definition commercial VR headset and motion controllers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Full headset calibration for IPD (interpupillary distance)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>On-site operator guidance throughout the entire play</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>High-density interlocking tactile safety perimeter mat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Suitability & Hardware Spec */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0D131F] border border-slate-800 space-y-4">
              <h3 className="font-display text-base font-bold text-white">
                Who It's For
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Target Age</span>
                  <span>{experience.ageGroup} (Gentle comfort options available)</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Experience Style</span>
                  <span>{experience.category.toUpperCase()} · Immersive Simulation</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Glasses Friendly</span>
                  <span>Yes, eyeglass spacers pre-installed on headsets</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Motion Comfort</span>
                  <span>High comfort rating; calibrated to prevent disorientation</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => onOpenBooking(experience.title, 'experience')}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Book Session ({experience.price})
                </button>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-6 rounded-2xl bg-[#090D15] border border-slate-800 space-y-3 text-xs text-slate-400">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
                Need Group / Party Booking?
              </span>
              <p className="leading-relaxed">
                We bring this experience with multiple stations directly to your birthday party, school fest, or apartment carnival.
              </p>
              <button
                onClick={() => onOpenBooking(experience.title, 'event')}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Request On-Site Event Setup</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Experiences Section */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-slate-800/80 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white">
                EXPLORE OTHER EXPERIENCES
              </h3>
              <button
                onClick={() => onNavigate('experiences')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Full Catalog
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    window.location.hash = `#/experiences/${rel.slug}`;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group p-4 rounded-xl bg-[#0D131F] border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors space-y-3"
                >
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span className="uppercase text-blue-400 font-semibold">{rel.category}</span>
                      <span>·</span>
                      <span>{rel.duration}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {rel.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
