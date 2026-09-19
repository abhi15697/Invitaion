import React from 'react';
import type { BabyAnnouncementFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Star, Scale, Users } from 'lucide-react';

interface BabyAnnouncementFormProps {
  data: BabyAnnouncementFields;
  onChange: (field: string, value: any) => void;
}

export const BabyAnnouncementForm: React.FC<BabyAnnouncementFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Newborn Details" icon={<Star className="w-4 h-4" />} subtitle="Baby name, portrait, and parents">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Baby Full Name *</label>
          <input
            type="text"
            value={data.babyName || ''}
            onChange={(e) => onChange('babyName', e.target.value)}
            placeholder="e.g. Arya Devraj"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Baby Photo"
            value={data.babyPhoto}
            onChange={(url) => onChange('babyPhoto', url)}
          />
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Parents' Names</label>
          <input
            type="text"
            value={data.parents || ''}
            onChange={(e) => onChange('parents', e.target.value)}
            placeholder="e.g. Proud Parents: Ishaan & Maya Devraj"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Birth Statistics" icon={<Scale className="w-4 h-4" />} subtitle="Date, exact time, weight, and length">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Birth Date *</label>
            <input
              type="date"
              value={data.birthDate || ''}
              onChange={(e) => onChange('birthDate', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Birth Time</label>
            <input
              type="text"
              value={data.birthTime || ''}
              onChange={(e) => onChange('birthTime', e.target.value)}
              placeholder="e.g. 06:45 AM"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Birth Weight</label>
            <input
              type="text"
              value={data.birthWeight || ''}
              onChange={(e) => onChange('birthWeight', e.target.value)}
              placeholder="e.g. 3.2 kg (7 lbs 1 oz)"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Birth Height / Length</label>
            <input
              type="text"
              value={data.birthHeight || ''}
              onChange={(e) => onChange('birthHeight', e.target.value)}
              placeholder="e.g. 50 cm (19.7 in)"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Announcement Message" icon={<Users className="w-4 h-4" />} subtitle="Warm welcome message">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Our hearts are fuller than ever. Welcoming our precious little miracle..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>
      </FormSection>
    </div>
  );
};
