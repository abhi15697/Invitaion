import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { soundEffects } from '../utils/soundEffects';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CreateCategoryPickerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Step 1: Choose Your Celebration</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#450a0a]">
          What are you <span className="text-orange-gradient font-serif italic">celebrating</span>?
        </h1>
        <p className="text-sm text-[#78350f] font-medium">
          Select an invitation category below to open the live builder and start customizing your design.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/create/${cat.id}`}
            onClick={() => soundEffects.playSoftClick()}
            className="group relative rounded-3xl overflow-hidden glass-card p-6 border border-orange-200/80 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/15 flex items-center justify-between bg-white/90 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-[#450a0a] group-hover:text-orange-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-orange-700 mt-0.5 font-semibold">
                  {cat.templateCount > 0 ? `${cat.templateCount} ${cat.templateCount === 1 ? 'Design Available' : 'Designs Available'}` : 'New Designs In Progress'}
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-orange-50 text-[#78350f] group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white flex items-center justify-center transition-all shadow-sm group-hover:scale-110">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
