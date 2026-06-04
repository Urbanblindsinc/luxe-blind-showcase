import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ZoomIn, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductConfigForm from '@/components/ProductConfigForm';

interface ProductImageViewerProps {
  src: string;
  alt: string;
  name: string;
  code?: string;
  description?: string;
  opacity?: string;
  className?: string;
}

// New interface for carousel usage
interface ProductCarouselViewerProps {
  images: Array<{
    name: string;
    src: string;
    code?: string;
    description?: string;
    opacity?: string;
  }>;
  open: boolean;
  initialIndex?: number;
  title?: string;
  productType?: 'zebra' | 'roller' | 'honeycomb';
  onClose: (lastIndex: number) => void;
  onSelect?: (image: any, index: number) => void;
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  src,
  alt,
  name,
  code,
  description,
  opacity,
  className = ""
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`relative group cursor-pointer overflow-hidden ${className}`}>
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {showDetails && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 transform translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-sm">{name}</h3>
              {code && <p className="text-xs opacity-90">Code: {code}</p>}
              {opacity && <p className="text-xs opacity-90">{opacity}</p>}
              {description && <p className="text-xs mt-1 leading-tight">{description}</p>}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] md:max-w-4xl md:w-full bg-white m-0 md:m-4 h-screen md:h-auto md:max-h-[90vh] rounded-none md:rounded-lg flex flex-col py-4 md:py-6">
        <div className="relative flex-1 flex flex-col justify-center">
          <div className="w-full h-[55vh] md:h-[65vh] bg-gray-50 flex items-center justify-center mb-4 md:mb-6">
            <img 
              src={src} 
              alt={alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Info panel below image */}
          <div className="bg-white px-4 md:px-6 pb-4 md:pb-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-3 md:mb-4 text-gray-900 tracking-tight">{name}</h2>
              {/* Always show description */}
              {description && (
                <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6 text-gray-600 font-light italic">{description}</p>
              )}
              <div className="flex justify-center mt-4 md:mt-6">
                <Button 
                  onClick={() => setShowConfigForm(true)}
                  size="lg"
                  className="px-6 md:px-8 py-3 text-sm md:text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Add to Cart
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      
      {/* Product Configuration Dialog */}
      <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <ProductConfigForm
            productType={name.toLowerCase().includes('zebra') ? 'zebra' : name.toLowerCase().includes('honeycomb') ? 'honeycomb' : 'roller'}
            productName={name}
            currentStyle={name}
            currentImage={src}
            productCode={code}
            onClose={() => setShowConfigForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

// New carousel component that replaces ProductViewer
export const ProductCarouselViewer: React.FC<ProductCarouselViewerProps> = ({
  images,
  open,
  initialIndex = 0,
  title = "Product Viewer",
  productType,
  onClose,
  onSelect
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);

  React.useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose(currentIndex);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, currentIndex, onClose]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const current = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(currentIndex); }}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] md:max-w-4xl md:w-full bg-white m-0 md:m-4 h-screen md:h-auto md:max-h-[90vh] rounded-none md:rounded-lg flex flex-col py-4 md:py-6">
        <div className="relative flex-1 flex flex-col justify-center">
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          <div className="w-full h-[55vh] md:h-[65vh] bg-gray-50 flex items-center justify-center mb-4 md:mb-6">
            <img 
              src={current?.src} 
              alt={current?.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Info panel below image */}
          <div className="bg-white px-4 md:px-6 pb-4 md:pb-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-3 md:mb-4 text-gray-900 tracking-tight">{current?.name}</h2>
              {/* Always show description */}
              {current?.description && (
                <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6 text-gray-600 font-light italic">{current.description}</p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6 justify-center">
                <Button 
                  onClick={() => setShowConfigForm(true)}
                  size="lg"
                  className="px-6 md:px-8 py-3 text-sm md:text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Add to Cart
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
                </Button>
                {onSelect && (
                  <Button 
                    variant="outline"
                    onClick={() => current && onSelect(current, currentIndex)}
                    size="default"
                    className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-medium border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Use This Style
                  </Button>
                )}
              </div>
            </div>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="text-xs text-gray-500 mt-2 text-center">
                {currentIndex + 1} of {images.length}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      
      {/* Product Configuration Dialog */}
      <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <ProductConfigForm
            productType={productType || (current?.name.toLowerCase().includes('zebra') ? 'zebra' : current?.name.toLowerCase().includes('honeycomb') ? 'honeycomb' : 'roller')}
            productName={current?.name || title}
            currentStyle={current?.name}
            currentImage={current?.src}
            productCode={current?.code}
            onClose={() => setShowConfigForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default ProductImageViewer;