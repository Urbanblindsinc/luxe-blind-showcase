
import React from "react";
import { Shield, Zap, Palette, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Lifetime Craftsmanship Guarantee",
    description: "Our signature window treatments come with an exclusive lifetime guarantee against manufacturing defects—a testament to our uncompromising quality."
  },
  {
    icon: Zap,
    title: "Smart Home Integration",
    description: "Seamlessly connect your motorized blinds with your smart home ecosystem for the ultimate in convenience and control."
  },
  {
    icon: Palette,
    title: "Bespoke Design Service",
    description: "Work with our design consultants to create custom window treatments perfectly tailored to your space and aesthetic."
  },
  {
    icon: Award,
    title: "Energy Efficient",
    description: "Our window treatments help regulate temperature and reduce energy costs while enhancing your home's comfort."
  }
];

const LuxuryFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-[2px] bg-primary mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-8">
              Exceptional Craftsmanship & Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Our window treatments combine traditional craftsmanship with cutting-edge technology to provide the perfect balance of beauty, functionality, and convenience.
            </p>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] bg-gray-100 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1470&auto=format&fit=crop" 
                alt="Luxury window treatment" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute top-8 -left-8 w-full h-full border-2 border-primary -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryFeatures;
