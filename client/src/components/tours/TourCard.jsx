import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Card, Badge, Button } from '../common';

export const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const tourId = tour.id || tour._id;

  return (
    <div
      onClick={() => navigate(`/tours/${tourId}`)}
      className="group bg-white dark:bg-darkSurface-800 border border-sand-200/90 dark:border-darkSurface-700/80 rounded-2xl overflow-hidden flex flex-col h-[490px] shadow-editorial hover:shadow-editorial-hover transition-all duration-300 cursor-pointer"
    >
      {/* Editorial Image Frame */}
      <div className="relative h-56 w-full overflow-hidden bg-sand-200 dark:bg-darkSurface-900">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Cinematic gradient overlays for contrast and luxury look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

        {/* Top-Left: Featured Status (Only if featured, golden luxury pill) */}
        {tour.isFeatured && (
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-950/25 border border-amber-300/40 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-200 fill-amber-200 shrink-0" />
            <span>Featured</span>
          </div>
        )}

        {/* Top-Right: Rating & Reviews pill with dark glassmorphism */}
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-950/80 backdrop-blur-md border border-white/20 text-sand-50 text-xs font-semibold shadow-lg">
          <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400 shrink-0" />
          <span>{tour.rating}</span>
          <span className="text-[10px] text-sand-300/90 font-normal">({tour.reviewsCount})</span>
        </div>

        {/* Bottom-Left: Category Tag (Clean frosted glass pill) */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide bg-white/95 dark:bg-darkSurface-900/95 text-primary-950 dark:text-primary-100 shadow-md backdrop-blur-md border border-white/60 dark:border-darkSurface-700">
            {tour.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-sand-500 dark:text-sand-400 mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>

          {/* Title with Editorial Serif */}
          <h3 className="text-lg font-serif font-bold text-sand-950 dark:text-sand-50 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {tour.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-sand-600 dark:text-sand-400 mt-2 line-clamp-2 leading-relaxed">
            {tour.summary}
          </p>

          {/* Metadata */}
          <div className="mt-4 pt-3 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between text-xs text-sand-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sand-400" />
              <span>{tour.durationDays} Days</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-sand-400" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-md bg-sand-100 dark:bg-darkSurface-700 text-[11px] font-medium text-sand-700 dark:text-sand-300">
                {tour.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-sand-400 tracking-wider">Per Person</span>
            <p className="text-base font-extrabold text-sand-900 dark:text-sand-50">
              ${tour.price.toLocaleString()}
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/tours/${tourId}`);
            }}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
