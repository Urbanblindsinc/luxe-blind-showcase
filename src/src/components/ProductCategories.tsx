
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Home, Shield, Sun } from "lucide-react";

const categories = [
  {
    id: "roller",
    title: "Roller Blinds",
    description: "Clean lines and minimalist design make our roller blinds perfect for modern interiors.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "/products/roller"
  },
  {
    id: "zebra",
    title: "Zebra Blinds",
    description: "Alternating strips of fabric create a unique zebra effect for precise light control.",
    image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "/products/zebra"
  },
  {
    id: "honeycomb",
    title: "Honeycomb Blinds",
    description: "Energy-efficient cellular design traps air for superior insulation and comfort.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "/products/honeycomb"
  }
];

const sustainabilityFeatures = [
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description: "Our blinds are crafted using sustainable materials, including recycled fabrics and responsibly sourced components that minimize environmental impact.",
    link: "/eco-friendly-materials"
  },
  {
    icon: Home,
    title: "Smart Home Integration",
    description: "Seamlessly connect your blinds to your smart home system for automated control, optimizing light and temperature for energy efficiency.",
    link: "/smart-home-integration"
  },
  {
    icon: Shield,
    title: "Dust Repellent Technology",
    description: "Special fabric treatments repel dust and allergens, creating a healthier indoor environment while reducing the need for frequent cleaning.",
    link: "/dust-repellent-technology"
  },
  {
    icon: Sun,
    title: "Advanced Light Control",
    description: "Precision light management allows you to reduce energy consumption by maximizing natural light while maintaining privacy and comfort.",
    link: "/advanced-light-control"
  }
];

const ProductCategories = () => {
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const categoryImages = categories.map(category => category.image);
    
    categoryImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({...prev, [src]: true}));
        console.log(`Preloaded image: ${src}`);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
      };
    });
  }, []);

  const handleCatalogClick = (categoryLink: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(categoryLink);
    // Small delay to ensure page navigation completes before scrolling
    setTimeout(() => {
      const catalogElement = document.querySelector('[class*="catalog"]') || 
                           document.querySelector('[class*="Catalog"]') ||
                           document.querySelector('main');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback: scroll to bottom of page
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 300);
  };

  const scrollToCatalog = () => {
    // Look for the catalog section on current page
    const catalogElement = document.querySelector('[class*="catalog"]') || 
                         document.querySelector('[class*="CatalogViewer"]') ||
                         document.querySelector('.catalog-viewer');
    
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6">
            Sustainable Window Solutions
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our commitment to sustainability and innovation delivers window treatments that are as kind to the planet as they are beautiful in your home
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {sustainabilityFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                onClick={() => navigate(feature.link)}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="inline-flex items-center text-primary font-medium hover:underline mt-auto"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {categories.map((category) => (
            <div key={category.id} className="relative group overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                {!imagesLoaded[category.image] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImagesLoaded(prev => ({...prev, [category.image]: true}))}
                  style={{opacity: imagesLoaded[category.image] ? 1 : 0, transition: 'opacity 0.3s'}}
                />
                <div className="absolute inset-0 bg-foreground/50 transition-opacity duration-500 group-hover:opacity-70"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-medium mb-4 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  {category.title}
                </h3>
                <p className="mb-6 opacity-85 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 max-w-xs">
                  {category.description}
                </p>
                <button
                  onClick={(e) => handleCatalogClick(category.link, e)}
                  className="inline-flex items-center text-white transform translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:underline text-left"
                >
                  <span className="font-medium">View Catalog</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-foreground hover:border-primary transition-colors"
          >
            <span className="font-medium">View All Products</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
