import React from 'react';
import type { HousewarmingFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, Home } from 'lucide-react';
import { OrnateDivider } from '../components/common/Decorations';

interface HousewarmingTemplateProps {
  fields: HousewarmingFields;
  customization: InvitationCustomization;
  templateId?: string;
}

export const HousewarmingTemplates: React.FC<HousewarmingTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    familyName = 'The Sharma Family',
    houseName = '"Anand Vihar" — Our New Home',
    date = '2026-11-08',
    time = '10:30 AM',
    address = 'Palm Meadows Estates, Whitefield, Bangalore',
    rsvpName,
    rsvpPhone,
    message = 'New walls, new memories, same warm love! We cordially invite you to our Griha Pravesh Puja followed by lunch.',
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-serif tracking-widest uppercase" style={{ color: accentColor }}>
          <Home className="w-3.5 h-3.5" />
          <span>GRIHA PRAVESH & HOUSEWARMING</span>
        </div>
        <p className="text-xs font-sans opacity-75">
          Warmly inviting you to celebrate our new beginnings
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight" style={{ color: primaryColor }}>
          {familyName}
        </h1>

        <div className="inline-block px-4 py-1.5 rounded-xl bg-black/30 border border-amber-500/20 shadow-md">
          <p className="text-sm md:text-base font-serif font-semibold italic" style={{ color: accentColor }}>
            {houseName}
          </p>
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
            <span>{date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Clock className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{time}</span>
          </div>
        </div>

        <div className="space-y-0.5 max-w-sm mx-auto">
          <div className="flex items-center justify-center space-x-1">
            <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            <p className="font-bold text-xs" style={{ color: primaryColor }}>
              New Address
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
