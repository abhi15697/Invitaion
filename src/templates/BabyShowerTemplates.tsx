import React from 'react';
import type { BabyShowerFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, Heart, Gift } from 'lucide-react';

interface BabyShowerTemplateProps {
  fields: BabyShowerFields;
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

export const BabyShowerTemplates: React.FC<BabyShowerTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    motherFatherName = 'Mother-to-be',
    babyName = 'Baby',
    photo,
    showerDate = '2026-12-05',
    time = '15:00',
    venue = 'The Gardenia Terrace',
    address = 'Bangalore',
    rsvpName,
    rsvpPhone,
    message = 'A sweet little angel is on the way! Join us in celebrating.',
    registryNote,
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold" style={{ color: primaryColor }}>
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>OH BABY! SHOWER CELEBRATION</span>
        </div>
        <p className="text-xs font-sans opacity-75">
          Honoring the sweetest arrival
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-script tracking-wide" style={{ color: primaryColor }}>
          {motherFatherName}
        </h1>

        {babyName && (
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-current" style={{ color: accentColor }}>
            Welcoming {babyName}
          </div>
        )}

        {photo && (
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-2 p-1 shadow-lg" style={{ borderColor: primaryColor }}>
            <img src={photo} alt="Baby Shower" className="w-full h-full object-cover rounded-full" />
          </div>
        )}

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>

        {registryNote && (
          <div className="flex items-center justify-center space-x-1.5 text-xs font-medium opacity-80" style={{ color: primaryColor }}>
            <Gift className="w-3.5 h-3.5" />
            <span>{registryNote}</span>
          </div>
        )}
      </div>

      <div className="w-full space-y-4 pb-4">
        <div className="flex items-center justify-center gap-6 py-2.5 border-y border-white/10 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{formatDate(showerDate)}</span>
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
