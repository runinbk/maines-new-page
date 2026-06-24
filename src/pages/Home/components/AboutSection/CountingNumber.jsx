import { useState, useEffect, useRef } from 'react';

/**
 * Animated Counter Component using IntersectionObserver
 */
export const CountingNumber = ({ value, duration = 2000, className }) => {
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
