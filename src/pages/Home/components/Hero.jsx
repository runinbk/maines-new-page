import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowRight, ArrowDown } from 'lucide-react';
import heroBgImage from '../../../../assets/hero-sections/hero-backgront1.webp';
import { Link } from 'react-router-dom';

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
        className="absolute inset-0 z-0 bg-cover bg-left lg:bg-center bg-no-repeat opacity-[0.28]" 
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
      <div className="mx-auto w-full px-2 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 2xl:gap-20 items-center">
          
          {/* Column A (Texts) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 2xl:space-y-12 order-2 lg:order-1 flex flex-col items-center lg:items-start">
            
            {/* Pre-title */}
            <div 
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-accent/10 border border-accent/20 transition-all duration-1000 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-[9px] sm:text-xs font-bold tracking-widest text-accent-dark uppercase">
                {t('hero.pretitle')}
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left w-full">
              <h1 
                className={`text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15] xl:text-[2.75rem] xl:leading-[1.1] 2xl:text-[3.5rem] 2xl:leading-[1.1] font-extrabold font-display tracking-tight text-primary-dark transition-all duration-1000 delay-200 transform ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('hero.title').split(' ').map((word, idx) => {
                  const cleanedWord = word.replace(/[.,]/g, '');
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
                className={`text-xs sm:text-base 2xl:text-lg text-slate-500 font-semibold max-w-xl 2xl:max-w-2xl leading-relaxed transition-all duration-1000 delay-400 transform pl-0 lg:pl-6 2xl:pl-8 border-l-0 lg:border-l-[3px] 2xl:border-l-[4px] border-accent text-center lg:text-left mx-auto lg:mx-0 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTAs */}
            <div 
              className={`w-full flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 transition-all duration-1000 delay-600 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link 
                to="/ecosistema"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-xs sm:text-sm 2xl:text-base font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer w-full sm:w-auto text-center"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/nosotros"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-xs sm:text-sm 2xl:text-base font-bold text-primary border border-primary/20 bg-white/40 hover:bg-slate-100/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto text-center"
              >
                <span>{t('nav.about')}</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/70" />
              </Link>
            </div>
          </div>

          {/* Column B (Logo isotype) */}
          <div className="lg:col-span-5 relative h-[100px] xs:h-[130px] sm:h-[180px] md:h-[240px] lg:h-[400px] 2xl:h-[500px] flex items-center justify-center lg:justify-end order-1 lg:order-2">
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
                  filter: 'drop-shadow(0 20px 30px rgba(14, 165, 233, 0.18)) drop-shadow(0 8px 15px rgba(26, 54, 93, 0.12))'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Downward Scroll indicator */}
      <Link 
        to="/ecosistema"
        aria-label="Scroll to brands"
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none"
      >
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
          {t('nav.brands') || 'Marcas'}
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </Link>
    </section>
  );
};

export default Hero;
