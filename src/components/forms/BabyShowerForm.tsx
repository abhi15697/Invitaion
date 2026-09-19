import React from 'react';
import type { BabyShowerFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Heart, Calendar, Phone } from 'lucide-react';

interface BabyShowerFormProps {
  data: BabyShowerFields;
  onChange: (field: string, value: any) => void;
}

export const BabyShowerForm: React.FC<BabyShowerFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Honoree Details" icon={<Heart className="w-4 h-4" />} subtitle="Mom/Parents-to-be and photo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Mother / Parents *</label>
            <input
              type="text"
              value={data.motherFatherName || ''}
              onChange={(e) => onChange('motherFatherName', e.target.value)}
              placeholder="e.g. Meera & Rohan Singhania"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Baby Name (Optional)</label>
            <input
              type="text"
              value={data.babyName || ''}
              onChange={(e) => onChange('babyName', e.target.value)}
              placeholder="e.g. Baby Singhania"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Ultrasound / Maternity Photo"
            value={data.photo}
            onChange={(url) => onChange('photo', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Shower Schedule & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Date, time, and location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Shower Date *</label>
            <input
              type="date"
              value={data.showerDate || ''}
              onChange={(e) => onChange('showerDate', e.target.value)}
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
            placeholder="e.g. The Gardenia Terrace Cafe"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Indiranagar 100ft Road, Bangalore"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Registry & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Gift preferences, message, and contact">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Gift Registry / Note</label>
          <input
            type="text"
            value={data.registryNote || ''}
            onChange={(e) => onChange('registryNote', e.target.value)}
            placeholder="e.g. Book gifts welcomed in place of cards"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="A sweet little angel is on the way! Join us in showering mommy-to-be..."
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
              placeholder="e.g. Tanya (Sister)"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 97400 88990"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
