import { useState } from 'react';
import { useLanguage } from '../../../../context/LanguageContext';
import { X, Check, Send, ArrowRight, AlertCircle } from 'lucide-react';

const whatsAppLink = "https://wa.me/59133400835?text=Hola%20Maines!%20Quisiera%20más%20información%20para%20unirme%20a%20su%20red%20de%20distribuidores.";

/**
 * Reusable modal-driven contact form component with local state
 */
export const ContactForm = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  if (!isOpen) return null;

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

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div 
        className="w-full max-w-[480px] glass-card rounded-[32px] border border-white/60 p-6 sm:p-8 text-left shadow-2xl relative bg-white animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-primary-dark hover:text-accent transition-colors duration-200 cursor-pointer"
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
              onClick={onClose}
              className="w-full py-3 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-light transition-colors duration-200 cursor-pointer"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent bg-white/50 text-xs sm:text-sm font-medium transition-colors duration-200 resize-none"
              />
            </div>

            {/* Error Banner */}
            {status === 'error' && (
              <div className="flex gap-2 items-center p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{t('ctaSection.formError')}</span>
              </div>
            )}

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-extrabold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all duration-300 cursor-pointer"
              >
                <span>{status === 'sending' ? t('ctaSection.formSending') : t('ctaSection.formSubmit')}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              <a 
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-extrabold text-primary border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300 cursor-pointer"
              >
                <span>{language === 'es' ? 'Contacto WhatsApp' : 'WhatsApp Contact'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
