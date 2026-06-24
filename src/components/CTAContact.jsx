import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { 
  ArrowRight, ArrowLeft, Send, 
  X, Check, AlertCircle, Play
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './common/Icons';

// Ingest Supabase brand video links
import brandVideos from '../data/brandVideos.json';



const CTAContact = () => {
  const { t, language } = useLanguage();
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Reels Carousel states
  const [playlist] = useState(() => {
    const rawVideos = [];

    // Dermclar
    if (brandVideos.dermclar) {
      brandVideos.dermclar.forEach((url, idx) => {
        rawVideos.push({
          id: `dermclar-${idx}`,
          brand: 'Dermclar',
          user: '@dermclarbolivia',
          category: 'Biotech',
          bgGradient: 'from-violet-600/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Jetema
    if (brandVideos.jetema) {
      brandVideos.jetema.forEach((url, idx) => {
        rawVideos.push({
          id: `jetema-${idx}`,
          brand: 'Jetema',
          user: '@jetemaboliviaoficial',
          category: 'Aesthetics',
          bgGradient: 'from-cyan-600/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Xtralife
    if (brandVideos.xtralife) {
      brandVideos.xtralife.forEach((url, idx) => {
        rawVideos.push({
          id: `xtralife-${idx}`,
          brand: 'Xtralife',
          user: '@xtralifeboliviaoficial',
          category: 'Nutrition',
          bgGradient: 'from-amber-500/30 via-slate-900 to-slate-950',
          videoUrl: url
        });
      });
    }

    // Shuffle all videos randomly and select 9
    return [...rawVideos].sort(() => Math.random() - 0.5).slice(0, 9);
  });
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval for carousel
  useEffect(() => {
    if (playlist.length === 0 || isVideoModalOpen || isHovered) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % playlist.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [playlist.length, isVideoModalOpen, isHovered]);

  // Handle body overflow when modals are open
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

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setActiveIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % playlist.length);
  };

  const getCircularDistance = (idx, activeIdx, length) => {
    let diff = idx - activeIdx;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  const getInstagramLink = (brand) => {
    switch (brand.toLowerCase()) {
      case 'dermclar':
        return 'https://instagram.com/dermclarbolivia';
      case 'jetema':
        return 'https://instagram.com/jetemaboliviaoficial';
      case 'xtralife':
      default:
        return 'https://instagram.com/xtralifeboliviaoficial';
    }
  };

  const getBrandLogo = (brand) => {
    switch (brand.toLowerCase()) {
      case 'dermclar':
        return '/assets/dermclar-logo.png';
      case 'jetema':
        return '/assets/JETEMA-logo.png';
      case 'xtralife':
      default:
        return '/assets/xtralife-logo.png';
    }
  };

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
  const whatsAppLink = "https://wa.me/59133400835?text=Hola%20Maines!%20Quisiera%20más%20información%20para%20unirme%20a%20su%20red%20de%20distribuidores.";  return (
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
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.15] text-primary-dark tracking-tight">
                  {t('ctaSection.ctaTitle')}
                </h3>
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
                      setStatus('idle');
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
            <div 
              className="lg:col-span-6 flex flex-col items-center justify-center relative select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Nav Arrows Floating layout */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 z-30">
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-primary hover:text-accent shadow-md transition-all duration-300 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reels Carousel Container */}
              <div className="flex items-center justify-center w-full max-w-[450px] relative overflow-hidden h-[450px] sm:h-[500px]">
                {playlist.map((reel, idx) => {
                  const circularDistance = getCircularDistance(idx, activeIdx, playlist.length);
                  const isCenter = circularDistance === 0;
                  const isLeft = circularDistance === -1;
                  const isRight = circularDistance === 1;
                  
                  const isVisible = isCenter || isLeft || isRight;

                  let positionClass = "scale-75 opacity-0 pointer-events-none z-0";
                  if (isCenter) {
                    positionClass = "scale-100 opacity-100 z-20 translate-x-0 shadow-2xl";
                  } else if (isLeft) {
                    positionClass = "scale-90 opacity-35 z-10 -translate-x-[80px] sm:-translate-x-[105px] pointer-events-none";
                  } else if (isRight) {
                    positionClass = "scale-90 opacity-35 z-10 translate-x-[80px] sm:translate-x-[105px] pointer-events-none";
                  }

                  if (!isVisible) return null;

                  return (
                    <div
                      key={reel.id}
                      className={`absolute rounded-[28px] overflow-hidden bg-gradient-to-b ${reel.bgGradient} border border-slate-200/10 p-5 flex flex-col justify-between text-left transition-all duration-500 ease-out w-[210px] sm:w-[245px] aspect-[9/16] ${positionClass}`}
                    >
                      {isCenter ? (
                        <div 
                          onClick={() => {
                            setActiveVideoUrl(reel.videoUrl);
                            setIsVideoModalOpen(true);
                          }}
                          className="absolute inset-0 z-0 cursor-pointer w-full h-full"
                        >
                          <video
                            key={`video-center-${reel.id}`}
                            src={reel.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Shimmer gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-0 pointer-events-none" />
                        </div>
                      ) : (
                        <video
                          key={`video-side-${reel.id}`}
                          src={`${reel.videoUrl}#t=0.5`}
                          preload="metadata"
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 blur-[0.5px]"
                        />
                      )}

                      {/* IG Brand Profile Header */}
                      <div className="z-10 relative">
                        <a 
                          href={getInstagramLink(reel.brand)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:opacity-85 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
                            <img 
                              src={getBrandLogo(reel.brand)} 
                              alt={`${reel.brand} Logo`} 
                              className="max-w-[70%] max-h-[70%] object-contain"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-[100px] hover:underline">
                            {reel.user}
                          </span>
                        </a>
                      </div>

                      {/* Play overlay button on center */}
                      <div className="w-full flex justify-center py-6 z-10 pointer-events-none">
                        {isCenter && (
                          <div 
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-98 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
                            onClick={() => {
                              setActiveVideoUrl(reel.videoUrl);
                              setIsVideoModalOpen(true);
                            }}
                          >
                            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Reel Footer Caption hashtags */}
                      <div className="z-10 bg-gradient-to-t from-black/85 to-transparent -mx-5 -mb-5 p-4 pt-8 rounded-b-[28px] flex items-end justify-between">
                        <div className="flex gap-1.5 pointer-events-none">
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-accent/20 text-accent uppercase tracking-wider">#{reel.brand}</span>
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-300 uppercase tracking-wider">#Maines</span>
                        </div>
                      </div>

                      {/* Subtle aesthetic backdrop grid */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] z-0 pointer-events-none" />
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DYNAMIC CONTACT EMAIL FORM MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Box */}
          <div 
            className="w-full max-w-[480px] glass-card rounded-[32px] border border-white/60 p-6 sm:p-8 text-left shadow-2xl relative bg-white animate-scale-in"
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

          </div>
        </div>
      )}

      {/* DYNAMIC VIDEO MODAL PLAYER WITH AMBIENT GLOW */}
      {isVideoModalOpen && activeVideoUrl && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* Main Active Vertical Video Frame */}
          <div 
            className="w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl relative bg-black border border-white/10 z-20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:text-accent transition-colors duration-200 cursor-pointer z-30"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <video
                src={activeVideoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover z-20 relative"
              />
          </div>

          {/* Ambient Blurred Video Background Glow */}
          <video
            src={activeVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-40 z-10 pointer-events-none"
          />
        </div>
      )}
    </section>
  );
};

export default CTAContact;
