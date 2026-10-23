import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  Shield,
  Star,
  Check,
  X as CloseIcon,
  ChevronRight,
  Calendar,
  Share2,
  Heart,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Button, Badge, Card, Modal, Input } from '../components/common';
import TourCard from '../components/tours/TourCard';
import tourService from '../services/tourService';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_TOURS } from '../data/mockTours';

export const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  const [tour, setTour] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  const [isBooked, setIsBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load tour data
  useEffect(() => {
    let isMounted = true;
    const fetchTour = async () => {
      setIsLoading(true);
      try {
        const data = await tourService.getTourById(id);
        if (isMounted) {
          setTour(data);
          setActiveImage(0);
        }
      } catch (err) {
        console.error('Failed to load tour details:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchTour();
    return () => { isMounted = false; };
  }, [id]);

  if (isLoading || !tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <Compass className="w-10 h-10 text-primary-500 animate-spin mx-auto" />
        <p className="text-xs text-sand-500">Loading expedition field briefing...</p>
      </div>
    );
  }

  const relatedTours = MOCK_TOURS.filter((t) => t.id !== tour.id && (t.category === tour.category || t.isFeatured)).slice(0, 4);
  const totalPrice = tour.price * guestsCount;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooked(true);

    try {
      if (isAuthenticated) {
        await api.post('/bookings', {
          tourId: tour._id || tour.id,
          departureDate: selectedDate,
          guests: guestsCount,
          contactName: user?.name,
          contactEmail: user?.email,
        });
      }
      toast.success(`Reservation confirmed for ${guestsCount} travelers on ${selectedDate}!`);
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setIsBooked(false);
        navigate(isAuthenticated ? '/dashboard' : '/login');
      }, 1200);
    } catch {
      toast.success(`Reservation request noted for ${selectedDate}.`);
      setIsBookingModalOpen(false);
      setIsBooked(false);
    }
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    toast.info(!isSaved ? 'Added expedition to your wishlist.' : 'Removed from wishlist.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-sand-500">
        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/explore" className="hover:text-primary-600 transition-colors">Expeditions</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-sand-900 dark:text-sand-100 font-semibold truncate">{tour.title}</span>
      </nav>

      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">{tour.category}</Badge>
            <div className="flex items-center gap-1 text-xs font-semibold text-accent-500">
              <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
              <span>{tour.rating}</span>
              <span className="text-sand-400 font-normal">({tour.reviewsCount} verified reviews)</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-sand-950 dark:text-sand-50">
            {tour.title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-sand-500">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span>{tour.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />}
            onClick={handleSaveToggle}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Share2 className="w-4 h-4" />}
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast.success('Expedition link copied to clipboard!');
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Media Section: Multi-Image Gallery */}
      <div className="space-y-4">
        {/* Main View */}
        <div className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-editorial bg-sand-200 dark:bg-darkSurface-900">
          <img
            src={tour.gallery?.[activeImage] || tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>

        {/* Thumbnails */}
        {tour.gallery && tour.gallery.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {tour.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx
                    ? 'border-primary-500 scale-[0.98] shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Specifications vs Sticky Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial text-xs">
            <div className="space-y-1">
              <span className="text-sand-400 block font-semibold">Duration</span>
              <p className="font-extrabold text-sand-950 dark:text-sand-50 text-sm font-serif">{tour.durationDays} Days / {tour.durationDays - 1} Nights</p>
            </div>
            <div className="space-y-1">
              <span className="text-sand-400 block font-semibold">Group Size</span>
              <p className="font-extrabold text-sand-950 dark:text-sand-50 text-sm font-serif">Max {tour.maxGroupSize} Guests</p>
            </div>
            <div className="space-y-1">
              <span className="text-sand-400 block font-semibold">Activity Level</span>
              <p className="font-extrabold text-sand-950 dark:text-sand-50 text-sm font-serif">{tour.difficulty}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sand-400 block font-semibold">Language</span>
              <p className="font-extrabold text-sand-950 dark:text-sand-50 text-sm font-serif">English, Local</p>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-sand-950 dark:text-sand-50">Expedition Overview</h2>
            <p className="text-sm text-sand-700 dark:text-sand-300 leading-relaxed font-light">
              {tour.description}
            </p>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-sand-950 dark:text-sand-50">Expedition Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sand-100/60 dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 text-xs text-sand-800 dark:text-sand-200">
                    <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-sand-950 dark:text-sand-50">Daily Field Itinerary</h2>
              <div className="space-y-3">
                {tour.itinerary.map((step) => (
                  <div
                    key={step.day}
                    className="p-5 rounded-2xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold text-[11px]">
                        Day {step.day}
                      </span>
                      <h3 className="text-sm font-bold font-serif text-sand-900 dark:text-sand-100">{step.title}</h3>
                    </div>
                    <p className="text-xs text-sand-600 dark:text-sand-400 leading-relaxed font-light pl-1">
                      {step.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-sand-200/80 dark:border-darkSurface-700/80">
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-sand-900 dark:text-sand-100 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>What’s Included</span>
              </h3>
              <ul className="space-y-2 text-xs text-sand-600 dark:text-sand-400 font-light">
                {tour.inclusions?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-sand-900 dark:text-sand-100 flex items-center gap-2">
                <CloseIcon className="w-4 h-4 text-rose-500" />
                <span>What’s Excluded</span>
              </h3>
              <ul className="space-y-2 text-xs text-sand-600 dark:text-sand-400 font-light">
                {tour.exclusions?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Reservation Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-darkSurface-800 border border-sand-200/80 dark:border-darkSurface-700/80 shadow-editorial space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-400 tracking-wider">Per Person</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-serif font-bold text-sand-950 dark:text-sand-50">
                  ${tour.price.toLocaleString()}
                </span>
                <span className="text-xs text-sand-500">/ explorer</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-sand-800 dark:text-sand-200">Departure Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50 dark:bg-darkSurface-900 text-sand-900 dark:text-sand-100 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-sand-800 dark:text-sand-200">
                  <span>Travelers</span>
                  <span>{guestsCount} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={guestsCount <= 1}
                    onClick={() => setGuestsCount((g) => g - 1)}
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center font-bold text-sm text-sand-900 dark:text-sand-100">
                    {guestsCount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={guestsCount >= (tour.maxGroupSize || 10)}
                    onClick={() => setGuestsCount((g) => g + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-sand-200/80 dark:border-darkSurface-700/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-sand-500">
                  <span>${tour.price.toLocaleString()} × {guestsCount} travelers</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sand-500">
                  <span>Wilderness Conservation Escrow</span>
                  <span className="text-emerald-600 font-semibold">Included</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-sand-950 dark:text-sand-50 pt-2 border-t border-sand-200/80 dark:border-darkSurface-700/80 font-serif">
                  <span>Total Escrow Investment</span>
                  <span className="text-primary-700 dark:text-primary-400 font-bold text-base">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Reserve Departure
            </Button>

            <p className="text-[11px] text-center text-sand-400 font-light">
              Zero cancellation fee up to 60 days prior to departure.
            </p>
          </div>
        </div>
      </div>

      {/* Related Expeditions */}
      <div className="pt-12 border-t border-sand-200/80 dark:border-darkSurface-700/80 space-y-6">
        <h2 className="text-3xl font-serif font-bold text-sand-950 dark:text-sand-50">Related Expeditions You May Love</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTours.map((t) => (
            <TourCard key={t.id || t._id} tour={t} />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Confirm Your Expedition Reservation"
        description={`Reserving departure for ${tour.title}`}
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="p-4 rounded-xl bg-sand-100/60 dark:bg-darkSurface-900 border border-sand-200 dark:border-darkSurface-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-sand-500">Selected Departure Date:</span>
              <span className="font-bold text-sand-900 dark:text-sand-100">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-500">Number of Travelers:</span>
              <span className="font-bold text-sand-900 dark:text-sand-100">{guestsCount} Guests</span>
            </div>
            <div className="flex justify-between border-t border-sand-200 dark:border-darkSurface-700 pt-2 font-bold text-sm">
              <span>Total Price:</span>
              <span className="text-primary-600 font-extrabold">${totalPrice.toLocaleString()} USD</span>
            </div>
          </div>

          <Input
            id="modal-name"
            label="Lead Traveler Full Name"
            placeholder="e.g. Elena Rostova"
            defaultValue={isAuthenticated ? user?.name : ""}
            required
          />

          <Input
            id="modal-email"
            type="email"
            label="Confirmation Email"
            placeholder="e.g. elena@example.com"
            defaultValue={isAuthenticated ? user?.email : ""}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsBookingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isBooked}>
              Confirm & Book
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DestinationDetails;
