import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Award, Zap, HeartHandshake, Compass, Eye, Calendar
} from 'lucide-react';


// Animated Counter Component using IntersectionObserver
const CountingNumber = ({ value, duration = 2000, className }) => {
  const numericVal = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const [count, setCount] = useState(0);
  const [elementRef, setElementRef] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!elementRef || hasRun.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        hasRun.current = true;
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * numericVal));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(numericVal);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, numericVal, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <span 
      ref={setElementRef} 
      className={className || "font-extrabold font-display text-4xl sm:text-5xl lg:text-6xl text-primary-dark"}
    >
      ${formatNumber(count)} <span className={className ? "text-sm sm:text-base font-bold text-accent ml-1" : "text-xl sm:text-2xl font-bold text-accent"}>USD</span>
    </span>
  );
};

// Progress Bar Item Component for growth metrics
const ProgressBarItem = ({ year, label, value, percentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end gap-4">
        <div className="text-left">
          <span className="text-base sm:text-lg font-bold text-primary-dark block font-display leading-tight">
            {year}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-bold tracking-wide uppercase font-sans">
            {label}
          </span>
        </div>
        <div className="text-right whitespace-nowrap">
          <CountingNumber 
            value={value} 
            className="font-extrabold font-display text-lg sm:text-xl md:text-2xl text-primary-dark" 
          />
        </div>
      </div>
      
      {/* Progress Bar Track */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full shadow-[0_0_8px_rgba(14,165,233,0.25)]"
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [preloadMode, setPreloadMode] = useState('metadata');
  const videoRef = useRef(null);

  const titleText = t('about.title');
  const [mainTitle, subtitle] = titleText.includes('|') 
    ? titleText.split('|').map(s => s.trim()) 
    : [titleText, ''];

  return (
    <section 
      id="about" 
      className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32 px-4 xs:px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background Decorative Tech Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 filter blur-[140px] pointer-events-none z-0" />

      <div className="mx-auto w-full px-2 sm:px-8 relative z-10 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] space-y-24 sm:space-y-36">
        
        {/* COMPONENT 1: NOSOTROS - CORPORATE INTRO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Typography Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t('about.pretitle')}
            </div>
            
            <div className="space-y-3 text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light tracking-tight">
                {mainTitle}
              </h2>
              {subtitle && (
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-primary-dark tracking-tight leading-[1.15]">
                  {subtitle}
                </h3>
              )}
            </div>

            <div className="w-16 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full" />
            
            <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed font-sans">
              {t('about.paragraph')}
            </p>
          </div>

          {/* Right Column: High-Performance 16:9 Video Player */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[600px] aspect-video group bg-slate-950 border border-slate-200/10 cursor-pointer"
              onMouseEnter={() => setPreloadMode('auto')}
              onClick={() => {
                if (!isPlaying) {
                  videoRef.current.play();
                  setIsPlaying(true);
                }
              }}
            >
              <video
                ref={videoRef}
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.mp4"
                preload={preloadMode}
                controls={isPlaying}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Static WebP Cover Image (hidden when playing) */}
              {!isPlaying && (
                <img 
                  src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/info-maines.webp"
                  alt="Maines Corporativo"
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {/* Custom Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors duration-300 z-15">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-2xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 active:scale-90 relative">
                    {/* Pulsing glow ring */}
                    <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-25" />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-8 h-8 sm:w-10 sm:h-10 ml-1"
                    >
                      <path d="M8 5.14v14c0 .86.94 1.39 1.66.9l10-7c.61-.43.61-1.37 0-1.8l-10-7A1 1 0 008 5.14z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* COMPONENT 2: NOSOTROS - HISTORY & PURPOSE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Timeline block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-accent" />
              {t('about.timelineTitle')}
            </div>
            
            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 py-2">
              {/* Pulse Indicator */}
              <div className="absolute -left-[7px] top-4 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white ring-4 ring-accent/20 animate-pulse" />
              
              <div className="space-y-3">
                <span className="text-4xl font-extrabold font-display text-accent block tracking-tight">
                  2015
                </span>
                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed font-sans">
                  {t('about.timelineContent')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Purpose Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Mission Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-primary" />
              <div className="p-3 rounded-2xl bg-accent/10 text-accent w-fit group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-left">
                <h4 className="text-lg font-bold text-primary-dark font-display">
                  {t('about.misionTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed font-sans">
                  {t('about.misionCard')}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-accent" />
              <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-left">
                <h4 className="text-lg font-bold text-primary-dark font-display">
                  {t('about.visionTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed font-sans">
                  {t('about.visionCard')}
                </p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* COMPONENT 3: NOSOTROS - VALUE PILLARS */}
        <div className="space-y-12 sm:space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-bold tracking-widest text-accent uppercase block">
              {t('about.pillarsTitle')}
            </span>
            <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Pillar 1: Garantía y Compromiso - Wide (col-span-7) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-7 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50"
            >
              {/* Background Image with Zoom */}
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar1.webp" 
                alt={t('about.pillar1Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Premium Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
              {/* Bottom Glass Panel */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 backdrop-blur-[8px] bg-white/70 border-t border-slate-200/60 text-slate-800 flex flex-col justify-end text-left h-fit min-h-[50%] transition-colors duration-300 group-hover:bg-white/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg lg:text-xl font-display text-primary-dark tracking-tight leading-tight">
                    {t('about.pillar1Title')}
                  </h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1">
                  {t('about.pillar1Desc')}
                </p>
              </div>
            </motion.div>

            {/* Pillar 2: Experiencia Profesional - Narrow (col-span-5) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-5 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50"
            >
              {/* Background Image with Zoom */}
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar2.webp" 
                alt={t('about.pillar2Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Premium Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
              {/* Bottom Glass Panel */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 backdrop-blur-[8px] bg-white/70 border-t border-slate-200/60 text-slate-800 flex flex-col justify-end text-left h-fit min-h-[50%] transition-colors duration-300 group-hover:bg-white/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg lg:text-xl font-display text-primary-dark tracking-tight leading-tight">
                    {t('about.pillar2Title')}
                  </h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1">
                  {t('about.pillar2Desc')}
                </p>
              </div>
            </motion.div>

            {/* Pillar 3: Proximidad y Eficiencia - Narrow (col-span-5) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-5 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50"
            >
              {/* Background Image with Zoom */}
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar3.webp" 
                alt={t('about.pillar3Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Premium Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
              {/* Bottom Glass Panel */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 backdrop-blur-[8px] bg-white/70 border-t border-slate-200/60 text-slate-800 flex flex-col justify-end text-left h-fit min-h-[50%] transition-colors duration-300 group-hover:bg-white/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg lg:text-xl font-display text-primary-dark tracking-tight leading-tight">
                    {t('about.pillar3Title')}
                  </h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1">
                  {t('about.pillar3Desc')}
                </p>
              </div>
            </motion.div>

            {/* Pillar 4: Asesoramiento y Soluciones Personalizadas - Wide (col-span-7) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-7 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50"
            >
              {/* Background Image with Zoom */}
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar4.webp" 
                alt={t('about.pillar4Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Premium Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
              {/* Bottom Glass Panel */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 backdrop-blur-[8px] bg-white/70 border-t border-slate-200/60 text-slate-800 flex flex-col justify-end text-left h-fit min-h-[50%] transition-colors duration-300 group-hover:bg-white/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600">
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-extrabold text-base sm:text-lg lg:text-xl font-display text-primary-dark tracking-tight leading-tight">
                    {t('about.pillar4Title')}
                  </h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1">
                  {t('about.pillar4Desc')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* COMPONENT 4: NOSOTROS - GROWTH METRICS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[36px] border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden"
        >
          {/* Inner Glowing Decorative Circuit Accent */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 60 Q 300 120 600 40 T 1200 80" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: KPI Highlight & Context */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-accent uppercase block">
                  {language === 'es' ? 'DESEMPEÑO AUDITADO' : 'AUDITED PERFORMANCE'}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight text-primary-dark">
                  {t('about.metricsTitle')}
                </h3>
                <div className="w-12 h-1 bg-accent/30 rounded-full" />
              </div>

              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed font-sans">
                {t('about.metricsDescription')}
              </p>

              {/* KPI Highlight Card */}
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-extrabold font-display text-emerald-600 block tracking-tight">
                    +138%
                  </span>
                  <span className="text-xs font-bold text-primary-dark block font-sans">
                    {t('about.metricsKpiTitle')}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 block leading-snug font-sans">
                    {t('about.metricsKpiDesc')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Progress Bars Stack */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <ProgressBarItem 
                year="2020" 
                label={t('about.metric1Lbl')} 
                value={t('about.metric1Val')} 
                percentage={41.9} 
              />
              <ProgressBarItem 
                year="2021" 
                label={t('about.metric2Lbl')} 
                value={t('about.metric2Val')} 
                percentage={54.8} 
              />
              <ProgressBarItem 
                year="2022" 
                label={t('about.metric3Lbl')} 
                value={t('about.metric3Val')} 
                percentage={77.4} 
              />
              <ProgressBarItem 
                year="2023" 
                label={t('about.metric4Lbl')} 
                value={t('about.metric4Val')} 
                percentage={100} 
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
