import React from 'react';
import type { FilterState } from '../types';
import { CITIES } from '../data/categories';
import { Search, MapPin, Accessibility, CheckCircle2, DollarSign, SlidersHorizontal } from 'lucide-react';

interface FilterToolbarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filterState,
  setFilterState,
  resultCount
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search & City */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Qidirish (Nomi, xizmat turi, manzil, telefon...)"
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Region/City Dropdown */}
          <div className="relative min-w-[160px]">
            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
            <select
              value={filterState.city}
              onChange={(e) => setFilterState(prev => ({ ...prev, city: e.target.value }))}
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {/* ♿️ Accessibility toggle */}
          <label className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
            filterState.onlyAccessible
              ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/30'
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}>
            <input
              type="checkbox"
              checked={filterState.onlyAccessible}
              onChange={(e) => setFilterState(prev => ({ ...prev, onlyAccessible: e.target.checked }))}
              className="sr-only"
            />
            <Accessibility className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>♿️ Faqat Inkluziv</span>
          </label>

          {/* 🆓 Only Free toggle */}
          <label className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
            filterState.onlyFree
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}>
            <input
              type="checkbox"
              checked={filterState.onlyFree}
              onChange={(e) => setFilterState(prev => ({ ...prev, onlyFree: e.target.checked }))}
              className="sr-only"
            />
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>🆓 Faqat BEPUL</span>
          </label>

          {/* Sort By */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-slate-700 dark:text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer pr-2"
            >
              <option value="recommended">Tavsiya etilgan</option>
              <option value="rating">Reytingi baland</option>
              <option value="newest">Yangi qo‘shilgan</option>
            </select>
          </div>

          <span className="text-slate-400 text-xs ml-1 hidden lg:inline">
            ({resultCount} natija)
          </span>
        </div>
      </div>
    </div>
  );
};
