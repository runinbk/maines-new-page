import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  ArrowRight, Mail, Phone, MapPin, Send, 
  X, Check, AlertCircle, Microscope, Share2 
} from 'lucide-react';

const CTAContact = () => {
  const { t, language } = useLanguage();
  const revealRef = useScrollReveal();
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate direct secure email dispatch
    setTimeout(() => {
      if (formData.name && formData.email) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  // WhatsApp Action Link
  const whatsAppLink = "https://wa.me/59133400835?text=Hola%20Maines!%20Quisiera%20más%20información%20para%20unirme%20a%20su%20red%20de%20distribuidores.";

  return (
    <section ref={revealRef} id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Visual Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/5 filter blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Asymmetrical CTA Grid */}
        <div className="glass-card rounded-[40px] border border-slate-100 p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            
            {/* Left Content Side */}
            <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] tracking-tight text-primary-dark">
                  {language === 'es' ? (
                    <>
                      Eleve su <span className="text-accent font-bold">Excelencia Clínica</span>
                    </>
                  ) : (
                    <>
                      Elevate Your <span className="text-accent font-bold">Clinical Excellence</span>
                    </>
                  )}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium font-sans leading-relaxed max-w-xl">
                  {language === 'es'
                    ? "Incorpore la innovación médica y biotecnológica de Jetema en su práctica profesional. Conecte de forma directa con la red de suministro oficial de Maines S.R.L. para consultorios y clínicas autorizadas en todo el país."
                    : "Incorporate Jetema's medical and biotechnological innovation into your professional practice. Connect directly with the official supply network of Maines S.R.L. for authorized clinics and offices nationwide."
                  }
                </p>
              </div>

              {/* Dynamic Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2">
                
                {/* Primary WhatsApp Action */}
                <a 
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                >
                  <span>{language === 'es' ? 'Contacto por WhatsApp' : 'Contact via WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>

                {/* Secondary email modal trigger */}
                <button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setStatus('idle');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-primary border border-primary/20 bg-white/40 hover:bg-slate-100/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <span>{language === 'es' ? 'Solicitar Información' : 'Request Information'}</span>
                  <Mail className="w-4 h-4 text-[#0A0E12]/70" />
                </button>
              </div>

            </div>

            {/* Right Interactive DNA Helix Design */}
            <div className="lg:col-span-5 relative flex items-center justify-center h-[350px]">
              
              {/* DNA SVG Helix (Interactive 3D graphic effect) */}
              <svg className="w-3/5 h-full text-slate-200 animate-pulse duration-[5s] transform translate-x-4" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back strand */}
                <path d="M 30 10 Q 70 50 30 90 T 30 170" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Front strand */}
                <path d="M 70 10 Q 30 50 70 90 T 70 170" stroke="#0ea5e9" strokeWidth="2.5" className="glow-blue" />
                
                {/* Connecting nucleobases */}
                <line x1="30" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="0.8" />
                <line x1="43" y1="50" x2="57" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <line x1="70" y1="80" x2="30" y2="80" stroke="currentColor" strokeWidth="0.8" />
                <line x1="57" y1="110" x2="43" y2="110" stroke="currentColor" strokeWidth="0.8" />
                <line x1="30" y1="140" x2="70" y2="140" stroke="#0ea5e9" strokeWidth="1" />
                
                {/* Glowing Nodes */}
                <circle cx="70" cy="10" r="3.5" fill="#0ea5e9" />
                <circle cx="30" cy="90" r="3.5" fill="#0ea5e9" />
                <circle cx="70" cy="170" r="3.5" fill="#0ea5e9" />
              </svg>

              {/* Floating DNA Bullet 1: Logistics */}
              <div className="absolute top-10 right-0 glass-card py-3 px-4 rounded-[2px] flex items-center gap-3 border border-white max-w-[200px] shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-1.5 rounded-[2px] bg-cyan-100 text-cyan-600">
                  <Microscope className="w-4 h-4" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[10px] font-bold text-primary-dark block">{t('ctaSection.bullet1Title')}</span>
                  <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">{t('ctaSection.bullet1Sub')}</span>
                </div>
              </div>

              {/* Floating DNA Bullet 2: Network */}
              <div className="absolute bottom-16 left-0 glass-card py-3 px-4 rounded-[2px] flex items-center gap-3 border border-white max-w-[200px] shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-1.5 rounded-[2px] bg-indigo-100 text-indigo-600">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[10px] font-bold text-primary-dark block">{t('ctaSection.bullet2Title')}</span>
                  <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">{t('ctaSection.bullet2Sub')}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DYNAMIC CONTACT EMAIL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md transition-all duration-300">
          
          {/* Modal Container */}
          <div 
            className="w-full max-w-[480px] glass-card rounded-[32px] border border-white/60 p-6 sm:p-8 text-left shadow-2xl relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-primary-dark hover:text-accent transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xl sm:text-2xl font-extrabold font-display text-primary-dark">
                {t('ctaSection.contactTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {t('ctaSection.contactSub')}
              </p>
            </div>

            {/* Submit Status Layouts */}
            {status === 'success' ? (
              <div className="space-y-6 py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-slate-600 max-w-[280px]">
                  {t('ctaSection.formSuccess')}
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-light transition-colors duration-200"
                >
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-primary-dark/70 uppercase tracking-wider block">
                    {t('ctaSection.formName')} *
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
                  />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-primary-dark/70 uppercase tracking-wider block">
                      {t('ctaSection.formEmail')} *
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-primary-dark/70 uppercase tracking-wider block">
                      {t('ctaSection.formPhone')}
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-primary-dark/70 uppercase tracking-wider block">
                    {t('ctaSection.formMessage')}
                  </label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="flex gap-2 items-center p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t('ctaSection.formError')}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-extrabold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all duration-300"
                  >
                    <span>{status === 'sending' ? t('ctaSection.formSending') : t('ctaSection.formSubmit')}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      )}

    </section>
  );
};

export default CTAContact;
