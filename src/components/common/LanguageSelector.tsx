import React, { useState, useRef, useEffect } from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { LANGUAGES, type LanguageDefinition } from '../../data/languages';
import { soundEffects } from '../../utils/soundEffects';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
  showApplyDemoPrompt?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  className = '',
  showApplyDemoPrompt = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const setLanguage = useInvitationStore((state) => state.setLanguage);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: LanguageDefinition, withDemo: boolean = false) => {
    if (withDemo) {
      soundEffects.playSparkleSound();
    } else {
      soundEffects.playSoftClick();
    }
    setLanguage(lang.code, withDemo);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          soundEffects.playSoftClick();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center space-x-2 rounded-xl bg-white border border-orange-200 hover:border-orange-400 transition-all text-[#450a0a] hover:text-orange-600 group shadow-sm cursor-pointer ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-xs font-semibold'
        }`}
        title="Select Language (भारतीय भाषाएं)"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <div className="flex flex-col items-start leading-tight">
          <span className="font-bold text-orange-600">{currentLang.nativeName}</span>
          {!compact && (
            <span className="text-[10px] text-[#9a3412] font-semibold">{currentLang.name}</span>
          )}
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#9a3412] group-hover:text-orange-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-dropdown border border-orange-200 shadow-2xl p-2.5 z-50 animate-fade-in divide-y divide-orange-100 bg-white/98 text-[#450a0a]">
          {/* Header */}
          <div className="px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#450a0a]">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>Select Language • भारतीय भाषाएं</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-extrabold shadow-sm">
              11 Languages
            </span>
          </div>

          {/* Languages Grid */}
          <div className="py-2 max-h-80 overflow-y-auto space-y-1.5 custom-scrollbar">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === selectedLanguage;

              return (
                <div
                  key={lang.code}
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-100 to-red-100/80 text-orange-950 font-bold border border-orange-300 shadow-sm'
                      : 'hover:bg-orange-50/80 border border-transparent text-[#450a0a]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectLanguage(lang, false)}
                    className="flex-1 flex items-center space-x-3 text-left cursor-pointer pr-2"
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {lang.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <p className={`text-xs font-bold transition-colors truncate ${isSelected ? 'text-orange-950' : 'group-hover:text-orange-600'}`}>
                          {lang.nativeName}
                        </p>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-50 text-orange-800 border border-orange-200 font-semibold truncate max-w-[120px]">
                          {lang.culturalBadge}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate ${isSelected ? 'text-orange-700' : 'text-[#9a3412]'}`}>
                        {lang.name} <span className="opacity-75">• {lang.region}</span>
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {showApplyDemoPrompt && (
                      <button
                        type="button"
                        onClick={() => handleSelectLanguage(lang, true)}
                        className="p-1 px-2 rounded-lg bg-orange-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white text-orange-700 text-[10px] font-bold transition-all flex items-center space-x-1 border border-orange-200 cursor-pointer shadow-sm active:scale-95"
                        title={`Auto-fill sample ${lang.name} wording`}
                      >
                        <Sparkles className="w-3 h-3 text-amber-500 group-hover:text-white" />
                        <span>Sample</span>
                      </button>
                    )}

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="px-3 pt-2 text-[10px] text-orange-700 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>Click <strong>Sample</strong> for authentic regional wording & blessings</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
