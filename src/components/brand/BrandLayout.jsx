import { useState, useEffect, useRef } from 'react';
import { brandsData } from '../../data/productsData';
import BrandHero from './BrandHero';
import ProductCatalog from './ProductCatalog';
import BrandAbout from './BrandAbout';
import BrandCTA from './BrandCTA';
import BrandFooter from './BrandFooter';
import { Globe, ArrowLeft, Send } from 'lucide-react';
import { handleLinkClick, replaceURLForSection, parseCurrentRoute } from '../../utils/navigation';

/**
 * BrandLayout Master Component
 * @param {Object} props
 * @param {string} props.brandId - Active brand identifier ('jetema' | 'dermclar' | 'xtralife')
 * @param {string} props.language - Active language state ('es' | 'en')
 * @param {function} props.onBackToHome - Routing trigger callback to return to the home brand portal
 * @param {function} props.onToggleLanguage - Callback to switch translation languages
 */
const BrandLayout = ({ brandId, language, onBackToHome, onToggleLanguage }) => {
  const isEs = language === 'es';
  
  // 1. Resolve brand configuration or fail gracefully
  const brand = brandsData[brandId];

  // Resolve brand-specific hover styling dynamically to match capsule navbar design
  const hoverClass = brandId === 'jetema' 
    ? 'hover:text-[#4C5A9D] after:bg-[#4C5A9D]' 
    : brandId === 'dermclar' 
      ? 'hover:text-[#0ea5e9] after:bg-[#0ea5e9]' 
      : 'hover:text-emerald-500 after:bg-emerald-500';

  const brandHoverText = brandId === 'jetema' 
    ? 'hover:text-[#4C5A9D]' 
    : brandId === 'dermclar' 
      ? 'hover:text-[#0ea5e9]' 
      : 'hover:text-emerald-500';

  // Sticky sub-navbar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Initialize selected product state from URL if present
  const initialRoute = parseCurrentRoute();
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId || '');

  // Keep a ref of selectedProductId to avoid recreation of IntersectionObserver
  const selectedProductRef = useRef(selectedProductId);
  useEffect(() => {
    selectedProductRef.current = selectedProductId;
  }, [selectedProductId]);

  // Synchronize state if URL changes externally (e.g. browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      if (route.brandId === brandId) {
        setSelectedProductId(route.productId || '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [brandId]);

  const handleSelectProduct = (prodId) => {
    setSelectedProductId(prodId);
    replaceURLForSection(brandId, 'catalog-section', prodId);
  };

  // Initial load scroll resolving for subpage sections (e.g. direct load of /jetema/catalogo/toxta-100u)
  useEffect(() => {
    const route = parseCurrentRoute();
    if (route.sectionId && route.sectionId !== 'top') {
      setTimeout(() => {
        const target = document.getElementById(route.sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [brandId]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Dynamic hide-on-scroll-down, show-on-scroll-up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Brand Subpage Scroll-Spy URL Updater
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = [
        { id: 'catalog-section', pathKey: 'catalog-section' },
        { id: 'about-section', pathKey: 'about-section' },
        { id: 'cta-section', pathKey: 'cta-section' }
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
              const prodId = match.pathKey === 'catalog-section' ? selectedProductRef.current : null;
              replaceURLForSection(brandId, match.pathKey, prodId);
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

      // Observe BrandHero element to reset URL back to `/brandname` when at the top
      const heroEl = document.getElementById('brand-hero-section');
      const handleTopIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            replaceURLForSection(brandId, 'top');
          }
        });
      };

      const topObserver = new IntersectionObserver(handleTopIntersect, {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
      });

      if (heroEl) {
        topObserver.observe(heroEl);
      }

      return () => {
        sections.forEach(s => {
          const el = document.getElementById(s.id);
          if (el) observer.unobserve(el);
        });
        if (heroEl) topObserver.unobserve(heroEl);
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [brandId]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <p className="text-sm font-semibold">Brand "{brandId}" not found in database.</p>
        <button 
          onClick={onBackToHome}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs font-bold transition-all"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-lightBg w-full flex flex-col justify-between overflow-x-hidden text-primary-dark">
      
      {/* 1. Dynamic Sticky Subpage Capsule Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 px-3 xs:px-4 sm:px-8 lg:px-20 pt-3 sm:pt-6 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div 
          className={`max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'glass-nav py-2 px-3 sm:py-3 sm:px-6 shadow-lg scale-98 sm:scale-100' 
              : 'bg-white/40 backdrop-blur-md py-2.5 px-3.5 sm:py-4 sm:px-8 border border-white/30'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left side: Back to Portal button + brand mini logo */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              <button
                onClick={onBackToHome}
                className={`flex items-center gap-0.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-primary-dark/80 hover:bg-slate-100/50 transition-all duration-200 focus:outline-none cursor-pointer ${brandHoverText}`}
                title={isEs ? "Volver al inicio" : "Back to Home"}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xxs:inline">{isEs ? "Volver" : "Back"}</span>
              </button>

              <div className="h-4 w-px bg-slate-200 hidden xxs:block" />

              {/* Dynamic Brand Logo */}
              <div 
                onClick={(e) => handleLinkClick(e, brandId, 'top')}
                className="flex items-center gap-1.5 group cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-[15px] xs:h-[18px] sm:h-[24px] md:h-[28px] w-auto object-contain filter drop-shadow-sm brightness-100" 
                  />
              </div>
            </div>

            {/* Center: Anchor Links specific to subpage */}
            <nav className="hidden md:flex items-center gap-8 2xl:gap-12">
              <button
                onClick={(e) => handleLinkClick(e, brandId, 'catalog-section')}
                className={`text-sm 2xl:text-base font-medium text-primary-dark/80 transition-colors duration-200 relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${hoverClass}`}
              >
                {isEs ? "Productos" : "Products"}
              </button>
              <button
                onClick={(e) => handleLinkClick(e, brandId, 'about-section')}
                className={`text-sm 2xl:text-base font-medium text-primary-dark/80 transition-colors duration-200 relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${hoverClass}`}
              >
                {isEs ? "Empresa" : "Company"}
              </button>
              <button
                onClick={(e) => handleLinkClick(e, brandId, 'cta-section')}
                className={`text-sm 2xl:text-base font-medium text-primary-dark/80 transition-colors duration-200 relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${hoverClass}`}
              >
                {isEs ? "Contacto" : "Contact"}
              </button>
            </nav>

            {/* Right Side: Toggle language + High-Conversion Call Button */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button 
                onClick={onToggleLanguage}
                className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold text-primary-dark/80 hover:bg-slate-100/50 transition-all duration-200 focus:outline-none ${brandHoverText}`}
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                onClick={(e) => handleLinkClick(e, brandId, 'cta-section')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-extrabold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${brand.accentBg} ${brand.accentHover}`}
              >
                <span>{isEs ? "Contactar" : "Contact Us"}</span>
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. Structured Layout Body */}
      <main className="flex-grow">
        {/* Dynamic Presentation Hero */}
        <BrandHero brand={brand} language={language} />

        {/* Dynamic Split Sidebar Catalog grid */}
        <ProductCatalog 
          key={brand.id} 
          brand={brand} 
          language={language} 
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />

        {/* Corporate distributor/logistics background */}
        <BrandAbout brand={brand} language={language} onBackToHome={onBackToHome} />

        {/* B2B clinical pipeline lead collector */}
        <BrandCTA brand={brand} language={language} />
      </main>

      {/* 3. Shared regulatory regulatory disclaimers footer */}
      <BrandFooter brand={brand} language={language} onBackToHome={onBackToHome} />

    </div>
  );
};

export default BrandLayout;
