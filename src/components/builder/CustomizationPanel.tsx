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

      {/* 2-Tier Luxury Studio Tab Deck */}
      <div className="space-y-1.5 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800/90 shadow-xl">
        {/* Tier 1: Primary Typography & Palette Controls */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer text-xs font-bold border ${
              activeTab === 'colors'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Palette className="w-4 h-4 shrink-0" />
            <span className="truncate">Colors & Theme</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fonts')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer text-xs font-bold border ${
              activeTab === 'fonts'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Type className="w-4 h-4 shrink-0" />
            <span className="truncate">Fonts & Script</span>
          </button>
        </div>

        {/* Tier 2: Motifs, Patterns & Borders */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('motifs')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer text-xs font-semibold border ${
              activeTab === 'motifs'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Motifs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('background')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer text-xs font-semibold border ${
              activeTab === 'background'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Pattern</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('borders')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer text-xs font-semibold border ${
              activeTab === 'borders'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Square className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Borders</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Color Themes & Custom Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
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
                    className={`p-2.5 rounded-xl border text-left transition-all relative group flex flex-col justify-between min-h-[78px] cursor-pointer min-w-0 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/15 ring-1 ring-amber-400'
                        : 'border-slate-800/90 hover:border-slate-700 bg-slate-950/80 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full min-w-0">
                      <span className="text-xs font-bold text-white truncate pr-1">{pal.name}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] shrink-0 font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: pal.primary }} title={`Primary: ${pal.primary}`} />
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: pal.accent }} title={`Accent: ${pal.accent}`} />
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: pal.background }} title={`Background: ${pal.background}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Pickers - Full Width Luxury List */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>Custom Color Pickers</span>
              </label>
              <span className="text-[10px] text-slate-400">Click to change</span>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Primary Accent', desc: 'Main titles & borders', key: 'primaryColor' as const, value: customization.primaryColor },
                { label: 'Accent Glow', desc: 'Glow, badges & subtitles', key: 'accentColor' as const, value: customization.accentColor },
                { label: 'Background', desc: 'Invitation canvas background', key: 'backgroundColor' as const, value: customization.backgroundColor },
                { label: 'Body Text', desc: 'Body text & details', key: 'textColor' as const, value: customization.textColor },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {/* Visual Color Swatch with Hidden Color Input Overlay */}
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white/30 shadow-md shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: item.value }}
                    >
                      <input
                        type="color"
                        value={item.value}
                        onChange={(e) => updateCustomization({ [item.key]: e.target.value })}
                        className="absolute -inset-2 opacity-0 w-12 h-12 cursor-pointer"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700/80 shadow-inner">
                      {item.value.toUpperCase()}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Typography & Google Fonts */}
      {activeTab === 'fonts' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              Select Font Family
            </label>
          </div>

          {/* Font Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5">
            {(['All', 'Indian', 'Serif', 'Cursive', 'Modern'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFontCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  fontCategoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'Indian' ? '🇮🇳 Indian' : cat}
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
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-md'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/70'
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
          <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
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
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-md'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl shrink-0">{pat.previewIcon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white">{pat.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{pat.description}</p>
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
          <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
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
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-md'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/70'
                  }`}
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white">{border.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{border.description}</p>
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
