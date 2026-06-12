import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';

const BrandCard = ({ brand, index, hoveredIndex, setHoveredIndex }) => {
  const isHovered = hoveredIndex === index;
  const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== index;

  const handleCardClick = () => {
    window.location.hash = brand.href;
  };

  // Coordinated hover calculations to simulate shared fluid surface displacement
  const cardScale = isHovered ? 1.04 : (isAnotherHovered ? 0.92 : 1.0);
  const cardOpacity = isHovered ? 1.0 : (isAnotherHovered ? 0.50 : 1.0);
  const cardRotate = isHovered ? 0 : (isAnotherHovered ? (index < hoveredIndex ? -2.5 : 2.5) : 0);

  return (
    <motion.div
      className="flex flex-col items-center justify-center relative select-none"
      animate={{ 
        scale: cardScale, 
        opacity: cardOpacity,
        rotate: cardRotate
      }}
      transition={{ 
        type: "spring", 
        stiffness: 240, 
        damping: 24 
      }}
    >
      {/* Blob & Aura Container - Hover, Click, and cursor are restricted strictly to this circular bubble */}
      <div 
        className="relative liquid-glass-size flex items-center justify-center cursor-pointer group"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={handleCardClick}
      >
        
        {/* Aura light behind blob (Refracts light through the glass) */}
        <div 
          className={`absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr ${brand.auraClass} filter blur-[60px] opacity-35 transition-all duration-1000 ease-out`}
          style={{
            transform: isHovered ? 'scale(1.22) translate(6px, -6px)' : 'scale(0.95)',
            opacity: isHovered ? 0.70 : 0.22,
            filter: 'blur(75px)'
          }}
        />

        {/* Liquid Glass Blob (Outer shell) */}
        <div 
          className={`absolute inset-0 border backdrop-blur-[24px] transition-all duration-700 ease-out ${brand.blobAnimateClass} ${brand.borderColor}`}
          style={{
            background: brand.glassBg,
            boxShadow: isHovered
              ? `inset 0 24px 36px rgba(255, 255, 255, 0.85), inset 0 -14px 28px rgba(255, 255, 255, 0.45), inset 0 0 35px rgba(${brand.rgb}, 0.12), 0 35px 70px -15px rgba(${brand.rgb}, 0.20), 0 10px 25px -10px rgba(0,0,0,0.04)`
              : `inset 0 18px 28px rgba(255, 255, 255, 0.65), inset 0 -10px 20px rgba(255, 255, 255, 0.35), inset 0 0 25px rgba(${brand.rgb}, 0.04), 0 15px 40px -12px rgba(15, 23, 42, 0.035), 0 5px 15px -5px rgba(15, 23, 42, 0.01)`,
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            filter: isAnotherHovered ? 'blur(1.5px)' : 'none'
          }}
        >
          {/* Specular Highlights on outer shell (Percentage-scaled for dynamic sizes) */}
          <div className="absolute rounded-[50%] bg-gradient-to-b from-white/75 to-transparent blur-[0.8px] pointer-events-none" style={{ top: '6%', left: '12%', width: '40%', height: '12%', transform: 'rotate(-18deg)' }} />
          <div className="absolute rounded-[50%] bg-white/75 blur-[0.3px] pointer-events-none" style={{ top: '11%', left: '32%', width: '4%', height: '2.5%', transform: 'rotate(-15deg)' }} />
          <div className="absolute rounded-[50%] bg-gradient-to-t from-white/35 to-transparent blur-[1.5px] pointer-events-none" style={{ bottom: '8%', right: '12%', width: '25%', height: '10%', transform: 'rotate(20deg)' }} />
          <div className="absolute rounded-[50%] bg-gradient-to-b from-white/45 to-transparent blur-[0.8px] pointer-events-none" style={{ top: '9%', right: '18%', width: '15%', height: '7%', transform: 'rotate(15deg)' }} />

          {/* Inner Glass Blob (The second layer creating double refraction of thick water drops) */}
          <div 
            className="absolute inset-2 sm:inset-3 border border-t-white/45 border-l-white/20 border-r-white/10 border-b-transparent rounded-[inherit] pointer-events-none opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
              boxShadow: 'inset 0 10px 16px rgba(255, 255, 255, 0.4), inset 0 -6px 12px rgba(255, 255, 255, 0.15)',
              transform: 'rotate(-4deg)'
            }}
          />
        </div>

        {/* Foreground Content Overlay (Unblurred sibling layer) */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full liquid-glass-content transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)'
          }}
        >
          {/* Transparent Brand Logo Image (Enlarged and scaled proportionally) */}
          <div className="w-full flex items-center justify-center liquid-glass-logo">
            <img 
              src={brand.logo} 
              alt={`${brand.name} Logo`} 
              className="max-w-[65%] max-h-full object-contain filter drop-shadow-sm select-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
            />
          </div>

          {/* Brand Title (Clean text letters) */}
          <h3 className="font-extrabold text-slate-800 font-display tracking-tight transition-colors duration-300 group-hover:text-slate-900 liquid-glass-title">
            {brand.displayName}
          </h3>

          {/* Subtitle / Tagline */}
          <span className={`font-extrabold uppercase transition-colors duration-300 ${brand.textColorClass} liquid-glass-tagline`}>
            {brand.tagline}
          </span>

          {/* Description */}
          <p className="text-slate-500 font-medium transition-colors duration-300 group-hover:text-slate-600 liquid-glass-desc">
            {brand.description}
          </p>
        </div>

        {/* Secondary Overlapping Glass Bubbles (Creates organic composition of reference Image 1) */}
        {index === 0 && (
          <div 
            className="absolute rounded-full border border-white/50 backdrop-blur-[12px] pointer-events-none animate-morph-slow-3 animate-bobbing-1 liquid-glass-secondary-bubble"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(255,255,255,0.35), 0 10px 20px rgba(26,54,93,0.03)',
              left: 'calc(var(--bubble-size) * -0.06)',
              top: '25%',
              filter: isAnotherHovered ? 'blur(1.5px)' : 'none'
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}

        {index === 1 && (
          <div 
            className="absolute rounded-full border border-white/50 backdrop-blur-[12px] pointer-events-none animate-morph-slow-1 animate-bobbing-2 liquid-glass-secondary-bubble"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 5px 8px rgba(255,255,255,0.65), inset 0 -2px 4px rgba(255,255,255,0.35), 0 8px 16px rgba(26,54,93,0.03)',
              right: 'calc(var(--bubble-size) * -0.04)',
              top: '33%',
              filter: isAnotherHovered ? 'blur(1.5px)' : 'none'
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}

        {index === 2 && (
          <div 
            className="absolute rounded-full border border-white/50 backdrop-blur-[12px] pointer-events-none animate-morph-slow-2 animate-bobbing-3 liquid-glass-secondary-bubble"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(255,255,255,0.35), 0 10px 20px rgba(26,54,93,0.03)',
              right: 'calc(var(--bubble-size) * -0.06)',
              bottom: '25%',
              filter: isAnotherHovered ? 'blur(1.5px)' : 'none'
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const BrandPortal = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Stable brand configuration aligned to Image 1: Jetema (Left), Xtralife (Center), Dermclar (Right)
  const defaultBrands = [
    {
      id: 1,
      name: "Jetema",
      displayName: "Jetema",
      tagline: t('brands.jetema.tagline'),
      description: t('brands.jetema.desc'),
      logo: "/assets/JETEMA-logo.png",
      href: "#/brand/jetema",
      textColorClass: "text-blue-500 group-hover:text-blue-600",
      rgb: "59, 130, 246",
      glassBg: "linear-gradient(135deg, rgba(239, 246, 255, 0.35) 0%, rgba(219, 234, 254, 0.12) 50%, rgba(191, 219, 254, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-blue-200/50 border-r-blue-300/35 border-b-blue-400/25",
      auraClass: "from-blue-400/25 via-indigo-400/15 to-transparent",
      blobAnimateClass: "animate-morph-slow-1 group-hover:animate-morph-fast-1",
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      id: 0,
      name: "Xtralife Natural Products",
      displayName: "Xtralife",
      tagline: t('brands.xtralife.tagline'),
      description: t('brands.xtralife.desc'),
      logo: "/assets/xtralife-logo.png",
      href: "#/brand/xtralife",
      textColorClass: "text-emerald-500 group-hover:text-emerald-600",
      rgb: "16, 185, 129",
      glassBg: "linear-gradient(135deg, rgba(236, 253, 245, 0.35) 0%, rgba(209, 250, 229, 0.12) 50%, rgba(167, 243, 208, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-emerald-200/50 border-r-emerald-300/35 border-b-emerald-400/25",
      auraClass: "from-emerald-400/25 via-teal-400/15 to-transparent",
      blobAnimateClass: "animate-morph-slow-2 group-hover:animate-morph-fast-2",
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      id: 2,
      name: "Dermclar",
      displayName: "Dermclar",
      tagline: t('brands.dermclar.tagline'),
      description: t('brands.dermclar.desc'),
      logo: "/assets/dermclar-logo.png",
      href: "#/brand/dermclar",
      textColorClass: "text-cyan-500 group-hover:text-cyan-600",
      rgb: "6, 182, 212",
      glassBg: "linear-gradient(135deg, rgba(236, 254, 255, 0.35) 0%, rgba(207, 250, 254, 0.12) 50%, rgba(165, 243, 252, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-cyan-200/50 border-r-cyan-300/35 border-b-cyan-400/25",
      auraClass: "from-cyan-400/25 via-teal-400/15 to-transparent",
      blobAnimateClass: "animate-morph-slow-3 group-hover:animate-morph-fast-3",
      socials: { instagram: "#", tiktok: "#" }
    }
  ];



  return (
    <section 
      id="ecosystem" 
      className="h-[100dvh] min-h-[100dvh] w-full bg-slate-50 relative overflow-hidden flex flex-col justify-between select-none py-4"
    >
      {/* Background Silk-Mesh 3D Organic Folds Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* White silk surface base */}
        <div className="absolute inset-0 bg-[#f8fafc]" />
        
        {/* Soft 3D undulation ambient radial shadows */}
        <div className="absolute inset-0 opacity-[0.45] bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#e2e8f0_0%,transparent_60%),radial-gradient(circle_at_50%_10%,#f1f5f9_0%,transparent_50%)]" />
        
        {/* Stretched soft secondary mesh gradients for volume */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-slate-100/30 filter blur-[90px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-slate-100/40 filter blur-[110px] animate-pulse-slow" style={{ animationDelay: '3s' }} />

        {/* Brand auric glows that float dynamically in the section backdrop */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-100/30 filter blur-[105px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-emerald-100/20 filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        
        {/* Decorative thin mesh grid */}
        <div 
          className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />
        
        {/* Organic wavy line decoration */}
        <div className="absolute inset-0 opacity-[0.025] text-slate-400">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M-100,200 Q200,300 500,150 T1100,250 T1700,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" style={{ animationDuration: '8s' }} />
            <path d="M-50,400 Q300,200 700,500 T1500,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Floating Sleek Glass Header capsule (Occupies 8vh of vertical height) */}
      <div className="relative z-10 h-[8vh] flex items-center justify-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/40 backdrop-blur-md font-bold uppercase tracking-widest text-slate-600 shadow-sm liquid-glass-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Portal de Marcas</span>
        </div>
      </div>

      {/* 3-Column Fluid Grid Layout (Occupies 80vh of vertical height) */}
      <div className="relative z-10 h-[80vh] w-full flex items-center justify-center">
        <motion.div 
          className="w-full max-w-[1700px] h-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-4 lg:gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {defaultBrands.map((brand, i) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
              index={i} 
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Description Footer at the bottom of the section (Occupies 8vh of vertical height) */}
      <div className="relative z-10 h-[8vh] flex items-center justify-center px-6">
        <p className="text-slate-400 font-semibold max-w-xl bg-white/30 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm liquid-glass-footer-text">
          {t('brands.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default BrandPortal;
