import React, { useState } from 'react';
import { ArrowRight, Eye, ImageOff } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  onSelect: (experience: Experience) => void;
  onBook: (experience: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onSelect,
  onBook
}) => {
  const [imageError, setImageError] = useState(false);

  const categoryLabels: Record<string, string> = {
    '360': '360° VR',
    'gaming': 'Gaming & Action',
    'educational': 'Educational',
    'educational-package': 'Educational Package',
    'events': 'Event Package'
  };

  const categoryDisplay = categoryLabels[experience.category] || experience.category;

  return (
    <div className="group flex flex-col bg-[#0D131F] border border-slate-800 hover:border-slate-700 transition-colors duration-200 rounded-xl overflow-hidden shadow-sm">
      {/* Visual Carrier */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        {!imageError && experience.image ? (
          <img
            src={experience.image}
            alt={experience.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500 bg-gradient-to-br from-slate-900 to-slate-950">
            <ImageOff className="w-8 h-8 mb-2 stroke-1 text-slate-600" />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              PDVR Experience Studio
            </span>
          </div>
        )}

        {/* Subtle measured scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D131F] via-transparent to-transparent opacity-80" />

        {/* Highlight kicker top right if present */}
        {experience.highlight && (
          <div className="absolute top-3 right-3 text-xs font-semibold text-blue-300 bg-blue-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-blue-800/60">
            {experience.highlight}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Unboxed Zero-Pill Metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
          <span className="uppercase tracking-wider text-blue-400">{categoryDisplay}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{experience.duration}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{experience.ageGroup}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
          {experience.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-5 flex-1">
          {experience.tagline || experience.description}
        </p>

        {/* Pricing and Actions Row */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 block">Pricing</span>
            <span className="text-base font-semibold text-white tabular-nums">
              {experience.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(experience)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="View full experience details page"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
            <button
              onClick={() => onBook(experience)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-md transition-colors flex items-center gap-1 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
