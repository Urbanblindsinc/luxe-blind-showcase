
import React from "react";
import KeyFeature from "@/components/zebra/KeyFeature";
import { CatalogViewer } from "@/components";
import ImageShowcase from "@/components/zebra/ImageShowcase";
import rollerCatalog1 from "@/assets/roller-catalog-1.png";
import rollerCatalog2 from "@/assets/roller-catalog-2.png";
import rollerCatalog3 from "@/assets/roller-catalog-3.png";
import rollerCatalog4 from "@/assets/roller-catalog-4.png";
import rollerCatalog5 from "@/assets/roller-catalog-5.png";
import rollerCatalog6 from "@/assets/roller-catalog-6.png";
import rollerCatalog7 from "@/assets/roller-catalog-7.png";

// Create RollerShadesContent component with the user-provided images
const RollerShadesContent = ({ onLoaded }: { onLoaded: () => void }) => {
  // Array of content sections with image, title, and descriptions
  const contentSections = [
    {
      image: "/lovable-uploads/72f99367-56dc-4cec-8141-5a691278c3b0.png",
      title: "",
      subtitle: "Filtering light and elevating style",
      description: ""
    },
    {
      image: "/lovable-uploads/2219f1ae-f1e9-4797-982a-d00439fdf58c.png",
      title: "",
      subtitle: "AUTOMATION BY URBAN BLINDS",
      description: ""
    },
    {
      image: "/lovable-uploads/5d7e69c4-5ea4-4c5b-a034-8cc3690ed6f4.png",
      title: "",
      description: ""
    },
    {
      image: "/lovable-uploads/4f497ec3-8f65-4e59-a8b4-3a0e1bfc6c40.png",
      title: "",
      description: ""
    }
  ];
  
  // Features with numbered points for each section
  const sectionFeatures = [
    [
      { number: 1, title: "Smart Controls", description: "Control your blinds via smartphone app or voice commands for ultimate convenience." },
      { number: 2, title: "Automated Schedules", description: "Program your blinds to adjust automatically based on time of day or sunlight conditions." },
      { number: 3, title: "Smart Home Integration", description: "Seamlessly connects with major smart home systems for unified control of your living space." }
    ],
    [
      { number: 1, title: "Light-Filtering Fabrics", description: "Soft daylight without glare; maintain outside view and natural ambiance." },
      { number: 2, title: "Blackout Fabrics", description: "Near-total darkness for bedrooms and media rooms; optional side channels for maximum blackout." },
      { number: 3, title: "Privacy + UV Protection", description: "Daytime privacy with fabrics that block harmful UV to protect furnishings." }
    ],
    [
      { number: 1, title: "Designer Fabrics", description: "Premium materials in a wide range of colors and patterns." },
      { number: 2, title: "Antimicrobial Options", description: "Available fabrics with antimicrobial properties for health-conscious spaces." },
      { number: 3, title: "Stain Resistant", description: "Easy-care fabrics that resist staining and are simple to maintain." }
    ],
    [
      { number: 1, title: "Sleek Design", description: "Clean lines and modern aesthetics complement any interior style." },
      { number: 2, title: "Space-Saving", description: "Compact design requires minimal depth, perfect for any window." },
      { number: 3, title: "Easy Operation", description: "Smooth lift mechanisms make daily use effortless and convenient." }
    ]
  ];
  
  // Roller catalog pages
  const rollerCatalogPages = [
    { image: rollerCatalog1, pageNumber: 1 },
    { image: rollerCatalog2, pageNumber: 2 },
    { image: rollerCatalog3, pageNumber: 3 },
    { image: rollerCatalog4, pageNumber: 4 },
    { image: rollerCatalog5, pageNumber: 5 },
    { image: rollerCatalog6, pageNumber: 6 },
    { image: rollerCatalog7, pageNumber: 7 }
  ];
  
  // Simulate images loading
  React.useEffect(() => {
    const allImages = contentSections.map(section => section.image).concat(rollerCatalogPages.map(page => page.image));
    let loadedCount = 0;
    
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          onLoaded();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        if (loadedCount === allImages.length) {
          onLoaded();
        }
      };
    });
    
    return () => {
      allImages.forEach(src => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [onLoaded]);
  
  return (
    <div className="max-w-full mx-auto">
      {contentSections.map((section, index) => (
        <div key={index} className="mb-16">
          <ImageShowcase
            image={section.image}
            title={section.title}
            description={section.description}
            altText={section.title || "Roller Shade Feature"}
            fullWidth={true}
            imageClassName="w-full object-cover"
            bulletPoints={[]}
          />
          
          {sectionFeatures[index] && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {sectionFeatures[index].map((feature) => (
                <KeyFeature
                  key={feature.number}
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Catalog Viewer - just one instance */}
      <div className="mt-16">
        <CatalogViewer
          title="Fabric Catalog"
          description="Browse our complete collection of premium roller shade fabrics."
          coverImage={rollerCatalogPages[0].image}
          pages={rollerCatalogPages}
          downloadFileName="urban-blinds-roller-catalog-2023.pdf"
          pdfUrl="#"
          integrated={true}
        />
      </div>
    </div>
  );
};

export default RollerShadesContent;
