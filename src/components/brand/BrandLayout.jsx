import { useState, useEffect } from 'react';
import { brandsData } from '../../data/productsData';
import BrandHero from './BrandHero';
import ProductCatalog from './ProductCatalog';
import BrandAbout from './BrandAbout';
import BrandCTA from './BrandCTA';
import BrandFooter from './BrandFooter';
import { Globe, ArrowLeft, Send } from 'lucide-react';

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

  // Sticky sub-navbar state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Smooth scroll helper for sub-navigation anchors
  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-lightBg w-full flex flex-col justify-between overflow-x-hidden text-primary-dark">
      
      {/* 1. Dynamic Sticky Subpage Capsule Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 lg:px-20 pt-4 sm:pt-6 transition-all duration-500`}>
        <div 
          className={`max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'glass-nav py-3 px-6 sm:px-8 shadow-lg scale-98 sm:scale-100' 
              : 'bg-white/40 backdrop-blur-md py-4 px-6 sm:px-8 border border-white/30'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left side: Back to Portal button + brand mini logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold text-primary-dark/80 hover:text-accent hover:bg-slate-100/50 transition-all duration-200 focus:outline-none cursor-pointer"
                title={isEs ? "Volver al inicio" : "Back to Home"}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{isEs ? "Volver" : "Back"}</span>
              </button>

              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              {/* Dynamic Brand Logo */}
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-5 sm:h-6 w-auto object-contain filter drop-shadow-sm brightness-100" 
                />
              </div>
            </div>

            {/* Center: Anchor Links specific to subpage */}
            <nav className="hidden md:flex items-center gap-6 xl:gap-8 text-xs font-extrabold uppercase tracking-widest text-primary-dark/80">
              <button
                onClick={() => handleScrollTo('catalog-section')}
                className="hover:text-accent transition-colors duration-200 focus:outline-none cursor-pointer"
              >
                {isEs ? "Productos" : "Products"}
              </button>
              <button
                onClick={() => handleScrollTo('about-section')}
                className="hover:text-accent transition-colors duration-200 focus:outline-none cursor-pointer"
              >
                {isEs ? "Empresa" : "Company"}
              </button>
              <button
                onClick={() => handleScrollTo('cta-section')}
                className="hover:text-accent transition-colors duration-200 focus:outline-none cursor-pointer"
              >
                {isEs ? "Contacto" : "Contact"}
              </button>
            </nav>

            {/* Right Side: Toggle language + High-Conversion Call Button */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onToggleLanguage}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-primary-dark/80 hover:text-accent hover:bg-slate-100/50 transition-all duration-200 focus:outline-none"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                onClick={() => handleScrollTo('cta-section')}
                className={`inline-flex items-center gap-1.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs font-extrabold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${brand.accentBg} ${brand.accentHover}`}
              >
                <span>{isEs ? "Contactar" : "Contact Us"}</span>
                <Send className="w-3.5 h-3.5" />
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
        <ProductCatalog key={brand.id} brand={brand} language={language} />

        {/* Corporate distributor/logistics background */}
        <BrandAbout brand={brand} language={language} />

        {/* B2B clinical pipeline lead collector */}
        <BrandCTA brand={brand} language={language} />
      </main>

      {/* 3. Shared regulatory regulatory disclaimers footer */}
      <BrandFooter brand={brand} language={language} onBackToHome={onBackToHome} />

    </div>
  );
};

export default BrandLayout;
