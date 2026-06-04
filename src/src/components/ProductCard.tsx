
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  hoverImage?: string;
  slug: string;
  featured?: boolean;
  index?: number;
}

const ProductCard = ({ 
  id, 
  title, 
  category, 
  image, 
  hoverImage, 
  slug,
  featured = false,
  index = 0
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Card clicked, navigating to:", slug);
    
    // Directly map category-based products to their respective routes
    if (category === "Roller Blinds") {
      navigate("/products/roller");
    } else if (category === "Zebra Blinds") {
      navigate("/products/zebra");
    } else if (category === "Honeycomb Blinds") {
      navigate("/products/honeycomb");
    } else {
      // If we have a specific product slug that's not a category
      navigate(`/products/${slug}`);
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`group ${
        featured 
          ? "col-span-1 md:col-span-2 row-span-2" 
          : "col-span-1"
      } opacity-0 ${isVisible ? "animate-fade-in" : ""}`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        onClick={handleCardClick}
        className="block h-full cursor-pointer"
      >
        <div className={`relative h-full overflow-hidden rounded-lg transition-all duration-500 ${
          isHovered ? "shadow-2xl shadow-primary/30 transform -translate-y-2" : ""
        } ${featured ? "aspect-[16/9]" : "aspect-[3/4]"}`}>
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-20 bg-white text-foreground px-4 py-1.5 text-xs font-medium flex items-center rounded-full">
              <Star className="h-3 w-3 mr-1.5 text-primary" />
              Featured
            </div>
          )}
          
          {/* Product Image */}
          <div className="absolute inset-0 bg-gray-100">
            <img 
              src={isHovered && hoverImage ? hoverImage : image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
            <div className="mb-2">
              <span className="inline-block text-primary text-sm font-medium">
                {category}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium mb-4">
              {title}
            </h3>
            <div className="flex items-center text-foreground">
              <span className="mr-2 font-medium">Discover</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </div>
          
          {/* Hover line indicator */}
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-primary transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
