import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Helper to update or create a meta tag dynamically in the head
 */
const updateOrCreateMeta = (attr, name, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or create a link tag dynamically in the head
 */
const updateOrCreateLink = (rel, href, extraAttrs = {}) => {
  if (!href) return;
  
  let selector = `link[rel="${rel}"]`;
  if (extraAttrs.hreflang) {
    selector += `[hreflang="${extraAttrs.hreflang}"]`;
  }
  
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  
  Object.entries(extraAttrs).forEach(([key, val]) => {
    element.setAttribute(key, val);
  });
};

/**
 * Dynamic Hook to update Page Title, Meta Description, Canonical, OG and Twitter tags for SEO.
 * Supports translation keys (e.g. 'home.title') or raw strings.
 */
export const usePageMeta = (title, description, customOgImage = null) => {
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

    const brandName = "Maines SRL";
    const defaultTitle = "Maines SRL | Importadora de Insumos Médicos Estéticos";
    
    // 1. Update Document Title
    let finalTitle = resolvedTitle;
    if (resolvedTitle) {
      finalTitle = resolvedTitle.endsWith(brandName) 
        ? resolvedTitle 
        : `${resolvedTitle} | ${brandName}`;
    } else {
      finalTitle = defaultTitle;
    }
    document.title = finalTitle;

    // 2. Resolve Canonical & absolute URLs
    const baseOrigin = "https://www.mainessrl.com";
    const currentPath = window.location.pathname;
    const canonicalUrl = `${baseOrigin}${currentPath}`;

    // 3. Update Base SEO tags
    updateOrCreateMeta('name', 'description', resolvedDescription);
    updateOrCreateLink('canonical', canonicalUrl);

    // 4. Update Hreflang Tags (dynamic href alternate mapping)
    updateOrCreateLink('alternate', `${baseOrigin}${currentPath}`, { hreflang: 'es' });
    updateOrCreateLink('alternate', `${baseOrigin}${currentPath}`, { hreflang: 'en' });
    updateOrCreateLink('alternate', `${baseOrigin}${currentPath}`, { hreflang: 'x-default' });

    // 5. Update Open Graph (Facebook / Social Sharing)
    const resolvedOgImage = customOgImage || `${baseOrigin}/assets/logo-maines.svg`;
    
    updateOrCreateMeta('property', 'og:title', finalTitle);
    updateOrCreateMeta('property', 'og:description', resolvedDescription);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('property', 'og:image', resolvedOgImage);
    updateOrCreateMeta('property', 'og:locale', language === 'es' ? 'es_BO' : 'en_US');
    updateOrCreateMeta('property', 'og:locale:alternate', language === 'es' ? 'en_US' : 'es_BO');
    updateOrCreateMeta('property', 'og:type', 'website');
    updateOrCreateMeta('property', 'og:site_name', brandName);

    // 6. Update Twitter Cards
    updateOrCreateMeta('property', 'twitter:title', finalTitle);
    updateOrCreateMeta('property', 'twitter:description', resolvedDescription);
    updateOrCreateMeta('property', 'twitter:url', canonicalUrl);
    updateOrCreateMeta('property', 'twitter:image', resolvedOgImage);
    updateOrCreateMeta('property', 'twitter:card', 'summary_large_image');

    // 7. Update HTML lang attribute
    document.documentElement.lang = language;

  }, [t, title, description, customOgImage, language]);
};
