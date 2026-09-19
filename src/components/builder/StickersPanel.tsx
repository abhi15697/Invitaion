import React, { useState } from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { MOTIFS_CATALOG } from '../../data/motifs';
import { MotifRenderer } from '../common/Decorations';
import { Plus, Trash2, Sparkles, Layers } from 'lucide-react';

export const StickersPanel: React.FC = () => {
  const customization = useInvitationStore((state) => state.customization);
  const addSticker = useInvitationStore((state) => state.addSticker);
  const removeSticker = useInvitationStore((state) => state.removeSticker);
  const updateSticker = useInvitationStore((state) => state.updateSticker);
  const clearStickers = useInvitationStore((state) => state.clearStickers);

  const [activeCategory, setActiveCategory] = useState<'all' | 'auspicious' | 'badges' | 'floral' | 'celebration'>('all');
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  const activeStickers = customization.stickers || [];

  const filteredMotifs = MOTIFS_CATALOG.filter(
    (m) => activeCategory === 'all' || m.category === activeCategory
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Motifs & Stickers (शुभ चिन्ह)</span>
          </h2>
          <p className="text-[11px] text-slate-400">Canva-style motifs, seals, and festive badges</p>
        </div>

        {activeStickers.length > 0 && (
          <button
            type="button"
            onClick={clearStickers}
            className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'auspicious', label: '🕉️ Auspicious' },
          { id: 'badges', label: '👑 Seals & Badges' },
          { id: 'floral', label: '🌿 Floral' },
          { id: 'celebration', label: '🎉 Celebration' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Motifs Grid */}
      <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-slate-900/40 rounded-2xl border border-white/5">
        {filteredMotifs.map((motif) => (
          <button
            key={motif.id}
            type="button"
            onClick={() => addSticker(motif.id)}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col items-center justify-center space-y-1.5 group relative hover:scale-[1.03] active:scale-[0.98]"
            title={`Add ${motif.name} to invitation`}
          >
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MotifRenderer motifId={motif.id} color={motif.defaultColor} size={32} />
            </div>
            <span className="text-[10px] font-medium text-slate-300 text-center leading-tight truncate w-full">
              {motif.name}
            </span>

            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
          </button>
        ))}
      </div>

      {/* Active Stickers on Canvas List & Inspector */}
      {activeStickers.length > 0 && (
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Placed On Canvas ({activeStickers.length})</span>
            </span>
          </div>

          <div className="space-y-2 max-h-44 overflow-y-auto">
            {activeStickers.map((stk, index) => {
              const motifMeta = MOTIFS_CATALOG.find((m) => m.id === stk.motifId);
              const isSelected = selectedStickerId === stk.id;

              return (
                <div
                  key={stk.id}
                  className={`p-2.5 rounded-xl border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedStickerId(isSelected ? null : stk.id)}
                      className="flex items-center space-x-2.5 text-left flex-1"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                        <MotifRenderer motifId={stk.motifId} color={stk.color || '#fbbf24'} size={20} />
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {motifMeta?.name || `Motif #${index + 1}`}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeSticker(stk.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Remove from canvas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Position & Size Sliders for Selected Sticker */}
                  {isSelected && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2.5 text-[11px] text-slate-300">
                      {/* Vertical Position */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="shrink-0 text-slate-400">Vertical Pos:</span>
                        <input
                          type="range"
                          min="5"
                          max="95"
                          value={stk.y}
                          onChange={(e) => updateSticker(stk.id, { y: parseInt(e.target.value, 10) })}
                          className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                        />
                        <span className="w-7 text-right font-mono">{stk.y}%</span>
                      </div>

                      {/* Horizontal Position */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="shrink-0 text-slate-400">Horizontal Pos:</span>
                        <input
                          type="range"
                          min="5"
                          max="95"
                          value={stk.x}
                          onChange={(e) => updateSticker(stk.id, { x: parseInt(e.target.value, 10) })}
                          className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                        />
                        <span className="w-7 text-right font-mono">{stk.x}%</span>
                      </div>

                      {/* Size */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="shrink-0 text-slate-400">Size:</span>
                        <input
                          type="range"
                          min="20"
                          max="90"
                          value={stk.size}
                          onChange={(e) => updateSticker(stk.id, { size: parseInt(e.target.value, 10) })}
                          className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                        />
                        <span className="w-7 text-right font-mono">{stk.size}px</span>
                      </div>

                      {/* Color Picker */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-400">Motif Color:</span>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={stk.color || '#fbbf24'}
                            onChange={(e) => updateSticker(stk.id, { color: e.target.value })}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
