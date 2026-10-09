import React from 'react';
import { CATEGORIES } from '../data/categories';
import type { CategoryId } from '../types';
import { 
  Home, Utensils, Shirt, Stethoscope, BookOpen, 
  Briefcase, HeartHandshake, Dog, Search, Accessibility, Grid
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      case 'Stethoscope': return <Stethoscope className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4" />;
      case 'Dog': return <Dog className="w-4 h-4" />;
      case 'Search': return <Search className="w-4 h-4" />;
      case 'Accessibility': return <Accessibility className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  const totalCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-md scale-[1.02]'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Barcha Kategoriya</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
            selectedCategory === 'all'
              ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}>
            {totalCount}
          </span>
        </button>

        {/* 10 Individual Categories */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/90 hover:bg-slate-100 dark:hover:bg-slate-700/70'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}>
                {getIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                isSelected 
                  ? 'bg-white/25 text-white' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
