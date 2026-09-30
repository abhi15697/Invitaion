import React from 'react';
import type { WeddingFields, InvitationCustomization } from '../../types/invitation';
import { BaroqueGoldPhotoFrame } from '../../components/common/Decorations';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

export interface RoyalPeacockWeddingProps {
  fields: WeddingFields;
  customization?: InvitationCustomization;
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

export const RoyalPeacockWedding: React.FC<RoyalPeacockWeddingProps> = ({
  fields,
  customization,
}) => {
  const {
    brideName = 'Priya Sharma',
    groomName = 'Rahul Verma',
    weddingDate = '2026-12-25',
    weddingTime = '19:00',
    venueName = 'The Grand Palace Resort',
    venueAddress = 'Senapati Bapat Road, Pune, Maharashtra 411016',
    weddingMessage = 'Two souls, one heart, uniting in love and celebration. We warmly request the honor of your presence as we exchange our sacred vows.',
    brideParents = 'Mr. Rajesh & Mrs. Sunita Sharma',
    groomParents = 'Mr. Anand & Mrs. Rekha Verma',
    rsvpName = 'Vikram Sharma',
    rsvpPhone = '+91 98765 43210',
    couplePhoto,
  } = fields;

  const primaryColor = customization?.primaryColor || '#f59e0b';
  const secondaryColor = customization?.secondaryColor || '#fef3c7';
  const accentColor = customization?.accentColor || '#fbbf24';
  const textColor = customization?.textColor || '#ffffff';

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center px-8 py-6 select-none transition-colors duration-300">
      {/* Top Header Section */}
      <div className="space-y-1 pt-1">
        <p
          className="text-[12px] uppercase font-serif font-bold tracking-[0.25em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          style={{
            color: accentColor,
            textShadow: `0 0 10px ${primaryColor}66`,
          }}
        >
          {fields.deityInvocation || 'THE WEDDING CELEBRATION'}
        </p>

        <p
          className="text-[11px] font-serif sm:text-[11.5px] italic tracking-wide max-w-sm mx-auto leading-tight"
          style={{ color: secondaryColor }}
        >
          {brideParents && groomParents
            ? `${brideParents} & ${groomParents}`
            : 'Together with their beloved families'}
        </p>
      </div>

      {/* Center Section: Antique Baroque Carved Gold Frame Photo + Couple Typography */}
      <div className="my-auto space-y-3 w-full flex flex-col items-center">
        {/* Baroque Sculpted Gold Frame with Couple Photo */}
        <BaroqueGoldPhotoFrame
          imageSrc={couplePhoto || '/images/wedding_couple.jpg'}
          alt={`${brideName} & ${groomName}`}
          width={130}
          height={160}
        />

        {/* Couple Names in Luxurious Gold Calligraphy */}
        <div className="space-y-0 pt-0.5">
          <h1
            className="text-[38px] sm:text-[42px] font-script leading-[1.1] tracking-wide"
            style={{
              background: `linear-gradient(180deg, #fffbeb 0%, #fef08a 25%, ${accentColor} 60%, ${primaryColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.75)) drop-shadow(0px 0px 10px ${primaryColor}66)`,
            }}
          >
            {brideName}
          </h1>

          <p
            className="font-script text-2xl italic leading-none my-0"
            style={{
              color: secondaryColor,
              filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.6))',
            }}
          >
            and
          </p>

          <h1
            className="text-[38px] sm:text-[42px] font-script leading-[1.1] tracking-wide"
            style={{
              background: `linear-gradient(180deg, #fffbeb 0%, #fef08a 25%, ${accentColor} 60%, ${primaryColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.75)) drop-shadow(0px 0px 10px ${primaryColor}66)`,
            }}
          >
            {groomName}
          </h1>
        </div>

        {/* Invitation Message */}
        <p
          className="text-[11.5px] font-serif opacity-95 max-w-[380px] mx-auto leading-relaxed px-2"
          style={{
            color: textColor,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {weddingMessage}
        </p>
      </div>

      {/* Bottom Details Section */}
      <div className="w-full space-y-2 pb-1">
        {/* Date & Time Row with Icons */}
        <div className="flex items-center justify-center space-x-3 text-xs font-medium" style={{ color: secondaryColor }}>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="font-semibold">{formatDate(weddingDate)}</span>
          </div>
          <span style={{ color: accentColor }} className="opacity-80">•</span>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="font-semibold">{formatTime(weddingTime)}</span>
          </div>
        </div>

        {/* Venue & Address */}
        <div className="space-y-0.5 max-w-sm mx-auto">
          <div className="flex items-center justify-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
            <p
              className="font-serif font-bold text-[12.5px] tracking-wide"
              style={{ color: secondaryColor }}
            >
              {venueName}
            </p>
          </div>
          <p className="text-[10.5px] font-sans opacity-85" style={{ color: textColor }}>
            {venueAddress}
          </p>
        </div>

        {/* RSVP Row */}
        {(rsvpName || rsvpPhone) && (
          <div className="flex items-center justify-center space-x-1.5 text-[10.5px] font-sans opacity-90" style={{ color: secondaryColor }}>
            <Phone className="w-3 h-3 opacity-80" style={{ color: accentColor }} />
            <span>
              RSVP: {rsvpName} {rsvpPhone && `• ${rsvpPhone}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
