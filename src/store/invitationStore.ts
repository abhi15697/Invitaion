import { create } from 'zustand';
import type {
  InvitationCategory,
  InvitationCustomization,
  AnyInvitationFields,
  LanguageCode,
  StickerInstance,
} from '../types/invitation';
import { TEMPLATES, getTemplateById } from '../data/templates';
import { DEMO_DATA_MAP } from '../data/demoData';
import { getRegionalDemoData } from '../data/regionalDemoData';
import { MOTIFS_CATALOG } from '../data/motifs';

interface InvitationState {
  selectedLanguage: LanguageCode;
  activeCategory: InvitationCategory;
  activeTemplateId: string;
  formDataMap: Record<InvitationCategory, AnyInvitationFields>;
  customization: InvitationCustomization;
  zoomLevel: number;
  isGenerating: boolean;
  generatedImageUri: string | null;
  activeTab: 'details' | 'preview' | 'customize' | 'stickers';
  isEnvelopeMode: boolean;
  isEnvelopeOpen: boolean;

  // Actions
  setLanguage: (lang: LanguageCode, applyDemo?: boolean) => void;
  setCategory: (category: InvitationCategory) => void;
  setTemplateId: (templateId: string) => void;
  updateFormField: (field: string, value: any) => void;
  setAllFormFields: (fields: AnyInvitationFields) => void;
  updateCustomization: (customization: Partial<InvitationCustomization>) => void;
  setZoomLevel: (zoom: number) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGeneratedImageUri: (uri: string | null) => void;
  setActiveTab: (tab: 'details' | 'preview' | 'customize' | 'stickers') => void;
  resetToDemoData: (category?: InvitationCategory) => void;
  getActiveFormData: () => AnyInvitationFields;

  // Sticker actions
  addSticker: (motifId: string) => void;
  removeSticker: (id: string) => void;
  updateSticker: (id: string, updates: Partial<StickerInstance>) => void;
  clearStickers: () => void;

  // Envelope actions
  toggleEnvelopeMode: () => void;
  setIsEnvelopeOpen: (isOpen: boolean) => void;
  toggleEnvelopeOpen: () => void;
}

const initialCategory: InvitationCategory = 'wedding';
const initialTemplate = TEMPLATES.find((t) => t.category === initialCategory) || TEMPLATES[0];

export const useInvitationStore = create<InvitationState>((set, get) => ({
  selectedLanguage: 'en',
  activeCategory: initialCategory,
  activeTemplateId: initialTemplate.id,
  formDataMap: {
    wedding: { ...DEMO_DATA_MAP.wedding },
    birthday: { ...DEMO_DATA_MAP.birthday },
    anniversary: { ...DEMO_DATA_MAP.anniversary },
    engagement: { ...DEMO_DATA_MAP.engagement },
    'baby-shower': { ...DEMO_DATA_MAP['baby-shower'] },
    'baby-announcement': { ...DEMO_DATA_MAP['baby-announcement'] },
    graduation: { ...DEMO_DATA_MAP.graduation },
    housewarming: { ...DEMO_DATA_MAP.housewarming },
    party: { ...DEMO_DATA_MAP.party },
    religious: { ...DEMO_DATA_MAP.religious },
  },
  customization: {
    ...initialTemplate.defaultCustomization,
    stickers: [],
    envelopeTheme: 'royal-maroon',
  },
  zoomLevel: 1,
  isGenerating: false,
  generatedImageUri: null,
  activeTab: 'details',
  isEnvelopeMode: false,
  isEnvelopeOpen: false,

  setLanguage: (lang: LanguageCode, applyDemo: boolean = false) => {
    const { activeCategory } = get();
    
    // Choose appropriate default font for the language script
    let defaultFont = 'serif';
    if (['hi', 'mr'].includes(lang)) defaultFont = 'devanagari';
    else if (lang === 'ta') defaultFont = 'tamil';
    else if (lang === 'te') defaultFont = 'telugu';
    else if (lang === 'bn') defaultFont = 'bengali';
    else if (lang === 'gu') defaultFont = 'gujarati';
    else if (lang === 'pa') defaultFont = 'gurmukhi';
    else if (lang === 'kn') defaultFont = 'kannada';
    else if (lang === 'ml') defaultFont = 'malayalam';
    else if (lang === 'or') defaultFont = 'oriya';

    if (applyDemo) {
      const demoForCat = getRegionalDemoData(lang, activeCategory);
      set((state) => ({
        selectedLanguage: lang,
        formDataMap: {
          ...state.formDataMap,
          [activeCategory]: { ...demoForCat },
        },
        customization: {
          ...state.customization,
          fontFamily: defaultFont,
        },
      }));
    } else {
      set((state) => ({
        selectedLanguage: lang,
        customization: {
          ...state.customization,
          fontFamily: defaultFont,
        },
      }));
    }
  },

  setCategory: (category: InvitationCategory) => {
    const { selectedLanguage } = get();
    const templatesForCategory = TEMPLATES.filter((t) => t.category === category);
    const newTemplate = templatesForCategory[0] || TEMPLATES[0];
    const demoData = getRegionalDemoData(selectedLanguage, category);
    
    set((state) => ({
      activeCategory: category,
      activeTemplateId: newTemplate.id,
      customization: {
        ...newTemplate.defaultCustomization,
        stickers: state.customization.stickers || [],
        envelopeTheme: state.customization.envelopeTheme || 'royal-maroon',
      },
      formDataMap: {
        ...state.formDataMap,
        [category]: state.formDataMap[category] || demoData,
      },
    }));
  },

  setTemplateId: (templateId: string) => {
    const template = getTemplateById(templateId);
    set((state) => ({
      activeTemplateId: templateId,
      activeCategory: template.category,
      customization: {
        ...template.defaultCustomization,
        stickers: state.customization.stickers || [],
        envelopeTheme: state.customization.envelopeTheme || 'royal-maroon',
      },
    }));
  },

  updateFormField: (field: string, value: any) => {
    const { activeCategory, formDataMap } = get();
    const currentFields = formDataMap[activeCategory] || {};
    
    set({
      formDataMap: {
        ...formDataMap,
        [activeCategory]: {
          ...currentFields,
          [field]: value,
        },
      },
    });
  },

  setAllFormFields: (fields: AnyInvitationFields) => {
    const { activeCategory, formDataMap } = get();
    set({
      formDataMap: {
        ...formDataMap,
        [activeCategory]: {
          ...formDataMap[activeCategory],
          ...fields,
        },
      },
    });
  },

  updateCustomization: (customizationUpdate: Partial<InvitationCustomization>) => {
    set((state) => ({
      customization: {
        ...state.customization,
        ...customizationUpdate,
      },
    }));
  },

  setZoomLevel: (zoom: number) => {
    set({ zoomLevel: Math.max(0.4, Math.min(1.5, zoom)) });
  },

  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  setGeneratedImageUri: (uri: string | null) => set({ generatedImageUri: uri }),
  setActiveTab: (tab: 'details' | 'preview' | 'customize' | 'stickers') => set({ activeTab: tab }),

  resetToDemoData: (category?: InvitationCategory) => {
    const { selectedLanguage, activeCategory } = get();
    const targetCat = category || activeCategory;
    const demoData = getRegionalDemoData(selectedLanguage, targetCat);
    set((state) => ({
      formDataMap: {
        ...state.formDataMap,
        [targetCat]: { ...demoData },
      },
    }));
  },

  getActiveFormData: () => {
    const { activeCategory, formDataMap, selectedLanguage } = get();
    return formDataMap[activeCategory] || getRegionalDemoData(selectedLanguage, activeCategory);
  },

  // Stickers management
  addSticker: (motifId: string) => {
    const motif = MOTIFS_CATALOG.find((m) => m.id === motifId);
    const newSticker: StickerInstance = {
      id: `stk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      motifId,
      x: 50,
      y: 12,
      size: motifId === 'ganesha' || motifId === 'om' ? 44 : 36,
      color: motif?.defaultColor || '#fbbf24',
      rotation: 0,
    };

    set((state) => ({
      customization: {
        ...state.customization,
        stickers: [...(state.customization.stickers || []), newSticker],
      },
    }));
  },

  removeSticker: (id: string) => {
    set((state) => ({
      customization: {
        ...state.customization,
        stickers: (state.customization.stickers || []).filter((s) => s.id !== id),
      },
    }));
  },

  updateSticker: (id: string, updates: Partial<StickerInstance>) => {
    set((state) => ({
      customization: {
        ...state.customization,
        stickers: (state.customization.stickers || []).map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      },
    }));
  },

  clearStickers: () => {
    set((state) => ({
      customization: {
        ...state.customization,
        stickers: [],
      },
    }));
  },

  // Envelope management
  toggleEnvelopeMode: () => {
    set((state) => ({ isEnvelopeMode: !state.isEnvelopeMode }));
  },

  setIsEnvelopeOpen: (isOpen: boolean) => set({ isEnvelopeOpen: isOpen }),
  
  toggleEnvelopeOpen: () => {
    set((state) => ({ isEnvelopeOpen: !state.isEnvelopeOpen }));
  },
}));
