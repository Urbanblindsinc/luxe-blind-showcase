
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    subtitle: "Serene Elegance",
    title: "Roller Blinds",
    description: "Minimalist design meets maximum functionality for the modern luxury home",
    buttonText: "Explore Roller Collection",
    link: "/products/roller"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    subtitle: "Layer & Light",
    title: "Zebra Blinds",
    description: "Precision light control with alternating fabric panels that transform your space",
    buttonText: "Discover Zebra Collection",
    link: "/products/zebra"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    subtitle: "Energy Efficient",
    title: "Honeycomb Blinds",
    description: "Superior insulation and acoustic performance with an elegant cellular structure",
    buttonText: "View Honeycomb Collection",
    link: "/products/honeycomb"
  }
];

const HeroLuxury = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
      console.log(`Preloading image: ${slide.image}`);
    });
  }, []);
  
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 7000);
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || currentSlide === index) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover transition-transform duration-10000 ease-out"
              style={{ 
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
                transitionDuration: "7000ms" 
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="relative h-full z-20 flex items-center pt-[76px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 flex items-center">
              <div className="w-full max-w-xl">
                {slides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    className={`transition-all duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-12 absolute"
                    }`}
                    style={{ 
                      transitionDelay: index === currentSlide ? "300ms" : "0ms",
                      top: 0,
                      left: 0
                    }}
                  >
                    <span className="inline-block text-sm md:text-base uppercase tracking-widest text-white/80 mb-3 font-light">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium mb-6 text-white">
                      {slide.title}
                    </h1>
                    <p className="text-md sm:text-lg text-white/90 mb-8 max-w-xl">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 relative z-30">
                      <Button
                        onClick={() => handleNavigate(slide.link)}
                        className="bg-white hover:bg-primary hover:text-white text-black text-sm font-medium px-6 py-6 rounded-md transition-colors duration-300 flex items-center justify-center h-auto"
                        size="lg"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleNavigate('/consultation')}
                        variant="outline"
                        className="border-2 border-white bg-black/30 text-white hover:bg-white/20 transition-colors text-sm font-medium h-auto py-6 rounded-md relative z-30"
                        size="lg"
                      >
                        Schedule a Consultation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-6 hidden lg:block"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex items-center gap-6">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className="group flex items-center gap-3 transition-all duration-300"
                  aria-label={`View ${slide.title}`}
                  disabled={isAnimating}
                >
                  <div className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                  }`}></div>
                  
                  <span className={`hidden md:inline-block text-sm font-light transition-all duration-300 ${
                    index === currentSlide ? "text-white" : "text-white/50 group-hover:text-white/80"
                  }`}>
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLuxury;
