import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../../../../components/ui/Icons';

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

  // Handle play/pause state change
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
      
      {/* Dark gradient overlays */}
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

      {/* Middle Interactive Icon */}
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
 * VideoCarousel component
 */
export const VideoCarousel = ({ brand, onMaximizeVideo }) => {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const socialConfig = brand.social;

  const carouselRef = useRef(null);
  const scrollRequestRef = useRef(null);
  const isPausedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activePlayingIndex, setActivePlayingIndex] = useState(null);
  const [isLeftBtnHovered, setIsLeftBtnHovered] = useState(false);
  const [isRightBtnHovered, setIsRightBtnHovered] = useState(false);
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
    if (activePlayingIndex !== null || hoveredIndex !== null) {
      isPausedRef.current = true;
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    } else {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2500);
    }
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [hoveredIndex, activePlayingIndex]);

  useEffect(() => {
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

  if (!socialConfig || !socialConfig.videos || socialConfig.videos.length === 0) return null;

  return (
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
            onMaximize={onMaximizeVideo}
          />
        ))}
      </div>
    </div>
  );
};
