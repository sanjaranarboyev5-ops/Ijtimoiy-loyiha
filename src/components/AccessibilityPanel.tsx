import React from 'react';
import { X, Eye, Type, Volume2, Contrast, Sparkles, Check } from 'lucide-react';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  dyslexicFont: boolean;
  setDyslexicFont: (val: boolean) => void;
  onReadPageSummary: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  dyslexicFont,
  setDyslexicFont,
  onReadPageSummary
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 space-y-6 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                Inkluzivlik va Maxsus Imkoniyatlar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ko‘rish va idrok etish imkoniyati cheklanganlar uchun
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Speech Synthesis / Audio Screen Reader */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-teal-600 animate-pulse" />
              Ovozli O‘quvchi (Screen Reader)
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Platforma haqida qisqacha ma'lumot va asosiy qismlarni ovozli o'qib berish.
          </p>
          <button
            onClick={onReadPageSummary}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Sahifani Ovozli O‘qish (O‘zbekcha)</span>
          </button>
        </div>

        {/* 2. High Contrast Mode */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Contrast className="w-4 h-4 text-emerald-600" />
              Yuqori Kontrast (High Contrast)
            </span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Zaif ko'ruvchilar uchun matn va fon o'rtasida maksimal sariq/qora kontrast holati.
          </p>
        </div>

        {/* 3. Font Size Zoom */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-emerald-600" />
            Matn O‘lchami (Font Zoom):
          </span>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', label: 'Standart (100%)' },
              { id: 'large', label: 'Katta (125%)' },
              { id: 'xlarge', label: 'Juda katta (150%)' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setFontSize(s.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  fontSize === s.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Accessible checklist summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            ♿️ MehrMap Inkluzivlik Kafolati:
          </span>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Barcha pandusli va to'siqsiz joylar belgilanadi</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Ekran o'quvchi (Screen reader) mosligi</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Bredl va Surdo-tarjimoni bor markazlar filtri</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
