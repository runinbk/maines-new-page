import { ChevronRight } from 'lucide-react';
import ImageWithSkeleton from '../../../../components/ui/ImageWithSkeleton';

export const ProductSidebar = ({
  filteredProducts,
  selectedProductId,
  onSelectProduct,
  brand,
  showMobileList,
  setShowMobileList,
  resolveBrandColor,
  getProductThumbnail,
  isEs
}) => {
  return (
    <div className="w-full">
      {/* Expanded Vertical Selection Drawer - Mobile Only */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out grid ${
          showMobileList ? 'grid-rows-[1fr] opacity-100 border-b border-slate-200/55 pb-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-1.5 max-h-[300px] overflow-y-auto no-scrollbar">
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
                  <ImageWithSkeleton src={getProductThumbnail(prod)} alt={prod.name} className="max-w-full max-h-full object-contain" />
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
        </div>
      </div>

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
                className={`w-full p-3 rounded-2xl border flex items-center gap-3.5 text-left transition-all duration-300 focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-white shadow-md border-slate-200/80' 
                    : 'bg-transparent border-transparent hover:bg-white/40'
                }`}
                style={{
                  borderLeftWidth: isSelected ? '4.5px' : '1px',
                  borderLeftColor: isSelected ? brandColor : undefined
                }}
              >
                {/* Product thumbnail */}
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                  <ImageWithSkeleton src={getProductThumbnail(prod)} alt={prod.name} className="max-w-full max-h-full object-contain" />
                </div>
                
                {/* Details */}
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center gap-2 min-w-0">
                    <h4 className="text-[13px] font-extrabold text-[#0D1F3B] truncate leading-tight">
                      {prod.displayName}
                    </h4>
                    {prod.isNew && (
                      <span className="bg-[#0ea5e9] text-white text-[8px] font-extrabold px-1.5 py-0.5 uppercase rounded-xs tracking-wider shrink-0">
                        {isEs ? 'Nuevo' : 'New'}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 truncate uppercase mt-0.5">
                    {prod.descriptor}
                  </p>
                </div>
                
                <ChevronRight className={`w-4 h-4 text-slate-350 shrink-0 transition-transform duration-300 ${isSelected ? 'translate-x-0.5 text-slate-500' : ''}`} />
              </button>
            );
          })
        ) : (
          <div className="text-slate-400 text-xs font-semibold py-8 w-full text-center">
            {isEs ? 'Sin productos coincidentes' : 'No matching products'}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductSidebar;
