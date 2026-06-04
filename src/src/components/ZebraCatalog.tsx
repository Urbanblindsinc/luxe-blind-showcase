
import React, { useState } from "react";
import { CatalogViewer } from "@/components";
import ImageShowcase from "./zebra/ImageShowcase";
import ProductImageViewer from "@/components/ProductImageViewer";
import { getZebraStyles } from "@/data/zebraStyles";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Ruler, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const zebraPages = [
  { image: "/lovable-uploads/559c866a-e1c8-4963-9f6b-cc16c68d4001.png", pageNumber: 1 },
  { image: "/lovable-uploads/d7c83f41-7937-424d-bf0f-af6bc55d65c2.png", pageNumber: 2 },
  { image: "/lovable-uploads/79649c29-b85d-42ab-9a33-6e7a15684d9b.png", pageNumber: 3 },
  { image: "/lovable-uploads/b1e980e8-c9e0-483f-97cb-a762ab01f52c.png", pageNumber: 4 },
  { image: "/lovable-uploads/7c5ac15b-03e4-4b82-90b2-dcb34c50ab12.png", pageNumber: 5 },
  { image: "/lovable-uploads/8fceca37-9812-4027-91e6-26cf69dca577.png", pageNumber: 6 }
];

const ZebraCatalog = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  
  const fabricImages = zebraPages.map(page => page.image);

  const openImageDialog = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!fabricImages || fabricImages.length === 0) return;
    
    let newIndex = selectedImageIndex;
    
    if (direction === 'next') {
      newIndex = (selectedImageIndex + 1) % fabricImages.length;
    } else {
      newIndex = (selectedImageIndex - 1 + fabricImages.length) % fabricImages.length;
    }
    
    setSelectedImageIndex(newIndex);
    setSelectedImage(fabricImages[newIndex]);
  };

  const scrollToCatalog = () => {
    // Wait a short moment for components to render, then scroll to catalog
    setTimeout(() => {
      // Look for the specific "Fabric Catalog" heading
      const catalogHeading = Array.from(document.querySelectorAll('h2')).find(
        h2 => h2.textContent?.includes('Fabric Catalog')
      );
      
      if (catalogHeading) {
        catalogHeading.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        // Fallback to zebra-catalog section
        const catalogElement = document.getElementById('zebra-catalog');
        if (catalogElement) {
          catalogElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    }, 100);
  };

  return (
    <div data-catalog-section="true" id="zebra-catalog">
      <div className="mb-8">

        <div className="mb-12">
          {/* Modern Elegance Showcase - with titled bullet points */}
          <ImageShowcase 
            image="/lovable-uploads/49df8c85-e374-4e10-ac92-15f1e53ebf0b.png"
            bulletPoints={[
              {
                title: "Premium Design",
                description: "Dual-layer design for precise light control and modern aesthetic"
              },
              {
                title: "Enhanced Privacy",
                description: "Adjustable fabric bands provide customizable light and privacy levels"
              },
              {
                title: "Versatile Styling",
                description: "Wide range of colors and patterns to match any décor style"
              }
            ]}
            altText="Modern dining room with elegant zebra blinds on windows"
            useNumberedPoints={true}
            fullWidth={true}
            imageClassName="w-full object-cover"
          />
          
          {/* Light Control Showcase - with titled bullet points */}
          <ImageShowcase 
            image="/lovable-uploads/3dc39812-aec2-48aa-a65d-7e089c31db17.png"
            bulletPoints={[
              {
                title: "Light-Filtering Mode",
                description: "Sheer bands align to diffuse daylight while preserving views."
              },
              {
                title: "Blackout Mode",
                description: "Opaque bands overlap to block light for sleep and privacy."
              },
              {
                title: "Dial-in Control",
                description: "Slide bands to transition seamlessly between filtered light and blackout."
              }
            ]}
            altText="Comparison of light filtering and room darkening zebra blinds"
            useNumberedPoints={true}
            fullWidth={true}
            imageClassName="w-full object-cover"
          />
          
          {/* Luxurious Fabrics Showcase - with titled bullet points */}
          <ImageShowcase 
            image="/lovable-uploads/8161712d-a1f6-4586-9586-813666e68ae4.png"
            bulletPoints={[
              {
                title: "Bold Statements",
                description: "Rich, bold tones to create visual impact in any room"
              },
              {
                title: "Neutral Palette",
                description: "Serene neutrals to complement any interior design style"
              },
              {
                title: "Luxurious Textures",
                description: "Timeless textural elements for added visual depth"
              }
            ]}
            altText="Living room window with stylish zebra blinds in rich brown color"
            useNumberedPoints={true}
            fullWidth={true}
            imageClassName="w-full object-cover"
          />
          
          {/* Smart Home Control Showcase - with titled bullet points */}
          <ImageShowcase 
            image="/lovable-uploads/d7b756e4-c2cd-47c0-9c12-df2a4b4257b1.png"
            bulletPoints={[
              {
                title: "Intuitive Control",
                description: "Operate via app, remote, or voice commands with ease"
              },
              {
                title: "Scheduled Adjustments",
                description: "Set automated schedules for throughout the day"
              },
              {
                title: "Smart Integration",
                description: "Seamlessly works with your existing smart home ecosystem"
              }
            ]}
            altText="Modern living room with automated zebra blinds controlling natural light"
            useNumberedPoints={true}
            fullWidth={true}
            imageClassName="w-full object-cover"
          />
          
          <div className="mt-8">
            <CatalogViewer
              title="Fabric Catalog"
              description="Browse our full catalog to discover all our premium zebra blind color options, band sizes, and operation styles."
              coverImage={zebraPages[0].image}
              pages={zebraPages}
              downloadFileName="urban-blinds-zebra-catalog-2023.pdf"
              pdfUrl="#"
              integrated={true}
              onImageClick={(image, index) => openImageDialog(image, index)}
            />
          </div>
          
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 z-10 bg-background/80 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Navigation buttons */}
            <div className="absolute inset-y-0 left-2 flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
                onClick={() => navigateImage('prev')}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
            </div>
            
            <div className="absolute inset-y-0 right-2 flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
                onClick={() => navigateImage('next')}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Fabric preview" 
                className="w-full object-contain max-h-[70vh]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ZebraCatalog;
