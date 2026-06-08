import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  ArrowRight, ShieldCheck, Cpu, Thermometer 
} from 'lucide-react';

// ESM direct imports of local WebP assets to guarantee Vite build compilation
import infoCard1 from '../../assets/info/info-card-1.webp';
import infoCard2 from '../../assets/info/info-card-2.webp';

const AboutSection = () => {
  const { t } = useLanguage();
  
  // Custom scroll reveal hooks for each sub-section
  const revealTitleRef = useScrollReveal();
  const revealInfraRef = useScrollReveal();

  // States to track exact screen height and desktop width for perfect viewport-perfect fitting
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

  // Custom auto-scroll snap to next section (#social) when reaching the end of the About section
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isTransitioning = false;

    const handleScrollSnap = () => {
      const currentScrollY = window.scrollY;
      const target = document.getElementById('social');
      const thisSection = document.getElementById('about');
      
      if (target && thisSection && !isTransitioning) {
        const thisRect = thisSection.getBoundingClientRect();
        
        // Trigger snap when bottom of About section enters the viewport or is close to leaving
        // (i.e. between 0 and 80px from the bottom of the window)
        // AND the user is scrolling down
        const isNearBottom = thisRect.bottom <= window.innerHeight + 80 && thisRect.bottom > window.innerHeight - 100;
        
        if (isNearBottom && currentScrollY > lastScrollY) {
          isTransitioning = true;
          
          const start = window.scrollY;
          const targetY = target.getBoundingClientRect().top + window.scrollY;
          const change = targetY - start;
          const duration = 1100; // Luxuriously gentle velocity
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

  // Responsive calculations based on viewport height to optimize spacings
  const getDynamicStyle = () => {
    if (screenHeight < 720) {
      return {
        // Less top padding to prevent long navbar spacing scroll gaps
        sectionPadding: "pt-12 sm:pt-16 pb-16 lg:pb-24 px-8 sm:px-12 lg:px-20",
        titleSize: "text-2xl sm:text-3xl lg:text-[2.2rem]",
        pSize: "text-xs leading-relaxed",
        btnPadding: "px-5 py-2",
        imgMaxHeight: "max-h-[220px] sm:max-h-[250px]",
        badgeBottom: "-bottom-3",
        badgeScale: "scale-90",
        gap: "gap-6 lg:gap-8",
        dividerMargin: "my-12 sm:my-16 lg:my-20"
      };
    } else if (screenHeight < 850) {
      return {
        sectionPadding: "pt-20 sm:pt-24 pb-24 lg:pb-32 px-8 sm:px-12 lg:px-20",
        titleSize: "text-3xl sm:text-4xl lg:text-[2.75rem]",
        pSize: "text-sm leading-relaxed",
        btnPadding: "px-6 py-2.5",
        imgMaxHeight: "max-h-[300px] sm:max-h-[340px]",
        badgeBottom: "-bottom-5",
        badgeScale: "scale-95",
        gap: "gap-8 lg:gap-12",
        dividerMargin: "my-16 sm:my-20 lg:my-24"
      };
    } else {
      return {
        sectionPadding: "pt-28 sm:pt-32 pb-32 lg:pb-40 px-8 sm:px-12 lg:px-20",
        titleSize: "text-4xl sm:text-5xl lg:text-[3.25rem]",
        pSize: "text-base leading-relaxed",
        btnPadding: "px-8 py-3.5",
        imgMaxHeight: "max-h-[400px] sm:max-h-[450px]",
        badgeBottom: "-bottom-6",
        badgeScale: "scale-100",
        gap: "gap-12 lg:gap-20",
        dividerMargin: "my-20 sm:my-24 lg:my-32"
      };
    }
  };

  const style = getDynamicStyle();

  return (
    /* Unified segment for Info on a slightly darker premium slate clinical gray background */
    <section 
      id="about" 
      className={`bg-slate-100/60 relative overflow-hidden transition-all duration-500 ${style.sectionPadding}`}
    >
      {/* Background light gradient tech accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-secondary/5 filter blur-[120px] pointer-events-none z-0" />

      <div className="mx-auto w-full px-6 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px]">
        
        {/* SUB-SECTION 1: ASYMMETRICAL INTRO */}
        <div ref={revealTitleRef} className={`grid grid-cols-1 lg:grid-cols-12 ${style.gap} items-center`}>
          
          {/* Left Column: Asymmetrical Text with Gradient highlights */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase block">
              {t('about.pretitle')}
            </span>
            
            <h2 className={`${style.titleSize} font-extrabold font-display leading-tight text-primary-dark`}>
              {t('about.title')}
              <span className="block mt-2">
                {t('about.subtitle').replace(t('about.subtitleAccent'), '')}
                <span className="bg-gradient-to-r from-accent to-[#0284c7] bg-clip-text text-transparent font-extrabold">
                  {t('about.subtitleAccent')}
                </span>
              </span>
            </h2>
            
            <div className="w-12 h-1.5 bg-gradient-to-r from-accent to-[#0284c7] rounded-full" />
            
            <p className={`text-slate-600 font-medium ${style.pSize}`}>
              {t('about.paragraph')}
            </p>
            
            <div className="pt-2">
              <a 
                href="#ecosystem"
                className={`inline-flex items-center gap-2 ${style.btnPadding} rounded-full text-xs font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group`}
              >
                <span>{t('about.cta')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Custom WebP and floated glass precision badge */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Picture Frame with ESM local WebP asset info-card-1 */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[500px] aspect-[4/3] group bg-slate-200 ${style.imgMaxHeight}`}>
              <img 
                src={infoCard1} 
                alt="High-tech Clinical Laboratory" 
                className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105" 
              />
              {/* Visual blue clinical tech overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* High-fidelity floated glassmorphic badge */}
            <div className={`absolute ${style.badgeBottom} -left-2 sm:left-4 glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-4 border border-white max-w-[240px] shadow-xl ${style.badgeScale} transition-all duration-300 transform hover:scale-105`}>
              <div className="p-3 rounded-full bg-accent/15 text-accent shadow-inner">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  {t('about.precision')}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-dark block leading-none mt-1">
                  {t('about.precisionVal')}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Elegant dashed section divider matching mockups */}
        <div className={`border-t border-dashed border-slate-300/80 ${style.dividerMargin}`} />

        {/* SUB-SECTION 3: INFRASTRUCTURE & SMART DISTRIBUTION (Cold Chain & Blockchain) */}
        <div ref={revealInfraRef} className="glass-card rounded-[32px] p-6 sm:p-10 lg:p-12 xl:p-16 border border-white/60 relative overflow-hidden bg-white/50 shadow-md">
          
          {/* Circuit line vector layout decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 50 Q 200 150 400 50 T 800 100" fill="none" stroke="#1a365d" strokeWidth="2" />
              <path d="M 100 200 Q 300 100 500 200 T 900 150" fill="none" stroke="#1a365d" strokeWidth="2" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Tech Points */}
            <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-widest text-accent uppercase block">
                  {t('about.infraestructura')}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight text-primary-dark">
                  {t('about.infraTitle')}
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                
                {/* Cold Chain item */}
                <div className="flex gap-4 items-start p-4 sm:p-5 rounded-2xl bg-white/40 hover:bg-white/90 border border-transparent hover:border-slate-100 shadow-sm transition-all duration-300">
                  <div className="p-3 rounded-full bg-cyan-100 text-cyan-600 shadow-inner">
                    <Thermometer className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary-dark">
                      {t('about.coldChainTitle')}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                      {t('about.coldChainDesc')}
                    </p>
                  </div>
                </div>

                {/* Blockchain item */}
                <div className="flex gap-4 items-start p-4 sm:p-5 rounded-2xl bg-white/40 hover:bg-white/90 border border-transparent hover:border-slate-100 shadow-sm transition-all duration-300">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary-dark">
                      {t('about.blockchainTitle')}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                      {t('about.blockchainDesc')}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Custom WebP and interactive silicon wafer graphic */}
            <div className="lg:col-span-5 flex items-center justify-center">
              
              {/* Wrapper that controls the dimensions and relative positioning context */}
              <div className={`relative w-full max-w-[360px] aspect-square ${style.imgMaxHeight}`}>
                
                {/* Picture Frame featuring the second custom clinical WebP */}
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl group bg-slate-200">
                  <img 
                    src={infoCard2} 
                    alt="High-tech Clinical Laboratory Storage" 
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105" 
                  />
                  {/* Visual tech gradient layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Float Overlapping Wafer Microchip Graphic Badge (Smaller and perfectly in the bottom-left corner) */}
                <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 z-20 p-2 sm:p-2.5 rounded-xl bg-slate-950/95 border border-slate-800 shadow-2xl w-20 h-20 sm:w-26 sm:h-26 flex items-center justify-center overflow-hidden group backdrop-blur-md transition-all duration-300 transform hover:scale-105">
                  
                  {/* Glowing microprocessor microchip core */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14)_0%,transparent_60%)] group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Silicon chip Vector SVG */}
                  <svg className="w-[85%] h-[85%] text-slate-500 transform transition-transform duration-[6000ms] group-hover:rotate-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="80" height="80" rx="12" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="15" y="15" width="70" height="70" rx="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M 50 10 L 50 25 M 50 75 L 50 90 M 10 50 L 25 50 M 75 50 L 90 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 28 28 L 38 38 M 72 28 L 62 38 M 28 72 L 38 62 M 72 72 L 62 62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="35" y="35" width="30" height="30" rx="6" stroke="#0ea5e9" strokeWidth="2" fill="#0f172a" className="animate-pulse" />
                    <circle cx="50" cy="50" r="4" fill="#0ea5e9" />
                    <circle cx="50" cy="50" r="10" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="1 1" />
                  </svg>

                  {/* Technical badge version label */}
                  <div className="absolute bottom-1.5 right-1.5 bg-slate-950/85 border border-slate-800 text-[5px] sm:text-[6px] font-mono tracking-widest text-[#0ea5e9] py-0.5 px-1.5 rounded-full backdrop-blur-sm">
                    SECURE LEDGER V.26
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
