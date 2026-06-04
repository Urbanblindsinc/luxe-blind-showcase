
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegionCallButton from "@/components/RegionCallButton";

const ProductCare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const careGuides = [
    {
      product: "Roller Blinds",
      steps: [
        "Dust regularly with a feather duster or vacuum with a brush attachment",
        "For spot cleaning, use a mild detergent solution and a soft cloth",
        "Avoid harsh chemicals or abrasive cleaning tools",
        "Allow to dry completely before raising"
      ]
    },
    {
      product: "Zebra Blinds",
      steps: [
        "Regular dusting with a soft cloth or feather duster",
        "Gently spot clean with a mild soap and water solution",
        "Blot, don't rub, to avoid damaging the fabric",
        "Always allow to dry completely before operation"
      ]
    },
    {
      product: "Honeycomb Blinds",
      steps: [
        "Use compressed air or a hair dryer on cool setting to remove dust",
        "For stains, gently blot with a mild detergent solution",
        "Never immerse in water or use strong cleaning agents",
        "Dry completely before retracting"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-20 md:py-28 px-6 bg-secondary overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary to-transparent"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="heading-lg mb-6">Product Care</h1>
              <p className="text-xl text-muted-foreground">
                Learn how to properly care for your window treatments to ensure their longevity and performance.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-6">Caring for Your Window Treatments</h2>
            <p className="text-lg mb-10">
              Proper maintenance of your window treatments not only preserves their appearance but also extends their lifespan. Follow our care guides below for specific product types.
            </p>
            
            {careGuides.map((guide, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-xl font-medium mb-4">{guide.product}</h3>
                <ul className="list-disc pl-6 space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="bg-secondary p-8 rounded-xl mt-12">
              <h3 className="text-xl font-medium mb-4">Need Additional Assistance?</h3>
              <p className="mb-6">
                If you have specific questions about caring for your Urban Blinds products, our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/quote" 
                  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
                >
                  Contact Us
                </a>
                <RegionCallButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCare;
