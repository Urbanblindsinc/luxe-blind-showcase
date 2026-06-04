import React from "react";
import OptimizedImage from "./OptimizedImage";

interface PhotoSpotlightProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

const PhotoSpotlight: React.FC<PhotoSpotlightProps> = ({ 
  src, 
  alt, 
  caption, 
  priority = false 
}) => {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-6">
        <figure className="overflow-hidden rounded-sm border border-border bg-background">
          <OptimizedImage
            src={src}
            alt={alt}
            priority={priority}
            aspectRatio="[16/9] md:aspect-[21/9]"
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
          {caption && (
            <figcaption className="p-4 text-sm text-muted-foreground">{caption}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
};

export default PhotoSpotlight;
