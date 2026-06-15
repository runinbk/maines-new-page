import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { CheckCircle2, Zap, ArrowRight, ArrowDown } from 'lucide-react';
import heroBgImage from '../../assets/hero-sections/hero-backgront1.webp';
import { handleNavClick } from '../utils/navigation';

const Hero = () => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entry animations shortly after mount
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative min-h-[95dvh] lg:min-h-screen w-full flex items-center justify-center pt-28 pb-12 lg:py-0 overflow-hidden bg-slate-50"
    >
      {/* Background Graphic elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBgImage} 
          alt="Maines Cleanroom Laboratory" 
          className="absolute right-0 top-0 w-full h-full lg:w-[60%] lg:h-full object-cover opacity-85 select-none" 
          style={{ 
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)',
            filter: 'brightness(1.02) contrast(0.98)'
          }}
        />
        {/* Ambient background soft glow */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 filter blur-[100px] animate-pulse-slow" />
        
        {/* Soft fading overlays for layout contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent lg:from-slate-50 lg:via-slate-50/75 lg:to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-0 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
          
          {/* Left Column: Premium Pitch Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-6 order-2 lg:order-1 pt-4 lg:pt-0">
            {/* Regulatory compliance tag */}
            <div 
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light/10 border border-accent/15 text-accent font-bold text-[10px] 2xl:text-xs uppercase tracking-widest shadow-sm transition-all duration-1000 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('hero.tag')}</span>
            </div>

            {/* Core headline */}
            <h1 
              className={`text-3xl xs:text-4xl sm:text-5xl md:text-[3.25rem] 2xl:text-6.5xl font-black font-display text-primary-dark tracking-tight leading-[1.08] max-w-2xl transition-all duration-1000 delay-200 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-accent via-accent-light to-blue-500 bg-clip-text text-transparent inline-block font-black">
                {t('hero.titleAccent')}
              </span>
            </h1>

            {/* Explanatory subtitle */}
            <p 
              className={`text-slate-500 font-semibold text-sm sm:text-base 2xl:text-lg leading-relaxed max-w-lg transition-all duration-1000 delay-400 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('hero.subtitle')}
            </p>

            {/* Key benefits list capsules */}
            <div 
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-4 pt-1 transition-all duration-1000 delay-500 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="flex items-center gap-1.5 text-slate-700 text-xs 2xl:text-sm font-extrabold">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span>{t('hero.benefit1')}</span>
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
              <p className="flex items-center gap-1.5 text-slate-700 text-xs 2xl:text-sm font-extrabold">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span>{t('hero.benefit2')}</span>
              </p>
            </div>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto transition-all duration-1000 delay-600 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a 
                href="#ecosystem"
                onClick={(e) => handleNavClick(e, 'ecosystem')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-xs sm:text-sm 2xl:text-base font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-xs sm:text-sm 2xl:text-base font-bold text-primary border border-primary/20 bg-white/40 hover:bg-slate-100/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>{t('nav.about')}</span>
                <ArrowDown className="w-4 h-4 text-primary/70" />
              </a>
            </div>
          </div>

          {/* Right Column: Giant brand logo entrance */}
          <div className="lg:col-span-5 relative h-[100px] xs:h-[130px] sm:h-[180px] md:h-[240px] lg:h-[400px] 2xl:h-[500px] flex items-center justify-center lg:justify-end order-1 lg:order-2">
            
            {/* Background floating logo (Central visual focus) */}
            <div 
              className={`transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-3'
              }`}
            >
              <img 
                src="/assets/logo-maines.svg" 
                alt="Maines Isotype" 
                className="w-24 xs:w-28 sm:w-44 md:w-56 lg:w-[18rem] xl:w-[22rem] 2xl:w-[25rem] animate-float select-none" 
                style={{
                  filter: 'drop-shadow(0 15px 25px rgba(13, 31, 59, 0.08)) drop-shadow(0 4px 6px rgba(13, 31, 59, 0.04))',
                  animationDuration: '5s'
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
