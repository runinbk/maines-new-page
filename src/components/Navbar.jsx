import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Dynamic hide-on-scroll-down, show-on-scroll-up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.brands'), href: '/ecosistema' },
    { name: t('nav.about'), href: '/nosotros' },
    { name: t('nav.contact'), href: '/contacto' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-8 sm:px-12 lg:px-20 pt-4 sm:pt-6 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div 
        className={`max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'glass-nav py-3 px-6 sm:px-8 shadow-lg scale-98 sm:scale-100' 
            : 'bg-white/40 backdrop-blur-md py-4 px-6 sm:px-8 border border-white/30'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group focus:outline-none"
          >
            <img 
              src="/assets/logo-maines.svg" 
              alt="Maines Logo" 
              className="h-[22px] w-auto sm:h-[28px] transition-transform duration-300 group-hover:scale-105" 
              style={{ filter: 'drop-shadow(0 2px 4px rgba(13, 31, 59, 0.08))' }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 2xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm 2xl:text-base font-medium text-primary-dark/80 hover:text-accent transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-primary-dark/80 hover:text-accent hover:bg-slate-100/50 transition-all duration-200 cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* CTA Button */}
            <Link 
              to="/contacto"
              className="inline-flex items-center gap-1 px-5 py-2 2xl:px-7 2xl:py-3 rounded-full text-xs 2xl:text-sm font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
            >
              <span>{t('nav.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Language Toggle for Mobile */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-primary-dark/85 bg-white/60 hover:text-accent transition-all duration-200 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full bg-white/60 text-primary-dark hover:bg-white/80 hover:text-accent transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-primary-dark/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-[280px] h-screen bg-white p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <img src="/assets/logo-maines.svg" alt="Maines Logo" className="h-[22px] w-auto" />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-primary-dark transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-primary-dark/85 hover:text-accent transition-colors duration-200 py-2 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <Link 
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-accent to-[#0284c7] hover:from-accent-light hover:to-accent shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <span>{t('nav.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
