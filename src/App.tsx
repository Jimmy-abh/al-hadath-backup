import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Dynamic title component
const DynamicTitle: React.FC = () => {
  useEffect(() => {
    const updateTitle = () => {
      const language = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
      const titleElement = document.getElementById('page-title');
      if (titleElement) {
        titleElement.textContent = language === 'en' 
          ? 'Al-Hadath Events - Premium Event Planning & Production'
          : 'الحدث للفعاليات - تنظيم وإنتاج الفعاليات المتميز';
      }
    };

    // Update title on mount and when language changes
    updateTitle();
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

    return () => observer.disconnect();
  }, []);

  return null;
};

function App() {
  // Global scroll to top handler for route changes
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
      // Smooth scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    
    return null;
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-dark-200 scroll-smooth transition-colors duration-300">
            <DynamicTitle />
            <SEOHead />
            <ScrollToTop />
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;