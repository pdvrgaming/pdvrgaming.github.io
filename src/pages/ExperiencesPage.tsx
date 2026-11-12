import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass } from 'lucide-react';
import { useData } from '../context/DataContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { ExperienceCard } from '../components/ExperienceCard';
import { CategoryId, Experience } from '../types';

interface ExperiencesPageProps {
  onSelectExperience: (exp: Experience) => void;
  onOpenBooking: (itemTitle?: string, type?: 'experience' | 'event' | 'custom') => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onSelectExperience,
  onOpenBooking
}) => {
  const { experiences, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiences = useMemo(() => {
    return experiences
      .filter((exp) => exp.active)
      .filter((exp) => selectedCategory === 'all' || exp.category === selectedCategory)
      .filter((exp) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          exp.title.toLowerCase().includes(q) ||
          exp.tagline.toLowerCase().includes(q) ||
          exp.description.toLowerCase().includes(q) ||
          exp.category.toLowerCase().includes(q)
        );
      });
  }, [experiences, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Catalog & Discovery
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          CHOOSE YOUR VR EXPERIENCE
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From full room-scale fantasy adventures to force-feedback direct-drive racing cockpits and curriculum-aligned STEM expeditions. Every title is curated for comfort, immersion, and high replayability.
        </p>
      </div>

      {/* Controls Bar: Search + Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search adventures, racing, STEM..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#0D131F] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <span className="text-white font-semibold tabular-nums">{filteredExperiences.length}</span> titles
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Experiences Grid */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onSelect={onSelectExperience}
              onBook={() => onOpenBooking(exp.title, 'experience')}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center border border-dashed border-slate-800 rounded-2xl bg-[#0B101A] space-y-3">
          <p className="text-slate-300 text-base font-medium">No experiences match your criteria.</p>
          <p className="text-slate-500 text-xs">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
