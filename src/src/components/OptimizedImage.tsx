import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  fallbackSrc?: string;
  aspectRatio?: string;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  fallbackSrc,
  className,
  aspectRatio,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    }
    
    onError?.(event);
  }, [fallbackSrc, currentSrc, onError]);

  // Convert common image formats to WebP if supported
  const optimizedSrc = useCallback((originalSrc: string) => {
    // Check if browser supports WebP
    const supportsWebP = typeof window !== 'undefined' && 
      window.HTMLCanvasElement && 
      document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1;
    
    if (supportsWebP && originalSrc.includes('unsplash.com')) {
      return originalSrc.includes('?') 
        ? `${originalSrc}&fm=webp&q=80` 
        : `${originalSrc}?fm=webp&q=80`;
    }
    
    return originalSrc;
  }, []);

  return (
    <div className={cn("relative overflow-hidden", aspectRatio && `aspect-${aspectRatio}`)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        src={optimizedSrc(currentSrc)}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;