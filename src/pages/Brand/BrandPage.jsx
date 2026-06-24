import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageSkeleton } from '../../components/ui/Skeleton';
import BrandHero from './components/BrandHero';
import ProductCatalog from './components/ProductCatalog';
import BrandAbout from './components/BrandAbout';
import BrandCTA from './components/BrandCTA';
import BrandFooter from './components/BrandFooter';
import { Globe, ArrowLeft, Send } from 'lucide-react';
import { getProductIdFromSlug, getProductSlug } from '../../utils/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';

/**
 * BrandPage Master Component
 * Integrates React Router for clean subpaths and lazy state synchronization
 */
export const BrandPage = () => {
  const navigate = useNavigate();
  const { brandId, productSlug } = useParams();
  const { language, toggleLanguage } = useLanguage();
  const isEs = language === 'es';
  
  // 1. Resolve brand configuration dynamically
  const [brand, setBrand] = useState(null);
  const [loadingBrand, setLoadingBrand] = useState(true);
  const [prevBrandId, setPrevBrandId] = useState(brandId);

  if (brandId !== prevBrandId) {
    setPrevBrandId(brandId);
    setLoadingBrand(true);
  }

  useEffect(() => {
    import(`../../data/brands/${brandId}.js`)
      .then((module) => {
        setBrand(module.default);
        setLoadingBrand(false);
      })
      .catch((err) => {
        console.error("Failed to load brand data:", err);
        setBrand(null);
        setLoadingBrand(false);
      });
  }, [brandId]);

  // Resolve brand-specific hover text coloring for navigation items
  const brandHoverText = brandId === 'jetema' 
    ? 'hover:text-[#4C5A9D]' 
    : brandId === 'dermclar' 
      ? 'hover:text-[#0ea5e9]' 
      : 'hover:text-emerald-500';

  // Sticky sub-navbar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Active section tracked locally for the scroll spy highlighting
  const [activeSection, setActiveSection] = useState('top');

  // Translate URL slug to productId
  const selectedProductId = productSlug ? getProductIdFromSlug(productSlug, brandId) : '';

  const handleSelectProduct = useCallback((prodId) => {
    if (prodId) {
      const slug = getProductSlug(prodId, brandId);
      navigate(`/${brandId}/catalogo/${slug}`);
    } else {
      navigate(`/${brandId}/catalogo`);
    }
  }, [brandId, navigate]);

  const handleBackToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticked = false;
    
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Dynamic hide-on-scroll-down, show-on-scroll-up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
      ticked = false;
    };

    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(updateScroll);
        ticked = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Brand Subpage Local Scroll-Spy (Highlights Nav tabs based on current viewport)
  useEffect(() => {
    const sections = [
      { id: 'catalog-section', key: 'catalog' },
      { id: 'about-section', key: 'about' },
      { id: 'cta-section', key: 'cta' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
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

    const heroEl = document.getElementById('brand-hero-section');
    const handleTopIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection('top');
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
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [brandId, loadingBrand]);

  // Dynamic Page Meta Hooks for SEO
  const selectedProduct = useMemo(() => {
    if (!brand || !selectedProductId) return null;
    return brand.products?.find(p => 
      p.id === selectedProductId || 
      p.id.toLowerCase().includes(selectedProductId.toLowerCase()) || 
      selectedProductId.toLowerCase().includes(p.id.toLowerCase())
    ) || null;
  }, [brand, selectedProductId]);

  const pageTitle = selectedProduct
    ? `${selectedProduct.name} | ${brand?.name}`
    : brand 
      ? `${brand.name} | ${isEs ? 'Biotecnología y Estética Profesional' : 'Professional Biotechnology & Aesthetics'}` 
      : '';

  const pageDesc = selectedProduct
    ? (isEs 
        ? `${selectedProduct.name}: ${selectedProduct.composition || selectedProduct.descriptor || ''}. Distribuidor oficial ${brand?.name} importado por Maines SRL.` 
        : `${selectedProduct.name}: ${selectedProduct.composition || selectedProduct.descriptor || ''}. Official distributor ${brand?.name} imported by Maines SRL.`)
    : brand 
      ? (isEs 
          ? `Explora el catálogo oficial de ${brand.name} importado en Bolivia por Maines SRL. Distribución autorizada de fórmulas de alta calidad.` 
          : `Explore the official catalog of ${brand.name} imported in Bolivia by Maines SRL. Authorized distributor of premium formulas.`) 
      : '';

  const ogImage = selectedProduct?.coverImage || selectedProduct?.assets?.coverImage || brand?.logo || null;
  
  usePageMeta(pageTitle, pageDesc, ogImage);

  if (loadingBrand) {
    return <PageSkeleton />;
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <p className="text-sm font-semibold">Brand "{brandId}" not found in database.</p>
        <Link 
          to="/"
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs font-bold transition-all"
        >
          Return to Portal
        </Link>
      </div>
    );
  }

  // Helper to generate styles for active nav links
  const getNavClass = (sectionId) => {
    const isCurrent = activeSection === sectionId;
    const activeColorClass = brandId === 'jetema' 
      ? 'text-[#4C5A9D] after:w-full after:bg-[#4C5A9D]' 
      : brandId === 'dermclar' 
        ? 'text-[#0ea5e9] after:w-full after:bg-[#0ea5e9]' 
        : 'text-emerald-500 after:w-full after:bg-emerald-500';

    return `text-sm 2xl:text-base font-medium transition-colors duration-200 relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
      isCurrent 
        ? activeColorClass 
        : 'text-primary-dark/80 after:w-0 hover:after:w-full hover:text-accent after:bg-accent'
    }`;
  };

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
              <Link
                to="/"
                className={`flex items-center gap-0.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-primary-dark/80 hover:bg-slate-100/50 transition-all duration-200 focus:outline-none cursor-pointer ${brandHoverText}`}
                title={isEs ? "Volver al inicio" : "Back to Home"}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xxs:inline">{isEs ? "Volver" : "Back"}</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 hidden xxs:block" />

              {/* Dynamic Brand Logo */}
              <Link 
                to={`/${brandId}`}
                className="flex items-center gap-1.5 group cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-[15px] xs:h-[18px] sm:h-[24px] md:h-[28px] w-auto object-contain filter drop-shadow-sm brightness-100" 
                />
              </Link>
            </div>

            {/* Center: Anchor Links */}
            <nav className="hidden md:flex items-center gap-8 2xl:gap-12">
              <Link
                to={`/${brandId}/catalogo`}
                className={getNavClass('catalog-section')}
              >
                {isEs ? "Productos" : "Products"}
              </Link>
              <Link
                to={`/${brandId}/empresa`}
                className={getNavClass('about-section')}
              >
                {isEs ? "Empresa" : "Company"}
              </Link>
              <Link
                to={`/${brandId}/contacto`}
                className={getNavClass('cta-section')}
              >
                {isEs ? "Contacto" : "Contact"}
              </Link>
            </nav>

            {/* Right Side: Toggle language + High-Conversion Call Button */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold text-primary-dark/80 hover:bg-slate-100/50 transition-all duration-200 focus:outline-none ${brandHoverText}`}
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{language.toUpperCase()}</span>
              </button>

              <Link
                to={`/${brandId}/contacto`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-extrabold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${brand.accentBg} ${brand.accentHover}`}
              >
                <span>{isEs ? "Contactar" : "Contact Us"}</span>
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
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
        <BrandAbout brand={brand} language={language} onBackToHome={handleBackToHome} />

        {/* B2B clinical pipeline lead collector */}
        <BrandCTA brand={brand} language={language} />
      </main>

      {/* 3. Footer */}
      <BrandFooter brand={brand} language={language} onBackToHome={handleBackToHome} />

    </div>
  );
};

export default BrandPage;
