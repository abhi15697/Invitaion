import React from 'react';
import type { EngagementFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Gem, Calendar, Phone } from 'lucide-react';

interface EngagementFormProps {
  data: EngagementFields;
  onChange: (field: string, value: any) => void;
}

export const EngagementForm: React.FC<EngagementFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Couple Details" icon={<Gem className="w-4 h-4" />} subtitle="Bride, Groom, and photo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Bride Name *</label>
            <input
              type="text"
              value={data.brideName || ''}
              onChange={(e) => onChange('brideName', e.target.value)}
              placeholder="e.g. Rhea Kapoor"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Groom Name *</label>
            <input
              type="text"
              value={data.groomName || ''}
              onChange={(e) => onChange('groomName', e.target.value)}
              placeholder="e.g. Kabir Mehta"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Host Families</label>
          <input
            type="text"
            value={data.familyNames || ''}
            onChange={(e) => onChange('familyNames', e.target.value)}
            placeholder="e.g. Kapoor & Mehta Families"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Couple Photo"
            value={data.couplePhoto}
            onChange={(url) => onChange('couplePhoto', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Engagement Ceremony & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Date, time, and hall">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Date *</label>
            <input
              type="date"
              value={data.engagementDate || ''}
              onChange={(e) => onChange('engagementDate', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Time *</label>
            <input
              type="time"
              value={data.time || ''}
              onChange={(e) => onChange('time', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Venue Name *</label>
          <input
            type="text"
            value={data.venue || ''}
            onChange={(e) => onChange('venue', e.target.value)}
            placeholder="e.g. JW Marriott Sky Lounge"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Juhu Tara Road, Mumbai"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Message & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Engagement invitation note and contact">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="We said YES to forever! Come celebrate our ring ceremony..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Name</label>
            <input
              type="text"
              value={data.rsvpName || ''}
              onChange={(e) => onChange('rsvpName', e.target.value)}
              placeholder="e.g. Simran Kapoor"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 99300 44556"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
