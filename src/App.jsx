import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import CTAContact from './components/CTAContact';
import Footer from './components/Footer';
import BrandLayout from './components/brand/BrandLayout';
import { navigateHome, parseCurrentRoute, replaceURLForSection } from './utils/navigation';

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

  const routeInfo = parseCurrentRoute();
  const activeBrandId = routeInfo.brandId;

  // Initial and Transition Viewport Scrolling
  useEffect(() => {
    if (activeBrandId) {
      // Fast scroll to top when rendering a brand subpage
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll to home page sections
      const state = window.history.state;
      const targetId = (state && state.scrollToSection) || routeInfo.sectionId;

      if (targetId && targetId !== 'top') {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else if (targetId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      // Clear scroll target state from history
      if (state && state.scrollToSection) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [currentPath, activeBrandId, routeInfo.sectionId]);

  // Homepage Scroll-Spy URL Updater
  useEffect(() => {
    if (activeBrandId) return;

    // Wait slightly for DOM elements to render completely
    const timer = setTimeout(() => {
      const sections = [
        { id: 'hero', pathKey: 'top' },
        { id: 'ecosystem', pathKey: 'ecosystem' },
        { id: 'about', pathKey: 'about' },
        { id: 'contact', pathKey: 'contact' }
      ];

      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Active when section occupies center line of viewport
        threshold: 0
      };

      const handleIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = sections.find(s => s.id === id);
            if (match) {
              replaceURLForSection(null, match.pathKey);
            }
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, observerOptions);

      sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) {
          observer.observe(el);
        }
      });

      return () => {
        sections.forEach(s => {
          const el = document.getElementById(s.id);
          if (el) observer.unobserve(el);
        });
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [activeBrandId]);

  // Legacy initial hash load fallback
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

