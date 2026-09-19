import React from 'react';
import type { ReligiousFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Calendar, Phone, Flame } from 'lucide-react';

interface ReligiousFormProps {
  data: ReligiousFields;
  onChange: (field: string, value: any) => void;
}

export const ReligiousForm: React.FC<ReligiousFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Sacred Event & Host" icon={<Flame className="w-4 h-4" />} subtitle="Puja name, Sanskrit shloka, and family">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Event / Festival Name *</label>
          <input
            type="text"
            value={data.eventName || ''}
            onChange={(e) => onChange('eventName', e.target.value)}
            placeholder="e.g. Shree Ganesh Chaturthi & Mahapooja"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Deity Invocation / Shloka</label>
            <input
              type="text"
              value={data.deityInvocation || ''}
              onChange={(e) => onChange('deityInvocation', e.target.value)}
              placeholder="e.g. ॥ ॐ गं गणपतये नमः ॥"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Host Family Name *</label>
            <input
              type="text"
              value={data.hostName || ''}
              onChange={(e) => onChange('hostName', e.target.value)}
              placeholder="e.g. The Joshi Parivar"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Deity / Mandir Photo"
            value={data.photo}
            onChange={(url) => onChange('photo', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Auspicious Timings & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Puja timings and temple / community hall">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Date *</label>
            <input
              type="text"
              value={data.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
              placeholder="e.g. 25th September 2026"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Auspicious Time *</label>
            <input
              type="text"
              value={data.time || ''}
              onChange={(e) => onChange('time', e.target.value)}
              placeholder="e.g. 10:00 AM Aarti • 1:00 PM Mahaprasad"
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
            placeholder="e.g. Joshi Niwas & Community Hall"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Prabhat Road, Erandwane, Pune"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Blessings & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Sacred invitation note and RSVP">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="You are cordially invited with family to receive the auspicious blessings..."
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
              placeholder="e.g. Sudhir Joshi"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 94220 33445"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
