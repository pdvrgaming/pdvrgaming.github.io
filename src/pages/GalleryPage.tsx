import React, { useState } from 'react';
import { Maximize2, ImageOff } from 'lucide-react';
import { useData } from '../context/DataContext';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  onOpenLightbox: (item: GalleryItem, allItems: GalleryItem[]) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenLightbox }) => {
  const { gallery } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'setups', label: 'Hardware & Rigs' },
    { id: 'apartments', label: 'Apartment Carnivals' },
    { id: 'school', label: 'School Workshops' },
    { id: 'vr', label: 'Gameplay' },
    { id: 'players', label: 'Player Reactions' }
  ];

  const filteredGallery = gallery.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Field Portfolio
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          IMMERSIVE SHOWCASE & FIELD GALLERY
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Actual photos from our apartment festival installations, school STEM workshops, racing simulator cockpits, and corporate exhibition stalls.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#0D131F] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, filteredGallery)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D131F] border border-slate-800 cursor-pointer shadow-md hover:border-slate-700 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block mb-1">
                    {item.category} {item.date && `· ${item.date}`}
                  </span>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-black/60 backdrop-blur-sm text-white/80 group-hover:text-white shrink-0 ml-2">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center border border-dashed border-slate-800 rounded-2xl bg-[#0B101A]">
          <p className="text-slate-400 text-sm">No photos available in this category yet.</p>
        </div>
      )}
    </div>
  );
};
