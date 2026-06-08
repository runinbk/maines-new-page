# Animaciones y Comportamiento de Componentes: Home Maines S.R.L.

Este documento detalla las interacciones, animaciones y comportamientos específicos que deben tener los componentes principales de la página. El objetivo es lograr una experiencia fluida, moderna y "Premium" (estilo Awwwards), sin sobrecargar el rendimiento.

## 1. Hero Section
* **Comportamiento del Logo:** El logotipo de Maines S.R.L. (ubicado en el centro) debe tener protagonismo. Aplica una animación sutil de entrada al cargar la página (ej. un *fade-in* con un ligero escalado de `0.9` a `1`, o flotación suave).
* **Carga inicial:** Los textos del Hero (pre-título, título y subtítulo) deben aparecer con una animación en cascada suave (staggered fade-in-up) una vez que la página cargue.

## 2. Portal de Marcas (Nuestro Ecosistema)
* **Comportamiento "Acordeón" / Expansivo:** Este es el núcleo interactivo. Las 3 tarjetas (Jetema, Dermclar, Xtralife) no deben ser estáticas. Al pasar el cursor (*hover*) sobre una tarjeta en versión de escritorio, esta debe expandirse suavemente tomando más ancho de la pantalla, mientras las otras dos se contraen ligeramente.
* **Transiciones:** Utiliza transiciones CSS suaves (`ease-in-out`, duración aproximada de 300ms a 500ms) para que el efecto expansivo se sienta lujoso y no brusco.
* **Hover del contenido:** Al hacer hover, el fondo de la marca respectiva debe hacerse más nítido o hacer un ligero *zoom-in*, y el botón de acción ("Explorar [Marca]") debe revelarse o resaltarse.

## 3. Sección Sobre Nosotros (Excelencia y Trayectoria)
* **Aparición al hacer Scroll (Scroll Reveal):** Como el diseño es asimétrico, los diferentes bloques de texto y las cifras (+10 Años, 3 Marcas, etc.) deben ir apareciendo a medida que el usuario hace scroll hacia abajo.
* Usa un efecto *fade-in-up* sutil (puedes usar Intersection Observer, Framer Motion o clases de Tailwind con algo de JS) para que los elementos entren en la vista de forma elegante.

## 4. Social Wall (Innovación en Movimiento)
* **Comportamiento de Carrusel Moderno:** Las tarjetas que contienen los videos verticales (formato Reels/TikTok, 9:16) deben estar en un contenedor deslizable horizontalmente (swipeable).
* **Interacción:** Debe permitir arrastrar con el ratón o el dedo (*drag to scroll / swipe*). Si es posible, aplica un ligero efecto 3D o de profundidad (GSAP o Swiper.js) donde la tarjeta central esté a tamaño completo y las laterales tengan un ligero escalado menor (`scale: 0.9`) y menor opacidad.

## 5. Mobile (Celulares)
* Todas las animaciones de *hover* expansivas (como el Portal de Marcas) deben desactivarse en móviles y convertirse en tarjetas apilables verticalmente (stack) o en un slider táctil horizontal, ya que en dispositivos móviles no existe el efecto *hover*.