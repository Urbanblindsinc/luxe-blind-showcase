
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "1",
    title: "Aurora Roller Blinds",
    category: "Roller Blinds",
    description: "Elegant roller blinds with premium fabrics and smooth operation",
    image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    hoverImage: "https://images.unsplash.com/photo-1582037928769-181cf7363dfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "roller",
    featured: true
  },
  {
    id: "2",
    title: "Zebra Horizon",
    category: "Zebra Blinds",
    description: "Striking zebra blinds that add dimension to any space",
    image: "https://images.unsplash.com/photo-1615529328331-f8cc308f7add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1615529328075-0f39fa4aeeb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "zebra",
    featured: false
  },
  {
    id: "3",
    title: "Honeycomb Elegance",
    category: "Honeycomb Blinds",
    description: "Energy-efficient honeycomb blinds with luxurious textures",
    image: "https://images.unsplash.com/photo-1610701596319-4552136e767d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1615887828518-60ee3ca7170a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "honeycomb",
    featured: false
  },
  {
    id: "4",
    title: "Premium Light Filtering",
    category: "Roller Blinds",
    description: "Light filtering roller blinds for optimal ambiance",
    image: "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "roller",
    featured: false
  },
  {
    id: "5",
    title: "Zebra Twilight",
    category: "Zebra Blinds",
    description: "Premium zebra blinds with enhanced light filtering capabilities",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313a592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "zebra",
    featured: false
  }
];

const categories = [
  "Roller Blinds",
  "Zebra Blinds",
  "Honeycomb Blinds"
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Roller Blinds");
  const carouselRef = useRef(null);
  const [autoplayInterval, setAutoplayInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => product.category === activeCategory);

  // Setup autoplay for carousel
  useEffect(() => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    
    const interval = setInterval(() => {
      // Logic to move carousel would go here if using a ref to control it
    }, 5000);
    setAutoplayInterval(interval);
    
    return () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [activeCategory]);

  // Direct navigation helper - maps category or slug directly to route
  const navigateToCollection = (categoryName: string) => {
    console.log("Navigating to category:", categoryName);
    
    if (categoryName === "Roller Blinds") {
      navigate("/products/roller");
    } else if (categoryName === "Zebra Blinds") {
      navigate("/products/zebra");
    } else if (categoryName === "Honeycomb Blinds") {
      navigate("/products/honeycomb");
    } else {
      // Default fallback
      navigate("/products");
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-5">
            Our Curated Collections
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-5"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our premium range of custom window treatments crafted with exceptional materials
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-white text-foreground border border-gray-200 hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="block md:hidden">
          <Carousel className="w-full" ref={carouselRef}>
            <CarouselContent>
              {filteredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="p-2">
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    category={product.category}
                    image={product.image}
                    hoverImage={product.hoverImage}
                    slug={product.slug}
                    featured={product.featured}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mx-2 translate-y-0" />
              <CarouselNext className="relative static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Desktop Products Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              category={product.category}
              image={product.image}
              hoverImage={product.hoverImage}
              slug={product.slug}
              featured={product.featured}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-20">
          <Button
            onClick={() => navigateToCollection(activeCategory)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white transition-all duration-300 hover:bg-primary/90"
            size="lg"
          >
            <span className="font-medium">
              {`View ${activeCategory} Collection`}
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
