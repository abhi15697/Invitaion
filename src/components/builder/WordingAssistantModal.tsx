import React, { useState } from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { REGIONAL_WORDING_PRESETS, LANGUAGES, type WordingQuote } from '../../data/languages';
import type { LanguageCode, InvitationCategory } from '../../types/invitation';
import { CATEGORIES } from '../../data/categories';
import { soundEffects } from '../../utils/soundEffects';
import { Sparkles, X, Check, BookOpen } from 'lucide-react';

interface WordingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordingAssistantModal: React.FC<WordingAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const activeCategory = useInvitationStore((state) => state.activeCategory);
  const updateFormField = useInvitationStore((state) => state.updateFormField);
  const updateCustomization = useInvitationStore((state) => state.updateCustomization);
  const setLanguage = useInvitationStore((state) => state.setLanguage);

  const [activeLang, setActiveLang] = useState<LanguageCode>(selectedLanguage);
  const [activeCatFilter, setActiveCatFilter] = useState<InvitationCategory>(activeCategory);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Get quotes for selected language
  const quotesForLang = REGIONAL_WORDING_PRESETS[activeLang] || REGIONAL_WORDING_PRESETS.en || [];
  const filteredQuotes = quotesForLang.filter(
    (q) => q.category === activeCatFilter || activeCatFilter === 'wedding'
  );

  const handleApplyQuote = (quote: WordingQuote) => {
    soundEffects.playSparkleSound();

    // Sync language if different
    if (activeLang !== selectedLanguage) {
      setLanguage(activeLang, false);
    }

    // Apply to appropriate category fields
    if (quote.category === 'wedding') {
      updateFormField('weddingMessage', quote.message);
      if (quote.invocation) {
        updateFormField('deityInvocation', quote.invocation);
      }
    } else if (quote.category === 'religious') {
      updateFormField('message', quote.message);
      if (quote.invocation) updateFormField('deityInvocation', quote.invocation);
      if (quote.heading) updateFormField('eventName', quote.heading);
    } else if (quote.category === 'housewarming') {
      updateFormField('message', quote.message);
      if (quote.heading) updateFormField('houseName', quote.heading);
    } else if (quote.category === 'birthday') {
      updateFormField('message', quote.message);
    } else {
      updateFormField('message', quote.message);
    }

    // Set matching regional font
    let targetFont = 'serif';
    if (['hi', 'mr'].includes(activeLang)) targetFont = 'devanagari';
    else if (activeLang === 'ta') targetFont = 'tamil';
    else if (activeLang === 'te') targetFont = 'telugu';
    else if (activeLang === 'bn') targetFont = 'bengali';
    else if (activeLang === 'gu') targetFont = 'gujarati';
    else if (activeLang === 'pa') targetFont = 'gurmukhi';
    else if (activeLang === 'kn') targetFont = 'kannada';
    else if (activeLang === 'ml') targetFont = 'malayalam';
    else if (activeLang === 'or') targetFont = 'oriya';

    updateCustomization({ fontFamily: targetFont });

    setAppliedId(quote.id);
    setTimeout(() => {
      setAppliedId(null);
      onClose();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border-2 border-orange-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#450a0a]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-orange-100 flex items-center justify-between bg-orange-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#450a0a] flex items-center gap-2">
                <span>Indian Wording & Auspicious Verses</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 font-extrabold border border-orange-200">
                  मंत्र व संदेश
                </span>
              </h2>
              <p className="text-xs text-[#78350f]">
                Browse authentic cultural phrases, mantras, and invitations across 11 languages
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              onClose();
            }}
            className="p-2 rounded-xl text-[#78350f] hover:text-[#450a0a] hover:bg-orange-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Top Bar */}
        <div className="p-4 bg-white border-b border-orange-100 space-y-3">
          {/* Language Selector Pills */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-orange-900 block mb-1.5">
              Select Language (भाषा निवडा)
            </label>
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    soundEffects.playSoftClick();
                    setActiveLang(lang.code);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeLang === lang.code
                      ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-extrabold shadow-md shadow-orange-500/25'
                      : 'bg-orange-50/70 text-[#78350f] hover:text-orange-600 hover:bg-orange-100 border border-orange-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundEffects.playSoftClick();
                  setActiveCatFilter(cat.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCatFilter === cat.id
                    ? 'bg-orange-100 text-orange-950 border border-orange-300 font-bold'
                    : 'text-[#78350f] hover:text-[#450a0a]'
                }`}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Verses & Quotes List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote) => {
              const isApplied = appliedId === quote.id;

              return (
                <div
                  key={quote.id}
                  className={`p-5 rounded-2xl border transition-all relative group ${
                    isApplied
                      ? 'bg-emerald-50 border-emerald-400 shadow-md'
                      : 'bg-white hover:bg-orange-50/40 border-orange-100 hover:border-orange-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                          {quote.title}
                        </span>
                        {quote.invocation && (
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 font-serif border border-orange-200">
                            {quote.invocation}
                          </span>
                        )}
                      </div>

                      {quote.heading && (
                        <h4 className="text-base font-bold text-[#450a0a] tracking-wide">
                          {quote.heading}
                        </h4>
                      )}

                      <p className="text-sm text-[#78350f] leading-relaxed font-sans bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                        "{quote.message}"
                      </p>

                      {quote.blessing && (
                        <p className="text-xs text-orange-800 font-medium italic">
                          ✨ {quote.blessing}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex flex-col items-end space-y-2">
                      <button
                        type="button"
                        onClick={() => handleApplyQuote(quote)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-emerald-500 text-white scale-105 shadow-md'
                            : 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white hover:scale-105 shadow-lg shadow-orange-500/25'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Applied!</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Use This Wording</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-8 h-8 text-orange-400 mx-auto" />
              <p className="text-sm text-[#78350f]">
                Wording for this category in {LANGUAGES.find((l) => l.code === activeLang)?.name} is ready.
              </p>
              <button
                type="button"
                onClick={() => setActiveLang('hi')}
                className="px-4 py-2 rounded-xl bg-orange-100 text-orange-950 text-xs font-bold border border-orange-200"
              >
                View Hindi & Sanskrit Verses
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-orange-50/70 border-t border-orange-100 flex items-center justify-between text-xs text-[#78350f]">
          <span>Tip: Applying wording automatically sets the authentic regional calligraphy font</span>
          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-orange-100 text-[#78350f] font-bold transition-colors border border-orange-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
