import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle2, 
  Maximize2, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  ChevronDown
} from 'lucide-react';
import ImageWithSkeleton from '../../../../components/ui/ImageWithSkeleton';
import ProductSpecs from './ProductSpecs';
import ProductLightbox from './ProductLightbox';

// Import custom application zone icons
import icon1 from '../../../../../assets/iconos/zonas/1.png';
import icon2 from '../../../../../assets/iconos/zonas/2.png';
import icon3 from '../../../../../assets/iconos/zonas/3.png';
import icon4 from '../../../../../assets/iconos/zonas/4.png';
import icon5 from '../../../../../assets/iconos/zonas/5.png';
import icon6 from '../../../../../assets/iconos/zonas/6.png';
import icon7 from '../../../../../assets/iconos/zonas/7.png';
import icon8 from '../../../../../assets/iconos/zonas/8.png';
import icon9 from '../../../../../assets/iconos/zonas/9.png';
import icon10 from '../../../../../assets/iconos/zonas/10.png';
import icon11 from '../../../../../assets/iconos/zonas/11.png';
import icon12 from '../../../../../assets/iconos/zonas/12.png';
import icon13 from '../../../../../assets/iconos/zonas/13.png';
import icon14 from '../../../../../assets/iconos/zonas/14.png';

const zoneIcons = {
  1: icon1, "1": icon1,
  2: icon2, "2": icon2,
  3: icon3, "3": icon3,
  4: icon4, "4": icon4,
  5: icon5, "5": icon5,
  6: icon6, "6": icon6,
  7: icon7, "7": icon7,
  8: icon8, "8": icon8,
  9: icon9, "9": icon9,
  10: icon10, "10": icon10,
  11: icon11, "11": icon11,
  12: icon12, "12": icon12,
  13: icon13, "13": icon13,
  14: icon14, "14": icon14
};

const brandProductZoneIcons = {
  "derm-whitening": [1, 2, 3, 4, 5],
  "derm-firm": [2, 13, 5],
  "derm-plasmavit": [6, 1, 2, 3, 5, 4],
  "derm-sonic": [7, 8, 9, 10, 11, 12],
  "derm-alcachofa": [2, 13, 5],
  "derm-centella": [7, 5, 4, 10],
  "derm-fosfatidilcolina": [7, 10],
  "derm-lcarnitina": [5, 7, 10],
  "derm-silicio": [7, 5, 4, 10, 6, 1],
  "derm-vitaminac": [7, 5, 4, 10, 1],
  "derm-polidocanol": [2]
};

const getZoneIcon = (zoneNameOrId) => {
  if (!zoneNameOrId) return null;
  return zoneIcons[zoneNameOrId] || null;
};

const resolveBrandColor = (accentBg) => {
  if (!accentBg) return '#1a365d';
  if (accentBg.startsWith('bg-[#') && accentBg.endsWith(']')) {
    return accentBg.slice(4, -1);
  }
  if (accentBg === 'bg-emerald-500') return '#10b981';
  return '#1a365d';
};

const defaultSectionsConfig = {
  extendedBenefits: {
    theme: "accent",
    collapsible: true,
    defaultExpanded: false
  },
  ingredients: {
    theme: "normal",
    collapsible: true,
    defaultExpanded: false
  },
  usage: {
    theme: "normal",
    collapsible: true,
    defaultExpanded: false
  },
  precautions: {
    theme: "warning",
    collapsible: true,
    defaultExpanded: false
  }
};

const renderSectionContent = (key, content) => {
  if (key === 'extendedBenefits') {
    const list = Array.isArray(content) ? content : [];
    return (
      <ul className="space-y-3 mt-1.5">
        {list.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-3 text-left">
            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed mt-1 text-left">
      {content}
    </p>
  );
};

const hoverStyles = `
  .product-image-container {
    position: relative;
    overflow: hidden;
  }
  .product-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .product-image-container:hover .product-image {
    transform: scale(1.03);
  }
`;

export const ProductDetail = ({
  activeProduct,
  brand,
  language
}) => {
  const isEs = language === 'es';
  const brandId = brand.id;

  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedSections, setExpandedSections] = useState(() => {
    if (activeProduct) {
      const config = activeProduct.sectionsConfig || defaultSectionsConfig;
      const initialExpanded = {};
      Object.keys(config).forEach(key => {
        initialExpanded[key] = !!config[key]?.defaultExpanded;
      });
      // Initialize default collapsible states for Dermclar
      initialExpanded['dermIngredients'] = true;
      initialExpanded['dermBenefits'] = false;
      initialExpanded['dermUsage'] = false;
      initialExpanded['dermPrecautions'] = false;
      return initialExpanded;
    }
    return {};
  });
  const [lightboxImage, setLightboxImage] = useState(null);
  const videoRef = useRef(null);
  const specsTableRef = useRef(null);

  const activeImage = useMemo(() => {
    if (!activeProduct) return "";
    const item = activeProduct.gallery[activeGalleryIdx] || activeProduct.coverImage;
    return typeof item === 'object' ? item.image : item;
  }, [activeProduct, activeGalleryIdx]);

  const activeVideo = useMemo(() => {
    if (!activeProduct) return null;
    const item = activeProduct.gallery[activeGalleryIdx];
    return (item && typeof item === 'object') ? item.video : null;
  }, [activeProduct, activeGalleryIdx]);

  // Infinite carousel automatic scrolling (only active when not hovered)
  useEffect(() => {
    if (!activeProduct || !activeProduct.gallery || activeProduct.gallery.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveGalleryIdx(prev => (prev === activeProduct.gallery.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [activeProduct, isHovered]);

  // Video hover playback engine
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video playback was interrupted or blocked:", err);
      });
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, activeVideo]);

  const handlePrevGallery = () => {
    if (!activeProduct) return;
    setActiveGalleryIdx(prev => (prev === 0 ? activeProduct.gallery.length - 1 : prev - 1));
  };

  const handleNextGallery = () => {
    if (!activeProduct) return;
    setActiveGalleryIdx(prev => (prev === activeProduct.gallery.length - 1 ? 0 : prev + 1));
  };

  if (!activeProduct) {
    return (
      <div className="w-full h-full min-h-[400px] bg-white rounded-[32px] border border-slate-200/50 flex flex-col items-center justify-center p-10 text-center gap-3 animate-fade-in">
        <span className="text-3xl text-slate-300">📦</span>
        <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-600">
          {isEs ? 'Seleccione un Producto' : 'Select a Product'}
        </h4>
        <p className="text-xs text-slate-400 font-semibold max-w-xs leading-relaxed">
          {isEs 
            ? 'Por favor elija un dispositivo o fórmula del catálogo de la izquierda para visualizar sus especificaciones y credenciales.' 
            : 'Please select a product from the list to view detailed composition parameters.'}
        </p>
      </div>
    );
  }

  const hasCover = activeProduct.coverImage && !activeProduct.coverImage.startsWith('https://placehold.co/');

  return (
    <div
      key={activeProduct.id}
      className="w-full bg-white rounded-[32px] border border-slate-200/50 shadow-sm flex flex-col gap-0 overflow-hidden animate-fade-in-up"
    >
      <style>{hoverStyles}</style>
      
      {/* 1. Header Banner */}
      <div 
        className={`relative w-full rounded-t-[32px] rounded-b-none overflow-hidden pt-20 pb-4 sm:pt-28 sm:pb-6 px-4 sm:px-12 flex flex-row items-end justify-between gap-4 shadow-md bg-cover bg-center ${!hasCover ? `bg-gradient-to-r ${brand.themeGradient}` : ''}`}
        style={hasCover ? {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(248, 250, 252, 0.45)), url(${activeProduct.coverImage})`
        } : {}}
      >
        {!hasCover && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          </>
        )}
        
        {/* Banner Info */}
        <div className="relative z-10 text-left space-y-1.5">
          <span className={`inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest ${hasCover ? 'bg-[#4C5A9D]/10 border border-[#4C5A9D]/20 text-[#4C5A9D]' : 'bg-white/20 border border-white/35 text-white backdrop-blur-md'}`}>
            {activeProduct.certBadge}
          </span>
          {!hasCover && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display tracking-tight leading-none text-white drop-shadow-sm">
              {activeProduct.name}
            </h2>
          )}
        </div>

        {/* Banner CTA Button */}
        <div className="relative z-10 shrink-0">
          <a
            href={`https://wa.me/59133400835?text=Hola%20Maines%20SRL,%20deseo%20información%20sobre%20el%20producto%20${encodeURIComponent(activeProduct.name)}%20de%20la%20marca%20${brand.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[9px] sm:text-xs font-extrabold bg-[#0d1f3b] text-white hover:bg-[#1a365d] active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>{isEs ? 'Ordenar Ahora' : 'Order Now'}</span>
            <Send className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </a>
        </div>
      </div>

      {/* Details Padded Content Wrapper */}
      <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-10">

        {/* 2. Main Showcase Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Showcase Left: Glitch Image Box & Mini Gallery */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div 
              onClick={() => setLightboxImage(activeImage)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
              onTouchCancel={() => setIsHovered(false)}
              className="product-image-container aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200/50 p-0 flex items-center justify-center cursor-zoom-in relative group/image shadow-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-white/50 opacity-40 pointer-events-none" />
              
              <ImageWithSkeleton src={activeImage} alt={activeProduct.name} className="product-image" />

              {activeVideo && (
                <video
                  ref={videoRef}
                  src={activeVideo}
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover bg-white rounded-2xl transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: isHovered ? 1 : 0, zIndex: isHovered ? 20 : 0 }}
                />
              )}

              {activeProduct.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevGallery(); }}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200/50 flex items-center justify-center text-primary-dark hover:scale-105 active:scale-95 opacity-0 group-hover/image:opacity-100 transition-all shadow-sm focus:outline-none cursor-pointer z-[25]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextGallery(); }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200/50 flex items-center justify-center text-primary-dark hover:scale-105 active:scale-95 opacity-0 group-hover/image:opacity-100 transition-all shadow-sm focus:outline-none cursor-pointer z-[25]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="absolute right-3 bottom-3 p-2 rounded-xl bg-white/90 border border-slate-100 text-slate-500 opacity-0 group-hover/image:opacity-100 transition-opacity shadow-sm pointer-events-none z-[25]">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <span className="absolute left-3 bottom-3 px-2 py-0.5 bg-slate-900/50 text-[8px] font-extrabold text-white uppercase tracking-wider rounded-md backdrop-blur-xs z-[25]">
                {activeProduct.certBadge}
              </span>
            </div>

            {/* Progressive video preloader pipeline */}
            <div className="hidden">
              {activeProduct.gallery.map((item, idx) => {
                if (item && typeof item === 'object' && item.video) {
                  return (
                    <video key={idx} src={item.video} preload="none" muted />
                  );
                }
                return null;
              })}
            </div>

            {/* Mini thumbnails selection list */}
            {activeProduct.gallery.length > 1 && (
              <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar">
                {activeProduct.gallery.map((img, idx) => {
                  const isThumbSelected = idx === activeGalleryIdx;
                  const thumbSrc = typeof img === 'object' ? img.image : img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIdx(idx)}
                      className="w-12 h-12 rounded-xl border-2 bg-white flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer"
                      style={{
                        borderColor: isThumbSelected ? resolveBrandColor(brand.accentBg) : '#e2e8f0'
                      }}
                    >
                      <ImageWithSkeleton src={thumbSrc} alt={`Thumb ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Showcase Right: Specs Description */}
          <div className="md:col-span-7 flex flex-col text-left justify-between h-full gap-6">
            <div className="space-y-4">
              {/* Upper category and attributes tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: resolveBrandColor(brand.accentBg) }}>
                  {activeProduct.categoryLabel?.[isEs ? 'es' : 'en'] || activeProduct.category}
                </span>
                {brandId !== 'dermclar' && activeProduct.tags && activeProduct.tags.length > 0 && (
                  <>
                    <span className="text-[9px] font-bold text-slate-300 select-none">•</span>
                    {activeProduct.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </div>

              {/* Interactive Sanitary Registry Button */}
              {activeProduct.regulatory && (
                <div className="pt-0.5">
                  {activeProduct.regulatory.isClickable !== false && activeProduct.regulatory.hasRegistroSanitario !== false ? (
                    <a
                      href={activeProduct.regulatory.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#edf2f7] hover:bg-[#e2e8f0] text-[#2d3748] border border-[#cbd5e0] transition-all duration-200 cursor-pointer shadow-xs w-fit"
                    >
                      <ShieldCheck className="w-4 h-4" style={{ color: resolveBrandColor(brand.accentBg) }} />
                      <span>{activeProduct.regulatory.label || (isEs ? "Ver Registro Sanitario Oficial" : "View Official Sanitary Registry")}</span>
                    </a>
                  ) : (
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all duration-200 shadow-xs w-fit"
                      style={{
                        backgroundColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(74, 85, 104, 0.08)',
                        borderColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(74, 85, 104, 0.2)',
                        borderWidth: '1px',
                        color: brandId === 'dermclar' ? '#0ea5e9' : '#4a5568'
                      }}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 h-4 shrink-0" style={{ color: brandId === 'dermclar' ? '#0ea5e9' : undefined }} />
                      <span>{activeProduct.regulatory.label}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Product Title */}
              <div className="flex items-center flex-wrap gap-3">
                <h3 className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight leading-tight bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent inline-block`}>
                  {activeProduct.displayName}
                </h3>
                {activeProduct.isNew && (
                  <span className={`${brand.accentBg} text-white text-xs font-bold px-2 py-1 uppercase rounded-sm tracking-widest ml-3 shadow-xs`}>
                    {isEs ? 'Nuevo' : 'New'}
                  </span>
                )}
              </div>

              {brandId === 'dermclar' ? (
                <div className="space-y-6 pt-2">
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                    {activeProduct.description}
                  </p>

                  {activeProduct.applicationZones && activeProduct.applicationZones.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-[#0ea5e9] uppercase">
                        {isEs ? 'Zonas de Aplicación' : 'Application Zones'}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {(brandProductZoneIcons[activeProduct.id] || []).map((iconId) => {
                          const icon = getZoneIcon(iconId);
                          return icon ? (
                            <div 
                              key={iconId} 
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50 hover:scale-105 hover:border-[#0ea5e9]/45 hover:shadow-md transition-all duration-300 flex items-center justify-center p-1.5 cursor-default shadow-xs"
                              title={`${isEs ? 'Zona' : 'Zone'} ${iconId}`}
                            >
                              <img 
                                src={icon} 
                                alt="" 
                                className="w-full h-full object-contain shrink-0 filter brightness-100" 
                              />
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {activeProduct.shortDescription ? (
                    <div className="space-y-6 text-left pt-2 pb-4">
                      <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                        {activeProduct.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2.5 py-1">
                        {activeProduct.presentation && (
                          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200/50 text-emerald-700 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>
                              {isEs ? 'Presentación: ' : 'Presentation: '}
                              {activeProduct.presentation}
                            </span>
                          </div>
                        )}
                        {activeProduct.dosage && (
                          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-bold bg-teal-50 border border-teal-200/50 text-teal-700 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                            <span>
                              {isEs ? 'Dosis: ' : 'Dosage: '}
                              {activeProduct.dosage}
                            </span>
                          </div>
                        )}
                      </div>

                      {activeProduct.catalogBenefits && activeProduct.catalogBenefits.length > 0 && (
                        <div className="space-y-3 pt-2 border-t border-slate-100/60">
                          <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/45 uppercase block">
                            {isEs ? 'Beneficios' : 'Benefits'}
                          </span>
                          <ul className="space-y-3">
                            {activeProduct.catalogBenefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="shrink-0 mt-0.5" style={{ color: resolveBrandColor(brand.accentBg) }}>
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <span className="text-sm sm:text-[15px] text-slate-800 font-extrabold leading-relaxed">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {activeProduct.slogan && (
                        <div className="py-1 px-4 border-l-2 bg-slate-50/50 rounded-r-xl" style={{ borderLeftColor: resolveBrandColor(brand.accentBg) }}>
                          <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                            "{activeProduct.slogan}"
                          </p>
                        </div>
                      )}

                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {activeProduct.description}
                      </p>

                      {activeProduct.clinicalBenefits && activeProduct.clinicalBenefits.length > 0 && (
                        <div className="pt-3 space-y-3">
                          <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
                            {isEs ? 'Beneficios Clínicos' : 'Clinical Benefits'}
                          </span>
                          <ul className="space-y-2.5">
                            {activeProduct.clinicalBenefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <div className="shrink-0 mt-0.5" style={{ color: resolveBrandColor(brand.accentBg) }}>
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5 text-left">
                                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                                    {benefit.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    {benefit.detail}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {activeProduct.activeIngredients && (
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
                        {isEs ? 'Principios Activos' : 'Active Ingredients'}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-bold">
                        {activeProduct.activeIngredients}
                      </p>
                    </div>
                  )}

                  {activeProduct.applicationZones && activeProduct.applicationZones.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
                        {isEs ? 'Zonas de Aplicación' : 'Application Zones'}
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {brandId === 'dermclar' ? (
                          (brandProductZoneIcons[activeProduct.id] || []).map((iconId) => {
                            const icon = getZoneIcon(iconId);
                            return icon ? (
                              <div 
                                key={iconId} 
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-1 cursor-default shadow-xs"
                                title={`${isEs ? 'Zona' : 'Zone'} ${iconId}`}
                              >
                                <img 
                                  src={icon} 
                                  alt="" 
                                  className="w-full h-full object-contain shrink-0 filter brightness-100" 
                                />
                              </div>
                            ) : null;
                          })
                        ) : (
                          activeProduct.applicationZones.map((zone, idx) => {
                            const icon = getZoneIcon(zone);
                            return (
                              <span 
                                key={idx} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors duration-200 cursor-default shadow-xs"
                                style={{
                                  backgroundColor: `rgba(${brandId === 'jetema' ? '76, 90, 157' : '14, 165, 233'}, 0.08)`,
                                  borderColor: `rgba(${brandId === 'jetema' ? '76, 90, 157' : '14, 165, 233'}, 0.25)`,
                                  color: brandId === 'jetema' ? '#4C5A9D' : '#0ea5e9'
                                }}
                              >
                                {icon && (
                                  <img 
                                    src={icon} 
                                    alt="" 
                                    className="w-3.5 h-3.5 object-contain shrink-0 filter brightness-100" 
                                  />
                                )}
                                <span>{zone}</span>
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {brandId === 'xtralife' && !activeProduct.shortDescription && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {activeProduct.presentation && (
                    <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block mb-1">
                        {isEs ? 'Presentación' : 'Presentation'}
                      </span>
                      <p className="text-sm text-emerald-800 font-extrabold">
                        {activeProduct.presentation}
                      </p>
                    </div>
                  )}
                  {activeProduct.dosage && (
                    <div className="bg-teal-50/50 border border-teal-100/60 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block mb-1">
                        {isEs ? 'Dosis Recomendada' : 'Recommended Dosage'}
                      </span>
                      <p className="text-sm text-teal-800 font-extrabold">
                        {activeProduct.dosage}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2.4. Full-Width Rich Details for Xtralife */}
        {brandId === 'xtralife' && activeProduct.shortDescription && (
          <ProductSpecs
            brandId={brandId}
            activeProduct={activeProduct}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            defaultSectionsConfig={defaultSectionsConfig}
            renderSectionContent={renderSectionContent}
            isEs={isEs}
          />
        )}

        {/* 2.5. Full-Width Clinical Details for Dermclar */}
        {brandId === 'dermclar' && (
          <div className="border-t border-slate-100 pt-8 text-left space-y-2">
            {(activeProduct.activeIngredientsList || activeProduct.activeIngredientsDetails || activeProduct.activeIngredients) && (() => {
              const isExpanded = !!expandedSections['dermIngredients'];
              return (
                <div className="py-4 border-b border-slate-100/60 animate-fade-in">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, dermIngredients: !prev.dermIngredients }))}
                    className="w-full flex items-center justify-between transition-colors text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0ea5e9] hover:text-[#0284c7]">
                      {isEs ? 'Principios Activos' : 'Active Ingredients'}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 text-slate-400 group-hover:text-slate-600 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out overflow-hidden ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 pb-1">
                        {activeProduct.activeIngredientsList ? (
                          <ul className="space-y-3 text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                            {activeProduct.activeIngredientsList.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-2" />
                                <span>
                                  <strong className="font-extrabold text-slate-800" style={{ color: resolveBrandColor(brand.accentBg) }}>{item.name}</strong>: {item.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                            {activeProduct.activeIngredientsDetails || activeProduct.activeIngredients}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {((activeProduct.benefits && activeProduct.benefits.length > 0) || (activeProduct.clinicalBenefits && activeProduct.clinicalBenefits.length > 0)) && (() => {
              const isExpanded = !!expandedSections['dermBenefits'];
              return (
                <div className="py-4 border-b border-slate-100/60 animate-fade-in">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, dermBenefits: !prev.dermBenefits }))}
                    className="w-full flex items-center justify-between transition-colors text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0ea5e9] hover:text-[#0284c7]">
                      {isEs ? 'Beneficios' : 'Benefits'}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 text-slate-400 group-hover:text-slate-600 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out overflow-hidden ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 pb-1">
                        <ul className="space-y-3 text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                          {activeProduct.benefits ? (
                            activeProduct.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-2" />
                                <span>{benefit}</span>
                              </li>
                            ))
                          ) : (
                            activeProduct.clinicalBenefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-2" />
                                <span>{benefit.title}: {benefit.detail}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeProduct.usageIndications && activeProduct.usageIndications.length > 0 && (() => {
              const isExpanded = !!expandedSections['dermUsage'];
              return (
                <div className="py-4 border-b border-slate-100/60 animate-fade-in">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, dermUsage: !prev.dermUsage }))}
                    className="w-full flex items-center justify-between transition-colors text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0ea5e9] hover:text-[#0284c7]">
                      {isEs ? 'Indicaciones y Modo de Uso' : 'Indications & Usage'}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 text-slate-400 group-hover:text-slate-600 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out overflow-hidden ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 pb-1">
                        <ul className="space-y-3 text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                          {activeProduct.usageIndications.map((ind, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-2" />
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeProduct.contraindications && activeProduct.contraindications.length > 0 && (() => {
              const isExpanded = !!expandedSections['dermPrecautions'];
              return (
                <div className="py-4 border-b border-slate-100/60 animate-fade-in">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, dermPrecautions: !prev.dermPrecautions }))}
                    className="w-full flex items-center justify-between transition-colors text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-600 hover:text-amber-700">
                      {isEs ? 'Advertencias y Contraindicaciones' : 'Warnings & Contraindications'}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 text-amber-600 group-hover:text-amber-700 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out overflow-hidden ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 pb-1">
                        <div className="pl-4 border-l-2 border-amber-500/60 bg-amber-500/[0.02] py-1 rounded-r-xl">
                          <ul className="space-y-3 text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                            {activeProduct.contraindications.map((contra, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0 mt-2" />
                                <span>{contra}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 3. Technical Specifications Table or Grid */}
        {activeProduct.technicalSpecs && (
          <div ref={specsTableRef} className="border-t border-slate-100 pt-8 text-left space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: resolveBrandColor(brand.accentBg) }}>
                <FileText className="w-4 h-4" />
              </div>
              <h4 className={`text-lg sm:text-xl font-extrabold font-display tracking-tight bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent inline-block`}>
                {isEs ? 'Especificaciones Técnicas' : 'Technical Specifications'}
              </h4>
            </div>

            {brandId !== 'jetema' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProduct.specifications.map((spec, idx) => (
                  <div 
                    key={idx} 
                    className="border rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xs"
                    style={{
                      backgroundColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.03)' : 'rgba(248, 250, 252, 0.5)',
                      borderColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.12)' : 'rgba(226, 232, 240, 0.6)'
                    }}
                  >
                    <span 
                      className="text-[10px] font-extrabold tracking-widest uppercase block mb-1"
                      style={{ color: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.8)' : 'rgba(13, 31, 59, 0.4)' }}
                    >
                      {spec.label}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
                      {spec.value}
                    </p>
                  </div>
                ))}
                {activeProduct.applicationAreas && activeProduct.applicationAreas.length > 0 && (
                  <div 
                    className="border rounded-2xl p-4 sm:col-span-2 flex flex-col justify-between"
                    style={{
                      backgroundColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.03)' : 'rgba(248, 250, 252, 0.5)',
                      borderColor: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.12)' : 'rgba(226, 232, 240, 0.6)'
                    }}
                  >
                    <span 
                      className="text-[10px] font-extrabold tracking-widest uppercase block mb-1.5"
                      style={{ color: brandId === 'dermclar' ? 'rgba(14, 165, 233, 0.8)' : 'rgba(13, 31, 59, 0.4)' }}
                    >
                      {isEs ? 'Áreas de Aplicación' : 'Application Areas'}
                    </span>
                    <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {activeProduct.applicationAreas.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full overflow-hidden border border-slate-200/60 rounded-2xl shadow-sm">
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-5 py-3 text-left w-1/3 font-bold">{isEs ? 'PARÁMETRO' : 'PARAMETER'}</th>
                      <th className="px-5 py-3 text-left font-bold">{isEs ? 'ESPECIFICACIÓN' : 'SPECIFICATION'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    {activeProduct.specifications.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition-colors duration-150">
                        <td className="px-5 py-3 font-semibold text-primary-dark">{spec.label}</td>
                        <td className="px-5 py-3">{spec.value}</td>
                      </tr>
                    ))}
                    {activeProduct.applicationAreas && activeProduct.applicationAreas.length > 0 && (
                      <tr className="hover:bg-slate-50/40 transition-colors duration-150">
                        <td className="px-5 py-3 font-semibold text-primary-dark">{isEs ? 'Áreas de Aplicación' : 'Application Areas'}</td>
                        <td className="px-5 py-3">
                          <ul className="list-disc list-inside space-y-0.5">
                            {activeProduct.applicationAreas.map((area, i) => (
                              <li key={i}>{area}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      
      <ProductLightbox
        lightboxImage={lightboxImage}
        setLightboxImage={setLightboxImage}
        activeVideo={activeVideo}
      />
    </div>
  );
};

export default ProductDetail;
