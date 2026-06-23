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
    accentColor: "text-[#4C5A9D]",
    accentBg: "bg-[#4C5A9D]",
    accentHover: "hover:bg-[#3b467a]",
    accentFocusRing: "focus:ring-[#4C5A9D]/50",
    themeGradient: "from-[#4C5A9D] to-[#5AA2D0]",
    themeBorder: "border-[#4C5A9D]/20",
    glowClass: "glow-jetema",
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
    videos: [
      {
        title: "Técnica de Aplicación - TOXTA®",
        url: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta1.webm",
        thumbnail: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta1.webp"
      },
      {
        title: "Resultados Clínicos - TOXTA®",
        url: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta2.webm",
        thumbnail: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta2.webp"
      },
      {
        title: "Análisis de Inmunogenicidad - TOXTA®",
        url: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta3.webm",
        thumbnail: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta3.webp"
      }
    ],
    social: {
      instagram: {
        handle: "@jetemaboliviaoficial",
        url: "https://www.instagram.com/jetemaboliviaoficial/"
      },
      tiktok: {
        handle: "@jetema.bo",
        url: "https://www.tiktok.com/@jetema.bo"
      },
      facebook: {
        handle: "@jetemaboliviaoficial",
        url: "https://www.facebook.com/jetemaboliviaoficial"
      },
      videos: [
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/1.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/2.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/3.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/4.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/5.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/6.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/7.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/8.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/9.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/jetema/10.webm"
      ]
    },
    products: [
      {
        id: "jetema-toxta-100u",
        name: "TOXTA 100U",
        category: "toxins",
        categoryLabel: { es: "Toxina Botulínica", en: "Botulinum Toxin" },
        descriptor: "Clostridium Botulinum Toxin Type A",
        coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta-portada.webp",
        gallery: [
          {
            image: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta1.webp",
            video: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta1.webm"
          },
          {
            image: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta2.webp",
            video: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta2.webm"
          },
          {
            image: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta3.webp",
            video: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/jetema/toxta/toxta3.webm"
          }
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
    heroBg: "/assets/marcas/dermclar/dermclar-hero.jpeg",
    aboutBg: "/assets/marcas/dermclar/dermclar-infomarca.jpeg",
    ctaBg: "/assets/marcas/dermclar/dermclar-cta.jpeg",
    accentColor: "text-[#0ea5e9]",
    accentBg: "bg-[#0ea5e9]",
    accentHover: "hover:bg-[#0284c7]",
    accentFocusRing: "focus:ring-[#0ea5e9]/50",
    themeGradient: "from-[#0ea5e9] to-[#0d9488]",
    themeBorder: "border-[#0ea5e9]/20",
    glowClass: "glow-blue",
    categories: [
      { id: "all", label: { es: "Todos", en: "All" } },
      { id: "Cocktails Line", label: { es: "Cocktails Line", en: "Cocktails Line" } },
      { id: "Professional Solutions Line", label: { es: "Professional Solutions Line", en: "Professional Solutions Line" } },
      { id: "Línea Flebológica", label: { es: "Línea Flebológica", en: "Phlebological Line" } }
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
    social: {
      instagram: {
        handle: "@dermclarbolivia",
        url: "https://www.instagram.com/dermclarbolivia/"
      },
      tiktok: {
        handle: "@dermclarbolivia",
        url: "https://www.tiktok.com/@dermclarbolivia"
      },
      facebook: {
        handle: "@dermclarbolivia",
        url: "https://www.facebook.com/dermclarbolivia"
      },
      videos: [
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/1.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/2.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/3.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/4.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/6.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/7.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/8.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/9.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/10.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/11.webm",
        "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/videos/dermclar/12.webm"
      ]
    },
    products: [
      {
        id: "derm-whitening",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Whitening Dermclar",
        presentation: "Caja de 5 Viales x 5ml",
        subtitle: "Solución integral despigmentante y antioxidante",
        description: "Dermclar Whitening es una solución integral que actúa tanto en la pigmentación de origen melánico como en la producida por el efecto oxidativo. Combina AHA, antioxidantes de alta tecnología y neuroactivos que impiden los depósitos de melanina por vía neural. Nutre, rejuvenece y aclara la piel de la pigmentación causada por la melanina, hemosiderina y lipofuscina.",
        benefits: [
          "Mejora visiblemente el aspecto de las manchas en la piel.",
          "Ejerce una potente acción antioxidante, protegiendo las células de los radicales libres.",
          "Regula la melanogénesis inhibiendo la producción de tirosinasa.",
          "Actúa sobre la mancha impidiendo los depósitos de melanina por vía neural."
        ],
        activeIngredientsList: [
          { "name": "Glutatión", "description": "Molécula compuesta por aminoácidos que protege las células de los radicales libres, actuando sobre el sistema inmunológico." },
          { "name": "Ácido Glicólico", "description": "AHA con acción queratolítica, renovadora y antiedad." },
          { "name": "Alfa Arbutina", "description": "Sustancia natural que regula la melanogénesis e inhibe la producción de tirosinasa." },
          { "name": "Ácido Kójico", "description": "Potente agente despigmentante natural." },
          { "name": "Pancratium Maritimum", "description": "Neuroactivo que inhibe la síntesis y exportación de melanina hacia la superficie." },
          { "name": "Ácido Ascórbico", "description": "Vitamina C que aporta una intensa acción antioxidante y unificadora del tono." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina.",
          "Aplicar sobre el área a tratar con electroporador, ultrasonido de alta impedancia u onda galvánica (aplicar la cantidad necesaria para deslizar los electrodos uniformemente).",
          "Dosis recomendada: 2 a 2.5 ml por zona tratada.",
          "Frecuencia: 1 sesión cada 8 días (se recomiendan de 8 a 10 sesiones dependiendo de la evolución de cada paciente)."
        ],
        contraindications: [
          "No usar sobre la piel irritada.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con un profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en lugar seco y fresco, protegido de la luz y del calor excesivo.",
          "Después de abierto, utilizar inmediatamente el vial completo."
        ],
        applicationZones: ["Rostro", "Cuello", "Escote", "Manos"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/whitening/dermclar-whitening-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/whitening/dermclar-whitening-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/whitening/dermclar-whitening-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/whitening/dermclar-whitening-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-firm",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar Firm",
        presentation: "Caja de 5 viales x 10ml",
        subtitle: "Coctel Reafirmante Tisular Avanzado y Reestructurador Dérmico",
        description: "Dermclar Firm es una solución transdérmica profesional formulada con una potente sinergia de activos reafirmantes que devuelven la tonicidad, elasticidad y firmeza original a los tejidos. Actúa directamente restaurando la arquitectura de las capas profundas de la dermis, estimulando la contracción muscular protectora y neutralizando el estrés oxidativo responsable del envejecimiento cutáneo prematuro. Diseñado específicamente para combatir la flacidez severa, tanto corporal como facial.",
        benefits: [
          "Efecto tensor y lifting mecánico inmediato y de largo plazo al aumentar el tono muscular tisular.",
          "Reestructura de forma global la matriz extracelular dérmica, mejorando la turgencia cutánea.",
          "Estimula activamente la biosíntesis de nuevas fibras de colágeno y elastina sanas.",
          "Mejora significativamente el aspecto estético de estrías previas y complementa el manejo de celulitis flácida."
        ],
        activeIngredientsList: [
          { "name": "DMAE (Dimetiletanolamina)", "description": "Precursor de la acetilcolina. Ejerce una potente acción tensora cutánea inmediata al estabilizar la membrana del adipocito y aumentar el tono muscular subyacente." },
          { "name": "Silicio Orgánico", "description": "Elemento estructural esencial de la matriz dérmica. Organiza los haces de colágeno, induce la regeneración del tejido conectivo flácido y frena la peroxidación lipídica." },
          { "name": "Centella Asiática", "description": "Bioestimulante tisular profundo. Activa directamente la funcionalidad de los fibroblastos, optimiza la microcirculación y favorece la reparación de estrías y cicatrices." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina mediante protocolos de estética avanzada.",
          "Perfectamente compatible con aparatología transdérmica: Electroporación (Mesoterapia Virtual), Microneedling (Dermapen), Ultrasonido de alta impedancia o Corrientes Galvánicas.",
          "Dosis: Aplicar de 2 a 5 ml en el área afectada (según criterio clínico y la extensión de la zona).",
          "Frecuencia recomendada: 1 sesión cada 8 días, completando un ciclo base indispensable de 8 a 10 sesiones durante el tratamiento."
        ],
        contraindications: [
          "No utilizar bajo ninguna circunstancia sobre piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse cualquier reacción desfavorable o hipersensibilidad, suspenda de inmediato su aplicación y consulte a su especialista.",
          "Manténgase estrictamente fuera del alcance de los niños. No aplicar en menores de edad.",
          "Almacenar en un lugar seco y fresco, protegido minuciosamente de la luz directa y del calor excesivo.",
          "Una vez abierto el vial, se debe utilizar el contenido completo de forma inmediata para asegurar la pureza del tratamiento."
        ],
        applicationZones: ["Abdomen", "Glúteos", "Brazos", "Piernas", "Rostro", "Cuello"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/firm/derclar-firm-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/firm/derclar-firm-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/firm/derclar-firm-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/firm/derclar-firm-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-plasmavit",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar PlasmaVit",
        presentation: "Caja de 5 Viales x 10ml",
        subtitle: "Solución integral bio-estimulante y revitalizante tisular",
        description: "Dermclar PlasmaVit es un revitalizante tisular avanzado que nutre intensamente los tejidos, mejorando la plasticidad y facilitando los procesos metabólicos celulares. Actúa directamente sobre la matriz extracelular, revitalizando las moléculas de colágeno, elastina y otras fibras estructurales para devolverle a la piel su densidad y firmeza original. Es el aliado perfecto para combatir el estrés oxidativo y el envejecimiento cutáneo.",
        benefits: [
          "Nutrición profunda e hidratación intensiva para pieles cansadas, apagadas y fatigadas.",
          "Efecto antioxidante potente que contrarresta el daño inducido por radicales libres.",
          "Aporta luminosidad, tonicidad y mejora visiblemente la textura global de la piel.",
          "Estimula la reparación de los tejidos y la regeneración celular activa."
        ],
        activeIngredientsList: [
          { "name": "Aminoácidos Autoestimulantes", "description": "Complejo nutricional esencial que provee los bloques de construcción celular para la síntesis de nuevas proteínas estructurales." },
          { "name": "Vitamina C (Ácido Ascórbico)", "description": "Antioxidante clave que evita el envejecimiento prematuro, unifica el tono y facilita la absorción de otros minerales." },
          { "name": "Silanol (Silicio Orgánico)", "description": "Agente reestructurante del tejido dérmico que induce y estimula la producción endógena de colágeno." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina clínica.",
          "Aplicación transdérmica compatible con aparatología: Ultrasonido de alta impedancia, electroporación (mesoterapia virtual) u onda galvánica.",
          "Dosis recomendada: Aplicar de 3 a 10 ml por sesión, dependiendo de la extensión del área a tratar.",
          "Frecuencia del tratamiento: 1 terapia semanal durante un ciclo aproximado de 3 a 5 sesiones."
        ],
        contraindications: [
          "No utilizar sobre la piel irritada, eccematosa o con heridas activas.",
          "En caso de reacción desfavorable, suspender el uso inmediatamente y consultar al profesional tratante.",
          "Exclusivo para uso profesional. Mantener estrictamente fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido de la luz directa y el calor excesivo.",
          "Utilizar el contenido del vial inmediatamente después de su apertura para garantizar su eficacia."
        ],
        applicationZones: ["Rostro", "Cuello", "Escote", "Cuerpo"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/plasmavit/dermclar-plasmavit-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/plasmavit/dermclar-plasmavit-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/plasmavit/dermclar-plasmavit-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/plasmavit/dermclar-plasmavit-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-sonic",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar Sonic",
        isNew: true,
        presentation: "Caja de 5 viales x 10ml",
        subtitle: "Tratamiento para adiposidades localizadas",
        description: "Fórmula con respaldo médico y científico. Tratamiento para adiposidades localizadas que facilita la reducción del volumen corporal y los cúmulos de grasa localizada.",
        benefits: [
          "Fórmula avanzada con respaldo médico y científico.",
          "Disuelve la grasa almacenada en los adipocitos de forma progresiva.",
          "Ayuda a eliminar la grasa localizada y reducir el volumen corporal."
        ],
        activeIngredientsList: [
          { "name": "Fosfatidilcolina", "description": "Agente que facilita la emulsión y descomposición de las grasas." },
          { "name": "Desoxicolato de Sodio", "description": "Actúa sobre la membrana celular del adipocito." },
          { "name": "L-Carnitina", "description": "Transportador de ácidos grasos libre para su metabolización." },
          { "name": "Troxerutina", "description": "Favorece la microcirculación y protege los vasos capilares." },
          { "name": "Taurina y Oligoelementos", "description": "Aportan vitalidad y optimizan los procesos metabólicos del tejido." }
        ],
        usageIndications: [
          "Uso tópico profesional con aparatología médica o estética."
        ],
        contraindications: [
          "Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar fresco y protegido de la luz."
        ],
        applicationZones: ["Cuerpo"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/dermsonic/dermclar-dermsonic-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/dermsonic/dermclar-dermsonic-1.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-alcachofa",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Extracto de Alcachofa",
        presentation: "Caja de 10 ampollas x 5ml",
        subtitle: "Solución purificante, desintoxicante y lipolítica",
        description: "La Solución Estética de Extracto de Alcachofa es un tratamiento profesional depurativo que facilita la eliminación de líquidos retenidos en los tejidos de manera natural. Actúa como un potente desintoxicante tisular, apoyando de manera eficaz el tratamiento de la celulitis (piel de naranja) y la obesidad localizada mediante la estimulación del sistema linfático.",
        benefits: [
          "Estimula la eliminación de líquidos retenidos de forma moderada y natural.",
          "Potencia la capacidad de desintoxicación de los tejidos, facilitando la eliminación de toxinas.",
          "Ejerce un efecto lipolítico suave que ayuda a reducir la grasa generalizada y los nódulos celulíticos.",
          "Protege el lecho capilar, haciendo más eficiente el intercambio de oxigenación y nutrición en la piel."
        ],
        activeIngredientsList: [
          { "name": "Extracto de Alcachofa (Cynara Scolymus)", "description": "Agente natural con alto poder depurativo, lipolítico y ligeramente diurético que regula el metabolismo de los lípidos y promueve el drenaje linfático." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina clínica.",
          "Compatible con aparatología estética: Cavitación, electroporación (mesoterapia virtual), onda galvánica y ultrasonido de baja impedancia.",
          "Dosis sugerida: Aplicar 5 ml en una terapia semanal sobre la zona a tratar.",
          "Se recomienda realizar un drenaje linfático manual 72 horas después de la aplicación para maximizar la eliminación de toxinas."
        ],
        contraindications: [
          "Mantener estrictamente fuera del alcance de los niños. No aplicar en menores.",
          "Evitar el contacto con los ojos y mucosas.",
          "Dejar de utilizar inmediatamente si aparecen signos de irritación (uso externo únicamente).",
          "Proteja sus manos al abrir el envase de cristal utilizando una toalla o un paño ligero."
        ],
        applicationZones: ["Abdomen", "Muslos", "Glúteos", "Piernas"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/alcachofa/dermclar-alcachofa-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/alcachofa/dermclar-alcachofa-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/alcachofa/dermclar-alcachofa-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/alcachofa/dermclar-alcachofa-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-centella",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Centella Asiática",
        presentation: "Caja de 10 ampollas x 5ml",
        subtitle: "Solución reafirmante y reparadora tisular",
        description: "La Solución Estética de Centella Asiática es un potente reparador tisular de uso profesional. Su fórmula actúa directamente sobre el tejido conectivo, mejorando el tono de la piel y la calidad de las fibras estructurales. Es un tratamiento altamente eficaz y reconocido por su idoneidad en el manejo de estrías, flacidez y diversos grados de celulitis.",
        benefits: [
          "Mejora visiblemente el tono, la elasticidad y la firmeza de la piel.",
          "Repara y mejora la calidad de las fibras de colágeno en el tejido conectivo.",
          "Tratamiento ideal y altamente eficaz para atenuar estrías y combatir la flacidez.",
          "Coadyuvante clave en el manejo estético de la celulitis."
        ],
        activeIngredientsList: [
          { "name": "Extracto de Centella Asiática", "description": "Potente bioestimulante natural que activa la funcionalidad de los fibroblastos, estimulando la síntesis de colágeno y optimizando la microcirculación tisular para la reparación de la piel." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina.",
          "Compatible con aparatología transdérmica: Radiofrecuencia, Ultrasonido de alta impedancia, Electroporación u Onda Galvánica.",
          "Dosis sugerida: Aplicar 5 ml en una terapia semanal.",
          "Frecuencia: Se recomienda realizar cada 7 a 8 días, completando un ciclo de 5 a 10 sesiones según el criterio profesional."
        ],
        contraindications: [
          "No usar sobre la piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con un profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido de la luz."
        ],
        applicationZones: ["Abdomen", "Glúteos", "Piernas", "Brazos"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/centella/dermclar-centella-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/centella/dermclar-centella-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/centella/dermclar-centella-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/centella/dermclar-centella-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-fosfatidilcolina",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Fosfatidilcolina",
        presentation: "Caja de 20 ampollas x 5ml",
        subtitle: "Solución intensiva lipolítica y adipocitolítica",
        description: "La Solución Estética de Fosfatidilcolina es un tratamiento profesional enfocado en la reducción de adiposidades localizadas rebeldes. Su fórmula actúa directamente aumentando la permeabilidad de la membrana del adipocito, lo que facilita la saponificación, emulsión y posterior eliminación de los triglicéridos almacenados en el tejido adiposo.",
        benefits: [
          "Ejerce una potente acción lipolítica, disolviendo y movilizando los cúmulos de grasa localizada.",
          "Facilita la emulsión de los triglicéridos para que el cuerpo los elimine de forma natural.",
          "Ideal para modelar y redefinir tanto el contorno corporal (abdomen, flancos) como el perfil facial (papada)."
        ],
        activeIngredientsList: [
          { "name": "Fosfatidilcolina", "description": "Fosfolípido que actúa como un potente agente emulsionante natural de las grasas. Degrada la membrana celular de los adipocitos, facilitando la liberación y metabolización de los lípidos contenidos en su interior." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina clínica.",
          "Compatible y recomendado para uso con equipos de penetración transdérmica: Electroporación (mesoterapia virtual), ultrasonido de alta impedancia u onda galvánica.",
          "Aplicar la cantidad necesaria para deslizar los electrodos de manera uniforme sobre la zona a tratar.",
          "Frecuencia sugerida: 1 sesión semanal o quincenal, según la evaluación y el protocolo determinado por el profesional."
        ],
        contraindications: [
          "Precaución clínica: No aplicar en pacientes con alergia conocida a la soya (soja) o sus derivados.",
          "No usar sobre la piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con el profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido de la luz."
        ],
        applicationZones: ["Abdomen", "Flancos", "Papada"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/fosfatidilcolina/dermclar-fosfatidilcolina-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/fosfatidilcolina/dermclar-fosfatidilcolina-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/fosfatidilcolina/dermclar-fosfatidilcolina-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/fosfatidilcolina/dermclar-fosfatidilcolina-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-lcarnitina",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. L-Carnitina",
        presentation: "Caja de 10 ampollas x 5ml",
        subtitle: "Lipolítico esencial y transportador de ácidos grasos",
        description: "La Solución Estética de L-Carnitina es un tratamiento lipolítico esencial de grado profesional. La L-Carnitina actúa fisiológicamente como un transportador obligado de los ácidos grasos a través de la membrana mitocondrial, facilitando su oxidación para la obtención de energía celular. Este proceso disminuye eficazmente el grosor del panículo adiposo, combatiendo la acumulación de grasa localizada.",
        benefits: [
          "Facilita la oxidación y combustión de las grasas acumuladas para la obtención de energía.",
          "Disminuye progresivamente el grosor del panículo adiposo (grasa localizada).",
          "Excelente coadyuvante en tratamientos de moldeamiento corporal y pérdida de medidas.",
          "Actúa de manera sinérgica al combinarse con otros agentes lipolíticos o reafirmantes."
        ],
        activeIngredientsList: [
          { "name": "L-Carnitina", "description": "Molécula biológica esencial que transporta los ácidos grasos libres al interior de la mitocondria, donde son transformados en energía mediante la beta-oxidación." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina.",
          "Compatible con aparatología transdérmica: Electroporación (mesoterapia virtual), ultrasonido de alta impedancia u onda galvánica.",
          "Aplicar la cantidad necesaria para deslizar los electrodos de manera uniforme sobre la zona a tratar.",
          "Dosis sugerida: 5 ml por sesión, adaptada según criterio profesional y área de tratamiento."
        ],
        contraindications: [
          "No usar sobre la piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con un profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido de la luz directa."
        ],
        applicationZones: ["Abdomen", "Piernas", "Glúteos"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/lcarnitina/dermclar-lcarnitina-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/lcarnitina/dermclar-lcarnitina-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/lcarnitina/dermclar-lcarnitina-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/lcarnitina/dermclar-lcarnitina-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-silicio",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Silicio Orgánico",
        presentation: "Caja de 10 ampollas x 5ml",
        subtitle: "Optimizador estructural y regenerador tisular",
        description: "La Solución Estética de Silicio Orgánico es un componente estructural fundamental para la matriz extracelular. Funciona como un regenerador biológico que entrecruza y estabiliza las fibras de colágeno y elastina. Esta acción restaura la arquitectura de los tejidos, mejorando significativamente la elasticidad, el tono y previniendo el envejecimiento cutáneo prematuro provocado por la peroxidación lipídica.",
        benefits: [
          "Mejora la capacidad de biosíntesis de proteínas esenciales (colágeno y elastina).",
          "Aporta un potente efecto reafirmante, combatiendo la flacidez cutánea facial y corporal.",
          "Potencia la regeneración del tejido conectivo, siendo ideal en el tratamiento de estrías.",
          "Actúa como un excelente coadyuvante en terapias de reducción de grasa corporal y revitalización global."
        ],
        activeIngredientsList: [
          { "name": "Silicio Orgánico", "description": "Biomolécula esencial que actúa como cemento dérmico, organizando las fibras estructurales y protegiendo el tejido frente al estrés oxidativo." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina clínica.",
          "Compatible con sistemas de penetración transdérmica: Electroporación (mesoterapia virtual), ultrasonido de alta impedancia, onda galvánica y microneedling.",
          "Aplicar la cantidad necesaria para deslizar los electrodos o dispositivos de manera uniforme sobre la zona a tratar.",
          "Se recomienda una terapia semanal, estructurando ciclos de 5 a 10 sesiones según evaluación clínica."
        ],
        contraindications: [
          "No usar sobre la piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con un profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido de la luz."
        ],
        applicationZones: ["Rostro", "Cuello", "Cuerpo"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/silicio/dermclar-silicio-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/silicio/dermclar-silicio-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/silicio/dermclar-silicio-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/silicio/dermclar-silicio-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-vitc",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Vitamina C 20%",
        presentation: "Caja de 5 viales x 10ml",
        subtitle: "Potente antioxidante celular and revitalizante tisular",
        description: "La Solución Estética de Vitamina C al 20% es un tratamiento profesional enfocado en el rejuvenecimiento cutáneo y la restitución tisular. Considerado uno de los antioxidantes más versátiles y eficaces en la estética médica, actúa mejorando la calidad funcional de la vitalidad celular, neutralizando el impacto de los radicales libres y previniendo el envejecimiento prematuro.",
        benefits: [
          "Aumenta visiblemente la luminosidad y unifica el tono de la piel apagada o fotoenvejecida.",
          "Ejerce una profunda acción antioxidante, protegiendo las células del estrés oxidativo.",
          "Ayuda a reducir la flacidez cutánea al estimular la síntesis natural de colágeno.",
          "Mejora la calidad funcional de las células, promoviendo un aspecto revitalizado y saludable."
        ],
        activeIngredientsList: [
          { "name": "Ascorbato de Sodio (Vitamina C 20%)", "description": "Forma estable y altamente asimilable de la Vitamina C que actúa como un escudo antioxidante, bloqueando el daño a nivel celular y favoreciendo la redensificación de la dermis." }
        ],
        usageIndications: [
          "Exclusivo uso tópico profesional en cabina clínica.",
          "Compatible con equipos de penetración transdérmica: Electroporación (mesoterapia virtual), ultrasonido de alta impedancia u onda galvánica.",
          "Aplicar la cantidad necesaria para deslizar los electrodos de manera uniforme sobre la zona a tratar.",
          "Frecuencia sugerida: 1 sesión semanal, según la evolución y el criterio del profesional."
        ],
        contraindications: [
          "No usar sobre la piel irritada, eccematosa o con heridas abiertas.",
          "En caso de presentarse una reacción desfavorable, suspender su uso y consultar con un profesional.",
          "Exclusivo para trabajo profesional. Mantener fuera del alcance de los niños.",
          "Almacenar en un lugar seco y fresco, protegido minuciosamente de la luz y el calor."
        ],
        applicationZones: ["Rostro", "Cuello", "Escote", "Manos"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/vitc/dermclar-vitc-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/vitc/dermclar-vitc-1.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/vitc/dermclar-vitc-2.webp" },
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/vitc/dermclar-vitc-3.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
      },
      {
        id: "derm-nol",
        brand: "dermclar",
        category: "Línea Flebológica",
        name: "Dermclar-nol 3%",
        presentation: "Caja de 10 ampollas x 2ml",
        subtitle: "Solución esclerosante superficial para piel fatigada",
        description: "Dermclar-nol 3% es una solución tópica especializada diseñada para mejorar significativamente la apariencia de la piel fatigada de las piernas. Su fórmula hipoalergénica de uso profesional está enfocada en la estética flebológica, siendo ideal para el tratamiento superficial de telangiectasias y varículas pequeñas.",
        benefits: [
          "Desvanece y mejora visualmente el aspecto de las 'telas de araña' vasculares en las piernas.",
          "Alivia la sensación de pesadez y fatiga cutánea en extremidades inferiores.",
          "Producto hipoalergénico de alta tolerancia cutánea."
        ],
        activeIngredientsList: [
          { "name": "Polidocanol 3%", "description": "Agente con propiedades esclerosantes y anestésicas locales que actúa sobre la pared venosa superficial." }
        ],
        usageIndications: [
          "Uso exclusivo tópico profesional.",
          "Puede ser aplicado en forma tópica por medio de masajes, uso de ultrasonido, electroporación o cualquier otro método de mesoterapia virtual.",
          "La dosis y frecuencia se determinan según el criterio del profesional basándose en la extensión de la zona."
        ],
        contraindications: [
          "Mantener fuera del alcance de los niños. No aplicar sobre población infantil.",
          "Evitar estrictamente el contacto con los ojos.",
          "Dejar de utilizar si aparecen signos de irritación.",
          "Proteja sus manos al abrir el envase de cristal con una toalla o un paño ligero."
        ],
        applicationZones: ["Muslos", "Piernas"],
        assets: {
          coverImage: "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/nol/dermclar-nol-portada.webp",
          gallery: [
            { "image": "https://ggkwhnuqwktfoynxkgsi.supabase.co/storage/v1/object/public/brand-assets/logos-marcas/dermclar/nol/dermclar-nol-1.webp" }
          ]
        },
        regulatory: {
          isClickable: false,
          label: "Certificación AGEMED - Registro Sanitario Oficial Bolivia"
        }
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
    heroBg: "/assets/marcas/xtralife/xtralife-hero.jpeg",
    aboutBg: "/assets/marcas/xtralife/xtralife-infomarca.jpeg",
    ctaBg: "/assets/marcas/xtralife/xtralife-cta.jpeg",
    accentColor: "text-emerald-500",
    accentBg: "bg-emerald-500",
    accentHover: "hover:bg-emerald-600",
    accentFocusRing: "focus:ring-emerald-400/50",
    themeGradient: "from-emerald-500 to-teal-700",
    themeBorder: "border-emerald-500/20",
    glowClass: "glow-emerald",
    categories: [
      {
        id: "all",
        label: {
          es: "Todos",
          en: "All"
        }
      },
      {
        id: "cardiovascular",
        label: {
          es: "Bienestar Cardiovascular y General",
          en: "Cardiovascular & General Wellness"
        }
      },
      {
        id: "energy",
        label: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        }
      },
      {
        id: "immunity",
        label: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        }
      },
      {
        id: "bones",
        label: {
          es: "Salud Ósea y Articular",
          en: "Bone & Joint Health"
        }
      },
      {
        id: "nervous",
        label: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        }
      },
      {
        id: "specific",
        label: {
          es: "Salud Específica y Control",
          en: "Specific Health & Control"
        }
      },
      {
        id: "nutricosmetics",
        label: {
          es: "Nutricosmética (Piel y Cabello)",
          en: "Nutricosmetics (Skin & Hair)"
        }
      }
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
        id: "xtralife-omega-3",
        brand: "xtralife",
        category: "cardiovascular",
        categoryLabel: {
          es: "Bienestar Cardiovascular y General",
          en: "Cardiovascular & General Wellness"
        },
        name: "Omega 3",
        descriptor: "Essential Fatty Acids / Ácidos Grasos Esenciales",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100/200 cápsulas blandas",
          en: "100/200 softgels"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 softgel daily"
        },
        description: {
          es: "Reduce la presión arterial y el colesterol. Otorga un efecto protector del sistema nervioso. Mejora la salud mental. Previene los accidentes cerebrovasculares y ataques cardiacos.",
          en: "Reduces blood pressure and cholesterol. Provides a protective effect on the nervous system. Improves mental health. Prevents strokes and heart attacks."
        }
      },
      {
        id: "xtralife-omega-3-6-9",
        brand: "xtralife",
        category: "cardiovascular",
        categoryLabel: {
          es: "Bienestar Cardiovascular y General",
          en: "Cardiovascular & General Wellness"
        },
        name: "Omega 3-6-9",
        descriptor: "Balanced Omegas / Omegas Balanceados",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "90 cápsulas blandas",
          en: "90 softgels"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 softgel daily"
        },
        description: {
          es: "Mejora el sistema inmunológico. Ayuda a disminuir el colesterol y los triglicéridos. Ayuda a reducir la inflamación en las células. Mejora los niveles de concentración y aprendizaje. Fortalece los huesos y dientes.",
          en: "Improves the immune system. Helps lower cholesterol and triglycerides. Helps reduce inflammation in cells. Improves concentration and learning levels. Strengthens bones and teeth."
        }
      },
      {
        id: "xtralife-perlas-ajo",
        brand: "xtralife",
        category: "cardiovascular",
        categoryLabel: {
          es: "Bienestar Cardiovascular y General",
          en: "Cardiovascular & General Wellness"
        },
        name: "Perlas de Ajo",
        descriptor: "Garlic Oil Extract / Extracto de Aceite de Ajo",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas blandas",
          en: "100 softgels"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 softgel daily"
        },
        description: {
          es: "Es eficaz como antibiótico, combatiendo numerosos hongos, bacterias y virus. Reduce la presión arterial y el colesterol. Controla los daños causados por la arterioesclerosis y el reuma. Mejora la circulación sanguínea, evita retención de líquidos. Previene varices. Fortalece el sistema inmunológico.",
          en: "Effective as an antibiotic against fungi, bacteria, and viruses. Reduces blood pressure and cholesterol. Controls damage caused by arteriosclerosis and rheumatism. Improves blood circulation, prevents fluid retention and varicose veins. Strengthens the immune system."
        }
      },
      {
        id: "xtralife-hgh-releasing",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "HGH Releasing",
        descriptor: "Growth Hormone Support / Soporte de Hormona de Crecimiento",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "120 cápsulas",
          en: "120 capsules"
        },
        dosage: {
          es: "8 a 14 años: 1 cápsula antes de dormir. 14 años en adelante: 2 cápsulas antes de dormir",
          en: "8 to 14 years: 1 capsule before sleep. 14 years and older: 2 capsules before sleep"
        },
        description: {
          es: "Estimulante natural de la hormona del crecimiento. Favorece en el incremento de masa muscular. Aumenta la densidad ósea, asimismo fortaleciéndolos. Alivia el insomnio y mejora la calidad del sueño. Reduce la fatiga y aumenta los niveles de energía. Mejora los niveles de azúcar en sangre.",
          en: "Natural growth hormone stimulant. Promotes muscle mass increase. Increases bone density and strengthens them. Relieves insomnia and improves sleep quality. Reduces fatigue and increases energy levels. Improves blood sugar levels."
        }
      },
      {
        id: "xtralife-xtra-vigor-male",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "Xtra Vigor Male",
        descriptor: "Male Performance Complex / Complejo de Rendimiento Masculino",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 comprimidos",
          en: "100 tablets"
        },
        dosage: {
          es: "2 comprimidos diarios",
          en: "2 tablets daily"
        },
        description: {
          es: "Mejora la salud y el rendimiento integral en el hombre. Reduce el cansancio, la debilidad, estrés y otras afecciones derivadas por una baja cantidad de vitaminas. Además cuenta con Jalea Real y Polen para fortalecer el sistema inmunológico. Previene futuros problemas en la próstata y ayuda en la salud sexual.",
          en: "Improves overall health and performance in men. Reduces fatigue, weakness, stress, and other conditions derived from low vitamins. Contains Royal Jelly and Pollen to strengthen the immune system. Prevents future prostate problems and aids in sexual health."
        }
      },
      {
        id: "xtralife-xtra-vigor-female",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "Xtra Vigor Female",
        descriptor: "Female Performance Complex / Complejo de Rendimiento Femenino",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 comprimidos",
          en: "100 tablets"
        },
        dosage: {
          es: "2 comprimidos diarios",
          en: "2 tablets daily"
        },
        description: {
          es: "Mejora la salud y el rendimiento integral en la mujer. Reduce el cansancio, la debilidad, estrés y otras afecciones derivadas por una baja cantidad de vitaminas. Además, cuenta con Jalea Real y Polen para fortalecer el sistema inmunológico. Ayuda al crecimiento de las uñas, previene la caída del cabello y mejora la textura de la piel.",
          en: "Improves overall health and performance in women. Reduces fatigue, weakness, stress, and other conditions derived from low vitamins. Contains Royal Jelly and Pollen to strengthen the immune system. Helps nail growth, prevents hair loss, and improves skin texture."
        }
      },
      {
        id: "xtralife-shilajit",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "Shilajit",
        descriptor: "Himalayan Shilajit Extract / Extracto de Shilajit del Himalaya",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Aumenta los niveles de energía, mejora la función cerebral, apoya la salud del corazón, y combate los efectos del envejecimiento. Poderoso antioxidante y antiinflamatorio.",
          en: "Increases energy levels, improves brain function, supports heart health, and combats the effects of aging. Powerful antioxidant and anti-inflammatory."
        }
      },
      {
        id: "xtralife-nad-red-wine",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "NAD + Red Wine",
        descriptor: "Cellular Anti-Aging / Antienvejecimiento Celular",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Reduce la fatiga, retrasa del envejecimiento, aumenta la producción de energía en las células, Ayuda a proteger a las células contra el daño oxidativo y a reducir la inflamación en el cuerpo.",
          en: "Reduces fatigue, delays aging, increases energy production in cells. Helps protect cells against oxidative damage and reduce body inflammation."
        }
      },
      {
        id: "xtralife-l-arginina",
        brand: "xtralife",
        category: "energy",
        categoryLabel: {
          es: "Energía, Vitalidad y Rendimiento",
          en: "Energy, Vitality & Performance"
        },
        name: "L-Arginina",
        descriptor: "Amino Acid Flow Support / Aminoácido de Soporte Circulatorio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "1 a 2 cápsulas diarias",
          en: "1 to 2 capsules daily"
        },
        description: {
          es: "Estimula la liberación de la hormona del crecimiento. Ayuda en el aumento de masa muscular. Disminuye la Presión arterial. Ayuda a frenar la pérdida de memoria vinculada con la edad.",
          en: "Stimulates growth hormone release. Aids in muscle mass increase. Lowers blood pressure. Helps slow down age-related memory loss."
        }
      },
      {
        id: "xtralife-vitamina-c-1000",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Vitamina C 1000 mg",
        descriptor: "Immune Shield / Escudo Inmunológico",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Conocida como ácido ascórbico. Incrementa la absorción de hierro en el organismo. Disminuye la severidad y duración de los síntomas alérgicos o resfríos. Participa en la hemostasia favoreciendo la cicatrización de heridas.",
          en: "Known as ascorbic acid. Increases iron absorption in the body. Decreases the severity and duration of allergic symptoms or colds. Participates in hemostasis, promoting wound healing."
        }
      },
      {
        id: "xtralife-vitamina-d3",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Vitamina D3",
        descriptor: "Bone & Immune Support / Soporte Óseo e Inmune",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas blandas",
          en: "100 softgels"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Aumenta la esperanza de vida en las mujeres. Reduce el riesgo de sufrir una fractura. Contribuye al crecimiento adecuado de los huesos. Posee propiedades inmunitarias. Reduce los riesgos de padecer algún proceso degenerativo. Evita el envejecimiento.",
          en: "Increases life expectancy in women. Reduces the risk of fractures. Contributes to proper bone growth. Possesses immune properties. Reduces the risks of degenerative processes. Prevents aging."
        }
      },
      {
        id: "xtralife-vitamina-a",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Vitamina A",
        descriptor: "Retinol Vision Support / Soporte de Visión Retinol",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas blandas",
          en: "100 softgels"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Conocida también como retinol actúa formando un pigmento visual imprescindible para el correcto funcionamiento de la retina y una mejor visión nocturna. Facilita la movilización del hierro hacia los glóbulos rojos en desarrollo.",
          en: "Also known as retinol, it forms a visual pigment essential for proper retinal function and better night vision. Facilitates iron mobilization to developing red blood cells."
        }
      },
      {
        id: "xtralife-zinc-50",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Zinc 50 mg",
        descriptor: "Mineral Defense & Skin / Defensa Mineral y Cutánea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Mejora y equilibra el sistema inmunológico. Regula la producción de grasa en la piel, por lo que mejora los procesos de acné y por tanto, el aspecto general de la piel. La aplicación de zinc acelera los procesos de cicatrización. Estimula la regeneración de los tejidos.",
          en: "Improves and balances the immune system. Regulates skin fat production, improving acne processes and overall skin appearance. Accelerates healing processes. Stimulates tissue regeneration."
        }
      },
      {
        id: "xtralife-echinacea",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Echinacea",
        descriptor: "Natural Immune Booster / Refuerzo Inmune Natural",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "3 cápsulas diarias",
          en: "3 capsules daily"
        },
        description: {
          es: "Apoyo natural al sistema inmunológico (Elevando las defensas del cuerpo). Ayuda en el tratamiento de procesos infecciosos respiratorios.",
          en: "Natural support to the immune system (Raising body defenses). Helps in the treatment of respiratory infectious processes."
        }
      },
      {
        id: "xtralife-balanced-b",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Balanced B",
        descriptor: "Vitamin B Complex / Complejo de Vitaminas B",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 Comprimidos",
          en: "100 tablets"
        },
        dosage: {
          es: "1 comprimido al día",
          en: "1 tablet daily"
        },
        description: {
          es: "Es un suplemento que combina las vitaminas del grupo B, que brindan grandes beneficios al ser consumidos en conjunto, entre ellos la formación de glóbulos rojos, funcionamiento correcto del sistema digestivo y del sistema nervioso. Aporta grandes beneficios al cabello, las uñas y la piel.",
          en: "A supplement combining B-group vitamins, providing great benefits together, including red blood cell formation, and proper digestive and nervous system function. Great benefits for hair, nails, and skin."
        }
      },
      {
        id: "xtralife-colostrum-3-factor",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: {
          es: "Inmunidad, Vitaminas y Minerales",
          en: "Immunity, Vitamins & Minerals"
        },
        name: "Colostrum 3 Factor",
        descriptor: "Bioactive Immunoglobulins / Inmunoglobulinas Bioactivas",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Ayuda a tener una piel saludable, favorece la regeneración y reparación de células y tejidos en todo el cuerpo humano, desde los huesos hasta los músculos y la piel. Fortalece tu sistema inmunológico, mejora la salud intestinal.",
          en: "Helps maintain healthy skin, favors cell and tissue regeneration and repair throughout the body, from bones to muscles and skin. Strengthens the immune system, improves intestinal health."
        }
      },
      {
        id: "xtralife-k2-d3-calcio",
        brand: "xtralife",
        category: "bones",
        categoryLabel: {
          es: "Salud Ósea y Articular",
          en: "Bone & Joint Health"
        },
        name: "K2 + D3 + Calcio",
        descriptor: "Bone Mineralization / Mineralización Ósea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "La vitamina K2 ayuda a asegurar que el calcio llegue a donde más se necesita, apoyando una salud cardiovascular óptima. En combinación con la vitamina D3, favorece la absorción de calcio en los huesos.",
          en: "Vitamin K2 helps ensure calcium gets where it is most needed, supporting optimal cardiovascular health. In combination with Vitamin D3, it favors calcium absorption in bones."
        }
      },
      {
        id: "xtralife-cal-mag-zinc",
        brand: "xtralife",
        category: "bones",
        categoryLabel: {
          es: "Salud Ósea y Articular",
          en: "Bone & Joint Health"
        },
        name: "Cal-Mag-Zinc + Vitamina D",
        descriptor: "Bone Density Complex / Complejo de Densidad Ósea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 tabletas",
          en: "100 tablets"
        },
        dosage: {
          es: "1 a 2 tabletas diarias",
          en: "1 to 2 tablets daily"
        },
        description: {
          es: "Esta combinación perfecta de calcio magnesio y vitamina D permite la máxima absorción de calcio en el organismo usada para prevenir la perdida de minerales en los huesos controlando así la osteoporosis. El zinc es especialmente importante para el funcionamiento natural del sistema inmunológico, la cicatrización de la piel y en la producción de colágeno.",
          en: "This perfect combination of calcium, magnesium, and vitamin D allows maximum calcium absorption, used to prevent bone mineral loss, thus controlling osteoporosis. Zinc is vital for immune function, skin healing, and collagen production."
        }
      },
      {
        id: "xtralife-cartilago-tiburon",
        brand: "xtralife",
        category: "bones",
        categoryLabel: {
          es: "Salud Ósea y Articular",
          en: "Bone & Joint Health"
        },
        name: "Cartílago de Tiburón",
        descriptor: "Shark Cartilage / Cartílago de Tiburón",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Es una fuente muy importante de proteínas, calcio y fósforo que juegan un papel esencial en la protección de las articulaciones, los tendones y los ligamentos. Además, contribuye a la síntesis del colágeno y la elasticidad del cartílago también para tratar la artritis, la psoriasis, la cicatrización de las heridas, los daños en la retina del ojo debido a la diabetes.",
          en: "A very important source of proteins, calcium, and phosphorus essential for protecting joints, tendons, and ligaments. Contributes to collagen synthesis and cartilage elasticity, treating arthritis, psoriasis, wound healing, and diabetic retinal damage."
        }
      },
      {
        id: "xtralife-5-htp-melatonina",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "5-HTP + Melatonina",
        descriptor: "Sleep & Mood Regulator / Regulador de Ánimo y Sueño",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "30 cápsulas",
          en: "30 capsules"
        },
        dosage: {
          es: "1 cápsula diaria antes de acostarse",
          en: "1 capsule daily before bedtime"
        },
        description: {
          es: "Ayuda a aumentar los niveles de serotonina, mejorando los síntomas de depresión, ansiedad y estrés. Mejorar la calidad del sueño y refuerza el sistema inmunológico.",
          en: "Helps increase serotonin levels, improving symptoms of depression, anxiety, and stress. Improves sleep quality and reinforces the immune system."
        }
      },
      {
        id: "xtralife-melatonina-10",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Melatonina 10 MG",
        descriptor: "High Potency Antioxidant Sleep / Sueño Antioxidante de Alta Potencia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "1 cápsula diaria, de preferencia de noche",
          en: "1 capsule daily, preferably at night"
        },
        description: {
          es: "Ayuda a mejorar la calidad del sueño. Tiene efecto antioxidante, fortaleciendo así el sistema inmunológico. Participa en la regulación del estado de animo. Reduce la acidez estomacal.",
          en: "Helps improve sleep quality. Has an antioxidant effect, strengthening the immune system. Participates in mood regulation. Reduces stomach acidity."
        }
      },
      {
        id: "xtralife-citrato-magnesio",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Citrato de Magnesio",
        descriptor: "Magnesium Citrate / Citrato de Magnesio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Reduce el estrés y mejora la calidad del sueño. Evita las contracturas musculares y calambres. Regula los niveles de glucosa en sangre. Fortalece el sistema inmunológico. Ayuda a regular la salud intestinal.",
          en: "Reduces stress and improves sleep quality. Prevents muscle contractures and cramps. Regulates blood glucose levels. Strengthens the immune system. Helps regulate intestinal health."
        }
      },
      {
        id: "xtralife-resveratrol",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Resveratrol",
        descriptor: "Natural Antioxidant / Antioxidante Natural",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Tiene propiedades antioxidantes y antiinflamatorias, ayuda a prevenir el envejecimiento prematuro, protege de enfermedades cardiovasculares, evita enfermedades neurodegenerativas.",
          en: "Has antioxidant and anti-inflammatory properties, helps prevent premature aging, protects from cardiovascular diseases, and prevents neurodegenerative diseases."
        }
      },
      {
        id: "xtralife-ginkgo-biloba",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Ginkgo Biloba",
        descriptor: "Mental Focus & Circulation / Concentración Mental y Circulación",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "120 cápsulas",
          en: "120 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Mejora la circulación sanguínea a nivel cerebral. Trastornos del flujo de sangre (trastornos circulatorios), Asma y alergias. Ayuda con Problemas de memoria y concentración, ansiedad, estrés y problemas anímicos. Aumenta la virilidad masculina.",
          en: "Improves blood circulation at the brain level. Blood flow disorders (circulatory disorders), Asthma and allergies. Helps with Memory and concentration problems, anxiety, stress, and mood problems. Increases male virility."
        }
      },
      {
        id: "xtralife-cerebrin",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Cerebrin",
        descriptor: "Brain Neuro-Nutrient / Neuro-Nutriente Cerebral",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "120 cápsulas",
          en: "120 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Neuro nutriente más completo para proporcionarle al cerebro los nutrientes de apoyo necesarios para el pleno desarrollo de sus funciones. Promueve la circulación del cerebro y mejora la memoria.",
          en: "The most complete neuro-nutrient to provide the brain with necessary support nutrients for full function development. Promotes brain circulation and improves memory."
        }
      },
      {
        id: "xtralife-glicinato-magnesio",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: {
          es: "Sistema Nervioso, Relajación y Memoria",
          en: "Nervous System, Relaxation & Memory"
        },
        name: "Glicinato de Magnesio",
        descriptor: "Magnesium Glycinate / Glicinato de Magnesio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "90 cápsulas",
          en: "90 capsules"
        },
        dosage: {
          es: "3 cápsulas diarias",
          en: "3 capsules daily"
        },
        description: {
          es: "Ayuda en la reducción del estrés y la ansiedad, mejora la calidad del sueño, la salud cardiovascular, cognitiva y digestiva reduce las migrañas y fatiga.",
          en: "Helps reduce stress and anxiety, improves sleep quality, cardiovascular, cognitive, and digestive health, reduces migraines and fatigue."
        }
      },
      {
        id: "xtralife-prostatin",
        brand: "xtralife",
        category: "specific",
        categoryLabel: {
          es: "Salud Específica y Control",
          en: "Specific Health & Control"
        },
        name: "Prostatin",
        descriptor: "Prostate Care Complex / Complejo de Cuidado Prostático",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Ayuda a mantener la salud prostática. Alivia de forma eficaz los síntomas del dolor e inflamación de la próstata. Fortalece el deseo sexual. Actúa como un diurético y antiséptico de las vías urinarias. Estimula la fertilidad.",
          en: "Helps maintain prostate health. Effectively relieves prostate pain and inflammation symptoms. Strengthens sexual desire. Acts as a diuretic and antiseptic for the urinary tract. Stimulates fertility."
        }
      },
      {
        id: "xtralife-citrato-potasio",
        brand: "xtralife",
        category: "specific",
        categoryLabel: {
          es: "Salud Específica y Control",
          en: "Specific Health & Control"
        },
        name: "Citrato de Potasio",
        descriptor: "Kidney & Metabolic Support / Soporte Renal y Metabólico",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "90 cápsulas",
          en: "90 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Favorece la eliminación de desechos metabólicos de las celulas. Contribuye al normal funcionamiento del sistema nervioso central. Actúa como diurético ya que favorece la eliminación del líquido, lo que contribuye a eliminar los cálculos renales, prevenir la formación de nuevos cálculos y reducir su crecimiento.",
          en: "Favors the elimination of metabolic waste from cells. Contributes to normal central nervous system function. Acts as a diuretic, favoring fluid elimination, which helps eliminate kidney stones, prevent new stone formation, and reduce their growth."
        }
      },
      {
        id: "xtralife-isoflavonas-soya",
        brand: "xtralife",
        category: "specific",
        categoryLabel: {
          es: "Salud Específica y Control",
          en: "Specific Health & Control"
        },
        name: "Isoflavonas de Soya",
        descriptor: "Menopause Balance / Equilibrio de Menopausia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "60 cápsulas",
          en: "60 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Las isoflavonas ayudan a cambiar los efectos de la menopausia (ayuda a controlar los sofocos y los sudores nocturnos asociados con la menopausia). Reducen el riesgo de osteoporosis (mantiene la densidad ósea durante y después de la menopausia) Evitan el incremento de peso.",
          en: "Isoflavones help change menopause effects (helps control hot flashes and night sweats). Reduce osteoporosis risk (maintains bone density during and after menopause). Prevent weight gain."
        }
      },
      {
        id: "xtralife-aceite-primula",
        brand: "xtralife",
        category: "specific",
        categoryLabel: {
          es: "Salud Específica y Control",
          en: "Specific Health & Control"
        },
        name: "Aceite de Prímula",
        descriptor: "Evening Primrose Oil / Aceite de Onagra",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas blandas",
          en: "100 softgels"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Previene enfermedades benignas de mama, tratamiento efectivo para nódulos poliquísticos. Equilibrio hormonal: (SPM) síndrome premenstrual, (SOP) síndrome de ovario poliquístico. Afectaciones de la piel: acné, psoriasis.",
          en: "Prevents benign breast diseases, effective treatment for polycystic nodules. Hormonal balance: (PMS) premenstrual syndrome, (PCOS) polycystic ovary syndrome. Skin conditions: acne, psoriasis."
        }
      },
      {
        id: "xtralife-colageno-plus",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: {
          es: "Nutricosmética (Piel y Cabello)",
          en: "Nutricosmetics (Skin & Hair)"
        },
        name: "Colágeno Plus + Vitamina C",
        descriptor: "Hydrolyzed Collagen complex / Complejo de Colágeno Hidrolizado",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "120 cápsulas",
          en: "120 capsules"
        },
        dosage: {
          es: "2 cápsulas diarias",
          en: "2 capsules daily"
        },
        description: {
          es: "Proporciona fuerza y flexibilidad a los huesos, las articulaciones, la piel, los tendones, los ligamentos, el cabello, las uñas, los vasos sanguíneos y los ojos, entre otros tejidos en todo el cuerpo. Tiene función antioxidante. Estimula el proceso de regeneración de ligamentos, músculo y tendones.",
          en: "Provides strength and flexibility to bones, joints, skin, tendons, ligaments, hair, nails, blood vessels, and eyes, among other tissues. Has antioxidant function. Stimulates ligament, muscle, and tendon regeneration."
        }
      },
      {
        id: "xtralife-vitamina-e",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: {
          es: "Nutricosmética (Piel y Cabello)",
          en: "Nutricosmetics (Skin & Hair)"
        },
        name: "Vitamina E",
        descriptor: "Antioxidant Defense / Defensa Antioxidante",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 cápsulas",
          en: "100 capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Funciona principalmente como antioxidante. Es vital para el funcionamiento de las defensas del cuerpo. Interviene en la destrucción de las células dañadas en el organismo, evitando la aparición de enfermedades como el cancer.",
          en: "Functions primarily as an antioxidant. It is vital for the body's defense mechanisms. Intervenes in the destruction of damaged cells, preventing the appearance of diseases like cancer."
        }
      },
      {
        id: "xtralife-biotina-10000",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: {
          es: "Nutricosmética (Piel y Cabello)",
          en: "Nutricosmetics (Skin & Hair)"
        },
        name: "Biotina 10,000 MCG",
        descriptor: "Maximum Strength Biotin / Biotina de Máxima Potencia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "100 tabletas",
          en: "100 tablets"
        },
        dosage: {
          es: "1 tableta diaria",
          en: "1 tablet daily"
        },
        description: {
          es: "Previene la caída del cabello y acelera su crecimiento. Brinda volumen y sedosidad. Favorece la hidratación de la piel, evitando las enfermedades del cuero cabelludo. Alivia los dolores musculares, y la dermatitis.",
          en: "Prevents hair loss and accelerates growth. Provides volume and silkiness. Favors skin hydration, preventing scalp diseases. Relieves muscle pain and dermatitis."
        }
      },
      {
        id: "xtralife-locion-aloe",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: {
          es: "Nutricosmética (Piel y Cabello)",
          en: "Nutricosmetics (Skin & Hair)"
        },
        name: "Loción Aloe Vera + Vitamina E",
        descriptor: "Applicable Aloe Skin Complex / Complejo de Aloe Aplicable",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: {
          es: "90 cápsulas aplicables",
          en: "90 applicable capsules"
        },
        dosage: {
          es: "1 cápsula diaria",
          en: "1 capsule daily"
        },
        description: {
          es: "Suaviza la piel. Prevenir arrugas, Evitar líneas en el rostro. Protege la piel del daño generado por los radicales libres. También combinado con la vitamina E combate la resequedad del cuero cabelludo. Fortalece el crecimiento del cabello, dándole además brillo.",
          en: "Softens skin. Prevents wrinkles and facial lines. Protects skin from free radical damage. Combined with Vitamin E, combats scalp dryness. Strengthens hair growth, providing shine."
        }
      }
    ]
  }
};
