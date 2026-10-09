import type { VolunteerNeed } from '../types';

export const INITIAL_VOLUNTEER_NEEDS: VolunteerNeed[] = [
  {
    id: 'vol-1',
    title: 'Yolg‘iz pensioner Muqaddas onaga qishki oziq-ovqat yetkazish va uy tozalash',
    organization: 'O‘zbekiston Volontyorlar Guruhi',
    city: 'Toshkent shahri',
    description: '78 yoshli yolg\'iz Muqaddas onaning xonadonida qishga tayyorgarlik va derazalarni izolyatsiya qilish hamda oziq-ovqat eltib berish uchun 4 nafar volontyor yig\'ilmoqda.',
    volunteersNeeded: 4,
    volunteersJoined: 3,
    contactPhone: '+998 90 333-22-11',
    telegram: 'volontyor_toshkent',
    urgent: true,
    date: '2026-10-12'
  },
  {
    id: 'vol-2',
    title: 'Zangiota Jonivorlar Boshpanasini obodonlashtirish va ovqat yig‘ish aktsiyasi',
    organization: 'Mehrli Yuraklar Boshpanasi',
    city: 'Toshkent shahri',
    description: 'Yakshanba kuni boshpanada kataklarni tozalash, 120 ta kuchuk bilan sayr qilish va quruq yem keltirish uchun ko\'ngillilar taklif etiladi.',
    volunteersNeeded: 15,
    volunteersJoined: 9,
    contactPhone: '+998 93 555-44-33',
    telegram: 'shelter_sunday_help',
    urgent: false,
    date: '2026-10-15'
  },
  {
    id: 'vol-3',
    title: 'Kam ta’minlangan 50 nafar o‘quvchiga bepul matematika va ingliz tili dars berish',
    organization: 'Ziyo Eron O\'quv Markazi',
    city: 'Samarqand',
    description: 'Universitet yuqori bosqich talabalari haftada 2 soatdan maktab o\'quvchilariga bepul dars berishi uchun 5 nafar ko\'ngilli o\'qituvchi kerak.',
    volunteersNeeded: 5,
    volunteersJoined: 2,
    contactPhone: '+998 66 233-11-22',
    telegram: 'sam_vol_teach',
    urgent: false,
    date: '2026-10-20'
  }
];
