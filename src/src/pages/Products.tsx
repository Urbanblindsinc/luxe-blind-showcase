import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { RollerCatalog, ZebraCatalog, HoneycombCatalog } from "@/components";
import CTA from "@/components/CTA";
import { CategoryFilter, SortDropdown, ViewMode, MobileFilters } from "@/components/products/ProductFilters";
import { CategoryInfoSection } from "@/components/products/CategoryInfoSection";
import { ProductHeroSection } from "@/components/products/ProductHeroSection";
import { allProducts } from "@/components/products/ProductData";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState("Roller Blinds");
  const [activeSorting, setActiveSorting] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(allProducts);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (category) {
      const categoryMap: Record<string, string> = {
        "roller": "Roller Blinds",
        "zebra": "Zebra Blinds",
        "honeycomb": "Honeycomb Blinds"
      };
      
      if (categoryMap[category]) {
        setActiveCategory(categoryMap[category]);
      }
    }
  }, [category]);
  
  useEffect(() => {
    let filtered = [...allProducts];
    filtered = filtered.filter(product => product.category === activeCategory);
    
    switch (activeSorting) {
      case "nameAsc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id.localeCompare(b.id);
        });
        break;
    }
    
    setProducts(filtered);
  }, [activeCategory, activeSorting]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    // Wait a short moment for components to render, then scroll to catalog
    setTimeout(() => {
      let catalogId = '';
      
      // Determine the correct catalog ID based on active category
      if (activeCategory === "Honeycomb Blinds") {
        catalogId = 'honeycomb-catalog';
      } else if (activeCategory === "Zebra Blinds") {
        catalogId = 'zebra-catalog';
      } else if (activeCategory === "Roller Blinds") {
        catalogId = 'roller-catalog';
      }
      
      const catalogElement = document.getElementById(catalogId);
      
      if (catalogElement) {
        catalogElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        // Fallback to data attribute selector
        const fallbackElement = document.querySelector('[data-catalog-section="true"]');
        if (fallbackElement) {
          fallbackElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    }, 100);
  };

  const renderSpecificCategoryContent = () => {
    if (activeCategory === "Zebra Blinds") {
      return <ZebraCatalog />;
    } else if (activeCategory === "Roller Blinds") {
      return <RollerCatalog />;
    } else if (activeCategory === "Honeycomb Blinds") {
      return <HoneycombCatalog />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-20 flex-grow">
        <ProductHeroSection activeCategory={activeCategory} heroRef={heroRef} />

        <div className="container mx-auto px-6 py-20">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="hidden md:block">
              <CategoryFilter 
                activeCategory={activeCategory} 
                onCategoryChange={handleCategoryChange} 
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <MobileFilters 
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              
              <div className="hidden md:block">
                <ViewMode 
                  viewMode={viewMode} 
                  onViewModeChange={setViewMode} 
                />
              </div>
              
              <SortDropdown 
                activeSorting={activeSorting} 
                onSortChange={setActiveSorting} 
              />
            </div>
          </div>
          
          {!(activeCategory === "Zebra Blinds" || activeCategory === "Roller Blinds" || activeCategory === "Honeycomb Blinds") && (
            <CategoryInfoSection 
              activeCategory={activeCategory}
              onScrollToCatalog={scrollToCatalog}
            />
          )}
          
          {renderSpecificCategoryContent()}
          
          {!renderSpecificCategoryContent() && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-medium mb-6">Available Products</h2>
              
              {products.length > 0 ? (
                <div className={`
                  ${viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                    : "flex flex-col gap-6"}
                `}>
                  {products.map((product, index) => (
                    <div key={product.id} className={viewMode === "list" ? "w-full" : ""}>
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try changing your filters or search criteria.
                  </p>
                  <button
                    onClick={() => handleCategoryChange("Roller Blinds")}
                    className="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {!(activeCategory === "Zebra Blinds" || activeCategory === "Roller Blinds" || activeCategory === "Honeycomb Blinds") && (
          <PhotoSpotlight 
            src="/lovable-uploads/7580b7e9-7820-4faf-80d1-9f424142fe71.png"
            alt="Zebra blinds on stairway window – recent installation"
            caption="From a recent Urban Blinds project"
          />
        )}

        <div className="container mx-auto px-6 py-12">
          <CTA 
            title="Find the Perfect Blinds for Your Space"
            subtitle="Our experts are ready to help you select the ideal window treatments for your home or office."
            buttonText="Request a Personalized Quote"
            buttonLink="/quote"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
