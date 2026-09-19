import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInvitationStore } from '../../store/invitationStore';
import { useThemeStore } from '../../store/themeStore';
import { getTranslation } from '../../data/languages';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { soundEffects } from '../../utils/soundEffects';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, PlusCircle, Volume2, VolumeX } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());
  const location = useLocation();
  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const currentTheme = useThemeStore((state) => state.theme);

  const t = (key: string) => getTranslation(selectedLanguage, key);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('templates'), path: '/templates' },
    { name: 'Categories', path: '/invitations' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleToggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-2xl transition-colors duration-500 shadow-md ${
      currentTheme.isDark
        ? 'bg-[#0a0f1d]/90 border-amber-400/25 text-slate-100'
        : 'bg-white/90 border-amber-200/60 text-[#3f120e]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Animated Logo */}
        <Link
          to="/"
          onClick={() => soundEffects.playSoftClick()}
          className="flex items-center space-x-3 group"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-0.5 shadow-lg shadow-orange-500/25"
          >
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center relative overflow-hidden ${
              currentTheme.isDark ? 'bg-slate-900' : 'bg-white'
            }`}>
              <Sparkles className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
          </motion.div>
          <div>
            <span className={`text-xl font-extrabold tracking-tight font-display transition-colors flex items-center gap-1 ${
              currentTheme.isDark ? 'text-amber-100 group-hover:text-amber-400' : 'text-[#3f120e] group-hover:text-orange-600'
            }`}>
              Invite<span className="text-orange-gradient font-serif italic">Craft</span>
            </span>
            <p className={`text-[10px] tracking-wider uppercase font-sans hidden sm:block font-bold ${
              currentTheme.isDark ? 'text-amber-400/90' : 'text-[#9a3412]'
            }`}>
              11 Indian Languages • Studio
            </p>
          </div>
        </Link>

        {/* Desktop Navigation with Animated Indicator */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => soundEffects.playSoftClick()}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'text-orange-500 font-bold'
                    : currentTheme.isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    : 'text-[#78350f] hover:text-orange-600 hover:bg-orange-50/70'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className={`absolute inset-0 rounded-xl shadow-sm border ${
                      currentTheme.isDark
                        ? 'bg-amber-400/15 border-amber-400/35'
                        : 'bg-amber-100/80 border-amber-300/60'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center space-x-2.5">
          {/* Compact Theme Switcher */}
          <ThemeSwitcher variant="compact" />

          {/* Audio Synthesizer Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleSound}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              currentTheme.isDark
                ? 'bg-slate-900 border-amber-400/25 text-amber-400 hover:bg-slate-800'
                : 'bg-amber-50 border-amber-200 text-orange-600 hover:bg-amber-100/60'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 opacity-50" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          {/* Language Selector Dropdown */}
          <LanguageSelector />

          {/* Primary CTA with animated shimmer */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/create"
              onClick={() => soundEffects.playCelebrationFanfare()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center space-x-2 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <PlusCircle className="w-4 h-4" />
              <span>{t('createInvitation')}</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            type="button"
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border ${
              currentTheme.isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-amber-50 border-amber-200 text-orange-600'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 opacity-50" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <LanguageSelector compact />

          <Link
            to="/create"
            onClick={() => soundEffects.playCelebrationFanfare()}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs flex items-center space-x-1 shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              currentTheme.isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-amber-50 border-amber-200 text-[#78350f]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 overflow-hidden ${
              currentTheme.isDark
                ? 'bg-[#0f172a] border-slate-800 text-slate-100'
                : 'bg-white/95 border-amber-200 text-amber-950'
            }`}
          >
            {/* Mobile Theme Switcher */}
            <div className="pb-2">
              <p className="text-xs font-bold mb-1.5 opacity-80">Choose Theme:</p>
              <ThemeSwitcher variant="hero" />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  soundEffects.playSoftClick();
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-orange-500 text-white font-bold shadow-md'
                    : currentTheme.isDark
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-[#78350f] hover:bg-orange-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/create"
                onClick={() => {
                  soundEffects.playCelebrationFanfare();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-bold text-center block shadow-md"
              >
                {t('createInvitation')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
