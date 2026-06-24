import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Map URL pathname to target DOM element IDs
    let targetId = '';
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) {
      targetId = 'top';
    } else if (segments.length === 1) {
      const first = segments[0];
      if (first === 'ecosistema') targetId = 'ecosystem';
      else if (first === 'nosotros') targetId = 'about';
      else if (first === 'contacto') targetId = 'contact';
      else {
        // Brand main landing (e.g. /jetema, /dermclar, /xtralife)
        targetId = 'top';
      }
    } else if (segments.length >= 2) {
      const subSec = segments[1];
      if (subSec === 'catalogo') targetId = 'catalog-section';
      else if (subSec === 'empresa') targetId = 'about-section';
      else if (subSec === 'contacto') targetId = 'cta-section';
    }

    if (targetId === 'top') {
      // When navigating to top/landing pages, scroll instantly or smoothly to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId) {
      // Delay slightly to let lazy React components render and mount elements in the DOM
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
};

export default ScrollToAnchor;
