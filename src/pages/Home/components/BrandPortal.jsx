import { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Import local cover images (matching the brand pages' headers)
import jetemaCover from '../../../../assets/jetema/hero.webp';
import dermclarCover from '../../../../assets/marcas/dermclar/dermclar-hero.jpeg';
import xtralifeCover from '../../../../assets/marcas/xtralife/xtralife-hero.jpeg';
import cereformCover from '../../../../assets/marcas/cereform/cereform-hero-1.webp';

// Configuration Flag: Set to true when ready to show videos on hover.
// Currently set to false as requested by the user.
const PLAY_VIDEOS = false;

const cn = (...classes) => classes.filter(Boolean).join(' ');

const BrandCard = ({ brand, isHovered, onHoverChange, playVideos }) => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (!playVideos) return;
    if (isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, playVideos]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-slate-200/50 bg-white transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)] select-none",
        "h-full w-full", // Let the flex container size determine card size
        isHovered 
          ? "flex-[2.5] shadow-2xl shadow-slate-900/10 border-slate-300/40" 
          : "flex-[0.8] lg:opacity-90 hover:opacity-100"
      )}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={brand.thumbnail}
          alt={brand.displayName}
          className={cn(
            "w-full h-full object-cover transition-all duration-[1000ms] ease-out",
            isHovered 
              ? "scale-105 saturate-[1.1] brightness-[0.85]" 
              : "scale-100 lg:grayscale lg:brightness-75"
          )}
        />
      </div>

      {/* Video Loop Element (Prepped but conditionally rendered/visible) */}
      {playVideos && brand.video && (
        <div 
          className={cn(
            "absolute inset-0 z-5 transition-opacity duration-700 pointer-events-none",
            (isHovered && isVideoLoaded) ? "opacity-100" : "opacity-0"
          )}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={brand.video} type="video/mp4" />
            <source src={brand.video} type="video/webm" />
          </video>
        </div>
      )}

      {/* Dark overlay for better text contrast */}
      <div 
        className={cn(
          "absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-500",
          isHovered ? "opacity-90" : "opacity-40"
        )}
      />

      {/* Logo in the center when NOT hovered */}
      <div 
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-700",
          isHovered ? "opacity-0 scale-75 -translate-y-8" : "opacity-100 scale-100"
        )}
      >
        <div className={cn(
          "w-[190px] h-[75px] sm:w-[220px] sm:h-[90px] lg:w-[240px] lg:h-[100px] rounded-2xl border shadow-sm transition-all duration-300 flex items-center justify-center p-3",
          brand.logoContainerClass
        )}>
          <img 
            src={brand.logo} 
            alt={`${brand.displayName} Logo`}
            className="max-w-[90%] max-h-[90%] object-contain filter drop-shadow-sm select-none opacity-90 transition-all duration-300"
          />
        </div>
      </div>

      {/* Glassmorphic Brand Details Card (Slides up on Hover) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 lg:p-8 flex flex-col items-start justify-end",
          "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)]",
          isHovered 
            ? "translate-y-0 opacity-100" 
            : "translate-y-4 lg:translate-y-16 opacity-0 lg:opacity-0 pointer-events-none"
        )}
      >
        {/* Glassmorphic box */}
        <div className={cn(
          "w-full backdrop-blur-xl bg-slate-950/45 rounded-2xl p-5 sm:p-6 border border-white/10",
          "shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        )}>
          <div className="space-y-2 text-left flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {/* Brand Logo inside glass box */}
              <div className="bg-white/95 rounded-lg px-2.5 py-1.5 h-[36px] flex items-center justify-center shrink-0">
                <img 
                  src={brand.logo} 
                  alt={brand.displayName} 
                  className="max-h-full max-w-[95px] object-contain"
                />
              </div>
              <h3 className="text-white font-display text-xl sm:text-2xl font-bold tracking-tight uppercase">
                {brand.displayName}
              </h3>
            </div>
            
            <p className="text-accent-light font-bold text-xs sm:text-sm tracking-wider uppercase">
              {brand.tagline}
            </p>
            <p className="text-slate-200/90 font-medium text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-2">
              {brand.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Link
              to={brand.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl text-white font-bold text-base tracking-wide px-6 py-3.5 shadow-md",
                "transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
                brand.buttonBg
              )}
            >
              <span>{brand.exploreText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-only collapsed view content (Title & tagline always visible) */}
      <div 
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 p-4 flex flex-col justify-end pointer-events-none lg:hidden transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-display font-extrabold text-base tracking-wide uppercase">
              {brand.displayName}
            </h4>
            <p className="text-white/70 font-sans text-xs uppercase font-semibold">
              {brand.tagline}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandPortal = () => {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState(null);

  const brands = useMemo(() => [
    {
      id: "dermclar",
      displayName: "Dermclar",
      tagline: t('brands.dermclar.tagline'),
      description: t('brands.dermclar.desc'),
      logo: "/assets/dermclar-logo.png",
      thumbnail: dermclarCover,
      video: "https://ncbtybpuiefkiuiaqgoe.supabase.co/storage/v1/object/public/MainesSRL/dermclar-subpage/videos/1.webm",
      href: "/dermclar",
      buttonBg: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20",
      logoContainerClass: "bg-white/40 border-white/25 backdrop-blur-md shadow-slate-900/5",
      exploreText: t('brands.visit') || "Visitar Marca",
    },
    {
      id: "jetema",
      displayName: "Jetema",
      tagline: t('brands.jetema.tagline'),
      description: t('brands.jetema.desc'),
      logo: "/assets/JETEMA-logo.png",
      thumbnail: jetemaCover,
      video: "https://ncbtybpuiefkiuiaqgoe.supabase.co/storage/v1/object/public/MainesSRL/jetema-subpage/videos/1.webm",
      href: "/jetema",
      buttonBg: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20",
      logoContainerClass: "bg-white/40 border-white/25 backdrop-blur-md shadow-slate-900/5",
      exploreText: t('brands.visit') || "Visitar Marca",
    },
    {
      id: "xtralife",
      displayName: "Xtralife",
      tagline: t('brands.xtralife.tagline'),
      description: t('brands.xtralife.desc'),
      logo: "/assets/xtralife-logo.png",
      thumbnail: xtralifeCover,
      video: "https://ncbtybpuiefkiuiaqgoe.supabase.co/storage/v1/object/public/MainesSRL/xtralife-subpage/videos/1.webm",
      href: "/xtralife",
      buttonBg: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
      logoContainerClass: "bg-white/40 border-white/25 backdrop-blur-md shadow-slate-900/5",
      exploreText: t('brands.visit') || "Visitar Marca",
    },
    {
      id: "cereform",
      displayName: "Cereform",
      tagline: t('brands.cereform.tagline'),
      description: t('brands.cereform.desc'),
      logo: "/assets/cereform/logo-cereform.svg",
      thumbnail: cereformCover,
      video: "", 
      href: "/cereform",
      buttonBg: "bg-[#3e97b6] hover:bg-[#1c85a9] shadow-[#3e97b6]/20",
      logoContainerClass: "bg-white/40 border-white/25 backdrop-blur-md shadow-slate-900/5", // Identical container styles
      exploreText: t('brands.visit') || "Visitar Marca",
    }
  ], [t]);

  return (
    <section 
      id="ecosystem" 
      className="w-full bg-slate-50 relative overflow-hidden py-20 lg:py-28 select-none"
    >
      {/* Background soft ambient lights */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/30 filter blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-100/20 filter blur-[140px]" />
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>{t('brands.portalBadge')}</span>
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            {t('brands.title')}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-2">
              {t('brands.titleAccent')}
            </span>
          </h2>
          
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            {t('brands.subtitle')}
          </p>
        </div>

        {/* Brand Gallery Accordion */}
        <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch h-[720px] lg:h-[700px] transition-all duration-700 ease-out">
          {brands.map((brand) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
              isHovered={hoveredId === brand.id}
              onHoverChange={(hovered) => setHoveredId(hovered ? brand.id : null)}
              playVideos={PLAY_VIDEOS}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPortal;
