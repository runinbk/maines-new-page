import { Award } from 'lucide-react';

/**
 * BrandAbout Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandAbout = ({ brand, language, onBackToHome }) => {
  const isEs = language === 'es';
  const data = brand.about;

  return (
    <section id="about-section" className="py-20 lg:py-28 px-6 sm:px-12 xl:px-20 bg-white w-full border-t border-slate-200/40 relative overflow-hidden">
      
      {/* Absolute decorative blurred circle */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-slate-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side (5/12): Premium Institutional Image & Floating Info Cards (swapped to left on desktop) */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="relative w-full max-w-[420px] aspect-[1.25] md:aspect-[1.3] group">
            
            {/* Soft decorative background glow matching the brand theme */}
            <div className={`absolute -inset-2 rounded-[32px] bg-gradient-to-r ${brand.themeGradient} opacity-[0.08] blur-xl pointer-events-none`} />
            
            {/* Main Institutional Image Placeholder */}
            <div className="w-full h-full rounded-[30px] overflow-hidden border border-slate-200 shadow-2xl relative z-0">
              <img 
                src={
                  brand.id === 'jetema' 
                    ? 'https://placehold.co/600x400/E2E8F0/1E293B?text=Composicion+Logistica' 
                    : brand.id === 'dermclar' 
                      ? 'https://placehold.co/600x400/F5F3FF/8B5CF6?text=Dermclar+Logistics'
                      : 'https://placehold.co/600x400/ECFDF5/10B981?text=Xtralife+Logistics'
                } 
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Soft vignette overlay */}
              <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
            </div>

            {/* Custom copy bullets mapping */}
            {(() => {
              const bulletsList = brand.id === 'jetema' ? [
                { title: "Suministro Directo", text: isEs ? "Garantizando la cadena de frío y bioseguridad." : "Guaranteed cold chain and biosecurity." },
                { title: "Autenticidad Garantizada", text: isEs ? "Código de trazabilidad único auditable por profesionales de la salud." : "Unique traceability code auditable by healthcare professionals." },
                { title: "Cobertura Nacional", text: isEs ? "Distribución ágil, rápida y segura en cajas térmicas controladas." : "Fast and secure distribution in temperature-controlled boxes." }
              ] : data.bullets;

              return (
                <>
                  {/* Central Badge Overlay: Bullet 0 */}
                  {bulletsList[0] && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-xl text-center z-10 pointer-events-none">
                      <span className="text-[10px] sm:text-xs font-extrabold text-white uppercase tracking-widest font-mono">
                        {bulletsList[0].title}
                      </span>
                    </div>
                  )}

                  {/* Floating Card 1: Bullet 1 */}
                  {bulletsList[1] && (
                    <div className="absolute -top-8 -right-6 md:-right-10 max-w-[210px] sm:max-w-[240px] bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl text-left z-20 transition-all duration-500 hover:scale-[1.03]">
                      <h4 className="text-xs sm:text-sm font-bold text-primary-dark tracking-tight">
                        {bulletsList[1].title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed mt-1">
                        {bulletsList[1].text}
                      </p>
                    </div>
                  )}

                  {/* Floating Card 2: Bullet 2 */}
                  {bulletsList[2] && (
                    <div className="absolute -bottom-8 -left-6 md:-left-10 max-w-[210px] sm:max-w-[240px] bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl text-left z-20 transition-all duration-500 hover:scale-[1.03]">
                      <h4 className="text-xs sm:text-sm font-bold text-primary-dark tracking-tight">
                        {bulletsList[2].title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed mt-1">
                        {bulletsList[2].text}
                      </p>
                    </div>
                  )}
                </>
              );
            })()}

          </div>
        </div>

        {/* Right Side (7/12): Strategic Relationship & Values (swapped to right on desktop) */}
        <div className="lg:col-span-7 flex flex-col text-left lg:text-right items-start lg:items-end order-1 lg:order-2 animate-fade-in-up">
          
          {/* Dynamic Partnership Capsule */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-slate-100 text-primary-light mb-6`}>
            <Award className="w-3.5 h-3.5" />
            <span>{data.pretitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#0D1F3B] font-display tracking-tight leading-[1.15] mb-6">
            {isEs ? (
              <>
                <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Distribución Oficial</span> y <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Respaldo</span> de Maines SRL
              </>
            ) : (
              <>
                <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Official Distribution</span> & <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold`}>Support</span> of Maines SRL
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-10 max-w-2xl">
            {data.description}
          </p>

          {/* Action Button */}
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-4 mt-2 w-full">
            <button
              onClick={onBackToHome}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold transition-all duration-300 shadow-md text-white ${brand.accentBg} ${brand.accentHover} transform hover:scale-105 active:scale-95 cursor-pointer`}
            >
              <span>{isEs ? 'Ir al Portal Principal' : 'Go to Main Portal'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandAbout;
