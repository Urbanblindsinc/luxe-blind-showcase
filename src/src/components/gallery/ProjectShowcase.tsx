
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectImage {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  locationTag: string;
  rating: number;
  projectGroup: string;
}

interface ProjectShowcaseProps {
  images: ProjectImage[];
  projectGroup: string;
}

const ProjectShowcase = ({ images, projectGroup }: ProjectShowcaseProps) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const mainImage = images[0];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showAllImages) return;
      
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAllImages, images.length]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group overflow-hidden bg-white rounded-sm border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative overflow-hidden" onClick={() => setShowAllImages(true)}>
          <div className="aspect-[3/2] bg-gray-100">
            <img 
              src={mainImage.image} 
              alt={mainImage.title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-black bg-white/90 px-3 py-1 rounded-full uppercase">
                  {images.length} Images
                </span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllImages(true);
                  }}
                  className="text-xs"
                >
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">{mainImage.title.split(": ")[1]}</h3>
          <p className="text-sm text-muted-foreground">{mainImage.description}</p>
        </div>
      </motion.div>

      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-[92vw] w-full max-h-[92vh] p-0">
          <DialogTitle className="text-xl font-medium p-6">
            {images[currentIndex].title.split(": ")[1]}
          </DialogTitle>
          
          <Carousel 
            className="w-full" 
            opts={{
              align: "center",
              containScroll: false,
              startIndex: currentIndex
            }}
            setApi={(api) => {
              if (api) {
                api.on('select', () => {
                  setCurrentIndex(api.selectedScrollSnap());
                });
                api.scrollTo(currentIndex);
              }
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={image.id}>
                  <div className="relative flex justify-center items-center bg-black w-full h-[75vh]">
                    <img 
                      src={image.image} 
                      alt={image.title.split(": ")[1]}
                      className="max-h-full max-w-full object-contain mx-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="p-6">
                        <h4 className="text-white font-medium text-lg mb-2">{image.title.split(": ")[1]}</h4>
                        <p className="text-white/90">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectShowcase;
