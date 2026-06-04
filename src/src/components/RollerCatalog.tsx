import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import RollerShadesContent from "./RollerShadesContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getRollerStyles } from "../data/rollerStyles";

const RollerCatalog = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  
  const fabricImages = getRollerStyles().map((s) => s.src);

  console.log("Rendering RollerCatalog component");
  
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

  const scrollToFabricCatalog = () => {
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
        // Fallback to roller-catalog section
        const catalogElement = document.getElementById('roller-catalog');
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
    <div className="bg-white mb-8" data-catalog-section="true" id="roller-catalog">
      {!isLoaded && (
        <div className="max-w-full mx-auto mb-8">
          <Skeleton className="h-[500px] w-full rounded-lg mb-6" />
          <Skeleton className="h-[30px] w-[300px] mx-auto mb-4" />
          <Skeleton className="h-[20px] w-[200px] mx-auto mb-10" />
          <Skeleton className="h-[500px] w-full rounded-lg mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
          </div>
        </div>
      )}
      
      
      <RollerShadesContent onLoaded={() => {
        console.log("All images loaded, updating RollerCatalog state");
        setIsLoaded(true);
      }} />

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

export default RollerCatalog;
