import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { Lightbox } from './components/Lightbox';
import { MobileQuickBar } from './components/MobileQuickBar';

import { HomePage } from './pages/HomePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { PricingPage } from './pages/PricingPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { CPanelPage } from './pages/CPanelPage';

import { Experience, GalleryItem } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeExperienceSlug, setActiveExperienceSlug] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPreselectedTitle, setBookingPreselectedTitle] = useState<string>('');
  const [bookingPreselectedType, setBookingPreselectedType] = useState<'experience' | 'event' | 'custom'>('experience');

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>([]);

  // Synchronize route with URL hash for GitHub Pages static compatibility
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!rawHash) {
        setCurrentRoute('home');
        setActiveExperienceSlug('');
      } else if (rawHash.startsWith('c-panel') || rawHash.startsWith('admin')) {
        setCurrentRoute('c-panel');
        setActiveExperienceSlug('');
      } else if (rawHash.startsWith('experiences/')) {
        const slug = rawHash.replace('experiences/', '');
        setCurrentRoute('experience-detail');
        setActiveExperienceSlug(slug);
      } else if (['experiences', 'pricing', 'events', 'gallery', 'about'].includes(rawHash)) {
        setCurrentRoute(rawHash);
        setActiveExperienceSlug('');
      } else {
        setCurrentRoute('home');
        setActiveExperienceSlug('');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize document title dynamically per view for SEO & browser tabs
  useEffect(() => {
    const routeTitles: Record<string, string> = {
      home: 'PDVR Gaming — Virtual Reality Gaming, 360° Rides & VR Events in Vijayawada',
      experiences: 'VR Experiences & Game Catalog — PDVR Gaming Vijayawada',
      pricing: 'Pricing & Packages (₹100–₹300) — PDVR Gaming Vijayawada',
      events: 'Mobile VR Events, School STEM & Birthday Setups — PDVR Gaming',
      gallery: 'Action Gallery & Event Showcase — PDVR Gaming Vijayawada',
      about: 'About PDVR Gaming — Commercial VR & STEM Technology in Andhra Pradesh',
      'c-panel': 'PDVR Gaming — Operational Control Panel',
    };
    if (currentRoute === 'experience-detail' && activeExperienceSlug) {
      const formatted = activeExperienceSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      document.title = `${formatted} — PDVR Gaming Vijayawada`;
    } else {
      document.title = routeTitles[currentRoute] || routeTitles.home;
    }
  }, [currentRoute, activeExperienceSlug]);

  const navigateTo = (route: string) => {
    if (route === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${route}`;
    }
  };

  const handleOpenBooking = (itemTitle?: string, type: 'experience' | 'event' | 'custom' = 'experience') => {
    setBookingPreselectedTitle(itemTitle || '');
    setBookingPreselectedType(type);
    setIsBookingOpen(true);
  };

  const handleOpenLightbox = (item: GalleryItem, allItems: GalleryItem[]) => {
    setSelectedLightboxItem(item);
    setLightboxItems(allItems);
  };

  const isCPanel = currentRoute === 'c-panel';

  return (
    <DataProvider>
      <div className="min-h-screen bg-[#090D15] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white pb-24 md:pb-0">
        {!isCPanel && (
          <Header
            currentRoute={currentRoute}
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        <div className="flex-1">
          {currentRoute === 'home' && (
            <HomePage
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
              onSelectExperience={(exp) => {
                window.location.hash = `#/experiences/${exp.slug}`;
              }}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {currentRoute === 'experiences' && (
            <ExperiencesPage
              onSelectExperience={(exp) => {
                window.location.hash = `#/experiences/${exp.slug}`;
              }}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {currentRoute === 'experience-detail' && (
            <ExperienceDetailPage
              slug={activeExperienceSlug}
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {currentRoute === 'pricing' && (
            <PricingPage onOpenBooking={handleOpenBooking} />
          )}

          {currentRoute === 'events' && (
            <EventsPage onOpenBooking={handleOpenBooking} />
          )}

          {currentRoute === 'gallery' && (
            <GalleryPage onOpenLightbox={handleOpenLightbox} />
          )}

          {currentRoute === 'about' && (
            <AboutPage onOpenBooking={() => handleOpenBooking(undefined, 'event')} />
          )}

          {currentRoute === 'c-panel' && (
            <CPanelPage onBackToSite={() => navigateTo('home')} />
          )}
        </div>

        {!isCPanel && (
          <Footer
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* Mobile Quick Action Bar */}
        {!isCPanel && (
          <MobileQuickBar onOpenBooking={() => handleOpenBooking()} />
        )}

        {/* Global Modals */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedTitle={bookingPreselectedTitle}
          preselectedType={bookingPreselectedType}
        />

        <ExperienceDetailModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onBook={(exp) => handleOpenBooking(exp.title, 'experience')}
        />

        <Lightbox
          item={selectedLightboxItem}
          items={lightboxItems}
          onClose={() => setSelectedLightboxItem(null)}
          onNavigate={(item) => setSelectedLightboxItem(item)}
        />
      </div>
    </DataProvider>
  );
}
