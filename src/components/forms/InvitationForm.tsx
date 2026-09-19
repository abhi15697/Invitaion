import React from 'react';
import { useInvitationStore } from '../../store/invitationStore';
import { CATEGORIES } from '../../data/categories';
import { WeddingForm } from './WeddingForm';
import { BirthdayForm } from './BirthdayForm';
import { AnniversaryForm } from './AnniversaryForm';
import { EngagementForm } from './EngagementForm';
import { BabyShowerForm } from './BabyShowerForm';
import { BabyAnnouncementForm } from './BabyAnnouncementForm';
import { GraduationForm } from './GraduationForm';
import { HousewarmingForm } from './HousewarmingForm';
import { PartyForm } from './PartyForm';
import { ReligiousForm } from './ReligiousForm';
import { soundEffects } from '../../utils/soundEffects';
import { Sparkles } from 'lucide-react';

export const InvitationForm: React.FC = () => {
  const activeCategory = useInvitationStore((state) => state.activeCategory);
  const formDataMap = useInvitationStore((state) => state.formDataMap);
  const updateFormField = useInvitationStore((state) => state.updateFormField);
  const resetToDemoData = useInvitationStore((state) => state.resetToDemoData);

  const categoryInfo = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const currentFormData = formDataMap[activeCategory] || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormField(field, value);
  };

  const handleResetDemo = () => {
    soundEffects.playSparkleSound();
    resetToDemoData(activeCategory);
  };

  const renderFormContent = () => {
    switch (activeCategory) {
      case 'wedding':
        return <WeddingForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'birthday':
        return <BirthdayForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'anniversary':
        return <AnniversaryForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'engagement':
        return <EngagementForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'baby-shower':
        return <BabyShowerForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'baby-announcement':
        return <BabyAnnouncementForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'graduation':
        return <GraduationForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'housewarming':
        return <HousewarmingForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'party':
        return <PartyForm data={currentFormData as any} onChange={handleFieldChange} />;
      case 'religious':
        return <ReligiousForm data={currentFormData as any} onChange={handleFieldChange} />;
      default:
        return <WeddingForm data={currentFormData as any} onChange={handleFieldChange} />;
    }
  };

  return (
    <div className="space-y-4 text-[#450a0a]">
      {/* Category Header & Demo Data Button */}
      <div className="flex items-center justify-between pb-3 border-b border-orange-100">
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl">{categoryInfo.icon}</span>
          <div>
            <h2 className="text-base font-bold text-[#450a0a] flex items-center gap-1.5">
              <span>{categoryInfo.title} Invitation</span>
            </h2>
            <p className="text-[11px] text-orange-800/80 font-semibold">Real-time live updating</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetDemo}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200 transition-all shadow-sm cursor-pointer"
          title="Fill realistic sample data for this category"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Demo Data</span>
        </button>
      </div>

      {/* Dynamic Category Form */}
      {renderFormContent()}
    </div>
  );
};
