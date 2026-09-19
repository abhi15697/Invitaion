import React from 'react';
import { useThemeStore, THEME_CONFIGS, type HomeThemeId } from '../../store/themeStore';
import { soundEffects } from '../../utils/soundEffects';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'hero' | 'floating';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const currentThemeId = useThemeStore((state) => state.currentThemeId);
  const setTheme = useThemeStore((state) => state.setTheme);
  const currentTheme = useThemeStore((state) => state.theme);

  const themeList = Object.values(THEME_CONFIGS);

  const handleSelectTheme = (id: HomeThemeId) => {
    if (id !== currentThemeId) {
      soundEffects.playSparkleSound();
      setTheme(id);
    }
  };

  if (variant === 'hero') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs uppercase tracking-widest font-extrabold flex items-center gap-1.5 ${currentTheme.isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            <Palette className="w-3.5 h-3.5" />
            <span>Atmosphere & Theme</span>
          </span>
          <span className={`text-[11px] font-semibold ${currentTheme.isDark ? 'text-slate-400' : 'text-amber-800/80'}`}>
            Live Background Color
          </span>
        </div>

        <div className={`p-1.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 grid grid-cols-2 sm:grid-cols-4 gap-2 ${
          currentTheme.isDark 
            ? 'bg-slate-900/80 border-amber-400/25 shadow-2xl shadow-black/40' 
            : 'bg-white/90 border-amber-200/90 shadow-lg shadow-amber-900/5'
        }`}>
          {themeList.map((t) => {
            const isActive = currentThemeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTheme(t.id)}
                className={`relative px-3 py-2.5 rounded-xl text-left transition-all duration-200 flex items-center space-x-2.5 cursor-pointer ${
                  isActive
                    ? t.isDark
                      ? 'text-amber-300 shadow-md font-bold'
                      : 'text-amber-950 shadow-md font-bold'
                    : currentTheme.isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-amber-900/80 hover:text-amber-950 hover:bg-amber-50/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHeroThemePill"
                    className={`absolute inset-0 rounded-xl border ${
                      t.id === 'midnight-navy'
                        ? 'bg-gradient-to-r from-blue-950/90 to-indigo-950/90 border-amber-400/60 ring-1 ring-amber-400/40'
                        : t.id === 'festive-crimson'
                        ? 'bg-gradient-to-r from-red-950/90 to-orange-950/90 border-orange-400/60 ring-1 ring-orange-400/40'
                        : t.id === 'pearl-studio'
                        ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-300 ring-1 ring-rose-300/40'
                        : 'bg-gradient-to-r from-amber-100 to-orange-50 border-amber-300 ring-1 ring-amber-300/40'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="text-lg relative z-10">{t.icon}</span>
                <div className="relative z-10 min-w-0">
                  <p className="text-xs truncate font-extrabold">{t.name.split(' ')[0]} {t.name.split(' ')[1] || ''}</p>
                  <p className={`text-[10px] truncate opacity-75 ${t.isDark ? 'text-slate-300' : 'text-amber-800'}`}>
                    {t.id === 'royal-ivory' && 'Classic Gold'}
                    {t.id === 'midnight-navy' && 'Velvet Dark'}
                    {t.id === 'festive-crimson' && 'Kumkum Deep'}
                    {t.id === 'pearl-studio' && 'Minimal Studio'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact Header / Nav Switcher
  return (
    <div className={`inline-flex items-center p-1 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
      currentTheme.isDark
        ? 'bg-slate-900/90 border-amber-400/30 shadow-xl'
        : 'bg-white/90 border-amber-200/90 shadow-md'
    } ${className}`}>
      {themeList.map((t) => {
        const isActive = currentThemeId === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleSelectTheme(t.id)}
            title={`${t.name} - ${t.shortDesc}`}
            className={`relative px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
              isActive
                ? currentTheme.isDark
                  ? 'text-amber-300'
                  : 'text-amber-950'
                : currentTheme.isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-amber-800/70 hover:text-amber-950'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCompactThemePill"
                className={`absolute inset-0 rounded-xl border ${
                  t.isDark
                    ? 'bg-amber-400/20 border-amber-400/50'
                    : 'bg-amber-100 border-amber-300'
                }`}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="text-sm relative z-10">{t.icon}</span>
            <span className="hidden sm:inline-block text-[11px] relative z-10 whitespace-nowrap">
              {t.name.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
