import React, { useState } from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { InvitationRenderer } from '../../templates/InvitationRenderer';
import { triggerConfetti } from '../../utils/export';
import { soundEffects } from '../../utils/soundEffects';
import { motion } from 'framer-motion';
import { Mail, Sparkles, RefreshCw } from 'lucide-react';
import type { EnvelopeTheme } from '../../types/invitation';

interface EnvelopePreviewProps {
  data: any;
}

const ENVELOPE_STYLES: Record<
  EnvelopeTheme,
  {
    bg: string;
    flap: string;
    inner: string;
    border: string;
    accent: string;
    label: string;
    sealBg: string;
    sealIcon: string;
  }
> = {
  'royal-maroon': {
    bg: 'bg-gradient-to-b from-[#5c0606] to-[#3b0303]',
    flap: 'bg-[#6e0707]',
    inner: 'bg-[#260101]',
    border: 'border-[#f59e0b]/60',
    accent: '#f59e0b',
    label: 'Royal Maroon & Gold',
    sealBg: 'from-amber-400 via-amber-500 to-amber-700',
    sealIcon: '👑',
  },
  'gold-velvet': {
    bg: 'bg-gradient-to-b from-[#92400e] to-[#451a03]',
    flap: 'bg-[#a14b10]',
    inner: 'bg-[#291002]',
    border: 'border-[#fde047]/70',
    accent: '#fde047',
    label: 'Imperial Gold Velvet',
    sealBg: 'from-yellow-300 via-amber-400 to-amber-600',
    sealIcon: '🕉️',
  },
  'emerald-silk': {
    bg: 'bg-gradient-to-b from-[#065f46] to-[#022c22]',
    flap: 'bg-[#047857]',
    inner: 'bg-[#011c15]',
    border: 'border-[#34d399]/60',
    accent: '#34d399',
    label: 'Emerald Palace Silk',
    sealBg: 'from-emerald-400 via-teal-500 to-emerald-700',
    sealIcon: '🦚',
  },
  'navy-night': {
    bg: 'bg-gradient-to-b from-[#3b0736] to-[#1f031c]',
    flap: 'bg-[#4d0b47]',
    inner: 'bg-[#140112]',
    border: 'border-[#f59e0b]/60',
    accent: '#f59e0b',
    label: 'Royal Amethyst & Gold',
    sealBg: 'from-amber-400 via-yellow-500 to-amber-700',
    sealIcon: '👑',
  },
  'blush-rose': {
    bg: 'bg-gradient-to-b from-[#9d174d] to-[#500724]',
    flap: 'bg-[#be185d]',
    inner: 'bg-[#330417]',
    border: 'border-[#f472b6]/60',
    accent: '#f472b6',
    label: 'Rose Gold Damask',
    sealBg: 'from-pink-300 via-rose-400 to-rose-600',
    sealIcon: '🌸',
  },
};

export const EnvelopePreview: React.FC<EnvelopePreviewProps> = ({ data }) => {
  const isEnvelopeOpen = useInvitationStore((state) => state.isEnvelopeOpen);
  const toggleEnvelopeOpen = useInvitationStore((state) => state.toggleEnvelopeOpen);
  const customization = useInvitationStore((state) => state.customization);
  const updateCustomization = useInvitationStore((state) => state.updateCustomization);

  const [sealCracked, setSealCracked] = useState(false);

  const envelopeTheme: EnvelopeTheme = customization.envelopeTheme || 'royal-maroon';
  const themeConfig = ENVELOPE_STYLES[envelopeTheme];

  const handleToggle = () => {
    if (!isEnvelopeOpen) {
      soundEffects.playWaxSealPop();
      setSealCracked(true);
      setTimeout(() => {
        soundEffects.playEnvelopeOpen();
        triggerConfetti();
        toggleEnvelopeOpen();
        setSealCracked(false);
      }, 250);
    } else {
      soundEffects.playSoftClick();
      toggleEnvelopeOpen();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full py-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-lg px-4 py-2.5 rounded-2xl glass-panel border border-amber-500/20 text-xs shadow-2xl">
        <div className="flex items-center space-x-2 text-amber-300 font-bold">
          <Mail className="w-4 h-4 text-amber-400 animate-float" />
          <span>Interactive 3D Envelope</span>
        </div>

        {/* Envelope Color Picker */}
        <div className="flex items-center space-x-2">
          {(Object.keys(ENVELOPE_STYLES) as EnvelopeTheme[]).map((thm) => (
            <motion.button
              key={thm}
              type="button"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                soundEffects.playSoftClick();
                updateCustomization({ envelopeTheme: thm });
              }}
              className={`w-5 h-5 rounded-full border transition-all ${
                envelopeTheme === thm ? 'scale-125 border-white shadow-lg shadow-amber-500/30' : 'border-white/30 opacity-70'
              }`}
              style={{
                backgroundColor:
                  thm === 'royal-maroon'
                    ? '#6e0707'
                    : thm === 'gold-velvet'
                    ? '#a14b10'
                    : thm === 'emerald-silk'
                    ? '#047857'
                    : thm === 'navy-night'
                    ? '#2e266d'
                    : '#be185d',
              }}
              title={ENVELOPE_STYLES[thm].label}
            />
          ))}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-extrabold shadow-md shadow-amber-500/25 flex items-center space-x-1"
        >
          {isEnvelopeOpen ? <RefreshCw className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>{isEnvelopeOpen ? 'Close Envelope' : 'Open Envelope'}</span>
        </motion.button>
      </div>

      {/* 3D Interactive Envelope Container */}
      <div className="relative w-[340px] sm:w-[440px] h-[520px] flex items-center justify-center perspective-1000">
        {/* The Envelope Base Pocket */}
        <div
          onClick={handleToggle}
          className={`relative w-full h-[330px] rounded-3xl shadow-2xl border-2 cursor-pointer transition-all duration-700 ${themeConfig.bg} ${themeConfig.border} flex items-center justify-center overflow-visible select-none`}
          style={{
            boxShadow: `0 30px 70px -15px ${themeConfig.accent}44, inset 0 2px 4px rgba(255,255,255,0.2)`,
          }}
        >
          {/* Subtle Inner Gold Foil Mandala Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 rounded-3xl pointer-events-none" />

          {/* Envelope Top Flap (Triangular flap with 3D rotate) */}
          <div
            className={`absolute top-0 left-0 right-0 h-[175px] ${themeConfig.flap} border-b-2 ${themeConfig.border} origin-top transition-transform duration-700 z-30 flex justify-center items-end pb-3 shadow-xl`}
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transform: isEnvelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Wax Seal on Closed Envelope */}
            {!isEnvelopeOpen && (
              <motion.div
                animate={sealCracked ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.05, 1] }}
                transition={sealCracked ? { duration: 0.25 } : { repeat: Infinity, duration: 2.5 }}
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${themeConfig.sealBg} shadow-2xl border-2 border-yellow-200 flex items-center justify-center text-slate-950 font-extrabold text-base relative -mb-6 cursor-pointer`}
                style={{
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.5)',
                }}
              >
                <span>{themeConfig.sealIcon}</span>
                {/* Golden rim ring */}
                <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
              </motion.div>
            )}
          </div>

          {/* Envelope Inner Lining Shadow */}
          <div
            className={`absolute inset-2 rounded-2xl ${themeConfig.inner} border border-white/5 pointer-events-none shadow-inner`}
          />

          {/* The Invitation Card (Sliding Upwards when opened) */}
          <div
            className="absolute transition-all duration-700 ease-out z-20 shadow-2xl origin-bottom"
            style={{
              transform: isEnvelopeOpen
                ? 'translateY(-140px) scale(0.70)'
                : 'translateY(15px) scale(0.55)',
              opacity: isEnvelopeOpen ? 1 : 0.85,
              pointerEvents: isEnvelopeOpen ? 'auto' : 'none',
            }}
          >
            <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl">
              <InvitationRenderer data={data} />
            </div>
          </div>

          {/* Envelope Front Pocket (Lower Triangular V-Shape with gold trim) */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[230px] ${themeConfig.bg} border-t-2 ${themeConfig.border} pointer-events-none z-25 rounded-b-3xl shadow-lg`}
            style={{
              clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
            }}
          />

          {/* Closed State Floating Banner */}
          {!isEnvelopeOpen && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute bottom-6 z-40 px-5 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-extrabold flex items-center space-x-2 shadow-2xl"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Tap Seal to Open Invitation</span>
            </motion.div>
          )}
        </div>
      </div>

      <p className="text-xs text-amber-300/70 text-center font-medium">
        GreetingsIsland & InviteCrafter-style 3D animated envelope unboxing
      </p>
    </div>
  );
};
