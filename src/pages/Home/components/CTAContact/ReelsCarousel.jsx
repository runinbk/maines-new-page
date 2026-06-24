import { useState, useEffect } from 'react';
import { Play, X, ArrowLeft, ArrowRight } from 'lucide-react';
import brandVideos from '../../../../data/brandVideos.json';

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

const getCircularDistance = (idx, activeIdx, length) => {
  let diff = idx - activeIdx;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
};

export const ReelsCarousel = ({ onModalStateChange }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Generate playlist once on mount
  const [playlist] = useState(() => {
    const rawVideos = [];

    // Dermclar
    if (brandVideos.dermclar) {
      brandVideos.dermclar.forEach((url, idx) => {
        rawVideos.push({
          id: `dermclar-${idx}`,
          brand: 'Dermclar',
          user: '@dermclarbolivia',
          category: 'Biotech',
          bgGradient: 'from-violet-600/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Jetema
    if (brandVideos.jetema) {
      brandVideos.jetema.forEach((url, idx) => {
        rawVideos.push({
          id: `jetema-${idx}`,
          brand: 'Jetema',
          user: '@jetemaboliviaoficial',
          category: 'Aesthetics',
          bgGradient: 'from-cyan-600/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Xtralife
    if (brandVideos.xtralife) {
      brandVideos.xtralife.forEach((url, idx) => {
        rawVideos.push({
          id: `xtralife-${idx}`,
          brand: 'Xtralife',
          user: '@xtralifeboliviaoficial',
          category: 'Nutrition',
          bgGradient: 'from-amber-500/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Shuffle and pick 9
    return [...rawVideos].sort(() => Math.random() - 0.5).slice(0, 9);
  });

  // Auto-play interval for carousel
  useEffect(() => {
    if (playlist.length === 0 || isVideoModalOpen || isHovered) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % playlist.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [playlist.length, isVideoModalOpen, isHovered]);

  // Sync body overflow to block scrolling on mobile when video modal is active
  useEffect(() => {
    onModalStateChange(isVideoModalOpen);
  }, [isVideoModalOpen, onModalStateChange]);

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setActiveIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % playlist.length);
  };

  const openVideo = (url) => {
    setActiveVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  return (
    <div 
      className="lg:col-span-6 flex flex-col items-center justify-center relative select-none w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Nav Arrows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-30">
        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
          aria-label="Next slide"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reels Carousel Container */}
      <div className="flex items-center justify-center w-full max-w-[450px] relative overflow-hidden h-[450px] sm:h-[500px]">
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
            positionClass = "scale-90 opacity-35 z-10 -translate-x-[80px] sm:-translate-x-[105px] pointer-events-none";
          } else if (isRight) {
            positionClass = "scale-90 opacity-35 z-10 translate-x-[80px] sm:translate-x-[105px] pointer-events-none";
          }

          if (!isVisible) return null;

          return (
            <div
              key={reel.id}
              className={`absolute rounded-[28px] overflow-hidden bg-gradient-to-b ${reel.bgGradient} border border-slate-200/10 p-5 flex flex-col justify-between text-left transition-all duration-500 ease-out w-[210px] sm:w-[245px] aspect-[9/16] ${positionClass}`}
            >
              {isCenter ? (
                <div 
                  onClick={() => openVideo(reel.videoUrl)}
                  className="absolute inset-0 z-0 cursor-pointer w-full h-full"
                >
                  <video
                    key={`video-center-${reel.id}`}
                    src={reel.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-0 pointer-events-none" />
                </div>
              ) : (
                <video
                  key={`video-side-${reel.id}`}
                  src={`${reel.videoUrl}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 blur-[0.5px]"
                />
              )}

              {/* IG Brand Profile Header */}
              <div className="z-10 relative">
                <a 
                  href={getInstagramLink(reel.brand)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-85 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
                    <img 
                      src={getBrandLogo(reel.brand)} 
                      alt={`${reel.brand} Logo`} 
                      className="max-w-[70%] max-h-[70%] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-[100px] hover:underline">
                    {reel.user}
                  </span>
                </a>
              </div>

              {/* Play overlay button on center */}
              <div className="w-full flex justify-center py-6 z-10 pointer-events-none">
                {isCenter && (
                  <div 
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-98 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
                    onClick={() => openVideo(reel.videoUrl)}
                  >
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                )}
              </div>

              {/* Reel Footer Caption hashtags */}
              <div className="z-10 bg-gradient-to-t from-black/85 to-transparent -mx-5 -mb-5 p-4 pt-8 rounded-b-[28px] flex items-end justify-between">
                <div className="flex gap-1.5 pointer-events-none">
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-accent/20 text-accent uppercase tracking-wider">#{reel.brand}</span>
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-300 uppercase tracking-wider">#Maines</span>
                </div>
              </div>

              {/* Subtle aesthetic backdrop grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] z-0 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* DYNAMIC VIDEO MODAL PLAYER WITH AMBIENT GLOW */}
      {isVideoModalOpen && activeVideoUrl && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* Main Active Vertical Video Frame */}
          <div 
            className="w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl relative bg-black border border-white/10 z-20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:text-accent transition-colors duration-200 cursor-pointer z-30"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            <video
              src={activeVideoUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover z-20 relative"
            />
          </div>

          {/* Ambient Blurred Video Background Glow */}
          <video
            src={activeVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-40 z-10 pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};
export default ReelsCarousel;
