import React from 'react';
import type { WeddingFields, AdditionalEvent } from '../../types/invitation';
import { FormSection } from './FormSection';
import { ImageUploader } from './ImageUploader';
import { Heart, Calendar, MapPin, Users, Phone, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface WeddingFormProps {
  data: WeddingFields;
  onChange: (field: string, value: any) => void;
}

export const WeddingForm: React.FC<WeddingFormProps> = ({ data, onChange }) => {
  const handleAddEvent = () => {
    const currentEvents = data.events || [];
    const newEvent: AdditionalEvent = {
      id: `event-${Date.now()}`,
      name: 'New Event',
      date: data.weddingDate || '2026-12-25',
      time: '18:00',
      venue: data.venueName || 'Grand Palace',
      address: data.venueAddress || '',
    };
    onChange('events', [...currentEvents, newEvent]);
  };

  const handleUpdateEvent = (id: string, key: keyof AdditionalEvent, value: string) => {
    const currentEvents = data.events || [];
    const updated = currentEvents.map((ev) => (ev.id === id ? { ...ev, [key]: value } : ev));
    onChange('events', updated);
  };

  const handleDeleteEvent = (id: string) => {
    const currentEvents = data.events || [];
    onChange('events', currentEvents.filter((ev) => ev.id !== id));
  };

  const handleMoveEvent = (index: number, direction: 'up' | 'down') => {
    const currentEvents = [...(data.events || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentEvents.length) return;

    const [moved] = currentEvents.splice(index, 1);
    currentEvents.splice(targetIndex, 0, moved);
    onChange('events', currentEvents);
  };

  return (
    <div className="space-y-4 text-slate-200 text-sm">
      {/* 1. Couple Section */}
      <FormSection title="Couple Details" icon={<Heart className="w-4 h-4" />} subtitle="Bride & Groom names and photos">
        <div className="mb-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Auspicious Invocation / मांगलिक श्लोक (Optional)</label>
          <input
            type="text"
            value={data.deityInvocation || ''}
            onChange={(e) => onChange('deityInvocation', e.target.value)}
            placeholder="e.g. ॥ श्री गणेशाय नमः ॥ or Together With Our Families"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Bride Name *</label>
            <input
              type="text"
              value={data.brideName || ''}
              onChange={(e) => onChange('brideName', e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Groom Name *</label>
            <input
              type="text"
              value={data.groomName || ''}
              onChange={(e) => onChange('groomName', e.target.value)}
              placeholder="e.g. Rahul Verma"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <ImageUploader
            label="Couple Photo (Optional)"
            value={data.couplePhoto}
            onChange={(url) => onChange('couplePhoto', url)}
          />
        </div>
      </FormSection>

      {/* 2. Date & Venue */}
      <FormSection title="Date & Venue" icon={<Calendar className="w-4 h-4" />} subtitle="Wedding ceremony schedule and location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Wedding Date *</label>
            <input
              type="date"
              value={data.weddingDate || ''}
              onChange={(e) => onChange('weddingDate', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Ceremony Time *</label>
            <input
              type="time"
              value={data.weddingTime || ''}
              onChange={(e) => onChange('weddingTime', e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Venue Name *</label>
          <input
            type="text"
            value={data.venueName || ''}
            onChange={(e) => onChange('venueName', e.target.value)}
            placeholder="e.g. The Grand Palace Resort"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Venue Address</label>
          <input
            type="text"
            value={data.venueAddress || ''}
            onChange={(e) => onChange('venueAddress', e.target.value)}
            placeholder="e.g. Senapati Bapat Road, Pune, Maharashtra"
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

      {/* 3. Multi-Event Timeline Manager */}
      <FormSection title="Additional Events & Timeline" icon={<MapPin className="w-4 h-4" />} subtitle="Add Mehndi, Sangeet, Haldi, Reception">
        <div className="space-y-3">
          {(data.events || []).map((event, idx) => (
            <div key={event.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Event #{idx + 1}</span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveEvent(idx, 'up')}
                    className="p-1 hover:bg-slate-700 text-slate-400 disabled:opacity-30 rounded"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === (data.events || []).length - 1}
                    onClick={() => handleMoveEvent(idx, 'down')}
                    className="p-1 hover:bg-slate-700 text-slate-400 disabled:opacity-30 rounded"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1 hover:bg-rose-500/20 text-rose-400 rounded"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={event.name}
                  onChange={(e) => handleUpdateEvent(event.id, 'name', e.target.value)}
                  placeholder="Event Name (e.g. Sangeet)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => handleUpdateEvent(event.id, 'date', e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="time"
                  value={event.time}
                  onChange={(e) => handleUpdateEvent(event.id, 'time', e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={event.venue}
                  onChange={(e) => handleUpdateEvent(event.id, 'venue', e.target.value)}
                  placeholder="Event Venue"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddEvent}
            className="w-full py-2 px-3 border border-dashed border-amber-500/40 rounded-xl text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center justify-center space-x-2 text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Event (e.g. Mehndi, Reception)</span>
          </button>
        </div>
      </FormSection>

      {/* 4. Family & Parents */}
      <FormSection title="Family & Parents" icon={<Users className="w-4 h-4" />} subtitle="Bride and Groom parent names">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Bride's Parents</label>
            <input
              type="text"
              value={data.brideParents || ''}
              onChange={(e) => onChange('brideParents', e.target.value)}
              placeholder="e.g. Mr. Rajesh & Mrs. Sunita Sharma"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Groom's Parents</label>
            <input
              type="text"
              value={data.groomParents || ''}
              onChange={(e) => onChange('groomParents', e.target.value)}
              placeholder="e.g. Mr. Anand & Mrs. Rekha Verma"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </FormSection>

      {/* 5. Message & RSVP */}
      <FormSection title="Message & RSVP" icon={<Phone className="w-4 h-4" />} subtitle="Wedding invitation greeting and RSVP contact">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Wedding Message</label>
            <textarea
              rows={3}
              value={data.weddingMessage || ''}
              onChange={(e) => onChange('weddingMessage', e.target.value)}
              placeholder="Two souls, one heart, uniting in celebration..."
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Name</label>
              <input
                type="text"
                value={data.rsvpName || ''}
                onChange={(e) => onChange('rsvpName', e.target.value)}
                placeholder="e.g. Vikram Sharma"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">RSVP Phone / Email</label>
              <input
                type="text"
                value={data.rsvpPhone || ''}
                onChange={(e) => onChange('rsvpPhone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </FormSection>
    </div>
  );
};
