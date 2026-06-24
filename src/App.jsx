import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import PageLoader from './components/layout/PageLoader';
import ScrollToAnchor from './components/layout/ScrollToAnchor';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Code Splitting - Lazy load page components to improve initial page load speed
const Home = React.lazy(() => import('./pages/Home/Home'));
const BrandPage = React.lazy(() => import('./pages/Brand/BrandPage'));

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
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
              <Route path="/:brandId" element={<BrandPage />} />
              <Route path="/:brandId/catalogo" element={<BrandPage />} />
              <Route path="/:brandId/catalogo/:productSlug" element={<BrandPage />} />
              <Route path="/:brandId/empresa" element={<BrandPage />} />
              <Route path="/:brandId/contacto" element={<BrandPage />} />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
