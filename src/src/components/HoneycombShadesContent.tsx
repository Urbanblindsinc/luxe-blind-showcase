
import React, { useState, useEffect } from "react";
import CatalogViewer from "./CatalogViewer";
import ProductImageViewer from "@/components/ProductImageViewer";
import { getHoneycombStyles } from "@/data/honeycombStyles";

interface HoneycombShadesContentProps {
  onLoaded?: () => void;
}

const HoneycombShadesContent = ({ onLoaded }: HoneycombShadesContentProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const fabricImages = [
    "/lovable-uploads/4c35be73-a08c-48e3-8bd2-95ef272c014b.png",
    "/lovable-uploads/d38ee1e9-1e95-4649-8ca2-3cae32955246.png",
    "/lovable-uploads/392fc986-103e-45d5-9432-8c728a3a99c5.png",
    "/lovable-uploads/515a5a28-ee8f-4bef-9240-02eb272e395f.png",
    "/lovable-uploads/6e78adf8-013a-46e6-984d-0489a1a086c7.png"
  ];

  // New showcase images in the specified order
  const showcaseImages = [
    {
      src: "/lovable-uploads/14943691-0a0f-4808-a18b-a905c70eeba1.png",
      alt: "Premium honeycomb blinds in elegant living room setting",
      bullets: [
        { title: "Energy Efficiency", description: "Superior insulation properties reduce energy costs year-round" },
        { title: "Cell Sizes: 25mm vs 38mm", description: "25mm cells: slimmer profile with a refined look. 38mm cells: deeper pockets for superior insulation and a bolder texture." },
        { title: "Light Control", description: "From light-filtering to blackout options for privacy, comfort, and energy savings" }
      ]
    },
    {
      src: "/lovable-uploads/1f4a54f6-2b16-48e5-8b0b-885343d9f385.png",
      alt: "Light control that elevates your home's ambiance",
      bullets: [
        { title: "Child Safety", description: "Cordless operation ensures child and pet safety" },
        { title: "Motorization", description: "Motorization options available for ultimate convenience" },
        { title: "Custom Sizing", description: "Custom sizing available for any window configuration" }
      ]
    },
    {
      src: "/lovable-uploads/fffdd015-35d3-41e1-b1aa-f9ed4104127a.png",
      alt: "Elegant textures and stylish hues",
      bullets: [
        { title: "Premium Fabrics", description: "Premium fabrics resist fading and maintain color vibrancy" },
        { title: "Easy Maintenance", description: "Easy maintenance with regular dusting or gentle vacuuming" },
        { title: "Professional Installation", description: "Professional installation ensures perfect fit and operation" }
      ]
    },
    {
      src: "/lovable-uploads/08d296d6-8ee4-4e34-a012-0f986bf3b5ba.png",
      alt: "Smart home control automation by Urban Blinds",
      bullets: [
        { title: "Voice Control", description: "Voice control compatibility with Alexa, Google, and Siri" },
        { title: "App Control", description: "Smartphone app control from anywhere in the world" },
        { title: "Automation", description: "Automated scheduling adapts to your daily routine" }
      ]
    }
  ];

  // Transform images array into pages array for CatalogViewer
  const catalogPages = fabricImages.map((image, index) => ({
    image,
    pageNumber: index + 1
  }));

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = [...fabricImages, ...showcaseImages.map(img => img.src)].length;

    const allImages = [...fabricImages, ...showcaseImages.map(img => img.src)];
    
    const imagePromises = allImages.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
            if (onLoaded) {
              onLoaded();
            }
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
            if (onLoaded) {
              onLoaded();
            }
          }
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises);
  }, [onLoaded]);

  return (
    <div className="space-y-0">
      {/* Showcase Images - Full Width */}
      {showcaseImages.map((imageData, index) => (
        <div key={index} className="w-full">
          <div className="relative w-full">
            <img
              src={imageData.src}
              alt={imageData.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Bullet Points in Rectangular Boxes - Matching Zebra/Roller style */}
          <div className="bg-white py-12">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {imageData.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{bulletIndex + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{bullet.title}</h3>
                      <p className="text-muted-foreground">{bullet.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Catalog Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            <CatalogViewer 
              coverImage={fabricImages[0]}
              pages={catalogPages}
              title="Fabric Catalog"
              description="Browse our selection of energy-efficient honeycomb fabrics"
              downloadFileName="Honeycomb-Catalog.pdf"
              integrated={true}
            />
          </div>
        </div>
        
        {/* Honeycomb Styles Gallery */}
        <div className="container mx-auto px-6 mt-12">
          <h3 className="text-2xl font-bold text-center mb-4">Available Honeycomb Blind Styles</h3>
          
          {/* 25mm Cell Size Section */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-center mb-6 text-primary">25mm Cell Size (Compact & Versatile)</h4>
            <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
              25mm cells are slimmer and modern, ideal for standard-sized windows. They provide a sleek look, efficient insulation, and precise light control without adding bulk.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {getHoneycombStyles().filter(style => style.cellSize === '25mm').map((style, index) => (
                <ProductImageViewer
                  key={style.name}
                  src={style.src}
                  alt={style.name}
                  name={style.name}
                  code={style.code}
                  description={style.description}
                  opacity={style.opacity}
                  className="aspect-square rounded-lg border border-border overflow-hidden"
                />
              ))}
            </div>
          </div>
          
          {/* 38mm Cell Size Section */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-center mb-6 text-primary">38mm Cell Size (Large & Insulating)</h4>
            <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
              38mm cells are bigger and bolder, ideal for large windows and patio doors. They provide enhanced insulation (traps more air) and make a strong design statement with pronounced pleats.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {getHoneycombStyles().filter(style => style.cellSize === '38mm').map((style, index) => (
                <ProductImageViewer
                  key={style.name}
                  src={style.src}
                  alt={style.name}
                  name={style.name}
                  code={style.code}
                  description={style.description}
                  opacity={style.opacity}
                  className="aspect-square rounded-lg border border-border overflow-hidden"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoneycombShadesContent;
