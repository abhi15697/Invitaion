import React from 'react';
import type { PartyFields, InvitationCustomization } from '../types/invitation';
import { Music } from 'lucide-react';

interface PartyTemplateProps {
  fields: PartyFields;
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

export const PartyTemplates: React.FC<PartyTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    hostName = 'Host Name',
    partyName = 'Neon Glow & Cocktails',
    date = '2026-12-31',
    time = '20:30',
    venue = 'Highline Rooftop Lounge',
    address = 'Gurugram',
    dressCode = 'Glamorous Metallic or All-Black',
    rsvpName,
    rsvpPhone,
    message = 'Bid farewell to the old year with electrifying beats, cocktails, and great company!',
    photo,
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-fuchsia-500/40 bg-fuchsia-950/30 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(217,70,239,0.25)]">
          <Music className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span style={{ color: secondaryColor }}>{hostName} PRESENTS</span>
        </div>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1
          className="text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight leading-none"
          style={{
            color: primaryColor,
            textShadow: `0 0 20px ${primaryColor}88`,
          }}
        >
          {partyName}
        </h1>

        {photo && (
          <div className="w-40 h-32 mx-auto rounded-2xl overflow-hidden border-2 p-1 shadow-2xl" style={{ borderColor: primaryColor }}>
            <img src={photo} alt={partyName} className="w-full h-full object-cover rounded-xl" />
          </div>
        )}

        <p className="text-xs md:text-sm font-sans opacity-90 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>

        {dressCode && (
          <div className="inline-block px-3.5 py-1 rounded bg-white/5 border border-white/10 text-xs" style={{ color: accentColor }}>
            Dress Code: <span className="font-semibold">{dressCode}</span>
          </div>
        )}
      </div>

      <div className="w-full space-y-3.5 pb-4">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-fuchsia-500/30 backdrop-blur-md max-w-md mx-auto space-y-1 shadow-lg">
          <p className="text-sm font-bold font-display" style={{ color: primaryColor }}>
            {formatDate(date)} • {formatTime(time)}
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
};
