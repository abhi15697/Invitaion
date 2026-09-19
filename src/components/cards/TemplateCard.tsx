import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TemplateDefinition } from '../../types/invitation';
import { useInvitationStore } from '../../store/invitationStore';
import { useThemeStore } from '../../store/themeStore';
import { Interactive3DTilt } from '../common/Interactive3DTilt';
import { soundEffects } from '../../utils/soundEffects';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateDefinition;
  onPreviewModal?: (template: TemplateDefinition) => void;
}

const CATEGORY_MOTIFS: Record<string, string> = {
  wedding: '💍',
  birthday: '🎂',
  anniversary: '🥂',
  engagement: '💎',
  'baby-shower': '🍼',
  'baby-announcement': '👶',
  graduation: '🎓',
  housewarming: '🏡',
  party: '✨',
  religious: '🪔',
};

const WAX_SEALS: Record<string, string> = {
  wedding: '👑',
  birthday: '🎈',
  anniversary: '🥂',
  engagement: '💎',
  'baby-shower': '👶',
  'baby-announcement': '🍼',
  graduation: '🎓',
  housewarming: '🏡',
  party: '✨',
  religious: '🪔',
};

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreviewModal }) => {
  const navigate = useNavigate();
  const setTemplateId = useInvitationStore((state) => state.setTemplateId);
  const currentTheme = useThemeStore((state) => state.theme);
  const [isHovered, setIsHovered] = useState(false);

  const handleUseTemplate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playCelebrationFanfare();
    setTemplateId(template.id);
    navigate(`/create/${template.category}`);
  };

  const handleQuickPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playSoftClick();
    if (onPreviewModal) {
      onPreviewModal(template);
    } else {
      handleUseTemplate();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEffects.playSparkleSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const motif = CATEGORY_MOTIFS[template.category] || '✨';
  const waxSealIcon = WAX_SEALS[template.category] || '👑';

  return (
    <Interactive3DTilt maxTilt={8} scale={1.03} className="h-full">
      <motion.div
        whileTap={{ scale: 0.98 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-3xl overflow-hidden border flex flex-col justify-between shadow-lg hover:shadow-2xl h-full transition-all duration-300 cursor-pointer ${
          currentTheme.isDark
            ? 'bg-slate-900/90 border-amber-400/25 hover:border-amber-400 hover:shadow-amber-500/20 text-slate-100'
            : 'bg-white/95 border-amber-200/90 hover:border-amber-400 hover:shadow-amber-500/15 text-amber-950'
        }`}
      >
        {/* Floating 3D Gold Wax Seal Stamp on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-red-600 p-0.5 shadow-xl shadow-orange-500/40 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-red-700 via-rose-600 to-amber-600 flex items-center justify-center text-sm shadow-inner text-amber-100 border border-amber-300/60 font-bold">
                  <span>{waxSealIcon}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Ambient Sparkles around Card Perimeter on Hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {[
              { top: '15%', left: '8%', delay: 0 },
              { top: '75%', left: '12%', delay: 0.2 },
              { top: '25%', right: '10%', delay: 0.4 },
              { top: '80%', right: '14%', delay: 0.1 },
            ].map((spark, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], y: -25 }}
                transition={{ duration: 1.4, repeat: Infinity, delay: spark.delay }}
                className="absolute text-amber-400 text-xs font-serif"
                style={{ top: spark.top, left: spark.left, right: spark.right }}
              >
                ✦
              </motion.div>
            ))}
          </div>
        )}

        {/* Visual Preview Canvas */}
        <div
          className="relative h-64 w-full overflow-hidden p-5 flex flex-col justify-between items-center text-center transition-all duration-300 select-none"
          style={{
            backgroundColor: template.defaultCustomization.backgroundColor,
            color: template.defaultCustomization.textColor,
          }}
          onClick={handleQuickPreview}
        >
          {/* Animated Diagonal Foil Reflection Sweep on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-10" />

          {/* Decorative inner gold foil border */}
          <div
            className="absolute inset-3 border border-dashed rounded-xl pointer-events-none transition-all duration-300 group-hover:scale-[1.02] group-hover:border-solid"
            style={{ borderColor: `${template.defaultCustomization.primaryColor}70` }}
          />

          {/* Animated Corner flourish ornaments that spin on hover */}
          <div
            className="absolute top-2 left-2.5 text-[10px] opacity-50 font-serif pointer-events-none select-none group-hover:rotate-45 group-hover:scale-135 group-hover:opacity-100 transition-all duration-300"
            style={{ color: template.defaultCustomization.primaryColor }}
          >
            ✦
          </div>
          <div
            className="absolute top-2 right-2.5 text-[10px] opacity-50 font-serif pointer-events-none select-none group-hover:rotate-45 group-hover:scale-135 group-hover:opacity-100 transition-all duration-300"
            style={{ color: template.defaultCustomization.primaryColor }}
          >
            ✦
          </div>
          <div
            className="absolute bottom-2 left-2.5 text-[10px] opacity-50 font-serif pointer-events-none select-none group-hover:rotate-45 group-hover:scale-135 group-hover:opacity-100 transition-all duration-300"
            style={{ color: template.defaultCustomization.primaryColor }}
          >
            ✦
          </div>
          <div
            className="absolute bottom-2 right-2.5 text-[10px] opacity-50 font-serif pointer-events-none select-none group-hover:rotate-45 group-hover:scale-135 group-hover:opacity-100 transition-all duration-300"
            style={{ color: template.defaultCustomization.primaryColor }}
          >
            ✦
          </div>

          {/* Top Badges Bar */}
          <div className="w-full flex items-center justify-between z-10">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md group-hover:scale-105 transition-transform"
              style={{
                backgroundColor: `${template.defaultCustomization.primaryColor}22`,
                color: template.defaultCustomization.primaryColor,
                border: `1px solid ${template.defaultCustomization.primaryColor}44`,
              }}
            >
              {template.style}
            </span>

            {template.badge ? (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3" />
                <span>{template.badge}</span>
              </span>
            ) : (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-white opacity-90">
                2x Print Ready
              </span>
            )}
          </div>

          {/* Center Card Typography & Motif */}
          <div className="my-auto space-y-1.5 z-10 max-w-[220px]">
            <div className="w-8 h-8 mx-auto rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-sm shadow-inner group-hover:scale-120 group-hover:rotate-12 transition-transform duration-300">
              <span>{motif}</span>
            </div>

            <p className="text-[10px] opacity-80 uppercase tracking-widest font-sans font-semibold">
              {template.category.replace('-', ' ')}
            </p>
            <h4
              className="text-xl sm:text-2xl font-bold tracking-tight font-serif line-clamp-1 leading-tight group-hover:scale-105 transition-transform"
              style={{ color: template.defaultCustomization.primaryColor }}
            >
              {template.name}
            </h4>
            <p className="text-[11px] opacity-85 italic font-sans max-w-[190px] mx-auto line-clamp-1">
              {template.tagline}
            </p>
          </div>

          {/* Bottom subtle invitation date mock */}
          <div
            className="z-10 text-[9px] opacity-75 tracking-widest uppercase font-sans font-semibold"
            style={{ color: template.defaultCustomization.textColor }}
          >
            25 DEC 2026 • 7:00 PM
          </div>

          {/* Hover Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4 z-20">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleQuickPreview}
              className="px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white shadow-lg transition-transform border border-white/30 cursor-pointer flex items-center space-x-1.5 text-xs font-bold"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleUseTemplate}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-xl shadow-orange-500/30 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Customize</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Card Details Body */}
        <div className={`p-5 space-y-3 transition-colors ${
          currentTheme.isDark ? 'bg-slate-900/95' : 'bg-white/95'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-bold font-display group-hover:text-orange-500 transition-colors truncate pr-2 ${
                currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'
              }`}>
                {template.name}
              </h3>
              <span className={`text-xs capitalize font-bold shrink-0 ${
                currentTheme.isDark ? 'text-amber-400' : 'text-amber-700'
              }`}>
                {template.category}
              </span>
            </div>
            <p className={`text-xs mt-1 line-clamp-2 leading-relaxed font-medium ${
              currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'
            }`}>
              {template.description}
            </p>
          </div>

          <div className={`pt-2.5 flex items-center justify-between border-t ${
            currentTheme.isDark ? 'border-slate-800' : 'border-amber-100'
          }`}>
            {/* Color Swatches with hover bounce */}
            <div className="flex items-center space-x-1.5 group-hover:scale-105 transition-transform" title="Template color scheme">
              <span
                className="w-4 h-4 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-125"
                style={{ backgroundColor: template.defaultCustomization.primaryColor }}
              />
              <span
                className="w-4 h-4 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-125 delay-75"
                style={{ backgroundColor: template.defaultCustomization.accentColor }}
              />
              <span
                className="w-4 h-4 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-125 delay-150"
                style={{ backgroundColor: template.defaultCustomization.backgroundColor }}
              />
              <span className={`text-[10px] font-semibold pl-1 ${
                currentTheme.isDark ? 'text-slate-400' : 'text-amber-800'
              }`}>Palette</span>
            </div>

            <button
              type="button"
              onClick={handleUseTemplate}
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center space-x-1 group-hover:translate-x-1.5 transition-transform cursor-pointer"
            >
              <span>Use Design</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </Interactive3DTilt>
  );
};
