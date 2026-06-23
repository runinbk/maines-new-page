import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  ArrowLeft, ArrowRight, Play, 
  Volume2, ChevronDown, ChevronUp 
} from 'lucide-react';

// Dynamic Vite Asset Ingestion - automatically imports all 31 WebM videos in assets/videos subfolders!
const videoImports = import.meta.glob('../../assets/videos/**/*.webm', { eager: true });

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

// High-Performance Virtualized Card Component
// Instantiates the video element ONLY when it enters the viewport
const GalleryCard = ({ card, isActive, onClick }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { 
        root: null, 
        rootMargin: '120px', // Preloads video slightly before it glides onto the screen
        threshold: 0.01 
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`min-w-[160px] sm:min-w-[195px] w-[160px] sm:w-[195px] aspect-[10/16] rounded-3xl text-left overflow-hidden relative shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-all duration-500 flex flex-col justify-between p-4 cursor-pointer group select-none border border-white/20 ${
        isActive 
          ? 'shadow-[0_0_30px_rgba(14,165,233,0.3)] scale-[1.03]' 
          : ''
      }`}
    >
      {inView ? (
        // Play silently and loop only the first 5 seconds to minimize CPU and browser memory
        <video
          src={`${card.videoUrl}#t=0.5`}
          autoPlay
          preload="auto"
          muted
          playsInline
          loop
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 5) {
              e.currentTarget.currentTime = 0.1;
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 z-0 pointer-events-none ${
            isActive 
              ? 'opacity-[0.85]' 
              : 'opacity-[0.72] group-hover:opacity-[0.88] group-hover:scale-105'
          }`}
        />
      ) : (
        // Ultra-lightweight color skeleton representing each brand category
        <div className={`absolute inset-0 z-0 bg-gradient-to-b ${card.bgGradient} opacity-60`} />
      )}
      
      {/* Visual vignette shader overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-slate-950/70 via-transparent to-transparent group-hover:from-slate-950/90 transition-all duration-300" />

      {/* Quick play badge showing active selection */}
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center z-10 shadow-lg animate-pulse">
          <Play className="w-2 h-2 fill-white ml-[0.5px]" />
        </div>
      )}

      {/* Bottom Pill Capsule containing ONLY the Brand tag & Category */}
      <div className="absolute bottom-4 left-3 right-3 z-10 p-2 rounded-2xl bg-slate-950/75 border border-white/10 backdrop-blur-md flex items-center justify-between pointer-events-none">
        <span className="text-[8px] sm:text-[9.5px] font-bold text-white uppercase tracking-widest font-mono">
          {card.tag}
        </span>
        <span className="text-[7.5px] sm:text-[8px] font-bold text-accent uppercase tracking-widest font-mono text-right">
          {card.category}
        </span>
      </div>

    </div>
  );
};

const SocialWall = () => {
  const { t, language } = useLanguage();
  const revealRef = useScrollReveal();
  
  // Shuffled playlist and navigation states
  const [shuffledVideos] = useState(() => {
    const rawVideos = Object.entries(videoImports).map(([path, mod], idx) => {
      let brand = 'Xtralife';
      let user = '@xtralifeboliviaoficial';
      let category = 'Nutrition';
      let bgGradient = 'from-amber-500/30 via-slate-900 to-slate-950';

      if (path.includes('dermclar')) {
        brand = 'Dermclar';
        user = '@dermclarbolivia';
        category = 'Biotech';
        bgGradient = 'from-violet-600/30 via-slate-900 to-slate-950';
      } else if (path.includes('jetema')) {
        brand = 'Jetema';
        user = '@jetemaboliviaoficial';
        category = 'Aesthetics';
        bgGradient = 'from-cyan-600/30 via-slate-900 to-slate-950';
      }

      return {
        id: `video-${idx}`,
        user,
        brand,
        tag: brand,
        category,
        bgGradient,
        videoUrl: mod.default
      };
    });
    return [...rawVideos].sort(() => Math.random() - 0.5);
  });

  const [playlist, setPlaylist] = useState(() => shuffledVideos.slice(0, 8));
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlayingWithAudio, setIsPlayingWithAudio] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isGalleryLoading, setIsGalleryLoading] = useState(() => window.innerWidth >= 1900);
  
  // Mouse click-and-drag horizontal scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  const scrollContainerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Load the remaining playlist items and handle initial preload on desktop
  useEffect(() => {
    // After 1.2 seconds, load and append the remaining 23 videos dynamically in the background
    const timer = setTimeout(() => {
      setPlaylist(shuffledVideos);
    }, 1200);

    // Auto-show gallery on large screens (>= 1900px) after preloading the first 5 videos
    if (window.innerWidth >= 1900) {
      const videosToPreload = shuffledVideos.slice(0, 5).map(item => item.videoUrl);
      const preloadPromises = videosToPreload.map(url => {
        return new Promise((resolve) => {
          const video = document.createElement('video');
          video.src = `${url}#t=0.5`;
          video.preload = 'auto';
          video.muted = true;
          video.playsInline = true;
          
          const handler = () => resolve();
          video.addEventListener('loadeddata', handler, { once: true });
          video.addEventListener('error', handler, { once: true });
          
          // Timeout fallback of 3.5 seconds
          setTimeout(handler, 3500);
        });
      });

      Promise.all(preloadPromises).then(() => {
        setIsGalleryLoading(false);
        setShowGallery(true);
      });
    }

    return () => clearTimeout(timer);
  }, [shuffledVideos]);

  // Automatic slide rotation hook (auto-advance every 6 seconds)
  // Stops automatically if the active video is clicked and plays with audio!
  useEffect(() => {
    if (playlist.length === 0 || isPlayingWithAudio) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % playlist.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [playlist.length, isPlayingWithAudio]);

  // Infinite Seamless Auto-Scrolling horizontal ticker loop inside bottom gallery
  // Moves slowly in background and wraps mathematically, pausing instantly on user hover, touch, or drag
  // Resolved snap conflict by completely stripping "scroll-smooth" and "snap-x" from auto-scroll track
  useEffect(() => {
    if (!showGallery || isDragging || isUserInteracting || playlist.length === 0) return;

    let animationFrameId;
    const N = playlist.length;

    const scrollStep = () => {
      const container = scrollContainerRef.current;
      if (container && container.children && container.children.length > N) {
        const firstChildOfSecondCopy = container.children[N];
        if (firstChildOfSecondCopy) {
          // Exact pixel width of one full copy of the playlist
          const W = firstChildOfSecondCopy.offsetLeft;
          
          container.scrollLeft += 0.65; // Slow, luxurious, marquee crawl
          
          // Mathematically perfect endless wrap:
          // If scroll reaches the second copy, decrement by W. 
          // Since copy 2 is identical to copy 1, this reset is 100% invisible!
          if (container.scrollLeft >= W) {
            container.scrollLeft -= W;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [showGallery, isDragging, isUserInteracting, playlist.length]);

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setIsPlayingWithAudio(false); // Reset audio state
    setActiveIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setIsPlayingWithAudio(false); // Reset audio state
    setActiveIdx((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  // Center video play/unmute click action
  const handleCenterVideoClick = () => {
    setIsPlayingWithAudio((prev) => !prev);
  };

  // When a user clicks a brand category preview card in the bottom gallery:
  // - It shifts that video to the front/active state immediately
  // - Plays the video with sound (unmuted), stopping auto-advance
  // - Programmatic scroll removed to avoid scroll collisions that trigger the floating Navbar!
  const handleGalleryCardClick = (idx) => {
    setActiveIdx(idx);
    setIsPlayingWithAudio(true);
  };

  // Safe circular mapping formula for the circular 3D carousel
  const getCircularDistance = (idx, activeIdx, length) => {
    let diff = idx - activeIdx;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  // Drag to scroll calculations with seamless wrap-around wrapping
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Debounce user interaction status reset to allow clean visual settle before scrolling resumes
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current || playlist.length === 0) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    
    let newScrollLeft = scrollLeft - walk;
    
    // Endless dragging wrapping formula:
    // If the user drags beyond the boundaries left or right, it wraps the scroll position
    // and recalculates startX/scrollLeft dynamically to allow infinite horizontal swiping!
    const container = scrollContainerRef.current;
    const N = playlist.length;
    if (container.children && container.children.length > N) {
      const W = container.children[N].offsetLeft;
      if (newScrollLeft >= W) {
        newScrollLeft -= W;
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(newScrollLeft);
      } else if (newScrollLeft <= 0) {
        newScrollLeft += W;
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(newScrollLeft);
      }
    }
    
    container.scrollLeft = newScrollLeft;
  };

  const handleUserTouchStart = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
  };

  const handleUserTouchEnd = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  };

  const handleUserMouseEnter = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
  };

  // Handle premium Toggle Gallery with preloading loading simulation spinner
  const handleToggleGallery = () => {
    if (showGallery) {
      setShowGallery(false);
    } else {
      setIsGalleryLoading(true);
      
      // Preload the first 5 videos to make sure they are ready when the gallery is shown
      const videosToPreload = playlist.slice(0, 5).map(item => item.videoUrl);
      const preloadPromises = videosToPreload.map(url => {
        return new Promise((resolve) => {
          const video = document.createElement('video');
          video.src = `${url}#t=0.5`;
          video.preload = 'auto';
          video.muted = true;
          video.playsInline = true;
          
          const handler = () => resolve();
          video.addEventListener('loadeddata', handler, { once: true });
          video.addEventListener('error', handler, { once: true });
          
          // Timeout fallback of 3.5 seconds
          setTimeout(handler, 3500);
        });
      });

      Promise.all(preloadPromises).then(() => {
        setIsGalleryLoading(false);
        setShowGallery(true);
      });
    }
  };

  // Clean local responsive label toggle
  const getToggleButtonText = () => {
    if (isGalleryLoading) {
      return language === 'es' ? 'Cargando Galería...' : 'Loading Gallery...';
    }
    if (showGallery) {
      return language === 'es' ? 'Ocultar Galería' : 'Hide Gallery';
    }
    return t('social.ctaFull');
  };

  // Dynamic profile link based on active brand
  const getInstagramLink = (brand) => {
    switch (brand.toLowerCase()) {
      case 'dermclar':
        return 'https://instagram.com/dermclarbolivia';
      case 'jetema':
        return 'https://instagram.com/jetemaboliviaoficial';
      case 'xtralife':
      default:
        return 'https://instagram.com/xtralifeboliviaoficial';
    }
  };

  // Brand Logo selector
  const getBrandLogo = (brand) => {
    switch (brand.toLowerCase()) {
      case 'dermclar':
        return '/assets/dermclar-logo.png';
      case 'jetema':
        return '/assets/JETEMA-logo.png';
      case 'xtralife':
      default:
        return '/assets/xtralife-logo.png';
    }
  };

  return (
    <section 
      id="social" 
      ref={revealRef} 
      // Removed parent horizontal padding constraints to allow complete edge-to-edge screen bleed!
      className="relative min-h-[100dvh] flex flex-col justify-center items-center py-8 bg-[#F4F7FA] overflow-hidden transition-all duration-500"
    >
      {/* Visual background glowing accents */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-slate-50 filter blur-[100px] pointer-events-none z-0" />

      {/* Main Container - Responsive flex layout to center elements */}
      {/* Retains standard clean layout padding only for the top elements grid */}
      <div className="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-20 relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Main Grid: Info Left & Reels Right */}
        <div id="social-carousel-focus" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading Copy & Statistics */}
          <div className="lg:col-span-5 text-left space-y-6 md:space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-accent uppercase block">
                {t('social.pretitle')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-primary-dark">
                {t('social.title')}
                <span className="text-accent">{t('social.titleAccent')}</span>
              </h2>
              <div className="w-12 h-1 bg-accent/30 rounded-full" />
              <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                {t('social.subtitle')}
              </p>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-1">
              <button 
                onClick={handleToggleGallery}
                disabled={isGalleryLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer disabled:opacity-85"
              >
                {isGalleryLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                <span>{getToggleButtonText()}</span>
                {!isGalleryLoading && (
                  showGallery ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:scale-105" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:scale-105" />
                  )
                )}
              </button>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#0B0F19] border border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300 shadow-md"
              >
                <span>{t('social.ctaInstagram')}</span>
                <InstagramIcon className="w-4 h-4 text-pink-500" />
              </a>
            </div>

            {/* Premium Trajectory Numbers Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 max-w-md">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary">
                  {t('social.stat1Val')}
                </span>
                <span className="text-[10px] font-bold text-slate-400 block tracking-widest leading-none">
                  {t('social.stat1Text')}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary">
                  {t('social.stat2Val')}
                </span>
                <span className="text-[10px] font-bold text-slate-400 block tracking-widest leading-none">
                  {t('social.stat2Text')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D-Interactive Reels Slide Controller */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Nav Arrows Floating layout */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-30">
              <button 
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Reels Carousel Container - Height and cards dimensions scale up automatically when gallery is closed to fill screen */}
            <div className={`flex items-center justify-center w-full max-w-[500px] relative overflow-hidden transition-all duration-500 ${
              showGallery ? 'h-[310px] sm:h-[350px]' : 'h-[460px] sm:h-[500px]'
            }`}>
              {playlist.map((reel, idx) => {
                const circularDistance = getCircularDistance(idx, activeIdx, playlist.length);
                const isCenter = circularDistance === 0;
                const isLeft = circularDistance === -1;
                const isRight = circularDistance === 1;
                
                const isVisible = isCenter || isLeft || isRight;

                let positionClass = "scale-75 opacity-0 pointer-events-none z-0";
                if (isCenter) {
                  positionClass = "scale-100 opacity-100 z-20 translate-x-0 shadow-2xl";
                } else if (isLeft) {
                  positionClass = "scale-90 opacity-40 z-10 -translate-x-[90px] sm:-translate-x-[115px] pointer-events-none";
                } else if (isRight) {
                  positionClass = "scale-90 opacity-40 z-10 translate-x-[90px] sm:translate-x-[115px] pointer-events-none";
                }

                if (!isVisible) return null;

                return (
                  <div
                    key={reel.id}
                    className={`absolute rounded-[28px] overflow-hidden bg-gradient-to-b ${reel.bgGradient} border border-slate-800/10 p-5 flex flex-col justify-between text-left transition-all duration-500 ease-out ${positionClass} ${
                      showGallery 
                        ? 'w-[170px] sm:w-[190px] aspect-[9/16]' 
                        : 'w-[230px] sm:w-[260px] aspect-[9/16]'
                    }`}
                  >
                    
                    {/* Render active center playing video with click-to-unmute trigger */}
                    {isCenter ? (
                      <div 
                        onClick={handleCenterVideoClick}
                        className="absolute inset-0 z-0 cursor-pointer w-full h-full"
                      >
                        <video
                          key={`video-center-${reel.id}`}
                          src={reel.videoUrl}
                          autoPlay
                          muted={!isPlayingWithAudio}
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Shimmer gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75 z-0 pointer-events-none" />
                      </div>
                    ) : (
                      // Render paused preview of left/right videos with 0.5s fragment to show static frame
                      <video
                        key={`video-side-${reel.id}`}
                        src={`${reel.videoUrl}#t=0.5`}
                        preload="metadata"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 blur-[0.5px]"
                      />
                    )}

                    {/* IG Brand Profile Header capsule - Links directly to IG profile */}
                    <div className="z-10 relative">
                      <a 
                        href={getInstagramLink(reel.brand)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-85 transition-opacity"
                        onClick={(e) => e.stopPropagation()} // Prevent card mute/unmute click
                      >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
                          <img 
                            src={getBrandLogo(reel.brand)} 
                            alt={`${reel.brand} Logo`} 
                            className="max-w-[70%] max-h-[70%] object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-[100px] hover:underline">
                          {reel.user}
                        </span>
                      </a>
                    </div>

                    {/* Mid screen Play Badge overlay */}
                    {/* Only visible in the center when muted */}
                    <div className="w-full flex justify-center py-6 z-10 pointer-events-none">
                      {isCenter && !isPlayingWithAudio && (
                        <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white scale-98 hover:scale-100 transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer" onClick={handleCenterVideoClick}>
                          <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Clean Reel Footer Caption containing ONLY hashtags and corner speaker */}
                    <div className="z-10 bg-gradient-to-t from-black/80 to-transparent -mx-5 -mb-5 p-4 pt-8 rounded-b-[28px] flex items-end justify-between">
                      {/* Left: Brand tags */}
                      <div className="flex gap-1.5 pointer-events-none">
                        <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-accent/20 text-accent uppercase tracking-wider">#{reel.brand}</span>
                        <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-300 uppercase tracking-wider">#Maines</span>
                      </div>

                      {/* Right: Corner floating active audio/soundwaves control */}
                      {isCenter && isPlayingWithAudio && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCenterVideoClick();
                          }}
                          className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700/50 text-white flex items-center justify-center transition-all duration-300 shadow-lg pointer-events-auto cursor-pointer transform hover:scale-105 active:scale-95"
                        >
                          <div className="flex items-center gap-0.5">
                            <Volume2 className="w-4 h-4 text-white animate-pulse" />
                            {/* Glowing live audio indicator bars */}
                            <div className="flex items-end gap-[1px] h-2 ml-0.5">
                              <span className="w-[1px] bg-accent rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }}></span>
                              <span className="w-[1px] bg-accent rounded-full animate-bounce h-2" style={{ animationDelay: '0.3s', animationDuration: '0.4s' }}></span>
                              <span className="w-[1px] bg-accent rounded-full animate-bounce h-1" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }}></span>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Subtle aesthetic backdrop grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] z-0 pointer-events-none" />
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: EXPANDABLE BRAND PLAYLIST GALLERY */}
      {/* Sits completely outside main page container limits to bleed left/right on scroll all the way to screen edges! */}
      {showGallery && (
        <div className="w-full overflow-hidden mt-6 sm:mt-10 relative z-10 transition-all duration-700 ease-in-out">
          <div className="space-y-6 pt-6 border-t border-slate-100/85">
            
            {/* Gallery Horizontal Slide Grid with Mouse drag-to-scroll & Continuous Auto-scroll */}
            {/* Tripled the items [...playlist, ...playlist, ...playlist] to guarantee ample scroll width so it loops endlessly without hitting physical limits! */}
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleUserMouseEnter}
              onTouchStart={handleUserTouchStart}
              onTouchEnd={handleUserTouchEnd}
              className={`w-full overflow-x-auto pb-6 no-scrollbar flex gap-5 px-8 sm:px-12 lg:px-20 ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
            >
              {/* Tripled playlist duplicates list N times dynamically to enable mathematically seamless endless loops */}
              {(playlist.length > 0 ? [...playlist, ...playlist, ...playlist] : []).map((card, idx) => {
                const originalIdx = idx % playlist.length;
                const isActive = originalIdx === activeIdx;
                
                return (
                  <GalleryCard
                    key={`gallery-card-${card.id}-${idx}`}
                    card={card}
                    isActive={isActive}
                    onClick={() => handleGalleryCardClick(originalIdx)}
                  />
                );
              })}
            </div>

            {/* Aesthetic scroll progress bar synced to active item */}
            <div className="w-full max-w-[200px] h-[2px] bg-slate-100 mx-auto rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{
                  width: `${(100 / playlist.length) * (activeIdx + 1)}%`,
                  marginLeft: `${(100 / playlist.length) * activeIdx}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SocialWall;
