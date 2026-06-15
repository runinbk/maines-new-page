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
      if (subSec === 'catalogo') targetId = 'catalog-section';
      else if (subSec === 'empresa') targetId = 'about-section';
      else if (subSec === 'contacto') targetId = 'cta-section';
      
      return { isBrand: true, brandId, sectionId: targetId };
    } else {
      let targetId = 'top';
      if (first === 'ecosistema') targetId = 'ecosystem';
      else if (first === 'nosotros') targetId = 'about';
      else if (first === 'contacto') targetId = 'contact';
      
      return { isBrand: false, brandId: null, sectionId: targetId };
    }
  }
  
  return { isBrand: false, brandId: null, sectionId: 'top' };
};

export const getRoutePath = (brandId = null, sectionName = null) => {
  const base = getBasePath();
  const cleanBase = base.replace(/\/$/, '');
  
  if (brandId) {
    let sub = '';
    if (sectionName === 'catalog-section') sub = '/catalogo';
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

export const navigateTo = (brandId = null, sectionName = null) => {
  const path = getRoutePath(brandId, sectionName);
  
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
  
  window.history.pushState({ scrollToSection: targetId }, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const replaceURLForSection = (brandId = null, sectionName = null) => {
  const path = getRoutePath(brandId, sectionName);
  if (window.location.pathname !== path) {
    window.history.replaceState(window.history.state, '', path);
  }
};

export const handleLinkClick = (e, brandId = null, sectionName = null) => {
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
    replaceURLForSection(brandId, sectionName);
  } else {
    navigateTo(brandId, sectionName);
  }
};

export const navigateHome = () => {
  navigateTo(null, 'top');
};

export const handleNavClick = (e, sectionName) => {
  handleLinkClick(e, null, sectionName);
};

