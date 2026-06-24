import { useState, useEffect, useRef, memo } from 'react';
import { Award, Play, X, Maximize2 } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import ImageWithSkeleton from '../../../../components/ui/ImageWithSkeleton';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../../../../components/ui/Icons';
import { VideoCarousel } from './VideoCarousel';

const getHexColor = (tailwindClass, defaultColor = '#4C5A9D') => {
  if (!tailwindClass) return defaultColor;
  if (tailwindClass === 'bg-emerald-500') return '#10b981';
  const match = tailwindClass.match(/\[#([0-9a-fA-F]+)\]/);
  return match ? `#${match[1]}` : defaultColor;
};

/**
 * BrandAbout - Decomposed orchestrator component for brand history, video reels, and official support
 */
const BrandAbout = ({ brand, onBackToHome }) => {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const data = brand.about;
  const socialConfig = brand.social;

  const resolveTranslation = (val) => {
    if (!val) return '';
    if (typeof val === 'object') {
      return val[language] || val[isEs ? 'es' : 'en'] || val['es'] || '';
    }
    return val;
  };

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSocialVideo, setActiveSocialVideo] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const [isInlineMaxHovered, setIsInlineMaxHovered] = useState(false);
  const cardVideoRef = useRef(null);
  const inlineVideoRef = useRef(null);

  const mainImage = 'https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.webp';
  const mainVideo = 'https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.mp4';

  useEffect(() => {
    if (cardVideoRef.current) {
      if (isCardHovered && !isInlinePlaying) {
        cardVideoRef.current.play().catch(err => {
          console.warn("Card video playback was blocked:", err);
        });
      } else {
        cardVideoRef.current.pause();
        cardVideoRef.current.currentTime = 0;
      }
    }
  }, [isCardHovered, isInlinePlaying]);

  useEffect(() => {
    if (activeVideo || activeSocialVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo, activeSocialVideo]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
        setActiveSocialVideo(null);
      }
    };
    if (activeVideo || activeSocialVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo, activeSocialVideo]);

  return (
    <section id="about-section" className="py-20 lg:py-28 px-6 sm:px-12 xl:px-20 bg-white w-full border-t border-slate-200/40 relative overflow-hidden">
      
      {/* Absolute decorative blurred circle */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-slate-500/5 blur-[120px] pointer-events-none" />

      {/* Main Corporate Section */}
      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side (5/12): Premium Institutional Image & Floating Info Cards */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="relative w-full max-w-[420px] aspect-[1.25] md:aspect-[1.3] group">
            
            {/* Soft decorative background glow */}
            <div className={`absolute -inset-2 rounded-[32px] bg-gradient-to-r ${brand.themeGradient} opacity-[0.08] blur-xl pointer-events-none`} />
            
            {/* Main Institutional Image Box & Hover Player */}
            <div 
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              onClick={() => {
                if (mainVideo && !isInlinePlaying) {
                  setIsInlinePlaying(true);
                }
              }}
              className="w-full h-full rounded-[30px] overflow-hidden border border-slate-200 shadow-2xl relative z-0 cursor-pointer text-left"
            >
              {isInlinePlaying ? (
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="w-full h-full relative z-30 bg-black"
                >
                  <video
                    ref={inlineVideoRef}
                    src={mainVideo}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={() => setIsInlinePlaying(false)}
                  />
                  
                  {/* Inline controls overlay: Close and Maximize */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-40 pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsInlinePlaying(false);
                      }}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-red-600/90 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer shadow-lg"
                      title={isEs ? "Cerrar" : "Close"}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideo({
                          title: isEs ? "Distribución Oficial y Respaldo de Maines SRL" : "Official Distribution & Support of Maines SRL",
                          url: mainVideo,
                          thumbnail: mainImage
                        });
                        setIsInlinePlaying(false);
                      }}
                      onMouseEnter={() => setIsInlineMaxHovered(true)}
                      onMouseLeave={() => setIsInlineMaxHovered(false)}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer shadow-lg"
                      style={{ backgroundColor: isInlineMaxHovered ? `${getHexColor(brand.accentBg)}E6` : 'rgba(0,0,0,0.6)' }}
                      title={isEs ? "Maximizar" : "Maximize"}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ImageWithSkeleton 
                    src={mainImage} 
                    alt={resolveTranslation(data.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {mainVideo && (
                    <video
                      ref={cardVideoRef}
                      src={mainVideo}
                      loop
                      muted
                      playsInline
                      preload="auto"
                      onTimeUpdate={(e) => {
                        if (e.target.currentTime >= 10) {
                          e.target.currentTime = 0;
                        }
                      }}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
                        isCardHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {mainVideo && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <div 
                        className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xs border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:text-white pointer-events-auto"
                        style={{
                          color: isCardHovered ? '#ffffff' : getHexColor(brand.accentBg),
                          backgroundColor: isCardHovered ? getHexColor(brand.accentBg) : 'rgba(255,255,255,0.9)',
                          boxShadow: isCardHovered ? `0 10px 25px -5px ${getHexColor(brand.accentBg)}50` : undefined
                        }}
                      >
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-950/10 pointer-events-none z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </div>

            {/* Custom copy bullets mapping */}
            {(() => {
              const bulletsList = data.bullets?.[language] || data.bullets?.[isEs ? 'es' : 'en'] || [];

              return (
                <>
                  {/* Floating Card 1: Bullet 1 ("Autenticidad Garantizada") */}
                  {bulletsList[1] && (
                    <div className={`absolute -top-8 -right-6 md:-right-10 max-w-[210px] sm:max-w-[240px] bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl text-left z-25 transition-all duration-700 ease-out ${
                      isInlinePlaying 
                        ? 'opacity-0 pointer-events-none scale-95' 
                        : 'group-hover:translate-x-12 group-hover:-translate-y-8 group-hover:opacity-40 hover:scale-[1.03]'
                    }`}>
                      <h4 className="text-xs sm:text-sm font-bold text-primary-dark tracking-tight">
                        {bulletsList[1].title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed mt-1">
                        {bulletsList[1].text}
                      </p>
                    </div>
                  )}

                  {/* Floating Card 2: Bullet 2 ("Cobertura Nacional") */}
                  {bulletsList[2] && (
                    <div className={`absolute -bottom-8 -left-6 md:-left-10 max-w-[210px] sm:max-w-[240px] bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl text-left z-25 transition-all duration-700 ease-out ${
                      isInlinePlaying 
                        ? 'opacity-0 pointer-events-none scale-95' 
                        : 'group-hover:-translate-x-12 group-hover:translate-y-8 group-hover:opacity-40 hover:scale-[1.03]'
                    }`}>
                      <h4 className="text-xs sm:text-sm font-bold text-primary-dark tracking-tight">
                        {bulletsList[2].title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed mt-1">
                        {bulletsList[2].text}
                      </p>
                    </div>
                  )}
                </>
              );
            })()}

          </div>
        </div>

        {/* Right Side (7/12): Strategic Relationship & Values */}
        <div className="lg:col-span-7 flex flex-col text-left lg:text-right items-start lg:items-end order-1 lg:order-2 animate-fade-in-up">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-slate-100 text-primary-light mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>{resolveTranslation(data.pretitle)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#0D1F3B] font-display tracking-tight leading-[1.15] mb-6">
            {isEs ? (
              <>
                <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Distribución Oficial</span> y <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Respaldo</span> de Maines SRL
              </>
            ) : (
              <>
                <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Official Distribution</span> & <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Support</span> of Maines SRL
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-10 max-w-2xl">
            {resolveTranslation(data.description)}
          </p>

          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-4 mt-2 w-full">
            <button
              onClick={onBackToHome}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold transition-all duration-300 shadow-md text-white ${brand.accentBg} ${brand.accentHover} transform hover:scale-105 active:scale-95 cursor-pointer`}
            >
              <span>{isEs ? 'Ir al Portal Principal' : 'Go to Main Portal'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Social Media Feed consolidated under Company */}
      {socialConfig && socialConfig.videos && socialConfig.videos.length > 0 && (
        <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto mt-28 lg:mt-36 border-t border-slate-200/50 pt-20 sm:pt-24 flex flex-col gap-14">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-left">
            
            <div className="flex flex-col max-w-2xl">
              <div className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-slate-100 ${brand.accentColor} mb-4`}>
                <span>{isEs ? `Comunidad ${brand.name}` : `${brand.name} Community`}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold font-display tracking-tight leading-none mb-4 text-[#0D1F3B]">
                {isEs ? (
                  <>
                    <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Síguenos</span> en nuestras redes
                  </>
                ) : (
                  <>
                    <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Follow us</span> on our socials
                  </>
                )}
              </h2>
              
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                {isEs 
                  ? "Conéctate con nuestra comunidad médica profesional para descubrir demostraciones clínicas, casos prácticos y las últimas tendencias."
                  : "Connect with our professional medical community to discover clinical techniques, case studies, and the latest trends."}
              </p>
            </div>

            {/* Social Profiles Quick badges */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {socialConfig.instagram && (
                <a
                  href={socialConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 font-bold text-xs shadow-sm hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{socialConfig.instagram.handle}</span>
                </a>
              )}

              {socialConfig.tiktok && (
                <a
                  href={socialConfig.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-black hover:border-transparent transition-all duration-300 font-bold text-xs shadow-sm hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span>{socialConfig.tiktok.handle}</span>
                </a>
              )}

              {socialConfig.facebook && (
                <a
                  href={socialConfig.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 font-bold text-xs shadow-sm hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>{socialConfig.facebook.handle}</span>
                </a>
              )}
            </div>

          </div>

          {/* Carousel Container */}
          <VideoCarousel brand={brand} onMaximizeVideo={(url) => setActiveSocialVideo(url)} />

        </div>
      )}

      {/* Video Modal Player (for main video maximize action) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in transition-all duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} />
          
          <div className="relative bg-black rounded-2xl w-full max-w-4xl aspect-video overflow-hidden shadow-2xl border border-white/10 z-10">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
              aria-label={isEs ? "Cerrar video" : "Close video"}
            >
              <X className="w-5 h-5" />
            </button>

            <video
              src={activeVideo.url}
              poster={activeVideo.thumbnail}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Social Vertical Video Lightbox Modal Player */}
      {activeSocialVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in transition-all duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveSocialVideo(null)} />
          
          <div className="relative bg-black rounded-[28px] h-[85vh] aspect-[9/16] overflow-hidden shadow-2xl border border-white/10 z-10 animate-scale-in">
            <button
              onClick={() => setActiveSocialVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
              aria-label={isEs ? "Cerrar video" : "Close video"}
            >
              <X className="w-5 h-5" />
            </button>

            <video
              src={activeSocialVideo}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default memo(BrandAbout);
