import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Send, ArrowDown, CheckCircle } from 'lucide-react';
import BrandFooter from './BrandFooter';
import { useLanguage } from '../../../context/LanguageContext';

export const CereformLayout = ({ brand, language: propLanguage, onBackToHome }) => {
  const { language, toggleLanguage } = useLanguage();
  const isEs = language === 'es';
  const colors = brand.colors;

  // Active section tracking for Scroll Spy
  const [activeSection, setActiveSection] = useState('composition');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [surfaceScrollY, setSurfaceScrollY] = useState(0);

  // Hero background image carousel state
  const bgImages = [
    '/assets/marcas/cereform/cereform-hero-1.webp',
    '/assets/marcas/cereform/cereform-hero-2.webp'
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 12000); // Much slower cross-fade transition (12 seconds)
    return () => clearInterval(timer);
  }, []);

  // Section references for scrolling
  const sections = {
    composition: useRef(null),
    shape: useRef(null),
    surface: useRef(null),
    lifespan: useRef(null),
    beforeSurgery: useRef(null),
  };

  const handleScrollTo = (sectionKey) => {
    const element = sections[sectionKey].current;
    if (element) {
      const offset = 90; // Adjust for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionKey);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticked = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      lastScrollY = currentScrollY;

      // Scroll Spy logic
      const scrollPos = currentScrollY + 120;
      for (const [key, ref] of Object.entries(sections)) {
        const el = ref.current;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(key);
            break;
          }
        }
      }

      // Parallax calculations for Surface hands image
      const surfaceEl = sections.surface.current;
      if (surfaceEl) {
        const rect = surfaceEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const totalDist = viewportHeight + rect.height;
          const scrolledDist = viewportHeight - rect.top;
          const scrollPercent = Math.min(Math.max(scrolledDist / totalDist, 0), 1);
          // Shift vertically by up to 100px (-50px to +50px)
          const translateY = (scrollPercent - 0.5) * 100;
          setSurfaceScrollY(translateY);
        }
      }

      ticked = false;
    };

    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(updateScroll);
        ticked = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col justify-between overflow-x-hidden text-slate-800 font-sans selection:bg-[#3e97b6]/30">
      
      {/* 1. Dynamic Sticky Sub-Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 px-3 xs:px-4 sm:px-8 lg:px-20 pt-3 sm:pt-6 transition-all duration-500 transform ${
        isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div 
          className={`max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/90 backdrop-blur-md py-2 px-3 sm:py-3 sm:px-6 shadow-lg border border-slate-200/50 scale-98 sm:scale-100' 
              : 'bg-white/50 backdrop-blur-md py-2.5 px-3.5 sm:py-4 sm:px-8 border border-white/30'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left side: Back to Portal button + brand mini logo */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              <Link
                to="/"
                className="flex items-center gap-0.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-slate-700 hover:bg-slate-100/50 transition-all duration-200 cursor-pointer hover:text-[#3e97b6]"
                title={isEs ? "Volver al inicio" : "Back to Home"}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xxs:inline">{isEs ? "Volver" : "Back"}</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 hidden xxs:block" />

              {/* Dynamic Brand Logo */}
              <Link 
                to="/cereform"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 group cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  width="120"
                  height="28"
                  className="h-[15px] xs:h-[18px] sm:h-[24px] md:h-[28px] w-auto object-contain filter drop-shadow-sm brightness-100" 
                />
              </Link>
            </div>

            {/* Center: Anchor Links */}
            <nav className="hidden md:flex items-center gap-6 2xl:gap-10">
              {Object.keys(sections).map((key) => {
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleScrollTo(key)}
                    className={`text-xs 2xl:text-sm font-semibold transition-all duration-200 relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
                      isActive 
                        ? 'text-[#3e97b6] after:w-full after:bg-[#3e97b6]' 
                        : 'text-slate-600 after:w-0 hover:after:w-full hover:text-[#3e97b6] after:bg-[#3e97b6]'
                    }`}
                  >
                    {brand[key].title[language]}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Toggle Language & Contact Button */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-slate-700 hover:bg-slate-100/50 transition-all duration-200 focus:outline-none hover:text-[#3e97b6] cursor-pointer"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language.toUpperCase()}</span>
              </button>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-extrabold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer bg-[#3e97b6] hover:bg-[#1c85a9]"
              >
                <span>{isEs ? "Contactar" : "Contact Us"}</span>
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-20 py-20 bg-slate-50"
      >
        {/* Background Carousel Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {bgImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
                index === bgIndex ? 'opacity-40 md:opacity-50' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white via-white/80 to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center md:text-left pt-12 md:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & CTAs (order-2 on mobile so it renders below the brand logo) */}
            <div className="order-2 md:order-1 md:col-span-8 flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
              
              {/* Brand Logo & Tagline */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#deedf2] border border-[#3e97b6]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3e97b6] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#1c85a9] uppercase">
                  {isEs ? "Importación Exclusiva Bolivia" : "Exclusive Import Bolivia"}
                </span>
              </div>

              {/* Title & Subtitle (Restored the original font weight, color, tracking, and uppercase style but with customized size) */}
              <div className="space-y-2 text-center md:text-left pt-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1c85a9] tracking-wider uppercase pl-1 leading-tight">
                  {brand.hero.subtitle[language]}
                </h1>
              </div>

              {/* Tagline Description */}
              <p className="text-sm sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium text-center md:text-left">
                {brand.hero.tagline[language]}
              </p>

              {/* Manufacturer Logo placed below tagline description (made larger with no vertical margins) */}
              <div className="flex justify-center md:justify-start w-full my-0 py-0">
                <img 
                  src={brand.logoEuromi} 
                  alt="Euromi Biosciences Logo" 
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain select-none filter brightness-95 m-0 p-0" 
                />
              </div>

              {/* CTA Arrow trigger (pushed further down below Euromi logo) */}
              <button 
                onClick={() => handleScrollTo('composition')}
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#3e97b6] hover:bg-[#1c85a9] transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer mt-6"
              >
                <span>{isEs ? "Explorar Detalles del Implante" : "Explore Implant Details"}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            {/* Right Column: Large Cereform logo (order-1 on mobile so it renders at the top, order-2 on desktop on the right side) */}
            <div className="order-1 md:order-2 md:col-span-4 flex items-center justify-center md:justify-end w-full pb-6 md:pb-0">
              <img 
                src={brand.logo} 
                alt="Cereform Logo" 
                className="h-24 sm:h-36 md:h-[12rem] lg:h-[15rem] xl:h-[18rem] w-auto object-contain select-none filter drop-shadow-sm brightness-100" 
              />
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 pointer-events-none">
          <span className="text-[9px] font-bold uppercase tracking-widest">{isEs ? "Desplazar" : "Scroll"}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </section>

      {/* 3. Composition Section */}
      <section 
        id="composition"
        ref={sections.composition}
        className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white relative border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-light text-slate-800 tracking-wide font-sans">
              {brand.composition.title[language]}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#3e97b6] font-normal tracking-wide">
              {brand.composition.subtitle[language]}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
            
            {/* Column Left (Shell) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-[#1c85a9] tracking-wider uppercase leading-snug">
                  {brand.composition.shell.title[language]}
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm font-normal text-slate-600">
                  {brand.composition.shell.bullets[language].map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#1c85a9] font-bold select-none mr-3 shrink-0">&gt;</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mt-6">
                  {brand.composition.shell.barrierNote[language]}
                </p>
              </div>
            </div>

            {/* Column Center (Image) */}
            <div className="lg:col-span-4 flex items-center justify-center py-4 lg:py-0">
              <div className="relative max-w-[320px] md:max-w-full">
                <img 
                  src={brand.composition.image} 
                  alt="Implant Composition Schema" 
                  className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Column Right (Filler) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-[#1c85a9] tracking-wider uppercase leading-snug">
                  {brand.composition.filler.title[language]}
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm font-normal text-slate-600">
                  {brand.composition.filler.bullets[language].map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#1c85a9] font-bold select-none mr-3 shrink-0">&gt;</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        {/* Full-width breakout callout row */}
        <div 
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 px-4 sm:px-8 bg-[#deedf2] bg-cover bg-center mt-16 sm:mt-24 border-y border-[#3e97b6]/10"
          style={{ backgroundImage: `url('/assets/marcas/cereform/honeycomb_bg.jpg')` }}
        >
          <div className="max-w-4xl mx-auto relative flex flex-col items-center">
            
            {/* adorno.png at the top */}
            <div className="relative z-10 -mb-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
              <img 
                src="/assets/marcas/cereform/adorno.png" 
                alt="" 
                className="w-full h-auto object-contain"
              />
            </div>

            {/* White card with thick frame */}
            <div className="w-full bg-white border-[8px] sm:border-[12px] border-[#deedf2] rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm text-center space-y-6 pt-12 sm:pt-16">
              <p className="text-sm sm:text-base md:text-[1.05rem] text-slate-600 leading-relaxed font-normal">
                {brand.composition.leakageAlert[language]}
              </p>
              
              <p className="text-sm sm:text-base md:text-[1.05rem] text-slate-600 leading-relaxed font-normal">
                {brand.composition.traceability[language]}
              </p>
              
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed pt-2">
                {brand.composition.labelNote[language]}
              </p>
            </div>

          </div>
        </div>

        </div>
      </section>

      {/* 4. Shape Section */}
      <section 
        id="shape"
        ref={sections.shape}
        className="py-16 sm:py-24 bg-white relative border-t border-slate-100 overflow-hidden"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          
          {/* Column Left (Details and Profiles GIF) */}
          <div className="lg:col-span-7 px-4 sm:px-8 lg:pl-[12%] lg:pr-12 space-y-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-light text-slate-800 tracking-wide font-sans">
              {brand.shape.title[language]}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
              {brand.shape.description[language]}
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#3e97b6] font-serif italic font-light tracking-wide pt-2">
              {brand.shape.profilesTitle[language]}
            </h3>
            
            {/* Large Profile selector GIF */}
            <div className="w-full max-w-[500px] sm:max-w-[580px] pt-4">
              <img 
                src={brand.shape.gifImage} 
                alt="Profiles Animation" 
                className="w-full h-auto object-contain mx-auto" 
              />
            </div>
          </div>

          {/* Column Right (Female torso illustration - stretches to the edge) */}
          <div className="lg:col-span-5 w-full flex justify-end pl-0 pr-0">
            <div className="w-full max-w-[500px] lg:max-w-[650px] lg:w-full">
              <img 
                src={brand.shape.femaleImage} 
                alt="Anatomy Profile Side View" 
                className="w-full h-auto object-contain lg:object-right select-none" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Surface Section */}
      <section 
        id="surface"
        ref={sections.surface}
        className="py-16 sm:py-24 bg-[#deedf2] relative border-t border-slate-200/20 overflow-hidden w-full px-0"
      >
        {/* Background Parallax Image Layer (spans full screen width, centered horizontally, hidden on mobile/tablet, shifted up on desktop) */}
        <div className="absolute -top-16 sm:-top-28 md:-top-36 lg:-top-44 xl:-top-52 bottom-0 left-1/2 transform -translate-x-1/2 w-[110%] min-w-[1200px] md:min-w-[1400px] lg:min-w-[1600px] pointer-events-none z-0 overflow-hidden hidden md:block">
          <div 
            className="w-full transition-transform duration-100 ease-out will-change-transform pt-0"
            style={{ transform: `translateY(${surfaceScrollY}px)` }}
          >
            <img 
              src={brand.surface.image} 
              alt="" 
              className="w-full h-auto object-contain mx-auto select-none" 
            />
          </div>
        </div>

        {/* Centered content overlay container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 relative z-10 space-y-8 sm:space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-light text-slate-800 tracking-wide font-sans">
              {brand.surface.title[language]}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#3e97b6] font-normal tracking-wide">
              {brand.surface.subtitle[language]}
            </p>
          </div>

          {/* Two Columns Overlaid Text Grid (pulled down on desktop, widely spaced to align with left/right implants) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 lg:gap-32 max-w-5xl lg:max-w-6xl mx-auto pt-8 md:pt-[240px] lg:pt-[340px] xl:pt-[380px] pb-6">
            
            {/* Smooth Surface Column (right-aligned to end at the center gap on desktop) */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3 bg-transparent p-0 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl text-[#3e97b6] font-serif italic font-light tracking-wide">
                {brand.surface.smooth.title[language]}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm font-normal text-slate-600">
                {brand.surface.smooth.bullets[language].map((bullet, i) => (
                  <li key={i} className="flex items-start justify-center md:justify-end">
                    <span className="text-[#3e97b6] font-bold select-none mr-3 shrink-0">&gt;</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              {/* Mobile-only footnote */}
              <p className="text-[10px] text-slate-400 font-light italic pt-2 md:hidden">
                {brand.surface.literatureNote[language]}
              </p>
            </div>

            {/* Micro-textured Surface Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 bg-transparent p-0 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl text-[#3e97b6] font-serif italic font-light tracking-wide">
                {brand.surface.textured.title[language]}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm font-normal text-slate-600">
                {brand.surface.textured.bullets[language].map((bullet, i) => (
                  <li key={i} className="flex items-start justify-center md:justify-start">
                    <span className="text-[#3e97b6] font-bold select-none mr-3 shrink-0">&gt;</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              {/* Mobile-only footnote */}
              <p className="text-[10px] text-slate-400 font-light italic pt-2 md:hidden">
                {brand.surface.literatureNote[language]}
              </p>
            </div>

          </div>

          {/* Alert Notes & Disclaimer */}
          <div className="text-center space-y-6 pt-8 max-w-3xl mx-auto">
            <p className="text-[10px] sm:text-xs text-slate-400 font-light italic hidden md:block">
              {brand.surface.literatureNote[language]}
            </p>
            <p className="text-sm sm:text-base md:text-[1.05rem] font-normal text-slate-700 leading-relaxed pt-4 md:pt-0">
              {brand.surface.surgeonNote[language]}
            </p>
          </div>

        </div>
      </section>

      {/* 6. Lifespan Section */}
      <section 
        id="lifespan"
        ref={sections.lifespan}
        className="py-16 sm:py-24 bg-white relative border-t border-slate-100 overflow-hidden w-full px-0"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          
          {/* Column Left (Smiling woman image - composite file, aligned straight to the left screen edge) */}
          <div className="lg:col-span-5 w-full flex justify-start pl-0 pr-0">
            <div className="w-full max-w-[520px] lg:max-w-none">
              <img 
                src={brand.lifespan.image} 
                alt="Healthy Active Woman Smiling" 
                className="w-full h-auto object-contain lg:object-left select-none" 
              />
            </div>
          </div>

          {/* Column Right (Text & Lifespan details - left aligned) */}
          <div className="lg:col-span-7 px-4 sm:px-8 lg:pl-16 lg:pr-[12%] space-y-6 flex flex-col text-left">
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-light text-slate-800 tracking-wide font-sans">
              {brand.lifespan.title[language]}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
              {brand.lifespan.description[language]}
            </p>

            {/* Estimated lifespan plain bold text */}
            <p className="text-sm sm:text-base md:text-lg font-bold text-slate-700 leading-relaxed">
              {brand.lifespan.highlight[language]}
            </p>
          </div>

        </div>

        {/* Centered disclaimer note at the very bottom of the section */}
        <div className="w-full max-w-4xl mx-auto px-4 text-center mt-12 sm:mt-16">
          <p className="text-[10px] sm:text-xs text-slate-400 font-light leading-relaxed select-none">
            {brand.lifespan.disclaimer[language]}
          </p>
        </div>
      </section>

      {/* 7. Before Surgery / CTA Section (no padding, image covers full height, directly connects to footer) */}
      <section 
        id="beforeSurgery"
        ref={sections.beforeSurgery}
        className="bg-[#deedf2] relative border-t border-slate-100 overflow-hidden w-full p-0 m-0"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px]">
          
          {/* Column Left (Smiling woman torso image - matches original page bleed style with increased height) */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] lg:h-auto overflow-hidden">
            <img 
              src={brand.beforeSurgery.image} 
              alt="Aesthetic contour detail" 
              className="absolute inset-0 w-full h-full object-cover object-left select-none" 
            />
          </div>

          {/* Column Right (Text & Contact details - left aligned & vertically centered) */}
          <div className="lg:col-span-7 px-6 py-12 sm:px-12 sm:py-16 lg:pl-16 lg:pr-[12%] flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-4xl text-[#3e97b6] font-serif italic font-light tracking-wide">
              {brand.beforeSurgery.title[language]}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light mt-4">
              {isEs 
                ? "¿Te interesa obtener más información o unirte a nuestra red de distribución? Comunícate directamente con nuestras oficinas o escríbenos por WhatsApp para resolver tus dudas."
                : "Are you interested in getting more information or joining our distribution network? Contact our offices directly or write to us on WhatsApp to resolve your doubts."}
            </p>

            <div className="pt-4">
              <a 
                href={isEs 
                  ? "https://wa.me/59133400835?text=Hola%20Maines%20SRL,%20deseo%20información%20sobre%20los%20implantes%20mamarios%20Cereform" 
                  : "https://wa.me/59133400835?text=Hello%20Maines%20SRL,%20I%20would%20like%20more%20information%20about%20Cereform%20breast%20implants"}
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#3e97b6] hover:bg-[#1c85a9] transition-all duration-300 shadow-md cursor-pointer transform hover:scale-105 active:scale-95 self-start"
              >
                <span>{isEs ? "Contáctanos por WhatsApp" : "Contact us on WhatsApp"}</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Footer (wrapped in bg-[#deedf2] to seamless mask the top rounded corner gaps) */}
      <div className="bg-[#deedf2] w-full">
        <BrandFooter brand={brand} language={language} />
      </div>

    </div>
  );
};

export default CereformLayout;
