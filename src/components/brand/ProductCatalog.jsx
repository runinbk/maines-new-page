import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Maximize2, 
  X, 
  ChevronLeft,
  ShieldCheck 
} from 'lucide-react';
import jetemaProducts from '../../data/jetemaProducts.json';

// Import custom application zone icons
import zonaRostro from '../../../assets/iconos/zonas/zona-rostro.png';
import zonaCuello from '../../../assets/iconos/zonas/zona-cuello.png';
import zonaEscote from '../../../assets/iconos/zonas/zona-escote.png';
import zonaAbdomen from '../../../assets/iconos/zonas/zona-abdomen.png';
import zonaGluteos from '../../../assets/iconos/zonas/zona-gluteos.png';
import zonaPiernas from '../../../assets/iconos/zonas/zona-piernas.png';
import zonaBrazos from '../../../assets/iconos/zonas/zona-brazos.png';
import zonaManos from '../../../assets/iconos/zonas/zona-manos.png';
import zonaCintura from '../../../assets/iconos/zonas/zona-cintura.png';
import zonaFlancos from '../../../assets/iconos/zonas/zona-flancos.png';
import zonaPapada from '../../../assets/iconos/zonas/zona-papada.png';
import zonaCuerpo from '../../../assets/iconos/zonas/zona-cuerpo.png';

const zoneIcons = {
  "Rostro": zonaRostro,
  "Cuello": zonaCuello,
  "Escote": zonaEscote,
  "Abdomen": zonaAbdomen,
  "Glúteos": zonaGluteos,
  "Piernas": zonaPiernas,
  "Brazos": zonaBrazos,
  "Manos": zonaManos,
  "Cintura": zonaCintura,
  "Flancos": zonaFlancos,
  "Papada": zonaPapada,
  "Cuerpo": zonaCuerpo
};

const getZoneIcon = (zoneName) => {
  if (!zoneName) return null;
  return zoneIcons[zoneName] || zoneIcons[zoneName.trim()] || null;
};

// Clean Premium Hover Zoom Effect Styles
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

// Helper to resolve placehold.co images based on brand properties
const getPlaceholdImg = (text, brandId, width = 600, height = 600) => {
  const cleanText = encodeURIComponent(text);
  const colors = {
    jetema: { bg: 'EAF0F6', fg: '4C5A9D' },
    dermclar: { bg: 'F5F3FF', fg: '8B5CF6' },
    xtralife: { bg: 'ECFDF5', fg: '10B981' }
  };
  const theme = colors[brandId] || { bg: 'F1F5F9', fg: '0F172A' };
  return `https://placehold.co/${width}x${height}/${theme.bg}/${theme.fg}?text=${cleanText}`;
};

// Helper to resolve Tailwind hex background color classes to hex/CSS values for inline styles
const resolveBrandColor = (accentBg) => {
  if (!accentBg) return '#1a365d';
  if (accentBg.startsWith('bg-[#') && accentBg.endsWith(']')) {
    return accentBg.slice(4, -1); // returns '#4C5A9D'
  }
  if (accentBg === 'bg-emerald-500') return '#10b981';
  return '#1a365d';
};

// Helper to get the first gallery image (non-cover) as the product list thumbnail
const getProductThumbnail = (prod) => {
  if (prod && prod.gallery && prod.gallery.length > 0) {
    const item = prod.gallery[0];
    return typeof item === 'object' ? item.image : item;
  }
  return prod.coverImage;
};

/**
 * ProductCatalog Component
 * @param {Object} props
 * @param {Object} props.brand - Parent brand config
 * @param {string} props.language - Active language ('es' | 'en')
 * @param {string} props.selectedProductId - The currently active selected product
 * @param {function} props.onSelectProduct - Callback when a new product is selected
 */
const ProductCatalog = ({ brand, language, selectedProductId, onSelectProduct }) => {
  const isEs = language === 'es';
  const brandId = brand.id;

  // 1. Data Normalization & Flattening Engine
  const normalizedProducts = useMemo(() => {
    if (brandId === 'jetema') {
      const list = [];
      jetemaProducts.forEach(prod => {
        const categoryMapped = prod.category === 'toxinas' ? 'toxins' : prod.category === 'skinboosters' ? 'skinboosters' : prod.category === 'rellenos' ? 'fillers' : prod.category;
        const categoryLabel = prod.category === 'toxinas' 
          ? { es: "Toxina Botulínica", en: "Botulinum Toxin" } 
          : prod.category === 'skinboosters' 
            ? { es: "Skinboosters & Exosomas", en: "Skinboosters & Exosomes" } 
            : prod.category === 'rellenos'
              ? { es: "Rellenos Dérmicos", en: "Dermal Fillers" }
              : { es: prod.category, en: prod.category };

        // Determine certBadge
        const certBadge = prod.id === 'toxta' 
          ? 'FDA Approved' 
          : prod.id.startsWith('eptq') 
            ? 'CE Certified' 
            : 'CE Certified / 100% Vegan';

        // Map gallery
        let gallery;
        if (prod.assets?.gallery) {
          gallery = prod.assets.gallery;
        } else if (prod.assets?.hoverGlitchVideo) {
          // e.p.t.q. style with hover video
          gallery = [{
            image: prod.assets.galleryImages?.[0] || prod.assets.coverImage,
            video: prod.assets.hoverGlitchVideo
          }];
        } else if (prod.assets?.galleryImages) {
          gallery = prod.assets.galleryImages;
        } else {
          gallery = [
            getPlaceholdImg(`${prod.name.split(' ')[0]} Vial`, 'jetema', 600, 600),
            getPlaceholdImg(`${prod.name.split(' ')[0]} Packaging`, 'jetema', 600, 600)
          ];
        }

        // Map clinicalInsights
        let clinicalInsights = [];
        if (prod.id === 'toxta') {
          clinicalInsights = [
            { title: isEs ? "Técnica de Aplicación" : "Application Technique", label: isEs ? "Video Tutorial" : "Video Tutorial", type: "video" },
            { title: isEs ? "Resultados Clínicos" : "Patient Clinical Outcomes", label: isEs ? "Casos Médicos" : "Case Study", type: "cases" },
            { title: isEs ? "Análisis de Inmunogenicidad" : "Immunogenicity Report", label: isEs ? "Dosier Científico" : "Scientific Dossier", type: "dossier" }
          ];
        } else if (prod.id === 'exolution') {
          clinicalInsights = [
            { title: isEs ? "Protocolo Regenerativo" : "Regenerative Protocol", label: isEs ? "Guía Clínica" : "Clinical Guide", type: "video" },
            { title: isEs ? "Evidencia Antinflamatoria" : "Anti-inflammatory Action", label: isEs ? "Estudio Científico" : "Efficacy Study", type: "cases" },
            { title: isEs ? "Tecnología Penta-Exo" : "Penta-Exo Cellular Science", label: isEs ? "Ficha Técnica" : "Safety Dossier", type: "dossier" }
          ];
        } else if (prod.id.startsWith('eptq')) {
          const densityLabel = prod.id === 'eptq-s100' 
            ? (isEs ? "Perfilamiento de Labios" : "Lips Profiling") 
            : prod.id === 'eptq-s300' 
              ? (isEs ? "Técnica de Aumento" : "Augmentation Technique") 
              : (isEs ? "Proyección Estructural" : "Structural Projection");
          clinicalInsights = [
            { title: densityLabel, label: isEs ? "Video de Aplicación" : "Application Video", type: "video" },
            { title: isEs ? "Resultados Clínicos" : "Patient Results", label: isEs ? "Caso Clínico" : "Case Study", type: "cases" },
            { title: isEs ? "Dosier de Seguridad ZEEP" : "ZEEP Purity Dossier", label: isEs ? "Ficha Técnica" : "Safety Dossier", type: "dossier" }
          ];
        }

        list.push({
          id: prod.id,
          name: prod.name,
          displayName: prod.name.replace('®', ''),
          subtitle: prod.subtitle,
          descriptor: prod.subtitle,
          category: categoryMapped,
          categoryLabel: categoryLabel,
          tags: prod.tags || [],
          slogan: prod.slogan,
          description: prod.description,
          composition: prod.description,
          coverImage: prod.assets?.coverImage || getPlaceholdImg(prod.name.split(' ')[0], 'jetema', 600, 600),
          gallery: gallery,
          certBadge: certBadge,
          specifications: prod.specifications || [],
          technicalSpecs: (prod.specifications && prod.specifications.length > 0) ? prod.specifications : null,
          applicationAreas: prod.applicationAreas || [],
          regulatory: prod.regulatory || null,
          clinicalBenefits: prod.clinicalBenefits || null,
          clinicalInsights: clinicalInsights,
          isNew: prod.isNew || false
        });
      });
      console.log("Normalized Products for Jetema:", list);
      return list;
    } else {
      // Dermclar & Xtralife
      const rawProducts = brand.products || [];
      const resolveTranslation = (val) => {
        if (!val) return '';
        if (typeof val === 'object') {
          return val[isEs ? 'es' : 'en'] || val['es'] || '';
        }
        return val;
      };

      return rawProducts.map(prod => {
        const catLabel = prod.categoryLabel?.[isEs ? 'es' : 'en'] || prod.category;
        const mainImage = prod.assets?.coverImage || prod.coverImage || prod.image || getPlaceholdImg(prod.name, brandId, 600, 600);
        const descResolved = resolveTranslation(prod.description) || resolveTranslation(prod.composition);
        const presResolved = resolveTranslation(prod.presentation);
        const doseResolved = resolveTranslation(prod.dosage);

        let gallery;
        if (prod.assets?.gallery) {
          gallery = prod.assets.gallery.map(item => {
            if (typeof item === 'object') {
              return item.image || item.url || '';
            }
            return item;
          }).filter(Boolean);
        } else if (prod.gallery) {
          gallery = prod.gallery.map(item => {
            if (typeof item === 'object') {
              return item.image || item.url || '';
            }
            return item;
          }).filter(Boolean);
        } else {
          gallery = [mainImage];
        }

        const resolvedSubtitle = prod.subtitle || prod.descriptor || catLabel;

        return {
          id: prod.id,
          name: prod.name,
          displayName: prod.name,
          subtitle: resolvedSubtitle,
          descriptor: resolvedSubtitle,
          category: prod.category,
          categoryLabel: prod.categoryLabel || { es: catLabel, en: catLabel },
          tags: prod.tags || (brandId === 'xtralife' ? (presResolved ? [presResolved, doseResolved] : []) : prod.applicationZones) || (prod.category === 'facial' ? ["DMAE", "Ácido Hialurónico", "Firmeza"] : prod.category === 'capilar' ? ["Biotina", "Pantenol", "Anticaída"] : prod.category === 'immunity' ? ["Refuerzo Inmune", "Vitamina C", "Antioxidante"] : ["Colágeno", "Articulaciones", "MSM"]),
          slogan: prod.slogan || (brandId === 'xtralife' ? (isEs ? "Nutrición premium para tu salud diaria." : "Premium nutrition for your daily health.") : (isEs ? "Fórmula científica de máxima eficacia biológica." : "Scientific formula with maximum biological efficacy.")),
          description: descResolved,
          composition: descResolved,
          coverImage: mainImage,
          gallery: gallery,
          certBadge: prod.certBadge || (brandId === 'xtralife' ? "MADE IN USA • GMP" : "AGEMED Approved"),
          specifications: prod.specifications || [],
          technicalSpecs: (prod.specifications && prod.specifications.length > 0) ? prod.specifications : null,
          activeIngredients: prod.activeIngredients || null,
          applicationZones: prod.applicationZones || null,
          presentation: presResolved || null,
          dosage: doseResolved || null,
          applicationAreas: prod.applicationAreas || prod.applicationZones || (prod.specifications && prod.specifications.find(s => s.label.includes('Method') || s.label.includes('Protocol') || s.label.includes('Recommendation') || s.label.includes('Indication'))?.value.split(', ')) || [isEs ? "Aplicación Clínica Transdérmica" : "Clinical Transdermal Application"],
          regulatory: prod.regulatory || null,
          benefits: prod.benefits || null,
          activeIngredientsDetails: prod.activeIngredientsDetails || null,
          activeIngredientsList: prod.activeIngredientsList || null,
          usageIndications: prod.usageIndications || null,
          contraindications: prod.contraindications || null,
          clinicalInsights: prod.clinicalInsights || [
            { title: isEs ? "Ficha Técnica Nutricional" : "Nutritional Fact Sheet", label: isEs ? "Ver Info" : "View Info", type: "dossier" }
          ],
          isNew: prod.isNew || false
        };
      });
    }
  }, [brandId, isEs, brand]);

  // 2. State Management for Filters & Selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // selectedProductId and onSelectProduct are managed by the parent BrandLayout component to align with clean URL paths
  const [showMobileList, setShowMobileList] = useState(false);

  const specsTableRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.descriptor.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query));
        
      return matchesCategory && matchesSearch;
    });
  }, [normalizedProducts, selectedCategory, searchQuery]);

  // Set default selected product on mount or category change
  const [prevFilteredProducts, setPrevFilteredProducts] = useState(filteredProducts);
  if (filteredProducts !== prevFilteredProducts) {
    setPrevFilteredProducts(filteredProducts);
    if (filteredProducts.length > 0) {
      const isStillFiltered = filteredProducts.some(p => p.id === selectedProductId);
      if (!isStillFiltered) {
        onSelectProduct(filteredProducts[0].id);
      }
    } else {
      onSelectProduct('');
    }
  }

  // Get active selected product details
  const activeProduct = useMemo(() => {
    return normalizedProducts.find(p => p.id === selectedProductId) || null;
  }, [normalizedProducts, selectedProductId]);

  // Gallery active index state
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [prevSelectedProductId, setPrevSelectedProductId] = useState(selectedProductId);
  const [isHovered, setIsHovered] = useState(false);
  
  const videoRef = useRef(null);

  if (selectedProductId !== prevSelectedProductId) {
    setPrevSelectedProductId(selectedProductId);
    setActiveGalleryIdx(0);
    setIsHovered(false);
  }

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
    }, 3500); // 3.5 seconds cycle

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



  const hasCover = activeProduct && activeProduct.coverImage && !activeProduct.coverImage.startsWith('https://placehold.co/');

  return (
    <section id="catalog-section" className="py-20 lg:py-24 px-4 sm:px-12 xl:px-20 bg-[#F2F5F6] w-full border-t border-slate-200/50">
      <style>{hoverStyles}</style>
      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto flex flex-col gap-10">
        
        {/* Main 12-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Sidebar (3/12 width on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6 text-left">
            
            {/* Sidebar Title */}
            <div className="space-y-1 sm:space-y-1.5">
              <h2 className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight leading-tight bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent inline-block`}>
                {isEs ? 'Catálogo' : 'Catalog'}
              </h2>
              <div className="w-10 h-1.5 rounded-full hidden lg:block" style={{ backgroundColor: resolveBrandColor(brand.accentBg) }} />
            </div>

            {/* Interactive Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEs ? "Buscar producto..." : "Search product..."}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 transition-all font-medium text-slate-700 shadow-sm"
                style={{ '--tw-ring-color': resolveBrandColor(brand.accentBg) }}
              />
            </div>

            {/* Horizontal Category Filtering Chips - Desktop Only */}
            <div className="hidden lg:block space-y-2.5">
              <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
                {isEs ? 'Filtrar por Categoría' : 'Filter by Category'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {brand.categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const catLabel = isEs ? cat.label.es : cat.label.en;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide transition-all duration-300 focus:outline-none cursor-pointer ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-white text-slate-400 border border-slate-200/50 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                      style={{
                        backgroundColor: isSelected ? resolveBrandColor(brand.accentBg) : undefined,
                        borderColor: isSelected ? resolveBrandColor(brand.accentBg) : undefined
                      }}
                    >
                      {catLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Selector Header - Mobile Only */}
            <div className="lg:hidden flex items-center justify-between gap-2 pt-1 border-t border-slate-200/40">
              <span className="text-[9px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase">
                {isEs ? 'Seleccionar Producto' : 'Select Product'}
              </span>
              <button
                onClick={() => setShowMobileList(!showMobileList)}
                className="text-[10px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-lg border border-slate-200 bg-white shadow-xs focus:outline-none cursor-pointer text-slate-500 hover:text-slate-700"
                style={{ color: showMobileList ? resolveBrandColor(brand.accentBg) : undefined }}
              >
                {showMobileList ? (
                  <>
                    <span>{isEs ? 'Ver Carrusel' : 'Show Slider'}</span>
                    <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
                  </>
                ) : (
                  <>
                    <span>{isEs ? 'Ver Lista' : 'Show List'}</span>
                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                  </>
                )}
              </button>
            </div>

            {/* Horizontal Scroll Swiper - Mobile Only */}
            {!showMobileList && (
              <div className="lg:hidden flex flex-row overflow-x-auto gap-3 pb-2.5 no-scrollbar scroll-smooth w-full">
                {filteredProducts.map((prod) => {
                  const isSelected = selectedProductId === prod.id;
                  const brandColor = resolveBrandColor(brand.accentBg);
                  return (
                    <button
                      key={prod.id}
                      onClick={() => onSelectProduct(prod.id)}
                      className={`flex items-center gap-2.5 p-2 px-3 rounded-xl border bg-white shrink-0 w-[185px] text-left transition-all duration-300 focus:outline-none cursor-pointer ${
                        isSelected ? 'shadow-md scale-99 border-slate-200/60 bg-slate-50/20' : 'border-slate-200/40 hover:bg-slate-50/30'
                      }`}
                      style={{
                        borderLeftWidth: isSelected ? '3.5px' : '1px',
                        borderLeftColor: isSelected ? brandColor : undefined
                      }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/30 flex items-center justify-center p-0.5 shrink-0">
                        <img src={getProductThumbnail(prod)} alt={prod.name} className="max-w-full max-h-full object-contain filter drop-shadow-xs" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h4 className="text-[11px] font-extrabold text-[#0D1F3B] truncate leading-tight">
                            {prod.displayName}
                          </h4>
                          {prod.isNew && (
                            <span className="bg-[#0ea5e9] text-white text-[8px] font-extrabold px-1.5 py-0.5 uppercase rounded-xs tracking-wider shrink-0">
                              {isEs ? 'Nuevo' : 'New'}
                            </span>
                          )}
                        </div>
                        <p className="text-[8px] font-extrabold text-slate-400 truncate uppercase mt-0.5">
                          {prod.descriptor.split(' - ')[1] || prod.descriptor.split(' / ')[1] || prod.descriptor}
                        </p>
                      </div>
                    </button>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <div className="text-slate-400 text-xs font-semibold py-4 w-full text-center">
                    {isEs ? 'Sin productos coincidentes' : 'No matching products'}
                  </div>
                )}
              </div>
            )}

            {/* Expanded Vertical Selection Drawer - Mobile Only */}
            <AnimatePresence>
              {showMobileList && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="lg:hidden overflow-hidden flex flex-col gap-1.5 max-h-[300px] overflow-y-auto no-scrollbar border-b border-slate-200/55 pb-4"
                >
                  {filteredProducts.map((prod) => {
                    const isSelected = selectedProductId === prod.id;
                    const brandColor = resolveBrandColor(brand.accentBg);
                    return (
                      <button
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod.id);
                          setShowMobileList(false);
                        }}
                        className={`w-full p-2.5 rounded-xl border flex items-center gap-3 text-left transition-all duration-300 focus:outline-none cursor-pointer ${
                          isSelected ? 'bg-slate-50/50 shadow-sm border-slate-200/60' : 'bg-white/40 border-transparent hover:bg-slate-50/30'
                        }`}
                        style={{
                          borderLeftWidth: isSelected ? '3.5px' : '1px',
                          borderLeftColor: isSelected ? brandColor : undefined
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0">
                          <img src={getProductThumbnail(prod)} alt={prod.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <h4 className="text-[12px] font-extrabold text-[#0D1F3B] truncate leading-tight">
                              {prod.displayName}
                            </h4>
                            {prod.isNew && (
                              <span className="bg-[#0ea5e9] text-white text-[8px] font-extrabold px-1.5 py-0.5 uppercase rounded-xs tracking-wider shrink-0">
                                {isEs ? 'Nuevo' : 'New'}
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] font-bold text-slate-400 truncate uppercase mt-0.5">
                            {prod.descriptor}
                          </p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </button>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <div className="text-slate-400 text-xs font-semibold py-4 w-full text-center">
                      {isEs ? 'Sin productos coincidentes' : 'No matching products'}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Sidebar Product List - Desktop Only */}
            <div className="hidden lg:flex flex-col gap-2 max-h-[500px] lg:max-h-[620px] overflow-y-auto no-scrollbar pr-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => {
                  const isSelected = selectedProductId === prod.id;
                  const brandColor = resolveBrandColor(brand.accentBg);
                  return (
                    <button
                      key={prod.id}
                      onClick={() => onSelectProduct(prod.id)}
                      className={`w-full p-3.5 rounded-2xl border flex items-center gap-3.5 text-left transition-all duration-300 focus:outline-none cursor-pointer group/item ${
                        isSelected
                          ? 'bg-white border-slate-200/60 shadow-md scale-101'
                          : 'bg-white/40 border-transparent hover:bg-white/70'
                      }`}
                      style={{
                        borderLeftWidth: isSelected ? '4px' : '1px',
                        borderLeftColor: isSelected ? brandColor : undefined
                      }}
                    >
                      {/* Left Thumbnail Box */}
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/50 overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-sm">
                        <img 
                          src={getProductThumbnail(prod)} 
                          alt={prod.name} 
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover/item:scale-105" 
                        />
                      </div>
                      
                      {/* Name & Desc Block */}
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-[13px] font-extrabold text-primary-dark truncate tracking-tight group-hover/item:text-primary-light transition-colors">
                            {prod.displayName}
                          </h4>
                          {prod.isNew && (
                            <span className="bg-[#0ea5e9] text-white text-[9px] font-extrabold px-1.5 py-0.5 uppercase rounded-xs tracking-wider shrink-0">
                              {isEs ? 'Nuevo' : 'New'}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold truncate uppercase tracking-wide mt-0.5">
                          {prod.descriptor}
                        </p>
                      </div>

                      {/* Right Chevron */}
                      <ChevronRight 
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${
                          isSelected ? 'translate-x-0.5 text-primary-light' : 'text-slate-300 group-hover/item:text-slate-400'
                        }`}
                        style={{ color: isSelected ? brandColor : undefined }}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="bg-white/50 border border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                  <span className="text-xl">📦</span>
                  <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {isEs ? 'Sin Productos' : 'No Products'}
                  </h5>
                  <p className="text-[10px] font-semibold text-slate-400/80 leading-relaxed max-w-[160px]">
                    {isEs ? 'Ajuste los filtros o el buscador.' : 'Adjust search terms or category chips.'}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Detail View (9/12 width on desktop) */}
          <div className="lg:col-span-9 h-full">
            <AnimatePresence mode="wait">
              {activeProduct ? (
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full bg-white rounded-[32px] border border-slate-200/50 shadow-sm flex flex-col gap-0 overflow-hidden"
                >
                  {/* 1. Header Banner */}
                  <div 
                    className={`relative w-full rounded-t-[32px] rounded-b-none overflow-hidden pt-20 pb-4 sm:pt-28 sm:pb-6 px-4 sm:px-12 flex flex-row items-end justify-between gap-4 shadow-md bg-cover bg-center ${!hasCover ? `bg-gradient-to-r ${brand.themeGradient}` : ''}`}
                    style={hasCover ? {
                      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(248, 250, 252, 0.45)), url(${activeProduct.coverImage})`
                    } : {}}
                  >
                    {/* Abstract dots overlay (only for fallback gradients) */}
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
                      {/* Product Image Showcase Container */}
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
                        
                        {/* Static Product Image */}
                        <img src={activeImage} alt={activeProduct.name} className="product-image" />

                        {/* Silent Looping Video on Hover */}
                        {activeVideo && (
                          <video
                            ref={videoRef}
                            src={activeVideo}
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover bg-white rounded-2xl transition-opacity duration-300 pointer-events-none"
                            style={{ opacity: isHovered ? 1 : 0, zIndex: isHovered ? 20 : 0 }}
                          />
                        )}

                        {/* Interactive Gallery Navigation inside main image */}
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

                        {/* Zoom button */}
                        <div className="absolute right-3 bottom-3 p-2 rounded-xl bg-white/90 border border-slate-100 text-slate-500 opacity-0 group-hover/image:opacity-100 transition-opacity shadow-sm pointer-events-none z-[25]">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>

                        {/* Cert badge in corner */}
                        <span className="absolute left-3 bottom-3 px-2 py-0.5 bg-slate-900/50 text-[8px] font-extrabold text-white uppercase tracking-wider rounded-md backdrop-blur-xs z-[25]">
                          {activeProduct.certBadge}
                        </span>
                      </div>

                      {/* Hidden progressive video preloader pipeline */}
                      <div className="hidden">
                        {activeProduct.gallery.map((item, idx) => {
                          if (item && typeof item === 'object' && item.video) {
                            return (
                              <video key={idx} src={item.video} preload="auto" muted />
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
                                <img src={thumbSrc} alt={`Thumb ${idx + 1}`} className="max-w-full max-h-full object-contain" />
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
                        {/* Sanitary Registry Button / Badge */}
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
                            <span className="bg-[#0ea5e9] text-white text-xs font-bold px-2 py-1 uppercase rounded-sm tracking-widest ml-3 shadow-xs">
                              {isEs ? 'Nuevo' : 'New'}
                            </span>
                          )}
                        </div>

                        {brandId === 'dermclar' ? (
                          <div className="space-y-6 pt-2">
                            {/* Description - Premium slate-600, leading-relaxed, modern typography */}
                            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                              {activeProduct.description}
                            </p>

                            {/* Zonas de Aplicación */}
                            {activeProduct.applicationZones && (
                              <div className="space-y-3 pt-2">
                                <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-[#0ea5e9] uppercase">
                                  {isEs ? 'Zonas de Aplicación' : 'Application Zones'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {activeProduct.applicationZones.map((zone, idx) => {
                                    const icon = getZoneIcon(zone);
                                    return (
                                      <span 
                                        key={idx} 
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-bold border transition-colors duration-200 cursor-default shadow-xs"
                                        style={{
                                          backgroundColor: 'rgba(14, 165, 233, 0.08)',
                                          borderColor: 'rgba(14, 165, 233, 0.25)',
                                          color: '#0ea5e9'
                                        }}
                                      >
                                        {icon && (
                                          <img 
                                            src={icon} 
                                            alt="" 
                                            className="w-5 h-5 object-contain shrink-0 filter brightness-100" 
                                          />
                                        )}
                                        <span>{zone}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {/* Slogan with accent left border */}
                            {activeProduct.slogan && (
                              <div className="py-1 px-4 border-l-2 bg-slate-50/50 rounded-r-xl" style={{ borderLeftColor: resolveBrandColor(brand.accentBg) }}>
                                <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                                  "{activeProduct.slogan}"
                                </p>
                              </div>
                            )}

                            {/* Product detailed description */}
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                              {activeProduct.description}
                            </p>

                            {/* Clinical Benefits checklist */}
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

                            {/* Zonas de Aplicación Renderizado Condicional */}
                            {activeProduct.applicationZones && (
                              <div className="pt-2 space-y-1.5">
                                <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
                                  {isEs ? 'Zonas de Aplicación' : 'Application Zones'}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeProduct.applicationZones.map((zone, idx) => {
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
                                  })}
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {/* Suplementación Info for Xtralife */}
                        {brandId === 'xtralife' && (
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

                  {/* 2.5. Full-Width Clinical Details for Dermclar */}
                  {brandId === 'dermclar' && (
                    <div className="border-t border-slate-100 pt-8 text-left space-y-8">
                      {/* Active Ingredients Section */}
                      {(activeProduct.activeIngredientsList || activeProduct.activeIngredientsDetails || activeProduct.activeIngredients) && (
                        <div className="space-y-3">
                          <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-[#0ea5e9] uppercase">
                            {isEs ? 'Principios Activos' : 'Active Ingredients'}
                          </h3>
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
                      )}

                      {/* Benefits Section */}
                      {((activeProduct.benefits && activeProduct.benefits.length > 0) || (activeProduct.clinicalBenefits && activeProduct.clinicalBenefits.length > 0)) && (
                        <div className="space-y-3">
                          <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-[#0ea5e9] uppercase">
                            {isEs ? 'Beneficios' : 'Benefits'}
                          </h3>
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
                      )}

                      {/* Usage Indications Section */}
                      {activeProduct.usageIndications && activeProduct.usageIndications.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-[#0ea5e9] uppercase">
                            {isEs ? 'Indicaciones y Modo de Uso' : 'Indications & Usage'}
                          </h3>
                          <ul className="space-y-3 text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                            {activeProduct.usageIndications.map((ind, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-2" />
                                <span>{ind}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contraindications Section */}
                      {activeProduct.contraindications && activeProduct.contraindications.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-600 uppercase">
                            {isEs ? 'Advertencias y Contraindicaciones' : 'Warnings & Contraindications'}
                          </h3>
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
                      )}
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
                          {activeProduct.applicationAreas.length > 0 && (
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
                              {activeProduct.applicationAreas.length > 0 && (
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
                </motion.div>
              ) : (
                <div className="w-full h-full min-h-[400px] bg-white rounded-[32px] border border-slate-200/50 flex flex-col items-center justify-center p-10 text-center gap-3">
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
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] bg-slate-950/95 border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center cursor-default aspect-square"
            >
              {activeVideo ? (
                <video
                  src={activeVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={lightboxImage} alt="Large product view" className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:scale-105 transition-all focus:outline-none cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductCatalog;
