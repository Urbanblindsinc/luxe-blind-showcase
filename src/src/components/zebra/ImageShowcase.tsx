
import React, { useState } from "react";
import { toast } from "sonner";

interface BulletPoint {
  title: string;
  description: string;
}

interface ImageShowcaseProps {
  image: string;
  bulletPoints: BulletPoint[] | string[];
  altText: string;
  title?: string; 
  description?: string;
  useNumberedPoints?: boolean;
  containerStyle?: string;
  imageStyle?: string;
  imageClassName?: string; // Add the missing property
  fullWidth?: boolean;
}

const ImageShowcase = ({ 
  image, 
  title, 
  bulletPoints, 
  altText, 
  description, 
  useNumberedPoints = false,
  containerStyle = "",
  imageStyle = "",
  imageClassName = "", // Add default value
  fullWidth = false
}: ImageShowcaseProps) => {
  // Track image loading state
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reliable fallback images for different scenarios
  const fallbackImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1610701596319-4552136e767d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];
  
  // Select a fallback image
  const fallbackImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  
  // Log when an image is about to render to help with debugging
  console.log(`ImageShowcase attempting to load image: ${image}`);
  
  return (
    <div className={`${fullWidth ? 'w-full' : 'max-w-6xl mx-auto'} ${containerStyle}`}>
      <div className="flex flex-col items-center">
        {title && (
          <h2 className="text-2xl md:text-3xl font-medium text-center text-gray-700 mb-6">
            {title}
          </h2>
        )}
        
        <div className={`mb-8 ${fullWidth ? 'w-full -mx-6 md:-mx-12 lg:-mx-24' : 'w-full'}`}>
          <div className={`min-h-[300px] bg-gray-100 relative ${imageStyle}`}>
            {/* Show a loading state while the image is loading */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 w-full h-full"></div>
              </div>
            )}
            
            {/* Enhanced image rendering with robust error handling */}
            <img 
              src={imageError ? fallbackImage : image} 
              alt={altText} 
              className={`w-full h-full object-cover ${!imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'} ${imageClassName}`}
              style={{ 
                minHeight: fullWidth ? "auto" : "300px", 
                backgroundColor: "#f8f8f8", 
                transition: "opacity 0.3s ease" 
              }} 
              onLoad={() => {
                console.log(`Image loaded successfully: ${image}`);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                setImageError(true);
                toast.error(`Image failed to load, using fallback image`, { 
                  duration: 3000,
                  position: "bottom-right"
                });
                // e.currentTarget.src already handled by state
              }}
              loading="eager"
            />
          </div>
        </div>
        
        {(description || bulletPoints.length > 0) && (
          <div className="max-w-4xl px-4 w-full">
            {description ? (
              <p className="text-gray-600 leading-relaxed text-center">{description}</p>
            ) : useNumberedPoints ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bulletPoints?.map((point, index) => (
                  <div key={index} className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>
                    {typeof point === 'string' ? (
                      <p className="text-muted-foreground">{point}</p>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-2">{point.title}</h3>
                        <p className="text-muted-foreground">{point.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : bulletPoints.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                {bulletPoints?.map((point, index) => (
                  <li key={index} className="leading-relaxed">
                    {typeof point === 'string' ? point : `${point.title}: ${point.description}`}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageShowcase;
