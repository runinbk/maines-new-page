import { useEffect } from 'react';
import { useLanguage } from '../../../../context/LanguageContext';
import { 
  ShieldCheck, Award, Zap, HeartHandshake, Calendar
} from 'lucide-react';
import { ProgressBarItem } from './ProgressBarItem';
import { CorporateVideo } from './CorporateVideo';

/**
 * AboutSection - Decomposed orchestrator component for company details, metrics & values
 */
const AboutSection = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        
        {/* SECTION 1: NOSOTROS - CORPORATE INTRO */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center reveal-on-scroll reveal-hidden"
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
            <CorporateVideo />
          </div>
        </div>

        {/* SECTION 2: NOSOTROS - HISTORY & PURPOSE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Timeline block */}
          <div 
            className="lg:col-span-6 space-y-6 text-left reveal-on-scroll reveal-hidden"
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
          </div>

          {/* Right Column: Purpose Cards */}
          <div 
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-on-scroll reveal-hidden"
          >
            {/* Mission Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-primary" />
              <div className="p-3 rounded-2xl bg-accent/10 text-accent w-fit group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
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

          </div>
        </div>

        {/* SECTION 3: NOSOTROS - VALUE PILLARS */}
        <div className="space-y-12 sm:space-y-16">
          <div 
            className="text-center space-y-3 reveal-on-scroll reveal-hidden"
          >
            <span className="text-xs font-bold tracking-widest text-accent uppercase block">
              {t('about.pillarsTitle')}
            </span>
            <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Pillar 1: Garantía y Compromiso */}
            <div 
              className="md:col-span-7 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50 reveal-on-scroll reveal-hidden"
            >
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar1.webp" 
                alt={t('about.pillar1Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
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
            </div>

            {/* Pillar 2: Experiencia Profesional */}
            <div 
              className="md:col-span-5 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50 reveal-on-scroll reveal-hidden"
            >
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar2.webp" 
                alt={t('about.pillar2Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
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
            </div>

            {/* Pillar 3: Proximidad y Eficiencia */}
            <div 
              className="md:col-span-5 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50 reveal-on-scroll reveal-hidden"
            >
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar3.webp" 
                alt={t('about.pillar3Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
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
            </div>

            {/* Pillar 4: Asesoramiento y Soluciones Personalizadas */}
            <div 
              className="md:col-span-7 relative group rounded-[32px] overflow-hidden border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-500 h-[300px] sm:h-[360px] md:h-[400px] bg-slate-50/50 reveal-on-scroll reveal-hidden"
            >
              <img 
                src="https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/maines/pilar4.webp" 
                alt={t('about.pillar4Title')} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              
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
            </div>

          </div>
        </div>

        {/* SECTION 4: NOSOTROS - GROWTH METRICS */}
        <div 
          className="glass-card rounded-[36px] border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden reveal-on-scroll reveal-hidden"
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
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
