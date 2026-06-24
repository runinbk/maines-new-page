import { useState, useEffect, useRef, memo } from 'react';
import { Award, ChevronLeft, ChevronRight, Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import ImageWithSkeleton from '../common/ImageWithSkeleton';

const InstagramIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.2 1.25.04 2.51.04 3.76.04v3.82c-1.39-.02-2.78-.31-4.04-1-.14 2.87-.89 5.72-2.48 8.07-1.92 2.76-5.07 4.54-8.52 4.79-3.95.21-7.85-2.07-9.5-5.69-1.97-4.14-.95-9.33 2.44-12.33 2.78-2.44 6.78-2.91 10.05-1.28.02.82-.01 1.64.01 2.46-2.14-.88-4.66-.46-6.38 1.09-1.74 1.52-2.3 4.09-1.38 6.18.84 1.94 2.89 3.23 5.04 3.24 2.5.07 4.77-1.63 5.37-4.04.28-1.57.17-3.19.17-4.79 0-2.01 0-4.02 0-6.03z"/>
  </svg>
);

const getHexColor = (tailwindClass, defaultColor = '#4C5A9D') => {
  if (!tailwindClass) return defaultColor;
  if (tailwindClass === 'bg-emerald-500') return '#10b981';
  const match = tailwindClass.match(/\[#([0-9a-fA-F]+)\]/);
  return match ? `#${match[1]}` : defaultColor;
};

/**
 * ReelCard Component
 * Represents a single vertical social media video card (9:16)
 */
const ReelCard = ({ videoUrl, index, brand, language, onHoverChange, isPlayingInline, onPlayingChange, onMaximize }) => {
  const isEs = language === 'es';
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMaxHovered, setIsMaxHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const platformIndex = index % 3;
  const platform = platformIndex === 0 ? 'instagram' : (platformIndex === 1 ? 'tiktok' : 'facebook');
  
  const socialData = brand.social || {
    instagram: { handle: "@jetemaboliviaoficial", url: "#" },
    tiktok: { handle: "@jetema.bo", url: "#" },
    facebook: { handle: "@jetemaboliviaoficial", url: "#" }
  };

  const handle = socialData[platform].handle;
  const linkUrl = socialData[platform].url;

  // Render Platform Icon
  const renderPlatformIcon = (className) => {
    if (platform === 'instagram') return <InstagramIcon className={className} />;
    if (platform === 'facebook') return <FacebookIcon className={className} />;
    return <TikTokIcon className={className} />;
  };

  // Sync mute state of the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isPlayingInline || isMuted;
    }
  }, [isPlayingInline, isMuted]);

  // Handle play/pause state change: Keep autoplaying silently if not playing inline
  useEffect(() => {
    if (videoRef.current) {
      if (isPlayingInline) {
        videoRef.current.play().catch(err => console.warn(err));
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch(err => console.warn(err));
      }
    }
  }, [isPlayingInline]);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlayingInline) {
        onPlayingChange(false);
        setIsMuted(true);
      } else {
        onPlayingChange(true);
        setIsMuted(false);
      }
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleClosePlayer = (e) => {
    e.stopPropagation();
    onPlayingChange(false);
    setIsMuted(true);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    handleClosePlayer({ stopPropagation: () => {} });
  };

  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={handleTogglePlay}
      className="snap-center shrink-0 w-[260px] sm:w-[280px] aspect-[9/16] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-slate-200/80 bg-slate-950 shadow-lg relative group cursor-pointer select-none text-left animate-fade-in"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={!isPlayingInline || isMuted}
        playsInline
        autoPlay
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover z-0"
      />
      
      {/* Dark gradient vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 z-10 pointer-events-none" />
      
      {/* Top Bar Overlay */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        {isPlayingInline ? (
          <button
            onClick={handleClosePlayer}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md hover:bg-red-600/90 border border-white/10 flex items-center justify-center text-white transition-all duration-200 pointer-events-auto hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            title={isEs ? "Cerrar" : "Close"}
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
          </div>
        )}

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Maximize Button overlay (visible on hover or when playing inline) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(videoUrl);
            }}
            onMouseEnter={() => setIsMaxHovered(true)}
            onMouseLeave={() => setIsMaxHovered(false)}
            className={`w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-lg ${
              isPlayingInline ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{ backgroundColor: isMaxHovered ? `${getHexColor(brand.accentBg)}E6` : 'rgba(0,0,0,0.5)' }}
            title={isEs ? "Ver en grande" : "Maximize"}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/25 border border-white/20 flex items-center gap-1.5 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto shadow-md"
          >
            {renderPlatformIcon("w-3 h-3")}
            <span>{platform}</span>
          </a>
        </div>
      </div>

      {/* Middle Interactive Icon (only visible on hover, when not playing inline) */}
      {!isPlayingInline && (
        <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="w-14 h-14 rounded-full backdrop-blur-xs shadow-2xl flex items-center justify-center text-white transform scale-95 group-hover:scale-100 transition-transform duration-300"
            style={{ backgroundColor: `${getHexColor(brand.accentBg)}E6` }}
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Profile Info Overlay */}
      <div className="absolute bottom-5 inset-x-4 flex flex-col gap-2.5 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0 border border-white/40 shadow-sm">
            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-extrabold text-white leading-tight shadow-text">
              {brand.name}
            </span>
            <span className="text-[9px] font-bold text-slate-300 leading-none tracking-wide shadow-text">
              {handle}
            </span>
          </div>
        </div>

        {isPlayingInline && (
          <div className="flex items-center justify-between mt-1 pointer-events-auto">
            <button
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              {!isPaused ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={handleToggleMute}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              title={isMuted ? (isEs ? "Activar sonido" : "Unmute") : (isEs ? "Silenciar" : "Mute")}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {isPlayingInline && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-25 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${brand.themeGradient || 'from-[#4C5A9D] to-[#5AA2D0]'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

/**
 * BrandAbout Component
 */
const BrandAbout = ({ brand, language, onBackToHome }) => {
  const isEs = language === 'es';
  const data = brand.about;
  const socialConfig = brand.social;

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSocialVideo, setActiveSocialVideo] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const [isInlineMaxHovered, setIsInlineMaxHovered] = useState(false);
  const [isLeftBtnHovered, setIsLeftBtnHovered] = useState(false);
  const [isRightBtnHovered, setIsRightBtnHovered] = useState(false);
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

  // Social Video Carousel States & Logic
  const carouselRef = useRef(null);
  const scrollRequestRef = useRef(null);
  const isPausedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activePlayingIndex, setActivePlayingIndex] = useState(null);
  const resumeTimeoutRef = useRef(null);

  const [shuffledVideos, setShuffledVideos] = useState([]);

  // Shuffle the video list on mount or when socialConfig changes
  useEffect(() => {
    if (socialConfig && socialConfig.videos) {
      const originalList = socialConfig.videos.map((url, idx) => ({ url, originalIndex: idx }));
      const shuffled = [...originalList].sort(() => Math.random() - 0.5);
      const timer = setTimeout(() => {
        setShuffledVideos(shuffled);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [socialConfig]);

  // Pause carousel scrolling on hover, inline video playing, or fullscreen modal
  useEffect(() => {
    if (activePlayingIndex !== null || hoveredIndex !== null || activeSocialVideo !== null) {
      isPausedRef.current = true;
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    } else {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2500); // waits 2.5 seconds before resuming scroll
    }
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [hoveredIndex, activePlayingIndex, activeSocialVideo]);

  useEffect(() => {
    // Infinite smooth scroll loop
    const animateScroll = () => {
      if (carouselRef.current && !isPausedRef.current && shuffledVideos.length > 0) {
        const container = carouselRef.current;
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0) {
          container.scrollLeft += 0.8;
          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth;
          }
        }
      }
      scrollRequestRef.current = requestAnimationFrame(animateScroll);
    };

    scrollRequestRef.current = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(scrollRequestRef.current);
  }, [shuffledVideos]);

  const handleScrollClick = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 304; // card width 280px + gap 24px
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const doubledVideos = [...shuffledVideos, ...shuffledVideos];

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
                    alt={data.title}
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
              const bulletsList = brand.id === 'jetema' ? [
                { title: "Suministro Directo", text: isEs ? "Garantizando la cadena de frío y bioseguridad." : "Guaranteed cold chain and biosecurity." },
                { title: "Autenticidad Garantizada", text: isEs ? "Código de trazabilidad único auditable por profesionales de la salud." : "Unique traceability code auditable by healthcare professionals." },
                { title: "Cobertura Nacional", text: isEs ? "Distribución ágil, rápida y segura en cajas térmicas controladas." : "Fast and secure distribution in temperature-controlled boxes." }
              ] : data.bullets;

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
            <span>{data.pretitle}</span>
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
            {data.description}
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

      {/* Social Media Feed (Comunidad Jetema) consolidated under Company */}
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
          <div className="relative w-full group/carousel">
            
            <div className="absolute inset-y-0 -left-4 sm:-left-6 flex items-center justify-start z-30 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleScrollClick('left')}
                onMouseEnter={() => setIsLeftBtnHovered(true)}
                onMouseLeave={() => setIsLeftBtnHovered(false)}
                className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer shadow-indigo-500/5"
                style={{
                  backgroundColor: isLeftBtnHovered ? getHexColor(brand.accentBg) : '#ffffff',
                  color: isLeftBtnHovered ? '#ffffff' : '#334155'
                }}
                title={isEs ? "Anterior" : "Previous"}
              >
                <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
              </button>
            </div>

            <div className="absolute inset-y-0 -right-4 sm:-right-6 flex items-center justify-end z-30 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleScrollClick('right')}
                onMouseEnter={() => setIsRightBtnHovered(true)}
                onMouseLeave={() => setIsRightBtnHovered(false)}
                className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer shadow-indigo-500/5"
                style={{
                  backgroundColor: isRightBtnHovered ? getHexColor(brand.accentBg) : '#ffffff',
                  color: isRightBtnHovered ? '#ffffff' : '#334155'
                }}
                title={isEs ? "Siguiente" : "Next"}
              >
                <ChevronRight className="w-5 h-5 translate-x-0.5" />
              </button>
            </div>

            {/* Horizontal continuous autoplay scroll track (removed snapping and scroll-smooth to allow script auto scroll) */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto py-4 px-1 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {doubledVideos.map((video, idx) => (
                <ReelCard
                  key={`${video.url}-${idx}`}
                  videoUrl={video.url}
                  index={video.originalIndex}
                  brand={brand}
                  language={language}
                  isHoveredParent={hoveredIndex === idx}
                  onHoverChange={(hovered) => {
                    if (hovered) {
                      setHoveredIndex(idx);
                    } else {
                      if (hoveredIndex === idx) setHoveredIndex(null);
                    }
                  }}
                  isPlayingInline={activePlayingIndex === idx}
                  onPlayingChange={(playing) => {
                    if (playing) {
                      setActivePlayingIndex(idx);
                    } else {
                      if (activePlayingIndex === idx) setActivePlayingIndex(null);
                    }
                  }}
                  onMaximize={(url) => setActiveSocialVideo(url)}
                />
              ))}
            </div>

          </div>

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
          {/* Modal Backdrop click handler */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveSocialVideo(null)} />
          
          {/* 9:16 Vertical frame container taking up 85vh */}
          <div className="relative bg-black rounded-[28px] h-[85vh] aspect-[9/16] overflow-hidden shadow-2xl border border-white/10 z-10 animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveSocialVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
              aria-label={isEs ? "Cerrar video" : "Close video"}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Vertical Video Element */}
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
