import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, items, onClose, onNavigate }) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex(i => i.id === item.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 min-h-[44px] min-w-[44px] p-2 text-white/80 hover:text-white bg-slate-900/80 rounded-full transition-colors z-20 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev / Next controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 sm:p-3 text-white/80 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors z-20 flex items-center justify-center active:scale-95 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 sm:p-3 text-white/80 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors z-20 flex items-center justify-center active:scale-95 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative w-full max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        <div className="mt-3 sm:mt-4 text-center max-w-lg px-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-blue-400 font-semibold block mb-1">
            {item.category} {item.date && `· ${item.date}`}
          </span>
          <h3 className="font-display text-base sm:text-lg font-bold text-white mb-0.5">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
