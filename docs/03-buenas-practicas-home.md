# Buenas Prácticas y Arquitectura Frontend: Maines S.R.L.

Este documento establece las reglas técnicas innegociables para el desarrollo de la interfaz de la plataforma web de Maines S.R.L. Todo el código generado debe regirse por estos estándares.

## 1. Modularidad y Componentización
* **No generes un solo archivo gigante:** Separa la interfaz en componentes lógicos y reutilizables (Ej: `Navbar`, `Hero`, `BrandCard`, `AboutSection`, `SocialWall`, `Footer`).
* **Código Limpio (Clean Code):** Mantén las funciones y componentes cortos. Usa nombres descriptivos en inglés para variables, funciones y componentes (ej. `handleContactSubmit`, `BrandPortal`, no uses spanglish como `tarjetaMarca`).

## 2. Estilos y CSS (Tailwind CSS / Estilos Modernos)
* **Variables Globales:** Utiliza variables CSS para los colores principales (acento, fondos limpios, textos).
* **Fidelidad al Diseño (Pixel Perfect):** Respeta al máximo los márgenes (margins), rellenos (paddings) y espacios en blanco (whitespace) mostrados en la imagen de referencia. El diseño es *Premium* y asimétrico; el espacio en blanco es crucial para mantener la elegancia.
* **Clases y Etiquetas Específicas:** Recuerda la regla del documento `02-textos-reemplazo-home.md`. Aplica etiquetas `<span>` con clases utilitarias para las palabras que llevan colores de acento específicos.

## 3. Diseño Responsivo (Mobile First)
* El diseño asimétrico de escritorio debe adaptarse elegantemente a dispositivos móviles. 
* Las tarjetas (Cards) del Ecosistema de Marcas y el Social Wall deben convertirse en elementos apilables (stack) o carruseles táctiles (swipeables) en resoluciones pequeñas (pantallas móviles).
* La tipografía debe escalar correctamente utilizando utilidades responsivas (ej. `text-3xl md:text-5xl`).

## 4. Interactividad y Animaciones (Premium Feel)
* **Hover States:** Todos los botones y tarjetas deben tener transiciones suaves (`transition-all duration-300 ease-in-out`). Evita cambios bruscos.
* **Micro-interacciones:** Agrega un sutil efecto de elevación o sombreado (box-shadow) al pasar el cursor sobre las tarjetas de Jetema, Dermclar y Xtralife.
* Si el rendimiento lo permite, implementa un sutil *fade-in* (aparición gradual) para las secciones al hacer scroll.

## 5. Accesibilidad (a11y) y SEO Semántico
* Utiliza etiquetas HTML5 semánticas (`<header>`, `<section>`, `<article>`, `<footer>`).
* Todos los logos e imágenes (incluso los placeholders) deben tener sus atributos `alt` correctos.
* Asegúrate de que el contraste de color entre el texto y el fondo cumpla con los estándares de legibilidad.