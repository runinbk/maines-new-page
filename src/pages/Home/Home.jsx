import Navbar from '../../components/layout/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import CTAContact from './components/CTAContact';
import Footer from '../../components/layout/Footer';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useLanguage } from '../../context/LanguageContext';
import { StructuredData } from '../../components/seo/StructuredData';

const Home = () => {
  const { language } = useLanguage();
  const isEs = language === 'es';

  // Apply dynamic SEO tags based on language translation keys
  usePageMeta("hero.title", "hero.subtitle");

  const mainesOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Maines S.R.L.",
    "alternateName": "Maines Importaciones y Medicina Estética",
    "url": "https://www.mainessrl.com",
    "logo": "https://www.mainessrl.com/assets/logo-maines.svg",
    "image": "https://www.mainessrl.com/assets/marcas/card-jetema.webp",
    "description": isEs 
      ? "Elevamos el estándar de la medicina estética y salud en Bolivia. Importación y distribución exclusiva de marcas globales líderes (Jetema, Dermclar, Xtralife, Cereform)."
      : "We raise the standard of aesthetic medicine and health in Bolivia. Exclusive import and distribution of leading global brands (Jetema, Dermclar, Xtralife, Cereform).",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Equipetrol, Calle 9 Este",
      "addressLocality": "Santa Cruz de la Sierra",
      "addressRegion": "Santa Cruz",
      "addressCountry": "BO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-17.763428",
      "longitude": "-63.195066"
    },
    "telephone": "+59133400835",
    "email": "contacto@mainessrl.com",
    "priceRange": "$$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "18:30"
    },
    "sameAs": [
      "https://www.instagram.com/maines.srl/",
      "https://www.facebook.com/mainessrl/"
    ]
  };

  return (
    <div className="relative min-h-screen bg-lightBg flex flex-col justify-between">
      {/* Dynamic JSON-LD corporate schema */}
      <StructuredData schema={mainesOrganizationSchema} id="maines-corp-schema" />
      {/* Navigation capsule */}
      <Navbar />

      {/* Home Sections */}
      <main className="flex-grow">
        {/* Hero Landing */}
        <Hero />

        {/* Accordion Brand Ecosystem */}
        <BrandPortal />

        {/* Asymmetrical Trajectory About Us */}
        <AboutSection />

        {/* Interactive DNA Contact CTA */}
        <CTAContact />
      </main>

      {/* Premium Dark Tech Footer */}
      <Footer />
    </div>
  );
};

export default Home;
