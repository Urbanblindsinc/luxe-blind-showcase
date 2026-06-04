import React from "react";
import { Ruler, BadgeCheck, DollarSign, MapPin } from "lucide-react";
import { useRegion } from "@/hooks/use-region";

const getLocationDesc = (zone: string) => {
  if (zone === "SEATTLE") return "Trusted team serving Seattle and surrounding areas.";
  if (zone === "SEATTLE") return "Trusted teams in Seattle, Bothell, Bellevue, Redmond, Kirkland, Everett, and surrounding areas.";
  return "Trusted local experts in your area.";
};

const AboutUsSection: React.FC = () => {
  const { zone } = useRegion();
  
  const items = [
    { icon: Ruler, title: "Expert Design Consultation", desc: "Professional guidance to choose the perfect window treatments for your space and needs." },
    { icon: BadgeCheck, title: "Quality Assurance", desc: "Rigorous quality control ensures every product meets our high standards before installation." },
    { icon: DollarSign, title: "Competitive Pricing", desc: "Fair, upfront pricing with flexible payment options to fit your budget." },
    { icon: MapPin, title: "Local Service Excellence", desc: getLocationDesc(zone) },
  ];

  return (
    <section id="about-us" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-6 text-center font-display">About Urban Blinds</h2>
        <p className="text-lg text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
          Urban Blinds has been transforming homes and offices with premium window treatments. 
          We combine cutting-edge design with exceptional craftsmanship to deliver blinds that 
          enhance your space's beauty, functionality, and energy efficiency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="bg-white p-6 shadow-sm border border-border card-hover h-full">
              <Icon className="h-8 w-8 text-accent mb-4" aria-hidden />
              <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;