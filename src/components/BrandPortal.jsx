import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ArrowUpRight } from 'lucide-react';

import cardDermclar from '../../assets/marcas/card-dermclar.webp';
import cardJetema from '../../assets/marcas/card-jetema.webp';
import cardXtralife from '../../assets/marcas/card-xtralife.webp';

// Custom lightweight SVG Icons to prevent ESM build mismatches
const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const BrandPortal = () => {
  const { t } = useLanguage();
  
  // Hover state (Desktop): null or brand.id
  const [hoveredId, setHoveredId] = useState(null);

  // Active click state (Mobile): null or brand.id
  const [activeMobileId, setActiveMobileId] = useState(null);

  // States to track exact screen height and desktop width for perfect layout fitting
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom auto-scroll snap to #about section on minor downward scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isTransitioning = false;
    let lastCenteredTime = 0;

    const handleScrollSnap = () => {
      const currentScrollY = window.scrollY;
      const target = document.getElementById('about');
      const thisSection = document.getElementById('ecosystem');
      
      if (target && thisSection) {
        const thisRect = thisSection.getBoundingClientRect();
        
        // Ecosystem is centered when its top is within 10px of the viewport top
        const isCentered = Math.abs(thisRect.top) < 10;
        
        if (isCentered) {
          if (lastCenteredTime === 0) {
            lastCenteredTime = Date.now();
          }
        } else {
          lastCenteredTime = 0; // Reset settle timer if scrolled away
        }

        // Trigger auto-scroll snap ONLY if:
        // 1. Ecosystem has been centered for at least 900ms (settled)
        // 2. The user is scrolling DOWN
        // 3. We are not already transitioning
        const isSettled = lastCenteredTime !== 0 && (Date.now() - lastCenteredTime > 900);
        
        if (isSettled && currentScrollY > lastScrollY && !isTransitioning) {
          isTransitioning = true;
          
          // High-fidelity custom scroll (1100ms, ease-out-cubic)
          const start = window.scrollY;
          const targetY = target.getBoundingClientRect().top + window.scrollY;
          const change = targetY - start;
          const duration = 1100;
          let startTime = null;

          const animateScroll = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const t = Math.min(progress / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
            
            window.scrollTo(0, start + change * ease);

            if (progress < duration) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
          
          setTimeout(() => {
            isTransitioning = false;
          }, 1300);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollSnap, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSnap);
  }, []);

  const defaultBrands = [
    {
      id: 0,
      name: "Xtralife Natural Products",
      tagline: t('brands.xtralife.tagline'),
      description: t('brands.xtralife.desc'),
      logo: "/assets/xtralife-logo.png",
      bgImage: cardXtralife,
      href: "#/brand/xtralife",
      textColor: "text-emerald-400",
      overlayClass: "bg-gradient-to-t from-slate-950/95 via-slate-900/65 to-slate-950/15",
      btnColor: "bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95",
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      id: 1,
      name: "Jetema",
      tagline: t('brands.jetema.tagline'),
      description: t('brands.jetema.desc'),
      logo: "/assets/JETEMA-logo.png",
      bgImage: cardJetema,
      href: "#/brand/jetema",
      textColor: "text-cyan-400",
      overlayClass: "bg-gradient-to-t from-indigo-950/90 via-slate-950/70 to-slate-950/20",
      btnColor: "bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95",
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      id: 2,
      name: "Dermclar",
      tagline: t('brands.dermclar.tagline'),
      description: t('brands.dermclar.desc'),
      logo: "/assets/dermclar-logo.png",
      bgImage: cardDermclar,
      href: "#/brand/dermclar",
      textColor: "text-violet-400",
      overlayClass: "bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-slate-950/10",
      btnColor: "bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95",
      socials: { instagram: "#", tiktok: "#" }
    }
  ];

  // Dynamic shuffling on mount to prevent layout/brand preference
  const [shuffledBrands, setShuffledBrands] = useState([]);

  useEffect(() => {
    const shuffled = [...defaultBrands].sort(() => Math.random() - 0.5);
    setShuffledBrands(shuffled);
  }, [t]);

  const displayBrands = shuffledBrands.length > 0 ? shuffledBrands : defaultBrands;

  const handleCardClick = (id) => {
    if (!isDesktop) {
      if (activeMobileId === id) {
        setActiveMobileId(null);
      } else {
        setActiveMobileId(id);
      }
    }
  };

  // Helper calculation for exact responsive heights and widths on accordion panels
  const getColumnWidth = (id) => {
    if (hoveredId === null) return "33.333%";
    return hoveredId === id ? "48%" : "26%";
  };

  const getColumnHeight = (id) => {
    if (activeMobileId === null) return "33.333%";
    return activeMobileId === id ? "48%" : "26%";
  };

  return (
    <section 
      id="ecosystem" 
      className="h-[100dvh] min-h-[100dvh] w-full bg-slate-950 relative overflow-hidden flex flex-col justify-stretch select-none"
    >
      {/* Floating Sleek Glass Header capsule */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80 shadow-2xl flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>Portal de Marcas</span>
      </div>

      {/* Responsive Accordion Panels Layout */}
      <div 
        className={`w-full flex-grow flex transition-all duration-700 ${
          isDesktop ? 'flex-row items-stretch h-full' : 'flex-col items-stretch h-full'
        }`}
      >
        {displayBrands.map((brand) => {
          // Verify if this specific panel is active/focused
          const isCurrentActive = isDesktop 
            ? hoveredId === brand.id 
            : activeMobileId === brand.id;

          const widthStyle = isDesktop ? getColumnWidth(brand.id) : "100%";
          const heightStyle = isDesktop ? "100%" : getColumnHeight(brand.id);

          return (
            <div
              key={brand.id}
              onMouseEnter={() => isDesktop && setHoveredId(brand.id)}
              onMouseLeave={() => isDesktop && setHoveredId(null)}
              onClick={() => handleCardClick(brand.id)}
              className="relative flex flex-col justify-end p-8 sm:p-12 xl:p-16 text-left border-slate-800/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer group"
              style={{
                backgroundImage: `url(${brand.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: widthStyle,
                height: heightStyle,
                borderRightWidth: isDesktop ? '1px' : '0px',
                borderBottomWidth: isDesktop ? '0px' : '1px'
              }}
            >
              {/* Frosted brand specific gradient background overlay for excellent contrast */}
              <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${brand.overlayClass}`} />

              {/* Grid Tech Accent Lines on background */}
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

              {/* Card Main Editorial Content */}
              <div className="relative z-10 flex flex-col justify-end h-full w-full">
                
                {/* Frosted glass brand logo container with high-contrast solid white background */}
                <div className="bg-white rounded-3xl p-3.5 sm:p-4 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-white/20 mb-6 sm:mb-8 transition-all duration-500 group-hover:scale-105 group-hover:border-white/45 shadow-xl shadow-slate-950/20">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`} 
                    className="max-w-full max-h-full object-contain filter drop-shadow-sm brightness-100" 
                  />
                </div>

                {/* Brand title display */}
                <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-display tracking-tight mb-2">
                  {brand.name}
                </h3>

                {/* Tech colored subtitle tagline */}
                <p className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3.5 ${brand.textColor}`}>
                  {brand.tagline}
                </p>

                {/* Clinical description */}
                <p className="text-slate-300 font-medium text-xs sm:text-sm xl:text-base leading-relaxed mb-6 max-w-md">
                  {brand.description}
                </p>

                {/* Dynamic reveal CTA row (only active on hover/tap) */}
                <div 
                  className={`flex items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrentActive 
                      ? 'opacity-100 translate-y-0 h-12 mt-2 pointer-events-auto' 
                      : 'opacity-0 translate-y-4 h-0 mt-0 pointer-events-none overflow-hidden'
                  }`}
                >
                  {/* Glowing call-to-action button */}
                  <a
                    href={brand.href}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-300 shadow-md ${brand.btnColor} transform hover:scale-105 active:scale-95`}
                  >
                    <span>Ver Marca Completa</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  {/* Glass social channels icons */}
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      <InstagramIcon className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      <TikTokIcon className="w-4.5 h-4.5" />
                    </a>
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandPortal;
