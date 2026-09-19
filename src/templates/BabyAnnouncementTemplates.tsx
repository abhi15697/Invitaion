import React from 'react';
import type { BabyAnnouncementFields, InvitationCustomization } from '../types/invitation';
import { Heart, Star, Clock, Ruler, Scale } from 'lucide-react';

interface BabyAnnouncementProps {
  fields: BabyAnnouncementFields;
  customization: InvitationCustomization;
  templateId?: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const BabyAnnouncementTemplates: React.FC<BabyAnnouncementProps> = ({
  fields,
  customization,
}) => {
  const {
    babyName = 'Baby Name',
    babyPhoto,
    birthDate = '2026-09-12',
    birthTime = '06:45 AM',
    birthWeight = '3.2 kg',
    birthHeight = '50 cm',
    parents = 'Proud Parents: Ishaan & Maya',
    message = 'Our hearts are fuller than ever. Welcoming our precious little miracle into the world.',
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-serif tracking-widest uppercase" style={{ color: accentColor }}>
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>WELCOME TO THE WORLD</span>
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
        <p className="text-xs font-sans opacity-75">
          Introducing our greatest blessing
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-script tracking-wide" style={{ color: primaryColor }}>
          {babyName}
        </h1>

        {babyPhoto && (
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 p-1.5 shadow-2xl relative" style={{ borderColor: primaryColor }}>
            <img src={babyPhoto} alt={babyName} className="w-full h-full object-cover rounded-full" />
            <div className="absolute bottom-2 right-2 bg-pink-500 text-white rounded-full p-1.5 shadow">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        )}

        {/* Birth Stat Cards */}
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto my-3 text-center">
          <div className="p-2 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" style={{ color: primaryColor }} />
            <p className="text-[10px] uppercase tracking-wider opacity-60">Time</p>
            <p className="text-xs font-bold font-mono" style={{ color: primaryColor }}>{birthTime}</p>
          </div>

          <div className="p-2 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm">
            <Scale className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" style={{ color: primaryColor }} />
            <p className="text-[10px] uppercase tracking-wider opacity-60">Weight</p>
            <p className="text-xs font-bold font-mono" style={{ color: primaryColor }}>{birthWeight}</p>
          </div>

          <div className="p-2 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm">
            <Ruler className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" style={{ color: primaryColor }} />
            <p className="text-[10px] uppercase tracking-wider opacity-60">Height</p>
            <p className="text-xs font-bold font-mono" style={{ color: primaryColor }}>{birthHeight}</p>
          </div>
        </div>

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>
      </div>

      <div className="w-full space-y-2 pb-4">
        <div className="py-2.5 border-t border-white/10 max-w-md mx-auto">
          <p className="text-sm font-serif font-bold" style={{ color: primaryColor }}>
            Born on {formatDate(birthDate)}
          </p>
          <p className="text-xs font-sans opacity-80 mt-0.5" style={{ color: secondaryColor }}>
            {parents}
          </p>
        </div>
      </div>
    </div>
  );
};
