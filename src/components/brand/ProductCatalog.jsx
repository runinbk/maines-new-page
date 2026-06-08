import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';

/**
 * ProductCatalog Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 */
const ProductCatalog = ({ brand, language }) => {
  const isEs = language === 'es';

  // State management for searching & filtering (lightweight inputs)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Set initial product as the first item in the brand's array
  const [selectedProductId, setSelectedProductId] = useState(
    brand.products && brand.products.length > 0 ? brand.products[0].id : ''
  );


  // Filter products cleanly using useMemo to optimize performance
  const filteredProducts = useMemo(() => {
    if (!brand.products) return [];
    
    return brand.products.filter((product) => {
      // 1. Category check
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // 2. Search check (case insensitive name, scientific descriptor, composition)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.descriptor.toLowerCase().includes(query) ||
        product.composition.toLowerCase().includes(query);
        
      return matchesCategory && matchesSearch;
    });
  }, [brand.products, selectedCategory, searchQuery]);

  // Find active selected product object
  const activeProduct = useMemo(() => {
    if (!brand.products) return null;
    let found = brand.products.find((p) => p.id === selectedProductId);
    // Fallback in case filtered out or missing
    if (!found && filteredProducts.length > 0) {
      return filteredProducts[0];
    }
    return found;
  }, [brand.products, selectedProductId, filteredProducts]);

  return (
    <section id="catalog-section" className="py-20 lg:py-28 px-6 sm:px-12 xl:px-20 bg-lightBg w-full border-t border-slate-200/50">
      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto flex flex-col gap-10">
        
        {/* Catalog Section Header */}
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-display tracking-tight mb-2">
            {isEs ? 'Catálogo' : 'Catalog'}
          </h2>
          <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${brand.themeGradient}`} />
        </div>

        {/* Dynamic Split Layout: Sidebar list (Left 4/12) - Detailed Card View (Right 8/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (4/12): List & Filter Engine Panel */}
          <div className="lg:col-span-4 flex flex-col gap-5 h-full">
            
            {/* Search Input Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-4 text-left">
              {/* Search Bar Wrapper */}
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? "Buscar producto..." : "Search product..."}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:bg-white focus:border-slate-300 transition-colors font-medium"
                />
              </div>

              {/* Dynamic Categories Filtering Scroll Panel */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Filtrar Categoría' : 'Filter Category'}</span>
                </span>
                
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {brand.categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const catLabel = isEs ? cat.label.es : cat.label.en;
                    
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wide transition-all duration-300 focus:outline-none ${
                          isSelected
                            ? `text-white ${brand.accentBg} shadow-sm shadow-cyan-500/10`
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-500'
                        }`}
                        style={{
                          backgroundColor: isSelected ? `var(--color-${brand.accentBg.replace('bg-', '')})` : undefined
                        }}
                      >
                        {catLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollable Products list container */}
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex-grow min-h-[300px] lg:min-h-[450px] max-h-[500px] lg:max-h-[600px] overflow-y-auto no-scrollbar flex flex-col gap-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => {
                  const isSelected = activeProduct && activeProduct.id === prod.id;
                  
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`w-full p-3 rounded-xl border flex items-center gap-4 text-left transition-all duration-300 focus:outline-none ${
                        isSelected
                          ? `bg-slate-50/80 border-slate-200`
                          : 'bg-white border-transparent hover:bg-slate-50/30'
                      }`}
                      style={{
                        borderLeftColor: isSelected ? `var(--color-${brand.accentBg.replace('bg-', '')})` : undefined,
                        borderLeftWidth: isSelected ? '4px' : undefined
                      }}
                    >
                      {/* Left side compact thumbnail */}
                      <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                        <img 
                          src={prod.coverImage} 
                          alt={prod.name} 
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm" 
                        />
                      </div>
                      
                      {/* Content block */}
                      <div className="min-w-0 flex-grow">
                        <h4 className="text-xs sm:text-sm font-extrabold text-primary-dark truncate tracking-tight">
                          {prod.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate uppercase mt-0.5 font-semibold">
                          {prod.descriptor}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center text-slate-400 gap-3">
                  <PackageOpen className="w-10 h-10 text-slate-300 stroke-[1.5]" />
                  <h5 className="text-xs font-bold uppercase tracking-wider">
                    {isEs ? 'Sin Productos' : 'No Products Found'}
                  </h5>
                  <p className="text-[11px] font-semibold max-w-[200px] leading-relaxed text-slate-400/80">
                    {isEs 
                      ? 'No hay productos que coincidan con la búsqueda o filtro seleccionado.' 
                      : 'No products match the selected criteria.'}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (8/12): Isolated Detail Product Display */}
          <div className="lg:col-span-8 h-full">
            {activeProduct ? (
              <ProductCard 
                product={activeProduct} 
                brand={brand} 
                language={language} 
              />
            ) : (
              <div className="w-full h-full bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-12 text-center text-slate-400 gap-3 min-h-[400px]">
                <PackageOpen className="w-12 h-12 text-slate-200 stroke-[1.2]" />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  {isEs ? 'Seleccionar Producto' : 'Select a Product'}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs font-semibold leading-relaxed">
                  {isEs 
                    ? 'Por favor elija un producto de la lista lateral para visualizar sus especificaciones y dosificaciones científicas.' 
                    : 'Please select a product from the list to view detailed composition parameters.'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductCatalog;
