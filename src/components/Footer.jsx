
import { useLanguage } from '../LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  MapPin, Phone, Mail, ArrowUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Footer = () => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={revealRef} className="bg-darkBg text-slate-400 pt-20 pb-8 rounded-t-[40px] md:rounded-t-[48px] relative overflow-hidden">
      {/* Background glowing visual node */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* UPPER FOOTER: REDEFINING HEADLINE */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-white">
            {t('footer.ctaTitle')}
            <span className="text-accent block sm:inline-block">
              {t('footer.ctaTitleAccent')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('footer.ctaSub')}
          </p>
          <div className="w-16 h-1 bg-accent/30 mx-auto rounded-full" />
        </div>

        {/* MID FOOTER: GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 text-left space-y-4">
            <Link 
              to="/" 
              className="inline-block"
            >
              {/* White overlay filter for brand svg inside dark backgrounds */}
              <img 
                src="/assets/logo-maines.svg" 
                alt="Maines Logo" 
                className="h-9 w-auto brightness-0 invert" 
                loading="lazy"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed font-medium">
              {t('footer.tagline')}
            </p>
            {/* Social linkages */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-md"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-accent flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-md"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              {t('footer.menuTitle')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <Link 
                  to="/nosotros" 
                  className="hover:text-white transition-colors duration-200"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/jetema" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Jetema
                </Link>
              </li>
              <li>
                <Link 
                  to="/dermclar" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Dermclar
                </Link>
              </li>
              <li>
                <Link 
                  to="/xtralife" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Xtralife
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Coordinates */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              {t('footer.contactTitle')}
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-400">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t('footer.address')}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4.5 h-4.5 text-accent shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4.5 h-4.5 text-accent shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors duration-200">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM FOOTER: COPYRIGHT & COMPLIANCE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
          
          {/* Copyright */}
          <span>
            {t('footer.copyright')}
          </span>

          {/* Compliance Sub-links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors duration-200">{t('footer.privacy')}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors duration-200">{t('footer.terms')}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors duration-200">{t('footer.cookies')}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors duration-200">{t('footer.support')}</a>
          </div>

          {/* Return to Top button */}
          <button 
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-accent flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 shadow-md group focus:outline-none"
            title="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

      {/* Giant elegant background watermark */}
      <div className="absolute bottom-[-10px] sm:bottom-[-20px] md:bottom-[-30px] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[12vw] font-black tracking-[0.2em] text-white/[0.02] block leading-none font-display uppercase">
          MAINES SRL
        </span>
      </div>
    </footer>
  );
};

export default Footer;
