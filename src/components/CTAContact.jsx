import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Mail, Phone, MapPin, Send, 
  X, Check, AlertCircle, Play, Volume2, Laptop
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CTAContact = () => {
  const { t, language } = useLanguage();
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
    <section 
      id="contact" 
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"
    >
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 filter blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10 max-w-7xl">
        
        {/* Asymmetrical Closure Module */}
        <div className="glass-card rounded-[40px] border border-slate-200/50 p-8 sm:p-12 lg:p-16 bg-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column: Copy & Blocks */}
            <div className="lg:col-span-7 text-left space-y-8">
              
              {/* Brand Backing Segment */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-500 font-medium font-sans leading-relaxed relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                {t('ctaSection.brandBacking')}
              </motion.div>

              {/* Grid split for CTA and Social Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Call to Action Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4 text-left"
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight text-primary-dark">
                    {t('ctaSection.ctaTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium font-sans leading-relaxed">
                    {t('ctaSection.ctaSub')}
                  </p>
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setIsModalOpen(true);
                        setStatus('idle');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
                    >
                      <span>{t('ctaSection.btnPrimary')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>

                {/* Social Connect Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4 text-left"
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight text-primary-dark">
                    {t('ctaSection.socialTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium font-sans leading-relaxed">
                    {t('ctaSection.socialSub')}
                  </p>
                  
                  {/* Social Buttons list */}
                  <div className="flex gap-3 pt-2">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-pink-500 hover:border-pink-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-700 hover:border-blue-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>

              </div>

            </div>

            {/* Right Column: Ultra-Clean Video Player Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 bg-gradient-to-br from-primary-dark via-slate-900 to-black group cursor-pointer group select-none"
              >
                {/* Visual tech grid overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_75%)]" />
                
                {/* Placeholder thumbnail content */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 text-white z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-accent/20 border border-accent/30 text-accent rounded-full tracking-wider font-mono">
                      VIDEO CORPORATIVO
                    </span>
                    <Volume2 className="w-4 h-4 text-slate-400 opacity-60" />
                  </div>
                  
                  {/* Title overlay */}
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-xs font-bold font-display tracking-wide text-white">
                      Maines S.R.L.
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {language === 'es' ? 'La excelencia operativa en salud' : 'Operational excellence in healthcare'}
                    </p>
                  </div>
                </div>

                {/* Centered Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-15">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 ring-4 ring-white/5 group-hover:ring-white/10 relative">
                    <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-30" />
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                </div>

                {/* Simulated controls bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-950/80 backdrop-blur-sm border-t border-white/5 flex items-center justify-between px-4 z-10 text-[9px] text-slate-400 font-mono">
                  <span>0:00 / 2:45</span>
                  <div className="flex-grow mx-4 h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-1/4 bg-accent" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Laptop className="w-3.5 h-3.5 text-slate-500 hover:text-white transition-colors" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* DYNAMIC CONTACT EMAIL FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-[480px] glass-card rounded-[32px] border border-white/60 p-6 sm:p-8 text-left shadow-2xl relative bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
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
                    onClick={() => setIsModalOpen(false)}
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

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC VIDEO MODAL PLAYER */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            {/* Video Box */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-[850px] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:text-accent transition-colors duration-200 cursor-pointer z-20"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Wireframe simulated video loop (or black screen with nice logo) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark to-slate-950 text-white p-8 text-center space-y-4 select-none z-10">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent animate-pulse">
                  <Play className="w-10 h-10 fill-accent ml-1.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display tracking-wide text-white">
                    {language === 'es' ? 'Presentación Corporativa Maines S.R.L.' : 'Maines S.R.L. Corporate Presentation'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm">
                    {language === 'es' 
                      ? 'Aquí se reproducirá el video corporativo definitivo importado de sus recursos PDF.' 
                      : 'Your final corporate video injected from the PDF assets will play here.'
                    }
                  </p>
                </div>
                <span className="text-[9px] text-slate-600 font-mono tracking-widest bg-slate-900/50 py-1 px-3 border border-slate-800/80 rounded-full">
                  [video-institucional.mp4]
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CTAContact;
