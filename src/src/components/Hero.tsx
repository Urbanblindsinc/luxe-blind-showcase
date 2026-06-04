
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560185127-2d7366cb9e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Premium Window Treatments",
    subtitle: "Elevate your space with our luxury blind collection",
    button: {
      text: "Explore Collection",
      link: "/products"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600210491359-cade6e0a3513?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Automated Elegance",
    subtitle: "Experience the convenience of motorized blinds",
    button: {
      text: "Discover Motorized Options",
      link: "/products/motorized"
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1606744256317-308ed24a9be9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", 
    title: "Design Excellence",
    subtitle: "Custom window treatments tailored to your vision",
    button: {
      text: "Book a Consultation",
      link: "/consultation"
    }
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  };
  
  // Function to preload all slide images
  const preloadImages = () => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  };
  
  // Set up autoplay
  useEffect(() => {
    preloadImages();
    
    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    // Set a new interval
    intervalRef.current = window.setInterval(() => {
      if (!isTransitioning) {
        const nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
      }
    }, 6000);
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isTransitioning]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1500 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ 
            transitionProperty: "opacity", 
            transitionDuration: "1.5s",
            transitionTimingFunction: "ease-in-out"
          }}
        >
          {/* Image with overlay */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 to-navy-dark/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              style={{ 
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
                transition: "transform 6s ease-out",
              }}
            />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-3xl">
                <div 
                  className={`w-32 h-[2px] bg-primary mb-8 ${
                    index === currentSlide ? "animate-slide-up" : ""
                  }`}
                  style={{ 
                    animationDelay: '200ms', 
                    animationFillMode: 'forwards',
                    opacity: index === currentSlide ? 1 : 0
                  }}
                ></div>
                <h2 
                  className={`text-5xl md:text-6xl lg:text-7xl font-display font-semibold mb-6 text-white ${
                    index === currentSlide ? "animate-slide-up" : ""
                  }`}
                  style={{ 
                    animationDelay: '400ms', 
                    animationFillMode: 'forwards',
                    opacity: index === currentSlide ? 1 : 0
                  }}
                >
                  {slide.title}
                </h2>
                <p 
                  className={`text-xl md:text-2xl text-white/90 mb-10 ${
                    index === currentSlide ? "animate-slide-up" : ""
                  }`}
                  style={{ 
                    animationDelay: '600ms', 
                    animationFillMode: 'forwards',
                    opacity: index === currentSlide ? 1 : 0
                  }}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={index === currentSlide ? "animate-slide-up" : ""}
                  style={{ 
                    animationDelay: '800ms', 
                    animationFillMode: 'forwards',
                    opacity: index === currentSlide ? 1 : 0
                  }}
                >
                  <Link
                    to={slide.button.link}
                    className="inline-flex items-center px-8 py-4 bg-white text-navy-dark rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <span className="font-medium">{slide.button.text}</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-16 h-1 transition-all ${
              index === currentSlide ? "bg-primary" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
