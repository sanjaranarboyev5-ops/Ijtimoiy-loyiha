import React from 'react';
import type { HelpLocation } from '../types';
import { CATEGORIES } from '../data/categories';
import { MapPin, Phone, Star, ShieldCheck, Clock, Navigation, Accessibility, ChevronRight } from 'lucide-react';

interface LocationCardProps {
  location: HelpLocation;
  onClick: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onClick }) => {
  const category = CATEGORIES.find(c => c.id === location.categoryId);

  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Image Header */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img
            src={location.imageUrl}
            alt={location.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Badges Top */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className={`px-2.5 py-1 rounded-xl text-xs font-black backdrop-blur-md border ${
              category?.badgeBg || 'bg-slate-900/80 text-white border-white/20'
            }`}>
              {category?.badgeText || location.subcategory}
            </span>

            {location.priceType === 'Bepul' && (
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-black bg-emerald-500 text-white shadow-md">
                🆓 BEPUL
              </span>
            )}
          </div>

          {location.verified && (
            <div className="absolute top-3 right-3 bg-emerald-500/90 text-white p-1 rounded-full shadow-md" title="Tasdiqlangan ijtimoiy maskan">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}

          {/* Title on Image bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-base font-bold line-clamp-1 group-hover:text-emerald-300 transition-colors drop-shadow-md">
              {location.title}
            </h3>
            <p className="text-slate-300 text-xs flex items-center gap-1 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{location.city} • {location.address}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Subcategory & Price */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
              {location.subcategory}
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              {location.priceType}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {location.description}
          </p>

          {/* Accessibility Tag if applicable */}
          {location.isAccessible && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 p-2 rounded-xl border border-teal-200 dark:border-teal-800/60">
              <Accessibility className="w-3.5 h-3.5 text-teal-600" />
              <span className="line-clamp-1">♿️ Inkluziv: {location.accessibilityFeatures.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info & Button */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{location.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({location.reviewsCount})</span>
          </div>
          <div className="text-slate-400 text-[11px] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{location.workingHours.split('(')[0]}</span>
          </div>
        </div>

        <button className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          <span>Batafsil</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
