import { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand, index }) => {
  const hoverRotateClass = index === 0 
    ? 'hover:-rotate-[1.5deg]' 
    : index === 2 
      ? 'hover:rotate-[1.5deg]' 
      : '';

  const blobShapeClass = index === 0 
    ? 'liquid-glass-blob-1' 
    : index === 1 
      ? 'liquid-glass-blob-2' 
      : 'liquid-glass-blob-3';

  const bubbleShapeClass = index === 0
    ? 'rounded-[45%_55%_60%_40%_/_50%_45%_55%_50%]'
    : index === 1
      ? 'rounded-[55%_45%_40%_60%_/_40%_55%_45%_60%]'
      : 'rounded-[50%_50%_55%_45%_/_45%_50%_50%_55%]';

  return (
    <div
      className={`flex flex-col items-center justify-center relative select-none transition-all duration-600 cubic-bezier(0.16, 1, 0.3, 1) group-hover/portal:opacity-40 hover:!opacity-100 hover:scale-[1.04] ${hoverRotateClass} group/card`}
    >
      {/* Blob & Aura Container */}
      <Link 
        to={`/${brand.key}`}
        className="relative liquid-glass-size flex items-center justify-center cursor-pointer"
      >
        <div 
          className={`absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr ${brand.auraClass} filter blur-[40px] opacity-20 transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:translate-x-1.5 group-hover/card:-translate-y-1.5 group-hover/card:opacity-60`}
        />

        <div 
          className={`absolute inset-0 border backdrop-blur-[8px] transition-all duration-600 ease-out ${blobShapeClass} liquid-glass-shadow ${brand.borderColor}`}
          style={{
            background: brand.glassBg,
            '--shadow-rgb': brand.rgb
          }}
        />

        <div 
          className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full liquid-glass-content transition-transform duration-500 group-hover/card:scale-[1.02] group-hover/card:-translate-y-1"
        >
          <div className="w-full flex items-center justify-center liquid-glass-logo">
            <img 
              src={brand.logo} 
              alt={`${brand.displayName} Logo`} 
              width="220"
              height="70"
              loading="lazy"
              className="max-w-[75%] lg:max-w-[65%] max-h-full object-contain filter drop-shadow-sm select-none opacity-85 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500" 
            />
          </div>

          <h3 className="font-extrabold text-slate-800 font-display tracking-tight transition-colors duration-300 group-hover/card:text-slate-900 liquid-glass-title">
            {brand.displayName}
          </h3>

          <span className={`font-extrabold uppercase transition-colors duration-300 ${brand.textColorClass} liquid-glass-tagline`}>
            {brand.tagline}
          </span>

          <p className="text-slate-500 font-medium transition-colors duration-300 group-hover/card:text-slate-600 liquid-glass-desc hidden lg:block">
            {brand.description}
          </p>
        </div>

        {index === 0 && (
          <div 
            className={`absolute border border-white/50 pointer-events-none animate-bobbing-1 liquid-glass-secondary-bubble ${bubbleShapeClass}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(255,255,255,0.35), 0 10px 20px rgba(26,54,93,0.03)',
              left: 'calc(var(--bubble-size) * -0.06)',
              top: '25%',
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}

        {index === 1 && (
          <div 
            className={`absolute border border-white/50 pointer-events-none animate-bobbing-2 liquid-glass-secondary-bubble ${bubbleShapeClass}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 5px 8px rgba(255,255,255,0.65), inset 0 -2px 4px rgba(255,255,255,0.35), 0 8px 16px rgba(26,54,93,0.03)',
              right: 'calc(var(--bubble-size) * -0.04)',
              top: '33%',
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}

        {index === 2 && (
          <div 
            className={`absolute border border-white/50 pointer-events-none animate-bobbing-3 liquid-glass-secondary-bubble ${bubbleShapeClass}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(255,255,255,0.35), 0 10px 20px rgba(26,54,93,0.03)',
              right: 'calc(var(--bubble-size) * -0.06)',
              bottom: '25%',
            }}
          >
            <div className="absolute rounded-[50%] bg-gradient-to-b from-white/70 to-transparent -rotate-[15deg] blur-[0.5px]" style={{ top: '6%', left: '12%', width: '50%', height: '20%' }} />
          </div>
        )}
      </Link>
    </div>
  );
};

const BrandPortal = () => {
  const { t } = useLanguage();

  const defaultBrands = useMemo(() => [
    {
      id: 1,
      key: "jetema",
      name: "Jetema",
      displayName: "Jetema",
      tagline: t('brands.jetema.tagline'),
      description: t('brands.jetema.desc'),
      logo: "/assets/JETEMA-logo.png",
      href: "/jetema",
      textColorClass: "text-blue-500 group-hover/card:text-blue-600",
      rgb: "59, 130, 246",
      glassBg: "linear-gradient(135deg, rgba(239, 246, 255, 0.35) 0%, rgba(219, 234, 254, 0.12) 50%, rgba(191, 219, 254, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-blue-200/50 border-r-blue-300/35 border-b-blue-400/25",
      auraClass: "from-blue-400/25 via-indigo-400/15 to-transparent",
    },
    {
      id: 0,
      key: "xtralife",
      name: "Xtralife Natural Products",
      displayName: "Xtralife",
      tagline: t('brands.xtralife.tagline'),
      description: t('brands.xtralife.desc'),
      logo: "/assets/xtralife-logo.png",
      href: "/xtralife",
      textColorClass: "text-emerald-500 group-hover/card:text-emerald-600",
      rgb: "16, 185, 129",
      glassBg: "linear-gradient(135deg, rgba(236, 253, 245, 0.35) 0%, rgba(209, 250, 229, 0.12) 50%, rgba(167, 243, 208, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-emerald-200/50 border-r-emerald-300/35 border-b-emerald-400/25",
      auraClass: "from-emerald-400/25 via-teal-400/15 to-transparent",
    },
    {
      id: 2,
      key: "dermclar",
      name: "Dermclar",
      displayName: "Dermclar",
      tagline: t('brands.dermclar.tagline'),
      description: t('brands.dermclar.desc'),
      logo: "/assets/dermclar-logo.png",
      href: "/dermclar",
      textColorClass: "text-cyan-500 group-hover/card:text-cyan-600",
      rgb: "6, 182, 212",
      glassBg: "linear-gradient(135deg, rgba(236, 254, 255, 0.35) 0%, rgba(207, 250, 254, 0.12) 50%, rgba(165, 243, 252, 0.28) 100%)",
      borderColor: "border-t-white/80 border-l-cyan-200/50 border-r-cyan-300/35 border-b-cyan-400/25",
      auraClass: "from-cyan-400/25 via-teal-400/15 to-transparent",
    }
  ], [t]);

  const [shuffledKeys] = useState(() => {
    const keys = ["jetema", "xtralife", "dermclar"];
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    return keys;
  });

  const orderedBrands = useMemo(() => 
    shuffledKeys.map(key => defaultBrands.find(b => b.key === key)),
    [shuffledKeys, defaultBrands]
  );

  return (
    <section 
      id="ecosystem" 
      className="h-[100dvh] min-h-[100dvh] w-full bg-slate-50 relative overflow-hidden flex flex-col justify-between select-none py-4"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#f8fafc]" />
        
        <div className="absolute inset-0 opacity-[0.45] bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#e2e8f0_0%,transparent_60%),radial-gradient(circle_at_50%_10%,#f1f5f9_0%,transparent_50%)]" />
        
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-slate-100/30 filter blur-[90px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-slate-100/40 filter blur-[110px] animate-pulse-slow" style={{ animationDelay: '3s' }} />

        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-100/30 filter blur-[105px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-emerald-100/20 filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        
        <div 
          className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />
        
        <div className="absolute inset-0 opacity-[0.025] text-slate-400">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M-100,200 Q200,300 500,150 T1100,250 T1700,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" style={{ animationDuration: '8s' }} />
            <path d="M-50,400 Q300,200 700,500 T1500,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 h-[8vh] flex items-center justify-center px-6">
        <h2 className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/40 backdrop-blur-md font-bold uppercase tracking-widest text-slate-600 shadow-sm liquid-glass-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span>{t('brands.portalBadge')}</span>
        </h2>
      </div>

      <div className="relative z-10 h-[80vh] w-full flex items-center justify-center">
        <div className="w-full max-w-[1700px] h-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-4 lg:gap-8 items-stretch group/portal">
          {orderedBrands.map((brand, i) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
              index={i} 
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-[8vh] flex items-center justify-center px-6">
        <p className="text-slate-400 font-semibold max-w-xl bg-white/30 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm liquid-glass-footer-text text-center">
          {t('brands.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default BrandPortal;
