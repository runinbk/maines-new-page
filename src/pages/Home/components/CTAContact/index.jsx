import { useState, useEffect } from 'react';
import { useLanguage } from '../../../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../../../../components/ui/Icons';
import { ContactForm } from './ContactForm';
import { ReelsCarousel } from './ReelsCarousel';

const whatsAppLink = "https://wa.me/59133400835?text=Hola%20Maines!%20Quisiera%20más%20información%20para%20unirme%20a%20su%20red%20de%20distribuidores.";

/**
 * CTAContact - Decomposed orchestrator component for leads capture form and Supabase video reels
 */
const CTAContact = () => {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle body scroll locking when any modal is open
  useEffect(() => {
    if (isModalOpen || isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isVideoModalOpen]);

  return (
    <section 
      id="contact" 
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden px-4 xs:px-6 sm:px-12 lg:px-20"
    >
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 filter blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-[120px]" />
      </div>

      <div className="mx-auto w-full px-2 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px]">
        
        {/* Asymmetrical Closure Module */}
        <div className="glass-card rounded-[40px] border border-slate-200/50 p-8 sm:p-12 lg:p-16 bg-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column: Redesigned and Decluttered CTA */}
            <div className="lg:col-span-6 text-left space-y-6 flex flex-col justify-center">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {language === 'es' ? 'Contacto y Canales' : 'Contact & Channels'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.15] text-primary-dark tracking-tight">
                  {t('ctaSection.ctaTitle')}
                </h2>
                <div className="w-12 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full" />
              </div>

              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed font-sans">
                {t('ctaSection.ctaSub')}
              </p>

              {/* Distribuidores CTA Card */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-[24px] p-6 shadow-sm space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-primary" />
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold font-display text-primary-dark">
                    {language === 'es' ? '¿Listo para formar parte de nuestra red?' : 'Ready to join our network?'}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                    {language === 'es' 
                      ? 'Inicie una consulta comercial personalizada para su clínica, centro médico o farmacia.' 
                      : 'Start a customized business consultation for your clinic, medical center, or pharmacy.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button 
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
                  >
                    <span>{t('ctaSection.btnPrimary')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <a 
                    href={whatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#0B0F19] border border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Contacto WhatsApp' : 'WhatsApp Contact'}</span>
                  </a>
                </div>
              </div>

              {/* Social Connect block */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-bold text-slate-400 block tracking-widest uppercase font-sans">
                  {t('ctaSection.socialTitle')}
                </span>
                <div className="flex gap-3">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-pink-500 hover:border-pink-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4.5 h-4.5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4.5 h-4.5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-700 hover:border-blue-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: 3D-Interactive Reels Slide Controller */}
            <ReelsCarousel onModalStateChange={setIsVideoModalOpen} />

          </div>

        </div>

      </div>

      {/* DYNAMIC CONTACT EMAIL FORM MODAL */}
      <ContactForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CTAContact;
