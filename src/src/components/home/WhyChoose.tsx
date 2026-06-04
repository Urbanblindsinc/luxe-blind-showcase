import React from "react";
import { Ruler, BadgeCheck, DollarSign, MapPin } from "lucide-react";
import { useRegion } from "@/hooks/use-region";

const getLocationDesc = (zone: string) => {
  if (zone === "SEATTLE") return "Trusted team serving Seattle and surrounding areas.";
  if (zone === "SEATTLE") return "Trusted teams in Seattle, Bothell, Bellevue, Redmond, Kirkland, Everett, and surrounding areas.";
  return "Trusted local experts in your area.";
};

const WhyChoose: React.FC = () => {
  const { zone } = useRegion();
  
  const items = [
    { icon: Ruler, title: "Tailored to Perfection", desc: "Precisely measured and made-to-order for your windows, style, and lifestyle." },
    { icon: BadgeCheck, title: "Enduring Craftsmanship", desc: "Elevated, flame-rated fabrics and hardware designed to last." },
    { icon: DollarSign, title: "Transparent Luxury", desc: "Refined finishes at honest prices—no surprises, no hidden fees." },
    { icon: MapPin, title: "Local Experts You Can Trust", desc: getLocationDesc(zone) },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center font-display">Why Choose Urban Blinds</h2>
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

export default WhyChoose;
