import React from 'react';
import type { EngagementFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, Sparkles, Gem } from 'lucide-react';
import { OrnateDivider } from '../components/common/Decorations';

interface EngagementTemplateProps {
  fields: EngagementFields;
  customization: InvitationCustomization;
  templateId?: string;
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

export const EngagementTemplates: React.FC<EngagementTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    brideName = 'Bride',
    groomName = 'Groom',
    couplePhoto,
    engagementDate = '2026-11-20',
    time = '18:00',
    venue = 'JW Marriott Sky Lounge',
    address = 'Mumbai',
    familyNames,
    rsvpName,
    rsvpPhone,
    message = 'We said YES to forever! Join us in celebrating our engagement.',
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-serif tracking-widest uppercase" style={{ color: accentColor }}>
          <Gem className="w-3.5 h-3.5" />
          <span>RING CEREMONY & ENGAGEMENT</span>
        </div>
        {familyNames && (
          <p className="text-xs font-sans opacity-75">{familyNames} cordially invite you</p>
        )}
      </div>

      <div className="my-auto space-y-5 w-full">
        {couplePhoto && (
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-2 p-1.5 shadow-xl relative" style={{ borderColor: primaryColor }}>
            <img src={couplePhoto} alt="Couple" className="w-full h-full object-cover rounded-full" />
            <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 rounded-full p-1 shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {brideName}
          </h1>
          <div className="flex items-center justify-center space-x-3 py-1">
            <span className="font-script text-3xl opacity-90" style={{ color: accentColor }}>&</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {groomName}
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
            <span>{formatDate(engagementDate)}</span>
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
