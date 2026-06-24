import { useState, useEffect, useRef } from 'react';
import { CountingNumber } from './CountingNumber';

/**
 * Progress Bar Item Component for growth metrics
 */
export const ProgressBarItem = ({ year, label, value, percentage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-2" ref={ref}>
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
        <div 
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full shadow-[0_0_8px_rgba(14,165,233,0.25)] transition-all duration-[1500ms] ease-out"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};
