import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  Experience,
  PricingPlan,
  EventPackage,
  GalleryItem,
  Offer,
  Testimonial,
  SiteSettings,
  BookingEnquiry
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_EXPERIENCES,
  INITIAL_PRICING,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_OFFERS,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
  INITIAL_ENQUIRIES
} from '../data/initialData';

interface DataContextType {
  categories: Category[];
  experiences: Experience[];
  pricing: PricingPlan[];
  events: EventPackage[];
  gallery: GalleryItem[];
  offers: Offer[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  enquiries: BookingEnquiry[];
  
  // Public actions
  submitBookingEnquiry: (enquiry: Omit<BookingEnquiry, 'id' | 'createdAt' | 'status'>) => { id: string; whatsappUrl: string };
  
  // Admin C-Panel actions
  updateExperience: (exp: Experience) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  deleteExperience: (id: string) => void;
  
  updatePricing: (plan: PricingPlan) => void;
  addPricing: (plan: Omit<PricingPlan, 'id'>) => void;
  deletePricing: (id: string) => void;
  
  updateEvent: (eventPkg: EventPackage) => void;
  addEvent: (eventPkg: Omit<EventPackage, 'id'>) => void;
  deleteEvent: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  updateOffer: (offer: Offer) => void;
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  deleteOffer: (id: string) => void;

  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateEnquiryStatus: (id: string, status: BookingEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  
  resetToDefaults: () => void;
  exportJSON: () => string;
}

const STORAGE_KEY = 'pdvr_gaming_data_v5';

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_experiences`);
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });
  const [pricing, setPricing] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pricing`);
    return saved ? JSON.parse(saved) : INITIAL_PRICING;
  });
  const [events, setEvents] = useState<EventPackage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });
  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_offers`);
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_enquiries`);
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pricing`, JSON.stringify(pricing));
  }, [pricing]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_offers`, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(enquiries));
  }, [enquiries]);

  // Public Booking / Enquiry action
  const submitBookingEnquiry = (enquiryData: Omit<BookingEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = `enq-${Date.now()}`;
    const newEnquiry: BookingEnquiry = {
      ...enquiryData,
      id,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    // Build WhatsApp message
    const lines = [
      `*New Enquiry for PDVR GAMING*`,
      `Name: ${newEnquiry.name}`,
      `Phone: ${newEnquiry.phone}`,
      `Service: ${newEnquiry.serviceType.toUpperCase()}`,
      newEnquiry.experienceOrEventId ? `Selected: ${newEnquiry.experienceOrEventId}` : '',
      `Preferred Date: ${newEnquiry.date}`,
      `Time: ${newEnquiry.timeSlot}`,
      `Players/Guests: ${newEnquiry.playerCount}`,
      newEnquiry.locationDetails ? `Location: ${newEnquiry.locationDetails}` : '',
      newEnquiry.notes ? `Notes: ${newEnquiry.notes}` : ''
    ].filter(Boolean).join('\n');

    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines)}`;

    return { id, whatsappUrl };
  };

  // C-Panel Actions
  const updateExperience = (exp: Experience) => {
    setExperiences(prev => prev.map(item => item.id === exp.id ? exp : item));
  };

  const addExperience = (expData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...expData,
      id: `exp-${Date.now()}`
    };
    setExperiences(prev => [newExp, ...prev]);
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(item => item.id !== id));
  };

  const updatePricing = (plan: PricingPlan) => {
    setPricing(prev => prev.map(item => item.id === plan.id ? plan : item));
  };

  const addPricing = (planData: Omit<PricingPlan, 'id'>) => {
    const newPlan: PricingPlan = {
      ...planData,
      id: `price-${Date.now()}`
    };
    setPricing(prev => [...prev, newPlan]);
  };

  const deletePricing = (id: string) => {
    setPricing(prev => prev.filter(item => item.id !== id));
  };

  const updateEvent = (eventPkg: EventPackage) => {
    setEvents(prev => prev.map(item => item.id === eventPkg.id ? eventPkg : item));
  };

  const addEvent = (eventPkgData: Omit<EventPackage, 'id'>) => {
    const newEvent: EventPackage = {
      ...eventPkgData,
      id: `event-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(item => item.id !== id));
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  const updateOffer = (offer: Offer) => {
    setOffers(prev => prev.map(item => item.id === offer.id ? offer : item));
  };

  const addOffer = (offerData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(item => item.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateEnquiryStatus = (id: string, status: BookingEnquiry['status']) => {
    setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefaults = () => {
    setExperiences(INITIAL_EXPERIENCES);
    setPricing(INITIAL_PRICING);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    setOffers(INITIAL_OFFERS);
    setSettings(INITIAL_SETTINGS);
    setEnquiries(INITIAL_ENQUIRIES);
    localStorage.clear();
  };

  const exportJSON = () => {
    const fullData = {
      categories,
      experiences,
      pricing,
      events,
      gallery,
      offers,
      testimonials,
      settings,
      enquiries
    };
    return JSON.stringify(fullData, null, 2);
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        experiences,
        pricing,
        events,
        gallery,
        offers,
        testimonials,
        settings,
        enquiries,
        submitBookingEnquiry,
        updateExperience,
        addExperience,
        deleteExperience,
        updatePricing,
        addPricing,
        deletePricing,
        updateEvent,
        addEvent,
        deleteEvent,
        addGalleryItem,
        deleteGalleryItem,
        updateOffer,
        addOffer,
        deleteOffer,
        updateSettings,
        updateEnquiryStatus,
        deleteEnquiry,
        resetToDefaults,
        exportJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
