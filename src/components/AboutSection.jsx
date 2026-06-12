import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Award, Zap, HeartHandshake, Compass, Eye, Calendar, ArrowRight
} from 'lucide-react';

// Animated Counter Component using IntersectionObserver
const CountingNumber = ({ value, duration = 2000 }) => {
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
    <span ref={setElementRef} className="font-extrabold font-display text-4xl sm:text-5xl lg:text-6xl text-primary-dark">
      ${formatNumber(count)} <span className="text-xl sm:text-2xl font-bold text-accent">USD</span>
    </span>
  );
};

const AboutSection = () => {
  const { t, language } = useLanguage();

  return (
    <section 
      id="about" 
      className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background Decorative Tech Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 filter blur-[140px] pointer-events-none z-0" />

      <div className="mx-auto w-full max-w-7xl xl:max-w-[1360px] relative z-10 space-y-24 sm:space-y-36">
        
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
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] text-primary-dark tracking-tight">
              {t('about.title')}
            </h2>
            
            <div className="w-16 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full" />
            
            <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed font-sans">
              {t('about.paragraph')}
            </p>
          </div>

          {/* Right Column: Facade Image Placeholder */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[500px] aspect-[4/3] group bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/60">
              {/* Overlay styling for the placeholder to make it look premium */}
              <div className="absolute inset-0 bg-slate-900/10 z-10 transition-colors group-hover:bg-slate-900/5 duration-500" />
              <img 
                src="/placeholder-fachada.jpg" 
                alt="Maines Fachada" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback if the placeholder image is missing
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                }}
              />
              
              {/* Fallback View (Sleek Wireframe Visual Placeholder) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-gradient-to-br from-primary-dark/95 to-slate-900 text-white select-none">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner text-accent">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold tracking-widest text-accent uppercase block">
                    {language === 'es' ? 'IMAGEN CORPORATIVA' : 'CORPORATE IMAGE'}
                  </span>
                  <span className="text-sm font-semibold text-slate-300 block">
                    {language === 'es' ? 'Sede Central Maines S.R.L.' : 'Maines S.R.L. Headquarters'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest">
                  [placeholder-fachada.jpg]
                </span>
              </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-3xl p-6 border border-slate-100 flex flex-col items-start text-left space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/70"
            >
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-base text-primary-dark font-display leading-tight">
                {t('about.pillar1Title')}
              </h5>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {t('about.pillar1Desc')}
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-3xl p-6 border border-slate-100 flex flex-col items-start text-left space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/70"
            >
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-500">
                <Award className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-base text-primary-dark font-display leading-tight">
                {t('about.pillar2Title')}
              </h5>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {t('about.pillar2Desc')}
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-3xl p-6 border border-slate-100 flex flex-col items-start text-left space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/70"
            >
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-500">
                <Zap className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-base text-primary-dark font-display leading-tight">
                {t('about.pillar3Title')}
              </h5>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {t('about.pillar3Desc')}
              </p>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-3xl p-6 border border-slate-100 flex flex-col items-start text-left space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/70"
            >
              <div className="p-3 rounded-2xl bg-violet-50 text-violet-500">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-base text-primary-dark font-display leading-tight">
                {t('about.pillar4Title')}
              </h5>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {t('about.pillar4Desc')}
              </p>
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

          <div className="space-y-12 relative z-10 text-center">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-accent uppercase block">
                {language === 'es' ? 'DESEMPEÑO AUDITADO' : 'AUDITED PERFORMANCE'}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight text-primary-dark">
                {t('about.metricsTitle')}
              </h3>
              <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Metric 1 */}
              <div className="space-y-2 text-center">
                <CountingNumber value={t('about.metric1Val')} />
                <span className="text-[11px] font-bold text-slate-400 block tracking-widest uppercase font-sans">
                  {t('about.metric1Lbl')}
                </span>
              </div>

              {/* Metric 2 */}
              <div className="space-y-2 text-center">
                <CountingNumber value={t('about.metric2Val')} />
                <span className="text-[11px] font-bold text-slate-400 block tracking-widest uppercase font-sans">
                  {t('about.metric2Lbl')}
                </span>
              </div>

              {/* Metric 3 */}
              <div className="space-y-2 text-center">
                <CountingNumber value={t('about.metric3Val')} />
                <span className="text-[11px] font-bold text-slate-400 block tracking-widest uppercase font-sans">
                  {t('about.metric3Lbl')}
                </span>
              </div>

              {/* Metric 4 */}
              <div className="space-y-2 text-center">
                <CountingNumber value={t('about.metric4Val')} />
                <span className="text-[11px] font-bold text-slate-400 block tracking-widest uppercase font-sans">
                  {t('about.metric4Lbl')}
                </span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
