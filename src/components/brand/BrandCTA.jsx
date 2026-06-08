import { useState } from 'react';
import { Mail, Phone, MapPin, Building, GraduationCap, CheckCircle, AlertCircle, FileDown } from 'lucide-react';

/**
 * BrandCTA Component
 * @param {Object} props
 * @param {import('../../data/productsData').BrandConfig} props.brand - Active brand config
 * @param {string} props.language - Active language ('es' | 'en')
 */
const BrandCTA = ({ brand, language }) => {
  const isEs = language === 'es';
  const ctaData = brand.cta;

  // Local state isolated preventing parent rendering
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    clinicName: '',
    specialty: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate clinical contact pipeline submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setFormState({
        fullName: '',
        email: '',
        phone: '',
        clinicName: '',
        specialty: '',
        city: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="cta-section" className="py-20 lg:py-28 px-6 sm:px-12 xl:px-20 bg-slate-950 w-full relative overflow-hidden text-left">
      {/* Background Image with custom overlay */}
      {brand.ctaBg && (
        <div className="absolute inset-0 z-0">
          <img 
            src={brand.ctaBg} 
            alt="" 
            className="w-full h-full object-cover opacity-15 pointer-events-none select-none blur-[1px]" 
          />
          <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply pointer-events-none" />
        </div>
      )}
      
      {/* Dynamic tech-grid ambient overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      {/* Glow aura */}
      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04] pointer-events-none ${brand.glowClass}`} />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column (5/12): Dynamic lead narrative and assets */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-display tracking-tight leading-[1.15] mb-6">
            {ctaData.title}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-8">
            {ctaData.subtitle}
          </p>

          {/* Quick contact direct values */}
          <div className="flex flex-col gap-4 text-slate-400 text-xs sm:text-sm font-semibold mb-8">
            <div className="flex items-center gap-3">
              <Phone className={`w-4 h-4 ${brand.accentColor}`} />
              <span>(+591) 3-3400835 — {isEs ? 'Atención Médica' : 'Medical Care'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className={`w-4 h-4 ${brand.accentColor}`} />
              <span>mainesbolivia@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className={`w-4 h-4 ${brand.accentColor}`} />
              <span>Calle San Ramón #3270, Barrio Hamacas, Santa Cruz, Bolivia</span>
            </div>
          </div>

          {/* Download Portfolio quick button */}
          <a
            href={brand.products[0]?.downloadUrl || "#"}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-extrabold border border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <FileDown className="w-4 h-4 text-slate-300" />
            <span>{isEs ? 'Descargar Fichas Técnicas' : 'Download Spec Sheets'}</span>
          </a>

        </div>

        {/* Right Column (7/12): Clean B2B Portal Registration Form */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 xl:p-10 shadow-2xl relative">
            
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4 animate-fade-in">
                <div className={`w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20`}>
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {isEs ? 'Formulario Recibido' : 'Form Submitted'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-semibold leading-relaxed">
                  {isEs 
                    ? 'Gracias por su interés. Un asesor comercial especializado de Maines SRL se contactará a la brevedad para canalizar su solicitud.' 
                    : 'Thank you for your interest. A dedicated commercial advisor from Maines SRL will reach out shortly.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-bold underline text-slate-400 hover:text-white mt-4"
                >
                  {isEs ? 'Enviar otra solicitud' : 'Submit another request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-left">
                
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs sm:text-sm font-medium animate-fade-in">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{isEs ? 'Hubo un error. Por favor intente nuevamente.' : 'An error occurred. Please try again.'}</span>
                  </div>
                )}

                {/* Form fields layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Nombre Completo' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formState.fullName}
                      onChange={handleInputChange}
                      placeholder={isEs ? "Dr. / Dra. Nombre Apellido" : "Dr. John Doe"}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Correo Electrónico' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Teléfono / Celular' : 'Phone Number'} *
                    </label>
                    <div className="relative w-full">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="+591 70000000"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Clinic Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Clínica / Consultorio' : 'Clinic / Practice Name'}
                    </label>
                    <div className="relative w-full">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="clinicName"
                        value={formState.clinicName}
                        onChange={handleInputChange}
                        placeholder={isEs ? "Clínica de Estética..." : "Aesthetic Center..."}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                      />
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Specialty */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Especialidad Médica' : 'Medical Specialty'} *
                    </label>
                    <div className="relative w-full">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="specialty"
                        required
                        value={formState.specialty}
                        onChange={handleInputChange}
                        placeholder={isEs ? "Dermatólogo, Cirujano, etc." : "Dermatologist, Surgeon..."}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {isEs ? 'Ciudad' : 'City'} *
                    </label>
                    <div className="relative w-full">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formState.city}
                        onChange={handleInputChange}
                        placeholder={isEs ? "Santa Cruz, La Paz, etc." : "Santa Cruz, La Paz..."}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium"
                      />
                    </div>
                  </div>

                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                    {isEs ? 'Consulta / Mensaje' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder={isEs ? "Deseo recibir cotización y protocolos..." : "I would like to receive product pricing..."}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-medium resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-99 focus:outline-none mt-2 flex items-center justify-center gap-2 cursor-pointer ${brand.accentBg} ${brand.accentHover}`}
                >
                  <span>{isSubmitting ? (isEs ? 'Enviando...' : 'Sending...') : (isEs ? 'Enviar Formulario' : 'Submit Form')}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandCTA;
