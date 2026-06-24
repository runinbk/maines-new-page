import { X } from 'lucide-react';
import ImageWithSkeleton from '../../../../components/ui/ImageWithSkeleton';

export const ProductLightbox = ({
  lightboxImage,
  setLightboxImage,
  activeVideo
}) => {
  return (
    <div
      onClick={() => setLightboxImage(null)}
      className={`fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out transition-all duration-300 ${
        lightboxImage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[90vw] h-[90vw] sm:w-[500px] sm:h-[500px] bg-slate-950/95 border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center cursor-default aspect-square transition-all duration-300 ${
          lightboxImage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {lightboxImage && (
          <>
            {activeVideo ? (
              <video
                src={activeVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageWithSkeleton src={lightboxImage} alt="Large product view" className="w-full h-full object-cover" />
            )}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:scale-105 transition-all focus:outline-none cursor-pointer z-30"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductLightbox;
