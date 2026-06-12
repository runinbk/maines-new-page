import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import CTAContact from './components/CTAContact';
import Footer from './components/Footer';
import BrandLayout from './components/brand/BrandLayout';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      const prevHash = currentHash;
      setCurrentHash(newHash);

      const isBrandPage = newHash.startsWith('#/brand/');
      const wasBrandPage = prevHash.startsWith('#/brand/');

      if (isBrandPage || (wasBrandPage && !isBrandPage)) {
        // Fast scroll to top only when transitioning between page layouts (home vs brand pages)
        window.scrollTo(0, 0);
        
        // If returning to home and targeting a specific section, scroll to it smoothly after mount
        if (wasBrandPage && !isBrandPage && newHash && newHash !== '#') {
          setTimeout(() => {
            const targetId = newHash.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        // Smooth scroll for local section anchors on the home page
        if (newHash && newHash !== '#') {
          const targetId = newHash.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (newHash === '#' || newHash === '') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentHash]);

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

  // Simple, robust client-side hash router
  const getActiveBrandId = () => {
    if (currentHash === '#/brand/jetema') return 'jetema';
    if (currentHash === '#/brand/dermclar') return 'dermclar';
    if (currentHash === '#/brand/xtralife') return 'xtralife';
    return null;
  };

  const activeBrandId = getActiveBrandId();

  if (activeBrandId) {
    return (
      <BrandLayout
        brandId={activeBrandId}
        language={language}
        onBackToHome={() => { window.location.hash = ''; }}
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

