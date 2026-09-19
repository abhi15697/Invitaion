import { create } from 'zustand';

export type HomeThemeId = 'royal-ivory' | 'midnight-navy' | 'festive-crimson' | 'pearl-studio';

export interface ThemeConfig {
  id: HomeThemeId;
  name: string;
  icon: string;
  shortDesc: string;
  bgClass: string;
  canvasGlow1: string;
  canvasGlow2: string;
  canvasGlow3: string;
  dotColor: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  pillBg: string;
  pillBorder: string;
  accentGradient: string;
  heroBadgeBg: string;
  isDark: boolean;
}

export const THEME_CONFIGS: Record<HomeThemeId, ThemeConfig> = {
  'royal-ivory': {
    id: 'royal-ivory',
    name: 'Royal Ivory & Gold',
    icon: '👑',
    shortDesc: 'Warm champagne gold & royal velvet maroon accents',
    bgClass: 'bg-[#faf6ee]',
    canvasGlow1: 'rgba(245, 158, 11, 0.22)',
    canvasGlow2: 'rgba(234, 88, 12, 0.16)',
    canvasGlow3: 'rgba(217, 119, 6, 0.14)',
    dotColor: '#d97706',
    textHeading: 'text-[#3f120e]',
    textBody: 'text-[#78350f]',
    textMuted: 'text-[#9a3412]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-amber-200/90',
    cardHoverBorder: 'hover:border-amber-400',
    pillBg: 'bg-amber-50/90',
    pillBorder: 'border-amber-200',
    accentGradient: 'from-amber-500 via-orange-500 to-rose-600',
    heroBadgeBg: 'bg-white/95 border-amber-200',
    isDark: false,
  },
  'midnight-navy': {
    id: 'midnight-navy',
    name: 'Midnight Velvet Navy',
    icon: '🌙',
    shortDesc: 'Deep indigo sapphire with radiant gold foil stardust',
    bgClass: 'bg-[#080d1a]',
    canvasGlow1: 'rgba(59, 130, 246, 0.20)',
    canvasGlow2: 'rgba(245, 158, 11, 0.18)',
    canvasGlow3: 'rgba(99, 102, 241, 0.18)',
    dotColor: '#fbbf24',
    textHeading: 'text-[#fef3c7]',
    textBody: 'text-[#cbd5e1]',
    textMuted: 'text-[#94a3b8]',
    cardBg: 'bg-[#0f172a]/90',
    cardBorder: 'border-amber-400/30',
    cardHoverBorder: 'hover:border-amber-400/80',
    pillBg: 'bg-[#1e293b]/90',
    pillBorder: 'border-amber-400/30',
    accentGradient: 'from-amber-400 via-yellow-400 to-amber-500',
    heroBadgeBg: 'bg-[#0f172a]/95 border-amber-400/40',
    isDark: true,
  },
  'festive-crimson': {
    id: 'festive-crimson',
    name: 'Festive Saffron & Crimson',
    icon: '🪔',
    shortDesc: 'Rich Kumkum Crimson with glowing Deepotsav lanterns',
    bgClass: 'bg-[#1a0408]',
    canvasGlow1: 'rgba(220, 38, 38, 0.25)',
    canvasGlow2: 'rgba(249, 115, 22, 0.22)',
    canvasGlow3: 'rgba(245, 158, 11, 0.18)',
    dotColor: '#ea580c',
    textHeading: 'text-[#fff1f2]',
    textBody: 'text-[#fed7aa]',
    textMuted: 'text-[#fb923c]',
    cardBg: 'bg-[#2b0710]/92',
    cardBorder: 'border-orange-400/35',
    cardHoverBorder: 'hover:border-orange-400/80',
    pillBg: 'bg-[#3b0a17]/90',
    pillBorder: 'border-orange-400/30',
    accentGradient: 'from-orange-500 via-red-500 to-rose-600',
    heroBadgeBg: 'bg-[#2b0710]/95 border-orange-400/40',
    isDark: true,
  },
  'pearl-studio': {
    id: 'pearl-studio',
    name: 'Pearl Rose Studio',
    icon: '✨',
    shortDesc: 'Modern minimalist studio with rose gold glassmorphism',
    bgClass: 'bg-[#faf7f5]',
    canvasGlow1: 'rgba(244, 63, 94, 0.15)',
    canvasGlow2: 'rgba(251, 146, 60, 0.12)',
    canvasGlow3: 'rgba(244, 114, 182, 0.14)',
    dotColor: '#f43f5e',
    textHeading: 'text-[#2a0e16]',
    textBody: 'text-[#5c2d3a]',
    textMuted: 'text-[#883e52]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-rose-200/80',
    cardHoverBorder: 'hover:border-rose-400',
    pillBg: 'bg-rose-50/90',
    pillBorder: 'border-rose-200',
    accentGradient: 'from-rose-500 via-pink-500 to-amber-500',
    heroBadgeBg: 'bg-white/95 border-rose-200',
    isDark: false,
  },
};

interface ThemeState {
  currentThemeId: HomeThemeId;
  theme: ThemeConfig;
  setTheme: (id: HomeThemeId) => void;
}

const STORAGE_KEY = 'invitation_home_theme';

const getInitialTheme = (): HomeThemeId => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as HomeThemeId;
    if (saved && THEME_CONFIGS[saved]) {
      return saved;
    }
  } catch (e) {
    // Ignore localStorage errors
  }
  return 'royal-ivory';
};

const initialId = getInitialTheme();

export const useThemeStore = create<ThemeState>((set) => ({
  currentThemeId: initialId,
  theme: THEME_CONFIGS[initialId],
  setTheme: (id: HomeThemeId) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      // Ignore localStorage errors
    }
    set({
      currentThemeId: id,
      theme: THEME_CONFIGS[id],
    });
  },
}));
