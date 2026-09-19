import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { CATEGORIES } from '../data/categories';
import type { TemplateDefinition } from '../types/invitation';
import { TemplateCard } from '../components/cards/TemplateCard';
import { TemplatePreviewModal } from '../components/preview/TemplatePreviewModal';
import { useThemeStore } from '../store/themeStore';
import { soundEffects } from '../utils/soundEffects';
import { Search, Filter, Sparkles } from 'lucide-react';

const STYLES = [
  'all',
  'royal',
  'floral',
  'traditional',
  'minimal',
  'luxury',
  'modern',
  'cute',
  'colorful',
  'neon',
  'romantic',
];

export const TemplatesGalleryPage: React.FC = () => {
  const currentTheme = useThemeStore((state) => state.theme);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewModalTemplate, setPreviewModalTemplate] = useState<TemplateDefinition | null>(null);

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesStyle = selectedStyle === 'all' || t.style === selectedStyle;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStyle && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewModalTemplate}
        onClose={() => setPreviewModalTemplate(null)}
      />

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm ${
          currentTheme.isDark
            ? 'bg-amber-950/60 border-amber-400/40 text-amber-200'
            : 'bg-amber-100/80 border-amber-200 text-amber-950'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>35+ Handcrafted Royal Boutique Templates</span>
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${
          currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
        }`}>
          Template <span className="text-orange-gradient font-serif italic">Gallery</span>
        </h1>
        <p className={`text-sm ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
          Browse our curated collection of luxury royal, floral, traditional Indian, and festive invitation styles.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className={`p-6 rounded-3xl border space-y-5 shadow-md transition-colors ${
        currentTheme.isDark
          ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
          : 'bg-white/90 border-amber-200/80 text-amber-950'
      }`}>
        {/* Search & Style Dropdown */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or keyword..."
              className={`w-full border rounded-2xl pl-11 pr-4 py-2.5 text-xs transition-colors shadow-inner focus:outline-none focus:border-orange-500 ${
                currentTheme.isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400'
                  : 'bg-white border-amber-200 text-[#3f120e] placeholder-amber-800/40'
              }`}
            />
          </div>

          {/* Style Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1">
            <span className={`text-xs font-bold uppercase tracking-wider shrink-0 flex items-center space-x-1 ${
              currentTheme.isDark ? 'text-amber-300' : 'text-amber-900'
            }`}>
              <Filter className="w-3.5 h-3.5 text-orange-500" />
              <span>Style:</span>
            </span>
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    soundEffects.playSoftClick();
                    setSelectedStyle(style);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
                    selectedStyle === style
                      ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white shadow-md shadow-orange-500/25'
                      : currentTheme.isDark
                      ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                      : 'bg-white text-[#78350f] hover:text-orange-600 hover:bg-amber-50 border border-amber-200/60'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className={`pt-3 border-t flex items-center space-x-2 overflow-x-auto pb-2 ${
          currentTheme.isDark ? 'border-slate-800' : 'border-amber-100'
        }`}>
          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              setSelectedCategory('all');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white shadow-md shadow-orange-500/25'
                : currentTheme.isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                : 'bg-white text-[#78350f] hover:bg-amber-50 border border-amber-200/60'
            }`}
          >
            All Categories ({TEMPLATES.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundEffects.playSoftClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white shadow-md shadow-orange-500/25'
                  : currentTheme.isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  : 'bg-white text-[#78350f] hover:bg-amber-50 border border-amber-200/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title} ({cat.templateCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreviewModal={(t: TemplateDefinition) => setPreviewModalTemplate(t)}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-16 space-y-4 rounded-3xl border ${
          currentTheme.isDark
            ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
            : 'bg-white/90 border-amber-200/80 text-amber-950'
        }`}>
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto text-orange-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-bold ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>No matching templates found</h3>
          <p className={`text-xs max-w-sm mx-auto ${currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'}`}>
            Try resetting your search filters or browse other categories.
          </p>
          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              setSelectedCategory('all');
              setSelectedStyle('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
