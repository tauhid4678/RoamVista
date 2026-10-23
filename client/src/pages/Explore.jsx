import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { Button, Input, Card, Badge, Skeleton, TourCardSkeleton } from '../components/common';
import TourCard from '../components/tours/TourCard';
import tourService from '../services/tourService';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state from URL query or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '7000');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || 'All');
  const [duration, setDuration] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [tours, setTours] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Sync state with URL params
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) setCategory(urlCategory);
    const urlSearch = searchParams.get('search');
    if (urlSearch) setSearchTerm(urlSearch);
    const urlMaxPrice = searchParams.get('maxPrice');
    if (urlMaxPrice) setMaxPrice(urlMaxPrice);
  }, [searchParams]);

  // Fetch from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      setIsLoading(true);
      try {
        const queryParams = {
          search: searchTerm || undefined,
          category: category !== 'All' ? category : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          minRating: minRating !== 'All' ? Number(minRating) : undefined,
          duration: duration !== 'All' ? duration : undefined,
          sort: sortBy,
          page: currentPage,
          limit: 8,
        };

        const res = await tourService.getTours(queryParams);
        if (isMounted && res.data) {
          setTours(res.data);
          setTotalCount(res.total || res.data.length);
          setTotalPages(res.totalPages || Math.ceil(res.data.length / 8) || 1);
        }
      } catch (err) {
        console.error('Error fetching expeditions:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, category, maxPrice, minRating, duration, sortBy, currentPage]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setMaxPrice('7000');
    setMinRating('All');
    setDuration('All');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const categories = ['All', 'Alpine Trekking', 'Wildlife Safari', 'Cultural Heritage', 'Coastal Sailing', 'Arctic Expedition'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-luxury text-accent-600 dark:text-accent-400">
          Global Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-sand-950 dark:text-sand-50">
          Explore Handcrafted Expeditions
        </h1>
        <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 max-w-2xl font-light">
          Search and filter across our verified wilderness itineraries, cultural journeys, and oceanic voyages.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial space-y-4">
        {/* Top Search & Reset Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-3">
            <Input
              id="explore-search"
              placeholder="Search by destination name, country, or keyword..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              fullWidth
              size="md"
              onClick={handleResetFilters}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-sand-200/80 dark:border-darkSurface-700/80 text-xs">
          {/* 1. Category */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sand-800 dark:text-sand-200">Expedition Style</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50/70 dark:bg-darkSurface-900 text-sand-900 dark:text-sand-100 focus:outline-none focus:border-primary-500 font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 2. Max Price Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between font-semibold text-sand-800 dark:text-sand-200">
              <span>Max Budget</span>
              <span className="text-primary-600 dark:text-primary-400 font-bold">${Number(maxPrice).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2500"
              max="7000"
              step="250"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="mt-2 accent-primary-600 cursor-pointer w-full"
            />
          </div>

          {/* 3. Duration */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sand-800 dark:text-sand-200">Duration Range</label>
            <select
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50/70 dark:bg-darkSurface-900 text-sand-900 dark:text-sand-100 focus:outline-none focus:border-primary-500 font-medium"
            >
              <option value="All">All Durations</option>
              <option value="short">1 - 7 Days (Short Expeditions)</option>
              <option value="medium">8 - 10 Days (Standard Journeys)</option>
              <option value="long">11+ Days (Extended Traverses)</option>
            </select>
          </div>

          {/* 4. Minimum Rating */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sand-800 dark:text-sand-200">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50/70 dark:bg-darkSurface-900 text-sand-900 dark:text-sand-100 focus:outline-none focus:border-primary-500 font-medium"
            >
              <option value="All">All Ratings</option>
              <option value="4.9">4.9+ Stars (Exceptional)</option>
              <option value="4.8">4.8+ Stars (Superb)</option>
              <option value="4.5">4.5+ Stars (Great)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <p className="text-sand-600 dark:text-sand-400">
          Showing <span className="font-bold text-sand-900 dark:text-sand-100">{totalCount}</span> expeditions matching your criteria
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sand-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-white dark:bg-darkSurface-800 text-sand-800 dark:text-sand-200 focus:outline-none focus:border-primary-500 font-semibold"
          >
            <option value="featured">Featured / Staff Choice</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Trip Duration</option>
          </select>
        </div>
      </div>

      {/* Tours Grid (Strictly 4 Cards Per Row on Desktop) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TourCardSkeleton />
          <TourCardSkeleton />
          <TourCardSkeleton />
          <TourCardSkeleton />
        </div>
      ) : tours.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 space-y-4 shadow-editorial">
          <Compass className="w-12 h-12 text-sand-400 mx-auto opacity-50" />
          <h3 className="text-base font-serif font-bold text-sand-900 dark:text-sand-100">No Expeditions Match These Criteria</h3>
          <p className="text-xs text-sand-500 max-w-sm mx-auto font-light">
            Try adjusting your budget slider, selecting 'All Experiences', or clearing specific keywords.
          </p>
          <Button variant="primary" size="sm" onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id || tour._id} tour={tour} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between">
          <span className="text-xs text-sand-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((p) => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
