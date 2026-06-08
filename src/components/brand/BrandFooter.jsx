import { ArrowUp, Globe, Shield } from 'lucide-react';

// Custom lightweight SVG Icons to prevent ESM build mismatches
const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/**
 * BrandFooter Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 * @param {function} props.onBackToHome - Trigger action to return back to home portal
 */
const BrandFooter = ({ brand, language, onBackToHome }) => {
  const isEs = language === 'es';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0f1d] border-t border-slate-900 pt-16 pb-8 px-6 sm:px-12 xl:px-20 text-left relative z-10 select-none">
      
      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto flex flex-col gap-12">
        
        {/* Top Segment: Redefining Care & Navigation links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-10 border-b border-slate-900">
          
          {/* Main message segment (7/12) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            
            {/* Dynamic themed icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white`}>
              <Shield className={`w-5 h-5 ${brand.accentColor}`} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-[1.25]">
              Redefining the <br className="sm:hidden" />
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${brand.themeGradient}`}>
                Boundaries of Care.
              </span>
            </h3>

            <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
              {isEs 
                ? 'Liderando el futuro de la medicina estética en Bolivia a través de la importación regulada y biotecnología clínica de máxima pureza. Somos la vanguardia de la excelencia.'
                : 'Pioneering the future of medical aesthetics through unrelenting innovation and clinical excellence. We are the vanguard.'}
            </p>
          </div>

          {/* Quick links segments (5/12) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-left">
            
            {/* Brand navigation */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                {isEs ? 'Explorar' : 'Explore'}
              </h5>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-slate-400">
                <a href="#catalog-section" className="hover:text-white transition-colors duration-200">
                  {isEs ? 'Catálogo de Productos' : 'Product Catalog'}
                </a>
                <a href="#about-section" className="hover:text-white transition-colors duration-200">
                  {isEs ? 'Infraestructura' : 'Logistics Backing'}
                </a>
                <a href="#cta-section" className="hover:text-white transition-colors duration-200">
                  {isEs ? 'Contacto Directo' : 'Direct Inquiry'}
                </a>
              </div>
            </div>

            {/* Corporate portals links */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                {isEs ? 'Portal Corporativo' : 'Corporate'}
              </h5>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-slate-400">
                <button 
                  onClick={onBackToHome}
                  className="text-left hover:text-white transition-colors duration-200 focus:outline-none"
                >
                  {isEs ? 'Página de Inicio' : 'Home Portal'}
                </button>
                <a href="https://maines-srl.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center gap-1">
                  <span>Maines S.R.L.</span>
                  <Globe className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Mid Segment: Brand regulatory and usage disclaimers */}
        <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 text-slate-500 text-[10px] sm:text-xs font-semibold leading-relaxed max-w-4xl text-left flex flex-col gap-2">
          <p>
            * <strong>{isEs ? 'AVISO DE USO REGULADO:' : 'REGULATORY DISCLAIMER:'}</strong> {isEs 
              ? `Los productos presentados en este portafolio oficial de ${brand.name} están dirigidos y autorizados exclusivamente para profesionales de la salud debidamente titulados y clínicas registradas ante la AGEMED.`
              : `The medical devices and formulations shown in this ${brand.name} catalog are strictly limited to licensed healthcare professionals and institutions registered with local health regulators.`}
          </p>
          <p>
            {isEs 
              ? 'La aplicación indebida de estos productos por personal no cualificado representa un grave riesgo para la salud del paciente. Maines SRL no se responsabiliza por aplicaciones realizadas fuera de los protocolos clínicos aprobados.'
              : 'Improper application or usage by uncertified staff represents clinical hazards. Maines SRL disclaims liability for applications conducted outside official medical protocols.'}
          </p>
        </div>

        {/* Bottom Segment: Copyright & Social Channels & Scroll-To-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 border-t border-slate-950/30 text-slate-500 text-xs font-semibold">
          
          {/* Copyright description */}
          <div>
            <span>{isEs ? '© 2026 Maines SRL. Todos los derechos reservados. Importador Autorizado en Bolivia.' : '© 2026 Maines SRL. All rights reserved. Authorized Distributor.'}</span>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-6">
            
            {/* Social channels links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Scroll-To-Top button capsule */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors focus:outline-none"
              title={isEs ? 'Subir al inicio' : 'Scroll to top'}
            >
              <ArrowUp className="w-4 h-4 animate-bounce" />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default BrandFooter;
