import { useState, useRef } from 'react';

/**
 * 16:9 Premium Video player for Corporate presentation
 */
export const CorporateVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preloadMode, setPreloadMode] = useState('metadata');
  const videoRef = useRef(null);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[600px] aspect-video group bg-slate-950 border border-slate-200/10 cursor-pointer"
      onMouseEnter={() => setPreloadMode('auto')}
      onClick={() => {
        if (!isPlaying) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }}
    >
      <video
        ref={videoRef}
        src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.mp4"
        preload={preloadMode}
        controls={isPlaying}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Static WebP Cover Image (hidden when playing) */}
      {!isPlaying && (
        <img 
          src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.webp"
          alt="Maines Corporativo"
          className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Custom Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors duration-300 z-15">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-2xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 active:scale-90 relative">
            {/* Pulsing glow ring */}
            <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-25" />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8 sm:w-10 sm:h-10 ml-1"
            >
              <path d="M8 5.14v14c0 .86.94 1.39 1.66.9l10-7c.61-.43.61-1.37 0-1.8l-10-7A1 1 0 008 5.14z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
