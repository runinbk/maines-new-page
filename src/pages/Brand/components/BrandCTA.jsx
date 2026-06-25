import { useState, memo } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, X, Send } from 'lucide-react';
import ImageWithSkeleton from '../../../components/ui/ImageWithSkeleton';

const getHexColor = (tailwindClass, defaultColor = '#4C5A9D') => {
  if (!tailwindClass) return defaultColor;
  if (tailwindClass === 'bg-emerald-500') return '#10b981';
  if (tailwindClass === 'hover:bg-emerald-600') return '#059669';
  const match = tailwindClass.match(/\[#([0-9a-fA-F]+)\]/);
  return match ? `#${match[1]}` : defaultColor;
};

/**
 * BrandCTA Component
 * @param {Object} props
 * @param {Object} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandCTA = ({ brand, language }) => {
  const isEs = language === 'es';
  const brandId = brand.id;

  // Contact details
  const contactPhone = '+591 77099888';
  const cleanPhoneForWa = contactPhone.replace(/\+/g, '').replace(/\s/g, '');
  const locationText = isEs
    ? 'Calle San Ramón Nro. 3270 - Santa Cruz, Bolivia'
    : 'San Ramon St. No. 3270 - Santa Cruz, Bolivia';

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  // Button Hover States
  const [isWaHovered, setIsWaHovered] = useState(false);
  const [isSuccessHovered, setIsSuccessHovered] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate sending email pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setFormState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1200);
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    // Reset status back to idle after animation delay
    setTimeout(() => setStatus('idle'), 300);
  };

  // WhatsApp pre-filled text
  const waSuffix = isEs
    ? (brandId === 'jetema' ? 'en mi práctica profesional.' : (brandId === 'dermclar' ? 'en mi clínica médica.' : 'en mi farmacia.'))
    : (brandId === 'jetema' ? 'in my professional practice.' : (brandId === 'dermclar' ? 'in my medical clinic.' : 'in my pharmacy.'));
  const waText = encodeURIComponent(
    isEs
      ? `Hola Maines SRL, deseo incorporar el portafolio de ${brand.name} ${waSuffix}`
      : `Hello Maines SRL, I would like to incorporate the ${brand.name} portfolio ${waSuffix}`
  );

  return (
    <section id="cta-section" className="py-20 lg:py-28 px-6 sm:px-12 xl:px-20 bg-white w-full text-left relative overflow-hidden border-t border-slate-200/40">

      {/* Decorative background visual blob */}
      <div className={`absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-slate-500/5 blur-[120px] pointer-events-none`} />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left Column: Title, Copy, Info and Buttons */}
        <div className="w-full flex flex-col items-start text-left space-y-8 animate-fade-in-up">

          {/* Main Title with brand gradient highlighted words */}
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#0D1F3B] font-display tracking-tight leading-[1.15] max-w-2xl">
            {isEs ? (
              brandId === 'jetema' ? (
                <>
                  ¿<span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>Desea incorporar</span> el portafolio de <span className="font-extrabold text-[#0D1F3B]">Jetema</span> en su <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>práctica profesional</span>?
                </>
              ) : brandId === 'dermclar' ? (
                <>
                  ¿<span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>Desea incorporar</span> el portafolio de <span className="font-extrabold text-[#0D1F3B]">Dermclar</span> en su <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>clínica médica</span>?
                </>
              ) : (
                <>
                  ¿<span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>Desea incorporar</span> el portafolio de <span className="font-extrabold text-[#0D1F3B]">Xtralife</span> en su <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>farmacia</span>?
                </>
              )
            ) : (
              brandId === 'jetema' ? (
                <>
                  Would you like to <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>incorporate</span> the <span className="font-extrabold text-[#0D1F3B]">Jetema</span> portfolio into your <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>professional practice</span>?
                </>
              ) : brandId === 'dermclar' ? (
                <>
                  Would you like to <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>incorporate</span> the <span className="font-extrabold text-[#0D1F3B]">Dermclar</span> portfolio into your <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>medical clinic</span>?
                </>
              ) : (
                <>
                  Would you like to <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>incorporate</span> the <span className="font-extrabold text-[#0D1F3B]">Xtralife</span> portfolio into your <span className={`bg-gradient-to-r ${brand.themeGradient} bg-clip-text text-transparent font-extrabold inline-block`}>pharmacy</span>?
                </>
              )
            )}
          </h2>

          {/* Left-bordered description */}
          <div className="pl-4 border-l-[3.5px] text-slate-500 font-semibold text-sm sm:text-base leading-relaxed max-w-xl" style={{ borderLeftColor: getHexColor(brand.accentBg) }}>
            {(typeof brand.cta?.subtitle === 'object' ? brand.cta.subtitle[isEs ? 'es' : 'en'] : brand.cta?.subtitle) || (isEs
              ? 'Contacte directamente con un asesor comercial de Maines SRL para recibir atención personalizada sobre precios de distribuidor, capacitaciones clínicas y protocolos certificados.'
              : 'Contact a commercial advisor from Maines SRL directly to receive personalized support regarding distributor pricing, clinical training, and certified protocols.')}
          </div>

          {/* Contact Details Info Row */}
          <div className="flex flex-col sm:flex-row gap-6 text-slate-600 text-xs sm:text-sm font-bold w-full max-w-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                <Phone className="w-4 h-4 text-slate-400" style={{ color: getHexColor(brand.accentBg) }} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">{isEs ? 'Teléfono' : 'Phone'}</span>
                <span className="text-slate-800 font-extrabold block mt-0.5">{contactPhone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                <MapPin className="w-4 h-4 text-slate-400" style={{ color: getHexColor(brand.accentBg) }} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">{isEs ? 'Dirección' : 'Office'}</span>
                <span className="text-slate-800 font-extrabold block mt-0.5" title={locationText}>{locationText}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${cleanPhoneForWa}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsWaHovered(true)}
              onMouseLeave={() => setIsWaHovered(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
              style={{ backgroundColor: isWaHovered ? getHexColor(brand.accentHover) : getHexColor(brand.accentBg) }}
            >
              <span>{(typeof brand.cta?.primaryBtn === 'object' ? brand.cta.primaryBtn[isEs ? 'es' : 'en'] : brand.cta?.primaryBtn) || (isEs ? 'Contactar por WhatsApp' : 'Contact via WhatsApp')}</span>
              <Send className="w-3.5 h-3.5" />
            </a>

            {/* Email Inquiry Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{(typeof brand.cta?.secondaryBtn === 'object' ? brand.cta.secondaryBtn[isEs ? 'es' : 'en'] : brand.cta?.secondaryBtn) || (isEs ? 'Enviar Correo' : 'Send Email Inquiry')}</span>
            </button>

          </div>

        </div>

        {/* Right Column: CTA Image */}
        <div className="w-full flex items-center justify-center mt-10 lg:mt-0">
          <ImageWithSkeleton
            src={
              brandId === 'jetema'
                ? 'https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/jetema-cta10.webp'
                : (brandId === 'dermclar'
                  ? 'https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/dermclar-cta.webp'
                  : 'https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/xtralife/xtralife-cta.webp')
            }
            alt="Biotechnology showcase"
            className="w-full max-w-[480px] h-auto object-contain rounded-[24px] shadow-2xl border border-slate-100/60"
            loading="lazy"
          />
        </div>

      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={closeFormModal}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          />

          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="brand-cta-title"
            className="bg-white border border-slate-200 rounded-[28px] w-full max-w-lg shadow-2xl p-6 sm:p-8 relative z-10 text-left animate-fade-in"
          >
            <button
              onClick={closeFormModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0D1F3B] tracking-tight">
                  {isEs ? '¡Consulta Enviada!' : 'Inquiry Sent Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed max-w-xs">
                  {isEs
                    ? 'Su mensaje ha sido enviado exitosamente. Un asesor comercial de Maines SRL se contactará a la brevedad.'
                    : 'Your inquiry has been logged. A Maines SRL advisor will reach out shortly.'}
                </p>
                <button
                  onClick={closeFormModal}
                  onMouseEnter={() => setIsSuccessHovered(true)}
                  onMouseLeave={() => setIsSuccessHovered(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white transition-all duration-355 transform hover:scale-105 cursor-pointer mt-4"
                  style={{ backgroundColor: isSuccessHovered ? getHexColor(brand.accentHover) : getHexColor(brand.accentBg) }}
                >
                  {isEs ? 'Entendido' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1.5 pr-8">
                  <h3 id="brand-cta-title" className="text-lg font-extrabold text-[#0D1F3B] font-display tracking-tight leading-tight">
                    {isEs ? 'Enviar Consulta por Correo' : 'Send Email Inquiry'}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    {isEs
                      ? 'Rellene los datos corporativos para solicitar catálogos de precios y fichas regulatorias.'
                      : 'Fill in corporate details to request commercial catalogs and regulatory records.'}
                  </p>
                </div>

                {status === 'error' && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl flex items-center gap-2 text-red-500 text-xs font-medium">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{isEs ? 'Ocurrió un error. Intente nuevamente.' : 'An error occurred. Please try again.'}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="brand-cta-name" className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Nombre Completo' : 'Full Name'} *
                    </label>
                    <input
                      id="brand-cta-name"
                      type="text"
                      name="fullName"
                      required
                      value={formState.fullName}
                      onChange={handleInputChange}
                      placeholder={isEs ? "Dr. / Dra. Nombre Apellido" : "Dr. John Doe"}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="brand-cta-email" className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                        {isEs ? 'Correo Electrónico' : 'Email'} *
                      </label>
                      <input
                        id="brand-cta-email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="brand-cta-phone" className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                        {isEs ? 'Teléfono / Celular' : 'Phone'} *
                      </label>
                      <input
                        id="brand-cta-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="+591 70000000"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="brand-cta-message" className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Mensaje / Consulta' : 'Message'} *
                    </label>
                    <textarea
                      id="brand-cta-message"
                      name="message"
                      required
                      rows="4"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder={isEs ? "Deseo recibir cotización sobre el portafolio..." : "I would like to request product portfolio pricing..."}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setIsSubmitHovered(true)}
                  onMouseLeave={() => setIsSubmitHovered(false)}
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-99 focus:outline-none flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                  style={{ backgroundColor: isSubmitHovered ? getHexColor(brand.accentHover) : getHexColor(brand.accentBg) }}
                >
                  <span>{isSubmitting ? (isEs ? 'Enviando...' : 'Sending...') : (isEs ? 'Enviar Mensaje' : 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(BrandCTA);
