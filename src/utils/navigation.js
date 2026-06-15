export const getBasePath = () => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0) {
    const last = segments[segments.length - 1];
    if (['jetema', 'dermclar', 'xtralife'].includes(last)) {
      // It's a brand page. The base path is everything before 'last'
      const idx = path.lastIndexOf(last);
      return path.substring(0, idx);
    }
  }
  return path.endsWith('/') ? path : path + '/';
};

export const navigate = (path, state = {}) => {
  window.history.pushState(state, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const navigateToBrand = (brandId) => {
  const base = getBasePath();
  const target = `${base.replace(/\/$/, '')}/${brandId}`;
  navigate(target);
};

export const navigateHome = (scrollToSection = null) => {
  const base = getBasePath();
  const state = scrollToSection ? { scrollToSection } : {};
  navigate(base, state);
};

export const isHomePage = () => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return true;
  const last = segments[segments.length - 1];
  return !['jetema', 'dermclar', 'xtralife'].includes(last);
};

export const handleNavClick = (e, targetId) => {
  if (e) e.preventDefault();
  if (isHomePage()) {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    navigateHome(targetId);
  }
};

export const handleHomeClick = (e) => {
  if (e) e.preventDefault();
  if (isHomePage()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    navigateHome('top');
  }
};
