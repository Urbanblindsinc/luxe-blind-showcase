import { useState } from "react";
import { Download, ChevronRight, ChevronLeft, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLocation } from "react-router-dom";

interface CatalogPage {
  image: string;
  pageNumber: number;
}

interface CatalogViewerProps {
  title: string;
  description: string;
  coverImage: string;
  pages: CatalogPage[];
  pdfUrl?: string;
  downloadFileName: string;
  integrated?: boolean;
  fullPage?: boolean;
  hideDownloadButton?: boolean;
  onImageClick?: (image: string, index: number) => void;
}

const CatalogViewer = ({ 
  title, 
  description, 
  coverImage, 
  pages, 
  pdfUrl = "#", 
  downloadFileName,
  integrated = false,
  fullPage = false,
  hideDownloadButton = true,
  onImageClick
}: CatalogViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllPages, setShowAllPages] = useState(false);
  const location = useLocation();
  const isQuoteCalculatorPage = location.pathname === "/quote-calculator";

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  const toggleAllPages = () => {
    setShowAllPages((prev) => !prev);
  };

  console.log("CatalogViewer props:", { title, description, pages });
  console.log("First page image URL:", pages.length > 0 ? pages[0].image : "No pages");
  console.log("Current location:", location.pathname);

  if (fullPage) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pages.slice(0, 4).map((page, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <AspectRatio ratio={3/4} className="bg-gray-50 overflow-hidden mb-4">
                <img 
                  src={page.image} 
                  alt={`Page ${page.pageNumber} of ${title}`} 
                  className="w-full h-full object-cover"
                  onClick={() => onImageClick && onImageClick(page.image, index)}
                />
              </AspectRatio>
              <div className="text-center mt-2">
                <p className="text-sm text-muted-foreground">Page {page.pageNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (integrated) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-8">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">{description}</p>
        
        <Carousel className="w-full mb-16">
          <CarouselContent>
            {pages.map((page, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border border-gray-200 h-full">
                  <div className="p-1">
                    <AspectRatio ratio={3/4} className="bg-gray-50 overflow-hidden">
                      <img 
                        src={page.image} 
                        alt={`Page ${page.pageNumber} of ${title}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => onImageClick && onImageClick(page.image, index)}
                      />
                    </AspectRatio>
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Page {page.pageNumber}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        
        {!hideDownloadButton && !isQuoteCalculatorPage && (
          <div className="flex justify-center">
            <Button
              className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              <Download className="h-4 w-4" />
              <span>Download Complete Catalog</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-3">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="p-6 md:p-8">
        {!showAllPages ? (
          <div>
            <div className="aspect-[3/4] max-w-3xl mx-auto mb-6 bg-gray-50 rounded-md overflow-hidden shadow-sm">
              <img 
                src={pages[currentPage].image} 
                alt={`Page ${pages[currentPage].pageNumber} of ${title}`} 
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => onImageClick && onImageClick(pages[currentPage].image, currentPage)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">
                Page {pages[currentPage].pageNumber} of {pages.length}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pages.map((page, index) => (
              <Card 
                key={index} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setCurrentPage(index);
                  setShowAllPages(false);
                }}
              >
                <div className="aspect-[3/4] bg-gray-50">
                  <img 
                    src={page.image} 
                    alt={`Page ${page.pageNumber} of ${title}`} 
                    className="w-full h-full object-cover"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick && onImageClick(page.image, index);
                    }}
                  />
                </div>
                <div className="p-3 text-center text-sm text-muted-foreground">
                  Page {page.pageNumber}
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={toggleAllPages}
          >
            {showAllPages ? "Show Single Page View" : "Show All Pages"}
          </Button>
          
          {!hideDownloadButton && !isQuoteCalculatorPage && (
            <Button
              className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              <Download className="h-4 w-4" />
              <span>Download {downloadFileName}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogViewer;
