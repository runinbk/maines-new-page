import { Link } from 'react-router-dom';

/**
 * Visual Breadcrumb Navigation Component for Brand & Product Pages
 * Implements a floating glassmorphism capsule design that overlays the hero
 * without displacing content layout, matching premium aesthetics.
 */
export const BreadcrumbNav = ({ brand, product, language, isAbsolute = true }) => {
  const isEs = language === 'es';
  if (!brand) return null;

  // Resolve hover text coloring based on the brand
  const hoverColor = brand.id === 'jetema' 
    ? 'hover:text-[#4C5A9D]' 
    : brand.id === 'dermclar' 
      ? 'hover:text-[#0ea5e9]' 
      : 'hover:text-emerald-500';

  const containerClasses = isAbsolute
    ? "absolute top-[80px] xs:top-[85px] sm:top-[105px] left-0 right-0 z-30 pointer-events-none select-none animate-fade-in"
    : "text-[11px] sm:text-xs text-slate-500/80 font-semibold py-3 px-4 sm:px-8 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto w-full text-left mt-20 sm:mt-24 border-b border-slate-100/80 select-none animate-fade-in";

  return (
    <div className={containerClasses}>
      <nav 
        aria-label="Breadcrumb" 
        className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto w-full px-4 sm:px-8 text-left pointer-events-auto"
      >
        <ol className="inline-flex items-center gap-1.5 sm:gap-2 flex-wrap bg-white/50 backdrop-blur-md border border-white/40 shadow-xs px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] text-primary-dark/85">
          <li>
            <Link to="/" className={`hover:text-accent transition-colors duration-200 ${hoverColor}`}>
              {isEs ? "Inicio" : "Home"}
            </Link>
          </li>
          <span className="text-primary-dark/30 font-normal">/</span>
          <li>
            <Link to={`/${brand.id}`} className={`hover:text-accent transition-colors duration-200 uppercase ${hoverColor}`}>
              {brand.name}
            </Link>
          </li>
          {product ? (
            <>
              <span className="text-primary-dark/30 font-normal">/</span>
              <li>
                <Link to={`/${brand.id}/catalogo`} className={`hover:text-accent transition-colors duration-200 ${hoverColor}`}>
                  {isEs ? "Catálogo" : "Catalog"}
                </Link>
              </li>
              <span className="text-primary-dark/30 font-normal">/</span>
              <li className="text-primary-dark font-extrabold truncate max-w-[120px] sm:max-w-[200px]" aria-current="page">
                {product.name}
              </li>
            </>
          ) : (
            <>
              <span className="text-primary-dark/30 font-normal">/</span>
              <li className="text-primary-dark font-extrabold" aria-current="page">
                {isEs ? "General" : "Overview"}
              </li>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbNav;
