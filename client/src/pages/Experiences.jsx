import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Compass,
  Mountain,
  Binoculars,
  Landmark,
  Ship,
  Snowflake,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Button, Badge, Card, TourCardSkeleton } from '../components/common';
import TourCard from '../components/tours/TourCard';
import tourService from '../services/tourService';
import { MOCK_CATEGORIES, MOCK_TOURS } from '../data/mockTours';

const THEME_DETAILS = {
  'Alpine Trekking': {
    icon: Mountain,
    badge: 'High Altitude & Glacier Traversing',
    subtitle: 'Challenging footpaths through ancient moraines, blue ice fields, and towering granite massifs.',
    highlights: [
      'Private UIAGM-certified alpine guides with satellite rescue beacons',
      'Small group departures strictly capped at 8 to 10 trekkers',
      'High-altitude boutique eco-domes and authentic mountain chalets',
      'Complete technical safety gear including crampons and harnesses provided'
    ],
    season: 'November to March (Southern Hemisphere) / June to September (Alps)',
    intensity: 'Moderate to Strenuous'
  },
  'Wildlife Safari': {
    icon: Binoculars,
    badge: 'Big Five & Migration Tracking',
    subtitle: 'Ethical small-footprint tracking across boundless golden savannas with resident naturalist biologists.',
    highlights: [
      'Custom open-sided 4x4 safari vehicles with guaranteed unobstructed window seating',
      'Sunrise hot air balloon safaris over migrating wildebeest herds',
      'Mobile canvas luxury camps that migrate in tandem with wildlife patterns',
      'Carbon-neutral game drives with zero harassment of wildlife corridors'
    ],
    season: 'Year-Round (Optimal river crossings July to October)',
    intensity: 'Easy to Moderate'
  },
  'Cultural Heritage': {
    icon: Landmark,
    badge: 'Ancient Traditions & Living History',
    subtitle: 'Intimate immersion into imperial dynasties, sacred temple sanctums, and timeless artisanal philosophies.',
    highlights: [
      'Private after-hours admissions to UNESCO World Heritage temple sanctuaries',
      'Exclusive tea master ceremonies and meditation with resident Zen abbots',
      'Overnight stays in centuries-old timber ryokans and heritage palace suites',
      'Multi-course kaiseki banquets crafted with seasonal regional ingredients'
    ],
    season: 'March to May (Spring Cherry Blossoms) & October to November (Autumn Foliage)',
    intensity: 'Easy Walking'
  },
  'Coastal Sailing': {
    icon: Ship,
    badge: 'Private Catamarans & Secluded Coves',
    subtitle: 'Sail past pastel cliffside ports, anchor in azure grottoes, and dine on fresh Mediterranean seafood.',
    highlights: [
      'Private chartered 50ft luxury catamarans with licensed master skippers',
      'Secluded anchorage away from cruise ship harbors and commercial crowds',
      'On-board private chef preparing freshly landed seafood and regional wines',
      'Snorkeling gear, sea kayaks, and tender boat excursions included'
    ],
    season: 'May to October (Warm Mediterranean sailing breezes)',
    intensity: 'Relaxed & Active Leisure'
  },
  'Arctic Expedition': {
    icon: Snowflake,
    badge: 'Polar Wilderness & Aurora Borealis',
    subtitle: 'Traverse glacial fjords, witness midnight sun and polar lights, and track muskoxen across silent tundras.',
    highlights: [
      'Ice-strengthened expedition vessels and husky dog-sledding expeditions',
      'Optimal viewing locations for active Aurora Borealis displays',
      'Expert lectures from resident glaciologists and polar historians',
      'High-spec extreme weather parkas and polar boots provided on arrival'
    ],
    season: 'September to March (Northern Lights) / June to August (Midnight Sun)',
    intensity: 'Moderate Active'
  }
};

export const Experiences = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTheme = searchParams.get('theme') || 'Alpine Trekking';

  const [activeTheme, setActiveTheme] = useState(initialTheme);
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync theme when search parameter changes
  useEffect(() => {
    const urlTheme = searchParams.get('theme');
    if (urlTheme && THEME_DETAILS[urlTheme]) {
      setActiveTheme(urlTheme);
    }
  }, [searchParams]);

  // Load tours for the selected experience style
  useEffect(() => {
    let isMounted = true;
    const fetchThemedTours = async () => {
      setIsLoading(true);
      try {
        const response = await tourService.getTours({ category: activeTheme, limit: 8 });
        if (isMounted) {
          if (response && response.data && response.data.length > 0) {
            setTours(response.data);
          } else {
            // Graceful fallback to mock tours matching category
            const fallback = MOCK_TOURS.filter((t) => t.category === activeTheme);
            setTours(fallback.length > 0 ? fallback : MOCK_TOURS.slice(0, 4));
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const fallback = MOCK_TOURS.filter((t) => t.category === activeTheme);
          setTours(fallback.length > 0 ? fallback : MOCK_TOURS.slice(0, 4));
          setIsLoading(false);
        }
      }
    };

    fetchThemedTours();
    return () => { isMounted = false; };
  }, [activeTheme]);

  const handleSelectTheme = (themeName) => {
    setActiveTheme(themeName);
    setSearchParams({ theme: themeName });
  };

  const themeInfo = THEME_DETAILS[activeTheme] || THEME_DETAILS['Alpine Trekking'];
  const IconComponent = themeInfo.icon;

  return (
    <div className="space-y-16 pb-24">
      {/* Editorial Header */}
      <section className="bg-sand-100/70 dark:bg-darkSurface-900 border-b border-sand-200/80 dark:border-darkSurface-700/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-100 dark:bg-accent-950/60 border border-accent-300/40 text-accent-800 dark:text-accent-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>Curated Expedition Styles & Travel Philosophies</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-sand-950 dark:text-sand-50 tracking-tight">
            Extraordinary Travel Experiences
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-sand-600 dark:text-sand-300 font-light leading-relaxed">
            Every traveler seeks a unique cadence of exploration. Whether your soul is summoned by jagged alpine spires, silent Zen rock gardens, or the primal thunder of the Serengeti migration, explore our handcrafted expedition styles below.
          </p>

          {/* Experience Theme Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {Object.keys(THEME_DETAILS).map((themeName) => {
              const ThemeIcon = THEME_DETAILS[themeName].icon;
              const isActive = activeTheme === themeName;
              return (
                <button
                  key={themeName}
                  type="button"
                  onClick={() => handleSelectTheme(themeName)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-primary-700 text-sand-50 ring-2 ring-primary-500/50 shadow-md scale-105'
                      : 'bg-white dark:bg-darkSurface-800 text-sand-700 dark:text-sand-300 hover:bg-sand-200/80 dark:hover:bg-darkSurface-700 border border-sand-200/80 dark:border-darkSurface-700'
                  }`}
                >
                  <ThemeIcon className={`w-4 h-4 ${isActive ? 'text-accent-300' : 'text-primary-600 dark:text-accent-400'}`} />
                  <span>{themeName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Experience Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-accent-400 flex items-center justify-center shrink-0 shadow-inner">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
                  {themeInfo.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sand-950 dark:text-sand-50 mt-1">
                  {activeTheme}
                </h2>
                <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 mt-1 max-w-xl font-light">
                  {themeInfo.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-sand-100 dark:bg-darkSurface-900 border border-sand-200 dark:border-darkSurface-700">
                <span className="text-[10px] font-bold uppercase text-sand-400 block">Prime Season</span>
                <span className="font-semibold text-sand-800 dark:text-sand-200">{themeInfo.season}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-sand-100 dark:bg-darkSurface-900 border border-sand-200 dark:border-darkSurface-700">
                <span className="text-[10px] font-bold uppercase text-sand-400 block">Activity Intensity</span>
                <span className="font-semibold text-primary-700 dark:text-accent-400">{themeInfo.intensity}</span>
              </div>
            </div>
          </div>

          {/* Distinctive Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {themeInfo.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-sand-50/80 dark:bg-darkSurface-900/60 border border-sand-200/60 dark:border-darkSurface-700/60 text-xs text-sand-700 dark:text-sand-300 leading-relaxed font-light"
              >
                <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-accent-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themed Itineraries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-sand-950 dark:text-sand-50">
              Active Departures for {activeTheme}
            </h3>
            <p className="text-xs text-sand-500 mt-0.5">
              Limited small-group allocations with verified dates and master field guides.
            </p>
          </div>
          <Link to={`/explore?category=${encodeURIComponent(activeTheme)}`}>
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              View in Main Catalog
            </Button>
          </Link>
        </div>

        {/* 4 Cards Desktop Grid with Skeleton Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
            </>
          ) : tours.length === 0 ? (
            <div className="col-span-full py-12 text-center space-y-3">
              <Compass className="w-8 h-8 text-sand-400 mx-auto" />
              <p className="text-sm font-semibold text-sand-700 dark:text-sand-300">
                No active public departures currently scheduled for {activeTheme}.
              </p>
              <Link to="/explore">
                <Button variant="primary" size="sm">
                  Browse All Destinations
                </Button>
              </Link>
            </div>
          ) : (
            tours.map((tour) => (
              <TourCard key={tour._id || tour.id} tour={tour} />
            ))
          )}
        </div>
      </section>

      {/* Bespoke Private Departures Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-sand-50 shadow-editorial flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-300">
              Private Expedition Charters
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Looking for a Customized {activeTheme} Departure?
            </h3>
            <p className="text-xs text-sand-200 leading-relaxed font-light">
              Our concierge desk designs bespoke, private departures for families and exclusive groups with tailored daily intensity, private transport, and dedicated field naturalists.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="secondary" size="md">
              Inquire with Concierge
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Experiences;
