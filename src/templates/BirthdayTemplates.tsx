import React from 'react';
import type { BirthdayFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, Sparkles, PartyPopper } from 'lucide-react';

interface BirthdayTemplateProps {
  fields: BirthdayFields;
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
      month: 'short',
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

export const BirthdayTemplates: React.FC<BirthdayTemplateProps> = ({
  fields,
  customization,
  templateId,
}) => {
  const {
    name = 'Guest of Honor',
    age = 5,
    photo,
    birthdayDate = '2026-11-15',
    time = '16:30',
    venue = 'Magic Kingdom Play Arena',
    address = 'Pune, Maharashtra',
    rsvpName,
    rsvpPhone,
    message = 'Join us for games, cake cutting, and lots of celebratory fun!',
    dressCode,
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  if (templateId === 'birthday-neon-party') {
    return (
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
        <div className="pt-6 space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOU ARE INVITED TO THE PARTY</span>
          </div>
        </div>

        <div className="my-auto space-y-5 w-full">
          <p className="text-sm font-sans tracking-widest uppercase opacity-80" style={{ color: accentColor }}>
            TURNING {age} & READY TO CELEBRATE
          </p>

          <h1
            className="text-5xl md:text-6xl font-display font-extrabold uppercase tracking-wide leading-none"
            style={{
              color: primaryColor,
              textShadow: `0 0 20px ${primaryColor}88, 0 0 40px ${primaryColor}44`,
            }}
          >
            {name}
          </h1>

          {photo && (
            <div
              className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 p-1 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              style={{ borderColor: primaryColor }}
            >
              <img src={photo} alt={name} className="w-full h-full object-cover rounded-full" />
            </div>
          )}

          <p className="text-xs md:text-sm font-sans opacity-90 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
            {message}
          </p>

          {dressCode && (
            <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-xs" style={{ color: accentColor }}>
              Dress Code: <span className="font-semibold">{dressCode}</span>
            </div>
          )}
        </div>

        <div className="w-full space-y-3 pb-4">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md max-w-md mx-auto space-y-1.5 shadow-lg">
            <p className="text-base font-bold text-cyan-300 font-display">
              {formatDate(birthdayDate)} • {formatTime(time)}
            </p>
            <p className="text-xs font-semibold text-white">{venue}</p>
            <p className="text-[11px] opacity-75 font-sans">{address}</p>
          </div>

          {(rsvpName || rsvpPhone) && (
            <p className="text-xs font-sans opacity-80">
              RSVP: <span className="font-semibold">{rsvpName}</span> {rsvpPhone && `(${rsvpPhone})`}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default & Colorful & Kids fun
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-xs font-semibold" style={{ color: primaryColor }}>
          <PartyPopper className="w-4 h-4" />
          <span>JOIN THE BIRTHDAY BASH!</span>
        </div>
        <p className="text-xs font-sans opacity-80" style={{ color: secondaryColor }}>
          Please join us to celebrate
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight" style={{ color: primaryColor }}>
          {name}
        </h1>

        <div className="flex items-center justify-center space-x-3">
          <span className="h-0.5 w-10 opacity-30" style={{ backgroundColor: accentColor }} />
          <span className="text-xl font-bold font-sans px-3 py-0.5 rounded-full border border-current" style={{ color: accentColor }}>
            Is Turning {age}!
          </span>
          <span className="h-0.5 w-10 opacity-30" style={{ backgroundColor: accentColor }} />
        </div>

        {photo && (
          <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 p-1.5 shadow-xl rotate-1 hover:rotate-0 transition-transform" style={{ borderColor: primaryColor }}>
            <img src={photo} alt={name} className="w-full h-full object-cover rounded-xl" />
          </div>
        )}

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>

        {dressCode && (
          <p className="text-xs font-sans font-medium opacity-80">
            🎨 <span className="font-semibold">Dress Code:</span> {dressCode}
          </p>
        )}
      </div>

      <div className="w-full space-y-3.5 pb-4">
        <div className="flex items-center justify-center gap-6 py-2.5 border-y border-white/10 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{formatDate(birthdayDate)}</span>
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
