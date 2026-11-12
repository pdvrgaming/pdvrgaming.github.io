export type CategoryId = 'all' | '360' | 'gaming' | 'educational' | 'educational-package' | 'events' | 'kids' | 'children' | 'adults' | 'school';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  tagline: string;
  description: string;
  whatYouExperience: string[];
  duration: string;
  ageGroup: string;
  playerCount: string;
  price: string;
  image: string;
  gallery?: string[];
  featured: boolean;
  active: boolean;
  rating?: number;
  highlight?: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  category: 'individual' | 'family' | 'events' | 'simulation';
  duration: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
  active: boolean;
}

export interface EventPackage {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  setupsIncluded: string;
  spaceRequired: string;
  idealDuration: string;
  features: string[];
  priceStartingAt: string;
  image: string;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'vr' | 'events' | 'school' | 'apartments' | 'setups' | 'players';
  image: string;
  caption: string;
  date?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  badge: string;
  discount: string;
  code: string;
  validUntil: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  avatar?: string;
  eventType: string;
  active: boolean;
}

export interface SiteSettings {
  businessName: string;
  brandTagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  openingHours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export interface BookingEnquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'experience' | 'event' | 'custom';
  experienceOrEventId?: string;
  date: string;
  timeSlot: string;
  playerCount: number;
  locationDetails?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
}
