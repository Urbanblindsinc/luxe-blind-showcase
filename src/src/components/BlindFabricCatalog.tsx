import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BlindFabricCatalogProps {
  blindType: "roller" | "zebra" | "honeycomb" | null;
  index: number;
}

const BlindFabricCatalog = ({ blindType, index }: BlindFabricCatalogProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  
  if (!blindType) return null;

  // Define fabric collections for each blind type
  const fabricCollections = {
    roller: [
      { image: "/lovable-uploads/6e20503f-6b5d-444b-95cf-f231183dec25.png", pageNumber: 1 },
      { image: "/lovable-uploads/fabe7416-7611-4e4e-9cbf-bbc7efa9548d.png", pageNumber: 2 },
      { image: "/lovable-uploads/ea380de7-5e6e-4252-be64-d319134f0a5b.png", pageNumber: 3 },
      { image: "/lovable-uploads/a85eef03-8d30-46cd-8e7d-b32ba71a9c8d.png", pageNumber: 4 },
      { image: "/lovable-uploads/b34b243c-5187-4908-ac5f-2c48f8330282.png", pageNumber: 5 },
      { image: "/lovable-uploads/81999cc3-4118-409e-873f-e30514b91497.png", pageNumber: 6 },
      { image: "/lovable-uploads/108dd0a6-3e4f-4577-8ce6-1e4cf983ea35.png", pageNumber: 7 },
      { image: "/lovable-uploads/63d4bf33-8a3f-4649-b7fa-320922043e92.png", pageNumber: 8 },
      { image: "/lovable-uploads/f3badca2-8214-494b-b43e-af98ca976cb9.png", pageNumber: 9 },
      { image: "/lovable-uploads/b558d6da-f967-4096-bfe3-72dd25eb73d0.png", pageNumber: 10 }
    ],
    zebra: [
      { image: "/lovable-uploads/559c866a-e1c8-4963-9f6b-cc16c68d4001.png", pageNumber: 1 },
      { image: "/lovable-uploads/7c5ac15b-03e4-4b82-90b2-dcb34c50ab12.png", pageNumber: 2 },
      { image: "/lovable-uploads/b1e980e8-c9e0-483f-97cb-a762ab01f52c.png", pageNumber: 3 },
      { image: "/lovable-uploads/d7c83f41-7937-424d-bf0f-af6bc55d65c2.png", pageNumber: 4 },
      { image: "/lovable-uploads/8fceca37-9812-4027-91e6-26cf69dca577.png", pageNumber: 5 }
    ],
    honeycomb: [
      { image: "/lovable-uploads/4c35be73-a08c-48e3-8bd2-95ef272c014b.png", pageNumber: 1 },
      { image: "/lovable-uploads/d38ee1e9-1e95-4649-8ca2-3cae32955246.png", pageNumber: 2 },
      { image: "/lovable-uploads/392fc986-103e-45d5-9432-8c728a3a99c5.png", pageNumber: 3 },
      { image: "/lovable-uploads/515a5a28-ee8f-4bef-9240-02eb272e395f.png", pageNumber: 4 },
      { image: "/lovable-uploads/6e78adf8-013a-46e6-984d-0489a1a086c7.png", pageNumber: 5 }
    ]
  };

  const collectionTitle = {
    roller: "Roller Blind Fabric Collection",
    zebra: "Luxury Zebra Blinds Collection",
    honeycomb: "Energy Efficient Honeycomb Collection"
  };

  const currentFabrics = fabricCollections[blindType];

  const openImageDialog = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!currentFabrics || currentFabrics.length === 0) return;
    
    let newIndex = selectedImageIndex;
    
    if (direction === 'next') {
      newIndex = (selectedImageIndex + 1) % currentFabrics.length;
    } else {
      newIndex = (selectedImageIndex - 1 + currentFabrics.length) % currentFabrics.length;
    }
    
    setSelectedImageIndex(newIndex);
    setSelectedImage(currentFabrics[newIndex].image);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">{collectionTitle[blindType]}</CardTitle>
        <CardDescription>
          Browse available fabric styles for your selected blind type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {currentFabrics.map((fabric, i) => (
              <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <div 
                    className="overflow-hidden rounded-lg border border-gray-200 shadow-sm cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => openImageDialog(fabric.image, i)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={fabric.image} 
                        alt={`Page ${fabric.pageNumber}`} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="text-center py-1 bg-gray-50">
                      <span className="text-xs text-gray-600">Page {fabric.pageNumber}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center gap-2 mt-2">
            <CarouselPrevious className="static translate-y-0 -left-0" />
            <CarouselNext className="static translate-y-0 -right-0" />
          </div>
        </Carousel>
      </CardContent>

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
    </Card>
  );
};

export default BlindFabricCatalog;
