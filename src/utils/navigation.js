export const getBasePath = () => {
  const path = window.location.pathname;
  const knownPageKeywords = ['jetema', 'dermclar', 'xtralife', 'ecosistema', 'nosotros', 'contacto'];
  const segments = path.split('/').filter(Boolean);
  
  let prefixIndex = -1;
  for (let i = 0; i < segments.length; i++) {
    if (knownPageKeywords.includes(segments[i])) {
      prefixIndex = i;
      break;
    }
  }
  
  if (prefixIndex !== -1) {
    const prefixSegments = segments.slice(0, prefixIndex);
    return '/' + prefixSegments.join('/') + (prefixSegments.length > 0 ? '/' : '');
  }
  
  return path.endsWith('/') ? path : path + '/';
};

export const getProductSlug = (productId, brandId) => {
  if (!productId) return '';
  if (brandId === 'jetema') {
    return productId.startsWith('jetema-') ? productId.substring('jetema-'.length) : productId;
  }
  if (brandId === 'dermclar' && productId.startsWith('derm-')) {
    return productId.substring('derm-'.length);
  }
  if (brandId === 'xtralife' && productId.startsWith('xtralife-')) {
    return productId.substring('xtralife-'.length);
  }
  return productId;
};

export const getProductIdFromSlug = (slug, brandId) => {
  if (!slug) return '';
  if (brandId === 'jetema') {
    return slug;
  }
  if (brandId === 'dermclar' && !slug.startsWith('derm-')) {
    return `derm-${slug}`;
  }
  if (brandId === 'xtralife' && !slug.startsWith('xtralife-')) {
    return `xtralife-${slug}`;
  }
  return slug;
};

export const navigate = (path, state = {}) => {
  window.history.pushState(state, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const parseCurrentRoute = () => {
  const base = getBasePath();
  const path = window.location.pathname;
  
  let relPath = path;
  if (path.startsWith(base)) {
    relPath = path.substring(base.length);
  }
  
  const segments = relPath.split('/').filter(Boolean);
  const brandIds = ['jetema', 'dermclar', 'xtralife'];
  
  if (segments.length > 0) {
    const first = segments[0];
    if (brandIds.includes(first)) {
      const brandId = first;
      const subSec = segments[1] || '';
      let targetId = 'top';
      let productId = null;
      if (subSec === 'catalogo') {
        targetId = 'catalog-section';
        if (segments[2]) {
          productId = getProductIdFromSlug(segments[2], brandId);
        }
      }
      else if (subSec === 'empresa') targetId = 'about-section';
      else if (subSec === 'contacto') targetId = 'cta-section';
      
      return { isBrand: true, brandId, sectionId: targetId, productId };
    } else {
      let targetId = 'top';
      if (first === 'ecosistema') targetId = 'ecosystem';
      else if (first === 'nosotros') targetId = 'about';
      else if (first === 'contacto') targetId = 'contact';
      
      return { isBrand: false, brandId: null, sectionId: targetId, productId: null };
    }
  }
  
  return { isBrand: false, brandId: null, sectionId: 'top', productId: null };
};

export const getRoutePath = (brandId = null, sectionName = null, productId = null) => {
  const base = getBasePath();
  const cleanBase = base.replace(/\/$/, '');
  
  if (brandId) {
    let sub = '';
    if (sectionName === 'catalog-section') {
      const slug = getProductSlug(productId, brandId);
      sub = '/catalogo' + (slug ? `/${slug}` : '');
    }
    else if (sectionName === 'about-section') sub = '/empresa';
    else if (sectionName === 'cta-section') sub = '/contacto';
    
    return `${cleanBase}/${brandId}${sub}`;
  } else {
    let sub = '';
    if (sectionName === 'ecosystem') sub = '/ecosistema';
    else if (sectionName === 'about') sub = '/nosotros';
    else if (sectionName === 'contact') sub = '/contacto';
    
    return `${cleanBase}${sub}` || base;
  }
};

export const navigateTo = (brandId = null, sectionName = null, productId = null) => {
  const path = getRoutePath(brandId, sectionName, productId);
  
  let targetId = 'top';
  if (brandId) {
    if (sectionName === 'catalog-section') targetId = 'catalog-section';
    else if (sectionName === 'about-section') targetId = 'about-section';
    else if (sectionName === 'cta-section') targetId = 'cta-section';
  } else {
    if (sectionName === 'ecosystem') targetId = 'ecosystem';
    else if (sectionName === 'about') targetId = 'about';
    else if (sectionName === 'contact') targetId = 'contact';
  }
  
  window.history.pushState({ scrollToSection: targetId, productId }, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const replaceURLForSection = (brandId = null, sectionName = null, productId = null) => {
  let targetProductId = productId;
  if (brandId && sectionName === 'catalog-section' && !targetProductId) {
    const currentRoute = parseCurrentRoute();
    if (currentRoute.brandId === brandId && currentRoute.productId) {
      targetProductId = currentRoute.productId;
    }
  }
  const path = getRoutePath(brandId, sectionName, targetProductId);
  if (window.location.pathname !== path) {
    window.history.replaceState(window.history.state, '', path);
  }
};

export const handleLinkClick = (e, brandId = null, sectionName = null, productId = null) => {
  if (e) e.preventDefault();
  
  const current = parseCurrentRoute();
  const isSamePage = (brandId === current.brandId);
  
  if (isSamePage) {
    let targetId = 'top';
    if (brandId) {
      if (sectionName === 'catalog-section') targetId = 'catalog-section';
      else if (sectionName === 'about-section') targetId = 'about-section';
      else if (sectionName === 'cta-section') targetId = 'cta-section';
    } else {
      if (sectionName === 'ecosystem') targetId = 'ecosystem';
      else if (sectionName === 'about') targetId = 'about';
      else if (sectionName === 'contact') targetId = 'contact';
    }
    
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    replaceURLForSection(brandId, sectionName, productId);
  } else {
    navigateTo(brandId, sectionName, productId);
  }
};

export const navigateHome = () => {
  navigateTo(null, 'top');
};

export const handleNavClick = (e, sectionName) => {
  handleLinkClick(e, null, sectionName);
};
