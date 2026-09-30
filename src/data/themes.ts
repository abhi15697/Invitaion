export interface ColorPalettePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  text: string;
  accent: string;
  background: string;
  previewClass: string;
}

export interface FontOption {
  id: string;
  name: string;
  fontClass: string;
  category: 'Serif' | 'Cursive' | 'Modern' | 'Display' | 'Indian';
  previewText: string;
}

export interface PatternOption {
  id: string;
  name: string;
  description: string;
  previewIcon: string;
}

export interface BorderOption {
  id: string;
  name: string;
  description: string;
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
  {
    id: 'royal-burgundy-gold',
    name: 'Royal Burgundy & Antique Gold (शाही मखमली)',
    primary: '#f59e0b',
    secondary: '#fef3c7',
    text: '#fef9c3',
    accent: '#fbbf24',
    background: '#2f0516',
    previewClass: 'from-amber-400 via-yellow-600 to-rose-950',
  },
  {
    id: 'royal-gold',
    name: 'Royal Velvet Wine & Gold (शाही ज़री)',
    primary: '#d97706',
    secondary: '#fef3c7',
    text: '#ffffff',
    accent: '#f59e0b',
    background: '#2b071d',
    previewClass: 'from-amber-500 via-rose-800 to-pink-950',
  },
  {
    id: 'turmeric-kumkum',
    name: 'Haldi & Kumkum (हल्दी-कुंकुम)',
    primary: '#f59e0b',
    secondary: '#fef3c7',
    text: '#fffbeb',
    accent: '#dc2626',
    background: '#38050e',
    previewClass: 'from-amber-500 via-orange-600 to-red-950',
  },
  {
    id: 'peacock-emerald',
    name: 'Peacock & Gold (मयूर पंख)',
    primary: '#059669',
    secondary: '#d1fae5',
    text: '#ffffff',
    accent: '#fbbf24',
    background: '#061d16',
    previewClass: 'from-emerald-500 via-teal-600 to-emerald-950',
  },
  {
    id: 'kanjeevaram-crimson',
    name: 'Kanjeevaram Silk & Zari',
    primary: '#fbbf24',
    secondary: '#fef08a',
    text: '#ffffff',
    accent: '#f43f5e',
    background: '#2b030b',
    previewClass: 'from-yellow-400 to-red-950',
  },
  {
    id: 'lotus-rose-silk',
    name: 'Lotus Pink & Rose Gold',
    primary: '#fb7185',
    secondary: '#ffe4e6',
    text: '#ffffff',
    accent: '#f43f5e',
    background: '#1f0d19',
    previewClass: 'from-pink-500 to-rose-950',
  },
  {
    id: 'royal-saffron',
    name: 'Royal Saffron & Amber (केसरिया)',
    primary: '#ea580c',
    secondary: '#ffedd5',
    text: '#ffffff',
    accent: '#fbbf24',
    background: '#1c0f0a',
    previewClass: 'from-orange-500 to-amber-950',
  },
  {
    id: 'rose-blush',
    name: 'Rose & Blush',
    primary: '#e11d48',
    secondary: '#ffe4e6',
    text: '#ffffff',
    accent: '#fb7185',
    background: '#1a0d16',
    previewClass: 'from-rose-500 to-rose-950',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    primary: '#8b5cf6',
    secondary: '#ede9fe',
    text: '#ffffff',
    accent: '#a78bfa',
    background: '#130d24',
    previewClass: 'from-purple-500 to-purple-950',
  },
  {
    id: 'midnight-gold',
    name: 'Regal Amethyst & Gold (शाही जामुनी)',
    primary: '#eab308',
    secondary: '#fef9c3',
    text: '#f8fafc',
    accent: '#fde047',
    background: '#1f041f',
    previewClass: 'from-yellow-400 via-purple-700 to-purple-950',
  },
  {
    id: 'classic-noir',
    name: 'Velvet Rose Noir & Champagne',
    primary: '#f472b6',
    secondary: '#fbcfe8',
    text: '#ffffff',
    accent: '#fbbf24',
    background: '#1a0410',
    previewClass: 'from-rose-400 via-pink-800 to-pink-950',
  },
];

export const FONT_OPTIONS: FontOption[] = [
  // Western Luxury & Display Fonts
  {
    id: 'serif',
    name: 'Playfair Display',
    fontClass: 'font-serif',
    category: 'Serif',
    previewText: 'Classic Elegance',
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    fontClass: 'font-cormorant',
    category: 'Serif',
    previewText: 'Timeless Luxury',
  },
  {
    id: 'cinzel',
    name: 'Cinzel Heritage',
    fontClass: 'font-cinzel',
    category: 'Serif',
    previewText: 'ROYAL MAJESTY',
  },
  {
    id: 'script',
    name: 'Great Vibes',
    fontClass: 'font-script',
    category: 'Cursive',
    previewText: 'Romantic Flourish',
  },
  {
    id: 'dancing',
    name: 'Dancing Script',
    fontClass: 'font-dancing',
    category: 'Cursive',
    previewText: 'Joyful & Playful',
  },
  {
    id: 'alex',
    name: 'Alex Brush',
    fontClass: 'font-alex',
    category: 'Cursive',
    previewText: 'Artistic Calligraphy',
  },
  {
    id: 'poppins',
    name: 'Poppins Modern',
    fontClass: 'font-poppins',
    category: 'Modern',
    previewText: 'Clean & Contemporary',
  },
  {
    id: 'montserrat',
    name: 'Montserrat Clean',
    fontClass: 'font-montserrat',
    category: 'Modern',
    previewText: 'Geometric Boldness',
  },
  {
    id: 'display',
    name: 'Outfit Trendy',
    fontClass: 'font-display',
    category: 'Display',
    previewText: 'Vibrant Premium',
  },

  // Indian Regional Fonts
  {
    id: 'devanagari',
    name: 'Rozha One (हिंदी / मराठी)',
    fontClass: 'font-devanagari',
    category: 'Indian',
    previewText: '॥ शुभ विवाह ॥',
  },
  {
    id: 'devanagari-classic',
    name: 'Tiro Devanagari (शास्त्रीय)',
    fontClass: 'font-devanagari-classic',
    category: 'Indian',
    previewText: '॥ श्री गणेशाय नमः ॥',
  },
  {
    id: 'devanagari-yatra',
    name: 'Yatra One (उत्सव कॅलिग्राफी)',
    fontClass: 'font-devanagari-yatra',
    category: 'Indian',
    previewText: 'लग्नपत्रिका निमंत्रण',
  },
  {
    id: 'tamil',
    name: 'Mukta Malar (தமிழ்)',
    fontClass: 'font-tamil',
    category: 'Indian',
    previewText: 'திருமண அழைப்பிதழ்',
  },
  {
    id: 'telugu',
    name: 'Tiro Telugu (తెలుగు)',
    fontClass: 'font-telugu',
    category: 'Indian',
    previewText: 'శుభ వివాహం ఆహ్వానం',
  },
  {
    id: 'bengali',
    name: 'Tiro Bangla (বাংলা)',
    fontClass: 'font-bengali',
    category: 'Indian',
    previewText: 'শুভ বিবাহ নিমন্ত্রণ',
  },
  {
    id: 'gujarati',
    name: 'Noto Gujarati (ગુજરાતી)',
    fontClass: 'font-gujarati',
    category: 'Indian',
    previewText: 'શુભ લગ્ન કંકોતરી',
  },
  {
    id: 'gurmukhi',
    name: 'Tiro Gurmukhi (ਪੰਜਾਬੀ)',
    fontClass: 'font-gurmukhi',
    category: 'Indian',
    previewText: 'ਸ਼ੁਭ ਵਿਆਹ ਦਾ ਸੱਦਾ',
  },
  {
    id: 'kannada',
    name: 'Tiro Kannada (ಕನ್ನಡ)',
    fontClass: 'font-kannada',
    category: 'Indian',
    previewText: 'ವಿವಾಹ ಮಹೋತ್ಸವದ ಆಮಂತ್ರಣ',
  },
  {
    id: 'malayalam',
    name: 'Noto Malayalam (മലയാളം)',
    fontClass: 'font-malayalam',
    category: 'Indian',
    previewText: 'മംഗല്യ മഹോത്സവം',
  },
  {
    id: 'oriya',
    name: 'Noto Oriya (ଓଡ଼ିଆ)',
    fontClass: 'font-oriya',
    category: 'Indian',
    previewText: 'ଶୁଭ ବିବାହ ନିମନ୍ତ୍ରଣ',
  },
];

export const PATTERN_OPTIONS: PatternOption[] = [
  { id: 'quilted-lattice', name: 'Royal Quilted Lattice', description: 'Gilded diagonal crosshatch with jewel stardust', previewIcon: '✨' },
  { id: 'none', name: 'Pure Solid', description: 'Clean luxury background without overlay', previewIcon: '⬜' },
  { id: 'mandala', name: 'Sacred Mandala', description: 'Intricate traditional geometric medallion', previewIcon: '☸️' },
  { id: 'floral', name: 'Floral Watermark', description: 'Soft botanical floral etchings', previewIcon: '🌸' },
  { id: 'damask', name: 'Royal Damask', description: 'Opulent baroque palace pattern', previewIcon: '⚜️' },
  { id: 'minimal-dots', name: 'Polka Sparkles', description: 'Subtle twinkling dots and stars', previewIcon: '✨' },
  { id: 'marble', name: 'Italian Marble', description: 'Veined luxury gold marble texture', previewIcon: '🏛️' },
  { id: 'stars', name: 'Cosmic Constellations', description: 'Romantic starry night sky', previewIcon: '⭐' },
  { id: 'geometric', name: 'Art Deco Luxe', description: '1920s Gatsby geometric lattice', previewIcon: '🔶' },
  { id: 'gradient', name: 'Soft Aurora Glow', description: 'Dreamy multi-tone lighting gradient', previewIcon: '🌈' },
];

export const BORDER_OPTIONS: BorderOption[] = [
  { id: 'royal-peacock', name: 'Royal Peacock & Paisley (मयूर बॉर्डर)', description: '4 majestic corner peacocks with double gold frame' },
  { id: 'none', name: 'No Border', description: 'Full bleed clean canvas' },
  { id: 'jharokha', name: 'Royal Rajasthani Jharokha', description: 'Majestic dome and arch Indian header' },
  { id: 'temple-toran', name: 'South Temple Toran & Flowers', description: 'Festive marigold garland toran' },
  { id: 'royal-crest', name: 'Vintage Palace Crest', description: 'Ornate flourish corners and crest' },
  { id: 'floral-corners', name: 'Botanical Corners', description: 'Graceful floral corners with border' },
  { id: 'double-gold', name: 'Double Royal Inset', description: 'Classic concentric luxury frame' },
  { id: 'modern-frame', name: 'Beveled Geometric', description: 'Contemporary notched corners' },
  { id: 'simple', name: 'Thin Minimalist Line', description: 'Sleek single gold/accent frame' },
];
