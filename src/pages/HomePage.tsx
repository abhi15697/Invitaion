import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInvitationStore } from '../store/invitationStore';
import { useThemeStore } from '../store/themeStore';
import { CATEGORIES } from '../data/categories';
import { TEMPLATES } from '../data/templates';
import { DEMO_WEDDING } from '../data/demoData';
import { LANGUAGES, getTranslation } from '../data/languages';
import { CategoryCard } from '../components/cards/CategoryCard';
import { TemplateCard } from '../components/cards/TemplateCard';
import { TemplatePreviewModal } from '../components/preview/TemplatePreviewModal';
import { ThemeSwitcher } from '../components/common/ThemeSwitcher';
import { InvitationRenderer } from '../templates/InvitationRenderer';
import { Interactive3DTilt } from '../components/common/Interactive3DTilt';
import { soundEffects } from '../utils/soundEffects';
import { motion, type Variants } from 'framer-motion';
import type { TemplateDefinition } from '../types/invitation';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe,
  Mail,
  Palette,
  Layers,
  MessageCircle,
  Award,
  Zap,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const setLanguage = useInvitationStore((state) => state.setLanguage);
  const currentTheme = useThemeStore((state) => state.theme);
  
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  const t = (key: string) => getTranslation(selectedLanguage, key);

  const displayedTemplates = React.useMemo(() => {
    if (templateFilter === 'all') {
      return TEMPLATES.filter((t) =>
        ['wedding-royal-gold', 'birthday-colorful-party', 'anniversary-romantic', 'wedding-floral-elegance', 'birthday-neon-party', 'religious-sacred-blessings'].includes(t.id)
      );
    }
    return TEMPLATES.filter((t) => t.category === templateFilter).slice(0, 6);
  }, [templateFilter]);

  const heroInvitationData = {
    category: 'wedding' as const,
    templateId: 'wedding-royal-gold',
    fields: DEMO_WEDDING,
    customization: TEMPLATES[0].defaultCustomization,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden relative">
      {/* Quick Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Copy */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              {/* Badge with language & theme selector */}
              <motion.div
                variants={itemVariants}
                className={`inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 rounded-full border text-xs font-semibold shadow-sm backdrop-blur-xl transition-colors ${
                  currentTheme.isDark
                    ? 'bg-slate-900/90 border-amber-400/35 text-amber-200'
                    : 'bg-white/95 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center space-x-1.5 px-3 py-1 text-amber-600">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                  <span>{t('freeMaker')}</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-extrabold shadow-sm">
                  🇮🇳 11 Indian Languages
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.12] transition-colors ${
                  currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
                }`}>
                  Create <span className="text-orange-gradient font-serif italic">Elegant Invitations</span> in Any Indian Language
                </h1>
                <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium transition-colors ${
                  currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'
                }`}>
                  Design boutique-quality invitations in English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali, Punjabi, Kannada, Malayalam, and Odia in seconds. 100% Free, Private, and 2x Print Ready.
                </p>
              </motion.div>

              {/* Home Screen Theme Switcher Widget */}
              <motion.div variants={itemVariants} className="pt-1">
                <ThemeSwitcher variant="hero" />
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/create"
                    onClick={() => soundEffects.playCelebrationFanfare()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2.5 group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>{t('createInvitation')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/templates"
                    onClick={() => soundEffects.playSoftClick()}
                    className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base border transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer ${
                      currentTheme.isDark
                        ? 'bg-slate-900/95 hover:bg-slate-800 text-amber-200 border-amber-400/35 hover:border-amber-400'
                        : 'bg-white/95 hover:bg-amber-50 text-[#78350f] border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <Eye className="w-5 h-5 text-amber-500" />
                    <span>{t('exploreTemplates')}</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={itemVariants} className={`pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold ${
                currentTheme.isDark ? 'text-amber-300/80' : 'text-[#9a3412]'
              }`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{t('noLogin')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>{t('printReady')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>{t('privacy')}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Right Visual Preview with Interactive 3D Physics Tilt */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 via-red-300/30 to-amber-200/30 rounded-[44px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse" />

                <Interactive3DTilt maxTilt={12} scale={1.03}>
                  <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl p-2.5 transition-colors ${
                    currentTheme.isDark
                      ? 'bg-slate-900 border-amber-400/40 shadow-black/50'
                      : 'bg-white border-amber-200/90 shadow-amber-900/10'
                  }`}>
                    <div className="w-[300px] sm:w-[350px] h-[435px] overflow-hidden rounded-2xl relative shadow-xl">
                      <div className="scale-[0.55] sm:scale-[0.64] origin-top-left -ml-2 -mt-2">
                        <InvitationRenderer data={heroInvitationData} />
                      </div>
                    </div>

                    {/* Floating badge */}
                    <div className={`absolute bottom-6 left-6 right-6 p-3 rounded-2xl border flex items-center justify-between shadow-xl backdrop-blur-xl ${
                      currentTheme.isDark
                        ? 'bg-slate-900/95 border-amber-400/40 text-slate-100'
                        : 'bg-white/95 border-amber-200 text-amber-950'
                    }`}>
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold truncate max-w-[140px]">Royal Gold Wedding</p>
                          <p className="text-[10px] text-amber-500 font-semibold">Live 3D Interactive Card</p>
                        </div>
                      </div>
                      <Link
                        to="/create/wedding"
                        onClick={() => soundEffects.playCelebrationFanfare()}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold text-xs transition-colors shadow-md"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                </Interactive3DTilt>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS TICKER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Indian Languages', val: '11', icon: <Globe className="w-5 h-5 text-orange-500" /> },
            { label: 'Boutique Templates', val: '35+', icon: <Palette className="w-5 h-5 text-red-500" /> },
            { label: 'Free & No Login', val: '100%', icon: <Award className="w-5 h-5 text-amber-500" /> },
            { label: 'Ultra HD Print Ready', val: '2x', icon: <Zap className="w-5 h-5 text-orange-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-2xl border text-center space-y-1 shadow-md transition-colors ${
                currentTheme.isDark
                  ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
                  : 'bg-white/90 border-amber-200/70 text-amber-950'
              }`}
            >
              <div className="flex justify-center pb-1">{stat.icon}</div>
              <p className={`text-2xl sm:text-3xl font-extrabold font-display ${
                currentTheme.isDark ? 'text-amber-300' : 'text-[#3f120e]'
              }`}>{stat.val}</p>
              <p className={`text-xs font-semibold ${
                currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'
              }`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. INDIAN LANGUAGES QUICK SELECTOR BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 shadow-xl transition-colors ${
            currentTheme.isDark
              ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-amber-400/30'
              : 'bg-gradient-to-r from-white via-amber-50/60 to-white border-amber-200/90'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-extrabold text-orange-500 flex items-center gap-1.5">
                <Globe className="w-4 h-4 animate-spin-slow" />
                <span>Multi-Language Invitation Maker</span>
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold font-display ${
                currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
              }`}>
                Create in your mother tongue with authentic cultural verses
              </h3>
            </div>

            <div className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-1.5 rounded-full border ${
              currentTheme.isDark
                ? 'text-amber-300 bg-amber-950/60 border-amber-400/40'
                : 'text-amber-800 bg-amber-100/80 border-amber-200'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>11 Indian Regional Scripts & Fonts</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.code;

              return (
                <motion.button
                  key={lang.code}
                  type="button"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    soundEffects.playSparkleSound();
                    setLanguage(lang.code, true);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white font-extrabold border-orange-400 shadow-xl shadow-orange-500/30 ring-2 ring-orange-400/50'
                      : currentTheme.isDark
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 hover:border-amber-400/60 text-slate-100 shadow-sm'
                      : `bg-white hover:bg-gradient-to-br ${lang.cardGradient} border-amber-200/80 hover:border-amber-400 text-[#3f120e] shadow-sm hover:shadow-md`
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : currentTheme.isDark
                          ? 'bg-slate-800 text-amber-300'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <p className={`text-sm font-bold leading-tight ${
                      isSelected ? 'text-white' : currentTheme.isDark ? 'text-slate-100 group-hover:text-amber-300' : 'text-[#3f120e] group-hover:text-orange-700'
                    }`}>
                      {lang.nativeName}
                    </p>
                    <p className={`text-[11px] truncate font-medium ${
                      isSelected ? 'text-orange-100' : currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'
                    }`}>
                      {lang.name}
                    </p>
                    <p className={`text-[9px] truncate font-semibold pt-0.5 opacity-90 ${
                      isSelected ? 'text-white/90' : 'text-amber-500'
                    }`}>
                      {lang.culturalBadge}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 4. CANVA & GREETINGSISLAND STUDIO FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-orange-500">
            Studio-Grade Toolkit
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold font-display ${
            currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
          }`}>
            Everything You Need to Create & Share
          </h2>
          <p className={`text-sm ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
            Inspired by Canva, GreetingsIsland, and Adobe Express — enriched with authentic Indian cultural motifs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Interactive3DTilt maxTilt={8}>
            <div className={`p-6 rounded-3xl border space-y-4 shadow-md h-full transition-colors ${
              currentTheme.isDark
                ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
                : 'bg-white/90 border-amber-200/80 text-amber-950'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-sm">
                <Mail className="w-6 h-6 animate-float" />
              </div>
              <h3 className={`text-base font-bold ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>3D Animated Envelope</h3>
              <p className={`text-xs leading-relaxed font-medium ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
                GreetingsIsland-style realistic 3D envelope opening with wax seal crack, card elevation, and celebration confetti.
              </p>
            </div>
          </Interactive3DTilt>

          {/* Feature 2 */}
          <Interactive3DTilt maxTilt={8}>
            <div className={`p-6 rounded-3xl border space-y-4 shadow-md h-full transition-colors ${
              currentTheme.isDark
                ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
                : 'bg-white/90 border-amber-200/80 text-amber-950'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm">
                <Layers className="w-6 h-6 animate-float-reverse" />
              </div>
              <h3 className={`text-base font-bold ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>Auspicious Motifs & Badges</h3>
              <p className={`text-xs leading-relaxed font-medium ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
                Lord Ganesha, Om, Kalash, Swastik, Diyas, and Toran garlands you can place and style freely.
              </p>
            </div>
          </Interactive3DTilt>

          {/* Feature 3 */}
          <Interactive3DTilt maxTilt={8}>
            <div className={`p-6 rounded-3xl border space-y-4 shadow-md h-full transition-colors ${
              currentTheme.isDark
                ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
                : 'bg-white/90 border-amber-200/80 text-amber-950'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-sm">
                <MessageCircle className="w-6 h-6 animate-float" />
              </div>
              <h3 className={`text-base font-bold ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>Smart WhatsApp Share</h3>
              <p className={`text-xs leading-relaxed font-medium ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
                Auto-generates formatted WhatsApp invitation messages in your selected Indian language.
              </p>
            </div>
          </Interactive3DTilt>

          {/* Feature 4 */}
          <Interactive3DTilt maxTilt={8}>
            <div className={`p-6 rounded-3xl border space-y-4 shadow-md h-full transition-colors ${
              currentTheme.isDark
                ? 'bg-slate-900/90 border-amber-400/25 text-slate-100'
                : 'bg-white/90 border-amber-200/80 text-amber-950'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-sm">
                <Palette className="w-6 h-6 animate-float-reverse" />
              </div>
              <h3 className={`text-base font-bold ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>Indian Royal Palettes</h3>
              <p className={`text-xs leading-relaxed font-medium ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
                Curated Haldi-Kumkum, Peacock Emerald, Kanjeevaram Silk & Zari, and Rajasthani Jharokha frames.
              </p>
            </div>
          </Interactive3DTilt>
        </div>
      </section>

      {/* 5. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-orange-500">
            Endless Possibilities
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold font-display ${
            currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
          }`}>
            {t('chooseCelebration')}
          </h2>
          <p className={`text-sm ${currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'}`}>
            From regal weddings and lively birthdays to Griha Pravesh and Poojas, select a celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED TEMPLATES SHOWCASE WITH LIVE FILTER TABS & MODAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-orange-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Studio Handcrafted Designs</span>
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold font-display ${
              currentTheme.isDark ? 'text-[#fef3c7]' : 'text-[#3f120e]'
            }`}>
              Featured Templates
            </h2>
            <p className={`text-sm max-w-xl font-medium ${
              currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'
            }`}>
              Filter and customize our most loved luxury royal wedding, birthday party, and auspicious festive designs.
            </p>
          </div>

          <Link
            to="/templates"
            onClick={() => soundEffects.playSoftClick()}
            className={`px-5 py-2.5 rounded-xl border font-bold text-xs transition-all flex items-center space-x-1.5 shadow-sm hover:shadow-md cursor-pointer shrink-0 ${
              currentTheme.isDark
                ? 'bg-slate-900 border-amber-400/30 text-amber-300 hover:border-amber-400'
                : 'bg-white border-amber-200 hover:border-amber-400 text-amber-800'
            }`}
          >
            <span>View All 35+ Designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          {[
            { id: 'all', label: '✨ All Featured' },
            { id: 'wedding', label: '💍 Royal Wedding' },
            { id: 'birthday', label: '🎂 Birthday Bash' },
            { id: 'anniversary', label: '🥂 Anniversary' },
            { id: 'engagement', label: '💎 Engagement' },
            { id: 'religious', label: '🪔 Sacred Pooja' },
            { id: 'housewarming', label: '🏡 Griha Pravesh' },
          ].map((tab) => {
            const isTabActive = templateFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEffects.playSoftClick();
                  setTemplateFilter(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isTabActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20'
                    : currentTheme.isDark
                    ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:border-amber-400/50'
                    : 'bg-white hover:bg-amber-50 text-[#78350f] border border-amber-200/80 hover:border-amber-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreviewModal={(tmpl) => setPreviewTemplate(tmpl)}
            />
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white p-8 sm:p-14 text-center space-y-6 shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Ready to create your invitation?
            </h2>
            <p className="text-sm sm:text-base text-orange-100 font-medium">
              Start designing in any Indian language with 35+ stunning free templates.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/create"
                onClick={() => soundEffects.playCelebrationFanfare()}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-amber-50 text-orange-600 font-extrabold text-base shadow-2xl flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span>Start Designing Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
