import { useEffect, useRef } from 'react';

/**
 * Custom React hook to animates elements when they scroll into viewport.
 * @param {Object} options IntersectionObserver configuration options.
 */
export const useScrollReveal = (options = { triggerOnce: true, threshold: 0.1 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Ensure it starts with the base hidden state
    currentRef.classList.add('reveal-hidden');

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        currentRef.classList.add('reveal-visible');
        if (options.triggerOnce) {
          observer.unobserve(currentRef);
        }
      } else if (!options.triggerOnce) {
        currentRef.classList.remove('reveal-visible');
      }
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef && !options.triggerOnce) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.triggerOnce, options.threshold, options.rootMargin]);

  return ref;
};
