import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvitationStore } from '../store/invitationStore';
import { CATEGORIES } from '../data/categories';
import { getTemplatesByCategory } from '../data/templates';
import type { InvitationCategory } from '../types/invitation';
import { InvitationForm } from '../components/forms/InvitationForm';
import { CustomizationPanel } from '../components/builder/CustomizationPanel';
import { InvitationRenderer } from '../templates/InvitationRenderer';
import { EnvelopePreview } from '../components/preview/EnvelopePreview';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { WordingAssistantModal } from '../components/builder/WordingAssistantModal';
import { getTranslation } from '../data/languages';
import { soundEffects } from '../utils/soundEffects';
import {
  Sparkles,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Sliders,
  FileText,
  Eye,
  ChevronDown,
  BookOpen,
  Mail,
} from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const { category: urlCategory } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [wordingModalOpen, setWordingModalOpen] = useState(false);

  const selectedLanguage = useInvitationStore((state) => state.selectedLanguage);
  const activeCategory = useInvitationStore((state) => state.activeCategory);
  const activeTemplateId = useInvitationStore((state) => state.activeTemplateId);
  const customization = useInvitationStore((state) => state.customization);
  const zoomLevel = useInvitationStore((state) => state.zoomLevel);
  const activeTab = useInvitationStore((state) => state.activeTab);
  const isEnvelopeMode = useInvitationStore((state) => state.isEnvelopeMode);
  const toggleEnvelopeMode = useInvitationStore((state) => state.toggleEnvelopeMode);

  const setCategory = useInvitationStore((state) => state.setCategory);
  const setTemplateId = useInvitationStore((state) => state.setTemplateId);
  const setZoomLevel = useInvitationStore((state) => state.setZoomLevel);
  const setActiveTab = useInvitationStore((state) => state.setActiveTab);
  const getActiveFormData = useInvitationStore((state) => state.getActiveFormData);

  const t = (key: string) => getTranslation(selectedLanguage, key);

  // Sync URL param with store category if valid
  useEffect(() => {
    if (urlCategory) {
      const validCategory = CATEGORIES.find((c) => c.id === urlCategory);
      if (validCategory && validCategory.id !== activeCategory) {
        setCategory(validCategory.id as InvitationCategory);
      }
    }
  }, [urlCategory, activeCategory, setCategory]);

  const categoryTemplates = getTemplatesByCategory(activeCategory);
  const currentFormData = getActiveFormData();

  const invitationData = {
    category: activeCategory,
    templateId: activeTemplateId,
    fields: currentFormData,
    customization,
  };

  const handleCategoryChange = (newCategory: string) => {
    soundEffects.playSoftClick();
    setCategory(newCategory as InvitationCategory);
    navigate(`/create/${newCategory}`);
  };

  const handleTemplateChange = (tmplId: string) => {
    soundEffects.playSoftClick();
    setTemplateId(tmplId);
  };

  const handleGenerate = () => {
    soundEffects.playCelebrationFanfare();
    navigate('/preview');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col bg-[#fffbf5] text-[#450a0a]">
      {/* 1. Studio Top Bar (Canva / Adobe Express style) */}
      <div className="sticky top-20 z-40 glass-panel border-b border-orange-200/80 px-4 py-2.5 bg-white/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Category, Template, and Language Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Category Dropdown */}
            <div className="relative shrink-0">
              <select
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none bg-white border border-orange-200 hover:border-orange-400 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[#450a0a] focus:outline-none focus:border-orange-500 transition-colors cursor-pointer shadow-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-orange-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Template Dropdown */}
            <div className="relative shrink-0">
              <select
                value={activeTemplateId}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="appearance-none bg-white border border-orange-200 hover:border-orange-400 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-orange-800 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer shadow-sm"
              >
                {categoryTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    🎨 {t.name} ({t.style})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-orange-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Language Selector Dropdown */}
            <LanguageSelector compact showApplyDemoPrompt />
          </div>

          {/* Center / Right Action Tools */}
          <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-end">
            {/* Wording Assistant Button */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playSparkleSound();
                setWordingModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-orange-800 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
              title="Browse traditional verses & quotes in 11 Indian languages"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-500" />
              <span className="hidden sm:inline">शुभ संदेश व मंत्र</span>
              <span className="sm:hidden">Wording</span>
            </button>

            {/* 3D Envelope Mode Toggle Button */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playSoftClick();
                toggleEnvelopeMode();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isEnvelopeMode
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white shadow-md shadow-orange-500/25'
                  : 'bg-white hover:bg-orange-50 border border-orange-200 text-[#78350f]'
              }`}
              title="GreetingsIsland-style 3D Envelope Preview"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Envelope</span>
            </button>

            {/* Generate & Export CTA */}
            <button
              type="button"
              onClick={handleGenerate}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('downloadTitle') ? 'Next: Download' : 'Generate'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center justify-around bg-white/95 border-b border-orange-200 p-1 text-xs font-bold sticky top-[138px] z-30">
        <button
          type="button"
          onClick={() => {
            soundEffects.playSoftClick();
            setActiveTab('details');
          }}
          className={`flex-1 py-2 flex items-center justify-center space-x-1 rounded-lg transition-colors ${
            activeTab === 'details' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-[#78350f]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t('detailsTab')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playSoftClick();
            setActiveTab('preview');
          }}
          className={`flex-1 py-2 flex items-center justify-center space-x-1 rounded-lg transition-colors ${
            activeTab === 'preview' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-[#78350f]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t('previewTab')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playSoftClick();
            setActiveTab('customize');
          }}
          className={`flex-1 py-2 flex items-center justify-center space-x-1 rounded-lg transition-colors ${
            activeTab === 'customize' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-[#78350f]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{t('customizeTab')}</span>
        </button>
      </div>

      {/* 3. 3-Column Studio Work Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Dynamic Form (4 cols) */}
        <div
          className={`lg:col-span-4 glass-panel rounded-3xl p-5 border border-orange-200/80 max-h-[calc(100vh-160px)] overflow-y-auto space-y-4 shadow-md bg-white/95 text-[#450a0a] ${
            activeTab !== 'details' ? 'hidden lg:block' : 'block'
          }`}
        >
          <InvitationForm />
        </div>

        {/* Column 2: Center Live Canvas Preview (5 cols) */}
        <div
          className={`lg:col-span-5 flex flex-col items-center justify-start space-y-4 ${
            activeTab !== 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Zoom & Canvas Toolbar */}
          <div className="flex items-center justify-between w-full max-w-[420px] px-3 py-1.5 rounded-xl bg-white/95 border border-orange-200 text-xs text-[#78350f] shadow-md">
            <span className="font-semibold text-orange-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{isEnvelopeMode ? '3D Envelope View' : 'Live Canvas (1080×1350)'}</span>
            </span>

            <div className="flex items-center space-x-2">
              {!isEnvelopeMode && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playSoftClick();
                      setZoomLevel(zoomLevel - 0.1);
                    }}
                    className="p-1 hover:text-orange-600 rounded hover:bg-orange-50 cursor-pointer"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-orange-700 font-bold">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playSoftClick();
                      setZoomLevel(zoomLevel + 0.1);
                    }}
                    className="p-1 hover:text-orange-600 rounded hover:bg-orange-50 cursor-pointer"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playSoftClick();
                      setZoomLevel(1);
                    }}
                    className="p-1 hover:text-orange-600 rounded hover:bg-orange-50 text-[10px] font-bold cursor-pointer"
                    title="Reset zoom"
                  >
                    100%
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative p-2.5 rounded-3xl bg-white border border-orange-200/80 shadow-xl overflow-hidden flex items-center justify-center max-w-full">
            {isEnvelopeMode ? (
              <EnvelopePreview data={invitationData} />
            ) : (
              <div className="w-[340px] sm:w-[380px] h-[475px] sm:h-[530px] overflow-hidden rounded-2xl relative shadow-2xl bg-black">
                <div
                  className="origin-top-left transition-transform duration-200"
                  style={{
                    transform: `scale(${0.63 * zoomLevel})`,
                    marginLeft: '-2px',
                    marginTop: '-2px',
                  }}
                >
                  <InvitationRenderer ref={canvasRef} data={invitationData} />
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#9a3412] text-center font-medium">
            {customization.stickers && customization.stickers.length > 0
              ? `${customization.stickers.length} motifs placed • `
              : ''}
            Instant live rendering • Ready for 2x High-DPI export
          </p>
        </div>

        {/* Column 3: Customization Panel (3 cols) */}
        <div
          className={`lg:col-span-3 glass-panel rounded-3xl p-5 border border-orange-200/80 max-h-[calc(100vh-160px)] overflow-y-auto space-y-4 shadow-md bg-white/95 text-[#450a0a] ${
            activeTab !== 'customize' ? 'hidden lg:block' : 'block'
          }`}
        >
          <CustomizationPanel />
        </div>
      </div>

      {/* Wording Assistant Modal */}
      <WordingAssistantModal
        isOpen={wordingModalOpen}
        onClose={() => setWordingModalOpen(false)}
      />
    </div>
  );
};
