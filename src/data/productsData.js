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
    products: [
      {
        id: "derm-whitening",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Whitening Dermclar",
        presentation: "5 viales x 5ml",
        description: "Tratamiento profesional formulado con nanotecnología y biotecnología. Combinación de principios activos que ayuda a reducir la pigmentación persistente y prevenir nuevas manchas.",
        activeIngredients: "Complejo biotecnológico despigmentante",
        applicationZones: ["Rostro", "Cuello", "Escote", "Manos"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Whitening+Dermclar",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Whitening+Dermclar"
        ],
        certBadge: "AGEMED Approved",
        composition: "Tratamiento profesional formulado con nanotecnología y biotecnología. Combinación de principios activos que ayuda a reducir la pigmentación persistente y prevenir nuevas manchas.",
        downloadUrl: "#"
      },
      {
        id: "derm-firm",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar Firm",
        presentation: "5 viales x 10ml",
        description: "Reafirmante tisular avanzado. Mejora visiblemente la tonicidad, elasticidad y calidad de las fibras de la piel. Ideal para tratamientos de flacidez severa.",
        activeIngredients: "Silicio Orgánico, DMAE, Centella Asiática",
        applicationZones: ["Abdomen", "Glúteos", "Brazos", "Piernas"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Firm",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Firm"
        ],
        certBadge: "AGEMED Approved",
        composition: "Reafirmante tisular avanzado. Mejora visiblemente la tonicidad, elasticidad y calidad de las fibras de la piel. Ideal para tratamientos de flacidez severa.",
        downloadUrl: "#"
      },
      {
        id: "derm-obes",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar Obes",
        presentation: "5 viales x 10ml",
        description: "Solución lipolítica potente diseñada para el tratamiento de adiposidades localizadas y moldeamiento corporal.",
        activeIngredients: "Fosfatidilcolina, L-Carnitina, Cafeína",
        applicationZones: ["Abdomen", "Cintura", "Flancos"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Obes",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Obes"
        ],
        certBadge: "AGEMED Approved",
        composition: "Solución lipolítica potente diseñada para el tratamiento de adiposidades localizadas y moldeamiento corporal.",
        downloadUrl: "#"
      },
      {
        id: "derm-celu",
        brand: "dermclar",
        category: "Cocktails Line",
        name: "Dermclar Celu",
        presentation: "5 viales x 10ml",
        description: "Solución diseñada para disminuir el tamaño de los nódulos grasos, mejorando visiblemente el aspecto de la piel de naranja.",
        activeIngredients: "Extractos reductores y drenantes",
        applicationZones: ["Glúteos", "Piernas", "Abdomen"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Celu",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar+Celu"
        ],
        certBadge: "AGEMED Approved",
        composition: "Solución diseñada para disminuir el tamaño de los nódulos grasos, mejorando visiblemente el aspecto de la piel de naranja.",
        downloadUrl: "#"
      },
      {
        id: "derm-lcarnitina",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. L-Carnitina",
        presentation: "10 ampollas x 5ml",
        description: "Lipolítico esencial. Facilita la oxidación de las grasas para la obtención de energía, disminuyendo el grosor del panículo adiposo.",
        activeIngredients: "L-Carnitina",
        applicationZones: ["Abdomen", "Piernas", "Glúteos"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=L-Carnitina",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=L-Carnitina"
        ],
        certBadge: "AGEMED Approved",
        composition: "Lipolítico esencial. Facilita la oxidación de las grasas para la obtención de energía, disminuyendo el grosor del panículo adiposo.",
        downloadUrl: "#"
      },
      {
        id: "derm-centella",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Centella Asiática",
        presentation: "10 ampollas x 5ml",
        description: "Reafirmante Tisular. Mejora el tono de la piel y la calidad de las fibras. Ideal para tratamientos de estrías, flacidez y celulitis.",
        activeIngredients: "Extracto de Centella Asiática",
        applicationZones: ["Piernas", "Glúteos", "Abdomen"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Centella+Asiatica",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Centella+Asiatica"
        ],
        certBadge: "AGEMED Approved",
        composition: "Reafirmante Tisular. Mejora el tono de la piel y la calidad de las fibras. Ideal para tratamientos de estrías, flacidez y celulitis.",
        downloadUrl: "#"
      },
      {
        id: "derm-silicio",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Silicio Orgánico",
        presentation: "10 ampollas x 5ml",
        description: "Optimizador estructural. Mejora la capacidad de biosíntesis de proteínas. Ideal en tratamientos de grasa corporal, reducción y revitalización.",
        activeIngredients: "Silicio Orgánico",
        applicationZones: ["Rostro", "Cuello", "Cuerpo"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Silicio+Organico",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Silicio+Organico"
        ],
        certBadge: "AGEMED Approved",
        composition: "Optimizador estructural. Mejora la capacidad de biosíntesis de proteínas. Ideal en tratamientos de grasa corporal, reducción y revitalización.",
        downloadUrl: "#"
      },
      {
        id: "derm-vitc",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Vitamina C 20%",
        presentation: "5 viales x 10ml",
        description: "Antioxidante. Mejora la calidad funcional de la vitalidad celular. Aumenta la luminosidad de la piel, ayudando a reducir la flacidez cutánea.",
        activeIngredients: "Ascorbato de Sodio",
        applicationZones: ["Rostro", "Cuello", "Escote", "Manos"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Vitamina+C+20%25",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Vitamina+C+20%25"
        ],
        certBadge: "AGEMED Approved",
        composition: "Antioxidante. Mejora la calidad funcional de la vitalidad celular. Aumenta la luminosidad de la piel, ayudando a reducir la flacidez cutánea.",
        downloadUrl: "#"
      },
      {
        id: "derm-fosfatidilcolina",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. Fosfatidilcolina",
        presentation: "20 ampollas x 5ml",
        description: "Lipolítico y adipocitolítico. Aumenta la permeabilidad de la membrana del adipocito facilitando la eliminación de los triglicéridos.",
        activeIngredients: "Fosfatidilcolina",
        applicationZones: ["Abdomen", "Flancos", "Papada"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Fosfatidilcolina",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Fosfatidilcolina"
        ],
        certBadge: "AGEMED Approved",
        composition: "Lipolítico y adipocitolítico. Aumenta la permeabilidad de la membrana del adipocito facilitando la eliminación de los triglicéridos.",
        downloadUrl: "#"
      },
      {
        id: "derm-cafeina",
        brand: "dermclar",
        category: "Professional Solutions Line",
        name: "Sol. Est. de Cafeína",
        presentation: "10 ampollas x 2ml",
        description: "Estimulante metabólico local. Favorece la movilización de grasas acumuladas y mejora la microcirculación.",
        activeIngredients: "Cafeína",
        applicationZones: ["Abdomen", "Piernas", "Glúteos"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Cafeina",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Cafeina"
        ],
        certBadge: "AGEMED Approved",
        composition: "Estimulante metabólico local. Favorece la movilización de grasas acumuladas y mejora la microcirculación.",
        downloadUrl: "#"
      },
      {
        id: "derm-nol",
        brand: "dermclar",
        category: "Línea Flebológica",
        name: "Dermclar-nol 3%",
        presentation: "10 ampollas x 2ml",
        description: "Solución especializada para mejorar la apariencia de la piel fatigada de las piernas. Ideal para telangiectasias y varículas pequeñas.",
        activeIngredients: "Polidocanol 3%",
        applicationZones: ["Piernas"],
        coverImage: "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar-nol",
        gallery: [
          "https://placehold.co/400x500/e2e8f0/1e293b?text=Dermclar-nol"
        ],
        certBadge: "AGEMED Approved",
        composition: "Solución especializada para mejorar la apariencia de la piel fatigada de las piernas. Ideal para telangiectasias y varículas pequeñas.",
        downloadUrl: "#"
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
      { id: "all", label: { es: "Todos", en: "All" } },
      { id: "cardiovascular", label: { es: "Bienestar Cardiovascular y General", en: "Cardiovascular & General Wellness" } },
      { id: "energy", label: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" } },
      { id: "immunity", label: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" } },
      { id: "bones", label: { es: "Salud Ósea y Articular", en: "Bone & Joint Health" } },
      { id: "nervous", label: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" } },
      { id: "specific", label: { es: "Salud Específica y Control", en: "Specific Health & Control" } },
      { id: "nutricosmetics", label: { es: "Nutricosmética (Piel y Cabello)", en: "Nutricosmetics (Skin & Hair)" } }
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
        categoryLabel: { es: "Bienestar Cardiovascular y General", en: "Cardiovascular & General Wellness" },
        name: "Omega 3",
        descriptor: "Essential Fatty Acids / Ácidos Grasos Esenciales",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100/200 cápsulas blandas", en: "100/200 softgels" },
        dosage: { es: "1 cápsula diaria", en: "1 softgel daily" },
        description: {
          es: "Reduce presión arterial y colesterol. Protector del sistema nervioso y mejora salud mental.",
          en: "Reduces blood pressure and cholesterol. Protects the nervous system and improves mental health."
        }
      },
      {
        id: "xtralife-omega-3-6-9",
        brand: "xtralife",
        category: "cardiovascular",
        categoryLabel: { es: "Bienestar Cardiovascular y General", en: "Cardiovascular & General Wellness" },
        name: "Omega 3-6-9",
        descriptor: "Balanced Omegas / Omegas Balanceados",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "90 cápsulas blandas", en: "90 softgels" },
        dosage: { es: "1 cápsula diaria", en: "1 softgel daily" },
        description: {
          es: "Disminuye colesterol/triglicéridos, reduce inflamación celular y fortalece huesos.",
          en: "Lowers cholesterol/triglycerides, reduces cellular inflammation, and strengthens bones."
        }
      },
      {
        id: "xtralife-perlas-ajo",
        brand: "xtralife",
        category: "cardiovascular",
        categoryLabel: { es: "Bienestar Cardiovascular y General", en: "Cardiovascular & General Wellness" },
        name: "Perlas de Ajo",
        descriptor: "Garlic Oil Extract / Extracto de Aceite de Ajo",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas blandas", en: "100 softgels" },
        dosage: { es: "1 cápsula diaria", en: "1 softgel daily" },
        description: {
          es: "Antibiótico natural, reduce presión arterial y colesterol, mejora circulación.",
          en: "Natural antibiotic, reduces blood pressure and cholesterol, and improves circulation."
        }
      },
      {
        id: "xtralife-hgh-releasing",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "HGH Releasing",
        descriptor: "Growth Hormone Support / Soporte de Hormona de Crecimiento",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "120 cápsulas", en: "120 capsules" },
        dosage: { es: "1 a 2 cápsulas antes de dormir", en: "1 to 2 capsules before sleeping" },
        description: {
          es: "Estimulante natural de hormona de crecimiento, favorece masa muscular y reduce fatiga.",
          en: "Natural growth hormone stimulator, promotes muscle mass and reduces fatigue."
        }
      },
      {
        id: "xtralife-xtra-vigor-male",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "Xtra Vigor Male",
        descriptor: "Male Performance Complex / Complejo de Rendimiento Masculino",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 comprimidos", en: "100 tablets" },
        dosage: { es: "2 comprimidos diarios", en: "2 tablets daily" },
        description: {
          es: "Mejora rendimiento masculino, reduce cansancio/estrés. Con Jalea Real y Polen.",
          en: "Improves male performance, reduces fatigue/stress. With Royal Jelly and Pollen."
        }
      },
      {
        id: "xtralife-xtra-vigor-female",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "Xtra Vigor Female",
        descriptor: "Female Performance Complex / Complejo de Rendimiento Femenino",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 comprimidos", en: "100 tablets" },
        dosage: { es: "2 comprimidos diarios", en: "2 tablets daily" },
        description: {
          es: "Mejora rendimiento femenino, reduce cansancio, ayuda a piel/uñas/cabello.",
          en: "Improves female performance, reduces fatigue, benefits skin/nails/hair."
        }
      },
      {
        id: "xtralife-shilajit",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "Shilajit",
        descriptor: "Himalayan Shilajit Extract / Extracto de Shilajit del Himalaya",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Aumenta energía celular, mejora función cerebral y combate envejecimiento.",
          en: "Increases cellular energy, improves brain function, and combats aging."
        }
      },
      {
        id: "xtralife-nad-red-wine",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "NAD + Red Wine",
        descriptor: "Cellular Anti-Aging / Antienvejecimiento Celular",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Retrasa el envejecimiento, aumenta energía celular y protege contra daño oxidativo.",
          en: "Delays aging, increases cellular energy, and protects against oxidative damage."
        }
      },
      {
        id: "xtralife-l-arginina",
        brand: "xtralife",
        category: "energy",
        categoryLabel: { es: "Energía, Vitalidad y Rendimiento", en: "Energy, Vitality & Performance" },
        name: "L-Arginina",
        descriptor: "Amino Acid Flow Support / Aminoácido de Soporte Circulatorio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "1 a 2 cápsulas diarias", en: "1 to 2 capsules daily" },
        description: {
          es: "Estimula hormona de crecimiento, ayuda en masa muscular y flujo sanguíneo.",
          en: "Stimulates growth hormone, aids in muscle mass and blood flow."
        }
      },
      {
        id: "xtralife-vitamina-c-1000",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Vitamina C 1000 mg",
        descriptor: "Immune Shield / Escudo Inmunológico",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Incrementa absorción de hierro, disminuye síntomas alérgicos/resfríos.",
          en: "Increases iron absorption, decreases allergic/cold symptoms."
        }
      },
      {
        id: "xtralife-vitamina-d3",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Vitamina D3",
        descriptor: "Bone & Immune Support / Soporte Óseo e Inmune",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas blandas", en: "100 softgels" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Contribuye al crecimiento óseo, posee propiedades inmunitarias y evita envejecimiento.",
          en: "Contributes to bone growth, possesses immune properties, and prevents aging."
        }
      },
      {
        id: "xtralife-vitamina-a",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Vitamina A",
        descriptor: "Retinol Vision Support / Soporte de Visión Retinol",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas blandas", en: "100 softgels" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Imprescindible para función de la retina, visión nocturna y movilización de hierro.",
          en: "Essential for retinal function, night vision, and iron mobilization."
        }
      },
      {
        id: "xtralife-zinc-50",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Zinc 50 mg",
        descriptor: "Mineral Defense & Skin / Defensa Mineral y Cutánea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Equilibra sistema inmune, regula grasa en la piel (acné) y acelera cicatrización.",
          en: "Balances the immune system, regulates skin sebum (acne), and accelerates healing."
        }
      },
      {
        id: "xtralife-echinacea",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Echinacea",
        descriptor: "Natural Immune Booster / Refuerzo Inmune Natural",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "3 cápsulas diarias", en: "3 capsules daily" },
        description: {
          es: "Apoyo natural al sistema inmunológico, ayuda en infecciones respiratorias.",
          en: "Natural support for the immune system, helps with respiratory infections."
        }
      },
      {
        id: "xtralife-balanced-b",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Balanced B",
        descriptor: "Vitamin B Complex / Complejo de Vitaminas B",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 comprimidos", en: "100 tablets" },
        dosage: { es: "1 comprimido al día", en: "1 tablet daily" },
        description: {
          es: "Complejo de vitaminas B para glóbulos rojos, sistema digestivo y nervioso.",
          en: "B-vitamin complex for red blood cells, digestive system, and nervous system."
        }
      },
      {
        id: "xtralife-colostrum-3-factor",
        brand: "xtralife",
        category: "immunity",
        categoryLabel: { es: "Inmunidad, Vitaminas y Minerales", en: "Immunity, Vitamins & Minerals" },
        name: "Colostrum 3 Factor",
        descriptor: "Bioactive Immunoglobulins / Inmunoglobulinas Bioactivas",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Favorece regeneración de células/tejidos y fortalece sistema inmunológico.",
          en: "Promotes cell/tissue regeneration and strengthens the immune system."
        }
      },
      {
        id: "xtralife-k2-d3-calcio",
        brand: "xtralife",
        category: "bones",
        categoryLabel: { es: "Salud Ósea y Articular", en: "Bone & Joint Health" },
        name: "K2 + D3 + Calcio",
        descriptor: "Bone Mineralization / Mineralización Ósea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Vitamina K2 asegura que el calcio llegue a huesos, apoyando salud cardiovascular.",
          en: "Vitamin K2 ensures calcium reaches bones, supporting cardiovascular health."
        }
      },
      {
        id: "xtralife-cal-mag-zinc",
        brand: "xtralife",
        category: "bones",
        categoryLabel: { es: "Salud Ósea y Articular", en: "Bone & Joint Health" },
        name: "Cal-Mag-Zinc + Vitamina D",
        descriptor: "Bone Density Complex / Complejo de Densidad Ósea",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 tabletas", en: "100 tablets" },
        dosage: { es: "1 a 2 tabletas diarias", en: "1 to 2 tablets daily" },
        description: {
          es: "Combinación para máxima absorción de calcio, previene osteoporosis y mejora inmunidad.",
          en: "Combination for maximum calcium absorption, prevents osteoporosis, and improves immunity."
        }
      },
      {
        id: "xtralife-cartilago-tiburon",
        brand: "xtralife",
        category: "bones",
        categoryLabel: { es: "Salud Ósea y Articular", en: "Bone & Joint Health" },
        name: "Cartílago de Tiburón",
        descriptor: "Shark Cartilage / Cartílago de Tiburón",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Proteínas, calcio y fósforo para proteger articulaciones, tendones y ligamentos.",
          en: "Proteins, calcium, and phosphorus to protect joints, tendons, and ligaments."
        }
      },
      {
        id: "xtralife-5-htp-melatonina",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "5-HTP + Melatonina",
        descriptor: "Sleep & Mood Regulator / Regulador de Ánimo y Sueño",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "30 cápsulas", en: "30 capsules" },
        dosage: { es: "1 cápsula diaria antes de acostarse", en: "1 capsule daily before bedtime" },
        description: {
          es: "Aumenta serotonina, mejora síntomas de ansiedad/estrés y calidad del sueño.",
          en: "Increases serotonin, improves anxiety/stress symptoms, and sleep quality."
        }
      },
      {
        id: "xtralife-melatonina-10",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Melatonina 10 MG",
        descriptor: "High Potency Antioxidant Sleep / Sueño Antioxidante de Alta Potencia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "1 cápsula diaria de noche", en: "1 capsule daily at night" },
        description: {
          es: "Mejora la calidad del sueño y tiene efecto antioxidante.",
          en: "Improves sleep quality and has an antioxidant effect."
        }
      },
      {
        id: "xtralife-citrato-magnesio",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Citrato de Magnesio",
        descriptor: "Magnesium Citrate / Citrato de Magnesio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Reduce estrés, evita contracturas musculares/calambres y regula glucosa.",
          en: "Reduces stress, prevents muscle cramps/spasms, and regulates glucose."
        }
      },
      {
        id: "xtralife-resveratrol",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Resveratrol",
        descriptor: "Natural Antioxidant / Antioxidante Natural",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Antioxidante y antiinflamatorio, previene envejecimiento y protege el corazón.",
          en: "Antioxidant and anti-inflammatory, prevents aging, and protects the heart."
        }
      },
      {
        id: "xtralife-ginkgo-biloba",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Ginkgo Biloba",
        descriptor: "Mental Focus & Circulation / Concentración Mental y Circulación",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "120 cápsulas", en: "120 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Mejora circulación cerebral, ayuda con problemas de memoria, concentración y ansiedad.",
          en: "Improves brain circulation, helps with memory, concentration, and anxiety issues."
        }
      },
      {
        id: "xtralife-cerebrin",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Cerebrin",
        descriptor: "Brain Neuro-Nutrient / Neuro-Nutriente Cerebral",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "120 cápsulas", en: "120 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Neuro-nutriente completo para promover circulación cerebral y mejorar memoria.",
          en: "Complete neuro-nutrient to promote brain circulation and improve memory."
        }
      },
      {
        id: "xtralife-glicinato-magnesio",
        brand: "xtralife",
        category: "nervous",
        categoryLabel: { es: "Sistema Nervioso, Relajación y Memoria", en: "Nervous System, Relaxation & Memory" },
        name: "Glicinato de Magnesio",
        descriptor: "Magnesium Glycinate / Glicinato de Magnesio",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "90 cápsulas", en: "90 capsules" },
        dosage: { es: "3 cápsulas diarias", en: "3 capsules daily" },
        description: {
          es: "Reduce ansiedad, mejora el sueño, migrañas y fatiga.",
          en: "Reduces anxiety, improves sleep, migraines, and fatigue."
        }
      },
      {
        id: "xtralife-prostatin",
        brand: "xtralife",
        category: "specific",
        categoryLabel: { es: "Salud Específica y Control", en: "Specific Health & Control" },
        name: "Prostatin",
        descriptor: "Prostate Care Complex / Complejo de Cuidado Prostático",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Ayuda a mantener salud prostática, alivia inflamación y actúa como diurético.",
          en: "Helps maintain prostate health, relieves inflammation, and acts as a diuretic."
        }
      },
      {
        id: "xtralife-citrato-potasio",
        brand: "xtralife",
        category: "specific",
        categoryLabel: { es: "Salud Específica y Control", en: "Specific Health & Control" },
        name: "Citrato de Potasio",
        descriptor: "Kidney & Metabolic Support / Soporte Renal y Metabólico",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "90 cápsulas", en: "90 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Diurético, favorece eliminación de cálculos renales y desechos metabólicos.",
          en: "Diuretic, promotes elimination of kidney stones and metabolic waste."
        }
      },
      {
        id: "xtralife-isoflavonas-soya",
        brand: "xtralife",
        category: "specific",
        categoryLabel: { es: "Salud Específica y Control", en: "Specific Health & Control" },
        name: "Isoflavonas de Soya",
        descriptor: "Menopause Balance / Equilibrio de Menopausia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "60 cápsulas", en: "60 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Ayudan a controlar efectos de la menopausia y reducen riesgo de osteoporosis.",
          en: "Help manage menopause effects and reduce the risk of osteoporosis."
        }
      },
      {
        id: "xtralife-aceite-primula",
        brand: "xtralife",
        category: "specific",
        categoryLabel: { es: "Salud Específica y Control", en: "Specific Health & Control" },
        name: "Aceite de Prímula",
        descriptor: "Evening Primrose Oil / Aceite de Onagra",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas blandas", en: "100 softgels" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Equilibrio hormonal (SPM, SOP) y afectaciones de la piel (acné, psoriasis).",
          en: "Hormonal balance (PMS, PCOS) and skin conditions (acne, psoriasis)."
        }
      },
      {
        id: "xtralife-colageno-plus",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: { es: "Nutricosmética (Piel y Cabello)", en: "Nutricosmetics (Skin & Hair)" },
        name: "Colágeno Plus + Vitamina C",
        descriptor: "Hydrolyzed Collagen complex / Complejo de Colágeno Hidrolizado",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "120 cápsulas", en: "120 capsules" },
        dosage: { es: "2 cápsulas diarias", en: "2 capsules daily" },
        description: {
          es: "Da fuerza y flexibilidad a huesos, piel, articulaciones, cabello y uñas.",
          en: "Provides strength and flexibility to bones, skin, joints, hair, and nails."
        }
      },
      {
        id: "xtralife-vitamina-e",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: { es: "Nutricosmética (Piel y Cabello)", en: "Nutricosmetics (Skin & Hair)" },
        name: "Vitamina E",
        descriptor: "Antioxidant Defense / Defensa Antioxidante",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 cápsulas", en: "100 capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Principalmente antioxidante vital para defensas y destrucción de células dañadas.",
          en: "Mainly vital antioxidant for defenses and destruction of damaged cells."
        }
      },
      {
        id: "xtralife-biotina-10000",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: { es: "Nutricosmética (Piel y Cabello)", en: "Nutricosmetics (Skin & Hair)" },
        name: "Biotina 10,000 MCG",
        descriptor: "Maximum Strength Biotin / Biotina de Máxima Potencia",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "100 tabletas", en: "100 tablets" },
        dosage: { es: "1 tableta diaria", en: "1 tablet daily" },
        description: {
          es: "Previene caída de cabello, da volumen y alivia dolores musculares/dermatitis.",
          en: "Prevents hair loss, provides volume, and relieves muscle pain/dermatitis."
        }
      },
      {
        id: "xtralife-locion-aloe",
        brand: "xtralife",
        category: "nutricosmetics",
        categoryLabel: { es: "Nutricosmética (Piel y Cabello)", en: "Nutricosmetics (Skin & Hair)" },
        name: "Loción Aloe Vera + Vitamina E",
        descriptor: "Applicable Aloe Skin Complex / Complejo de Aloe Aplicable",
        certBadge: "MADE IN USA • CERTIFICACIÓN GMP",
        presentation: { es: "90 cápsulas aplicables", en: "90 applicable capsules" },
        dosage: { es: "1 cápsula diaria", en: "1 capsule daily" },
        description: {
          es: "Suaviza la piel, previene arrugas y fortalece crecimiento del cabello.",
          en: "Softens skin, prevents wrinkles, and strengthens hair growth."
        }
      }
    ]
  }
};
