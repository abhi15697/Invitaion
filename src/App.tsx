import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { CursorGlowTrail } from './components/common/CursorGlowTrail';
import { ClickBurstEffect } from './components/common/ClickBurstEffect';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TemplatesGalleryPage } from './pages/TemplatesGalleryPage';
import { CreateCategoryPickerPage } from './pages/CreateCategoryPickerPage';
import { BuilderPage } from './pages/BuilderPage';
import { PreviewPage } from './pages/PreviewPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  const currentTheme = useThemeStore((state) => state.theme);

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col ${currentTheme.bgClass} ${currentTheme.textHeading} selection:bg-orange-500/25 selection:text-orange-950 relative transition-colors duration-700`}>
        {/* Dynamic Canvas Background with Sky Lanterns, Bokeh & Golden Stardust */}
        <AnimatedBackground />

        {/* Global Mouse Hover Glow & Trail */}
        <CursorGlowTrail />

        {/* Global Click Sparkle Burst & Shockwave Ripples */}
        <ClickBurstEffect />

        {/* Main App Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/invitations" element={<CategoriesPage />} />
              <Route path="/templates" element={<TemplatesGalleryPage />} />
              <Route path="/create" element={<CreateCategoryPickerPage />} />
              <Route path="/create/:category" element={<BuilderPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
