# 🔍 Auditoría SEO Completa y Plan de Implementación — Maines S.R.L.

**Objetivo**: Posicionar la web de Maines S.R.L. en los primeros resultados de Google para búsquedas relacionadas con medicina estética, distribuidores médicos y las marcas que representan en Bolivia.

---

## 📊 Resumen Ejecutivo del Estado Actual

| Categoría | Puntuación | Estado | Severidad |
|---|---|---|---|
| Meta Tags (OG/Twitter/Canonical) | **1/10** 🔴 | ❌ No existen | 🔴 CRÍTICO |
| Datos Estructurados (JSON-LD) | **0/10** 🔴 | ❌ No existen | 🔴 CRÍTICO |
| Rastreabilidad (robots/sitemap/SSR) | **1/10** 🔴 | ❌ No existe robots.txt ni sitemap | 🔴 CRÍTICO |
| SEO Internacional (hreflang/lang) | **1/10** 🔴 | ❌ lang hardcoded, sin hreflang | 🔴 CRÍTICO |
| Renderizado (SPA vs SSR) | **1/10** 🔴 | ❌ Solo Client-Side Rendering | 🔴 CRÍTICO |
| Social Sharing | **1/10** 🔴 | ❌ Sin Open Graph; links genéricos | 🔴 CRÍTICO |
| Optimización de Imágenes | **3/10** 🔴 | ⚠️ Sin width/height, PNGs pesados | 🟠 ALTO |
| Core Web Vitals | **4/10** 🔴 | ⚠️ CLS alto, videos preload=auto | 🟠 ALTO |
| Accesibilidad (WCAG) | **4/10** 🔴 | ⚠️ Sin labels, sin focus trap, sin ARIA | 🟠 ALTO |
| HTML Semántico | **6/10** 🟡 | ⚠️ Tiene `<main>` pero jerarquía rota | 🟡 MEDIO |
| Estructura de Contenido | **6/10** 🟡 | ⚠️ URLs limpias pero contenido duplicado | 🟡 MEDIO |
| Enlazado Interno | **7/10** 🟢 | ✅ Buena estructura de links | 🟢 BUENO |

---

## 🔴 Problemas CRÍTICOS Encontrados (7)

### 1. SPA Client-Side Rendering (CSR) — EL PROBLEMA #1

> [!CAUTION]
> **Este es el problema más grave de todo el proyecto para SEO.** Google y otros buscadores reciben un `<div id="root"></div>` vacío al rastrear tu sitio. Todo el contenido se genera con JavaScript en el navegador, lo que significa que **los buscadores ven una página en blanco**.

La build de producción (`dist/index.html`) contiene:
```html
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index-CU9P-IPx.js"></script>
</body>
```

**Impacto**: Google puede indexar SPAs con JS rendering, pero es un proceso secundario con menor prioridad. Además, crawlers sociales (WhatsApp, Facebook, Telegram) **NO ejecutan JavaScript** — nunca verán tu contenido. Las 40+ páginas de productos con contenido médico rico son completamente invisibles.

### 2. Sin robots.txt — Google no tiene directivas de rastreo

Sin este archivo, los buscadores no saben qué rastrear ni dónde está el sitemap.

### 3. Sin sitemap.xml — Google no descubre tus URLs

Con rutas dinámicas como `/:brandId/catalogo/:productSlug`, Google no puede descubrir las 60+ URLs de productos de Jetema, Dermclar y Xtralife.

### 4. Sin Open Graph ni Twitter Cards — Invisible al compartir

Cuando alguien comparte tu web en WhatsApp, Facebook o LinkedIn, aparece un preview genérico sin imagen, título ni descripción. Para un distribuidor B2B médico, los links compartidos a catálogos de productos son un canal de conversión clave.

### 5. Sin Datos Estructurados (JSON-LD Schema)

No existe markup Schema.org. **Oportunidad masiva perdida** dado que ya tienes datos detallados de productos con especificaciones, certificaciones y datos clínicos. Schemas faltantes:
- `Organization` / `MedicalBusiness` — para Maines S.R.L.
- `Product` — para cada producto (TOXTA, e.p.t.q., etc.)
- `BreadcrumbList` — para navegación jerárquica
- `LocalBusiness` — Santa Cruz, Bolivia

### 6. Sin URL Canónica — Contenido duplicado

Múltiples rutas cargan el mismo contenido:
- `/`, `/ecosistema`, `/nosotros`, `/contacto` → todas cargan `<Home />`
- `/jetema`, `/jetema/catalogo`, `/jetema/empresa`, `/jetema/contacto` → misma vista con scroll
- Google penaliza por contenido duplicado.

### 7. Sin Hreflang — SEO internacional roto

La web soporta ES/EN via `LanguageContext`, pero:
- `<html lang="es">` está **hardcoded** — nunca cambia al toggle a English
- No existen tags `hreflang` — Google no sabe que hay versión en inglés
- Los screen readers anuncian contenido inglés como español

---

## 🟠 Problemas de ALTA Severidad (8)

### 8. Imágenes sin width/height → CLS alto
**NINGUNA** imagen `<img>` tiene atributos `width` y `height` explícitos. Esto causa Cumulative Layout Shift (CLS) — Core Web Vital que afecta ranking directamente.

### 9. Logos PNG enormes (4.5MB total)
| Archivo | Tamaño | Tamaño recomendado (WebP) |
|---|---|---|
| `xtralife-logo.png` | **2.6 MB** | ~80 KB |
| `dermclar-logo.png` | **1.03 MB** | ~60 KB |
| `JETEMA-logo.png` | **909 KB** | ~50 KB |

### 10. Sin lazy loading de imágenes
Solo 1 imagen usa `loading="lazy"` (Footer logo). Las demás se cargan todas simultáneamente.

### 11. Videos con `preload="auto"` — Performance killer
Múltiples componentes usan `preload="auto"` que descarga TODO el video de inmediato:
- [BrandAbout/index.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandAbout/index.jsx)
- [ProductDetail.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/ProductCatalog/ProductDetail.jsx)
- [VideoCarousel.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandAbout/VideoCarousel.jsx) — duplica el array, hasta 20 videos auto-downloading

### 12. `usePageMeta.js` incompleto
Solo actualiza `title` y `description`. No actualiza: OG tags, Twitter Card, canonical, hreflang, `<html lang>`.

### 13. Imágenes con alt vacío
`alt=""` encontrados en:
- [BrandHero.jsx:97](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandHero.jsx#L97) — hero background
- [ProductDetail.jsx:441, 575](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/ProductCatalog/ProductDetail.jsx#L441) — iconos de zonas

### 14. Formularios sin `htmlFor`/`id` — Accesibilidad rota
Los `<label>` no están asociados programáticamente con `<input>` en:
- [BrandCTA.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandCTA.jsx)
- [ContactForm.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Home/components/CTAContact/ContactForm.jsx)

### 15. Formularios simulan envío (no funcional)
El formulario de [BrandCTA.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandCTA.jsx) usa `setTimeout` para simular envío — ningún lead real se captura.

---

## 🟡 Problemas de MEDIA Severidad (7)

### 16. Google Fonts bloqueante
Carga síncrona en `<head>` que bloquea el renderizado inicial.

### 17. Jerarquía de headings rota
- [BrandPortal.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Home/components/BrandPortal.jsx) — Sin `<h2>`, salta de `<h1>` (Hero) a `<h3>` (BrandCard)
- [ProductDetail.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/ProductCatalog/ProductDetail.jsx) — Producto individual usa `<h3>` en vez de `<h1>`
- [BrandFooter.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandFooter.jsx) — Usa `<h3>` and `<h5>` saltando `<h4>`

### 18. Sin breadcrumbs
No hay navegación tipo `Home > Jetema > Catálogo > TOXTA 100U` — pierde SEO estructural y UX.

### 19. Página 404 redirige silenciosamente
`<Route path="*" element={<Navigate to="/" replace />}` — devuelve HTTP 200 en vez de 404.

### 20. Links sociales genéricos
```jsx
href="https://instagram.com"  // ← debería ser el perfil REAL
href="https://linkedin.com"   // ← debería ser el perfil REAL
```
Ambos en [Footer.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/components/layout/Footer.jsx) y [BrandFooter.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Brand/components/BrandFooter.jsx).

### 21. Sin Google Analytics/GA4
No hay tracking — imposible medir tráfico orgánico.

### 22. Texto hardcodeado sin traducir
"Portal de Marcas" en [BrandPortal.jsx:211](file:///f:/Project/Maines%20SRL/maines-new-page/src/pages/Home/components/BrandPortal.jsx#L211) — no usa `t()`.

---

## 🟢 Problemas de BAJA Severidad (4)

### 23. Videos sin subtítulos/transcripts
30+ videos `.webm` no tienen `<track>`, captions ni markup `VideoObject`.

### 24. Modales sin ARIA
Los modales carecen de `role="dialog"`, `aria-modal="true"`, focus trapping.

### 25. Shuffle aleatorio de marcas
El `BrandPortal` baraja el orden en cada carga — Google puede ver contenido diferente en cada crawl.

### 26. Bundle xtralife.js de 197KB
El archivo de datos de Xtralife es masivo — considerar paginación o carga bajo demanda.

---

## ✅ Aspectos Positivos Encontrados

| Lo que ya está bien | Detalle |
|---|---|
| ✅ `lang="es"` en HTML | Correcto para mercado principal |
| ✅ Título descriptivo | "Maines S.R.L. \| Innovación Médica Global..." |
| ✅ Meta description relevante | Keywords principales incluidos |
| ✅ Preconnect a Google Fonts | Reduce latencia |
| ✅ Hook `usePageMeta` | Base para meta tags dinámicos |
| ✅ Lazy loading de páginas | `React.lazy()` para Home y BrandPage |
| ✅ Formato WebP en hero bg | `hero-backgront1.webp` (55KB) eficiente |
| ✅ Uso de `<main>` semántico | En Home y BrandPage |
| ✅ Favicon SVG | Ligero y escalable |
| ✅ URL structure limpia | `/jetema/catalogo/producto-slug` excelente |
| ✅ Code splitting por ruta | Mejora carga inicial |
| ✅ Uso de `<header>`, `<nav>`, `<footer>` | Estructura semántica base correcta |
| ✅ `aria-label` en scroll indicator | Buena práctica de accesibilidad |
| ✅ Datos de productos bien estructurados | Specs, certificaciones, zonas — perfecto para Schema.org |

---

## 📋 Plan de Implementación (7 Fases)

### Fase 1 — Fundamentos SEO Críticos ⚡ IMPACTO MÁXIMO

> [!IMPORTANT]
> Estas acciones tienen el mayor impacto inmediato en posicionamiento.

#### [NEW] `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://DOMINIO/sitemap.xml
```

#### [NEW] `public/sitemap.xml`
Sitemap estático con TODAS las URLs del sitio:
- `/` — Home
- `/ecosistema`, `/nosotros`, `/contacto`
- `/jetema`, `/jetema/catalogo`, `/jetema/empresa`, `/jetema/contacto`
- `/dermclar`, `/dermclar/catalogo`, `/dermclar/empresa`, `/dermclar/contacto`
- `/xtralife`, `/xtralife/catalogo`, `/xtralife/empresa`, `/xtralife/contacto`
- URLs individuales de cada producto con slug

#### [MODIFY] [index.html](file:///f:/Project/Maines%20SRL/maines-new-page/index.html)
Agregar al `<head>`:
1. **Open Graph meta tags** completos (og:title, og:description, og:image, og:url, og:type, og:locale, og:locale:alternate)
2. **Twitter Card meta tags** (twitter:card, twitter:title, twitter:description, twitter:image)
3. **Canonical URL** → `<link rel="canonical">`
4. **Hreflang tags** para ES y EN
5. **JSON-LD Organization** estático para la empresa
6. **Preload** de fuente principal y hero image
7. **Google Fonts no-bloqueantes** con `<link rel="preload" as="style">`
8. **Meta theme-color** para mobile browsers
9. **`<noscript>` fallback** con contenido textual para crawlers sin JS
10. **Google Site Verification** tag (placeholder)

#### [MODIFY] [usePageMeta.js](file:///f:/Project/Maines%20SRL/maines-new-page/src/hooks/usePageMeta.js)
Reescribir el hook para gestionar dinámicamente:
- `document.title`
- `meta[name="description"]`
- `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`
- `twitter:title`, `twitter:description`
- `<link rel="canonical">` basado en `window.location.pathname`
- `document.documentElement.lang` según idioma activo
- Crear meta tags si no existen (actualmente solo hace `setAttribute`)

#### [MODIFY] [LanguageContext.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/context/LanguageContext.jsx)
Agregar sincronización del atributo `<html lang>`:
```js
useEffect(() => {
  document.documentElement.lang = language;
}, [language]);
```

---

### Fase 2 — Datos Estructurados JSON-LD (Rich Snippets)

#### [NEW] `src/components/seo/StructuredData.jsx`
Componente que inyecta JSON-LD con:
1. **`MedicalBusiness`** — para Maines S.R.L. (nombre, dirección Santa Cruz, teléfono, email, logo)
2. **`Product`** — en páginas de catálogo individual (nombre, descripción, imagen, marca, certificación)
3. **`BreadcrumbList`** — para la jerarquía: Home > Marca > Catálogo > Producto
4. **`WebSite`** — con SearchAction para búsqueda interna potencial

#### [NEW] `src/components/seo/BreadcrumbNav.jsx`
Componente visual + JSON-LD de breadcrumbs:
- `Home > Jetema > Catálogo > TOXTA 100U`
- Mejora navegación, SEO estructural y UX

---

### Fase 3 — Core Web Vitals (Performance)

#### Optimización de Imágenes

##### [MODIFY] Logos PNG → WebP en `/public/assets/`
- Convertir los 3 logos de PNG a **WebP** con compresión
- Reducción total estimada: **4.5MB → ~190KB** (96% menos)

##### [MODIFY] Todas las `<img>` del proyecto
- Agregar `width` y `height` explícitos a CADA imagen
- Agregar `loading="lazy"` a imágenes below-the-fold
- Agregar `fetchpriority="high"` a la imagen hero (LCP element)
- Considerar `<picture>` con srcset para responsive images

##### [MODIFY] Videos
- Cambiar `preload="auto"` → `preload="none"` o `preload="metadata"`
- Solo reproducir video visible usando IntersectionObserver
- NO duplicar arrays de videos para carruseles infinitos

#### [MODIFY] Google Fonts no-bloqueantes
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?..." 
  onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="..."></noscript>
```

---

### Fase 4 — HTML Semántico y Accesibilidad (WCAG)

#### Jerarquía de Headings
- **BrandPortal.jsx**: Agregar `<h2>` (actualmente salta de h1 a h3)
- **ProductDetail.jsx**: Promover nombre de producto a `<h1>` o `<h2>` cuando está seleccionado
- **BrandFooter.jsx**: Corregir salto h3→h5

#### Accesibilidad de Formularios
- Agregar `id` a todos los `<input>` y `htmlFor` a todos los `<label>`
- Agregar `role="dialog"`, `aria-modal="true"`, `aria-labelledby` a modales
- Implementar focus trapping en modales

#### Navegación
- Agregar `aria-label="Navegación principal"` a `<nav>`
- Agregar `aria-expanded` al hamburger button
- Agregar `aria-current="page"` al link activo
- Agregar skip link ("Saltar al contenido")

#### Decorativos
- Agregar `aria-hidden="true"` a SVGs decorativos, mesh circles, grid overlays
- Agregar `@media (prefers-reduced-motion: reduce)` para respetar preferencias de movimiento

---

### Fase 5 — Contenido Duplicado y URLs

#### [MODIFY] [App.jsx](file:///f:/Project/Maines%20SRL/maines-new-page/src/App.jsx)
**Opción Recomendada**: Mantener `/` como canónica y agregar canonical dinámico apuntando a `/` desde `/ecosistema`, `/nosotros`, `/contacto`.

#### [NEW] `src/pages/NotFound.jsx`
Página 404 personalizada con contenido útil y links de navegación. Configurar en `vercel.json` para devolver HTTP 404 real.

#### [MODIFY] [vercel.json](file:///f:/Project/Maines%20SRL/maines-new-page/vercel.json)
Agregar headers para páginas 404 y cache control.

---

### Fase 6 — SEO Local y Social

#### [MODIFY] Footer.jsx y BrandFooter.jsx
- Cambiar `https://instagram.com` → URL real del perfil de Maines
- Cambiar `https://linkedin.com` → URL real del perfil de Maines
- Envolver datos de contacto en `<address>`
- Convertir teléfono en link clickeable: `<a href="tel:+59133400835">`

#### [NEW] `public/manifest.json`
Web App Manifest para señales PWA:
```json
{
  "name": "Maines S.R.L.",
  "short_name": "Maines",
  "theme_color": "#1a365d",
  "background_color": "#f8fafc",
  "display": "standalone",
  "start_url": "/"
}
```

---

### Fase 7 — Tracking y Monitoreo

#### [MODIFY] [index.html](file:///f:/Project/Maines%20SRL/maines-new-page/index.html)
- Script de **Google Analytics 4** (GA4)
- Meta tag de **Google Search Console** verificación
- Opcionalmente: **Google Tag Manager** para gestión centralizada

---

## Preguntas Abiertas

> [!IMPORTANT]
> **¿Cuál es el dominio/URL real del sitio web?** Necesito saberlo para configurar correctamente las URLs canónicas, sitemap, OG tags, JSON-LD y hreflang.
>
> ¿Es `mainessrl.com`, `maines.com.bo`, u otro? ¿Ya está desplegado en Vercel?

> [!IMPORTANT]
> **¿Tienen perfiles reales de redes sociales?** Necesito las URLs de:
> - Instagram de Maines S.R.L.
> - LinkedIn de Maines S.R.L.
> - Facebook (si tienen)
> - WhatsApp Business

> [!IMPORTANT]
> **¿Tienen Google Analytics (GA4)?** Si ya tienen, necesito el measurement ID (`G-XXXXXXXXXX`). Si no, ¿desean que prepare el código placeholder?

---

## Verificación

### Automática
- Ejecutar **Lighthouse** audit (SEO, Performance, Accessibility, Best Practices)
- Validar Schema.org con [Google Rich Results Test](https://search.google.com/test/rich-results)
- Verificar `robots.txt` con Google Search Console
- Validar Open Graph con [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### Manual
- Compartir URL en WhatsApp/Facebook/LinkedIn → verificar preview
- Buscar "maines srl bolivia" en Google → verificar posición
- Navegar sitemap.xml en el browser → verificar URLs
- Inspeccionar con DevTools → verificar CLS score

---

## Impacto Estimado

| Fase | Impacto SEO | Esfuerzo | Prioridad |
|---|---|---|---|
| Fase 1: Fundamentos SEO | ⬛⬛⬛⬛⬛ | Medio | **MÁXIMA** |
| Fase 2: Datos Estructurados | ⬛⬛⬛⬛ | Medio | **ALTA** |
| Fase 3: Core Web Vitals | ⬛⬛⬛ | Medio | **ALTA** |
| Fase 4: Semántica/Accesibilidad | ⬛⬛⬛ | Bajo | **MEDIA** |
| Fase 5: URLs/Duplicado | ⬛⬛⬛ | Bajo | **MEDIA** |
| Fase 6: SEO Local/Social | ⬛⬛ | Bajo | **MEDIA** |
| Fase 7: Tracking | ⬛ | Bajo | **BAJA** |

> [!WARNING]
> **Nota sobre SSR/Pre-rendering**: El cambio más impactante a largo plazo sería migrar de Vite CSR a **Next.js con SSR/SSG** o implementar **pre-rendering** con `vite-plugin-prerender`. Sin embargo, esto requiere refactorización significativa. Para esta primera iteración, implementaremos todas las mejoras de SEO posibles dentro de la arquitectura SPA actual, con foco en los elementos que **sí controla el HTML estático** (meta tags, robots, sitemap, JSON-LD, OG) y las optimizaciones de rendimiento. Esto ya dará mejoras sustanciales en ranking.
