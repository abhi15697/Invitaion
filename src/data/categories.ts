import type { CategoryInfo } from '../types/invitation';
import { TEMPLATES } from './templates';

const BASE_CATEGORIES: Omit<CategoryInfo, 'templateCount'>[] = [
  {
    id: 'wedding',
    title: 'Wedding',
    icon: '💍',
    description: 'Celebrate sacred vows and grand union celebrations with timeless elegance.',
    featuredStyle: 'Royal Peacock & Gold',
    gradient: 'from-orange-500/20 via-red-500/20 to-rose-600/20',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    icon: '🎂',
    description: 'Throw unforgettable parties with vibrant, playful, and chic designs.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    icon: '🥂',
    description: 'Honor milestones of love, companionship, and shared memories.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-red-500/20 via-orange-400/20 to-amber-500/20',
  },
  {
    id: 'engagement',
    title: 'Engagement',
    icon: '💎',
    description: 'Announce your official commitment and celebrate the start of forever.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-orange-400/20 via-amber-400/20 to-red-400/20',
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    icon: '🍼',
    description: 'Welcome the bundle of joy with gentle pastels and adorable animal themes.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-amber-300/20 via-orange-200/20 to-yellow-400/20',
  },
  {
    id: 'baby-announcement',
    title: 'Baby Announcement',
    icon: '👶',
    description: 'Introduce your newborn to family and friends with sweet birth stats.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-orange-300/20 via-amber-200/20 to-yellow-300/20',
  },
  {
    id: 'graduation',
    title: 'Graduation',
    icon: '🎓',
    description: 'Commemorate hard-earned academic milestones and future horizons.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-amber-500/20 via-yellow-400/20 to-orange-500/20',
  },
  {
    id: 'housewarming',
    title: 'Housewarming',
    icon: '🏡',
    description: 'Warm the new hearth and welcome loved ones into your new sanctuary.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-orange-500/20 via-amber-400/20 to-red-400/20',
  },
  {
    id: 'party',
    title: 'Party & Cocktail',
    icon: '✨',
    description: 'Gather friends for electric evening soirées, dinners, and dance nights.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-orange-500/20 via-red-500/20 to-amber-500/20',
  },
  {
    id: 'religious',
    title: 'Religious & Festival',
    icon: '🪔',
    description: 'Invoke divine blessings for pujas, festivals, satsangs, and sacred rites.',
    featuredStyle: 'Coming Soon',
    gradient: 'from-red-600/20 via-orange-500/20 to-amber-400/20',
  },
];

export const CATEGORIES: CategoryInfo[] = BASE_CATEGORIES.map((cat) => ({
  ...cat,
  templateCount: TEMPLATES.filter((t) => t.category === cat.id).length,
}));
