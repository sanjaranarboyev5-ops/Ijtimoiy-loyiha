import type { LostItem } from '../types';

export const INITIAL_LOST_ITEMS: LostItem[] = [
  {
    id: 'lost-1',
    title: 'Talabalik guvohnomasi va Toshcard yo‘l chiptasi',
    type: 'yoqotilgan',
    category: 'Hujjat',
    location: 'Chilonzor metro bekati yaqinida',
    city: 'Toshkent shahri',
    date: '2026-10-07',
    description: 'Nodirov Sanjar nomiga rasmiylashtirilgan TATU talabalik guvohnomasi va ko\'k rangli hamyon ichidagi yo\'l chiptasi yo\'qolgan.',
    contactName: 'Sanjar',
    contactPhone: '+998 90 123-99-88',
    reward: 'Suyunchi puli beriladi',
    status: 'Aktiv'
  },
  {
    id: 'lost-2',
    title: 'Topib olindi: Oltin rangli uy kaliti va brelok',
    type: 'topilgan',
    category: 'Kalit / Qimmatbaho',
    location: 'Samarqand Registon maydoni xiyobonida',
    city: 'Samarqand',
    date: '2026-10-08',
    description: 'O\'rmon ko\'rinishidagi rezina brelok taqilgan 3 ta uy kaliti o\'rindiq ustidan topildi. Egasi belgilarini aytib olib ketishi mumkin.',
    contactName: 'Boburjon',
    contactPhone: '+998 93 444-11-22',
    status: 'Aktiv'
  },
  {
    id: 'lost-3',
    title: 'Oq rangli Xaski zotli kuchukcha yo‘qoldi',
    type: 'yoqotilgan',
    category: 'Uy hayvoni',
    location: 'Yunusobod 14-mavze, 2-maktab atrofida',
    city: 'Toshkent shahri',
    date: '2026-10-06',
    description: 'Moviy ko\'zli, bo\'ynida qizil tasma taqilgan 8 oylik Xaski laqabi "Loki". Topganga 1,000,000 so\'m mukofot!',
    contactName: 'Dilnoza',
    contactPhone: '+998 97 888-55-44',
    reward: '1,000,000 so\'m mukofot',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    status: 'Aktiv'
  },
  {
    id: 'lost-4',
    title: 'Topib olindi: Samsung Galaxy A54 telefoni',
    type: 'topilgan',
    category: 'Telefon / Texnika',
    location: 'Farg‘ona shahri, Markaziy park kafe yonida',
    city: 'Farg\'ona',
    date: '2026-10-08',
    description: "Qora g'ilofli telefon topib olindi. Paroli bor. Ekranda bolalar rasmi bor. Qo'ng'iroq qiling.",
    contactName: 'Alisher',
    contactPhone: '+998 91 202-33-44',
    status: 'Aktiv'
  }
];
