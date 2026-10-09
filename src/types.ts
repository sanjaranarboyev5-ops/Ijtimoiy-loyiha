export type CategoryId = 
  | 'talabalar'
  | 'ovqat'
  | 'kiyim'
  | 'tibbiyot'
  | 'oqv_qurol'
  | 'ish'
  | 'yordam_beruvchi'
  | 'hayvonlar'
  | 'yoqotilgan'
  | 'nogironlik';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  markerColor: string;
  subcategories: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface HelpLocation {
  id: string;
  title: string;
  categoryId: CategoryId;
  subcategory: string;
  organization?: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  telegram?: string;
  workingHours: string;
  priceType: 'Bepul' | 'Beg\'araz' | 'Arzon / Subsidiyalangan' | 'Homiylik';
  priceDescription?: string;
  description: string;
  imageUrl: string;
  isAccessible: boolean; // ♿️ Nogironligi bo'lganlar uchun qulay
  accessibilityFeatures: string[]; // e.g. ['Pandus bor', 'Bredl alifbosi', 'Surdo-tarjimon', 'Keng eshiklar']
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  verified: boolean;
  createdAt: string;
  postedBy: string;
}

export interface LostItem {
  id: string;
  title: string;
  type: 'yoqotilgan' | 'topilgan';
  category: 'Hujjat' | 'Kalit / Qimmatbaho' | 'Uy hayvoni' | 'Telefon / Texnika' | 'Boshqa';
  location: string;
  city: string;
  date: string;
  description: string;
  contactName: string;
  contactPhone: string;
  imageUrl?: string;
  reward?: string;
  status: 'Aktiv' | 'Hal qilindi';
}

export interface VolunteerNeed {
  id: string;
  title: string;
  organization: string;
  city: string;
  description: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  contactPhone: string;
  telegram: string;
  urgent: boolean;
  date: string;
}

export interface FilterState {
  categoryId: CategoryId | 'all';
  city: string;
  searchQuery: string;
  onlyFree: boolean;
  onlyAccessible: boolean;
  priceType: string;
  sortBy: 'recommended' | 'rating' | 'newest';
}
