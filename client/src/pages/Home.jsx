import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  Award,
  Users,
  Star,
  ArrowRight,
  ChevronDown,
  Check,
  Send,
  Mountain,
  Binoculars,
  Landmark,
  Ship,
  Snowflake,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { Button, Input, Card, Badge, TourCardSkeleton, Modal } from '../components/common';
import TourCard from '../components/tours/TourCard';
import tourService from '../services/tourService';
import { MOCK_TOURS, MOCK_CATEGORIES, MOCK_REVIEWS, MOCK_BLOG_POSTS, MOCK_STATS } from '../data/mockTours';
import { useToast } from '../context/ToastContext';

export const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Search Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);

  // 3D Motion and Interactive Perspective State
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Framer Motion Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
      },
    },
  };

  // Blog Article Modal State
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Backend Data Integration
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [stats, setStats] = useState({
    totalTours: 8,
    totalCountries: 18,
    verifiedExplorers: 2450,
    avgRating: 4.94,
    satisfactionRate: '99.4%'
  });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Smooth 3D tilt angles between -6deg and +6deg
    const rotateY = Number(((x / (rect.width / 2)) * 6).toFixed(2));
    const rotateX = Number((-(y / (rect.height / 2)) * 6).toFixed(2));
    setHeroTilt({ x: rotateX, y: rotateY });
  };

  const handleHeroMouseLeave = () => {
    setIsHoveringHero(false);
    setHeroTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        const [featuredResult, statsResult] = await Promise.allSettled([
          tourService.getFeaturedTours(),
          tourService.getPublicStats()
        ]);

        if (isMounted) {
          if (featuredResult.status === 'fulfilled' && featuredResult.value && featuredResult.value.length > 0) {
            setFeaturedTours(featuredResult.value);
          } else {
            setFeaturedTours(MOCK_TOURS.filter((t) => t.isFeatured).slice(0, 4));
          }

          if (statsResult.status === 'fulfilled' && statsResult.value) {
            setStats(statsResult.value);
          }
          setIsLoadingTours(false);
        }
      } catch (err) {
        if (isMounted) {
          setFeaturedTours(MOCK_TOURS.filter((t) => t.isFeatured).slice(0, 4));
          setIsLoadingTours(false);
        }
      }
    };
    fetchHomeData();
    return () => { isMounted = false; };
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedBudget) params.set('maxPrice', selectedBudget);
    navigate(`/explore?${params.toString()}`);
  };

  const faqs = [
    {
      q: 'How does booking an expedition through RoamVista work?',
      a: 'Browse our catalog of destinations, review the day-by-day itinerary, select your preferred departure date, and place an instant reservation request. Your assigned concierge verifies local lodge allocations and confirms your spot within 24 hours.'
    },
    {
      q: 'What is the group size limit on RoamVista journeys?',
      a: 'We cap our departures at 8 to 12 travelers. Small groups protect fragile alpine and wildlife ecosystems, avoid crowded tourism footprints, and ensure personalized guidance from certified expedition leaders.'
    },
    {
      q: 'Are custom dates or private departures available?',
      a: 'Yes. Any itinerary can be chartered privately for families or private travel groups with customized start dates and tailored activity intensity. Contact our concierge via the Contact page.'
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: 'Reservations can be rescheduled or refunded up to 60 days before the scheduled departure date without cancellation penalties. We also provide full expedition escrow protection.'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. CINEMATIC 3D MOTION & FRAMER MOTION EXPEDITION HERO */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={handleHeroMouseLeave}
        className="relative h-[78vh] min-h-[620px] max-h-[760px] w-full flex items-center justify-center overflow-hidden perspective-1500 cursor-default"
      >
        {/* 3D Motion Depth Container */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out preserve-3d"
          style={{
            transform: `rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
          }}
        >
          {/* Background Cinematic Motion Video */}
          <div className="absolute -inset-10 z-0 overflow-hidden bg-[#0C1210]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover scale-110 pointer-events-none"
              style={{
                transform: `translate3d(${-heroTilt.y * 3.5}px, ${heroTilt.x * 3.5}px, -40px)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <source src="https://storage.googleapis.com/cloud-samples-data/generative-ai/evaluation/videos/mountain.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Gradient Vignette Overlay for Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1210] via-[#0C1210]/55 to-[#0C1210]/35 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0C1210]/20 to-[#0C1210]/80 pointer-events-none" />
          </div>

          {/* 3D Glowing Ambient Light Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-500/15 blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl pointer-events-none animate-float-delayed" />
        </div>

        {/* Hero Central Content with Framer Motion Staggered Transitions */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sand-50 space-y-6"
          style={{
            transform: `translate3d(${heroTilt.y * 1.5}px, ${-heroTilt.x * 1.5}px, 35px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Micro Top Badge */}
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-accent-300 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-400 animate-pulse" />
            <span>Curated Small-Group Expeditions for 2026 & 2027</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.08] drop-shadow-md"
          >
            Extraordinary Journeys <br className="hidden sm:inline" />
            <span className="italic font-normal text-accent-300">for the Discerning Explorer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItemVariants}
            className="max-w-2xl mx-auto text-xs sm:text-sm text-sand-200 font-light leading-relaxed drop-shadow"
          >
            Pioneering thoughtful, small-group adventures and transformative cultural journeys across seven continents, accompanied by certified field leaders.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/explore">
                <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/experiences">
                <Button variant="outline" size="md" className="border-white/40 text-sand-50 bg-white/10 hover:bg-white/20 backdrop-blur-md font-semibold">
                  Discover Experiences
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Functional Destination Search Bar with Framer Motion Hover Elevation */}
          <motion.form
            variants={heroItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onSubmit={handleHeroSearch}
            className="max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-darkSurface-800/95 backdrop-blur-md shadow-2xl border border-sand-200/50 dark:border-darkSurface-700 text-sand-900 dark:text-sand-100 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left mt-6 hover:shadow-accent-500/10 transition-shadow"
          >
            {/* Destination Input */}
            <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-sand-100/60 dark:bg-darkSurface-900 border border-sand-200/80 dark:border-darkSurface-700/80">
              <label className="text-[10px] font-bold uppercase tracking-wider text-sand-500">Destination</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Where to? (e.g. Patagonia)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none placeholder:text-sand-400 font-medium text-sand-800 dark:text-sand-100"
                />
              </div>
            </div>

            {/* Travel Experience Style */}
            <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-sand-100/60 dark:bg-darkSurface-900 border border-sand-200/80 dark:border-darkSurface-700/80">
              <label className="text-[10px] font-bold uppercase tracking-wider text-sand-500">Experience</label>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by travel experience"
                  className="bg-transparent text-xs w-full focus:outline-none text-sand-800 dark:text-sand-100 font-medium cursor-pointer"
                >
                  <option value="" className="text-sand-900">All Experiences</option>
                  <option value="Alpine Trekking" className="text-sand-900">Alpine Trekking</option>
                  <option value="Wildlife Safari" className="text-sand-900">Wildlife Safari</option>
                  <option value="Cultural Heritage" className="text-sand-900">Cultural Heritage</option>
                  <option value="Coastal Sailing" className="text-sand-900">Coastal Sailing</option>
                  <option value="Arctic Expedition" className="text-sand-900">Arctic Expedition</option>
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-sand-100/60 dark:bg-darkSurface-900 border border-sand-200/80 dark:border-darkSurface-700/80">
              <label className="text-[10px] font-bold uppercase tracking-wider text-sand-500">Max Budget</label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  aria-label="Filter by maximum budget"
                  className="bg-transparent text-xs w-full focus:outline-none text-sand-800 dark:text-sand-100 font-medium cursor-pointer"
                >
                  <option value="" className="text-sand-900">Any Budget</option>
                  <option value="3500" className="text-sand-900">Up to $3,500</option>
                  <option value="5000" className="text-sand-900">Up to $5,000</option>
                  <option value="7000" className="text-sand-900">Up to $7,000</option>
                </select>
              </div>
            </div>

            {/* Search Submit */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              className="h-full py-3 shadow-md hover:shadow-lg"
              icon={<Search className="w-4 h-4" />}
            >
              Find Journeys
            </Button>
          </motion.form>
        </motion.div>
      </section>

      {/* 2. PLATFORM IMPACT & VERIFIED METRICS (Dynamic Backend Statistics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="rounded-3xl p-6 sm:p-8 bg-white/95 dark:bg-darkSurface-800/95 backdrop-blur-xl border border-sand-200/80 dark:border-darkSurface-700/80 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-sand-200/60 dark:divide-darkSurface-700/60 text-center">
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-600 dark:text-accent-400">
                {stats.totalTours ? `${stats.totalTours}+` : '8+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-sand-800 dark:text-sand-100 mt-1">
                Curated Expeditions
              </span>
              <span className="text-[10px] text-sand-500 dark:text-sand-400 mt-0.5">
                Vetted by alpine masters
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-600 dark:text-accent-400">
                {stats.totalCountries ? `${stats.totalCountries}+` : '18+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-sand-800 dark:text-sand-100 mt-1">
                Wilderness Regions
              </span>
              <span className="text-[10px] text-sand-500 dark:text-sand-400 mt-0.5">
                Across 7 continents
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-600 dark:text-accent-400">
                {stats.verifiedExplorers ? `${stats.verifiedExplorers.toLocaleString()}+` : '2,450+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-sand-800 dark:text-sand-100 mt-1">
                Verified Travelers
              </span>
              <span className="text-[10px] text-sand-500 dark:text-sand-400 mt-0.5">
                Intimate small groups
              </span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-600 dark:text-accent-400 flex items-center justify-center gap-1">
                {stats.avgRating || '4.94'} <span className="text-xl text-accent-500">★</span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-sand-800 dark:text-sand-100 mt-1">
                Explorer Rating
              </span>
              <span className="text-[10px] text-sand-500 dark:text-sand-400 mt-0.5">
                {stats.satisfactionRate || '99.4%'} positive feedback
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS (Editorial 4-Cards Desktop Grid) */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
              Curated Departures
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50 mt-1">
              Featured Global Expeditions
            </h2>
            <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 mt-1 max-w-xl">
              Hand-picked journeys with limited departures, boutique accommodations, and certified regional leaders.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              View All Expeditions
            </Button>
          </Link>
        </div>

        {/* 4 Cards Desktop Grid with Loading Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoadingTours ? (
            <>
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
            </>
          ) : (
            featuredTours.map((tour) => (
              <TourCard key={tour._id || tour.id} tour={tour} />
            ))
          )}
        </div>
      </section>

      {/* 4. TRAVEL EXPERIENCES / CATEGORIES */}
      <section id="experiences" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
              Tailored Themes
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50 mt-1">
              Travel Experiences
            </h2>
            <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 mt-1 max-w-xl">
              Whether your passion lies in high-alpine summits, private coastal yachting, or wildlife tracking, find your ideal expedition style.
            </p>
          </div>
          <Link to="/experiences">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              Explore All Themes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/experiences?theme=${encodeURIComponent(cat.name)}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-editorial hover:shadow-editorial-hover transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1210] via-[#0C1210]/40 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-sand-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-300 mb-1">
                  {cat.count} Itineraries
                </span>
                <h3 className="text-base font-serif font-bold group-hover:text-accent-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-sand-300 line-clamp-2 mt-1 font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. WHY ROAMVISTA / VALUE PROPOSITION */}
      <section className="bg-sand-100/70 dark:bg-darkSurface-800 py-16 border-y border-sand-200/80 dark:border-darkSurface-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
              The RoamVista Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 leading-relaxed">
              We eliminate the compromises of mass tourism through thoughtful curation, small groups, and unwavering ethical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card padding="p-6" className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-sand-900 dark:text-sand-100">Intimate Small Groups</h3>
              <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
                Strict limit of 8–12 guests per departure. Unhurried access to fragile landscapes and secluded boutique lodges without crowds.
              </p>
            </Card>

            <Card padding="p-6" className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-accent-100 dark:bg-accent-950/60 text-accent-700 dark:text-accent-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-sand-900 dark:text-sand-100">Certified Regional Masters</h3>
              <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
                Every trek is guided by certified UIAGM alpine leaders or resident naturalists with decades of documented field experience.
              </p>
            </Card>

            <Card padding="p-6" className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-earth-100 dark:bg-earth-950/60 text-earth-600 dark:text-earth-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-sand-900 dark:text-sand-100">Carbon-Neutral Expeditions</h3>
              <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
                Every departure offsets 100% of emissions through verified habitat restoration partnerships and local community stewardship.
              </p>
            </Card>

            <Card padding="p-6" className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-sand-900 dark:text-sand-100">Dedicated Concierge</h3>
              <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
                From pre-trip gear recommendations to airport transfers and satellite communications on remote trails, safety is paramount.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Authentic 4-Step Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
            Transparent Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50">
            How RoamVista Works
          </h2>
          <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400">
            From initial exploration to standing atop majestic glacial ridges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-3 p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial">
            <div className="w-10 h-10 rounded-full bg-primary-600 text-sand-50 font-serif font-bold text-base flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="text-sm font-bold text-sand-950 dark:text-sand-50 font-serif">Discover Itineraries</h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
              Filter by duration, geography, activity level, or travel style to find your ideal expedition.
            </p>
          </div>

          <div className="text-center space-y-3 p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial">
            <div className="w-10 h-10 rounded-full bg-accent-400 text-primary-950 font-serif font-bold text-base flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="text-sm font-bold text-sand-950 dark:text-sand-50 font-serif">Review Specifications</h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
              Inspect comprehensive day-by-day itineraries, lodging standards, and gear checklists.
            </p>
          </div>

          <div className="text-center space-y-3 p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial">
            <div className="w-10 h-10 rounded-full bg-earth-500 text-white font-serif font-bold text-base flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-sm font-bold text-sand-950 dark:text-sand-50 font-serif">Reserve Confidently</h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
              Book securely with verified dates, traveler escrow protection, and flexible cancellation terms.
            </p>
          </div>

          <div className="text-center space-y-3 p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial">
            <div className="w-10 h-10 rounded-full bg-primary-700 text-sand-50 font-serif font-bold text-base flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="text-sm font-bold text-sand-950 dark:text-sand-50 font-serif">Embark on Journey</h3>
            <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light">
              Arrive at the destination airport where your lead guide and private transport meet you.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TRAVEL INSPIRATION / JOURNAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
              Field Dispatch
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50 mt-1">
              Travel Inspiration & Field Notes
            </h2>
            <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 mt-1 max-w-xl">
              Authentic articles on packing strategies, regional biodiversity, and cultural etiquette.
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              Read All Journal Entries
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedBlogPost(post)}
              className="cursor-pointer"
            >
              <Card padding="p-0" hoverEffect={true} className="overflow-hidden flex flex-col group h-full">
                <div className="h-48 w-full overflow-hidden bg-sand-200 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-950/80 backdrop-blur-md text-sand-50 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-accent-400" />
                    <span>Read Article</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-sand-500 mb-2">
                      <Badge variant="primary" size="sm">{post.category}</Badge>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-sand-950 dark:text-sand-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-sand-600 dark:text-sand-400 mt-2 line-clamp-2 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between text-[11px] text-sand-500">
                    <span className="font-semibold text-sand-700 dark:text-sand-300">{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Full Article Reading Modal for Home Blog Dispatches */}
      {selectedBlogPost && (
        <Modal
          isOpen={!!selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          title={selectedBlogPost.title}
          description={`${selectedBlogPost.category} · ${selectedBlogPost.readTime} · By ${selectedBlogPost.author}`}
          size="lg"
        >
          <div className="space-y-6 text-sand-900 dark:text-sand-100 max-h-[75vh] overflow-y-auto pr-1">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-sand-200 shadow-md">
              <img
                src={selectedBlogPost.image}
                alt={selectedBlogPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sand-50 text-xs">
                <span className="font-semibold text-accent-300">{selectedBlogPost.author}</span>
                <span>{selectedBlogPost.date}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-sand-700 dark:text-sand-300 font-light">
              {selectedBlogPost.content ? (
                selectedBlogPost.content.map((paragraph, idx) => (
                  <p key={idx} className="first:text-sm sm:first:text-base first:font-normal first:text-sand-900 dark:first:text-sand-100">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{selectedBlogPost.excerpt}</p>
              )}
            </div>

            {selectedBlogPost.proTip && (
              <div className="p-4 sm:p-5 rounded-2xl bg-sand-100/80 dark:bg-darkSurface-900 border border-accent-400/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">
                  <Sparkles className="w-4 h-4 text-accent-500" />
                  <span>Field Leader Dispatch Note</span>
                </div>
                <p className="text-xs text-sand-700 dark:text-sand-300 italic leading-relaxed font-serif">
                  "{selectedBlogPost.proTip}"
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex flex-wrap items-center justify-between gap-3">
              <Link to="/explore" onClick={() => setSelectedBlogPost(null)}>
                <Button variant="primary" size="sm" icon={<Compass className="w-4 h-4" />}>
                  Explore Expeditions
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedBlogPost(null)}>
                Close Dispatch
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 7. VERIFIED TRAVELER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
            Explorer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50">
            Feedback from Fellow Travelers
          </h2>
          <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400">
            Genuine accounts from travelers who recently journeyed with RoamVista.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <Card key={rev.id} padding="p-6" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-accent-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-sand-400">{rev.date}</span>
                </div>
                <p className="text-xs text-sand-700 dark:text-sand-300 leading-relaxed italic font-serif text-sm">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-sand-900 dark:text-sand-100">{rev.author}</h4>
                  <p className="text-[10px] text-sand-400">{rev.location}</p>
                  <p className="text-[10px] font-semibold text-primary-600 dark:text-primary-400 truncate max-w-[180px]">{rev.tourTitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
            Need Guidance?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sand-950 dark:text-sand-50">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400">
            Clear information about reservations, gear requirements, and safety protocols.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-sand-200/80 dark:border-darkSurface-700/80 bg-white dark:bg-darkSurface-800 overflow-hidden transition-colors"
            >
              <button
                type="button"
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-sand-900 dark:text-sand-100 focus:outline-none"
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-sand-400 shrink-0 transition-transform duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-primary-500' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-sand-600 dark:text-sand-300 leading-relaxed border-t border-sand-100 dark:border-darkSurface-700/60 pt-3 font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-sand-50 shadow-editorial">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-300">
              The Next Frontier
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Ready to Explore the World’s Last Great Wildernesses?
            </h2>
            <p className="text-xs sm:text-sm text-sand-200 leading-relaxed font-light">
              Speak with our expedition advisors to tailor your upcoming departures, reserve private departures, or receive our print dispatch catalog.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/explore">
                <Button variant="secondary" size="md">
                  Explore Destinations
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md" className="border-white/30 text-sand-50 hover:bg-white/10">
                  Contact Concierge Desk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
