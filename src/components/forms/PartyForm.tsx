import React from 'react';
import type { PartyFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Calendar, Phone, Music } from 'lucide-react';

interface PartyFormProps {
  data: PartyFields;
  onChange: (field: string, value: any) => void;
}

export const PartyForm: React.FC<PartyFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Party & Host" icon={<Music className="w-4 h-4" />} subtitle="Event title, host, and dress code">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Host Name *</label>
            <input
              type="text"
              value={data.hostName || ''}
              onChange={(e) => onChange('hostName', e.target.value)}
              placeholder="e.g. Dev & Friends"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Party / Event Name *</label>
            <input
              type="text"
              value={data.partyName || ''}
              onChange={(e) => onChange('partyName', e.target.value)}
              placeholder="e.g. Neon Glow & Cocktails"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Dress Code</label>
          <input
            type="text"
            value={data.dressCode || ''}
            onChange={(e) => onChange('dressCode', e.target.value)}
            placeholder="e.g. Glamorous Metallic or All-Black Chic"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Party Banner / Photo"
            value={data.photo}
            onChange={(url) => onChange('photo', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Date & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Timings and lounge address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Date *</label>
            <input
              type="date"
              value={data.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
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
            placeholder="e.g. Highline Rooftop Lounge"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Cyber City Tower B, Gurugram"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Message & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Party description and guest list">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Party Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Bid farewell to the old year with electrifying DJ beats, gourmet cocktails..."
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
              placeholder="e.g. Dev Oberoi"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 99100 77889"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
