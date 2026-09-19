import React from 'react';
import type { BirthdayFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Cake, Calendar, Phone } from 'lucide-react';

interface BirthdayFormProps {
  data: BirthdayFields;
  onChange: (field: string, value: any) => void;
}

export const BirthdayForm: React.FC<BirthdayFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Birthday Person" icon={<Cake className="w-4 h-4" />} subtitle="Name, age turning, and photo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Celebrant Name *</label>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="e.g. Aarav Malhotra"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Age Turning *</label>
            <input
              type="text"
              value={data.age || ''}
              onChange={(e) => onChange('age', e.target.value)}
              placeholder="e.g. 5, 18, 30th"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Birthday Photo"
            value={data.photo}
            onChange={(url) => onChange('photo', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Party Schedule & Location" icon={<Calendar className="w-4 h-4" />} subtitle="Date, time, venue, and dress code">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Birthday Date *</label>
            <input
              type="date"
              value={data.birthdayDate || ''}
              onChange={(e) => onChange('birthdayDate', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Party Time *</label>
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
            placeholder="e.g. Magic Kingdom Play Arena"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Phoenix Marketcity, Pune"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Dress Code (Optional)</label>
          <input
            type="text"
            value={data.dressCode || ''}
            onChange={(e) => onChange('dressCode', e.target.value)}
            placeholder="e.g. Superheroes or Neon Brights"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Message & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Custom birthday note and contact">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Party Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Join us for cake cutting, magic shows, and fun!"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Host</label>
            <input
              type="text"
              value={data.rsvpName || ''}
              onChange={(e) => onChange('rsvpName', e.target.value)}
              placeholder="e.g. Kavita Malhotra"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 98220 12345"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
