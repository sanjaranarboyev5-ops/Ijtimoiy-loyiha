import React, { useState } from 'react';
import type { VolunteerNeed } from '../types';
import { INITIAL_VOLUNTEER_NEEDS } from '../data/volunteerNeedsData';
import { Heart, Users, MapPin, Phone, Send, CheckCircle, AlertTriangle, Plus, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VolunteerHub: React.FC = () => {
  const [needs, setNeeds] = useState<VolunteerNeed[]>(() => {
    const saved = localStorage.getItem('mehrmap_volunteer_needs');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_NEEDS;
  });

  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const [showNeedModal, setShowNeedModal] = useState(false);

  // New Volunteer Need Form State
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('Toshkent shahri');
  const [description, setDescription] = useState('');
  const [volunteersNeeded, setVolunteersNeeded] = useState(5);
  const [contactPhone, setContactPhone] = useState('+998 ');
  const [telegram, setTelegram] = useState('');
  const [urgent, setUrgent] = useState(true);

  const handleJoinVolunteer = (id: string) => {
    if (joinedIds.includes(id)) return;

    const updated = needs.map(n => {
      if (n.id === id) {
        return { ...n, volunteersJoined: Math.min(n.volunteersNeeded, n.volunteersJoined + 1) };
      }
      return n;
    });

    setNeeds(updated);
    setJoinedIds([...joinedIds, id]);
    localStorage.setItem('mehrmap_volunteer_needs', JSON.stringify(updated));
    confetti({ particleCount: 60, spread: 70 });
  };

  const handleAddNeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !contactPhone.trim()) return;

    const newNeed: VolunteerNeed = {
      id: 'vol-' + Date.now(),
      title: title.trim(),
      organization: organization.trim() || 'Saxovat Ko‘ngillilari',
      city,
      description: description.trim(),
      volunteersNeeded,
      volunteersJoined: 1,
      contactPhone: contactPhone.trim(),
      telegram: telegram.trim() || 'volontyor_uz',
      urgent,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newNeed, ...needs];
    setNeeds(updated);
    localStorage.setItem('mehrmap_volunteer_needs', JSON.stringify(updated));
    confetti({ particleCount: 60, spread: 70 });
    setShowNeedModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            🤝 Yordam Bermoqchi Bo‘lganlar Markazi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Kimgadir Yordam Kerak bo‘lganda O‘z Hissanizni Qo‘shing!
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 font-medium leading-relaxed">
            Qariyalarga g‘amxo‘rlik qilish, volontyor bo‘lish, hayvonlar boshpanalariga ovqat eltish va bolalarga bepul dars berish aktsiyalari.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowNeedModal(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-rose-900 hover:bg-rose-50 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yangi Yordam So‘rovini Chop Etish</span>
            </button>
          </div>
        </div>
      </div>

      {/* List of Volunteer Needs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {needs.map((need) => {
          const isJoined = joinedIds.includes(need.id);
          const percent = Math.round((need.volunteersJoined / need.volunteersNeeded) * 100);

          return (
            <div
              key={need.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    {need.organization}
                  </span>

                  {need.urgent && (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-rose-500 text-white flex items-center gap-1 shadow-sm">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Shoshilinch!
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                  {need.title}
                </h3>

                {/* City */}
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span>{need.city}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {need.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Users className="w-4 h-4 text-pink-500" />
                      {need.volunteersJoined} / {need.volunteersNeeded} volontyor yig‘ildi
                    </span>
                    <span className="text-pink-600 font-extrabold">{percent}%</span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, percent)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <a
                  href={`tel:${need.contactPhone}`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold"
                  title="Qo'ng'iroq qilish"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {need.telegram && (
                  <a
                    href={`https://t.me/${need.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold"
                    title="Telegramda bog'lanish"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => handleJoinVolunteer(need.id)}
                  disabled={isJoined || need.volunteersJoined >= need.volunteersNeeded}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    isJoined
                      ? 'bg-emerald-600 text-white cursor-default'
                      : need.volunteersJoined >= need.volunteersNeeded
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/20'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Volontyorsiz!</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Volontyor Bo‘lish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to add volunteer need */}
      {showNeedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                Yangi Yordam So‘rovini Joylashtirish
              </h3>
              <button onClick={() => setShowNeedModal(false)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNeed} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tadbir yoki Yordam nomi: *</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Qariyalarga qishki oziq-ovqat yetkazish"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tashkilot / Jamiyat:</label>
                  <input
                    type="text"
                    placeholder="Volontyorlar guruhi"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nechta volontyor kerak?</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={volunteersNeeded}
                    onChange={(e) => setVolunteersNeeded(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Batafsil yordam maqsadi:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Qanday yordam kerakligi, qayerda yig'ilish, vaqt va shartlar..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Telegram username:</label>
                  <input
                    type="text"
                    placeholder="@volontyor_uz"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNeedModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 text-white font-bold text-xs shadow-md"
                >
                  Joylashtirish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
