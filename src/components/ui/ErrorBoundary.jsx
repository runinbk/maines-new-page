import { Component } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

/**
 * Premium ErrorBoundary Component to catch JS crashes in production
 * and display a beautiful, branded fallback screen.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
          {/* Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full filter blur-[120px] bg-red-500/10 animate-pulse duration-[6s]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full filter blur-[120px] bg-amber-500/10 animate-pulse duration-[8s]" />
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

          {/* Glassmorphic Error Container */}
          <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-center shadow-2xl flex flex-col items-center gap-6 animate-scale-in">
            {/* Warning Icon Shape */}
            <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              <ShieldAlert className="w-8 h-8" />
              <div className="absolute inset-0.5 rounded-[14px] border border-red-500/20 animate-pulse" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-display">
                Ocurrió un inconveniente
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                Algo falló al intentar dibujar esta sección. Por favor presione el botón de abajo para intentar restablecer la aplicación.
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4 block">
                Something went wrong. Please reload to try again.
              </p>
            </div>

            {/* Retry Button */}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-600 hover:to-amber-700 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
              <span>Reintentar / Reload</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
