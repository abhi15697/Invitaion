import React from 'react';
import type { HousewarmingFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { Home, Calendar, Phone } from 'lucide-react';

interface HousewarmingFormProps {
  data: HousewarmingFields;
  onChange: (field: string, value: any) => void;
}

export const HousewarmingForm: React.FC<HousewarmingFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Home & Host" icon={<Home className="w-4 h-4" />} subtitle="Family and new residence name">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Family Name *</label>
            <input
              type="text"
              value={data.familyName || ''}
              onChange={(e) => onChange('familyName', e.target.value)}
              placeholder="e.g. The Kulkarni Family"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">House / Residence Name *</label>
            <input
              type="text"
              value={data.houseName || ''}
              onChange={(e) => onChange('houseName', e.target.value)}
              placeholder='e.g. "Anand Vihar" — Villa 42'
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Griha Pravesh Schedule & Address" icon={<Calendar className="w-4 h-4" />} subtitle="Puja timings and location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Date *</label>
            <input
              type="text"
              value={data.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
              placeholder="e.g. 2026-11-08 or 8th November 2026"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Time *</label>
            <input
              type="text"
              value={data.time || ''}
              onChange={(e) => onChange('time', e.target.value)}
              placeholder="e.g. 10:30 AM (Griha Pravesh Puja)"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">New Address *</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Villa 42, Palm Meadows Estates, Whitefield, Bangalore"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Google Maps Link</label>
          <input
            type="url"
            value={data.googleMapsUrl || ''}
            onChange={(e) => onChange('googleMapsUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Message & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Welcome note and contact">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="New walls, new memories, same warm family love! Join us for Griha Pravesh..."
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
              placeholder="e.g. Nitin Kulkarni"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone</label>
            <input
              type="text"
              value={data.rsvpPhone || ''}
              onChange={(e) => onChange('rsvpPhone', e.target.value)}
              placeholder="+91 98450 11223"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};
