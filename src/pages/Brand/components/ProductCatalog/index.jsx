import { useState, useMemo, memo } from 'react';
import jetemaProducts from '../../../../data/jetemaProducts.json';
import ImageWithSkeleton from '../../../../components/ui/ImageWithSkeleton';
import ProductFilters from './ProductFilters';
import ProductSidebar from './ProductSidebar';
import ProductDetail from './ProductDetail';

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
 */
export const ProductCatalog = ({ brand, language, selectedProductId, onSelectProduct }) => {
  const isEs = language === 'es';
  const brandId = brand.id;

  // 1. Data Normalization & Flattening Engine
  const normalizedProducts = useMemo(() => {
    const resolveTranslation = (val) => {
      if (!val) return '';
      if (typeof val === 'object') {
        return val[isEs ? 'es' : 'en'] || val['es'] || '';
      }
      return val;
    };

    const resolveArrayTranslation = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'object') {
        return val[isEs ? 'es' : 'en'] || val['es'] || [];
      }
      return [];
    };

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

        const subtitleResolved = resolveTranslation(prod.subtitle);
        const sloganResolved = resolveTranslation(prod.slogan);
        const descResolved = resolveTranslation(prod.description);
        const specsResolved = resolveArrayTranslation(prod.specifications);
        const appAreasResolved = resolveArrayTranslation(prod.applicationAreas);
        const tagsResolved = resolveArrayTranslation(prod.tags);
        const clinicalBenefitsResolved = resolveArrayTranslation(prod.clinicalBenefits);

        list.push({
          id: prod.id,
          name: prod.name,
          displayName: prod.name.replace('®', ''),
          subtitle: subtitleResolved,
          descriptor: subtitleResolved,
          category: categoryMapped,
          categoryLabel: categoryLabel,
          tags: tagsResolved,
          slogan: sloganResolved,
          description: descResolved,
          composition: descResolved,
          coverImage: prod.assets?.coverImage || getPlaceholdImg(prod.name.split(' ')[0], 'jetema', 600, 600),
          gallery: gallery,
          certBadge: certBadge,
          specifications: specsResolved,
          technicalSpecs: (specsResolved && specsResolved.length > 0) ? specsResolved : null,
          applicationAreas: appAreasResolved,
          regulatory: prod.regulatory ? {
            ...prod.regulatory,
            label: resolveTranslation(prod.regulatory.label)
          } : null,
          clinicalBenefits: clinicalBenefitsResolved,
          clinicalInsights: clinicalInsights,
          isNew: prod.isNew || false
        });
      });
      return list;
    } else {
      const rawProducts = brand.products || [];

      return rawProducts.map(prod => {
        const catLabel = prod.categoryLabel?.[isEs ? 'es' : 'en'] || prod.category;
        const mainImage = prod.assets?.coverImage || prod.coverImage || prod.image || getPlaceholdImg(prod.name, brandId, 600, 600);
        const descResolved = resolveTranslation(prod.description) || resolveTranslation(prod.composition);
        const presResolved = resolveTranslation(prod.presentation);
        const doseResolved = resolveTranslation(prod.dosage);
        const tagsResolved = resolveArrayTranslation(prod.tags);
        const appZonesResolved = resolveArrayTranslation(prod.applicationZones);
        const specsResolved = resolveArrayTranslation(prod.specifications);
        const activeIngredientsListResolved = resolveArrayTranslation(prod.activeIngredientsList);
        const usageIndicationsResolved = resolveArrayTranslation(prod.usageIndications);
        const contraindicationsResolved = resolveArrayTranslation(prod.contraindications);

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

        const resolvedSubtitle = resolveTranslation(prod.subtitle) || resolveTranslation(prod.descriptor) || catLabel;

        return {
          id: prod.id,
          name: prod.name,
          displayName: prod.name,
          subtitle: resolvedSubtitle,
          descriptor: resolvedSubtitle,
          category: prod.category,
          categoryLabel: prod.categoryLabel || { es: catLabel, en: catLabel },
          tags: tagsResolved.length > 0 ? tagsResolved : (brandId === 'xtralife' ? (presResolved ? [presResolved, doseResolved] : []) : appZonesResolved) || (prod.category === 'facial' ? ["DMAE", "Ácido Hialurónico", "Firmeza"] : prod.category === 'capilar' ? ["Biotina", "Pantenol", "Anticaída"] : prod.category === 'immunity' ? ["Refuerzo Inmune", "Vitamina C", "Antioxidante"] : ["Colágeno", "Articulaciones", "MSM"]),
          slogan: resolveTranslation(prod.slogan) || (brandId === 'xtralife' ? (isEs ? "Nutrición premium para tu salud diaria." : "Premium nutrition for your daily health.") : (isEs ? "Fórmula científica de máxima eficacia biológica." : "Scientific formula with maximum biological efficacy.")),
          description: descResolved,
          composition: descResolved,
          coverImage: mainImage,
          gallery: gallery,
          certBadge: prod.certBadge || (brandId === 'xtralife' ? "MADE IN USA • GMP" : "AGEMED Approved"),
          specifications: specsResolved,
          technicalSpecs: (specsResolved && specsResolved.length > 0) ? specsResolved : null,
          activeIngredients: resolveTranslation(prod.activeIngredients) || null,
          applicationZones: appZonesResolved,
          presentation: presResolved || null,
          dosage: doseResolved || null,
          shortDescription: resolveTranslation(prod.shortDescription) || null,
          applicationAreas: resolveArrayTranslation(prod.applicationAreas).length > 0 ? resolveArrayTranslation(prod.applicationAreas) : appZonesResolved || (specsResolved && specsResolved.find(s => s.label.includes('Method') || s.label.includes('Protocol') || s.label.includes('Recommendation') || s.label.includes('Indication'))?.value.split(', ')) || [isEs ? "Aplicación Clínica Transdérmica" : "Clinical Transdermal Application"],
          regulatory: prod.regulatory ? {
            ...prod.regulatory,
            label: resolveTranslation(prod.regulatory.label)
          } : null,
          benefits: prod.benefits ? (Array.isArray(prod.benefits) ? prod.benefits : (prod.benefits[isEs ? 'es' : 'en'] || prod.benefits['es'] || [])) : null,
          catalogBenefits: prod.catalogBenefits ? (prod.catalogBenefits[isEs ? 'es' : 'en'] || prod.catalogBenefits['es'] || []) : null,
          extendedBenefits: prod.extendedBenefits ? (prod.extendedBenefits[isEs ? 'es' : 'en'] || prod.extendedBenefits['es'] || []) : null,
          ingredients: resolveTranslation(prod.ingredients) || null,
          usage: resolveTranslation(prod.usage) || null,
          precautions: resolveTranslation(prod.precautions) || null,
          whyChoose: resolveTranslation(prod.whyChoose) || null,
          sectionsConfig: prod.sectionsConfig || null,
          activeIngredientsDetails: resolveTranslation(prod.activeIngredientsDetails) || null,
          activeIngredientsList: activeIngredientsListResolved.length > 0 ? activeIngredientsListResolved : null,
          usageIndications: usageIndicationsResolved.length > 0 ? usageIndicationsResolved : null,
          contraindications: contraindicationsResolved.length > 0 ? contraindicationsResolved : null,
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
  const [showMobileList, setShowMobileList] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

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

  // Sync selection if filtered list changes
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

  return (
    <section id="catalog-section" className="py-20 lg:py-24 px-4 sm:px-12 xl:px-20 bg-[#F2F5F6] w-full border-t border-slate-200/50">
      <style>{hoverStyles}</style>
      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto flex flex-col gap-10">
        
        {/* Main 12-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Sidebar (3/12 width on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6 text-left">
            
            <ProductFilters
              brand={brand}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isCategoriesExpanded={isCategoriesExpanded}
              setIsCategoriesExpanded={setIsCategoriesExpanded}
              showMobileList={showMobileList}
              setShowMobileList={setShowMobileList}
              resolveBrandColor={resolveBrandColor}
              isEs={isEs}
            />

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
                        <ImageWithSkeleton src={getProductThumbnail(prod)} alt={prod.name} className="max-w-full max-h-full object-contain filter drop-shadow-xs" />
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

            <ProductSidebar
              filteredProducts={filteredProducts}
              selectedProductId={selectedProductId}
              onSelectProduct={onSelectProduct}
              brand={brand}
              showMobileList={showMobileList}
              setShowMobileList={setShowMobileList}
              resolveBrandColor={resolveBrandColor}
              getProductThumbnail={getProductThumbnail}
              isEs={isEs}
            />

          </div>

          {/* RIGHT COLUMN: Detail View (9/12 width on desktop) */}
          <div className="lg:col-span-9 h-full">
            <ProductDetail
              key={activeProduct?.id}
              activeProduct={activeProduct}
              brand={brand}
              language={language}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default memo(ProductCatalog);
