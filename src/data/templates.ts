import type { TemplateDefinition } from '../types/invitation';

export const TEMPLATES: TemplateDefinition[] = [
  // ===================== WEDDING TEMPLATES =====================
  {
    id: 'wedding-royal-peacock',
    name: 'Royal Peacock Burgundy & Gold',
    category: 'wedding',
    style: 'royal',
    description: 'Majestic golden peacocks with ornate baroque framed couple portrait on quilted burgundy velvet.',
    tagline: 'Imperial grandeur with royal peacocks & gilded calligraphy',
    accentPreviewColor: '#f59e0b',
    badge: 'Signature',
    previewImage: '/images/templates/wedding/royal_peacock.jpg',
    defaultCustomization: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fef3c7',
      textColor: '#fef9c3',
      accentColor: '#fbbf24',
      backgroundColor: '#2f0516',
      fontFamily: 'script',
      fontSizeScale: 'md',
      backgroundPattern: 'quilted-lattice',
      borderStyle: 'royal-peacock',
    },
  },
  {
    id: 'wedding-embossed-ivory-peacock',
    name: 'Embossed Ivory & Gold Peacock Heart',
    category: 'wedding',
    style: 'royal',
    description: 'Fine embossed ivory cardstock with sculpted 3D antique gold peacock heart frame, Ganesha blessings insert, and gold satin pull ribbon.',
    tagline: 'Sculpted 3D gold peacock heart with embossed letterpress florals',
    accentPreviewColor: '#d4af37',
    badge: 'New',
    previewImage: '/images/templates/wedding/embossed_ivory_peacock.jpg',
    defaultCustomization: {
      primaryColor: '#d97706',
      secondaryColor: '#fef3c7',
      textColor: '#3d2110',
      accentColor: '#f59e0b',
      backgroundColor: '#faf7f2',
      fontFamily: 'script',
      fontSizeScale: 'md',
      backgroundPattern: 'none',
      borderStyle: 'none',
    },
  },
];

export const getTemplateById = (id: string): TemplateDefinition => {
  const found = TEMPLATES.find((t) => t.id === id);
  if (!found) return TEMPLATES[0];
  return found;
};

export const getTemplatesByCategory = (category: string): TemplateDefinition[] => {
  const matching = TEMPLATES.filter((t) => t.category === category);
  return matching.length > 0 ? matching : TEMPLATES;
};
