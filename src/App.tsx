import React, { useState, useEffect, useMemo } from 'react';
import type { HelpLocation, FilterState, Review, CategoryId } from './types';
import { INITIAL_LOCATIONS } from './data/initialLocations';
import { CATEGORIES } from './data/categories';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { FilterToolbar } from './components/FilterToolbar';
import { MapView } from './components/MapView';
import { LocationCard } from './components/LocationCard';
import { LocationDetailModal } from './components/LocationDetailModal';
import { AddLocationModal } from './components/AddLocationModal';
import { LostFoundBoard } from './components/LostFoundBoard';
import { VolunteerHub } from './components/VolunteerHub';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Heart, ShieldCheck, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export function App() {
  // Theme & Accessibility States
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);

  // App Main State
  const [locations, setLocations] = useState<HelpLocation[]>(() => {
    const saved = localStorage.getItem('mehrmap_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'lost' | 'volunteer'>('map');
  const [selectedLocation, setSelectedLocation] = useState<HelpLocation | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAccessibility, setShowAccessibility] = useState<boolean>(false);

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    categoryId: 'all',
    city: 'Barcha viloyatlar',
    searchQuery: '',
    onlyFree: false,
    onlyAccessible: false,
    priceType: 'all',
    sortBy: 'recommended'
  });

  // Save locations to localStorage
  useEffect(() => {
    localStorage.setItem('mehrmap_locations', JSON.stringify(locations));
  }, [locations]);

  // Dark mode & contrast class sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(c => { counts[c.id] = 0; });
    locations.forEach(loc => {
      if (counts[loc.categoryId] !== undefined) {
        counts[loc.categoryId]++;
      }
    });
    return counts;
  }, [locations]);

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      // Category Filter
      if (filterState.categoryId !== 'all' && loc.categoryId !== filterState.categoryId) {
        return false;
      }
      // City Filter
      if (filterState.city !== 'Barcha viloyatlar' && loc.city !== filterState.city) {
        return false;
      }
      // Only Free Filter
      if (filterState.onlyFree && loc.priceType !== 'Bepul' && loc.priceType !== 'Beg\'araz') {
        return false;
      }
      // Only Accessible Filter
      if (filterState.onlyAccessible && !loc.isAccessible) {
        return false;
      }
      // Search Query
      if (filterState.searchQuery.trim() !== '') {
        const q = filterState.searchQuery.toLowerCase();
        const matchesTitle = loc.title.toLowerCase().includes(q);
        const matchesAddress = loc.address.toLowerCase().includes(q);
        const matchesSubcat = loc.subcategory.toLowerCase().includes(q);
        const matchesDesc = loc.description.toLowerCase().includes(q);
        const matchesPhone = loc.phone.includes(q);
        return matchesTitle || matchesAddress || matchesSubcat || matchesDesc || matchesPhone;
      }
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filterState.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0; // recommended default
    });
  }, [locations, filterState]);

  // Add Location handler
  const handleAddLocation = (newLoc: HelpLocation) => {
    const updated = [newLoc, ...locations];
    setLocations(updated);
  };

  // Add Review handler
  const handleAddReview = (locationId: string, review: Review) => {
    const updated = locations.map(loc => {
      if (loc.id === locationId) {
        const updatedReviews = [review, ...loc.reviews];
        const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        const newLoc = {
          ...loc,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: Number(avgRating.toFixed(1))
        };
        setSelectedLocation(newLoc);
        return newLoc;
      }
      return loc;
    });
    setLocations(updated);
  };

  // Read aloud page summary using SpeechSynthesis
  const handleAudioSpeakHero = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `MehrMap platformasiga xush kelibsiz. MehrMap barcha ijtimoiy yordam turlarini bitta xaritada birlashtiradi. Talabalar uchun arzon kvartira, bepul ovqat tarqatish joylari, kam ta'minlangan oilalarga bepul kiyim va bepul tibbiy xizmatlarni osongina toping.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'uz-UZ';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-[110%]';
    if (fontSize === 'xlarge') return 'text-[125%]';
    return '';
  };

  return (
    <div className={`min-h-screen transition-colors ${getFontSizeClass()} ${
      highContrast
        ? 'bg-black text-yellow-300'
        : 'bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans'
    }`}>
      {/* Navbar */}
      <Navbar
        onOpenAddModal={() => setShowAddModal(true)}
        onOpenAccessibility={() => setShowAccessibility(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        highContrast={highContrast}
        locationsCount={locations.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAudioSpeakHero={handleAudioSpeakHero}
      />

      {/* Main Tabs Content */}
      {activeTab === 'map' && (
        <main className="flex flex-col">
          <CategoryBar
            selectedCategory={filterState.categoryId}
            onSelectCategory={(id) => setFilterState(prev => ({ ...prev, categoryId: id }))}
            categoryCounts={categoryCounts}
          />
          <FilterToolbar
            filterState={filterState}
            setFilterState={setFilterState}
            resultCount={filteredLocations.length}
          />
          <MapView
            locations={filteredLocations}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            selectedLocation={selectedLocation}
          />
        </main>
      )}

      {activeTab === 'list' && (
        <main className="pb-16 space-y-6">
          {/* Hero Problem-Solution Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white py-10 px-4 sm:px-8 border-b border-emerald-700/50 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  MehrMap Loyihasi Nega Kerak?
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Barcha Ijtimoiy Yordamlar — Bitta Ishonchli Platformada!
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  Ma'lumotlar turli joylarda tarqalib ketganligi sababli, odamlar o‘ziga kerakli yordamni topishda qiynalishadi. 
                  <strong> MehrMap</strong> barcha xizmatlarni birlashtirdi: bepul ovqat, arzon kvartira, dori-darmon va inkluziv markazlar.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> 10 ta maxsus kategoriya
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> Tasdiqlangan manzillar
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> ♿️ 100% Inkluziv filtrlash
                  </div>
                </div>
              </div>

              <div className="shrink-0 relative w-full md:w-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="/images/mehrmap_hero_banner_1791555467477.jpg"
                  alt="MehrMap Banner"
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>
          </div>

          <CategoryBar
            selectedCategory={filterState.categoryId}
            onSelectCategory={(id) => setFilterState(prev => ({ ...prev, categoryId: id }))}
            categoryCounts={categoryCounts}
          />
          <FilterToolbar
            filterState={filterState}
            setFilterState={setFilterState}
            resultCount={filteredLocations.length}
          />

          {/* Location Cards Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredLocations.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-4xl">🔍</p>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Ushbu mezonlar bo‘yicha hechnarsa topilmadi
                </h3>
                <p className="text-xs text-slate-400">
                  Filtrlarni tozalab ko‘ring yoki yangi e’lon qo‘shing.
                </p>
                <button
                  onClick={() => setFilterState({
                    categoryId: 'all',
                    city: 'Barcha viloyatlar',
                    searchQuery: '',
                    onlyFree: false,
                    onlyAccessible: false,
                    priceType: 'all',
                    sortBy: 'recommended'
                  })}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Filtrlarni Qayta Tiklash
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map((loc) => (
                  <LocationCard
                    key={loc.id}
                    location={loc}
                    onClick={() => setSelectedLocation(loc)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {activeTab === 'lost' && <LostFoundBoard />}

      {activeTab === 'volunteer' && <VolunteerHub />}

      {/* Modals & Panels */}
      <LocationDetailModal
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
        onAddReview={handleAddReview}
      />

      {showAddModal && (
        <AddLocationModal
          onClose={() => setShowAddModal(false)}
          onAddLocation={handleAddLocation}
        />
      )}

      <AccessibilityPanel
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
        dyslexicFont={dyslexicFont}
        setDyslexicFont={setDyslexicFont}
        onReadPageSummary={handleAudioSpeakHero}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="font-bold text-slate-200">MehrMap Loyihasi</span>
            <span>— Beg'araz va Xayriya Ijtimoiy Portali</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>© 2026 MehrMap. Barqaror Rivojlanish va Ijtimoiy Yordam.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
