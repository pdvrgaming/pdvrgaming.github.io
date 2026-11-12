import React, { useEffect } from 'react';
import { X, Clock, Users, Shield, Check, ArrowRight } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceDetailModalProps {
  experience: Experience | null;
  onClose: () => void;
  onBook: (experience: Experience) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  onClose,
  onBook
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && experience) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0C121E] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-8">
        {/* Visual Hero */}
        <div className="relative h-64 sm:h-72 bg-slate-900">
          <img
            src={experience.image}
            alt={experience.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C121E] via-[#0C121E]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/60 backdrop-blur-sm rounded-full transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1 uppercase tracking-wider">
              <span>{experience.category}</span>
              <span aria-hidden="true">·</span>
              <span>{experience.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{experience.ageGroup}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Highlights & What You Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              What You Experience
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {experience.whatYouExperience.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border border-slate-800/80 rounded-xl text-center">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Session Length</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">{experience.duration}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Suitability</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">{experience.ageGroup}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Capacity</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">{experience.playerCount}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Price</span>
              <span className="text-sm font-semibold text-blue-400 mt-0.5 block tabular-nums">{experience.price}</span>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Commercial-grade equipment & on-site technician assistance provided.</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBook(experience);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Book This Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
