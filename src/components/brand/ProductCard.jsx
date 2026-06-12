import { useState } from 'react';
import ProductGallery from './ProductGallery';
import { Send, FileText, CheckCircle2, Play, BookOpen, FileSpreadsheet } from 'lucide-react';

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

/**
 * ProductCard Component
 * @param {Object} props
 * @param {import('../../data/productsData').Product} props.product - The active selected product
 * @param {import('../../data/productsData').BrandConfig} props.brand - The parent brand configuration
 * @param {string} props.language - Active language ('es' | 'en')
 */
const ProductCard = ({ product, brand, language }) => {
  const isEs = language === 'es';
  
  // Isolated states preventing parent re-renders
  const hasSpecs = product.technicalSpecs || (product.specifications && product.specifications.length > 0);
  const [prevProductId, setPrevProductId] = useState(product.id);
  const [activeTab, setActiveTab] = useState(hasSpecs ? 'specs' : 'sample');
  
  if (product.id !== prevProductId) {
    setPrevProductId(product.id);
    setActiveTab(hasSpecs ? 'specs' : 'sample');
  }

  const [showSampleSuccess, setShowSampleSuccess] = useState(false);
  const [isSubmittingSample, setIsSubmittingSample] = useState(false);

  const handleRequestSample = (e) => {
    e.preventDefault();
    setIsSubmittingSample(true);
    // Simulate lightweight direct network pipeline / timeout
    setTimeout(() => {
      setIsSubmittingSample(false);
      setShowSampleSuccess(true);
      setTimeout(() => setShowSampleSuccess(false), 4000);
    }, 1000);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5 text-white/90" />;
      case 'cases': return <BookOpen className="w-5 h-5 text-white/90" />;
      default: return <FileSpreadsheet className="w-5 h-5 text-white/90" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100/80 shadow-sm p-6 sm:p-8 flex flex-col gap-8 animate-fade-in">
      
      {/* Product Card Top Row: Title, Category and Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          {/* Certificate Regulatory Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${brand.accentBg}/10 ${brand.accentColor} mb-2.5`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{product.certBadge}</span>
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark font-display tracking-tight">
            {product.name}
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">
            {product.descriptor}
          </p>
        </div>

        {/* Dynamic Action Trigger Row */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/59133400835?text=Hola%20Maines%20SRL,%20deseo%20información%20sobre%20el%20producto%20${encodeURIComponent(product.name)}%20de%20la%20marca%20${brand.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${brand.accentBg} ${brand.accentHover}`}
          >
            <span>{isEs ? 'Ordenar Ahora' : 'Order Now'}</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Row: Left Media - Right Text Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5/12): Isolated Media Gallery Slider */}
        <div className="lg:col-span-5 w-full">
          <ProductGallery 
            images={product.gallery} 
            productName={product.name} 
            brand={brand} 
          />
        </div>

        {/* Right Column (7/12): Product overview & Quick buttons */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6 text-left">
          
          <div className="flex flex-col gap-4">
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
              {isEs ? 'Categoría Comercial' : 'Commercial Category'}
            </span>
            <p className="text-sm font-extrabold text-primary-light uppercase tracking-wide">
              {isEs ? product.categoryLabel.es : product.categoryLabel.en}
            </p>
            
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase mt-2">
              {isEs ? 'Descripción del Producto' : 'Product Description'}
            </span>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {product.composition}
            </p>

            {/* Principios Activos Renderizado Condicional */}
            {product.activeIngredients && (
              <div className="mt-2 space-y-1">
                <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase block">
                  {isEs ? 'Principios Activos' : 'Active Ingredients'}
                </span>
                <p className="text-sm sm:text-base text-slate-700 font-bold">
                  {product.activeIngredients}
                </p>
              </div>
            )}

            {/* Zonas de Aplicación Renderizado Condicional */}
            {product.applicationZones && (
              <div className="mt-2 space-y-1.5">
                <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase block">
                  {isEs ? 'Zonas de Aplicación' : 'Application Zones'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.applicationZones.map((zone, idx) => {
                    const icon = getZoneIcon(zone);
                    return (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors duration-200 cursor-default shadow-xs"
                        style={{
                          backgroundColor: `rgba(${brand.id === 'jetema' ? '76, 90, 157' : '14, 165, 233'}, 0.08)`,
                          borderColor: `rgba(${brand.id === 'jetema' ? '76, 90, 157' : '14, 165, 233'}, 0.2)`,
                          color: brand.id === 'jetema' ? '#4C5A9D' : '#0ea5e9'
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
          </div>

          {/* Interactive tabs controller for dynamic info block */}
          {hasSpecs && (
            <div className="flex items-center gap-3 border-b border-slate-100 pb-0.5 mt-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 border-b-2 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                  activeTab === 'specs'
                    ? `border-cyan-500 text-primary-dark`
                    : 'border-transparent text-slate-400 hover:text-slate-500'
                }`}
                style={{
                  borderColor: activeTab === 'specs' ? `var(--color-${brand.accentBg.replace('bg-', '')})` : undefined
                }}
              >
                {isEs ? 'Especificaciones' : 'Specifications'}
              </button>
              
              <button
                onClick={() => setActiveTab('sample')}
                className={`px-4 py-2 border-b-2 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                  activeTab === 'sample'
                    ? `border-cyan-500 text-primary-dark`
                    : 'border-transparent text-slate-400 hover:text-slate-500'
                }`}
                style={{
                  borderColor: activeTab === 'sample' ? `var(--color-${brand.accentBg.replace('bg-', '')})` : undefined
                }}
              >
                {isEs ? 'Muestra Médica' : 'Request Sample'}
              </button>
            </div>
          )}

          {/* Dynamic Tab Panel Container */}
          <div className="w-full min-h-[160px] flex items-center justify-stretch">
            
            {activeTab === 'specs' && hasSpecs && (
              <div className="w-full overflow-hidden border border-slate-100 rounded-2xl animate-fade-in text-left">
                <table className="w-full text-xs sm:text-sm font-medium">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="px-4 py-3 text-left w-1/3 font-bold">{isEs ? 'Parámetro' : 'Parameter'}</th>
                      <th className="px-4 py-3 text-left font-bold">{isEs ? 'Especificación' : 'Specification'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {(product.specifications || []).map((spec, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-4 py-2.5 font-semibold text-primary-dark">{spec.label}</td>
                        <td className="px-4 py-2.5">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'sample' && (
              <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-100 animate-fade-in text-left">
                {showSampleSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-4 gap-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                    <h4 className="text-sm font-bold text-primary-dark">
                      {isEs ? '¡Solicitud Recibida!' : 'Request Received!'}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs font-semibold leading-relaxed">
                      {isEs 
                        ? 'Un ejecutivo de Maines SRL validará sus credenciales médicas y se contactará vía WhatsApp.' 
                        : 'A Maines SRL executive will validate your medical credentials and reach out.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRequestSample} className="flex flex-col gap-3">
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {isEs 
                        ? 'Las muestras médicas están sujetas exclusivamente a profesionales de la salud colegiados en Bolivia.' 
                        : 'Medical samples are exclusively restricted to certified medical practitioners in Bolivia.'}
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        placeholder={isEs ? "Registro Médico / Matrícula" : "Medical License Number"} 
                        className="flex-grow px-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingSample}
                        className={`px-4 py-2 text-xs font-extrabold text-white rounded-xl shadow-sm transition-all duration-200 flex items-center gap-1.5 focus:outline-none disabled:opacity-50 ${brand.accentBg} ${brand.accentHover}`}
                      >
                        {isSubmittingSample ? (
                          <span>...</span>
                        ) : (
                          <>
                            <span>{isEs ? 'Enviar' : 'Request'}</span>
                            <FileText className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Product-Specific Clinical Insights section (Figma layout compatible) */}
      <div className="w-full border-t border-slate-100 pt-8 text-left">
        <h3 className="text-lg font-extrabold text-primary-dark font-display mb-1.5">
          {isEs ? 'Perspectivas Clínicas' : 'Clinical Insights'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-6">
          {isEs ? 'Explore aplicaciones reales y dosificaciones específicas del producto.' : 'Explore real-world applications and specific product workflows.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.clinicalInsights?.map((insight, idx) => (
            <div 
              key={idx}
              className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-slate-800 flex flex-col justify-end p-5 group/insight cursor-pointer"
            >
              {/* Clinical backdrop glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-0 opacity-80 group-hover/insight:opacity-90 transition-opacity duration-300" />
              
              {/* Scientific design line grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Action Play floating icon */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 group-hover/insight:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-300 transform scale-90 group-hover/insight:scale-100">
                {getInsightIcon(insight.type)}
              </div>

              {/* Inner descriptive copy */}
              <div className="relative z-10 text-left">
                <span className={`text-[9px] font-extrabold uppercase tracking-widest ${brand.accentColor}`}>
                  {insight.label}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight mt-1 group-hover/insight:text-white/95">
                  {insight.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
