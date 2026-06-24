import { memo } from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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
 * @param {Object} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandFooter = ({ brand, language }) => {
  const isEs = language === 'es';
  const brandId = brand.id;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Define brand-specific gradient backgrounds for the footer
  const footerGradients = {
    jetema: 'bg-gradient-to-br from-[#5AA2D0] via-[#4C5A9D] to-[#120B25]', // Light Blue -> Indigo/Celeste -> Deep Violet
    dermclar: 'bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#011e26]', // Cyan -> Sky Blue -> Deep Navy/Teal
    xtralife: 'bg-gradient-to-br from-[#10B981] via-[#059669] to-[#041D12]'  // Emerald -> Mint -> Deep Green Forest
  };

  const activeGradient = footerGradients[brandId] || 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617]';

  // Slogans and subtitles for each brand
  const slogans = {
    jetema: {
      title: "Creation of Beauty & Innovation.",
      sub: isEs 
        ? "Elevando el estándar del Well-Aging en Bolivia a través de biotecnología médica purificada."
        : "Elevating the standard of Well-Aging in Bolivia through purified medical biotechnology."
    },
    dermclar: {
      title: "The Science of Scientific Skincare.",
      sub: isEs
        ? "Formulaciones avanzadas de mesoterapia transdérmica clínicamente comprobadas."
        : "Advanced transdermal mesotherapy formulations clinically proven."
    },
    xtralife: {
      title: "Natural Products for Longevity.",
      sub: isEs
        ? "Suplementación científica de primer nivel con estándares de pureza norteamericanos."
        : "Top-tier scientific supplementation with North American purity standards."
    }
  };

  const activeSlogan = slogans[brandId] || {
    title: "Redefining the Boundaries of Care.",
    sub: isEs ? "Medicina estética de vanguardia." : "Pioneering medical aesthetics."
  };

  return (
    <footer className={`w-full ${activeGradient} rounded-t-[32px] sm:rounded-t-[48px] pt-16 pb-8 px-6 sm:px-12 xl:px-20 text-left relative z-10 overflow-hidden select-none`}>
      
      {/* Abstract mesh overlay circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto flex flex-col gap-12 relative z-10">
        
        {/* 1. Hero Slogan Centered Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 pb-4 border-b border-white/10 w-full">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-sm">
            {activeSlogan.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-xl">
            {activeSlogan.sub}
          </p>
        </div>

        {/* 2. Grid Links Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-6">
          
          {/* Brand description column (6/12) */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="h-[22px] w-auto object-contain filter brightness-0 invert" 
                loading="lazy"
              />
            </div>
            <p className="text-white/60 font-semibold text-xs sm:text-sm leading-relaxed max-w-md">
              {isEs 
                ? `Liderando el futuro de la medicina estética en Bolivia a través de la importación autorizada y biotecnología de máxima pureza. Respaldo exclusivo de Maines SRL.`
                : `Pioneering the future of medical aesthetics in Bolivia through authorized imports and high-purity biotechnology. Backed by Maines SRL.`}
            </p>
          </div>

          {/* Quick links segments (6/12) */}
          <div className="md:col-span-6 grid grid-cols-3 gap-8 text-left">
            
            {/* Brand navigation */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                {isEs ? 'Explorar' : 'Explore'}
              </h5>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-white/70">
                <Link 
                  to={`/${brandId}/catalogo`} 
                  className="hover:text-white transition-colors duration-200"
                >
                  {isEs ? 'Catálogo de Productos' : 'Product Catalog'}
                </Link>
                <Link 
                  to={`/${brandId}/empresa`} 
                  className="hover:text-white transition-colors duration-200"
                >
                  {isEs ? 'Respaldo Institucional' : 'Institutional Support'}
                </Link>
                <Link 
                  to={`/${brandId}/contacto`} 
                  className="hover:text-white transition-colors duration-200"
                >
                  {isEs ? 'Contacto Comercial' : 'Commercial Inquiry'}
                </Link>
              </div>
            </div>

            {/* Corporate portals links */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                {isEs ? 'Portal' : 'Portal'}
              </h5>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-white/70">
                <Link 
                  to="/"
                  className="text-left hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  {isEs ? 'Página Principal' : 'Main Portal'}
                </Link>
                <a href="https://maines-srl.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center gap-1">
                  <span>Maines S.R.L.</span>
                  <Globe className="w-3 h-3 text-white/50" />
                </a>
              </div>
            </div>

            {/* Our Brands column */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                {isEs ? 'Nuestras Marcas' : 'Our Brands'}
              </h5>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-white/70">
                <Link 
                  to="/jetema" 
                  className={`hover:text-white transition-colors duration-200 ${brandId === 'jetema' ? 'text-white font-bold' : ''}`}
                >
                  Jetema
                </Link>
                <Link 
                  to="/dermclar" 
                  className={`hover:text-white transition-colors duration-200 ${brandId === 'dermclar' ? 'text-white font-bold' : ''}`}
                >
                  Dermclar
                </Link>
                <Link 
                  to="/xtralife" 
                  className={`hover:text-white transition-colors duration-200 ${brandId === 'xtralife' ? 'text-white font-bold' : ''}`}
                >
                  Xtralife
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Disclaimers box */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white/50 text-[10px] sm:text-xs font-semibold leading-relaxed max-w-4xl text-left flex flex-col gap-2">
          {brandId === 'xtralife' ? (
            <>
              <p>
                * <strong>{isEs ? 'AVISO DE SUPLEMENTACIÓN:' : 'SUPPLEMENT NOTICE:'}</strong> {isEs 
                  ? `Los productos de la marca Xtralife son suplementos nutricionales y no deben utilizarse como sustitutos de una dieta equilibrada y un estilo de vida saludable.`
                  : `Xtralife products are dietary supplements and should not be used as a substitute for a balanced diet and a healthy lifestyle.`}
              </p>
              <p>
                {isEs 
                  ? 'La venta y distribución comercial de estos productos por parte de Maines SRL está dirigida a farmacias, consultorios médicos y distribuidores autorizados. Consulte con su médico o especialista en nutrición antes de iniciar cualquier programa de suplementación.'
                  : 'Commercial sales and distribution of these products by Maines SRL are directed to pharmacies, certified medical offices, and authorized retailers. Consult with your physician or nutrition specialist before starting any supplementation program.'}
              </p>
            </>
          ) : (
            <>
              <p>
                * <strong>{isEs ? 'AVISO DE USO REGULADO:' : 'REGULATORY NOTICE:'}</strong> {isEs 
                  ? `Los productos presentados en este portafolio oficial de ${brand.name} están dirigidos y autorizados exclusivamente para profesionales de la salud debidamente autorizados y clínicas certificadas ante la AGEMED.`
                  : `The formulations and devices shown in this ${brand.name} catalog are strictly limited to certified medical practitioners and institutions registered with local health regulators.`}
              </p>
              <p>
                {isEs 
                  ? 'La aplicación indebida de estos productos por personal no cualificado representa un grave riesgo para la salud del paciente. Maines SRL no se responsabiliza por aplicaciones realizadas fuera de los protocolos clínicos aprobados.'
                  : 'Improper application or usage by uncertified staff represents clinical hazards. Maines SRL disclaims liability for applications conducted outside official medical protocols.'}
              </p>
            </>
          )}
        </div>

        {/* 4. Bottom Segment: Copyright & Social Channels & Watermark */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10 text-white/40 text-xs font-semibold relative z-10">
          <div>
            <span>{isEs ? '© 2026 Maines SRL. Todos los derechos reservados. Importador Autorizado en Bolivia.' : '© 2026 Maines SRL. All rights reserved. Authorized Distributor.'}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a 
                href={brand.social?.instagram?.url || "https://www.instagram.com/dermclarbolivia/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors focus:outline-none cursor-pointer"
              title={isEs ? 'Subir al inicio' : 'Scroll to top'}
            >
              <ArrowUp className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. Watermark Background Brand Name Text */}
      <div 
        className="text-[14vw] font-black tracking-[0.25em] text-white/[0.04] uppercase select-none absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-0 pointer-events-none w-full text-center leading-none font-display z-0"
        style={{ letterSpacing: '0.22em' }}
      >
        {brandId}
      </div>

    </footer>
  );
};

export default memo(BrandFooter);
