import rollerCoasterImage from '@/src/assets/images/roller_coaster.jpg';
import santaRideImage from '@/src/assets/images/santa_ride.jpg';
import henryImage from '@/src/assets/images/henry.jpg';
import jurassicParkImage from '@/src/assets/images/jurassic_park.png';
import beatSaberImage from '@/src/assets/images/beat_saber.jpg';
import ironManImage from '@/src/assets/images/iron_man.jpg';
import richiesPlankImage from '@/src/assets/images/richies_plank.jpg';
import boxingImage from '@/src/assets/images/boxing.jpg';
import horrorImage from '@/src/assets/images/horror.jpg';
import cricketImage from '@/src/assets/images/cricket.jpg';
import solarSystemImage from '@/src/assets/images/solar_system.jpg';
import oceanRiftImage from '@/src/assets/images/ocean_rift.jpg';
import missionIssImage from '@/src/assets/images/mission_iss.jpg';
import anatomyImage from '@/src/assets/images/anatomy.jpg';
import eventImage from '@/src/assets/images/vr_event_package_1790161029768.jpg';
import schoolImage from '@/src/assets/images/vr_school_package_1790161016883.jpg';

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

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Experiences', description: 'Explore all VR adventures, rides, and simulations' },
  { id: '360', name: '360', description: 'Thrilling 360-degree VR roller coasters, magical journeys & prehistoric worlds' },
  { id: 'gaming', name: 'Gaming & Action', description: 'High-energy rhythm battles, superhero flights, boxing & survival quests' },
  { id: 'educational', name: 'Educational', description: 'Space exploration, marine life dives & human anatomy in 3D' },
  { id: 'educational-package', name: 'Educational Package', description: 'Curriculum-aligned multi-station STEM packages combining all educational categories' },
  { id: 'events', name: 'Event Package', description: 'Turnkey mobile VR setups with dedicated hosts (Local & outstation)' }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  // --- 360° EXPERIENCES ---
  {
    id: 'exp-roller-coaster',
    slug: 'roller-coaster-vr',
    title: 'Roller Coaster',
    category: '360',
    tagline: 'Experience thrilling roller coaster rides in virtual reality with stunning visuals and heart-pounding excitement.',
    description: 'Experience thrilling roller coaster rides in virtual reality with stunning visuals and heart-pounding excitement. Feel every twist, turn, loop, and drop as if you were on a real high-speed coaster.',
    whatYouExperience: [
      'Full 360-degree immersive rollercoaster tracks with dynamic physics',
      'Breathtaking high-altitude drops and adrenaline-pumping velocity loops',
      'Comfortable viewing tuned for riders of all ages',
      'Pure thrill and fun for first-timers and thrill-seekers alike'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 4+',
    playerCount: '1 Player',
    price: '₹100',
    image: rollerCoasterImage,
    featured: true,
    active: true,
    highlight: 'Top 360° Ride'
  },
  {
    id: 'exp-santa-ride',
    slug: 'santa-ride-vr',
    title: 'Santa Ride',
    category: '360',
    tagline: 'Join Santa on a magical Christmas adventure through snowy landscapes and festive wonderlands.',
    description: 'Join Santa on a magical Christmas adventure through snowy landscapes and festive wonderlands. Fly across starlit skies in Santa’s sleigh and experience holiday enchantment.',
    whatYouExperience: [
      'Enchanting 360-degree journey across snowy hills and magical skies',
      'Festive holiday atmosphere packed with wonder and smiles',
      'Gentle, joyful adventure specially loved by kids and families',
      'Captivating holiday music and cozy winter visuals'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 4+',
    playerCount: '1 Player',
    price: '₹100',
    image: santaRideImage,
    featured: false,
    active: true,
    highlight: 'Family Magic'
  },
  {
    id: 'exp-henry',
    slug: 'henry-vr',
    title: 'Henry',
    category: '360',
    tagline: 'Adventure awaits at Henry’s unforgettable VR birthday celebration today!',
    description: 'Adventure awaits at Henry’s unforgettable VR birthday celebration today! An Emmy-winning heartwarming VR narrative about a lovable hedgehog who loves to hug.',
    whatYouExperience: [
      'Emmy award-winning narrative storytelling in full virtual reality',
      'Heartwarming character interaction that charms kids and adults',
      'Lush visual storytelling and emotional engagement',
      'Ideal gentle introduction to VR for first-time visitors'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 4+',
    playerCount: '1 Player',
    price: '₹100',
    image: henryImage,
    featured: false,
    active: true,
    highlight: 'Emmy Winner'
  },
  {
    id: 'exp-jurassic-park',
    slug: 'jurassic-park-vr',
    title: 'Jurassic Park',
    category: '360',
    tagline: 'Walk among dinosaurs in this thrilling prehistoric adventure. Face T-Rex and explore ancient worlds.',
    description: 'Walk among dinosaurs in this thrilling prehistoric adventure. Face T-Rex and explore ancient worlds with life-sized dinosaurs roaming right around you.',
    whatYouExperience: [
      'Heart-stopping close encounters with towering T-Rex and Raptors',
      'Ultra-realistic prehistoric jungle environments in full 360 degrees',
      'Spatial 3D audio delivering thunderous dinosaur footsteps and roars',
      'High-tension prehistoric safari experience'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 6+',
    playerCount: '1 Player',
    price: '₹150',
    image: jurassicParkImage,
    featured: true,
    active: true,
    highlight: 'Top Prehistoric Pick'
  },

  // --- GAMING EXPERIENCES ---
  {
    id: 'exp-beat-saber',
    slug: 'beat-saber-vr',
    title: 'Beat Saber',
    category: 'gaming',
    tagline: 'Slice through beats in this rhythm VR game. Test your reflexes and enjoy energetic music.',
    description: 'Slice through beats in this rhythm VR game. Test your reflexes and enjoy energetic music with dual energy sabers in an electric neon arena.',
    whatYouExperience: [
      'Dual neon saber slicing perfectly synchronised to pumping beats',
      'Rapid reflex challenges that get your adrenaline and heart pumping',
      'Intuitive pickup-and-play mechanics with varying difficulty tiers',
      'Globally acclaimed #1 rhythm VR title'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 6+',
    playerCount: '1 Player',
    price: '₹150',
    image: beatSaberImage,
    featured: true,
    active: true,
    highlight: 'Most Popular'
  },
  {
    id: 'exp-iron-man',
    slug: 'iron-man-vr',
    title: 'Iron Man',
    category: 'gaming',
    tagline: 'Become the legendary superhero and fly through cities with Iron Man’s powerful suit.',
    description: 'Become the legendary superhero and fly through cities with Iron Man’s powerful suit. Fire repulsor blasts, soar through skyscrapers, and battle high-tech adversaries in the sky.',
    whatYouExperience: [
      'Realistic repulsor jet thruster flight controls via dual hand controllers',
      'High-speed aerial combat with repulsors, micro-missiles, and unibeam',
      'Iconic armored HUD displaying real-time flight telemetry and radar',
      'True superhero fantasy brought to life'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 8+',
    playerCount: '1 Player',
    price: '₹150',
    image: ironManImage,
    featured: true,
    active: true,
    highlight: 'Superhero Action'
  },
  {
    id: 'exp-richies-plank',
    slug: 'richies-plank-vr',
    title: "Richie's Plank",
    category: 'gaming',
    tagline: 'Test your courage on a virtual plank high above the city. Perfect for thrill seekers!',
    description: 'Test your courage on a virtual plank high above the city. Perfect for thrill seekers! Step out 80 storeys above ground onto an 80-foot drop and feel your knees shake.',
    whatYouExperience: [
      'Psychological thrill testing real-world vertigo and courage',
      'Breathtaking 80-storey city overlook with realistic wind audio',
      'Hilarious spectator fun for friends and family watching live reactions',
      'Bonus hero flying mode with dual rocket thrusters'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 8+',
    playerCount: '1 Player',
    price: '₹150',
    image: richiesPlankImage,
    featured: true,
    active: true,
    highlight: 'Ultimate Vertigo Test'
  },
  {
    id: 'exp-boxing',
    slug: 'boxing-vr',
    title: 'Boxing',
    category: 'gaming',
    tagline: 'Step into the ring and experience intense boxing matches with realistic combat mechanics.',
    description: 'Step into the ring and experience intense boxing matches with realistic combat mechanics. Duck, dodge, jab, and deliver knockout blows to championship opponents.',
    whatYouExperience: [
      'Full-body physical cardio workout with physics-driven punches and blocks',
      'Responsive haptic feedback when landing combinations or blocking strikes',
      'Dynamic AI opponents that adapt to your combat fighting style',
      'Roaring arena crowds and authentic championship atmosphere'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 10+',
    playerCount: '1 Player',
    price: '₹150',
    image: boxingImage,
    featured: false,
    active: true,
    highlight: 'Combat & Fitness'
  },
  {
    id: 'exp-horror',
    slug: 'horror-vr',
    title: 'Horror',
    category: 'gaming',
    tagline: 'Face your fears in spine-chilling horror experiences. Not for the faint-hearted!',
    description: 'Face your fears in spine-chilling horror experiences. Not for the faint-hearted! Navigate eerie corridors, supernatural encounters, and jump scares in complete 360 darkness.',
    whatYouExperience: [
      'Spine-tingling 360 audio that tracks every whisper in the shadows',
      'Atmospheric terror with interactive flashlight and suspense mechanics',
      'Maximum immersion that will test your bravery and nerves',
      'High-intensity jump scares and paranormal suspense'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 14+',
    playerCount: '1 Player',
    price: '₹150',
    image: horrorImage,
    featured: false,
    active: true,
    highlight: 'Thrill & Fear'
  },
  {
    id: 'exp-cricket',
    slug: 'cricket-vr',
    title: 'Cricket',
    category: 'gaming',
    tagline: 'Play cricket in virtual stadiums with realistic physics and crowd atmosphere.',
    description: 'Play cricket in virtual stadiums with realistic physics and crowd atmosphere. Pick your bat, face lethal pacers and deceptive spinners, and smash sixes out of the ground!',
    whatYouExperience: [
      'Realistic batting physics with genuine sweet-spot ball trajectory',
      'Facing authentic 140+ km/h pace deliveries and sharp spin variations',
      'Massive stadium atmosphere with cheering crowds and commentary',
      'Multiple difficulty levels, target chases, and practice nets'
    ],
    duration: '5 - 10 Mins',
    ageGroup: 'Ages 6+',
    playerCount: '1 Player',
    price: '₹150',
    image: cricketImage,
    featured: true,
    active: true,
    highlight: 'Cricket VR'
  },

  // --- EDUCATIONAL EXPERIENCES ---
  {
    id: 'exp-solar-system',
    slug: 'solar-system-vr',
    title: 'Solar System',
    category: 'educational',
    tagline: 'Explore planets, moons, and stars in an immersive journey through our solar system.',
    description: 'Explore planets, moons, and stars in an immersive journey through our solar system. Travel between celestial bodies, examine planetary rings, and observe orbital mechanics in 3D.',
    whatYouExperience: [
      'True-scale astronomical models of all 8 planets, sun, and dwarf planets',
      'Interactive time acceleration showing planetary orbits and eclipses',
      'Close-up views of Saturn’s rings, Jupiter’s Great Red Spot, and Martian valleys',
      'Curriculum-aligned STEM learning that captivates students and adults'
    ],
    duration: '15+ Mins',
    ageGroup: 'Ages 5+',
    playerCount: '1 - 2 Players',
    price: '₹300',
    image: solarSystemImage,
    featured: true,
    active: true,
    highlight: 'STEM Certified'
  },
  {
    id: 'exp-ocean-rift',
    slug: 'ocean-rift-vr',
    title: 'Ocean Rift',
    category: 'educational',
    tagline: 'Dive deep into ocean depths and discover marine life in stunning underwater environments.',
    description: 'Dive deep into ocean depths and discover marine life in stunning underwater environments. Swim with dolphins, manta rays, sea turtles, and prehistoric marine giants.',
    whatYouExperience: [
      'Expansive underwater aquatic safari spanning 12 distinct ecosystems',
      'Swim alongside great white sharks, humpback whales, and bioluminescent creatures',
      'Interactive marine biology educational facts and voice commentary',
      'Calming, serene deep-sea immersion with zero motion discomfort'
    ],
    duration: '15+ Mins',
    ageGroup: 'Ages 4+',
    playerCount: '1 - 2 Players',
    price: '₹300',
    image: oceanRiftImage,
    featured: false,
    active: true,
    highlight: 'Aquatic Safari'
  },
  {
    id: 'exp-mission-iss',
    slug: 'mission-iss-vr',
    title: 'Mission ISS',
    category: 'educational',
    tagline: 'Experience life aboard the International Space Station and explore space like an astronaut.',
    description: 'Experience life aboard the International Space Station and explore space like an astronaut. Float in microgravity, perform spacewalks, and look down at planet Earth 400km below.',
    whatYouExperience: [
      'True-to-life International Space Station modelled with NASA guidance',
      'Microgravity zero-G physics using hand rails and thruster thrusters',
      'Breathtaking EVA spacewalk outside station modules high above Earth',
      'Educational exploration of life support, science modules, and docking'
    ],
    duration: '15+ Mins',
    ageGroup: 'Ages 8+',
    playerCount: '1 - 2 Players',
    price: '₹300',
    image: missionIssImage,
    featured: true,
    active: true,
    highlight: 'Astronaut Experience'
  },
  {
    id: 'exp-anatomy',
    slug: 'anatomy-vr',
    title: 'Anatomy',
    category: 'educational',
    tagline: 'Explore human anatomy in 3D detail. Perfect for educational and medical learning experiences.',
    description: 'Explore human anatomy in 3D detail. Perfect for educational and medical learning experiences. Peel back muscular, skeletal, circulatory, and nervous systems in interactive 3D.',
    whatYouExperience: [
      'Dissect and explore 3D anatomical models of human organs and skeletal systems',
      'Watch a beating heart and blood flow simulation in real-time stereoscopic 3D',
      'Layer-by-layer visibility controls for deep physiological understanding',
      'Unmatched visual learning for students, biology classes, and curious minds'
    ],
    duration: '15+ Mins',
    ageGroup: 'Ages 8+',
    playerCount: '1 - 2 Players',
    price: '₹300',
    image: anatomyImage,
    featured: false,
    active: true,
    highlight: 'Medical & Biology 3D'
  },

  // --- EDUCATIONAL PACKAGE (ALL-IN-ONE) ---
  {
    id: 'exp-educational-stem-pack',
    slug: 'educational-stem-package',
    title: 'All-in-One Educational VR Package',
    category: 'educational-package',
    tagline: 'Comprehensive STEM learning suite combining Astronomy, Marine Biology, Space Station & Human Anatomy.',
    description: 'An all-inclusive educational STEM package designed for schools, science centers, and group workshops. Students experience all 4 premier educational modules: explore celestial planetary orbits in Solar System, dive deep into underwater marine ecosystems in Ocean Rift, float in microgravity on NASA Mission ISS, and dissect human organs in stereoscopic 3D Anatomy.',
    whatYouExperience: [
      'Solar System: True-scale 3D planetary orbits, Saturn rings & celestial mechanics',
      'Ocean Rift: Deep aquatic safari exploring 12 marine ecosystems and ocean giants',
      'Mission ISS: Zero-gravity spacewalk outside the International Space Station',
      'Human Anatomy: Layer-by-layer stereoscopic 3D dissection of organs and skeletal systems',
      'Curriculum-aligned STEM modules facilitated by dedicated educators'
    ],
    duration: '15+ Mins',
    ageGroup: 'Ages 5+',
    playerCount: 'Batch / Multi-Station Rotation',
    price: 'Contact for Quote',
    image: schoolImage,
    featured: true,
    active: true,
    highlight: 'All Educational Modules'
  },

  // --- EVENT PACKAGES (LOCAL ONLY · CONTACT FOR OUTSTATION) ---
  {
    id: 'exp-event-1-station',
    slug: '1-vr-station-setup',
    title: '1 VR Station Event Setup',
    category: 'events',
    tagline: '1 Commercial VR Station with dedicated host. Local only (₹5,999).',
    description: 'Turnkey mobile VR station brought to your birthday party, intimate gathering, or celebration. Includes 1 commercial VR station, safety perimeter mat, spectator screen, and dedicated operator. Local events only. For out of town events, please contact directly.',
    whatYouExperience: [
      '1 Commercial VR Station with high-refresh visuals and haptic controllers',
      '1 Dedicated on-site operator managing games and guest rotations',
      'Crowd spectator display for friends and family to watch live gameplay',
      'Local events only — contact directly for out of town events'
    ],
    duration: '3 Hours',
    ageGroup: 'Ages 4 - 65',
    playerCount: 'Continuous Rotation',
    price: '₹5,999',
    image: eventImage,
    featured: true,
    active: true,
    highlight: 'Local Only (₹5,999)'
  },
  {
    id: 'exp-event-2-stations',
    slug: '2-vr-stations-setup',
    title: '2 VR Stations Event Setup',
    category: 'events',
    tagline: '2 Commercial VR Stations with dedicated host. Local only (₹9,999).',
    description: 'Turnkey mobile VR arena for birthdays, apartment clubhouses, and family carnivals. Includes 2 commercial VR stations operating simultaneously, safety mats, external spectator screens, and dedicated crew. Local events only. For out of town events, please contact directly.',
    whatYouExperience: [
      '2 Commercial VR Stations operating simultaneously with zero queue delay',
      'Dedicated on-site facilitators managing queue and guest onboarding',
      'High-definition crowd spectator displays broadcasting live gameplay',
      'Local events only — contact directly for out of town events'
    ],
    duration: '3 Hours',
    ageGroup: 'Ages 4 - 65',
    playerCount: 'Continuous Rotation',
    price: '₹9,999',
    image: eventImage,
    featured: true,
    active: true,
    highlight: 'Local Only (₹9,999)'
  },
  {
    id: 'exp-event-3-stations',
    slug: '3-vr-stations-setup',
    title: '3 VR Stations Event Setup',
    category: 'events',
    tagline: '3 Commercial VR Stations with dedicated crew. Local only (₹13,499).',
    description: 'High-throughput mobile VR setup for apartment carnivals, housing societies, and school STEM days. 3 simultaneous stations keep large gatherings entertained. Local events only. For out of town events, please contact directly.',
    whatYouExperience: [
      '3 Commercial VR Stations with dedicated safety zones',
      'Trained facilitators handling seamless batch rotations',
      'Multiple spectator screens broadcasting live gameplay',
      'Local events only — contact directly for out of town events'
    ],
    duration: '3 - 4 Hours',
    ageGroup: 'Ages 4 - 65',
    playerCount: 'Continuous Rotation',
    price: '₹13,499',
    image: eventImage,
    featured: false,
    active: true,
    highlight: 'Local Only (₹13,499)'
  },
  {
    id: 'exp-event-4-stations',
    slug: '4-vr-stations-setup',
    title: '4 VR Stations Event Setup',
    category: 'events',
    tagline: '4 Commercial VR Stations with full crew. Local only (₹16,000).',
    description: 'Our ultimate mobile VR arena for large society festivals, school carnivals, and corporate gatherings. 4 commercial stations managed by a full crew. Local events only. For out of town events, please contact directly.',
    whatYouExperience: [
      '4 Commercial VR Stations for maximum guest throughput',
      'Full facilitator team managing queue, fitting, and multiplayer battles',
      'Complete spectator hub with live gameplay broadcast',
      'Local events only — contact directly for out of town events'
    ],
    duration: '4 Hours',
    ageGroup: 'Ages 4 - 65',
    playerCount: 'Continuous Rotation',
    price: '₹16,000',
    image: eventImage,
    featured: true,
    active: true,
    highlight: 'Local Only (₹16,000)'
  }
];

export const INITIAL_PRICING: PricingPlan[] = [
  {
    id: 'price-01',
    title: '360° Adrenaline Ride',
    category: 'individual',
    duration: '5 - 10 Minutes',
    price: '₹100',
    period: 'per ride',
    description: 'Ideal for Roller Coaster, Santa Ride, Henry & high-speed virtual thrills.',
    features: [
      'Choice of any 360° VR experience',
      'High-resolution commercial headset equipment',
      'Full operator guidance & safety brief',
      'Spectator display for friends and family to watch'
    ],
    recommendedFor: 'Quick thrills & first-time riders',
    isPopular: false,
    active: true
  },
  {
    id: 'price-02',
    title: 'Action & Gaming Pass',
    category: 'individual',
    duration: '5 - 10 Minutes',
    price: '₹150',
    period: 'per session',
    description: 'Access to Beat Saber, Iron Man, Richie’s Plank, Boxing, Horror, or Cricket.',
    features: [
      'Choice of any premier VR gaming experience',
      'Precision motion controllers & haptic feedback',
      'Dedicated staff calibration for optimal comfort',
      'Leaderboard entry & performance tracking'
    ],
    recommendedFor: 'Gamers, teens & action lovers',
    isPopular: true,
    active: true
  },
  {
    id: 'price-03',
    title: 'STEM & Educational Deep Dive',
    category: 'individual',
    duration: '15+ Minutes',
    price: '₹300',
    period: 'per session',
    description: 'In-depth simulation of Solar System, Ocean Rift, Mission ISS, or Anatomy.',
    features: [
      'Guided interactive exploration module',
      'Curriculum-aligned science & space content',
      'High-resolution spatial audio & visuals',
      'Suitable for students & curious minds'
    ],
    recommendedFor: 'Students, learners & science enthusiasts',
    isPopular: false,
    active: true
  },
  {
    id: 'price-04',
    title: 'Mobile Event Turnkey Package',
    category: 'events',
    duration: '3+ Hours On-Site',
    price: 'Custom Quote',
    period: 'event setup',
    description: 'We bring commercial VR stations complete with hosts directly to your venue (Local & Outstation).',
    features: [
      '1 to 4 Complete VR Stations with safety perimeter mats',
      'Professional trained operator & safety crew',
      'Crowd spectator TVs for live gameplay broadcast',
      'Setup, tear-down, and queue management included'
    ],
    recommendedFor: 'Birthdays, apartments, schools & fests',
    isPopular: true,
    active: true
  }
];

export const INITIAL_EVENTS: EventPackage[] = [
  {
    id: 'event-school',
    title: 'Schools & STEM Educational Days',
    targetAudience: 'Schools, Science Fairs, Summer Camps & STEM Academies',
    description: 'Bring science textbooks to life. Students walk on the moon, explore virtual biological cells, and discover the solar system with curriculum-aligned interactive modules.',
    setupsIncluded: '2 to 4 VR Stations + Safety Zones',
    spaceRequired: 'Minimum 150 sq ft clean indoor hall or classroom',
    idealDuration: '3 to 6 Hours (50–150 students rotated in batches)',
    features: [
      'Age-appropriate educational catalog vetted for students',
      'Trained educators and safety facilitators managing every session',
      'Trained educators/operators facilitating the sessions',
      'External projection display for collective class viewing'
    ],
    priceStartingAt: '',
    image: schoolImage,
    active: true
  },
  {
    id: 'event-apartment',
    title: 'Apartment Communities & Resident Carnivals',
    targetAudience: 'Gated Communities, Housing Societies & Clubhouse Festivals',
    description: 'Turn your society clubhouse or lawn into an interactive entertainment zone. A high-traction attraction for kids and families during festivals, sports days, or weekend carnivals.',
    setupsIncluded: '2 to 3 VR Stations + Safety Mats',
    spaceRequired: 'Clubhouse activity room or covered canopy area',
    idealDuration: '4 to 8 Hours (continuous queue handling)',
    features: [
      'Queue ticketing system to prevent crowding',
      'Wide mix of casual, rhythm, sports, and roller coaster rides',
      'Safe perimeter management with safety stanchions',
      'Independent power backup support available'
    ],
    priceStartingAt: '',
    image: eventImage,
    active: true
  },
  {
    id: 'event-birthday',
    title: 'Private Birthdays & Milestone Parties',
    targetAudience: 'Kids Birthdays, Teen Celebrations & Private Gatherings',
    description: 'Give the guest of honor an unforgettable celebration. Turn any living room, terrace, or banquet hall into an instant futuristic VR arena with zero stress for the hosts.',
    setupsIncluded: '1 to 2 VR Stations with dedicated party host',
    spaceRequired: '10x10 ft clear floor space',
    idealDuration: '2 to 3 Hours',
    features: [
      'Curated game playlist chosen with birthday child',
      'Dedicated host managing games and keeping kids engaged',
      'Special multiplayer tournament with digital certificates',
      'Quick 20-minute setup before guests arrive'
    ],
    priceStartingAt: '',
    image: beatSaberImage,
    active: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Beat Saber Rhythm Battle',
    category: 'vr',
    image: beatSaberImage,
    caption: 'Player slicing rhythm blocks in full neon virtual arena.',
    date: 'February 2026'
  },
  {
    id: 'gal-02',
    title: 'Iron Man Flight Simulator',
    category: 'players',
    image: ironManImage,
    caption: 'Soaring high with repulsor hand thrusters in VR combat.',
    date: 'January 2026'
  },
  {
    id: 'gal-03',
    title: 'Jurassic Park Dinosaur Safari',
    category: 'vr',
    image: jurassicParkImage,
    caption: 'Facing a life-sized Tyrannosaurus Rex in deep primeval jungle.',
    date: 'March 2026'
  },
  {
    id: 'gal-04',
    title: "Richie's Plank Vertigo Walk",
    category: 'setups',
    image: richiesPlankImage,
    caption: 'Testing courage 80 storeys above city traffic on a narrow plank.',
    date: 'February 2026'
  },
  {
    id: 'gal-05',
    title: 'Solar System Planetary Orbit',
    category: 'school',
    image: solarSystemImage,
    caption: 'Interactive space exploration of planets, rings, and stars.',
    date: 'December 2025'
  },
  {
    id: 'gal-06',
    title: 'Roller Coaster 360 Experience',
    category: 'apartments',
    image: rollerCoasterImage,
    caption: 'Full 360-degree high-velocity rollercoaster ride.',
    date: 'January 2026'
  }
];

export const INITIAL_OFFERS: Offer[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Rajesh Varma',
    role: 'Society Event Coordinator',
    organization: 'Vijayawada Residents Association',
    quote: 'PDVR Gaming set up VR zones for our community festival. Over 150 kids and adults tried Roller Coaster and Beat Saber. The seamless queue management and courteous staff made it a super hit.',
    eventType: 'Community Carnival',
    active: true
  },
  {
    id: 'test-02',
    name: 'Lakshmi Prasanna',
    role: 'School Coordinator',
    organization: 'Vijayawada High School',
    quote: 'The Solar System and Ocean Rift simulations gave our students an unforgettable practical view of science. The team handled batch transitions smoothly without disturbing regular classes.',
    eventType: 'School STEM Day',
    active: true
  },
  {
    id: 'test-03',
    name: 'Karthik Naidu',
    role: 'Parent',
    organization: 'Private Birthday Celebration',
    quote: 'Booked PDVR Gaming for my son’s 12th birthday in Vijayawada. Richie’s Plank and Cricket VR kept all the kids cheering and laughing the whole evening!',
    eventType: 'Birthday Party',
    active: true
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  businessName: 'PDVR Gaming',
  brandTagline: 'Virtual Reality Gaming Experience',
  email: 'gamingpdvr@gmail.com',
  phone: '+91 9133020759',
  whatsapp: '919133020759',
  location: 'Vijayawada, Andhra Pradesh',
  openingHours: '8 AM to 10 PM',
  instagram: 'https://instagram.com/pdvrgaming',
  facebook: 'https://facebook.com/pdvrgaming',
  youtube: 'https://youtube.com/@pdvrgaming',
  heroHeadline: 'Step Into Virtual Reality',
  heroSubheadline: 'Experience immersive VR gaming with our premium collection of virtual reality games. From thrilling adventures to educational experiences, dive into worlds beyond imagination.'
};

export const INITIAL_ENQUIRIES: BookingEnquiry[] = [
  {
    id: 'enq-101',
    createdAt: '2026-03-21T14:30:00.000Z',
    name: 'Suresh Kumar',
    email: 'suresh.kumar@gmail.com',
    phone: '+91 9133020759',
    serviceType: 'event',
    experienceOrEventId: 'event-apartment',
    date: '2026-04-12',
    timeSlot: '16:00 - 20:00',
    playerCount: 80,
    locationDetails: 'Vijayawada Clubhouse',
    notes: 'Need 2 VR headsets for society summer carnival.',
    status: 'new'
  }
];
