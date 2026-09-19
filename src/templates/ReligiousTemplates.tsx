import React from 'react';
import type { ReligiousFields, InvitationCustomization } from '../types/invitation';
import { OrnateDivider } from '../components/common/Decorations';

interface ReligiousTemplateProps {
  fields: ReligiousFields;
  customization: InvitationCustomization;
  templateId?: string;
}

export const ReligiousTemplates: React.FC<ReligiousTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    eventName = 'Shree Ganesh Chaturthi & Mahapooja',
    deityInvocation = '॥ ॐ गं गणपतये नमः ॥',
    hostName = 'The Joshi Parivar',
    date = '2026-09-25',
    time = '10:00 AM Aarti • 1:00 PM Mahaprasad',
    venue = 'Joshi Niwas & Community Hall',
    address = 'Prabhat Road, Erandwane, Pune',
    message = 'You are cordially invited with family to receive divine blessings and partake in Mahaprasad.',
    photo,
    rsvpName,
    rsvpPhone,
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="text-sm font-cinzel font-bold tracking-widest uppercase" style={{ color: accentColor }}>
          {deityInvocation}
        </div>
        <p className="text-xs font-sans opacity-80" style={{ color: secondaryColor }}>
          {hostName} cordially invites you & your family
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold tracking-wide" style={{ color: primaryColor }}>
          {eventName}
        </h1>

        {photo && (
          <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 p-1 shadow-2xl relative" style={{ borderColor: primaryColor }}>
            <img src={photo} alt={eventName} className="w-full h-full object-cover rounded-xl" />
          </div>
        )}

        <OrnateDivider color={accentColor} className="my-2" />

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>
      </div>

      <div className="w-full space-y-3 pb-4">
        <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30 backdrop-blur-md max-w-md mx-auto space-y-1">
          <p className="text-base font-cinzel font-bold" style={{ color: primaryColor }}>
            {date}
          </p>
          <p className="text-xs font-sans font-medium" style={{ color: accentColor }}>
            {time}
          </p>
          <p className="text-xs font-semibold text-white mt-1">{venue}</p>
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
