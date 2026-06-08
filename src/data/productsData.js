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

export const brandsData = {
  jetema: {
    id: "jetema",
    name: "Jetema",
    logo: "/assets/JETEMA-logo.png",
    tagline: "Innovación Biotecnológica Coreana para la Medicina Estética",
    description: "Dispositivos y bioestimuladores avanzados para tratamientos profesionales de alta precisión. Máxima pureza molecular para resultados estéticos de nivel superior.",
    bgImage: "/assets/marcas/card-jetema.webp",
    heroBg: "/assets/marcas/jetema-hero.jpg",
    aboutBg: "/assets/marcas/jetema-institucional.jpg",
    ctaBg: "/assets/marcas/jetema-cta.jpg",
    accentColor: "text-cyan-400",
    accentBg: "bg-cyan-500",
    accentHover: "hover:bg-cyan-600",
    accentFocusRing: "focus:ring-cyan-400/50",
    themeGradient: "from-cyan-500 to-indigo-600",
    themeBorder: "border-cyan-500/20",
    glowClass: "glow-blue",
    categories: [
      { id: "all", label: { es: "Todos", en: "All" } },
      { id: "toxins", label: { es: "Toxinas", en: "Toxins" } },
      { id: "fillers", label: { es: "Rellenos", en: "Fillers" } },
      { id: "skinboosters", label: { es: "Skinboosters", en: "Skinboosters" } }
    ],
    about: {
      pretitle: "RESPALDO OFICIAL",
      title: "Distribución Oficial y Respaldo de Maines SRL",
      description: "Maines SRL actúa como el canal oficial y exclusivo de Jetema en Bolivia, garantizando la trazabilidad estéril absoluta y la entrega directa a clínicas médicas certificadas de todo el territorio nacional.",
      bullets: [
        {
          title: "Suministro Directo",
          text: "Cada producto cuenta con certificación de origen Jetema, garantizando autenticidad y seguridad clínica ante organismos locales."
        },
        {
          title: "Autenticidad Garantizada",
          text: "Código de trazabilidad único auditable por profesionales de la salud a través de nuestro portal."
        },
        {
          title: "Cobertura Nacional",
          text: "Distribución ágil, rápida y segura en cajas térmicas controladas a clínicas y consultorios médicos."
        }
      ]
    },
    cta: {
      title: "¿Desea incorporar el portafolio de Jetema en su práctica profesional?",
      subtitle: "Contacte directamente con un asesor comercial de Maines SRL para recibir información sobre precios de distribuidor, capacitaciones clínicas y protocolos certificados.",
      primaryBtn: "Contactar Asesor",
      secondaryBtn: "Descargar Portafolio"
    },
    products: [
      {
        id: "jetema-toxta-100u",
        name: "TOXTA 100U",
        category: "toxins",
        categoryLabel: { es: "Toxina Botulínica", en: "Botulinum Toxin" },
        descriptor: "Clostridium Botulinum Toxin Type A",
        coverImage: "/assets/info/toxta-product.webp",
        gallery: [
          "/assets/info/toxta-product.webp",
          "/assets/info/toxta-cap.webp",
          "/assets/info/toxta-vial.webp"
        ],
        certBadge: "FDA Approved",
        composition: "Complejo de toxina Clostridium botulinum tipo A purificada (100 unidades), estabilizada con Albúmina Humana y Cloruro de Sodio.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredient", value: "Clostridium Botulinum Toxin Type A" },
          { label: "Appearance", value: "White lyophilized powder" },
          { label: "Potency", value: "100 Units" },
          { label: "Storage", value: "2-8°C (Refrigerator)" },
          { label: "Shelf Life", value: "36 months from manufacturing" }
        ],
        clinicalInsights: [
          { title: "Application Technique", label: "Video Tutorial", type: "video" },
          { title: "Patient Results", label: "Case Study", type: "cases" },
          { title: "Product Texture", label: "Material Safety", type: "dossier" }
        ]
      },
      {
        id: "jetema-cptq-s500",
        name: "c.p.t.q. S500",
        category: "fillers",
        categoryLabel: { es: "Ácido Hialurónico - Alta Densidad", en: "Hyaluronic Acid - High Density" },
        descriptor: "Hyaluronic Acid Filler",
        coverImage: "/assets/info/cptq-s500.webp",
        gallery: [
          "/assets/info/cptq-s500.webp",
          "/assets/info/cptq-s500-syringe.webp"
        ],
        certBadge: "CE Certified",
        composition: "Ácido hialurónico altamente reticulado (24 mg/mL) formulado con tecnología ZEEP (Zero Endotoxin & BDDE Entire Process) para minimizar impurezas residuales.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredient", value: "Cross-linked Hyaluronic Acid" },
          { label: "Concentration", value: "24 mg/mL" },
          { label: "Volume", value: "1.1 mL pre-filled syringe" },
          { label: "Cross-linking Degree", value: "High (Optimal for deep contouring)" },
          { label: "Storage", value: "2-25°C (Do not freeze)" },
          { label: "Shelf Life", value: "24 months" }
        ],
        clinicalInsights: [
          { title: "Volume Restoration", label: "Dr. Chang Clinical Case", type: "cases" },
          { title: "Reticulation Study", label: "ZEEP Purity Dossier", type: "dossier" }
        ]
      },
      {
        id: "jetema-cptq-s300",
        name: "c.p.t.q. S300",
        category: "fillers",
        categoryLabel: { es: "Ácido Hialurónico - Media Densidad", en: "Hyaluronic Acid - Medium Density" },
        descriptor: "Hyaluronic Acid Filler",
        coverImage: "/assets/info/cptq-s300.webp",
        gallery: [
          "/assets/info/cptq-s300.webp",
          "/assets/info/cptq-s300-syringe.webp"
        ],
        certBadge: "CE Certified",
        composition: "Ácido hialurónico reticulado de densidad media (24 mg/mL) diseñado para rellenar arrugas moderadas a profundas y restaurar volumen labial.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredient", value: "Cross-linked Hyaluronic Acid" },
          { label: "Concentration", value: "24 mg/mL" },
          { label: "Volume", value: "1.1 mL pre-filled syringe" },
          { label: "Cross-linking Degree", value: "Medium (Perfect for lips and cheeks)" },
          { label: "Storage", value: "2-25°C" },
          { label: "Shelf Life", value: "24 months" }
        ],
        clinicalInsights: [
          { title: "Lips Augmentation", label: "Protocol Labial", type: "video" },
          { title: "Elasticity Modulus", label: "Rheological Specs", type: "dossier" }
        ]
      },
      {
        id: "jetema-cptq-s100",
        name: "c.p.t.q. S100",
        category: "fillers",
        categoryLabel: { es: "Ácido Hialurónico - Baja Densidad", en: "Hyaluronic Acid - Low Density" },
        descriptor: "Hyaluronic Acid Filler",
        coverImage: "/assets/info/cptq-s100.webp",
        gallery: [
          "/assets/info/cptq-s100.webp"
        ],
        certBadge: "CE Certified",
        composition: "Ácido hialurónico de baja reticulación (24 mg/mL) óptimo para la corrección de líneas finas superficiales y rejuvenecimiento periocular.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredient", value: "Cross-linked Hyaluronic Acid" },
          { label: "Concentration", value: "24 mg/mL" },
          { label: "Volume", value: "1.1 mL pre-filled syringe" },
          { label: "Cross-linking Degree", value: "Low (Superficial injection)" },
          { label: "Storage", value: "2-25°C" }
        ],
        clinicalInsights: [
          { title: "Fine Lines Protocol", label: "Superficial Injection Guide", type: "video" }
        ]
      }
    ]
  },
  dermclar: {
    id: "dermclar",
    name: "Dermclar",
    logo: "/assets/dermclar-logo.png",
    tagline: "Cosmética Avanzada para el Cuidado y Mesoterapia Científica",
    description: "Fórmulas de mesoterapia transdérmica premium enfocadas en la regeneración celular activa, el rejuvenecimiento y tratamientos corporales eficaces.",
    bgImage: "/assets/marcas/card-dermclar.webp",
    heroBg: "/assets/marcas/dermclar-hero.jpg",
    aboutBg: "/assets/marcas/dermclar-institucional.jpg",
    ctaBg: "/assets/marcas/dermclar-cta.jpg",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500",
    accentHover: "hover:bg-violet-600",
    accentFocusRing: "focus:ring-violet-400/50",
    themeGradient: "from-violet-500 to-indigo-700",
    themeBorder: "border-violet-500/20",
    glowClass: "glow-gold", // Aesthetic gold/yellow glow for dermclar/skincare
    categories: [
      { id: "all", label: { es: "Todos", en: "All" } },
      { id: "facial", label: { es: "Tratamientos Faciales", en: "Facial Care" } },
      { id: "corporal", label: { es: "Tratamientos Corporales", en: "Body Care" } },
      { id: "capilar", label: { es: "Tratamientos Capilares", en: "Hair Care" } }
    ],
    about: {
      pretitle: "RESPALDO OFICIAL",
      title: "Distribución Oficial y Respaldo de Maines SRL",
      description: "Maines SRL provee el portafolio completo de Dermclar en Bolivia, asegurando los registros sanitarios correspondientes ante la AGEMED y entregando productos estériles en condiciones óptimas.",
      bullets: [
        {
          title: "Suministro Confiable",
          text: "Garantía de stock permanente y canalización directa con el laboratorio europeo de Dermclar."
        },
        {
          title: "Certificación Sanitaria",
          text: "Todos los viales y ampollas cuentan con importación autorizada y registro AGEMED vigente."
        },
        {
          title: "Capacitación Médica",
          text: "Talleres y protocolos de mesoterapia avanzada dirigidos exclusivamente a especialistas y cosmiatras autorizados."
        }
      ]
    },
    cta: {
      title: "¿Desea incorporar el portafolio de Dermclar en su clínica?",
      subtitle: "Contacte con un asesor de Maines SRL para obtener el catálogo completo de principios activos, combinaciones de mesoterapia y precios preferenciales para profesionales.",
      primaryBtn: "Solicitar Catálogo",
      secondaryBtn: "Fichas Técnicas"
    },
    products: [
      {
        id: "dermclar-face-regen",
        name: "Dermclar Face",
        category: "facial",
        categoryLabel: { es: "Antienvejecimiento Facial", en: "Facial Anti-aging" },
        descriptor: "Rejuvenating Cocktail",
        coverImage: "/assets/info/dermclar-face.webp",
        gallery: [
          "/assets/info/dermclar-face.webp"
        ],
        certBadge: "AGEMED Approved",
        composition: "Combinación sinérgica de Ácido Hialurónico no reticulado, DMAE, Vitaminas, Coenzimas y Silicio Orgánico.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredients", value: "DMAE, Hyaluronic Acid, Organic Silicon" },
          { label: "Presentation", value: "Box of 5 vials x 10 mL" },
          { label: "Application Method", value: "Microneedling, Transdermal Electroporation" },
          { label: "Storage", value: "15-25°C (Keep away from light)" },
          { label: "Shelf Life", value: "36 months" }
        ],
        clinicalInsights: [
          { title: "Application Technique", label: "Microneedling Protocol", type: "video" },
          { title: "Patient Results", label: "Double Blind Study", type: "cases" }
        ]
      },
      {
        id: "dermclar-hair-stim",
        name: "Dermclar Hair",
        category: "capilar",
        categoryLabel: { es: "Bioestimulación Capilar", en: "Capillary Bio-stimulation" },
        descriptor: "Hair Revitalizing Cocktail",
        coverImage: "/assets/info/dermclar-hair.webp",
        gallery: [
          "/assets/info/dermclar-hair.webp"
        ],
        certBadge: "CE Certified",
        composition: "Fórmula activa a base de Pantenol, Biotina, Minoxidil-like peptides y Aminoácidos esenciales para detener la caída y estimular el folículo.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredients", value: "Biotin, D-Panthenol, Cooper Peptides" },
          { label: "Presentation", value: "Vials 5 mL" },
          { label: "Treatment Protocol", value: "1 session every 15 days (6 sessions)" },
          { label: "Storage", value: "Cool dry place" }
        ],
        clinicalInsights: [
          { title: "Hair Growth Evaluation", label: "Trichological Outcome", type: "cases" }
        ]
      },
      {
        id: "dermclar-celu-control",
        name: "Dermclar Celu",
        category: "corporal",
        categoryLabel: { es: "Tratamiento Anticelulítico", en: "Cellulite & Firming Treatment" },
        descriptor: "Lipolytic & Firming Complex",
        coverImage: "/assets/info/dermclar-celu.webp",
        gallery: [
          "/assets/info/dermclar-celu.webp"
        ],
        certBadge: "AGEMED Approved",
        composition: "Extracto de Alcachofa, Cafeína, L-Carnitina y Centella Asiática en proporciones óptimas para reducir adiposidades y reafirmar la matriz celular.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredients", value: "Caffeine, L-Carnitine, Artichoke Extract" },
          { label: "Presentation", value: "Box of 10 ampoules x 5 mL" },
          { label: "Indication", value: "Localized fat and edematous cellulite" },
          { label: "Storage", value: "Room temperature (max 25°C)" }
        ],
        clinicalInsights: [
          { title: "Lipolytic Mechanism", label: "Mechanism of Action", type: "dossier" }
        ]
      }
    ]
  },
  xtralife: {
    id: "xtralife",
    name: "Xtralife",
    logo: "/assets/xtralife-logo.png",
    tagline: "Nutrición Natural y Suplementación Científica de Vanguardia",
    description: "Vitaminas, minerales y suplementos nutricionales de formulación norteamericana avanzada. Respaldo biológico para la longevidad y vitalidad.",
    bgImage: "/assets/marcas/card-xtralife.webp",
    heroBg: "/assets/marcas/xtralife-hero.jpg",
    aboutBg: "/assets/marcas/xtralife-institucional.jpg",
    ctaBg: "/assets/marcas/xtralife-cta.jpg",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500",
    accentHover: "hover:bg-emerald-600",
    accentFocusRing: "focus:ring-emerald-400/50",
    themeGradient: "from-emerald-500 to-teal-700",
    themeBorder: "border-emerald-500/20",
    glowClass: "glow-blue",
    categories: [
      { id: "all", label: { es: "Todos", en: "All" } },
      { id: "immunity", label: { es: "Inmunidad y Antioxidantes", en: "Immunity & Antioxidants" } },
      { id: "wellness", label: { es: "Bienestar General", en: "Daily Wellness" } },
      { id: "bones", label: { es: "Salud Ósea y Articular", en: "Bone & Joint Health" } }
    ],
    about: {
      pretitle: "DISTRIBUCIÓN AUTORIZADA",
      title: "Distribución Oficial y Respaldo de Maines SRL",
      description: "Maines SRL importa legalmente y distribuye la línea completa de suplementos Xtralife Natural Products en farmacias, consultorios de nutrición y clínicas de medicina preventiva en Bolivia.",
      bullets: [
        {
          title: "Suministro Importado",
          text: "Procedencia 100% de Estados Unidos, garantizando los estándares de calidad de la FDA."
        },
        {
          title: "Control Sanitario",
          text: "Registro del SENASAG y AGEMED según corresponda para la libre venta autorizada nacional."
        },
        {
          title: "Seguridad de Lote",
          text: "Monitoreo y trazabilidad rigurosa de fechas de vencimiento y conservación térmica seca."
        }
      ]
    },
    cta: {
      title: "¿Desea incorporar el portafolio de Xtralife en su farmacia o consultorio?",
      subtitle: "Contacte con nuestro equipo comercial para obtener listas de precios al por mayor, condiciones de distribución y material educativo para pacientes.",
      primaryBtn: "Contactar Ventas",
      secondaryBtn: "Descargar Catálogo"
    },
    products: [
      {
        id: "xtralife-vit-c-1000",
        name: "Vitamin C 1000mg with Rose Hips",
        category: "immunity",
        categoryLabel: { es: "Refuerzo Inmunológico", en: "Immune Booster" },
        descriptor: "Antioxidant & Collagen Catalyst",
        coverImage: "/assets/info/xtralife-vitc.webp",
        gallery: [
          "/assets/info/xtralife-vitc.webp"
        ],
        certBadge: "AGEMED Approved",
        composition: "Cada tableta contiene 1000 mg de Ácido Ascórbico potenciado con Rose Hips (rosa mosqueta) para mejorar la absorción biodisponible.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredients", value: "Vitamin C 1000 mg, Rose Hips 20 mg" },
          { label: "Presentation", value: "Bottle of 100 tablets" },
          { label: "Origin", value: "Made in USA" },
          { label: "Dosage", value: "Take 1 tablet daily, preferably with a meal" },
          { label: "Storage", value: "Keep tightly closed in a cool, dry place" }
        ],
        clinicalInsights: [
          { title: "Immune Absorption Study", label: "Rose Hips Bioavailability", type: "dossier" }
        ]
      },
      {
        id: "xtralife-collagen-joint",
        name: "Collagen Joint Care",
        category: "bones",
        categoryLabel: { es: "Cuidado Articular", en: "Joint Care Supplement" },
        descriptor: "Hydrolyzed Collagen complex",
        coverImage: "/assets/info/xtralife-collagen.webp",
        gallery: [
          "/assets/info/xtralife-collagen.webp"
        ],
        certBadge: "FDA Inspected Facility",
        composition: "Péptidos de Colágeno Hidrolizado tipo I y II enriquecido con Condroitina, Glucosamina y MSM para la elasticidad de cartílagos.",
        downloadUrl: "#",
        specifications: [
          { label: "Active Ingredients", value: "Hydrolyzed Collagen, Glucosamine, Chondroitin, MSM" },
          { label: "Presentation", value: "Bottle of 120 capsules" },
          { label: "Dose Recommendation", value: "2 capsules twice a day with water" },
          { label: "Free of", value: "Gluten, Soy, Sugar, Artificial Flavors" }
        ],
        clinicalInsights: [
          { title: "Joint Mobility Outcomes", label: "MSM Synergy Report", type: "cases" }
        ]
      }
    ]
  }
};
