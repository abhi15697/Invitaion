import React from 'react';
import type { GraduationFields } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface GraduationFormProps {
  data: GraduationFields;
  onChange: (field: string, value: any) => void;
}

export const GraduationForm: React.FC<GraduationFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-slate-200 text-sm">
      <FormSection title="Graduate Details" icon={<GraduationCap className="w-4 h-4" />} subtitle="Graduate name, degree, and university">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Graduate Full Name *</label>
          <input
            type="text"
            value={data.graduateName || ''}
            onChange={(e) => onChange('graduateName', e.target.value)}
            placeholder="e.g. Aditya Sen"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Degree / Major *</label>
            <input
              type="text"
              value={data.degree || ''}
              onChange={(e) => onChange('degree', e.target.value)}
              placeholder="e.g. Bachelor of Science in CS"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">University / School *</label>
            <input
              type="text"
              value={data.university || ''}
              onChange={(e) => onChange('university', e.target.value)}
              placeholder="e.g. IIT Bombay"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Honors / Class of</label>
          <input
            type="text"
            value={data.honors || ''}
            onChange={(e) => onChange('honors', e.target.value)}
            placeholder="e.g. Summa Cum Laude • Class of 2026"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Graduate Portrait"
            value={data.photo}
            onChange={(url) => onChange('photo', url)}
          />
        </div>
      </FormSection>

      <FormSection title="Convocation Schedule & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Ceremony date, time, and auditorium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Date *</label>
            <input
              type="date"
              value={data.graduationDate || ''}
              onChange={(e) => onChange('graduationDate', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Time *</label>
            <input
              type="text"
              value={data.time || ''}
              onChange={(e) => onChange('time', e.target.value)}
              placeholder="e.g. 11:00 AM"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Auditorium / Venue *</label>
          <input
            type="text"
            value={data.venue || ''}
            onChange={(e) => onChange('venue', e.target.value)}
            placeholder="e.g. University Convocation Auditorium"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. Powai Campus, Mumbai"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </FormSection>

      <FormSection title="Celebration Message" icon={<Award className="w-4 h-4" />} subtitle="Graduate achievement note">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={2}
            value={data.message || ''}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="The tassel was worth the hassle! Join us in celebrating..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>
      </FormSection>
    </div>
  );
};
