import React from 'react';
import { Category, CategoryId } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none overscroll-x-contain -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#0D131F] border border-slate-800 rounded-xl">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[38px] px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
