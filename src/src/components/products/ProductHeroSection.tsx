
import HeroSection from "@/components/zebra/HeroSection";
import { categoryImages, categoryDescriptions } from "./ProductData";

interface ProductHeroSectionProps {
  activeCategory: string;
  heroRef: React.RefObject<HTMLDivElement>;
}

export const ProductHeroSection = ({ activeCategory, heroRef }: ProductHeroSectionProps) => {
  if (activeCategory === "Zebra Blinds") {
    return (
      <HeroSection 
        image="https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        alt="Zebra Blinds - Premium Window Treatments"
        title="Zebra Blinds"
        description="Alternating strips of fabric create a unique zebra effect, allowing precise control over privacy and light filtration."
        textAlignment="left"
      />
    );
  }

  if (activeCategory === "Roller Blinds") {
    return (
      <HeroSection 
        image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        alt="Roller Blinds - Premium Window Treatments"
        title="Roller Blinds"
        description="Clean lines and minimalist design make our roller blinds perfect for modern interiors with simple, elegant functionality."
        textAlignment="left"
      />
    );
  }

  if (activeCategory === "Honeycomb Blinds") {
    return (
      <HeroSection 
        image="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        alt="Honeycomb Blinds - Premium Window Treatments"
        title="Honeycomb Blinds"
        description="Energy-efficient cellular design traps air for superior insulation, reducing energy costs while adding a sophisticated texture."
        textAlignment="left"
      />
    );
  }

  // Regular Hero Banner for other categories
  return (
    <div ref={heroRef} className="relative py-32 md:py-40 bg-secondary overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={categoryImages[activeCategory] || categoryImages["Roller Blinds"]} 
          alt={activeCategory}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-6">
        <div className="max-w-3xl text-white">
          <div className="w-24 h-1 bg-primary mb-8"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6">
            {activeCategory}
          </h1>
          <p className="text-xl text-white/90">
            {categoryDescriptions[activeCategory as keyof typeof categoryDescriptions]}
          </p>
        </div>
      </div>
    </div>
  );
};
