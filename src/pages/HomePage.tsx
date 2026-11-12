import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion
} from 'motion/react';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Play,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { ExperienceCard } from '../components/ExperienceCard';
import { CategoryId, Experience, GalleryItem } from '../types';

import vrUseSurgery from '@/src/assets/images/vr_use_surgery.jpg';
import vrUseArchitecture from '@/src/assets/images/vr_use_architecture.jpg';
import vrUseAutomotive from '@/src/assets/images/vr_use_automotive.jpg';
import vrUseIndustrial from '@/src/assets/images/vr_use_industrial.jpg';
import vrUseFirefighter from '@/src/assets/images/vr_use_firefighter.jpg';
import vrUseTherapy from '@/src/assets/images/vr_use_therapy.jpg';
import vrUseTourism from '@/src/assets/images/vr_use_tourism.jpg';
import vrUseAviation from '@/src/assets/images/vr_use_aviation.jpg';
import vrUseSolarSystem from '@/src/assets/images/solar_system.jpg';
import vrUseOceanRift from '@/src/assets/images/ocean_rift.jpg';
import vrUseMissionIss from '@/src/assets/images/mission_iss.jpg';
import vrUseAnatomy from '@/src/assets/images/anatomy.jpg';
import vrUseSchoolPackage from '@/src/assets/images/vr_school_package_1790161016883.jpg';
import vrUseCricket from '@/src/assets/images/cricket.jpg';

export interface VRUtilityItem {
  id: string;
  domain: string;
  title: string;
  tagline: string;
  impactMetric: string;
  image: string;
}

const VR_USE_CASES: VRUtilityItem[] = [
  {
    id: 'use-surgery',
    domain: 'Healthcare & Surgery',
    title: 'Surgical & Medical Simulation',
    tagline: 'Pre-operative surgery rehearsal & patient-specific 3D organ planning with zero clinical risk.',
    impactMetric: 'Zero Risk Surgical Prep',
    image: vrUseSurgery
  },
  {
    id: 'use-space-stem',
    domain: 'STEM & Space Science',
    title: 'Planetary Astronomy & Physics',
    tagline: 'True-scale orbital mechanics, gravity simulations & celestial exploration for classrooms.',
    impactMetric: '3.5x Knowledge Retention',
    image: vrUseSolarSystem
  },
  {
    id: 'use-architecture',
    domain: 'Architecture & Construction',
    title: 'Architecture & 3D Walkthroughs',
    tagline: '1:1 scale spatial walkthroughs of unbuilt villas, complexes & interior structures.',
    impactMetric: 'Eliminates Costly Redesigns',
    image: vrUseArchitecture
  },
  {
    id: 'use-automotive',
    domain: 'Automotive Engineering',
    title: 'Automotive CAD & Aerodynamics',
    tagline: 'Virtual wind-tunnel testing, holographic chassis inspection & collaborative prototyping.',
    impactMetric: 'Accelerates Vehicle R&D',
    image: vrUseAutomotive
  },
  {
    id: 'use-aviation',
    domain: 'Aeronautics & Pilot Training',
    title: 'Flight Cockpit Simulation',
    tagline: 'FAA-grade cockpit instrument mastery, emergency weather navigation & spatial orientation.',
    impactMetric: 'Commercial Pilot Training',
    image: vrUseAviation
  },
  {
    id: 'use-marine',
    domain: 'Marine Biology & Ecology',
    title: 'Deep-Sea Oceanographic Research',
    tagline: 'Accessible deep-sea ecosystem dives, marine species behavior tracking & coral conservation.',
    impactMetric: 'Underwater Safari & Research',
    image: vrUseOceanRift
  },
  {
    id: 'use-industrial',
    domain: 'Industrial Safety & Heavy Machinery',
    title: 'Crane & Heavy Equipment Safety',
    tagline: 'High-rise tower crane operation & hazardous construction site drills with zero workplace accidents.',
    impactMetric: '100% Risk-Free Operator Drills',
    image: vrUseIndustrial
  },
  {
    id: 'use-firefighter',
    domain: 'Emergency & First Responders',
    title: 'Firefighter & Crisis Rescue Drills',
    tagline: 'Flashover fire behavior drills, smoke navigation & real-time team rescue coordination.',
    impactMetric: 'Life-Saving Emergency Response',
    image: vrUseFirefighter
  },
  {
    id: 'use-spacewalk',
    domain: 'Aerospace & Astronautics',
    title: 'NASA Zero-G Microgravity EVA',
    tagline: 'Spacewalk physics, orbital docking & zero-gravity spatial awareness 400km above Earth.',
    impactMetric: 'Astronaut Grade Spatial Physics',
    image: vrUseMissionIss
  },
  {
    id: 'use-anatomy',
    domain: 'Medical Education & Biology',
    title: 'Interactive 3D Human Anatomy',
    tagline: 'Stereoscopic layer-by-layer dissection of cardiovascular, nervous, and musculoskeletal systems.',
    impactMetric: 'Next-Gen Medical Training',
    image: vrUseAnatomy
  },
  {
    id: 'use-therapy',
    domain: 'Clinical Psychology & Therapy',
    title: 'Phobia & Cognitive Rehabilitation',
    tagline: 'Clinically supervised exposure therapy for acrophobia, anxiety disorders, and trauma recovery.',
    impactMetric: 'Evidence-Based Therapy',
    image: vrUseTherapy
  },
  {
    id: 'use-tourism',
    domain: 'Cultural Heritage & Tourism',
    title: 'Heritage Preservation & Virtual Tourism',
    tagline: 'Preserving ancient monuments & lost archaeological wonders in millimeter-accurate 3D.',
    impactMetric: 'Universal Global Access',
    image: vrUseTourism
  },
  {
    id: 'use-school',
    domain: 'Academic STEM Workshops',
    title: 'Multi-Student Interactive STEM Labs',
    tagline: 'Collaborative curriculum-aligned science experiments that turn textbooks into interactive reality.',
    impactMetric: 'Active Student Engagement',
    image: vrUseSchoolPackage
  },
  {
    id: 'use-sports',
    domain: 'Sports Science & Reaction Speed',
    title: 'Athlete Reflex & Trajectory Training',
    tagline: 'Millisecond reaction time optimization, pitch tracking & high-velocity ball physics.',
    impactMetric: 'Reflex & Focus Enhancement',
    image: vrUseCricket
  }
];

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenBooking: (itemTitle?: string, type?: 'experience' | 'event' | 'custom') => void;
  onSelectExperience: (exp: Experience) => void;
  onOpenLightbox: (item: GalleryItem, allItems: GalleryItem[]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectExperience,
  onOpenLightbox
}) => {
  const { experiences, categories, pricing, events, gallery, testimonials, settings } = useData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const prefersReducedMotion = useReducedMotion();

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Real-world VR utility showcase auto-cycling every 2.5 seconds (2-3s each)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeUseCase = VR_USE_CASES[activeHeroIndex] || VR_USE_CASES[0];

  // Auto-advance hero preview every 2.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % VR_USE_CASES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // 3D Perspective Tilt on Desktop Hero Card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReducedMotion ? ['0deg', '0deg'] : ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Filter experiences by category
  const filteredExperiences = experiences
    .filter((exp) => exp.active)
    .filter((exp) => selectedCategory === 'all' || exp.category === selectedCategory);

  const previewGallery = gallery.slice(0, 4);

  // Marquee items for kinetic operational ribbon
  const marqueeItems = [
    'PDVR GAMING · VIRTUAL REALITY EXPERIENCES',
    'ROLLER COASTER · BEAT SABER · IRON MAN · JURASSIC PARK',
    'EDUCATIONAL STEM · SOLAR SYSTEM & OCEAN RIFT',
    'TRAINED ON-SITE OPERATORS & FACILITATORS INCLUDED',
    'APARTMENT CARNIVALS · SCHOOL WORKSHOPS · BIRTHDAY PARTIES',
    'INSTANT SCHEDULING VIA WHATSAPP: +91 9133020759'
  ];

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32">
      {/* Top Scroll Indicator (Discreet, zero-clutter) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* 01 — CINEMATIC INTERACTIVE HERO SECTION (Motion-Driven) */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-14 overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Proposition & Direct Action with Staggered Entrance */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>{settings.brandTagline.toUpperCase()}</span>
              </div>

              <div className="space-y-2">
                <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_28px_rgba(59,130,246,0.35)] leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                    PDVR
                  </span>{' '}
                  <span className="text-white">
                    GAMING
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-200 tracking-tight leading-snug">
                  {settings.heroHeadline.toUpperCase()}
                </h1>
              </div>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                {settings.heroSubheadline}
              </p>

              {/* CTAs with micro-interaction */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onNavigate('experiences')}
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span>EXPLORE EXPERIENCES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenBooking(undefined, 'event')}
                  className="px-6 py-3.5 rounded-xl bg-[#0F1523] hover:bg-[#151D30] border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <span>BOOK / PLAN AN EVENT</span>
                </button>
              </div>

              {/* Quantitative Adjacency Signals */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-xs text-slate-400">
                <div>
                  <span className="font-bold text-white block text-sm sm:text-base tabular-nums">Ages 4 - 65</span>
                  <span className="text-[11px] text-slate-400">Suitable For All</span>
                </div>
                <div>
                  <span className="font-bold text-white block text-sm sm:text-base tabular-nums">14+ Titles</span>
                  <span className="text-[11px] text-slate-400">VR Adventures</span>
                </div>
                <div>
                  <span className="font-bold text-white block text-sm sm:text-base tabular-nums">0 Hassle</span>
                  <span className="text-[11px] text-slate-400">On-Site Setup</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Real-World VR Utility Showcase (Auto-advancing 2-3s) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative [perspective:1000px]"
            >
              <motion.div
                ref={cardRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  handleMouseLeave();
                  setIsPaused(false);
                }}
                onMouseEnter={() => setIsPaused(true)}
                className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0B101C] shadow-2xl transition-shadow duration-300 hover:shadow-blue-900/10"
              >
                {/* Media Canvas with Animated Crossfade */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden select-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeUseCase.id}
                      src={activeUseCase.image}
                      alt={activeUseCase.title}
                      referrerPolicy="no-referrer"
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B101C] via-[#0B101C]/35 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-sky-300 bg-blue-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-blue-700/60 pointer-events-auto flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{activeUseCase.domain}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-200 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/50">
                      {activeUseCase.impactMetric}
                    </span>
                  </div>

                  {/* Title & Real-World Utility Description */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeUseCase.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-4 left-4 right-4 text-left pointer-events-none"
                    >
                      <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider block mb-0.5">
                        Real-World Practical VR Utility
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
                        {activeUseCase.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {activeUseCase.tagline}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Animated 2.5-Second Progress Bar */}
                {!prefersReducedMotion && (
                  <div className="w-full bg-slate-900 h-1 overflow-hidden">
                    <motion.div
                      key={activeHeroIndex}
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{
                        duration: isPaused ? 0 : 2.5,
                        ease: 'linear'
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-sky-400"
                    />
                  </div>
                )}

                {/* Bottom Navigation & Index Controller */}
                <div className="p-3 bg-[#0B101C] border-t border-slate-800/80 flex items-center justify-between gap-3">
                  {/* Left: Previous / Next & Slide Counter */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveHeroIndex((prev) => (prev - 1 + VR_USE_CASES.length) % VR_USE_CASES.length);
                        setIsPaused(true);
                      }}
                      aria-label="Previous VR use case"
                      className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveHeroIndex((prev) => (prev + 1) % VR_USE_CASES.length);
                        setIsPaused(true);
                      }}
                      aria-label="Next VR use case"
                      className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono text-slate-400 pl-1">
                      <span className="text-white font-bold">{String(activeHeroIndex + 1).padStart(2, '0')}</span>
                      <span className="text-slate-600 mx-1">/</span>
                      <span>{String(VR_USE_CASES.length).padStart(2, '0')}</span>
                    </span>
                  </div>

                  {/* Center: Miniature dot indicators */}
                  <div className="hidden sm:flex items-center gap-1">
                    {VR_USE_CASES.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveHeroIndex(idx);
                          setIsPaused(true);
                        }}
                        aria-label={`Jump to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeHeroIndex === idx
                            ? 'w-5 bg-blue-400'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Right: Quick Action to experiences */}
                  <button
                    onClick={() => onNavigate('experiences')}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <span>Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 02 — KINETIC OPERATIONAL MARQUEE RIBBON (Motion Site Atmosphere) */}
      <section className="relative overflow-hidden border-y border-slate-800/80 bg-[#0A0E18] py-3 select-none">
        <div className="flex w-max space-x-8 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4 whitespace-nowrap text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              <span className="font-mono uppercase tracking-wider text-slate-300 font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — QUICK STATS / TRUST BAR (Fluid, Unboxed) */}
      <section className="border-y border-slate-800/80 bg-[#0B101A] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Catalog Depth
              </span>
              <span className="font-display text-xl sm:text-3xl font-bold text-white tabular-nums">
                25+ Curated
              </span>
              <p className="text-[11px] sm:text-xs text-slate-400">Room-Scale VR & Simulators</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Turnkey Mobile
              </span>
              <span className="font-display text-xl sm:text-3xl font-bold text-white tabular-nums">
                On-Site Fleet
              </span>
              <p className="text-[11px] sm:text-xs text-slate-400">Brought Direct to Venues</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Age Suitability
              </span>
              <span className="font-display text-xl sm:text-3xl font-bold text-white tabular-nums">
                Ages 4 - 65
              </span>
              <p className="text-[11px] sm:text-xs text-slate-400">Kids, Youth & Adults</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Visual Fidelity
              </span>
              <span className="font-display text-xl sm:text-3xl font-bold text-white tabular-nums">
                Ultra HD VR
              </span>
              <p className="text-[11px] sm:text-xs text-slate-400">Crystal Clear Immersive Optics</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CATEGORY TABS & FEATURED EXPERIENCES (Layout Motion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
              Experience Discovery
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              CHOOSE YOUR EXPERIENCE
            </h2>
          </div>
          <button
            onClick={() => onNavigate('experiences')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 self-start md:self-auto"
          >
            <span>Explore All {experiences.length} Titles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Experience Cards Grid with Fluid Motion Layout */}
        <motion.div layout className="min-h-[300px]">
          {filteredExperiences.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredExperiences.slice(0, 6).map((exp) => (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ExperienceCard
                      experience={exp}
                      onSelect={(selected) => {
                        window.location.hash = `#/experiences/${selected.slug}`;
                      }}
                      onBook={() => onOpenBooking(exp.title, 'experience')}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-slate-400 text-sm">No titles found in this category currently.</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* 06 — HOW IT WORKS (Simple 4-Step Asymmetric Layout with Motion Stagger) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-12 rounded-2xl bg-gradient-to-b from-[#0E1524] to-[#090D15] border border-slate-800"
        >
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
              Simple Protocol
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              HOW PDVR OPERATES
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Whether you are dropping in for a single thrill or organizing a 200-guest carnival, here is how we make it effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-2 border-t-2 border-slate-800 pt-4">
              <span className="font-mono text-sm font-bold text-blue-400 block">01</span>
              <h3 className="font-display text-base font-bold text-white">Select Experience</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose from room-scale VR adventures, rhythm fitness, or direct-drive racing cockpits.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-slate-800 pt-4">
              <span className="font-mono text-sm font-bold text-blue-400 block">02</span>
              <h3 className="font-display text-base font-bold text-white">Choose Setup or Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book a single player pass or book an on-site turnkey station deployment for your venue.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-slate-800 pt-4">
              <span className="font-mono text-sm font-bold text-blue-400 block">03</span>
              <h3 className="font-display text-base font-bold text-white">Schedule Date & Slot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick your preferred timeline. Our mobile crew arrives 30 minutes early to calibrate gear and safety perimeters.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-blue-500 pt-4">
              <span className="font-mono text-sm font-bold text-blue-400 block">04</span>
              <h3 className="font-display text-base font-bold text-white">Enter The Experience</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Slip on the headset, adjust your comfort fit, and dive straight into high-refresh immersion.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 07 — PRICING PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
              Transparent Rates
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              PASSES & POPULAR PACKAGES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 self-start md:self-auto"
          >
            <span>View Full Pricing Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricing.slice(0, 4).map((plan) => (
            <motion.div
              key={plan.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-colors ${
                plan.isPopular
                  ? 'bg-[#101828] border-2 border-blue-500/80 shadow-lg shadow-blue-900/20'
                  : 'bg-[#0C121E] border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {plan.isPopular && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block mb-2">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-white">{plan.title}</h3>
                <div className="mt-2 mb-4 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-xs text-slate-400">/{plan.period}</span>}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {plan.description}
                </p>

                <ul className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenBooking(plan.title, plan.category === 'events' ? 'event' : 'experience')}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  plan.isPopular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 08 — EVENT SOLUTIONS (Large Editorial Asymmetric Section with Slide Reveal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="border border-slate-800 rounded-3xl overflow-hidden bg-[#0B101A]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-6 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                  Turnkey Mobile Deployments
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  TAKE PDVR TO YOUR EVENT.
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed">
                  We supply commercial VR headsets, racing simulators, protective perimeter mats, safety monitors, and trained facilitators. No technical knowledge required from your side.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Schools & STEM Science Exhibitions</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Apartment Clubhouse & Society Carnivals</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Corporate Offsites & High-Footfall Expo Booths</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Private Birthday & Milestone Celebrations</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('events')}
                className="self-start px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Explore Event Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 relative bg-slate-900 min-h-[280px] lg:min-h-[480px]">
              <img
                src={events[0]?.image}
                alt="PDVR Mobile Event Setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B101A] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B101A] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 09 — GALLERY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
              Field Action
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              SEE PDVR IN ACTION
            </h2>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 self-start md:self-auto"
          >
            <span>Full Gallery & Setups</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {previewGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, gallery)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-blue-400 tracking-wider block">
                  {item.category}
                </span>
                <p className="text-xs font-bold text-white truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10 — WHY PDVR & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h4 className="font-display text-base font-bold text-white">Commercial Grade Hardware</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We do not use underpowered phone headsets. High-refresh optics, spatial 3D audio, and direct-drive simulator motors prevent motion nausea.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h4 className="font-display text-base font-bold text-white">Dedicated On-Site Technicians</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our trained facilitators assist every guest with headset adjustment, comfort settings, game tutorials, and safety boundaries.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h4 className="font-display text-base font-bold text-white">Turnkey Event Delivery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete equipment delivery, safety zoning, interactive spectator screens, and seamless queue management.
            </p>
          </div>
        </div>

        {/* Real Customer Testimonials */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white">
              WHAT COMMUNITY ORGANIZERS SAY
            </h3>
            <span className="text-xs text-slate-500">Real Event Feedback</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.filter(t => t.active).map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[#0C121E] border border-slate-800 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                  "{item.quote}"
                </p>

                <div className="pt-4 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                  <span className="text-[10px] text-blue-400 font-medium block mt-1">
                    {item.organization} · {item.eventType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — LOCAL COVERAGE & FREQUENTLY ASKED QUESTIONS (Vijayawada & AP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" aria-labelledby="faq-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
              Vijayawada · Guntur · Amaravati · Andhra Pradesh
            </span>
            <h2 id="faq-heading" className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <span className="text-xs text-slate-400">VR Sessions, School STEM &amp; On-Site Event Support</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h3 className="font-display text-base font-bold text-white">
              What is the ticket price for VR games at PDVR Gaming in Vijayawada?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Individual VR sessions start at ₹100 for 360° rides (Roller Coaster, Santa Ride, Henry), ₹150 for interactive action games (Beat Saber, Iron Man VR, Cricket, Boxing), and ₹300 for 15+ minute Educational STEM VR modules.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h3 className="font-display text-base font-bold text-white">
              Does PDVR Gaming provide VR setups for birthday parties, apartments &amp; schools?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Yes. We deliver fully staffed mobile VR arenas across Vijayawada, Guntur, Amaravati, and Mangalagiri for apartment clubhouses, school STEM workshops, tech expos, and private birthday celebrations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h3 className="font-display text-base font-bold text-white">
              What age groups can enjoy PDVR Gaming VR experiences?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our commercial-grade 90Hz+ VR headsets and simulator setups are suitable for ages 4 to 65, with trained on-site technicians guiding every player safely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B101A] border border-slate-800 space-y-2">
            <h3 className="font-display text-base font-bold text-white">
              Which cities and timings does PDVR Gaming operate in?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We operate daily from 8:00 AM to 10:00 PM across Vijayawada, Guntur, Amaravati, Tenali, Eluru, and nearby venues across Andhra Pradesh. Call or WhatsApp +91 9133020759 for bookings.
            </p>
          </div>
        </div>
      </section>

      {/* 12 — FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0C121E] to-[#0A0E17] border border-blue-900/40 text-center max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            <span>READY TO ENTER THE EXPERIENCE?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            BOOK YOUR SESSION OR BRING PDVR TO YOUR VENUE.
          </h2>

          <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Contact us directly on WhatsApp or drop an enquiry. We respond within minutes with available slots and custom package estimates.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking(undefined, 'custom')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-blue-600/30"
            >
              BOOK NOW / GET QUOTE
            </button>

            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi PDVR GAMING, I would like to book a VR session / enquire about an event.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
