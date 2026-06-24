import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Dynamic Hook to update Page Title and Meta Description for SEO
 * Supports translation keys (e.g. 'home.title') or raw strings.
 */
export const usePageMeta = (title, description) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    let resolvedTitle = title;
    let resolvedDescription = description;

    // Check if the argument is a translation path
    if (title && title.includes('.')) {
      resolvedTitle = t(title);
    }
    if (description && description.includes('.')) {
      resolvedDescription = t(description);
    }

    // Update document title
    if (resolvedTitle) {
      document.title = resolvedTitle.endsWith('Maines SRL') 
        ? resolvedTitle 
        : `${resolvedTitle} | Maines SRL`;
    } else {
      document.title = "Maines SRL | Importadora de Insumos Médicos Estéticos";
    }

    // Update meta description
    if (resolvedDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', resolvedDescription);
      }
    }
  }, [t, title, description, language]);
};
