import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import CTAContact from './components/CTAContact';
import Footer from './components/Footer';
import BrandLayout from './components/brand/BrandLayout';
import { navigateHome } from './utils/navigation';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Helper to extract active brand from the path segments (handles subdirectories)
  const getActiveBrandId = () => {
    const segments = currentPath.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    const last = segments[segments.length - 1];
    if (['jetema', 'dermclar', 'xtralife'].includes(last)) {
      return last;
    }
    return null;
  };

  const activeBrandId = getActiveBrandId();

  useEffect(() => {
    if (activeBrandId) {
      // Fast scroll to top when on a brand layout
      window.scrollTo(0, 0);
    } else {
      // Check if we came from a subpage or clicked a menu item with a scroll target
      const state = window.history.state;
      if (state && state.scrollToSection) {
        const targetId = state.scrollToSection;
        if (targetId === 'top') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
        // Clear history state to avoid scrolling again on page refresh
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [currentPath, activeBrandId]);

  // Handle initial mount smooth scroll if a hash exists in the URL
  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash && initialHash !== '#' && !initialHash.startsWith('#/brand/')) {
      setTimeout(() => {
        const targetId = initialHash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  if (activeBrandId) {
    return (
      <BrandLayout
        brandId={activeBrandId}
        language={language}
        onBackToHome={() => navigateHome()}
        onToggleLanguage={toggleLanguage}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-lightBg flex flex-col justify-between">
      {/* Navigation capsule */}
      <Navbar />

      {/* Home Sections */}
      <main className="flex-grow">
        {/* Hero Landing */}
        <Hero />

        {/* Accordion Brand Ecosystem */}
        <BrandPortal />

        {/* Asymmetrical Trayectory About Us */}
        <AboutSection />

        {/* Interactive DNA Contact CTA */}
        <CTAContact />
      </main>

      {/* Premium Dark Tech Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

