import React, { useState } from 'react';
import type { LostItem } from '../types';
import { INITIAL_LOST_ITEMS } from '../data/lostFoundData';
import { Search, Plus, MapPin, Phone, Calendar, Tag, ShieldAlert, CheckCircle, Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LostFoundBoard: React.FC = () => {
  const [items, setItems] = useState<LostItem[]>(() => {
    const saved = localStorage.getItem('mehrmap_lost_items');
    return saved ? JSON.parse(saved) : INITIAL_LOST_ITEMS;
  });

  const [activeType, setActiveType] = useState<'all' | 'yoqotilgan' | 'topilgan'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lost Item Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'yoqotilgan' | 'topilgan'>('yoqotilgan');
  const [category, setCategory] = useState<LostItem['category']>('Hujjat');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('Toshkent shahri');
  const [description, setDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('+998 ');
  const [reward, setReward] = useState('');

  const filteredItems = items.filter(item => {
    if (activeType !== 'all' && item.type !== activeType) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddLostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !contactPhone.trim()) return;

    const newItem: LostItem = {
      id: 'lost-' + Date.now(),
      title: title.trim(),
      type,
      category,
      location: location.trim(),
      city,
      date: new Date().toISOString().split('T')[0],
      description: description.trim(),
      contactName: contactName.trim() || 'E’lon muallifi',
      contactPhone: contactPhone.trim(),
      reward: reward.trim() || undefined,
      status: 'Aktiv'
    };

    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('mehrmap_lost_items', JSON.stringify(updated));
    confetti({ particleCount: 50, spread: 60 });
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            🔎 Buyumlar Doskasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Yo‘qotilgan va Topilgan Buyumlar Yagona Markazi
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
            Pasport, talabalik guvohnomasi, kalitlar, telefon yoki yo‘qolgan uy hayvoningizni bir joydan izlang va e’lon bering!
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-cyan-900 hover:bg-cyan-50 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yo‘qotilgan / Topilgan E’lon Berish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Type tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setActiveType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeType === 'all'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600'
            }`}
          >
            Barchasi ({items.length})
          </button>
          <button
            onClick={() => setActiveType('yoqotilgan')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeType === 'yoqotilgan'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
            }`}
          >
            🚨 Yo‘qotilganlar ({items.filter(i => i.type === 'yoqotilgan').length})
          </button>
          <button
            onClick={() => setActiveType('topilgan')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeType === 'topilgan'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
            }`}
          >
            ✅ Topilganlar ({items.filter(i => i.type === 'topilgan').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Nomi, turi yoki manzildan izlash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Grid of Lost & Found Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card top badge */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  item.type === 'yoqotilgan'
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                }`}>
                  {item.type === 'yoqotilgan' ? '🚨 Yo‘qotilgan' : '✅ Topib olindi'}
                </span>

                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>

              {/* Title & category */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                  {item.title}
                </h3>
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Kategoriya: {item.category}
                </span>
              </div>

              {/* Location */}
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{item.city}, {item.location}</span>
              </p>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              {/* Reward if any */}
              {item.reward && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mukofot: {item.reward}</span>
                </div>
              )}
            </div>

            {/* Contact Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {item.contactName}
              </span>

              <a
                href={`tel:${item.contactPhone}`}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Bog‘lanish</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding Lost Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                Yo‘qotilgan yoki Topilgan Buyum E’lonini Berish
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLostItem} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('yoqotilgan')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    type === 'yoqotilgan' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  🚨 Yo‘qotdim
                </button>
                <button
                  type="button"
                  onClick={() => setType('topilgan')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    type === 'topilgan' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  ✅ Topib oldim
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">E’lon sarlavhasi: *</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Qizil jildli Pasport va Talabalik kartasi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kategoriya:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    <option value="Hujjat">Hujjat</option>
                    <option value="Kalit / Qimmatbaho">Kalit / Qimmatbaho</option>
                    <option value="Uy hayvoni">Uy hayvoni</option>
                    <option value="Telefon / Texnika">Telefon / Texnika</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Joy va Manzil: *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chilonzor metro bekati"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Batafsil ma'lumot:</label>
                <textarea
                  rows={2}
                  placeholder="Buyum belgilari, yo'qolgan/topilgan vaqti..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ismingiz:</label>
                  <input
                    type="text"
                    placeholder="Anvar"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Telefon: *</label>
                  <input
                    type="text"
                    required
                    placeholder="+998 90 123-45-67"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs shadow-md"
                >
                  E’lonni Chop Etish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
