import React from 'react';
import type { WeddingFields, InvitationCustomization } from '../types/invitation';
import { OrnateDivider } from '../components/common/Decorations';
import { Calendar, Clock, MapPin, Phone, Heart } from 'lucide-react';

interface WeddingTemplateProps {
  fields: WeddingFields;
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

export const WeddingTemplates: React.FC<WeddingTemplateProps> = ({
  fields,
  customization,
  templateId,
}) => {
  const {
    brideName = 'Bride',
    groomName = 'Groom',
    weddingDate = '2026-12-25',
    weddingTime = '19:00',
    venueName = 'Grand Palace Ballroom',
    venueAddress = 'Pune, Maharashtra',
    weddingMessage = 'We warmly invite you to celebrate our wedding day with us.',
    brideParents,
    groomParents,
    rsvpName,
    rsvpPhone,
    couplePhoto,
    events,
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  // Render based on template style
  if (templateId === 'wedding-minimal-white') {
    return (
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-12 select-none">
        <div className="space-y-3 pt-6">
          <span className="text-xs uppercase tracking-[0.3em] opacity-70 font-sans" style={{ color: secondaryColor }}>
            Together With Their Families
          </span>
          <p className="text-xs opacity-75 font-sans">
            {brideParents && groomParents ? `${brideParents} & ${groomParents}` : 'Request the honor of your presence'}
          </p>
        </div>

        <div className="my-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight" style={{ color: primaryColor }}>
            {brideName}
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <span className="h-[1px] w-12 bg-current opacity-30" style={{ color: primaryColor }} />
            <span className="font-serif italic text-2xl" style={{ color: accentColor }}>&</span>
            <span className="h-[1px] w-12 bg-current opacity-30" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight" style={{ color: primaryColor }}>
            {groomName}
          </h1>

          {couplePhoto && (
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-2 p-1 shadow-lg" style={{ borderColor: primaryColor }}>
              <img src={couplePhoto} alt="Couple" className="w-full h-full object-cover rounded-full" />
            </div>
          )}

          <p className="max-w-md text-xs md:text-sm font-sans opacity-80 leading-relaxed mx-auto px-4" style={{ color: textColor }}>
            {weddingMessage}
          </p>
        </div>

        <div className="w-full space-y-4 pb-4">
          <div className="py-3 border-y border-opacity-20" style={{ borderColor: primaryColor }}>
            <p className="text-lg font-serif font-semibold tracking-wider uppercase" style={{ color: primaryColor }}>
              {formatDate(weddingDate)}
            </p>
            <p className="text-sm font-sans opacity-90 mt-1" style={{ color: secondaryColor }}>
              {formatTime(weddingTime)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-serif font-bold text-base" style={{ color: primaryColor }}>
              {venueName}
            </p>
            <p className="text-xs font-sans opacity-75 max-w-xs mx-auto" style={{ color: textColor }}>
              {venueAddress}
            </p>
          </div>

          {(rsvpName || rsvpPhone) && (
            <div className="pt-2 text-[11px] font-sans opacity-75">
              <span>RSVP: {rsvpName} {rsvpPhone && `• ${rsvpPhone}`}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (templateId === 'wedding-traditional-indian') {
    return (
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-serif font-semibold tracking-widest uppercase opacity-90" style={{ color: accentColor }}>
            <span>॥ श्री गणेशाय नमः ॥</span>
          </div>
          <p className="text-xs font-sans opacity-80 max-w-sm mx-auto" style={{ color: secondaryColor }}>
            With the divine blessings of our ancestors and families
          </p>
        </div>

        <div className="space-y-4 my-auto w-full px-2">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-wider" style={{ color: primaryColor }}>
              {brideName}
            </h1>
            {brideParents && <p className="text-[11px] opacity-75 font-sans">D/o {brideParents}</p>}
          </div>

          <div className="flex items-center justify-center space-x-3">
            <OrnateDivider color={accentColor} className="my-1" />
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-wider" style={{ color: primaryColor }}>
              {groomName}
            </h1>
            {groomParents && <p className="text-[11px] opacity-75 font-sans">S/o {groomParents}</p>}
          </div>

          {events && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto my-3 text-left">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="p-2 rounded bg-black/25 border border-white/10 text-xs">
                  <p className="font-bold text-amber-300">{ev.name}</p>
                  <p className="opacity-80 text-[10px]">{formatDate(ev.date)} • {formatTime(ev.time)}</p>
                  <p className="opacity-70 text-[10px] truncate">{ev.venue}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs font-sans italic opacity-85 max-w-md mx-auto" style={{ color: secondaryColor }}>
            {weddingMessage}
          </p>
        </div>

        <div className="w-full space-y-3 pb-3">
          <div className="p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-amber-500/30 max-w-md mx-auto">
            <p className="font-cinzel text-lg font-bold" style={{ color: primaryColor }}>
              {formatDate(weddingDate)}
            </p>
            <p className="text-xs font-sans font-medium mt-0.5" style={{ color: accentColor }}>
              Auspicious Muhurat: {formatTime(weddingTime)}
            </p>
            <p className="text-xs font-semibold mt-1" style={{ color: textColor }}>
              {venueName}
            </p>
            <p className="text-[11px] opacity-75 font-sans">{venueAddress}</p>
          </div>

          {(rsvpName || rsvpPhone) && (
            <p className="text-xs font-sans opacity-80">
              R.S.V.P: <span className="font-semibold">{rsvpName}</span> {rsvpPhone && `(${rsvpPhone})`}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default / Royal Gold & Floral & Luxury styles
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-5 space-y-1.5">
        <div className="flex items-center justify-center space-x-2 text-xs font-semibold tracking-widest uppercase opacity-90" style={{ color: accentColor }}>
          <span>{fields.deityInvocation || 'The Wedding Celebration'}</span>
        </div>
        <p className="text-[11px] font-sans opacity-75 max-w-xs mx-auto">
          {brideParents && groomParents ? `${brideParents} & ${groomParents}` : 'We invite you to share in our joy as we exchange wedding vows'}
        </p>
      </div>

      <div className="my-auto space-y-5 w-full">
        {couplePhoto && (
          <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 p-1.5 shadow-2xl relative" style={{ borderColor: primaryColor }}>
            <img src={couplePhoto} alt="Couple" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md rounded-full p-1.5 text-amber-400">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {brideName}
          </h1>
          <div className="flex items-center justify-center space-x-3 py-1">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-current opacity-40" style={{ color: accentColor }} />
            <span className="font-script text-3xl font-normal" style={{ color: accentColor }}>and</span>
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-current opacity-40" style={{ color: accentColor }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
            {groomName}
          </h1>
        </div>

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {weddingMessage}
        </p>
      </div>

      <div className="w-full space-y-4 pb-4">
        <div className="flex items-center justify-center gap-6 py-3 border-y border-white/10 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Calendar className="w-4 h-4 opacity-80" style={{ color: accentColor }} />
            <span>{formatDate(weddingDate)}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-60" />
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Clock className="w-4 h-4 opacity-80" style={{ color: accentColor }} />
            <span>{formatTime(weddingTime)}</span>
          </div>
        </div>

        <div className="space-y-1 max-w-sm mx-auto">
          <div className="flex items-center justify-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 opacity-80" style={{ color: primaryColor }} />
            <p className="font-serif font-bold text-sm tracking-wide" style={{ color: primaryColor }}>
              {venueName}
            </p>
          </div>
          <p className="text-xs font-sans opacity-75">{venueAddress}</p>
        </div>

        {(rsvpName || rsvpPhone) && (
          <div className="flex items-center justify-center space-x-2 text-[11px] font-sans opacity-80">
            <Phone className="w-3 h-3 opacity-70" />
            <span>RSVP: {rsvpName} {rsvpPhone && `• ${rsvpPhone}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};
