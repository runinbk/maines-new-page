import { ChevronDown } from 'lucide-react';

export const ProductSpecs = ({
  brandId,
  activeProduct,
  expandedSections,
  setExpandedSections,
  defaultSectionsConfig,
  renderSectionContent,
  isEs
}) => {
  if (brandId !== 'xtralife' || !activeProduct.shortDescription) return null;

  const sectionsConfig = activeProduct.sectionsConfig || defaultSectionsConfig;

  return (
    <div className="border-t border-slate-200/60 pt-8 text-left space-y-6">
      {Object.keys(sectionsConfig).map(key => {
        const config = sectionsConfig[key];
        const content = activeProduct[key];
        if (!content || (Array.isArray(content) && content.length === 0)) return null;

        const isExpanded = !!expandedSections[key];

        let containerClass = "py-4 border-b border-slate-100/60";
        let titleClass = "text-xs sm:text-sm font-black uppercase tracking-wider transition-colors duration-200";
        let isWarningOrInfo = config.theme === 'warning' || config.theme === 'info';

        if (config.theme === 'warning') {
          containerClass = "border-l-4 border-amber-500 bg-amber-50/30 px-5 py-4 rounded-r-2xl my-3";
          titleClass = "text-xs sm:text-sm font-black uppercase tracking-wider text-amber-800";
        } else if (config.theme === 'info') {
          containerClass = "border-l-4 border-sky-500 bg-sky-50/35 px-5 py-4 rounded-r-2xl my-3";
          titleClass = "text-xs sm:text-sm font-black uppercase tracking-wider text-sky-850";
        } else if (config.theme === 'accent') {
          titleClass += " text-emerald-600 hover:text-emerald-700";
        } else {
          // theme === 'normal'
          titleClass += " text-slate-800 hover:text-[#10b981]";
        }

        const toggleSection = () => {
          if (config.collapsible) {
            setExpandedSections(prev => ({
              ...prev,
              [key]: !prev[key]
            }));
          }
        };

        const labels = {
          extendedBenefits: isEs ? 'Propiedades y Beneficios Extendidos' : 'Extended Properties & Benefits',
          ingredients: isEs ? 'Ingredientes' : 'Ingredients',
          usage: isEs ? 'Modo de Uso' : 'Directions & Dosage',
          precautions: isEs ? 'Precauciones' : 'Precautions'
        };
        const headerText = labels[key] || key;

        return (
          <div key={key} className={containerClass}>
            {config.collapsible ? (
              <button
                onClick={toggleSection}
                className="w-full flex items-center justify-between transition-colors text-left focus:outline-none cursor-pointer group"
              >
                <span className={titleClass}>
                  {headerText}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  } ${isWarningOrInfo ? (config.theme === 'warning' ? 'text-amber-600' : 'text-sky-650') : 'text-slate-400 group-hover:text-slate-600'}`} 
                />
              </button>
            ) : (
              <div className="w-full flex items-center justify-between text-left">
                <span className={titleClass}>
                  {headerText}
                </span>
              </div>
            )}

            {config.collapsible ? (
              <div
                className={`grid transition-all duration-300 ease-out overflow-hidden ${
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-3 pb-1">
                    {renderSectionContent(key, content)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-3 pb-1">
                {renderSectionContent(key, content)}
              </div>
            )}
          </div>
        );
      })}

      {/* whyChoose Block (Clean left accent border style instead of card) */}
      {activeProduct.whyChoose && (
        <div className="border-l-4 border-emerald-500 bg-emerald-50/20 px-5 py-4 rounded-r-2xl text-left mt-2">
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase block mb-1.5">
            {isEs ? '¿Por qué elegir Xtralife?' : 'Why Choose Xtralife?'}
          </span>
          <p className="text-sm text-slate-600 leading-relaxed font-semibold italic">
            "{activeProduct.whyChoose}"
          </p>
        </div>
      )}
    </div>
  );
};
export default ProductSpecs;
