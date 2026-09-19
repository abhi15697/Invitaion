import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TemplateDefinition } from '../../types/invitation';
import { useInvitationStore } from '../../store/invitationStore';
import { useThemeStore } from '../../store/themeStore';
import { DEMO_DATA_MAP } from '../../data/demoData';
import { InvitationRenderer } from '../../templates/InvitationRenderer';
import { soundEffects } from '../../utils/soundEffects';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Palette, CheckCircle2 } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateDefinition | null;
  onClose: () => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
}) => {
  const navigate = useNavigate();
  const setTemplateId = useInvitationStore((state) => state.setTemplateId);
  const currentTheme = useThemeStore((state) => state.theme);

  if (!template) return null;

  const demoData = DEMO_DATA_MAP[template.category] || DEMO_DATA_MAP.wedding;
  const invitationData = {
    category: template.category,
    templateId: template.id,
    fields: demoData,
    customization: template.defaultCustomization,
  };

  const handleStartCustomizing = () => {
    soundEffects.playCelebrationFanfare();
    setTemplateId(template.id);
    onClose();
    navigate(`/create/${template.category}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border z-10 my-8 ${
            currentTheme.isDark
              ? 'bg-[#0f172a] border-amber-400/40 text-slate-100'
              : 'bg-white border-amber-200 text-amber-950'
          }`}
        >
          {/* Header Bar */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            currentTheme.isDark ? 'border-slate-800 bg-slate-900/60' : 'border-amber-100 bg-amber-50/50'
          }`}>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center justify-center text-sm shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display truncate max-w-[240px] sm:max-w-md">
                  {template.name}
                </h3>
                <p className="text-[11px] text-amber-600 font-semibold capitalize">
                  {template.category.replace('-', ' ')} • {template.style} Style
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playSoftClick();
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left: Card Render Preview */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-white p-2.5 max-w-[340px] w-full">
                <div className="w-full h-[440px] overflow-hidden rounded-xl relative shadow-lg">
                  <div className="scale-[0.58] origin-top-left -ml-2 -mt-2">
                    <InvitationRenderer data={invitationData} />
                  </div>
                </div>

                {/* Print Ready Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                  ✨ 2x Ultra HD
                </div>
              </div>
            </div>

            {/* Right: Details & Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-600">
                    Template Overview
                  </span>
                  <h4 className="text-xl font-bold font-display mt-0.5">
                    {template.name}
                  </h4>
                  <p className={`text-xs mt-1.5 leading-relaxed ${currentTheme.isDark ? 'text-slate-300' : 'text-amber-900/80'}`}>
                    {template.description}
                  </p>
                </div>

                {/* Color Palette Inspection */}
                <div className="space-y-2">
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-500" />
                    <span>Included Color Scheme</span>
                  </p>
                  <div className="flex items-center space-x-2.5">
                    <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-200/50">
                      <span
                        className="w-5 h-5 rounded-full border shadow-sm"
                        style={{ backgroundColor: template.defaultCustomization.primaryColor }}
                        title="Primary Color"
                      />
                      <span
                        className="w-5 h-5 rounded-full border shadow-sm"
                        style={{ backgroundColor: template.defaultCustomization.accentColor }}
                        title="Accent Color"
                      />
                      <span
                        className="w-5 h-5 rounded-full border shadow-sm"
                        style={{ backgroundColor: template.defaultCustomization.backgroundColor }}
                        title="Card Canvas Color"
                      />
                    </div>
                    <span className="text-[11px] opacity-75">
                      Font: <strong className="capitalize">{template.defaultCustomization.fontFamily}</strong>
                    </span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2 border-t border-amber-100 dark:border-slate-800">
                  <p className="text-xs font-bold">What you can customize:</p>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className={currentTheme.isDark ? 'text-slate-200' : 'text-amber-950'}>
                        11 Indian regional languages & fonts
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className={currentTheme.isDark ? 'text-slate-200' : 'text-amber-950'}>
                        Ganesha, Om & Auspicious Motifs
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className={currentTheme.isDark ? 'text-slate-200' : 'text-amber-950'}>
                        3D Wax-sealed Envelope & WhatsApp share
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={handleStartCustomizing}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 group cursor-pointer transition-transform duration-200 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Customize This Template</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center opacity-60">
                  100% Free • No Account Required • Instant Download
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
