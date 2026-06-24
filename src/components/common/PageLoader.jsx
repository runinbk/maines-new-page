import { Loader2 } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden">
      {/* High-Tech Ambient Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full filter blur-[100px] mix-blend-multiply bg-blue-500/10 animate-pulse duration-[8s]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full filter blur-[100px] mix-blend-multiply bg-teal-500/10 animate-pulse duration-[10s]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
        {/* Animated Capsule Shape with Glow */}
        <div className="relative w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-teal-500/10 to-transparent opacity-50 blur-sm" />
          
          {/* Pulsating Logo Ring */}
          <div className="absolute inset-0.5 rounded-[22px] border border-blue-500/30 animate-pulse" />
          
          {/* Spinner */}
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Maines S.R.L.
          </span>
          <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">
            Cargando portafolio...
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
