import React from 'react';
import { Link } from 'react-router-dom';
import type { CategoryInfo } from '../../types/invitation';
import { useThemeStore } from '../../store/themeStore';
import { Interactive3DTilt } from '../common/Interactive3DTilt';
import { soundEffects } from '../../utils/soundEffects';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const currentTheme = useThemeStore((state) => state.theme);

  return (
    <Interactive3DTilt maxTilt={8} scale={1.03} className="h-full">
      <motion.div whileTap={{ scale: 0.97 }} className="h-full">
        <Link
          to={`/create/${category.id}`}
          onClick={() => soundEffects.playSoftClick()}
          className={`group relative rounded-3xl overflow-hidden p-6 h-full transition-all duration-300 border flex flex-col justify-between shadow-md hover:shadow-2xl block cursor-pointer ${
            currentTheme.isDark
              ? 'bg-slate-900/90 border-amber-400/25 hover:border-amber-400 hover:shadow-amber-500/20 text-slate-100'
              : 'bg-white/90 border-amber-200/90 hover:border-amber-400 hover:shadow-amber-500/15 text-amber-950'
          }`}
        >
          {/* Animated Light Sweep on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />

          {/* Subtle background glow on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl group-hover:scale-125 group-hover:rotate-12 group-hover:-translate-y-1 transition-all duration-300 shadow-sm ${
                currentTheme.isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                {category.icon}
              </div>

              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border shadow-sm group-hover:scale-105 transition-transform ${
                currentTheme.isDark
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}>
                {category.templateCount > 0 ? `${category.templateCount} ${category.templateCount === 1 ? 'Design' : 'Designs'}` : 'Coming Soon'}
              </span>
            </div>

            <div>
              <h3 className={`text-lg sm:text-xl font-bold font-display group-hover:text-orange-500 transition-colors ${
                currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'
              }`}>
                {category.title}
              </h3>
              <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium ${
                currentTheme.isDark ? 'text-slate-300' : 'text-[#78350f]'
              }`}>
                {category.description}
              </p>
            </div>
          </div>

          <div className={`relative z-10 pt-5 mt-4 border-t flex items-center justify-between text-xs font-bold text-orange-500 group-hover:text-orange-600 ${
            currentTheme.isDark ? 'border-slate-800' : 'border-amber-100'
          }`}>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>{category.featuredStyle}</span>
            </span>
            <span className="flex items-center space-x-1 group-hover:translate-x-2 transition-transform">
              <span>Create Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </Interactive3DTilt>
  );
};
