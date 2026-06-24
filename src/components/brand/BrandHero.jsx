import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import jetemaHeroBg from '../../../assets/jetema/hero.webp';
import dermclarHeroBg from '../../../assets/marcas/dermclar/dermclar-hero.jpeg';
import xtralifeHeroBg from '../../../assets/marcas/xtralife/xtralife-hero.jpeg';
import { Link } from 'react-router-dom';

/**
 * BrandHero Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - The active brand configuration
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandHero = ({ brand, language }) => {
  const isEs = language === 'es';
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);


  const isJetema = brand.id === 'jetema';
  const isDermclar = brand.id === 'dermclar';
  const isXtralife = brand.id === 'xtralife';
  
  let heroBg = jetemaHeroBg;
  if (isDermclar) heroBg = dermclarHeroBg;
  if (isXtralife) heroBg = xtralifeHeroBg;
  
  // Dynamic values for titles, subtitles, CTA buttons, and color schemes
  const pretitle = isJetema 
    ? (isEs ? 'Innovación Biotecnológica' : 'Biotech Innovation')
    : isDermclar 
      ? (isEs ? 'Innovación Médica' : 'Medical Innovation')
      : (isEs ? 'MADE IN USA • CERTIFICACIÓN GMP' : 'MADE IN USA • GMP CERTIFIED');
    
  const titleElement = isJetema ? (
    <>
      <span>Innovación </span>
      <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>
        Biotecnológica Coreana
      </span>
    </>
  ) : isDermclar ? (
    <>
      <span>THE GLOBAL </span>
      <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>
        SCIENTIFIC SKINCARE
      </span>
    </>
  ) : (
    <>
      <span>NUTRICIÓN NATURAL </span>
      <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>
        PARA UNA VIDA SANA
      </span>
    </>
  );

  const description = isJetema
    ? (isEs 
      ? 'Desarrollo científico de vanguardia and soluciones de bioestética premium para profesionales de la salud en Bolivia. Elevando el estándar del rejuvenecimiento médico con certificaciones internacionales.'
      : 'State-of-the-art scientific development and premium bioesthetic solutions for healthcare professionals in Bolivia. Elevating the standard of medical rejuvenation with international certifications.')
    : isDermclar
      ? (isEs
        ? 'Referencia internacional de origen europeo en investigación, desarrollo y fabricación de mesoterapia y cosmética avanzada para uso profesional.'
        : 'International reference of European origin in research, development, and manufacturing of mesotherapy and advanced cosmetics for professional use.')
      : (isEs
        ? 'Xtralife Natural Products fusiona la pureza de la naturaleza con los más estrictos estándares de manufactura estadounidense (GMP) para ofrecer suplementación de alta gama. Importado exclusivamente por Maines S.R.L., cada fórmula potencia la longevidad, optimiza el rendimiento y brinda soporte preventivo integral.'
        : 'Xtralife Natural Products merges the purity of nature with the strictest US manufacturing standards (GMP) to offer premium supplementation. Imported exclusively by Maines S.R.L., each formula enhances longevity, optimizes performance, and provides comprehensive preventive support.');

  const ctaText = isJetema
    ? (isEs ? 'Explora la ciencia del Well-Aging ↓' : 'Explore the science of Well-Aging ↓')
    : isDermclar
      ? (isEs ? 'Explorar Línea Científica ↓' : 'Explore Scientific Line ↓')
      : (isEs ? 'Explorar Portafolio Nutricional ↓' : 'Explore Nutritional Portfolio ↓');

  // Dynamic brand primary colors
  const primaryColorHex = isJetema ? '#4C5A9D' : isDermclar ? '#0ea5e9' : '#10b981';
  const primaryHoverColorHex = isJetema ? '#3b467a' : isDermclar ? '#0284c7' : '#059669';
  const firstGlowColor = isJetema ? 'rgba(76, 90, 157, 0.08)' : isDermclar ? 'rgba(14, 165, 233, 0.08)' : 'rgba(16, 185, 129, 0.08)';
  const secondGlowColor = isJetema ? 'rgba(90, 162, 208, 0.05)' : isDermclar ? 'rgba(13, 148, 136, 0.05)' : 'rgba(20, 184, 166, 0.05)';
  const dropShadowFilter = isJetema
    ? 'drop-shadow(0 15px 20px rgba(76, 90, 157, 0.15)) drop-shadow(0 6px 10px rgba(13, 31, 59, 0.08))'
    : isDermclar
      ? 'drop-shadow(0 15px 20px rgba(14, 165, 233, 0.15)) drop-shadow(0 6px 10px rgba(13, 31, 59, 0.08))'
      : 'drop-shadow(0 15px 20px rgba(16, 185, 129, 0.15)) drop-shadow(0 6px 10px rgba(13, 31, 59, 0.08))';

  return (
    <section id="brand-hero-section" className="relative min-h-[100dvh] pt-20 pb-4 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 px-4 xs:px-6 sm:px-12 lg:px-20">
      {/* Background Image with overlay for legibility */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-95" 
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Soft overlay blanca semitransparente */}
      <div className="absolute inset-0 z-0 bg-white/70 backdrop-blur-[1px]" />

      {/* Ambient glow mesh circle */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full filter blur-[100px] mix-blend-multiply animate-pulse duration-[8s]" style={{ backgroundColor: firstGlowColor }} />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] mix-blend-multiply animate-pulse duration-[10s]" style={{ backgroundColor: secondGlowColor }} />
      </div>

      {/* Ambient gradient fade-out at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-lightBg to-transparent pointer-events-none z-0" />

      {/* Main Container */}
      <div className="mx-auto w-full px-2 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 2xl:gap-20 items-center">
          
          {/* Column A (Texts): Order-2 on mobile, Order-1 on desktop */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 2xl:space-y-12 order-2 lg:order-1 flex flex-col items-center lg:items-start">
            
            {/* Pre-title */}
            <div 
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all duration-1000 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                backgroundColor: isJetema ? 'rgba(76, 90, 157, 0.1)' : isDermclar ? 'rgba(14, 165, 233, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                borderColor: isJetema ? 'rgba(76, 90, 157, 0.2)' : isDermclar ? 'rgba(14, 165, 233, 0.2)' : 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: primaryColorHex }} />
              <span className="text-[9px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: primaryColorHex }}>
                {pretitle}
              </span>
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left w-full">
              <h1 
                className={`text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15] xl:text-[2.75rem] xl:leading-[1.1] 2xl:text-[3.5rem] 2xl:leading-[1.1] font-extrabold font-display tracking-tight transition-all duration-1000 delay-200 transform ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ color: primaryColorHex }}
              >
                {titleElement}
              </h1>

              {isXtralife && (
                <h2 
                  className={`text-lg sm:text-xl font-extrabold tracking-wide text-emerald-600/95 transition-all duration-1000 delay-300 transform ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {isEs ? "¡Vive más, vive mejor!" : "Live more, live better!"}
                </h2>
              )}

              <p 
                className={`text-xs sm:text-base 2xl:text-lg text-slate-800 font-semibold max-w-xl 2xl:max-w-2xl leading-relaxed transition-all duration-1000 delay-400 transform pl-0 lg:pl-6 2xl:pl-8 border-l-0 lg:border-l-[3px] 2xl:border-l-[4px] text-center lg:text-left mx-auto lg:mx-0 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ borderLeftColor: primaryColorHex }}
              >
                {description}
              </p>
            </div>

            {/* Unique Button Centered below text */}
            <div 
              className={`w-full flex justify-center lg:justify-start pt-1 transition-all duration-1000 delay-600 transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link 
                to={`/${brand.id}/catalogo`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 2xl:px-10 2xl:py-4.5 rounded-full text-xs sm:text-sm 2xl:text-base font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: primaryColorHex,
                  boxShadow: `0 10px 15px -3px ${isJetema ? 'rgba(76, 90, 157, 0.3)' : isDermclar ? 'rgba(14, 165, 233, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = primaryHoverColorHex; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = primaryColorHex; }}
              >
                <span>{ctaText}</span>
              </Link>
            </div>
          </div>

          {/* Column B (Logo isotype): Centered, Order-1 on mobile, Order-2 on desktop */}
          <div className="lg:col-span-5 relative h-[100px] xs:h-[130px] sm:h-[180px] md:h-[240px] lg:h-[400px] 2xl:h-[500px] flex items-center justify-center lg:justify-end order-1 lg:order-2">
            <div 
              className={`transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-3'
              }`}
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} Isotype`} 
                className="w-24 xs:w-28 sm:w-44 md:w-56 lg:w-[18rem] xl:w-[22rem] 2xl:w-[25rem] animate-float select-none" 
                style={{
                  filter: dropShadowFilter
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Downward Scroll indicator */}
      <Link 
        to={`/${brand.id}/catalogo`}
        aria-label="Scroll to catalog"
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none"
      >
        <span className="text-[9px] font-extrabold uppercase tracking-widest">
          {isEs ? 'Catálogo' : 'Catalog'}
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </Link>
    </section>
  );
};

export default BrandHero;
