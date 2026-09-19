import React, { useState } from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { COLOR_PALETTES, FONT_OPTIONS, PATTERN_OPTIONS, BORDER_OPTIONS } from '../../data/themes';
import { StickersPanel } from './StickersPanel';
import { Palette, Type, Grid, Square, Check, Sliders, Sparkles } from 'lucide-react';

export const CustomizationPanel: React.FC = () => {
  const customization = useInvitationStore((state) => state.customization);
  const updateCustomization = useInvitationStore((state) => state.updateCustomization);
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'background' | 'borders' | 'motifs'>('colors');
  const [fontCategoryFilter, setFontCategoryFilter] = useState<'All' | 'Indian' | 'Serif' | 'Cursive' | 'Modern'>('All');

  const handleApplyPalette = (palette: (typeof COLOR_PALETTES)[0]) => {
    updateCustomization({
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      textColor: palette.text,
      accentColor: palette.accent,
      backgroundColor: palette.background,
    });
  };

  const filteredFonts = FONT_OPTIONS.filter(
    (f) => fontCategoryFilter === 'All' || f.category === fontCategoryFilter
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Design & Customization</span>
        </h2>
        <p className="text-[11px] text-slate-400">Personalize colors, Indian calligraphy, motifs, and borders</p>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'colors'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fonts')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'fonts'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Type className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Fonts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('motifs')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'motifs'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Motifs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('background')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'background'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Grid className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Pattern</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('borders')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            activeTab === 'borders'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Square className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Borders</span>
        </button>
      </div>

      {/* Tab 1: Color Themes & Custom Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Curated Royal Palettes (राजसी रंग)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PALETTES.map((pal) => {
                const isSelected =
                  customization.primaryColor.toLowerCase() === pal.primary.toLowerCase() &&
                  customization.backgroundColor.toLowerCase() === pal.background.toLowerCase();

                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => handleApplyPalette(pal)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative group flex flex-col justify-between h-20 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 hover:border-slate-600 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-semibold text-white truncate">{pal.name}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.primary }} />
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.accent }} />
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.background }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Custom Color Pickers
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-300">Primary Color</p>
                  <p className="text-[10px] text-slate-500">{customization.primaryColor}</p>
                </div>
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-300">Accent Glow</p>
                  <p className="text-[10px] text-slate-500">{customization.accentColor}</p>
                </div>
                <input
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => updateCustomization({ accentColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-300">Background</p>
                  <p className="text-[10px] text-slate-500">{customization.backgroundColor}</p>
                </div>
                <input
                  type="color"
                  value={customization.backgroundColor}
                  onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-300">Body Text</p>
                  <p className="text-[10px] text-slate-500">{customization.textColor}</p>
                </div>
                <input
                  type="color"
                  value={customization.textColor}
                  onChange={(e) => updateCustomization({ textColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Typography & Google Fonts */}
      {activeTab === 'fonts' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Select Font Family
            </label>
          </div>

          {/* Font Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1">
            {(['All', 'Indian', 'Serif', 'Cursive', 'Modern'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFontCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  fontCategoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'Indian' ? '🇮🇳 Indian Scripts' : cat}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredFonts.map((font) => {
              const isSelected = customization.fontFamily === font.id;

              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => updateCustomization({ fontFamily: font.id })}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-white">{font.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {font.category}
                      </span>
                    </div>
                    <p className={`text-base mt-1 text-amber-200 ${font.fontClass}`}>
                      {font.previewText}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Motifs & Stickers */}
      {activeTab === 'motifs' && <StickersPanel />}

      {/* Tab 4: Background Patterns */}
      {activeTab === 'background' && (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Background Texture & Pattern
          </label>
          <div className="grid grid-cols-1 gap-2">
            {PATTERN_OPTIONS.map((pat) => {
              const isSelected = customization.backgroundPattern === pat.id;

              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => updateCustomization({ backgroundPattern: pat.id as any })}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{pat.previewIcon}</span>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{pat.name}</h4>
                      <p className="text-[11px] text-slate-400">{pat.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Border Frames */}
      {activeTab === 'borders' && (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Border & Frame Styling (शाही बॉर्डर)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {BORDER_OPTIONS.map((border) => {
              const isSelected = customization.borderStyle === border.id;

              return (
                <button
                  key={border.id}
                  type="button"
                  onClick={() => updateCustomization({ borderStyle: border.id as any })}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-semibold text-white">{border.name}</h4>
                    <p className="text-[11px] text-slate-400">{border.description}</p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
