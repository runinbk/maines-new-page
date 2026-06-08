import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ProductGallery Component
 * @param {Object} props
 * @param {string[]} props.images - Array of image paths/URLs
 * @param {string} props.productName - Name of the product for accessibility
 * @param {import('../../data/productsData').BrandConfig} props.brand - Active brand config
 */
const ProductGallery = ({ images, productName, brand }) => {
  // Local state only, isolating re-renders to this single component
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
        <span className="text-xs text-slate-400 font-medium">No Image Available</span>
      </div>
    );
  }

  const currentImage = images[activeIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col gap-3 group/gallery">
      {/* Primary Display Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-sm transition-all duration-300">
        
        {/* Underlay brand color aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-transparent to-white opacity-40 pointer-events-none" />
        
        {/* Main Image */}
        <img
          src={currentImage}
          alt={`${productName} View ${activeIndex + 1}`}
          className="max-w-full max-h-full object-contain filter drop-shadow-sm transition-all duration-500"
          loading="lazy"
        />

        {/* Dynamic Controls Overlays (Only visible if multi-image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-slate-200/50 flex items-center justify-center text-primary-dark hover:text-accent opacity-0 group-hover/gallery:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-slate-200/50 flex items-center justify-center text-primary-dark hover:text-accent opacity-0 group-hover/gallery:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </>
        )}

        {/* Lightbox / Zoom Action Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute right-3 bottom-3 p-2 rounded-xl bg-white/85 hover:bg-white border border-slate-100 text-slate-500 hover:text-primary-dark opacity-0 group-hover/gallery:opacity-100 hover:scale-105 transition-all duration-300 shadow-md focus:outline-none"
          title="Zoom View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Thumbnail Grid Slider */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar py-0.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-12 rounded-xl border-2 bg-white flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 focus:outline-none ${
                idx === activeIndex
                  ? `border-cyan-500 shadow-md scale-102`
                  : 'border-slate-200/60 hover:border-slate-300'
              }`}
              style={{
                borderColor: idx === activeIndex ? `var(--color-${brand.accentBg.replace('bg-', '')})` : undefined
              }}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Elegant Lightbox Portal Overlay */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Header */}
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              {productName} — {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Content Container */}
          <div 
            className="relative max-w-4xl max-h-[80vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${productName} Lightbox`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg filter drop-shadow-2xl"
            />

            {images.length > 1 && (
              <>
                {/* Large Navigation arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-12 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
