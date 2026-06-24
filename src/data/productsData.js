/**
 * @typedef {Object} TechnicalSpec
 * @property {string} label - The spec parameter name (e.g., 'Active Ingredient', 'Volume')
 * @property {string} value - The spec value (e.g., 'Hyaluronic Acid 24mg/mL', '1.1 mL')
 */

/**
 * @typedef {Object} ClinicalInsight
 * @property {string} title - Insight title (e.g., 'Application Technique')
 * @property {string} label - Sub-label (e.g., 'View Study')
 * @property {string} media - Media placeholder or asset path
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} name - Product name (e.g., 'TOXTA 100U')
 * @property {string} category - Category filter identifier (e.g., 'toxins', 'fillers')
 * @property {string} categoryLabel - Translated category label
 * @property {string} descriptor - Short scientific descriptor (e.g., 'Clostridium Botulinum Toxin Type A')
 * @property {string} coverImage - Main high-res product photo placeholder
 * @property {string[]} gallery - Small nested gallery of thumbnail assets
 * @property {string} certBadge - Certification badge (e.g., 'AGEMED Approved', 'FDA Approved')
 * @property {TechnicalSpec[]} specifications - Key-value pair specifications table
 * @property {ClinicalInsight[]} clinicalInsights - Associated videos or clinical outcomes
 * @property {string} composition - Main chemical composition description
 * @property {string} downloadUrl - Technical dossier PDF link
 */

/**
 * @typedef {Object} BrandConfig
 * @property {string} id - Brand ID slug (e.g., 'jetema', 'dermclar', 'xtralife')
 * @property {string} name - Official brand name
 * @property {string} logo - Path to brand logo
 * @property {string} tagline - Editorial tagline
 * @property {string} description - Scientific overview paragraph
 * @property {string} bgImage - Path to hero background image
 * @property {string} accentColor - Tailwind text/border accent color class (e.g. 'text-cyan-400')
 * @property {string} accentBg - Tailwind background accent class (e.g. 'bg-cyan-500')
 * @property {string} accentHover - Tailwind hover class (e.g. 'hover:bg-cyan-600')
 * @property {string} accentFocusRing - Tailwind focus ring color
 * @property {string} themeGradient - Dynamic CSS class for gradient accents
 * @property {string} glowClass - Custom CSS glow utility class from index.css
 * @property {string[]} categories - Available filtering tabs
 * @property {Product[]} products - List of brand products
 * @property {Object} about - Corporate logistics details
 * @property {Object} cta - Lead capture copy & parameters
 */

