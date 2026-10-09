import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'talabalar',
    name: 'Talabalar uchun',
    iconName: 'Home',
    description: 'Arzon kvartira, sheriklik, bepul o\'quv hududlari va yotoqxona imtiyozlari',
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    badgeText: '🏠 Talabalar',
    markerColor: '#f59e0b',
    subcategories: ['Arzon Kvartira', 'Sherik Izlash', 'Yotoqxona Imtiyozi', 'Co-working / Kutubxona']
  },
  {
    id: 'ovqat',
    name: 'Bepul & Arzon Ovqat',
    iconName: 'Utensils',
    description: 'Xayriya oshxonalari, bepul tushlik va "Mehr Dasturxoni" tarqatish nuqtalari',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    badgeText: '🍲 Ovqat Tarqatish',
    markerColor: '#10b981',
    subcategories: ['Xayriya Oshxonasi', 'Bepul Tushlik', 'Oziq-ovqat Paketi', 'Ehson Qutisi']
  },
  {
    id: 'kiyim',
    name: 'Kiyim-kechak Banki',
    iconName: 'Shirt',
    description: 'Kam ta\'minlangan oilalar uchun bepul va beg\'araz kiyim, poyabzal nuqtalari',
    badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    badgeText: '👕 Kiyim Banki',
    markerColor: '#3b82f6',
    subcategories: ['Bolalar Kiyimlari', 'Qishki Kiyimlar', 'Poyabzallar', 'Kiyim Qabul Nuqtasi']
  },
  {
    id: 'tibbiyot',
    name: 'Tibbiy Xizmatlar',
    iconName: 'Stethoscope',
    description: 'Bepul va imtiyozli tibbiy markazlar, bepul shifokor ko\'rigi va dorilar',
    badgeBg: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    badgeText: '🏥 Tibbiy Yordam',
    markerColor: '#f43f5e',
    subcategories: ['Bepul Ko\'rik', 'Imtiyozli Diagnostika', 'Bepul Dori Tarqatish', 'Reabilitatsiya']
  },
  {
    id: 'oqv_qurol',
    name: 'Kitob va O‘quv Qurollari',
    iconName: 'BookOpen',
    description: 'Bepul kitob almashinuvi, darsliklar va maktab qurollari tarqatish nuqtalari',
    badgeBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    badgeText: '📚 Kitob & O‘quv Qurol',
    markerColor: '#6366f1',
    subcategories: ['Kitob Almashinuvi', 'Maktab Qurollari', 'Bepul Darsliklar', 'Bepul Kurslar']
  },
  {
    id: 'ish',
    name: 'Yoshlar uchun Ishlar',
    iconName: 'Briefcase',
    description: 'Tajribasiz va talabalar uchun mos, moslashuvchan grafikli va halol ishlar',
    badgeBg: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    badgeText: '💼 Yoshlar Bantiyligi',
    markerColor: '#8b5cf6',
    subcategories: ['Talabalar Ishi', 'Tajribasiz Qabul', 'Yarim Stavka (Part-time)', 'Bepul Kasb O‘rgatish']
  },
  {
    id: 'yordam_beruvchi',
    name: 'Yordam Berish / Ehson',
    iconName: 'HeartHandshake',
    description: 'Volontyorlar markazlari, ehson yig‘ish shoxobchalari va yordam so‘rovlari',
    badgeBg: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
    badgeText: '🤝 Ko‘ngillilik',
    markerColor: '#ec4899',
    subcategories: ['Volontyorlik Markazi', 'Ehson Qutisi', 'Favqulodda Yordam', 'Mo‘ysafidlarga Yordam']
  },
  {
    id: 'hayvonlar',
    name: 'Hayvonlarga Yordam',
    iconName: 'Dog',
    description: 'Jonivorlar boshpanalari, bepul vet-xizmatlar va asrab olish nuqtalari',
    badgeBg: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    badgeText: '🐕 Hayvonlar Boshpanasi',
    markerColor: '#f97316',
    subcategories: ['Boshpana', 'Bepul Vet-Ko\'rik', 'Jonivor Asrab Olish', 'Ovqatlantirish Nuqtasi']
  },
  {
    id: 'yoqotilgan',
    name: 'Yo‘qotilgan va Topilgan',
    iconName: 'Search',
    description: 'Yo‘qolgan hujjat, buyum va jonivorlar haqida e’lonlar doskasi',
    badgeBg: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    badgeText: '🔎 Yo‘qotilgan Buyumlar',
    markerColor: '#06b6d4',
    subcategories: ['Hujjatlar', 'Kalit va Qimmatbaho', 'Yo‘qolgan Uy Hayvoni', 'Elektronika']
  },
  {
    id: 'nogironlik',
    name: 'Inkluziv va Qulay Joylar',
    iconName: 'Accessibility',
    description: 'Nogironligi bor shaxslar uchun to‘siqsiz, pandusli va maxsus moslashtirilgan markazlar',
    badgeBg: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
    badgeText: '♿️ Inkluziv Joylar',
    markerColor: '#0d9488',
    subcategories: ['Pandusli Markaz', 'Bredl Kutubxonasi', 'Surdo-Tarjimon', 'Maxsus Reabilitatsiya']
  }
];

export const CITIES = [
  'Barcha viloyatlar',
  'Toshkent shahri',
  'Samarqand',
  'Farg\'ona',
  'Namangan',
  'Andijon',
  'Buxoro',
  'Qarshi',
  'Nukus',
  'Urganch',
  'Navoiy',
  'Jizzax',
  'Guliston',
  'Termiz'
];
