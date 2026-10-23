import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Clock
} from 'lucide-react';
import { Button, Input, Card, Badge } from '../components/common';
import TourCard from '../components/tours/TourCard';
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

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedBudget) params.set('maxPrice', selectedBudget);
    navigate(`/explore?${params.toString()}`);
  };

  const featuredTours = MOCK_TOURS.filter((t) => t.isFeatured).slice(0, 4);

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
      {/* 1. CINEMATIC HERO (Within 60-70% Viewport Height Target) */}
      <section className="relative h-[68vh] min-h-[540px] max-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Editorial Background Image with Subtle Depth */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Patagonia Wilderness Mountain Vista"
            className="w-full h-full object-cover scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1210] via-[#0C1210]/45 to-[#0C1210]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sand-50 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-accent-300">
            <Sparkles className="w-3.5 h-3.5 text-accent-400" />
            <span>Curated Small-Group Expeditions for 2026 & 2027</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.08]">
            Extraordinary Journeys <br className="hidden sm:inline" />
            <span className="italic font-normal text-accent-300">for the Discerning Explorer</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-sand-200 font-light leading-relaxed">
            Pioneering thoughtful, small-group adventures and transformative cultural journeys across seven continents, accompanied by certified field leaders.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/explore">
              <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/explore?category=Cultural+Heritage">
              <Button variant="outline" size="md" className="border-white/30 text-sand-50 hover:bg-white/10">
                Discover Experiences
              </Button>
            </Link>
          </div>

          {/* Functional Destination Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-darkSurface-800/95 backdrop-blur-md shadow-2xl border border-sand-200/50 dark:border-darkSurface-700 text-sand-900 dark:text-sand-100 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left mt-6"
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
              className="h-full py-3"
              icon={<Search className="w-4 h-4" />}
            >
              Find Journeys
            </Button>
          </form>
        </div>
      </section>

      {/* 2. FEATURED DESTINATIONS (Editorial 4-Cards Desktop Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        {/* 4 Cards Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      {/* 3. TRAVEL EXPERIENCES / CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
          <Link to="/explore">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              Explore All Themes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
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
            <Card key={post.id} padding="p-0" hoverEffect={true} className="overflow-hidden flex flex-col group">
              <div className="h-48 w-full overflow-hidden bg-sand-200">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
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
          ))}
        </div>
      </section>

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
