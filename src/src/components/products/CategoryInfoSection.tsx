
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { expandedCategoryInfo } from "./ProductData";

interface CategoryInfoSectionProps {
  activeCategory: string;
  onScrollToCatalog: () => void;
}

export const CategoryInfoSection = ({ activeCategory, onScrollToCatalog }: CategoryInfoSectionProps) => {
  const currentCategoryInfo = expandedCategoryInfo[activeCategory as keyof typeof expandedCategoryInfo];
  
  if (activeCategory === "All Products" || !currentCategoryInfo) {
    return null;
  }

  const scrollToFabricCatalog = () => {
    setTimeout(() => {
      // Find all text nodes containing "Fabric Catalog"
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent?.trim() === "Fabric Catalog") {
          const element = node.parentElement;
          if (element) {
            // Get the navbar height to offset the scroll position
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 80; // fallback to 80px
            
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - navbarHeight - 60; // extra space between navbar and text
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            return;
          }
        }
      }
    }, 300);
  };

  return (
    <div className="mb-12 p-8 bg-white border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-display font-medium mb-3">{activeCategory}</h2>
          <p className="text-muted-foreground mb-4">
            {currentCategoryInfo.intro}
          </p>
          
          <ul className="mb-4 space-y-2">
            {currentCategoryInfo.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex">
            <Link
              to="/consultation"
              className="inline-flex items-center text-primary underline font-medium hover:text-primary/80"
            >
              <span>Request a custom consultation</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            to="/quote-calculator"
            className="inline-flex items-center px-5 py-2.5 bg-primary text-white hover:bg-primary/90 transition-colors h-11"
          >
            <span className="font-medium">Get a Quote</span>
          </Link>
          
          <button
            onClick={scrollToFabricCatalog}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white transition-colors h-11"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span className="font-medium">View Fabric Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
