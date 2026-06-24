import { useState } from 'react';
import { Skeleton } from './Skeleton';

/**
 * Image wrapper that displays a pulsating skeleton placeholder
 * until the image is fully loaded, then performs a smooth fade-in transition.
 */
const ImageWithSkeleton = ({ src, alt, className, skeletonClassName, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {/* Skeleton block rendered on top of the image until onLoad fires */}
      {!loaded && (
        <Skeleton 
          className={`absolute inset-0 z-10 w-full h-full rounded-2xl ${skeletonClassName || ''}`} 
        />
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
