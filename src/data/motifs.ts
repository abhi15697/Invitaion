import type { StickerMotif } from '../types/invitation';

export const MOTIFS_CATALOG: StickerMotif[] = [
  // Auspicious Indian Motifs
  { id: 'ganesha', name: 'Lord Ganesha (गणेश)', category: 'auspicious', icon: '🕉️', defaultColor: '#fbbf24' },
  { id: 'om', name: 'Sacred Om (ॐ)', category: 'auspicious', icon: '🕉️', defaultColor: '#f59e0b' },
  { id: 'swastik', name: 'Shubh Swastik (卐)', category: 'auspicious', icon: '卐', defaultColor: '#ef4444' },
  { id: 'kalash', name: 'Mangal Kalash (कलश)', category: 'auspicious', icon: '🏺', defaultColor: '#f59e0b' },
  { id: 'diya', name: 'Aarti Diya (दीपक)', category: 'auspicious', icon: '🪔', defaultColor: '#f59e0b' },
  { id: 'toran', name: 'Marigold Toran (तोरण)', category: 'auspicious', icon: '🏵️', defaultColor: '#f97316' },

  // Badges & Seals
  { id: 'wax-seal', name: 'Royal Wax Seal (Save the Date)', category: 'badges', icon: '👑', defaultColor: '#b91c1c' },
  { id: 'gold-crest', name: 'Gold Monogram Crest', category: 'badges', icon: '🛡️', defaultColor: '#fbbf24' },
  { id: 'floral-wreath', name: 'Botanical Gold Wreath', category: 'floral', icon: '🌿', defaultColor: '#10b981' },

  // Celebration & Party
  { id: 'hearts', name: 'Intertwined Hearts', category: 'celebration', icon: '❤️', defaultColor: '#f43f5e' },
  { id: 'champagne', name: 'Champagne Cheers', category: 'celebration', icon: '🥂', defaultColor: '#fbbf24' },
  { id: 'balloons', name: 'Party Balloons', category: 'festive', icon: '🎈', defaultColor: '#38bdf8' },
  { id: 'sparkles', name: 'Golden Sparkle Star', category: 'festive', icon: '✨', defaultColor: '#fbbf24' },
  { id: 'grad-cap', name: 'Graduation Mortarboard', category: 'celebration', icon: '🎓', defaultColor: '#e2e8f0' },
  { id: 'baby-feet', name: 'Baby Footprints', category: 'celebration', icon: '👣', defaultColor: '#f472b6' },
];
