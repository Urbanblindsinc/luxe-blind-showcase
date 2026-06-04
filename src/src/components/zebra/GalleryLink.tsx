
import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";

interface GalleryLinkProps {
  text?: string;
  className?: string;
}

const GalleryLink = ({ 
  text = "View Catalog", 
  className = ""
}: GalleryLinkProps) => {
  
  const scrollToCatalog = () => {
    // Wait a short moment for components to render, then scroll to catalog
    setTimeout(() => {
      // Look for the specific "Zebra Blinds Catalog" heading
      const catalogHeading = Array.from(document.querySelectorAll('h2')).find(
        h2 => h2.textContent?.includes('Zebra Blinds Catalog')
      );
      
      if (catalogHeading) {
        catalogHeading.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        // Fallback to zebra-catalog section
        const catalogElement = document.getElementById('zebra-catalog');
        if (catalogElement) {
          catalogElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    }, 100);
  };

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={scrollToCatalog}
        className="inline-flex items-center px-8 py-4 bg-white text-foreground border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors rounded-md shadow-sm hover:shadow-md group"
      >
        <BookOpen className="mr-3 h-5 w-5" />
        <span className="text-base font-medium">{text}</span>
        <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </button>
    </div>
  );
};

export default GalleryLink;
