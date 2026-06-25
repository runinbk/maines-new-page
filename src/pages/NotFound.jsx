import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArrowLeft, Home, MessageSquare, AlertCircle } from 'lucide-react';

export const NotFound = () => {
  const { language } = useLanguage();
  const isEs = language === 'es';

  // Dynamic SEO meta tags for 404 page
  usePageMeta(
    isEs ? "Página no encontrada" : "Page Not Found",
    isEs ? "El recurso solicitado no está disponible en Maines SRL." : "The requested page is not available on Maines SRL."
  );

  return (
    <div className="relative min-h-screen bg-[#0D1F3B] flex items-center justify-center p-6 text-white overflow-hidden select-none">
      {/* Dynamic ambient background blobs */}
      <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_20%_20%,#0ea5e9_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#10b981_0%,transparent_60%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 filter blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 filter blur-[130px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="relative z-10 w-full max-w-lg glass-card rounded-[36px] border border-white/10 p-8 sm:p-12 text-center bg-white/[0.03] backdrop-blur-xl shadow-2xl space-y-8">
        {/* Animated 404 badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest animate-bounce">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Error 404</span>
        </div>

        {/* Big styled error number */}
        <div className="relative flex justify-center">
          <h1 className="text-8xl sm:text-9xl font-black font-display tracking-tighter bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-md select-none">
            404
          </h1>
          <div className="absolute bottom-1 w-20 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white/95">
            {isEs ? 'Página No Encontrada' : 'Page Not Found'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
            {isEs 
              ? 'El enlace que ha seguido está roto, no existe o la página ha sido trasladada a una nueva ubicación dentro de nuestro portal.' 
              : 'The link you followed is broken, does not exist, or the page has been moved to a new location within our portal.'}
          </p>
        </div>

        {/* Recovery pathways buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] shadow-lg shadow-blue-500/10 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{isEs ? 'Volver al Inicio' : 'Return Home'}</span>
          </Link>
          
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-slate-300 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isEs ? 'Contáctanos' : 'Contact Support'}</span>
          </Link>
        </div>

        {/* Institutional branding badge */}
        <div className="pt-4 border-t border-white/5 flex justify-center items-center gap-2.5 text-white/40 text-[10px] font-extrabold uppercase tracking-widest">
          <span>Maines S.R.L.</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Bolivia</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
