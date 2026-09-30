import { forwardRef } from 'react';
import type {
  InvitationData,
  WeddingFields,
} from '../types/invitation';
import { BackgroundPatternRenderer, BorderFrameRenderer, MotifRenderer } from '../components/common/Decorations';
import { RoyalPeacockWedding, EmbossedIvoryPeacockWedding } from './wedding';

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
    const { templateId, fields, customization } = data;
    const fontClass = getFontFamilyClass(customization.fontFamily);
    const stickers = customization.stickers || [];

    const renderWeddingTemplate = () => {
      if (templateId === 'wedding-embossed-ivory-peacock') {
        return (
          <EmbossedIvoryPeacockWedding
            fields={fields as WeddingFields}
            customization={customization}
          />
        );
      }
      return (
        <RoyalPeacockWedding
          fields={fields as WeddingFields}
          customization={customization}
        />
      );
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
        {customization.backgroundPattern && customization.backgroundPattern !== 'none' && (
          <BackgroundPatternRenderer
            pattern={customization.backgroundPattern}
            color={customization.primaryColor}
          />
        )}

        {/* Dynamic Border Frame */}
        {customization.borderStyle && customization.borderStyle !== 'none' && (
          <BorderFrameRenderer
            style={customization.borderStyle}
            color={customization.primaryColor}
          />
        )}

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
        {renderWeddingTemplate()}
      </div>
    );
  }
);

InvitationRenderer.displayName = 'InvitationRenderer';
