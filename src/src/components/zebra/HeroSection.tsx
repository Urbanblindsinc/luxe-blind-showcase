
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  textAlignment?: "left" | "right";
}

const HeroSection = ({ 
  image, 
  alt, 
  title, 
  description, 
  textAlignment = "left" 
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // More reliable fallback image specifically for window blinds
  const fallbackImage = "https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  
  useEffect(() => {
    // Reset states when image prop changes
    setIsLoaded(false);
    setHasError(false);
    
    // Preload the image
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      console.log(`HeroSection: Image preloaded successfully: ${image}`);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error(`HeroSection: Failed to preload image: ${image}`);
      setHasError(true);
      setIsLoaded(true); // Still mark as loaded so we show the fallback
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);
  
  return (
    <div className="relative group overflow-hidden w-full h-[500px] mb-16">
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      <img 
        src={hasError ? fallbackImage : image} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={() => {
          console.error(`HeroSection: Image error handler triggered for: ${image}`);
          setHasError(true);
        }}
      />
      
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-12">
        <div 
          className={cn(
            "max-w-xl", 
            textAlignment === "left" ? "text-left ml-8 md:ml-16" : "text-right mr-8 md:mr-16 ml-auto"
          )}
        >
          {title && (
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="font-sans text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
