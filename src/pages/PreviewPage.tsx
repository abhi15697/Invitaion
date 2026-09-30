import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInvitationStore } from '../store/invitationStore';
import { InvitationRenderer } from '../templates/InvitationRenderer';
import { getTranslation } from '../data/languages';
import { soundEffects } from '../utils/soundEffects';
import {
  exportInvitationToPng,
  exportInvitationToJpg,
  exportInvitationToPdf,
  triggerConfetti,
} from '../utils/export';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { motion } from 'framer-motion';
import {
  Download,
  FileImage,
  FileText,
  Edit3,
  PlusCircle,
  Sparkles,
  Share2,
  Printer,
  Check,
  AlertCircle,
  MessageCircle,
  Copy,
  Eye,
  Smartphone,
} from 'lucide-react';

export const PreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const exportRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const activeCategory = useInvitationStore((state) => state.activeCategory);
  const activeTemplateId = useInvitationStore((state) => state.activeTemplateId);
  const customization = useInvitationStore((state) => state.customization);
  const formDataMap = useInvitationStore((state) => state.formDataMap);

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWpText, setCopiedWpText] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'whatsapp'>('card');

  const formData = formDataMap[activeCategory] || {};
  const t = (key: string) => getTranslation(selectedLanguage, key);

  const invitationData = {
    category: activeCategory,
    templateId: activeTemplateId,
    fields: formData,
    customization,
  };

  const getExportFilename = (extension: string) => {
    const cleanCategory = activeCategory.replace(/[^a-zA-Z0-9]/g, '_');
    return `InviteCraft_${cleanCategory}_invitation.${extension}`;
  };

  const handleDownloadPng = async () => {
    if (!exportRef.current) return;
    soundEffects.playSoftClick();
    setLoadingAction('Generating Ultra-High Res PNG...');
    setErrorMessage(null);
    try {
      await exportInvitationToPng(exportRef.current, getExportFilename('png'));
      soundEffects.playCelebrationFanfare();
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to download PNG.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDownloadJpg = async () => {
    if (!exportRef.current) return;
    soundEffects.playSoftClick();
    setLoadingAction('Generating High-Quality JPEG...');
    setErrorMessage(null);
    try {
      await exportInvitationToJpg(exportRef.current, getExportFilename('jpg'));
      soundEffects.playCelebrationFanfare();
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to download JPG.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!exportRef.current) return;
    soundEffects.playSoftClick();
    setLoadingAction('Formatting and Generating PDF...');
    setErrorMessage(null);
    try {
      await exportInvitationToPdf(exportRef.current, getExportFilename('pdf'));
      soundEffects.playCelebrationFanfare();
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to download PDF.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handlePrint = () => {
    soundEffects.playSoftClick();
    window.print();
  };

  const handleCopyShare = () => {
    soundEffects.playSparkleSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    triggerConfetti();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Generate formatted WhatsApp message based on event type
  const generateWhatsAppMessage = () => {
    const fields = formData as any;
    let text = '';

    if (activeCategory === 'wedding') {
      text = `✨ *॥ ਸ਼ੁਭ ਵਿਆਹ / शुभ विवाह निमंत्रण ॥* ✨\n\n` +
        `👰🤵 *${fields.brideName || 'Bride'} & ${fields.groomName || 'Groom'}*\n\n` +
        `💌 ${fields.weddingMessage || 'We warmly invite you to celebrate with us.'}\n\n` +
        `📅 *Date / दिनांक:* ${fields.weddingDate || 'TBD'}\n` +
        `⏰ *Time / समय:* ${fields.weddingTime || 'TBD'}\n` +
        `📍 *Venue / स्थल:* ${fields.venueName || ''}, ${fields.venueAddress || ''}\n\n` +
        (fields.rsvpName ? `📞 *RSVP:* ${fields.rsvpName} (${fields.rsvpPhone || ''})\n\n` : '') +
        `✨ _Created with InviteCraft_`;
    } else if (activeCategory === 'birthday') {
      text = `🎉 *BIRTHDAY CELEBRATION! / वाढदिवस निमंत्रण* 🎂\n\n` +
        `⭐ *${fields.name || 'Our Star'}* is turning *${fields.age || ''}*!\n\n` +
        `🎈 ${fields.message || 'Join us for fun, cake, and celebration!'}\n\n` +
        `📅 *Date:* ${fields.birthdayDate || 'TBD'} | ⏰ *Time:* ${fields.time || 'TBD'}\n` +
        `📍 *Venue:* ${fields.venue || ''}, ${fields.address || ''}\n` +
        (fields.rsvpName ? `📞 *RSVP:* ${fields.rsvpName} (${fields.rsvpPhone || ''})\n\n` : '') +
        `✨ _Created with InviteCraft_`;
    } else if (activeCategory === 'religious') {
      text = `🕉️ *${fields.deityInvocation || '॥ ॐ श्री गणेशाय नमः ॥'}* 🕉️\n\n` +
        `🪔 *${fields.eventName || 'Mahapooja Invitation'}*\n\n` +
        `🙏 ${fields.message || 'You are cordially invited with family to receive divine blessings.'}\n\n` +
        `📅 *Date / दिनांक:* ${fields.date || 'TBD'}\n` +
        `⏰ *Time / समय:* ${fields.time || 'TBD'}\n` +
        `📍 *Venue / स्थल:* ${fields.venue || ''}, ${fields.address || ''}\n` +
        (fields.rsvpName ? `📞 *RSVP:* ${fields.rsvpName} (${fields.rsvpPhone || ''})\n\n` : '') +
        `✨ _Created with InviteCraft_`;
    } else {
      text = `✨ *INVITATION / निमंत्रण पत्र* ✨\n\n` +
        `💌 ${fields.message || 'You are warmly invited to celebrate with us!'}\n\n` +
        `📅 *Date:* ${fields.date || fields.weddingDate || 'TBD'} | ⏰ *Time:* ${fields.time || fields.weddingTime || 'TBD'}\n` +
        `📍 *Venue:* ${fields.venue || fields.venueName || ''}, ${fields.address || fields.venueAddress || ''}\n` +
        (fields.rsvpName ? `📞 *RSVP:* ${fields.rsvpName} (${fields.rsvpPhone || ''})\n\n` : '') +
        `✨ _Created with InviteCraft_`;
    }

    return text;
  };

  const handleShareWhatsApp = () => {
    soundEffects.playSoftClick();
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopyFormattedText = () => {
    soundEffects.playSparkleSound();
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopiedWpText(true);
    triggerConfetti();
    setTimeout(() => setCopiedWpText(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#450a0a]">
      {loadingAction && <LoadingOverlay message={loadingAction} />}

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-950 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin-slow" />
          <span>{t('noLogin') ? 'Your Royal Invitation is Ready!' : 'तैयार है आपका आमंत्रण पत्र'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#450a0a]">
          {t('downloadTitle')}
        </h1>
        <p className="text-sm text-[#78350f]">
          Export crystal-sharp 2x resolution files for WhatsApp, Social Media, or high-quality physical printing.
        </p>
      </div>

      {errorMessage && (
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* View Switcher: Card vs WhatsApp Phone */}
      <div className="flex justify-center">
        <div className="p-1.5 bg-white border border-orange-200 rounded-2xl flex items-center space-x-1.5 shadow-md">
          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              setViewMode('card');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === 'card'
                ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white shadow-md shadow-orange-500/25'
                : 'text-[#78350f] hover:text-[#450a0a]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Card View</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playSoftClick();
              setViewMode('whatsapp');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === 'whatsapp'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20'
                : 'text-[#78350f] hover:text-[#450a0a]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>WhatsApp Phone</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Full High-Res Canvas or Phone Simulator */}
        <div className="lg:col-span-7 flex justify-center">
          {viewMode === 'whatsapp' ? (
            /* WhatsApp iPhone Mockup Simulator */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[340px] sm:w-[380px] bg-slate-950 rounded-[44px] p-3.5 border-4 border-slate-700 shadow-2xl relative"
            >
              {/* Phone Dynamic Island */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 border border-slate-800" />

              {/* WhatsApp Header */}
              <div className="bg-[#1f2c34] px-4 py-3 rounded-2xl flex items-center justify-between text-white border border-slate-700/50 shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    💌
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs font-bold text-white">InviteCraft Guest</p>
                      <span className="text-[10px] text-emerald-400">✓</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Online</p>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>

              {/* Chat Canvas with Wallpaper */}
              <div className="my-3 p-3.5 rounded-2xl bg-[#0b141a] border border-slate-800/80 min-h-[360px] space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Chat Bubble */}
                <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-none shadow-lg space-y-2 text-xs border border-emerald-500/20">
                  <pre className="font-sans whitespace-pre-wrap leading-relaxed text-[11px] text-slate-100">
                    {generateWhatsAppMessage()}
                  </pre>
                  <div className="flex justify-end items-center space-x-1 text-[9px] text-emerald-200">
                    <span>Just now</span>
                    <span>✓✓</span>
                  </div>
                </div>
              </div>

              {/* Phone Action Bar */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="relative group p-4 sm:p-6 rounded-3xl bg-white border border-orange-200/80 shadow-xl flex items-center justify-center">
              {/* The actual exportable canvas target */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.4)] transition-all duration-200 shrink-0"
                style={{
                  width: `${Math.round(540 * 0.85)}px`,
                  height: `${Math.round(675 * 0.85)}px`,
                  maxWidth: '100%',
                }}
              >
                <div
                  className="origin-top-left"
                  style={{
                    width: '540px',
                    height: '675px',
                    transform: 'scale(0.85)',
                  }}
                >
                  <InvitationRenderer ref={exportRef} data={invitationData} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Download Actions & WhatsApp Sharing Panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Download Card */}
          <div className="glass-panel p-6 rounded-3xl border border-orange-200/80 space-y-4 shadow-xl bg-white/95">
            <h3 className="text-base font-bold text-[#450a0a] flex items-center space-x-2">
              <Download className="w-4 h-4 text-orange-500" />
              <span>{t('downloadTitle')}</span>
            </h3>

            <div className="space-y-2.5">
              {/* PNG Download */}
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={!!loadingAction}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <FileImage className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="leading-tight">{t('downloadPng')}</p>
                    <p className="text-[10px] text-orange-100 font-semibold">Ultra-crisp 2x Print Ready (2160×2700)</p>
                  </div>
                </div>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* JPG Download */}
              <button
                type="button"
                onClick={handleDownloadJpg}
                disabled={!!loadingAction}
                className="w-full p-3.5 rounded-2xl bg-white hover:bg-orange-50 text-[#78350f] font-bold text-xs sm:text-sm border border-orange-200 hover:border-orange-400 transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <FileImage className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="leading-tight">{t('downloadJpg')}</p>
                    <p className="text-[10px] text-[#9a3412] font-medium">Standard sharing for WhatsApp & Social</p>
                  </div>
                </div>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* PDF Download */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={!!loadingAction}
                className="w-full p-3.5 rounded-2xl bg-white hover:bg-orange-50 text-[#78350f] font-bold text-xs sm:text-sm border border-orange-200 hover:border-orange-400 transition-all flex items-center justify-between group disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="leading-tight">{t('downloadPdf')}</p>
                    <p className="text-[10px] text-[#9a3412] font-medium">Single-page portrait document</p>
                  </div>
                </div>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. WhatsApp Sharing & Smart Text Helper */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-200 bg-emerald-50/60 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Smart Invite</span>
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-200">
                1-Click Ready
              </span>
            </div>

            <p className="text-xs text-[#78350f] leading-relaxed">
              Send this invitation with ready-made formatted text, regional greetings, and venue details directly on WhatsApp.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyFormattedText}
                className="py-2.5 px-3 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {copiedWpText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-700" />}
                <span>{copiedWpText ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          {/* 3. Utility Actions: Print, Share Link, Edit, Create Another */}
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-2 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 text-xs font-semibold text-[#78350f] hover:text-[#450a0a] transition-colors flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
              title="Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleCopyShare}
              className="py-2.5 px-2 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 text-xs font-semibold text-[#78350f] hover:text-[#450a0a] transition-colors flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEffects.playSoftClick();
                navigate(`/create/${activeCategory}`);
              }}
              className="py-2.5 px-2 rounded-xl bg-white border border-orange-300 hover:border-orange-500 text-orange-800 font-bold text-xs transition-colors flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
              title="Edit"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <Link
              to="/create"
              onClick={() => soundEffects.playSoftClick()}
              className="py-2.5 px-2 rounded-xl bg-white border border-orange-200 hover:border-orange-400 text-[#78350f] hover:text-orange-600 font-bold text-xs transition-colors flex items-center justify-center space-x-1 text-center shadow-sm cursor-pointer"
              title="New"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
