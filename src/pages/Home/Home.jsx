import Navbar from '../../components/layout/Navbar';
import Hero from './components/Hero';
import BrandPortal from './components/BrandPortal';
import AboutSection from './components/AboutSection';
import CTAContact from './components/CTAContact';
import Footer from '../../components/layout/Footer';
import { usePageMeta } from '../../hooks/usePageMeta';

const Home = () => {
  // Apply dynamic SEO tags based on language translation keys
  usePageMeta("hero.title", "hero.subtitle");

  return (
    <div className="relative min-h-screen bg-lightBg flex flex-col justify-between">
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
