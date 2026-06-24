import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import PageLoader from './components/common/PageLoader';
import ScrollToAnchor from './components/common/ScrollToAnchor';

// Code Splitting - Lazy load page components to improve initial page load speed
const Home = React.lazy(() => import('./pages/Home'));
const BrandLayout = React.lazy(() => import('./components/brand/BrandLayout'));

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Handles route-driven scrolling automatically */}
        <ScrollToAnchor />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Homepage Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ecosistema" element={<Home />} />
            <Route path="/nosotros" element={<Home />} />
            <Route path="/contacto" element={<Home />} />

            {/* Brand Detail Routes */}
            <Route path="/:brandId" element={<BrandLayout />} />
            <Route path="/:brandId/catalogo" element={<BrandLayout />} />
            <Route path="/:brandId/catalogo/:productSlug" element={<BrandLayout />} />
            <Route path="/:brandId/empresa" element={<BrandLayout />} />
            <Route path="/:brandId/contacto" element={<BrandLayout />} />

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
