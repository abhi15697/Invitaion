import { forwardRef } from 'react';
import type {
  InvitationData,
  WeddingFields,
  BirthdayFields,
  AnniversaryFields,
  EngagementFields,
  BabyShowerFields,
  BabyAnnouncementFields,
  GraduationFields,
  HousewarmingFields,
  PartyFields,
  ReligiousFields,
} from '../types/invitation';
import { BackgroundPatternRenderer, BorderFrameRenderer, MotifRenderer } from '../components/common/Decorations';
import { WeddingTemplates } from './WeddingTemplates';
import { BirthdayTemplates } from './BirthdayTemplates';
import { AnniversaryTemplates } from './AnniversaryTemplates';
import { EngagementTemplates } from './EngagementTemplates';
import { BabyShowerTemplates } from './BabyShowerTemplates';
import { BabyAnnouncementTemplates } from './BabyAnnouncementTemplates';
import { GraduationTemplates } from './GraduationTemplates';
import { HousewarmingTemplates } from './HousewarmingTemplates';
import { PartyTemplates } from './PartyTemplates';
import { ReligiousTemplates } from './ReligiousTemplates';

interface InvitationRendererProps {
  data: InvitationData;
  scale?: number;
  className?: string;
}

const getFontFamilyClass = (fontKey: string) => {
  switch (fontKey) {
    case 'serif':
      return 'font-serif';
    case 'cormorant':
      return 'font-cormorant';
    case 'cinzel':
      return 'font-cinzel';
    case 'script':
      return 'font-script';
    case 'dancing':
      return 'font-dancing';
    case 'alex':
      return 'font-alex';
    case 'poppins':
      return 'font-poppins';
    case 'montserrat':
      return 'font-montserrat';
    case 'display':
      return 'font-display';
    case 'devanagari':
      return 'font-devanagari';
    case 'devanagari-classic':
      return 'font-devanagari-classic';
    case 'devanagari-yatra':
      return 'font-devanagari-yatra';
    case 'tamil':
      return 'font-tamil';
    case 'telugu':
      return 'font-telugu';
    case 'bengali':
      return 'font-bengali';
    case 'gujarati':
      return 'font-gujarati';
    case 'gurmukhi':
      return 'font-gurmukhi';
    case 'kannada':
      return 'font-kannada';
    case 'malayalam':
      return 'font-malayalam';
    case 'oriya':
      return 'font-oriya';
    default:
      return 'font-serif';
  }
};

export const InvitationRenderer = forwardRef<HTMLDivElement, InvitationRendererProps>(
  ({ data, scale = 1, className = '' }, ref) => {
    const { category, templateId, fields, customization } = data;
    const fontClass = getFontFamilyClass(customization.fontFamily);
    const stickers = customization.stickers || [];

    const renderCategoryContent = () => {
      switch (category) {
        case 'wedding':
          return <WeddingTemplates fields={fields as WeddingFields} customization={customization} templateId={templateId} />;
        case 'birthday':
          return <BirthdayTemplates fields={fields as BirthdayFields} customization={customization} templateId={templateId} />;
        case 'anniversary':
          return <AnniversaryTemplates fields={fields as AnniversaryFields} customization={customization} templateId={templateId} />;
        case 'engagement':
          return <EngagementTemplates fields={fields as EngagementFields} customization={customization} templateId={templateId} />;
        case 'baby-shower':
          return <BabyShowerTemplates fields={fields as BabyShowerFields} customization={customization} templateId={templateId} />;
        case 'baby-announcement':
          return <BabyAnnouncementTemplates fields={fields as BabyAnnouncementFields} customization={customization} templateId={templateId} />;
        case 'graduation':
          return <GraduationTemplates fields={fields as GraduationFields} customization={customization} templateId={templateId} />;
        case 'housewarming':
          return <HousewarmingTemplates fields={fields as HousewarmingFields} customization={customization} templateId={templateId} />;
        case 'party':
          return <PartyTemplates fields={fields as PartyFields} customization={customization} templateId={templateId} />;
        case 'religious':
          return <ReligiousTemplates fields={fields as ReligiousFields} customization={customization} templateId={templateId} />;
        default:
          return <WeddingTemplates fields={fields as WeddingFields} customization={customization} templateId={templateId} />;
      }
    };

    return (
      <div
        ref={ref}
        id="invitation-export-canvas"
        className={`relative overflow-hidden shadow-2xl transition-all duration-300 ${fontClass} ${className}`}
        style={{
          width: '540px',
          height: '675px', // 4:5 aspect ratio (1080 x 1350 scaled for preview container)
          backgroundColor: customization.backgroundColor,
          color: customization.textColor,
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* Dynamic Background Pattern */}
        <BackgroundPatternRenderer
          pattern={customization.backgroundPattern}
          color={customization.primaryColor}
        />

        {/* Dynamic Border Frame */}
        <BorderFrameRenderer
          style={customization.borderStyle}
          color={customization.primaryColor}
        />

        {/* Placed Stickers / Motifs Layer */}
        {stickers.map((stk) => (
          <div
            key={stk.id}
            className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
            style={{
              left: `${stk.x}%`,
              top: `${stk.y}%`,
              transform: `translate(-50%, -50%) rotate(${stk.rotation || 0}deg)`,
            }}
          >
            <MotifRenderer
              motifId={stk.motifId}
              color={stk.color || customization.primaryColor}
              size={stk.size || 40}
            />
          </div>
        ))}

        {/* Template Category Content */}
        {renderCategoryContent()}
      </div>
    );
  }
);

InvitationRenderer.displayName = 'InvitationRenderer';
