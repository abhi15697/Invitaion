import React from 'react';
import type { AnniversaryFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, Heart, Sparkles } from 'lucide-react';
import { OrnateDivider } from '../components/common/Decorations';

interface AnniversaryTemplateProps {
  fields: AnniversaryFields;
  customization: InvitationCustomization;
  templateId: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr: string) => {
  if (!timeStr) return '';
  if (timeStr.includes(':')) {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${suffix}`;
  }
  return timeStr;
};

export const AnniversaryTemplates: React.FC<AnniversaryTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    partner1Name = 'Partner 1',
    partner2Name = 'Partner 2',
    anniversaryYears = '25th Silver Jubilee',
    couplePhoto,
    date = '2026-10-18',
    time = '19:30',
    venue = 'The Grand Heritage Hall',
    address = 'Bangalore',
    rsvpName,
    rsvpPhone,
    message = 'Celebrating years of love, companionship, and shared dreams.',
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-serif tracking-widest uppercase" style={{ color: accentColor }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{anniversaryYears} ANNIVERSARY</span>
        </div>
        <p className="text-xs font-sans opacity-75">
          Together in love & happiness
        </p>
      </div>

      <div className="my-auto space-y-5 w-full">
        {couplePhoto && (
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 p-1.5 shadow-xl relative" style={{ borderColor: primaryColor }}>
            <img src={couplePhoto} alt="Couple" className="w-full h-full object-cover rounded-full" />
            <div className="absolute bottom-1 right-2 bg-black/60 rounded-full p-1.5 text-rose-400">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {partner1Name}
          </h1>
          <div className="flex items-center justify-center space-x-3 py-1">
            <span className="font-script text-3xl opacity-90" style={{ color: accentColor }}>&</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {partner2Name}
          </h1>
        </div>

        <OrnateDivider color={accentColor} className="my-2" />

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>
      </div>

      <div className="w-full space-y-4 pb-4">
        <div className="flex items-center justify-center gap-6 py-2.5 border-y border-white/10 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{formatDate(date)}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Clock className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{formatTime(time)}</span>
          </div>
        </div>

        <div className="space-y-0.5 max-w-sm mx-auto">
          <div className="flex items-center justify-center space-x-1">
            <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            <p className="font-bold text-xs" style={{ color: primaryColor }}>
              {venue}
            </p>
          </div>
          <p className="text-[11px] font-sans opacity-75">{address}</p>
        </div>

        {(rsvpName || rsvpPhone) && (
          <div className="text-xs font-sans opacity-80">
            <span>RSVP: {rsvpName} {rsvpPhone && `• ${rsvpPhone}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};
