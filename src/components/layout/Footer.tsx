import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Zap, Download, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { soundEffects } from '../../utils/soundEffects';
import { useThemeStore } from '../../store/themeStore';

export const Footer: React.FC = () => {
  const currentTheme = useThemeStore((state) => state.theme);

  return (
    <footer className={`border-t text-sm relative z-10 backdrop-blur-xl transition-colors duration-500 ${
      currentTheme.isDark
        ? 'border-amber-400/25 bg-[#0a0f1d]/95 text-slate-300'
        : 'border-amber-200 bg-white/95 text-[#78350f]'
    }`}>
      {/* Feature highlights bar */}
      <div className={`border-b ${
        currentTheme.isDark ? 'border-slate-800 bg-slate-900/50' : 'border-amber-100 bg-amber-50/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${
              currentTheme.isDark ? 'bg-slate-800 border-slate-700 text-orange-400' : 'bg-orange-100 border-orange-200 text-orange-600'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-xs ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>Instant Generation</h4>
              <p className={`text-[11px] ${currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'}`}>Real-time live preview as you type</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${
              currentTheme.isDark ? 'bg-slate-800 border-slate-700 text-red-400' : 'bg-red-100 border-red-200 text-red-600'
            }`}>
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-xs ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>2x High-Res Export</h4>
              <p className={`text-[11px] ${currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'}`}>Download crisp PNG, JPG & PDF</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${
              currentTheme.isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-100 border-amber-200 text-amber-600'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-xs ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>100% Private</h4>
              <p className={`text-[11px] ${currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'}`}>Runs locally in your browser</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${
              currentTheme.isDark ? 'bg-slate-800 border-slate-700 text-orange-400' : 'bg-orange-100 border-orange-200 text-orange-600'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-xs ${currentTheme.isDark ? 'text-slate-100' : 'text-[#3f120e]'}`}>35+ Boutique Templates</h4>
              <p className={`text-[11px] ${currentTheme.isDark ? 'text-slate-400' : 'text-[#9a3412]'}`}>For weddings, birthdays & poojas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <Link
            to="/"
            onClick={() => soundEffects.playSoftClick()}
            className="flex items-center space-x-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-0.5 shadow-md shadow-orange-500/25">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                currentTheme.isDark ? 'bg-slate-900' : 'bg-white'
              }`}>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <span className={`text-lg font-extrabold font-display ${
              currentTheme.isDark ? 'text-amber-100' : 'text-[#3f120e]'
            }`}>
              Invite<span className="text-orange-gradient font-serif italic">Craft</span>
            </span>
          </Link>
          <p className={`text-xs leading-relaxed font-medium ${
            currentTheme.isDark ? 'text-slate-400' : 'text-[#78350f]'
          }`}>
            "Create Elegant Invitations in Any Indian Language." Free, instant, and privacy-focused digital invitation designer for all your celebratory moments.
          </p>
          <div className={`text-xs font-semibold flex items-center gap-1.5 ${
            currentTheme.isDark ? 'text-amber-400' : 'text-orange-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>No registration or login required</span>
          </div>
        </div>

        {/* Categories 1 */}
        <div>
          <h4 className={`text-xs uppercase tracking-widest font-extrabold mb-3 ${
            currentTheme.isDark ? 'text-amber-400' : 'text-orange-700'
          }`}>
            Celebrations
          </h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/create/${cat.id}`}
                  onClick={() => soundEffects.playSoftClick()}
                  className={`transition-colors flex items-center space-x-1.5 font-medium ${
                    currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title} Invitations</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories 2 */}
        <div>
          <h4 className={`text-xs uppercase tracking-widest font-extrabold mb-3 ${
            currentTheme.isDark ? 'text-amber-400' : 'text-orange-700'
          }`}>
            Milestones & More
          </h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(5).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/create/${cat.id}`}
                  onClick={() => soundEffects.playSoftClick()}
                  className={`transition-colors flex items-center space-x-1.5 font-medium ${
                    currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={`text-xs uppercase tracking-widest font-extrabold mb-3 ${
            currentTheme.isDark ? 'text-amber-400' : 'text-orange-700'
          }`}>
            Explore
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/templates" onClick={() => soundEffects.playSoftClick()} className={`transition-colors font-medium ${
                currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
              }`}>
                Browse 35+ Templates
              </Link>
            </li>
            <li>
              <Link to="/invitations" onClick={() => soundEffects.playSoftClick()} className={`transition-colors font-medium ${
                currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
              }`}>
                All Invitation Categories
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={() => soundEffects.playCelebrationFanfare()} className={`transition-colors font-medium ${
                currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
              }`}>
                Start Creating Free
              </Link>
            </li>
            <li>
              <Link to="/" className={`transition-colors font-medium ${
                currentTheme.isDark ? 'text-slate-300 hover:text-amber-300' : 'text-[#5c1414] hover:text-orange-600'
              }`}>
                11 Indian Languages Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        currentTheme.isDark ? 'border-slate-800 text-slate-400' : 'border-amber-100 text-[#9a3412]'
      }`}>
        <p>© {new Date().getFullYear()} InviteCraft. Boutique Invitation Maker.</p>
        <p className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          <span>for joyous Indian & global celebrations</span>
        </p>
      </div>
    </footer>
  );
};
