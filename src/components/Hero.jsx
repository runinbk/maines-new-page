import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, ArrowDown } from 'lucide-react';
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
    <section id="hero" className="relative min-h-[100dvh] pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 px-8 sm:px-12 lg:px-20">
      {/* Background Image with soft opacity and clinical blend */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.28]" 
        style={{ backgroundImage: `url(${heroBgImage})` }}
      />
      {/* Soft gradient and white color overlay to attenuate and blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/25 via-white/55 to-slate-50/90" />

      {/* Background visual accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft glowing mesh circles */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 filter blur-[120px] mix-blend-multiply animate-pulse duration-[8s]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/5 filter blur-[150px] mix-blend-multiply animate-pulse duration-[10s]" />
        
        {/* Futuristic grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#1a365d_1px,transparent_1px),linear-gradient(to_bottom,#1a365d_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full px-6 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-20 items-center">
          
          {/* Left Column: Staggered text content */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6 2xl:space-y-10">
            
            {/* Pre-title */}
            <div 
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 transition-all duration-1000 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-accent-dark uppercase">
                {t('hero.pretitle')}
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-4 sm:space-y-6 2xl:space-y-8">
              <h1 
                className={`text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] xl:text-[2.75rem] xl:leading-[1.1] 2xl:text-[3.5rem] 2xl:leading-[1.1] font-extrabold font-display tracking-tight text-primary-dark transition-all duration-1000 delay-200 transform ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('hero.title').split(' ').map((word, idx) => {
                  const cleanedWord = word.replace(/[.,]/g, '');
                  // Highlight key aesthetic/medical-tech words to maintain design fidelity
                  const isHighlight = ['estética', 'salud', 'aesthetic', 'medicine', 'healthcare'].includes(cleanedWord);
                  return (
                    <span 
                      key={idx} 
                      className={isHighlight 
                        ? 'bg-gradient-to-r from-accent to-[#0284c7] bg-clip-text text-transparent font-extrabold inline-block mr-2 sm:mr-3' 
                        : 'inline-block mr-2 sm:mr-3'
                      }
                    >
                      {word}
                    </span>
                  );
                })}
              </h1>

              <p 
                className={`text-sm sm:text-base 2xl:text-lg text-slate-500 font-medium max-w-xl 2xl:max-w-2xl leading-relaxed border-l-[3px] 2xl:border-l-[4px] border-accent pl-6 2xl:pl-8 transition-all duration-1000 delay-400 transform ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 items-stretch sm:items-center transition-all duration-1000 delay-600 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a 
                href="#ecosystem"
                onClick={(e) => handleNavClick(e, 'ecosystem')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-sm 2xl:text-base font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-sm 2xl:text-base font-bold text-primary border border-primary/20 bg-white/40 hover:bg-slate-100/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>{t('nav.about')}</span>
                <ArrowDown className="w-4 h-4 text-primary/70" />
              </a>
            </div>
          </div>

          {/* Right Column: Giant brand logo entrance */}
          <div className="lg:col-span-5 relative h-[200px] sm:h-[300px] lg:h-[400px] 2xl:h-[500px] flex items-center justify-center lg:justify-end">
            
            {/* Background floating logo (Central visual focus) */}
            <div 
              className={`transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-3'
              }`}
            >
              <img 
                src="/assets/logo-maines.svg" 
                alt="Maines Isotype" 
                className="w-48 sm:w-60 lg:w-[18rem] xl:w-[22rem] 2xl:w-[25rem] animate-float select-none" 
                style={{
                  filter: 'drop-shadow(0 20px 30px rgba(14, 165, 233, 0.18)) drop-shadow(0 8px 15px rgba(26, 54, 93, 0.12))'
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
