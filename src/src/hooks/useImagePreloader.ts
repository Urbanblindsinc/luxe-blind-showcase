import { useEffect, useCallback } from 'react';

interface UseImagePreloaderOptions {
  priority?: boolean;
  sizes?: string;
}

export const useImagePreloader = (
  images: string[], 
  options: UseImagePreloaderOptions = {}
) => {
  const { priority = false, sizes } = options;

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Create link element for preloading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      
      if (sizes) {
        link.setAttribute('imagesizes', sizes);
      }
      
      if (priority) {
        link.setAttribute('fetchpriority', 'high');
      }

      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
      
      document.head.appendChild(link);
      
      // Clean up after a delay
      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 5000);
    });
  }, [sizes, priority]);

  useEffect(() => {
    if (images.length === 0) return;

    const preloadImages = async () => {
      try {
        // Preload critical images first (first 3), then others
        const criticalImages = images.slice(0, 3);
        const otherImages = images.slice(3);
        
        // Preload critical images immediately
        await Promise.allSettled(
          criticalImages.map(src => preloadImage(src))
        );
        
        // Preload other images with a slight delay
        setTimeout(() => {
          Promise.allSettled(
            otherImages.map(src => preloadImage(src))
          );
        }, 100);
        
      } catch (error) {
        console.warn('Image preloading failed:', error);
      }
    };

    preloadImages();
  }, [images, preloadImage]);
};

export default useImagePreloader;