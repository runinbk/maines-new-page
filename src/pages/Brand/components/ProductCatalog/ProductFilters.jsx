import { Search, ChevronDown } from 'lucide-react';

export const ProductFilters = ({
  brand,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isCategoriesExpanded,
  setIsCategoriesExpanded,
  showMobileList,
  setShowMobileList,
  resolveBrandColor,
  isEs
}) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 text-left">
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
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 transition-all font-medium text-slate-700 shadow-sm animate-fade-in"
          style={{ '--tw-ring-color': resolveBrandColor(brand.accentBg) }}
        />
      </div>

      {/* Collapsible Category Filtering - Desktop Only */}
      <div className="hidden lg:block border-b border-slate-200/40 pb-4 mb-2">
        <button
          onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
          className="w-full flex items-center justify-between py-1 focus:outline-none cursor-pointer group text-left"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold tracking-widest text-[#0D1F3B]/40 uppercase block">
              {isEs ? 'Filtrar por Categoría' : 'Filter by Category'}
            </span>
            {!isCategoriesExpanded && (
              <span className="text-xs font-bold block transition-all animate-fade-in truncate max-w-[210px]" style={{ color: resolveBrandColor(brand.accentBg) }}>
                {isEs 
                  ? (brand.categories.find(c => c.id === selectedCategory)?.label.es || 'Todos') 
                  : (brand.categories.find(c => c.id === selectedCategory)?.label.en || 'All')
                }
              </span>
            )}
          </div>
          <ChevronDown 
            className={`w-4.5 h-4.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${
              isCategoriesExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <div
          className={`grid transition-all duration-300 ease-out overflow-hidden ${
            isCategoriesExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-1.5 pt-3">
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
          <span>
            {showMobileList 
              ? (isEs ? 'Ocultar Lista' : 'Hide List')
              : (isEs ? 'Mostrar Lista' : 'Show List')
            }
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMobileList ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
export default ProductFilters;
