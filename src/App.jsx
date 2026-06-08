import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import SocialWall from './components/SocialWall';
import CTAContact from './components/CTAContact';
import Footer from './components/Footer';
import BrandLayout from './components/brand/BrandLayout';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Fast scroll to top on routing changes
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

        {/* Carousel Instagram Reels Wall */}
        <SocialWall />

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

