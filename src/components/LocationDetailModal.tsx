import React, { useState } from 'react';
import type { HelpLocation, Review } from '../types';
import { CATEGORIES } from '../data/categories';
import { 
  X, MapPin, Phone, Send, Clock, Star, ShieldCheck, 
  Accessibility, Volume2, Share2, Navigation, MessageSquare, CheckCircle, ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LocationDetailModalProps {
  location: HelpLocation | null;
  onClose: () => void;
  onAddReview: (locationId: string, review: Review) => void;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({
  location,
  onClose,
  onAddReview
}) => {
  if (!location) return null;

  const category = CATEGORIES.find(c => c.id === location.categoryId);

  // Review Form state
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      userName: userName.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim()
    };

    onAddReview(location.id, newReview);
    setReviewSubmitted(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => {
      setUserName('');
      setComment('');
      setReviewSubmitted(false);
    }, 2500);
  };

  // Web Speech API Read Aloud function for visually impaired users
  const handleSpeakDetails = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${location.title}. Manzil: ${location.city}, ${location.address}. Xizmat narxi: ${location.priceType}. Malumot: ${location.description}. Telefon raqami: ${location.phone}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Brauzeringizda nutq sintezatori qo\'llab-quvvatlanmaydi.');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-800">
          <img
            src={location.imageUrl}
            alt={location.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-all z-10 border border-white/20"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
            <span className={`px-3 py-1 rounded-xl text-xs font-black backdrop-blur-md border ${
              category?.badgeBg || 'bg-slate-900 text-white'
            }`}>
              {category?.badgeText}
            </span>

            {location.verified && (
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-500 text-white shadow-md flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Tasdiqlangan
              </span>
            )}
          </div>

          {/* Title and Audio reader button on overlay */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                  {location.title}
                </h2>
                <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{location.city}, {location.address}</span>
                </p>
              </div>

              {/* Audio speak button */}
              <button
                onClick={handleSpeakDetails}
                className="p-3 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-bold shrink-0 border border-emerald-400/40 transition-all transform active:scale-95"
                title="Matnni ovozli eshitish"
              >
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">Eshitish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 space-y-6">
          {/* Quick Action Buttons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href={`tel:${location.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Qo‘ng‘iroq</span>
            </a>

            {location.telegram && (
              <a
                href={`https://t.me/${location.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/20 transition-all text-center"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            )}

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all text-center"
            >
              <Navigation className="w-4 h-4" />
              <span>Yo‘nalish (Map)</span>
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Nusxalandi!' : 'Ulashish'}</span>
            </button>
          </div>

          {/* Price & Operating Hours Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Xizmat Narxi & Sharti:</span>
              <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {location.priceType}
              </div>
              {location.priceDescription && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {location.priceDescription}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Ish Vaqti & Grafigi:</span>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>{location.workingHours}</span>
              </div>
              {location.organization && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tashkilot: <strong>{location.organization}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tafsilot va Ma'lumot:
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {location.description}
            </p>
          </div>

          {/* ♿️ Accessibility Features Section */}
          {location.isAccessible && (
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
                <Accessibility className="w-5 h-5 text-teal-600" />
                <span>♿️ Nogironligi bo‘lgan insonlar uchun qulayliklar:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.accessibilityFeatures.map((feat, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-700 shadow-sm"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews & Feedback Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Foydalanuvchi Mulohazalari ({location.reviews.length})</span>
              </h4>
              <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{location.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">
                O‘z mulohazangiz yoki minnatdorchiligingizni qoldiring:
              </h5>

              {reviewSubmitted ? (
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Rahmat! Izohingiz muvaffaqiyatli saqlandi.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Ismingiz (masalan: Anvar S.)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                    />

                    {/* Star selection */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 mr-2">Baho:</span>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star className={`w-4 h-4 ${num <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={2}
                    placeholder="Maskan xizmati va tajribangiz haqida yozing..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                  >
                    Izohni Yuborish
                  </button>
                </>
              )}
            </form>

            {/* List of existing reviews */}
            <div className="space-y-3">
              {location.reviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-2">
                  Hali izohlar qoldirilmagan. Birinchi bo‘lib fikringizni bildiring!
                </p>
              ) : (
                location.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-normal">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
