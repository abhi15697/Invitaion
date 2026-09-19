export type InvitationCategory =
  | 'wedding'
  | 'birthday'
  | 'anniversary'
  | 'engagement'
  | 'baby-shower'
  | 'baby-announcement'
  | 'graduation'
  | 'housewarming'
  | 'party'
  | 'religious';

export type TemplateStyle =
  | 'traditional'
  | 'modern'
  | 'minimal'
  | 'elegant'
  | 'floral'
  | 'royal'
  | 'luxury'
  | 'cute'
  | 'colorful'
  | 'neon'
  | 'romantic';

export interface AdditionalEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
}

export interface WeddingFields {
  brideName: string;
  groomName: string;
  bridePhoto?: string;
  groomPhoto?: string;
  couplePhoto?: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl?: string;
  brideParents?: string;
  groomParents?: string;
  rsvpName: string;
  rsvpPhone: string;
  weddingMessage: string;
  deityInvocation?: string;
  events?: AdditionalEvent[];
}

export interface BirthdayFields {
  name: string;
  age: string | number;
  photo?: string;
  birthdayDate: string;
  time: string;
  venue: string;
  address: string;
  googleMapsUrl?: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
  dressCode?: string;
}

export interface AnniversaryFields {
  partner1Name: string;
  partner2Name: string;
  couplePhoto?: string;
  anniversaryYears: string | number;
  date: string;
  time: string;
  venue: string;
  address: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
}

export interface EngagementFields {
  brideName: string;
  groomName: string;
  couplePhoto?: string;
  engagementDate: string;
  time: string;
  venue: string;
  address: string;
  familyNames?: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
}

export interface BabyShowerFields {
  motherFatherName: string;
  babyName?: string;
  photo?: string;
  showerDate: string;
  time: string;
  venue: string;
  address: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
  registryNote?: string;
}

export interface BabyAnnouncementFields {
  babyName: string;
  babyPhoto?: string;
  birthDate: string;
  birthTime: string;
  birthWeight: string;
  birthHeight: string;
  parents: string;
  message: string;
}

export interface GraduationFields {
  graduateName: string;
  photo?: string;
  degree: string;
  university: string;
  honors?: string;
  graduationDate: string;
  time: string;
  venue: string;
  address: string;
  message: string;
}

export interface HousewarmingFields {
  familyName: string;
  houseName: string;
  date: string;
  time: string;
  address: string;
  googleMapsUrl?: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
}

export interface PartyFields {
  hostName: string;
  partyName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode?: string;
  rsvpName: string;
  rsvpPhone: string;
  message: string;
  photo?: string;
}

export interface ReligiousFields {
  eventName: string;
  deityInvocation?: string;
  hostName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  message: string;
  photo?: string;
  rsvpName: string;
  rsvpPhone: string;
}

export type AnyInvitationFields =
  | WeddingFields
  | BirthdayFields
  | AnniversaryFields
  | EngagementFields
  | BabyShowerFields
  | BabyAnnouncementFields
  | GraduationFields
  | HousewarmingFields
  | PartyFields
  | ReligiousFields
  | Record<string, any>;

export type LanguageCode =
  | 'en' // English
  | 'hi' // Hindi
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'bn' // Bengali
  | 'pa' // Punjabi
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'or'; // Odia

export interface StickerInstance {
  id: string;
  motifId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // in pixels
  color?: string;
  rotation?: number;
}

export interface StickerMotif {
  id: string;
  name: string;
  category: 'auspicious' | 'floral' | 'festive' | 'celebration' | 'badges';
  icon: string;
  defaultColor: string;
}

export type EnvelopeTheme = 'royal-maroon' | 'gold-velvet' | 'emerald-silk' | 'navy-night' | 'blush-rose';

export interface InvitationCustomization {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string; // 'serif' | 'cormorant' | 'script' | 'dancing' | 'alex' | 'cinzel' | 'poppins' | 'montserrat' | 'display' | 'devanagari' | 'devanagari-classic' | 'devanagari-yatra' | 'tamil' | 'telugu' | 'bengali' | 'gujarati' | 'gurmukhi' | 'kannada' | 'malayalam' | 'oriya'
  fontSizeScale: 'sm' | 'md' | 'lg';
  backgroundPattern: 'none' | 'floral' | 'mandala' | 'damask' | 'minimal-dots' | 'marble' | 'stars' | 'geometric' | 'gradient';
  borderStyle: 'none' | 'simple' | 'double-gold' | 'floral-corners' | 'royal-crest' | 'modern-frame' | 'ornate-arches' | 'jharokha' | 'temple-toran';
  stickers?: StickerInstance[];
  envelopeTheme?: EnvelopeTheme;
}

export interface InvitationData<T = AnyInvitationFields> {
  category: InvitationCategory;
  templateId: string;
  fields: T;
  customization: InvitationCustomization;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: InvitationCategory;
  style: TemplateStyle;
  description: string;
  tagline: string;
  defaultCustomization: InvitationCustomization;
  accentPreviewColor: string;
  badge?: string;
}

export interface CategoryInfo {
  id: InvitationCategory;
  title: string;
  icon: string;
  description: string;
  templateCount: number;
  featuredStyle: string;
  gradient: string;
  bannerImagePrompt?: string;
}
