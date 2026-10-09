import React, { useState } from 'react';
import type { HelpLocation, CategoryId } from '../types';
import { CATEGORIES, CITIES } from '../data/categories';
import { X, MapPin, CheckCircle, Plus, Sparkles, Accessibility } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddLocationModalProps {
  onClose: () => void;
  onAddLocation: (location: HelpLocation) => void;
}

export const AddLocationModal: React.FC<AddLocationModalProps> = ({ onClose, onAddLocation }) => {
  const [categoryId, setCategoryId] = useState<CategoryId>('talabalar');
  const [subcategory, setSubcategory] = useState(CATEGORIES[0].subcategories[0]);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState(CITIES[1]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [telegram, setTelegram] = useState('');
  const [workingHours, setWorkingHours] = useState('09:00 - 18:00');
  const [priceType, setPriceType] = useState<HelpLocation['priceType']>('Bepul');
  const [priceDescription, setPriceDescription] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAccessible, setIsAccessible] = useState(true);
  const [accessibilityFeatures, setAccessibilityFeatures] = useState<string[]>(['Pandus bor']);

  // Coordinates (Default Tashkent or user location)
  const [lat, setLat] = useState(41.2995);
  const [lng, setLng] = useState(69.2401);

  const activeCategoryObj = CATEGORIES.find(c => c.id === categoryId);

  const handleCategoryChange = (id: CategoryId) => {
    setCategoryId(id);
    const cat = CATEGORIES.find(c => c.id === id);
    if (cat && cat.subcategories.length > 0) {
      setSubcategory(cat.subcategories[0]);
    }
  };

  const handleAccessibilityToggle = (feat: string) => {
    if (accessibilityFeatures.includes(feat)) {
      setAccessibilityFeatures(accessibilityFeatures.filter(f => f !== feat));
    } else {
      setAccessibilityFeatures([...accessibilityFeatures, feat]);
    }
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(Number(pos.coords.latitude.toFixed(4)));
        setLng(Number(pos.coords.longitude.toFixed(4)));
        alert('Joylashuvingiz koordinatalari olindi!');
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim() || !phone.trim() || !description.trim()) {
      alert('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
      return;
    }

    const newLoc: HelpLocation = {
      id: 'custom-loc-' + Date.now(),
      title: title.trim(),
      categoryId,
      subcategory,
      organization: organization.trim() || undefined,
      address: address.trim(),
      city,
      lat,
      lng,
      phone: phone.trim(),
      telegram: telegram.trim() || undefined,
      workingHours: workingHours.trim() || '09:00 - 18:00',
      priceType,
      priceDescription: priceDescription.trim() || undefined,
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      isAccessible,
      accessibilityFeatures: isAccessible ? accessibilityFeatures : [],
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: 'r-init',
          userName: 'MehrMap Volontyori',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Yangi ijtimoiy maskan muvaffaqiyatli qo‘shildi.'
        }
      ],
      verified: true,
      createdAt: new Date().toISOString().split('T')[0],
      postedBy: 'Foydalanuvchi'
    };

    onAddLocation(newLoc);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-t-3xl flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="text-lg font-black tracking-tight">Yangi Yordam Nuqtasi / E’lon Qo‘shish</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category picker */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-2">
              1. Kategoriyani Tanlang: *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2 ${
                    categoryId === cat.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{cat.badgeText.split(' ')[0]}</span>
                  <span className="line-clamp-1">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          {activeCategoryObj && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Yo‘nalish (Subkategoriya):
              </label>
              <div className="flex flex-wrap gap-2">
                {activeCategoryObj.subcategories.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      subcategory === sub
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Title & Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                E’lon Nomi / Maskan Nomi: *
              </label>
              <input
                type="text"
                required
                placeholder="masalan: Talabalar uchun arzon kvartira"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tashkilot yoki E’lon muallifi:
              </label>
              <input
                type="text"
                placeholder="masalan: Saxovat Volontyorlari"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* City & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Viloyat / Shahar: *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-emerald-500"
              >
                {CITIES.filter(c => c !== 'Barcha viloyatlar').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Aniq Manzil: *
              </label>
              <input
                type="text"
                required
                placeholder="masalan: Chilonzor 5-mavze, 12-uy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Phone & Telegram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bog‘lanish Telefoni: *
              </label>
              <input
                type="text"
                required
                placeholder="+998 90 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telegram User (ixtiyoriy):
              </label>
              <input
                type="text"
                placeholder="masalan: @yordam_admin"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Price Type & Working hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Xizmat Narxi Turi: *
              </label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Bepul">🆓 BEPUL</option>
                <option value="Beg'araz">🤝 Beg‘araz (Xayriya)</option>
                <option value="Arzon / Subsidiyalangan">🏷️ Arzon / Subsidiyalangan</option>
                <option value="Homiylik">🎁 Homiylik</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ish Vaqti:
              </label>
              <input
                type="text"
                placeholder="09:00 - 18:00 (Har kuni)"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Batafsil Izoh va Shartlar: *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Yordam turi, xizmat shartlari, kimlar murojaat qilishi mumkinligi haqida yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Rasm havolasi (URL - ixtiyoriy):
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* ♿️ Accessibility options */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAccessible}
                onChange={(e) => setIsAccessible(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1">
                <Accessibility className="w-4 h-4 text-teal-600" />
                ♿️ Nogironligi bo‘lgan insonlar uchun to‘siqsiz qulaylikka egami?
              </span>
            </label>

            {isAccessible && (
              <div className="flex flex-wrap gap-2 pt-1">
                {['Pandus bor', 'Keng lift', 'Bredl alifbosi', 'Surdo-tarjimon', 'Pastki qavat'].map((feat) => (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => handleAccessibilityToggle(feat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                      accessibilityFeatures.includes(feat)
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700'
                    }`}
                  >
                    {accessibilityFeatures.includes(feat) ? '✓ ' : '+ '}{feat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>E’lonni Joylashtirish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
