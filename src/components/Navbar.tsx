import React from 'react';
import { MapPin, Plus, Heart, Eye, Sun, Moon, Volume2, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenAccessibility: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  highContrast: boolean;
  locationsCount: number;
  activeTab: string;
  setActiveTab: (tab: 'map' | 'list' | 'lost' | 'volunteer') => void;
  onAudioSpeakHero: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenAccessibility,
  darkMode,
  setDarkMode,
  highContrast,
  locationsCount,
  activeTab,
  setActiveTab,
  onAudioSpeakHero
}) => {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      highContrast 
        ? 'bg-black text-yellow-300 border-yellow-400' 
        : darkMode 
          ? 'bg-slate-900/90 text-white border-slate-800' 
          : 'bg-white/90 text-slate-900 border-slate-200/80'
    }`}>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Heart className="w-4 h-4 fill-white animate-pulse" />
        <span><strong>MehrMap</strong> — O‘zbekistondagi barcha ijtimoiy yordam, bepul xizmatlar va inkluziv maskanlar yagona xaritada!</span>
        <button 
          onClick={onAudioSpeakHero}
          title="Ovozli eshitish" 
          className="ml-2 p-1 hover:bg-white/20 rounded-full transition-all focus:ring-2 focus:ring-white"
          aria-label="Loyihani ovozli eshitish"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('map')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white transform hover:scale-105 transition-all">
            <MapPin className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                MehrMap
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                O‘zbekiston
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {locationsCount} ta tasdiqlangan yordam maskani va e'lonlar
            </p>
          </div>
        </div>

        {/* Center Tabs */}
        <nav className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            🗺️ Xarita
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            📋 Ro‘yxat
          </button>
          <button
            onClick={() => setActiveTab('lost')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'lost'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            🔎 Yo‘qotilganlar
          </button>
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'volunteer'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            🤝 Ko‘ngillilik
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Accessibility drawer toggle button */}
          <button
            onClick={onOpenAccessibility}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Maxsus imkoniyatlar / Inkluziv sozlamalar"
            aria-label="Inkluziv sozlamalarni ochish"
          >
            <Eye className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="hidden md:inline">♿️ Imkoniyatlar</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Mavzuni almashtirish"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Add Post Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transform active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>E’lon Qo‘shish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
