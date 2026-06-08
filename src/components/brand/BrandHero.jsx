import { Network, ShieldCheck, ArrowDown } from 'lucide-react';

/**
 * BrandHero Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - The active brand configuration
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandHero = ({ brand, language }) => {
  const isEs = language === 'es';

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Hero Background Image with custom overlay */}
      {brand.heroBg && (
        <div className="absolute inset-0 z-0">
          <img 
            src={brand.heroBg} 
            alt="" 
            className="w-full h-full object-cover opacity-35 pointer-events-none select-none blur-[1px]" 
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/45 to-slate-950 pointer-events-none" />
        </div>
      )}

      {/* Dynamic ambient glow circle matching the active brand color */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] xl:w-[700px] h-[300px] sm:h-[500px] xl:h-[700px] rounded-full blur-[80px] sm:blur-[120px] xl:blur-[160px] opacity-[0.08] pointer-events-none transition-all duration-1000 ${brand.glowClass}`}
      />

      {/* Cybernetic High-Tech Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Ambient gradient fade-out at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-lightBg to-transparent pointer-events-none" />

      {/* Centerpiece Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 xl:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 py-16">
        
        {/* Left Side: Medical Copywriting */}
        <div className="flex-1 text-left max-w-xl lg:max-w-2xl animate-fade-in-up">
          {/* Dynamic Category Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className={`w-1.5 h-1.5 rounded-full ${brand.accentBg} animate-pulse`} />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white/90">
              {isEs ? 'Innovación Médica' : 'Medical Innovation'}
            </span>
          </div>

          {/* Tagline Heading */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] mb-6">
            {brand.tagline}
          </h1>

          {/* Scientific Descriptor */}
          <p className="text-slate-300 font-medium text-sm sm:text-base xl:text-lg leading-relaxed mb-8 max-w-lg">
            {brand.description}
          </p>

          {/* Interactive B2B Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToCatalog}
              className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-extrabold transition-all duration-300 shadow-md text-white ${brand.accentBg} ${brand.accentHover} transform hover:scale-105 active:scale-95`}
            >
              <Network className="w-4 h-4" />
              <span>{isEs ? 'Explorar Portafolio' : 'Explore Portfolio'}</span>
            </button>
            
            <a
              href="#about-section"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-extrabold transition-all duration-300 border border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transform hover:scale-105 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>{isEs ? 'Ver Cumplimiento' : 'View Compliance'}</span>
            </a>
          </div>
        </div>

        {/* Right Side: The absolute Protagonist (Centered Brand Logo) */}
        <div className="flex-1 flex items-center justify-center animate-fade-in">
          <div className="relative group">
            {/* Soft backdrop radial shadow to lift the logo */}
            <div className="absolute inset-0 bg-white/5 rounded-[40px] blur-2xl transform scale-90 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />

            {/* Glowing technology outline frame */}
            <div className={`absolute -inset-0.5 rounded-[48px] bg-gradient-to-r ${brand.themeGradient} opacity-20 group-hover:opacity-40 blur-sm transition-all duration-500`} />

            {/* Logo Solid Capsule */}
            <div className="relative bg-white rounded-[44px] p-8 sm:p-12 xl:p-16 w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-white/10">
              <img 
                src={brand.logo} 
                alt={`${brand.name} Corporate Logo`} 
                className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Downward Scroll indicator */}
      <button 
        onClick={scrollToCatalog}
        aria-label="Scroll to catalog"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors duration-300 focus:outline-none"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-widest">
          {isEs ? 'Catálogo' : 'Catalog'}
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default BrandHero;
