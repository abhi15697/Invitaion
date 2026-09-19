import React from 'react';
import type { GraduationFields, InvitationCustomization } from '../types/invitation';
import { Calendar, Clock, MapPin, GraduationCap, Award } from 'lucide-react';

interface GraduationTemplateProps {
  fields: GraduationFields;
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

export const GraduationTemplates: React.FC<GraduationTemplateProps> = ({
  fields,
  customization,
}) => {
  const {
    graduateName = 'Graduate Name',
    photo,
    degree = 'Bachelor of Science in Computer Science',
    university = 'Indian Institute of Technology',
    honors = 'Class of 2026',
    graduationDate = '2026-07-20',
    time = '11:00 AM',
    venue = 'University Convocation Auditorium',
    address = 'Mumbai',
    message = 'Join us in celebrating this academic milestone and exciting new chapter ahead.',
  } = fields;

  const { primaryColor, secondaryColor, textColor, accentColor } = customization;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center p-10 select-none">
      <div className="pt-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-serif tracking-widest uppercase" style={{ color: accentColor }}>
          <GraduationCap className="w-4 h-4" />
          <span>CONVOCATION & COMMENCEMENT</span>
        </div>
        <p className="text-xs font-sans opacity-75">
          Celebrating the Graduation of
        </p>
      </div>

      <div className="my-auto space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-wider" style={{ color: primaryColor }}>
          {graduateName}
        </h1>

        {honors && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/40 border border-amber-500/30 text-xs font-semibold" style={{ color: primaryColor }}>
            <Award className="w-3.5 h-3.5" />
            <span>{honors}</span>
          </div>
        )}

        {photo && (
          <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 p-1 shadow-xl" style={{ borderColor: primaryColor }}>
            <img src={photo} alt={graduateName} className="w-full h-full object-cover rounded-xl" />
          </div>
        )}

        <div className="space-y-1">
          <p className="text-sm md:text-base font-serif font-semibold" style={{ color: accentColor }}>
            {degree}
          </p>
          <p className="text-xs font-sans opacity-80" style={{ color: secondaryColor }}>
            {university}
          </p>
        </div>

        <p className="text-xs md:text-sm font-sans opacity-85 max-w-sm mx-auto leading-relaxed" style={{ color: textColor }}>
          {message}
        </p>
      </div>

      <div className="w-full space-y-4 pb-4">
        <div className="flex items-center justify-center gap-6 py-2.5 border-y border-white/10 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs font-medium" style={{ color: secondaryColor }}>
            <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{formatDate(graduationDate)}</span>
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
      </div>
    </div>
  );
};
