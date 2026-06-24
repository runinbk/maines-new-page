/**
 * pure navigation and route utilities
 */

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
